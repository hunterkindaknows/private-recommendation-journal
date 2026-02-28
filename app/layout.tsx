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
    default: "Stonebay Journal \u2014 Cold Clarity, Decisive Picks",
    template: "%s \u2014 Stonebay Journal",
  },
  description:
    "A coastal-cool editorial recommendation journal. One clear pick per page with hard reasoning and no clutter.",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Stonebay Journal",
    description:
      "A coastal-cool editorial recommendation journal. One clear pick per page with hard reasoning and no clutter.",
    siteName: "Stonebay Journal",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stonebay Journal",
    description:
      "A coastal-cool editorial recommendation journal. One clear pick per page with hard reasoning and no clutter.",
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
  themeColor: "#1A1D21",
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
            "Iowan Old Style, Georgia, Cambria, 'Times New Roman', serif",
          "--font-sans":
            "'Avenir Next', Avenir, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif",
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
