/**
 * GET /sitemap.xml — every indexable URL, generated from SERVICES.
 *
 * The site had no sitemap at all, which is the direct cause of the audit's
 * "2 of 13 pages indexed". Submit this URL in Google Search Console once
 * deployed.
 */

import { createFileRoute } from "@tanstack/react-router";

import { sitemapXml } from "@/lib/crawl-files";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemapXml(), {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
