CREATE TABLE IF NOT EXISTS brainrots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  base_hp INTEGER NOT NULL,
  base_attack INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_brainrots_name ON brainrots(name);
CREATE INDEX IF NOT EXISTS idx_brainrots_created_at ON brainrots(created_at);
