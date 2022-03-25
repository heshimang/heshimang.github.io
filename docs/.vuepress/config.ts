import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  // 站点配置
  lang: 'en-US',
  base: '/',
  title: '前端小贺的博客',
  description: '前端小贺，力争做一个传道受业解惑的智者，专注于前端，但不限于前端，前端，贺士忙',
  head: [['link', { rel: 'icon', href: '/images/logo-dart-default.png' }]],

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo.png',
    logoDark: '/images/logo-dart-default.png',
    navbar: [
      { text: '首页', link: '/' },
      {
        text: '前端基本素养', link: '/frontbasic/', activeMatch: '^/frontbasic/', children: [
          {
            text: 'HTML',
            link: '/frontbasic/html/',
          },
          {
            text: 'CSS',
            link: '/frontbasic/css/',
          },
          {
            text: 'JavaScript',
            link: '/frontbasic/javascript/',
          },
        ]
      },
      {
        text: '前端进阶', link: '/frontadvanced/', children: [
          {
            text: 'Vue',
            link: '/frontadvanced/vue/',
          },
          {
            text: 'Debug',
            link: '/frontadvanced/debug/',
          },
          {
            text: '前端架构思索',
            link: '/frontadvanced/framework/',
          },
        ]
      },
      { text: '生活所思', link: '/life/' },
      { text: '日记', link: '/diary/' },
      { text: 'GitHub', link: 'https://github.com/heshimang' }
    ],
    sidebar: {
      '/frontbasic/html/': [
        {
          text: 'HTML'
        },
      ],
      '/frontbasic/css/': [
        {
          text: 'CSS'
        },
      ],
      '/frontbasic/javascript/': [
        {
          text: 'Function',
          children: [
            '/frontbasic/javascript/2022-03-23.md'
          ]
        },
      ],
      '/frontadvanced/debug/': [
        {
          text: 'Npm',
          children: [
            '/frontadvanced/debug/npmerror.md',
            '/frontadvanced/debug/uninstallvuecli.md'
          ]
        },
      ],
      '/frontadvanced/framework/': [
        {
          text: '代码规范',
          children: [
            '/frontadvanced/framework/editorconfig.md'
          ]
        },
      ],
      
    },
  },
  plugins: [
    [
      '@vuepress/docsearch', {
        apiKey: '1',
        indexName: '',
        locales: {
          '/': {
            placeholder: 'Search Documentation',
            translations: {
              button: {
                buttonText: 'Search Documentation',
              },
            },
          },
          '/zh/': {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
              },
            },
          },
        },
      }
    ]
  ]
}) 