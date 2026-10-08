"use client";

import { useEffect, useState } from "react";
import { SESSION_KEY, parseSession, serializeSession, type UserStatus } from "@/lib/demo-session";
import AuthScreen from "./auth-screen";
import AppShell from "./app-shell";

export default function SessionGate() {
  const [session, setSession] = useState<{ ready: boolean; status: UserStatus | null }>({ ready: false, status: null });
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    // Restore external browser storage after hydration, never during SSR.
    queueMicrotask(() => {
      if (!active) return;
      let status: UserStatus | null = null;
      try {
        status = parseSession(window.localStorage.getItem(SESSION_KEY));
      } catch {
        setNotice("Browser storage is unavailable. You can explore, but your session will not survive a refresh.");
      }
      setSession({ ready: true, status });
    });
    function onStorage(event: StorageEvent) {
      if (event.key === SESSION_KEY || event.key === null) {
        setSession({ ready: true, status: parseSession(event.newValue) });
      }
    }
    window.addEventListener("storage", onStorage);
    return () => { active = false; window.removeEventListener("storage", onStorage); };
  }, []);

  function select(status: UserStatus) {
    try {
      window.localStorage.setItem(SESSION_KEY, serializeSession(status));
      setNotice(null);
    } catch {
      setNotice("This session works for now, but browser storage is unavailable. Refreshing will reset it.");
    }
    setSession({ ready: true, status });
  }

  function signOut() {
    try {
      window.localStorage.removeItem(SESSION_KEY);
      setNotice(null);
    } catch {
      setNotice("Signed out here. Browser storage could not be cleared; clear this site's data before reopening if it restores your earlier demo session.");
    }
    setSession({ ready: true, status: null });
  }

  if (!session.ready) {
    return <main className="flex min-h-dvh items-center justify-center bg-slate-950 text-slate-200"><p role="status" className="text-sm">Loading your local preview…</p></main>;
  }
  if (!session.status) return <AuthScreen onSelect={select} notice={notice} />;
  return <AppShell userStatus={session.status} onSignOut={signOut} sessionNotice={notice} />;
}
