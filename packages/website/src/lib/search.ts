import { errorPatterns, ErrorPattern } from "./database";

interface SearchResult extends ErrorPattern {
  score: number;
}

export function searchErrors(query: string, lang?: string): ErrorPattern[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const patterns = lang
    ? errorPatterns.filter((p) => p.id && p.language === lang)
    : errorPatterns.filter((p) => p.id);

  const results: SearchResult[] = [];

  for (const pattern of patterns) {
    let score = 0;

    // Try regex match
    try {
      const regex = new RegExp(pattern.regex, "i");
      const match = query.match(regex);
      if (match) {
        score = match[0].length * 2;
      }
    } catch {
      // Invalid regex — skip regex matching
    }

    // Title match
    if (pattern.title.toLowerCase().includes(q)) {
      score += 10;
    }

    // Tag match
    if (pattern.tags?.some((t) => q.includes(t.toLowerCase()))) {
      score += 5;
    }

    // Substring match in regex pattern itself
    if (score === 0 && pattern.regex.toLowerCase().includes(q)) {
      score = 3;
    }

    if (score > 0) {
      results.push({ ...pattern, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ score: _, ...pattern }) => pattern);
}
