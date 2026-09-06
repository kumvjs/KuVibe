# Stack

## Stack Facts

- Runtime: Node.js 24 LTS
- Language: TypeScript with strict checking
- Package manager: pnpm 11 workspace
- Documentation: Markdown rendered by VitePress
- Testing: Node's built-in test runner against compiled TypeScript
- Distribution: npm package `@kuvibe/cli`

## Build & Package Management

The root owns workspace scripts and documentation dependencies. Each publishable package owns its build output and package metadata. Commit `pnpm-lock.yaml`; use pnpm only.

## Required Engineering Rules

- Use ESM and explicit `.js` extensions in TypeScript relative imports.
- Keep runtime dependencies at zero unless a clear deterministic-tool need appears.
- Validate external file content before narrowing types.
- Filesystem operations must be cross-platform and bounded.
- Detection is read-only and returns evidence, never architectural advice.
- CLI stdout is machine-readable JSON; diagnostics and failures use stable exit codes.

## Conditional Capabilities

Use security analysis for filesystem boundaries, UI analysis only for documentation UI, and compatibility analysis for CLI or output-schema changes.

## Explicitly Avoid

Servers, databases, daemons, workflow engines, mandatory global installation, framework-specific doctrine, and whole-repository source parsing.
