#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
SRC="$ROOT_DIR/scripts/git-hooks/pre-commit"
DST="$ROOT_DIR/.git/hooks/pre-commit"

if [[ ! -f "$SRC" ]]; then
  echo "ERROR: Hook source not found: $SRC"
  exit 1
fi

mkdir -p "$(dirname "$DST")"

# If destination exists and already points to source (symlink), we're done.
if [[ -L "$DST" ]]; then
  target="$(readlink "$DST")"
  if [[ "$target" == "../../scripts/git-hooks/pre-commit" || "$target" == "$SRC" ]]; then
    chmod +x "$SRC" || true
    echo "OK: pre-commit hook already installed (symlink)."
    exit 0
  fi
fi

# If destination exists and is the same file (hardlink or same path), we're done.
if [[ -e "$DST" ]] && [[ "$(realpath "$DST")" == "$(realpath "$SRC")" ]]; then
  chmod +x "$SRC" || true
  echo "OK: pre-commit hook already installed (same file)."
  exit 0
fi

# Remove any existing hook (file or wrong symlink), then install correctly.
rm -f "$DST"

# Prefer symlink so the repo version is the single source of truth.
ln -s "../../scripts/git-hooks/pre-commit" "$DST"
chmod +x "$SRC" || true

echo "OK: Installed pre-commit hook -> $DST"
