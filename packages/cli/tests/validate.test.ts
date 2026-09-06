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
    await writeFile(target, '# Fixture\n')
  }
  assert.equal((await validate(root)).valid, true)

  await writeFile(join(root, '.agents/notes/implemented/bad.md'), '# Bad\n')
  const invalid = await validate(root)
  assert.equal(invalid.valid, false)
  assert.ok(invalid.issues.some((issue) => issue.code === 'invalid-note-name'))
})
