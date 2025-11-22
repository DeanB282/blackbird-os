import { auth, signOut } from "@/auth";

export default async function ProtectedPage() {
  const session = await auth();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Protected area</h1>
      <pre className="bg-slate-100 p-4 rounded-md text-sm">
        {JSON.stringify(session, null, 2)}
      </pre>
    </main>
  );
}
