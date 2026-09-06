# Project Context

## Product

KuVibe

## Meaning

Ku is Cool. Ku means “酷 / Cool”; Vibe comes from Vibe Coding.

## Mission

Turn raw natural-language software requirements into structured, context-aware, verifiable engineering work without adding user-facing workflow complexity.

## Primary Artifact

`kuVibe.md`, a Coding Agent Software Engineering Bootstrap Specification.

## Primary Users

People using coding agents who want sound engineering practice without learning another workflow or mandatory CLI.

## Technology

Node.js 24 LTS, strict TypeScript, pnpm workspace, Markdown and VitePress, npm distribution.

## Modules

- Bootstrap and project-context generation
- Requirement analysis and clarification
- Complexity routing and engineering workflow
- Living documentation and engineering notes
- Optional deterministic tools (`detect`, `validate`, `docs-nav`)
- Agent-behavior eval fixtures

## Repository Shape

The protocol is at the root; reusable templates live in `templates/`; deterministic tooling is in `packages/cli/`; behavior specifications are in `evals/`; published documentation is in `docs/`.

## Constraints

- The user-facing CLI must not be required.
- Tools are optional, deterministic, read-only by default, fast, and emit structured JSON.
- Tool failure must degrade to lightweight agent inspection.
- Dependencies and context loading stay minimal.
- Markdown is documentation source of truth; VitePress is presentation only.
