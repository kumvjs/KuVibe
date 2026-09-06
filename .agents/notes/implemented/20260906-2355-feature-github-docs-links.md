# [feature] Add GitHub links to the documentation site

Date: 2026-09-06T23:55:28+08:00
Type: feature
Modules: documentation
Related Requirement: Add the GitHub project link to the documentation site, including the top-right header navigation.
Related PR / Commit: N/A

## Problem

The documentation site did not provide a direct route to the KuVibe GitHub repository from either its landing pages or persistent header controls.

## Decision

Use VitePress's native GitHub social link in both locale theme configurations so the repository remains available from the top-right header on every page. Add an explicit GitHub action to both localized homepages for a discoverable content-level entry point.

## Implementation

- Added a GitHub social icon linked to `https://github.com/kumvjs/KuVibe` for the Chinese and English themes.
- Added localized GitHub project actions to the Chinese and English homepage heroes.

## Verification

- `pnpm docs:build` — passed with VitePress 1.6.4.
- Generated Chinese and English homepages contain the repository URL and their localized GitHub action labels.
- `pnpm check` — passed.

## Documentation Impact

The documentation UI and homepage navigation changed. Product behavior, engineering workflow, data model, API/CLI, operations, and architecture are unchanged.

## Consequences

Readers can reach the repository from either homepage and from the persistent header in both supported locales. The repository URL now lives in the VitePress locale configuration and each localized homepage frontmatter.
