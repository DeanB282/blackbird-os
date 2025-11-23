import { HelloCard } from "@blackbird-os/ui";
export * from "./lib/HelloCard";
export default function UIShowcasePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">
          Blackbird OS · UI Showcase
        </p>

        <HelloCard />

        <p className="mt-6 text-xs text-slate-500">
          This route renders{" "}
          <code className="text-[11px]">HelloCard</code> from the shared{" "}
          <code className="text-[11px]">@blackbird-os/ui</code> library. It
          should always match the Storybook HelloCard story.
        </p>
      </div>
    </main>
  );
}
