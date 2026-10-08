export type UserStatus = "guest" | "premium";
export const SESSION_KEY = "travel-isl:demo-session:v1";

export function parseSession(value: string | null): UserStatus | null {
  if (!value) return null;
  try {
    const session: unknown = JSON.parse(value);
    if (typeof session !== "object" || session === null) return null;
    const record = session as Record<string, unknown>;
    return record.version === 1 &&
      (record.status === "guest" || record.status === "premium")
      ? record.status
      : null;
  } catch {
    return null;
  }
}

export function serializeSession(status: UserStatus): string {
  return JSON.stringify({ version: 1, status });
}
