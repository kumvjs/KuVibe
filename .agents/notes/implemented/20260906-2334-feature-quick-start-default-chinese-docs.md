# [feature] Add quick start and make Chinese the default documentation locale

Date: 2026-09-06T23:34:27+08:00
Type: feature
Modules: documentation
Related Requirement: Add a practical quick-start guide, replace the documentation homepage protocol CTA with quick start, and make Chinese the default documentation language.
Related PR / Commit: N/A

## Problem

The documentation homepage sent new users to product philosophy instead of showing how to begin, and the root documentation routes rendered English even though the primary audience now expects Chinese by default.

## Decision

Publish the existing Chinese source tree at root routes and publish the English source tree under `/en/` using VitePress rewrites. Keep the source files in their established locations to avoid a mechanical documentation-tree migration. Treat Simplified Chinese as the root locale and retain English as a complete selectable locale.

Add equivalent Chinese and English quick-start pages. Make them the primary homepage action and the first navigation/sidebar entry in each locale.

## Implementation

- Added a three-step guide covering `kuVibe.md` download, project initialization, and normal requirement entry.
- Added completion signals so users can confirm that initialization created the required project context.
- Changed the Chinese homepage action to `快速开始` and the English action to `Quick Start`.
- Remapped Chinese pages from `docs/zh/` to root published routes and English pages from `docs/` to `/en/`.
- Reversed locale metadata, navigation, sidebar, page controls, accessibility labels, and not-found behavior so the root site is `zh-CN`.

## Verification

- `pnpm docs:build` — passed with VitePress 1.6.4.
- Generated `/index.html` and `/getting-started.html` use `lang="zh-CN"`; generated `/en/index.html` and `/en/getting-started.html` use `lang="en-US"`.
- Generated homepage actions point to `/getting-started` and `/en/getting-started` respectively.
- Language switching on quick-start pages maps between `/getting-started` and `/en/getting-started`.
- `pnpm check` — passed.
- `node packages/cli/dist/src/cli.js validate .` — valid with no issues before this note.
- `git diff --check` — passed before this note.

`pnpm test` still has three pre-existing detector fixture/working-directory failures; its documentation navigation and validation tests pass. The root `pnpm validate` script also retains its pre-existing package working-directory issue, while direct validation from the repository root passes.

## Documentation Impact

Documentation content, navigation, locale routing, and published URLs changed. Product behavior, engineering workflow, data model, API/CLI, operations, and architecture are unchanged.

## Consequences

The documentation root now gives Chinese readers the shortest path to first use. English remains available under `/en/`. Existing `/zh/` published URLs are superseded by their equivalent root URLs, and previous English root URLs now live under `/en/`.

Future public documentation pages should continue to be authored in both source trees; VitePress rewrites determine their published locale paths.
