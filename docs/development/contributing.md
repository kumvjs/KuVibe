# Contributing

Read `AGENTS.md` and established context first. Use pnpm, strict TypeScript, bounded filesystem access, machine-readable output, and minimal dependencies. Update protocol docs and evals when agent behavior changes.

Public tool behavior must remain deterministic and read-only. Add evidence-backed tests for new detection rules.

## Release checks

Decide protocol SemVer, Project Schema, and affected Template Revisions independently for every release. Do not change Schema when the structural contract is unchanged. For a structural change, increment Schema by one and add the consecutive `migrations/NNN-to-NNN.md`. Update `CHANGELOG.md`, `kuVibe.md` metadata, templates, the compact migration index, old-schema upgrade evals, and project-content preservation cases. Before release, verify current-schema refresh, cross-schema migration, customization preservation, and failure without premature state advancement.
