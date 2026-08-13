/**
 * Single source of truth for the site's identity: the canonical origin, the
 * NAP (name / address / phone) block, and the helpers that build absolute URLs.
 *
 * Everything that has to agree across the site reads from here — canonical
 * links, hreflang, sitemap.xml, robots.txt, llms.txt and the JSON-LD graph in
 * `structured-data.ts`. NAP consistency is what lets Google tie the site to the
 * Google Business Profile, so these strings must match the profile exactly.
 */

export const SITE_URL = "https://ritual-berkivtsi.com.ua";

export const SITE_NAME = "Ритуал 24 Берківці";

export const SITE_TAGLINE = "Похоронна служба у Києві";

export const SITE_DESCRIPTION =
  "Цілодобова похоронна служба у Києві. Організація поховань, кремація, репатріація, ритуальний транспорт, догляд за могилами. Виїзд агента за 30 хвилин, без вихідних.";

/** Language of the only content version. `uk` is the language subtag for
 *  Ukrainian — `ua` is the *country* code and is invalid in `lang`/`hreflang`. */
export const SITE_LANG = "uk";

export const SITE_LOCALE = "uk_UA";

export const CONTACTS = {
  phonePrimary: "+380442091175",
  phoneSecondary: "+380672723377",
  email: "ritualberkovtsy@gmail.com",
  streetAddress: "вул. Стеценка, 18",
  addressLocality: "Київ",
  addressRegion: "Київська область",
  postalCode: "04136",
  addressCountry: "UA",
} as const;

/**
 * Absolute URL for a site-root-relative path, in the exact shape `server.ts`
 * redirects to: lowercase, no trailing slash. The home page is the one
 * exception — a bare origin is written `https://host/` by convention, and the
 * URL spec treats the two as the same resource either way.
 */
export function absoluteUrl(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed === "" ? `${SITE_URL}/` : `${SITE_URL}/${trimmed}`;
}

/**
 * Head entries every page needs: a self-referencing canonical plus hreflang.
 *
 * The site is monolingual, so the hreflang pair is self-referencing — it states
 * "this URL is the Ukrainian version and also the fallback" rather than mapping
 * between translations. It is valid as-is and means a future ru/en version only
 * has to add its own entry instead of introducing the annotation from scratch.
 */
export function canonicalHead(path: string) {
  const href = absoluteUrl(path);
  return {
    links: [
      { rel: "canonical", href },
      { rel: "alternate", hrefLang: SITE_LANG, href },
      { rel: "alternate", hrefLang: "x-default", href },
    ],
    meta: [{ property: "og:url", content: href }],
  };
}
