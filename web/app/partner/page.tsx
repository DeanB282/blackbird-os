// web/app/partner/page.tsx
import Link from "next/link";
import { auth, signOut } from "../../auth";

type DevUser = {
  email?: string | null;
  role?: string | null;
  name?: string | null;
};

export default async function PartnerDashboardPage() {
  const session = await auth();
  const user = session?.user as DevUser | undefined;

  // Gate by role: only partners see the dashboard
  if (!user || user.role !== "partner") {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-slate-800/60 bg-slate-900/70 shadow-2xl shadow-sky-900/10 backdrop-blur-sm p-8 space-y-4">
          <h1 className="text-xl font-semibold">Not signed in</h1>
          <p className="text-sm text-slate-400">
            You need to sign in with a partner account to view the partner dashboard.
          </p>
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center justify-center rounded-full border border-sky-500/70 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100 hover:bg-sky-500/20 transition"
          >
            Go to sign-in
          </Link>

          <p className="text-[11px] text-slate-500 pt-2">
            Dev tip: use the partner credentials from <code>.env.local</code>.
          </p>
        </div>
      </main>
    );
  }

  const displayName = user.email ?? user.name ?? "partner";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl rounded-2xl border border-slate-800/60 bg-slate-900/70 shadow-2xl shadow-sky-900/10 backdrop-blur-sm p-8 space-y-8">
        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400">
              Partner dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold bg-gradient-to-r from-slate-100 to-sky-300 bg-clip-text text-transparent">
              Welcome, {displayName}.
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              This screen will eventually show your active CE projects, tenants, and submission
              status. For now it is a safe sandbox for wiring auth and roles.
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-700 transition"
            >
              Sign out
            </button>
          </form>
        </header>

        {/* Main grid */}
        <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* Pipeline overview */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-5 space-y-3">
            <h2 className="text-sm font-semibold">Pipeline overview</h2>
            <p className="text-xs text-slate-400">
              Placeholder: in Phase B this becomes a live view of partner CE pipelines with SLA
              timers.
            </p>

            <ul className="mt-2 space-y-1 text-sm text-slate-200">
              <li>• 0 active Express tracks</li>
              <li>• 0 active Fast-Track tenants</li>
              <li>• 0 upcoming CE+ assessor slots</li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-5 space-y-3">
            <h2 className="text-sm font-semibold">Quick links</h2>
            <p className="text-xs text-slate-400">Dev shortcuts while we build the real UI.</p>

            <ul className="mt-2 space-y-2 text-sm">
              <li>
                <Link
                  href="/protected"
                  className="text-sky-300 hover:text-sky-200 hover:underline"
                >
                  View raw session JSON
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sky-300 hover:text-sky-200 hover:underline">
                  Back to Dev Auth Sandbox
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-4 border-t border-slate-800/60">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Dev note: this page is partner-only (<code>role="partner"</code>). In production the
            content here will be replaced with the real partner control panel for Blackbird OS.
          </p>
        </footer>
      </div>
    </main>
  );
}
