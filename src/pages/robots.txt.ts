import type { APIRoute } from 'astro';
import { SITE_URL_FALLBACK, absoluteUrl, getSiteOrigin } from '../data/seo.mjs';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const siteUrl = getSiteOrigin(site ?? SITE_URL_FALLBACK);
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${absoluteUrl(siteUrl, '/sitemap.xml')}`,
    `Host: ${siteUrl.hostname}`
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
};
