terraform {
  # Match the version you have installed
  required_version = ">= 1.14.0"

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "blackbird-os" # <-- your real org name

    workspaces {
      name = "blackbird-os-dev" # <-- your real workspace name
    }
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.6"
    }
  }
}

provider "azurerm" {
  features {}

  # Explicitly tell Terraform which subscription to use
  subscription_id = "30ecb3b9-0171-4600-9502-2cbe3af0ebc3"
}

locals {
  project     = "blackbird-os"
  environment = "dev"
  location    = "uksouth"

  resource_group_name = "${local.project}-${local.environment}-rg"
}

# Baseline dev resource group for Blackbird OS
resource "azurerm_resource_group" "core" {
  name     = local.resource_group_name
  location = local.location

  tags = {
    project     = local.project
    environment = local.environment
    owner       = "engineering"
  }
}
