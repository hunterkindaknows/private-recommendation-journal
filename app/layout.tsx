import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter, Dancing_Script } from "next/font/google"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LoungeAudio } from "@/components/lounge-audio"

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
  display: "swap",
})

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
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <LoungeAudio />
      </body>
    </html>
  )
}
