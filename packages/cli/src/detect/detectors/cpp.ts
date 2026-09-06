import { evidence } from '../evidence.js'
import type { DetectionEvidence } from '../result.js'
import type { Scanner } from '../scanner.js'

export async function detectCpp(scanner: Scanner): Promise<DetectionEvidence[]> {
  const cmake = await scanner.text('CMakeLists.txt')
  const meson = await scanner.text('meson.build')
  const make = await scanner.text('Makefile')
  if (cmake === null && meson === null && make === null) return []
  const file = cmake !== null ? 'CMakeLists.txt' : meson !== null ? 'meson.build' : 'Makefile'
  const build = cmake !== null ? 'cmake' : meson !== null ? 'meson' : 'make'
  const content = cmake ?? meson ?? make ?? ''
  const language = /LANGUAGES\s+C(\s|\)|$)/.test(content) && !/CXX|C\+\+/.test(content) ? 'c' : 'cpp'
  return [evidence(language, 'language', 'high', file), evidence(build, 'build', 'high', file)]
}
