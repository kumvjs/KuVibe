#!/usr/bin/env node

import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { detect } from './detect/index.js'
import { docsNav } from './docs-nav/index.js'
import { validate } from './validate/index.js'

const usage = 'Usage: kuvibe-tools <detect|validate|docs-nav> [root]'

export async function run(argv: string[]): Promise<number> {
  const [command, rootArgument, ...extra] = argv
  if (!command || extra.length > 0 || !['detect', 'validate', 'docs-nav'].includes(command)) {
    process.stderr.write(`${usage}\n`)
    return 1
  }

  const root = resolve(rootArgument ?? (command === 'docs-nav' ? 'docs' : '.'))
  try {
    if (!(await stat(root)).isDirectory()) throw new Error('the requested root is not a directory')
    const result = command === 'detect' ? await detect(root) : command === 'validate' ? await validate(root) : await docsNav(root)
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
    return command === 'validate' && 'valid' in result && !result.valid ? 2 : 0
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    process.stderr.write(`kuvibe-tools: ${message}\n`)
    return 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await run(process.argv.slice(2))
}
