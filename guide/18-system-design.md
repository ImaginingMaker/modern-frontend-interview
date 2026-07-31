---
title: 大厂场景题、系统设计与项目复盘
description: 前端系统设计方法、场景排障、技术决策和行为面试
chapter: "18"
difficulty: 5
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [System Design, Scenario, STAR]
updatedAt: 2026-07-31
---

# 大厂场景题、系统设计与项目复盘

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [前端系统设计题如何展开？](#frontend-system-design)
2. [线上白屏或卡顿如何排查？](#scenario-debugging)
3. [项目复盘怎样体现真实能力？](#project-review)
4. [大促峰值下前端系统如何设计？](#traffic-spike-design)

## 前端系统设计题如何展开？ {#frontend-system-design}

<InterviewMeta :difficulty="5" frequency="极高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先澄清用户、规模、核心旅程和质量属性，再设计数据流、边界、失败模式、可观测性与演进路线。

回答模板：

1. 明确范围与非目标，量化 DAU、并发、数据量和端能力。
2. 画出客户端、BFF、服务、缓存和第三方边界。
3. 解释渲染、状态、缓存、同步、离线和安全。
4. 给出性能预算、错误指标、灰度和回滚。
5. 指出最大风险、备选方案和下一阶段演进。

## 线上白屏或卡顿如何排查？ {#scenario-debugging}

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先止损与界定影响，再沿发布、网络、资源、运行时、渲染和数据链路建立证据，避免凭经验盲改。

白屏检查入口 HTML、静态资源状态/MIME/CSP、chunk 版本错配、初始化异常与路由兜底；卡顿检查输入延迟、长任务、强制布局、内存和第三方脚本。每次排查保留时间线、版本、样本和对照组。

## 项目复盘怎样体现真实能力？ {#project-review}

<InterviewMeta :difficulty="4" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

**一句话结论：** 用背景—目标—约束—行动—指标结果—反事实复盘讲清个人决策，不夸大团队成果。

STAR 之外必须准备追问：为什么选择此方案、替代方案、最难故障、如何测量、失败过什么、若规模扩大十倍怎么办。校招可用课程/开源项目，但同样需要真实数据和个人贡献边界。

::: tip 面试收尾
主动总结权衡：“在当前规模下选择 A，因为约束 X；当指标 Y 超过阈值时迁移到 B。”这比绝对化结论更接近高级工程判断。
:::

## 大促峰值下前端系统如何设计？ {#traffic-spike-design}

<InterviewMeta :difficulty="5" frequency="极高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 前端负责静态化、分级降级、请求整形、幂等交互和可观测反馈，但不能在客户端承诺库存一致性或排队公平。

设计要点：

- HTML/配置/静态资源多级缓存并版本化，核心首屏减少运行时依赖。
- 客户端合并请求、去重、指数退避加抖动，禁止失败后同步风暴。
- 下单按钮带幂等键与 pending 状态；库存和资格由服务端原子判断。
- 非核心推荐、动画、埋点和第三方脚本可远程降级；保留最小购买旅程。
- 监控可用性、接口错误、排队时长、INP、白屏、版本和区域，发布前做容量与故障演练。

**追问：** CDN 正常但页面仍白屏？检查配置接口、chunk 版本、CSP、Service Worker 和启动依赖；用静态兜底与错误边界提供可恢复入口。

## 权威来源 {#sources}

- [web.dev: Reliable](https://web.dev/reliable/)（核验：2026-07-31）
- [Google SRE Workbook](https://sre.google/workbook/table-of-contents/)（核验：2026-07-31）
- [W3C Web Performance](https://www.w3.org/webperf/)（核验：2026-07-31）
