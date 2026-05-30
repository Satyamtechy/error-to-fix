import chalk from "chalk";
import type { SearchResult } from "./search.js";

export function displayResults(results: SearchResult[], explain?: boolean): void {
  if (results.length === 0) {
    console.log(chalk.yellow("\n  No matching errors found.\n"));
    return;
  }

  for (const result of results) {
    console.log(`\n  ${chalk.red("✗")} ${chalk.bold(result.title)} ${chalk.gray(`[${result.lang}]`)}`);

    if (explain && result.why) {
      console.log(`\n  ${chalk.cyan("Why:")} ${result.why}`);
    }

    console.log(`\n  ${chalk.white("Fixes:")}`);
    result.fixes.forEach((fix, i) => {
      console.log(`  ${chalk.green(`${i + 1}.`)} ${fix}`);
    });
    console.log(`\n  ${chalk.gray(`Source: ${result.source}`)}`);
  }

  console.log();
}

export function displayJson(results: SearchResult[]): void {
  const output = results.map(({ pattern: _, score: __, ...rest }) => rest);
  console.log(JSON.stringify(output, null, 2));
}
