export interface ErrorPattern {
  id: string;
  pattern: string;
  title: string;
  fix: string;
  language: string;
}

export const ERROR_PATTERNS: ErrorPattern[] = [
  {
    id: "ts-cannot-find-module",
    pattern: "Cannot find module '(.+)'",
    title: "Cannot find module",
    fix: "Run `npm install` or check the module name for typos. If it's a type definition, install `@types/<package>`.",
    language: "typescript"
  },
  {
    id: "ts-property-not-exist",
    pattern: "Property '(.+)' does not exist on type '(.+)'",
    title: "Property does not exist on type",
    fix: "Check the property name for typos, or extend the type/interface to include the property. You can also use optional chaining (`?.`) if the property might not exist.",
    language: "typescript"
  },
  {
    id: "ts-type-not-assignable",
    pattern: "Type '(.+)' is not assignable to type '(.+)'",
    title: "Type not assignable",
    fix: "Ensure the value matches the expected type. Use a type assertion (`as Type`) if you're certain, or fix the source value to match the target type.",
    language: "typescript"
  },
  {
    id: "node-enoent",
    pattern: "ENOENT: no such file or directory",
    title: "File or directory not found",
    fix: "Check that the file path is correct and the file exists. Use `path.resolve()` or `path.join()` for cross-platform paths.",
    language: "node"
  },
  {
    id: "node-eaddrinuse",
    pattern: "EADDRINUSE: address already in use :::?(\\d+)",
    title: "Port already in use",
    fix: "Another process is using this port. Kill it with `lsof -i :<port>` (macOS/Linux) or `netstat -ano | findstr :<port>` (Windows), then terminate the PID.",
    language: "node"
  },
  {
    id: "npm-peer-dep",
    pattern: "npm ERR! Could not resolve dependency.*peer",
    title: "Peer dependency conflict",
    fix: "Run `npm install --legacy-peer-deps` or `npm install --force` to bypass peer dependency checks. Better: align versions to satisfy peers.",
    language: "npm"
  },
  {
    id: "react-invalid-hook",
    pattern: "Invalid hook call",
    title: "Invalid React Hook call",
    fix: "Hooks can only be called inside function components or custom hooks. Check: 1) Not calling in a class component 2) Not calling conditionally 3) No duplicate React versions (`npm ls react`).",
    language: "react"
  },
  {
    id: "angular-ng-not-found",
    pattern: "ng: command not found|ng is not recognized",
    title: "Angular CLI not found",
    fix: "Install globally: `npm install -g @angular/cli`. Or use `npx ng` to run without global install.",
    language: "angular"
  },
  {
    id: "python-module-not-found",
    pattern: "ModuleNotFoundError: No module named '(.+)'",
    title: "Python module not found",
    fix: "Install the missing module: `pip install <module>`. If using a virtual environment, ensure it's activated.",
    language: "python"
  },
  {
    id: "git-diverged",
    pattern: "Your branch and '.+' have diverged",
    title: "Git branches diverged",
    fix: "Rebase with `git pull --rebase` or merge with `git pull`. If you want to force-align to remote: `git reset --hard origin/<branch>` (destructive).",
    language: "git"
  }
];
