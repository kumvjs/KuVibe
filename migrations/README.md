# Project Schema Migrations

This directory is the maintainer-facing canonical history for KuVibe project harness migrations. Project schema is an integer and changes only when the required layout or artifact contract changes; it is independent of the KuVibe release SemVer and template revisions.

Rules:

- Keep one explicit `NNN-to-NNN.md` specification for every consecutive transition.
- Never skip a transition when upgrading across multiple schemas.
- Include the applicable transition in the current `kuVibe.md` supported migration index so the single-file user experience remains functional.
- Preserve project-owned knowledge and unknown customizations.
- Validate a transition before advancing `.agents/kuvibe.yaml`.
- Stop on failure and leave the recorded schema at the last successfully validated value.

Available transitions:

- [Project Schema 1 to 2](./001-to-002.md)
