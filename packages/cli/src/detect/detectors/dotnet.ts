import { evidence } from '../evidence.js'
import type { DetectionEvidence } from '../result.js'
import type { Scanner } from '../scanner.js'

export async function detectDotnet(scanner: Scanner): Promise<DetectionEvidence[]> {
  const project = (await scanner.entries()).find((entry) => entry.endsWith('.csproj') || entry.endsWith('.fsproj'))
  if (!project) return []
  const content = (await scanner.text(project)) ?? ''
  const language = project.endsWith('.fsproj') ? 'fsharp' : 'csharp'
  const result: DetectionEvidence[] = [
    evidence(language, 'language', 'high', project),
    evidence('dotnet', 'runtime', 'high', project),
    evidence('msbuild', 'build', 'high', project)
  ]
  if (/Microsoft\.NET\.Sdk\.Web/.test(content)) result.push(evidence('aspnet-core', 'framework', 'high', project))
  if (/EntityFrameworkCore/.test(content)) result.push(evidence('entity-framework-core', 'orm', 'high', project))
  return result
}
