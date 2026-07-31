---
title: HTML、DOM、可访问性与 SEO
description: 语义化、事件系统、表单、Web Components 与搜索引擎基础
chapter: "01"
difficulty: 2
frequency: 高
levels: [校招, 初级, 中级, 高级]
tags: [HTML, DOM, Accessibility, SEO]
updatedAt: 2026-07-31
---

# HTML、DOM、可访问性与 SEO

<InterviewMeta :difficulty="2" frequency="高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 章节目标 {#goals}

能从语义、交互、可访问性和可发现性四个维度解释页面结构，而不只是罗列标签。

## 题目索引 {#questions}

1. [为什么语义化不仅是“用对标签”？](#semantic-html)
2. [事件委托为什么有效，边界是什么？](#dom-events)
3. [表单、SEO 与 Web Components 如何取舍？](#forms-seo)
4. [如何治理大型设计系统的可访问性？](#accessibility-design-system)

## 为什么语义化不仅是“用对标签”？ {#semantic-html}

<InterviewMeta :difficulty="2" frequency="高" levels="校招 / 初级" verified="2026-07-31" />

**一句话结论：** 语义 HTML 同时为浏览器默认行为、辅助技术、搜索引擎和维护者提供结构，ARIA 只在原生语义不足时补充。

### 原理详解

`button` 天然可聚焦、可被键盘激活并具有 button role；用 `div` 模拟按钮必须重新实现这些行为。页面应有唯一明确的主标题、可跳过重复导航的主内容区域、与控件关联的 `label`，并保持焦点顺序符合视觉顺序。

```html
<a class="skip-link" href="#main">跳到主要内容</a>
<header><nav aria-label="主导航">...</nav></header>
<main id="main">
  <h1>订单详情</h1>
  <button type="button">取消订单</button>
</main>
```

**常见追问：**何时使用 ARIA？先选原生元素；只有没有等价语义时使用 role、state 和 property，并用键盘与屏幕阅读器验证。

::: warning 易错点
`aria-label` 不会自动修复键盘行为；`outline: none` 若没有可见替代焦点会破坏可访问性。
:::

**工程场景：**设计系统应把语义、键盘操作和焦点样式封装进基础组件，并用自动扫描加人工键盘检查。

## 事件委托为什么有效，边界是什么？ {#dom-events}

<InterviewMeta :difficulty="3" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** 事件委托利用事件传播，在稳定祖先上处理动态后代事件；需要正确处理 `target`、`currentTarget`、不可冒泡事件和 Shadow DOM 边界。

```ts
const list = document.querySelector<HTMLUListElement>('#todo-list')!
list.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-remove]')
  if (!button || !list.contains(button)) return
  button.closest('li')?.remove()
})
```

`target` 是最初触发节点，`currentTarget` 是当前监听器节点。`focus`/`blur` 不冒泡，可用 `focusin`/`focusout`。跨 Shadow DOM 需要关注事件的 `composed` 标志和 `composedPath()`。

**常见追问：**委托一定更快吗？不是。它减少监听器数量和动态绑定成本，但高频事件若在大容器中做昂贵匹配，反而可能增加开销。

::: danger 过时说法
“所有事件都冒泡”错误；也不要依赖非标准的全局 `event` 对象。
:::

## 表单、SEO 与 Web Components 如何取舍？ {#forms-seo}

<InterviewMeta :difficulty="3" frequency="中" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 优先使用浏览器已有能力，渐进增强交互；自定义元素负责封装，不应牺牲表单语义、可索引内容与服务端输出。

```html
<form action="/search" method="get">
  <label for="q">关键词</label>
  <input id="q" name="q" type="search" required minlength="2">
  <button>搜索</button>
</form>
```

`name` 决定提交字段，`label` 扩大可点击区域，服务端仍要做权威校验。SEO 关注可抓取链接、描述性标题、规范 URL、结构化数据和真实内容，不等于堆关键词。Shadow DOM 提供样式与 DOM 封装，但封闭程度、可访问性树和服务端渲染策略必须一起评估。

**复习清单：**语义元素、焦点管理、事件三阶段、表单提交、Custom Elements 生命周期、Shadow DOM、结构化数据。

## 如何治理大型设计系统的可访问性？ {#accessibility-design-system}

<InterviewMeta :difficulty="4" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 把无障碍做成组件契约、自动门禁和人工验收，而不是上线前补 ARIA；重点治理键盘、焦点、名称、状态和动态通知。

大厂场景题通常会追问“100 个业务线如何统一”：基础组件内置语义与 roving tabindex，组件文档列出键盘表；CI 用 axe 类规则扫描；Storybook/真实浏览器覆盖焦点陷阱、缩放和屏幕阅读器；线上监控只能发现部分问题，不能替代用户测试。

**验收指标：** 关键旅程全键盘可完成，焦点不丢失，错误与异步结果通过 live region 可感知，200% 缩放不丢功能。ARIA 快照稳定不代表真实读屏体验稳定。

## 权威来源 {#sources}

- [MDN: HTML](https://developer.mozilla.org/docs/Web/HTML)（核验：2026-07-31）
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)（核验：2026-07-31）
- [web.dev: Learn Accessibility](https://web.dev/learn/accessibility/)（核验：2026-07-31）
- [MDN: HTML accessibility](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML)（核验：2026-07-31）

下一章：[CSS、布局与现代 Web 样式](/guide/02-css-modern)
