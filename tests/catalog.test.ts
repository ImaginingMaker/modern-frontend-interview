import { describe, expect, it } from 'vitest'
import { chapters, createSidebar } from '../content/catalog'

describe('章节目录', () => {
  it('包含顺序稳定的 18 章', () => {
    expect(chapters).toHaveLength(18)
    expect(chapters.reduce((total, chapter) => total + chapter.topics.length, 0)).toBe(82)
    expect(chapters.map((chapter) => chapter.id)).toEqual(
      Array.from({ length: 18 }, (_, index) => String(index + 1).padStart(2, '0'))
    )
  })

  it('路由、ID 与 topic 锚点全局唯一', () => {
    expect(new Set(chapters.map((chapter) => chapter.route)).size).toBe(chapters.length)
    const anchors = chapters.flatMap((chapter) => chapter.topics.map((topic) => `${chapter.route}#${topic.id}`))
    expect(new Set(anchors).size).toBe(anchors.length)
  })

  it('侧边栏完全由目录生成', () => {
    const sidebar = createSidebar()
    expect(sidebar).toHaveLength(chapters.length)
    expect(sidebar[0].items[0].link).toBe('/guide/01-html-dom#semantic-html')
    expect(sidebar.at(-1)?.link).toBe('/guide/18-system-design')
  })
})
