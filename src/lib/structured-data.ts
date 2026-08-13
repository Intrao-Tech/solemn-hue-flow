/**
 * JSON-LD builders for the site's structured-data graph.
 *
 * Every schema is derived from data that already exists in the app (SERVICES,
 * CONTACTS), so the markup cannot drift from the visible page — the thing that
 * gets sites penalised for structured data is claiming something the page does
 * not show.
 *
 * Deliberately NOT emitted, despite being asked for in the SEO audit:
 *   - SearchAction  — the site has no internal search, so the action would 404.
 *   - Review / AggregateRating — no reviews are collected or displayed here.
 *   - Offer / price — no prices are published on the site.
 * All three are "self-serving / unverifiable content" under Google's structured
 * data policies and risk a manual action. Add them once the site actually has
 * a search endpoint, published reviews, or published prices.
 */

import { CONTACTS, SITE_DESCRIPTION, SITE_LANG, SITE_NAME, SITE_URL, absoluteUrl } from "./site";
import type { ServiceConfig } from "./services-data";

/** Stable node ids so the separate scripts resolve into one connected graph. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const ORG_REF = { "@id": ORGANIZATION_ID };

/**
 * `FuneralHome` is a schema.org subtype of LocalBusiness — more specific than a
 * bare Organization and the correct type for this business.
 *
 * `geo` and `priceRange` are intentionally absent: neither is verified, and a
 * wrong coordinate pair is worse for local ranking than none at all. Add them
 * once they match the Google Business Profile exactly.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: absoluteUrl("/og-image.jpg"),
    telephone: CONTACTS.phone,
    email: CONTACTS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACTS.streetAddress,
      addressLocality: CONTACTS.addressLocality,
      addressRegion: CONTACTS.addressRegion,
      postalCode: CONTACTS.postalCode,
      addressCountry: CONTACTS.addressCountry,
    },
    areaServed: [
      { "@type": "City", name: "Київ" },
      { "@type": "AdministrativeArea", name: "Київська область" },
      { "@type": "Country", name: "Україна" },
    ],
    // The business answers the phone at any hour; this is the schema.org way of
    // saying 24/7 and is what surfaces "Open 24 hours" in local results.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANG,
    publisher: ORG_REF,
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function serviceSchema(service: ServiceConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/poslugy/${service.slug}`)}#service`,
    name: service.title,
    description: service.metaDescription ?? service.intro,
    serviceType: service.shortTitle,
    url: absoluteUrl(`/poslugy/${service.slug}`),
    image: absoluteUrl(service.heroImage),
    provider: ORG_REF,
    areaServed: [
      { "@type": "City", name: "Київ" },
      { "@type": "AdministrativeArea", name: "Київська область" },
    ],
  };
}

/**
 * FAQPage for the accordion at the bottom of every service page.
 *
 * Google narrowed FAQ *rich results* to authoritative health/government sites
 * in 2023, so this will rarely change the SERP snippet — it is emitted because
 * it is still how AI answer engines (AI Overview, ChatGPT, Perplexity) read a
 * page's questions, which is the channel the audit is actually asking about.
 *
 * Requires the answers to be present in the rendered DOM — see the CSS-collapsed
 * accordion in `ServicePage.tsx`, which is why they are no longer unmounted.
 */
export function faqSchema(items: { q: string; a: string }[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(pagePath)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceListSchema(services: ServiceConfig[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/poslugy")}#collection`,
    url: absoluteUrl("/poslugy"),
    name: `Послуги — ${SITE_NAME}`,
    inLanguage: SITE_LANG,
    isPartOf: { "@id": WEBSITE_ID },
    about: ORG_REF,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: absoluteUrl(`/poslugy/${service.slug}`),
      })),
    },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl("/pro-nas")}#about`,
    url: absoluteUrl("/pro-nas"),
    name: `Про нас — ${SITE_NAME}`,
    inLanguage: SITE_LANG,
    isPartOf: { "@id": WEBSITE_ID },
    about: ORG_REF,
  };
}
