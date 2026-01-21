#!/usr/bin/env bash
set -euo pipefail

mkdir -p dist/ci

echo "git_sha=$(git rev-parse HEAD)" > dist/ci/build-metadata.txt
echo "node=$(node -v)" >> dist/ci/build-metadata.txt
echo "pnpm=$(pnpm -v)" >> dist/ci/build-metadata.txt

# Dependency snapshot hash (lockfile)
if [ -f pnpm-lock.yaml ]; then
  echo "pnpm_lock_sha256=$(sha256sum pnpm-lock.yaml | awk '{print $1}')" >> dist/ci/build-metadata.txt
fi

# Nx projects list snapshot (helps diligence)
pnpm exec nx show projects > dist/ci/nx-projects.txt
