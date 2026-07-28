/**
 * Reads server-only configuration (Telegram secrets) in every runtime this app
 * runs in.
 *
 * Production is a Cloudflare Worker, where secrets arrive as bindings on the
 * `env` argument of `fetch` — src/server.ts hands them here via rememberEnv().
 * `process.env` is the fallback: it covers `vite dev` (Node) and also works in
 * the Worker itself thanks to `nodejs_compat` + a compatibility date past
 * 2025-04-01, so the value is found even if the entry wrapper is bypassed.
 */

let workerEnv: Record<string, unknown> | undefined;

/** Called on every request by the Worker entry, before the app handles it. */
export function rememberEnv(env: unknown): void {
  if (env && typeof env === "object") {
    workerEnv = env as Record<string, unknown>;
  }
}

export function readEnv(key: string): string | undefined {
  const fromWorker = workerEnv?.[key];
  if (typeof fromWorker === "string" && fromWorker !== "") return fromWorker;

  if (typeof process !== "undefined") {
    const fromProcess = process.env?.[key];
    if (typeof fromProcess === "string" && fromProcess !== "") return fromProcess;
  }

  return undefined;
}
