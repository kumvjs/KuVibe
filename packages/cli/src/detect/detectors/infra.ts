import { evidence } from '../evidence.js'
import type { DetectionEvidence } from '../result.js'
import type { Scanner } from '../scanner.js'

export async function detectInfrastructure(scanner: Scanner): Promise<DetectionEvidence[]> {
  const candidates: Array<[string, string]> = [
    ['Dockerfile', 'docker'],
    ['docker-compose.yml', 'docker-compose'],
    ['docker-compose.yaml', 'docker-compose'],
    ['compose.yml', 'docker-compose'],
    ['compose.yaml', 'docker-compose'],
    ['terraform.tf', 'terraform'],
    ['serverless.yml', 'serverless']
  ]
  const result: DetectionEvidence[] = []
  for (const [file, id] of candidates) {
    if ((await scanner.text(file)) !== null) result.push(evidence(id, 'infra', 'high', file))
  }
  return result
}
