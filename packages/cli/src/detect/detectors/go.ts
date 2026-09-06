import { evidence } from '../evidence.js'
import type { DetectionEvidence } from '../result.js'
import type { Scanner } from '../scanner.js'

export async function detectGo(scanner: Scanner): Promise<DetectionEvidence[]> {
  const content = await scanner.text('go.mod')
  if (content === null) return []
  const result: DetectionEvidence[] = [
    evidence('go', 'language', 'high', 'go.mod'),
    evidence('go', 'runtime', 'high', 'go.mod'),
    evidence('go-modules', 'build', 'high', 'go.mod')
  ]
  if (/github\.com\/gin-gonic\/gin/.test(content)) result.push(evidence('gin', 'framework', 'high', 'go.mod'))
  if (/gorm\.io\/gorm/.test(content)) result.push(evidence('gorm', 'orm', 'high', 'go.mod'))
  return result
}
