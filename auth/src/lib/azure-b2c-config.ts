// auth/src/lib/azure-b2c-config.ts

export interface AzureB2CTenantConfig {
  tenantId: string;
  tenantName: string;
  clientId: string;
  clientSecret?: string;
  policySignIn: string;
  policyEditProfile: string;
  policyPasswordReset: string;
}

/**
 * Skeleton Azure B2C config for dev.
 * All values default to obvious placeholders so we can commit safely.
 */
export const devAzureB2CConfig: AzureB2CTenantConfig = {
  tenantId:
    process.env.AZURE_B2C_TENANT_ID ?? "00000000-0000-0000-0000-000000000000",
  tenantName:
    process.env.AZURE_B2C_TENANT_NAME ?? "your-tenant.onmicrosoft.com",
  clientId:
    process.env.AZURE_B2C_CLIENT_ID ?? "00000000-0000-0000-0000-000000000000",
  clientSecret: process.env.AZURE_B2C_CLIENT_SECRET,
  policySignIn: process.env.AZURE_B2C_POLICY_SIGNIN ?? "B2C_1_sign_in",
  policyEditProfile:
    process.env.AZURE_B2C_POLICY_EDITPROFILE ?? "B2C_1_profile_edit",
  policyPasswordReset:
    process.env.AZURE_B2C_POLICY_PASSWORDRESET ?? "B2C_1_password_reset",
};
