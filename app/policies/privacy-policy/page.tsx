import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Solmere Journal, including analytics, affiliate links, and data handling practices.",
  alternates: {
    canonical: "/policies/privacy-policy/",
  },
  openGraph: {
    title: "Privacy Policy — Solmere Journal",
    description:
      "Privacy policy for Solmere Journal, including analytics, affiliate links, and data handling practices.",
    url: "/policies/privacy-policy/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — Solmere Journal",
    description:
      "Privacy policy for Solmere Journal, including analytics, affiliate links, and data handling practices.",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Policy</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: February 21, 2026
        </p>
      </header>

      <section className="border-t border-border py-10">
        <div className="editorial-prose flex flex-col gap-6">
          <p className="text-base leading-relaxed text-foreground">
            This Privacy Policy explains how Solmere Journal ("we", "us", "our")
            handles information when you use this website.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Information We Collect</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We may collect limited technical data such as browser type, device
            information, referral source, page interaction metrics, and
            approximate country through our first-party analytics collector. We
            hash network identifiers for deduplication and abuse prevention, and
            do not store raw IP addresses in analytics records. We do not
            intentionally collect sensitive personal information through this
            site.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Affiliate Links</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Some links on this site are affiliate links. If you click a link and
            complete a purchase, we may earn a commission at no extra cost to
            you. Affiliate networks and merchants may collect their own data
            under their own privacy policies.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Cookies and Similar Technologies</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            This site and third-party services may use cookies or similar
            technologies for analytics, performance, and attribution.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Third-Party Services</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We may use third-party providers (for example: analytics platforms,
            edge infrastructure, affiliate platforms, and hosting providers).
            These services may process data according to their own terms and
            policies.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Data Retention</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We retain operational and analytics data only as long as needed for
            site operations, security, and performance analysis.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Your Rights</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Depending on your location, you may have rights regarding access,
            correction, deletion, or restriction of personal data. If you wish to
            make a request, contact us using the method provided on this site.
          </p>

          <h2 className="font-serif text-2xl text-foreground">Policy Updates</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            We may update this policy from time to time. Changes will be posted
            on this page with an updated effective date.
          </p>
        </div>
      </section>
    </div>
  )
}
