import Link from "next/link";
import { errorPatterns, languages } from "@/lib/database";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Languages — error-to-fix",
  description: "Browse errors by programming language",
};

export default function LanguagesPage() {
  const langCounts = languages.map((lang) => ({
    name: lang,
    count: errorPatterns.filter((p) => p.language === lang).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">Languages</h1>
      <p className="text-text-muted mb-8">Browse {errorPatterns.length} errors across {languages.length} languages</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {langCounts.map((l, i) => (
          <Link
            key={`${l.name}-${i}`}
            href={`/${l.name}`}
            className="p-3 rounded-md bg-card border border-border hover:border-accent/50 hover:bg-card-elevated transition-colors"
          >
            <span className="text-text text-sm font-medium">{l.name}</span>
            <span className="block text-text-dim text-xs mt-1">{l.count} errors</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
