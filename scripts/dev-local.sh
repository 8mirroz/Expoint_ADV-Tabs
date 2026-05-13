#!/usr/bin/env bash
set -euo pipefail

PORT="3000"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

cd "$ROOT_DIR"

if lsof -iTCP:"$PORT" -sTCP:LISTEN -n -P >/dev/null 2>&1; then
  echo "[dev-local] Port $PORT is busy. Stop the current process and retry."
  lsof -iTCP:"$PORT" -sTCP:LISTEN -n -P || true
  exit 1
fi

echo "[dev-local] Starting Next.js dev server on http://localhost:$PORT"
exec npx next dev -p "$PORT"
