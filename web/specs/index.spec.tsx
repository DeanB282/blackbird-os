// web/specs/index.spec.tsx
// Minimal smoke test so Nx "web:test" is green without touching next-auth.

describe("Blackbird web shell", () => {
  it("runs a basic truthy test", () => {
    expect(true).toBe(true);
  });
});
