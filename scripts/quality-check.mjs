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
  const text = await readFile(file, 'utf8')
  for (const item of forbidden) {
    if (text.includes(item.char)) violations.push(`${file}: contains ${item.name}`)
  }
}

const app = await readFile('src/App.tsx', 'utf8')
const required = [
  ['desk lamp control', 'LIGHT ON'],
  ['sound control', 'SOUND ON'],
  ['desktop keyboard hint', '1-5'],
  ['mobile swipe hint', 'swipe between chapters'],
]

for (const [label, marker] of required) {
  if (!app.includes(marker)) violations.push(`src/App.tsx: missing ${label}`)
}

if (violations.length) {
  console.error('Portfolio quality check failed:\n')
  for (const violation of violations) console.error(`- ${violation}`)
  process.exit(1)
}

console.log(`Portfolio quality check passed (${files.length} source files scanned).`)
