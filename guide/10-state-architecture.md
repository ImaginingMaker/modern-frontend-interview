---
title: 状态管理、数据请求与前端架构
description: 状态边界、服务端状态缓存和架构选型
chapter: "10"
difficulty: 5
frequency: 高
levels: [初级, 中级, 高级]
tags: [State, Data Fetching, Architecture]
updatedAt: 2026-07-31
---

# 状态管理、数据请求与前端架构

<InterviewMeta :difficulty="5" frequency="高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [状态应该放在哪里？](#state-boundaries)
2. [服务端状态为什么不同？](#server-state)
3. [如何做前端架构与框架选型？](#architecture-choice)
4. [多标签页登录与状态如何保持一致？](#state-consistency)

## 状态应该放在哪里？ {#state-boundaries}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 状态应放在能满足所有消费者的最低共同层级，并按 URL、服务端、表单、局部 UI 和跨域业务状态分类。

可分享/可回放的筛选条件进入 URL；输入中的临时值留在表单；派生值即时计算而非重复存储；只有跨远距离组件且生命周期一致的客户端状态才进入 store。

## 服务端状态为什么不同？ {#server-state}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 服务端状态有所有权、时效、缓存键、并发请求和失效问题，不能只用一个全局对象替代数据层。

缓存键必须覆盖请求语义；更新时选择失效重取、乐观更新或直接写缓存，并处理回滚。SSR 还要避免跨请求共享用户数据，确保脱水/注水的一致性。

## 如何做前端架构与框架选型？ {#architecture-choice}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先列业务约束和质量属性，再比较生态、团队、渲染模式、部署边界与迁移成本；框架流行度只是证据之一。

推荐用模块化单体起步，以业务域定义边界和单向依赖；微前端只在独立团队发布、技术栈隔离等组织约束足够强时采用。设计文档记录决策、备选方案、风险、指标与退出策略。

## 多标签页登录与状态如何保持一致？ {#state-consistency}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 服务端是权限真源，标签页间只广播“状态已变化”的事件，再各自重新校验；不要把 access token 或完整用户数据作为广播消息。

同源可选 `BroadcastChannel` 或 `storage` 事件，Service Worker 适合更复杂的协调。消息带版本、来源和时间，处理重复/乱序；页面从 bfcache 恢复或重新获得可见性时再次验证。

```ts
const channel = new BroadcastChannel('auth')
channel.onmessage = ({ data }) => {
  if (data.type === 'session-changed') refreshSession()
}
```

跨子域、隐私模式和存储分区会改变能力边界，最终授权必须由服务端接口判断。

## 权威来源 {#sources}

- [React: Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)（核验：2026-07-31）
- [Vue: State Management](https://vuejs.org/guide/scaling-up/state-management.html)（核验：2026-07-31）
- [Martin Fowler: Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)（核验：2026-07-31）
