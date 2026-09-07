<!--
kuvibe:
  template: architecture-context
  revision: 1
  ownership: mixed
-->

# Architecture

## System Boundary

KuVibe has two layers:

1. A file-first protocol (`kuVibe.md`, templates, context, docs, evals) interpreted by coding agents.
2. An optional deterministic npm utility (`@kuvibe/cli`) that reports repository facts and validates protocol artifacts.

The protocol remains useful when Node.js, pnpm, the network, or the utility is unavailable.

## Module Relationships

```text
Natural-language intent -> kuVibe.md -> version state / migration -> project context/workflow -> implementation
                                      -> docs (current truth)
                                      -> notes (decision history)

Repository files -> @kuvibe/cli detect   -> factual JSON
Project/docs      -> validate / docs-nav    -> factual JSON
```

## Tooling Data Flow

The CLI resolves a user-supplied root, performs bounded metadata scans, invokes a command module, serializes one result to JSON, and sets a non-zero exit code only for invalid invocation or failed validation.

## Key Decisions

- Protocol files are the product; tooling is an enhancement.
- Protocol SemVer, project schema, and template revisions evolve independently; schema drives migration.
- Project-owned knowledge is preserved, and unknown customization is treated as mixed ownership.
- Detectors are evidence collectors, not recommendation engines.
- Result schemas use simple JSON-compatible data.
- No plugin or framework registry is required for normal use.

## Deployment

Documentation can be deployed as static VitePress output. The tools package is built to `dist/` and published to npm with a bin entry.
