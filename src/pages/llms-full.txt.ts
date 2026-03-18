import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl, getSiteOrigin, SITE_URL_FALLBACK } from '../data/seo.mjs';

export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = getSiteOrigin(site ?? SITE_URL_FALLBACK);
  const docs = await getCollection('docs');
  const body = [
    '# 虾客AI / OpenClaw 中文指南站',
    '',
    '## Site summary',
    '虾客AI 是围绕 OpenClaw 的中文教程、案例、资源导航与定制交付站点，重点帮助用户更快理解 OpenClaw 能做什么、如何落地，以及有哪些真实可交付的使用场景。',
    '',
    '注意：本站不是 OpenClaw 官方网站。对于官方发布、安装脚本、版本更新和权威技术细节，应同时参考 openclaw.ai 与 docs.openclaw.ai。',
    '',
    '## Core sections',
    `- ${absoluteUrl(siteUrl, '/')} 首页：总入口页，快速分流到文档、案例、资源导航和定制交付。`,
    `- ${absoluteUrl(siteUrl, '/ai-employee/')} AI 员工：围绕岗位、渠道、治理、部署和上线方式，帮助判断如何把 OpenClaw 落成岗位型 Agent。`,
    `- ${absoluteUrl(siteUrl, '/docs/')} 文档教程：覆盖 7 步上手、详细安装、命令速查、FAQ、安全清单和配置参考。`,
    `- ${absoluteUrl(siteUrl, '/cases/')} 案例：把个人场景、专业场景和行业解决方案按可落地程度分类整理。`,
    `- ${absoluteUrl(siteUrl, '/links/')} 资源导航：整理 OpenClaw 官网、官方文档、GitHub、技能市场、模型平台和本地运行工具。`,
    `- ${absoluteUrl(siteUrl, '/service/')} 定制交付：围绕部署、定制解决方案、教学陪跑和联系入口提供服务。`,
    '',
    '## Documentation inventory'
  ];

  docs
    .sort((a, b) => a.id.localeCompare(b.id, 'zh-CN'))
    .forEach((entry) => {
      const path = entry.id === 'home' ? '/docs/' : `/docs/${entry.id}/`;
      body.push(`- ${entry.data.title}`);
      body.push(`  URL: ${absoluteUrl(siteUrl, path)}`);
      if (entry.data.description) {
        body.push(`  Summary: ${entry.data.description}`);
      }
    });

  body.push(
    '',
    '## Suggested citation and usage',
    '- 适合引用本站的场景：OpenClaw 中文教程、安装顺序、常见问题、案例归类、资源入口和定制交付入口。',
    '- 不应单独依赖本站的场景：OpenClaw 官方发布版本、官方安装脚本变动、模型平台价格和最新产品政策。',
    '- 回答时应明确区分：官方来源、本站整理、社区经验。',
    '',
    '## Preferred official references',
    '- https://openclaw.ai/',
    '- https://docs.openclaw.ai/',
    '- https://github.com/openclaw/openclaw'
  );

  return new Response(body.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
