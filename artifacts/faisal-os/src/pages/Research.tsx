import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── SEO: Meta tags + JSON-LD injection ──────────────────────────────────────
function useSEO() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Central Knowledge Repository — Muhammad Faisal Orakzai";

    const metas: Record<string, string> = {
      description:
        "Central Knowledge Repository of Muhammad Faisal Orakzai — blockchain engineering, AI high-throughput systems, cryptographic provenance frameworks, RWA tokenization, and sovereign protocol architecture.",
      keywords:
        "Faisal Orakzai, blockchain research, RWA tokenization, cryptographic white papers, QORIX AI, OkzByte, AdamX, OrakzaiX, DeFi architecture, zero-knowledge proofs, fintech",
      "citation_title":    "Central Knowledge Repository — Faisal Orakzai",
      "citation_author":   "Muhammad Faisal Orakzai",
      "citation_language": "en",
      "citation_publisher":"Orakzai Research Lab",
      "robots":            "index, follow, max-snippet:-1, max-image-preview:large",
      "og:title":          "Central Knowledge Repository — Faisal Orakzai",
      "og:description":    "Sovereign research hub: cryptographic white papers, RWA blueprints, AI systems, and live production repositories.",
      "og:type":           "website",
      "twitter:card":      "summary_large_image",
      "twitter:title":     "Central Knowledge Repository — Faisal Orakzai",
    };

    const injected: HTMLMetaElement[] = [];
    Object.entries(metas).forEach(([name, content]) => {
      const attr = name.startsWith("og:") || name.startsWith("twitter:") ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
        injected.push(el);
      }
      el.setAttribute("content", content);
    });

    // JSON-LD structured data
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Muhammad Faisal Orakzai",
        url: "https://faisalorakzai.vercel.app",
        jobTitle: "Founder & Chairman",
        knowsAbout: ["Blockchain Engineering", "AI Systems", "Cryptographic Protocols", "RWA Tokenization", "DeFi Architecture"],
        sameAs: [
          "https://www.linkedin.com/in/faisalorakzai",
          "https://github.com/faisalorakzai-lab",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: "OkzByte Provenance Framework: Zero-Knowledge Validation",
        author: { "@type": "Person", name: "Muhammad Faisal Orakzai" },
        publisher: { "@type": "Organization", name: "Orakzai Research Lab" },
        datePublished: "2024-10-01",
        keywords: "cryptographic provenance, zero-knowledge proofs, blockchain, OkzByte",
        description: "Formal zero-knowledge validation framework for supply-chain provenance on sovereign blockchain infrastructure.",
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: "QORIX AI Core Engine",
        codeRepository: "https://github.com/faisalorakzai-lab/qorix-ai",
        programmingLanguage: ["TypeScript", "Python", "Solidity"],
        author: { "@type": "Person", name: "Muhammad Faisal Orakzai" },
        description: "High-throughput autonomous AI inference engine with zero-latency protocol orchestration.",
      },
    ];

    const scripts = schemas.map((s) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = JSON.stringify(s);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      document.title = prev;
      injected.forEach((el) => el.remove());
      scripts.forEach((el) => el.remove());
    };
  }, []);
}

// ─── LaTeX inline renderer ────────────────────────────────────────────────────
const SUP: Record<string, string> = { "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","n":"ⁿ","i":"ⁱ","k":"ᵏ" };
const SUB: Record<string, string> = { "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉","n":"ₙ","i":"ᵢ","k":"ₖ","p":"ₚ" };

function renderLatex(raw: string): string {
  return raw
    .replace(/\\SHA_\{(\d+)\}/g, (_, n) => "SHA" + n.split("").map((c: string) => SUB[c] || c).join(""))
    .replace(/_\{([^}]+)\}/g, (_, s: string) => s.split("").map((c: string) => SUB[c] || c).join(""))
    .replace(/\^\{([^}]+)\}/g, (_, s: string) => s.split("").map((c: string) => SUP[c] || c).join(""))
    .replace(/\^(\w)/g, (_, c: string) => SUP[c] || c)
    .replace(/_(\w)/g, (_, c: string) => SUB[c] || c)
    .replace(/\\times/g, "×").replace(/\\oplus/g, "⊕").replace(/\\cdot/g, "·")
    .replace(/\\rightarrow/g, "→").replace(/\\leq/g, "≤").replace(/\\geq/g, "≥")
    .replace(/\\sum/g, "∑").replace(/\\forall/g, "∀").replace(/\\exists/g, "∃")
    .replace(/\\in/g, "∈").replace(/\\neq/g, "≠").replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β").replace(/\\sigma/g, "σ").replace(/\\pi/g, "π")
    .replace(/\\lambda/g, "λ").replace(/\\infty/g, "∞").replace(/\\mid/g, "|");
}

function MathText({ children }: { children: string }) {
  const parts = children.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("$") && part.endsWith("$") ? (
          <span
            key={i}
            className="font-mono italic text-[#F3BA2F]/90 bg-[#F3BA2F]/6 px-1 rounded-sm text-[11px] tracking-wide"
          >
            {renderLatex(part.slice(1, -1))}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─── Commit heatmap helper ────────────────────────────────────────────────────
function heatmap(seed: string, cols = 18): number[] {
  let v = seed.split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
  return Array.from({ length: cols * 5 }, () => {
    v = ((v * 1103515245 + 12345) & 0x7fffffff);
    return (v % 100) / 100;
  });
}

// ─── Data ─────────────────────────────────────────────────────────────────────
type Entry = {
  id: string;
  category: "MARKET KNOWLEDGE" | "ARTIFACTS & BLUEPRINTS" | "CRYPTOGRAPHIC WHITE PAPERS" | "PRODUCTION CODE";
  year: string;
  title: string;
  subtitle?: string;
  abstract: string;
  equations?: string[];
  tags: string[];
  status?: string;
  repo?: string;
  stack?: string[];
  commits?: string;
  stars?: string;
  branch?: string;
  deploy?: string;
  db?: string;
  authors?: string;
};

const ENTRIES: Entry[] = [
  // ── MARKET KNOWLEDGE ─────────────────────────────────────────────────────
  {
    id: "mk-01",
    category: "MARKET KNOWLEDGE",
    year: "2024",
    title: "Macro-Liquidity Networks & Cross-Border Fintech Dynamics",
    subtitle: "Structural Analysis of Tokenized Asset Corridors",
    abstract:
      "A deep-dive examination of macro-liquidity network architecture across cross-border fintech corridors. Explores how sovereign tokenized asset pools create structural arbitrage dynamics in G20-adjacent emerging markets, with emphasis on protocol-layer liquidity provisioning and settlement velocity.",
    tags: ["Macro-Liquidity", "Cross-Border", "Fintech", "Tokenized Assets", "Settlement"],
    authors: "Muhammad Faisal Orakzai",
    status: "PUBLISHED",
  },
  {
    id: "mk-02",
    category: "MARKET KNOWLEDGE",
    year: "2024",
    title: "Real-World Asset Tokenization: Protocol Mechanics & Market Depth",
    subtitle: "On-chain RWA Infrastructure for High-Net-Worth Capital Corridors",
    abstract:
      "Investigates the structural mechanics of on-chain real-world asset tokenization across illiquid capital markets. Analyzes protocol-layer custody models, oracle dependency chains, and secondary market depth constraints in RWA-backed DeFi infrastructure serving institutional corridors.",
    tags: ["RWA", "Tokenization", "DeFi", "Institutional", "Oracle Design"],
    authors: "Muhammad Faisal Orakzai",
    status: "PUBLISHED",
  },
  // ── ARTIFACTS & BLUEPRINTS ────────────────────────────────────────────────
  {
    id: "ab-01",
    category: "ARTIFACTS & BLUEPRINTS",
    year: "2024",
    title: "OrakzaiX Production Database Schema v2.0",
    subtitle: "Multi-Entity SQL Architecture for Sovereign Venture Tracking",
    abstract:
      "Complete production-grade PostgreSQL schema design for the OrakzaiX venture infrastructure. Covers multi-entity relational models for orakzai_ventures, orakzai_positions, compliance_ledger, and capital_allocation tables. Includes index strategies, JSONB field patterns, and row-level security configurations.",
    tags: ["PostgreSQL", "SQL Architecture", "JSONB", "RLS", "Database Design"],
    authors: "Muhammad Faisal Orakzai",
    status: "PRODUCTION",
  },
  {
    id: "ab-02",
    category: "ARTIFACTS & BLUEPRINTS",
    year: "2024",
    title: "Orakzai Bond (OKBOND) Sovereign Protocol Blueprint",
    subtitle: "Tokenized Debt Architecture on EVM-Compatible Infrastructure",
    abstract:
      "Full architectural specification for the OKBOND sovereign debt protocol. Defines issuance mechanics, coupon distribution logic, redemption pathways, and on-chain governance voting modules. Includes smart contract interaction diagrams, escrow models, and regulatory compliance boundary mapping.",
    tags: ["OKBOND", "Tokenized Debt", "EVM", "Smart Contracts", "Protocol Design"],
    authors: "Muhammad Faisal Orakzai",
    status: "BLUEPRINT",
  },
  // ── CRYPTOGRAPHIC WHITE PAPERS ────────────────────────────────────────────
  {
    id: "wp-01",
    category: "CRYPTOGRAPHIC WHITE PAPERS",
    year: "2024",
    title: "OkzByte Provenance Framework: Zero-Knowledge Validation",
    subtitle: "Formal Cryptographic Architecture for Supply-Chain Integrity",
    abstract:
      "Presents a rigorous zero-knowledge proof architecture for sovereign supply-chain provenance validation. The OkzByte framework eliminates trusted third-party dependency through on-chain zkSNARK attestation cycles, ensuring tamper-proof lineage tracing without exposing commercially sensitive routing data.",
    equations: [
      "Proof validity: $\\pi = SNARK_{prove}(x, w) \\rightarrow \\{0,1\\}$",
      "Hash commitment: $C(m) = SHA_{256}(m \\oplus k) \\mod p$",
      "Lineage root: $R_n = H(H(L_0) \\oplus H(L_1) \\oplus \\cdots \\oplus H(L_n))$",
    ],
    tags: ["ZK-Proofs", "zkSNARK", "Supply Chain", "Provenance", "Cryptography"],
    authors: "Muhammad Faisal Orakzai",
    status: "FORMAL DRAFT",
  },
  {
    id: "wp-02",
    category: "CRYPTOGRAPHIC WHITE PAPERS",
    year: "2024",
    title: "QORIX AI Trust Protocol: Formal Verification Model",
    subtitle: "Autonomous Inference with Cryptographic Accountability",
    abstract:
      "Defines a formal verification model for AI inference accountability in high-throughput autonomous systems. Introduces a cryptographic audit trail architecture where every inference decision is hash-linked to its input state, enabling post-hoc verification without compromising inference latency targets.",
    equations: [
      "Inference chain: $I_t = f_\\theta(x_t) \\mid H(I_t) = SHA_{256}(x_t \\| \\theta_t)$",
      "Accountability score: $A(\\sigma) = \\sum_{i=1}^{n} w_i \\cdot V(I_i, H_i)$",
      "Latency bound: $\\lambda \\leq \\delta_{max} \\rightarrow \\forall t \\in T: t_i - t_{i-1} < \\delta$",
    ],
    tags: ["AI Trust", "Formal Verification", "Inference Audit", "QORIX", "Accountability"],
    authors: "Muhammad Faisal Orakzai",
    status: "FORMAL DRAFT",
  },
  // ── PRODUCTION CODE ───────────────────────────────────────────────────────
  {
    id: "pc-01",
    category: "PRODUCTION CODE",
    year: "2024",
    title: "QORIX AI Core Engine",
    subtitle: "High-Throughput Autonomous Inference Orchestration",
    abstract:
      "Production AI engine built for zero-latency inference orchestration across distributed compute nodes. Handles real-time data ingestion, model routing, and cryptographic audit trail generation at high throughput with sub-100ms P99 response targets.",
    tags: [],
    repo: "faisalorakzai-lab/qorix-ai",
    stack: ["TypeScript", "Python", "ONNX", "Redis", "PostgreSQL"],
    commits: "1,204",
    stars: "38",
    branch: "main",
    deploy: "VERCEL · LIVE",
    db: "SUPABASE · SYNCED",
    status: "ACTIVE",
  },
  {
    id: "pc-02",
    category: "PRODUCTION CODE",
    year: "2024",
    title: "AdamX Protocol Engine",
    subtitle: "Sovereign DeFi Execution Layer",
    abstract:
      "Core execution engine for the AdamX sovereign DeFi protocol. Manages on-chain state transitions, liquidity routing, and cross-chain message passing with embedded compliance rule validation.",
    tags: [],
    repo: "faisalorakzai-lab/adamx-protocol",
    stack: ["Solidity", "TypeScript", "Hardhat", "The Graph"],
    commits: "847",
    stars: "21",
    branch: "main",
    deploy: "VERCEL · LIVE",
    db: "SUPABASE · ACTIVE",
    status: "BUILDING",
  },
  {
    id: "pc-03",
    category: "PRODUCTION CODE",
    year: "2024",
    title: "OrakzaiX Infrastructure Stack",
    subtitle: "Sovereign Multi-Entity Venture Platform",
    abstract:
      "Full-stack infrastructure platform backing the OrakzaiX venture portfolio. Integrates real-time position tracking, compliance automation, capital allocation routing, and investor-facing reporting modules.",
    tags: [],
    repo: "faisalorakzai-lab/orakzaix-stack",
    stack: ["React", "Express", "Drizzle ORM", "PostgreSQL", "Vercel"],
    commits: "2,391",
    stars: "14",
    branch: "main",
    deploy: "VERCEL · LIVE",
    db: "SUPABASE · LIVE",
    status: "ACTIVE",
  },
];

const FILTERS = [
  "ALL INTEL",
  "MARKET KNOWLEDGE",
  "ARTIFACTS & BLUEPRINTS",
  "CRYPTOGRAPHIC WHITE PAPERS",
  "PRODUCTION CODE",
] as const;

type Filter = typeof FILTERS[number];

const STATUS_COLOR: Record<string, string> = {
  PUBLISHED:    "border-emerald-500/30 text-emerald-400/70",
  PRODUCTION:   "border-emerald-500/30 text-emerald-400/70",
  ACTIVE:       "border-emerald-500/30 text-emerald-400/70",
  BLUEPRINT:    "border-[#F3BA2F]/30 text-[#F3BA2F]/70",
  BUILDING:     "border-amber-500/30 text-amber-400/70",
  "FORMAL DRAFT": "border-blue-500/30 text-blue-400/60",
};

// ─── CSS animations ───────────────────────────────────────────────────────────
const CSS = `
  @keyframes scanRow  { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
  @keyframes nodeBlip { 0%,100%{ r:2;opacity:.6; } 50%{ r:3.5;opacity:1; } }
  @keyframes shimmer  { 0%,100%{ opacity:.15; } 50%{ opacity:.55; } }
  @keyframes pulse2   { 0%,100%{ opacity:.4; } 50%{ opacity:1; } }
`;

// ─── Fixed page-frame crosshairs ──────────────────────────────────────────────
function PageFrame() {
  const corners = [
    { top:"16px", left:"10px" }, { top:"16px", right:"10px" },
    { bottom:"16px", left:"10px" }, { bottom:"16px", right:"10px" },
  ];
  return (
    <>
      <div style={{ position:"fixed", top:0, left:"5px", width:"1px", height:"100vh",
        background:"linear-gradient(to bottom, transparent 5%, rgba(243,186,47,0.07) 30%, rgba(243,186,47,0.07) 70%, transparent 95%)",
        pointerEvents:"none", zIndex:5 }} />
      <div style={{ position:"fixed", top:0, right:"5px", width:"1px", height:"100vh",
        background:"linear-gradient(to bottom, transparent 5%, rgba(243,186,47,0.07) 30%, rgba(243,186,47,0.07) 70%, transparent 95%)",
        pointerEvents:"none", zIndex:5 }} />
      {corners.map((pos, i) => (
        <div key={i} style={{ position:"fixed", ...pos, width:"16px", height:"16px", pointerEvents:"none", zIndex:5 }}>
          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"rgba(243,186,47,0.5)", transform:"translateY(-50%)" }} />
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"1px", background:"rgba(243,186,47,0.5)", transform:"translateX(-50%)" }} />
        </div>
      ))}
    </>
  );
}

// ─── Card: Market Knowledge / Artifacts ──────────────────────────────────────
function ResearchCard({ entry, i }: { entry: Entry; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <motion.div
        animate={hov ? { boxShadow: "0 0 30px rgba(243,186,47,0.09), inset 0 0 40px rgba(243,186,47,0.02)" } : { boxShadow: "none" }}
        transition={{ duration: 0.3 }}
        className="border border-[#F3BA2F]/10 p-6 md:p-8 bg-black"
        style={{ background: hov ? "rgba(243,186,47,0.015)" : "black" }}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="font-mono text-[7.5px] tracking-[0.38em] text-[#F3BA2F]/50 border border-[#F3BA2F]/18 px-2 py-0.5 uppercase">
                {entry.category}
              </span>
              <span className="font-mono text-[7px] tracking-widest text-white/20">{entry.year}</span>
            </div>
            <motion.h3
              animate={hov ? { color: "#FFFFFF" } : { color: "rgba(255,255,255,0.88)" }}
              transition={{ duration: 0.25 }}
              className="font-black text-base md:text-xl leading-tight"
            >
              {entry.title}
            </motion.h3>
            {entry.subtitle && (
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#F3BA2F]/40 mt-1.5 uppercase">{entry.subtitle}</p>
            )}
          </div>
          <span className={`flex-shrink-0 font-mono text-[7.5px] tracking-widest border px-2 py-0.5 uppercase ${STATUS_COLOR[entry.status ?? ""] ?? "border-white/10 text-white/25"}`}>
            {entry.status}
          </span>
        </div>

        {/* Abstract */}
        <p className="text-white/38 text-sm leading-relaxed font-light mb-5">{entry.abstract}</p>

        {/* Author + tags row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {entry.authors && (
            <span className="font-mono text-[8px] tracking-[0.25em] text-white/20 uppercase">{entry.authors}</span>
          )}
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.map((t) => (
              <span key={t} className="font-mono text-[7px] tracking-wider px-2 py-0.5 border border-white/8 text-white/20">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer badges */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
          {["ORCID DIRECT CONNECT", "GOOGLE SCHOLAR TRACEABLE"].map((b) => (
            <span key={b} className="font-mono text-[6.5px] tracking-[0.3em] border border-[#F3BA2F]/14 text-[#F3BA2F]/40 px-2 py-0.5 uppercase">
              [{b}]
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card: White Paper with LaTeX ─────────────────────────────────────────────
function WhitePaperCard({ entry, i }: { entry: Entry; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <motion.div
        animate={hov ? { boxShadow: "0 0 35px rgba(243,186,47,0.1), inset 0 0 50px rgba(243,186,47,0.025)" } : { boxShadow: "none" }}
        transition={{ duration: 0.3 }}
        className="border border-[#F3BA2F]/15 p-6 md:p-8 bg-black relative overflow-hidden"
      >
        {/* Corner marks */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#F3BA2F]/30" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#F3BA2F]/30" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#F3BA2F]/30" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#F3BA2F]/30" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="font-mono text-[7.5px] tracking-[0.38em] text-[#F3BA2F]/65 border border-[#F3BA2F]/25 px-2 py-0.5">
                WHITE PAPER
              </span>
              <span className="font-mono text-[7px] text-white/20">{entry.year}</span>
            </div>
            <motion.h3
              animate={hov ? { color: "#F3BA2F" } : { color: "rgba(255,255,255,0.9)" }}
              transition={{ duration: 0.3 }}
              className="font-black text-base md:text-xl leading-tight"
            >
              {entry.title}
            </motion.h3>
            {entry.subtitle && (
              <p className="font-mono text-[8.5px] tracking-[0.18em] text-[#F3BA2F]/35 mt-1.5 uppercase">{entry.subtitle}</p>
            )}
          </div>
          <span className={`flex-shrink-0 font-mono text-[7px] tracking-widest border px-2 py-0.5 uppercase ${STATUS_COLOR[entry.status ?? ""] ?? ""}`}>
            {entry.status}
          </span>
        </div>

        {/* Abstract */}
        <p className="text-white/38 text-sm leading-relaxed font-light mb-5">{entry.abstract}</p>

        {/* Equations block */}
        {entry.equations && entry.equations.length > 0 && (
          <div className="mb-5 p-4 border-l-2 border-[#F3BA2F]/30 bg-[#F3BA2F]/3 space-y-2.5">
            <div className="font-mono text-[7px] tracking-[0.4em] text-[#F3BA2F]/45 mb-3 uppercase">Formal Notation</div>
            {entry.equations.map((eq, j) => (
              <div key={j} className="text-white/50 text-xs leading-relaxed">
                <MathText>{eq}</MathText>
              </div>
            ))}
          </div>
        )}

        {/* Footer badges */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
          <span className="font-mono text-[6.5px] tracking-[0.3em] text-white/25">{entry.authors}</span>
          <div className="flex-1" />
          {["ORCID DIRECT CONNECT", "GOOGLE SCHOLAR TRACEABLE"].map((b) => (
            <span key={b} className="font-mono text-[6.5px] tracking-[0.28em] border border-[#F3BA2F]/15 text-[#F3BA2F]/40 px-2 py-0.5 uppercase">
              [{b}]
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Card: Production Code with heatmap ──────────────────────────────────────
function RepoCard({ entry, i }: { entry: Entry; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hov, setHov] = useState(false);
  const heat = heatmap(entry.id, 20);
  const isActive = entry.status === "ACTIVE";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <motion.div
        animate={hov ? { boxShadow: "0 0 40px rgba(243,186,47,0.12), inset 0 0 60px rgba(243,186,47,0.03)" } : { boxShadow: "none" }}
        transition={{ duration: 0.3 }}
        className="border p-6 md:p-7 bg-black"
        style={{ borderColor: hov ? "rgba(243,186,47,0.3)" : "rgba(243,186,47,0.12)" }}
      >
        {/* Status + title */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400" : "bg-amber-400"}`}
                style={{ animation: "pulse2 2s ease-in-out infinite" }} />
              <span className={`font-mono text-[7.5px] tracking-[0.36em] uppercase ${isActive ? "text-emerald-400/70" : "text-amber-400/60"}`}>
                {entry.status}
              </span>
              <span className="font-mono text-[7px] text-white/15">· {entry.year}</span>
            </div>
            <h3 className="font-black text-white text-base md:text-lg leading-tight">{entry.title}</h3>
            {entry.subtitle && (
              <p className="font-mono text-[8.5px] tracking-[0.16em] text-[#F3BA2F]/35 mt-1 uppercase">{entry.subtitle}</p>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-mono text-[7px] text-white/20 tracking-wider mb-1">⭐ {entry.stars}</div>
            <div className="font-mono text-[7px] text-white/15">⎇ {entry.branch}</div>
          </div>
        </div>

        {/* Abstract */}
        <p className="text-white/33 text-sm leading-relaxed font-light mb-5">{entry.abstract}</p>

        {/* Commit heatmap */}
        <div className="mb-5">
          <div className="font-mono text-[7px] tracking-[0.35em] text-white/20 mb-2 uppercase">Commit Activity · {entry.commits} commits</div>
          <div className="flex gap-0.5 overflow-hidden" style={{ maxWidth: "100%" }}>
            {Array.from({ length: 20 }, (_, col) => (
              <div key={col} className="flex flex-col gap-0.5">
                {Array.from({ length: 5 }, (_, row) => {
                  const val = heat[col * 5 + row];
                  return (
                    <div key={row} className="w-2.5 h-2.5 rounded-sm"
                      style={{
                        background: val > 0.75 ? "#F3BA2F" : val > 0.5 ? "rgba(243,186,47,0.55)" : val > 0.25 ? "rgba(243,186,47,0.22)" : "rgba(255,255,255,0.04)",
                      }} />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "DEPLOY", val: entry.deploy },
            { label: "DATABASE", val: entry.db },
          ].map((m) => (
            <div key={m.label} className="border border-white/5 px-3 py-2">
              <div className="font-mono text-[6.5px] tracking-[0.4em] text-white/18 mb-1">{m.label}</div>
              <div className="font-mono text-[8.5px] tracking-wider text-[#F3BA2F]/70">{m.val}</div>
            </div>
          ))}
        </div>

        {/* Stack + repo */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {entry.stack?.map((s) => (
              <span key={s} className="font-mono text-[7px] tracking-wider px-2 py-0.5 border border-[#F3BA2F]/12 text-[#F3BA2F]/40">
                {s}
              </span>
            ))}
          </div>
          <span className="font-mono text-[6.5px] tracking-[0.28em] border border-[#F3BA2F]/18 text-[#F3BA2F]/45 px-2 py-0.5 uppercase">
            [GITHUB LIVE SECURED]
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Research() {
  useSEO();
  const [active, setActive] = useState<Filter>("ALL INTEL");

  const filtered = ENTRIES.filter((e) =>
    active === "ALL INTEL" ? true : e.category === active
  );

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === "ALL INTEL" ? ENTRIES.length : ENTRIES.filter((e) => e.category === f).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <PageFrame />

      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(243,186,47,0.04) 0%, transparent 70%)" }} />

      {/* ── HERO ── */}
      <section className="pt-28 pb-10 relative z-10">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

            <motion.div variants={{ hidden:{opacity:0,y:14}, show:{opacity:1,y:0,transition:{duration:0.6}} }}
              className="flex items-center gap-3 mb-7">
              <div className="h-px w-7 bg-[#F3BA2F]" />
              <span className="font-mono text-[8px] tracking-[0.5em] text-[#F3BA2F] uppercase">Research Lab</span>
              <div className="h-px flex-1 bg-[#F3BA2F]/10" />
              <span className="font-mono text-[7px] tracking-widest text-white/15">NODE: KARACHI · PK</span>
            </motion.div>

            <motion.h1
              variants={{ hidden:{opacity:0,y:22}, show:{opacity:1,y:0,transition:{duration:0.8,ease:[0.22,1,0.36,1]}} }}
              className="font-black uppercase leading-none"
              style={{ fontSize:"clamp(1.8rem,8vw,5rem)", letterSpacing:"-0.025em" }}
            >
              CENTRAL KNOWLEDGE
              <br />
              <span style={{
                background:"linear-gradient(135deg,#F3BA2F 0%,#ffe47a 50%,#c8900a 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>REPOSITORY</span>
            </motion.h1>

            <motion.p
              variants={{ hidden:{opacity:0}, show:{opacity:1,transition:{duration:0.6,delay:0.15}} }}
              className="font-mono text-white/20 text-[10px] tracking-[0.3em] uppercase mt-5 max-w-sm leading-relaxed"
            >
              Market intelligence · Protocol blueprints ·<br />
              Cryptographic white papers · Live production nodes
            </motion.p>
          </motion.div>

          {/* ── Authority badges ── */}
          <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.5, duration:0.5 }}
            className="flex flex-wrap gap-2 mt-8">
            {[
              { label:"ORCID DIRECT CONNECT",   color:"rgba(166,206,57,0.7)" },
              { label:"GOOGLE SCHOLAR TRACEABLE",color:"rgba(66,133,244,0.7)" },
              { label:"GITHUB LIVE SECURED",      color:"rgba(243,186,47,0.7)" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 border border-white/8">
                <div className="w-1 h-1 rounded-full" style={{ background:b.color, boxShadow:`0 0 6px ${b.color}` }} />
                <span className="font-mono text-[7px] tracking-[0.32em] text-white/35 uppercase">[{b.label}]</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FILTER NAV ── */}
      <div className="sticky top-16 z-20 bg-black/95 backdrop-blur-xl border-b border-[#F3BA2F]/10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="flex overflow-x-auto scrollbar-hide -mb-px">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="relative flex-shrink-0 px-4 py-3.5 font-mono text-[8.5px] tracking-[0.3em] uppercase whitespace-nowrap transition-colors duration-200"
                style={{ color: active === f ? "#F3BA2F" : "rgba(255,255,255,0.25)" }}
              >
                {f}
                <span className="ml-1.5 opacity-50">({counts[f]})</span>
                {active === f && (
                  <motion.div layoutId="filter-bar" className="absolute bottom-0 left-2 right-2 h-px bg-[#F3BA2F]"
                    style={{ boxShadow:"0 0 8px rgba(243,186,47,0.9)" }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ENTRIES ── */}
      <section className="py-10 pb-28 relative z-10">
        <div className="max-w-5xl mx-auto px-5 space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-24 font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase">
              No entries in this category
            </div>
          )}
          {filtered.map((entry, i) => {
            if (entry.category === "CRYPTOGRAPHIC WHITE PAPERS") {
              return <WhitePaperCard key={entry.id} entry={entry} i={i} />;
            }
            if (entry.category === "PRODUCTION CODE") {
              return <RepoCard key={entry.id} entry={entry} i={i} />;
            }
            return <ResearchCard key={entry.id} entry={entry} i={i} />;
          })}
        </div>
      </section>

      {/* ── CODA ── */}
      <section className="pb-20 relative z-10">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/5">
            <p className="font-mono text-white/10 text-[8px] tracking-[0.3em] uppercase">
              CITATION: MUHAMMAD FAISAL ORAKZAI · ORAKZAI RESEARCH LAB · 2024
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#F3BA2F] animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#F3BA2F]/40">
                {ENTRIES.length} ENTRIES · INDEXING ACTIVE
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
