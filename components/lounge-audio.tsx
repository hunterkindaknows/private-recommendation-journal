"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type LoungeProfile = {
  label: string
  bpm: number
  rootMidi: number
  barBeats: number
  progression: number[][]
  chordDurationBeats: number
  filterHz: number
}

// Seasonal swap: change only `activeProfile` to another key below.
const LOUNGE_CONFIG = {
  activeProfile: "lateNightLounge",
} as const

const LOUNGE_PROFILES: Record<string, LoungeProfile> = {
  lateNightLounge: {
    label: "Late-Night Lounge",
    bpm: 68,
    rootMidi: 57, // A3
    barBeats: 4,
    chordDurationBeats: 3.6,
    filterHz: 1800,
    progression: [
      [0, 4, 7, 11, 14], // maj9
      [2, 5, 9, 12, 16], // sus/add colors
      [-3, 0, 4, 7, 10], // dom7 flavor
      [-5, -1, 2, 5, 9], // minor9 color
    ],
  },
  springBossa: {
    label: "Spring Bossa",
    bpm: 84,
    rootMidi: 55, // G3
    barBeats: 4,
    chordDurationBeats: 3.2,
    filterHz: 2200,
    progression: [
      [0, 4, 7, 11, 14],
      [5, 9, 12, 16, 19],
      [2, 5, 9, 12, 16],
      [-2, 2, 5, 9, 12],
    ],
  },
  dustyVinyl: {
    label: "Dusty Vinyl",
    bpm: 64,
    rootMidi: 53, // F3
    barBeats: 4,
    chordDurationBeats: 3.7,
    filterHz: 1500,
    progression: [
      [0, 3, 7, 10, 14],
      [5, 8, 12, 15, 19],
      [2, 5, 9, 12, 16],
      [-2, 2, 5, 8, 12],
    ],
  },
}

const STORAGE_KEYS = {
  enabled: "penpal_lounge_enabled",
  volume: "penpal_lounge_volume",
}

function midiToFreq(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12)
}

export function LoungeAudio() {
  const profile = LOUNGE_PROFILES[LOUNGE_CONFIG.activeProfile]

  const [enabled, setEnabled] = useState(false)
  const [volume, setVolume] = useState(0.38)
  const [ready, setReady] = useState(false)

  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const timerRef = useRef<number | null>(null)
  const nextEventTimeRef = useRef(0)
  const barRef = useRef(0)

  useEffect(() => {
    const savedEnabled = localStorage.getItem(STORAGE_KEYS.enabled)
    const savedVolume = localStorage.getItem(STORAGE_KEYS.volume)
    if (savedEnabled === "true") setEnabled(true)
    if (savedVolume) {
      const parsed = Number(savedVolume)
      if (!Number.isNaN(parsed)) setVolume(Math.min(1, Math.max(0, parsed)))
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(STORAGE_KEYS.enabled, String(enabled))
  }, [enabled, ready])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(STORAGE_KEYS.volume, String(volume))
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.08)
    }
  }, [volume, ready])

  const stopScheduler = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const ensureAudioContext = useCallback(async () => {
    if (!ctxRef.current) {
      const ctx = new window.AudioContext()
      const master = ctx.createGain()
      master.gain.value = volume
      master.connect(ctx.destination)

      ctxRef.current = ctx
      masterRef.current = master
      nextEventTimeRef.current = ctx.currentTime + 0.05
      barRef.current = 0
    }

    if (ctxRef.current.state === "suspended") {
      await ctxRef.current.resume()
    }
  }, [volume])

  const playChordAt = useCallback(
    (time: number, chordSemitones: number[]) => {
      const ctx = ctxRef.current
      const master = masterRef.current
      if (!ctx || !master) return

      const beatSec = 60 / profile.bpm
      const duration = profile.chordDurationBeats * beatSec

      const filter = ctx.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(profile.filterHz, time)
      filter.Q.setValueAtTime(0.5, time)
      filter.connect(master)

      for (let i = 0; i < chordSemitones.length; i += 1) {
        const midi = profile.rootMidi + chordSemitones[i]
        const freq = midiToFreq(midi)

        const o1 = ctx.createOscillator()
        o1.type = "triangle"
        o1.frequency.setValueAtTime(freq, time)

        const o2 = ctx.createOscillator()
        o2.type = "sine"
        o2.frequency.setValueAtTime(freq * 2, time)

        const voice = ctx.createGain()
        const velocity = 0.065 + i * 0.008
        voice.gain.setValueAtTime(0.0001, time)
        voice.gain.linearRampToValueAtTime(velocity, time + 0.04)
        voice.gain.exponentialRampToValueAtTime(0.0001, time + duration)

        o1.connect(voice)
        o2.connect(voice)
        voice.connect(filter)

        o1.start(time)
        o2.start(time)
        o1.stop(time + duration + 0.1)
        o2.stop(time + duration + 0.1)
      }
    },
    [profile]
  )

  const schedule = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return

    const lookAhead = 0.2
    const beatSec = 60 / profile.bpm
    const barDuration = beatSec * profile.barBeats

    while (nextEventTimeRef.current < ctx.currentTime + lookAhead) {
      const progressionIndex = barRef.current % profile.progression.length
      const chord = profile.progression[progressionIndex]
      playChordAt(nextEventTimeRef.current, chord)
      nextEventTimeRef.current += barDuration
      barRef.current += 1
    }
  }, [playChordAt, profile])

  const start = useCallback(async () => {
    await ensureAudioContext()
    stopScheduler()
    schedule()
    timerRef.current = window.setInterval(schedule, 90)
    setEnabled(true)
  }, [ensureAudioContext, schedule, stopScheduler])

  const stop = useCallback(() => {
    stopScheduler()
    setEnabled(false)
  }, [stopScheduler])

  useEffect(() => {
    return () => {
      stopScheduler()
      if (ctxRef.current) {
        void ctxRef.current.close()
      }
    }
  }, [stopScheduler])

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[270px] border border-border bg-card/95 p-4 backdrop-blur">
      <p className="persona-badge text-accent">Sound</p>
      <p className="mt-1 font-serif text-lg text-foreground">{profile.label}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Browser-generated ambient lounge. Click to start.
      </p>

      <div className="mt-3 flex items-center gap-2">
        {enabled ? (
          <button
            type="button"
            onClick={stop}
            className="border border-foreground bg-foreground px-3 py-2 text-xs text-primary-foreground"
          >
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="border border-foreground bg-foreground px-3 py-2 text-xs text-primary-foreground"
          >
            Play
          </button>
        )}
        <label className="flex flex-1 items-center gap-2 text-xs text-muted-foreground">
          Vol
          <input
            aria-label="Lounge volume"
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-full"
          />
        </label>
      </div>
    </div>
  )
}
