import { hasRole, hasAnyRole, type RbacClaims } from "./rbac";

const baseUser: RbacClaims = {
  userId: "user-1",
  email: "youremail@example.com",
  tenantId: "tenant-1",
  roles: ["platform:owner"],
};

describe("RBAC helpers", () => {
  it("detects a single role", () => {
    expect(hasRole(baseUser, "platform:owner")).toBe(true);
    expect(hasRole(baseUser, "partner:admin")).toBe(false);
  });

  it("detects any of a set of roles", () => {
    expect(
      hasAnyRole(baseUser, ["partner:admin", "platform:owner"]),
    ).toBe(true);
  });
});
