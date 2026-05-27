import { errorPatterns } from "@/lib/database";
import { SearchBox } from "@/components/SearchBox";
import { ErrorCard } from "@/components/ErrorCard";

export default function Home() {
  const featured = errorPatterns.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-[72px] font-[510] leading-tight mb-4" style={{ letterSpacing: "-0.22px" }}>
          Paste any error. Get the <span className="text-accent">fix</span>.
        </h1>
        <p className="text-lg text-text-muted mb-8">
          Instant solutions for common programming errors. No more scrolling through Stack Overflow.
        </p>
        <SearchBox />
        <p className="mt-6 text-sm text-text-dim">
          {errorPatterns.length} errors · {new Set(errorPatterns.map((p) => p.language)).size} languages · Open source
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-[510] mb-6 text-text-secondary" style={{ letterSpacing: "-0.22px" }}>
          Common Errors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {featured.map((pattern) => (
            <ErrorCard key={pattern.id} pattern={pattern} />
          ))}
        </div>
      </section>
    </div>
  );
}
