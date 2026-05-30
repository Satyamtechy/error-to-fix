import * as readline from "node:readline";
import chalk from "chalk";
import { search } from "./search.js";
import { detectLang } from "./detect-lang.js";

export function startWatch(): void {
  const rl = readline.createInterface({ input: process.stdin });

  rl.on("line", (line) => {
    process.stdout.write(line + "\n");

    const lang = detectLang(line);
    const results = search(line, lang);

    if (results.length > 0) {
      for (const r of results) {
        console.log(
          chalk.cyan(`[error-to-fix]`) +
            ` ${chalk.bold(r.title)} → ${r.fixes[0]}`
        );
      }
    }
  });

  rl.on("close", () => process.exit(0));
}
