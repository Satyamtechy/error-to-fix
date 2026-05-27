# error-to-fix ⚡

Paste any error. Get the fix. Instantly.

**3,000+ error patterns** across 50+ languages and tools. One database, five platforms.

## Platforms

| Platform | Status | Install |
|----------|--------|---------|
| 🌐 Website | Live | [errortofix.dev](https://errortofix.dev) |
| 💻 CLI | Ready | `npm i -g error-to-fix` |
| 📝 VS Code | Ready | Search "error-to-fix" in extensions |
| 🌎 Chrome | Ready | Load unpacked from `packages/chrome-ext` |
| 🔧 NuGet | Ready | `dotnet add package ErrorToFix.Analyzers` |

## Quick Start

```bash
# CLI
npx error-to-fix "Cannot read properties of undefined"

# Website
open https://errortofix.dev

# Or press ⌘K on the website to search
```

## Languages Covered

JavaScript, TypeScript, Python, C#, Java, Go, Rust, Swift, Kotlin, Ruby, PHP, React, Angular, Vue, Svelte, Next.js, Node.js, Docker, Kubernetes, Git, SQL, PostgreSQL, MongoDB, Redis, AWS, Azure, Firebase, Terraform, and more.

## Contributing

We need your help to grow the database! See [CONTRIBUTING.md](CONTRIBUTING.md).

**Add an error in 2 minutes:**
1. Fork → edit `packages/shared/errors-javascript.json` → submit PR

## Tech Stack

- **Website:** Next.js 15, TypeScript, Tailwind CSS 4
- **CLI:** Node.js 22, TypeScript, Commander
- **VS Code:** TypeScript, VS Code Extension API
- **Chrome:** Manifest V3, Service Worker
- **NuGet:** .NET 9, Roslyn Analyzers
- **Database:** 3,010 curated error patterns (JSON)

## License

MIT © Satyam Thakur
