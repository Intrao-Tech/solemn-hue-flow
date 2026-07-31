/**
 * Bodies for robots.txt, sitemap.xml and llms.txt.
 *
 * All three are generated from `SERVICES`, so adding a service to
 * `services-data.ts` publishes it to search engines and AI crawlers with no
 * second edit — the usual reason a sitemap goes stale.
 *
 * Kept separate from the routes that serve them so the output can be asserted
 * in isolation.
 */

import { SERVICES } from "./services-data";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "./site";

/** Every indexable URL on the site, in crawl-priority order. */
export function siteUrls(): { path: string; changefreq: string; priority: string }[] {
  return [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/poslugy", changefreq: "weekly", priority: "0.9" },
    ...SERVICES.map((service) => ({
      path: `/poslugy/${service.slug}`,
      changefreq: "monthly",
      priority: "0.8",
    })),
    { path: "/pro-nas", changefreq: "monthly", priority: "0.5" },
  ];
}

const xmlEscape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * `lastmod` is the deploy date rather than a per-page timestamp: the content is
 * hard-coded in the bundle, so the build is the only thing that can change it.
 * A fabricated per-URL date would be worse than none — Google discounts
 * sitemaps whose lastmod values it finds untrustworthy.
 */
export function sitemapXml(lastmod = new Date().toISOString().slice(0, 10)): string {
  const entries = siteUrls()
    .map(({ path, changefreq, priority }) =>
      [
        "  <url>",
        `    <loc>${xmlEscape(absoluteUrl(path))}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n"),
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

/**
 * `/api/` is the only path worth disallowing — it is a POST-only relay with no
 * content. Nothing else is blocked: JS and CSS must stay crawlable or Google
 * renders the page wrong, and there are no filter/search/sort URLs to trap.
 */
export function robotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}

/**
 * llms.txt — the emerging convention for giving AI assistants a Markdown map of
 * a site. Directly addresses the audit's "AI visibility" section; costs nothing
 * to serve and is ignored by clients that do not know it.
 */
export function llmsTxt(): string {
  const services = SERVICES.map(
    (service) =>
      `- [${service.title}](${absoluteUrl(`/poslugy/${service.slug}`)}): ${service.metaDescription}`,
  ).join("\n");

  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Похоронна служба у Києві, вул. Стеценка, 18 (Берківецьке кладовище). Приймаємо
дзвінки цілодобово, без вихідних: +38 (044) 209 11 75, +38 (067) 272 33 77.
Виїзд агента безкоштовний, у межах Києва — протягом 30 хвилин.

## Послуги

${services}

## Сторінки

- [Головна](${SITE_URL}): огляд усіх напрямків роботи та контакти.
- [Усі послуги](${absoluteUrl("/poslugy")}): каталог із десяти напрямків.
- [Про нас](${absoluteUrl("/pro-nas")}): досвід, цифри, зона роботи.
`;
}
