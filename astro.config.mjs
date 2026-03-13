import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';

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

export default defineConfig({
  site,
  base
});
