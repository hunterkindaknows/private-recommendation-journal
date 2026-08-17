# Solmere Keyword Bet Agent

A lightweight, always-on "keyword brain" that runs a **local LM Studio model**
on CPU and continuously proposes + evaluates niche SEO keyword bets for future
Solmere Journal editorial pages.

## What it does

Every few minutes, it runs one "round" of homework and edits a single working
file (`state.json`):

1. **propose** — invents 3 niche keyword bets (silent problems, emerging
   materials, "vs" comparison gaps, long-tail buy-intent).
2. **evaluate** — scores pending bets 0-100 and promotes/rejects them.
3. **consolidate** (every 12 rounds) — extracts "winning/losing patterns"
   so future proposals get smarter.

Each round uses a **fresh context** — the agent only sees a short summary of the
current state, never its own history. This stops it from looping or growing a
stale, self-referential context.

## Why local + small

- Runs entirely on your machine via LM Studio (OpenAI-compatible API).
- Small model on CPU. Responses take seconds because prompts are short and
  token budget is capped (`MAX_TOKENS = 800`).
- No API cost. No cloud dependency.

## Setup

1. Install and run [LM Studio](https://lmstudio.ai/).
2. Load a small model (e.g. `llama-3.2-3b-instruct`, `phi-3-mini`,
   `qwen2.5-3b-instruct`).
3. Start the local server (Developer → Local Server → Start, default port 1234).
4. Edit `agent.py` → set `MODEL` to the exact model name shown in LM Studio.
5. Run it:

```bash
python keyword_bet_agent/agent.py            # run forever (24/7)
python keyword_bet_agent/agent.py --rounds 5 # run 5 rounds then stop
python keyword_bet_agent/agent.py --once propose
```

## Spotty internet? No problem

Before every round the agent checks connectivity (a single HEAD request to
`google.com/generate_204` with a 5s timeout). If it's offline, it idles
quietly and retries every 60 seconds. It never crashes on a dropped connection.

## Reading the output

All findings land in `state.json`:

```json
{
  "bets": [
    {
      "keyword": "belt buckle squeak when walking",
      "thesis": "specific annoyance with no dedicated product page",
      "status": "promoted",
      "score": 84,
      "content_type": "silent-problem",
      "category": "men"
    }
  ],
  "archetypes": { "winning_patterns": ["..."], "losing_patterns": ["..."] },
  "learnings": ["..."]
}
```

**Promoted bets** (`status: "promoted"`, `score >= 70`) are the keywords to
write new Solmere editorial pages around. Pull them out whenever you want to
publish something new.

## Tuning

Everything is at the top of `agent.py`:

| Constant | Default | Meaning |
|----------|---------|---------|
| `MODEL` | `llama-3.2-3b-instruct` | Model loaded in LM Studio |
| `ROUND_INTERVAL_SECONDS` | `300` | Idle time between rounds |
| `MAX_TOKENS` | `800` | Token budget (lower = faster) |
| `PROPOSE_EVERY` | `3` | Propose new bets every N rounds |
| `CONSOLIDATE_EVERY` | `12` | Consolidate patterns every N rounds |
| `MAX_ACTIVE_BETS` | `40` | Cap on the working file size |
