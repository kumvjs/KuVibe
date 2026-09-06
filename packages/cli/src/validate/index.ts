import { readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

export type ValidationSeverity = 'error' | 'warning'

export interface ValidationIssue {
  code: string
  severity: ValidationSeverity
  path: string
  message: string
}

export interface ValidationResult {
  schemaVersion: 1
  root: string
  valid: boolean
  issues: ValidationIssue[]
}

const requiredFiles = [
  'kuVibe.md',
  'AGENTS.md',
  '.agents/project.md',
  '.agents/context/stack.md',
  '.agents/context/architecture.md',
  '.agents/context/conventions.md',
  '.agents/workflow/requirement.md',
  '.agents/workflow/development.md',
  '.agents/workflow/review.md',
  '.agents/workflow/documentation.md'
] as const

const notePattern = /^\d{8}-\d{4}-[a-z][a-z0-9-]*-[a-z0-9][a-z0-9-]*\.md$/

export async function validate(root = '.'): Promise<ValidationResult> {
  const absoluteRoot = resolve(root)
  const issues: ValidationIssue[] = []

  for (const path of requiredFiles) {
    if (!(await isFile(resolve(absoluteRoot, path)))) {
      issues.push({ code: 'missing-required-file', severity: 'error', path, message: `Required file is missing: ${path}` })
    }
  }

  const docsIndex = 'docs/index.md'
  if (!(await isFile(resolve(absoluteRoot, docsIndex)))) {
    issues.push({ code: 'missing-docs-index', severity: 'warning', path: docsIndex, message: 'Living documentation has no docs/index.md.' })
  }

  const noteDirectory = resolve(absoluteRoot, '.agents/notes/implemented')
  try {
    const entries = await readdir(noteDirectory, { withFileTypes: true })
    for (const entry of entries) {
      const path = `.agents/notes/implemented/${entry.name}`
      if (entry.isDirectory()) {
        issues.push({ code: 'nested-implemented-note', severity: 'error', path, message: 'Implemented notes must use a flat directory.' })
      } else if (entry.isFile() && entry.name.endsWith('.md') && !notePattern.test(entry.name)) {
        issues.push({ code: 'invalid-note-name', severity: 'error', path, message: 'Use YYYYMMDD-HHmm-TYPE-SLUG.md.' })
      }
    }
  } catch {
    issues.push({
      code: 'missing-implemented-notes-directory',
      severity: 'warning',
      path: '.agents/notes/implemented',
      message: 'Create the implemented notes directory before recording meaningful work.'
    })
  }

  issues.sort((left, right) => left.path.localeCompare(right.path) || left.code.localeCompare(right.code))
  return {
    schemaVersion: 1,
    root: absoluteRoot,
    valid: !issues.some((issue) => issue.severity === 'error'),
    issues
  }
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}
