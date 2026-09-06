import assert from 'node:assert/strict'
import { resolve } from 'node:path'
import test from 'node:test'
import { detect } from '../src/detect/index.js'

const fixtures = resolve('../../fixtures')

test('detects Node, TypeScript, NestJS, pnpm, and Prisma from metadata', async () => {
  const result = await detect(resolve(fixtures, 'nestjs'))
  const workspace = result.workspaces[0]
  assert.ok(workspace)
  assert.deepEqual(workspace.languages, ['javascript', 'typescript'])
  assert.deepEqual(workspace.runtimes, ['nodejs'])
  assert.ok(workspace.frameworks.includes('nestjs'))
  assert.ok(workspace.packageManagers.includes('pnpm'))
  assert.ok(workspace.orms.includes('prisma'))
  assert.ok(workspace.evidence.every((item) => item.evidence.length > 0))
})

test('detects the supported non-Node language fixtures', async () => {
  const expectations: Array<[string, string, string]> = [
    ['spring', 'java', 'spring-boot'],
    ['python', 'python', 'fastapi'],
    ['cpp', 'cpp', 'cmake'],
    ['go', 'go', 'gin'],
    ['rust', 'rust', 'tokio'],
    ['dotnet', 'csharp', 'aspnet-core']
  ]

  for (const [fixture, language, technology] of expectations) {
    const workspace = (await detect(resolve(fixtures, fixture))).workspaces[0]
    assert.ok(workspace, fixture)
    assert.ok(workspace.languages.includes(language), `${fixture} language`)
    const detected = [...workspace.frameworks, ...workspace.buildSystems]
    assert.ok(detected.includes(technology), `${fixture} technology`)
  }
})

test('discovers simple pnpm workspace packages', async () => {
  const result = await detect(resolve(fixtures, 'monorepo'))
  assert.deepEqual(
    result.workspaces.map((workspace) => workspace.path),
    ['.', 'packages/api']
  )
  assert.ok(result.workspaces[1]?.frameworks.includes('express'))
})
