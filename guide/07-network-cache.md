---
title: 网络、缓存、CDN 与实时通信
description: HTTP 版本、缓存策略、CDN、WebSocket、SSE 与流式传输
chapter: "07"
difficulty: 4
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [HTTP, Cache, QUIC]
updatedAt: 2026-07-31
---

# 网络、缓存、CDN 与实时通信

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [HTTP/1.1、HTTP/2、HTTP/3 改进了什么？](#http-evolution)
2. [浏览器缓存与 CDN 怎样配合？](#cache-cdn)
3. [WebSocket、SSE 和流式 fetch 如何选？](#realtime)
4. [CDN 更新后新旧页面混用如何排查？](#cdn-cache-failure)

## HTTP/1.1、HTTP/2、HTTP/3 改进了什么？ {#http-evolution}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** HTTP/2 用二进制分帧与多路复用解决应用层队头和连接浪费；HTTP/3 基于 QUIC，把传输可靠性移到独立流，降低连接建立和传输层队头影响。

HTTP/2 仍运行在 TCP 上，一个丢包可阻塞同连接数据；HTTP/3 的 QUIC 基于 UDP 实现加密与多流。协议升级不等于请求越多越好，资源优先级、压缩和缓存仍决定体验。

## 浏览器缓存与 CDN 怎样配合？ {#cache-cdn}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 带内容哈希的静态资源使用长期强缓存，HTML 短缓存或协商缓存；CDN 缓存键、`Vary` 和失效策略必须与业务一致。

```http
Cache-Control: public, max-age=31536000, immutable
```

协商缓存使用 ETag/If-None-Match 或 Last-Modified。`no-cache` 是可存储但使用前验证，`no-store` 才是不存储。Service Worker 是可编程代理，应设计版本升级、离线回退与缓存淘汰。

## WebSocket、SSE 和流式 fetch 如何选？ {#realtime}

<InterviewMeta :difficulty="4" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 双向低延迟选 WebSocket，服务端单向事件选 SSE，普通 HTTP 响应增量消费选 Fetch Streams。

WebSocket 需自建重连、心跳、背压和鉴权刷新；SSE 有事件 ID 与自动重连语义；流式 fetch 适合 AI token、分块 JSON 或渐进渲染。所有方案都需处理取消、限流与半连接。

## CDN 更新后新旧页面混用如何排查？ {#cdn-cache-failure}

<InterviewMeta :difficulty="5" frequency="极高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先沿浏览器缓存、Service Worker、边缘节点、回源和发布产物逐层读取 Age、ETag、Cache-Status、版本头与内容哈希，禁止用“全量清缓存”替代根因分析。

典型策略是 HTML 短缓存或校验、带 hash 资产长期 immutable、旧资产延迟回收。若 HTML 引用的新 chunk 已发布但部分边缘仍返回旧内容，检查缓存键、`Vary`、预热与原子发布顺序。

**应急顺序：** 停止继续发布 → 固定受影响版本 → 恢复旧资产或回滚 HTML → 精准 purge → 验证多地域节点 → 复盘缓存规则。使用 `Cache-Status` 能区分命中、转发和回源。

## 权威来源 {#sources}

- [HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)（核验：2026-07-31）
- [HTTP Caching](https://www.rfc-editor.org/rfc/rfc9111)（核验：2026-07-31）
- [MDN: Web APIs](https://developer.mozilla.org/docs/Web/API)（核验：2026-07-31）
- [RFC 9211: Cache-Status](https://www.rfc-editor.org/info/rfc9211/)（核验：2026-07-31）
