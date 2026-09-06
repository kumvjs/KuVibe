import { readdir } from 'node:fs/promises'
import { relative, resolve, sep } from 'node:path'
import { detectCpp } from './detectors/cpp.js'
import { detectDotnet } from './detectors/dotnet.js'
import { detectGo } from './detectors/go.js'
import { detectInfrastructure } from './detectors/infra.js'
import { detectJava } from './detectors/java.js'
import { detectNode } from './detectors/node.js'
import { detectPython } from './detectors/python.js'
import { detectRust } from './detectors/rust.js'
import { deduplicateEvidence } from './evidence.js'
import { createWorkspaceResult, type DetectionEvidence, type DetectionResult } from './result.js'
import { Scanner, isRecord } from './scanner.js'

type Detector = (scanner: Scanner) => Promise<DetectionEvidence[]>

const detectors: Detector[] = [
  detectNode,
  detectJava,
  detectPython,
  detectCpp,
  detectGo,
  detectRust,
  detectDotnet,
  detectInfrastructure
]

export async function detect(root = '.'): Promise<DetectionResult> {
  const absoluteRoot = resolve(root)
  const workspaceRoots = await discoverWorkspaceRoots(absoluteRoot)
  const workspaces = []

  for (const workspaceRoot of workspaceRoots) {
    const scanner = new Scanner(workspaceRoot)
    const groups = await Promise.all(detectors.map(async (detector) => detector(scanner)))
    const evidence = deduplicateEvidence(groups.flat())
    const path = workspaceRoot === absoluteRoot ? '.' : toPortablePath(relative(absoluteRoot, workspaceRoot))
    workspaces.push(createWorkspaceResult(path, evidence))
  }

  return { schemaVersion: 1, root: absoluteRoot, workspaces }
}

async function discoverWorkspaceRoots(root: string): Promise<string[]> {
  const scanner = new Scanner(root)
  const patterns = new Set<string>()
  const workspaceFile = await scanner.text('pnpm-workspace.yaml')
  if (workspaceFile) {
    for (const match of workspaceFile.matchAll(/^\s*-\s*['"]?([^'"#\n]+)['"]?\s*$/gm)) {
      const pattern = match[1]?.trim()
      if (pattern) patterns.add(pattern)
    }
  }

  const manifest = await scanner.json('package.json')
  const configured = manifest?.workspaces
  if (Array.isArray(configured)) {
    for (const value of configured) if (typeof value === 'string') patterns.add(value)
  } else if (isRecord(configured) && Array.isArray(configured.packages)) {
    for (const value of configured.packages) if (typeof value === 'string') patterns.add(value)
  }

  const roots = new Set([root])
  for (const pattern of [...patterns].sort()) {
    for (const candidate of await expandSimpleWorkspacePattern(root, pattern)) roots.add(candidate)
    if (roots.size >= 101) break
  }
  return [...roots].sort((left, right) => left.localeCompare(right))
}

async function expandSimpleWorkspacePattern(root: string, pattern: string): Promise<string[]> {
  const normalized = pattern.replaceAll('\\', '/').replace(/^\.\//, '').replace(/\/$/, '')
  if (normalized.startsWith('../') || normalized.startsWith('/') || normalized.includes('..')) return []
  if (!normalized.includes('*')) return [resolve(root, normalized)]

  const star = normalized.indexOf('*')
  const base = normalized.slice(0, star).replace(/\/$/, '')
  const suffix = normalized.slice(star + 1).replace(/^\//, '')
  if (suffix.includes('*')) return []

  try {
    const entries = await readdir(resolve(root, base), { withFileTypes: true })
    return entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules')
      .slice(0, 100)
      .map((entry) => resolve(root, base, entry.name, suffix))
  } catch {
    return []
  }
}

function toPortablePath(path: string): string {
  return sep === '/' ? path : path.split(sep).join('/')
}

export type { Confidence, DetectionEvidence, DetectionResult, EvidenceCategory, WorkspaceDetection } from './result.js'
