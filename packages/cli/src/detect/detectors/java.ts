import { evidence } from '../evidence.js'
import type { DetectionEvidence } from '../result.js'
import type { Scanner } from '../scanner.js'

export async function detectJava(scanner: Scanner): Promise<DetectionEvidence[]> {
  const pom = await scanner.text('pom.xml')
  const gradle = (await scanner.text('build.gradle')) ?? (await scanner.text('build.gradle.kts'))
  if (pom === null && gradle === null) return []
  const file = pom !== null ? 'pom.xml' : (await scanner.text('build.gradle.kts')) !== null ? 'build.gradle.kts' : 'build.gradle'
  const content = pom ?? gradle ?? ''
  const result: DetectionEvidence[] = [
    evidence('java', 'language', 'high', file),
    evidence('jvm', 'runtime', 'high', file),
    evidence(pom !== null ? 'maven' : 'gradle', 'build', 'high', file)
  ]
  if (/spring-boot|org\.springframework\.boot/.test(content)) result.push(evidence('spring-boot', 'framework', 'high', file))
  if (/hibernate|spring-boot-starter-data-jpa/.test(content)) result.push(evidence('hibernate', 'orm', 'medium', file))
  return result
}
