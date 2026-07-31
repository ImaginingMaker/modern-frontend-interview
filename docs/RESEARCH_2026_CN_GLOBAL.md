# 2026 国内外前端面试研究矩阵

核验日期：2026-07-31

## 方法

- 中文互联网用于观察面试频率与真实追问：百度检索牛客网、腾讯云开发者社区、阿里云开发者社区、知乎、掘金、CSDN 等结果。
- 国际来源用于核验技术答案：WHATWG/W3C、TC39、RFC Editor、MDN、web.dev、Chrome Developers、React、Vue、TypeScript、Node.js、OWASP、Playwright 与 Google SRE。
- 面经与社区内容可能过时或互相转载，只作为“考什么”的信号，不作为规范事实来源。
- 版本、兼容性与安全结论必须回到官方发布说明或正式规范。

## 逐章矩阵

| 章 | 中文检索重点 | 国际核验重点 | 本轮增强 |
| --- | --- | --- | --- |
| HTML/DOM | 牛客 DOM/BOM、语义化面试题 | MDN HTML accessibility、DOM Events | 设计系统可访问性治理 |
| CSS | 阿里/字节布局追问、现代 CSS | web.dev Container Queries、Baseline | 复杂布局线上诊断 |
| JavaScript | 牛客闭包、事件循环真题 | ECMAScript、WHATWG Event Loop | 搜索联想竞态与取消 |
| 模块/运行时 | 美团 Node/模块面经 | Node ESM/CommonJS、TC39 | 双包危害与条件导出 |
| TypeScript | 高级类型与工程面经 | Handbook、TS 7 发布说明 | API 边界运行时校验 |
| Chrome | 腾讯云渲染原理与 Chromium 流水线文章 | RenderingNG、Page Lifecycle | Performance trace 诊断 |
| 网络/CDN | 阿里云 CDN、缓存面经 | HTTP RFC、Cache-Status | CDN 新旧版本事故 |
| React | 牛客 Hooks、Fiber、性能追问 | React 19/19.2、RSC 安全通告 | 列表输入性能诊断 |
| Vue | 牛客响应式、diff、Vue 3 面经 | Vue Reactivity、Rendering、3.6 RC | 响应式丢失/过度触发 |
| 状态/架构 | 字节/美团状态和选型场景 | React/Vue 状态指南、Micro Frontends | 多标签页一致性 |
| 工程化 | Monorepo、CI/CD、构建缓存 | Vite Performance、npm Workspaces | 构建性能回归 |
| 性能/监控 | 腾讯云性能监控、字节监控经验 | Web Vitals、Performance Timeline | 监控 SDK 与数据管线 |
| 安全 | 牛客 XSS/CSP/场景题 | OWASP XSS/CSP、Trusted Types | 安全事件响应 |
| 测试 | Vitest/Playwright 实践文章 | Playwright Best Practices | Flaky 测试治理 |
| 算法/手写 | 牛客 2026 手写题与并发题 | ECMAScript Collections | 并发任务池 |
| 跨端 | 小程序/RN/Electron 面经 | 微信开放文档、RN Architecture | Bridge 协议治理 |
| AI 前端 | Agent/MCP 2026 面试汇总 | MCP 规范、OWASP LLM | Agent 评测与观测 |
| 系统设计 | 牛客场景题、白屏、大促 | Google SRE、Web Performance | 大促峰值设计 |

## Chrome、性能与监控专项结论

1. 国内面试仍高频考察 URL 导航、重排重绘、事件循环，但高级岗位会继续追问 Renderer/Compositor/Raster、Performance trace 与线上指标归因。
2. “Lighthouse 分数优化”已不足以代表性能能力；应回答字段数据、P75、版本对比、设备/网络分群和 INP breakdown。
3. 监控 SDK 不只是监听 `window.onerror`：还需 schema、采样、批量、source map release、trace 关联、隐私、熔断与 kill switch。
4. 白屏率、JS 错误率和接口错误率必须有可操作定义，告警要与影响用户数、SLO burn rate 和发布版本关联。

## 可信度规则

- A：正式规范、RFC、官方文档或安全公告，可直接支持技术结论。
- B：国内大厂技术社区/工程实践，可作为实现案例，但需与 A 类来源交叉验证。
- C：匿名面经与聚合题库，只用于频率和追问趋势，不用于版本或标准结论。
