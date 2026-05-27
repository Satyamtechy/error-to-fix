"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchErrors } from "@/lib/search";
import type { ErrorPattern } from "@/lib/database";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ErrorPattern[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchErrors(query));
    } else {
      setResults([]);
    }
  }, [query]);

  function selectResult(id: string) {
    if (!id) return;
    setOpen(false);
    setQuery("");
    router.push(`/errors/${id}`);
  }

  return (
    <>
      <header className="border-b border-border bg-bg sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="font-[590] text-sm text-text flex items-center gap-1.5">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" className="text-accent">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
              <path d="M18 6L12 18h5l-2 8 8-12h-5l2-8z" fill="currentColor"/>
            </svg>
            error-to-fix
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-card text-text-muted text-xs hover:border-accent/50 transition-colors min-w-[200px]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              Search errors...
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-bg border border-border text-text-dim">⌘K</kbd>
            </button>
            <Link href="/languages" className="text-xs text-text-muted hover:text-text transition-colors">Languages</Link>
            <a href="https://github.com/Satyamtechy/error-to-fix" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-text transition-colors">GitHub</a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-7 h-7 flex items-center justify-center rounded-md text-text-muted hover:text-text hover:bg-card transition-colors"
              aria-label="Toggle theme"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dark:hidden">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden dark:block">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] animate-fadeIn" onClick={() => setOpen(false)} />
          <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101] animate-scaleIn">
            <div className="bg-card border border-border rounded-lg shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted shrink-0">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Paste an error message..."
                  className="flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-dim"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-bg border border-border text-text-dim">ESC</kbd>
              </div>
              <div className="max-h-[300px] overflow-y-auto stagger-children">
                {results.length > 0 ? results.map((r, i) => (
                  <button
                    key={`${r.id}-${i}`}
                    onClick={() => selectResult(r.id)}
                    className="w-full text-left px-4 py-3 hover:bg-card-elevated border-b border-border last:border-0 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-input text-text-muted">{r.language}</span>
                      <span className="text-sm text-text">{r.title}</span>
                    </div>
                    <p className="text-xs text-text-dim mt-1 truncate">{r.fixes[0]}</p>
                  </button>
                )) : query ? (
                  <p className="px-4 py-6 text-sm text-text-dim text-center">No matches found</p>
                ) : (
                  <p className="px-4 py-6 text-sm text-text-dim text-center">Type or paste an error to search 3000+ patterns</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
