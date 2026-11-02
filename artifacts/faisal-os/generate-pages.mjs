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
    path: "",
    title: "Faisal Orakzai — Founder & Chairman, Orakzai Group",
    description:
      "Official website of Muhammad Faisal Orakzai, Pakistani technology entrepreneur and Founder & Chairman of Orakzai Group.",
    ogType: "profile",
  },
  {
    path: "founder",
    title: "Faisal Orakzai — Founder Biography | Chairman, Orakzai Group | فیصل اورکزئی",
    description:
      "Full biography of Muhammad Faisal Orakzai — born 30 April 2006, Orakzai Agency KPK Pakistan. Founder & Chairman of Orakzai Group, blockchain architect, AI entrepreneur.",
    ogType: "profile",
  },
  {
    path: "education",
    title: "Education & Professional Programs — Faisal Orakzai",
    description:
      "School qualifications, executive education, professional certificates and founder programs listed for Muhammad Faisal Orakzai.",
    ogType: "profile",
    educationSchema: true,
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
    path: "research/faisal-orakzai-orakzaix-8b-gguf-hugging-face",
    title: "Pakistani Technology Entrepreneur & Computer Scientist Faisal Orakzai Publishes OrakzaiX 8B GGUF Model Repository on Hugging Face",
    description:
      "Faisal Orakzai has made the OrakzaiX 8B-class GGUF model repository publicly available on Hugging Face. Explore its Llama architecture, quantization options, local inference commands, licensing context and responsible-use guidance.",
    ogType: "article",
    image: "/orakzaix-8b-gguf-hugging-face-hero.png",
    articleSchema: {
      headline: "Pakistani Technology Entrepreneur & Computer Scientist Faisal Orakzai Publishes OrakzaiX 8B GGUF Model Repository on Hugging Face",
      datePublished: "2026-09-11",
      dateModified: "2026-09-11",
      articleSection: "ARTIFICIAL INTELLIGENCE",
      keywords: "OrakzaiX 8B, Faisal Orakzai AI, Faisal Orakzai Hugging Face, OrakzaiX GGUF, local AI model, Pakistan AI technology",
    },
    noscript:
      "Faisal Orakzai has made OrakzaiX, an 8-billion-parameter-class GGUF model repository, publicly available on Hugging Face. The community-maintained Llama-architecture release includes multiple quantization options for local AI inference.",
  },
  {
    path: "press",
    title: "Press & Media Coverage — Faisal Orakzai | Orakzai Group",
    description:
      "Faisal Orakzai press coverage, magazine interviews, book news, distributed press releases, and clearly identified third-party blockchain listings and reviews.",
    ogType: "website",
    pressCoverage: [
      { headline: "Meet Faisal Orakzai", publisher: "Bold Journey Magazine", sourceType: "Editorial interview", url: "https://boldjourney.com/meet-faisal-orakzai/", summary: "Bold Journey Magazine interviews Faisal Orakzai about his entrepreneurial journey and work." },
      { headline: "Meet Faisal Orakzai", publisher: "CanvasRebel Magazine", sourceType: "Editorial interview", url: "https://canvasrebel.com/meet-faisal-orakzai/", summary: "CanvasRebel Magazine features an interview about Faisal Orakzai's work in software engineering, AI, and blockchain." },
      { headline: "Faisal Orakzai Publishes 200-Page Book, I’m Orakzai", publisher: "Daily Justajoo", sourceType: "Book coverage", url: "https://dailyjustajoo.com/eng/2026/08/13/faisal-orakzai-publishes-200-page-book-im-orakzai/", summary: "Coverage of I’m Orakzai, a book about Orakzai identity, Pashtun heritage, history, and culture." },
      { headline: "Faisal Orakzai Launches Blockchain Book on Amazon Kindle", publisher: "The Cow News", sourceType: "Book coverage", url: "https://www.thecownews.com/blog/faisal-orakzai-launches-blockchain-book-on-amazon-kindle/", summary: "Coverage of the Kindle release of The Sovereign Stack, a book about blockchain infrastructure." },
      { headline: "Pakistani Technology Entrepreneur Faisal Orakzai Publishes The Sovereign Stack on Amazon Kindle", publisher: "61News", sourceType: "Book coverage", url: "https://www.61news.pk/?p=279", summary: "Coverage of The Sovereign Stack, a book introducing blockchain infrastructure, smart contracts, and Web3." },
      { headline: "Young Pakistani Entrepreneur Expands Global Vision Through OKBOND and Shamim Forever", publisher: "openPR", sourceType: "Press release", url: "https://www.openpr.com/news/4560198/young-pakistani-entrepreneur-expands-global-vision-through", summary: "A distributed announcement about OKBOND, Shamim Forever, and their international ambitions." },
      { headline: "Young Pakistani Entrepreneur Expands Global Vision Through OKBOND and Shamim Forever", publisher: "PRLog", sourceType: "Press release", url: "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html", summary: "A PRLog-distributed announcement about blockchain, digital finance, and luxury-commerce ventures." },
      { headline: "The Founder’s Vision: Why Shamim Forever Was Created", publisher: "Shamim Forever Journal", sourceType: "Company journal", url: "https://www.shamimforever.com/journal/founders-vision", summary: "The company journal describes the brand's founding vision and approach to curated luxury." },
      { headline: "Polygon Token Presales: Zenox, ELON, Decahedron & More", publisher: "ICOAnnouncement.io", sourceType: "Directory roundup", url: "https://icoannouncement.io/best-polygon-token-presales-zenox-earthtones-and-more", summary: "A third-party roundup of Polygon token presales; this is a directory article, not an interview." },
      { headline: "Orakzai Bond Presale Details", publisher: "ICOAnnouncement.io", sourceType: "Directory listing", url: "https://icoannouncement.io/crypto-presale/orakzai-bond-presale-details", summary: "A third-party directory page with project and presale information for Orakzai Bond." },
      { headline: "Orakzai Bond Presale Review", publisher: "CoinGabbar", sourceType: "Third-party review", url: "https://www.coingabbar.com/en/crypto-presale/orakzai-bond-presale-review", summary: "A third-party review page; it is not an endorsement or investment recommendation." },
    ],
  },
  {
    path: "books",
    title: "Books & Publications | Faisal Orakzai",
    description:
      "Explore two books by Faisal Orakzai: The Sovereign Stack on blockchain infrastructure and I’m Orakzai on heritage, Pashtun identity, history and technology.",
    ogType: "website",
    image: "/books/the-sovereign-stack-cover.jpg",
    imageType: "image/jpeg",
    imageWidth: 756,
    imageHeight: 1000,
    imageAlt: "Cover of The Sovereign Stack by Faisal Orakzai",
  },
  {
    path: "author/faisal-orakzai",
    title: "Author Profile | Faisal Orakzai",
    description:
      "Official author profile for Faisal Orakzai, Pakistani technology entrepreneur, researcher and author of The Sovereign Stack and I’m Orakzai.",
    ogType: "profile",
    image: "/faisal-profile-google.jpg",
    imageType: "image/jpeg",
    imageWidth: 1080,
    imageHeight: 1080,
    imageAlt: "Portrait of Faisal Orakzai",
  },
  {
    path: "books/the-sovereign-stack",
    title: "The Sovereign Stack: Blockchain | Faisal Orakzai",
    description:
      "The Sovereign Stack by Faisal Orakzai is a practical book on blockchain infrastructure, smart contracts, tokenization, digital identity, security and Web3.",
    ogType: "book",
    image: "/books/the-sovereign-stack-cover.jpg",
    imageType: "image/jpeg",
    imageWidth: 756,
    imageHeight: 1000,
    imageAlt: "Cover of The Sovereign Stack by Faisal Orakzai",
    bookSchema: {
      name: "The Sovereign Stack: Engineering Next-Generation Blockchain Infrastructure",
      description:
        "A practical guide to blockchain infrastructure, smart contracts, real-world asset tokenization, digital identity, security, cross-chain systems and Web3.",
      image: "/books/the-sovereign-stack-cover.jpg",
      datePublished: "2026-07-08",
      asin: "B0H82JXTBD",
    },
  },
  {
    path: "books/im-orakzai",
    title: "I’m Orakzai: Heritage & Identity | Faisal Orakzai",
    description:
      "I’m Orakzai by Faisal Orakzai explores Orakzai heritage, Pashtun identity, history and the connections between culture, technology and the future.",
    ogType: "book",
    image: "/books/im-orakzai-cover.webp",
    imageType: "image/webp",
    imageWidth: 452,
    imageHeight: 678,
    imageAlt: "Cover of I’m Orakzai by Faisal Orakzai",
    bookSchema: {
      name: "I’m Orakzai: A Journey Through Orakzai Heritage, Pashtun Identity, History, Technology & the Future",
      description:
        "A journey through Orakzai identity and heritage, Pashtun history and culture, and the connections between technology, entrepreneurship and the future.",
      image: "/books/im-orakzai-cover.webp",
      datePublished: "2026-08-12",
      asin: "B0HF1DD5MJ",
    },
  },
  {
    path: "okzbyte-hub",
    title: "OkzByte Hub — Sovereign Membership | Faisal Orakzai",
    description:
      "OkzByte Hub by Faisal Orakzai — exclusive blockchain & AI sovereign community. Tiered membership: Matrix Developer, Enterprise Architect, Sovereign Founder. Premium crypto signals, AI knowledge, and direct founder sessions.",
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
    title: "FaisalWiki — The Orakzai Group Knowledge Base",
    description:
      "FaisalWiki is a free knowledge base documenting Muhammad Faisal Orakzai, Orakzai Group, and related technology ventures. Built for open access.",
    ogType: "website",
  },
  {
    path: "wiki/faisalorakzai",
    title: "Muhammad Faisal Orakzai — FaisalWiki",
    description:
      "Encyclopedic article on Muhammad Faisal Orakzai — Pakistani technology entrepreneur, computer scientist, founder of Orakzai Group. Born 30 April 2006, Mamozai, District Orakzai, Khyber Pakhtunkhwa.",
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
const scholarlyMetaPattern = /<meta\s+(?:name|property)="(?:citation_[^"]+|DC\.[^"]+)"[^>]*\/?\s*>\s*/gi;
const researchCitationMetadata = base.match(scholarlyMetaPattern) ?? [];
base = base.replace(scholarlyMetaPattern, "");

/* ──────────────────────────────────────────────────────────────
   Generate per-route copies
   ────────────────────────────────────────────────────────────── */
let generated = 0;
const escapeStaticHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

for (const route of ROUTES) {
  const canonicalUrl = route.path ? `${BASE}/${route.path}` : `${BASE}/`;
  const fullTitle = route.title;
  const desc = route.description;
  const ogType = route.ogType ?? "website";

  let html = base;

  // Keep the homepage's own no-script content on / only. Subpages receive
  // their own concise fallback below instead of inheriting the homepage H1.
  if (route.path) {
    html = html.replace(
      /\s*<!--\s*NOSCRIPT — content for crawlers that skip JavaScript\s*-->[\s\S]*?<\/noscript>/i,
      "",
    );
  }

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

  // 10. Update article image metadata when supplied.
  if (route.image) {
    const imageUrl = `${BASE}${route.image}`;
    html = html.replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${imageUrl}"`
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"/,
      `<meta name="twitter:image" content="${imageUrl}"`
    );
    const imageMetadata = [
      ["og:image:secure_url", imageUrl],
      ["og:image:type", route.imageType ?? (route.image.endsWith(".webp") ? "image/webp" : "image/jpeg")],
      ["og:image:width", route.imageWidth],
      ["og:image:height", route.imageHeight],
      ["og:image:alt", route.imageAlt],
    ];
    for (const [property, value] of imageMetadata) {
      if (value == null) continue;
      html = html.replace(
        new RegExp(`(<meta property="${property}" content=")[^"]*(")`),
        `$1${String(value).replace(/"/g, "&quot;")}$2`,
      );
    }
    if (route.imageAlt) {
      html = html.replace(
        /<meta name="twitter:image:alt" content="[^"]*"/,
        `<meta name="twitter:image:alt" content="${route.imageAlt.replace(/"/g, "&quot;")}"`,
      );
    }
  }

  // Citation and Dublin Core metadata describes the research collection only.
  if (route.path === "research" && researchCitationMetadata.length) {
    html = html.replace("</head>", `${researchCitationMetadata.join("\n")}\n</head>`);
  }

  // 11. Add crawler-visible article schema and a no-JavaScript summary.
  if (route.articleSchema) {
    const articleUrl = `${BASE}/${route.path}`;
    const imageUrl = route.image ? `${BASE}${route.image}` : undefined;
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: route.articleSchema.headline,
      description: desc,
      image: imageUrl ? [imageUrl] : undefined,
      datePublished: route.articleSchema.datePublished,
      dateModified: route.articleSchema.dateModified,
      author: { "@id": `${BASE}/#person` },
      publisher: { "@id": `${BASE}/research#research-lab` },
      mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
      url: articleUrl,
      articleSection: route.articleSchema.articleSection,
      keywords: route.articleSchema.keywords,
      inLanguage: "en-US",
      isAccessibleForFree: true,
    };
    const jsonLd = `<script id="article-ld" type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace("</head>", `${jsonLd}\n</head>`);
    html = html.replace("</body>", `<noscript><article><h1>${route.articleSchema.headline}</h1><p>${route.noscript}</p></article></noscript>\n</body>`);
  }

  // 12. Add static profile/credential data and a no-JavaScript summary for education.
  if (route.educationSchema) {
    const records = JSON.parse(
      readFileSync(join(__dirname, "src/data/education-records.json"), "utf8"),
    );
    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    const credentials = records
      .filter((record) => record.schemaCredential)
      .map((record) => ({
        "@type": "EducationalOccupationalCredential",
        name: record.program,
        credentialCategory: record.schemaCredential,
        description: record.description,
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: record.institution,
        },
      }));
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": `${BASE}/education#webpage`,
          url: `${BASE}/education`,
          name: route.title,
          description: route.description,
          mainEntity: { "@id": `${BASE}/#person` },
        },
        {
          "@type": "Person",
          "@id": `${BASE}/#person`,
          name: "Muhammad Faisal Orakzai",
          url: BASE,
          hasCredential: credentials,
        },
      ],
    };
    const jsonLd = `<script id="education-profile-ld" type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace("</head>", `${jsonLd}\n</head>`);

    const entries = records
      .map((record) => {
        const details = [
          record.focus && `<p>${escapeHtml(record.focus)}</p>`,
          record.period && `<p><strong>Dates:</strong> ${escapeHtml(record.period)}</p>`,
          record.result && `<p><strong>Result:</strong> ${escapeHtml(record.result)}</p>`,
          record.description && `<p>${escapeHtml(record.description)}</p>`,
        ]
          .filter(Boolean)
          .join("");
        return `<article><h2>${escapeHtml(record.institution)}</h2><p><strong>${escapeHtml(record.program)}</strong></p>${details}</article>`;
      })
      .join("");
    const noScriptSummary = `<noscript><main><h1>Education &amp; Professional Programs — Faisal Orakzai</h1><p>School qualifications, executive education, professional certificates and founder programs. Certificates and accelerator programs are not university degrees.</p>${entries}</main></noscript>`;
    html = html.replace("</body>", `${noScriptSummary}\n</body>`);
  }

  // 13. Add crawler-readable press coverage links and an ItemList without
  // attributing external articles to the site owner or inventing publication dates.
  if (route.pressCoverage) {
    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    const coverageUrl = `${BASE}/${route.path}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${coverageUrl}#webpage`,
      url: coverageUrl,
      name: route.title,
      description: route.description,
      mainEntity: {
        "@type": "ItemList",
        name: "Faisal Orakzai Press and Media Coverage",
        numberOfItems: route.pressCoverage.length,
        itemListElement: route.pressCoverage.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: item.url,
          name: item.headline,
          description: `${item.publisher} — ${item.sourceType}. ${item.summary}`,
        })),
      },
    };
    const jsonLd = `<script id="press-coverage-ld" type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace("</head>", `${jsonLd}\n</head>`);

    const entries = route.pressCoverage
      .map((item) => `<li><article><h2><a href="${escapeHtml(item.url)}">${escapeHtml(item.headline)}</a></h2><p><strong>${escapeHtml(item.publisher)}</strong> · ${escapeHtml(item.sourceType)}</p><p>${escapeHtml(item.summary)}</p></article></li>`)
      .join("");
    const noScriptSummary = `<noscript><main><section><h1>Press &amp; Media Coverage — Faisal Orakzai</h1><p>Interviews, book coverage, press releases, company journal entries, and third-party blockchain directory listings and reviews. Third-party listings and reviews are identified as such and are not endorsements.</p><ul>${entries}</ul></section></main></noscript>`;
    html = html.replace("</body>", `${noScriptSummary}\n</body>`);
  }

  // Add one route-level page entity where a specialized page schema has not
  // already been authored above (Person profile, education profile, or article).
  if (!route.pressCoverage && !route.educationSchema && !route.articleSchema) {
    const isPersonProfile = ["founder", "author/faisal-orakzai", "wiki/faisalorakzai"].includes(route.path);
    const isWikiIndex = route.path === "wiki";
    const pageSchema = {
      "@context": "https://schema.org",
      "@type": isPersonProfile ? "ProfilePage" : isWikiIndex ? "CollectionPage" : "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: fullTitle,
      description: desc,
      isPartOf: { "@id": `${BASE}/#website` },
      ...(route.bookSchema
        ? { mainEntity: { "@id": `${canonicalUrl}#book` } }
        : isPersonProfile
        ? { mainEntity: { "@id": `${BASE}/#person` } }
        : isWikiIndex
          ? { about: { "@id": `${BASE}/#person` } }
        : route.path === ""
          ? { about: { "@id": `${BASE}/#person` } }
          : {}),
    };
    const pageLd = `<script id="route-page-ld" type="application/ld+json">${JSON.stringify(pageSchema)}</script>`;
    html = html.replace("</head>", `${pageLd}\n</head>`);

    if (route.path === "research") {
      const researchLab = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE}/research#research-lab`,
        name: "Orakzai Research Lab",
        url: `${BASE}/research`,
        founder: { "@id": `${BASE}/#person` },
      };
      const researchLabLd = `<script id="research-lab-ld" type="application/ld+json">${JSON.stringify(researchLab)}</script>`;
      html = html.replace("</head>", `${researchLabLd}\n</head>`);
    }

    if (route.bookSchema) {
      const bookSchema = {
        "@context": "https://schema.org",
        "@type": "Book",
        "@id": `${canonicalUrl}#book`,
        name: route.bookSchema.name,
        description: route.bookSchema.description,
        image: `${BASE}${route.bookSchema.image}`,
        author: { "@id": `${BASE}/#person` },
        publisher: { "@type": "Organization", name: "OkzByte" },
        datePublished: route.bookSchema.datePublished,
        inLanguage: "en",
        identifier: route.bookSchema.asin,
        url: canonicalUrl,
      };
      const bookLd = `<script id="book-ld" type="application/ld+json">${JSON.stringify(bookSchema)}</script>`;
      html = html.replace("</head>", `${bookLd}\n</head>`);
    }
  }

  // Static hosts serve the app shell for client routes. Give non-JS clients a
  // truthful route-specific heading and summary rather than the homepage bio.
  if (route.path && !route.pressCoverage && !route.educationSchema && !route.articleSchema) {
    const summary = `<noscript><main><h1>${escapeStaticHtml(fullTitle)}</h1><p>${escapeStaticHtml(desc)}</p></main></noscript>`;
    html = html.replace("</body>", `${summary}\n</body>`);
  }

  // 13. Remove FAQ schema from non-homepage pages (keeps homepage FAQ intact)
  // The FAQ is only relevant on the homepage — having it on every page is schema spam
  html = html.replace(
    /\s*<!-- ══+[\s\S]*?FAQ PAGE SCHEMA[\s\S]*?<\/script>\s*(?=\s*<!-- TrustBox)/,
    "\n    <!-- FAQ schema — homepage only, removed from sub-pages -->\n    "
  );

  // 14. Remove static FAQ <section> from sub-pages
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
