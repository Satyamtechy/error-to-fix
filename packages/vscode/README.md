# Error To Fix — VS Code Extension

Auto-detects errors in the VS Code terminal and Problems panel and shows quick fixes.

## Features

- **Command: Error To Fix: Search** — Open the command palette, paste an error message, and get instant fix suggestions in a webview panel.
- **Terminal Detection** — Watches terminal output for known error patterns and shows a notification with the fix.
- **Problems Panel** — Provides code actions (quick fixes) for diagnostics matching known patterns.

## Usage

1. Open Command Palette (`Ctrl+Shift+P`)
2. Run `Error To Fix: Search`
3. Paste your error message
4. View the fix in the results panel

## Development

```bash
npm install
npm run compile
```

Press `F5` to launch the Extension Development Host.
