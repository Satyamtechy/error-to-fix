import type { Metadata } from "next";
import { searchErrors } from "@/lib/search";
import { languages } from "@/lib/database";
import { ErrorCard } from "@/components/ErrorCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search Errors — error-to-fix",
  description: "Search through common programming errors and find instant fixes.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; lang?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const lang = params.lang;
  const results = query ? searchErrors(query, lang) : [];
  const topLangs = ["javascript", "typescript", "python", "java", "csharp", "react", "node", "go", "rust", "css", "docker", "git"];
  const allLangs = ["all", ...topLangs];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-[510] mb-6 text-text" style={{ letterSpacing: "-0.22px" }}>
        Search Errors
      </h1>

      <form action="/search" method="GET" className="mb-6">
        <input
          name="q"
          defaultValue={query}
          placeholder="Type or paste an error message..."
          className="w-full p-4 rounded-[6px] bg-input text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:shadow-[0_0_0_1px_#e4f222]"
        />
        {lang && <input type="hidden" name="lang" value={lang} />}
      </form>

      <div className="flex gap-2 mb-8 flex-wrap">
        {allLangs.map((l) => {
          const isActive = (l === "all" && !lang) || l === lang;
          return (
            <Link
              key={l}
              href={`/search?q=${encodeURIComponent(query)}${l === "all" ? "" : `&lang=${l}`}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-card-elevated text-accent shadow-[rgb(35,37,42)_0px_0px_0px_1px_inset]"
                  : "text-text-muted hover:text-text"
              }`}
          >
            {l === "all" ? "All" : l}
          </Link>
          );
        })}
      </div>

      {query && results.length === 0 && (
        <p className="text-text-dim">No results found for &ldquo;{query}&rdquo;</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {results.map((pattern) => (
          <ErrorCard key={pattern.id} pattern={pattern} />
        ))}
      </div>
    </div>
  );
}
