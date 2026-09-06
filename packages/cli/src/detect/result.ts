export type EvidenceCategory =
  | 'language'
  | 'runtime'
  | 'framework'
  | 'package-manager'
  | 'build'
  | 'database'
  | 'orm'
  | 'infra'

export type Confidence = 'high' | 'medium' | 'low'

export interface DetectionEvidence {
  id: string
  category: EvidenceCategory
  confidence: Confidence
  evidence: string[]
}

export interface WorkspaceDetection {
  path: string
  languages: string[]
  runtimes: string[]
  frameworks: string[]
  packageManagers: string[]
  buildSystems: string[]
  databases: string[]
  orms: string[]
  infrastructure: string[]
  evidence: DetectionEvidence[]
}

export interface DetectionResult {
  schemaVersion: 1
  root: string
  workspaces: WorkspaceDetection[]
}

const categoryField: Record<
  EvidenceCategory,
  keyof Pick<
    WorkspaceDetection,
    | 'languages'
    | 'runtimes'
    | 'frameworks'
    | 'packageManagers'
    | 'buildSystems'
    | 'databases'
    | 'orms'
    | 'infrastructure'
  >
> = {
  language: 'languages',
  runtime: 'runtimes',
  framework: 'frameworks',
  'package-manager': 'packageManagers',
  build: 'buildSystems',
  database: 'databases',
  orm: 'orms',
  infra: 'infrastructure'
}

export function createWorkspaceResult(
  path: string,
  evidence: DetectionEvidence[]
): WorkspaceDetection {
  const result: WorkspaceDetection = {
    path,
    languages: [],
    runtimes: [],
    frameworks: [],
    packageManagers: [],
    buildSystems: [],
    databases: [],
    orms: [],
    infrastructure: [],
    evidence: [...evidence].sort((left, right) => left.id.localeCompare(right.id))
  }

  for (const item of result.evidence) {
    const values = result[categoryField[item.category]]
    if (!values.includes(item.id)) values.push(item.id)
  }

  for (const field of Object.values(categoryField)) result[field].sort()
  return result
}
