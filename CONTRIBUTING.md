# Contributing to error-to-fix

Thanks for helping developers fix errors faster! Here's how to contribute.

## Adding a New Error Pattern

1. Fork this repo
2. Edit the appropriate file in `packages/shared/`:
   - `errors-javascript.json` — JS/TS/Node
   - `errors-python.json` — Python/Django/Flask
   - `errors-csharp.json` — C#/.NET
   - `errors-frameworks.json` — React/Angular/Vue/Next.js/Docker/Git
   - `errors-devops.json` — SQL/AWS/Linux/CSS/HTTP
3. Add your entry at the end of the array
4. Submit a PR

## Entry Format

```json
{
  "id": "lang-NNN",
  "regex": "regex pattern to match the error",
  "language": "javascript",
  "title": "Short human-readable title",
  "fixes": [
    "Most likely fix first",
    "Second option",
    "Third option"
  ],
  "tags": ["relevant", "tags"]
}
```

## Rules

- **`id`**: Must be unique. Format: `language-NNN` (e.g., `js-051`, `py-041`)
- **`regex`**: Should be permissive — match variations of the error. Use `(word1|word2)` for alternatives.
- **`language`**: One of: `javascript`, `typescript`, `node`, `python`, `csharp`, `java`, `go`, `rust`, `react`, `angular`, `vue`, `nextjs`, `docker`, `git`, `sql`, `css`, `aws`, etc.
- **`title`**: Short (under 60 chars), describes the problem not the error text
- **`fixes`**: 2-4 actionable fixes, ordered by most likely to help. Use backticks for code.
- **`tags`**: 2-5 keywords for searchability

## Quality Guidelines

- ✅ Fix should actually solve the problem (test it yourself)
- ✅ Include the simplest fix first
- ✅ Use backtick code formatting in fixes
- ❌ Don't just say "Google it" or "read the docs"
- ❌ Don't add duplicate errors (search existing patterns first)
- ❌ Don't add errors that are too vague to be useful

## Testing Your Pattern

```bash
cd packages/cli
npx tsx src/index.ts "Your error message here"
```

## Need Help?

Open an issue with the `question` label.
