import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Solmere Journal website and editorial content.",
  alternates: {
    canonical: "/policies/terms-of-service/",
  },
  openGraph: {
    title: "Terms of Service — Solmere Journal",
    description:
      "Terms of Service for Solmere Journal website and editorial content.",
    url: "/policies/terms-of-service/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service — Solmere Journal",
    description:
      "Terms of Service for Solmere Journal website and editorial content.",
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Policy</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: February 17, 2026
        </p>
      </header>

      <section className="border-t border-border py-10">
        <div className="editorial-prose flex flex-col gap-6">
          <p className="text-base leading-relaxed text-foreground">
            These Terms of Service ("Terms") govern your use of The Edit
            Edit website. By using this website, you agree to these Terms.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Use of Website</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            You may use this site for lawful personal and informational use.
            You agree not to misuse the site, interfere with operation, or
            attempt unauthorized access.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Editorial Content</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Content on this site reflects editorial opinion and general
            information. It is not professional legal, financial, or medical
            advice.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Affiliate Disclosure</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Some links are affiliate links. We may earn a commission from
            qualifying purchases at no additional cost to you.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Intellectual Property</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Unless otherwise stated, site content, branding, and design are
            owned by Solmere Journal. You may not copy or redistribute content
            for commercial use without permission.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Third-Party Services</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            The site may link to third-party websites and services. We are not
            responsible for their content, availability, or policies.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Limitation of Liability</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            To the fullest extent allowed by law, Solmere Journal is not liable
            for any indirect or consequential damages arising from your use of
            this website.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Changes to Terms</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We may update these Terms at any time. Continued use after updates
            means you accept the revised Terms.
          </p>
        </div>
      </section>
    </div>
  )
}
