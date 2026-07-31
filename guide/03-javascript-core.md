---
title: JavaScript 核心与事件循环
description: 类型、闭包、原型、this、Promise 与事件循环
chapter: "03"
difficulty: 4
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [JavaScript, Closure, Event Loop]
updatedAt: 2026-07-31
---

# JavaScript 核心与事件循环

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 章节目标 {#goals}

能预测值、调用关系和任务顺序，并把语言机制映射到真实故障。

## 题目索引 {#questions}

1. [类型、作用域与闭包应该如何回答？](#types-scope)
2. [原型、继承与 this 的统一模型是什么？](#prototype-this)
3. [Promise 与事件循环怎样协作？](#async-loop)
4. [搜索联想中的异步竞态如何治理？](#async-race)

## 类型、作用域与闭包应该如何回答？ {#types-scope}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级" verified="2026-07-31" />

**一句话结论：** 闭包是函数与其词法环境的组合；变量按词法位置解析，值的复制和对象身份必须分开讨论。

```js
function createCounter() {
  let value = 0
  return {
    next: () => ++value,
    current: () => value
  }
}
const counter = createCounter()
counter.next() // 1
```

七种原始类型按值表现，对象通过引用身份操作。`typeof null === 'object'` 是历史兼容结果；跨 realm 判断数组用 `Array.isArray()`。闭包并不自动造成泄漏，真正问题是不可达判断前仍存在意外引用。

**常见追问：**`let` 是否不提升？声明仍被创建，但初始化前处于暂时性死区，访问会抛错。

## 原型、继承与 this 的统一模型是什么？ {#prototype-this}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** 属性查找沿对象原型链进行；普通函数的 `this` 由调用点决定，箭头函数捕获外层 `this`。

```js
const user = {
  name: 'Ada',
  greet() { return `Hi, ${this.name}` }
}
const detached = user.greet
user.greet()                  // Hi, Ada
detached.call({ name: 'Lin' }) // Hi, Lin
```

`class` 是基于原型的语法体系，并带有严格模式、私有字段等语义。`new` 创建对象、连接原型、以新对象调用构造器，并在构造器未显式返回对象时返回新对象。

::: danger 易错点
把方法赋给变量后，调用点改变；不要说“this 永远指向定义它的对象”。
:::

## Promise 与事件循环怎样协作？ {#async-loop}

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 一次任务执行到栈清空后，运行时清空微任务队列，再获得渲染机会并处理下一个任务；Promise reaction 属于微任务。

```js
console.log('A')
setTimeout(() => console.log('B'))
Promise.resolve().then(() => console.log('C'))
queueMicrotask(() => console.log('D'))
console.log('E')
// A E C D B
```

`async` 函数总返回 Promise，`await` 后续相当于注册 reaction。大量递归微任务会阻塞渲染与计时器。生产代码还要处理取消、超时、并发上限和失败聚合：

```ts
async function fetchWithTimeout(url: string, ms = 3000) {
  const signal = AbortSignal.timeout(ms)
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}
```

**工程场景：**输入联想应取消旧请求并忽略过期响应；任务调度应避免用无限微任务“让出主线程”。

## 搜索联想中的异步竞态如何治理？ {#async-race}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 取消旧请求减少浪费，序列号/查询键保证只有最新结果提交；两者同时使用才能覆盖“不支持取消”和“响应已经完成”的窗口。

```ts
let revision = 0
let controller: AbortController | undefined

async function search(query: string) {
  const current = ++revision
  controller?.abort()
  controller = new AbortController()
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    signal: controller.signal
  })
  const data = await response.json()
  if (current === revision) render(data)
}
```

面试继续追问防抖、IME composition、缓存键、超时、错误去重和卸载清理。不要把 AbortError 当业务错误上报，也不要假设 Promise 本身可取消。

## 权威来源 {#sources}

- [ECMAScript Language Specification](https://tc39.es/ecma262/)（核验：2026-07-31）
- [MDN: JavaScript Guide](https://developer.mozilla.org/docs/Web/JavaScript/Guide)（核验：2026-07-31）
- [HTML Standard: Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)（核验：2026-07-31）
