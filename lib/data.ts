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
}

export const fieldNotes: FieldNote[] = [
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
    slug: "between-winter-and-spring-outfits",
    title: "Between Winter and Spring Outfits (38°F to 55°F)",
    published: "2026-02-18",
    updated: "2026-02-18",
    excerpt:
      "Not winter dressing, not spring dressing. Transitional weather is about breathable warmth and fewer wrong layers.",
    category: "style-guide",
    featured: true,
    tags: ["transitional-weather", "outfit-formula", "layering", "materials"],
    body: [
      "People do not need more clothes. They need fewer wrong ones. Transitional weather is where heavy coats overheat indoors and light sweaters leave you cold outside. The goal is breathable warmth.",
      "What actually works starts with the breathable coat. You want light structure, not heavy insulation: wool car coats, unlined trenches, chore coats, or waxed cotton jackets. These hold warmth outside but vent enough indoors so you do not trigger the sweat-then-cold cycle.",
      "Neck warmth matters more than most people think. Keeping the neck covered changes comfort faster than adding a heavy torso layer. A thin wool scarf, silk scarf under a collar, or a rib knit balaclava does more than bulky outer layers in this temperature band.",
      "The right sweater is usually thinner than people choose. Merino, lambswool, and brushed cotton fleece often outperform thick acrylic knits because they regulate better between street, transit, and indoor heat.",
      "Footwear decides whether your whole body feels cold. Ground conduction is real at 38°F to 55°F. Leather boots, suede boots, and lug-sole loafers with wool socks maintain warmth more consistently than sneakers in wet or cold pavement conditions.",
      "A repeatable formula helps: warm core + ventilated outer + protected extremities. Example set one: tee + merino sweater + car coat + scarf. Example set two: oxford shirt + chore coat + wool socks + boots. Example set three: thermal + hoodie + trench + hat.",
      "Avoid building these outfits around one oversized piece. Transitional comfort usually comes from balanced layers you can subtract without collapsing the whole system.",
      "Research shortlist (ASIN references): B01LYFL7F4 (Cole Haan wool plush car coat), B07T2C8W32 (Dockers wool blend top coat), B082N4KY9W (London Fog long trench), B0CRDCM7PM (Legendary Whitetails waxed cotton coat), B0BVN2XZFL (Flint and Tinder waxed trucker), B0973RGR3T (Fishers Finery cashmere set), B07PP53522 (Thursday Captain boot), B015EW2IQ2 (Bruno Marc chukka), B00B1I6EP0 (Cole Haan penny loafer), B09R13R3ZC (Carhartt base layer).",
    ],
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
    noteSlugs: ["who-this-is-for-who-this-annoys", "first-date-fit-notes-women"],
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
