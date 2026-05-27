import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

export interface ErrorEntry {
  pattern: string;
  title: string;
  lang: string;
  fixes: string[];
  source: string;
}

export interface SearchResult extends ErrorEntry {
  score: number;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = resolve(__dirname, "../data/errors.json");
const database: ErrorEntry[] = JSON.parse(readFileSync(dbPath, "utf-8")) as ErrorEntry[];

export function search(query: string, lang?: string): SearchResult[] {
  const entries = lang ? database.filter((e) => e.lang === lang) : database;

  return entries
    .map((entry) => {
      const regex = new RegExp(entry.pattern, "i");
      const match = regex.exec(query);
      const score = match ? match[0].length / query.length : 0;
      return { ...entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
