---
title: Web 性能、Core Web Vitals 与监控
description: LCP、INP、CLS、加载性能、运行时性能与真实用户监控
chapter: "12"
difficulty: 5
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [Core Web Vitals, RUM, Profiling]
updatedAt: 2026-07-31
---

# Web 性能、Core Web Vitals 与监控

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [LCP、INP、CLS 分别衡量什么？](#core-web-vitals)
2. [如何系统优化页面性能？](#performance-strategy)
3. [如何建设可归因的 RUM？](#observability)
4. [前端监控 SDK 与数据管线如何设计？](#monitoring-sdk)

## LCP、INP、CLS 分别衡量什么？ {#core-web-vitals}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** LCP 衡量主内容加载，INP 衡量整个访问期交互响应，CLS 衡量非预期布局偏移；以真实用户数据的第 75 百分位评估。

常用“良好”阈值：LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1。实验室数据适合复现，字段数据代表真实分布；两者不能互相替代。

## 如何系统优化页面性能？ {#performance-strategy}

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先用瀑布图和主线程轨迹定位瓶颈，再按服务器响应、关键资源发现、下载、渲染和交互分段优化。

LCP 优化关注 TTFB、资源发现优先级、图片尺寸/格式和渲染阻塞；INP 优化关注事件延迟、处理时长和下一帧呈现；CLS 为图片和广告预留尺寸，避免首屏上方插入内容。

```js
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    navigator.sendBeacon('/rum', JSON.stringify(entry.toJSON()))
  }
}).observe({ type: 'long-animation-frame', buffered: true })
```

## 如何建设可归因的 RUM？ {#observability}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 性能数据必须关联版本、路由、设备、网络和业务动作，并控制采样、隐私、上报可靠性和基数。

用分位数而非平均数；发布标记与前后对照帮助归因；指标恶化后从页面模板下钻到元素、交互和长任务。预算进入 CI，但实验室门禁不能代替线上告警。

## 前端监控 SDK 与数据管线如何设计？ {#monitoring-sdk}

<InterviewMeta :difficulty="5" frequency="极高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** SDK 负责低开销采集、上下文关联、去重采样和可靠发送；数据管线负责清洗、会话化、聚合、告警与归因，二者都必须受隐私和成本预算约束。

### 采集层

- 错误：`error`、`unhandledrejection`、资源加载、接口失败和框架 error boundary；保留错误链与 source map release。
- 性能：Navigation/Resource/Long Animation Frame/Event/LCP/CLS 等 PerformanceEntry，补充路由与关键业务阶段。
- 行为：只采业务事件 ID 与必要维度，不录密码、token、输入原文和完整 DOM。

```ts
const queue: unknown[] = []
function flush() {
  if (!queue.length) return
  const payload = JSON.stringify(queue.splice(0))
  navigator.sendBeacon('/monitor', payload)
}
addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') flush()
})
```

### 数据质量与告警

事件必须有 schemaVersion、release、route、session、traceId、采样率和时间基准。SDK 限流、批量、压缩、离线队列与熔断；服务端按实际采样率还原。告警基于错误率、影响用户数、SLO burn rate 和版本对比，不按单条异常轰炸。

### 面试追问

- 白屏率如何定义？约定首个有效内容/业务 ready 信号、超时与后台页排除，配合错误和资源证据。
- Source map 如何安全使用？构建时上传到私有平台并与 release 绑定，不公开部署源文件。
- SDK 自身报错怎么办？全链路 try/catch、递归上报保护、性能预算、远程降级和 kill switch。
- 如何关联前后端？传播 trace context，把页面交互、fetch、网关与服务 span 串联，但对跨域和个人数据做最小化。

## 权威来源 {#sources}

- [web.dev: Web Vitals](https://web.dev/articles/vitals)（核验：2026-07-31）
- [Chrome: INP](https://web.dev/articles/inp)（核验：2026-07-31）
- [W3C Performance Timeline](https://w3c.github.io/performance-timeline/)（核验：2026-07-31）
- [web.dev: Core Web Vitals workflows](https://web.dev/articles/vitals-tools)（核验：2026-07-31）
