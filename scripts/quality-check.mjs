import { readFile, readdir } from 'node:fs/promises'
import { extname, join } from 'node:path'

const roots = ['src', 'index.html']
const textExtensions = new Set(['.ts', '.tsx', '.css', '.html'])
const forbidden = [
  { char: '\u2014', name: 'em dash' },
  { char: '\u2013', name: 'en dash' },
]

async function collect(path) {
  if (extname(path)) return [path]
  const entries = await readdir(path, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => {
    const next = join(path, entry.name)
    return entry.isDirectory() ? collect(next) : [next]
  }))
  return nested.flat().filter((file) => textExtensions.has(extname(file)))
}

const files = (await Promise.all(roots.map(collect))).flat()
const sourceByFile = new Map(
  await Promise.all(files.map(async (file) => [file, await readFile(file, 'utf8')])),
)
const violations = []

for (const [file, source] of sourceByFile) {
  for (const item of forbidden) {
    if (source.includes(item.char)) violations.push(`${file}: contains ${item.name}`)
  }
}

const componentSource = [...sourceByFile]
  .filter(([file]) => ['.ts', '.tsx'].includes(extname(file)))
  .map(([, source]) => source)
  .join('\n')

const cssSource = [...sourceByFile]
  .filter(([file]) => extname(file) === '.css')
  .map(([, source]) => source)
  .join('\n')

const requiredComponentMarkers = [
  ['skip link', 'Skip to content'],
  ['portfolio work section', 'Engineering case files'],
  ['current role', 'Elections Canada'],
  ['CleanListen interaction', 'Clean this page'],
  ['keyboard friendly project tabs', 'ArrowRight:'],
  ['contact email', 'ernest_wong@sfu.ca'],
  ['resume link', './resume.pdf'],
]

for (const [label, marker] of requiredComponentMarkers) {
  if (!componentSource.includes(marker)) violations.push(`src: missing ${label}`)
}

const requiredStyleMarkers = [
  ['responsive mobile layout', '@media (max-width: 47.5rem)'],
  ['compact desktop layout', '@media (max-width: 65.625rem)'],
  ['reduced motion support', 'prefers-reduced-motion'],
  ['visible keyboard focus', ':focus-visible'],
  ['high tech cyan palette', '--color-cyan: #5dd8e8'],
]

for (const [label, marker] of requiredStyleMarkers) {
  if (!cssSource.includes(marker)) violations.push(`src/styles: missing ${label}`)
}

const styleEntry = sourceByFile.get('src/styles.css') ?? ''
const requiredStyleModules = [
  'tokens.css',
  'header-hero.css',
  'mission.css',
  'workbench.css',
  'sections.css',
  'responsive.css',
]

for (const moduleName of requiredStyleModules) {
  if (!styleEntry.includes(moduleName)) {
    violations.push(`src/styles.css: missing ${moduleName} import`)
  }
}

for (const [file, source] of sourceByFile) {
  const lineCount = source.split('\n').length

  if (file.endsWith('.tsx') && lineCount > 350) {
    violations.push(`${file}: exceeds the 350-line component limit`)
  }

  if (file.endsWith('.css') && file !== 'src/styles.css' && lineCount > 900) {
    violations.push(`${file}: exceeds the 900-line style module limit`)
  }

  if (file.endsWith('.css') && file !== 'src/styles/responsive.css' && source.includes('@media')) {
    violations.push(`${file}: responsive rules belong in src/styles/responsive.css`)
  }
}

const legacyCascadeLabels = ['Systems lab theme', 'Engineering dossier', 'Desktop density guard']

for (const label of legacyCascadeLabels) {
  if (cssSource.includes(label)) violations.push(`src/styles: contains legacy cascade layer "${label}"`)
}

if (violations.length) {
  console.error('Portfolio quality check failed:\n')
  for (const violation of violations) console.error(`- ${violation}`)
  process.exit(1)
}

console.log(`Portfolio quality check passed (${files.length} source files scanned).`)
