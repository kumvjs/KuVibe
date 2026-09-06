import assert from 'node:assert/strict'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import test from 'node:test'
import { docsNav } from '../src/docs-nav/index.js'

test('builds deterministic navigation from Markdown titles', async (context) => {
  const root = await mkdtemp(join(tmpdir(), 'kuvibe-docs-'))
  context.after(async () => rm(root, { recursive: true, force: true }))
  await mkdir(join(root, 'guide'), { recursive: true })
  await mkdir(join(root, '.vitepress'), { recursive: true })
  await writeFile(join(root, 'index.md'), '# Home\n')
  await writeFile(join(root, 'guide/index.md'), '# Guide\n')
  await writeFile(join(root, 'guide/setup.md'), '---\ntitle: ignored\n---\n# `Setup`\n')
  await writeFile(join(root, '.vitepress/hidden.md'), '# Hidden\n')

  const result = await docsNav(root)
  assert.equal(result.items[0]?.text, 'Home')
  const guide = result.items.find((item) => item.text === 'Guide')
  assert.deepEqual(guide?.items, [
    { text: 'Guide', link: '/guide/' },
    { text: 'Setup', link: '/guide/setup' }
  ])
})
