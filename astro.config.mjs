import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? '';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = repo.endsWith('.github.io');
const site =
  process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://example.com');
const base = isGithubActions && repo && !isUserSite ? `/${repo}` : '/';
const pagefind = isGithubActions || process.platform !== 'win32';

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'OpenClaw 安装与使用教程',
      description: '面向普通用户的 OpenClaw 安装、使用与本地服务说明网站。',
      pagefind,
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/ZhiBaiAI/openclaw'
        }
      ],
      editLink: {
        baseUrl: 'https://github.com/ZhiBaiAI/openclaw/edit/main/'
      },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: '开始阅读',
          items: [
            { label: '从这里开始', link: '/docs/' },
            { label: '7 步总览', link: '/docs/guide/' }
          ]
        },
        {
          label: '7 步上手',
          items: [
            { label: '第 1 步：先明白 OpenClaw 能帮你做什么', link: '/docs/guide/step-1-what-openclaw-can-do/' },
            { label: '第 2 步：把助手装起来并连上聊天工具', link: '/docs/guide/step-2-install-and-connect/' },
            { label: '第 3 步：让它更像“你的助手”', link: '/docs/guide/step-3-make-it-yours/' },
            { label: '第 4 步：接入邮箱、日历、搜索和浏览器', link: '/docs/guide/step-4-connect-tools/' },
            { label: '第 5 步：用技能包继续扩展能力', link: '/docs/guide/step-5-add-skills/' },
            { label: '第 6 步：让它开始主动工作', link: '/docs/guide/step-6-make-it-proactive/' },
            { label: '第 7 步：进阶、安全和后续路线', link: '/docs/guide/step-7-next-steps/' }
          ]
        },
        {
          label: '参考资料',
          items: [
            { label: '常用命令速查', link: '/docs/reference/common-commands/' },
            { label: '安全清单', link: '/docs/reference/safety-checklist/' },
            { label: '常见问题', link: '/docs/faq/common-issues/' }
          ]
        }
      ]
    })
  ]
});
