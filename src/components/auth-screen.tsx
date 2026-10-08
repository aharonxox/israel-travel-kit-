"use client";

import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import type { UserStatus } from "@/lib/demo-session";

type AuthScreenProps = {
  onSelect: (status: UserStatus) => void;
  notice?: string | null;
};

export default function AuthScreen({ onSelect, notice }: AuthScreenProps) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 px-5 py-12 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-purple-600/25 blur-3xl" />
      </div>
      <section aria-labelledby="welcome-title" className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white/5 p-7 shadow-2xl backdrop-blur-xl sm:p-9">
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
          <Compass aria-hidden="true" className="h-7 w-7" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Local app preview</p>
        <h1 id="welcome-title" className="mt-3 text-3xl font-semibold tracking-tight">Your next chapter starts here.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300">Choose a demo session to explore the app. Your choice stays on this device when browser storage is available.</p>
        <div className="mt-7 space-y-3">
          <button type="button" onClick={() => onSelect("premium")} aria-describedby="demo-disclosure" className="flex w-full items-center justify-between rounded-2xl bg-blue-500 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-95">
            <span>Create Account / Sign In</span><ArrowRight aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => onSelect("guest")} className="w-full rounded-2xl border border-white/20 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 active:scale-95">Continue as Guest</button>
        </div>
        <p id="demo-disclosure" className="mt-6 flex items-start gap-2 text-xs leading-6 text-slate-300"><ShieldCheck aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" /><span>Demo only: the first button selects Premium preview. No account is created, no payment is taken, and this does not grant paid access.</span></p>
        {notice && <p role="status" className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-3 text-xs leading-6 text-amber-100">{notice}</p>}
      </section>
    </main>
  );
}
