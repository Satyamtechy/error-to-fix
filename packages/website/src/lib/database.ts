import data from './error-database-full.json';

export interface ErrorPattern {
  id: string;
  regex: string;
  language: string;
  title: string;
  fixes: string[];
  tags: string[];
}

export const errorPatterns: ErrorPattern[] = data as ErrorPattern[];

export const languages = [...new Set(errorPatterns.map((p) => p.language))].sort();
