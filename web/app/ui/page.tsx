"use client";

import { HelloCard } from "@blackbird-os/ui";

export default function UIShowcasePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <HelloCard />
      </div>
    </main>
  );
}
