import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'KuVibe',
  description: 'File-first software engineering for Vibe Coding',
  cleanUrls: true,
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
