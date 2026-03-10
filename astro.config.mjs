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
      description: '面向 OpenClaw 安装、使用教学与本地服务说明的教程网站。',
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
            { label: '从这里开始', link: `${base}/docs/` },
            { label: '7 天上手总览', link: `${base}/docs/guide/` }
          ]
        },
        {
          label: '7 天上手',
          items: [
            { label: '第 1 天：先明白 OpenClaw 能帮你做什么', link: `${base}/docs/guide/day-1-what-openclaw-can-do/` },
            { label: '第 2 天：把助手装起来并连上聊天工具', link: `${base}/docs/guide/day-2-install-and-connect/` },
            { label: '第 3 天：让它更像“你的助手”', link: `${base}/docs/guide/day-3-make-it-yours/` },
            { label: '第 4 天：接入邮箱、日历、搜索和浏览器', link: `${base}/docs/guide/day-4-connect-tools/` },
            { label: '第 5 天：用技能包继续扩展能力', link: `${base}/docs/guide/day-5-add-skills/` },
            { label: '第 6 天：让它开始主动工作', link: `${base}/docs/guide/day-6-make-it-proactive/` },
            { label: '第 7 天：进阶、安全和后续路线', link: `${base}/docs/guide/day-7-next-steps/` }
          ]
        },
        {
          label: '参考资料',
          items: [
            { label: '常用命令速查', link: `${base}/docs/reference/common-commands/` },
            { label: '安全清单', link: `${base}/docs/reference/safety-checklist/` },
            { label: '常见问题', link: `${base}/docs/faq/common-issues/` }
          ]
        }
      ]
    })
  ]
});
