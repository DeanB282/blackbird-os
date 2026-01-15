# Emergency Cost Kill Switch – Blackbird OS (dev)

Severity: **SEV-1**  
Owner: **Dean Barnes** (founder)  
Scope: **Azure subscription that contains `blackbird-os-dev-rg`**

This runbook is the “oh shit, the bill is spiking” button.

**Goal:** Stop or minimise **dev** spend within minutes, then figure out why.

Production environments are **out of scope** (none yet).

---

## 1. When to run this

Run this if **any** of the following happen:

- You receive **budget alert emails** from Azure for `dev-rg-monthly-budget` (50%, 80% or 100%).
- You see an **unexpected cost jump** in Azure Cost Management.
- Your card / bank shows a higher-than-expected Azure charge from this subscription.
- You are about to pause Blackbird OS development and want costs as low as possible.

If in doubt, **run it** – it’s safer to shut things down and bring them back than to leak money.

Record in your notes / handover log that the kill switch was triggered, by whom, and why.

---

## 2. Preconditions

You must have:

- Access to the **Azure Portal** for the subscription.
- Access to **HCP Terraform** workspace `blackbird-os-dev`.
- Local dev environment with Terraform configured (WSL with repo checked out).

Paths:

- Repo root: `~/dev/blackbird-os`
- Terraform: `~/dev/blackbird-os/infra/terraform`

---

## 3. Step 1 – Confirm it’s real and find the top spender

1. Go to **Azure Portal → Cost Management + Billing → Cost analysis**.
2. Set **Scope** to the subscription that contains `blackbird-os-dev-rg`.
3. Group by:
   - **Resource group**
   - Then **Resource type** (optional, for more detail).

Confirm:

- The spike is real (not just month boundary).
- The main culprit is the **dev resource group** `blackbird-os-dev-rg`.

If the cost spike is **outside** `blackbird-os-dev-rg`, fix that first and
update infra docs / Terraform later as needed.

---

## 4. Step 2 – Freeze further changes

We don’t want more changes landing while you’re in a cost incident.

### 4.1 Ensure `main` is fully protected (and optionally locked)

1. Go to **GitHub → DeanB282/blackbird-os → Settings → Branches**.
2. Edit the branch protection rule for `main`.
3. Make sure these are ticked:

   - ✅ Require a pull request before merging  
   - ✅ Require approvals (at least 1)  
   - ✅ Require status checks to pass before merging  
   - ✅ Require signed commits  
   - ✅ Require linear history  
   - ✅ Do not allow bypassing the above settings  

4. Optional hard freeze during the incident:

   - ✅ **Lock branch**

   This makes `main` read-only until you untick it.

### 4.2 Pause expensive CI if needed

If CI ends up running things that hit paid infra later:

1. Go to **GitHub → Actions → Workflows**.
2. Temporarily **Disable** any workflows that provision infra or run heavy
   dev environments.
3. You can re-enable them once the incident is resolved.

For Phase A, CI costs are basically negligible, but the steps above are here
for future you.

---

## 5. Step 3 – Execute the dev kill switch (Terraform)

For Phase A, the safest emergency action is to **destroy everything Terraform
manages in the dev resource group**.

> ⚠️ This will delete dev infrastructure. That’s fine – dev is meant to be
> reproducible from code. Do **not** run this on any future prod environment.

From WSL:

```bash
cd ~/dev/blackbird-os/infra/terraform

# Make sure backend + provider are good
terraform init

# Safety: see what will be destroyed
terraform plan -destroy -out=tfplan-destroy
