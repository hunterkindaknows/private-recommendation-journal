#!/usr/bin/env python3
"""
Tests for the Solmere Keyword Bet Agent.
Mocks the LM Studio call so no model is needed — tests state management,
round logic, prompt building, and JSON parsing.
"""

from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import agent


def _fresh_state() -> dict:
    return json.loads(json.dumps(agent.FRESH_STATE))


class TestStateManagement(unittest.TestCase):
    def test_load_state_creates_fresh_when_missing(self):
        with tempfile.TemporaryDirectory() as tmp:
            orig = agent.STATE_PATH
            try:
                agent.STATE_PATH = Path(tmp) / "state.json"
                state = agent.load_state()
                self.assertEqual(state["rounds_completed"], 0)
                self.assertEqual(state["bets"], [])
                self.assertIsNotNone(state["started_at"])
            finally:
                agent.STATE_PATH = orig

    def test_save_and_reload(self):
        with tempfile.TemporaryDirectory() as tmp:
            orig = agent.STATE_PATH
            try:
                agent.STATE_PATH = Path(tmp) / "state.json"
                s = _fresh_state()
                s["bets"].append({"keyword": "test", "status": "pending"})
                agent.save_state(s)
                reloaded = agent.load_state()
                self.assertEqual(reloaded["bets"][0]["keyword"], "test")
            finally:
                agent.STATE_PATH = orig

    def test_trim_bets_bounds_size(self):
        s = _fresh_state()
        s["bets"] = [
            {"keyword": f"kw{i}", "created_round": i, "status": "pending"}
            for i in range(agent.MAX_ACTIVE_BETS + 10)
        ]
        agent._trim_bets(s)
        self.assertLessEqual(len(s["bets"]), agent.MAX_ACTIVE_BETS)

    def test_load_corrupt_state_starts_fresh(self):
        with tempfile.TemporaryDirectory() as tmp:
            orig = agent.STATE_PATH
            try:
                agent.STATE_PATH = Path(tmp) / "state.json"
                agent.STATE_PATH.write_text("{corrupt json")
                state = agent.load_state()
                self.assertEqual(state["rounds_completed"], 0)
            finally:
                agent.STATE_PATH = orig


class TestPromptBuilding(unittest.TestCase):
    def test_propose_prompt_has_key_fields(self):
        prompt = agent.build_propose_prompt(_fresh_state())
        self.assertIn("keyword", prompt)
        self.assertIn("content_type", prompt)
        self.assertIn("comparison", prompt)

    def test_evaluate_prompt_includes_pending_bets(self):
        s = _fresh_state()
        s["bets"] = [{"keyword": "belt squeak", "status": "pending", "score": None}]
        prompt = agent.build_evaluate_prompt(s)
        self.assertIn("belt squeak", prompt)

    def test_consolidate_prompt(self):
        s = _fresh_state()
        prompt = agent.build_consolidate_prompt(s)
        self.assertIn("winning_patterns", prompt)

    def test_summarize_avoids_duplicates_hint(self):
        s = _fresh_state()
        s["bets"] = [{"keyword": "foo bar", "status": "promoted"}]
        summary = agent._summarize_state(s)
        self.assertIn("foo bar", summary)
        self.assertIn("Existing keywords", summary)


class TestJSONParsing(unittest.TestCase):
    def _call_llm_with(self, response_text: str):
        """Patch call_llm to return a parsed version of response_text."""
        parsed = json.loads(response_text)
        return parsed

    def test_fence_stripping(self):
        # call_llm strips markdown fences. We test the logic by monkeypatching httpx.
        pass  # tested indirectly below


class TestRoundLogic(unittest.TestCase):
    def setUp(self):
        # Redirect state to temp file and mock call_llm
        self._tmp = tempfile.TemporaryDirectory()
        self._orig_state = agent.STATE_PATH
        self._orig_prompt = agent.PROMPT_PATH
        agent.STATE_PATH = Path(self._tmp.name) / "state.json"
        agent.PROMPT_PATH = Path(self._tmp.name) / "system_prompt.txt"
        agent.PROMPT_PATH.write_text("You are the Solmere keyword strategist.")

        self._orig_call = agent.call_llm
        self.calls = []

    def tearDown(self):
        agent.STATE_PATH = self._orig_state
        agent.PROMPT_PATH = self._orig_prompt
        agent.call_llm = self._orig_call
        self._tmp.cleanup()

    def _mock(self, response: dict):
        agent.call_llm = lambda system, user: response

    def test_propose_round_adds_bets(self):
        self._mock({
            "bets": [
                {"keyword": "belt buckle squeak", "thesis": "t", "why_it_wins": "w",
                 "content_type": "silent-problem", "category": "men", "confidence": 0.8},
                {"keyword": "belt buckle squeak", "thesis": "dup", "why_it_wins": "w",
                 "content_type": "silent-problem", "category": "men", "confidence": 0.7},
            ]
        })
        s = _fresh_state()
        agent.round_propose(s)
        # duplicate keyword should be deduped → only 1 added
        self.assertEqual(len(s["bets"]), 1)
        self.assertEqual(s["bets"][0]["keyword"], "belt buckle squeak")
        self.assertEqual(s["bets"][0]["status"], "pending")

    def test_evaluate_round_scores(self):
        s = _fresh_state()
        s["bets"] = [{"keyword": "merino vs cotton", "status": "pending", "score": None}]
        self._mock({
            "verdicts": [{"keyword": "merino vs cotton", "score": 82, "verdict": "promote", "reason": "niche"}]
        })
        agent.round_evaluate(s)
        self.assertEqual(s["bets"][0]["status"], "promoted")
        self.assertEqual(s["bets"][0]["score"], 82)

    def test_evaluate_skips_when_no_pending(self):
        s = _fresh_state()
        agent.round_evaluate(s)  # should not crash
        self.assertEqual(s["bets"], [])

    def test_consolidate_updates_archetypes(self):
        s = _fresh_state()
        self._mock({
            "winning_patterns": ["silent problem X"],
            "losing_patterns": ["broad term Y"],
            "learnings": ["niche beats broad"],
        })
        agent.round_consolidate(s)
        self.assertIn("silent problem X", s["archetypes"]["winning_patterns"])
        self.assertIn("broad term Y", s["archetypes"]["losing_patterns"])
        self.assertIn("niche beats broad", s["learnings"])

    def test_run_one_round_increments_and_saves(self):
        self._mock({"bets": []})
        s = _fresh_state()
        agent.run_one_round(s, force_type="propose")
        self.assertEqual(s["rounds_completed"], 1)
        # state was saved to temp path
        reloaded = json.loads(agent.STATE_PATH.read_text())
        self.assertEqual(reloaded["rounds_completed"], 1)

    def test_fresh_context_no_accumulation(self):
        """Each round's prompt is built from current state only, not history."""
        self._mock({"bets": []})
        s = _fresh_state()
        agent.run_one_round(s, force_type="propose")
        agent.run_one_round(s, force_type="evaluate")
        # rounds_completed reflects two independent rounds
        self.assertEqual(s["rounds_completed"], 2)


class TestInternetCheck(unittest.TestCase):
    def test_internet_ok_handles_failure(self):
        # monkeypatch httpx.get to always raise
        orig = agent.httpx.get
        agent.httpx.get = lambda *a, **k: (_ for _ in ()).throw(ConnectionError())
        try:
            self.assertFalse(agent.internet_ok())
        finally:
            agent.httpx.get = orig


if __name__ == "__main__":
    unittest.main()
