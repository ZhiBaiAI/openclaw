import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? '';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = repo.endsWith('.github.io');
const cnamePath = './public/CNAME';
const customDomain = existsSync(cnamePath) ? readFileSync(cnamePath, 'utf8').trim() : '';
const site =
  process.env.SITE_URL ||
  (customDomain ? `https://${customDomain}` : owner ? `https://${owner}.github.io` : 'https://example.com');
const siteHost = (() => {
  try {
    return new URL(site).hostname;
  } catch {
    return '';
  }
})();
const isCustomDomain = Boolean(siteHost) && !siteHost.endsWith('.github.io') && siteHost !== 'example.com';
const base = isGithubActions && repo && !isUserSite && !isCustomDomain ? `/${repo}` : '/';
const pagefind = isGithubActions || process.platform !== 'win32';

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'OpenClaw 交付与使用中心',
      description: '面向已交付客户和潜在客户的 OpenClaw 文档、案例、资源与支持中心。',
      pagefind,
      editLink: {
        baseUrl: 'https://github.com/ZhiBaiAI/openclaw/edit/main/'
      },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: '交付后开始',
          items: [
            { label: '交付后从这里开始', link: '/docs/' },
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
          label: '支持资料',
          items: [
            { label: 'OpenClaw 安装详细教程', link: '/docs/reference/openclaw-install-detailed/' },
            { label: 'SOUL USER AGENTS 三件套实战教程', link: '/docs/reference/soul-user-agents-workshop/' },
            { label: '飞书多机器人虚拟团队教程', link: '/docs/reference/feishu-multi-bot-virtual-team/' },
            { label: 'macOS 国内手动安装 Homebrew', link: '/docs/reference/homebrew-manual-install-macos-cn/' },
            { label: '百炼平台模型配置示例', link: '/docs/reference/bailian-model-config-example/' },
            { label: '企业微信支持配置', link: '/docs/reference/wecom-support-setup/' },
            { label: '常用命令速查', link: '/docs/reference/common-commands/' },
            { label: '安全清单', link: '/docs/reference/safety-checklist/' },
            { label: '常见问题', link: '/docs/faq/common-issues/' }
          ]
        }
      ]
    })
  ]
});
