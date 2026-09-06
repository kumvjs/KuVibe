# [feature] Initialize KuVibe

Date: 2026-09-06T22:24:31+08:00
Type: feature
Modules: protocol, project-context, workflow, documentation, evals, templates, tooling
Related Requirement: Implement the KuVibe project from the supplied implementation brief.
Related PR / Commit: N/A

## Problem

The repository contained only a detailed KuVibe implementation brief. It needed to become a dogfooded, usable project whose primary artifact is a portable agent protocol and whose optional tooling can provide deterministic repository facts.

## Context

The stack was pre-established as Node.js, strict TypeScript, pnpm workspace, Markdown/VitePress, and npm distribution. User-facing installation and workflow commands were explicitly out of scope. The host filesystem is case-insensitive, so `KuVibe.md` and `kuVibe.md` cannot coexist as separate files.

## Decision

Normalize the supplied root file to the required `kuVibe.md` casing and turn its implementation guidance into a concise, operational 33-section bootstrap specification. Build KuVibe around that protocol, thin project routing, established context, living docs, runner-neutral behavior evals, reusable templates, and one optional zero-runtime-dependency tools package.

The tools package exposes only `detect`, `validate`, and `docs-nav`. It uses bounded metadata inspection, evidence-bearing JSON, and read-only behavior.

## Alternatives Considered

- Preserve the implementation brief as the primary product: rejected because a project plan is less directly executable by future agents than the requested bootstrap specification.
- Build a user-facing initialization CLI or workflow engine: rejected because it moves engineering-process complexity to users and violates the product boundary.
- Add third-party glob, schema, or CLI libraries: rejected because the first-phase operations are small and deterministic without runtime dependencies.

## Important Constraints

- Optional tooling must never block KuVibe usage.
- Existing-project detection stops at metadata and simple workspace expansion.
- Markdown remains source of truth; VitePress is presentation.
- Implemented notes remain flat and timestamped.

## Implementation

- Added the reusable `kuVibe.md` protocol, `AGENTS.md`, Project Context, stack, architecture, conventions, and four workflow files.
- Added VitePress product, module, architecture, and development documentation.
- Added reusable context/workflow/docs/note templates.
- Added behavior evals for bootstrap, fallback, clarification, context, routing, workflow, notes, and documentation.
- Added fixtures for Node/NestJS, Java/Spring, Python, C++, Go, Rust, .NET, and a pnpm monorepo.
- Implemented typed stack detection, harness validation, docs navigation, CLI dispatch, and public package exports.
- Added isolated unit tests and root workspace scripts.

## Verification

- `pnpm --config.verify-deps-before-run=false check` — passed.
- `pnpm --config.verify-deps-before-run=false test` — 6 tests passed.
- `pnpm --config.verify-deps-before-run=false docs:build` — VitePress build passed.
- `node packages/cli/dist/src/cli.js detect fixtures/nestjs` — expected Node/TypeScript/NestJS/pnpm/Prisma evidence.
- `node packages/cli/dist/src/cli.js validate .` — valid with no issues before this note and remains expected to pass after it.
- `node packages/cli/dist/src/cli.js docs-nav docs` — deterministic documentation tree produced.
- `npm pack --dry-run --cache /tmp/kuvibe-npm-cache` — package metadata and publish contents validated.

The `verify-deps-before-run` override was needed only because dependency installation ran outside the workspace sandbox and pnpm observed a different store path during sandboxed verification; it is not a project requirement.

## Documentation Updated

Product behavior, lifecycle, all protocol modules, tooling commands, architecture, evals, contributing, and testing are documented. Documentation impact: product rules yes; workflows yes; data model N/A; CLI/API yes; UI N/A; operations/build yes; architecture yes.

## Consequences

Users can now copy one protocol file and work through natural-language requirements. Agents can optionally obtain reproducible facts without making the tools a prerequisite. Future protocol changes must consider both documentation and behavior eval coverage.

## Follow-ups

- Add vendor-specific eval runners only when a stable transcript contract is chosen.
- Expand detector rules from real repository cases while preserving bounded I/O and output compatibility.
- Add release automation and provenance before the first npm publication.
