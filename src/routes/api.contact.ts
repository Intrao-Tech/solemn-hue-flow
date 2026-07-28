/**
 * POST /api/contact — relays the site's lead form to Telegram (Bot API
 * sendMessage). Server-only route: it has no component, so it never ships to
 * the browser and the bot token stays on the server.
 *
 * Secrets (production: `npx wrangler secret put <NAME>`; local: see
 * .dev.vars.example):
 *   TELEGRAM_BOT_TOKEN — bot token from @BotFather
 *   TELEGRAM_CHAT_ID   — chat that receives the leads (getUpdates to find it)
 */

import { createFileRoute } from "@tanstack/react-router";

import { readEnv } from "@/lib/server-env";

// Caps keep the relayed message under Telegram's 4096-char sendMessage limit.
const LIMITS = { name: 200, phone: 100, service: 200, comment: 3000, page: 200 } as const;

// Dev servers that legitimately POST from a different origin than the request
// URL. Everything else must be same-origin.
const DEV_ORIGINS = new Set([
  "http://localhost:8080",
  "http://localhost:5173",
  "http://127.0.0.1:8080",
]);

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

function isAllowedOrigin(request: Request): boolean {
  // Browsers always send Origin on POST, same-site included; curl and simple
  // bots don't, so a missing header is rejected too.
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  return origin === new URL(request.url).origin || DEV_ORIGINS.has(origin);
}

async function handleContact({ request }: { request: Request }): Promise<Response> {
  if (!isAllowedOrigin(request)) {
    return json(403, { ok: false, error: "forbidden" });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid JSON" });
  }

  // Honeypot: humans never see the "website" field, bots fill it. Pretend the
  // send succeeded so the bot doesn't learn it was filtered.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json(200, { ok: true });
  }

  const field = (key: keyof typeof LIMITS) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, LIMITS[key]) : "";

  const name = field("name");
  const phone = field("phone");
  const service = field("service");
  const comment = field("comment");
  const page = field("page");

  if (!name || !phone) {
    return json(400, { ok: false, error: "name and phone are required" });
  }

  const token = readEnv("TELEGRAM_BOT_TOKEN");
  const chatId = readEnv("TELEGRAM_CHAT_ID");
  if (!token || !chatId) {
    // Secrets not set yet — fail loudly so the form shows its error state
    // instead of silently dropping the lead.
    return json(503, { ok: false, error: "telegram is not configured" });
  }

  const text = [
    "🔔 Нова заявка з сайту «Ритуал 24 Берківці»",
    "",
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    service && `Послуга: ${service}`,
    comment && `\nКоментар:\n${comment}`,
    page && `\nСторінка: ${page}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Plain text (no parse_mode), so user input needs no HTML/Markdown escaping.
  const telegram = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!telegram.ok) {
    console.error("telegram sendMessage failed", telegram.status, await telegram.text());
    return json(502, { ok: false, error: "failed to deliver" });
  }

  return json(200, { ok: true });
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: handleContact,
      // Without this the route has no handler for other verbs and falls through
      // to the SSR renderer, which answers 200 with an HTML shell.
      ANY: () => json(405, { ok: false, error: "method not allowed" }),
    },
  },
});
