CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  event_type TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer_url TEXT,
  referrer_host TEXT,
  session_id TEXT NOT NULL,
  scroll_depth INTEGER,
  outbound_url TEXT,
  outbound_host TEXT,
  page_ms INTEGER,
  viewport_w INTEGER,
  viewport_h INTEGER,
  tz TEXT,
  ua TEXT,
  ip_hash TEXT NOT NULL,
  country TEXT
);

CREATE INDEX IF NOT EXISTS idx_events_ts ON events (ts);
CREATE INDEX IF NOT EXISTS idx_events_path ON events (path);
CREATE INDEX IF NOT EXISTS idx_events_event_type ON events (event_type);
CREATE INDEX IF NOT EXISTS idx_events_referrer_host ON events (referrer_host);
