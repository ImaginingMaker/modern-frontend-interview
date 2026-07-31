---
title: 构建、Monorepo、CI/CD 与质量工程
description: 构建工具、包管理、Monorepo、持续集成与发布治理
chapter: "11"
difficulty: 5
frequency: 极高
levels: [初级, 中级, 高级]
tags: [Vite, Monorepo, CI/CD]
updatedAt: 2026-07-31
---

# 构建、Monorepo、CI/CD 与质量工程

<InterviewMeta :difficulty="5" frequency="极高" levels="初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [现代构建工具做了什么？](#build-tools)
2. [Monorepo 解决什么问题？](#monorepo)
3. [如何设计 CI/CD 质量门禁？](#delivery)
4. [Monorepo 构建突然变慢如何定位？](#build-regression)

## 现代构建工具做了什么？ {#build-tools}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** 开发期优化启动与增量更新，生产期构建依赖图并完成转译、分块、压缩和资产处理；二者的性能目标不同。

Tree shaking 依赖静态 ESM 和副作用信息；code splitting 按路由/交互边界切分，不能只追求小 chunk。Source map 需在可调试性与源码泄露间权衡。

## Monorepo 解决什么问题？ {#monorepo}

<InterviewMeta :difficulty="4" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** Monorepo 统一依赖、工具和原子变更，但需要明确包边界、任务图、缓存键、发布策略与所有权。

workspace 负责链接包，任务编排器负责拓扑执行与缓存。缓存键至少包含源码、锁文件、环境与命令配置；错误缓存比没有缓存更危险。

## 如何设计 CI/CD 质量门禁？ {#delivery}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 流水线应快速失败、产物一次构建多环境晋级、部署可观测且可回滚，门禁覆盖类型、测试、安全、体积和变更风险。

典型顺序：安装锁定依赖 → 静态检查 → 单元/内容测试 → 构建 → E2E → 安全与体积扫描 → 签名产物 → 灰度发布 → 指标验证。秘密使用短期身份凭证，不写入前端包或日志。

## Monorepo 构建突然变慢如何定位？ {#build-regression}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 把总耗时拆为安装、任务调度、类型检查、转换、打包和上传，再比较任务图、缓存命中和关键路径，不能只升级机器。

记录 cold/warm、P50/P95、缓存读写字节、受影响包数和最大 RSS。常见根因：锁文件导致全局缓存失效、环境变量进入 cache key、barrel file 扩大模块图、插件串行、source map、项目引用错误和远程缓存延迟。

**大厂追问：** 如何证明优化有效？在固定 runner 和同一提交上做多次对照，报告关键路径而非所有任务耗时相加，并验证产物一致性。

## 权威来源 {#sources}

- [Vite Guide](https://vite.dev/guide/)（核验：2026-07-31）
- [npm Workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)（核验：2026-07-31）
- [GitHub Actions Documentation](https://docs.github.com/actions)（核验：2026-07-31）
- [Vite Performance](https://vite.dev/guide/performance)（核验：2026-07-31）
