# Cost-to-zero plan – Blackbird OS

Last updated: 2026-01-02

## 1. Purpose

This document explains how to drive Azure spend for Blackbird OS down to (almost) zero when:

- we’re between phases, or 
- we hit money pressure and need to cut burn fast without losing the ability to come back later.

It’s about **deliberate shutdown** (cheap but reversible), not disaster recovery.

At Phase A the infra is intentionally tiny:

- Subscription: Azure for Students (single subscription)
- Resource group: `blackbird-os-dev-rg`
- Terraform state: Terraform Cloud workspace `blackbird-os-dev`
- Budget: `dev-rg-monthly-budget` (50 £/month) with email alerts to `deanbarnes28@hotmail.com`
- No production workloads yet – everything is **dev / experimental only**

This doc will evolve as new services (App Service, DB, storage, queues, etc.) are added.

---

## 2. Baseline cost controls (always on)

These are the default guard-rails; they should never be disabled:

1. **Terraform-managed resource group**

   - All dev cloud resources must live under `blackbird-os-dev-rg`, created by Terraform.
   - Anything created manually in the Azure Portal must either:
     - be moved into this RG and added to Terraform **within 24 hours**, or  
     - be deleted.

2. **Budget + alerts**

   - Budget resource: `dev-rg-monthly-budget` 
   - Amount: **£50 / month** 
   - Alerts:
     - 80% of budget (warning)
     - 100% of budget (hard alert)
   - Alert email: `deanbarnes28@hotmail.com` (personal for now; will move to ops@ later).

3. **“Cheap by default” rule**

   When adding new resources:

   - Use **dev / free tiers** wherever possible. 
   - Prefer **consumption-based** pricing (Functions, Storage, etc.) over always-on compute.  
   - Use **small SKUs** first (e.g. B-series, F1, Basic), then scale up with data.

---

## 3. Normal “cost-to-low” posture (non-emergency)

When we’re not actively building or demoing:

1. **No long-running experiments** 
   - Shut down test VMs, containers and premium DB tiers at the end of the day.  
   - If something must stay up (e.g. demo site), put it on the smallest tier that still works.

2. **Monthly hygiene**

   Once per month (calendar reminder):

   - Check **Cost Management → Cost analysis** for the subscription. 
   - Check **Cost Management → Budgets → dev-rg-monthly-budget**: 
     - Are alerts being sent?
     - Did we get close to 50 £?
   - Delete any “orphan” resources not referenced in Terraform.

3. **CI usage**

   - Nx Cloud + Chromatic runs only on:
     - PRs targeting `main`
     - pushes to `main`
   - No scheduled (“cron”) jobs that run 24/7.

---

## 4. Emergency path to (almost) zero cost

In a **cost emergency** (bill spike, budget emails firing, or bank card pain), follow the separate runbook:

- `docs/runbooks/emergency-cost-kill-switch.md`

At a high level, that runbook does three things:

1. **Freeze change** – stop new deployments and merges.
2. **Destroy or scale down** the dev environment from Terraform.
3. **Confirm** in Azure Cost Management that burn has dropped.

This document is the design; the runbook is the step-by-step procedure.

---

## 5. Re-starting after a shutdown

When we’ve used the kill-switch and want to come back:

1. Confirm we’re comfortable with the **current monthly spend** target (50 £ by default).
2. From a trusted machine:

   ```bash
   cd ~/dev/blackbird-os/infra/terraform
   terraform init
   terraform plan
   terraform apply
