---
title: CSS、布局与现代 Web 样式
description: 格式化上下文、响应式、容器查询与现代 CSS
chapter: "02"
difficulty: 3
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [CSS, Grid, Container Query]
updatedAt: 2026-07-31
---

# CSS、布局与现代 Web 样式

<InterviewMeta :difficulty="3" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 章节目标 {#goals}

从布局算法和组件约束解释 CSS，而不是背诵居中方案。

## 题目索引 {#questions}

1. [Flex、Grid 和 BFC 如何选择？](#layout)
2. [媒体查询与容器查询有什么本质区别？](#responsive)
3. [哪些现代 CSS 能进入生产？](#modern-css)
4. [2026 Web UI 新能力怎样分级采用？](#web-ui-2026)
5. [复杂布局线上错位如何排查？](#css-debugging)

## Flex、Grid 和 BFC 如何选择？ {#layout}

<InterviewMeta :difficulty="3" frequency="极高" levels="校招 / 初级" verified="2026-07-31" />

**一句话结论：** Flex 解决一维内容分配，Grid 解决二维轨道，块格式化上下文处理块布局隔离；选择依据是约束模型而不是代码行数。

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  gap: 1rem;
}
.toolbar { display: flex; align-items: center; gap: .75rem; }
.toolbar__spacer { margin-inline-start: auto; }
```

Flex 的 `min-width: auto` 会使长内容不愿收缩，常用 `min-width: 0` 修复。Grid 的 `fr` 分配剩余空间，`minmax()` 表达轨道下限。`display: flow-root` 是创建 BFC、包裹浮动的语义清晰方案。

**常见追问：**为什么 `z-index: 9999` 仍被盖住？因为层叠上下文限定了比较范围；先检查祖先的 transform、opacity、isolation 和定位。

## 媒体查询与容器查询有什么本质区别？ {#responsive}

<InterviewMeta :difficulty="3" frequency="高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 媒体查询响应视口或设备，容器查询响应组件可用空间；可复用组件更适合容器查询。

```css
.card-list { container: cards / inline-size; }
.card { display: grid; gap: .75rem; }
@container cards (width > 42rem) {
  .card { grid-template-columns: 10rem 1fr; }
}
```

移动优先不是只写小屏，而是先定义最少约束再增量增强。图片要配合 `srcset`/`sizes`，排版可用 `clamp()`，交互还需尊重 `prefers-reduced-motion` 和指针精度。

::: warning 易错点
不要用固定设备型号断点；断点应由内容开始破坏的宽度决定。
:::

## 哪些现代 CSS 能进入生产？ {#modern-css}

<InterviewMeta :difficulty="4" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 用 Baseline/兼容数据判断特性成熟度，并通过渐进增强落地，而不是把“新语法”一概视为不可用。

`:has()` 可进行父级条件选择，Cascade Layers 管理来源优先级，原生嵌套降低预处理依赖，View Transitions 和滚动驱动动画适合增强体验。用 `@supports` 提供能力检测：

```css
@layer reset, components, overrides;
@supports (interpolate-size: allow-keywords) {
  :root { interpolate-size: allow-keywords; }
}
```

动画优先改变 `transform` 和 `opacity`，但“合成层一定更快”不成立：过多图层增加内存和合成成本。

**复习清单：**盒模型、包含块、层叠上下文、Flex/Grid、容器查询、逻辑属性、`:has()`、`@layer`、动画流水线。

## 2026 Web UI 新能力怎样分级采用？ {#web-ui-2026}

<InterviewMeta :difficulty="5" frequency="中" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** “在某个稳定浏览器发布”不等于“跨浏览器稳定”；用 Baseline、目标浏览器矩阵和渐进增强把新 UI 能力分为可直接使用、可增强和仅实验三层。

截至 2026-06，`field-sizing: content` 已进入 Baseline，可让 input、textarea、select 随内容调整尺寸；`light-dark()` 的颜色值形式已具备较广支持。`text-fit`、gap decorations、`focusgroup`、程序化滚动 Promise 等已进入部分稳定浏览器，但仍需按产品矩阵判断。CSS `@function`、`if()`、元素范围 View Transition 等更不应脱离兼容数据直接写入核心路径。

```css
/* 第一层：已有广泛支持的基础行为 */
textarea {
  min-block-size: 3lh;
  resize: vertical;
}

/* 第二层：能力存在时增强 */
@supports (field-sizing: content) {
  textarea {
    field-sizing: content;
    max-block-size: 12lh;
  }
}
```

**常见追问：**为什么只用 `@supports` 仍不够？它只能检测当前运行时是否识别语法，不能替代产品的浏览器支持范围、辅助技术验证、性能测试和回退设计。

::: warning 状态标签
Chrome “Stable”描述单一浏览器渠道；Baseline 表示核心浏览器达到特定可用状态；标准草案阶段和浏览器实现状态也不是同一维度。
:::

## 复杂布局线上错位如何排查？ {#css-debugging}

<InterviewMeta :difficulty="4" frequency="高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先复现目标视口与内容，再从包含块、格式化上下文、固有尺寸、层叠和字体加载逐层缩小，而不是不断提高 `z-index` 或增加 `!important`。

排查顺序：DevTools 查看 computed/overridden 规则 → 打开 Grid/Flex overlay → 检查 `min-width:auto`、长文本和图片固有尺寸 → 定位 stacking context → 对比字体加载前后 → 检查安全区、缩放、DPR 与容器查询条件。

**大厂追问：** 为什么本地正常、线上错位？常见原因是字体/CDN 版本、CSS chunk 顺序、SSR hydration class 差异、AB 实验内容和浏览器支持矩阵。修复后用最小复现、视觉回归和真实设备验证。

## 权威来源 {#sources}

- [MDN: CSS](https://developer.mozilla.org/docs/Web/CSS)（核验：2026-07-31）
- [web.dev: Baseline](https://web.dev/baseline)（核验：2026-07-31）
- [CSS Working Group Drafts](https://www.w3.org/Style/CSS/current-work)（核验：2026-07-31）
- [Chrome: What's new in web UI at I/O 2026](https://developer.chrome.com/blog/new-in-web-ui-io26)（核验：2026-07-31）
- [web.dev: New to the web platform in June 2026](https://web.dev/blog/web-platform-06-2026)（核验：2026-07-31）
