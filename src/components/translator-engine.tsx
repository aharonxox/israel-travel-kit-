"use client";

import { useRef, useState } from "react";
import { Check, Copy, Languages } from "lucide-react";
import { PHRASES, findPhrase, type Gender } from "@/data/phrases";
import type { UserStatus } from "@/lib/demo-session";

function GenderSelector({ label, value, onChange, name }: {
  label: string;
  value: Gender;
  onChange: (gender: Gender) => void;
  name: string;
}) {
  return (
    <fieldset className="min-w-0 flex-1">
      <legend className="mb-2 text-xs font-semibold text-zinc-600">{label}</legend>
      <div className="flex rounded-2xl bg-zinc-100 p-1">
        {(["male", "female"] as const).map((gender) => (
          <label key={gender} className={`relative flex-1 cursor-pointer rounded-xl px-2 py-2.5 text-center text-xs font-semibold transition focus-within:ring-2 focus-within:ring-blue-500 ${value === gender ? "bg-white text-blue-700 shadow-sm" : "text-zinc-600"}`}>
            <input type="radio" name={name} value={gender} checked={value === gender} onChange={() => onChange(gender)} className="sr-only" />
            {gender === "male" ? "Male" : "Female"}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function TranslatorEngine({ userStatus }: { userStatus: UserStatus }) {
  const [speaker, setSpeaker] = useState<Gender>("male");
  const [listener, setListener] = useState<Gender>("male");
  const [input, setInput] = useState("");
  const [copyNotice, setCopyNotice] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const copyRequest = useRef(0);
  const phrase = findPhrase(input);
  const result = phrase?.resolve(speaker, listener);

  function clearCopy() { copyRequest.current += 1; setCopyNotice(""); }
  function changeInput(value: string) { clearCopy(); setInput(value); }
  function changeSpeaker(value: Gender) { clearCopy(); setSpeaker(value); }
  function changeListener(value: Gender) { clearCopy(); setListener(value); }

  async function copy() {
    if (!result) return;
    const request = ++copyRequest.current;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(result.hebrew);
      if (request === copyRequest.current) setCopyNotice("Copied Hebrew to clipboard.");
    } catch {
      if (request === copyRequest.current) setCopyNotice("Copy is unavailable. Select the Hebrew text and copy it manually.");
    }
  }

  return (
    <section data-user-status={userStatus} aria-labelledby="translator-title" className="w-full max-w-lg rounded-3xl border border-white/70 bg-white/85 p-5 shadow-xl shadow-blue-900/5 backdrop-blur-xl sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Languages aria-hidden="true" className="h-6 w-6" /></div>
        <div><h2 id="translator-title" className="text-xl font-semibold tracking-tight text-zinc-900">Say it in Hebrew</h2><p className="mt-1 text-xs text-zinc-600">12 common phrases · Works offline</p></div>
      </div>
      <div className="flex gap-3">
        <GenderSelector label="I am" name="speaker" value={speaker} onChange={changeSpeaker} />
        <GenderSelector label="Speaking to" name="listener" value={listener} onChange={changeListener} />
      </div>
      <label htmlFor="english-phrase" className="mb-2 mt-6 block text-xs font-semibold text-zinc-600">English phrase</label>
      <textarea ref={inputRef} id="english-phrase" value={input} maxLength={300} onChange={(event) => changeInput(event.target.value)} placeholder="Try: Can you help me?" rows={2} aria-describedby="phrase-scope" className="w-full resize-y rounded-2xl border border-zinc-200 bg-white p-4 text-base text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
      <p id="phrase-scope" className="mt-2 text-xs leading-5 text-zinc-500">A local phrasebook, not an unrestricted translator. Choose a phrase below or enter an exact supported phrase.</p>
      <div aria-live="polite" aria-atomic="true" className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
        {result ? <>
          <div className="mb-3 flex items-center justify-between gap-2"><span className="text-xs font-semibold uppercase tracking-wider text-blue-800">Hebrew</span><button type="button" onClick={copy} aria-label="Copy Hebrew translation" className="flex min-h-10 items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95">{copyNotice.startsWith("Copied") ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}Copy</button></div>
          <p lang="he" dir="rtl" className="break-words text-right text-3xl leading-relaxed text-zinc-900">{result.hebrew}</p>
          <p dir="ltr" className="mt-3 text-sm font-medium leading-6 text-blue-800">{result.phonetic}</p>
          <p className="mt-3 text-xs leading-5 text-zinc-600">Some phrases are gender-neutral. Pronunciation can change even when unvowelled Hebrew looks the same.</p>
        </> : <p className="text-sm leading-6 text-zinc-600">{input.trim() ? "That phrase is not in this offline phrasebook. Choose one of the supported phrases below." : "Choose a phrase to see the Hebrew and how to pronounce it."}</p>}
      </div>
      <p role="status" className="mt-2 text-xs leading-5 text-blue-800">{copyNotice}</p>
      <h3 className="mb-3 mt-5 text-xs font-semibold text-zinc-600">Useful phrases</h3>
      <div className="flex flex-wrap gap-2">{PHRASES.map((entry) => <button key={entry.english} type="button" onClick={() => { changeInput(entry.english); inputRef.current?.focus(); }} className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 ${phrase === entry ? "border-blue-500 bg-blue-50 text-blue-800" : "border-zinc-200 bg-white text-zinc-600 hover:border-blue-300"}`}>{entry.english}</button>)}</div>
    </section>
  );
}
