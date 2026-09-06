import { evidence } from '../evidence.js'
import type { DetectionEvidence } from '../result.js'
import type { Scanner } from '../scanner.js'

export async function detectRust(scanner: Scanner): Promise<DetectionEvidence[]> {
  const content = await scanner.text('Cargo.toml')
  if (content === null) return []
  const result: DetectionEvidence[] = [
    evidence('rust', 'language', 'high', 'Cargo.toml'),
    evidence('native', 'runtime', 'medium', 'Cargo.toml'),
    evidence('cargo', 'build', 'high', 'Cargo.toml')
  ]
  if (/\bactix-web\b/.test(content)) result.push(evidence('actix-web', 'framework', 'high', 'Cargo.toml'))
  if (/\baxum\b/.test(content)) result.push(evidence('axum', 'framework', 'high', 'Cargo.toml'))
  if (/\btokio\b/.test(content)) result.push(evidence('tokio', 'framework', 'medium', 'Cargo.toml'))
  if (/\bdiesel\b/.test(content)) result.push(evidence('diesel', 'orm', 'high', 'Cargo.toml'))
  return result
}
