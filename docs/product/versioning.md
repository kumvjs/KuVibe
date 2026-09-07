# Versions and Safe Upgrades

KuVibe uses three independent version values:

| Version | Meaning | Changes when |
| --- | --- | --- |
| KuVibe Release (SemVer) | Overall protocol capability | Fixes, compatible capabilities, or incompatible protocol behavior ship |
| Project Schema (integer) | Structure contract of the in-project KuVibe harness | Required files, directories, responsibilities, or lifecycles change |
| Template Revision (integer) | One managed template or block | That template changes |

Project Schema determines migration; SemVer does not. The current release is KuVibe `0.2.0`, Project Schema `2`, with implicit Schema `1` as the minimum supported schema.

## Upgrading an existing project

Replace the root `kuVibe.md` with the new version and ask the agent to read it. The agent compares the declaration in that file with `.agents/kuvibe.yaml`:

```text
No state + no old harness       -> Bootstrap
No state + old harness exists   -> Legacy Adoption (implicit Schema 1)
Old Schema < current Schema     -> Migration
Same Schema + older Release     -> Refresh
Same Schema and Release         -> Maintenance
Project newer than kuVibe.md    -> Stop the downgrade
```

It is normal for a pre-versioning project to lack `.agents/kuvibe.yaml`; that must not trigger re-bootstrap. Existing markers such as `AGENTS.md`, `.agents/project.md`, or `.agents/context/stack.md` select conservative legacy adoption.

## Safe removal and preservation

Every affected artifact is classified first:

- KuVibe-owned: refresh a managed template or block only after confirming it is unmodified.
- Mixed: retain customization and merge.
- Project-owned: do not rewrite or delete project context, business documentation, or historical notes by default.

The removal order is merge, deprecate, then delete. Deletion is allowed only when an explicit migration permits it, useful content has moved, the artifact is KuVibe-owned, and no user customization exists. Otherwise the file remains with a deprecation notice.

## Sequential migration and failure

Multiple schemas are migrated one step at a time, such as `1 -> 2 -> 3`, using an explicit `migrations/NNN-to-NNN.md` specification and validation for each transition. The current `kuVibe.md` also carries a compact index of migrations it supports, preserving the copy-one-file experience.

Failure stops later migrations. The agent reports completed and pending steps and retains the last validated schema. It updates `.agents/kuvibe.yaml` only after file changes, validation, and the migration note succeed.
