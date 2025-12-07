// Core RBAC types shared across Blackbird OS services.
// Phase A: kept deliberately simple. Phase B can extend
// with fine-grained permissions and policy evaluation.

export type TenantKind = "partner" | "client";

export type RoleId =
  | "owner"
  | "bb-engineer"
  | "partner-admin"
  | "partner-analyst"
  | "client-admin"
  | "client-analyst"
  | "viewer";

export type PermissionScope =
  | "ce.read"
  | "ce.write"
  | "ce.approve"
  | "tenant.manage"
  | "user.manage"
  | "billing.read"
  | "billing.write";

export interface RoleDefinition {
  id: RoleId;
  label: string;
  description: string;
  scopes: PermissionScope[];
}

export const CORE_ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    id: "owner",
    label: "Workspace Owner",
    description:
      "Full control over the Blackbird OS workspace, including billing and tenant management.",
    scopes: [
      "ce.read",
      "ce.write",
      "ce.approve",
      "tenant.manage",
      "user.manage",
      "billing.read",
      "billing.write",
    ],
  },
  {
    id: "bb-engineer",
    label: "Blackbird Engineer",
    description:
      "Internal engineer with rights to assist partners and tenants during onboarding.",
    scopes: ["ce.read", "ce.write", "tenant.manage", "user.manage"],
  },
  {
    id: "partner-admin",
    label: "Partner Admin",
    description:
      "MSP / broker admin for a partner tenant, with full rights for their own downstream clients.",
    scopes: ["ce.read", "ce.write", "ce.approve", "tenant.manage", "user.manage"],
  },
  {
    id: "partner-analyst",
    label: "Partner Analyst",
    description:
      "Partner user who prepares CE evidence and reports but does not manage users.",
    scopes: ["ce.read", "ce.write"],
  },
  {
    id: "client-admin",
    label: "Client Admin",
    description:
      "Customer admin for a single SME, allowed to manage their own users and CE runs.",
    scopes: ["ce.read", "ce.write", "user.manage"],
  },
  {
    id: "client-analyst",
    label: "Client Analyst",
    description:
      "Customer user who prepares and uploads CE evidence for their own organisation.",
    scopes: ["ce.read", "ce.write"],
  },
  {
    id: "viewer",
    label: "Read-only Viewer",
    description: "Can view dashboards and reports only.",
    scopes: ["ce.read", "billing.read"],
  },
];

export type PrincipalType = "user" | "service" | "automation";

export interface RoleAssignment {
  principalId: string; // e.g. Azure AD object id
  principalType: PrincipalType;
  tenantId: string;
  tenantKind: TenantKind;
  roles: RoleId[];
  createdAt: string; // ISO timestamp
  createdBy: string; // principal id of creator
}
