import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Affiliate Disclosure and Transparency",
  description:
    "Full affiliate disclosure for The Penpal Edit. Transparency is a non-negotiable principle.",
  alternates: {
    canonical: "/disclosure/",
  },
}

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="py-16 md:py-24">
        <span className="persona-badge text-accent">Legal</span>
        <h1 className="mt-2 font-serif text-4xl font-light text-foreground md:text-5xl">
          Affiliate Disclosure
        </h1>
      </header>

      <section className="border-t border-border py-10">
        <div className="editorial-prose flex flex-col gap-6">
          <p className="text-base leading-relaxed text-foreground">
            The Penpal Edit is a participant in the Amazon Services LLC
            Associates Program, an affiliate advertising program designed to
            provide a means for sites to earn advertising fees by advertising
            and linking to Amazon.com.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            When you click a product link on our site and make a purchase, we
            may earn a small commission at no additional cost to you. This
            commission helps us maintain the site and continue publishing
            honest, independent editorial recommendations.
          </p>

          <h2 className="mt-4 font-serif text-2xl text-foreground">
            Our Editorial Independence
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Affiliate commissions never influence our editorial decisions. Our
            penpals recommend products based solely on their independent
            evaluation. If we cannot find a product worth recommending in a
            category, we do not publish an editorial for that category.
          </p>

          <h2 className="mt-4 font-serif text-2xl text-foreground">
            How We Use Product Images
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            All product images on this site are sourced directly from
            Amazon{"'"}s official channels. We do not download, modify, or
            rehost product images. Product images are always wrapped in the
            appropriate affiliate link.
          </p>

          <h2 className="mt-4 font-serif text-2xl text-foreground">
            How We Use Links
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            All outbound product links on editorial pages are affiliate links
            that point directly to the product on Amazon. We do not use
            cloaked URLs or deceptive redirect chains. When you click
            {"\""}Check price on Amazon,{"\""} you go to Amazon.
          </p>

          <h2 className="mt-4 font-serif text-2xl text-foreground">
            Questions?
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            If you have any questions about our affiliate relationships or
            editorial process, please reach out. Transparency is a
            non-negotiable principle for us.
          </p>
        </div>
      </section>
    </div>
  )
}
