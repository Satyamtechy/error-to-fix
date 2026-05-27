import type { Metadata } from "next";
import { errorPatterns } from "@/lib/database";
import { LanguageBadge } from "@/components/LanguageBadge";
import { ErrorCard } from "@/components/ErrorCard";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pattern = errorPatterns.find((p) => p.id?.toLowerCase() === id.toLowerCase());
  if (!pattern) return { title: "Not Found" };
  return {
    title: `${pattern.title} — error-to-fix`,
    description: `Fix: ${pattern.fixes[0]}`,
  };
}

export default async function ErrorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pattern = errorPatterns.find((p) => p.id?.toLowerCase() === id.toLowerCase());
  if (!pattern) notFound();

  const related = errorPatterns
    .filter((p) => p.id !== pattern.id && p.language === pattern.language)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-2">
        <LanguageBadge language={pattern.language} />
      </div>
      <h1 className="text-3xl font-[510] text-text mb-4" style={{ letterSpacing: "-0.22px" }}>
        {pattern.title}
      </h1>

      <div className="p-4 rounded-[6px] bg-card shadow-[rgb(35,37,42)_0px_0px_0px_1px_inset] font-mono text-sm text-text-secondary mb-8">
        {pattern.regex}
      </div>

      <h2 className="text-xl font-[510] text-text-secondary mb-4">Fixes</h2>
      <ul className="space-y-3 mb-12">
        {pattern.fixes.map((fix, i) => (
          <li key={fix} className="flex items-start gap-3 text-text-secondary">
            <span className="text-accent font-mono text-sm font-medium min-w-[20px]">{i + 1}.</span>
            <span>{fix}</span>
          </li>
        ))}
      </ul>

      {pattern.tags.length > 0 && (
        <div className="flex gap-2 mb-12 flex-wrap">
          {pattern.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-[4px] bg-input text-text-muted text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}

      {related.length > 0 && (
        <>
          <h2 className="text-xl font-[510] text-text-secondary mb-4">Related Errors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {related.map((r) => (
              <ErrorCard key={r.id} pattern={r} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
