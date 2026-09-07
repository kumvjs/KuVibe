import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { tmpdir } from 'node:os'
import test from 'node:test'
import { validate } from '../src/validate/index.js'

test('reports missing harness files as errors', async (context) => {
  const root = await mkdtemp(join(tmpdir(), 'kuvibe-validate-'))
  context.after(async () => rm(root, { recursive: true, force: true }))
  const result = await validate(root)
  assert.equal(result.valid, false)
  assert.ok(result.issues.some((issue) => issue.code === 'missing-required-file'))
})

test('accepts a complete harness and validates flat note names', async (context) => {
  const root = await mkdtemp(join(tmpdir(), 'kuvibe-validate-'))
  context.after(async () => rm(root, { recursive: true, force: true }))
  const required = [
    'kuVibe.md',
    'AGENTS.md',
    '.agents/kuvibe.yaml',
    '.agents/project.md',
    '.agents/context/stack.md',
    '.agents/context/architecture.md',
    '.agents/context/conventions.md',
    '.agents/workflow/requirement.md',
    '.agents/workflow/development.md',
    '.agents/workflow/review.md',
    '.agents/workflow/documentation.md',
    'docs/index.md',
    '.agents/notes/implemented/20260906-2200-feature-example.md'
  ]
  for (const path of required) {
    const target = join(root, path)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, fixtureContent(path))
  }
  assert.equal((await validate(root)).valid, true)

  await writeFile(join(root, '.agents/notes/implemented/bad.md'), '# Bad\n')
  const invalid = await validate(root)
  assert.equal(invalid.valid, false)
  assert.ok(invalid.issues.some((issue) => issue.code === 'invalid-note-name'))
})

test('rejects malformed KuVibe project metadata', async (context) => {
  const root = await createCompleteHarness(context)
  await writeFile(join(root, '.agents/kuvibe.yaml'), 'kuvibe:\n  version: latest\n  schema: two\n')

  const result = await validate(root)
  assert.equal(result.valid, false)
  assert.ok(result.issues.some((issue) => issue.code === 'invalid-kuvibe-project-metadata'))
})

test('reports protocol and project version mismatches', async (context) => {
  const root = await createCompleteHarness(context)
  await writeFile(join(root, '.agents/kuvibe.yaml'), projectState('0.1.0', 1))

  const result = await validate(root)
  assert.equal(result.valid, false)
  assert.ok(result.issues.some((issue) => issue.code === 'kuvibe-version-mismatch'))
  assert.ok(result.issues.some((issue) => issue.code === 'kuvibe-schema-mismatch'))
})

test('rejects broken managed boundaries and template metadata', async (context) => {
  const root = await createCompleteHarness(context)
  await writeFile(join(root, 'AGENTS.md'), '<!-- kuvibe:managed:start template=agents-router revision=1 -->\n')
  await writeFile(join(root, '.agents/workflow/review.md'), '# Customized without metadata\n')

  const result = await validate(root)
  assert.equal(result.valid, false)
  assert.ok(result.issues.some((issue) => issue.code === 'invalid-managed-router-block'))
  assert.ok(result.issues.some((issue) => issue.code === 'invalid-managed-template-metadata'))
})

async function createCompleteHarness(context: { after: (fn: () => Promise<void>) => void }): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), 'kuvibe-validate-'))
  context.after(async () => rm(root, { recursive: true, force: true }))
  const paths = [
    'kuVibe.md',
    'AGENTS.md',
    '.agents/kuvibe.yaml',
    '.agents/project.md',
    '.agents/context/stack.md',
    '.agents/context/architecture.md',
    '.agents/context/conventions.md',
    '.agents/workflow/requirement.md',
    '.agents/workflow/development.md',
    '.agents/workflow/review.md',
    '.agents/workflow/documentation.md',
    'docs/index.md'
  ]
  for (const path of paths) {
    const target = join(root, path)
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, fixtureContent(path))
  }
  return root
}

function fixtureContent(path: string): string {
  if (path === 'kuVibe.md') {
    return '# KuVibe\n\n<!--\nkuvibe:\n  version: 0.2.0\n  projectSchema: 2\n  minimumSupportedProjectSchema: 1\n-->\n'
  }
  if (path === '.agents/kuvibe.yaml') return projectState('0.2.0', 2)
  if (path === 'AGENTS.md') {
    return '# Router\n\n<!-- kuvibe:managed:start template=agents-router revision=1 -->\nManaged\n<!-- kuvibe:managed:end -->\n'
  }
  const workflowTemplate = new Map([
    ['.agents/workflow/requirement.md', 'requirement-workflow'],
    ['.agents/workflow/development.md', 'development-workflow'],
    ['.agents/workflow/review.md', 'review-workflow'],
    ['.agents/workflow/documentation.md', 'documentation-workflow']
  ]).get(path)
  if (workflowTemplate) {
    return `<!--
kuvibe:
  template: ${workflowTemplate}
  revision: 1
  ownership: kuvibe
-->

# Fixture
`
  }
  return '# Fixture\n'
}

function projectState(version: string, schema: number): string {
  return `kuvibe:
  version: ${version}
  schema: ${schema}
templates:
  agents-router: 1
  requirement-workflow: 1
  development-workflow: 1
  review-workflow: 1
  documentation-workflow: 1
initializedAt: 2026-09-07T10:00:00+08:00
lastUpdatedAt: 2026-09-07T10:00:00+08:00
`
}
