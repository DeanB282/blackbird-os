# Secret Leakage Prevention (Local + CI) — Policy

## Purpose

This policy defines the controls Blackbird OS uses to prevent accidental secret commits and the process to follow if a leak occurs.

This is a diligence-ready answer to: “What prevents accidental secret commits?”
Answer: Automated controls (local pre-commit + CI secret scanning) + controlled allowlisting + mandatory rotation process.

## Scope

Applies to:
- All contributors (employees, contractors, externals)
- All repositories in the Blackbird OS org (unless explicitly exempted by Security)

## Definition of “Secret”

A secret is any value that can authenticate, authorize, decrypt, or access protected resources, including but not limited to:
- API keys, access tokens, OAuth client secrets
- Private keys / certificates
- Passwords
- Connection strings
- Cloud credentials (AWS keys, Azure creds, etc.)

---

## Control Layer 1 — Local Developer Workstation Controls (Pre-Commit Hook)

Blackbird OS enforces local leak prevention using a Git pre-commit hook.

Hook source of truth:
- `scripts/git-hooks/pre-commit`

Installation:
- `pnpm hooks:install` (runs `scripts/git-hooks/install.sh`)

### What is blocked locally (by filename/path)

The pre-commit hook blocks commits containing any staged file matching these patterns:
- `web/.env` and `web/.env.*` (e.g., `web/.env.local`)
- `*.pem`
- `*.p12`
- `*.pfx`
- `id_rsa`
- `id_ed25519`

### What is blocked locally (by content patterns)

The pre-commit hook also blocks staged diffs containing high-risk secret-like patterns, including:
- AWS access key format (e.g. `AKIA...`)
- Private key blocks (`-----BEGIN ... PRIVATE KEY-----`)
- GitHub tokens (`ghp_...`)
- Slack tokens (`xox...`)

### Local control expectations

- All contributors must run `pnpm hooks:install` after cloning.
- Branch protection is not a substitute for workstation controls.
- Secrets must be stored in approved systems:
  - GitHub Actions Secrets / Environment Secrets
  - Azure Key Vault (where applicable)
  - Encrypted secret stores approved by Security

---

## Control Layer 2 — CI Controls (Gitleaks)

Blackbird OS runs Gitleaks in CI to detect secrets in:
- PRs
- Branch pushes
- Repository history (as configured)

CI workflow location:
- `.github/workflows/gitleaks.yml`

Expected behavior:
- If Gitleaks detects a secret, the workflow fails.
- A failed Gitleaks run blocks merge to protected branches.

---

## Allowlisting (Exceptions) — Strict Process

Allowlisting exists only to prevent false positives (e.g., test tokens, example strings).
Allowlisting must never be used to permit real secrets.

### How to add an allowlist entry

Allowlist changes must follow this process:

1) Create a PR that includes:
   - The allowlist change (minimum scope)
   - A short explanation of why it’s a false positive
   - Proof that the value is not a real secret

2) PR must be approved by:
   - Repository owner or Security owner

3) The PR description must include:
   - What matched
   - Why it is safe
   - Why it cannot be removed another way (preferred)

No direct commits to main/master for allowlisting changes.

---

## Incident Response — If a Secret Leak Happens

If a secret is suspected to be committed, treat it as compromised immediately.

### Immediate actions (do now)

1) Rotate the secret immediately:
   - Invalidate / revoke tokens
   - Rotate API keys
   - Rotate passwords
   - Replace certificates/keys as needed

2) Remove the secret from active use:
   - Update apps/services to use the new secret
   - Confirm the old secret no longer works

3) Block further exposure:
   - Remove from the repository (history rewrite if required)
   - Confirm CI is green with the secret removed

### Repository remediation (may be required)

- If a secret entered git history:
  - Use approved secret-removal tooling and follow Security direction
  - Re-run secret scanning after remediation

### Post-incident requirements

Within 24–72 hours, produce a short postmortem including:
- What leaked (type of credential, not the value)
- How it leaked (path/process failure)
- Blast radius assessment
- Remediation taken (rotation, invalidation, code changes)
- Preventative changes (control improvements)

---

## Evidence (Diligence Pack)

Evidence that controls are active must be kept up to date, including:
- Screenshot of pre-commit blocking a staged `.env` attempt:
  - `docs/fortress/evidence/precommit-block.png`
- CI proof of Gitleaks workflow enabled:
  - `.github/workflows/gitleaks.yml`

