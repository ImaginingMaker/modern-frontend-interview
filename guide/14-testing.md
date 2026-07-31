---
title: 单元、组件、集成与 E2E 测试
description: 测试分层、组件行为、Playwright、契约和稳定性
chapter: "14"
difficulty: 4
frequency: 高
levels: [校招, 初级, 中级, 高级]
tags: [Vitest, Playwright, Testing]
updatedAt: 2026-07-31
---

# 单元、组件、集成与 E2E 测试

<InterviewMeta :difficulty="4" frequency="高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [测试分层如何确定？](#test-pyramid)
2. [组件测试应该观察什么？](#component-test)
3. [怎样写稳定的 E2E？](#e2e-quality)
4. [如何治理 Flaky 测试？](#flaky-tests)

## 测试分层如何确定？ {#test-pyramid}

<InterviewMeta :difficulty="3" frequency="高" levels="校招 / 初级" verified="2026-07-31" />

**一句话结论：** 按风险选择最小但足够真实的测试边界：纯逻辑用单元，组件协作用集成，关键用户旅程用 E2E。

覆盖率只能说明执行过代码，不能说明断言质量。优先测业务不变量、边界值、失败路径和历史缺陷，避免逐行复制实现。

## 组件测试应该观察什么？ {#component-test}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 从用户可感知的角色、文本、状态和交互断言组件，少依赖 class、内部实例和快照细节。

```ts
it('提交失败时保留输入并显示错误', async () => {
  render(<Login api={failingApi} />)
  await user.type(screen.getByLabelText('邮箱'), 'a@example.com')
  await user.click(screen.getByRole('button', { name: '登录' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('请稍后重试')
})
```

## 怎样写稳定的 E2E？ {#e2e-quality}

<InterviewMeta :difficulty="4" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 使用可访问角色和业务标识定位，等待可观察状态而非固定 sleep，隔离测试数据，并在失败时保留 trace、截图和网络信息。

契约测试保护服务边界，视觉回归保护布局，E2E 保护关键旅程；三者职责不同。重试用于暴露 flaky，不应用来永久掩盖竞争条件。

## 如何治理 Flaky 测试？ {#flaky-tests}

<InterviewMeta :difficulty="4" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先按失败签名和环境聚类，再定位时间、数据、网络、选择器或资源竞争；隔离有期限和负责人，重试不计作修复。

保留 trace、视频、console、网络与服务端日志。使用 role/test id 和可观察状态，禁止固定 sleep；数据由 fixture/API 创建并唯一命名；时钟、随机数和外部服务需要可控边界。

**治理指标：** flaky rate、首次失败后通过率、隔离库存年龄、每套件时长和重复失败签名。达到阈值阻止继续增加 E2E，优先修复基础设施。

## 权威来源 {#sources}

- [Vitest Guide](https://vitest.dev/guide/)（核验：2026-07-31）
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)（核验：2026-07-31）
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles/)（核验：2026-07-31）
