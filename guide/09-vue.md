---
title: Vue 3、响应式与编译优化
description: Proxy 响应式、组件渲染、Composition API 与 Vue 生态
chapter: "09"
difficulty: 5
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [Vue, Reactivity, Compiler]
updatedAt: 2026-07-31
---

# Vue 3、响应式与编译优化

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [Vue 3 响应式如何追踪依赖？](#vue-reactivity)
2. [编译器如何帮助运行时更新？](#vue-render)
3. [Composition API 与生态如何选型？](#vue-ecosystem)
4. [Vue 3.6 Vapor Mode 现在能否用于生产？](#vapor-mode)
5. [Vue 响应式更新丢失或过度触发如何排查？](#vue-reactivity-debug)

## Vue 3 响应式如何追踪依赖？ {#vue-reactivity}

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** Proxy 拦截对象访问和修改，effect 执行期间收集“目标—键—副作用”关系，触发时只调度相关副作用。

```ts
const state = reactive({ price: 10, count: 2 })
const total = computed(() => state.price * state.count)
watch(() => state.count, (next, prev) => console.log({ next, prev }))
```

`computed` 是带缓存的派生值，`watch` 处理副作用。解构 reactive 属性会失去代理访问，可用 `toRefs`；ref 在模板中自动解包，但集合/数组边界要理解实际规则。

## 编译器如何帮助运行时更新？ {#vue-render}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 模板编译器把静态信息编码为 patch flags、静态提升和 block tree，使运行时跳过不可能变化的节点。

虚拟 DOM diff 依赖稳定 `key` 识别身份。`v-if` 控制挂载，`v-show` 切换 display；频繁切换适合后者，初始条件稀少适合前者。性能判断应结合 Vue Devtools 和浏览器轨迹。

## Composition API 与生态如何选型？ {#vue-ecosystem}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** Composition API 按业务关注点组织可复用逻辑，Pinia 管客户端共享状态，Vue Router 管 URL，Nuxt 负责需要 SSR/混合渲染的应用约束。

Composable 要明确输入输出、作用域与清理；不要把所有状态都做全局 store。服务端状态应由具备请求去重、失效和重试语义的数据层管理。

## Vue 3.6 Vapor Mode 现在能否用于生产？ {#vapor-mode}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 截至 2026-07，Vue 3.6 仍处 RC，Vapor Mode 已功能完整但官方仍建议谨慎试用；它是可选的无 VDOM 编译模式，不是 Vue 3 默认运行方式。

Vapor 目标是降低基础包体并提升性能，支持 Vue API 的一个子集，可与 VDOM 组件互操作。依赖 VNode、组件公共实例代理或特定指令接口的代码可能不兼容；事件委托也会改变 `stopPropagation()` 等边界行为。

落地策略：

1. 只在独立、指标敏感的新组件中 opt-in，不全局切换。
2. 建立 VDOM/Vapor 行为、SSR hydration、slot、directive 与第三方库矩阵。
3. 比较真实业务的包体、内存、交互性能，而不是只引用第三方基准。
4. 等待稳定版与生态声明后再扩大范围，并保留快速回退到 VDOM 的路径。

::: warning 状态标签
“3.6 RC 功能完整”仍是预发布，不等于稳定 GA；讲义与面试回答必须同时给出版本和核验日期。
:::

## Vue 响应式更新丢失或过度触发如何排查？ {#vue-reactivity-debug}

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 沿“代理是否仍被读取 → effect 收集了哪个 key → 调度何时刷新 → 组件为何 patch”排查，重点检查解构、深度 watch、对象替换和副作用回写。

用 `onTrack/onTrigger`、Vue Devtools 与组件性能标记定位依赖。不要用 deep watch 监听巨大对象；把依赖收窄为 getter，派生值优先 computed。`nextTick` 等待本轮 DOM 刷新，不是任意异步任务完成。

**场景追问：** API 返回后视图不更新？先确认是否修改了模板真正读取的 ref/reactive、是否把 reactive 对象整体替换、是否丢失 `.value`，再查 key 与条件渲染，不要默认调用 `forceUpdate`。

## 权威来源 {#sources}

- [Vue Guide](https://vuejs.org/guide/introduction.html)（核验：2026-07-31）
- [Vue Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)（核验：2026-07-31）
- [Vue Rendering Mechanism](https://vuejs.org/guide/extras/rendering-mechanism.html)（核验：2026-07-31）
- [Vue Core Releases: 3.6 RC and Vapor Mode](https://github.com/vuejs/core/releases)（核验：2026-07-31）
