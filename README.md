# KuVibe

> **Ku is Cool.**

Ku 表达“酷 / Cool”，Vibe 来自 Vibe Coding。

KuVibe is a file-first software engineering protocol for Vibe Coding. Users describe what they want; coding agents handle project context, focused clarification, engineering analysis, acceptance, implementation planning, verification, living documentation, and durable engineering memory.

## Use KuVibe

Copy [`kuVibe.md`](./kuVibe.md) into a project and tell your coding agent:

```text
Read @kuVibe.md and initialize this project.
```

After bootstrap, describe requirements normally. The generated `AGENTS.md` routes future work through the established context and workflow. No KuVibe installation or CLI knowledge is required.

## Repository

- `kuVibe.md`: reusable agent bootstrap specification and primary product
- `.agents/`: KuVibe's own project context, workflow, and engineering memory
- `templates/`: reusable output templates
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
