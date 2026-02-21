interface Env {
  ANALYTICS_DB: D1Database
  IP_HASH_SALT: string
  SITE_ORIGIN: string
}

interface CollectPayload {
  eventType: "view" | "scroll" | "outbound_click" | "time_on_page"
  sessionId: string
  path: string
  referrer?: string
  tz?: string
  viewport?: { w?: number; h?: number }
  ts?: number
  scrollDepth?: number
  outboundUrl?: string
  pageMs?: number
}

const allowedEvents = new Set(["view", "scroll", "outbound_click", "time_on_page"])

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const origin = request.headers.get("Origin") ?? ""
    const corsHeaders = buildCorsHeaders(origin, env.SITE_ORIGIN)

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true }, 200, corsHeaders)
    }

    if (request.method === "GET" && url.pathname === "/favicon.ico") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method === "POST" && url.pathname === "/collect") {
      try {
        const payload = (await request.json()) as CollectPayload
        const validated = validate(payload)
        if (!validated.ok) {
          return json({ ok: false, error: validated.error }, 400, corsHeaders)
        }

        const now = Date.now()
        const ts = Number.isFinite(payload.ts) ? Number(payload.ts) : now
        const referrerUrl = safeUrl(payload.referrer)
        const referrerHost = referrerUrl ? new URL(referrerUrl).host : null
        const outboundUrl = safeUrl(payload.outboundUrl)
        const outboundHost = outboundUrl ? new URL(outboundUrl).host : null
        const ip = request.headers.get("CF-Connecting-IP") ?? "unknown"
        const ipHash = await sha256Hex(`${env.IP_HASH_SALT}:${ip}`)
        const ua = (request.headers.get("User-Agent") ?? "").slice(0, 512)
        const country = request.cf?.country ?? null

        await env.ANALYTICS_DB.prepare(
          `
          INSERT INTO events (
            ts, event_type, path, referrer_url, referrer_host, session_id,
            scroll_depth, outbound_url, outbound_host, page_ms, viewport_w, viewport_h,
            tz, ua, ip_hash, country
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `
        )
          .bind(
            ts,
            payload.eventType,
            sanitizePath(payload.path),
            referrerUrl,
            referrerHost,
            payload.sessionId,
            normalizeInt(payload.scrollDepth),
            outboundUrl,
            outboundHost,
            normalizeInt(payload.pageMs),
            normalizeInt(payload.viewport?.w),
            normalizeInt(payload.viewport?.h),
            sanitizeString(payload.tz, 128),
            ua,
            ipHash,
            country
          )
          .run()

        return json({ ok: true }, 200, corsHeaders)
      } catch {
        return json({ ok: false, error: "invalid_json" }, 400, corsHeaders)
      }
    }

    if (request.method === "GET" && url.pathname === "/report") {
      const range = (url.searchParams.get("range") ?? "last_day").toLowerCase()
      const sinceMs = getRangeStart(range)
      if (!sinceMs) {
        return json({ ok: false, error: "invalid_range" }, 400, corsHeaders)
      }

      const [totals, topPages, topReferrers] = await Promise.all([
        env.ANALYTICS_DB.prepare(
          `
          SELECT
            COUNT(*) AS events,
            COUNT(DISTINCT session_id) AS sessions,
            COUNT(DISTINCT ip_hash) AS unique_visitors
          FROM events
          WHERE ts >= ?
          `
        )
          .bind(sinceMs)
          .first(),
        env.ANALYTICS_DB.prepare(
          `
          SELECT path, COUNT(*) AS views
          FROM events
          WHERE ts >= ? AND event_type = 'view'
          GROUP BY path
          ORDER BY views DESC
          LIMIT 20
          `
        )
          .bind(sinceMs)
          .all(),
        env.ANALYTICS_DB.prepare(
          `
          SELECT COALESCE(referrer_host, '(direct)') AS referrer, COUNT(*) AS views
          FROM events
          WHERE ts >= ? AND event_type = 'view'
          GROUP BY COALESCE(referrer_host, '(direct)')
          ORDER BY views DESC
          LIMIT 20
          `
        )
          .bind(sinceMs)
          .all(),
      ])

      return json(
        {
          ok: true,
          range,
          since: new Date(sinceMs).toISOString(),
          totals,
          topPages: topPages.results ?? [],
          topReferrers: topReferrers.results ?? [],
        },
        200,
        corsHeaders
      )
    }

    return json({ ok: false, error: "not_found" }, 404, corsHeaders)
  },
}

function buildCorsHeaders(origin: string, siteOrigin: string): Headers {
  const headers = new Headers()
  if (origin === siteOrigin) {
    headers.set("Access-Control-Allow-Origin", origin)
    headers.set("Access-Control-Allow-Credentials", "true")
    headers.set("Vary", "Origin")
  }
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  headers.set("Access-Control-Allow-Headers", "Content-Type")
  return headers
}

function json(payload: unknown, status: number, headers: Headers): Response {
  const all = new Headers(headers)
  all.set("Content-Type", "application/json; charset=utf-8")
  return new Response(JSON.stringify(payload), { status, headers: all })
}

function validate(payload: CollectPayload): { ok: true } | { ok: false; error: string } {
  if (!payload || typeof payload !== "object") return { ok: false, error: "missing_payload" }
  if (!allowedEvents.has(payload.eventType)) return { ok: false, error: "invalid_event" }
  if (!payload.sessionId || payload.sessionId.length > 128)
    return { ok: false, error: "invalid_session" }
  if (!payload.path || payload.path.length > 512) return { ok: false, error: "invalid_path" }
  return { ok: true }
}

function sanitizePath(value: string): string {
  return value.startsWith("/") ? value.slice(0, 512) : `/${value.slice(0, 511)}`
}

function sanitizeString(value: string | undefined, max: number): string | null {
  if (!value) return null
  return value.slice(0, max)
}

function normalizeInt(value: number | undefined): number | null {
  if (!Number.isFinite(value)) return null
  return Math.round(Number(value))
}

function safeUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== "http:" && url.protocol !== "https:") return null
    return url.toString().slice(0, 1000)
  } catch {
    return null
  }
}

function getRangeStart(range: string): number | null {
  const now = Date.now()
  if (range === "last_hour") return now - 60 * 60 * 1000
  if (range === "last_day") return now - 24 * 60 * 60 * 1000
  if (range === "last_30_days") return now - 30 * 24 * 60 * 60 * 1000
  return null
}

async function sha256Hex(input: string): Promise<string> {
  const encoded = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest("SHA-256", encoded)
  const bytes = new Uint8Array(digest)
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("")
}
