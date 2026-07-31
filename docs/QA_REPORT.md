# 浏览器验收报告

验收日期：2026-07-31  
目标：VitePress 生产预览 `http://127.0.0.1:4173`

## 自动化结果

- Vitest：57 项通过。
- 内容链接：20 个页面、18 个章节全部通过。
- VitePress：生产构建成功。
- Playwright：桌面 Chromium 与 Pixel 7 视口共 6 项通过、2 项按设备条件跳过。
- 生产依赖审计：0 个已知漏洞。

## ego-browser 真实浏览器复验

| 场景 | 结果 | 证据 |
| --- | --- | --- |
| 首页与功能卡片 | 通过 | H1 正确、6 个功能卡片、无横向溢出 |
| 本地全文搜索 | 通过 | `Trusted Types` 可检索 |
| 稳定锚点 | 通过 | `/guide/12-performance#core-web-vitals` 命中目标且顶部对齐 |
| 主题切换 | 通过 | `dark` 状态由 false 变为 true |
| 移动端 React 章节 | 通过 | 390px 视口，页面宽度 390px，章节菜单可见 |

## 截图

- `docs/qa-home-desktop.png`
- `docs/qa-react-mobile.png`

视觉检查确认：桌面首页信息层级清晰；移动端标题、题目索引、难度卡片与导航均无裁切或横向滚动。

## 1.1.0 增量验收

增量日期：2026-07-31

- 新增 6 个目录 topic 后，57 项内容/目录测试继续全部通过。
- 20 个页面及所有显式锚点检查通过，生产构建无死链接。
- Playwright 新增“TypeScript 7 可搜索、Vue Vapor 锚点可直达”用例；桌面与移动端合计 8 项通过、2 项按设备条件跳过。
- ego-browser 复验 TypeScript 7 搜索结果、Vapor Mode 锚点与移动端渲染，并生成增量截图。
- 视觉复验发现并修复 60 处“一句话结论”粗体闭合空格问题，新增内容/DOM 回归断言。
- 为二、三级显式锚点增加 `scroll-margin-top`；桌面与移动端目标标题均位于固定导航下方 110px，横向溢出为 0。

增量截图：

- `docs/qa-typescript7-desktop.png`
- `docs/qa-vapor-mobile.png`

## 1.2.0 全章节增强验收

增强日期：2026-07-31

- 18 个章节均新增一个场景型核心题，目录 topic 总数由 60 增至 78。
- Chrome 专项覆盖 RenderingNG、Page Lifecycle 与 Performance trace。
- 性能监控专项覆盖 SDK 采集、数据质量、采样、source map、trace、SLO 和 kill switch。
- Vitest 57 项通过；目录测试新增 78 topic 数量门禁。
- Playwright 桌面与移动端 10 项通过、2 项按设备条件跳过。
- 新增“Chrome 与监控专项增强可检索且锚点无遮挡”浏览器回归。
- ego-browser 复验 Chrome 搜索、监控 SDK 锚点、正文渲染和移动端无横向溢出。

专项截图：

- `docs/qa-chrome-tracing-desktop.png`
- `docs/qa-monitoring-sdk-mobile.png`

ego-browser 实测：

- `Performance trace` 可命中 Chrome 专项题。
- Chrome 专项含 5 步诊断流程，锚点位于固定导航下方 110px。
- 监控 SDK 专项包含 SLO burn rate、kill switch、采样与数据管线内容。
- 两个页面横向溢出均为 0，移动端代码块保持可滚动且正文未裁切。
