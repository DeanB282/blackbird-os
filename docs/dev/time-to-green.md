# Time-to-Green KPIs

## Purpose
Define two separate “time-to-green” KPIs to remove noise and prevent misleading measurements:

1) **Code-to-green** (local dev build health)
2) **Infra-to-green** (Terraform execution health)

These KPIs are measured independently.

---

## KPI 1 — Code-to-green

### Definition
**Code-to-green** is the time from running the code KPI script to completion of:

- `pnpm install --frozen-lockfile`
- `nx run-many -t lint test build typecheck`
- `storybook build`

### Target
**≤ 25 minutes**

### What is included
- Install + lint + test + build + typecheck + storybook build

### What is excluded
- Any cloud logins  
- Any Terraform steps  
- Any unrelated local setup tasks (first-time OS installs, IDE setup)

---

## KPI 2 — Infra-to-green

### Definition
**Infra-to-green** is the time from running the infra KPI script to completion of:

- `terraform init`
- `terraform plan`

(Phase B will expand to include `terraform apply` when automation is enabled.)

### Target
**≤ 10–15 minutes** (once logged in)

### What is included
- Only the Terraform commands above

### What is excluded (“noise disclaimer”)
- **Azure login is NOT counted**
- Any MFA / device auth / portal time is NOT counted
- Only the Terraform command runtime is measured

---

## Measurement Method

### How
- Use the KPI scripts in `scripts/kpi/`
- Measurement is via `date +%s` (seconds)
- Record the emitted `*_SECONDS` value

### Baseline environment
- OS: WSL2 Ubuntu
- Node: 20.x
- pnpm: 9.x

---

## Evidence: Baseline Runs

Record one baseline run for each KPI.

### Code-to-green baseline
- Date: 2026-01-27  
- Machine: Local dev (WSL2 Ubuntu)  
- Output:
  - `CODE_TO_GREEN_SECONDS=22`

### Infra-to-green baseline
- Date: 2026-01-27  
- Machine: Local dev (WSL2 Ubuntu)  
- Output:
  - `INFRA_TO_GREEN_SECONDS=15`

---

## Notes
- These KPIs are intentionally “honest”.
- Splitting them prevents inflated claims and makes bottlenecks obvious.
