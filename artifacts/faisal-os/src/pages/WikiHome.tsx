import { useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/shared/SEOHead";

const WIKI_ARTICLES = [
  {
    slug: "faisalorakzai",
    title: "Muhammad Faisal Orakzai",
    subtitle: "محمد فیصل اورکزئی",
    description:
      "Pakistani technology entrepreneur, computer scientist, and founder of Orakzai Group. Born 30 April 2006 in Mamozai, District Orakzai, Khyber Pakhtunkhwa, Pakistan.",
    categories: ["Entrepreneurs", "Computer Scientists", "Blockchain", "AI"],
    updated: "August 2026",
  },
];

export default function WikiHome() {
  const [query, setQuery] = useState("");

  const filtered = WIKI_ARTICLES.filter(
    (a) =>
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="FaisalWiki — The Orakzai Group Knowledge Base"
        description="FaisalWiki is a free knowledge base documenting Muhammad Faisal Orakzai, Orakzai Group, and related technology ventures. Built for open access and global crawling."
        path="/wiki"
      />

      {/* JSON-LD for wiki portal */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FaisalWiki",
            description: "Free knowledge base on Muhammad Faisal Orakzai and Orakzai Group",
            url: "https://faisalorakzai.com/wiki",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://faisalorakzai.com/wiki/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <div
        className="min-h-screen bg-[#0d0d0d] text-white"
        style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}
      >
        {/* ── Portal header ── */}
        <div className="border-b border-[#F3BA2F]/20 bg-[#080808]">
          <div className="max-w-5xl mx-auto px-4 py-10 text-center">
            {/* Logo / Wordmark */}
            <div className="inline-flex flex-col items-center gap-1 mb-6">
              <div className="w-20 h-20 border-2 border-[#F3BA2F]/60 rounded-full flex items-center justify-center bg-[#F3BA2F]/5">
                <span className="text-[#F3BA2F] text-3xl font-bold" style={{ fontFamily: "serif" }}>
                  F
                </span>
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2"
                style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}
              >
                FaisalWiki
              </h1>
              <p className="text-white/40 text-sm mt-1 tracking-wide" style={{ fontFamily: "sans-serif" }}>
                The Orakzai Group Knowledge Base
              </p>
            </div>

            {/* Search bar */}
            <div className="max-w-xl mx-auto flex gap-2" style={{ fontFamily: "sans-serif" }}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search FaisalWiki…"
                className="flex-1 bg-[#111] border border-[#F3BA2F]/30 text-white text-sm px-4 py-2.5
                  placeholder-white/25 outline-none focus:border-[#F3BA2F]/70 transition-colors"
              />
              <button
                className="bg-[#F3BA2F]/10 hover:bg-[#F3BA2F]/20 border border-[#F3BA2F]/40 text-[#F3BA2F]
                  text-sm px-5 py-2.5 transition-colors font-semibold"
              >
                Search
              </button>
            </div>

            {/* Stats row */}
            <div
              className="flex flex-wrap justify-center gap-6 mt-8 text-[13px] text-white/35"
              style={{ fontFamily: "sans-serif" }}
            >
              {[
                ["1", "Article"],
                ["14+", "External links"],
                ["8+", "Publications"],
                ["Open", "Knowledge"],
              ].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-[#F3BA2F]/70 font-semibold text-base">{num}</div>
                  <div>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main portal columns ── */}
        <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

          {/* ── Left: articles list ── */}
          <div className="md:col-span-2 space-y-6">

            <div className="border-b border-[#F3BA2F]/20 pb-2 mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: "serif" }}>
                Articles
              </h2>
              <span className="text-white/30 text-xs font-mono" style={{ fontFamily: "sans-serif" }}>
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-white/30 text-sm py-8 text-center" style={{ fontFamily: "sans-serif" }}>
                No articles match "{query}"
              </div>
            ) : (
              filtered.map((article) => (
                <Link
                  key={article.slug}
                  href={`/wiki/${article.slug}`}
                  className="block border border-[#F3BA2F]/15 hover:border-[#F3BA2F]/40 bg-[#0a0a0a]
                    hover:bg-[#F3BA2F]/[0.03] transition-all p-4 group"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 border border-[#F3BA2F]/30 bg-[#F3BA2F]/5 flex items-center
                      justify-center shrink-0 group-hover:border-[#F3BA2F]/60 transition-colors">
                      <span className="text-[#F3BA2F] text-lg font-bold" style={{ fontFamily: "serif" }}>
                        {article.title.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <h3
                          className="text-white font-bold text-base group-hover:text-[#F3BA2F] transition-colors"
                          style={{ fontFamily: "serif" }}
                        >
                          {article.title}
                        </h3>
                        <span className="text-white/30 text-xs font-mono" style={{ fontFamily: "sans-serif" }}>
                          {article.subtitle}
                        </span>
                      </div>
                      <p
                        className="text-white/55 text-[13px] leading-relaxed mt-1"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {article.description}
                      </p>
                      <div
                        className="flex flex-wrap gap-2 mt-2"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {article.categories.map((cat) => (
                          <span
                            key={cat}
                            className="text-[10px] border border-[#F3BA2F]/15 text-white/35 px-2 py-0.5 font-mono"
                          >
                            {cat}
                          </span>
                        ))}
                        <span className="text-white/20 text-[10px] ml-auto" style={{ fontFamily: "monospace" }}>
                          Updated {article.updated}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}

            {/* Featured article callout */}
            <div className="border border-[#F3BA2F]/20 bg-[#0a0a0a] p-5 mt-4">
              <div
                className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase mb-3"
                style={{ fontFamily: "sans-serif" }}
              >
                Featured Article
              </div>
              <div className="flex gap-4">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096108879/EiWGrdKfjMCRlCzX.jpg"
                  alt="Faisal Orakzai"
                  className="w-16 h-16 object-cover object-top border border-[#F3BA2F]/20 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096108879/EiWGrdKfjMCRlCzX.jpg";
                  }}
                />
                <div>
                  <Link
                    href="/wiki/faisalorakzai"
                    className="text-[#F3BA2F] hover:underline font-bold text-base"
                    style={{ fontFamily: "serif" }}
                  >
                    Muhammad Faisal Orakzai
                  </Link>
                  <p
                    className="text-white/55 text-[13px] mt-1 leading-relaxed"
                    style={{ fontFamily: "sans-serif" }}
                  >
                    Pakistani technology entrepreneur and founder of Orakzai Group, operating in blockchain
                    infrastructure, AI, and FinTech.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <aside className="space-y-5" style={{ fontFamily: "sans-serif" }}>

            {/* About FaisalWiki */}
            <div className="border border-[#F3BA2F]/15 bg-[#0a0a0a] p-4">
              <h3 className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase mb-3">
                About FaisalWiki
              </h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                FaisalWiki is an open knowledge base documenting Muhammad Faisal Orakzai,
                Orakzai Group, and related ventures. Content is written in an encyclopedic
                style and is freely accessible for research and reference.
              </p>
            </div>

            {/* Browse by category */}
            <div className="border border-[#F3BA2F]/15 bg-[#0a0a0a] p-4">
              <h3 className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase mb-3">
                Browse by category
              </h3>
              <div className="space-y-1.5 text-[13px]">
                {[
                  ["Biography", "/wiki/faisalorakzai"],
                  ["Entrepreneurship", "/wiki/faisalorakzai#career"],
                  ["Blockchain & Web3", "/wiki/faisalorakzai#career-orakzai-bond"],
                  ["Research", "/wiki/faisalorakzai#research"],
                  ["Timeline", "/wiki/faisalorakzai#timeline"],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 text-white/50 hover:text-[#F3BA2F] transition-colors"
                  >
                    <span className="text-[#F3BA2F]/40">→</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Related sites */}
            <div className="border border-[#F3BA2F]/15 bg-[#0a0a0a] p-4">
              <h3 className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase mb-3">
                Official resources
              </h3>
              <div className="space-y-1.5 text-[13px]">
                {[
                  ["faisalorakzai.com", "https://faisalorakzai.com"],
                  ["Wikidata Q140264666", "https://www.wikidata.org/wiki/Q140264666"],
                  ["ORCID Profile", "https://orcid.org/0009-0000-0915-7272"],
                  ["Crunchbase", "https://www.crunchbase.com/person/faisal-orakzai"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#F3BA2F]/60 hover:text-[#F3BA2F] transition-colors"
                  >
                    <span className="text-[#F3BA2F]/30">↗</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* License note */}
            <div className="text-white/20 text-[11px] leading-relaxed border-t border-white/5 pt-4">
              Content on FaisalWiki is available for reference purposes. All facts are
              documented with public sources.
            </div>
          </aside>
        </div>

        {/* ── Footer bar ── */}
        <div className="border-t border-[#F3BA2F]/10 bg-[#080808] py-4" style={{ fontFamily: "sans-serif" }}>
          <div className="max-w-5xl mx-auto px-4 text-center text-white/20 text-[11px]">
            FaisalWiki · faisalorakzai.com/wiki ·{" "}
            <a
              href="https://www.wikidata.org/wiki/Q140264666"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3BA2F] transition-colors"
            >
              Wikidata: Q140264666
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
