import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chapters } from '../content/catalog'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const markdownFiles = [
  join(root, 'index.md'),
  join(root, 'learning-paths.md'),
  ...readdirSync(join(root, 'guide')).filter((file) => file.endsWith('.md')).map((file) => join(root, 'guide', file))
]

const routeToFile = new Map<string, string>([
  ['/', join(root, 'index.md')],
  ['/learning-paths', join(root, 'learning-paths.md')],
  ...chapters.map((chapter) => [chapter.route, join(root, `${chapter.route.slice(1)}.md`)] as const)
])

const explicitAnchor = /\{#([a-z0-9-]+)\}/g
const markdownLink = /\[[^\]]*]\(([^)]+)\)/g
const errors: string[] = []

for (const file of markdownFiles) {
  const source = readFileSync(file, 'utf8')
  const anchors = [...source.matchAll(explicitAnchor)].map((match) => match[1])
  const duplicates = anchors.filter((anchor, index) => anchors.indexOf(anchor) !== index)
  for (const anchor of new Set(duplicates)) errors.push(`${relative(root, file)}: 重复锚点 #${anchor}`)

  for (const match of source.matchAll(markdownLink)) {
    const target = match[1].trim()
    if (/^(https?:|mailto:)/.test(target)) continue
    const [rawPath, anchor] = target.split('#')

    let targetFile: string | undefined
    if (!rawPath) targetFile = file
    else if (rawPath.startsWith('/')) targetFile = routeToFile.get(rawPath.replace(/\/$/, '') || '/')
    else {
      const resolved = resolve(dirname(file), rawPath)
      targetFile = existsSync(resolved) ? resolved : existsSync(`${resolved}.md`) ? `${resolved}.md` : undefined
    }

    if (!targetFile || !existsSync(targetFile)) {
      errors.push(`${relative(root, file)}: 页面不存在 ${target}`)
      continue
    }
    if (anchor) {
      const targetSource = readFileSync(targetFile, 'utf8')
      const targetAnchors = [...targetSource.matchAll(explicitAnchor)].map((item) => item[1])
      if (!targetAnchors.includes(anchor)) errors.push(`${relative(root, file)}: 锚点不存在 ${target}`)
    }
  }
}

for (const chapter of chapters) {
  const file = routeToFile.get(chapter.route)!
  if (!existsSync(file)) errors.push(`目录章节缺少文件 ${chapter.route}`)
  const source = existsSync(file) ? readFileSync(file, 'utf8') : ''
  for (const topic of chapter.topics) {
    if (!source.includes(`{#${topic.id}}`)) errors.push(`${basename(file)}: 缺少目录锚点 #${topic.id}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`链接检查通过：${markdownFiles.length} 个页面，${chapters.length} 个章节。`)
