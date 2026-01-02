variable "budget_alert_email" {
  description = "Email address to receive Azure dev RG budget alerts"
  type        = string
}

resource "azurerm_consumption_budget_resource_group" "core_budget" {
  name              = "dev-rg-monthly-budget"
  resource_group_id = azurerm_resource_group.core.id

  amount     = 50
  time_grain = "Monthly"

  time_period {
    start_date = "2026-01-01T00:00:00Z"
    end_date   = "2031-01-01T00:00:00Z"
  }

  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 80
    threshold_type = "Actual"
    contact_emails = [var.budget_alert_email]
  }

  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 100
    threshold_type = "Actual"
    contact_emails = [var.budget_alert_email]
  }
}
