"use client"

import { useEffect } from "react"

interface RedirectClientProps {
  destinationUrl: string
}

export function RedirectClient({ destinationUrl }: RedirectClientProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      window.location.href = destinationUrl
    }, 1100)

    return () => window.clearTimeout(timeoutId)
  }, [destinationUrl])

  return null
}
