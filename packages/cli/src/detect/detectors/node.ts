import { evidence } from '../evidence.js'
import { stringRecord, type Scanner } from '../scanner.js'
import type { DetectionEvidence } from '../result.js'

export async function detectNode(scanner: Scanner): Promise<DetectionEvidence[]> {
  const manifest = await scanner.json('package.json')
  if (!manifest) return []

  const result: DetectionEvidence[] = [
    evidence('javascript', 'language', 'high', 'package.json'),
    evidence('nodejs', 'runtime', 'high', 'package.json')
  ]
  const dependencies = {
    ...stringRecord(manifest.dependencies),
    ...stringRecord(manifest.devDependencies)
  }

  if (dependencies.typescript || (await scanner.text('tsconfig.json')) !== null) {
    result.push(evidence('typescript', 'language', 'high', dependencies.typescript ? 'package.json' : 'tsconfig.json'))
  }

  const frameworks: Record<string, string> = {
    '@nestjs/core': 'nestjs',
    next: 'nextjs',
    nuxt: 'nuxt',
    express: 'express',
    fastify: 'fastify',
    hono: 'hono',
    react: 'react',
    vue: 'vue',
    svelte: 'svelte',
    '@angular/core': 'angular',
    vitepress: 'vitepress'
  }
  const orms: Record<string, string> = {
    '@prisma/client': 'prisma',
    typeorm: 'typeorm',
    sequelize: 'sequelize',
    'drizzle-orm': 'drizzle'
  }
  const databases: Record<string, string> = {
    pg: 'postgresql',
    mysql2: 'mysql',
    mongodb: 'mongodb',
    redis: 'redis',
    'better-sqlite3': 'sqlite'
  }

  for (const [name, id] of Object.entries(frameworks)) {
    if (dependencies[name]) result.push(evidence(id, 'framework', 'high', 'package.json'))
  }
  for (const [name, id] of Object.entries(orms)) {
    if (dependencies[name]) result.push(evidence(id, 'orm', 'high', 'package.json'))
  }
  for (const [name, id] of Object.entries(databases)) {
    if (dependencies[name]) result.push(evidence(id, 'database', 'medium', 'package.json'))
  }

  const lockfiles: Array<[string, string]> = [
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['bun.lock', 'bun'],
    ['bun.lockb', 'bun'],
    ['package-lock.json', 'npm']
  ]
  for (const [file, manager] of lockfiles) {
    if ((await scanner.text(file)) !== null) result.push(evidence(manager, 'package-manager', 'high', file))
  }

  const packageManager = typeof manifest.packageManager === 'string' ? manifest.packageManager.split('@')[0] : undefined
  if (packageManager) result.push(evidence(packageManager, 'package-manager', 'high', 'package.json'))
  result.push(evidence('package-scripts', 'build', 'medium', 'package.json'))
  return result
}
