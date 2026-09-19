const ALLOWED_ORIGINS = new Set([
  "https://portfolio.hossainconsulting.com",
  "https://hemayethossain.com",
]);

const MODEL = "claude-sonnet-5";
const MAX_REQUEST_BYTES = 24_000;
const MAX_MESSAGE_CHARS = 1_200;
const MAX_MESSAGES = 20;
const UPSTREAM_TIMEOUT_MS = 20_000;

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return secureJson({ error: "Origin not allowed" }, 403, {});
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") return secureJson({ error: "POST only" }, 405, cors);
    if (!ALLOWED_ORIGINS.has(origin)) return secureJson({ error: "Origin not allowed" }, 403, {});
    if (!env.ANTHROPIC_API_KEY || !env.SYSTEM_PROMPT) {
      return secureJson({ error: "Assistant not configured" }, 503, cors);
    }

    const declaredLength = Number(request.headers.get("Content-Length") || 0);
    if (declaredLength > MAX_REQUEST_BYTES) return secureJson({ error: "Request too large" }, 413, cors);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (env.RATE_LIMITER) {
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      if (!success) return secureJson({ error: "Question limit reached. Please try later." }, 429, cors);
    }

    let raw;
    try {
      raw = await request.text();
      if (new TextEncoder().encode(raw).length > MAX_REQUEST_BYTES) {
        return secureJson({ error: "Request too large" }, 413, cors);
      }
    } catch {
      return secureJson({ error: "Unreadable request" }, 400, cors);
    }

    let body;
    try { body = JSON.parse(raw); }
    catch { return secureJson({ error: "Bad JSON" }, 400, cors); }

    const messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return secureJson({ error: "Invalid conversation" }, 400, cors);
    }
    for (const message of messages) {
      if (!message || !["user", "assistant"].includes(message.role) || typeof message.content !== "string") {
        return secureJson({ error: "Malformed message" }, 400, cors);
      }
      if (!message.content.trim() || message.content.length > MAX_MESSAGE_CHARS) {
        return secureJson({ error: "Invalid message length" }, 400, cors);
      }
    }
    if (messages.at(-1).role !== "user") {
      return secureJson({ error: "Conversation must end with a user message" }, 400, cors);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
    let upstream;
    try {
      upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({ model: MODEL, max_tokens: 700, system: env.SYSTEM_PROMPT, messages }),
      });
    } catch (error) {
      console.error("anthropic_request_failed", error?.name || "unknown");
      return secureJson({ error: "Assistant unavailable. Try again shortly." }, 503, cors);
    } finally {
      clearTimeout(timeout);
    }

    if (!upstream.ok) {
      console.error("anthropic_status", upstream.status);
      return secureJson({ error: "Assistant unavailable. Try again shortly." }, 502, cors);
    }

    const data = await upstream.json();
    const answer = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();
    if (!answer) return secureJson({ error: "No answer returned" }, 502, cors);
    return secureJson({ text: answer }, 200, cors);
  },
};

function corsHeaders(origin) {
  if (!ALLOWED_ORIGINS.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function secureJson(payload, status, extraHeaders) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      ...extraHeaders,
    },
  });
}
