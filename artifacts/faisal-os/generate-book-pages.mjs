/**
 * Build-time HTML for the author and book hub.
 * This runs after Vite and the existing page generator so crawlers receive
 * unique page copy and structured data before client-side JavaScript runs.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist/public");
const BASE = "https://faisalorakzai.com";
const person = JSON.parse(readFileSync(join(__dirname, "src/data/books.json"), "utf8")).author;
const books = JSON.parse(readFileSync(join(__dirname, "src/data/books.json"), "utf8")).books;
const personId = `${BASE}/#person`;
const portrait = `${BASE}${person.image}`;

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
function imageType(path) {
  return path.toLowerCase().endsWith(".webp") ? "image/webp" : "image/jpeg";
}
function shellStart(route, current, title) {
  const crumb = route === "/books"
    ? `<li aria-current="page">Books &amp; Publications</li>`
    : route.startsWith("/author/")
      ? `<li aria-current="page">Author profile</li>`
      : `<li><a href="/books">Books</a></li><li aria-hidden="true">/</li><li aria-current="page">${esc(current)}</li>`;
  return `<style id="publication-static-styles">
    .pub-static{--gold:#f3ba2f;--ink:#05080d;--panel:#09121e;--muted:rgba(255,255,255,.63);max-width:1120px;margin:0 auto;padding:112px 28px 88px;color:#f6f4ee;font:16px/1.75 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    .pub-static *{box-sizing:border-box}.pub-static a{color:var(--gold);text-decoration-color:rgba(243,186,47,.36);text-underline-offset:4px}.pub-static a:hover{color:#fff}
    .pub-static nav{font-size:12px;color:rgba(255,255,255,.5);margin-bottom:38px}.pub-static nav ol{display:flex;flex-wrap:wrap;gap:9px;list-style:none;padding:0;margin:0}.pub-static nav li[aria-current]{color:rgba(255,255,255,.78)}
    .pub-static .eyebrow{font:10px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.28em;text-transform:uppercase;color:rgba(243,186,47,.8);margin:0 0 14px}
    .pub-static h1,.pub-static h2,.pub-static h3{font-family:Georgia,"Times New Roman",serif;font-weight:500;line-height:1.18;letter-spacing:-.02em;color:#fff}.pub-static h1{font-size:clamp(36px,6vw,66px);margin:0 0 22px}.pub-static h2{font-size:clamp(25px,3.5vw,36px);margin:0 0 16px}.pub-static h3{font-size:24px;margin:0 0 12px}.pub-static p{color:var(--muted);max-width:760px;margin:0 0 16px}.pub-static .lede{font-size:18px;line-height:1.85;max-width:780px}.pub-static .hero{padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:32px}
    .pub-static .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}.pub-static .card,.pub-static .panel{border:1px solid rgba(255,255,255,.12);padding:26px;background:rgba(255,255,255,.018)}.pub-static .title-panel{min-height:230px;padding:24px;border:1px solid rgba(243,186,47,.28);background:linear-gradient(145deg,#101c2c,#080c13 72%);display:flex;flex-direction:column;justify-content:space-between;margin-bottom:22px}.pub-static .title-panel small{font:10px ui-monospace,monospace;letter-spacing:.22em;color:rgba(243,186,47,.72);text-transform:uppercase}.pub-static .title-panel strong{display:block;font:500 clamp(25px,4vw,38px)/1.12 Georgia,serif;color:#fff;margin:20px 0}.pub-static .facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;border-top:1px solid rgba(255,255,255,.1);padding-top:20px;margin-top:25px}.pub-static .fact dt{font:10px ui-monospace,monospace;letter-spacing:.13em;text-transform:uppercase;color:rgba(255,255,255,.38)}.pub-static .fact dd{margin:4px 0 0;color:rgba(255,255,255,.8);font-size:14px}.pub-static .topic-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding:0;list-style:none}.pub-static .topic-list li{border-left:1px solid rgba(243,186,47,.6);background:rgba(255,255,255,.025);padding:10px 13px;color:rgba(255,255,255,.72);font-size:14px}.pub-static .actions{display:flex;flex-wrap:wrap;align-items:center;gap:20px;margin-top:24px}.pub-static .button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:11px 20px;background:var(--gold);color:#080a0d!important;text-decoration:none;font-size:14px;font-weight:700}.pub-static .button:hover{background:#ffd666}.pub-static .section{margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,.1)}.pub-static .author-row{display:grid;grid-template-columns:180px minmax(0,1fr);gap:28px;align-items:start}.pub-static .author-row img{width:100%;height:auto;border:1px solid rgba(243,186,47,.28)}.pub-static .note{font-size:12px;color:rgba(255,255,255,.4);margin-top:18px}
    @media(max-width:700px){.pub-static{padding:96px 20px 64px}.pub-static .grid,.pub-static .author-row{grid-template-columns:1fr}.pub-static .author-row img{max-width:240px}.pub-static .facts,.pub-static .topic-list{grid-template-columns:1fr}.pub-static .card{padding:20px}.pub-static .lede{font-size:16px}}
  </style><main class="pub-static"><nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-hidden="true">/</li>${crumb}</ol></nav>`;
}
function shellEnd() { return `</main>`; }
function amazonLink(book, label = "View on Amazon") {
  return `<a class="button" href="${esc(book.amazonUrl)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
}
function coverFigure(book, priority = false, number = "") {
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? ' fetchpriority="high"' : "";
  return `<figure class="book-cover" style="max-width:300px;margin:0 auto 22px;padding:8px;border:1px solid rgba(243,186,47,.28);background:#09121e"><img src="${esc(book.cover)}" width="${book.coverWidth}" height="${book.coverHeight}" alt="Cover of ${esc(book.title)} by Faisal Orakzai" loading="${loading}"${fetchPriority} style="display:block;width:100%;height:auto;max-height:420px;object-fit:contain"><figcaption style="margin-top:10px;font:10px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45)">${number ? `Book ${esc(number)} · ` : ""}Author-supplied cover artwork</figcaption></figure>`;
}
function bookCard(book, index) {
  return `<article class="card">${coverFigure(book, false, index)}<p class="eyebrow">${esc(book.format)} · ${esc(book.language)}</p><h2><a href="${esc(book.path)}">${esc(book.title)}</a></h2><p>${esc(book.directoryDescription)}</p><p class="note">Published ${esc(book.displayDate)} · ${esc(book.publisher)}</p><div class="actions"><a href="${esc(book.path)}">Book details →</a>${amazonLink(book)}</div></article>`;
}
function detailPage(book, index) {
  const other = books.find((entry) => entry.slug !== book.slug);
  const isSovereign = book.slug === "the-sovereign-stack";
  const intro = isSovereign
    ? "The verified Amazon listing and the available book contents describe a practical route through blockchain fundamentals, infrastructure, smart contracts, tokenization, digital identity, enterprise systems, security, interoperability and Web3."
    : "The verified Amazon description and the author’s publication announcement frame the book around identity, heritage, history and culture, then connect those subjects with technology, entrepreneurship and the future.";
  const facts = [
    ["Author", `<a href="${person.profileUrl}">Faisal Orakzai</a>`],
    ["Publisher", esc(book.publisher)],
    ["Publication date", `<time datetime="${esc(book.datePublished)}">${esc(book.displayDate)}</time>`],
    ["Format", esc(book.format)],
    ...(book.edition ? [["Edition", esc(book.edition)]] : []),
    ["Language", esc(book.language)],
    ["Amazon ASIN", esc(book.asin)],
  ];
  const topics = book.topics.map((topic) => `<li>${esc(topic)}</li>`).join("");
  return `${shellStart(book.path, book.shortTitle, book.title)}<header class="hero">${coverFigure(book, true, index)}<p class="eyebrow">Book by <a href="${person.profileUrl}">Faisal Orakzai</a></p><h1>${esc(book.title)}</h1><p class="lede">${esc(book.description)}</p><div class="actions">${amazonLink(book)}<a href="/books">← All books</a></div></header><section><h2>About this book</h2><p>${esc(book.description)}</p><p>${esc(intro)}</p></section><section class="section"><h2>Topics covered</h2><ul class="topic-list">${topics}</ul></section><section class="section"><h2>About the author</h2><p>${esc(person.description)}</p><p><a href="${person.profileUrl}">Read Faisal Orakzai’s author profile →</a></p></section><section class="section"><h2>Related reading</h2><p>Explore technical research and publications by Faisal Orakzai, or read the companion title in this collection.</p><div class="actions"><a href="/research">Research &amp; publications →</a><a href="${other.path}">${esc(other.shortTitle)} →</a></div></section><aside class="panel section" aria-label="Publication details"><h2>Publication details</h2><dl class="facts">${facts.map(([term, value]) => `<div class="fact"><dt>${term}</dt><dd>${value}</dd></div>`).join("")}</dl><p class="note">ISBN-13 is not listed in the verified product details. Amazon is the source for current price and availability.</p><div class="actions">${amazonLink(book)}</div></aside>${shellEnd()}`;
}
function directoryPage() {
  return `${shellStart("/books", "Books & Publications")}<header class="hero"><p class="eyebrow">Books · Faisal Orakzai</p><h1>Books &amp; Publications</h1><p class="lede">Two books by Faisal Orakzai explore distinct but connected subjects: blockchain infrastructure and the relationship between heritage, identity and a technology-shaped future.</p><p>Author: <a href="${person.profileUrl}">Faisal Orakzai</a> · <a href="/research">Research &amp; publications</a></p></header><section class="grid" aria-label="Books by Faisal Orakzai">${books.map((book, index) => bookCard(book, String(index + 1).padStart(2, "0"))).join("")}</section><section class="section"><h2>About the author</h2><p>${esc(person.description)}</p><div class="actions"><a href="${person.profileUrl}">Read the author profile →</a><a href="/research">Browse research and publications →</a></div><p class="note">Amazon product pages are the source for current price and availability.</p></section>${shellEnd()}`;
}
function authorPage() {
  const cards = books.map((book, index) => `<article class="card">${coverFigure(book, false, String(index + 1).padStart(2, "0"))}<p class="eyebrow">Book ${String(index + 1).padStart(2, "0")} · ${esc(book.displayDate)}</p><h3><a href="${esc(book.path)}">${esc(book.title)}</a></h3><p>${esc(book.directoryDescription)}</p></article>`).join("");
  return `${shellStart(person.profileUrl, "Author profile")}<section class="author-row hero"><figure><img src="${esc(person.image)}" width="1080" height="1080" alt="Portrait of Faisal Orakzai" loading="lazy"><figcaption class="note">Faisal Orakzai · Author</figcaption></figure><div><p class="eyebrow">Author profile</p><h1>Faisal Orakzai</h1><p>${esc(person.fullName)}</p><p class="lede">${esc(person.description)}</p><p>His books address both practical digital infrastructure and the cultural histories that inform identity and community. <em>The Sovereign Stack</em> focuses on blockchain systems; <em>I’m Orakzai</em> connects heritage and history with technology and the future.</p><div class="actions"><a href="/books">Browse the books →</a><a href="${esc(person.amazonAuthorUrl)}" target="_blank" rel="noopener noreferrer">Amazon author page ↗</a></div></div></section><section class="section"><h2>Books by Faisal Orakzai</h2><div class="grid">${cards}</div></section><section class="section"><h2>Research &amp; official profiles</h2><div class="actions"><a href="/research">Research &amp; publications →</a>${person.sameAs.map((url) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${new URL(url).hostname.replace(/^www\./, "")} ↗</a>`).join("")}</div></section>${shellEnd()}`;
}

const routes = [
  {
    path: "books",
    kind: "directory",
    title: "Books by Faisal Orakzai | The Sovereign Stack & I’m Orakzai",
    description: "Explore books by Faisal Orakzai: The Sovereign Stack, a blockchain infrastructure guide, and I’m Orakzai, a journey through heritage, identity and technology.",
    content: directoryPage(),
    image: `${BASE}${books[0].cover}`,
    imageType: imageType(books[0].cover),
    imageWidth: books[0].coverWidth,
    imageHeight: books[0].coverHeight,
    imageAlt: `Cover of ${books[0].title} by ${person.name}`,
    crumbs: [{ name: "Books & Publications", url: `${BASE}/books` }],
  },
  {
    path: "author/faisal-orakzai",
    kind: "author",
    title: "Faisal Orakzai — Author Profile | Books & Research",
    description: "Faisal Orakzai is a Pakistani technology entrepreneur, systems architect, researcher and author. Explore his books, research and verified author profiles.",
    content: authorPage(),
    image: portrait,
    imageType: "image/jpeg",
    imageWidth: 1080,
    imageHeight: 1080,
    imageAlt: `Portrait of ${person.name}`,
    crumbs: [{ name: "Author profile", url: `${BASE}${person.profileUrl}` }],
  },
  ...books.map((book, index) => ({
    path: book.path.slice(1),
    kind: "book",
    book,
    title: index === 0 ? "The Sovereign Stack — Blockchain Infrastructure | Faisal Orakzai" : "I’m Orakzai — Heritage, Identity & the Future | Faisal Orakzai",
    description: book.description,
    content: detailPage(book, String(index + 1).padStart(2, "0")),
    image: `${BASE}${book.cover}`,
    imageType: imageType(book.cover),
    imageWidth: book.coverWidth,
    imageHeight: book.coverHeight,
    imageAlt: `Cover of ${book.title} by ${person.name}`,
    crumbs: [
      { name: "Books", url: `${BASE}/books` },
      { name: book.shortTitle, url: `${BASE}${book.path}` },
    ],
  })),
];

let base;
try {
  base = readFileSync(join(DIST, "index.html"), "utf8");
} catch {
  console.error("[generate-book-pages] dist/public/index.html not found. Did the Vite build succeed?");
  process.exit(1);
}

for (const route of routes) {
  const canonicalUrl = `${BASE}/${route.path}`;
  const title = route.title;
  let html = base;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  const canonicalLink = `<link rel="canonical" href="${canonicalUrl}" />`;
  if (/<link rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(/<link rel="canonical"[^>]*>/i, canonicalLink);
  } else {
    html = html.replace("<!-- canonical is set per-page by JS (SEOHead) and by generate-pages.mjs at build time -->", canonicalLink);
  }
  html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(route.description)}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(title)}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(route.description)}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="${route.kind === "book" ? "book" : route.kind === "author" ? "profile" : "website"}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${esc(title)}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${esc(route.description)}"`);
  html = html.replace(/<meta property="og:image"[^>]*>/g, `<meta property="og:image" content="${route.image}" />`);
  html = html.replace(/<meta property="og:image:secure_url"[^>]*>/g, `<meta property="og:image:secure_url" content="${route.image}" />`);
  html = html.replace(/<meta property="og:image:type"[^>]*>/g, `<meta property="og:image:type" content="${route.imageType}" />`);
  html = html.replace(/<meta property="og:image:width"[^>]*>/g, `<meta property="og:image:width" content="${route.imageWidth}" />`);
  html = html.replace(/<meta property="og:image:height"[^>]*>/g, `<meta property="og:image:height" content="${route.imageHeight}" />`);
  html = html.replace(/<meta property="og:image:alt"[^>]*>/g, `<meta property="og:image:alt" content="${esc(route.imageAlt)}" />`);
  html = html.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${route.image}"`);
  html = html.replace(/<meta name="twitter:image:alt"[^>]*>/g, `<meta name="twitter:image:alt" content="${esc(route.imageAlt)}" />`);

  const pageSchema = route.kind === "book"
    ? {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${canonicalUrl}#webpage`, url: canonicalUrl, name: title, description: route.description, image: route.image, mainEntity: { "@id": `${canonicalUrl}#book` } },
          { "@type": "Book", "@id": `${canonicalUrl}#book`, name: route.book.title, author: { "@id": personId, name: person.name }, url: canonicalUrl, description: route.book.description, bookFormat: "https://schema.org/EBook", inLanguage: "en", datePublished: route.book.datePublished, publisher: { "@type": "Organization", name: route.book.publisher }, sameAs: route.book.amazonUrl, identifier: { "@type": "PropertyValue", propertyID: "ASIN", value: route.book.asin }, ...(route.book.edition ? { bookEdition: route.book.edition } : {}) },
        ],
      }
    : route.kind === "directory"
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: title,
        description: route.description,
        image: route.image,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: books.map((book, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: book.title,
            url: `${BASE}${book.path}`,
          })),
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${canonicalUrl}#profile`,
        url: canonicalUrl,
        name: title,
        description: route.description,
        image: portrait,
        mainEntity: { "@id": personId },
      };
  if (route.kind === "book") pageSchema["@graph"][1].image = route.image;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      ...route.crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 2, name: crumb.name, item: crumb.url })),
    ],
  };
  html = html.replace("</head>", `<script id="publication-page-schema" type="application/ld+json">${jsonLd(pageSchema)}</script>\n<script id="seo-breadcrumb" type="application/ld+json">${jsonLd(breadcrumbSchema)}</script>\n</head>`);

  // Replace homepage-only hidden SEO material in this route copy with useful,
  // route-specific semantic HTML. The main app hydrates into the same root.
  html = html.replace(/<!-- Crawler-visible H1[\s\S]*?<div id="root"><\/div>/, `<div id="root">${route.content}</div>`);
  html = html.replace(/\s*<!-- ══+[\s\S]*?FAQ PAGE SCHEMA[\s\S]*?<\/script>\s*(?=\s*<!-- TrustBox)/, "\n");
  html = html.replace(/\s*<section id="faq"[\s\S]*?<\/section>/, "");

  const outFile = join(DIST, route.path, "index.html");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html, "utf8");
  console.log(`[generate-book-pages] ✓ /${route.path}`);
}
console.log(`[generate-book-pages] Done — generated ${routes.length} author/book pages.`);
