# Terraform Provider / Module Upgrade Process

## Purpose
This repository commits `.terraform.lock.hcl` to lock Terraform provider versions and checksums for reproducible, auditable infrastructure builds.

## Mandatory Rules
- `.terraform.lock.hcl` MUST be committed to the repository.
- Provider upgrades MUST be intentional and performed via Pull Request.
- No floating dependencies:
  - Providers must be version constrained.
  - Modules must be version-pinned (registry version or git tag/commit).
  - Never reference `main`, `master`, or unversioned modules.

## When to Upgrade Providers
Upgrade providers only when:
- A security advisory requires it
- A required feature or bugfix is released
- A scheduled infrastructure maintenance window exists

## Intentional Upgrade Procedure

```bash
cd infra/terraform
terraform init -upgrade
terraform plan
