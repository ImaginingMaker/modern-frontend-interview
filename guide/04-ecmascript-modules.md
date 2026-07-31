---
title: ECMAScript、模块与运行时实践
description: ESM、CommonJS、现代稳定能力与 TC39 提案状态
chapter: "04"
difficulty: 4
frequency: 高
levels: [初级, 中级, 高级]
tags: [ESM, TC39, Runtime]
updatedAt: 2026-07-31
---

# ECMAScript、模块与运行时实践

<InterviewMeta :difficulty="4" frequency="高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [ESM 与 CommonJS 的核心差异是什么？](#esm)
2. [现代稳定能力怎样进入工程？](#modern-js)
3. [如何正确描述 TC39 提案？](#proposal-status)
4. [Node.js 26 与 Temporal 应如何评估？](#node26-runtime)
5. [双包发布为什么会产生双实例？](#dual-package)

## ESM 与 CommonJS 的核心差异是什么？ {#esm}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** ESM 是可静态分析、绑定实时且支持异步加载的标准模块系统；CommonJS 以运行时同步求值和 `module.exports` 为核心。

```js
// math.js
export let count = 0
export const increment = () => count++
// app.js 中导入的是 live binding
import { count, increment } from './math.js'
```

静态结构支持 tree shaking，但是否真的删除还取决于副作用标注和构建器。循环依赖在 ESM 中暴露的是尚未初始化或逐步初始化的绑定，不应依赖脆弱的求值顺序。Node 项目需明确 `type`、扩展名和包 `exports`。

## 现代稳定能力怎样进入工程？ {#modern-js}

<InterviewMeta :difficulty="3" frequency="高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 先按目标运行时确认语法与 API 支持，再决定转译、polyfill 或渐进增强；语法编译不等于运行时 API 补齐。

`structuredClone` 处理许多内建类型和循环引用，但不能克隆函数或 DOM 节点。不可变数组方法 `toSorted()`、`toReversed()` 避免原地修改。集合方法与 Iterator Helpers 应在兼容性确认后使用。

```js
const sorted = records.toSorted((a, b) => b.score - a.score)
const grouped = Object.groupBy(records, item => item.team)
```

## 如何正确描述 TC39 提案？ {#proposal-status}

<InterviewMeta :difficulty="4" frequency="中" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 只有 Stage 4 才是将纳入标准的完成提案；Stage 2/3 代表不同成熟度，不等于所有生产运行时已可用。

回答实验特性时必须给出“截至何日、处于哪一阶段、是否需工具链、目标运行时支持度”。不要把 Signals、装饰器某个历史版本或任意博客中的“ES2026 新特性”直接当作标准事实。

::: tip 工程场景
维护 `browserslist`/运行时矩阵，以构建产物和真实兼容数据为准；新能力先进入独立边界，方便回退。
:::

## Node.js 26 与 Temporal 应如何评估？ {#node26-runtime}

<InterviewMeta :difficulty="4" frequency="中" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Node.js 26 已在 2026-05 发布为 Current，并默认启用 Temporal，但在进入 LTS 前不应自动替换生产基线；运行时升级要同时评估 V8、标准库和弃用项。

Node 26 带来 V8 14.6、Undici 8，并默认提供现代日期时间 API `Temporal`。它还删除或运行时弃用了一批旧接口。面试回答应区分“Current 可试用”和“LTS 可作为组织基线”，并给出灰度、兼容测试和回滚策略。

```js
const launch = Temporal.ZonedDateTime.from(
  '2026-08-01T09:30:00+08:00[Asia/Shanghai]'
)
const reminder = launch.subtract({ hours: 2 })
console.log(reminder.toString())
```

Temporal 明确区分 Instant、PlainDateTime 与 ZonedDateTime，避免把时区、日历时间和时间戳混成一个可变 `Date`。前端浏览器是否原生支持仍需单独检查，不能由 Node 的默认启用推断。

## 双包发布为什么会产生双实例？ {#dual-package}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 同一包被 ESM `import` 与 CommonJS `require` 解析到不同文件时会各自求值，单例、类身份和全局缓存因而分裂。

用 `exports` 明确条件入口，尽量让两种入口汇聚到同一状态实现；测试 Node、bundler、SSR 与类型声明解析。不要用深层路径绕过 `exports`。

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

**大厂追问：** `instanceof` 为什么失败？对象和构造器来自不同模块实例；排查 lockfile、符号链接、条件导出和打包器去重配置。

## 权威来源 {#sources}

- [TC39 Proposals](https://github.com/tc39/proposals)（核验：2026-07-31）
- [Node.js: ECMAScript Modules](https://nodejs.org/api/esm.html)（核验：2026-07-31）
- [MDN JavaScript Reference](https://developer.mozilla.org/docs/Web/JavaScript/Reference)（核验：2026-07-31）
- [Node.js 26.0.0 Release](https://nodejs.org/en/blog/release/v26.0.0)（核验：2026-07-31）
- [TC39 Temporal](https://tc39.es/proposal-temporal/)（核验：2026-07-31）
