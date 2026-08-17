#!/usr/bin/env python3
"""
Solmere Keyword Bet Agent
=========================
A lightweight, always-on "keyword brain" that runs on a local LM Studio
model (CPU-friendly) and continuously proposes + evaluates niche SEO
keyword bets for Solmere Journal.

Design goals:
- Fresh context every round (no conversation history, no loop-stickiness)
- One small state file it edits incrementally (state.json)
- Internet check so it idles gracefully on spotty connections
- Light prompts / low token budget so small models answer in seconds

Usage:
    python agent.py                 # run the loop forever
    python agent.py --rounds 5      # run exactly N rounds then exit
    python agent.py --once propose  # run one 'propose' round
    python agent.py --once evaluate # run one 'evaluate' round

Config lives at the top of this file (CONSTANTS). No CLI args for behavior.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import httpx

# ═══════════════════════════════════════════════════════════════════════
# CONFIG (edit these)
# ═══════════════════════════════════════════════════════════════════════

LMSTUDIO_URL = "http://localhost:1234/v1"       # LM Studio OpenAI-compatible endpoint
MODEL = "llama-3.2-3b-instruct"                 # set to your loaded model name
ROUND_INTERVAL_SECONDS = 300                     # 5 min between rounds (idle time)
MAX_TOKENS = 800                                # keep small for CPU speed
TEMPERATURE = 0.7
REQUEST_TIMEOUT = 300                           # LM Studio can be slow on CPU

INTERNET_CHECK_URL = "https://www.google.com/generate_204"
INTERNET_TIMEOUT = 5
INTERNET_RETRY_SECONDS = 60                     # how long to idle when offline

PROPOSE_EVERY = 3                               # propose bets every N rounds
CONSOLIDATE_EVERY = 12                          # consolidate archetypes every N rounds

MAX_PENDING_BETS = 30                           # cap to keep the file small
MAX_ACTIVE_BETS = 40                            # hard cap on total bets

HERE = Path(__file__).resolve().parent
STATE_PATH = HERE / "state.json"
PROMPT_PATH = HERE / "system_prompt.txt"


# ═══════════════════════════════════════════════════════════════════════
# STATE (the working file the agent edits)
# ═══════════════════════════════════════════════════════════════════════

FRESH_STATE: dict[str, Any] = {
    "version": 1,
    "started_at": None,
    "rounds_completed": 0,
    "bets": [],          # list of bet cards (see propose round)
    "archetypes": {      # learned patterns
        "winning_patterns": [],
        "losing_patterns": [],
    },
    "learnings": [],     # one-line takeaways the agent writes to itself
    "next_round_type": "propose",
}


def load_state() -> dict[str, Any]:
    if STATE_PATH.exists():
        try:
            return json.loads(STATE_PATH.read_text())
        except json.JSONDecodeError:
            print("  state.json corrupt — starting fresh", file=sys.stderr)
    state = json.loads(json.dumps(FRESH_STATE))  # deep copy — never share nested refs
    state["started_at"] = datetime.now(timezone.utc).isoformat()
    save_state(state)
    return state


def save_state(state: dict[str, Any]) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n")


def _trim_bets(state: dict[str, Any]) -> None:
    """Keep the bet list bounded so the file and prompts stay small."""
    bets = state.get("bets", [])
    if len(bets) > MAX_ACTIVE_BETS:
        # keep the most recently created
        state["bets"] = sorted(
            bets, key=lambda b: b.get("created_round", 0), reverse=True
        )[:MAX_ACTIVE_BETS]


# ═══════════════════════════════════════════════════════════════════════
# INTERNET CHECK (graceful idle on spotty connections)
# ═══════════════════════════════════════════════════════════════════════

def internet_ok() -> bool:
    """Return True if we have a usable internet connection."""
    try:
        resp = httpx.get(INTERNET_CHECK_URL, timeout=INTERNET_TIMEOUT, follow_redirects=False)
        return resp.status_code in (204, 200)
    except Exception:
        return False


# ═══════════════════════════════════════════════════════════════════════
# LLM CALL (LM Studio, OpenAI-compatible)
# ═══════════════════════════════════════════════════════════════════════

def call_llm(system: str, user: str) -> dict[str, Any]:
    """Call LM Studio and return parsed JSON. Raises on failure."""
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": TEMPERATURE,
        "max_tokens": MAX_TOKENS,
    }
    resp = httpx.post(
        f"{LMSTUDIO_URL}/chat/completions",
        json=payload,
        timeout=REQUEST_TIMEOUT,
    )
    resp.raise_for_status()
    content = resp.json()["choices"][0]["message"]["content"]

    # Models sometimes wrap JSON in markdown fences
    content = content.strip()
    if content.startswith("```"):
        content = content.lstrip("`").lstrip("json").lstrip("JSON").strip()
        content = content.rstrip("`").strip()
    # Extract the first {...} block if there's prose around it
    start = content.find("{")
    end = content.rfind("}")
    if start != -1 and end != -1:
        content = content[start : end + 1]
    return json.loads(content)


# ═══════════════════════════════════════════════════════════════════════
# PROMPT BUILDING (fresh, minimal context every round)
# ═══════════════════════════════════════════════════════════════════════

def _summarize_state(state: dict[str, Any]) -> str:
    """Produce a SHORT summary of the working file for the round prompt."""
    bets = state.get("bets", [])
    pending = [b for b in bets if b.get("status") == "pending"]
    promoted = [b for b in bets if b.get("status") == "promoted"]
    rejected = [b for b in bets if b.get("status") == "rejected"]

    lines = [
        f"Rounds completed: {state.get('rounds_completed', 0)}",
        f"Promoted bets: {len(promoted)}, pending: {len(pending)}, rejected: {len(rejected)}",
    ]

    # Existing keywords (just the words, to avoid duplicates)
    existing_kw = [b.get("keyword", "") for b in bets]
    if existing_kw:
        lines.append("Existing keywords (avoid duplicates): " + ", ".join(existing_kw[-25:]))

    # Winning/losing archetypes
    winning = state.get("archetypes", {}).get("winning_patterns", [])
    losing = state.get("archetypes", {}).get("losing_patterns", [])
    if winning:
        lines.append("Winning patterns: " + "; ".join(winning[-5:]))
    if losing:
        lines.append("Losing patterns: " + "; ".join(losing[-5:]))

    return "\n".join(lines)


def build_propose_prompt(state: dict[str, Any]) -> str:
    summary = _summarize_state(state)
    return (
        f"{summary}\n\n"
        "Propose 3 new keyword bets. For each, return JSON with: keyword, thesis, "
        "why_it_wins, content_type, category, confidence (0-1).\n"
        "content_type must be one of: comparison, silent-problem, new-material, dtc-alternative.\n"
        "category must be one of: men, women, jewelry, maternity, baby, general.\n"
        "Bet on words real sites DON'T rank for — niche long-tail, 'silent problems', "
        "upcoming material/trend shifts. Avoid anything a big affiliate site already owns.\n"
        "Respond with ONLY JSON: {\"bets\": [{\"keyword\":..., \"thesis\":..., \"why_it_wins\":..., "
        "\"content_type\":..., \"category\":..., \"confidence\":...}]}"
    )


def build_evaluate_prompt(state: dict[str, Any]) -> str:
    summary = _summarize_state(state)
    pending = [b for b in state.get("bets", []) if b.get("status") == "pending"]
    pending_json = json.dumps(pending[-10:], ensure_ascii=False)
    return (
        f"{summary}\n\n"
        f"Here are the pending bets (score each 0-100):\n{pending_json}\n\n"
        "Score each bet 0-100 on: (1) how niche/underserved the keyword is, "
        "(2) fit with Solmere's decisive one-pick editorial voice, "
        "(3) commercial intent (will the reader buy?), (4) likelihood big sites don't cover it.\n"
        "A score >= 70 means PROMOTE. < 40 means REJECT. Otherwise keep pending.\n"
        "Respond with ONLY JSON: {\"verdicts\": [{\"keyword\":..., \"score\":..., \"verdict\": \"promote|reject|keep\", \"reason\":...}]}"
    )


def build_consolidate_prompt(state: dict[str, Any]) -> str:
    summary = _summarize_state(state)
    promoted = [b for b in state.get("bets", []) if b.get("status") == "promoted"]
    rejected = [b for b in state.get("bets", []) if b.get("status") == "rejected"]
    return (
        f"{summary}\n\n"
        f"Promoted bets: {json.dumps(promoted[-15:], ensure_ascii=False)}\n"
        f"Rejected bets: {json.dumps(rejected[-15:], ensure_ascii=False)}\n\n"
        "Extract 2-3 'winning patterns' (keyword shapes that keep scoring high) "
        "and 2-3 'losing patterns' (shapes that keep scoring low). "
        "Also write 1-2 one-line 'learnings' for future rounds.\n"
        "Respond with ONLY JSON: {\"winning_patterns\": [...], \"losing_patterns\": [...], \"learnings\": [...]}"
    )


# ═══════════════════════════════════════════════════════════════════════
# ROUND HANDLERS
# ═══════════════════════════════════════════════════════════════════════

def round_propose(state: dict[str, Any]) -> None:
    system = PROMPT_PATH.read_text() if PROMPT_PATH.exists() else "You are the Solmere Journal SEO keyword strategist."
    result = call_llm(system, build_propose_prompt(state))
    bets = result.get("bets", [])
    added = 0
    existing_kw = {b.get("keyword", "") for b in state["bets"]}
    for b in bets:
        kw = (b.get("keyword") or "").strip()
        if not kw or kw in existing_kw:
            continue
        state["bets"].append({
            "id": f"bet_{state['rounds_completed'] + 1}_{added + 1}",
            "keyword": kw,
            "thesis": b.get("thesis", ""),
            "why_it_wins": b.get("why_it_wins", ""),
            "content_type": b.get("content_type", "silent-problem"),
            "category": b.get("category", "general"),
            "confidence": b.get("confidence", 0.5),
            "status": "pending",
            "score": None,
            "created_round": state["rounds_completed"] + 1,
        })
        existing_kw.add(kw)
        added += 1
    _trim_bets(state)
    print(f"  proposed {added} new bet(s)")


def round_evaluate(state: dict[str, Any]) -> None:
    pending = [b for b in state.get("bets", []) if b.get("status") == "pending"]
    if not pending:
        print("  no pending bets to evaluate")
        return
    system = PROMPT_PATH.read_text() if PROMPT_PATH.exists() else "You are the Solmere Journal SEO keyword strategist."
    result = call_llm(system, build_evaluate_prompt(state))
    verdicts = {v.get("keyword"): v for v in result.get("verdicts", [])}
    scored = 0
    for b in state["bets"]:
        v = verdicts.get(b.get("keyword"))
        if not v:
            continue
        b["score"] = v.get("score")
        verdict = v.get("verdict", "keep")
        if verdict == "promote":
            b["status"] = "promoted"
        elif verdict == "reject":
            b["status"] = "rejected"
        else:
            b["status"] = "pending"
        if v.get("reason"):
            b["reason"] = v["reason"]
        scored += 1
    print(f"  scored {scored} bet(s)")


def round_consolidate(state: dict[str, Any]) -> None:
    system = PROMPT_PATH.read_text() if PROMPT_PATH.exists() else "You are the Solmere Journal SEO keyword strategist."
    result = call_llm(system, build_consolidate_prompt(state))
    arch = state.setdefault("archetypes", {})
    arch["winning_patterns"] = (arch.get("winning_patterns", []) + result.get("winning_patterns", []))[-10:]
    arch["losing_patterns"] = (arch.get("losing_patterns", []) + result.get("losing_patterns", []))[-10:]
    state.setdefault("learnings", []).extend(result.get("learnings", []))
    state["learnings"] = state["learnings"][-20:]
    print("  consolidated archetypes")


# ═══════════════════════════════════════════════════════════════════════
# MAIN LOOP (scheduler + internet check + fresh-context rounds)
# ═══════════════════════════════════════════════════════════════════════

def run_one_round(state: dict[str, Any], force_type: str | None = None) -> str:
    """Run exactly one round. Returns the round type that ran."""
    n = state.get("rounds_completed", 0)
    if force_type:
        round_type = force_type
    else:
        if n > 0 and n % CONSOLIDATE_EVERY == 0:
            round_type = "consolidate"
        elif n % PROPOSE_EVERY == 0 or state.get("next_round_type") == "propose":
            round_type = "propose"
        else:
            round_type = "evaluate"

    state["rounds_completed"] = n + 1
    print(f"[round {state['rounds_completed']}] {round_type}")

    try:
        if round_type == "propose":
            round_propose(state)
        elif round_type == "evaluate":
            round_evaluate(state)
        elif round_type == "consolidate":
            round_consolidate(state)
    except Exception as e:
        print(f"  ERROR in {round_type} round: {e}", file=sys.stderr)
        # don't crash the loop — just move on
    finally:
        state["next_round_type"] = "evaluate" if round_type == "propose" else "propose"
        save_state(state)

    return round_type


def run_forever(max_rounds: int | None = None) -> None:
    state = load_state()
    print(f"Solmere Keyword Bet Agent — model={MODEL} @ {LMSTUDIO_URL}")
    print(f"State file: {STATE_PATH}")

    while True:
        # Internet check first — idle if offline
        if not internet_ok():
            print(f"  offline — idling {INTERNET_RETRY_SECONDS}s...")
            time.sleep(INTERNET_RETRY_SECONDS)
            continue

        run_one_round(state)

        if max_rounds is not None and state["rounds_completed"] >= max_rounds:
            print(f"Reached {max_rounds} rounds. Done.")
            return

        time.sleep(ROUND_INTERVAL_SECONDS)


# ═══════════════════════════════════════════════════════════════════════
# CLI
# ═══════════════════════════════════════════════════════════════════════

def main() -> None:
    parser = argparse.ArgumentParser(description="Solmere Keyword Bet Agent")
    parser.add_argument("--rounds", type=int, help="Run exactly N rounds then exit")
    parser.add_argument("--once", choices=["propose", "evaluate", "consolidate"], help="Run a single round of a specific type")
    args = parser.parse_args()

    if args.once:
        state = load_state()
        run_one_round(state, force_type=args.once)
    else:
        run_forever(max_rounds=args.rounds)


if __name__ == "__main__":
    main()
