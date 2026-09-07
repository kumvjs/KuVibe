# Changelog

All notable KuVibe protocol changes are recorded here. Release version, project schema, and template revisions are independent values.

## 0.2.0 - 2026-09-07

### Added

- Explicit protocol release and project-schema metadata.
- Safe Bootstrap, Legacy Adoption, Maintenance, Refresh, Migration, and unsupported-version routing.
- Ownership-aware managed metadata and bounded `AGENTS.md` blocks.
- A self-contained supported migration index and canonical schema migration specifications.
- Version metadata validation and migration behavior evals.

### Templates

- `agents-router`: revision 1
- `requirement-workflow`: revision 1
- `development-workflow`: revision 1
- `review-workflow`: revision 1
- `documentation-workflow`: revision 1

### Project Schema

- Schema 1 (implicit pre-versioning harness) → Schema 2 (explicit version state and managed boundaries)

### Migration

- See [`migrations/001-to-002.md`](./migrations/001-to-002.md).

## 0.1.0 - 2026-09-06

### Added

- Initial file-first KuVibe protocol, project harness templates, behavior evals, documentation, and optional deterministic CLI.
