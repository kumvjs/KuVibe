<!--
kuvibe:
  template: requirement-workflow
  revision: 1
  ownership: kuvibe
-->

# Requirement Workflow

1. Compare `.agents/kuvibe.yaml` with `kuVibe.md`; complete any safe adoption, refresh, or migration before normal requirement work.
2. Retrieve `.agents/project.md`, relevant context, module docs, notes, and source.
3. Normalize the goal, users, behavior, constraints, exclusions, and acceptance signals.
4. Mark completeness as `complete`, `assumable`, or `incomplete`.
5. Record low-risk assumptions. Ask 1–5 focused questions only when answers materially change behavior, boundaries, state, permissions, data, API, security, UI, compatibility, irreversible actions, or acceptance.
6. Classify task, scope, risk, and complexity (Level 0–3).
7. Select only useful perspectives such as architecture, API, UI, security, testing, acceptance, and documentation.
8. For Level 2–3 work, persist requirement, analysis, acceptance, and plan artifacts under `.agents/notes/active/<slug>/` before implementation.

Inspect first. Ask only when material.
