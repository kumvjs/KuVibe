# [migration] Version KuVibe and adopt legacy projects safely

Date: 2026-09-07T12:03:59+08:00
Type: migration
Modules: protocol, project-context, workflows, templates, migrations, evals, tooling, documentation
Related Requirement: Add KuVibe version identifiers and allow old projects to use a newer `kuVibe.md` safely, including releases that remove artifacts.
Related PR / Commit: N/A

## Problem

The original protocol detected only a few harness files. It had no durable release/schema state, could not distinguish refresh from structural migration, and risked treating every pre-versioning project as a new bootstrap after users copied a newer `kuVibe.md`.

## Context

KuVibe must retain its copy-one-file experience and cannot require a CLI or network. Existing projects contain project-owned knowledge, customized agent instructions, living documentation, and append-only historical notes. Template revision metadata alone cannot prove content is unmodified.

## Decision

Introduce three independent version axes: KuVibe release SemVer, monotonic integer Project Schema, and per-template integer revision. Release `0.2.0` uses Project Schema `2`; the pre-versioning harness is formally implicit Schema `1`.

Absence of `.agents/kuvibe.yaml` is ambiguous. With no harness markers it means Bootstrap; with any legacy marker it means Legacy Adoption. Migration is driven only by schema comparison. Same-schema releases use Refresh, while newer project state blocks accidental downgrade.

Use ownership-aware updates: KuVibe-owned content may refresh only when unmodified, mixed content is merged, and project-owned context/docs/notes are preserved. Unknown provenance is mixed. Removal follows merge, deprecate, delete, with deletion allowed only by an explicit migration after proving ownership, lack of customization, and successful content transfer.

## Alternatives Considered

- Treat missing state as Bootstrap: rejected because all existing pre-versioning projects lack state and could be overwritten.
- Bind migrations to SemVer major/minor: rejected because protocol behavior and project structure evolve independently.
- Require users to copy a migration bundle or run an upgrade CLI: rejected because it breaks the file-first user contract.
- Automatically replace files by template revision: rejected because revision identifies a candidate but does not prove the body is unmodified.

## Important Constraints

- The current `kuVibe.md` must carry a compact index for every supported consecutive migration.
- Maintainers keep expanded canonical specs under `migrations/`.
- Metadata advances only after pre-commit validation and a migration note; final validation is read-only.
- No migration may reset Git, create backup-directory clutter, or rewrite historical note bodies.

## Implementation

- Declared KuVibe `0.2.0`, Project Schema `2`, and minimum supported Schema `1` in `kuVibe.md`.
- Added state routing for Bootstrap, Legacy Adoption, Maintenance, Refresh, Migration, unsupported migration, invalid state, and downgrade protection.
- Added `.agents/kuvibe.yaml`, its reusable template, template metadata, and bounded `AGENTS.md` router blocks.
- Added the canonical additive `001-to-002` migration and a changelog/release policy.
- Extended the optional validator to check bounded version files, protocol/project consistency, timestamps, template revisions, managed workflow metadata, and router boundaries.
- Added behavior evals for legacy adoption, customized workflow preservation, and interrupted migration.
- Updated English and Chinese quick start, versioning, lifecycle, bootstrap, tooling, architecture, eval, and contributor documentation.

## Verification

- `pnpm --config.verify-deps-before-run=false check` — passed.
- `node --test packages/cli/dist/tests/validate.test.js` — 5 tests passed.
- `node packages/cli/dist/src/cli.js validate .` — valid, no issues.
- `pnpm --config.verify-deps-before-run=false docs:build` — passed.
- `git diff --check` — passed.
- Full `pnpm test` reaches three pre-existing detector failures because the tracked tests reference a repository-level `fixtures/` directory that is absent from this checkout; version-validation tests pass and the failure is unrelated to this migration.

## Documentation Updated

Product behavior, workflows, project metadata, optional validator API behavior, operations/release practice, and architecture were updated in both languages. UI impact: N/A. Business-domain rules: N/A.

## Consequences

Users can continue upgrading by replacing only `kuVibe.md`. Old projects are conservatively adopted instead of reinitialized, structural changes have explicit sequential migrations, and removed artifacts cannot be silently deleted when customization or value is uncertain.

## Follow-ups

- Restore or recreate the missing detector fixtures in a separate repair so the unrelated full test suite passes.
- Consider deterministic content digests only if Git evidence and conservative mixed ownership prove insufficient in real upgrades.
