import type { Confidence, DetectionEvidence, EvidenceCategory } from './result.js'

export function evidence(
  id: string,
  category: EvidenceCategory,
  confidence: Confidence,
  paths: string | string[]
): DetectionEvidence {
  return {
    id,
    category,
    confidence,
    evidence: (Array.isArray(paths) ? paths : [paths]).sort()
  }
}

export function deduplicateEvidence(items: DetectionEvidence[]): DetectionEvidence[] {
  const byKey = new Map<string, DetectionEvidence>()
  const rank: Record<Confidence, number> = { low: 1, medium: 2, high: 3 }

  for (const item of items) {
    const key = `${item.category}:${item.id}`
    const existing = byKey.get(key)
    if (!existing) {
      byKey.set(key, { ...item, evidence: [...item.evidence] })
      continue
    }
    existing.evidence = [...new Set([...existing.evidence, ...item.evidence])].sort()
    if (rank[item.confidence] > rank[existing.confidence]) existing.confidence = item.confidence
  }

  return [...byKey.values()]
}
