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

## 权威来源 {#sources}

- [MDN: JavaScript Data Structures](https://developer.mozilla.org/docs/Web/JavaScript/Data_structures)（核验：2026-07-31）
- [ECMAScript Collections](https://tc39.es/ecma262/multipage/keyed-collections.html)（核验：2026-07-31）
- [WHATWG Structured Data](https://html.spec.whatwg.org/multipage/structured-data.html)（核验：2026-07-31）
