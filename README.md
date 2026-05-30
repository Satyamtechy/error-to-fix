<div align="center">

# ⚡ error-to-fix

**Paste any error. Get the fix. Instantly.**

3,000+ error patterns · 50+ languages · Zero AI latency · Works offline

[![npm](https://img.shields.io/npm/v/error-to-fix?color=cb3837)](https://www.npmjs.com/package/error-to-fix)
[![errors](https://img.shields.io/badge/patterns-3,010-blue)](#)
[![license](https://img.shields.io/github/license/Satyamtechy/error-to-fix)](./LICENSE)

</div>

---

## Why?

You Google an error → scroll through 5 StackOverflow answers → find the fix buried in comment #3.

**error-to-fix** gives you the fix in < 1 second. Offline. No AI hallucinations. Just a curated, regex-matched database of real fixes.

---

## Install

```bash
# Use instantly (no install)
npx error-to-fix "Cannot read properties of undefined"

# Or install globally
npm i -g error-to-fix
```

---

## Usage

### CLI

```bash
# Basic search
error-to-fix "Module not found: Can't resolve './App'"

# Filter by language
error-to-fix "NullReferenceException" --lang csharp

# JSON output (for scripts/editors)
error-to-fix "ENOENT: no such file" --json
```

### Example Output

```
  ✗ Cannot read properties of undefined (reading 'map') [javascript]

  Fixes:
  1. Add optional chaining: data?.map() or check if array exists before mapping
  2. Initialize state as empty array: useState([]) instead of useState()
  3. Check API response shape — the data might be nested: response.data.items

  Source: MDN / StackOverflow
```

---

## Platforms

| Platform | Status | How to Use |
|----------|--------|------------|
| 💻 **CLI** | ✅ Published | `npx error-to-fix "your error"` |
| 🌐 **Website** | Ready | [errortofix.dev](https://errortofix.dev) |
| 📝 **VS Code** | Ready | Search "error-to-fix" in extensions |
| 🌎 **Chrome Extension** | Ready | Highlights errors on any page |
| 🔧 **NuGet Analyzer** | Ready | Real-time fixes in C#/Rider |

---

## Languages & Tools Covered

**Languages:** JavaScript, TypeScript, Python, C#, Java, Go, Rust, Swift, Kotlin, Ruby, PHP, Dart, Elixir, Scala

**Frameworks:** React, Angular, Vue, Svelte, Next.js, Express, Django, Flask, Spring Boot, ASP.NET, Rails

**DevOps:** Docker, Kubernetes, Terraform, AWS CLI, Azure, GCP, Nginx, Git, GitHub Actions, CI/CD

**Databases:** PostgreSQL, MySQL, MongoDB, Redis, SQLite, DynamoDB, Elasticsearch

**Package Managers:** npm, pip, cargo, dotnet, composer, gem, go mod

---

## How It Works

```
User input: "TypeError: Cannot read properties of undefined (reading 'length')"
     ↓
Regex matching against 3,010 curated patterns
     ↓
Ranked by match score (pattern coverage / query length)
     ↓
Top 3 results with fixes returned in <1ms
```

No AI. No API calls. No internet required. The entire database ships with the package (~1MB).

---

## Database Format

Each error entry:

```json
{
  "pattern": "Cannot read properties of (undefined|null)",
  "title": "Cannot read properties of undefined/null",
  "lang": "javascript",
  "fixes": [
    "Use optional chaining: obj?.property",
    "Add null check before accessing the property",
    "Ensure the variable is initialized before use"
  ],
  "source": "MDN / StackOverflow"
}
```

---

## Contributing

We need your help to grow the database!

**Add an error in 2 minutes:**

1. Fork this repo
2. Edit `packages/shared/errors-{language}.json`
3. Add your pattern + fixes
4. Submit a PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Programmatic Use

```typescript
import { search } from 'error-to-fix';

const results = search("ECONNREFUSED 127.0.0.1:5432");
// [{ title: "PostgreSQL connection refused", fixes: [...], lang: "postgresql" }]
```

---

## Tech Stack

| Component | Tech |
|-----------|------|
| CLI | Node.js, TypeScript, Commander, Chalk |
| Website | Next.js 15, Tailwind CSS 4 |
| VS Code Extension | VS Code Extension API |
| Chrome Extension | Manifest V3, Service Worker |
| NuGet Analyzer | .NET 9, Roslyn |
| Database | 3,010 curated JSON patterns |

---

## Roadmap

- [ ] Auto-detect language from error format
- [ ] `--watch` mode: monitor terminal output and suggest fixes in real-time
- [ ] Fuzzy search for partial/typo matches
- [ ] Community voting on fix quality
- [ ] VS Code: inline fix suggestions on error squiggles
- [ ] 10,000+ patterns by end of 2026

---

## License

[MIT](./LICENSE) © Satyam Thakur
