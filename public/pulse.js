(() => {
  const script = document.currentScript
  const fallbackEndpoint =
    "https://penpal-analytics-collector.penpaleditanalytics.workers.dev/collect"
  const endpoint = script?.dataset?.endpoint?.trim() || fallbackEndpoint
  if (!endpoint) return

  const storageKey = "penpal_analytics_sid"
  const sessionId =
    localStorage.getItem(storageKey) ||
    (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`)
  localStorage.setItem(storageKey, sessionId)

  const seenScrollDepth = new Set()
  let pageStartedAt = Date.now()
  let currentPath = location.pathname
  const referrer = document.referrer || ""
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown"

  const send = (payload) => {
    const body = JSON.stringify({
      sessionId,
      path: currentPath,
      referrer,
      tz,
      viewport: {
        w: window.innerWidth,
        h: window.innerHeight,
      },
      ts: Date.now(),
      ...payload,
    })

    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" })
      navigator.sendBeacon(endpoint, blob)
      return
    }

    fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
      mode: "cors",
      credentials: "omit",
    }).catch(() => {})
  }

  send({ eventType: "view" })

  const onRouteChange = () => {
    if (location.pathname === currentPath) return
    send({
      eventType: "time_on_page",
      pageMs: Date.now() - pageStartedAt,
    })
    currentPath = location.pathname
    pageStartedAt = Date.now()
    seenScrollDepth.clear()
    send({ eventType: "view" })
  }

  const originalPushState = history.pushState
  history.pushState = function (...args) {
    originalPushState.apply(this, args)
    onRouteChange()
  }

  const originalReplaceState = history.replaceState
  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args)
    onRouteChange()
  }

  window.addEventListener("popstate", onRouteChange)

  const computeScrollDepth = () => {
    const doc = document.documentElement
    const total = Math.max(doc.scrollHeight - window.innerHeight, 1)
    const depth = Math.round((window.scrollY / total) * 100)
    return Math.max(0, Math.min(depth, 100))
  }

  const depthCheckpoints = [30, 60, 90]
  const onScroll = () => {
    const depth = computeScrollDepth()
    for (const mark of depthCheckpoints) {
      if (depth >= mark && !seenScrollDepth.has(mark)) {
        seenScrollDepth.add(mark)
        send({ eventType: "scroll", scrollDepth: mark })
      }
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true })

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest("a")
      if (!link) return
      const href = link.getAttribute("href")
      if (!href) return

      try {
        const url = new URL(href, location.origin)
        if (url.origin === location.origin) return
        send({
          eventType: "outbound_click",
          outboundUrl: url.toString(),
        })
      } catch {
        // ignore malformed href values
      }
    },
    { passive: true }
  )

  const onPageHide = () => {
    send({
      eventType: "time_on_page",
      pageMs: Date.now() - pageStartedAt,
    })
  }
  window.addEventListener("pagehide", onPageHide)
})()
