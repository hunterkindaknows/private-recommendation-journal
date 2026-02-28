import type { Metadata, Viewport } from "next"
import Script from "next/script"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? ""
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const basePath = isGithubActions && repoName ? `/${repoName}` : ""
const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT ?? ""

export const metadata: Metadata = {
  metadataBase: new URL("https://hunterkindaknows.github.io/private-recommendation-journal"),
  title: {
    default: "The Penpal Edit \u2014 Decisive Picks, Minimal Noise",
    template: "%s \u2014 The Penpal Edit",
  },
  description:
    "A premium editorial recommendation journal. One primary pick per page. No endless lists. Just decisions you can trust.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "The Penpal Edit",
    description:
      "A premium editorial recommendation journal. One primary pick per page. No endless lists. Just decisions you can trust.",
    siteName: "The Penpal Edit",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Penpal Edit",
    description:
      "A premium editorial recommendation journal. One primary pick per page. No endless lists. Just decisions you can trust.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#f5f0e8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      style={
        {
          "--font-serif":
            "Cormorant Garamond, Garamond, Baskerville, Palatino, 'Times New Roman', serif",
          "--font-sans":
            "Inter, 'Avenir Next', Avenir, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          "--font-script":
            "'Dancing Script', 'Snell Roundhand', 'Brush Script MT', cursive",
        } as React.CSSProperties
      }
    >
      <body className="font-sans antialiased">
        <Script
          id="site-pulse"
          strategy="afterInteractive"
          src={`${basePath}/pulse.js`}
          data-endpoint={analyticsEndpoint}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
