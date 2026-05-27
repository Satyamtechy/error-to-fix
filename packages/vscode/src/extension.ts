import * as vscode from "vscode";
import { searchError, SearchResult } from "./search";
import { ERROR_PATTERNS } from "./database";

export function activate(context: vscode.ExtensionContext): void {
  // Command: Error To Fix: Search
  const searchCmd = vscode.commands.registerCommand("errortofix.search", async () => {
    const input = await vscode.window.showInputBox({
      prompt: "Paste your error message",
      placeHolder: "e.g. Cannot find module 'express'"
    });
    if (!input) return;

    const results = searchError(input);
    showResultsPanel(results, input, context);
  });

  // Terminal detection via shell integration
  const terminalListener = vscode.window.onDidEndTerminalShellExecution(async (e) => {
    const stream = e.execution.read();
    let output = "";
    for await (const data of stream) {
      output += data;
      if (output.length > 5000) break;
    }
    const results = searchError(output);
    if (results.length > 0) {
      const first = results[0];
      const choice = await vscode.window.showInformationMessage(
        `Error To Fix: ${first.pattern.title}`,
        "Show Fix"
      );
      if (choice === "Show Fix") {
        showResultsPanel(results, output.slice(0, 500), context);
      }
    }
  });

  // Code Action Provider for Problems panel
  const codeActionProvider = vscode.languages.registerCodeActionsProvider(
    { scheme: "file" },
    new ErrorToFixCodeActionProvider(),
    { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] }
  );

  context.subscriptions.push(searchCmd, terminalListener, codeActionProvider);
}

class ErrorToFixCodeActionProvider implements vscode.CodeActionProvider {
  provideCodeActions(
    _document: vscode.TextDocument,
    _range: vscode.Range,
    context: vscode.CodeActionContext
  ): vscode.CodeAction[] {
    const actions: vscode.CodeAction[] = [];
    for (const diagnostic of context.diagnostics) {
      const msg = diagnostic.message;
      for (const entry of ERROR_PATTERNS) {
        const regex = new RegExp(entry.pattern, "i");
        if (regex.test(msg)) {
          const action = new vscode.CodeAction(
            `Fix: ${entry.title}`,
            vscode.CodeActionKind.QuickFix
          );
          action.diagnostics = [diagnostic];
          action.command = {
            command: "errortofix.search",
            title: "Show Fix"
          };
          actions.push(action);
          break;
        }
      }
    }
    return actions;
  }
}

function showResultsPanel(
  results: SearchResult[],
  input: string,
  context: vscode.ExtensionContext
): void {
  const panel = vscode.window.createWebviewPanel(
    "errorToFixResults",
    "Error To Fix — Results",
    vscode.ViewColumn.Beside,
    { enableScripts: false }
  );

  panel.webview.html = getWebviewHtml(results, input);
  context.subscriptions.push(panel);
}

function getWebviewHtml(results: SearchResult[], input: string): string {
  const resultsHtml = results.length > 0
    ? results.map(r => `
      <div class="result">
        <h3>${escapeHtml(r.pattern.title)}</h3>
        <p class="lang">${escapeHtml(r.pattern.language)}</p>
        <p class="matched"><strong>Matched:</strong> <code>${escapeHtml(r.match)}</code></p>
        <p class="fix">${escapeHtml(r.pattern.fix)}</p>
      </div>
    `).join("")
    : `<p class="no-results">No matching error patterns found.</p>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: var(--vscode-font-family, -apple-system, sans-serif); color: var(--vscode-foreground, #ccc); background: var(--vscode-editor-background, #1e1e1e); padding: 16px; }
  h2 { color: var(--vscode-titleBar-activeForeground, #fff); margin-bottom: 8px; }
  .input-display { background: var(--vscode-textBlockQuote-background, #2d2d2d); padding: 8px 12px; border-radius: 4px; margin-bottom: 20px; font-size: 13px; word-break: break-all; }
  .result { background: var(--vscode-editor-inactiveSelectionBackground, #264f78); padding: 12px 16px; border-radius: 6px; margin-bottom: 12px; }
  .result h3 { margin: 0 0 4px; color: var(--vscode-textLink-foreground, #3794ff); }
  .lang { font-size: 11px; opacity: 0.7; margin: 0 0 8px; text-transform: uppercase; }
  .matched { font-size: 12px; margin: 0 0 8px; }
  .fix { margin: 0; line-height: 1.5; }
  code { background: var(--vscode-textCodeBlock-background, #1a1a1a); padding: 2px 5px; border-radius: 3px; }
  .no-results { opacity: 0.7; font-style: italic; }
</style>
</head>
<body>
  <h2>Error To Fix</h2>
  <div class="input-display">${escapeHtml(input)}</div>
  ${resultsHtml}
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function deactivate(): void {}
