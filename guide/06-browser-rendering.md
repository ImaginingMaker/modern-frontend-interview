---
title: 浏览器架构、导航与渲染流水线
description: 多进程架构、导航、样式、布局、绘制、光栅与合成
chapter: "06"
difficulty: 5
frequency: 极高
levels: [初级, 中级, 高级]
tags: [Chromium, Rendering, Event]
updatedAt: 2026-07-31
---

# 浏览器架构、导航与渲染流水线

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [输入 URL 后发生什么？](#navigation)
2. [渲染流水线如何生成像素？](#render-pipeline)
3. [主线程卡顿为什么影响交互？](#browser-scheduling)
4. [现代导航与页面生命周期有哪些新考点？](#modern-navigation)
5. [如何用 Chrome Performance 定位掉帧？](#chrome-tracing)

## 输入 URL 后发生什么？ {#navigation}

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 导航是浏览器进程、网络服务和渲染进程协作的状态机，回答时应按输入解析、网络、响应处理、进程选择、提交导航和文档加载分层。

浏览器判断输入、查询 DNS、建立连接并完成 TLS，处理重定向与响应类型；浏览器进程依据站点隔离选择渲染进程，提交导航后将响应体流式交给渲染器。Service Worker、HTTP 缓存和预加载可能改变路径。

**常见追问：**DOMContentLoaded 与 load？前者在文档解析完成且需等待的脚本执行后触发；load 还等待图片等依赖资源。

## 渲染流水线如何生成像素？ {#render-pipeline}

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 主线程解析并计算样式、布局和绘制记录，合成相关线程完成分层、光栅和帧合成；属性变化触发的阶段不同。

```text
HTML/CSS → DOM/CSSOM → Style → Layout → Paint
                                     ↓
Layer tree → Tiling → Raster → Composite → Display
```

修改几何属性通常需要布局，颜色通常需要绘制，合适图层上的 transform/opacity 可只合成。但流水线会增量执行，不应背成每帧完整重跑。强制同步布局常来自“写样式后立即读几何”，应批量读写。

::: warning 易错点
GPU 加速不是万能开关；`will-change` 会消耗显存，只应短期用于确有收益的元素。
:::

## 主线程卡顿为什么影响交互？ {#browser-scheduling}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 脚本、样式、布局和许多输入处理共享渲染主线程，长任务会推迟事件处理和下一帧，最终恶化 INP。

拆分任务应基于用户可见优先级：把纯计算移入 Worker，把非紧急更新切片或调度，在每片之间给渲染机会。`requestAnimationFrame` 适合下一帧视觉更新，不是通用后台任务队列。

**工程场景：**用 Performance 面板定位 Long Task，再用调用栈和 Interaction 轨迹找到责任代码；优化前后以真实设备数据验证。

## 现代导航与页面生命周期有哪些新考点？ {#modern-navigation}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 现代页面切换要同时理解 bfcache、View Transitions、可等待滚动和连接生命周期；它们优化返回速度与视觉连续性，但都必须保留无增强时的正确导航。

2026 年 Chrome 已允许存在有效 WebSocket 的页面进入 bfcache：进入缓存时连接会被关闭，恢复后应用必须重建连接并同步缺失状态。程序化平滑滚动开始提供 Promise，可在滚动稳定后可靠执行后续动作，但仍应做能力检测。

```js
addEventListener('pageshow', (event) => {
  if (event.persisted) reconnectAndResync()
})

const result = document.querySelector('#result')
const completion = result?.scrollIntoView({ behavior: 'smooth' })
if (completion && typeof completion.then === 'function') {
  await completion
}
```

View Transition 只负责视觉过渡，不替代路由、数据一致性、焦点管理和 `prefers-reduced-motion`。`pagehide/pageshow` 比假设 unload 一定执行更适合 bfcache 生命周期。

## 如何用 Chrome Performance 定位掉帧？ {#chrome-tracing}

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 录制可复现的交互轨迹，从帧/交互症状下钻到 Main、Compositor、Raster 和网络事件，用调用栈证明瓶颈属于脚本、样式布局、绘制还是合成。

标准步骤：

1. 使用无痕环境、固定 CPU/网络与同一操作录制，标记用户交互。
2. 看 INP breakdown、Long Animation Frame、掉帧和长任务。
3. 展开任务调用栈，检查 Recalculate Style、Layout、Paint、Raster 与 GC。
4. 用 Bottom-up/Call tree 找累计热点；用 Layers/Rendering 面板验证层和重绘。
5. 修复后比较相同轨迹、相同设备的分位数据，再看线上 RUM 是否同步改善。

::: danger 高频误区
火焰图“最宽函数”不一定是根因；它可能只是被同步布局、第三方脚本或上游数据量放大。截图、Coverage 或 Lighthouse 单次分数也不能代替 Performance trace。
:::

## 权威来源 {#sources}

- [Chromium: Inside look at modern web browser](https://developer.chrome.com/blog/inside-browser-part1)（核验：2026-07-31）
- [HTML Standard](https://html.spec.whatwg.org/)（核验：2026-07-31）
- [web.dev: Rendering performance](https://web.dev/articles/rendering-performance)（核验：2026-07-31）
- [web.dev: New to the web platform in June 2026](https://web.dev/blog/web-platform-06-2026)（核验：2026-07-31）
- [MDN: Back/forward cache](https://developer.mozilla.org/docs/Glossary/bfcache)（核验：2026-07-31）
- [Chrome: RenderingNG architecture](https://developer.chrome.com/docs/chromium/renderingng-architecture)（核验：2026-07-31）
- [Chrome: Page Lifecycle API](https://developer.chrome.com/docs/web-platform/page-lifecycle-api)（核验：2026-07-31）
