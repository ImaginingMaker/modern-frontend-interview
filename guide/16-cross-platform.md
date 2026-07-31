---
title: 小程序、Hybrid 与跨端开发
description: 小程序运行模型、Hybrid Bridge、React Native、Electron 与选型
chapter: "16"
difficulty: 4
frequency: 高
levels: [初级, 中级, 高级]
tags: [Mini Program, React Native, Electron]
updatedAt: 2026-07-31
---

# 小程序、Hybrid 与跨端开发

<InterviewMeta :difficulty="4" frequency="高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [小程序双线程模型是什么？](#mini-program)
2. [Hybrid 与 React Native 的通信瓶颈在哪里？](#hybrid-native)
3. [跨端方案如何选型？](#cross-platform-choice)
4. [Bridge 协议如何长期治理？](#bridge-governance)

## 小程序双线程模型是什么？ {#mini-program}

<InterviewMeta :difficulty="4" frequency="高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 逻辑层与渲染层隔离，通过序列化数据通信；频繁、大量 setData 会增加通信和渲染成本。

优化应减小更新粒度、避免高频全量对象传输、使用分包与预加载，并理解宿主版本和平台 API 差异。

## Hybrid 与 React Native 的通信瓶颈在哪里？ {#hybrid-native}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Hybrid 通过 WebView Bridge 跨 JS/原生边界，RN 通过其运行时与原生组件协作；跨边界频率、序列化、线程调度和生命周期是共同风险。

Bridge 必须有版本、超时、错误码、权限白名单和输入校验。RN 新架构减少旧桥接限制，但并不消除主线程、布局和原生模块治理问题。

## 跨端方案如何选型？ {#cross-platform-choice}

<InterviewMeta :difficulty="5" frequency="中" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 根据体验上限、原生能力、团队技能、包体、热更新合规、平台数量与长期维护成本打分，而不是承诺“一套代码完全复用”。

高性能原生交互优先原生/RN，内容与快速迭代可选 Web/Hybrid，桌面管理工具可评估 Electron/Tauri；共享业务模型和设计 token 往往比共享全部 UI 更现实。

## Bridge 协议如何长期治理？ {#bridge-governance}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 把 Bridge 当跨进程公共 API：schema、版本协商、权限、超时、错误码、幂等、取消和可观测性缺一不可。

消息包含 requestId、method、version 与 payload；原生侧白名单校验来源和参数，敏感能力需用户授权。Web 新版本必须兼容存量 App，采用 capability negotiation 而非只比较版本号。

监控调用量、成功率、P95、超时、payload 大小和各 App 版本分布；协议变更先双读/双写，再按版本份额移除旧路径。

## 权威来源 {#sources}

- [微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)（核验：2026-07-31）
- [React Native Architecture](https://reactnative.dev/architecture/overview)（核验：2026-07-31）
- [Electron Security](https://www.electronjs.org/docs/latest/tutorial/security)（核验：2026-07-31）
