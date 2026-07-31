export type Difficulty = 1 | 2 | 3 | 4 | 5
export type Frequency = '低' | '中' | '高' | '极高'
export type CareerLevel = '校招' | '初级' | '中级' | '高级'

export interface Topic {
  id: string
  title: string
}

export interface Chapter {
  id: string
  route: string
  title: string
  shortTitle: string
  difficulty: Difficulty
  frequency: Frequency
  levels: CareerLevel[]
  tags: string[]
  updatedAt: string
  topics: Topic[]
}

const allLevels: CareerLevel[] = ['校招', '初级', '中级', '高级']

export const chapters: Chapter[] = [
  { id: '01', route: '/guide/01-html-dom', title: 'HTML、DOM、可访问性与 SEO', shortTitle: 'HTML 与 DOM', difficulty: 2, frequency: '高', levels: allLevels, tags: ['HTML', 'DOM', 'a11y', 'SEO'], updatedAt: '2026-07-31', topics: [
    { id: 'semantic-html', title: '语义化与可访问性' }, { id: 'dom-events', title: 'DOM 与事件委托' }, { id: 'forms-seo', title: '表单、SEO 与 Web Components' }, { id: 'accessibility-design-system', title: '设计系统可访问性治理' }
  ]},
  { id: '02', route: '/guide/02-css-modern', title: 'CSS、布局与现代 Web 样式', shortTitle: '现代 CSS', difficulty: 3, frequency: '极高', levels: allLevels, tags: ['CSS', 'Grid', 'Container Query'], updatedAt: '2026-07-31', topics: [
    { id: 'layout', title: '布局与格式化上下文' }, { id: 'responsive', title: '响应式与容器查询' }, { id: 'modern-css', title: '现代 CSS 与动画性能' }, { id: 'web-ui-2026', title: '2026 Web UI 能力分级' }, { id: 'css-debugging', title: '复杂布局故障诊断' }
  ]},
  { id: '03', route: '/guide/03-javascript-core', title: 'JavaScript 核心与事件循环', shortTitle: 'JavaScript 核心', difficulty: 4, frequency: '极高', levels: allLevels, tags: ['JavaScript', 'Closure', 'Event Loop'], updatedAt: '2026-07-31', topics: [
    { id: 'types-scope', title: '类型、作用域与闭包' }, { id: 'prototype-this', title: '原型、继承与 this' }, { id: 'async-loop', title: 'Promise、异步与事件循环' }, { id: 'async-race', title: '异步竞态与取消治理' }
  ]},
  { id: '04', route: '/guide/04-ecmascript-modules', title: 'ECMAScript、模块与运行时实践', shortTitle: 'ECMAScript 与模块', difficulty: 4, frequency: '高', levels: ['初级', '中级', '高级'], tags: ['ESM', 'TC39', 'Runtime'], updatedAt: '2026-07-31', topics: [
    { id: 'esm', title: 'ESM 与 CommonJS' }, { id: 'modern-js', title: '现代稳定语法能力' }, { id: 'proposal-status', title: '提案阶段与运行时兼容' }, { id: 'node26-runtime', title: 'Node.js 26 与 Temporal' }, { id: 'dual-package', title: '双包发布与模块兼容' }
  ]},
  { id: '05', route: '/guide/05-typescript', title: 'TypeScript 类型系统与工程实践', shortTitle: 'TypeScript', difficulty: 4, frequency: '极高', levels: allLevels, tags: ['TypeScript', 'Generics', 'tsconfig'], updatedAt: '2026-07-31', topics: [
    { id: 'type-modeling', title: '类型建模与收窄' }, { id: 'advanced-types', title: '泛型与高级类型' }, { id: 'ts-engineering', title: 'TypeScript 工程配置' }, { id: 'typescript-7', title: 'TypeScript 7 原生编译器' }, { id: 'type-boundary', title: 'API 边界与类型漂移' }
  ]},
  { id: '06', route: '/guide/06-browser-rendering', title: '浏览器架构、导航与渲染流水线', shortTitle: '浏览器原理', difficulty: 5, frequency: '极高', levels: ['初级', '中级', '高级'], tags: ['Chromium', 'Rendering', 'Event'], updatedAt: '2026-07-31', topics: [
    { id: 'navigation', title: '从 URL 到页面' }, { id: 'render-pipeline', title: '渲染与合成流水线' }, { id: 'browser-scheduling', title: '进程、线程与调度' }, { id: 'modern-navigation', title: '现代导航与页面生命周期' }, { id: 'chrome-tracing', title: 'Chrome 性能轨迹诊断' }
  ]},
  { id: '07', route: '/guide/07-network-cache', title: '网络、缓存、CDN 与实时通信', shortTitle: '网络与缓存', difficulty: 4, frequency: '极高', levels: allLevels, tags: ['HTTP', 'Cache', 'QUIC'], updatedAt: '2026-07-31', topics: [
    { id: 'http-evolution', title: 'HTTP/1.1、HTTP/2 与 HTTP/3' }, { id: 'cache-cdn', title: '缓存与 CDN' }, { id: 'realtime', title: 'WebSocket、SSE 与流式传输' }, { id: 'cdn-cache-failure', title: 'CDN 缓存事故排查' }
  ]},
  { id: '08', route: '/guide/08-react', title: 'React 19.x、并发与服务端组件', shortTitle: 'React', difficulty: 5, frequency: '极高', levels: allLevels, tags: ['React', 'Hooks', 'RSC'], updatedAt: '2026-07-31', topics: [
    { id: 'react-render', title: '渲染、状态与 Hooks' }, { id: 'react-concurrency', title: '并发、Actions 与性能' }, { id: 'react-server', title: 'Server Components 与 React 19.2' }, { id: 'rsc-security', title: 'RSC 安全与补丁治理' }, { id: 'react-performance-debug', title: 'React 性能诊断' }
  ]},
  { id: '09', route: '/guide/09-vue', title: 'Vue 3、响应式与编译优化', shortTitle: 'Vue', difficulty: 5, frequency: '极高', levels: allLevels, tags: ['Vue', 'Reactivity', 'Compiler'], updatedAt: '2026-07-31', topics: [
    { id: 'vue-reactivity', title: '响应式系统' }, { id: 'vue-render', title: '组件渲染与编译优化' }, { id: 'vue-ecosystem', title: 'Composition API 与生态' }, { id: 'vapor-mode', title: 'Vue 3.6 Vapor Mode' }, { id: 'vue-reactivity-debug', title: 'Vue 响应式故障诊断' }
  ]},
  { id: '10', route: '/guide/10-state-architecture', title: '状态管理、数据请求与前端架构', shortTitle: '状态与架构', difficulty: 5, frequency: '高', levels: ['初级', '中级', '高级'], tags: ['State', 'Data Fetching', 'Architecture'], updatedAt: '2026-07-31', topics: [
    { id: 'state-boundaries', title: '状态分类与边界' }, { id: 'server-state', title: '服务端状态与缓存' }, { id: 'architecture-choice', title: '架构与框架选型' }, { id: 'state-consistency', title: '多标签页状态一致性' }
  ]},
  { id: '11', route: '/guide/11-engineering', title: '构建、Monorepo、CI/CD 与质量工程', shortTitle: '工程化', difficulty: 5, frequency: '极高', levels: ['初级', '中级', '高级'], tags: ['Vite', 'Monorepo', 'CI/CD'], updatedAt: '2026-07-31', topics: [
    { id: 'build-tools', title: '构建工具与依赖图' }, { id: 'monorepo', title: '包管理与 Monorepo' }, { id: 'delivery', title: 'CI/CD 与质量门禁' }, { id: 'build-regression', title: '构建性能回归治理' }
  ]},
  { id: '12', route: '/guide/12-performance', title: 'Web 性能、Core Web Vitals 与监控', shortTitle: '性能与监控', difficulty: 5, frequency: '极高', levels: allLevels, tags: ['CWV', 'RUM', 'Profiling'], updatedAt: '2026-07-31', topics: [
    { id: 'core-web-vitals', title: 'LCP、INP 与 CLS' }, { id: 'performance-strategy', title: '加载与运行时优化' }, { id: 'observability', title: 'RUM、告警与归因' }, { id: 'monitoring-sdk', title: '监控 SDK 与数据管线' }
  ]},
  { id: '13', route: '/guide/13-security', title: 'Web、安全供应链、权限与隐私', shortTitle: '前端安全', difficulty: 5, frequency: '极高', levels: allLevels, tags: ['XSS', 'CSRF', 'CSP'], updatedAt: '2026-07-31', topics: [
    { id: 'xss-csp', title: 'XSS、CSP 与 Trusted Types' }, { id: 'csrf-auth', title: 'CSRF、Cookie 与鉴权' }, { id: 'supply-chain', title: '供应链与隐私安全' }, { id: 'security-incident', title: '安全事件响应' }
  ]},
  { id: '14', route: '/guide/14-testing', title: '单元、组件、集成与 E2E 测试', shortTitle: '测试体系', difficulty: 4, frequency: '高', levels: allLevels, tags: ['Vitest', 'Playwright', 'Testing'], updatedAt: '2026-07-31', topics: [
    { id: 'test-pyramid', title: '测试分层与边界' }, { id: 'component-test', title: '组件与集成测试' }, { id: 'e2e-quality', title: 'E2E、契约与稳定性' }, { id: 'flaky-tests', title: 'Flaky 测试治理' }
  ]},
  { id: '15', route: '/guide/15-algorithms-handwrite', title: '数据结构、算法与前端手写题', shortTitle: '算法与手写', difficulty: 4, frequency: '极高', levels: allLevels, tags: ['Algorithm', 'Promise', 'LRU'], updatedAt: '2026-07-31', topics: [
    { id: 'complexity', title: '复杂度与常用结构' }, { id: 'handwrite', title: '防抖、并发与深拷贝' }, { id: 'frontend-algorithms', title: '前端算法解题策略' }, { id: 'concurrency-runner', title: '并发任务调度器' }
  ]},
  { id: '16', route: '/guide/16-cross-platform', title: '小程序、Hybrid 与跨端开发', shortTitle: '跨端开发', difficulty: 4, frequency: '高', levels: ['初级', '中级', '高级'], tags: ['Mini Program', 'React Native', 'Electron'], updatedAt: '2026-07-31', topics: [
    { id: 'mini-program', title: '小程序运行模型' }, { id: 'hybrid-native', title: 'Hybrid 与 React Native' }, { id: 'cross-platform-choice', title: '跨端方案选型' }, { id: 'bridge-governance', title: 'Bridge 协议治理' }
  ]},
  { id: '17', route: '/guide/17-ai-frontend', title: 'AI 前端、Agent、流式交互与 MCP', shortTitle: 'AI 与前端', difficulty: 5, frequency: '高', levels: ['初级', '中级', '高级'], tags: ['LLM', 'Agent', 'MCP'], updatedAt: '2026-07-31', topics: [
    { id: 'streaming-ui', title: '流式 UI 与生成式界面' }, { id: 'agent-tooling', title: 'Agent 与工具调用' }, { id: 'mcp', title: 'MCP 与安全边界' }, { id: 'agent-evaluation', title: 'Agent 评测与可观测性' }
  ]},
  { id: '18', route: '/guide/18-system-design', title: '大厂场景题、系统设计与项目复盘', shortTitle: '系统设计与复盘', difficulty: 5, frequency: '极高', levels: allLevels, tags: ['System Design', 'Scenario', 'STAR'], updatedAt: '2026-07-31', topics: [
    { id: 'frontend-system-design', title: '前端系统设计方法' }, { id: 'scenario-debugging', title: '场景排障与技术决策' }, { id: 'project-review', title: '项目复盘与行为面试' }, { id: 'traffic-spike-design', title: '大促峰值系统设计' }
  ]}
]

export const chapterByRoute = new Map(chapters.map((chapter) => [chapter.route, chapter]))

export function createSidebar() {
  return chapters.map((chapter) => ({
    text: `${chapter.id}. ${chapter.shortTitle}`,
    link: chapter.route,
    collapsed: true,
    items: chapter.topics.map((topic) => ({
      text: topic.title,
      link: `${chapter.route}#${topic.id}`
    }))
  }))
}
