const patterns: [RegExp, string][] = [
  [/NullReferenceException|System\./i, "csharp"],
  [/Traceback|IndentationError/i, "python"],
  [/panic:|goroutine/i, "go"],
  [/ENOENT|ECONNREFUSED/i, "node"],
  [/kubectl|pod/i, "kubernetes"],
  [/docker|container/i, "docker"],
  [/TypeError|ReferenceError|SyntaxError/i, "javascript"],
];

export function detectLang(text: string): string | undefined {
  for (const [regex, lang] of patterns) {
    if (regex.test(text)) return lang;
  }
  return undefined;
}
