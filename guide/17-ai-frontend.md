---
title: AI 前端、Agent、流式交互与 MCP
description: 生成式 UI、流式协议、Agent 工具调用、MCP 和安全边界
chapter: "17"
difficulty: 5
frequency: 高
levels: [初级, 中级, 高级]
tags: [LLM, Agent, MCP]
updatedAt: 2026-07-31
---

# AI 前端、Agent、流式交互与 MCP

<InterviewMeta :difficulty="5" frequency="高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [流式 AI UI 如何设计？](#streaming-ui)
2. [Agent 与普通聊天有什么区别？](#agent-tooling)
3. [MCP 解决什么，安全边界在哪里？](#mcp)
4. [Agent 如何评测和监控？](#agent-evaluation)

## 流式 AI UI 如何设计？ {#streaming-ui}

<InterviewMeta :difficulty="4" frequency="高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 把响应建模为有序事件流而非字符串追加，处理开始、增量、工具调用、完成、错误、取消与重连状态。

```ts
type StreamEvent =
  | { type: 'text-delta'; id: string; delta: string }
  | { type: 'tool-call'; id: string; name: string; args: unknown }
  | { type: 'done'; usage?: { input: number; output: number } }
  | { type: 'error'; message: string; retryable: boolean }
```

渲染 Markdown 必须防 XSS；高频 token 合并应批处理；用户需要停止、重试、复制、引用来源和清楚的工具执行状态。

## Agent 与普通聊天有什么区别？ {#agent-tooling}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Agent 在模型决策与环境反馈之间循环，能够选择工具并更新状态；工具真正由宿主执行，模型只产生结构化请求。

生产系统限制最大步数、费用、超时、工具权限和可重试性；危险动作需要用户确认，工具结果视为不可信输入。前端展示计划、动作、观察与结果，但不暴露内部推理文本。

## MCP 解决什么，安全边界在哪里？ {#mcp}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Model Context Protocol 标准化客户端与服务器之间的工具、资源和提示能力协商；它不自动提供授权、可信度或安全沙箱。

客户端执行能力发现并发起 JSON-RPC 交互，宿主负责用户同意、凭证保管、权限最小化和结果隔离。远程服务要验证身份、限制重定向与网络访问，防止提示注入借工具越权。

::: warning 实验与版本
MCP 规范持续演进。实现时必须锁定协议版本并引用对应官方规范，不能把第三方 SDK 行为当成协议本身。
:::

## Agent 如何评测和监控？ {#agent-evaluation}

<InterviewMeta :difficulty="5" frequency="极高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 离线评测保护能力与回归，线上观测衡量真实完成率、成本和安全；必须记录结构化轨迹，但不能存储或展示模型私密推理。

评测集覆盖正常、歧义、工具失败、提示注入、越权和长链任务；指标包括最终任务成功、工具选择/参数正确率、步数、延迟、token/费用、用户接管率和策略违规。

生产 trace 关联 request、model、prompt version、tool call、observation 摘要和最终结果。采样保存必要输入输出并脱敏；模型 judge 需用人工标注校准，不能作为唯一真值。

**大厂追问：** 成功率升高但用户满意度下降？可能是完成定义错误、自动重试拉长延迟、危险动作过度自主或样本偏差，应联合业务指标和质检复盘。

## 权威来源 {#sources}

- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/latest)（核验：2026-07-31）
- [MDN: Streams API](https://developer.mozilla.org/docs/Web/API/Streams_API)（核验：2026-07-31）
- [OWASP: LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)（核验：2026-07-31）
