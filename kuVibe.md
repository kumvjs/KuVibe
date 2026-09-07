# KuVibe — Coding Agent Software Engineering Bootstrap Specification

<!--
kuvibe:
  version: 0.2.0
  projectSchema: 2
  minimumSupportedProjectSchema: 1
-->

## 1. KuVibe Identity

**Ku is Cool.** Ku 表达“酷 / Cool”，Vibe 来自 Vibe Coding。KuVibe is a file-first software engineering protocol: the user states intent, while the coding agent supplies context retrieval, focused clarification, engineering analysis, planning, verification, living documentation, and durable engineering memory.

This file is the user interface. Never require the user to install a CLI, learn workflow commands, classify their task, select capabilities, or manage skills.

## 2. User Experience Contract

- Accept natural-language requirements.
- Hide routine workflow mechanics while making material decisions visible.
- Inspect existing evidence before asking questions.
- Ask only questions whose answers materially change the result.
- Continue safely when optional tools, runtimes, networks, or integrations fail.

## 3. Core Engineering Principles

1. Do not immediately implement a meaningful raw requirement.
2. Existing repository evidence and safe conventions beat generic preferences.
3. Established technology choices stay stable during normal work.
4. Load the least context needed to reach adequate confidence.
5. Use task-relevant perspectives, not fixed agent bureaucracy.
6. Current truth belongs in docs; historical decisions belong in timestamped notes.
7. Optimize every artifact for the next agent inheriting the repository.

## 4. Version and Bootstrap Detection

Read this file's `kuvibe` metadata, then inspect `.agents/kuvibe.yaml` before normal requirement work. Also check the legacy harness markers `AGENTS.md`, `.agents/project.md`, and `.agents/context/stack.md`.

- No state file and no harness markers: **Bootstrap**.
- No state file but any harness marker exists: **Legacy Adoption**. Never infer a fresh project merely because version metadata is absent.
- Invalid or internally inconsistent state: stop version writes, report the evidence, and preserve the existing harness.
- Recorded schema is below `minimumSupportedProjectSchema`: **Unsupported Migration**; obtain the missing official consecutive migration specifications before changing files.
- Recorded schema is below `projectSchema`: **Migration**.
- Schemas match and recorded release is older: **Refresh**.
- Schema and release match: **Maintenance**.
- Recorded schema or release is newer: **Unsupported Downgrade**; do not rewrite state or templates with this older protocol.

Schema comparison decides structural migration. SemVer describes the protocol release and never implies migration by itself. Compare SemVer numerically, not lexically.

### 4.1 Project Version State

After a successful bootstrap or upgrade, maintain `.agents/kuvibe.yaml` separately from project knowledge:

```yaml
kuvibe:
  version: 0.2.0
  schema: 2
templates:
  agents-router: 1
  requirement-workflow: 1
  development-workflow: 1
  review-workflow: 1
  documentation-workflow: 1
initializedAt: <ISO-8601 timestamp with offset>
lastUpdatedAt: <ISO-8601 timestamp with offset>
```

Preserve `initializedAt` on upgrades. Update `lastUpdatedAt`, release, schema, and applied template revisions only after relevant validation succeeds. Metadata is system state, not a substitute for Git history or project documentation.

### 4.2 Ownership and Modification Safety

Classify before changing an existing artifact:

- **KuVibe-owned**: unmodified workflow templates and managed blocks may be refreshed automatically.
- **Mixed**: context files and customized managed artifacts may only be merged; preserve project-specific content.
- **Project-owned**: `.agents/project.md`, `.agents/notes/**`, and real project documentation must not be regenerated, overwritten, or deleted by an upgrade.

A template revision only identifies a refresh candidate; it does not prove the file is unmodified. Use managed-block boundaries, metadata, Git evidence, and content comparison. If provenance or modification status is uncertain, treat the artifact as mixed.

For deletion, prefer merge, then deprecation, then deletion. Delete only when the artifact is KuVibe-owned, contains no project customization, its useful content has moved, and the migration specification explicitly permits deletion. Otherwise retain it with a deprecation notice.

### 4.3 Managed Metadata and Blocks

Managed Markdown templates carry hidden metadata with `template`, integer `revision`, and `ownership`. Mixed files such as `AGENTS.md` use bounded regions:

```text
<!-- kuvibe:managed:start template=agents-router revision=1 -->
...managed routing instructions...
<!-- kuvibe:managed:end -->
```

Refresh only that region. Content outside it is project-owned.

### 4.4 Refresh

When schemas match and this release is newer, inspect template revisions and refresh only affected KuVibe-owned content or managed blocks. Merge customized/unknown content. Do not run structural migrations, rewrite project knowledge, or touch historical notes. Validate references, then update state and record a note when the refresh materially changes behavior.

### 4.5 Migration

Run explicit, consecutive schema migrations only: `1 -> 2 -> 3`, never an invented `1 -> 3`. Before editing, inspect relevant Git status/diffs without cleaning or resetting the worktree. For each step:

1. Load that transition's specification from this file's supported migration index; repository maintainers use the expanded canonical copy under `migrations/`.
2. Inventory affected files and ownership, and record preservation requirements.
3. Apply the smallest additive or merge-safe changes.
4. Validate the transition, including retained project docs and notes.
5. Stop on failure and report completed and pending steps; do not advance schema state.

After all steps pass, write one timestamped migration note and then update `.agents/kuvibe.yaml`. Git is the recovery mechanism; do not create backup-directory clutter.

### 4.6 Supported Migration Index

**Schema 1 -> 2 (pre-versioning harness adoption):** Schema 1 is the implicit layout used before `.agents/kuvibe.yaml` existed. Preserve all existing project/context/docs/note content. Add the state file. Convert an unmodified generated `AGENTS.md` router to the managed block format; otherwise preserve its content and add or merge only the bounded router block. Add current template metadata to unmodified workflows; treat customized or uncertain workflows as mixed and merge current requirements without replacing their rules. Ensure requirement routing performs the version check before normal work. Validate all required harness files, managed-block boundaries, readable project context, valid state values, and unchanged historical notes/project documentation. Only then record the schema-1-to-2 migration note and set schema `2` and release `0.2.0`.

## 5. Greenfield Bootstrap

Understand and normalize the project requirement, identify constraints, and resolve material ambiguity. If the stack is not already constrained, research currently maintained options and present exactly three: recommended, conservative alternative, and a specific-strength alternative. Explain maintenance, ecosystem, fit, deployment, performance, hiring, and project constraints. Ask the user to choose once, then persist the choice.

If the technology is explicitly established, do not reopen selection.

## 6. Existing Project Bootstrap

Treat the repository as evidence. Do not recommend a replacement stack. Probe manifests, lockfiles, build/framework config, root structure, then a small sample of entry files. Stop once confidence is sufficient.

## 7. Stack Detection

Detect language, runtime, frameworks, package manager, build system, persistence, workspace structure, and infrastructure. Attach file evidence and confidence. Never infer architecture advice as a detection fact.

## 8. Stack Detection Fallback

Use a lightweight agent probe first. If confidence is insufficient, optionally run `npx -y @kuvibe/cli detect`. If it is unavailable or fails, perform a bounded manual scan and continue. Never ask the user to install KuVibe tooling.

## 9. Stack Profile Generation

Create `.agents/context/stack.md` with facts, language/runtime, frameworks, persistence, build/package management, testing, required engineering rules, project rules, conditional capabilities, and explicit exclusions. Base rules on repository evidence and current official guidance, not a permanent framework-specific KuVibe doctrine.

## 10. Project Context Generation

Create `.agents/project.md` containing the product, users, core domain, established stack, modules, repository shape, deployment, and important constraints. Keep only durable facts.

## 11. Agent Adapter Generation

Create a concise `AGENTS.md` router that tells future agents what context and workflow to read. Other environment adapters must be thin pointers; never duplicate the protocol across many files.

## 12. Requirement Intake

For every non-trivial request, identify the intended outcome, affected users/modules, behavior, constraints, exclusions, and observable acceptance signals before editing.

## 13. Context Retrieval

Read project context, relevant module docs, relevant implemented notes, and only the source/tests needed for the request. Retrieve before clarifying.

## 14. Requirement Completeness

Classify the requirement:

- `complete`: all material decisions are known; continue.
- `assumable`: only low-risk unknowns remain; record assumptions and continue.
- `incomplete`: a material decision is missing; pause for focused clarification.

## 15. Clarification Gate

Ask only when the answer changes business behavior/boundaries, state, permissions, data structure, API contracts, payment, security, significant UI, compatibility, irreversible operations, or acceptance. Ask 1–5 precise questions with concrete choices and a recommendation when possible; never ask for a generic “detailed description.”

## 16. Requirement Normalization

Normalize goals, actors, preconditions, happy path, edge/error behavior, non-goals, constraints, assumptions, and acceptance criteria. For complex work, save this in `.agents/notes/active/<slug>/requirement.md`.

## 17. Task Classification

Classify the work by intent (feature, bugfix, refactor, architecture, performance, security, migration, chore, or a justified extension), not by a user-selected command.

## 18. Scope Detection

Identify affected modules, interfaces, data, UI, operations, docs, and consumers. Prefer the narrowest coherent scope.

## 19. Risk Detection

Assess business, data-loss, security, compatibility, operational, performance, and rollback risk. Escalate workflow depth for high-impact or irreversible change.

## 20. Complexity Routing

- Level 0: tiny and explicit — analyze, implement, verify.
- Level 1: ordinary — analyze, plan, implement, verify, docs impact, optional note.
- Level 2: cross-module — multi-perspective analysis, acceptance, plan, implementation, review, docs, note.
- Level 3: payment, core permissions/security, major migration, breaking API, or architecture migration — research, architecture synthesis, human approval, then full delivery.

## 21. Capability Selection

Choose only relevant capabilities: requirement analysis, architecture, backend/API, frontend, UI, data, security, testing, acceptance, review, documentation, performance, or operations. The current agent may reason directly, use subagents, load native skills, or use tools. Capability need does not imply a particular mechanism.

## 22. Dynamic Engineering Workflow

Build the workflow from scope, risk, and complexity. Do not force every task through fixed PM/analyst/architect/UX roles. Preserve checkpoints that reduce the actual risk.

## 23. Artifact Collaboration

For Level 2–3 work, create reviewable artifacts such as `requirement.md`, `analysis.md`, capability-specific analysis, `acceptance.md`, and `plan.md` in `.agents/notes/active/<slug>/`. Agents implement from these artifacts. Only `active/` may contain subdirectories.

## 24. Implementation

Follow established context and conventions. Implement the smallest complete change, preserve compatibility unless explicitly changed, add tests with behavior, and avoid unrelated refactors.

## 25. Verification

Run focused tests first, then proportional static checks, integration/e2e checks, build, and acceptance verification. Report commands, outcomes, and anything not verified.

## 26. Review

Review correctness, regressions, security, compatibility, maintainability, tests, operations, and documentation. Resolve material findings before completion.

## 27. Living Documentation

Markdown under `docs/` is current truth and VitePress is only presentation. Organize around product/business modules and real architecture. Do not generate empty placeholder pages. Create UI docs only when pages, visual design, forms, interactions, states, or user flows exist.

## 28. Documentation Impact Gate

Before completion, explicitly evaluate impact on business rules, workflows, data model, API/CLI, UI, operations, and architecture. Update affected docs or record N/A.

## 29. Engineering Notes

Write meaningful history to `.agents/notes/implemented/YYYYMMDD-HHmm-TYPE-SLUG.md` using developer-local time and an ISO timestamp inside. Include problem, context, decision, alternatives, constraints, implementation, verification, docs, consequences, and follow-ups. Do not write notes for mere typos/formatting or trivial patches. Consolidate completed active artifacts into one note and remove their directory. Upgrade notes use type `migration` or `refresh`; never rewrite historical note bodies during an upgrade.

## 30. Completion Gate

Finish only when the requirement and blocking questions are resolved, implementation and proportional tests pass, acceptance is verified, review is complete, documentation impact is handled, and a note is written or explicitly N/A.

## 31. Architecture Change Workflow

For changes to system boundaries, module ownership, public contracts, persistence strategy, deployment topology, or protocol fundamentals: document drivers and alternatives, obtain approval for Level 3 risk, update current architecture docs, implement/verify migration and rollback paths, and preserve rationale in an architecture note.

## 32. Maintenance and Refresh

Perform the version check before normal maintenance. Update context only when durable facts change. Correct stale context discovered during work. Do not re-bootstrap or overwrite project-specific knowledge. Periodically validate version state, managed boundaries, links, note naming, required context, tools output, and eval coverage.

## 33. Failure and Graceful Degradation

If optional tooling, package downloads, networking, subagents, skills, or documentation rendering fail, state the limitation and continue with safe local reasoning and available checks. Never make optional infrastructure a prerequisite for understanding or developing the project.

## Completion Checklist

```text
Requirement understood          ✓
Version state / upgrade         ✓ / N/A
Blocking questions resolved     ✓
Implementation                  ✓
Tests and acceptance            ✓
Review                          ✓
Documentation impact            ✓ / N/A
Engineering note                ✓ / N/A
```
