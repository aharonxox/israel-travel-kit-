import { describe, expect, test } from "bun:test";
import { PHRASES, findPhrase, normalizePhrase } from "./phrases";

describe("offline phrasebook", () => {
  test("normalizes case, whitespace and trailing punctuation", () => {
    expect(normalizePhrase("  CAN   YOU HELP ME?!  ")).toBe("can you help me");
    expect(findPhrase("Thanks!")?.english).toBe("Thank you");
    expect(findPhrase("" )).toBeUndefined();
    expect(findPhrase("unknown phrase")).toBeUndefined();
  });
  test("every supported phrase resolves for all four combinations", () => {
    expect(PHRASES.length).toBeGreaterThanOrEqual(10);
    for (const phrase of PHRASES) {
      expect(findPhrase(phrase.english)).toBe(phrase);
      for (const speaker of ["male", "female"]) {
        for (const listener of ["male", "female"]) {
          const result = phrase.resolve(speaker, listener);
          expect(result.hebrew).toMatch(/[\u0590-\u05ff]/u);
          expect(result.phonetic.length).toBeGreaterThan(0);
        }
      }
    }
  });
  test("speaker and listener change independently", () => {
    const phrase = findPhrase("I am happy to meet you");
    const combinations = [phrase.resolve("male", "male"), phrase.resolve("male", "female"), phrase.resolve("female", "male"), phrase.resolve("female", "female")];
    expect(new Set(combinations.map((item) => item.hebrew)).size).toBe(4);
    expect(new Set(combinations.map((item) => item.phonetic)).size).toBe(4);
    expect(findPhrase("I need help").resolve("female", "male").hebrew).toBe("אני צריכה עזרה");
    expect(findPhrase("Can you help me?").resolve("male", "female").hebrew).toBe("את יכולה לעזור לי?");
  });
});
