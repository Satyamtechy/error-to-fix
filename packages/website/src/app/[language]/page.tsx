import type { Metadata } from "next";
import { errorPatterns, languages } from "@/lib/database";
import { ErrorCard } from "@/components/ErrorCard";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string }>;
}): Promise<Metadata> {
  const { language } = await params;
  return {
    title: `${language} errors — error-to-fix`,
    description: `Common ${language} errors and how to fix them.`,
  };
}

export default async function LanguagePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;
  const patterns = errorPatterns.filter((p) => p.language === language);
  if (patterns.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-[510] text-text mb-2 capitalize" style={{ letterSpacing: "-0.22px" }}>
        {language} Errors
      </h1>
      <p className="text-text-muted mb-8">{patterns.length} error patterns</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {patterns.map((pattern) => (
          <ErrorCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}
