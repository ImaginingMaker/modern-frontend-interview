import { expect, test } from '@playwright/test'

test('首页入口、章节与稳定锚点可用', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: '面向 2026 的现代前端面试讲义' })).toBeVisible()
  await page.getByRole('link', { name: '从 JavaScript 开始' }).click()
  await expect(page).toHaveURL(/\/guide\/03-javascript-core/)
  await expect(page.getByRole('heading', { name: 'JavaScript 核心与事件循环', level: 1 })).toBeVisible()

  await page.goto('/guide/12-performance#core-web-vitals')
  await expect(page.getByRole('heading', { name: /LCP、INP、CLS 分别衡量什么/ })).toBeVisible()
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#core-web-vitals')
})

test('本地搜索可查找跨章关键词', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '搜索讲义' }).click()
  const input = page.locator('.DocSearch-Input, input[type="search"]').first()
  await input.fill('Trusted Types')
  await expect(page.getByText(/Trusted Types/).first()).toBeVisible()
})

test('现代技术增量可搜索并可通过锚点访问', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '搜索讲义' }).click()
  const input = page.locator('.DocSearch-Input, input[type="search"]').first()
  await input.fill('TypeScript 7')
  await expect(page.getByText(/TypeScript 7 原生编译器/).first()).toBeVisible()
  await page.keyboard.press('Escape')

  await page.goto('/guide/09-vue#vapor-mode')
  const vaporHeading = page.getByRole('heading', { name: /Vue 3.6 Vapor Mode 现在能否用于生产/ })
  await expect(vaporHeading).toBeVisible()
  await expect(page.locator('strong').filter({ hasText: '一句话结论：' }).last()).toBeVisible()
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#vapor-mode')
  await expect.poll(() => vaporHeading.evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThan(60)
})

test('Chrome 与监控专项增强可检索且锚点无遮挡', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '搜索讲义' }).click()
  const input = page.locator('.DocSearch-Input, input[type="search"]').first()
  await input.fill('Performance trace')
  await expect(page.getByText(/Chrome Performance/).first()).toBeVisible()
  await page.keyboard.press('Escape')

  await page.goto('/guide/12-performance#monitoring-sdk')
  const heading = page.getByRole('heading', { name: /前端监控 SDK 与数据管线如何设计/ })
  await expect(heading).toBeVisible()
  await expect.poll(() => heading.evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThan(60)
  await expect(page.getByText(/SLO burn rate/)).toBeVisible()
})

test('主题切换持久化', async ({ page, isMobile }) => {
  test.skip(isMobile, '移动端主题入口位于折叠菜单；桌面测试覆盖持久化语义')
  await page.goto('/')
  const switcher = page.locator('.VPSwitchAppearance:visible').first()
  await switcher.click()
  const isDark = await page.locator('html').evaluate((element) => element.classList.contains('dark'))
  await page.reload()
  await expect.poll(() => page.locator('html').evaluate((element) => element.classList.contains('dark'))).toBe(isDark)
})

test('移动端导航无横向溢出', async ({ page, isMobile }) => {
  test.skip(!isMobile, '仅移动端项目')
  await page.goto('/guide/08-react')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(1)
  await page.getByRole('button', { name: '章节目录' }).click()
  await expect(page.getByText('现代前端面试体系')).toBeVisible()
})
