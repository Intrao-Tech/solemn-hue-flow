/**
 * GET /llms.txt — a Markdown map of the site for AI assistants (ChatGPT,
 * Claude, Perplexity), the convention the audit's "AI visibility" section asks
 * about. Generated from SERVICES, so it cannot drift from the site.
 */

import { createFileRoute } from "@tanstack/react-router";

import { llmsTxt } from "@/lib/crawl-files";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(llmsTxt(), {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        }),
    },
  },
});
