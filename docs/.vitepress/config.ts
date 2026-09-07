import { defineConfig } from 'vitepress'

const chineseThemeConfig = {
  nav: [
    { text: '快速开始', link: '/getting-started' },
    { text: '产品', link: '/product/philosophy' },
    { text: '架构', link: '/architecture/overview' },
    { text: '开发', link: '/development/contributing' }
  ],
  sidebar: [
    {
      text: '入门',
      items: [{ text: '快速开始', link: '/getting-started' }]
    },
    {
      text: '产品',
      items: [
        { text: '理念', link: '/product/philosophy' },
        { text: '用户体验', link: '/product/user-experience' },
        { text: '生命周期', link: '/product/lifecycle' },
        { text: '版本与升级', link: '/product/versioning' }
      ]
    },
    {
      text: '模块',
      items: [
        { text: '初始化', link: '/modules/bootstrap/' },
        { text: '需求', link: '/modules/requirement/' },
        { text: '工作流', link: '/modules/workflow/' },
        { text: '项目上下文', link: '/modules/project-context/' },
        { text: '文档', link: '/modules/documentation/' },
        { text: '工程笔记', link: '/modules/notes/' },
        { text: '工具', link: '/modules/tooling/' }
      ]
    },
    {
      text: '架构',
      items: [
        { text: '概览', link: '/architecture/overview' },
        { text: 'kuVibe.md', link: '/architecture/kuvibe-md' },
        { text: '工具架构', link: '/architecture/tools' },
        { text: '行为评估', link: '/architecture/evals' }
      ]
    },
    {
      text: '开发',
      items: [
        { text: '参与贡献', link: '/development/contributing' },
        { text: '测试', link: '/development/testing' }
      ]
    }
  ],
  socialLinks: [
    { icon: 'github', link: 'https://github.com/kumvjs/KuVibe' }
  ],
  outline: { label: '本页目录' },
  docFooter: {
    prev: '上一页',
    next: '下一页'
  },
  darkModeSwitchLabel: '外观',
  lightModeSwitchTitle: '切换到浅色主题',
  darkModeSwitchTitle: '切换到深色主题',
  sidebarMenuLabel: '菜单',
  returnToTopLabel: '返回顶部',
  langMenuLabel: '切换语言',
  skipToContentLabel: '跳转到内容',
  notFound: {
    title: '页面未找到',
    quote: '请检查访问地址，或从首页继续浏览。',
    linkLabel: '返回首页',
    linkText: '返回首页'
  }
}

const englishThemeConfig = {
  nav: [
    { text: 'Quick Start', link: '/en/getting-started' },
    { text: 'Product', link: '/en/product/philosophy' },
    { text: 'Architecture', link: '/en/architecture/overview' },
    { text: 'Development', link: '/en/development/contributing' }
  ],
  sidebar: [
    {
      text: 'Get Started',
      items: [{ text: 'Quick Start', link: '/en/getting-started' }]
    },
    {
      text: 'Product',
      items: [
        { text: 'Philosophy', link: '/en/product/philosophy' },
        { text: 'User Experience', link: '/en/product/user-experience' },
        { text: 'Lifecycle', link: '/en/product/lifecycle' },
        { text: 'Versions and upgrades', link: '/en/product/versioning' }
      ]
    },
    {
      text: 'Modules',
      items: [
        { text: 'Bootstrap', link: '/en/modules/bootstrap/' },
        { text: 'Requirement', link: '/en/modules/requirement/' },
        { text: 'Workflow', link: '/en/modules/workflow/' },
        { text: 'Project Context', link: '/en/modules/project-context/' },
        { text: 'Documentation', link: '/en/modules/documentation/' },
        { text: 'Notes', link: '/en/modules/notes/' },
        { text: 'Tooling', link: '/en/modules/tooling/' }
      ]
    },
    {
      text: 'Architecture',
      items: [
        { text: 'Overview', link: '/en/architecture/overview' },
        { text: 'kuVibe.md', link: '/en/architecture/kuvibe-md' },
        { text: 'Tools', link: '/en/architecture/tools' },
        { text: 'Evals', link: '/en/architecture/evals' }
      ]
    },
    {
      text: 'Development',
      items: [
        { text: 'Contributing', link: '/en/development/contributing' },
        { text: 'Testing', link: '/en/development/testing' }
      ]
    }
  ],
  socialLinks: [
    { icon: 'github', link: 'https://github.com/kumvjs/KuVibe' }
  ]
}

export default defineConfig({
  title: 'KuVibe',
  description: '面向 Vibe Coding、以文件为先的软件工程协议',
  cleanUrls: true,
  rewrites: (id) => (id.startsWith('zh/') ? id.slice(3) : `en/${id}`),
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'KuVibe',
      description: 'File-first software engineering for Vibe Coding',
      themeConfig: englishThemeConfig
    }
  },
  themeConfig: chineseThemeConfig
})
