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
  premise: string
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
    title: "The Only Black T-Shirt That Doesn\u2019t Go Sad After 10 Washes",
    category: "men",
    persona: "minimalist",
    published: "2026-01-15",
    updated: "2026-02-10",
    premise:
      "Most black tees fade to a murky charcoal within weeks. We optimized for dye retention, neckline structure, and the kind of fit that works tucked or untucked without looking like a decision. We ignored trends, graphic prints, and anything that requires a specific body type to look right.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE1",
        brand: "Asket",
        productName: "The T-Shirt \u2014 Black",
        priceBand: "$$",
        affiliateUrl: "#",
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
        asin: "B09EXAMPLE2",
        brand: "Sunspel",
        productName: "Classic Crew Neck T-Shirt",
        priceBand: "$$$",
        affiliateUrl: "#",
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
    title: "The One Belt That Won\u2019t Crack at the Edges",
    category: "men",
    persona: "performance-analyst",
    published: "2026-01-20",
    updated: "2026-02-08",
    premise:
      "Edge paint on most leather belts cracks within months. We looked for belts with burnished or turned edges\u2014construction methods that age instead of deteriorate. We ignored fashion buckles and reversible gimmicks.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE3",
        brand: "Anderson\u2019s",
        productName: "Hand-Painted Leather Belt",
        priceBand: "$$$",
        affiliateUrl: "#",
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
    premise:
      "We tested socks on real commutes, not treadmills. The winner had to survive 10,000+ steps without bunching, manage moisture without odor, and maintain elasticity after dozens of washes. We didn\u2019t care about color variety or gift packaging.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE4",
        brand: "Darn Tough",
        productName: "Micro Crew Light Hiker",
        priceBand: "$$",
        affiliateUrl: "#",
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
    featured: true,
    monthPick: "2026-02",
    tags: ["basics", "everyday", "value"],
  },

  // ---- WOMEN ----
  {
    slug: "everyday-chain",
    title: "The One Everyday Chain That Doesn\u2019t Look Cheap",
    category: "women",
    persona: "luxury-curator",
    published: "2026-01-10",
    updated: "2026-02-13",
    premise:
      "An everyday chain should disappear into your neckline and catch light at the right moments. We tested for clasp security, tarnish resistance, and that ineffable quality where something looks effortless but clearly isn\u2019t. We ignored plated options entirely.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE5",
        brand: "Mejuri",
        productName: "Solid Gold Box Chain",
        priceBand: "$$$",
        affiliateUrl: "#",
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
    featured: true,
    monthPick: "2026-02",
    tags: ["jewelry", "everyday", "investment-piece"],
  },
  {
    slug: "white-sneaker-women",
    title: "The White Sneaker That Actually Cleans Up",
    category: "women",
    persona: "minimalist",
    published: "2026-01-25",
    updated: "2026-02-10",
    premise:
      "Most white sneakers look perfect for two weeks, then become a restoration project. We optimized for leather that wipes clean, a sole that doesn\u2019t yellow, and a silhouette refined enough for ankle-crop trousers. We ignored chunky soles and logo-heavy designs.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE6",
        brand: "Common Projects",
        productName: "Original Achilles Low",
        priceBand: "$$$",
        affiliateUrl: "#",
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
    featured: true,
    tags: ["footwear", "everyday", "wardrobe-foundation"],
  },

  // ---- JEWELRY ----
  {
    slug: "daily-earrings",
    title: "The Daily Earrings You\u2019ll Forget You\u2019re Wearing",
    category: "jewelry",
    persona: "minimalist",
    published: "2026-01-18",
    updated: "2026-02-11",
    premise:
      "Daily earrings should be invisible until they\u2019re noticed. We tested for overnight comfort, shower safety, and the kind of understated finish that doesn\u2019t scream \u201cI\u2019m trying.\u201d We rejected anything that required removal before sleep.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE7",
        brand: "Automic Gold",
        productName: "Solid Gold Huggie Hoops",
        priceBand: "$$$",
        affiliateUrl: "#",
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
    premise:
      "Most maternity bras trade support for stretch and call it comfortable. We looked for actual engineering: wide bands that distribute weight, cups that adapt across sizes, and nursing access that doesn\u2019t require an engineering degree at 3am.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE8",
        brand: "Kindred Bravely",
        productName: "French Terry Racerback Nursing Bra",
        priceBand: "$",
        affiliateUrl: "#",
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
    featured: true,
    monthPick: "2026-02",
    tags: ["essentials", "comfort", "nursing"],
  },

  // ---- BABY ----
  {
    slug: "baby-monitor-worth-it",
    title: "The Only Baby Monitor Worth Paying For",
    category: "baby",
    persona: "performance-analyst",
    published: "2026-02-05",
    updated: "2026-02-13",
    premise:
      "The baby monitor market is an anxiety machine. We cut through the feature bloat and tested what actually matters: connection reliability, night vision clarity, and audio that doesn\u2019t wake the baby when you check. We ignored app ecosystems and AI sleep tracking.",
    primaryPick: {
      product: {
        asin: "B09EXAMPLE9",
        brand: "eufy",
        productName: "SpaceView Pro Baby Monitor",
        priceBand: "$$",
        affiliateUrl: "#",
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
// HELPERS
// ============================================================

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
