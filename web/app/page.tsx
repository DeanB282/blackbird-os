import Link from "next/link";
import { auth, signOut } from "../auth";
import { ArrowRightIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";

type DevUser = { email?: string | null; role?: string | null; name?: string | null };

export default async function HomePage() {
  const session = await auth();
  const user = session?.user as DevUser;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800/60 bg-slate-900/70 shadow-2xl shadow-sky-900/10 backdrop-blur-sm p-8 space-y-8 animate-fade-in">

        {/* Header with live indicator */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-400 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Blackbird OS
            </p>
            <h1 className="mt-2 text-3xl font-bold bg-gradient-to-r from-slate-100 to-sky-300 bg-clip-text text-transparent">
              Dev Auth Sandbox
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              A safe, isolated environment to validate authentication flows and role gating before we wire real tenants.
            </p>
          </div>

          {user && (
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
              <ShieldCheckIcon className="w-3 h-3" />
              {user.email}
            </div>
          )}
        </header>

        {/* Session + shortcuts */}
        <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* Session status card */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/60 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-slate-400" />
                Session status
              </h2>

              {!user ? (
                <Link
                  href="/api/auth/signin"
                  className="inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/10 px-3 py-1 text-[11px] font-medium text-sky-100 hover:bg-sky-500/20 transition"
                >
                  Sign in
                  <ArrowRightIcon className="w-3 h-3" />
                </Link>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-[11px] font-medium text-slate-100 hover:bg-slate-700 transition"
                  >
                    Sign out
                  </button>
                </form>
              )}
            </div>

            <p className="text-xs text-slate-400">Raw NextAuth session object for debugging.</p>

            <div className="mt-1 rounded-lg bg-slate-900 text-xs font-mono text-slate-100 p-3 overflow-x-auto border border-slate-800">
              <pre>{JSON.stringify(user ?? null, null, 2)}</pre>
            </div>
          </div>

          {/* Dev shortcuts card */}
          <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4 space-y-3">
            <h2 className="text-sm font-semibold">Dev shortcuts</h2>
            <p className="text-xs text-slate-400">Quick links into protected areas.</p>

            <ul className="mt-1 space-y-2 text-sm">
              <li>
                <Link href="/protected" className="flex items-center justify-between rounded-md p-2 hover:bg-slate-800/50 transition">
                  <span className="text-sky-300">/protected</span>
                  <span className="text-xs text-slate-500">session JSON</span>
                </Link>
              </li>
              <li>
                <Link href="/partner" className="flex items-center justify-between rounded-md p-2 hover:bg-slate-800/50 transition">
                  <span className="text-sky-300">/partner</span>
                  <span className="text-xs text-slate-500">partner dashboard</span>
                </Link>
              </li>
            </ul>

            <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
              Tip: use the email / password in <code className="text-xs">.env.local</code> on the sign-in screen.
            </p>
          </div>
        </section>

        {/* Footer note */}
        <footer className="pt-4 border-t border-slate-800/60">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            This screen is for developers only and will be replaced by the real Blackbird OS UI later.
          </p>
        </footer>
      </div>
    </main>
  );
}
