import { defineConfig } from 'vitepress'
import { chapters, createSidebar } from '../content/catalog'

export default defineConfig({
  title: 'Modern Frontend Interview',
  description: '覆盖校招到高级岗位的现代前端面试系统讲义',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3451b2' }],
    ['meta', { name: 'keywords', content: '前端面试,JavaScript,TypeScript,React,Vue,系统设计' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '知识地图', link: '/learning-paths' },
      { text: '全部章节', items: chapters.map((chapter) => ({ text: `${chapter.id}. ${chapter.shortTitle}`, link: chapter.route })) },
      { text: '参与贡献', link: '/contributing' }
    ],
    sidebar: {
      '/guide/': [{ text: '现代前端面试体系', items: createSidebar() }]
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索讲义', buttonAriaLabel: '搜索讲义' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    outline: { level: [2, 3], label: '本页索引' },
    docFooter: { prev: '上一章', next: '下一章' },
    lastUpdated: { text: '最后核验' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '章节目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },
  markdown: {
    lineNumbers: true,
    headers: { level: [2, 3] }
  },
  sitemap: { hostname: 'https://example.invalid' }
})
