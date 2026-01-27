# Azure OIDC Posture (GitHub Actions → Azure) — Phase A Fortress

## Status
**Posture documented in Phase A.**
**Implementation deferred to Phase B** (when Terraform applies are automated in CI).

## Intent
Eliminate long-lived Azure credentials stored in GitHub Secrets.

**Target end-state:** GitHub Actions authenticates to Azure using **OIDC federation** (short-lived tokens) via `azure/login`, with **least-privilege** access scoped to the required Resource Group.

This prevents the common acquisition red-flag:
> “Your CI pipeline uses long-lived cloud credentials.”

---

## Current Phase A Reality
- Phase A runs Terraform **manually** from a developer machine.
- No automated Terraform applies in GitHub Actions.
- Therefore, **no Azure credentials are required in GitHub Secrets** for Phase A.

**Clear statement:**  
✅ Phase A runs Terraform manually; Phase B automates with OIDC.

---

## Phase B Implementation Plan (No Secrets)
### High-level steps
1) Create an Azure AD App Registration (service principal identity for CI).
2) Configure a **Federated Credential** for GitHub Actions:
   - Trusts tokens from GitHub OIDC provider
   - Restricted to:
     - repo: `OWNER/REPO`
     - branch: `refs/heads/main` (or environment)
3) Assign least-privilege roles at **Resource Group scope**:
   - Prefer `Contributor` at RG scope for early build-out
   - Tighten later to custom role / specific roles if needed
4) Update GitHub Actions workflow to use `azure/login` with OIDC:
   - No client secret
   - Uses OIDC token exchange
5) Run Terraform in CI using the federated identity.

---

## Prerequisites / Inputs (To be filled when Phase B begins)
- Azure Tenant ID: `<TENANT_ID>`
- Azure Subscription ID: `<SUBSCRIPTION_ID>`
- Target Resource Group: `<RG_NAME>`
- GitHub Repo: `<OWNER>/<REPO>`
- Allowed Branch: `refs/heads/main`
- (Optional) GitHub Environment: `<environment-name>` (recommended for additional policy control)

---

## Azure Setup (Phase B) — Detailed Outline
### Option A: Azure Portal (preferred for clarity)
1) Azure Portal → Microsoft Entra ID → **App registrations** → New registration  
   - Name: `blackbird-os-gha-oidc`
   - Single tenant (typical)
2) App Registration → **Certificates & secrets**
   - **Do not** create client secrets.
3) App Registration → **Federated credentials** → Add credential  
   - Credential scenario: GitHub Actions deploying Azure resources  
   - Org/Repo: `<OWNER>/<REPO>`
   - Entity type: Branch
   - Branch: `main`
   - Name: `gha-main-oidc`
4) Azure Portal → Subscriptions → `<SUBSCRIPTION>` → Access control (IAM)  
   - Scope: **Resource Group** `<RG_NAME>` (not subscription-wide)
   - Add role assignment:
     - Role: `Contributor` (Phase B initial)
     - Assign access to: User, group, or service principal
     - Select: `blackbird-os-gha-oidc`

### Option B: Azure CLI (repeatable)
(Exact commands are added in Phase B when IDs are final and the RG exists.)

---

## GitHub Actions (Phase B) — Planned Workflow Use
- Use `azure/login@v2` with OIDC.
- GitHub workflow requires:
  - `permissions: id-token: write`
  - `permissions: contents: read`

Example (Phase B only, not enabled in Phase A):

```yaml
permissions:
  id-token: write
  contents: read

steps:
  - uses: actions/checkout@v4

  - name: Azure Login (OIDC)
    uses: azure/login@v2
    with:
      client-id: ${{ secrets.AZURE_CLIENT_ID }}
      tenant-id: ${{ secrets.AZURE_TENANT_ID }}
      subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

  - name: Terraform Apply
    run: |
      cd infra/terraform
      terraform init
      terraform apply -auto-approve
