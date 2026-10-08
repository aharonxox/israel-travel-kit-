import type { LucideIcon } from "lucide-react";
import type { UserStatus } from "@/lib/demo-session";

type PlaceholderViewProps = {
  icon: LucideIcon;
  userStatus: UserStatus;
  title: string;
  description: string;
  phaseLabel: string;
};

/**
 * Temporary, clearly labeled placeholder for one of the four app views.
 * Contains no feature logic — real components replace this in later phases.
 */
export default function PlaceholderView({
  icon: Icon,
  userStatus,
  title,
  description,
  phaseLabel,
}: PlaceholderViewProps) {
  return (
    <section
      data-user-status={userStatus}
      aria-label={`${title} placeholder view`}
      className="w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-xl shadow-blue-900/5 backdrop-blur-xl"
    >
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 text-blue-600">
        <Icon className="h-8 w-8" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>

      <p className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-zinc-50/80 px-3 py-1 text-xs font-medium text-zinc-500">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-amber-400"
        />
        Temporary placeholder · {phaseLabel}
      </p>
    </section>
  );
}
