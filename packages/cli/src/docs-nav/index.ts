import { readFile, readdir } from 'node:fs/promises'
import { basename, relative, resolve, sep } from 'node:path'

export interface DocsNavItem {
  text: string
  link?: string
  items?: DocsNavItem[]
}

export interface DocsNavResult {
  schemaVersion: 1
  root: string
  items: DocsNavItem[]
}

const MAX_MARKDOWN_FILES = 1000

export async function docsNav(root = 'docs'): Promise<DocsNavResult> {
  const absoluteRoot = resolve(root)
  let visited = 0

  async function visit(directory: string): Promise<DocsNavItem[]> {
    let entries
    try {
      entries = await readdir(directory, { withFileTypes: true })
    } catch {
      return []
    }

    const items: DocsNavItem[] = []
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      if (entry.name.startsWith('.')) continue
      const target = resolve(directory, entry.name)
      if (entry.isDirectory()) {
        const children = await visit(target)
        if (children.length > 0) items.push({ text: humanize(entry.name), items: children })
      } else if (entry.isFile() && entry.name.endsWith('.md') && visited < MAX_MARKDOWN_FILES) {
        visited += 1
        const content = await readFile(target, 'utf8')
        const relativePath = portable(relative(absoluteRoot, target))
        items.push({ text: extractTitle(content) ?? humanize(basename(entry.name, '.md')), link: toLink(relativePath) })
      }
    }
    return indexFirst(items)
  }

  return { schemaVersion: 1, root: absoluteRoot, items: await visit(absoluteRoot) }
}

function extractTitle(content: string): string | undefined {
  const withoutFrontmatter = content.startsWith('---') ? content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '') : content
  return withoutFrontmatter.match(/^#\s+(.+)$/m)?.[1]?.replace(/[`*_]/g, '').trim()
}

function toLink(path: string): string {
  const withoutExtension = path.replace(/\.md$/, '')
  if (withoutExtension === 'index') return '/'
  return `/${withoutExtension.replace(/\/index$/, '/')}`
}

function humanize(value: string): string {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ')
}

function indexFirst(items: DocsNavItem[]): DocsNavItem[] {
  return [...items].sort((left, right) => {
    const leftIndex = left.link === '/' || left.link?.endsWith('/') ? 0 : 1
    const rightIndex = right.link === '/' || right.link?.endsWith('/') ? 0 : 1
    return leftIndex - rightIndex || left.text.localeCompare(right.text)
  })
}

function portable(path: string): string {
  return sep === '/' ? path : path.split(sep).join('/')
}
