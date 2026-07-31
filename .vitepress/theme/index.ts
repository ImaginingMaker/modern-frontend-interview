import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import InterviewMeta from './InterviewMeta.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('InterviewMeta', InterviewMeta)
  }
} satisfies Theme
