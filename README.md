# Modern Frontend Interview

面向 2026 大厂面试的中文现代前端系统讲义，覆盖校招、初级、中级和高级岗位。当前包含 18 章、78 道核心面试题，并为版本化内容保留来源和核验日期。

## 项目特性

- 18 章完整知识地图，React 与 Vue 双主线
- 面试题驱动：结论、原理、代码、追问、误区、场景、来源
- 一至五星难度、面试频率和岗位层级
- 集中式章节元数据生成侧边栏与稳定锚点
- 中文全文搜索、暗色模式、移动端导航
- Vitest 内容测试、链接/锚点检查、Playwright E2E

## 2026 现代技术增量

以下能力已经按“稳定状态 + 目标运行时 + 回退策略”写入讲义，而不是作为无差别的新特性清单：

| 主题 | 当前状态（核验于 2026-07-31） | 对应讲义 |
| --- | --- | --- |
| TypeScript 7.0 原生编译器 | 正式发布；Go 原生移植、LSP、并行构建 | [TypeScript](/guide/05-typescript#typescript-7) |
| Node.js 26 与 Temporal | Current，预计 2026-10 进入 LTS；Temporal 默认启用 | [ECMAScript 与运行时](/guide/04-ecmascript-modules#node26-runtime) |
| Vue 3.6 Vapor Mode | RC 预发布、完全 opt-in，不作为默认生产基线 | [Vue](/guide/09-vue#vapor-mode) |
| React Server Components 安全 | 补丁与供应链治理，包含 CVE-2025-55182 案例 | [React](/guide/08-react#rsc-security) |
| 2026 Web UI | 按 Baseline、单浏览器稳定、实验能力三级采用 | [现代 CSS](/guide/02-css-modern#web-ui-2026) |
| bfcache 与现代导航 | WebSocket 生命周期、可等待滚动、View Transition | [浏览器原理](/guide/06-browser-rendering#modern-navigation) |

## 国内外大厂面试增强

2026-07-31 对全部 18 章重新完成中文互联网与国际官方资料交叉检索。本轮每章新增一个强调约束、失败模式、诊断与指标的场景题：

- Chrome：RenderingNG、Page Lifecycle、Performance trace、Main/Compositor/Raster 诊断。
- 性能与监控：Web Vitals、RUM、监控 SDK、采样、数据管线、source map、trace 与 SLO 告警。
- 网络与工程：CDN 缓存事故、Cache-Status、双包危害、Monorepo 构建性能回归。
- 框架与状态：React/Vue 性能诊断、API 类型漂移、多标签页状态一致性。
- 质量与安全：Flaky 测试治理、前端安全事件响应、RSC 补丁与供应链治理。
- 场景与系统设计：异步竞态、并发任务池、Bridge 协议、Agent 评测和大促峰值设计。

中文面经只用于识别考察频率与追问趋势，最终技术答案由正式规范、RFC 或官方文档交叉验证。完整过程见[国内外研究矩阵](./docs/RESEARCH_2026_CN_GLOBAL.md)。

> 状态会随浏览器、框架和运行时发布而变化。面试中应同时说明版本、核验时间与目标环境。

## 快速开始

要求 Node.js 20 或更高版本。

```bash
npm install
npm run docs:dev
```

生产构建与预览：

```bash
npm run docs:build
npm run docs:preview
```

## 质量命令

| 命令 | 用途 |
| --- | --- |
| `npm test` | 运行 Vitest |
| `npm run test:content` | 检查章节元数据与正文结构 |
| `npm run check:links` | 检查内部页面和显式锚点 |
| `npm run test:e2e` | 真实 Chromium 关键路径 |
| `npm run check` | 完整质量门禁 |

## 项目结构

```text
content/catalog.ts        章节、路由、标签和锚点的单一来源
guide/                    18 章面试讲义
.vitepress/               站点配置、主题与元信息组件
scripts/check-links.ts    内部链接和锚点检查
tests/                    内容与目录单元测试
e2e/                      Playwright 浏览器测试
docs/                     内容规范与来源说明
```

## 内容原则

稳定标准、实验提案和框架版本必须明确区分。时效性内容优先引用规范、MDN、web.dev、TC39、TypeScript、React、Vue、Node.js 等官方资料，并标注核验日期。详见[内容编写规范](./docs/WRITING_GUIDE.md)。

## 内容更新工作流

1. 先检查章节目录和已有结论，避免重复题目。
2. 使用官方发布说明、规范或浏览器兼容数据核验事实。
3. 在正文中明确区分 Stable、Baseline、RC/Beta 和 TC39 提案阶段。
4. 同步更新 `content/catalog.ts` 的 topic 锚点和相关来源。
5. 运行 `npm run check`，再用真实浏览器验证搜索、锚点和移动端布局。

## 当前验收状态

- Vitest：57 项内容与目录测试通过。
- 链接检查：20 个主要页面、18 个章节、78 个目录 topic 通过。
- Playwright：桌面与移动端 10 项通过、2 项按设备条件跳过。
- VitePress：生产构建通过。
- ego-browser：真实 Chromium 复验首页、全文搜索、稳定锚点、主题和移动端布局。

完整记录见[浏览器 QA 报告](./docs/QA_REPORT.md)。

## 参考与原创

本项目研究了 `参考资料` 目录的知识覆盖和 VitePress 实现，但重新设计信息架构、题目模板、代码和表述。参考材料不被逐段复制。详见[来源说明](./docs/SOURCES.md)。

## 贡献

提交前运行 `npm run check`，并阅读[贡献指南](./contributing.md)。

## License

MIT，完整许可文本见仓库根目录的 `LICENSE`。
