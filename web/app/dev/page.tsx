"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowTopRightOnSquareIcon, CommandLineIcon, ShieldCheckIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

/* ---------- Glowing Cursor Tracer ---------- */
const useGlowingCursor = () => {
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const t = document.getElementById("cursor-tracer");
      if (!t) return;
      t.style.left = `${e.clientX}px`;
      t.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
};

/* ---------- 3-D Tilt Card ---------- */
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`group relative rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6 shadow-2xl shadow-black/40 transition-all duration-500 hover:!scale-105 hover:border-sky-400/50 ${className}`}
    style={{ transformStyle: "preserve-3d" }}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale3d(1.02, 1.02, 1.02)`;
    }}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)")}
  >
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
    <div className="relative">{children}</div>
  </div>
);

/* ---------- Glass KPI Tile ---------- */
const KPITile = ({ value, label, unit }: { value: string | number; label: string; unit?: string }) => (
  <div className="rounded-lg border border-slate-800/80 bg-slate-900/40 px-3 py-2 backdrop-blur-sm">
    <div className="text-[10px] uppercase tracking-widest text-slate-500">{label}</div>
    <div className="mt-1 text-lg font-semibold text-slate-100">
      {value}
      {unit && <span className="ml-1 text-sm text-slate-400">{unit}</span>}
    </div>
  </div>
);

/* ---------- Shortcuts ---------- */
const shortcuts = [
  { label: "Dev Auth Sandbox", href: "/", description: "Session JSON & role-gating sanity-check.", icon: ShieldCheckIcon },
  { label: "Protected Route", href: "/protected", description: "Auth-guarded dump of live session object.", icon: CommandLineIcon },
  { label: "Partner Dashboard", href: "/partner", description: "role=\"partner\" gated CE pipeline preview.", icon: Squares2X2Icon },
  { label: "Storybook", href: "http://localhost:38415", description: "Visual contract for the Blackbird UI system.", external: true, icon: ArrowTopRightOnSquareIcon },
];

export default function DevControlPanel() {
  useGlowingCursor();
  const [slaHit, setSlaHit] = useState(98.7);
  const [lastDeploy] = useState("2 min ago");

  useEffect(() => {
    const t = setInterval(() => setSlaHit((p) => (p > 99 ? 95 : p + 0.1)), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-slate-50 overflow-hidden">
      {/* Ambient light rays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Glowing cursor tracer */}
      <div
        id="cursor-tracer"
        className="pointer-events-none fixed top-0 left-0 w-6 h-6 rounded-full bg-sky-400 blur-md transition-transform duration-75 z-50"
      ></div>

      {/* Glass header bar */}
      <header className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 backdrop-blur-xl border-b border-slate-800/30 bg-slate-950/20">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-400">Blackbird OS · Dev Surface</p>
        </div>
        <div className="flex items-center gap-3">
          <KPITile value={slaHit} label="SLA Hit" unit="%" />
          <KPITile value={lastDeploy} label="Last Deploy" />
        </div>
      </header>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 pt-24 pb-12 lg:flex-row lg:gap-16">
        {/* Left column – hero & deep cards */}
        <section className="flex-1 space-y-12">
          <header className="space-y-4">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-50 to-sky-300 bg-clip-text text-transparent">
              Developer control panel
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              A single place to sanity-check auth, routes, and the UI design system before we wire real tenants and CE pipelines.
            </p>
          </header>

          <TiltCard>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4 text-sky-400" />
                  Auth & role-gated routes
                </h2>
                <p className="mt-2 text-xs text-slate-400">Use the dev credentials from <code>.env.local</code> on the sign-in screen.</p>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li>• <code>/protected</code> must redirect when logged out.</li>
                  <li>• <code>/partner</code> allows only role="partner".</li>
                  <li>• Root page shows live NextAuth session JSON.</li>
                </ul>
              </div>
              <div className="hidden sm:block ml-4 text-5xl text-sky-400/20 group-hover:text-sky-400/60 transition">01</div>
            </div>
          </TiltCard>

          <TiltCard>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <Squares2X2Icon className="w-4 h-4 text-emerald-400" />
                  UI library & Storybook
                </h2>
                <p className="mt-2 text-xs text-slate-400">The HelloCard in Storybook is our baseline Blackbird UI token test.</p>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li>• Run <code>pnpm nx run @blackbird-os/ui:storybook</code>.</li>
                  <li>• Visit the Storybook shortcut below.</li>
                  <li>• Treat this as the visual contract for partners.</li>
                </ul>
              </div>
              <div className="hidden sm:block ml-4 text-5xl text-emerald-400/20 group-hover:text-emerald-400/60 transition">02</div>
            </div>
          </TiltCard>

          <TiltCard>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <CommandLineIcon className="w-4 h-4 text-violet-400" />
                  Workspace scripts (Nx + pnpm)
                </h2>
                <p className="mt-2 text-xs text-slate-400">These are the commands CI runs on every push. If they pass locally, GitHub should be green.</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3 text-[11px] font-mono text-slate-200">
                  <div className="rounded-lg border border-slate-800/80 bg-slate-900/70 p-3"><p className="text-[10px] uppercase tracking-widest text-slate-500">Lint</p><p className="mt-1">pnpm lint</p></div>
                  <div className="rounded-lg border border-slate-800/80 bg-slate-900/70 p-3"><p className="text-[10px] uppercase tracking-widest text-slate-500">Tests</p><p className="mt-1">pnpm test</p></div>
                  <div className="rounded-lg border border-slate-800/80 bg-slate-900/70 p-3"><p className="text-[10px] uppercase tracking-widest text-slate-500">Storybook</p><p className="mt-1">pnpm nx run @blackbird-os/ui:storybook</p></div>
                </div>
              </div>
              <div className="hidden sm:block ml-4 text-5xl text-violet-400/20 group-hover:text-violet-400/60 transition">03</div>
            </div>
          </TiltCard>
        </section>

        {/* Right column – shortcuts */}
        <aside className="w-full max-w-sm space-y-4">
          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/70 p-5 shadow-lg shadow-black/40">
            <h2 className="text-sm font-semibold text-slate-100">Quick navigation</h2>
            <p className="mt-2 text-xs text-slate-400">Jump straight into the main dev surfaces.</p>
            <ul className="mt-4 space-y-2.5">
              {shortcuts.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2.5 text-xs hover:border-sky-500/70 hover:bg-slate-900 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-sky-400" />
                        <span className="font-medium text-sky-300">{item.label}</span>
                      </span>
                      <span className="text-[10px] text-slate-500">opens in new tab ↗</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/60 px-3 py-2.5 text-xs hover:border-sky-500/70 hover:bg-slate-900 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-sky-400" />
                        <span className="font-medium text-sky-300">{item.label}</span>
                      </span>
                      <ArrowTopRightOnSquareIcon className="w-3 h-3 text-slate-500" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800/70 bg-slate-950/80 p-4 text-[11px] text-slate-400 space-y-1.5">
            <p>This page is dev-only. In production it should be locked behind staff SSO or removed.</p>
            <p>If something looks wrong here, fix it before touching real tenant data or partner traffic.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
