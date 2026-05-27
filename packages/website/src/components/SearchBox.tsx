"use client";

import { useState, useEffect, useCallback } from "react";
import { ErrorPattern } from "@/lib/database";
import { LanguageBadge } from "./LanguageBadge";
import Link from "next/link";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ErrorPattern[]>([]);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data: ErrorPattern[] = await res.json();
    setResults(data);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Paste your error message here..."
        className="w-full h-32 p-4 rounded-[6px] bg-input text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:shadow-[0_0_0_1px_#e4f222] resize-none font-mono text-sm"
      />
      {results.length > 0 && (
        <div className="mt-2 space-y-2">
          {results.map((pattern) => (
            <Link
              key={pattern.id}
              href={`/errors/${pattern.id}`}
              className="block p-3 rounded-[6px] bg-card shadow-[rgb(35,37,42)_0px_0px_0px_1px_inset] hover:bg-card-elevated transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <LanguageBadge language={pattern.language} />
                <span className="font-medium text-text">{pattern.title}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {pattern.fixes.map((fix) => (
                  <li key={fix} className="text-sm text-text-muted flex items-start gap-1">
                    <span className="text-accent">•</span> {fix}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
