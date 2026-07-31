---
title: Web、安全供应链、权限与隐私
description: XSS、CSP、CSRF、鉴权、供应链和隐私工程
chapter: "13"
difficulty: 5
frequency: 极高
levels: [校招, 初级, 中级, 高级]
tags: [XSS, CSRF, CSP]
updatedAt: 2026-07-31
---

# Web、安全供应链、权限与隐私

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级 / 高级" verified="2026-07-31" />

## 题目索引 {#questions}

1. [XSS、CSP 与 Trusted Types 如何协作？](#xss-csp)
2. [CSRF 与鉴权如何设计？](#csrf-auth)
3. [前端供应链和隐私风险如何治理？](#supply-chain)
4. [前端安全事件如何响应？](#security-incident)

## XSS、CSP 与 Trusted Types 如何协作？ {#xss-csp}

<InterviewMeta :difficulty="5" frequency="极高" levels="校招 / 初级 / 中级" verified="2026-07-31" />

**一句话结论：** 按输出上下文编码是首要防线，框架默认转义不能覆盖危险 HTML/URL 注入；CSP 和 Trusted Types 是纵深防御。

不要拼接用户输入到 `innerHTML`。确需富文本时使用成熟 sanitizer、限制协议与元素，并在服务端再次校验。严格 CSP 采用 nonce/hash，避免 `unsafe-inline`；先 Report-Only 收集违规再收紧。

## CSRF 与鉴权如何设计？ {#csrf-auth}

<InterviewMeta :difficulty="4" frequency="极高" levels="初级 / 中级" verified="2026-07-31" />

**一句话结论：** CSRF 利用浏览器自动携带凭证，防护用 SameSite、CSRF token 和 Origin 校验组合；XSS 可绕过很多前端侧防线。

Cookie 设置 `Secure`、`HttpOnly`、适当 `SameSite` 和最小 Domain/Path。前端路由守卫改善体验但不是授权边界，服务端必须对每个资源校验主体和权限。

## 前端供应链和隐私风险如何治理？ {#supply-chain}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 锁定依赖只是起点，还需最小化安装脚本、审查来源与维护状态、生成 SBOM、扫描产物并保护发布身份。

第三方脚本拥有页面同等权限，应隔离、延迟、限制数据并准备熔断。采集遵循数据最小化，日志禁止 token、密码和完整个人信息。

## 前端安全事件如何响应？ {#security-incident}

<InterviewMeta :difficulty="5" frequency="高" levels="中级 / 高级" verified="2026-07-31" />

**一句话结论：** 先止血、保护证据和界定影响，再补丁、轮换凭证、清除恶意资产并验证恢复；事后把根因转化为门禁和可观测性。

XSS 事件应下线入口/启用 kill switch、收紧 CSP、吊销会话、保全版本与请求证据；供应链事件需锁定包/构建/发布身份、生成受影响产物清单并重新可信构建。

**大厂追问：** 为什么不能只发新版本？CDN、Service Worker 和用户长会话仍可能运行旧资产；必须处理缓存、旧 chunk、密钥和已窃取会话。

## 权威来源 {#sources}

- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)（核验：2026-07-31）
- [MDN: Content Security Policy](https://developer.mozilla.org/docs/Web/HTTP/CSP)（核验：2026-07-31）
- [W3C Trusted Types](https://w3c.github.io/trusted-types/dist/spec/)（核验：2026-07-31）
