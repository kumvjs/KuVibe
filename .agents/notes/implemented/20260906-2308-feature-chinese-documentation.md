# [feature] Add Chinese documentation

Date: 2026-09-06T23:08:11+08:00
Type: feature
Modules: documentation, project-description
Related Requirement: Separate the English and Chinese project descriptions and provide complete Chinese VitePress documentation.
Related PR / Commit: N/A

## Problem

The repository mixed a short Chinese introduction into the English README and offered documentation only in English. Chinese readers had no dedicated project entry point or localized documentation navigation.

## Decision

Keep `README.md` English-only and add a complete `README.zh.md` translation with reciprocal language links. Preserve all existing English documentation URLs, mirror every published page under `docs/zh/`, and use VitePress's native locale routing for Simplified Chinese navigation and interface labels.

The protocol, templates, CLI output, and source code remain English because this change localizes the public project description and documentation rather than the executable protocol surface.

## Implementation

- Added language-specific README files and the requested Vibe Coding positioning.
- Updated the English documentation homepage description.
- Added 17 Chinese pages matching all 17 English documentation pages.
- Added `zh-CN` site metadata, Chinese navigation, sidebar, page controls, accessibility labels, and locale-aware language switching.

## Verification

- `pnpm --config.verify-deps-before-run=false docs:build` — passed with VitePress 1.6.4.
- Generated pages use `lang="en-US"` and `lang="zh-CN"` respectively.
- Inner-page language switching preserves the corresponding page path.
- English and Chinese documentation trees each contain 17 Markdown pages.
- `node packages/cli/dist/src/cli.js validate .` — valid with no issues before this note.
- `git diff --check` — passed.

The root `pnpm validate` script and three detector tests have pre-existing working-directory/fixture issues unrelated to documentation localization.

## Documentation Impact

Product description: updated. Documentation UI and navigation: updated. Product behavior, workflow, data model, API/CLI, operations, and architecture: unchanged.

## Consequences

English documentation remains backward-compatible at its current URLs. Chinese readers can enter through `README.zh.md` or select 简体中文 in the site header, and every current documentation page has a localized counterpart under `/zh/`.

Future published documentation pages should add or update the matching Chinese page to preserve locale parity.
