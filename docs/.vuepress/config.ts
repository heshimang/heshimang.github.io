import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'en-US',
  base: '/vuepressv2-blog/',
  title: '前端小贺的博客',
  description: '前端小贺，力争做一个传道受业解惑的智者，专注于前端，但不限于前端，前端，贺士忙',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo-small.png',
    navbar: [
      { text: '首页', link: '/'},
      { text: 'JavaScript', link: '/javascript/'},
      { text: 'Vue', link: '/vue/'},
      { text: '前端架构与工程', link: '/framework/'},
      { text: '生活所思', link: '/life/'},
      { text: 'GitHub', link: 'https://github.com/heshimang'}
    ]
  },
}) 