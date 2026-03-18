import { SITE_NAME } from './site.mjs';

export { SITE_NAME };

export const SITE_URL_FALLBACK = 'https://claw.duckai.cn';
export const SITE_LOCALE = 'zh_CN';
export const SITE_LANGUAGE = 'zh-CN';
export const DEFAULT_OG_IMAGE = '/og/openclaw-guide-share.svg';
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const DEFAULT_KEYWORDS = [
  'OpenClaw',
  'OpenClaw 中文教程',
  'OpenClaw 安装',
  'OpenClaw 案例',
  'OpenClaw 文档',
  'OpenClaw 资源导航',
  'OpenClaw 部署支持'
];

export const SITE_ENTITY_DESCRIPTION =
  '虾客AI是围绕 OpenClaw 的中文教程、案例、资源导航与安装支持站点，帮助个人和团队更快上手、排错和落地。';

/**
 * @param {URL | string | undefined} site
 */
export function getSiteOrigin(site) {
  if (site instanceof URL) return site;

  try {
    return new URL(site || SITE_URL_FALLBACK);
  } catch {
    return new URL(SITE_URL_FALLBACK);
  }
}

/**
 * @param {URL | string | undefined} site
 * @param {URL | string} [value]
 */
export function absoluteUrl(site, value = '/') {
  const siteUrl = getSiteOrigin(site);

  if (value instanceof URL) {
    return value.toString();
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return new URL(value, siteUrl).toString();
}

export function mergeKeywords(...groups) {
  const seen = new Set();
  const output = [];

  groups.flat().forEach((item) => {
    const value = typeof item === 'string' ? item.trim() : '';
    const key = value.toLowerCase();

    if (!value || seen.has(key)) return;

    seen.add(key);
    output.push(value);
  });

  return output;
}

/**
 * @param {URL | string | undefined} site
 */
export function organizationSchema(site) {
  const siteUrl = getSiteOrigin(site).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_ENTITY_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(site, '/favicon.svg')
    }
  };
}

/**
 * @param {URL | string | undefined} site
 */
export function websiteSchema(site) {
  const siteUrl = getSiteOrigin(site).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: SITE_NAME,
    inLanguage: SITE_LANGUAGE,
    description: SITE_ENTITY_DESCRIPTION,
    publisher: {
      '@id': `${siteUrl}#organization`
    }
  };
}

/**
 * @param {URL | string | undefined} site
 * @param {{ name: string; path: string }[]} items
 */
export function breadcrumbSchema(site, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(site, item.path)
    }))
  };
}

/**
 * @param {{
 *   site: URL | string | undefined;
 *   path: string;
 *   name: string;
 *   description: string;
 *   keywords?: string[];
 *   about?: string[];
 * }} params
 */
export function collectionPageSchema({
  site,
  path,
  name,
  description,
  keywords = /** @type {string[]} */ ([]),
  about = /** @type {string[]} */ ([])
}) {
  const url = absoluteUrl(site, path);
  const siteUrl = getSiteOrigin(site).toString();

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SITE_LANGUAGE,
    isPartOf: {
      '@id': `${siteUrl}#website`
    },
    publisher: {
      '@id': `${siteUrl}#organization`
    },
    keywords,
    about: about.map((item) => ({
      '@type': 'Thing',
      name: item
    }))
  };
}

/**
 * @param {{
 *   site: URL | string | undefined;
 *   path: string;
 *   headline: string;
 *   description: string;
 *   keywords?: string[];
 *   section?: string;
 *   type?: string;
 * }} params
 */
export function articleSchema({
  site,
  path,
  headline,
  description,
  keywords = /** @type {string[]} */ ([]),
  section,
  type = 'TechArticle'
}) {
  const url = absoluteUrl(site, path);
  const siteUrl = getSiteOrigin(site).toString();

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    headline,
    description,
    inLanguage: SITE_LANGUAGE,
    articleSection: section,
    keywords,
    publisher: {
      '@id': `${siteUrl}#organization`
    },
    isPartOf: {
      '@id': `${siteUrl}#website`
    }
  };
}

/**
 * @param {{
 *   site: URL | string | undefined;
 *   path: string;
 *   name: string;
 *   items: { name: string; path: string }[];
 * }} params
 */
export function itemListSchema({ site, path, name, items }) {
  const url = absoluteUrl(site, path);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#list`,
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(site, item.path)
    }))
  };
}

/**
 * @param {{
 *   site: URL | string | undefined;
 *   path: string;
 *   name: string;
 *   description: string;
 *   items: { question: string; answer: string }[];
 * }} params
 */
export function faqSchema({ site, path, name, description, items }) {
  const url = absoluteUrl(site, path);

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    name,
    description,
    inLanguage: SITE_LANGUAGE,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

/**
 * @param {{
 *   site: URL | string | undefined;
 *   path: string;
 *   name: string;
 *   description: string;
 *   steps: { name: string; path: string }[];
 * }} params
 */
export function howToSchema({ site, path, name, description, steps }) {
  const url = absoluteUrl(site, path);

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${url}#howto`,
    name,
    description,
    inLanguage: SITE_LANGUAGE,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      url: absoluteUrl(site, step.path)
    }))
  };
}
