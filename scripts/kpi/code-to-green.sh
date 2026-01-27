#!/usr/bin/env bash
set -euo pipefail
start=$(date +%s)

pnpm install --frozen-lockfile
pnpm exec nx run-many -t lint test build typecheck --all --output-style=stream
pnpm exec nx run @blackbird-os/ui:build-storybook

end=$(date +%s)
echo "CODE_TO_GREEN_SECONDS=$((end-start))"
