resource "azurerm_consumption_budget_resource_group" "core_budget" {
  name              = "dev-rg-monthly-budget"
  resource_group_id = azurerm_resource_group.core.id

  # Monthly spend limit in your subscription currency
  amount     = 50
  time_grain = "Monthly"

  # Azure rule: start_date for a monthly budget must be
  # this month or a future month, and on the first of the month.
  time_period {
    start_date = "2025-12-01T00:00:00Z"
    end_date   = "2026-12-01T00:00:00Z"
  }

  # 100% alert – hard kill-switch signal
  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 100
    threshold_type = "Actual"

    contact_emails = [
      "youremail@example.com",
    ]

    contact_roles  = []
    contact_groups = []
  }

  # 80% early warning
  notification {
    enabled        = true
    operator       = "GreaterThan"
    threshold      = 80
    threshold_type = "Actual"

    contact_emails = [
      "youremail@example.com",
    ]

    contact_roles  = []
    contact_groups = []
  }
}
