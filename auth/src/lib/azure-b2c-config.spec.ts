import { devAzureB2CConfig } from "./azure-b2c-config";

describe("devAzureB2CConfig", () => {
  it("has safe placeholder defaults", () => {
    expect(devAzureB2CConfig.tenantId).toBeTruthy();
    expect(devAzureB2CConfig.clientId).toBeTruthy();
  });
});
