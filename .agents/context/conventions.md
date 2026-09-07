<!--
kuvibe:
  template: conventions-context
  revision: 1
  ownership: mixed
-->

# Conventions

## Naming and Directories

- TypeScript files and CLI commands use kebab-case where visible to users.
- Public types use PascalCase; functions and values use camelCase.
- Tests mirror source capabilities in `packages/cli/tests/`.
- Long-term notes use `YYYYMMDD-HHmm-TYPE-SLUG.md`.

## Interfaces and Errors

- Command output is JSON with an explicit `schemaVersion` where evolution matters.
- Expected repository conditions are represented as result issues/evidence, not thrown errors.
- Invalid CLI usage and unreadable requested roots produce concise stderr messages and exit code 1.

## Filesystem and Security

- Resolve paths from an explicit root and never mutate the inspected project.
- Do not follow broad recursive trees; skip generated/vendor/VCS directories.
- Read only recognized manifests/configuration and cap file sizes.

## Testing

- Unit tests use `node:test` and temporary directories.
- Every detector behavior must identify its supporting file evidence.
- Changes to JSON shape require tests and docs review.

## Documentation

Use relative Markdown links. Describe current behavior in docs and rationale/history in notes. Do not create empty module pages.

## KuVibe Versions

- Use SemVer for protocol releases, positive integers for project schema and template revisions.
- Add one consecutive migration specification whenever schema changes.
- Update version state only after validation; preserve project-owned content by default.
