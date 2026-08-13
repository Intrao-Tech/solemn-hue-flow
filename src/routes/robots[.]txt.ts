/**
 * GET /robots.txt — served from a route rather than `public/` so it is
 * generated from the same data as the sitemap it points at.
 */

import { createFileRoute } from "@tanstack/react-router";

import { robotsTxt } from "@/lib/crawl-files";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(robotsTxt(), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
