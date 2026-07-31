import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { rememberEnv } from "./lib/server-env";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

/**
 * Collapses every URL variant onto one canonical form with a permanent redirect,
 * before the request reaches the router.
 *
 * Measured on production before this existed:
 *   - `/POSLUGY` answered 200 — the same page served on two URLs, which splits
 *     ranking signals between them.
 *   - `/poslugy/` answered 307 (temporary), which passes no link equity.
 *   - `www.` answered 302 (temporary) from an edge rule.
 *
 * Paths containing a dot are left alone: hashed build assets are case-sensitive
 * (`/assets/hero-angel-CkDMYMUx.webp`), so lowercasing them would 404 the site.
 * That exemption also covers /robots.txt, /sitemap.xml and /llms.txt, which are
 * already canonical.
 */
function canonicalRedirect(request: Request): Response | undefined {
  // Only safe methods: rewriting a POST would drop its body (a 301 makes the
  // browser re-issue the request as GET), breaking /api/contact.
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;

  const url = new URL(request.url);
  const original = url.toString();

  if (url.hostname.startsWith("www.")) {
    url.hostname = url.hostname.slice(4);
  }

  const path = url.pathname;
  const isBuildAssetOrFile = path.startsWith("/_") || path.includes(".");
  if (!isBuildAssetOrFile) {
    if (path.length > 1) {
      url.pathname = path.replace(/\/+$/, "") || "/";
    }
    if (/[A-Z]/.test(url.pathname)) {
      url.pathname = url.pathname.toLowerCase();
    }
  }

  return url.toString() === original ? undefined : Response.redirect(url.toString(), 301);
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    // Cloudflare secrets live on `env`; stash them so server routes (e.g. the
    // contact form relay) can read them outside the fetch signature.
    rememberEnv(env);

    const redirect = canonicalRedirect(request);
    if (redirect) return redirect;

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
