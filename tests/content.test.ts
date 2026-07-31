import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { chapters } from '../content/catalog'

const root = resolve(import.meta.dirname, '..')

describe('讲义内容', () => {
  for (const chapter of chapters) {
    const source = readFileSync(resolve(root, `${chapter.route.slice(1)}.md`), 'utf8')

    it(`${chapter.id} 元数据和模板完整`, () => {
      expect(source).toContain(`chapter: "${chapter.id}"`)
      expect(source).toContain('updatedAt: 2026-07-31')
      expect(source).toContain('## 题目索引 {#questions}')
      expect(source).toContain('## 权威来源 {#sources}')
      expect(source).toContain('**一句话结论：** ')
      expect(source).not.toMatch(/\*\*一句话结论：\*\*\S/)
      expect(source).toContain('<InterviewMeta')
      expect(source).not.toMatch(/\bTODO\b|\bTBD\b|待补充|lorem ipsum/)
    })

    it(`${chapter.id} 目录 topic 均有正文`, () => {
      for (const topic of chapter.topics) expect(source).toContain(`{#${topic.id}}`)
    })

    it(`${chapter.id} 代码围栏成对`, () => {
      expect((source.match(/```/g) ?? []).length % 2).toBe(0)
    })
  }
})
