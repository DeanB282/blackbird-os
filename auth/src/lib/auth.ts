// Shared auth types and Azure AD B2C skeleton config for Blackbird OS.
//
// Phase A: we only define types and a dev placeholder. In Phase B we will
// move real values to environment variables / Key Vault and plug this into
// NextAuth + MSAL.

export type AuthProvider = "azure-ad-b2c";

export type AuthEnvironment = "dev" | "staging" | "prod";

export interface AzureB2CTenantConfig {
  tenantName: string; // e.g. "contoso"
  tenantId: string; // GUID as string
  clientId: string;
  redirectUri: string;
  postLogoutRedirectUri: string;
  signInPolicy: string;
  editProfilePolicy?: string;
  resetPasswordPolicy?: string;
}

export interface AuthConfig {
  provider: AuthProvider;
  environment: AuthEnvironment;
  azureB2C: AzureB2CTenantConfig;
}

// Dev-only placeholder. Replace in Phase B with env-driven values.
export const DEV_AUTH_CONFIG: AuthConfig = {
  provider: "azure-ad-b2c",
  environment: "dev",
  azureB2C: {
    tenantName: "placeholder-tenant",
    tenantId: "00000000-0000-0000-0000-000000000000",
    clientId: "00000000-0000-0000-0000-000000000000",
    redirectUri: "http://localhost:3000/api/auth/callback/azureb2c",
    postLogoutRedirectUri: "http://localhost:3000",
    signInPolicy: "B2C_1_SignInOrSignUp",
  },
};
