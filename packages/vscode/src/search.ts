import { ERROR_PATTERNS, ErrorPattern } from "./database";

export interface SearchResult {
  pattern: ErrorPattern;
  match: string;
}

export function searchError(input: string): SearchResult[] {
  const results: SearchResult[] = [];
  for (const entry of ERROR_PATTERNS) {
    const regex = new RegExp(entry.pattern, "i");
    const match = regex.exec(input);
    if (match) {
      results.push({ pattern: entry, match: match[0] });
    }
  }
  return results;
}
