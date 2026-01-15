# Emergency cost kill-switch – Blackbird OS

Severity: **SEV-1**  
Owner: **Dean Barnes** (founder)  
Applies to: **Azure subscription used by `blackbird-os-dev-rg`**

This runbook is the “oh shit, the bill is spiking” button.  
Goal: **Stop or minimise spend within minutes**, then figure out why.

---

## 1. When to run this

Run this if **any** of the following happen:

- You receive **budget alert emails** from Azure for `dev-rg-monthly-budget` (80% or 100%).  
- You see an **unexpected cost jump** in Azure Cost Management.  
- Your card / bank shows a higher-than-expected Azure charge.  
- You are about to pause Blackbird OS development for a while and want costs as low as possible.

If in doubt, **run it** – it’s safer to shut things down and bring them back than to leak money.

---

## 2. Preconditions

You must have:

- Access to the **Azure Portal** for the subscription.  
- Access to **Terraform Cloud** workspace `blackbird-os-dev`.  
- Local dev environment with Terraform configured (WSL with repo checked out).

Repo paths:

- Code: `~/dev/blackbird-os`
- Terraform: `~/dev/blackbird-os/infra/terraform`

---

## 3. Step 1 – Confirm it’s real and identify the top spender

1. Go to **Azure Portal → Cost Management + Billing → Cost analysis**.
2. Filter by:
   - Scope: the subscription used for Blackbird OS.
   - Group by: **Resource group** and then **Resource type**.
3. Confirm the spike is real (not just a new month starting) and note:
   - Which **resource group** is the main culprit (should be `blackbird-os-dev-rg`).  
   - Which **services** are responsible (e.g. App Service, DB, storage, etc.) once they exist.

If the cost spike is somewhere **outside** `blackbird-os-dev-rg`, fix that first and **update our Terraform / docs** so it can’t happen again.

---

## 4. Step 2 – Freeze further changes

We don’t want more deployments while we’re in an incident.

### 4.1 Lock the `main` branch

1. Go to **GitHub → blackbird-os → Settings → Branches**.
2. Edit the branch protection rule for `main`.
3. Make sure these are ticked:

   - ✅ Require a pull request before merging  
   - ✅ Require status checks to pass before merging  
   - ✅ Require signed commits  
   - ✅ Require linear history  
   - ✅ Do not allow bypassing the above settings  

4. Optionally (hard freeze), also tick:

   - ✅ **Lock branch**

   This makes `main` read-only until you untick it.

### 4.2 Pause CI if needed

If CI load is contributing to cost (e.g. heavy tests on paid infra):

1. Go to **GitHub → Actions → Workflows**.  
2. Temporarily **Disable** any expensive workflows (you can re-enable later).

---

## 5. Step 3 – Kill or shrink the dev environment via Terraform

For Phase A, the safest emergency action is to **destroy everything Terraform manages** in the dev resource group.

> ⚠️ This will delete dev infrastructure. That’s fine – it’s meant to be reproducible from code.

From WSL:

```bash
cd ~/dev/blackbird-os/infra/terraform

# Make sure you are logged in to Terraform Cloud if needed
terraform init

# See what will be destroyed (sanity check)
terraform plan -destroy

# If the plan looks correct, run the destroy
terraform apply -destroy
