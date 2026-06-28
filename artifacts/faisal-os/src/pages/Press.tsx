import { motion, AnimatePresence } from "framer-motion";
  import { useState, useEffect } from "react";
  import { Newspaper, ExternalLink, Calendar, Building2, Globe, Award, Mic, TrendingUp } from "lucide-react";
import SEOHead from "@/components/shared/SEOHead";

  // Ã¢ÂÂÃ¢ÂÂ Types Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
  interface PressArticle {
    id: string;
    headline: string;
    summary: string;
    publisher: string;
    publisherUrl: string;
    articleUrl: string;
    seeAwardUrl?: string;
    datePublished: string;
    dateModified?: string;
    category: "Featured" | "Blockchain" | "Founder" | "Awards" | "Partnerships" | "Interviews" | "Announcements";
    image?: string;
    isLead?: boolean;
    authoritative?: boolean;
  }

  // Ã¢ÂÂÃ¢ÂÂ Press Data (real verified mentions) Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
  const PRESS_ARTICLES: PressArticle[] = [
    {
      id: "stevie-2026",
      headline: "Muhammad Faisal Orakzai Wins Stevie Gold Award for Technology Innovation 2026",
      summary: "Pakistan's youngest blockchain architect, Muhammad Faisal Orakzai, receives the prestigious Stevie Gold Award Ã¢ÂÂ the first Pakistani to win in the Technology Innovation category, recognised for Orakzai Bond (OKBOND) on Polygon Layer-2 blockchain.",
      publisher: "Stevie Awards",
      publisherUrl: "https://www.stevieawards.com",
      articleUrl: "https://www.stevieawards.com",
      seeAwardUrl: "https://drive.google.com/file/d/12YR3guJ8w-650RYqewhC-CuMUZKgubuk/view?usp=drivesdk",
      datePublished: "2026-03-15",
      category: "Awards",
      image: "/story/story-05.png",
      isLead: true,
      authoritative: true,
    },
    {
      id: "gma-silicon-valley-2025",
      headline: "Faisal Orakzai Addresses GMA Silicon Valley as Pakistan's Youngest Blockchain Founder",
      summary: "Muhammad Faisal Orakzai represented Pakistan at GMA Silicon Valley 2025, presenting Orakzai Bond's Polygon Layer-2 infrastructure and the sovereign digital economy model for emerging markets.",
      publisher: "GMA Silicon Valley",
      publisherUrl: "https://www.gmasilionvalley.com",
      articleUrl: "https://www.gmasilionvalley.com",
      datePublished: "2025-11-20",
      category: "Featured",
      image: "/story/story-05.png",
      authoritative: true,
    },
    {
      id: "okbond-polygon-launch",
      headline: "Orakzai Bond (OKBOND) Launches on Polygon Layer-2 Ã¢ÂÂ Pakistan's First Sovereign Blockchain Token",
      summary: "Orakzai Group officially launches OKBOND, a deflationary cryptocurrency on Polygon Layer-2 blockchain. Founded by Muhammad Faisal Orakzai, OKBOND is designed as Pakistan's sovereign digital reserve asset with real-economy tokenization of real estate, luxury, and agriculture.",
      publisher: "Orakzai Bond Official",
      publisherUrl: "https://orakzaibond.com",
      articleUrl: "https://orakzaibond.com",
      datePublished: "2025-08-01",
      category: "Blockchain",
      image: "/logos/okbond.png",
      authoritative: true,
    },
    {
      id: "shamim-forever-launch",
      headline: "Shamim Forever Launches Web3-Authenticated Luxury Perfumes with Blockchain Provenance",
      summary: "Shamim Forever (shamimforever.com) Ã¢ÂÂ the luxury brand under Orakzai Group Ã¢ÂÂ launches its first collection of cryptographically authenticated perfumes and sapphire jewelry, where each product carries an on-chain provenance certificate on Polygon.",
      publisher: "Shamim Forever",
      publisherUrl: "https://www.shamimforever.com",
      articleUrl: "https://www.shamimforever.com",
      datePublished: "2025-10-05",
      category: "Announcements",
      image: "/logos/shamim-forever.jpg",
    },
    {
      id: "wikidata-q140264666",
      headline: "Muhammad Faisal Orakzai Listed on Wikidata as Recognised Public Figure Ã¢ÂÂ Q140264666",
      summary: "Faisal Orakzai becomes one of Pakistan's youngest entrepreneurs to receive a verified Wikidata entity (Q140264666), establishing his footprint on the open knowledge graph used by Google, Wikipedia, and Siri for knowledge panel recognition.",
      publisher: "Wikidata Ã¢ÂÂ Wikimedia Foundation",
      publisherUrl: "https://www.wikidata.org/wiki/Q140264666",
      articleUrl: "https://www.wikidata.org/wiki/Q140264666",
      datePublished: "2025-07-01",
      category: "Featured",
      authoritative: true,
    },
    {
      id: "okzbyte-ai-stack",
      headline: "OkzByte Technology Ã¢ÂÂ Orakzai Group's AI Engineering Division Launches High-Throughput Infrastructure",
      summary: "OkzByte Technology, the AI and engineering arm of Orakzai Group led by Faisal Orakzai, announces its AI infrastructure stack for autonomous financial management, powering QORIX Ã¢ÂÂ the group's autonomous capital allocation engine.",
      publisher: "OkzByte Technology Ã¢ÂÂ GitHub",
      publisherUrl: "https://github.com/faisalorakzai-lab",
      articleUrl: "https://github.com/faisalorakzai-lab",
      datePublished: "2025-12-01",
      category: "Blockchain",
      image: "/logos/okzbyte.png",
    },
    {
      id: "qorix-autonomous-finance",
      headline: "QORIX Ã¢ÂÂ Orakzai Group Unveils Autonomous Financial AI System for Sovereign Capital Management",
      summary: "QORIX, developed under OkzByte Technology (Orakzai Group), is an autonomous AI financial management system designed for sovereign capital allocation. Founded by Muhammad Faisal Orakzai, QORIX integrates on-chain treasury management with AI-driven portfolio rebalancing.",
      publisher: "Orakzai Group",
      publisherUrl: "https://faisalorakzai.com/ecosystem",
      articleUrl: "https://faisalorakzai.com/ecosystem",
      datePublished: "2026-01-15",
      category: "Blockchain",
      image: "/logos/qorix.png",
    },
    {
      id: "dusseldorf-international",
      headline: "Faisal Orakzai Expands Orakzai Group's International Footprint Ã¢ÂÂ DÃÂ¼sseldorf, Germany",
      summary: "Muhammad Faisal Orakzai visits DÃÂ¼sseldorf, Germany, representing Orakzai Group in European blockchain and luxury market discussions, solidifying the Group's international expansion beyond Pakistan.",
      publisher: "Orakzai Group International",
      publisherUrl: "https://faisalorakzai.com",
      articleUrl: "https://faisalorakzai.com/founder",
      datePublished: "2026-02-10",
      category: "Founder",
      image: "/story/story-17.jpg",
    },
    {
      id: "wall-street-new-york",
      headline: "Faisal Orakzai at Wall Street: Pakistan's Blockchain Tokenization Vision for Global Capital Markets",
      summary: "Muhammad Faisal Orakzai makes a landmark visit to Wall Street, New York, meeting with institutional investors to discuss Orakzai Bond's Polygon Layer-2 infrastructure and real estate tokenization Ã¢ÂÂ bridging Pakistan's economy to global capital markets.",
      publisher: "Orakzai Group Media",
      publisherUrl: "https://faisalorakzai.com",
      articleUrl: "https://faisalorakzai.com/founder",
      datePublished: "2026-04-01",
      category: "Founder",
      image: "/story/story-12.jpg",
    },
    {
      id: "everybodywiki-profile",
      headline: "Faisal Orakzai Profiled on EverybodyWiki Ã¢ÂÂ Verified Public Entrepreneur Biography",
      summary: "An independent verified biography of Muhammad Faisal Orakzai is published on EverybodyWiki, providing an authoritative reference point for Google's knowledge graph verification of Faisal as a recognised public entrepreneur from Pakistan.",
      publisher: "EverybodyWiki",
      publisherUrl: "https://en.everybodywiki.com/Faisal_Orakzai",
      articleUrl: "https://en.everybodywiki.com/Faisal_Orakzai",
      datePublished: "2025-06-01",
      category: "Featured",
      authoritative: true,
    },
    {
      id: "crunchbase-profile",
      headline: "Muhammad Faisal Orakzai Listed on Crunchbase Ã¢ÂÂ Pakistan Blockchain Startup Founder",
      summary: "Faisal Orakzai and Orakzai Group receive a verified Crunchbase profile, recognised as a startup founder in the blockchain and AI sector from Pakistan. Crunchbase is a key trust signal for Google Knowledge Panel.",
      publisher: "Crunchbase",
      publisherUrl: "https://www.crunchbase.com/person/faisal-orakzai",
      articleUrl: "https://www.crunchbase.com/person/faisal-orakzai",
      datePublished: "2025-09-01",
      category: "Founder",
      authoritative: true,
    },
    {
      id: "orcid-researcher",
      headline: "Muhammad Faisal Orakzai Assigned ORCID Research ID Ã¢ÂÂ Blockchain & AI Research Recognition",
      summary: "Faisal Orakzai receives an ORCID researcher ID (0009-0000-0915-7272), validating his contributions to blockchain research, AI system architecture, and tokenization frameworks Ã¢ÂÂ signalling academic-grade credibility for Knowledge Panel.",
      publisher: "ORCID Ã¢ÂÂ Open Researcher and Contributor ID",
      publisherUrl: "https://orcid.org/0009-0000-0915-7272",
      articleUrl: "https://orcid.org/0009-0000-0915-7272",
      datePublished: "2025-05-01",
      category: "Founder",
      authoritative: true,
    },
  ];

  const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    All: <Globe className="w-3 h-3" />,
    Featured: <TrendingUp className="w-3 h-3" />,
    Blockchain: <Award className="w-3 h-3" />,
    Founder: <Building2 className="w-3 h-3" />,
    Awards: <Award className="w-3 h-3" />,
    Partnerships: <Globe className="w-3 h-3" />,
    Interviews: <Mic className="w-3 h-3" />,
    Announcements: <Newspaper className="w-3 h-3" />,
  };

  const ALL_CATEGORIES = ["All", "Featured", "Blockchain", "Founder", "Awards", "Announcements"];

  // Ã¢ÂÂÃ¢ÂÂ JSON-LD injection Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
  function injectPressSchema(articles: PressArticle[]) {
    const existing = document.getElementById("press-schema");
    if (existing) existing.remove();

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        // WebPage with Wikidata sameAs â for search spider institutional linking
          {
            "@type": "WebPage",
            "name": "Official Press Room â Muhammad Faisal Orakzai",
            "description": "Media coverage, global awards, and verified institutional profiles for Muhammad Faisal Orakzai.",
            "url": "https://faisalorakzai.com/press",
            "about": {
              "@type": "Person",
              "name": "Muhammad Faisal Orakzai",
              "sameAs": "https://www.wikidata.org/wiki/Q140264666"
            }
          },
          // ItemList of all articles
        {
          "@type": "ItemList",
          "name": "Faisal Orakzai Press Coverage Ã¢ÂÂ Orakzai Group Media",
          "description": "Press mentions, awards, and news coverage of Muhammad Faisal Orakzai, Founder & Chairman of Orakzai Group Pakistan",
          "url": "https://faisalorakzai.com/press",
          "numberOfItems": articles.length,
          "itemListElement": articles.map((a, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "url": a.articleUrl,
            "name": a.headline,
          })),
        },
        // Individual NewsArticle schemas
        ...articles.map((a) => ({
          "@type": "NewsArticle",
          "headline": a.headline,
          "description": a.summary,
          "datePublished": a.datePublished,
          "dateModified": a.dateModified || a.datePublished,
          "url": a.articleUrl,
          "image": a.image ? `https://faisalorakzai.com${a.image}` : "https://faisalorakzai.com/story/story-01.jpg",
          "author": {
            "@type": "Person",
            "name": "Muhammad Faisal Orakzai",
            "url": "https://faisalorakzai.com/founder",
            "sameAs": ["https://www.wikidata.org/wiki/Q140264666", "https://www.linkedin.com/in/faisalorakzaii"],
          },
          "publisher": {
            "@type": "Organization",
            "name": a.publisher,
            "url": a.publisherUrl,
            "logo": { "@type": "ImageObject", "url": "https://faisalorakzai.com/logo.png" },
          },
          "about": {
            "@type": "Person",
            "name": "Muhammad Faisal Orakzai",
            "url": "https://faisalorakzai.com/founder",
            "@id": "https://www.wikidata.org/wiki/Q140264666",
          },
          "mentions": [
            { "@type": "Person", "name": "Muhammad Faisal Orakzai", "url": "https://faisalorakzai.com/founder" },
            { "@type": "Organization", "name": "Orakzai Group", "url": "https://faisalorakzai.com" },
            { "@type": "Organization", "name": "Orakzai Bond", "url": "https://orakzaibond.com" },
          ],
          "keywords": "Faisal Orakzai, Muhammad Faisal Orakzai, Orakzai Group, OKBOND, blockchain Pakistan, Polygon, ÃÂÃÂÃÂµÃÂ ÃÂ§ÃÂÃÂ±ÃÂ©ÃÂ²ÃÂ¦ÃÂ",
          "inLanguage": "en",
          "isPartOf": { "@type": "WebPage", "url": "https://faisalorakzai.com/press" },
        })),
      ],
    };

    const tag = document.createElement("script");
    tag.id = "press-schema";
    tag.type = "application/ld+json";
    tag.text = JSON.stringify(schema);
    document.head.appendChild(tag);
  }

  // Ã¢ÂÂÃ¢ÂÂ Component Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ
  export default function Press() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = activeCategory === "All"
      ? PRESS_ARTICLES
      : PRESS_ARTICLES.filter((a) => a.category === activeCategory);

    const lead = filtered.find((a) => a.isLead) || filtered[0];
    const rest = filtered.filter((a) => a.id !== lead?.id);

    useEffect(() => {
      injectPressSchema(PRESS_ARTICLES);
      // Update OG tags for press page
      document.title = "Press Room Ã¢ÂÂ Faisal Orakzai | Orakzai Group Media Coverage | ÃÂÃÂÃÂµÃÂ ÃÂ§ÃÂÃÂ±ÃÂ©ÃÂ²ÃÂ¦ÃÂ";
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", "Press Room Ã¢ÂÂ Muhammad Faisal Orakzai | Stevie Gold Award Winner | ÃÂÃÂÃÂµÃÂ ÃÂ§ÃÂÃÂ±ÃÂ©ÃÂ²ÃÂ¦ÃÂ");
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", "https://faisalorakzai.com/press");
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute("href", "https://faisalorakzai.com/press");
      return () => { document.getElementById("press-schema")?.remove(); };
    }, []);

    return (
      <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Press & Media Coverage — Faisal Orakzai"
        description="Press coverage, interviews, awards and media appearances of Faisal Orakzai and Orakzai Group — Stevie Gold Award, GMA Silicon Valley, PRLog, Hackernoon, Crunchbase Rank #28."
        path="/press"
        keywords="Faisal Orakzai press, Orakzai Group news, Stevie Award blockchain, GMA Silicon Valley Pakistan"
      />

        {/* Ã¢ÂÂÃ¢ÂÂ Hero Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
        <section className="pt-36 md:pt-40 pb-0 border-b border-[#F3BA2F]/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Newspaper className="h-4 w-4 text-[#F3BA2F]" />
                  <span className="text-xs font-mono text-white/30 tracking-[0.3em]">ORAKZAI PRESS ROOM</span>
                </div>
                <div className="text-xs font-mono text-white/20 hidden sm:block">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter pb-2">
                Press <span className="gold-gradient">Room</span>
              </h1>
              <p className="text-white/40 font-mono text-sm mt-3 pb-8">
                Media coverage ÃÂ· Awards ÃÂ· Verified mentions Ã¢ÂÂ Muhammad Faisal Orakzai, ÃÂÃÂÃÂµÃÂ ÃÂ§ÃÂÃÂ±ÃÂ©ÃÂ²ÃÂ¦ÃÂ
              </p>

              {/* Category tabs */}
              <div className="flex gap-0 overflow-x-auto border-b border-[#F3BA2F]/10">
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-5 py-4 text-xs font-mono uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${
                      activeCategory === cat
                        ? "border-[#F3BA2F] text-[#F3BA2F]"
                        : "border-transparent text-white/30 hover:text-white/70"
                    }`}
                  >
                    {CATEGORY_ICONS[cat]}
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ã¢ÂÂÃ¢ÂÂ Stats Bar Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
        <section className="border-b border-[#F3BA2F]/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#F3BA2F]/10">
              {[
                { val: "12+", label: "Press Mentions" },
                { val: "1", label: "Stevie Gold Award" },
                { val: "6+", label: "Authority Profiles" },
                { val: "Q140264666", label: "Wikidata Entity" },
              ].map(({ val, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: "easeOut" }}
                  className="py-6 px-4 md:px-6 text-center overflow-hidden"
                >
                  <div
                    className="font-bold gold-gradient font-mono leading-tight"
                    style={{
                      fontSize: val === "Q140264666"
                        ? "clamp(1.5rem, 4vw, 2.5rem)"
                        : "1.5rem",
                    }}
                  >
                    {val}
                  </div>
                  <div className="text-xs text-white/30 font-mono mt-1 uppercase tracking-wider">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ã¢ÂÂÃ¢ÂÂ Articles Grid Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
        
          {/* ── Press Kit Download ──────────────────────────────────────────── */}
          <section className="border-t border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-4 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Press Kit</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
                  Download <span className="gold-gradient">Media Assets</span>
                </h2>
                <p className="text-white/40 text-sm font-mono max-w-lg">
                  Official assets for journalists, researchers, and media professionals — high-res photos, logos, white papers, and verified biography.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F3BA2F]/6">

                {/* Official Bio */}
                <motion.a href="/founder" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 flex items-center justify-center text-[#F3BA2F]/70 font-mono font-bold">B</div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider border border-white/8 px-2 py-1">HTML</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">Official Biography</div>
                    <div className="text-xs text-white/35 font-mono">Full founder profile, ventures, background</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> View Profile →
                  </div>
                </motion.a>

                {/* High-Res Headshot */}
                <motion.a href="/story/story-05.png" download="faisal-orakzai-headshot.png" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 overflow-hidden">
                      <img src="/story/story-05.png" alt="Faisal Orakzai" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider border border-white/8 px-2 py-1">PNG</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">High-Res Headshot</div>
                    <div className="text-xs text-white/35 font-mono">Official press photo — Muhammad Faisal Orakzai</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> Download Photo →
                  </div>
                </motion.a>

                {/* Logo */}
                <motion.a href="/logo.png" download="orakzai-logo.png" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 flex items-center justify-center overflow-hidden">
                      <img src="/logo.png" alt="Orakzai logo" className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity" style={{ filter: "drop-shadow(0 0 4px rgba(243,186,47,0.4))" }} />
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider border border-white/8 px-2 py-1">PNG</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">Official Logo</div>
                    <div className="text-xs text-white/35 font-mono">Orakzai Group primary logo mark</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> Download Logo →
                  </div>
                </motion.a>

                {/* White Paper 1 */}
                <motion.a href="https://drive.google.com/uc?export=download&id=1Q6bClDOeBCBxBZfKdD9SnqSpNFrG-u7A" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 flex items-center justify-center">
                      <span className="text-[#F3BA2F]/60 text-xs font-mono font-bold">PDF</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F3BA2F]/40 uppercase tracking-wider border border-[#F3BA2F]/15 px-2 py-1">White Paper</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">Orakzai Bond — Full Framework</div>
                    <div className="text-xs text-white/35 font-mono">Issuance, governance & redemption protocol</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> Download PDF →
                  </div>
                </motion.a>

                {/* White Paper 2 */}
                <motion.a href="https://drive.google.com/uc?export=download&id=1T_isI9xvQQr_Mbkt1YyBvNF4kLUOcVgj" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 flex items-center justify-center">
                      <span className="text-[#F3BA2F]/60 text-xs font-mono font-bold">PDF</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F3BA2F]/40 uppercase tracking-wider border border-[#F3BA2F]/15 px-2 py-1">White Paper</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">Orakzai Bond — Technical Architecture</div>
                    <div className="text-xs text-white/35 font-mono">Smart contracts, escrow & oracle integration</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> Download PDF →
                  </div>
                </motion.a>

                {/* White Paper 3 */}
                <motion.a href="https://drive.google.com/uc?export=download&id=1Psz7Iy5aREH_ltKPGLglTwR2ln1VTHWS" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 flex items-center justify-center">
                      <span className="text-[#F3BA2F]/60 text-xs font-mono font-bold">PDF</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F3BA2F]/40 uppercase tracking-wider border border-[#F3BA2F]/15 px-2 py-1">White Paper</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">Orakzai Bond — Regulatory Compliance</div>
                    <div className="text-xs text-white/35 font-mono">Legal boundary mapping, AML/KYC, G20 markets</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> Download PDF →
                  </div>
                </motion.a>

                {/* White Paper 4 */}
                <motion.a href="https://drive.google.com/uc?export=download&id=1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 flex items-center justify-center">
                      <span className="text-[#F3BA2F]/60 text-xs font-mono font-bold">PDF</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F3BA2F]/40 uppercase tracking-wider border border-[#F3BA2F]/15 px-2 py-1">White Paper</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">Orakzai Properties — RWA Tokenization</div>
                    <div className="text-xs text-white/35 font-mono">Fractional real estate on-chain settlement</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> Download PDF →
                  </div>
                </motion.a>

                {/* CV */}
                <motion.a href="https://drive.google.com/uc?export=download&id=1X1NT-UZzGGhSgcOkZiuyBsm76OoLWpeh" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#F3BA2F]/25 flex items-center justify-center">
                      <span className="text-[#F3BA2F]/60 text-xs font-mono font-bold">CV</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#F3BA2F]/40 uppercase tracking-wider border border-[#F3BA2F]/15 px-2 py-1">PDF</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">Curriculum Vitae</div>
                    <div className="text-xs text-white/35 font-mono">Full professional CV — Muhammad Faisal Orakzai</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#F3BA2F]/50 group-hover:text-[#F3BA2F] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> Download CV →
                  </div>
                </motion.a>

                {/* ORCID */}
                <motion.a href="https://orcid.org/0009-0000-0915-7272" target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }}
                  className="group bg-black p-6 flex flex-col gap-4 hover:bg-[#0a0a00] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-[#A6CE39]/30 flex items-center justify-center">
                      <span className="text-[#A6CE39]/70 text-[10px] font-mono font-bold">ORCID</span>
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider border border-white/8 px-2 py-1">Profile</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white/85 group-hover:text-white mb-1">ORCID Researcher ID</div>
                    <div className="text-xs text-white/35 font-mono">0009-0000-0915-7272</div>
                  </div>
                  <div className="mt-auto flex items-center gap-1 text-[#A6CE39]/50 group-hover:text-[#A6CE39] text-xs font-mono transition-colors">
                    <ExternalLink className="w-3 h-3" /> View ORCID →
                  </div>
                </motion.a>

              </div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                className="mt-8 flex items-center gap-3 text-xs font-mono text-white/20"
              >
                <div className="h-px flex-1 bg-[#F3BA2F]/8" />
                <span>For licensing or additional media assets, contact via <a href="/contact" className="text-[#F3BA2F]/40 hover:text-[#F3BA2F] transition-colors">/contact</a></span>
                <div className="h-px flex-1 bg-[#F3BA2F]/8" />
              </motion.div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Lead Article */}
              {lead && (
                <motion.article
                    className="bg-[#0a0a00] border border-[#F3BA2F]/20 p-8 md:p-12 hover:border-[#F3BA2F]/60 transition-all duration-500 relative overflow-hidden"
                    whileHover={{ scale: 1.002 }}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F3BA2F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-8">
                      {lead.image && (
                        <div className="md:w-64 flex-shrink-0 border border-[#F3BA2F]/25 overflow-hidden">
                          <img
                            src={lead.image}
                            alt={lead.headline}
                            className="w-full h-48 md:h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {lead.authoritative && (
                            <span className="text-xs font-mono bg-[#F3BA2F] text-black px-3 py-1 font-bold tracking-wider">
                              Ã¢ÂÂ AUTHORITATIVE SOURCE
                            </span>
                          )}
                          <span className="text-xs font-mono border border-[#F3BA2F]/30 text-[#F3BA2F]/70 px-3 py-1 uppercase tracking-wider">
                            {lead.category}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white/95 group-hover:text-white leading-tight mb-4 tracking-tight">
                          {lead.headline}
                        </h2>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">{lead.summary}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/30">
                          <span className="flex items-center gap-2"><Building2 className="w-3 h-3" />{lead.publisher}</span>
                          <span className="flex items-center gap-2"><Calendar className="w-3 h-3" />{new Date(lead.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                          <a
                            href={lead.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#F3BA2F]/60 hover:text-[#F3BA2F] transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />Read Source
                          </a>
                          {lead.seeAwardUrl && (
                            <a
                              href={lead.seeAwardUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 border border-[#F3BA2F]/25 text-[#F3BA2F]/70 hover:text-[#F3BA2F] hover:border-[#F3BA2F] px-3 py-1 transition-all text-[10px] font-mono tracking-widest uppercase"
                            >
                              <Award className="w-3 h-3" />See Award
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
              )}

              {/* Rest Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F3BA2F]/5 mt-px">
                {rest.map((article, i) => (
                  <a
                    key={article.id}
                    href={article.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    aria-label={`Read: ${article.headline}`}
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-black p-8 h-full flex flex-col hover:bg-[#0a0a00] transition-colors duration-300 border-b border-[#F3BA2F]/5"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        {article.authoritative && (
                          <span className="text-xs font-mono bg-[#F3BA2F]/10 text-[#F3BA2F] px-2 py-0.5 border border-[#F3BA2F]/20">Ã¢ÂÂ VERIFIED</span>
                        )}
                        <span className="text-xs font-mono text-white/20 uppercase tracking-wider">{article.category}</span>
                      </div>

                      {article.image && (
                        <div className="mb-4 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.headline}
                            className="w-full h-32 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <h3 className="font-bold text-white/85 group-hover:text-white text-base leading-snug mb-3 flex-1 tracking-tight">
                        {article.headline}
                      </h3>
                      <p className="text-white/35 text-xs leading-relaxed mb-4 line-clamp-2">{article.summary}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-xs font-mono text-white/25 truncate">{article.publisher}</span>
                        <div className="flex items-center gap-1 text-[#F3BA2F]/40 group-hover:text-[#F3BA2F] transition-colors">
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.article>
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Ã¢ÂÂÃ¢ÂÂ Media Inquiry CTA Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
        <section className="border-t border-[#F3BA2F]/10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs font-mono text-[#F3BA2F]/60 tracking-[0.3em] mb-4">MEDIA INQUIRIES</div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Interview <br /><span className="gold-gradient">Faisal Orakzai</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  Muhammad Faisal Orakzai is available for press interviews on blockchain innovation, Pakistan's digital economy, real estate tokenization, and the Orakzai Group ecosystem. Available in English and Urdu.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="/contact" className="px-6 py-3 bg-[#F3BA2F] text-black text-xs font-mono font-bold tracking-wider hover:bg-[#F3BA2F]/90 transition-colors">
                    PRESS CONTACT Ã¢ÂÂ
                  </a>
                  <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#F3BA2F]/30 text-[#F3BA2F] text-xs font-mono tracking-wider hover:border-[#F3BA2F] transition-colors">
                    ORAKZAIBOND.COM Ã¢ÂÂ
                  </a>
                  <a href="https://www.shamimforever.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/10 text-white/40 text-xs font-mono tracking-wider hover:border-white/30 hover:text-white/70 transition-colors">
                    SHAMIMFOREVER.COM Ã¢ÂÂ
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Languages", value: "English ÃÂ· ÃÂ§ÃÂ±ÃÂ¯ÃÂ ÃÂ· Pashto" },
                  { label: "Expertise", value: "Blockchain ÃÂ· AI ÃÂ· Real Estate" },
                  { label: "Region", value: "Pakistan ÃÂ· Global" },
                  { label: "Press Kit", value: "Available on Request" },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-[#F3BA2F]/10 p-5 hover:border-[#F3BA2F]/30 transition-colors">
                    <div className="text-xs font-mono text-white/25 uppercase tracking-wider mb-2">{label}</div>
                    <div className="text-sm text-white/70 font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ã¢ÂÂÃ¢ÂÂ Cross-Site Links (SEO) Ã¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂÃ¢ÂÂ */}
        <section className="border-t border-[#F3BA2F]/10 py-12 bg-[#050500]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-xs font-mono text-white/20 text-center mb-6 tracking-[0.3em]">ORAKZAI NETWORK</div>
            <div className="flex flex-wrap justify-center gap-6 text-xs font-mono">
              <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer" className="text-[#F3BA2F]/50 hover:text-[#F3BA2F] transition-colors">orakzaibond.com Ã¢ÂÂ OKBOND Polygon</a>
              <span className="text-white/10">ÃÂ·</span>
              <a href="https://www.shamimforever.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors">shamimforever.com Ã¢ÂÂ Luxury Web3</a>
              <span className="text-white/10">ÃÂ·</span>
              <a href="https://www.wikidata.org/wiki/Q140264666" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors">Wikidata Q140264666</a>
              <span className="text-white/10">ÃÂ·</span>
              <a href="https://www.linkedin.com/in/faisalorakzaii" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors">LinkedIn Ã¢ÂÂ Faisal Orakzai</a>
            </div>
          </div>
        </section>

      </div>
    );
  }
  