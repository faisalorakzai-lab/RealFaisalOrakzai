import { useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/shared/SEOHead";

/* ──────────────────────────────────────────────
   Table of Contents data
────────────────────────────────────────────── */
const TOC: { id: string; label: string; sub?: { id: string; label: string }[] }[] = [
  {
    id: "early-life",
    label: "Early life and education",
    sub: [
      { id: "early-life-childhood", label: "Early life" },
      { id: "early-life-education", label: "Education" },
    ],
  },
  {
    id: "career",
    label: "Career",
    sub: [
      { id: "career-orakzai-group", label: "Orakzai Group" },
      { id: "career-okzbyte", label: "OkzByte" },
      { id: "career-orakzai-bond", label: "Orakzai Bond" },
      { id: "career-shamim-forever", label: "Shamim Forever" },
      { id: "career-orakzai-org", label: "Orakzai.org" },
    ],
  },
  { id: "philosophy", label: "Leadership and business philosophy" },
  {
    id: "research",
    label: "Research and publications",
    sub: [
      { id: "research-books", label: "Books" },
      { id: "research-papers", label: "Selected publications" },
    ],
  },
  { id: "timeline", label: "Timeline" },
  { id: "areas-of-work", label: "Areas of work" },
  { id: "public-speaking", label: "Public speaking" },
  { id: "affiliations", label: "Professional affiliations" },
  { id: "media", label: "Media coverage" },
  { id: "references", label: "References" },
  { id: "external-links", label: "External links" },
];

/* ──────────────────────────────────────────────
   JSON-LD structured data for bots/crawlers
────────────────────────────────────────────── */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://faisalorakzai.com/wiki/faisalorakzai#person",
      name: "Muhammad Faisal Orakzai",
      alternateName: ["Faisal Orakzai", "محمد فیصل اورکزئی", "Chairman Orakzai"],
      givenName: "Muhammad Faisal",
      familyName: "Orakzai",
      birthDate: "2006-04-30",
      birthPlace: {
        "@type": "Place",
        name: "Mamozai, District Orakzai, Khyber Pakhtunkhwa, Pakistan",
        addressCountry: "PK",
      },
      nationality: { "@type": "Country", name: "Pakistan" },
      description:
        "Pakistani technology entrepreneur, computer scientist, and founder of Orakzai Group. Works in blockchain infrastructure, artificial intelligence, FinTech, and software engineering.",
      jobTitle: "Founder and Chairman",
      worksFor: {
        "@type": "Organization",
        name: "Orakzai Group",
        url: "https://faisalorakzai.com",
      },
      knowsAbout: [
        "Blockchain technology",
        "Artificial intelligence",
        "Financial technology",
        "Software engineering",
        "Web3",
        "Decentralized finance",
        "Real-world asset tokenization",
      ],
      award: "Stevie Gold Award (via GMA Silicon Valley, 2025)",
      sameAs: [
        "https://www.linkedin.com/in/faisalorakzaii",
        "https://www.crunchbase.com/person/faisal-orakzai",
        "https://orcid.org/0009-0000-0915-7272",
        "https://github.com/faisalorakzai-lab",
        "https://peerlist.io/faisalorakzai",
        "https://hackernoon.com/u/faisalorakzai",
        "https://www.imdb.com/name/nm18674496",
        "https://x.com/faisalorakzaii",
        "https://www.instagram.com/faisalorakzaii",
        "https://www.facebook.com/faisalorakzaii",
        "https://www.tiktok.com/@chairmanorakzai",
        "https://www.wikidata.org/wiki/Q140264666",
        "https://linktr.ee/faisalorakzaiofficial",
      ],
      identifier: [
        { "@type": "PropertyValue", name: "ORCID", value: "0009-0000-0915-7272" },
        { "@type": "PropertyValue", name: "IMDb", value: "nm18674496" },
        { "@type": "PropertyValue", name: "Wikidata", value: "Q140264666" },
        { "@type": "PropertyValue", name: "Crunchbase Rank", value: "28" },
      ],
      url: "https://faisalorakzai.com",
      image: "https://faisalorakzai.com/faisal-official-knowledge-panel.jpg",
    },
    {
      "@type": "Article",
      "@id": "https://faisalorakzai.com/wiki/faisalorakzai#article",
      headline: "Muhammad Faisal Orakzai",
      description:
        "Encyclopedic article on Muhammad Faisal Orakzai — Pakistani technology entrepreneur, computer scientist, founder of Orakzai Group.",
      url: "https://faisalorakzai.com/wiki/faisalorakzai",
      inLanguage: "en",
      about: { "@id": "https://faisalorakzai.com/wiki/faisalorakzai#person" },
      author: {
        "@type": "Organization",
        name: "FaisalWiki",
        url: "https://faisalorakzai.com/wiki",
      },
      publisher: {
        "@type": "Organization",
        name: "Orakzai Group",
        url: "https://faisalorakzai.com",
        logo: { "@type": "ImageObject", url: "https://faisalorakzai.com/og-logo.webp" },
      },
      datePublished: "2026-08-01",
      dateModified: "2026-08-05",
      image: "https://faisalorakzai.com/faisal-official-knowledge-panel.jpg",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "faisalorakzai.com", item: "https://faisalorakzai.com" },
        { "@type": "ListItem", position: 2, name: "Wiki", item: "https://faisalorakzai.com/wiki" },
        {
          "@type": "ListItem",
          position: 3,
          name: "Muhammad Faisal Orakzai",
          item: "https://faisalorakzai.com/wiki/faisalorakzai",
        },
      ],
    },
  ],
};

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ──────────────────────────────────────────────
   Main component
────────────────────────────────────────────── */
export default function WikiFaisalOrakzai() {
  const [tocOpen, setTocOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"article" | "talk">("article");

  return (
    <>
      <SEOHead
        title="Muhammad Faisal Orakzai — FaisalWiki"
        description="Muhammad Faisal Orakzai is a Pakistani technology entrepreneur, computer scientist, and founder of Orakzai Group. This encyclopedic article documents his life, career, research, and publications."
        path="/wiki/faisalorakzai"
      />

      {/* Injected JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <div
        className="min-h-screen bg-[#0d0d0d] text-white"
        style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}
      >
        {/* ── Breadcrumb bar ── */}
        <div
          className="border-b border-[#F3BA2F]/12 bg-[#080808]/80 backdrop-blur-sm sticky top-[56px] z-10"
          style={{ fontFamily: "sans-serif" }}
        >
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-2 text-[10px] flex-wrap">
            <Link href="/" className="text-[#F3BA2F] hover:underline font-mono tracking-widest uppercase">
              faisalorakzai.com
            </Link>
            <span className="text-white/20">/</span>
            <Link href="/wiki" className="text-white/40 hover:text-[#F3BA2F] font-mono tracking-widest uppercase transition-colors">
              Wiki
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/55 font-mono">Muhammad_Faisal_Orakzai</span>
          </div>
        </div>

        {/* ── Article tabs (Wikipedia-style) ── */}
        <div
          className="border-b border-[#F3BA2F]/15 bg-[#0a0a0a]"
          style={{ fontFamily: "sans-serif" }}
        >
          <div className="max-w-5xl mx-auto px-4 flex items-end gap-0">
            {(["article", "talk"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-[12px] border-t border-x border-b-0 capitalize transition-colors
                  ${activeTab === tab
                    ? "border-[#F3BA2F]/30 bg-[#0d0d0d] text-[#F3BA2F]"
                    : "border-transparent text-white/35 hover:text-white/60"
                  }`}
              >
                {tab}
              </button>
            ))}
            <div className="flex-1" />
            <div className="flex items-center gap-1 pb-1">
              {["Read", "Edit history", "View history"].map((a) => (
                <span key={a} className="text-white/20 text-[11px] px-2 py-1 hover:text-white/40 cursor-default transition-colors">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Page content ── */}
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-16">

          {/* ── Source attribution ── */}
          <div className="text-white/30 text-[12px] mb-4 italic" style={{ fontFamily: "sans-serif" }}>
            From <span className="not-italic font-semibold text-white/40">FaisalWiki</span>, the free knowledge base
          </div>

          {/* ── Page title ── */}
          <h1
            id="top"
            className="text-[28px] md:text-[32px] font-bold text-white leading-tight mb-0.5 scroll-mt-32"
            style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}
          >
            Muhammad Faisal Orakzai
          </h1>
          <div className="text-white/35 text-[14px] mb-5 font-mono">محمد فیصل اورکزئی</div>

          {/* ── Hatnote ── */}
          <div
            className="border-l-2 border-[#F3BA2F]/30 pl-3 mb-5 text-white/45 text-[13px] italic"
            style={{ fontFamily: "sans-serif" }}
          >
            For the Orakzai Group's ecosystem and ventures, see{" "}
            <a href="/ecosystem" className="text-[#F3BA2F] hover:underline not-italic">
              Orakzai Group
            </a>
            .
          </div>

          {/* ── INFOBOX (float right on md+, stacked on mobile) ── */}
          <div
            className="md:float-right md:ml-6 md:mb-4 mb-6 w-full md:w-[280px] shrink-0 clear-right
              border border-[#F3BA2F]/30 bg-[#080808] text-[13px]"
          >
            {/* Infobox title */}
            <div className="bg-[#F3BA2F]/10 border-b border-[#F3BA2F]/25 px-3 py-2.5 text-center">
              <div className="text-[#F3BA2F] font-bold text-[14px]">Muhammad Faisal Orakzai</div>
              <div className="text-white/35 text-[11px] font-mono mt-0.5">محمد فیصل اورکزئی</div>
            </div>

            {/* Photo */}
            <div className="border-b border-[#F3BA2F]/12 text-center py-3 px-4 bg-[#060606]">
              <img
                src="https://faisalorakzai.com/faisal-official-knowledge-panel.jpg"
                alt="Muhammad Faisal Orakzai in 2026"
                className="w-[180px] mx-auto object-cover object-top"
                style={{ aspectRatio: "1/1" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://faisalorakzai.com/faisal-official-knowledge-panel.jpg";
                }}
              />
              <div className="text-white/30 text-[11px] mt-2 italic">Orakzai in 2026</div>
            </div>

            {/* Rows */}
            {(
              [
                ["Born", "30 April 2006 (age 19)\nMamozai, District Orakzai,\nKhyber Pakhtunkhwa, Pakistan"],
                ["Nationality", "Pakistani"],
                ["Citizenship", "Pakistan"],
                [
                  "Occupation",
                  "Technology entrepreneur\nComputer scientist\nBusiness executive",
                ],
                ["Years active", "2018–present"],
                [
                  "Known for",
                  "Blockchain infrastructure · AI\nFinTech · Web3\nSoftware engineering",
                ],
                ["Title", "Founder and Chairman,\nOrakzai Group"],
                [
                  "Education",
                  "Cadet College Kohat\nZiauddin University\nFounder Institute\nY Combinator Startup School",
                ],
                ["Father", "Dawlat Sher"],
                ["Website", "LINK"],
              ] as [string, string][]
            ).map(([key, val]) => (
              <div
                key={key}
                className="flex border-b border-[#F3BA2F]/8 last:border-0"
                style={{ fontFamily: "sans-serif" }}
              >
                <div className="w-[90px] shrink-0 px-2 py-1.5 text-white/50 text-[11px] font-semibold
                  bg-white/[0.015] leading-snug">
                  {key}
                </div>
                <div className="flex-1 px-2 py-1.5 text-white/75 text-[11px] leading-snug whitespace-pre-line">
                  {key === "Website" ? (
                    <a
                      href="https://faisalorakzai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F3BA2F] hover:underline"
                    >
                      faisalorakzai.com
                    </a>
                  ) : (
                    val
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Lead paragraph ── */}
          <p className="text-white/80 leading-[1.75] mb-4 text-[15px]">
            <b className="text-white font-bold">Muhammad Faisal Orakzai</b>{" "}
            <span className="text-white/45">(Urdu: </span>
            <b className="text-white/65">محمد فیصل اورکزئی</b>
            <span className="text-white/45">; born 30 April 2006)</span> is a Pakistani
            technology entrepreneur, computer scientist, and business executive. He is the
            founder and chairman of <b className="text-white">Orakzai Group</b>, a
            technology-focused organization working in blockchain infrastructure, artificial
            intelligence (AI), financial technology (FinTech), software engineering, and
            digital innovation. He is also the founder of{" "}
            <b className="text-white">Orakzai Bond (OKBOND)</b>,{" "}
            <b className="text-white">OkzByte</b>,{" "}
            <b className="text-white">Shamim Forever</b>, and{" "}
            <b className="text-white">Orakzai.org</b>.
          </p>
          <p className="text-white/80 leading-[1.75] mb-4 text-[15px]">
            Born in <b className="text-white">Mamozai</b>, District Orakzai, Khyber Pakhtunkhwa,
            Orakzai began his professional career in 2018 in Karachi's real estate sector before
            transitioning into technology. His entrepreneurial activities span blockchain
            infrastructure, artificial intelligence, enterprise software, digital commerce, and
            non-profit community development.
          </p>

          {/* ── Table of Contents ── */}
          <div
            className="inline-block border border-[#F3BA2F]/20 bg-[#080808] mb-6 w-full md:w-auto md:max-w-xs clear-left"
            style={{ fontFamily: "sans-serif" }}
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#F3BA2F]/15">
              <span className="text-white/65 text-[12px] font-semibold">Contents</span>
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="text-[#F3BA2F]/70 text-[11px] hover:underline ml-4"
              >
                [{tocOpen ? "hide" : "show"}]
              </button>
            </div>
            {tocOpen && (
              <ol className="px-3 py-2 space-y-0.5 text-[13px]">
                {TOC.map((s, i) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className="text-[#F3BA2F] hover:underline text-left"
                    >
                      <span className="text-white/35 mr-1">{i + 1}</span> {s.label}
                    </button>
                    {s.sub && (
                      <ol className="ml-5 mt-0.5 space-y-0.5">
                        {s.sub.map((ss, j) => (
                          <li key={ss.id}>
                            <button
                              onClick={() => scrollTo(ss.id)}
                              className="text-[#F3BA2F] hover:underline text-left text-[12px]"
                            >
                              <span className="text-white/25 mr-1">
                                {i + 1}.{j + 1}
                              </span>{" "}
                              {ss.label}
                            </button>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* ────────────────────────────────────────
              ARTICLE SECTIONS
          ──────────────────────────────────────── */}

          {/* Early life */}
          <WH2 id="early-life">1 Early life and education</WH2>

          <WH3 id="early-life-childhood">1.1 Early life</WH3>
          <WP>
            Faisal Orakzai was born on <b className="text-white">30 April 2006</b> in{" "}
            <b className="text-white">Mamozai</b>, District Orakzai (formerly Orakzai Agency),
            Tirah, Khyber Pakhtunkhwa, Pakistan, to{" "}
            <b className="text-white">Dawlat Sher</b>. He spent his early childhood in the
            mountainous tribal region of Orakzai before relocating with his family to{" "}
            <b className="text-white">Kohat</b> during a period of regional instability.
          </WP>
          <WP>
            Growing up in a rural environment, Orakzai was exposed to agriculture, livestock
            management, and community life from an early age. These experiences influenced his
            interest in problem-solving, resource management, and entrepreneurship. During his
            childhood, he developed an interest in computers, software, and emerging technologies,
            often learning through books, technical documentation, and online educational resources.
          </WP>
          <WP>
            In 2018, Orakzai relocated to <b className="text-white">Karachi</b>, where he continued
            his education and became involved in the local real estate sector. His experience in
            property markets later contributed to his interest in financial technology, blockchain
            infrastructure, digital assets, and software development.
          </WP>

          <WH3 id="early-life-education">1.2 Education</WH3>
          <WP>Orakzai received his early education in Kohat before continuing his studies in Karachi.</WP>
          <WP>His educational background includes:</WP>
          <ul className="list-disc list-outside ml-6 mb-4 space-y-1.5 text-white/75 text-[15px] leading-relaxed">
            {[
              ["Yahya Public School, Kohat", "Early primary education."],
              [
                "Madrassa Mahad-ul-Uleman, Kohat",
                "Islamic studies alongside formal education.",
              ],
              [
                "Cadet College Kohat",
                "Middle school education, where he participated in debating, student leadership, sports, and computer-related activities.",
              ],
              [
                "Ziauddin University, Karachi",
                "Completed Secondary School Certificate (Matriculation in Science) under the Board of Secondary Education Karachi, studying Science, Islamiat, Pakistan Studies, and Civics.",
              ],
              [
                "Founder Institute (Karachi – South Asia)",
                "Founder Program focused on entrepreneurship, venture building, startup development, leadership, and fundraising.",
              ],
              [
                "Y Combinator Startup School",
                "Entrepreneurship and startup education program focused on company building, product development, go-to-market strategy, fundraising, and technology startup scaling.",
              ],
            ].map(([inst, desc]) => (
              <li key={inst}>
                <b className="text-white">{inst}</b> — {desc}
              </li>
            ))}
          </ul>
          <WP>
            Alongside his formal education, Orakzai has pursued independent study in software
            engineering, blockchain systems, artificial intelligence, distributed computing,
            economics, finance, cybersecurity, and digital infrastructure through technical
            documentation, research papers, open-source projects, and online educational platforms.
          </WP>

          {/* Career */}
          <WH2 id="career">2 Career</WH2>
          <WP>
            Orakzai began his professional career in 2018 through the real estate sector in
            Karachi, where he gained experience in property marketing, client relations, sales, and
            business development. During this period, he also pursued independent study in software
            engineering, blockchain technology, financial systems, cloud computing, and artificial
            intelligence through online learning resources and open-source communities.
          </WP>
          <WP>
            As his interest in technology expanded, Orakzai shifted his focus from traditional
            business activities toward software development and digital infrastructure. His work
            later evolved into technology ventures operating across blockchain infrastructure,
            artificial intelligence, enterprise software, financial technology (FinTech), and
            digital commerce.
          </WP>

          <WH3 id="career-orakzai-group">2.1 Orakzai Group</WH3>
          <WP>
            In 2018, Orakzai founded <b className="text-white">Orakzai Group</b>, a privately held
            technology organization serving as the parent company for several ventures operating in
            software development, blockchain technology, artificial intelligence, financial
            technology, enterprise software, and digital commerce. The organization develops
            technology products, software platforms, digital infrastructure, and educational
            resources related to emerging technologies. As chairman of the organization, Orakzai
            oversees its long-term strategic direction and technology initiatives.
          </WP>

          <WH3 id="career-okzbyte">2.2 OkzByte</WH3>
          <WP>
            <b className="text-white">OkzByte</b> is a software and technology company founded by
            Orakzai in 2026. The company develops websites, enterprise software, cloud
            applications, artificial intelligence solutions, automation systems, blockchain
            applications, and custom digital platforms for businesses. Its areas of work include
            software engineering, cloud computing, digital infrastructure, blockchain integration,
            cybersecurity, enterprise automation, and Web3 technologies.
          </WP>

          <WH3 id="career-orakzai-bond">2.3 Orakzai Bond</WH3>
          <WP>
            <b className="text-white">Orakzai Bond</b> (also known as{" "}
            <b className="text-white">OKBOND</b>) is a blockchain project founded by Orakzai in
            2026. The project explores applications of blockchain technology in digital assets,
            smart contracts, decentralized finance (DeFi), and the tokenization of real-world
            assets (RWA). Technical documentation relating to the project has been published
            through its official website and associated publications. OKBOND is deployed on the
            Polygon blockchain network.
          </WP>

          <WH3 id="career-shamim-forever">2.4 Shamim Forever</WH3>
          <WP>
            <b className="text-white">Shamim Forever</b> is a digital commerce platform founded by
            Orakzai in 2026. The platform operates in the online retail sector and focuses on
            luxury consumer products, including fragrances, cosmetics, jewellery, and lifestyle
            goods. The platform incorporates digital commerce technologies and has announced plans
            to explore blockchain-based product authentication and digital ownership systems.
          </WP>

          <WH3 id="career-orakzai-org">2.5 Orakzai.org</WH3>
          <WP>
            <b className="text-white">Orakzai.org</b> is a non-profit initiative established by
            Orakzai in 2025. The organization focuses on humanitarian and community development
            activities, including education, legal awareness, migrant assistance, healthcare, clean
            water initiatives, humanitarian relief, and economic empowerment. The organization also
            publishes educational resources related to technology, entrepreneurship, digital
            literacy, and innovation.
          </WP>

          {/* Philosophy */}
          <WH2 id="philosophy">3 Leadership and business philosophy</WH2>
          <WP>
            Orakzai has stated that his work is based on a systems-oriented approach that combines
            software engineering, business strategy, and emerging technologies. His areas of
            interest include blockchain infrastructure, artificial intelligence, enterprise
            software, financial technology, and digital transformation.
          </WP>
          <WP>
            In interviews and public statements, he has emphasized the importance of practical
            technology development, continuous learning, open knowledge sharing, and
            entrepreneurship. He has expressed support for open knowledge, responsible innovation,
            and the development of technology ecosystems that encourage entrepreneurship and
            research.
          </WP>
          <WP>
            According to Orakzai, blockchain technology has applications beyond cryptocurrencies,
            including digital identity, financial infrastructure, supply chain management, and the
            tokenization of real-world assets. He has also written about the role of artificial
            intelligence in enterprise automation, business analytics, and software development.
          </WP>

          {/* Research */}
          <WH2 id="research">4 Research and publications</WH2>
          <WP>
            Alongside his entrepreneurial activities, Orakzai has written educational articles,
            technical papers, and white papers on blockchain technology, artificial intelligence,
            financial technology (FinTech), software engineering, enterprise systems, and digital
            infrastructure. His publications are primarily intended for developers, entrepreneurs,
            students, and readers interested in emerging technologies.
          </WP>
          <WP>
            He holds an ORCID identifier (0009-0000-0915-7272) for his published research and
            academic work. His research profile is indexed on Crunchbase, where he holds a Rank of
            #28, and on Peerlist and HackerNoon.
          </WP>

          <WH3 id="research-books">4.1 Books</WH3>
          <ul className="list-disc list-outside ml-6 mb-4 text-white/75 text-[15px]">
            <li>
              <i className="text-white/90">
                The Sovereign Stack: Engineering Next-Generation Blockchain Infrastructure
              </i>{" "}
              (2026)
            </li>
          </ul>

          <WH3 id="research-papers">4.2 Selected publications</WH3>
          <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-white/75 text-[15px]">
            {[
              "Macro-Liquidity Networks & Cross-Border FinTech Dynamics (2024)",
              "Real-World Asset Tokenisation: Protocol Mechanics & Market Depth (2024)",
              "Orakzai Bond — Sovereign Tokenised Debt Instrument White Paper (2024)",
              "OkzByte — Real Estate Tokenisation Protocol (2024)",
              "Cross-Chain Interoperability: Formal Verification and Recursive Zero-Knowledge Architectures (2026)",
            ].map((p) => (
              <li key={p}>
                <i className="text-white/90">{p.replace(/ \(\d+\)$/, "")}</i>{" "}
                ({p.match(/\((\d+)\)$/)?.[1]})
              </li>
            ))}
          </ul>

          {/* Timeline */}
          <WH2 id="timeline">5 Timeline</WH2>
          <div className="overflow-x-auto mb-6 clear-both" style={{ fontFamily: "sans-serif" }}>
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#F3BA2F]/10 border-b border-[#F3BA2F]/25">
                  <th className="text-left px-3 py-2 text-[#F3BA2F] font-semibold w-28 border-r border-[#F3BA2F]/15">
                    Year
                  </th>
                  <th className="text-left px-3 py-2 text-[#F3BA2F] font-semibold">Event</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2006", "Born in Mamozai, District Orakzai, Khyber Pakhtunkhwa, Pakistan."],
                  ["2010", "Relocated with his family to Kohat."],
                  [
                    "2011–2017",
                    "Completed early education in Kohat; studied both formal curriculum and Islamic studies at Madrassa Mahad-ul-Uleman.",
                  ],
                  [
                    "2018",
                    "Relocated to Karachi and began professional career in the real estate sector; founded Orakzai Group.",
                  ],
                  [
                    "2024",
                    "Published technical papers on blockchain infrastructure, financial technology, and tokenization.",
                  ],
                  [
                    "2025",
                    "Established Orakzai.org, a non-profit focused on education, healthcare, legal awareness, and humanitarian assistance.",
                  ],
                  ["2025", "Participated in the Founder Institute Founder Program (Karachi)."],
                  ["2026", "Participated in Y Combinator Startup School."],
                  ["2026", "Founded Orakzai Bond (OKBOND)."],
                  ["2026", "Founded OkzByte."],
                  ["2026", "Founded Shamim Forever."],
                  [
                    "2026",
                    "Published The Sovereign Stack: Engineering Next-Generation Blockchain Infrastructure.",
                  ],
                  [
                    "2026",
                    "Published Cross-Chain Interoperability: Formal Verification and Recursive Zero-Knowledge Architectures on Zenodo.",
                  ],
                ].map(([year, event], idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-[#F3BA2F]/8 ${idx % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                  >
                    <td className="px-3 py-2 text-white/55 font-mono border-r border-[#F3BA2F]/8 align-top whitespace-nowrap">
                      {year}
                    </td>
                    <td className="px-3 py-2 text-white/75">{event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Areas of work */}
          <WH2 id="areas-of-work">6 Areas of work</WH2>
          <WP>
            Orakzai's professional work spans several areas of technology and software development:
          </WP>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mb-6 ml-4 text-[14px]"
            style={{ fontFamily: "sans-serif" }}
          >
            {[
              "Blockchain",
              "Artificial intelligence",
              "Financial technology",
              "Software engineering",
              "Enterprise software",
              "Cloud computing",
              "Digital infrastructure",
              "Automation",
              "Cybersecurity",
              "Digital commerce",
              "Web3",
              "Real-world asset tokenization",
            ].map((a) => (
              <div key={a} className="flex items-center gap-2 text-white/65">
                <span className="text-[#F3BA2F]/45">•</span>
                <span>{a}</span>
              </div>
            ))}
          </div>

          {/* Public speaking */}
          <WH2 id="public-speaking">7 Public speaking</WH2>
          <WP>
            Orakzai has participated in interviews, podcasts, and public discussions on topics
            including blockchain technology, artificial intelligence, entrepreneurship, software
            engineering, financial technology, and digital infrastructure. His presentations
            generally focus on technology education, startup development, and the practical
            adoption of emerging technologies.
          </WP>

          {/* Affiliations */}
          <WH2 id="affiliations">8 Professional affiliations</WH2>
          <WP>
            Orakzai maintains professional profiles and research identifiers on several public
            platforms. He has participated in entrepreneurship and technology communities through
            a number of professional organizations and educational initiatives, including:
          </WP>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mb-4 ml-4 text-[14px]"
            style={{ fontFamily: "sans-serif" }}
          >
            {[
              "Founder Institute",
              "Y Combinator Startup School",
              "Global Entrepreneurship Network (GEN)",
              "ORCID",
              "Crunchbase",
              "LinkedIn",
              "GitHub",
              "Peerlist",
              "HackerNoon",
              "F6S",
              "The Org",
              "IMDb",
            ].map((a) => (
              <div key={a} className="flex items-center gap-2 text-white/65">
                <span className="text-[#F3BA2F]/45">•</span>
                <span>{a}</span>
              </div>
            ))}
          </div>

          {/* Media */}
          <WH2 id="media">9 Media coverage</WH2>
          <WP>
            Orakzai's entrepreneurial activities, publications, and technology ventures have been
            covered by a number of online news and technology platforms. Coverage has primarily
            focused on blockchain technology, entrepreneurship, software development, and digital
            innovation.
          </WP>
          <div
            className="border border-[#F3BA2F]/15 bg-[#080808] p-4 mb-6 space-y-2.5 text-[13px]"
            style={{ fontFamily: "sans-serif" }}
          >
            {[
              [
                "The Cow News",
                "Faisal Orakzai launches blockchain book on Amazon Kindle",
                "https://www.thecownews.com/blog/faisal-orakzai-launches-blockchain-book-on-amazon-kindle/",
              ],
              [
                "OpenPR",
                "Young Pakistani entrepreneur expands global vision through technology initiatives",
                "https://www.openpr.com/news/4560198/young-pakistani-entrepreneur-expands-global-vision-through",
              ],
              [
                "PRLog",
                "Young Pakistani entrepreneur expands global vision through OKBOND and Shamim Forever",
                "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html",
              ],
              [
                "61 News PK",
                "Technology entrepreneur coverage",
                "https://www.61news.pk/?p=279",
              ],
            ].map(([src, title, url]) => (
              <div key={url} className="flex gap-2">
                <span className="text-[#F3BA2F]/40 shrink-0 mt-0.5">↗</span>
                <div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3BA2F] hover:underline"
                  >
                    {title}
                  </a>
                  <span className="text-white/30 ml-2">— {src}</span>
                </div>
              </div>
            ))}
          </div>

          {/* References */}
          <WH2 id="references">10 References</WH2>
          <div
            className="border border-[#F3BA2F]/12 bg-[#080808] p-4 mb-6 text-[12px] space-y-1.5"
            style={{ fontFamily: "sans-serif" }}
          >
            <p className="text-white/35 mb-3">
              This article is based on publicly verifiable information from the following sources:
            </p>
            {[
              ["1", "faisalorakzai.com — official website", "https://faisalorakzai.com"],
              ["2", "Wikidata Q140264666", "https://www.wikidata.org/wiki/Q140264666"],
              [
                "3",
                "ORCID 0009-0000-0915-7272",
                "https://orcid.org/0009-0000-0915-7272",
              ],
              [
                "4",
                "Crunchbase — Faisal Orakzai",
                "https://www.crunchbase.com/person/faisal-orakzai",
              ],
              [
                "5",
                "IMDb nm18674496",
                "https://www.imdb.com/name/nm18674496",
              ],
              [
                "6",
                "PRLog press release — OKBOND & Shamim Forever",
                "https://www.prlog.org/13154317",
              ],
              [
                "7",
                "OpenPR — technology initiatives announcement",
                "https://www.openpr.com/news/4560198",
              ],
            ].map(([num, label, url]) => (
              <div key={num} className="flex gap-2 text-white/50">
                <span className="text-white/25 shrink-0">[{num}]</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F3BA2F]/70 hover:text-[#F3BA2F] hover:underline transition-colors"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          {/* External links */}
          <WH2 id="external-links">11 External links</WH2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-8 text-[14px] clear-both"
            style={{ fontFamily: "sans-serif" }}
          >
            {[
              ["Official website", "https://faisalorakzai.com"],
              ["LinkedIn", "https://www.linkedin.com/in/faisalorakzaii"],
              ["Crunchbase", "https://www.crunchbase.com/person/faisal-orakzai"],
              ["ORCID", "https://orcid.org/0009-0000-0915-7272"],
              ["GitHub", "https://github.com/faisalorakzai-lab"],
              ["Peerlist", "https://peerlist.io/faisalorakzai"],
              ["HackerNoon", "https://hackernoon.com/u/faisalorakzai"],
              ["IMDb", "https://www.imdb.com/name/nm18674496"],
              ["Linktree", "https://linktr.ee/faisalorakzaiofficial"],
              ["X (Twitter)", "https://x.com/faisalorakzaii"],
              ["Instagram", "https://www.instagram.com/faisalorakzaii"],
              ["Facebook", "https://www.facebook.com/faisalorakzaii"],
              ["TikTok", "https://www.tiktok.com/@chairmanorakzai"],
              ["Wikidata Q140264666", "https://www.wikidata.org/wiki/Q140264666"],
              ["CoinMarketCap Community", "https://coinmarketcap.com/community/profile/faisalorakzai"],
            ].map(([label, url]) => (
              <div key={url} className="flex items-center gap-2">
                <span className="text-[#F3BA2F]/35">•</span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F3BA2F] hover:underline"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          {/* ── Categories ── */}
          <div className="border-t border-[#F3BA2F]/15 pt-4 mt-2 clear-both">
            <div
              className="text-white/30 text-[10px] font-mono mb-2 tracking-widest uppercase"
              style={{ fontFamily: "sans-serif" }}
            >
              Categories
            </div>
            <div className="flex flex-wrap gap-1.5" style={{ fontFamily: "sans-serif" }}>
              {[
                "2006 births",
                "Living people",
                "People from Orakzai District",
                "Pakistani businesspeople",
                "Pakistani technology businesspeople",
                "Pakistani computer scientists",
                "Pakistani software engineers",
                "Pakistani company founders",
                "Blockchain researchers",
                "Artificial intelligence researchers",
                "Financial technology",
                "Businesspeople from Karachi",
                "Web3",
              ].map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 border border-[#F3BA2F]/18 text-white/35 text-[10px] font-mono
                    hover:text-[#F3BA2F] hover:border-[#F3BA2F]/40 transition-colors cursor-default"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* ── Article footer ── */}
          <div
            className="mt-8 pt-4 border-t border-white/5 text-[11px] text-white/20 flex flex-wrap gap-4"
            style={{ fontFamily: "sans-serif" }}
          >
            <span>Last updated: August 2026</span>
            <span>·</span>
            <a
              href="https://www.wikidata.org/wiki/Q140264666"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3BA2F] transition-colors"
            >
              Wikidata: Q140264666
            </a>
            <span>·</span>
            <Link href="/wiki" className="hover:text-[#F3BA2F] transition-colors">
              ← Back to FaisalWiki
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   Heading helpers
────────────────────────────────────────────── */
function WH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[19px] font-bold text-white border-b border-[#F3BA2F]/20 pb-1.5 mt-10 mb-3 scroll-mt-28 clear-both"
      style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}
    >
      {children}
    </h2>
  );
}

function WH3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="text-[15px] font-bold text-white/90 mt-5 mb-2 scroll-mt-28"
      style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}
    >
      {children}
    </h3>
  );
}

function WP({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-white/75 leading-[1.8] mb-3 text-[15px]"
      style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}
    >
      {children}
    </p>
  );
}
