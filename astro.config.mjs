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
          label: '教程文档',
          autogenerate: { directory: 'docs' }
        }
      ]
    })
  ]
});
