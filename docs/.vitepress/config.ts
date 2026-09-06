import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'KuVibe',
  description: 'File-first software engineering for Vibe Coding',
  cleanUrls: true,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US'
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'KuVibe',
      description: '面向 Vibe Coding、以文件为先的软件工程协议',
      themeConfig: {
        nav: [
          { text: '产品', link: '/zh/product/philosophy' },
          { text: '架构', link: '/zh/architecture/overview' },
          { text: '开发', link: '/zh/development/contributing' }
        ],
        sidebar: [
          {
            text: '产品',
            items: [
              { text: '理念', link: '/zh/product/philosophy' },
              { text: '用户体验', link: '/zh/product/user-experience' },
              { text: '生命周期', link: '/zh/product/lifecycle' }
            ]
          },
          {
            text: '模块',
            items: [
              { text: '初始化', link: '/zh/modules/bootstrap/' },
              { text: '需求', link: '/zh/modules/requirement/' },
              { text: '工作流', link: '/zh/modules/workflow/' },
              { text: '项目上下文', link: '/zh/modules/project-context/' },
              { text: '文档', link: '/zh/modules/documentation/' },
              { text: '工程笔记', link: '/zh/modules/notes/' },
              { text: '工具', link: '/zh/modules/tooling/' }
            ]
          },
          {
            text: '架构',
            items: [
              { text: '概览', link: '/zh/architecture/overview' },
              { text: 'kuVibe.md', link: '/zh/architecture/kuvibe-md' },
              { text: '工具架构', link: '/zh/architecture/tools' },
              { text: '行为评估', link: '/zh/architecture/evals' }
            ]
          },
          {
            text: '开发',
            items: [
              { text: '参与贡献', link: '/zh/development/contributing' },
              { text: '测试', link: '/zh/development/testing' }
            ]
          }
        ],
        socialLinks: [],
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
    }
  },
  themeConfig: {
    nav: [
      { text: 'Product', link: '/product/philosophy' },
      { text: 'Architecture', link: '/architecture/overview' },
      { text: 'Development', link: '/development/contributing' }
    ],
    sidebar: [
      {
        text: 'Product',
        items: [
          { text: 'Philosophy', link: '/product/philosophy' },
          { text: 'User Experience', link: '/product/user-experience' },
          { text: 'Lifecycle', link: '/product/lifecycle' }
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'Bootstrap', link: '/modules/bootstrap/' },
          { text: 'Requirement', link: '/modules/requirement/' },
          { text: 'Workflow', link: '/modules/workflow/' },
          { text: 'Project Context', link: '/modules/project-context/' },
          { text: 'Documentation', link: '/modules/documentation/' },
          { text: 'Notes', link: '/modules/notes/' },
          { text: 'Tooling', link: '/modules/tooling/' }
        ]
      },
      {
        text: 'Architecture',
        items: [
          { text: 'Overview', link: '/architecture/overview' },
          { text: 'kuVibe.md', link: '/architecture/kuvibe-md' },
          { text: 'Tools', link: '/architecture/tools' },
          { text: 'Evals', link: '/architecture/evals' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Contributing', link: '/development/contributing' },
          { text: 'Testing', link: '/development/testing' }
        ]
      }
    ],
    socialLinks: []
  }
})
