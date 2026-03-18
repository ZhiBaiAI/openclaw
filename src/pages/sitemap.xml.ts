import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl, getSiteOrigin, SITE_URL_FALLBACK } from '../data/seo.mjs';

export const prerender = true;

const STATIC_PATHS = ['/', '/docs/', '/ai-employee/', '/cases/', '/links/', '/service/'];

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = getSiteOrigin(site ?? SITE_URL_FALLBACK);
  const docs = await getCollection('docs');
  const docPaths = docs.map((entry) => (entry.id === 'home' ? '/docs/' : `/docs/${entry.id}/`));
  const urls = [...new Set([...STATIC_PATHS, ...docPaths])];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((path) => `  <url><loc>${absoluteUrl(siteUrl, path)}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
