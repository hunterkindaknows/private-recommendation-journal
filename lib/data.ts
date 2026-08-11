// ============================================================
// EDITORIAL DATA LAYER
// All content is centralized here for easy maintenance.
// In production, this would be sourced from markdown files / CMS.
// ============================================================

export type Category = "men" | "women" | "jewelry" | "maternity" | "baby"

export type PersonaSlug =
  | "minimalist"
  | "performance-analyst"
  | "luxury-curator"
  | "practicalist"

export type Merchant = "amazon" | "direct" | "multi-merchant"
export type ImageSourceType = "amazon-official" | "brand-provided" | "none-yet"
export type PricePolicy = "lowest-acceptable" | "best-value" | "premium-justified"
export type DisclosureType = "amazon-associate" | "affiliate-general"
export type PickSlot = "primary" | "secondary"

export interface Persona {
  slug: PersonaSlug
  name: string
  tagline: string
  bio: string
  optimizes: string
  avoids: string
  pageVibe: string
  avatarInitial: string
  signOff: string
}

export interface Product {
  asin: string
  brand: string
  productName: string
  priceBand: "$" | "$$" | "$$$"
  merchant: Merchant
  imageSourceType: ImageSourceType
  pricePolicy: PricePolicy
  affiliateUrl: string
  shortSpecs?: string
  /** Product images for SEO — paths relative to public/ (e.g. "/images/belt-no-crack.webp") */
  images?: {
    src: string
    alt: string
    title?: string
    caption?: string
  }[]
}

export interface Editorial {
  slug: string
  title: string
  category: Category
  persona: PersonaSlug
  published: string
  updated: string
  disclosureType: DisclosureType
  lastReviewedDate: string
  outOfStockFallback: string
  premise: string
  whyThisNotPopular: string
  primaryPick: {
    product: Product
    reasons: string[]
    bestFor: string
    notFor: string
  }
  secondaryPick?: {
    product: Product
    why: string
  }
  rationale: {
    whatMatters: string
    whatWeIgnored: string
    failureModes: string[]
  }
  whoThisIsFor: string
  whoThisWillAnnoy: string
  rejected?: { name: string; whyRejected: string }[]
  featured?: boolean
  monthPick?: string
  tags: string[]
}

// ============================================================
// PERSONAS
// ============================================================

export const personas: Record<PersonaSlug, Persona> = {
  minimalist: {
    slug: "minimalist",
    name: "The Minimalist",
    tagline: "Less, but considered.",
    bio: "I believe the best wardrobe is one you never think about. My picks optimize for simplicity, low variability, and the quiet confidence that comes from owning fewer, better things. I have no interest in trends. I care about what disappears into your life seamlessly\u2014what you reach for without deciding. If something requires fuss, special care, or careful pairing, it doesn\u2019t make my list. I\u2019d rather recommend nothing than recommend something that adds noise to your morning.",
    optimizes: "Simplicity, low variability, few regrets",
    avoids: "Fussy sizing, complicated care, fragile finishes",
    pageVibe: "Short, clean, calm certainty",
    avatarInitial: "M",
    signOff: "Buy once. Forget about it.",
  },
  "performance-analyst": {
    slug: "performance-analyst",
    name: "The Performance Analyst",
    tagline: "Measured. Tested. Decided.",
    bio: "I read spec sheets for fun. Every recommendation I make is grounded in something you can measure\u2014durability benchmarks, material composition, weight-to-warmth ratios, failure rates. I\u2019m not here to tell you something \u201cfeels nice.\u201d I\u2019m here to tell you why it performs better than the alternatives and how long it will last before it doesn\u2019t. If a product can\u2019t survive scrutiny, it doesn\u2019t survive my page.",
    optimizes: "Measurable outcomes: durability, weight, breathability, failure rate",
    avoids: "Vague claims, fashion fluff, unsubstantiated marketing",
    pageVibe: "Precise, constraint-driven, data-backed",
    avatarInitial: "P",
    signOff: "The numbers don\u2019t lie.",
  },
  "luxury-curator": {
    slug: "luxury-curator",
    name: "The Luxury Curator",
    tagline: "Quiet things that had to exist.",
    bio: "I\u2019m drawn to objects that justify themselves through material integrity, not marketing. The pieces I recommend don\u2019t announce themselves\u2014they reward attention. I look for finish quality, sensory texture, longevity of design, and the kind of craftsmanship that reveals itself over years of use. I actively avoid loud branding, trend-chasing, and anything that substitutes price for quality. If it doesn\u2019t feel inevitable, I won\u2019t recommend it.",
    optimizes: "Material integrity, finish, sensory quality, longevity",
    avoids: "Trend-chasing, loud branding, price-as-proxy-for-quality",
    pageVibe: "Quiet authority. This had to exist.",
    avatarInitial: "L",
    signOff: "Worth the patience.",
  },
  practicalist: {
    slug: "practicalist",
    name: "The Practicalist",
    tagline: "Buy it, use it, move on.",
    bio: "My philosophy is simple: the best product is the one you stop thinking about five minutes after it arrives. I optimize for value, availability, easy returns, and low maintenance. I don\u2019t care about edge-case features or premium materials if the everyday experience is the same. Life is complicated enough. My picks are designed to remove one more decision from your day.",
    optimizes: "Value, availability, low-maintenance, easy returns",
    avoids: "Finicky products, rare sizing, easily damaged materials",
    pageVibe: "Straightforward. Buy once and move on.",
    avatarInitial: "R",
    signOff: "Done. Next.",
  },
}

// ============================================================
// CATEGORY META
// ============================================================

export const categoryMeta: Record<
  Category,
  { label: string; description: string }
> = {
  men: {
    label: "Men",
    description:
      "Three to five editorials. One primary pick per page. We publish what we\u2019d actually recommend to a friend who hates shopping.",
  },
  women: {
    label: "Women",
    description:
      "Curated editorials for women who value quality over quantity. Decisive recommendations, minimal noise.",
  },
  jewelry: {
    label: "Jewelry",
    description:
      "Pieces that earn their place. We look for craftsmanship, material integrity, and designs that outlast trends.",
  },
  maternity: {
    label: "Maternity",
    description:
      "Comfort and function during the months that matter most. No compromise recommendations from people who\u2019ve been there.",
  },
  baby: {
    label: "Baby",
    description:
      "The essentials, tested and decided. One pick per category so you can stop researching and start parenting.",
  },
}

// ============================================================
// EDITORIALS (Sample content)
// ============================================================

export const editorials: Editorial[] = [
  // ---- MEN ----
  {
    slug: "only-black-tee",
    title: "The Black Tee I Don\u2019t Have to Think About",
    category: "men",
    persona: "minimalist",
    published: "2026-01-15",
    updated: "2026-02-10",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Use the secondary pick, then move to a black crew from a stable Amazon storefront with 95%+ size consistency.",
    premise:
      "Most black tees fade to a murky charcoal within weeks. We optimized for dye retention, neckline structure, and the kind of fit that works tucked or untucked without looking like a decision. We ignored trends, graphic prints, and anything that requires a specific body type to look right.",
    whyThisNotPopular:
      "Popular black tees chase softness first, then collapse at the collar. This pick keeps shape under repeat washing.",
    primaryPick: {
      product: {
        asin: "B085HQD385",
        brand: "Calvin Klein",
        productName: "Men's Cotton Classics 3-Pack Undershirts",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/only-black-tee/primary/",
        images: [
          {
            src: "/images/only-black-tee-calvin-klein-men-s-cotton-classics-3-pack.webp",
            alt: "Men's Cotton Classics 3-Pack Undershirts by Calvin Klein — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Only Black Tee",
            caption: "Our top pick: Men's Cotton Classics 3-Pack Undershirts. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Cotton jersey base, crew neck construction, and repeat-wash daily-wear profile in a 3-pack format.",
      },
      reasons: [
        "Egyptian cotton holds dye better than any blend we tested",
        "Neckline stays flat after 30+ washes \u2014 no bacon collar",
        "Mid-weight fabric that drapes without clinging",
        "Ethical supply chain with full traceability",
      ],
      bestFor: "Anyone who wants one black tee and zero decisions",
      notFor: "People who prefer ultra-lightweight athletic fabrics",
    },
    secondaryPick: {
      product: {
        asin: "B00JUM78PO",
        brand: "Hanes",
        productName: "Men's Short Sleeve Beefy-T",
        priceBand: "$$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "lowest-acceptable",
        affiliateUrl: "/go/only-black-tee/secondary/",
        images: [
          {
            src: "/images/only-black-tee-hanes-men-s-short-sleeve-beefy-t.webp",
            alt: "Men's Short Sleeve Beefy-T by Hanes — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Only Black Tee",
            caption: "Contrast pick: Men's Short Sleeve Beefy-T. See the full breakdown.",
          },
        ],
      },
      why: "If you want a softer hand-feel and don\u2019t mind paying more, Sunspel\u2019s pima cotton is extraordinary. Trade some durability for pure comfort.",
    },
    rationale: {
      whatMatters:
        "Dye retention, neckline structure, consistent sizing across orders",
      whatWeIgnored:
        "Brand cachet, Instagram aesthetics, limited-edition colors",
      failureModes: [
        "Faded color after 5 washes (most brands)",
        "Neckline stretch that turns crew into scoop",
        "Shrinkage that changes the fit you chose",
      ],
    },
    whoThisIsFor:
      "You want one black tee that survives laundry without becoming a weekly replacement task.",
    whoThisWillAnnoy:
      "You want fashion-weight drape or ultra-light performance fabric over durability.",
    rejected: [
      {
        name: "Everlane Essential Tee",
        whyRejected: "Noticeable fading by wash 8; neckline loosens",
      },
      {
        name: "Uniqlo Supima Crew",
        whyRejected:
          "Excellent value but runs a half-size small after first wash",
      },
    ],
    featured: true,
    monthPick: "2026-02",
    tags: ["basics", "everyday", "wardrobe-foundation"],
  },
  {
    slug: "one-belt-no-crack",
    title: "The Belt Edge That Doesn\u2019t Crumble",
    category: "men",
    persona: "performance-analyst",
    published: "2026-01-20",
    updated: "2026-02-08",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Fallback to a full-grain leather belt from a brand storefront that specifies edge finishing and buckle material.",
    premise:
      "Edge paint on most leather belts cracks within months. We looked for belts with burnished or turned edges\u2014construction methods that age instead of deteriorate. We ignored fashion buckles and reversible gimmicks.",
    whyThisNotPopular:
      "Most popular belts optimize for low price and reversible gimmicks, not edge construction that survives wear.",
    primaryPick: {
      product: {
        asin: "B01M26TKID",
        brand: "Levi's",
        productName:
          "Men's 2-in-1 Reversible Belt – Everyday Casual Jean Style",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/one-belt-no-crack/primary/",
        images: [
          {
            src: "/images/one-belt-no-crack-levi-s-men-s-2-in-1-reversible-belt.webp",
            alt: "Men's 2-in-1 Reversible Belt – by Levi's — product photo from Solmere Journal review",
            title: "Solmere Journal product image — One Belt No Crack",
            caption: "Our top pick: Men's 2-in-1 Reversible Belt –. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Bonded leather reversible strap with rotating buckle hardware, tuned for everyday jean-width wear.",
      },
      reasons: [
        "Hand-painted edges that patina instead of cracking",
        "Full-grain Italian leather from a 50+ year maker",
        "Brass buckle that develops character over time",
        "35mm width works with dress pants and jeans equally",
      ],
      bestFor: "One belt for both casual and dressed-up contexts",
      notFor: "Ultra-tight budgets or those wanting a reversible option",
    },
    rationale: {
      whatMatters:
        "Edge finishing method, leather grade, buckle material, width versatility",
      whatWeIgnored: "Reversible designs, novelty buckles, vegan alternatives",
      failureModes: [
        "Edge paint cracking and flaking within 6 months",
        "Bonded leather delaminating at the fold point",
        "Chrome buckle tarnishing unevenly",
      ],
    },
    whoThisIsFor:
      "You need one everyday belt that does not crack at the edges after a season.",
    whoThisWillAnnoy:
      "You want loud hardware, reversible designs, or trend-driven buckle styles.",
    featured: true,
    tags: ["accessories", "leather-goods", "everyday"],
  },
  {
    slug: "socks-for-walking",
    title: "The Best Socks If You Actually Walk",
    category: "men",
    persona: "practicalist",
    published: "2026-02-01",
    updated: "2026-02-12",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Fallback to another Darn Tough merino hiking model with comparable cushion level and lifetime warranty.",
    premise:
      "We tested socks on real commutes, not treadmills. The winner had to survive 10,000+ steps without bunching, manage moisture without odor, and maintain elasticity after dozens of washes. We didn\u2019t care about color variety or gift packaging.",
    whyThisNotPopular:
      "Popular socks are cheap to buy and expensive to keep replacing. This pair is boring and durable.",
    primaryPick: {
      product: {
        asin: "B000XFW6O0",
        brand: "Darn Tough",
        productName:
          "Vermont Men's Hiker Midweight Micro Crew Sock (Style 1466)",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/socks-for-walking/primary/",
        images: [
          {
            src: "/images/socks-for-walking-darn-tough-vermont-men-s-hiker-midweight.webp",
            alt: "Vermont Men's Hiker Midweight Micro by Darn Tough — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Socks For Walking",
            caption: "Our top pick: Vermont Men's Hiker Midweight Micro. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Merino wool blend with midweight cushioning, micro crew height, and reinforced heel/toe knit zones.",
      },
      reasons: [
        "Lifetime warranty \u2014 they literally replace them forever",
        "Merino wool manages temperature and odor naturally",
        "True mid-calf height that stays put all day",
        "Reinforced heel and toe where walking actually wears",
      ],
      bestFor: "Daily commuters and anyone on their feet 8+ hours",
      notFor: "Dress shoe wearers who need thin dress socks",
    },
    rationale: {
      whatMatters:
        "Durability per dollar, moisture management, stay-up construction",
      whatWeIgnored: "Color options, fashion patterns, retail packaging",
      failureModes: [
        "Elastic collapse after 10 washes (cotton socks)",
        "Bunching inside shoes after an hour of walking",
        "Synthetic blends that trap odor",
      ],
    },
    whoThisIsFor: "You walk a lot and want to stop thinking about socks.",
    whoThisWillAnnoy:
      "You only buy socks in big multipacks and do not care about longevity.",
    featured: true,
    monthPick: "2026-02",
    tags: ["basics", "everyday", "value"],
  },

  // ---- WOMEN ----
  {
    slug: "everyday-chain",
    title: "The Everyday Chain That Reads Adult, Not Flashy",
    category: "women",
    persona: "luxury-curator",
    published: "2026-01-10",
    updated: "2026-02-13",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Fallback to a solid gold or clearly spec'd 14k chain from an Amazon storefront with clear karat details and consistent SKU history.",
    premise:
      "An everyday chain should disappear into your neckline and catch light at the right moments. We tested for clasp security, tarnish resistance, and that ineffable quality where something looks effortless but clearly isn\u2019t. We ignored plated options entirely.",
    whyThisNotPopular:
      "Popular chains over-index on sparkle and under-spec the metal. We prioritize metal specs and clasp reliability.",
    primaryPick: {
      product: {
        asin: "B0B6H8BDJM",
        brand: "DEARMAY",
        productName:
          "14K Gold Plated Dainty Herringbone Choker Snake Chain Necklace",
        priceBand: "$$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "premium-justified",
        affiliateUrl: "/go/everyday-chain/primary/",
        images: [
          {
            src: "/images/everyday-chain-dearmay-14k-gold-plated-dainty.webp",
            alt: "14K Gold Plated Dainty Herringbone by DEARMAY — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Everyday Chain",
            caption: "Our top pick: 14K Gold Plated Dainty Herringbone. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Gold-plated herringbone snake chain profile with flat reflective lay and minimalist daily styling.",
      },
      reasons: [
        "14k solid gold \u2014 no plating to wear through",
        "Box chain style catches light without being flashy",
        "Spring-ring clasp that actually stays closed",
        "1mm width sits perfectly at the collarbone",
      ],
      bestFor: "A never-take-it-off daily chain",
      notFor: "Those looking for a statement necklace",
    },
    rationale: {
      whatMatters:
        "Metal purity, clasp mechanism, chain weight-to-strength ratio",
      whatWeIgnored: "Trend-driven designs, layering sets, plated options",
      failureModes: [
        "Gold plating wearing through in 3 months",
        "Lobster clasps that open in hair",
        "Chains that kink and can\u2019t be unknotted",
      ],
    },
    whoThisIsFor:
      "You want one chain that works daily without looking trend-led.",
    whoThisWillAnnoy:
      "You prefer oversized statement necklaces or highly decorative pieces.",
    featured: true,
    monthPick: "2026-02",
    tags: ["jewelry", "everyday", "investment-piece"],
  },
  {
    slug: "white-sneaker-women",
    title: "The White Sneaker You Can Actually Replace",
    category: "women",
    persona: "minimalist",
    published: "2026-01-25",
    updated: "2026-02-10",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Fallback to another widely stocked minimalist leather sneaker with consistent sizing and official storefront availability.",
    premise:
      "Most white sneakers look perfect for two weeks, then become a restoration project. We optimized for leather that wipes clean, a sole that doesn\u2019t yellow, and a silhouette refined enough for ankle-crop trousers. We ignored chunky soles and logo-heavy designs.",
    whyThisNotPopular:
      "The internet-favorite white sneaker is often hard to source reliably. This pick stays available and replaceable.",
    primaryPick: {
      product: {
        asin: "B09KMGS7WY",
        brand: "adidas",
        productName: "Women's Grand Court 2.0 Tennis Shoe",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/white-sneaker-women/primary/",
        images: [
          {
            src: "/images/white-sneaker-women-adidas-women-s-grand-court-2-0.webp",
            alt: "Women's Grand Court 2.0 Tennis by adidas — product photo from Solmere Journal review",
            title: "Solmere Journal product image — White Sneaker Women",
            caption: "Our top pick: Women's Grand Court 2.0 Tennis. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Synthetic leather upper with low-profile cupsole construction and classic court-sneaker proportions.",
      },
      reasons: [
        "Italian Nappa leather develops a patina instead of scuffing",
        "Margom sole resists yellowing for 12+ months",
        "Slim profile pairs with trousers, skirts, and denim equally",
        "Gold-stamped serial number \u2014 the only branding, and it\u2019s subtle",
      ],
      bestFor: "A single white sneaker that works with everything",
      notFor: "Athletic use or wide-foot wearers",
    },
    rationale: {
      whatMatters:
        "Leather quality, sole discoloration resistance, silhouette versatility",
      whatWeIgnored: "Trend-driven details, platform soles, color variants",
      failureModes: [
        "Rubber yellowing within weeks",
        "Leather that cracks instead of developing character",
        "Chunky proportions that limit outfit compatibility",
      ],
    },
    whoThisIsFor:
      "You want one clean white sneaker you can repurchase without drama.",
    whoThisWillAnnoy:
      "You want luxury-only detailing or very narrow silhouette footwear.",
    featured: true,
    tags: ["footwear", "everyday", "wardrobe-foundation"],
  },

  // ---- JEWELRY ----
  {
    slug: "daily-earrings",
    title: "The Daily Hoops You Stop Noticing (in the Good Way)",
    category: "jewelry",
    persona: "minimalist",
    published: "2026-01-18",
    updated: "2026-02-11",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Fallback to simple hoops with clear metal composition and a locking mechanism from a stable Amazon storefront.",
    premise:
      "Daily earrings should be invisible until they\u2019re noticed. We tested for overnight comfort, shower safety, and the kind of understated finish that doesn\u2019t scream \u201cI\u2019m trying.\u201d We rejected anything that required removal before sleep.",
    whyThisNotPopular:
      "Popular earrings optimize for trend swings. This pick optimizes for comfort and closure reliability.",
    primaryPick: {
      product: {
        asin: "B0C2DJD7M5",
        brand: "PAVOI",
        productName:
          "14K Gold Plated Lightweight Chunky Open Hoops for Women",
        priceBand: "$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/daily-earrings/primary/",
        images: [
          {
            src: "/images/daily-earrings-pavoi-14k-gold-plated-lightweight.webp",
            alt: "14K Gold Plated Lightweight Chunky by PAVOI — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Daily Earrings",
            caption: "Our top pick: 14K Gold Plated Lightweight Chunky. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Lightweight gold-plated hoop build with open profile and secure post-back wear for all-day comfort.",
      },
      reasons: [
        "Solid 14k gold \u2014 sleep, shower, live in them",
        "Hinge mechanism that clicks shut and stays shut",
        "10mm diameter sits flush against the earlobe",
        "Hypoallergenic for sensitive skin",
      ],
      bestFor: "A put-them-in-and-forget pair",
      notFor: "Those who change earrings daily for variety",
    },
    rationale: {
      whatMatters:
        "Closure mechanism security, overnight comfort, tarnish resistance",
      whatWeIgnored: "Seasonal styles, embellishments, sets and collections",
      failureModes: [
        "Hinges that loosen and drop earrings",
        "Plating that causes reactions",
        "Hoops that catch on hair and clothing",
      ],
    },
    whoThisIsFor:
      "You want comfortable, everyday hoops with low maintenance.",
    whoThisWillAnnoy:
      "You only wear solid-gold fine jewelry and reject plated options.",
    featured: true,
    tags: ["earrings", "everyday", "investment-piece"],
  },

  // ---- MATERNITY ----
  {
    slug: "maternity-bra-no-compromise",
    title: "A Maternity Bra That Doesn\u2019t Feel Like Compromise",
    category: "maternity",
    persona: "practicalist",
    published: "2026-01-28",
    updated: "2026-02-13",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Fallback to the nearest Kindred Bravely model with one-hand clips and broad cup range coverage.",
    premise:
      "Most maternity bras trade support for stretch and call it comfortable. We looked for actual engineering: wide bands that distribute weight, cups that adapt across sizes, and nursing access that doesn\u2019t require an engineering degree at 3am.",
    whyThisNotPopular:
      "Popular bras are often soft first and supportive second. This pick keeps both in balance.",
    primaryPick: {
      product: {
        asin: "B0D14GJT7T",
        brand: "Kindred Bravely",
        productName:
          "French Terry Nursing Bra for Breastfeeding and Sleep, Racerback Crossover",
        priceBand: "$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/maternity-bra-no-compromise/primary/",
        images: [
          {
            src: "/images/maternity-bra-no-compromise-kindred-bravely-french-terry-nursing-bra.webp",
            alt: "French Terry Nursing Bra for by Kindred Bravely — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Maternity Bra No Compromise",
            caption: "Our top pick: French Terry Nursing Bra for. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "French terry stretch blend with crossover nursing access and racerback support geometry.",
      },
      reasons: [
        "French terry fabric is soft without losing structure",
        "One-hand nursing clasp that actually works in the dark",
        "Spans 2\u20133 cup sizes as your body changes",
        "Wide bottom band distributes weight without digging",
      ],
      bestFor: "Everyday comfort from second trimester through nursing",
      notFor: "High-impact exercise or formal occasions",
    },
    rationale: {
      whatMatters:
        "Size adaptability, nursing access speed, band support, fabric softness",
      whatWeIgnored:
        "Lace details, underwire options, color variety",
      failureModes: [
        "Clasp mechanisms that require two hands",
        "Fabric that pills after three washes",
        "Bands that roll or ride up under a belly",
      ],
    },
    whoThisIsFor:
      "You need comfort and reliable nursing access in one everyday bra.",
    whoThisWillAnnoy:
      "You prefer underwire structure or fashion-led detailing over comfort.",
    featured: true,
    monthPick: "2026-02",
    tags: ["essentials", "comfort", "nursing"],
  },

  // ---- BABY ----
  {
    slug: "baby-monitor-worth-it",
    title: "The Baby Monitor I\u2019d Pay For Again",
    category: "baby",
    persona: "performance-analyst",
    published: "2026-02-05",
    updated: "2026-02-13",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-14",
    outOfStockFallback:
      "Fallback to a non-WiFi monitor with comparable screen size and parent-unit battery life.",
    premise:
      "The baby monitor market is an anxiety machine. We cut through the feature bloat and tested what actually matters: connection reliability, night vision clarity, and audio that doesn\u2019t wake the baby when you check. We ignored app ecosystems and AI sleep tracking.",
    whyThisNotPopular:
      "Most popular picks push app ecosystems. This one prioritizes reliability at 3 a.m.",
    primaryPick: {
      product: {
        asin: "B07GBP3GH9",
        brand: "eufy",
        productName: "Security Video Baby Monitor 720P",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/baby-monitor-worth-it/primary/",
        images: [
          {
            src: "/images/baby-monitor-worth-it-eufy-security-video-baby-monitor.webp",
            alt: "Security Video Baby Monitor 720P by eufy — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Baby Monitor Worth It",
            caption: "Our top pick: Security Video Baby Monitor 720P. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Dedicated parent-unit monitor with 720p camera feed, night vision, and no Wi-Fi dependency.",
      },
      reasons: [
        "Dedicated monitor \u2014 no WiFi dependency or app crashes",
        "720p night vision that actually shows breathing movement",
        "5-inch screen large enough to check from across the room",
        "8-hour battery on the parent unit, not 3",
      ],
      bestFor: "Reliable monitoring without WiFi anxiety",
      notFor: "Parents who want app-based remote viewing",
    },
    rationale: {
      whatMatters:
        "Connection reliability, night vision quality, parent unit battery, audio sensitivity",
      whatWeIgnored:
        "App ecosystems, AI features, multiple camera support",
      failureModes: [
        "WiFi monitors dropping connection during the night",
        "Night vision too grainy to see chest movement",
        "Parent unit dying before the 4am feeding",
      ],
    },
    whoThisIsFor:
      "You want a dependable non-WiFi monitor with clear night view and long parent-unit battery.",
    whoThisWillAnnoy:
      "You need cloud recording, app dashboards, or advanced smart-home integrations.",
    featured: true,
    monthPick: "2026-02",
    tags: ["nursery", "essentials", "tech"],
  },

  // ---- TRANSITIONAL WEATHER ----
  {
    slug: "car-coat-between-seasons-men",
    title: "A Car Coat for 38°F to 55°F",
    category: "men",
    persona: "practicalist",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a wool-blend topcoat with clean front closure and stable shoulder structure from a stocked storefront.",
    premise:
      "This is the awkward temperature where a heavy winter coat overheats indoors and a hoodie leaves you cold at dusk. We looked for a clean car-coat profile that layers over a light sweater, keeps wind off your core, and still reads adult on a Tuesday.",
    whyThisNotPopular:
      "Popular outerwear in this band is usually puffer-heavy or trend-cut. This pick keeps shape and avoids costume energy.",
    primaryPick: {
      product: {
        asin: "B01LYFL7F4",
        brand: "Cole Haan",
        productName: "Men's Button Up Wool Plush Car Coat",
        priceBand: "$$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "premium-justified",
        affiliateUrl: "/go/car-coat-between-seasons-men/primary/",
        images: [
          {
            src: "/images/car-coat-between-seasons-men-cole-haan-men-s-button-up-wool.webp",
            alt: "Men's Button Up Wool Plush by Cole Haan — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Car Coat Between Seasons Men",
            caption: "Our top pick: Men's Button Up Wool Plush. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "100% wool shell with button front, lower pockets, and structured topcoat shape for transitional layering.",
      },
      reasons: [
        "Structured front keeps proportions clean over knitwear",
        "Wool shell insulates without bulky puffer volume",
        "Works open indoors and closed in wind",
        "Reads polished with denim, trousers, or boots",
      ],
      bestFor: "Men who want one coat for commutes, office, and dinner plans",
      notFor: "Anyone needing technical rain shell performance",
    },
    rationale: {
      whatMatters:
        "Core warmth, layering room, shoulder structure, and daily versatility",
      whatWeIgnored:
        "Streetwear trend cuts, oversized branding, and novelty hardware",
      failureModes: [
        "Coats that trap too much heat indoors",
        "Soft collars that collapse after repeated wear",
        "Boxy cuts that fight layering proportions",
      ],
    },
    whoThisIsFor:
      "You want controlled warmth in in-between weather and no styling drama.",
    whoThisWillAnnoy:
      "You want ultra-light shell jackets or highly technical outdoor features.",
    featured: true,
    monthPick: "2026-02",
    tags: ["transitional-weather", "outerwear", "men"],
  },
  {
    slug: "waxed-jacket-transitional-men",
    title: "The Waxed Jacket That Handles Bad Weather Without Noise",
    category: "men",
    persona: "performance-analyst",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a re-waxable cotton shell with weather-resistant finish and full-size availability.",
    premise:
      "Transitional weather is less about deep cold and more about damp wind, shifting temperatures, and long days outside. We optimized for weather resistance, build quality, and predictable layering over a base and midweight knit.",
    whyThisNotPopular:
      "Most best-sellers optimize for price first. This pick optimizes for shell quality and long-term wear behavior.",
    primaryPick: {
      product: {
        asin: "B0BVN2XZFL",
        brand: "Huckberry / Flint and Tinder",
        productName:
          "Men's Flannel-Lined Waxed Trucker Jacket, Water & Weather Resistant",
        priceBand: "$$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "premium-justified",
        affiliateUrl: "/go/waxed-jacket-transitional-men/primary/",
        images: [
          {
            src: "/images/waxed-jacket-transitional-men-huckberry-flint-and-tinder-men-s-flannel-lined-waxed-trucker.webp",
            alt: "Men's Flannel-Lined Waxed Trucker Jacket, by Huckberry / Flint and Tinder — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Waxed Jacket Transitional Men",
            caption: "Our top pick: Men's Flannel-Lined Waxed Trucker Jacket,. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Waxed cotton sailcloth exterior, flannel lining, and re-waxable weather-resistant construction.",
      },
      reasons: [
        "Waxed shell handles wind and light rain better than untreated cotton",
        "Re-waxable exterior extends service life",
        "Structured trucker cut layers cleanly over thermals and shirts",
        "Ages with visible patina instead of looking disposable",
      ],
      bestFor: "Men who walk commute routes and need weather tolerance with structure",
      notFor: "People who want machine-wash convenience outerwear",
    },
    rationale: {
      whatMatters:
        "Shell durability, weather resistance, seam behavior, and repairable lifespan",
      whatWeIgnored:
        "Influencer styling, logo-heavy branding, and fast-fashion price race",
      failureModes: [
        "Shell wet-out after light rain",
        "Collar and cuff breakdown under repeat wear",
        "Fit collapse once layered over knitwear",
      ],
    },
    whoThisIsFor:
      "You want one weather-ready jacket for the 38°F-55°F band and variable rain.",
    whoThisWillAnnoy:
      "You only wear ultralight synthetic shells or fully insulated puffers.",
    tags: ["transitional-weather", "outerwear", "men", "weatherproof"],
  },
  {
    slug: "trench-for-between-seasons-women",
    title: "A Trench for the In-Between Months",
    category: "women",
    persona: "luxury-curator",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a cotton-blend, belted trench with reliable water-resistant fabric and clean length.",
    premise:
      "When temperatures shift daily, the right trench creates shape without heavy insulation and keeps you dry without looking technical. We selected for line, fabric behavior, and whether it still feels composed by hour ten.",
    whyThisNotPopular:
      "Many popular trenches chase trend details and lose proportion. This one stays clean and wearable.",
    primaryPick: {
      product: {
        asin: "B082N4KY9W",
        brand: "LONDON FOG",
        productName:
          "Women's Single Breasted Long Trench Coat with Epaulettes and Belt",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/trench-for-between-seasons-women/primary/",
        images: [
          {
            src: "/images/trench-for-between-seasons-women-london-fog-women-s-single-breasted-long.webp",
            alt: "Women's Single Breasted Long Trench by LONDON FOG — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Trench For Between Seasons Women",
            caption: "Our top pick: Women's Single Breasted Long Trench. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "57% cotton / 43% polyester blend with belted waist, below-knee length, and water-resistant finish.",
      },
      reasons: [
        "Light structure gives shape without winter bulk",
        "Water-resistant shell works for wet sidewalks and wind",
        "Belted line adapts to knitwear layers",
        "Length protects without swallowing proportion",
      ],
      bestFor: "Women building a quiet, repeatable between-season uniform",
      notFor: "Anyone wanting oversized streetwear trench volume",
    },
    rationale: {
      whatMatters:
        "Fabric drape, water resistance, line control, and all-day comfort",
      whatWeIgnored:
        "Micro-trends, loud hardware, and over-designed shoulder details",
      failureModes: [
        "Stiff fabric that creases and never relaxes",
        "Belts that twist and lose shape quickly",
        "Cuts that only work with one specific shoe",
      ],
    },
    whoThisIsFor:
      "You need one coat that carries late winter into spring without looking confused.",
    whoThisWillAnnoy:
      "You prefer heavily insulated outerwear or dramatic trend silhouettes.",
    featured: true,
    monthPick: "2026-02",
    tags: ["transitional-weather", "outerwear", "women"],
  },
  {
    slug: "boots-for-cold-ground-men",
    title: "Boots for Cold Pavement Days",
    category: "men",
    persona: "minimalist",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a leather lace-up boot with reliable outsole grip and consistent sizing history.",
    premise:
      "In transitional weather, cold pavement drains comfort faster than air temperature. We chose a leather boot that stabilizes traction, layers with wool socks, and works across denim and tailored trousers without outfit friction.",
    whyThisNotPopular:
      "Most popular shoes in this season are sneakers. We prioritize ground insulation and durability over casual convenience.",
    primaryPick: {
      product: {
        asin: "B07PP53522",
        brand: "Thursday Boot Company",
        productName: "Captain Men's Lace-up Boot",
        priceBand: "$$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "premium-justified",
        affiliateUrl: "/go/boots-for-cold-ground-men/primary/",
        images: [
          {
            src: "/images/boots-for-cold-ground-men-thursday-boot-company-captain-men-s-lace-up-boot.webp",
            alt: "Captain Men's Lace-up Boot by Thursday Boot Company — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Boots For Cold Ground Men",
            caption: "Our top pick: Captain Men's Lace-up Boot. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Leather upper, 6-inch shaft profile, and rubber outsole tuned for daily city wear.",
      },
      reasons: [
        "Leather upper handles repeat wear and improves with break-in",
        "Rubber outsole adds grip over wet pavement",
        "Boot profile anchors transitional layering formulas",
        "Pairs with wool socks without crowding the fit",
      ],
      bestFor: "Men who walk often and need one cold-ground footwear default",
      notFor: "People who only want ultra-light sneaker comfort",
    },
    rationale: {
      whatMatters:
        "Outsole traction, upper durability, fit consistency, and daily versatility",
      whatWeIgnored:
        "Trend-color drops, novelty soles, and short-lived hype boots",
      failureModes: [
        "Thin soles that transmit cold fast",
        "Uppers that crease and crack early",
        "Unstable grip on wet concrete",
      ],
    },
    whoThisIsFor:
      "You want one dependable boot for the cold-to-mild transition months.",
    whoThisWillAnnoy:
      "You want minimal-break-in shoes or sneaker-only styling.",
    tags: ["transitional-weather", "footwear", "men"],
  },
  {
    slug: "henry-topcoat-work-rotation-men",
    title: "A Work Topcoat for Transitional Office Days",
    category: "men",
    persona: "practicalist",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "If this listing is unavailable, fallback to a wool-blend topcoat with dual front closure and similar length profile.",
    premise:
      "This is the office-layer problem between deep winter and spring. We wanted a coat that sits clean over a shirt and light knit, blocks wind on commute, and still looks composed at 6 p.m.",
    whyThisNotPopular:
      "Most affordable topcoats look right online then collapse in daily wear. This one is configured for functional layering and practical maintenance.",
    primaryPick: {
      product: {
        asin: "B07T2C8W32",
        brand: "Dockers",
        productName: "Men's The Henry Wool Blend Top Coat",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/henry-topcoat-work-rotation-men/primary/",
        images: [
          {
            src: "/images/henry-topcoat-work-rotation-men-dockers-men-s-the-henry-wool.webp",
            alt: "Men's The Henry Wool Blend by Dockers — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Henry Topcoat Work Rotation Men",
            caption: "Our top pick: Men's The Henry Wool Blend. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Wool-blend shell with quilted bib insert and dual front closure for structured transitional layering.",
      },
      reasons: [
        "Layering bib helps with wind without full winter bulk",
        "Topcoat profile works over office and off-duty uniforms",
        "Machine-washable care profile lowers maintenance friction",
        "Storage layout supports daily carry without visual clutter",
      ],
      bestFor: "Men who need one practical topcoat for commute and office rotation",
      notFor: "Anyone seeking premium full-wool tailoring details",
    },
    rationale: {
      whatMatters:
        "Layering function, closure reliability, shape retention, and maintenance ease",
      whatWeIgnored:
        "Trend silhouettes, marketing language, and seasonal color churn",
      failureModes: [
        "Coats that overheat indoors by midday",
        "Shoulders that lose structure after repeat use",
        "Short lengths that fail in wind exposure",
      ],
    },
    whoThisIsFor:
      "You want a straightforward office-compatible topcoat for 38°F to 55°F.",
    whoThisWillAnnoy:
      "You only buy premium natural-fiber outerwear or designer cuts.",
    tags: ["transitional-weather", "outerwear", "men", "workwear"],
  },
  {
    slug: "dakota-waxed-jacket-men",
    title: "The Waxed Jacket for Wet, Windy Errands",
    category: "men",
    persona: "performance-analyst",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a water-resistant waxed jacket with insulation and extended sizing coverage.",
    premise:
      "Some days need utility over polish. We chose a waxed cotton jacket that handles wind, light rain, and temperature swings while still layering cleanly over a base and mid layer.",
    whyThisNotPopular:
      "Most weather jackets in this range either look tactical or wear out fast. This one is built around repeat real-life use and coverage.",
    primaryPick: {
      product: {
        asin: "B0CRDCM7PM",
        brand: "Legendary Whitetails",
        productName: "Men's Casual Coat with Hood Waxed Cotton Water Resistant",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/dakota-waxed-jacket-men/primary/",
        images: [
          {
            src: "/images/dakota-waxed-jacket-men-legendary-whitetails-men-s-casual-coat-with.webp",
            alt: "Men's Casual Coat with Hood by Legendary Whitetails — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Dakota Waxed Jacket Men",
            caption: "Our top pick: Men's Casual Coat with Hood. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Waxed cotton blend shell with quilted lining, removable hood, and extended Big & Tall size availability.",
      },
      reasons: [
        "Water-resistant shell handles variable rain and wind",
        "Quilted lining gives warmth without puffer bulk",
        "Removable hood adapts between commute and casual settings",
        "Extended sizing improves fit inclusivity for real bodies",
      ],
      bestFor: "Men needing a reliable bad-weather daily layer under $150",
      notFor: "Minimalists who want a strictly tailored topcoat silhouette",
    },
    rationale: {
      whatMatters:
        "Weather tolerance, fit range, durability, and storage function",
      whatWeIgnored:
        "Runway styling, influencer-friendly colorways, and novelty trims",
      failureModes: [
        "Shell wet-out in drizzle",
        "Poor sleeve lining causing grab over knit layers",
        "Sizing gaps that make fit inconsistent",
      ],
    },
    whoThisIsFor:
      "You need one practical jacket for wind, damp streets, and daily movement.",
    whoThisWillAnnoy:
      "You want a fully unlined minimalist coat with no visible utility features.",
    tags: ["transitional-weather", "outerwear", "men", "weatherproof"],
  },
  {
    slug: "cashmere-set-cold-mornings-women",
    title: "The Cold-Morning Cashmere Set I Actually Reach For",
    category: "women",
    persona: "luxury-curator",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a 100% cashmere scarf and glove set with clearly stated fiber grade and care guidance.",
    premise:
      "Accessory sets are usually gift theater, not wardrobe function. This one made the list because it solves the first ten cold minutes of the day and then disappears into your routine.",
    whyThisNotPopular:
      "Most sets prioritize packaging over fiber quality. This pick is about material feel and repeat-wear behavior.",
    primaryPick: {
      product: {
        asin: "B0973RGR3T",
        brand: "Fishers Finery",
        productName:
          "Women's 3 Piece 100% Cashmere Pom Beanie Hat Glove & Scarf Set",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/cashmere-set-cold-mornings-women/primary/",
        images: [
          {
            src: "/images/cashmere-set-cold-mornings-women-fishers-finery-women-s-3-piece-100.webp",
            alt: "Women's 3 Piece 100% Cashmere by Fishers Finery — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Cashmere Set Cold Mornings Women",
            caption: "Our top pick: Women's 3 Piece 100% Cashmere. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "100% cashmere three-piece set with rib knit beanie, gloves, and scarf for daily cold-weather layering.",
      },
      reasons: [
        "100% cashmere gives warmth without heavy bulk",
        "Three-piece coherence reduces morning decision load",
        "Neutral tones integrate with trench and wool coat uniforms",
        "Comfort-focused texture avoids scratchy synthetic feel",
      ],
      bestFor: "Women building a quiet, repeatable cold-morning uniform",
      notFor: "Anyone avoiding hand-wash or delicate-fiber care",
    },
    rationale: {
      whatMatters:
        "Fiber content clarity, touch comfort, layering ease, and daily usability",
      whatWeIgnored:
        "Holiday-gift branding, novelty embellishments, and trend color drops",
      failureModes: [
        "Scratchy blends marketed as premium",
        "Accessories that look good but slide out of rotation",
        "Poor knit recovery after repeated wear",
      ],
    },
    whoThisIsFor:
      "You want warmth at neck and hands without adding visual noise.",
    whoThisWillAnnoy:
      "You prefer technical synthetic gear or statement accessory styling.",
    tags: ["transitional-weather", "accessories", "women", "cashmere"],
  },
  {
    slug: "budget-chukka-men-transitional",
    title: "Budget Chukka Boots for Transitional Weeks",
    category: "men",
    persona: "practicalist",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to suede chukka boots with similar outsole grip and size range in the same price tier.",
    premise:
      "Not every season needs a $200 boot. This pick covers the middle ground: cleaner than sneakers, lighter than heavy work boots, and affordable enough to wear hard.",
    whyThisNotPopular:
      "Budget footwear is usually dismissed as disposable. This one stays useful when styled as a rotational everyday shoe.",
    primaryPick: {
      product: {
        asin: "B015EW2IQ2",
        brand: "Bruno Marc",
        productName: "Men's Classic Dress Casual Chukka Boots 2.0",
        priceBand: "$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "lowest-acceptable",
        affiliateUrl: "/go/budget-chukka-men-transitional/primary/",
        images: [
          {
            src: "/images/budget-chukka-men-transitional-bruno-marc-men-s-classic-dress-casual.webp",
            alt: "Men's Classic Dress Casual Chukka by Bruno Marc — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Budget Chukka Men Transitional",
            caption: "Our top pick: Men's Classic Dress Casual Chukka. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Suede upper chukka profile with EVA footbed and thermoplastic elastomer outsole.",
      },
      reasons: [
        "Price point makes daily rotation realistic",
        "Chukka profile bridges denim, chinos, and casual tailoring",
        "Lace closure provides adjustable fit through the day",
        "Lighter feel than full-height leather boots",
      ],
      bestFor: "Men wanting a low-risk transitional footwear upgrade from sneakers",
      notFor: "Buyers prioritizing heritage-grade long-term boot construction",
    },
    rationale: {
      whatMatters:
        "Price-to-use ratio, daily comfort, silhouette flexibility, and availability",
      whatWeIgnored:
        "Collector-level craftsmanship claims and luxury-leather signaling",
      failureModes: [
        "Outsoles that slip on wet pavement",
        "Uppers that collapse after light wear",
        "Sizing inconsistency across restocks",
      ],
    },
    whoThisIsFor:
      "You need a practical in-between shoe that does not require a big spend.",
    whoThisWillAnnoy:
      "You only buy resoleable premium boots and full-grain uppers.",
    tags: ["transitional-weather", "footwear", "men", "budget"],
  },
  {
    slug: "pinch-penny-loafer-cold-dry-days",
    title: "A Penny Loafer for Cold-but-Dry City Days",
    category: "men",
    persona: "minimalist",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a leather penny loafer with similar low-profile shape and dress-casual compatibility.",
    premise:
      "When the forecast is dry and you want a cleaner line than boots, a penny loafer still works in transitional weather if you pair it with wool socks and controlled layers.",
    whyThisNotPopular:
      "Most people default to sneakers or boots and skip loafers in colder months. This pick keeps the silhouette sharp without over-dressing.",
    primaryPick: {
      product: {
        asin: "B00B1I6EP0",
        brand: "Cole Haan",
        productName: "Men's Pinch Penny Loafer",
        priceBand: "$$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/pinch-penny-loafer-cold-dry-days/primary/",
        images: [
          {
            src: "/images/pinch-penny-loafer-cold-dry-days-cole-haan-men-s-pinch-penny-loafer.webp",
            alt: "Men's Pinch Penny Loafer by Cole Haan — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Pinch Penny Loafer Cold Dry Days",
            caption: "Our top pick: Men's Pinch Penny Loafer. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "Leather loafer profile with classic penny strap and low-profile dress-casual construction.",
      },
      reasons: [
        "Clean shape sharpens transitional outfits quickly",
        "Leather upper reads adult without excess detail",
        "Works across office and dinner settings",
        "Pairs with wool socks for controlled cold-weather wear",
      ],
      bestFor: "Men wanting a refined non-boot option on dry transitional days",
      notFor: "Wet-weather commutes and heavy-rain environments",
    },
    rationale: {
      whatMatters:
        "Silhouette clarity, leather quality, comfort over long days, and versatility",
      whatWeIgnored:
        "Trendy sole exaggeration and statement hardware details",
      failureModes: [
        "Loafers that pinch across instep under all-day wear",
        "Thin soles that transmit cold pavement immediately",
        "Glossy finishes that look costume-level in daylight",
      ],
    },
    whoThisIsFor:
      "You want one polished option for cold dry days without dress-shoe stiffness.",
    whoThisWillAnnoy:
      "You need weatherproof traction or prefer rugged-only footwear.",
    tags: ["transitional-weather", "footwear", "men", "dress-casual"],
  },
  {
    slug: "grid-base-layer-men-core-warmth",
    title: "The Base Layer That Keeps the Core Stable",
    category: "men",
    persona: "performance-analyst",
    published: "2026-02-19",
    updated: "2026-02-19",
    disclosureType: "amazon-associate",
    lastReviewedDate: "2026-02-19",
    outOfStockFallback:
      "Fallback to a lightweight moisture-wicking grid base layer with similar fabric weight and stretch blend.",
    premise:
      "Transitional weather fails at the base layer level more often than at the coat level. This pick stabilizes core temperature, moves moisture, and keeps outer layers from doing all the work.",
    whyThisNotPopular:
      "Most people treat base layers as winter-only. This one works as a transitional foundation under lighter outerwear.",
    primaryPick: {
      product: {
        asin: "B09R13R3ZC",
        brand: "Carhartt",
        productName: "Men's UL0171M Force Lightweight Stretch Grid Base Layer Crew",
        priceBand: "$",
        merchant: "amazon",
        imageSourceType: "amazon-official",
        pricePolicy: "best-value",
        affiliateUrl: "/go/grid-base-layer-men-core-warmth/primary/",
        images: [
          {
            src: "/images/grid-base-layer-men-core-warmth-carhartt-men-s-ul0171m-force-lightweight.webp",
            alt: "Men's UL0171M Force Lightweight Stretch by Carhartt — product photo from Solmere Journal review",
            title: "Solmere Journal product image — Grid Base Layer Men Core Warmth",
            caption: "Our top pick: Men's UL0171M Force Lightweight Stretch. Read the full review for our verdict.",
          },
        ],
        shortSpecs:
          "4.7 oz stretch grid fabric with moisture-wicking, odor-fighting performance and flatlock seams.",
      },
      reasons: [
        "Moisture management reduces chill from indoor-outdoor swings",
        "Grid fabric balances warmth and breathability",
        "Flatlock seams improve comfort under layered outfits",
        "Value pricing supports buying multiples for rotation",
      ],
      bestFor: "Men who run cold in mornings and overheat by afternoon",
      notFor: "Anyone wanting heavyweight thermal insulation",
    },
    rationale: {
      whatMatters:
        "Moisture transport, fit under layers, seam comfort, and drying speed",
      whatWeIgnored:
        "Logo graphics, aggressive compression claims, and hype tech language",
      failureModes: [
        "Base layers that trap sweat and cool too slowly",
        "Fabric pilling at friction zones",
        "Necklines that stretch and lose layering shape",
      ],
    },
    whoThisIsFor:
      "You need a reliable first layer for variable days and longer movement windows.",
    whoThisWillAnnoy:
      "You only wear natural-fiber base layers or heavyweight thermals.",
    tags: ["transitional-weather", "base-layer", "men", "performance"],
  },
]

// ============================================================
// UNIVERSAL PICKS (always-valid staple recommendations)
// ============================================================

export interface UniversalPick {
  title: string
  slug: string
  category: Category
  oneLiner: string
}

export const universalPicks: UniversalPick[] = [
  {
    title: "Best plain white tee",
    slug: "only-black-tee",
    category: "men",
    oneLiner: "The foundation piece you stop replacing",
  },
  {
    title: "Best daily earrings",
    slug: "daily-earrings",
    category: "jewelry",
    oneLiner: "Put them in. Forget them. Live.",
  },
  {
    title: "Best everyday chain",
    slug: "everyday-chain",
    category: "women",
    oneLiner: "Catches light. Never catches attention.",
  },
  {
    title: "Best one-hand-fold stroller",
    slug: "baby-monitor-worth-it",
    category: "baby",
    oneLiner: "The one that doesn\u2019t fight back",
  },
]

// ============================================================
// FIELD NOTES (non-product editorials)
// ============================================================

export interface FieldNote {
  slug: string
  title: string
  published: string
  updated: string
  excerpt: string
  category: "valentine" | "style-guide" | "culture"
  featured?: boolean
  tags: string[]
  body: string[]
  relatedCategory?: Category
  relatedTopicSlug?: string
  relatedEditorialSlug?: string
}

export const fieldNotes: FieldNote[] = [
  {
    slug: "solmere-meaning-philosophy",
    title: "Solmere Meaning: The Idea Behind the Solmere Philosophy",
    published: "2026-03-07",
    updated: "2026-03-07",
    excerpt:
      "Solmere is a decision standard: fewer options, stronger filters, and recommendations built to hold up in real life.",
    category: "culture",
    featured: true,
    tags: ["solmere", "editorial-method", "decision-framework", "philosophy"],
    body: [
      "Solmere is two ideas in one word. Sol is clarity. Mere is the edge where land meets water. Together, it means clear judgment at the line where daily life actually happens.",
      "This is not a catalog and it is not a trend feed. It is a recommendation journal built for people who are tired of fake choice. We do not publish ten options to look thorough. We publish one primary recommendation when we can defend it under real use.",
      "The core rule is simple: reduce decision drag. Every page should help you move from uncertainty to action quickly. That means explicit tradeoffs, explicit disqualifiers, and direct language about who a pick is for and who it will annoy.",
      "Solmere is also a quality filter. If a product cannot survive ordinary wear patterns, inconsistent weather, and repeat use, it does not pass. If seller quality is unstable, we either choose a safer default or we do not publish yet.",
      "Authority here comes from constraint, not volume. We publish slower than list sites because we would rather be useful than noisy. If a page cannot lower your cognitive load, it does not belong on the site.",
      "If you want the fastest way to use Solmere: start with a category page, read one recommendation end-to-end, then follow the Continue Reading links. You should leave with a decision, not another research loop.",
    ],
    relatedCategory: "women",
    relatedTopicSlug: "minimal-wardrobe-basics",
    relatedEditorialSlug: "only-black-tee",
  },
  {
    slug: "galentines-woman-gaze-gift-standard",
    title: "Galentine's Standard: Gifts Through the Woman Gaze",
    published: "2026-02-14",
    updated: "2026-02-14",
    excerpt:
      "If it feels like a generic holiday bundle, it is not for her. We buy for texture, intention, and daily use.",
    category: "valentine",
    featured: true,
    tags: ["galentines", "women-only", "gifting"],
    body: [
      "Our rule: no panic gifts. If you could give it to anyone, it is not specific enough for the woman in front of you.",
      "The woman gaze values use and detail over spectacle. She notices finish, feel, and whether you chose with context.",
      "Start with her routine, not your fantasy. What does she touch every day? What would make that hour softer, cleaner, calmer, or bolder?",
      "If you want a shortcut: one useful object, one personal note, one plan that does not require emotional labor from her.",
    ],
  },
  {
    slug: "how-to-find-ring-size-with-string",
    title: "How to Find Ring Size with String (Without Guessing Blind)",
    published: "2026-02-14",
    updated: "2026-02-14",
    excerpt:
      "Wrap, mark, measure in millimeters, then convert. Check twice at two times of day.",
    category: "style-guide",
    featured: true,
    tags: ["ring-size", "jewelry", "practical"],
    body: [
      "Wrap a thin strip of string or paper around the base of the finger. Mark where it overlaps.",
      "Lay it flat and measure the length in millimeters. That is the finger circumference.",
      "Measure at least twice: once mid-day, once evening. Fingers swell; use the larger value if in between sizes.",
      "For wide bands, go up half a size. For slim stacking rings, stay true to measured size.",
    ],
  },
  {
    slug: "who-this-is-for-who-this-annoys",
    title: "Who This Is For / Who This Will Annoy: Our Editorial Filter",
    published: "2026-02-14",
    updated: "2026-02-14",
    excerpt:
      "We disqualify aggressively so readers can decide faster with less anxiety.",
    category: "culture",
    tags: ["editorial-method", "clarity", "decision-fatigue"],
    body: [
      "Every recommendation should include a disqualifier. If everything is for everyone, nothing is trustworthy.",
      "We state who the pick is for and who it will annoy. That is not harshness; that is precision.",
      "If you hate maintenance, we will not sell you delicate ritual objects. If you want statement pieces, we will not pretend basics are exciting.",
      "Good editorial advice removes wrong fits faster than it sells right fits.",
    ],
  },
  {
    slug: "first-date-fit-notes-women",
    title: "First-Date Fit Notes: Calm, Intentional, Not Costume",
    published: "2026-02-14",
    updated: "2026-02-14",
    excerpt:
      "Your goal is ease and clarity. The right outfit should let you pay attention to her, not to your hemline.",
    category: "valentine",
    tags: ["dating", "style", "women-only"],
    body: [
      "Choose one anchor piece and build around it. Do not debut three new things at once.",
      "If you keep adjusting it in the mirror, remove it. Comfort is charisma.",
      "Texture over noise: one tactile detail reads stronger than trend-heavy layering.",
      "Dress for the conversation you want: direct, warm, and present.",
    ],
  },
  {
    slug: "why-cotton-tees-fail-after-washing",
    title: "Why Cotton Tees Fail After Washing",
    published: "2026-02-17",
    updated: "2026-02-17",
    excerpt:
      "Most t-shirt disappointment comes from fiber quality, knit tension, and finishing choices—not just bad luck.",
    category: "style-guide",
    tags: ["cotton", "fabric", "care", "quality"],
    body: [
      "The first failure is usually collar distortion. If the rib knit at the neck is weak or mismatched to body fabric tension, repeated wash-and-dry cycles warp the shape quickly.",
      "The second failure is shrink drift. A tee can lose length in the body while widening at the torso, which changes the silhouette even if the fabric still feels fine.",
      "Low-grade cotton fibers also break down faster under friction and heat, which shows up as pilling and thin spots. That is not just cosmetic; it predicts shorter garment life.",
      "Care instructions matter, but construction matters more. Cold wash and air-dry can extend life, yet a poorly built tee will still collapse earlier than a well-built one.",
    ],
  },
  {
    slug: "why-jewelry-plating-wears-off",
    title: "Why Jewelry Plating Wears Off",
    published: "2026-02-17",
    updated: "2026-02-17",
    excerpt:
      "Plating wear is normal over time, but thickness, base metal, and friction points determine how fast it happens.",
    category: "style-guide",
    tags: ["jewelry", "plating", "materials", "wear"],
    body: [
      "Plating is a surface layer, not a full-metal object. The thinner that layer, the faster high-friction points lose color and reveal the base metal underneath.",
      "Earrings and chains wear differently. Posts, clasps, and links rub against skin, hair products, and fabric, which accelerates abrasion.",
      "Moisture and chemistry speed the process. Sweat, perfume, and lotions can all affect finish longevity, especially with lighter gold-tone coatings.",
      "If you want longer life from plated pieces, reduce friction and moisture exposure. If you want long-term permanence, move to solid-metal options.",
    ],
  },
  {
    slug: "why-leather-cracks-and-how-to-slow-it",
    title: "Why Leather Cracks (and How to Slow It)",
    published: "2026-02-17",
    updated: "2026-02-17",
    excerpt:
      "Cracking is often dryness plus repeated stress at bend points; finish type and leather grade decide the timeline.",
    category: "style-guide",
    tags: ["leather", "maintenance", "durability", "belts"],
    body: [
      "Leather cracks most often where it flexes the same way repeatedly: belt holes, shoe creases, and fold points. Stress localizes there first.",
      "Finish type changes aging behavior. Heavy coatings can look clean initially but may split as they lose flexibility; cleaner finishes tend to patina instead of flake.",
      "Dry heat and overexposure to direct sunlight pull moisture from fibers, reducing elasticity. That turns normal flexing into surface fracture sooner.",
      "The practical rule is simple: rotate use, avoid heat storage, and condition occasionally with restraint. Over-oiling is not a fix for low-grade leather.",
    ],
  },
  {
    slug: "how-sneaker-leather-ages-over-time",
    title: "How Sneaker Leather Ages Over Time",
    published: "2026-02-17",
    updated: "2026-02-17",
    excerpt:
      "Leather sneakers do not just get dirty—they change in structure, crease memory, and surface sheen with wear patterns.",
    category: "style-guide",
    tags: ["sneakers", "leather", "aging", "care"],
    body: [
      "The toe box records your gait first. Crease depth and location reflect movement pattern, not simply hours worn.",
      "Surface sheen changes as top layers abrade. Some leathers age into a softer luster; others become matte and chalky depending on coating and finish.",
      "Sole and upper age at different rates. A sneaker can still look acceptable up top while traction and midsole responsiveness are already compromised.",
      "If replacement cadence matters, track comfort and structure, not just visual condition. A clean shoe can still be mechanically tired.",
    ],
  },
  {
    slug: "fabric-weight-explained-without-jargon",
    title: "Fabric Weight Explained (Without Jargon)",
    published: "2026-02-17",
    updated: "2026-02-17",
    excerpt:
      "Fabric weight helps predict drape, opacity, and durability, but only when read together with weave and fiber composition.",
    category: "style-guide",
    tags: ["fabric", "weight", "fit", "materials"],
    body: [
      "Heavier is not always better. Weight can improve durability and structure, but it can also reduce breathability and increase stiffness.",
      "For tees, fabric weight often predicts how the garment hangs: lighter fabrics skim and move, heavier fabrics hold shape and mask body contour.",
      "Opacity usually improves with weight, though knit density matters too. A dense medium-weight fabric can outperform a loose heavier one.",
      "Use weight as a decision aid, not a verdict. Pair it with fiber type, weave/knit structure, and intended climate to choose correctly.",
    ],
  },
  {
    slug: "what-im-wearing-in-between-weather",
    title: "What I’m Wearing in 38°F to 55°F This Week",
    published: "2026-02-19",
    updated: "2026-02-19",
    excerpt:
      "Personal uniform notes for in-between weather: fewer pieces, cleaner layers, no costume energy.",
    category: "style-guide",
    featured: true,
    tags: ["transitional-weather", "layering", "personal-style", "women-only", "men"],
    body: [
      "This week I am dressing for the band where mornings feel like winter and 2 p.m. feels like a different city. I am not building outfits. I am repeating a small uniform so I can leave the house without negotiating with myself.",
      "My outer layer is light structure, never heavy insulation. I rotate a trench and a waxed jacket depending on wind and rain. If the coat cannot stay on indoors for ten minutes without overheating me, it is the wrong coat for this weather.",
      "Under it, I keep the core simple: tee or oxford, then a thin merino or lambswool layer. The sweater has to breathe. Anything bulky looks dramatic at 8 a.m. and feels miserable by noon.",
      "Neck warmth does more than adding another body layer. A thin scarf under collar keeps me steady in transit and lets the rest of the outfit stay cleaner.",
      "For shoes, I default to leather boots because cold pavement changes everything. If I wear sneakers in this range, I feel it by the second errand and regret it.",
      "Current repeat formulas: tee + merino + car coat + scarf. Oxford + waxed jacket + wool socks + boots. Thermal + hoodie + trench + hat when the wind is rude.",
      "This is the season where discipline beats novelty. I am wearing fewer pieces, more often, and every one has to earn its place by 9 p.m., not just by mirror test at 8 a.m.",
    ],
    relatedCategory: "women",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "trench-for-between-seasons-women",
  },
  {
    slug: "why-gold-plating-turns-skin-green",
    title: "Why Gold Plating Turns Skin Green",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "Skin green is usually metal transfer plus moisture chemistry. The fix is wear strategy, not panic.",
    category: "style-guide",
    tags: ["jewelry", "plating", "sensitive-skin", "daily-wear"],
    body: [
      "Green skin usually means the base metal under plating is reacting with sweat, lotion, or humidity. It does not mean you are allergic to gold itself. It usually means you are wearing thin plating at high-friction points for too long without care breaks.",
      "Most daily wear failures happen at clasp edges, post friction, and areas where perfume lands first. If you apply scent, sunscreen, or body oil after jewelry, you speed up wear. If you apply first, wait, then wear, you slow it down significantly.",
      "For sensitive skin, the practical fix is routine: lower moisture exposure, remove before workouts, wipe after wear, and rotate. Do not expect plated pieces to behave like solid metal forever. Plating is a layer, not a promise.",
      "If a piece keeps staining skin quickly, that is your disqualifier. Keep it for occasional styling and move everyday wear to better plating thickness or solid metal.",
    ],
    relatedCategory: "jewelry",
    relatedTopicSlug: "daily-jewelry-without-regret",
    relatedEditorialSlug: "daily-earrings",
  },
  {
    slug: "how-to-stop-wool-itch",
    title: "How to Stop Wool Itch Without Giving Up Warmth",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "Wool itch is usually fiber diameter plus direct skin contact. You can fix both with layering.",
    category: "style-guide",
    tags: ["wool", "comfort", "layering", "sensitive-skin"],
    body: [
      "Itch is usually not about wool as a category. It is about coarse fibers rubbing high-movement zones like neck, wrist, and underarm. That is why some sweaters feel fine at first and miserable by hour three.",
      "First fix: put a thin base layer between skin and knit. Lightweight merino-compatible tees or stretch base layers change comfort fast without adding bulk. This is the cheapest upgrade with the biggest payoff.",
      "Second fix: avoid dry heat overload. Overheated skin gets more reactive, then everything feels scratchier. If you are sweaty indoors then freezing outside, your layering is fighting itself. Lighter core layers reduce both itch and temperature swings.",
      "If a sweater still irritates with a base layer, stop negotiating with it. Clothing should support your day, not win an endurance contest.",
    ],
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "grid-base-layer-men-core-warmth",
  },
  {
    slug: "how-to-clean-suede-without-darkening",
    title: "How to Clean Suede Without Darkening It",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "Water is the main reason suede darkens. Dry method first, controlled moisture only if needed.",
    category: "style-guide",
    tags: ["suede", "care", "boots", "maintenance"],
    body: [
      "Darkening happens when suede gets over-wet and dries unevenly. Most damage comes from panic-cleaning with too much water. For light dirt, always start dry: suede brush, then suede eraser.",
      "For spot marks, dampen a clean cloth lightly and blend outward instead of scrubbing the center hard. Then brush when fully dry to lift nap. Hard rubbing flattens texture and creates shiny patches that read old fast.",
      "Use protector spray before weather hits, not after damage starts. Prevention matters more than rescue. If you wear suede in wet streets, accept that maintenance is part of ownership.",
      "If you want zero-maintenance footwear, suede is likely the wrong material for your daily route.",
    ],
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "budget-chukka-men-transitional",
  },
  {
    slug: "sweaty-indoors-freezing-outside-fix",
    title: "Sweaty Indoors, Freezing Outside: Fix the Layer Stack",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "This is a layering mismatch problem. Adjust base and mid-layer before blaming the coat.",
    category: "style-guide",
    tags: ["layering", "temperature-control", "transitional-weather", "comfort"],
    body: [
      "If you sweat indoors then freeze outside, your outfit is trapping heat in the wrong layer. Heavy sweaters under heavy coats often overheat quickly, then cold air hits damp fabric and comfort drops fast.",
      "Start with a breathable base, then a thinner mid-layer, then a ventilated outer shell. This gives you range. It also lets you remove one layer without collapsing the whole outfit.",
      "Neck and socks matter more than people think. Warm neck plus dry wool socks often outperforms adding one more thick torso layer.",
      "You do not need ten options. You need one stack that behaves predictably from train platform to office lobby.",
    ],
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "car-coat-between-seasons-men",
  },
  {
    slug: "thick-thighs-chafe-cold-weather-layers",
    title: "Thick Thighs, Chafe, and Cold-Weather Layers",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "Chafe in cold weather is usually friction plus trapped moisture. Fabric choice solves most of it.",
    category: "style-guide",
    tags: ["chafe", "fit", "women-only", "layering"],
    body: [
      "Cold weather chafe is not just a summer issue. Thick thighs plus damp fabric and long walks can create friction fast, especially when base layers ride up under coats.",
      "Use smoother first layers with stretch recovery and avoid seams on high-rub zones. Then keep outer fabrics from gripping inward layers too aggressively. This is a friction system, not a body problem.",
      "Wool socks and stable footwear help because gait changes less when feet stay warm and dry. Small shifts in stride reduce repeated thigh rub over distance.",
      "If a garment needs constant adjustment to prevent chafe, it is not your uniform. Replace it with something your body can trust for a full day.",
    ],
    relatedCategory: "women",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "trench-for-between-seasons-women",
  },
  {
    slug: "why-necklines-stretch-after-washing",
    title: "Why Necklines Stretch After Washing",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "Most stretched necklines come from weak rib knit and heat stress, not one bad wash.",
    category: "style-guide",
    tags: ["fabric", "care", "tees", "durability"],
    body: [
      "A neckline fails when collar rib and body fabric fight each other. If rib structure is weak, heat plus spin tension opens the shape over time and gives you the tired scoop effect.",
      "Dryer heat accelerates it, but it usually starts in construction quality. Better-built collars recover after wash cycles; weak collars drift immediately.",
      "Cold wash and low-heat dry help, but they cannot rescue poor build standards. Treat care as extension, not replacement, of quality.",
      "If neckline shape matters to you, disqualify weak collars early and move on.",
    ],
    relatedCategory: "men",
    relatedTopicSlug: "minimal-wardrobe-basics",
    relatedEditorialSlug: "only-black-tee",
  },
  {
    slug: "keep-boots-from-creasing-hard",
    title: "How to Keep Boots from Creasing Hard at the Toe",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "You cannot stop creases, but you can control how fast they set and how deep they get.",
    category: "style-guide",
    tags: ["boots", "leather", "maintenance", "fit"],
    body: [
      "Creasing is normal. Hard creasing is usually a fit and moisture problem. If the flex point sits wrong, leather folds sharply in one line instead of distributing stress.",
      "Use a correct size, rotate wear days, and let boots dry fully between outings. Wet leather plus repeated flexing is the fastest path to deep set-in lines.",
      "Condition occasionally, not aggressively. Over-conditioning softens structure too much and can worsen shape collapse.",
      "If you want boots to age cleanly, consistency beats hacks: fit right, dry right, rotate right.",
    ],
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "boots-for-cold-ground-men",
  },
  {
    slug: "why-trench-belts-twist",
    title: "Why Trench Belts Twist (and How to Stop It)",
    published: "2026-02-20",
    updated: "2026-02-20",
    excerpt:
      "Twist comes from fabric memory and uneven tension. Set the belt path once, then repeat.",
    category: "style-guide",
    tags: ["trench", "fit", "care", "women-only"],
    body: [
      "Twisting usually starts when the belt is pulled unevenly through loops and stored knotted. Once fabric sets in that memory, it keeps spiraling and makes the coat look sloppy.",
      "Thread belt flat through every loop, smooth by hand, and store untied. If needed, light steam plus hand-flattening resets shape without harsh pressing.",
      "Belt behavior affects the whole silhouette. A clean belt line makes even a simple coat look intentional; a twisted belt makes expensive coats look rushed.",
      "If the belt fights you every wear, retire it and wear the coat open or swap in a cleaner strap.",
    ],
    relatedCategory: "women",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "trench-for-between-seasons-women",
  },
]

export interface TopicCluster {
  slug: string
  title: string
  description: string
  editorialSlugs: string[]
  noteSlugs: string[]
}

export const topicClusters: TopicCluster[] = [
  {
    slug: "minimal-wardrobe-basics",
    title: "Minimal Wardrobe Basics",
    description:
      "Low-noise staples that stay in rotation: tees, socks, belts, and white sneakers with straightforward replacement paths.",
    editorialSlugs: [
      "only-black-tee",
      "socks-for-walking",
      "one-belt-no-crack",
      "white-sneaker-women",
    ],
    noteSlugs: [
      "who-this-is-for-who-this-annoys",
      "first-date-fit-notes-women",
      "solmere-meaning-philosophy",
    ],
  },
  {
    slug: "daily-jewelry-without-regret",
    title: "Daily Jewelry Without Regret",
    description:
      "Jewelry guidance centered on comfort, material clarity, and pieces that survive daily wear without costume energy.",
    editorialSlugs: ["everyday-chain", "daily-earrings"],
    noteSlugs: ["how-to-find-ring-size-with-string", "galentines-woman-gaze-gift-standard"],
  },
  {
    slug: "maternity-and-baby-essentials",
    title: "Maternity and Baby Essentials",
    description:
      "High-trust essentials for demanding seasons: reliable support, less friction, and fewer 3 a.m. surprises.",
    editorialSlugs: ["maternity-bra-no-compromise", "baby-monitor-worth-it"],
    noteSlugs: ["who-this-is-for-who-this-annoys"],
  },
  {
    slug: "transitional-weather-uniforms",
    title: "Transitional Weather Uniforms",
    description:
      "In-between weather structure for 38°F to 55°F: controlled layers, weather-ready outerwear, and footwear that protects comfort.",
    editorialSlugs: [
      "car-coat-between-seasons-men",
      "henry-topcoat-work-rotation-men",
      "waxed-jacket-transitional-men",
      "dakota-waxed-jacket-men",
      "trench-for-between-seasons-women",
      "boots-for-cold-ground-men",
      "budget-chukka-men-transitional",
      "pinch-penny-loafer-cold-dry-days",
      "grid-base-layer-men-core-warmth",
      "cashmere-set-cold-mornings-women",
    ],
    noteSlugs: ["what-im-wearing-in-between-weather"],
  },
]

export interface ComparisonGuide {
  slug: string
  title: string
  published: string
  updated: string
  summary: string
  vs: [string, string]
  sections: { heading: string; content: string }[]
  verdict: string
  relatedCategory: Category
  relatedTopicSlug: string
  relatedEditorialSlug: string
}

export const comparisonGuides: ComparisonGuide[] = [
  {
    slug: "merino-vs-cotton-base-layer-45f",
    title: "Merino vs Cotton Base Layer at 45°F",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary:
      "At 45°F, moisture handling decides comfort more than headline warmth claims.",
    vs: ["Merino", "Cotton"],
    sections: [
      { heading: "Moisture Behavior", content: "Merino manages moisture swings better when you are sweaty indoors then freezing outside. Cotton can feel fine dry, then cold once damp." },
      { heading: "Daily Comfort", content: "Cotton often wins on immediate softness and cost. Merino wins on longer wear windows where temperature shifts repeatedly." },
      { heading: "Who Should Choose What", content: "If your day moves between transit and heated spaces, merino is usually more stable. If your day is short and low-sweat, cotton can be enough." },
    ],
    verdict: "For transitional commuting, merino is the safer default for comfort stability.",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "grid-base-layer-men-core-warmth",
  },
  {
    slug: "gold-vermeil-vs-gold-plated-daily-wear",
    title: "Gold Vermeil vs Gold-Plated for Daily Wear",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary:
      "Both are layered gold finishes, but thickness and base metal change how fast wear shows.",
    vs: ["Gold Vermeil", "Gold-Plated"],
    sections: [
      { heading: "Construction Difference", content: "Vermeil typically uses thicker gold over sterling silver. Generic plated pieces vary widely and can wear through faster." },
      { heading: "Skin and Wear Pattern", content: "High-friction points reveal differences quickly. Sweat, lotion, and friction accelerate wear on both." },
      { heading: "Buying Decision", content: "For true daily wear, prioritize explicit metal specs, not just color and styling photos." },
    ],
    verdict: "If budget allows, choose higher-spec layering; otherwise rotate plated pieces and treat them as finite-lifespan items.",
    relatedCategory: "jewelry",
    relatedTopicSlug: "daily-jewelry-without-regret",
    relatedEditorialSlug: "everyday-chain",
  },
  {
    slug: "waxed-jacket-vs-wool-topcoat-rainy-commute",
    title: "Waxed Jacket vs Wool Topcoat for Rainy Commutes",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary:
      "Both can work in transitional weather; rain and movement level decide the winner.",
    vs: ["Waxed Jacket", "Wool Topcoat"],
    sections: [
      { heading: "Weather Control", content: "Waxed shells handle light rain better. Wool topcoats manage dry wind and formal environments better." },
      { heading: "Indoor Behavior", content: "Topcoats usually breathe better indoors. Heavier waxed builds can feel warmer once inside." },
      { heading: "Use-Case Fit", content: "Choose waxed for weather volatility and topcoat for office polish when forecast is mostly dry." },
    ],
    verdict: "Rain-heavy days favor waxed shells; dry office days favor topcoats.",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "waxed-jacket-transitional-men",
  },
  {
    slug: "boots-vs-loafers-cold-dry-days",
    title: "Boots vs Loafers on Cold but Dry Days",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary:
      "Ground cold and walking distance matter more than style labels.",
    vs: ["Boots", "Loafers"],
    sections: [
      { heading: "Thermal Stability", content: "Boots usually insulate better from cold pavement and support longer walking distances." },
      { heading: "Visual Line", content: "Loafers create a cleaner, lighter profile for office and dinner contexts." },
      { heading: "Decision Shortcut", content: "If you walk a lot or weather is uncertain, choose boots. If your route is short and dry, loafers can work with wool socks." },
    ],
    verdict: "Use boots for function-first days, loafers for polished short-route days.",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "boots-for-cold-ground-men",
  },
  {
    slug: "trench-vs-car-coat-40-to-55",
    title: "Trench vs Car Coat at 40°F to 55°F",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary:
      "Both are transitional staples; choose by rain exposure and silhouette goal.",
    vs: ["Trench", "Car Coat"],
    sections: [
      { heading: "Fabric and Weather", content: "Trenches with water resistance are better for wet streets. Wool car coats are stronger in dry cool wind." },
      { heading: "Silhouette", content: "Trench lines are longer and sharper through waist. Car coats are compact and straightforward." },
      { heading: "Daily Use", content: "Choose trench for polish and rain flexibility, car coat for simple throw-on utility." },
    ],
    verdict: "For mixed rain forecasts, trench wins; for dry-cool repeat use, car coat wins.",
    relatedCategory: "women",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "trench-for-between-seasons-women",
  },
  {
    slug: "cashmere-set-vs-acrylic-knit-accessories",
    title: "Cashmere Set vs Acrylic Knit Accessories",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary:
      "This is a comfort consistency decision, not a trend decision.",
    vs: ["Cashmere", "Acrylic Knit"],
    sections: [
      { heading: "Skin Feel", content: "Cashmere generally feels softer and less abrasive in neck zones; acrylic can feel prickly during long wear." },
      { heading: "Warmth-to-Weight", content: "Cashmere tends to deliver warmth with less bulk, which helps transitional layering." },
      { heading: "Cost Reality", content: "Acrylic is cheaper upfront. Cashmere can be better value if worn repeatedly and cared for correctly." },
    ],
    verdict: "If comfort and repeat wear matter, cashmere usually performs better despite higher upfront cost.",
    relatedCategory: "women",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "cashmere-set-cold-mornings-women",
  },
]

export interface GlossaryEntry {
  slug: string
  term: string
  title: string
  definition: string
  whyItMatters: string
  relatedCategory: Category
  relatedTopicSlug: string
  relatedEditorialSlug: string
}

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "gsm-meaning",
    term: "GSM",
    title: "GSM Meaning in Clothing",
    definition: "GSM means grams per square meter. It indicates fabric weight, not absolute quality.",
    whyItMatters: "Higher GSM often means more structure and opacity, but can reduce breathability.",
    relatedCategory: "men",
    relatedTopicSlug: "minimal-wardrobe-basics",
    relatedEditorialSlug: "only-black-tee",
  },
  {
    slug: "full-grain-vs-corrected-grain",
    term: "Full-Grain vs Corrected-Grain",
    title: "Full-Grain vs Corrected-Grain Leather",
    definition: "Full-grain keeps the natural surface; corrected-grain is sanded and finished for a more uniform look.",
    whyItMatters: "It affects durability, patina behavior, and how leather ages under repeated flex.",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "boots-for-cold-ground-men",
  },
  {
    slug: "micron-plating-explained",
    term: "Micron Plating",
    title: "Micron Plating Explained",
    definition: "Micron refers to plating thickness. Higher micron values generally indicate thicker gold coating.",
    whyItMatters: "Thicker plating usually lasts longer under daily friction and moisture exposure.",
    relatedCategory: "jewelry",
    relatedTopicSlug: "daily-jewelry-without-regret",
    relatedEditorialSlug: "everyday-chain",
  },
  {
    slug: "vermeil-meaning",
    term: "Vermeil",
    title: "What Vermeil Means",
    definition: "Vermeil is gold plating over sterling silver with specific thickness standards.",
    whyItMatters: "It helps buyers separate higher-spec plated jewelry from generic thin plating.",
    relatedCategory: "jewelry",
    relatedTopicSlug: "daily-jewelry-without-regret",
    relatedEditorialSlug: "daily-earrings",
  },
  {
    slug: "waxed-cotton-meaning",
    term: "Waxed Cotton",
    title: "Waxed Cotton Meaning",
    definition: "Waxed cotton is cotton fabric treated with wax to improve water resistance and wind blocking.",
    whyItMatters: "It performs well in variable weather and can be re-waxed for longer lifespan.",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "waxed-jacket-transitional-men",
  },
  {
    slug: "last-shape-shoe-fit",
    term: "Shoe Last",
    title: "Shoe Last Shape and Fit",
    definition: "A last is the mold used to shape a shoe. It determines toe room, instep feel, and overall fit profile.",
    whyItMatters: "Two shoes in the same size can fit very differently because of last shape.",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "pinch-penny-loafer-cold-dry-days",
  },
  {
    slug: "rib-knit-collar",
    term: "Rib Knit Collar",
    title: "Rib Knit Collar Explained",
    definition: "Rib knit collars use elastic knit structure around neck openings to recover after stretch.",
    whyItMatters: "Weak rib knit is a top reason t-shirt necklines warp after washing.",
    relatedCategory: "men",
    relatedTopicSlug: "minimal-wardrobe-basics",
    relatedEditorialSlug: "only-black-tee",
  },
]

export interface HowToGuideStep {
  name: string
  description: string
}

export interface HowToGuide {
  slug: string
  title: string
  published: string
  updated: string
  intro: string
  supplies: string[]
  steps: HowToGuideStep[]
  totalTime: string
  relatedCategory: Category
  relatedTopicSlug: string
  relatedEditorialSlug: string
}

export const howToGuides: HowToGuide[] = [
  {
    slug: "find-ring-size-with-string-howto",
    title: "How to Find Ring Size with String",
    published: "2026-02-20",
    updated: "2026-02-20",
    intro: "A fast at-home method that reduces blind guessing before you buy.",
    supplies: ["Thin string or paper strip", "Pen", "Ruler with millimeters"],
    steps: [
      { name: "Wrap and mark", description: "Wrap string at the finger base and mark overlap point without pulling tight." },
      { name: "Measure in mm", description: "Lay string flat and measure the marked length in millimeters." },
      { name: "Check twice", description: "Measure midday and evening, then use the larger number if between sizes." },
      { name: "Adjust for band width", description: "For wide bands, go up half a size to preserve comfort." },
    ],
    totalTime: "10 minutes",
    relatedCategory: "jewelry",
    relatedTopicSlug: "daily-jewelry-without-regret",
    relatedEditorialSlug: "everyday-chain",
  },
  {
    slug: "boot-break-in-without-blisters",
    title: "How to Break In Boots Without Blisters",
    published: "2026-02-20",
    updated: "2026-02-20",
    intro: "Break-in should be progressive, not painful.",
    supplies: ["Wool socks", "Bandage tape", "Leather conditioner (optional)"],
    steps: [
      { name: "Start with short wear windows", description: "Wear boots indoors for 30-60 minutes before full-day use." },
      { name: "Protect friction zones", description: "Tape heel and toe hot spots before longer walks." },
      { name: "Rotate wear days", description: "Alternate footwear for the first week so leather can recover shape." },
      { name: "Condition lightly", description: "Use minimal conditioner after initial wear if leather feels rigid." },
    ],
    totalTime: "7 days",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "boots-for-cold-ground-men",
  },
  {
    slug: "trench-layering-40-to-55",
    title: "How to Layer a Trench at 40°F to 55°F",
    published: "2026-02-20",
    updated: "2026-02-20",
    intro: "Use the trench as weather control, not as your only warmth source.",
    supplies: ["Light base layer", "Thin knit", "Scarf"],
    steps: [
      { name: "Build the core", description: "Start with breathable base plus thin knit for indoor comfort." },
      { name: "Add trench as shell", description: "Use trench as wind and drizzle barrier, not insulation." },
      { name: "Stabilize neck warmth", description: "Add scarf when wind picks up instead of adding bulky sweater layers." },
      { name: "Adjust by hour", description: "Remove or loosen one layer indoors to avoid sweat-chill cycles." },
    ],
    totalTime: "5 minutes",
    relatedCategory: "women",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "trench-for-between-seasons-women",
  },
  {
    slug: "clean-suede-boots-howto",
    title: "How to Clean Suede Boots Without Darkening",
    published: "2026-02-20",
    updated: "2026-02-20",
    intro: "Dry method first, minimal moisture only when required.",
    supplies: ["Suede brush", "Suede eraser", "Soft cloth"],
    steps: [
      { name: "Brush dry dirt", description: "Brush gently in one direction to remove loose dirt and raise nap." },
      { name: "Use eraser on marks", description: "Rub stains lightly with suede eraser until lifted." },
      { name: "Spot-clean carefully", description: "Use barely damp cloth for stubborn spots, blending outward." },
      { name: "Dry and reset nap", description: "Let dry fully, then brush again to restore texture." },
    ],
    totalTime: "20 minutes",
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlug: "budget-chukka-men-transitional",
  },
]

export interface UseCaseGuide {
  slug: string
  title: string
  published: string
  updated: string
  summary: string
  whoThisIsFor: string
  whoThisAnnoys: string
  checklist: string[]
  relatedCategory: Category
  relatedTopicSlug: string
  relatedEditorialSlugs: string[]
}

export const useCaseGuides: UseCaseGuide[] = [
  {
    slug: "minimal-wardrobe-broad-shoulders",
    title: "Minimal Wardrobe for Broad Shoulders",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary: "Use proportion control and clean structure to avoid boxy layering.",
    whoThisIsFor: "You want fewer pieces that sit cleanly on broader frames.",
    whoThisAnnoys: "You prefer oversized trend silhouettes and heavy layering volume.",
    checklist: [
      "Prioritize shoulder seams that land exactly at edge, not beyond.",
      "Choose midweight layers over bulky knits.",
      "Use longer outerwear lines to balance width.",
      "Keep footwear grounded to stabilize proportion.",
    ],
    relatedCategory: "men",
    relatedTopicSlug: "minimal-wardrobe-basics",
    relatedEditorialSlugs: ["only-black-tee", "car-coat-between-seasons-men"],
  },
  {
    slug: "sensitive-skin-jewelry-guide",
    title: "Sensitive Skin Jewelry Guide",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary: "Filter by metal behavior first, aesthetics second.",
    whoThisIsFor: "You react to mystery metal and need lower-irritation daily options.",
    whoThisAnnoys: "You are fine rotating cheap trend jewelry regardless of skin response.",
    checklist: [
      "Check metal specs before checkout.",
      "Avoid fragrance contact before wear.",
      "Rotate pieces and wipe after use.",
      "Disqualify items that stain skin quickly.",
    ],
    relatedCategory: "jewelry",
    relatedTopicSlug: "daily-jewelry-without-regret",
    relatedEditorialSlugs: ["everyday-chain", "daily-earrings"],
  },
  {
    slug: "postpartum-bra-fit-checklist",
    title: "Postpartum Bra Fit Checklist",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary: "Fit should adapt through feeding cycles without pain or fiddly hardware.",
    whoThisIsFor: "You need support and fast access at 3 a.m. without discomfort.",
    whoThisAnnoys: "You prioritize lace aesthetics over comfort and access speed.",
    checklist: [
      "Band stays flat without rolling.",
      "Cup handles size fluctuation across day.",
      "Clasp works one-handed in low light.",
      "Fabric stays soft after repeat washes.",
    ],
    relatedCategory: "maternity",
    relatedTopicSlug: "maternity-and-baby-essentials",
    relatedEditorialSlugs: ["maternity-bra-no-compromise"],
  },
  {
    slug: "commuter-weather-swing-uniform",
    title: "Commuter Uniform for Weather Swings",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary: "Solve sweaty indoors then freezing outside with stable layer sequencing.",
    whoThisIsFor: "You move between street cold and overheated interiors daily.",
    whoThisAnnoys: "You only need one-climate outfits all day.",
    checklist: [
      "Breathable base layer first.",
      "Thin thermal mid-layer, not bulky knit stack.",
      "Ventilated weather shell.",
      "Neck warmth and wool socks for control.",
    ],
    relatedCategory: "men",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlugs: ["grid-base-layer-men-core-warmth", "waxed-jacket-transitional-men"],
  },
  {
    slug: "thick-thighs-no-chafe-style-checklist",
    title: "No-Chafe Style Checklist for Thick Thighs",
    published: "2026-02-20",
    updated: "2026-02-20",
    summary: "Reduce friction with fabric and fit strategy instead of constant adjusting.",
    whoThisIsFor: "You want comfort-led styling with fewer mid-day adjustments.",
    whoThisAnnoys: "You are fine wearing pieces that require constant fixing.",
    checklist: [
      "Use smooth base layers in high-rub zones.",
      "Avoid seam-heavy inner-thigh construction.",
      "Prioritize stable stride footwear.",
      "Disqualify garments that ride up by hour two.",
    ],
    relatedCategory: "women",
    relatedTopicSlug: "transitional-weather-uniforms",
    relatedEditorialSlugs: ["trench-for-between-seasons-women", "cashmere-set-cold-mornings-women"],
  },
]

// ============================================================
// GO REDIRECT MAP (centralized affiliate destinations)
// ============================================================

export interface GoRedirectTarget {
  slug: string
  pick: PickSlot
  label: string
  destinationUrl: string
}

export const goRedirectTargets: GoRedirectTarget[] = [
  {
    slug: "only-black-tee",
    pick: "primary",
    label: "Calvin Klein Men's Cotton Classics 3-Pack Undershirts",
    destinationUrl: "https://www.amazon.com/dp/B085HQD385?tag=greenoamongog-20",
  },
  {
    slug: "only-black-tee",
    pick: "secondary",
    label: "Hanes Men's Short Sleeve Beefy-T",
    destinationUrl: "https://www.amazon.com/dp/B00JUM78PO?tag=greenoamongog-20",
  },
  {
    slug: "one-belt-no-crack",
    pick: "primary",
    label: "Levi’s Men’s 2-in-1 Reversible Belt",
    destinationUrl: "https://www.amazon.com/dp/B01M26TKID?tag=greenoamongog-20",
  },
  {
    slug: "socks-for-walking",
    pick: "primary",
    label: "Darn Tough Vermont Men's Hiker Midweight Micro Crew Sock (1466)",
    destinationUrl: "https://www.amazon.com/dp/B000XFW6O0?tag=greenoamongog-20",
  },
  {
    slug: "everyday-chain",
    pick: "primary",
    label: "DEARMAY 14K Gold Plated Herringbone Choker Snake Chain",
    destinationUrl: "https://www.amazon.com/dp/B0B6H8BDJM?tag=greenoamongog-20",
  },
  {
    slug: "white-sneaker-women",
    pick: "primary",
    label: "adidas Women's Grand Court 2.0 Tennis Shoe",
    destinationUrl: "https://www.amazon.com/dp/B09KMGS7WY?tag=greenoamongog-20",
  },
  {
    slug: "daily-earrings",
    pick: "primary",
    label: "PAVOI 14K Gold Plated Lightweight Chunky Open Hoops",
    destinationUrl: "https://www.amazon.com/dp/B0C2DJD7M5?tag=greenoamongog-20",
  },
  {
    slug: "maternity-bra-no-compromise",
    pick: "primary",
    label: "Kindred Bravely French Terry Nursing Bra (Racerback Crossover)",
    destinationUrl: "https://www.amazon.com/dp/B0D14GJT7T?tag=greenoamongog-20",
  },
  {
    slug: "baby-monitor-worth-it",
    pick: "primary",
    label: "eufy Security Video Baby Monitor 720P",
    destinationUrl: "https://www.amazon.com/dp/B07GBP3GH9?tag=greenoamongog-20",
  },
  {
    slug: "car-coat-between-seasons-men",
    pick: "primary",
    label: "Cole Haan Men's Button Up Wool Plush Car Coat",
    destinationUrl: "https://www.amazon.com/dp/B01LYFL7F4?tag=greenoamongog-20",
  },
  {
    slug: "waxed-jacket-transitional-men",
    pick: "primary",
    label: "Huckberry Flint and Tinder Waxed Trucker Jacket",
    destinationUrl: "https://www.amazon.com/dp/B0BVN2XZFL?tag=greenoamongog-20",
  },
  {
    slug: "trench-for-between-seasons-women",
    pick: "primary",
    label: "LONDON FOG Women's Single Breasted Long Trench Coat",
    destinationUrl: "https://www.amazon.com/dp/B082N4KY9W?tag=greenoamongog-20",
  },
  {
    slug: "boots-for-cold-ground-men",
    pick: "primary",
    label: "Thursday Boot Company Captain Men's Lace-up Boot",
    destinationUrl: "https://www.amazon.com/dp/B07PP53522?tag=greenoamongog-20",
  },
  {
    slug: "henry-topcoat-work-rotation-men",
    pick: "primary",
    label: "Dockers Men's The Henry Wool Blend Top Coat",
    destinationUrl: "https://www.amazon.com/dp/B07T2C8W32?tag=greenoamongog-20",
  },
  {
    slug: "dakota-waxed-jacket-men",
    pick: "primary",
    label: "Legendary Whitetails Men's Waxed Cotton Water Resistant Jacket",
    destinationUrl: "https://www.amazon.com/dp/B0CRDCM7PM?tag=greenoamongog-20",
  },
  {
    slug: "cashmere-set-cold-mornings-women",
    pick: "primary",
    label: "Fishers Finery Women's 3 Piece 100% Cashmere Set",
    destinationUrl: "https://www.amazon.com/dp/B0973RGR3T?tag=greenoamongog-20",
  },
  {
    slug: "budget-chukka-men-transitional",
    pick: "primary",
    label: "Bruno Marc Men's Classic Dress Casual Chukka Boots 2.0",
    destinationUrl: "https://www.amazon.com/dp/B015EW2IQ2?tag=greenoamongog-20",
  },
  {
    slug: "pinch-penny-loafer-cold-dry-days",
    pick: "primary",
    label: "Cole Haan Men's Pinch Penny Loafer",
    destinationUrl: "https://www.amazon.com/dp/B00B1I6EP0?tag=greenoamongog-20",
  },
  {
    slug: "grid-base-layer-men-core-warmth",
    pick: "primary",
    label: "Carhartt Men's UL0171M Force Lightweight Stretch Grid Base Layer Crew",
    destinationUrl: "https://www.amazon.com/dp/B09R13R3ZC?tag=greenoamongog-20",
  },
]

export function getGoRedirectTarget(slug: string, pick: PickSlot) {
  return goRedirectTargets.find((target) => target.slug === slug && target.pick === pick)
}

// ============================================================
// HELPERS
// ============================================================

export function getFieldNoteBySlug(slug: string): FieldNote | undefined {
  return fieldNotes.find((note) => note.slug === slug)
}

export function getFeaturedFieldNotes(): FieldNote[] {
  return fieldNotes.filter((note) => note.featured)
}

export function getTopicClusterBySlug(slug: string): TopicCluster | undefined {
  return topicClusters.find((cluster) => cluster.slug === slug)
}

export function getComparisonGuideBySlug(slug: string): ComparisonGuide | undefined {
  return comparisonGuides.find((guide) => guide.slug === slug)
}

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((entry) => entry.slug === slug)
}

export function getHowToGuideBySlug(slug: string): HowToGuide | undefined {
  return howToGuides.find((guide) => guide.slug === slug)
}

export function getUseCaseGuideBySlug(slug: string): UseCaseGuide | undefined {
  return useCaseGuides.find((guide) => guide.slug === slug)
}

export function getEditorialByAnySlug(slug: string): Editorial | undefined {
  return editorials.find((e) => e.slug === slug)
}

export function getRelatedEditorials(editorial: Editorial, limit = 3): Editorial[] {
  const sameCategory = editorials.filter(
    (candidate) =>
      candidate.slug !== editorial.slug &&
      candidate.category === editorial.category
  )

  const tagOverlap = editorials.filter((candidate) => {
    if (candidate.slug === editorial.slug) return false
    return candidate.tags.some((tag) => editorial.tags.includes(tag))
  })

  const unique = new Map<string, Editorial>()
  ;[...sameCategory, ...tagOverlap].forEach((item) => unique.set(item.slug, item))
  const base = Array.from(unique.values())
  if (base.length >= limit) return base.slice(0, limit)

  const filler = editorials.filter(
    (candidate) =>
      candidate.slug !== editorial.slug && !base.some((picked) => picked.slug === candidate.slug)
  )

  return [...base, ...filler].slice(0, limit)
}

export function getRelatedFieldNotes(editorial: Editorial, limit = 2): FieldNote[] {
  const matchByTag = fieldNotes.filter((note) =>
    note.tags.some((tag) => editorial.tags.includes(tag))
  )

  const matchByCategory = fieldNotes.filter((note) => {
    if (note.category === "valentine" && editorial.category === "women") return true
    if (note.category === "style-guide" && editorial.category === "jewelry") return true
    if (note.category === "culture") return true
    return false
  })

  const unique = new Map<string, FieldNote>()
  ;[...matchByTag, ...matchByCategory].forEach((item) => unique.set(item.slug, item))
  return Array.from(unique.values()).slice(0, limit)
}

export function getEditorialsByCategory(category: Category): Editorial[] {
  return editorials.filter((e) => e.category === category)
}

export function getEditorialBySlug(
  category: Category,
  slug: string
): Editorial | undefined {
  return editorials.find((e) => e.category === category && e.slug === slug)
}

export function getFeaturedEditorials(): Editorial[] {
  return editorials.filter((e) => e.featured)
}

export function getMonthlyPicks(month: string): Editorial[] {
  return editorials.filter((e) => e.monthPick === month)
}

export function getEditorialsByPersona(persona: PersonaSlug): Editorial[] {
  return editorials.filter((e) => e.persona === persona)
}

export function getPersonaBySlug(slug: PersonaSlug): Persona | undefined {
  return personas[slug]
}

export function getAllCategories(): Category[] {
  return ["men", "women", "jewelry", "maternity", "baby"]
}
