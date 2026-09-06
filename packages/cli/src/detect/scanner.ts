import { readFile, readdir, stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const MAX_METADATA_BYTES = 1024 * 1024

export class Scanner {
  readonly root: string
  private readonly textCache = new Map<string, string | null>()
  private entriesCache: string[] | undefined

  constructor(root: string) {
    this.root = resolve(root)
  }

  path(relativePath: string): string {
    return resolve(this.root, relativePath)
  }

  async text(relativePath: string): Promise<string | null> {
    const cached = this.textCache.get(relativePath)
    if (cached !== undefined) return cached

    try {
      const target = this.path(relativePath)
      const metadata = await stat(target)
      if (!metadata.isFile() || metadata.size > MAX_METADATA_BYTES) {
        this.textCache.set(relativePath, null)
        return null
      }
      const content = await readFile(target, 'utf8')
      this.textCache.set(relativePath, content)
      return content
    } catch {
      this.textCache.set(relativePath, null)
      return null
    }
  }

  async json(relativePath: string): Promise<Record<string, unknown> | null> {
    const content = await this.text(relativePath)
    if (content === null) return null
    try {
      const value: unknown = JSON.parse(content)
      return isRecord(value) ? value : null
    } catch {
      return null
    }
  }

  async entries(): Promise<string[]> {
    if (this.entriesCache) return this.entriesCache
    try {
      this.entriesCache = (await readdir(this.root)).sort()
    } catch {
      this.entriesCache = []
    }
    return this.entriesCache
  }
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function stringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) return {}
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string')
  )
}
