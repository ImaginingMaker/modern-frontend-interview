---
title: TypeScript 类型系统与工程实践
description: 类型建模、泛型、高级类型、TypeScript 7 与工程配置
chapter: "05"
difficulty: 4
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [TypeScript, Generics, tsconfig]
updatedAt: 2026-07-31
---

# TypeScript 类型系统与工程实践

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [如何用类型表达业务不变量？](#type-modeling)
2. [条件类型和 infer 如何工作？](#advanced-types)
3. [TypeScript 工程配置关注什么？](#ts-engineering)
4. [TypeScript 7 原生编译器改变了什么？](#typescript-7)
5. [API 类型与运行时数据漂移如何防护？](#type-boundary)

## 如何用类型表达业务不变量？ {#type-modeling}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 优先用判别联合让非法状态不可表示，再在不可信边界做运行时校验；类型断言不是校验。

```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

function render<T>(state: RequestState<T>) {
  if (state.status === 'success') return state.data
}
```

`unknown` 强制收窄，适合 API/JSON 边界；`any` 关闭检查并传播风险。`satisfies` 校验表达式满足目标类型，同时保留更精确推断。

## 条件类型和 infer 如何工作？ {#advanced-types}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 条件类型在类型层做分支，裸类型参数遇到联合时具有分布性，`infer` 从匹配结构中声明待推断部分。

```ts
type AwaitedValue<T> = T extends PromiseLike<infer U>
  ? AwaitedValue<U>
  : T
type ApiData = AwaitedValue<Promise<Promise<{ id: string }>>>
```

把类型参数包在元组中可关闭分布：`[T] extends [U]`。高级类型应服务于公开 API 可读性；出现深递归、慢编译和不可解释错误时，应拆分或用普通接口。

## TypeScript 工程配置关注什么？ {#ts-engineering}

<InterviewMeta :difficulty="4" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 严格模式、模块解析策略和发布边界比追逐单个语法更重要；编译器能力必须结合目标运行时与官方说明采用。

推荐开启 `strict`、`noUncheckedIndexedAccess` 和 `exactOptionalPropertyTypes`，库包生成声明文件，应用与打包器使用匹配的 `moduleResolution`。TypeScript 5.9 引入的 `import defer` 等能力仍受目标 JavaScript 运行时约束，TS 不提供对应 runtime。

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "verbatimModuleSyntax": true
  }
}
```

## TypeScript 7 原生编译器改变了什么？ {#typescript-7}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** TypeScript 7 是用 Go 重写的正式原生工具链，核心收益是约 8–12 倍全量构建加速、共享内存并行和 LSP；迁移重点是行为兼容、编辑器接入和 CI 容量，而不是新增一种 TypeScript 语言。

官方于 2026-07 发布 TypeScript 7.0。`npm install -D typescript` 获取新 `tsc`，编辑器通过 Language Server Protocol 接入；TypeScript 6.0 可与之并行运行，适合先在 CI 建立诊断差异基线。

迁移清单：

1. 锁定编译器和编辑器扩展版本，保存 6.0 的诊断与产物基线。
2. 对项目引用、watch、声明文件、JS 检查和自定义工具做回归。
3. 分别测冷构建、增量构建、峰值内存和编辑器响应，不只看官方倍数。
4. 对依赖旧 Compiler API 的工具确认替代接口；原生移植不保证内部 API 一致。

::: danger 易错点
TypeScript 7 的“原生”指编译器实现迁移，不代表业务代码编译为机器码，也不改变 TypeScript 类型在运行时被擦除的事实。
:::

## API 类型与运行时数据漂移如何防护？ {#type-boundary}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** TypeScript 只验证编译期假设，不验证网络数据；在 API、存储、消息和 URL 边界执行 schema 校验，再把结果收窄为领域类型。

大型团队应从 OpenAPI/IDL 生成客户端与契约测试，服务端兼容变更遵循“先扩展、后迁移、再删除”。前端不能用 `as User` 掩盖缺字段。

```ts
function parseUser(input: unknown): User {
  if (!input || typeof input !== 'object' || !('id' in input)) {
    throw new TypeError('invalid user payload')
  }
  return input as User // 真实项目应由 schema 库完成完整校验
}
```

监控解析失败率、接口版本和字段缺失分布，避免把原始个人数据写入日志。

## 权威来源 {#sources}

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)（核验：2026-07-31）
- [TypeScript 5.9 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html)（核验：2026-07-31）
- [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)（核验：2026-07-31）
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)（核验：2026-07-31）
