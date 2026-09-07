import { readFile, readdir, stat } from 'node:fs/promises'
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
  '.agents/kuvibe.yaml',
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
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/
const maxMetadataFileBytes = 256 * 1024
const requiredTemplateRevisions = [
  'agents-router',
  'requirement-workflow',
  'development-workflow',
  'review-workflow',
  'documentation-workflow'
] as const

interface ProtocolVersion {
  version: string
  schema: number
  minimumSupportedSchema: number
}

interface ProjectVersion {
  version: string
  schema: number
  templates: Record<(typeof requiredTemplateRevisions)[number], number>
}

export async function validate(root = '.'): Promise<ValidationResult> {
  const absoluteRoot = resolve(root)
  const issues: ValidationIssue[] = []

  for (const path of requiredFiles) {
    if (!(await isFile(resolve(absoluteRoot, path)))) {
      issues.push({ code: 'missing-required-file', severity: 'error', path, message: `Required file is missing: ${path}` })
    }
  }

  const protocolVersion = await readProtocolVersion(absoluteRoot, issues)
  const projectVersion = await readProjectVersion(absoluteRoot, issues)
  if (protocolVersion && projectVersion) {
    if (protocolVersion.version !== projectVersion.version) {
      issues.push({
        code: 'kuvibe-version-mismatch',
        severity: 'error',
        path: '.agents/kuvibe.yaml',
        message: `Project records KuVibe ${projectVersion.version}, but kuVibe.md declares ${protocolVersion.version}.`
      })
    }
    if (protocolVersion.schema !== projectVersion.schema) {
      issues.push({
        code: 'kuvibe-schema-mismatch',
        severity: 'error',
        path: '.agents/kuvibe.yaml',
        message: `Project records schema ${projectVersion.schema}, but kuVibe.md declares ${protocolVersion.schema}.`
      })
    }
  }
  if (projectVersion) await validateManagedArtifacts(absoluteRoot, projectVersion, issues)

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

async function readProtocolVersion(root: string, issues: ValidationIssue[]): Promise<ProtocolVersion | undefined> {
  const path = 'kuVibe.md'
  const content = await readMetadataFile(resolve(root, path), path, issues)
  if (content === undefined) return undefined

  const metadata = content.match(/<!--\s*\nkuvibe:\s*\n([\s\S]*?)-->/)?.[1]
  const version = metadata?.match(/^\s{2}version:\s*(\S+)\s*$/m)?.[1]
  const schemaText = metadata?.match(/^\s{2}projectSchema:\s*(\d+)\s*$/m)?.[1]
  const minimumText = metadata?.match(/^\s{2}minimumSupportedProjectSchema:\s*(\d+)\s*$/m)?.[1]
  const schema = schemaText === undefined ? undefined : Number(schemaText)
  const minimumSupportedSchema = minimumText === undefined ? undefined : Number(minimumText)

  if (!version || !semverPattern.test(version) || !isPositiveInteger(schema) || !isPositiveInteger(minimumSupportedSchema)) {
    issues.push({
      code: 'invalid-kuvibe-protocol-metadata',
      severity: 'error',
      path,
      message: 'Expected valid version, projectSchema, and minimumSupportedProjectSchema metadata.'
    })
    return undefined
  }
  if (minimumSupportedSchema > schema) {
    issues.push({
      code: 'invalid-kuvibe-schema-range',
      severity: 'error',
      path,
      message: 'minimumSupportedProjectSchema cannot exceed projectSchema.'
    })
    return undefined
  }
  return { version, schema, minimumSupportedSchema }
}

async function readProjectVersion(root: string, issues: ValidationIssue[]): Promise<ProjectVersion | undefined> {
  const path = '.agents/kuvibe.yaml'
  const content = await readMetadataFile(resolve(root, path), path, issues)
  if (content === undefined) return undefined

  const state = content.match(/^kuvibe:\s*\n((?:^[ \t]+.*(?:\n|$))*)/m)?.[1]
  const version = state?.match(/^\s{2}version:\s*(\S+)\s*$/m)?.[1]
  const schemaText = state?.match(/^\s{2}schema:\s*(\d+)\s*$/m)?.[1]
  const schema = schemaText === undefined ? undefined : Number(schemaText)
  const initializedAt = content.match(/^initializedAt:\s*(\S+)\s*$/m)?.[1]
  const lastUpdatedAt = content.match(/^lastUpdatedAt:\s*(\S+)\s*$/m)?.[1]

  if (!version || !semverPattern.test(version) || !isPositiveInteger(schema)) {
    issues.push({
      code: 'invalid-kuvibe-project-metadata',
      severity: 'error',
      path,
      message: 'Expected a valid KuVibe SemVer and positive integer project schema.'
    })
    return undefined
  }
  if (!isIsoTimestamp(initializedAt) || !isIsoTimestamp(lastUpdatedAt)) {
    issues.push({
      code: 'invalid-kuvibe-timestamp',
      severity: 'error',
      path,
      message: 'initializedAt and lastUpdatedAt must be ISO-8601 timestamps with timezone offsets.'
    })
  }
  const templates = {} as ProjectVersion['templates']
  for (const template of requiredTemplateRevisions) {
    const escapedTemplate = template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const revision = content.match(new RegExp(`^\\s{2}${escapedTemplate}:\\s*(\\d+)\\s*$`, 'm'))?.[1]
    if (!revision || Number(revision) < 1) {
      issues.push({
        code: 'missing-template-revision',
        severity: 'error',
        path,
        message: `Expected a positive applied revision for ${template}.`
      })
    } else {
      templates[template] = Number(revision)
    }
  }
  return { version, schema, templates }
}

async function validateManagedArtifacts(root: string, project: ProjectVersion, issues: ValidationIssue[]): Promise<void> {
  const routerPath = 'AGENTS.md'
  const router = await readMetadataFile(resolve(root, routerPath), routerPath, issues)
  if (router !== undefined) {
    const starts = [...router.matchAll(/<!-- kuvibe:managed:start template=agents-router revision=(\d+) -->/g)]
    const ends = [...router.matchAll(/<!-- kuvibe:managed:end -->/g)]
    if (starts.length !== 1 || ends.length !== 1 || starts[0]?.index === undefined || ends[0]?.index === undefined || starts[0].index >= ends[0].index) {
      issues.push({
        code: 'invalid-managed-router-block',
        severity: 'error',
        path: routerPath,
        message: 'Expected exactly one balanced agents-router managed block.'
      })
    } else if (Number(starts[0][1]) !== project.templates['agents-router']) {
      issues.push({
        code: 'template-revision-mismatch',
        severity: 'error',
        path: routerPath,
        message: 'The agents-router block revision does not match .agents/kuvibe.yaml.'
      })
    }
  }

  const workflows = [
    ['requirement-workflow', '.agents/workflow/requirement.md'],
    ['development-workflow', '.agents/workflow/development.md'],
    ['review-workflow', '.agents/workflow/review.md'],
    ['documentation-workflow', '.agents/workflow/documentation.md']
  ] as const
  for (const [template, path] of workflows) {
    const content = await readMetadataFile(resolve(root, path), path, issues)
    if (content === undefined) continue
    const metadata = content.match(/<!--\s*\nkuvibe:\s*\n([\s\S]*?)-->/)?.[1]
    const name = metadata?.match(/^\s{2}template:\s*(\S+)\s*$/m)?.[1]
    const revision = metadata?.match(/^\s{2}revision:\s*(\d+)\s*$/m)?.[1]
    const ownership = metadata?.match(/^\s{2}ownership:\s*(\S+)\s*$/m)?.[1]
    if (name !== template || !revision || !['kuvibe', 'mixed'].includes(ownership ?? '')) {
      issues.push({
        code: 'invalid-managed-template-metadata',
        severity: 'error',
        path,
        message: `Expected ${template} metadata with a positive revision and kuvibe or mixed ownership.`
      })
    } else if (Number(revision) !== project.templates[template]) {
      issues.push({
        code: 'template-revision-mismatch',
        severity: 'error',
        path,
        message: `The ${template} revision does not match .agents/kuvibe.yaml.`
      })
    }
  }
}

async function readMetadataFile(path: string, displayPath: string, issues: ValidationIssue[]): Promise<string | undefined> {
  try {
    const file = await stat(path)
    if (!file.isFile()) return undefined
    if (file.size > maxMetadataFileBytes) {
      issues.push({
        code: 'metadata-file-too-large',
        severity: 'error',
        path: displayPath,
        message: `Metadata-bearing file exceeds ${maxMetadataFileBytes} bytes.`
      })
      return undefined
    }
    return await readFile(path, { encoding: 'utf8' })
  } catch {
    if (await isFile(path)) {
      issues.push({
        code: 'unreadable-metadata-file',
        severity: 'error',
        path: displayPath,
        message: 'Metadata-bearing file could not be read.'
      })
    }
    return undefined
  }
}

function isPositiveInteger(value: number | undefined): value is number {
  return value !== undefined && Number.isInteger(value) && value > 0
}

function isIsoTimestamp(value: string | undefined): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return false
  return !Number.isNaN(Date.parse(value))
}
