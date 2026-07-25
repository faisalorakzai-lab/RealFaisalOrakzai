/**
 * generate-rss.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Post-build script — generates dist/public/rss.xml and dist/public/feed/index.xml
 *
 * Run via: tsx generate-rss.ts  (invoked automatically by "postbuild" in package.json)
 *
 * Adding a new article to src/data/research-entries.ts automatically includes
 * it in the next RSS feed on the next build — no changes needed here.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ENTRIES, AUTHOR, type Entry } from "./src/data/research-entries.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST      = join(__dirname, "dist/public");
const BASE_URL  = "https://faisalorakzai.com";

// ─── Channel metadata ─────────────────────────────────────────────────────────
const CHANNEL = {
  title:          "Faisal Orakzai | Technical Research & Publications",
  link:           BASE_URL,
  description:    "Technical publications covering blockchain architecture, artificial intelligence, cybersecurity, and Web3 infrastructure.",
  language:       "en-us",
  copyright:      `© ${new Date().getFullYear()} Faisal Orakzai / Orakzai Group. All rights reserved.`,
  managingEditor: `research@faisalorakzai.com (${AUTHOR.name})`,
  webMaster:      `webmaster@faisalorakzai.com (${AUTHOR.name})`,
  generator:      "generate-rss.ts — faisalorakzai.com build pipeline",
  feedUrl:        `${BASE_URL}/rss.xml`,
  imageUrl:       `${BASE_URL}/logo.webp`,
  ttl:            "60",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Escape text for safe embedding inside XML CDATA or attributes. */
function xmlEscape(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Convert a year string ("2024", "2026") to a RFC-822 date string.
 * We use January 1 00:00:00 UTC as the canonical publication date when only
 * the year is known — this is the same date used in the JSON-LD schema.
 */
function toRfc822(year: string): string {
  return new Date(`${year}-01-01T00:00:00.000Z`).toUTCString();
}

/** Canonical URL for a research entry (anchor-linked to the research page). */
function entryUrl(entry: Entry): string {
  return `${BASE_URL}/research#${entry.id}`;
}

/**
 * Build the <description> CDATA block.
 * Includes the abstract plus — for articles — readTime and tags.
 */
function buildDescription(entry: Entry): string {
  const parts: string[] = [entry.abstract];
  if (entry.subtitle) parts.unshift(`${entry.subtitle}\n\n`);
  if (entry.readTime) parts.push(`\n\nRead time: ${entry.readTime}`);
  if (entry.tags?.length) parts.push(`\nTopics: ${entry.tags.join(", ")}`);
  if (entry.repoUrl)   parts.push(`\n\nRepository: ${entry.repoUrl}`);
  if (entry.pdfUrl)    parts.push(`\n\nFull document: ${entry.pdfUrl}`);
  return parts.join("");
}

// ─── Map entries → RSS items ───────────────────────────────────────────────────
const items: string[] = ENTRIES.map((entry) => {
  const url         = entryUrl(entry);
  const pubDate     = toRfc822(entry.year);
  const description = buildDescription(entry);
  const categoryTag = `<category>${xmlEscape(entry.category)}</category>`;
  const tagsXml     = entry.tags.map(t => `<category>${xmlEscape(t)}</category>`).join("\n      ");

  // Enclosure: link directly to the PDF if one is available (white papers / artifacts)
  const enclosureXml = entry.pdfUrl
    ? `\n      <enclosure url="${xmlEscape(entry.pdfUrl)}" type="application/pdf" length="0" />`
    : "";

  return `
    <item>
      <title>${xmlEscape(entry.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>research@faisalorakzai.com (${AUTHOR.name})</author>
      ${categoryTag}
      ${tagsXml}
      <description><![CDATA[${description}]]></description>${enclosureXml}
    </item>`;
});

// ─── Assemble feed ────────────────────────────────────────────────────────────
const buildDate  = new Date().toUTCString();
const newestDate = toRfc822(
  ENTRIES.reduce((max, e) => (e.year > max ? e.year : max), "2000")
);

const RSS_XML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
>
  <channel>
    <title>${xmlEscape(CHANNEL.title)}</title>
    <link>${CHANNEL.link}</link>
    <description>${xmlEscape(CHANNEL.description)}</description>
    <language>${CHANNEL.language}</language>
    <copyright>${xmlEscape(CHANNEL.copyright)}</copyright>
    <managingEditor>${xmlEscape(CHANNEL.managingEditor)}</managingEditor>
    <webMaster>${xmlEscape(CHANNEL.webMaster)}</webMaster>
    <generator>${xmlEscape(CHANNEL.generator)}</generator>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${newestDate}</pubDate>
    <ttl>${CHANNEL.ttl}</ttl>
    <sy:updatePeriod>daily</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>

    <!-- RSS self-link (Atom standard for RSS feed discovery) -->
    <atom:link href="${CHANNEL.feedUrl}" rel="self" type="application/rss+xml" />

    <!-- Feed image / favicon -->
    <image>
      <url>${CHANNEL.imageUrl}</url>
      <title>${xmlEscape(CHANNEL.title)}</title>
      <link>${CHANNEL.link}</link>
      <width>144</width>
      <height>144</height>
    </image>

    <!-- DC metadata -->
    <dc:creator>${xmlEscape(AUTHOR.name)}</dc:creator>
    <dc:rights>${xmlEscape(CHANNEL.copyright)}</dc:rights>
${items.join("\n")}
  </channel>
</rss>
`;

// ─── Write output ─────────────────────────────────────────────────────────────
mkdirSync(DIST, { recursive: true });

// Primary: /rss.xml
const rssPath = join(DIST, "rss.xml");
writeFileSync(rssPath, RSS_XML, "utf8");
console.log(`[generate-rss] ✓ ${rssPath}  (${ENTRIES.length} items)`);

// Alias: /feed/index.xml  (so /feed can also serve the feed as a file fallback)
const feedDir = join(DIST, "feed");
mkdirSync(feedDir, { recursive: true });
const feedPath = join(feedDir, "index.xml");
writeFileSync(feedPath, RSS_XML, "utf8");
console.log(`[generate-rss] ✓ ${feedPath}  (alias)`);

console.log(`[generate-rss] Done — feed available at ${CHANNEL.feedUrl}`);
