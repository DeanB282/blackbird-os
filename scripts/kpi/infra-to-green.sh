#!/usr/bin/env bash
set -euo pipefail
start=$(date +%s)

cd infra/terraform
terraform init
terraform plan

end=$(date +%s)
echo "INFRA_TO_GREEN_SECONDS=$((end-start))"
