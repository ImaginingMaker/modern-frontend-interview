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
3. [Fiber 如何划分 render 与 commit？](#fiber-pipeline)
4. [Server Components 与 React 19.2 如何理解？](#react-server)
5. [RSC 安全事件给前端什么启示？](#rsc-security)
6. [React 列表输入卡顿如何诊断？](#react-performance-debug)

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

## Fiber 如何划分 render 与 commit？ {#fiber-pipeline}

<InterviewMeta :difficulty="5" frequency="极高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Fiber 把组件工作表示为可遍历的节点，并把更新分成可被重做的 render 与同步提交的 commit；并发能力来自调度和可恢复工作，不是 Fiber 节点本身“开启了多线程”。

render 阶段根据优先级处理更新，执行组件并协调子节点，构造 work-in-progress 树和变更标记。它不应产生对外可见副作用，因为工作可能暂停、放弃或重新执行。`child`、`sibling`、`return` 让 React 用显式工作循环遍历树，`alternate` 关联当前树和工作树；这些是理解机制的模型，不应把某一版本源码字段背成稳定公共 API。

commit 阶段把已经完成的结果应用到宿主环境，处理 DOM 变更、ref 与 layout effect。该阶段必须保持一致性，不能把一半 DOM 更新暴露给用户，因此相对短且同步。passive effect 通常在提交后另行调度。

::: warning 易错点
“render 可中断”不代表所有更新都会中断，也不代表一次组件函数调用能从中间续跑。React 在 Fiber 工作单元边界让出，并可能重新执行组件；render 中发请求、改 DOM 或写全局变量会因此产生重复副作用。
:::

**常见追问：** Lane 是什么？它用位集合表达一组更新优先级和依赖关系，支持合并、选择与过期判断；面试重点是解释“多个更新如何被分组和抢占”，不必默写内部常量。

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
- [React Reconciler source](https://github.com/facebook/react/tree/main/packages/react-reconciler)（核验：2026-07-31）
- [React 19.2](https://react.dev/blog/2025/10/01/react-19-2)（核验：2026-07-31）
- [React Server Components](https://react.dev/reference/rsc/server-components)（核验：2026-07-31）
- [React: Critical Security Vulnerability in React Server Components](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)（核验：2026-07-31）
