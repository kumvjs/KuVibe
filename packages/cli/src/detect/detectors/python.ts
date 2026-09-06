import { evidence } from '../evidence.js'
import type { DetectionEvidence } from '../result.js'
import type { Scanner } from '../scanner.js'

export async function detectPython(scanner: Scanner): Promise<DetectionEvidence[]> {
  const files = ['pyproject.toml', 'requirements.txt', 'Pipfile', 'setup.py'] as const
  let file: string | undefined
  let content = ''
  for (const candidate of files) {
    const value = await scanner.text(candidate)
    if (value !== null) {
      file = candidate
      content += `\n${value}`
    }
  }
  if (!file) return []
  const result: DetectionEvidence[] = [
    evidence('python', 'language', 'high', file),
    evidence('python', 'runtime', 'high', file)
  ]
  const rules: Array<[RegExp, string, 'framework' | 'orm']> = [
    [/fastapi/i, 'fastapi', 'framework'],
    [/django/i, 'django', 'framework'],
    [/flask/i, 'flask', 'framework'],
    [/sqlalchemy/i, 'sqlalchemy', 'orm']
  ]
  for (const [pattern, id, category] of rules) {
    if (pattern.test(content)) result.push(evidence(id, category, 'high', file))
  }
  const build = /poetry/i.test(content) ? 'poetry' : /uv/i.test(content) ? 'uv' : 'python-packaging'
  result.push(evidence(build, 'build', 'medium', file))
  return result
}
