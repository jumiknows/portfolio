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
const violations = []

for (const file of files) {
  const source = await readFile(file, 'utf8')
  for (const item of forbidden) {
    if (source.includes(item.char)) violations.push(`${file}: contains ${item.name}`)
  }
}

const app = await readFile('src/App.tsx', 'utf8')
const requiredAppMarkers = [
  ['skip link', 'Skip to content'],
  ['portfolio work section', 'Engineering case files'],
  ['current role', 'Elections Canada'],
  ['CleanListen interaction', 'Clean this page'],
  ['keyboard friendly project tabs', "event.key === 'ArrowRight'"],
  ['contact email', 'ernest_wong@sfu.ca'],
  ['resume link', './resume.pdf'],
]

for (const [label, marker] of requiredAppMarkers) {
  if (!app.includes(marker)) violations.push(`src/App.tsx: missing ${label}`)
}

const styles = await readFile('src/styles.css', 'utf8')
const requiredStyleMarkers = [
  ['responsive mobile layout', '@media (max-width: 700px)'],
  ['desktop density guard', '@media (min-width: 1051px)'],
  ['reduced motion support', 'prefers-reduced-motion'],
  ['visible keyboard focus', ':focus-visible'],
  ['high tech cyan palette', '--electric: #5dd8e8'],
]

for (const [label, marker] of requiredStyleMarkers) {
  if (!styles.includes(marker)) violations.push(`src/styles.css: missing ${label}`)
}

if (violations.length) {
  console.error('Portfolio quality check failed:\n')
  for (const violation of violations) console.error(`- ${violation}`)
  process.exit(1)
}

console.log(`Portfolio quality check passed (${files.length} source files scanned).`)
