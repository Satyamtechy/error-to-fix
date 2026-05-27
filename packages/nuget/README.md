# ErrorToFix.Analyzers

Roslyn analyzers that detect common runtime exception patterns at compile time and suggest fixes.

## Diagnostics

| ID | Severity | Description |
|----|----------|-------------|
| ETF001 | Warning | Possible null dereference — accessing a member on a value that may be null (e.g., result of `as` cast) |
| ETF002 | Warning | Empty catch block — swallows exceptions silently |
| ETF003 | Info | String comparison using `==` — suggests `string.Equals` with explicit `StringComparison` |

## Installation

```xml
<PackageReference Include="ErrorToFix.Analyzers" Version="1.0.0">
  <PrivateAssets>all</PrivateAssets>
  <IncludeAssets>runtime; build; native; contentfiles; analyzers</IncludeAssets>
</PackageReference>
```

Or via CLI:

```bash
dotnet add package ErrorToFix.Analyzers
```

## Requirements

- .NET SDK 9.0+
- Projects targeting .NET Standard 2.0+ / .NET 6+

## How It Works

The analyzers run during compilation and report diagnostics directly in your IDE and build output. No runtime overhead — all analysis is compile-time only.
