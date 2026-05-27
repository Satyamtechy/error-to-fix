import Link from "next/link";
import { ErrorPattern } from "@/lib/database";
import { LanguageBadge } from "./LanguageBadge";

export function ErrorCard({ pattern }: { pattern: ErrorPattern }) {
  return (
    <Link
      href={`/errors/${pattern.id}`}
      className="block p-3 rounded-[6px] bg-card shadow-[rgb(35,37,42)_0px_0px_0px_1px_inset] hover:bg-card-elevated hover:shadow-[rgb(50,51,52)_0px_0px_0px_1px_inset] transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <LanguageBadge language={pattern.language} />
        <span className="text-xs text-accent font-medium">{pattern.fixes.length} fixes</span>
      </div>
      <h3 className="font-medium text-text mb-1">{pattern.title}</h3>
      <p className="text-sm text-text-dim font-mono truncate">{pattern.regex}</p>
      <ul className="mt-2 space-y-1">
        {pattern.fixes.slice(0, 2).map((fix) => (
          <li key={fix} className="text-xs text-text-muted flex items-start gap-1">
            <span className="text-accent mt-0.5">•</span>
            <span className="line-clamp-1">{fix}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
