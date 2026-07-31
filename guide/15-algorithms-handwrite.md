---
title: 数据结构、算法与前端手写题
description: 复杂度、常用结构、防抖、并发控制和前端算法策略
chapter: "15"
difficulty: 4
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [Algorithm, Promise, LRU]
updatedAt: 2026-07-31
---

# 数据结构、算法与前端手写题

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [如何做复杂度分析？](#complexity)
2. [手写题真正考什么？](#handwrite)
3. [前端算法题如何系统求解？](#frontend-algorithms)
4. [如何手写并发任务调度器？](#concurrency-runner)
5. [如何设计请求合并与背压？](#request-batching)

## 如何做复杂度分析？ {#complexity}

<InterviewMeta :difficulty="3" frequency="极高" levels="校招 / 初级" verified="2026-07-31" />

**一句话结论：** 明确输入规模、主导操作和额外空间，再给最坏/均摊复杂度；不要只背 API 复杂度。

Map/Set 提供平均近常数查找，栈适合括号与 DFS，队列适合 BFS，堆适合 Top K，LRU 常用 Map 的插入顺序或哈希表加双向链表。

## 手写题真正考什么？ {#handwrite}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** 先确认输入、返回值、this、错误、取消和边界，再写最小正确实现；能解释取舍比复现库源码重要。

```ts
function debounce<T extends (...args: any[]) => void>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | undefined
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), wait)
  }
}
```

深拷贝优先 `structuredClone` 并说明限制；Promise 并发控制要保持结果顺序、限制活跃任务、传播失败并支持取消。

## 前端算法题如何系统求解？ {#frontend-algorithms}

<InterviewMeta :difficulty="4" frequency="高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** 把 UI 问题抽象成区间、树、图、滑动窗口或缓存，再用样例、反例和复杂度验证。

DOM 树遍历对应 DFS/BFS，虚拟列表对应前缀和与二分，自动完成对应 trie/缓存，依赖调度对应有向无环图与拓扑排序。

## 如何手写并发任务调度器？ {#concurrency-runner}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** 维护下一个任务索引与固定数量 worker，结果按输入位置写入；必须说明空输入、失败策略、并发非法值和取消。

```ts
async function runPool<T>(tasks: Array<() => Promise<T>>, limit: number) {
  if (!Number.isInteger(limit) || limit < 1) throw new RangeError('limit')
  const results: T[] = new Array(tasks.length)
  let next = 0
  async function worker() {
    while (next < tasks.length) {
      const index = next++
      results[index] = await tasks[index]()
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker))
  return results
}
```

追问包括 fail-fast 与 all-settled、动态优先级、背压、AbortSignal 和重试幂等性。

## 如何设计请求合并与背压？ {#request-batching}

<InterviewMeta :difficulty="5" frequency="高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 在短窗口内把同类请求收集成批次，并为每个调用者保存独立 resolve/reject；窗口、批大小、并发数和队列上限共同决定吞吐、延迟与内存风险。

```ts
type Pending<T> = {
  key: string
  resolve(value: T): void
  reject(reason: unknown): void
}

class Batcher<T> {
  private queue: Pending<T>[] = []
  private timer?: ReturnType<typeof setTimeout>

  constructor(
    private readonly fetchBatch: (keys: string[]) => Promise<Map<string, T>>,
    private readonly windowMs = 10,
    private readonly maxBatch = 50
  ) {}

  load(key: string) {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ key, resolve, reject })
      if (this.queue.length >= this.maxBatch) void this.flush()
      else this.timer ??= setTimeout(() => void this.flush(), this.windowMs)
    })
  }

  private async flush() {
    clearTimeout(this.timer)
    this.timer = undefined
    const batch = this.queue.splice(0, this.maxBatch)
    if (!batch.length) return
    try {
      const result = await this.fetchBatch([...new Set(batch.map(item => item.key))])
      for (const item of batch) {
        const value = result.get(item.key)
        value === undefined ? item.reject(new Error(`missing: ${item.key}`)) : item.resolve(value)
      }
    } catch (error) {
      for (const item of batch) item.reject(error)
    } finally {
      if (this.queue.length) void this.flush()
    }
  }
}
```

这段最小实现展示合并、去重和结果分发，但生产版还需队列上限、取消、超时、批次并发限制和局部失败协议。不要把“16ms 等于一帧”当成固定批窗口：高刷新率、后台页和主线程拥塞都会改变帧时序，批窗口应由业务延迟预算决定。

**工程场景：** 页面上几十个模块同时请求详情时，可按租户、接口和鉴权上下文分组；禁止把不同权限域请求合并。若生产速度低于入队速度，必须拒绝、降级或向上游传播背压，而不是无限堆积 Promise。

## 权威来源 {#sources}

- [MDN: JavaScript Data Structures](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures)（核验：2026-07-31）
- [ECMAScript Collections](https://tc39.es/ecma262/multipage/keyed-collections.html)（核验：2026-07-31）
- [WHATWG Structured Data](https://html.spec.whatwg.org/multipage/structured-data.html)（核验：2026-07-31）
- [MDN: AbortController](https://developer.mozilla.org/docs/Web/API/AbortController)（核验：2026-07-31）
