# Phase A – Dev Environment Handover & Litmus Tests (Blackbird OS)

This document captures the **“what exists”** in the dev stack at the end of
Phase A and a set of **litmus tests** to prove it still works on a fresh
machine or after a break.

---

## 1. Snapshot: what exists at Phase A

### 1.1 Repository & branching

- Repo is **public** on GitHub.
- `main` is protected:
  - ✅ Pull request required.
  - ✅ Status checks must pass.
  - ✅ Signed commits required.
  - ✅ Direct push to `main` is rejected with  
    `GH006: Protected branch update failed for refs/heads/main`.

### 1.2 CI / quality gates

- GitHub Actions workflow: `.github/workflows/ci.yml`.
- Uses **Nx Cloud** for caching and distributed builds.
- CI pipeline (for PRs to `main`) runs:
  - `lint` for all projects.
  - `build` for all projects.
  - `typecheck` (with a warning echo where `noEmit: true` is set).
  - `test` (currently stubbed with an informational echo).
  - `pnpm audit --audit-level=high` (fails on high/critical vulns).
  - CycloneDX SBOM generation (produces `sbom.cyclonedx.json`).
  - Chromatic visual regression run for `@blackbird-os/ui` Storybook.

### 1.3 Frontend + Storybook

- App:
  - Next.js app in `web`.
  - UI component library in `ui`.
- Storybook:
  - Config lives in `ui/.storybook`.
  - Accessibility addon enabled (`@storybook/addon-a11y`).
  - Build output goes to `ui/storybook-static` (generated, not committed).
  - Chromatic is wired to publish that Storybook and run visual tests.

### 1.4 Infra & cost controls

- Terraform code in `infra/terraform`.
- Remote state via **HCP Terraform** workspace `blackbird-os-dev`.
- Azure:
  - Resource group: `blackbird-os-dev-rg`.
  - Budget: `dev-rg-monthly-budget` scoped to that RG.
  - Email for budget alerts: `deanbarnes28@hotmail.com`.
- Cost guardrails documentation:
  - Plan: `docs/infra/cost-to-zero.md`.
  - Runbook: `docs/runbooks/emergency-cost-kill-switch.md`.

---

## 2. Local dev smoke test

- [x] Nx dev server runs for web

```bash
# From repo root
pnpm exec nx dev web
