import { auth, signOut } from "../../auth"

export default async function PartnerPage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="p-8">
        <h1 className="text-xl font-semibold">Not signed in</h1>
        <p className="mt-2 text-sm text-gray-600">
          You need to sign in to view the partner dashboard.
        </p>
      </main>
    );
  }

  const role = (session.user as any).role ?? "user";

  if (role !== "partner") {
    return (
      <main className="p-8">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="mt-2 text-sm text-gray-600">
          Your account is not marked as a partner.
        </p>
      </main>
    );
  }

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Partner dashboard</h1>
      <p className="text-sm text-gray-600">
        Welcome, {session.user?.email ?? "partner"}.
      </p>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="inline-flex items-center rounded-md border px-3 py-1 text-sm"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
