export type Gender = "male" | "female";
export type Translation = { hebrew: string; phonetic: string };
export type Phrase = {
  english: string;
  aliases?: string[];
  resolve: (speaker: Gender, listener: Gender) => Translation;
};

const fixed = (hebrew: string, phonetic: string) => () => ({ hebrew, phonetic });

export const PHRASES: readonly Phrase[] = [
  { english: "Hello", aliases: ["hi", "shalom"], resolve: fixed("שלום", "Shalom") },
  { english: "Thank you", aliases: ["thanks"], resolve: fixed("תודה", "Toda") },
  { english: "Please", resolve: fixed("בבקשה", "Bevakasha") },
  { english: "Good morning", resolve: fixed("בוקר טוב", "Boker tov") },
  { english: "Where is the bus stop?", resolve: fixed("איפה תחנת האוטובוס?", "Eifo takhanat ha-otobus?") },
  { english: "How much does it cost?", aliases: ["how much is it"], resolve: fixed("כמה זה עולה?", "Kama ze ole?") },
  { english: "I need help", resolve: (speaker) => speaker === "male"
    ? { hebrew: "אני צריך עזרה", phonetic: "Ani tsarikh ezra" }
    : { hebrew: "אני צריכה עזרה", phonetic: "Ani tsrikha ezra" } },
  { english: "I am tired", resolve: (speaker) => speaker === "male"
    ? { hebrew: "אני עייף", phonetic: "Ani ayef" }
    : { hebrew: "אני עייפה", phonetic: "Ani ayefa" } },
  { english: "How are you?", resolve: (_speaker, listener) => listener === "male"
    ? { hebrew: "מה שלומך?", phonetic: "Ma shlomkha?" }
    : { hebrew: "מה שלומך?", phonetic: "Ma shlomekh?" } },
  { english: "Can you help me?", resolve: (_speaker, listener) => listener === "male"
    ? { hebrew: "אתה יכול לעזור לי?", phonetic: "Ata yakhol la'azor li?" }
    : { hebrew: "את יכולה לעזור לי?", phonetic: "At yekhola la'azor li?" } },
  { english: "I am happy to meet you", resolve: (speaker, listener) => ({
    hebrew: `אני ${speaker === "male" ? "שמח" : "שמחה"} לפגוש ${listener === "male" ? "אוֹתְךָ" : "אוֹתָךְ"}`,
    phonetic: `Ani ${speaker === "male" ? "same'akh" : "smekha"} lifgosh ${listener === "male" ? "otkha" : "otakh"}`,
  }) },
  { english: "I love you", resolve: (speaker, listener) => ({
    hebrew: `אני ${speaker === "male" ? "אוהב" : "אוהבת"} ${listener === "male" ? "אוֹתְךָ" : "אוֹתָךְ"}`,
    phonetic: `Ani ${speaker === "male" ? "ohev" : "ohevet"} ${listener === "male" ? "otkha" : "otakh"}`,
  }) },
];

export function normalizePhrase(input: string): string {
  return input.trim().toLowerCase().replace(/[?!.,]+$/u, "").replace(/\s+/gu, " ").trim();
}

export function findPhrase(input: string): Phrase | undefined {
  const normalized = normalizePhrase(input);
  if (!normalized) return undefined;
  return PHRASES.find((phrase) =>
    [phrase.english, ...(phrase.aliases ?? [])].some((candidate) => normalizePhrase(candidate) === normalized),
  );
}
