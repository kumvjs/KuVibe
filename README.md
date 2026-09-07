# KuVibe

[English](./README.md) | [简体中文](./README.zh.md)

> **Ku is Cool.**
>
> One Markdown file is all you need to start your Vibe Coding journey. Everything is ready—let's begin, my young genius!

Ku means “Cool”; Vibe comes from Vibe Coding.

KuVibe is a file-first software engineering protocol for Vibe Coding. Users describe what they want; coding agents handle project context, focused clarification, engineering analysis, acceptance, implementation planning, verification, living documentation, and durable engineering memory.

## Use KuVibe

Copy [`kuVibe.md`](./kuVibe.md) into a project and tell your coding agent:

```text
Read @kuVibe.md and initialize this project.
```

After bootstrap, describe requirements normally. The generated `AGENTS.md` routes future work through the established context and workflow. No KuVibe installation or CLI knowledge is required.

For a project already using an older KuVibe, replace only `kuVibe.md`. The agent recognizes the legacy harness, migrates it by Project Schema, and preserves project context, business documentation, custom rules, and historical notes instead of reinitializing a project that lacks version state. See [Versions and Safe Upgrades](./docs/product/versioning.md).

## Repository

- `kuVibe.md`: reusable agent bootstrap specification and primary product
- `.agents/`: KuVibe's own project context, workflow, and engineering memory
- `templates/`: reusable output templates
- `migrations/`: consecutive, validated Project Schema migration specifications
- `evals/`: agent-behavior evaluation cases
- `packages/cli/`: optional deterministic repository tools
- `docs/`: VitePress documentation source

## Development

Requires Node.js 24 LTS and pnpm.

```bash
pnpm install
pnpm check
pnpm test
pnpm docs:build
```

The product specification is documented at [docs/index.md](./docs/index.md). On case-insensitive filesystems, the original `KuVibe.md` brief and required `kuVibe.md` product name address the same file; bootstrap therefore normalizes that file into the reusable protocol and records implementation decisions in `.agents/notes/implemented/`.
