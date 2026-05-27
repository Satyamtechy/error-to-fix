#!/usr/bin/env node
import { program } from "commander";
import { search } from "./search.js";
import { displayResults, displayJson } from "./display.js";

program
  .name("error-to-fix")
  .version("1.0.0")
  .description("Find fixes for error messages")
  .argument("<error>", "error message to search for")
  .option("--json", "output as JSON")
  .option("--lang <language>", "filter by language")
  .action((error: string, opts: { json?: boolean; lang?: string }) => {
    const results = search(error, opts.lang);
    if (opts.json) {
      displayJson(results);
    } else {
      displayResults(results);
    }
  });

program.parse();
