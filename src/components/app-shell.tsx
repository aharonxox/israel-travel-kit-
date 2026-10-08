"use client";

import { useState } from "react";
import {
  CalendarDays,
  Compass,
  Languages,
  ScanLine,
  type LucideIcon,
} from "lucide-react";
import PlaceholderView from "./placeholder-view";
import TranslatorEngine from "./translator-engine";
import type { UserStatus } from "@/lib/demo-session";

type TabId = "translator" | "vision" | "jewish" | "events";

type Tab = {
  id: TabId;
  label: string;
  icon: LucideIcon;
};

const TABS: readonly Tab[] = [
  { id: "translator", label: "Text", icon: Languages },
  { id: "vision", label: "Scan", icon: ScanLine },
  { id: "jewish", label: "Tools", icon: Compass },
  { id: "events", label: "Events", icon: CalendarDays },
] as const;

const VIEWS: Record<
  TabId,
  { title: string; description: string; phaseLabel: string }
> = {
  translator: {
    title: "Text",
    description:
      "English → Hebrew translation that adapts to who is speaking and who is listening.",
    phaseLabel: "Translator arrives in a later phase",
  },
  vision: {
    title: "Scan",
    description:
      "Point the scanner at a screenshot and get an instant, useful insight.",
    phaseLabel: "Vision scanner arrives in a later phase",
  },
  jewish: {
    title: "Tools",
    description:
      "Everyday Jewish utilities — compass orientation and Shabbat times at a glance.",
    phaseLabel: "Jewish tools arrive in a later phase",
  },
  events: {
    title: "Events",
    description:
      "Discover what is on across Israel — parties and local events, browsable in one place.",
    phaseLabel: "Events hub arrives in a later phase",
  },
};

/**
 * App shell: the main layout with four switchable views and a fixed,
 * glassmorphism bottom navigation. Tab switching is pure client-side state —
 * no router navigation, no page reload.
 */
export default function AppShell({ userStatus, onSignOut, sessionNotice }: { userStatus: UserStatus; onSignOut: () => void; sessionNotice?: string | null }) {
  const [activeTab, setActiveTab] = useState<TabId>("translator");

  return (
    <div className="relative flex min-h-dvh flex-col bg-gradient-to-b from-blue-50 via-white to-purple-50 text-zinc-900">
      {/* Soft ambient accents behind the glass surfaces */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute bottom-24 -left-16 h-64 w-64 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-lg items-center justify-between gap-4 px-5 pt-6">
        <p className="text-xs font-semibold text-zinc-700">{userStatus === "premium" ? "Premium demo" : "Guest demo"}</p>
        <button type="button" onClick={onSignOut} className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95">Sign out / reset</button>
      </header>
      {sessionNotice && <p role="status" className="relative mx-auto mt-4 max-w-lg px-5 text-xs leading-6 text-amber-800">{sessionNotice}</p>}
      {/* Main content — bottom padding keeps it clear of the fixed nav */}
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 pb-40 pt-16">
        <span className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Targum
        </span>

        {/* Only the selected view is rendered */}
        {activeTab === "translator" && <TranslatorEngine userStatus={userStatus} />}
        {activeTab === "vision" && (
          <PlaceholderView
            userStatus={userStatus}
            icon={ScanLine}
            title={VIEWS.vision.title}
            description={VIEWS.vision.description}
            phaseLabel={VIEWS.vision.phaseLabel}
          />
        )}
        {activeTab === "jewish" && (
          <PlaceholderView
            userStatus={userStatus}
            icon={Compass}
            title={VIEWS.jewish.title}
            description={VIEWS.jewish.description}
            phaseLabel={VIEWS.jewish.phaseLabel}
          />
        )}
        {activeTab === "events" && (
          <PlaceholderView
            userStatus={userStatus}
            icon={CalendarDays}
            title={VIEWS.events.title}
            description={VIEWS.events.description}
            phaseLabel={VIEWS.events.phaseLabel}
          />
        )}
      </main>

      {/* Fixed bottom navigation — glassmorphism island, safe-area aware */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2"
      >
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-1.5 shadow-xl shadow-zinc-900/10 backdrop-blur-xl">
          <ul className="flex items-stretch gap-1" role="tablist">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              const Icon = tab.icon;
              return (
                <li key={tab.id} className="flex-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full flex-col items-center gap-1 rounded-2xl px-2 py-2.5 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 ${
                      isActive
                        ? "bg-blue-500/10 text-blue-600"
                        : "text-zinc-500 hover:bg-zinc-900/5 hover:text-zinc-700"
                    }`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`h-6 w-6 transition-transform duration-300 ease-out ${
                        isActive ? "scale-110" : "scale-100"
                      }`}
                    />
                    <span
                      className={`text-[11px] font-medium leading-none transition-colors duration-200 ${
                        isActive ? "font-semibold" : ""
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
