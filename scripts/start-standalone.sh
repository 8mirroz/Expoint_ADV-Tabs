#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STANDALONE_DIR="$ROOT_DIR/.next/standalone"
PORT="${PORT:-3000}"
HOSTNAME="${HOSTNAME:-127.0.0.1}"

if [ ! -f "$STANDALONE_DIR/server.js" ]; then
  echo "[start-standalone] Missing $STANDALONE_DIR/server.js. Run npm run build first."
  exit 1
fi

mkdir -p "$STANDALONE_DIR/.next" "$STANDALONE_DIR/public"
rm -rf "$STANDALONE_DIR/.next/static"
cp -R "$ROOT_DIR/.next/static" "$STANDALONE_DIR/.next/static"

if [ -d "$ROOT_DIR/public" ]; then
  rm -rf "$STANDALONE_DIR/public"
  mkdir -p "$STANDALONE_DIR/public"
  cp -R "$ROOT_DIR/public/." "$STANDALONE_DIR/public/"
fi

cd "$STANDALONE_DIR"
exec env PORT="$PORT" HOSTNAME="$HOSTNAME" node server.js
