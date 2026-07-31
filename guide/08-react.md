---
title: React 19.x、并发与服务端组件
description: Hooks、并发渲染、Actions、Server Components 与 React 19.2
chapter: "08"
difficulty: 5
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [React, Hooks, RSC]
updatedAt: 2026-07-31
---

# React 19.x、并发与服务端组件

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [React 状态与 Hooks 的心智模型是什么？](#react-render)
2. [并发渲染和 Actions 解决什么？](#react-concurrency)
3. [Server Components 与 React 19.2 如何理解？](#react-server)
4. [RSC 安全事件给前端什么启示？](#rsc-security)
5. [React 列表输入卡顿如何诊断？](#react-performance-debug)

## React 状态与 Hooks 的心智模型是什么？ {#react-render}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** 每次渲染是状态快照，事件处理器闭包看到创建它的那次快照；state 更新排队并触发新的 render/commit。

```tsx
function Counter() {
  const [count, setCount] = useState(0)
  const addTwo = () => {
    setCount(value => value + 1)
    setCount(value => value + 1)
  }
  return <button onClick={addTwo}>{count}</button>
}
```

Effect 用于与外部系统同步，不应用来计算可由 props/state 推导的值。依赖数组不是手写调度器，而是 effect 所读取反应式值的声明。

## 并发渲染和 Actions 解决什么？ {#react-concurrency}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 并发允许 React 中断和重新开始非紧急渲染，不是多线程；Transition 区分更新优先级，Actions 简化异步变更的 pending、错误和乐观状态。

`useTransition` 不会让昂贵计算本身更快，而是让紧急输入保持可响应。`useOptimistic` 需设计服务端失败回滚和请求竞争。优化先看 Profiler，避免无证据地铺满 `memo`/`useMemo`。

## Server Components 与 React 19.2 如何理解？ {#react-server}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Server Components 在服务端执行并把组件结果流给客户端，可减少客户端 JS；它依赖框架/打包器协议，不等于普通 SSR。

SSR 输出 HTML 后仍需 hydration；RSC 可以访问服务端数据但不能使用客户端状态与浏览器 API。边界通过 `"use client"` 明确。React 19.2 官方发布包含 Activity、`useEffectEvent` 等能力；采用前应以官方文档和框架支持矩阵为准。

::: danger 易错点
不要把 React Server Components 描述成“服务器返回组件 HTML”；传输的是框架解释的 RSC payload，HTML 与客户端 hydration 是另一层。
:::

## RSC 安全事件给前端什么启示？ {#rsc-security}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Server Function/RSC payload 是跨信任边界的远程输入；框架负责协议并不等于应用可忽略反序列化风险、补丁版本和部署资产清单。

React 官方披露 CVE-2025-55182：攻击者可构造发送到 Server Function 端点的请求，利用服务端 payload 解码缺陷实现未授权远程代码执行。受影响的 `react-server-dom-*` 19.0、19.1.0、19.1.1、19.2.0 应升级至官方列出的修复版本（分别至少 19.0.1、19.1.2、19.2.1），并继续以最新安全通告为准。

面试回答应覆盖：

- 通过 SBOM/锁文件确认是否间接包含 RSC 包，而不是只搜索业务是否写了 Server Function。
- 临时 WAF/托管缓解不能替代升级；升级后重新构建、全量部署并清理旧产物。
- Server Function 仍需鉴权、参数校验、最小权限和审计，客户端生成的引用不能作为授权凭据。
- 建立框架安全通告订阅、补丁 SLA、灰度与回滚机制。

## React 列表输入卡顿如何诊断？ {#react-performance-debug}

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先用 React Profiler 区分“谁渲染、为何渲染、提交多久”，再用 Chrome trace 判断浏览器阶段；避免把所有组件包进 `memo`。

检查状态是否抬得过高、context value 是否每次新建、selector 是否返回新对象、列表 key 是否稳定、effect 是否反复写 state。大列表同时考虑虚拟化、事件成本和 DOM/布局开销。

**大厂追问：** `useMemo` 为什么无效？依赖本身不稳定、计算不是瓶颈、commit/布局才是瓶颈，或 memo 成本超过节省。React Compiler 可减少部分手工 memo，但不修复错误状态边界和昂贵 DOM。

## 权威来源 {#sources}

- [React Documentation](https://react.dev/learn)（核验：2026-07-31）
- [React 19.2](https://react.dev/blog/2025/10/01/react-19-2)（核验：2026-07-31）
- [React Server Components](https://react.dev/reference/rsc/server-components)（核验：2026-07-31）
- [React: Critical Security Vulnerability in React Server Components](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)（核验：2026-07-31）
