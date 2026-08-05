/**
 * generate-pages.mjs
 * Post-build script: creates per-route HTML files with unique <title> and
 * <link rel="canonical"> so Google sees the correct metadata on every page
 * even when it crawls without JavaScript.
 *
 * Run automatically via "postbuild" in package.json AFTER vite build.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist/public");
const BASE = "https://faisalorakzai.com";

/* ──────────────────────────────────────────────────────────────
   Per-route metadata map
   Add / edit entries here whenever a new page is added.
   ────────────────────────────────────────────────────────────── */
const ROUTES = [
  {
    path: "founder",
    title: "Faisal Orakzai — Founder Biography | Chairman, Orakzai Group | فیصل اورکزئی",
    description:
      "Full biography of Muhammad Faisal Orakzai — born 30 April 2006, Orakzai Agency KPK Pakistan. Founder & Chairman of Orakzai Group, blockchain architect, AI entrepreneur.",
    ogType: "profile",
  },
  {
    path: "ecosystem",
    title: "Orakzai Ecosystem — Ventures, Blockchain & AI Infrastructure | Faisal Orakzai",
    description:
      "Complete overview of Orakzai Group ecosystem: OKBOND on Polygon, Shamim Forever luxury brand, OkzByte Technology, OrakzaiX AI, QORIX, and Orakzai Real Estate.",
    ogType: "website",
  },
  {
    path: "research",
    title: "Research & Publications — Blockchain, AI, DeFi | Faisal Orakzai",
    description:
      "Research papers, white papers, and technical publications by Faisal Orakzai covering blockchain architecture, DeFi, AI automation, and Pakistan's digital economy. ORCID: 0009-0000-0915-7272.",
    ogType: "website",
  },
  {
    path: "press",
    title: "Press & Media Coverage — Faisal Orakzai | Orakzai Group",
    description:
      "Press coverage, interviews, awards and media appearances of Faisal Orakzai and Orakzai Group — Stevie Gold Award, GMA Silicon Valley, PRLog, Hackernoon, Crunchbase Rank #28.",
    ogType: "website",
  },
  {
    path: "benchmarks",
    title: "Benchmarks — Personal Architecture | Faisal Orakzai",
    description:
      "Three personal benchmarks and sovereign principles of Muhammad Faisal Orakzai — Founder & Chairman of Orakzai Group. Personal. Sovereign. Non-negotiable.",
    ogType: "website",
  },
  {
    path: "investment",
    title: "Investment — Orakzai Group Sovereign Capital Framework | Faisal Orakzai",
    description:
      "Investment thesis, OKBOND tokenomics, portfolio sectors, and strategic capital framework of Orakzai Group. Blockchain, AI, luxury, real estate.",
    ogType: "website",
  },
  {
    path: "media",
    title: "Media Gallery — Faisal Orakzai | Events & International Appearances",
    description:
      "Photo and video gallery from Faisal Orakzai's global appearances — Wall Street New York, Düsseldorf Germany, Silicon Valley, and Pakistan events.",
    ogType: "website",
  },
  {
    path: "learning",
    title: "Learning Hub — Blockchain, AI & Entrepreneurship | Faisal Orakzai",
    description:
      "Educational resources, insights and knowledge shared by Faisal Orakzai on blockchain, AI, entrepreneurship, and Pakistan's digital future.",
    ogType: "website",
  },
  {
    path: "contact",
    title: "Contact Faisal Orakzai — Orakzai Group Sovereign Gateway",
    description:
      "Contact Muhammad Faisal Orakzai and Orakzai Group for strategic partnerships, media inquiries, investment discussions, and collaboration opportunities.",
    ogType: "website",
  },
  {
    path: "privacy",
    title: "Privacy Policy — Faisal Orakzai | faisalorakzai.com",
    description: "Privacy Policy for faisalorakzai.com — how Muhammad Faisal Orakzai and Orakzai Group collect, use, and protect your data.",
    ogType: "website",
  },
  {
    path: "terms",
    title: "Terms of Service — Faisal Orakzai | faisalorakzai.com",
    description: "Terms of Service for faisalorakzai.com — the official website of Muhammad Faisal Orakzai, Founder & Chairman of Orakzai Group.",
    ogType: "website",
  },
  {
    path: "disclaimer",
    title: "Disclaimer — Faisal Orakzai | faisalorakzai.com",
    description: "Legal disclaimer for faisalorakzai.com and all content published by Muhammad Faisal Orakzai and Orakzai Group.",
    ogType: "website",
  },
  {
    path: "editorial-policy",
    title: "Editorial Policy — Faisal Orakzai | faisalorakzai.com",
    description: "Editorial policy and content standards for faisalorakzai.com — the official website of Muhammad Faisal Orakzai.",
    ogType: "website",
  },
  {
    path: "cookie-policy",
    title: "Cookie Policy — Faisal Orakzai | faisalorakzai.com",
    description: "Cookie policy for faisalorakzai.com — how Muhammad Faisal Orakzai's official website uses cookies.",
    ogType: "website",
  },
  {
    path: "ai-usage-policy",
    title: "AI Usage Policy — Faisal Orakzai | faisalorakzai.com",
    description: "AI usage policy for faisalorakzai.com — guidelines for artificial intelligence use on the official website of Muhammad Faisal Orakzai.",
    ogType: "website",
  },
  {
    path: "wiki",
    title: "Muhammad Faisal Orakzai — Wiki | Technology Entrepreneur & Computer Scientist",
    description:
      "Wikipedia-style reference page for Muhammad Faisal Orakzai — Pakistani technology entrepreneur, computer scientist, and founder of Orakzai Group. Born 30 April 2006, Orakzai Agency KPK Pakistan.",
    ogType: "profile",
  },
];

/* ──────────────────────────────────────────────────────────────
   Read the built index.html
   ────────────────────────────────────────────────────────────── */
let base;
try {
  base = readFileSync(join(DIST, "index.html"), "utf8");
} catch {
  console.error("[generate-pages] dist/public/index.html not found. Did vite build succeed?");
  process.exit(1);
}

/* ──────────────────────────────────────────────────────────────
   Generate per-route copies
   ────────────────────────────────────────────────────────────── */
let generated = 0;

for (const route of ROUTES) {
  const canonicalUrl = `${BASE}/${route.path}`;
  const fullTitle = route.title;
  const desc = route.description;
  const ogType = route.ogType ?? "website";

  let html = base;

  // 1. Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${fullTitle}</title>`);

  // 2. Replace / insert <link rel="canonical">
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/g, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // 3. Update meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${desc.replace(/"/g, "&quot;")}"`
  );

  // 4. Update og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${fullTitle.replace(/"/g, "&quot;")}"`
  );

  // 5. Update og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${desc.replace(/"/g, "&quot;")}"`
  );

  // 6. Update og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // 7. Update og:type
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${ogType}"`
  );

  // 8. Update twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${fullTitle.replace(/"/g, "&quot;")}"`
  );

  // 9. Update twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${desc.replace(/"/g, "&quot;")}"`
  );

  // 10. Remove FAQ schema from non-homepage pages (keeps homepage FAQ intact)
  // The FAQ is only relevant on the homepage — having it on every page is schema spam
  html = html.replace(
    /\s*<!-- ══+[\s\S]*?FAQ PAGE SCHEMA[\s\S]*?<\/script>\s*(?=\s*<!-- TrustBox)/,
    "\n    <!-- FAQ schema — homepage only, removed from sub-pages -->\n    "
  );

  // 11. Remove static FAQ <section> from sub-pages
  html = html.replace(
    /<section id="faq"[\s\S]*?<\/section>/,
    "<!-- FAQ section — homepage only -->"
  );

  // Write to dist/public/[route]/index.html
  const outDir = join(DIST, route.path);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf8");
  generated++;
  console.log(`[generate-pages] ✓ /${route.path}`);
}

console.log(`[generate-pages] Done — generated ${generated} sub-page HTML files.`);
