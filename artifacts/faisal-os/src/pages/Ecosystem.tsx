import { motion, AnimatePresence } from "framer-motion";
  import { useState, useEffect } from "react";
  import SEOHead from "@/components/shared/SEOHead";

  /* ============================================================
     ORAKZAI SOVEREIGN ECOSYSTEM
     Orbital Node Design · Live Cores · Under Development · Organizations
     ============================================================ */

  const GOLD = "#F3BA2F";
  const GOLD_DIM = "rgba(243,186,47,0.15)";

  /* ── Live Core data ──────────────────────────────────────── */
  const LIVE_CORES = [
    {
      id: "okbond", name: "Orakzai Bond", ticker: "OKBOND",
      logo: "/logos/okbond.png", url: "https://orakzaibond.com",
      tag: "POLYGON L2", status: "LIVE", statusColor: "#00ff88",
      desc: "Decentralized Treasury Protocol. 10M max supply, treasury-backed capital protection on Polygon.",
      angle: 270,
    },
    {
      id: "shamim", name: "Shamim Forever", ticker: "SHF",
      logo: "/logos/shamim-forever.jpg", url: "https://www.shamimforever.com",
      tag: "LUXURY · WEB3", status: "LIVE", statusColor: "#00ff88",
      desc: "Elite luxury heritage brand — museum-grade perfumes, sapphire jewelry, cryptographic provenance.",
      angle: 30,
    },
    {
      id: "okzbyte", name: "OkzByte Technology", ticker: "OKZDEV",
      logo: "/logos/okzbyte.png", url: "https://github.com/faisalorakzai-lab",
      tag: "ENGINEERING · AI", status: "ACTIVE", statusColor: GOLD,
      desc: "High-throughput technical stack & engineering engine powering the entire Orakzai infrastructure.",
      angle: 150,
    },
  ];

  /* ── Under Development data ──────────────────────────────── */
  const UNDER_DEV = [
    {
      id: "qorix", name: "QORIX", ticker: "QRX",
      logo: "/logos/qorix.png",
      tag: "AI · FINANCE",
      desc: "Autonomous Financial Management AI System — algorithmic treasury ops and yield optimization.",
      statusColor: "#60a5fa",
    },
    {
      id: "orakzai-properties", name: "Orakzai Properties", ticker: "ORP",
      logo: "/logos/orakzai-properties.png",
      tag: "REAL ESTATE",
      desc: "Assets of Today | Legacies of Tomorrow — premium real estate and property investment platform.",
      statusColor: "#f97316",
    },
    {
      id: "otc", name: "Orakzai Transport Corp", ticker: "OTC",
      logo: "/logos/otc.png",
      tag: "TRANSPORT · MOBILITY",
      desc: "Premium transportation and logistics arm of the Orakzai Group sovereign infrastructure.",
      statusColor: GOLD,
    },
    {
      id: "psc-exchange", name: "PSC Exchange", ticker: "PSC",
      logo: "/logos/psc-exchange.png",
      tag: "BLOCKCHAIN · FINTECH",
      desc: "Pak Stock Chain — decentralized exchange bridging Pakistan's capital markets with blockchain.",
      statusColor: "#a78bfa",
    },
    {
      id: "orakzaix", name: "OrakzaiX", ticker: "OKX",
      logo: "/logos/orakzaix.png",
      tag: "AI · AUTOMATION",
      desc: "Next-generation AI automation and intelligence platform for the Orakzai sovereign ecosystem.",
      statusColor: "#2dd4bf",
    },
    {
      id: "orakzai-empire", name: "Orakzai Empire", ticker: "OKE",
      logo: "/logos/orakzai-empire.png",
      tag: "HERITAGE · SOVEREIGN",
      desc: "The sovereign heritage brand — carrying the legacy, vision, and identity of the Orakzai lineage.",
      statusColor: GOLD,
    },
  ];

  /* ── Organizations / Foundations ─────────────────────────── */
  const ORGANIZATIONS = [
    {
      id: "awami-khedmat", name: "Awami Khedmat", ticker: "AKF",
      logo: null,
      tag: "FOUNDATION · SERVICE",
      desc: "Awami Khedmat Foundation — serving communities and uplifting the people of Pakistan.",
      statusColor: "#4ade80",
    },
    {
      id: "son-of-orakzai", name: "Son of Orakzai", ticker: "SOO",
      logo: "/logos/son-of-orakzai.jpg",
      tag: "ORGANIZATION",
      desc: "Son of Orakzai — a community and heritage organization representing the proud Orakzai identity.",
      statusColor: "#4ade80",
    },
  ];

  
  /* ── Venture detail panels ───────────────────────────────── */
  const VENTURE_DETAILS: Record<string, {
    title: string; bio: string; description: string;
    uniqueFeatures: string[]; benefits: { label: string; desc: string }[];
    roadmap: { module: string; desc: string }[];
    pdfUrl?: string; githubUrl?: string;
  }> = {
    "qorix": {
        title: "Multi-agent AI Intelligence Platform: GPT-4o + LangGraph for Enterprise Automation",
        bio: "Qorix is a next-generation AI orchestration platform designed for enterprise ecosystems. It leverages multi-agent AI systems to automate complex workflows, generate critical insights, and operate business infrastructure efficiently — minimizing human intervention and bottlenecks. Built to provide sovereign infrastructure for advanced AI applications.",
        description: "Powered by a robust modern stack: Intelligence Layer (GPT-4o + Claude 3.5) for reasoning and generation; LangGraph + CrewAI for multi-agent pipelines and coordination; FastAPI + TypeScript as a unified API gateway; Vector DB (pgvector) for persistent agent memory across sessions; and n8n + custom workers for workflow automation. Designed to serve Real Estate, Perfume E-commerce, Blockchain, and enterprise Operations at scale.",
        uniqueFeatures: [
          "Multi-agent orchestration with GPT-4o + Claude 3.5 reasoning",
          "LangGraph + CrewAI for interconnected AI agent pipelines",
          "Persistent memory via Vector DB (pgvector) — context-aware agents",
          "Unified API gateway (FastAPI + TypeScript) for seamless enterprise integration",
          "End-to-end workflow automation via n8n + custom workers",
          "6 specialized agents: Research, Content, Financial, OPS, Comms, Code",
        ],
        benefits: [
          { label: "Increased Efficiency", desc: "Automates complex and repetitive tasks, freeing human resources to focus on strategic initiatives and dramatically boosting enterprise productivity." },
          { label: "Enhanced Decision-Making", desc: "Real-time AI-generated insights — especially in financial and research domains — enable more informed, data-driven decisions." },
          { label: "Cost Reduction", desc: "Automation of workflows and operational tasks delivers substantial and measurable cost savings for businesses at scale." },
          { label: "Innovation & Scalability", desc: "Modular architecture enables rapid deployment of new AI applications and seamless integration into diverse business environments." },
          { label: "Reduced Human Error", desc: "Automated systems perform tasks with higher accuracy and consistency than manual processes, improving overall output quality." },
          { label: "Democratization of AI", desc: "Makes advanced multi-agent AI capabilities accessible to enterprises without requiring extensive in-house AI expertise." },
        ],
        roadmap: [
          { module: "Core Multi-Agent Orchestration Engine", desc: "Development of the foundational orchestration layer connecting GPT-4o, Claude 3.5, LangGraph, and CrewAI agents into coherent pipelines." },
          { module: "API Gateway & Authentication Layer", desc: "Implementation of a unified FastAPI + TypeScript gateway with enterprise-grade authentication and rate limiting." },
          { module: "Production Deployment — Phase 1 (Q3 2025)", desc: "Full production rollout with enterprise client onboarding pipeline, SLA guarantees, and monitoring dashboards." },
          { module: "Custom LLM Fine-Tuning", desc: "Fine-tuning language models on ORAKZAI domain-specific data — real estate, fintech, and operations — for superior contextual performance." },
          { module: "Real-Time Decision Intelligence Dashboard", desc: "Live monitoring dashboard tracking agent performance, KPIs, system health, and AI-driven decision outcomes in real time." },
        ],
        githubUrl: "https://github.com/faisalorakzai-lab/Adamorakzaix",
      },
      "orakzai-properties": {
      title: "Pakistan's Premier Real Estate Tokenization & Investment Platform",
      bio: "Orakzai Properties is a prominent platform in Pakistan for tokenized real estate and property investment. It bridges physical land assets and blockchain-based ownership — enabling fractional investment, transparent title, and 24/7 liquidity.",
      description: "A PropTech and DeFi solution that digitalizes Pakistan's real estate market. Investments start from as low as PKR 50,000 using ERC-1155 fractional property tokens on the Polygon Network, with on-chain title deeds and automatic rental yield distribution via smart contracts. Focused on Lahore and Islamabad markets with plans for national expansion.",
      uniqueFeatures: [
        "Fractional ownership from PKR 50,000",
        "Blockchain title deeds — immutable & transparent on Polygon",
        "Automated monthly rental yield via smart contracts",
        "Secondary marketplace for exit liquidity",
        "ERC-1155 standard fractional property tokens",
      ],
      benefits: [
        { label: "Financial Inclusion", desc: "Allows small investors to participate in real estate for the first time." },
        { label: "Transparency & Trust", desc: "Blockchain ownership records reduce fraud risk and title disputes." },
        { label: "Increased Liquidity", desc: "Fractional tokens make real estate assets easily tradeable." },
        { label: "Economic Growth", desc: "Promotes investment and introduces new PropTech business models." },
        { label: "Innovation in PropTech", desc: "Integrates DeFi and blockchain into Pakistan's traditional property industry." },
      ],
      roadmap: [
        { module: "Module 6 — Elite Rental Engine", desc: "Full rental management with filters (Furnished Status, Occupancy Type, Duration), WhatsApp tenant–owner chat, and availability controls." },
        { module: "Module 14 — Subscription & Monetization", desc: "Three tiers — Free, Premium, Sovereign — with wallet-based payments, listing limits, and a full checkout flow." },
        { module: "Module 15 — Lead Management for Agents", desc: "Track leads by status (New, Contacted, Visit Scheduled, Negotiation, Closed) and score (Hot, Warm, Cold), with call logs, real-time chat, and performance analytics." },
      ],
      pdfUrl: "https://drive.google.com/file/d/1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3/view?usp=drivesdk",
      githubUrl: "https://github.com/faisalorakzai-lab/Orakzai-Properties",
    },
  };

  /* ── Position helpers ────────────────────────────────────── */
  function corePos(angleDeg: number, radius: number, cx: number, cy: number) {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  }

  /* ── Main Component ─────────────────────────────────────── */
  export default function Ecosystem() {
    const [activeCore, setActiveCore] = useState<string | null>(null);
    const [activeVenture, setActiveVenture] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
      document.title = "Orakzai Ecosystem — Live Cores, Infrastructure & Organizations · Faisal Orakzai";
    }, []);

    const SVG_W = 600;
    const SVG_H = 600;
    const CX = SVG_W / 2;
    const CY = SVG_H / 2;
    const INNER_R = 170;

    return (
      <>
        <SEOHead
          title="Orakzai Ecosystem — Ventures, Blockchain & AI Infrastructure"
          description="The complete Orakzai Group ecosystem — OKBOND blockchain, Shamim Forever luxury brand, OkzByte Technology AI, OrakzaiX automation platform, and real estate tokenization."
          path="/ecosystem"
          keywords="Orakzai Group ecosystem, OKBOND Polygon, Shamim Forever, OkzByte, OrakzaiX AI, blockchain Pakistan"
        />
        <div style={{ background: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── HERO ── */}
        <section style={{ paddingTop: "100px", paddingBottom: "40px", borderBottom: `1px solid ${GOLD_DIM}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(243,186,47,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(243,186,47,1) 1px,transparent 1px),linear-gradient(90deg,rgba(243,186,47,1) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", border: `1px solid ${GOLD_DIM}`, marginBottom: "20px", background: "rgba(243,186,47,0.02)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GOLD, boxShadow: `0 0 8px ${GOLD}`, animation: "dp 2s infinite", display: "inline-block" }} />
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.3em" }}>ORAKZAI GROUP</span>
              </div>
              <h1 style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.92, marginBottom: "20px" }}>
                <span style={{ display: "block" }}>SOVEREIGN</span>
                <span style={{ display: "block", background: `linear-gradient(135deg,#BF953F 0%,#FCF6BA 40%,${GOLD} 70%,#AA771C 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ECOSYSTEM</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px", maxWidth: "500px", lineHeight: 1.7, marginBottom: "28px" }}>
                3 live cores · <span style={{ color: GOLD }}>6 ventures under development</span> · 2 organizations.
                Tap any core to explore.
              </p>
              <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
                {[{ v: "3", l: "LIVE CORES" }, { v: "6", l: "IN DEVELOPMENT" }, { v: "2", l: "ORGANIZATIONS" }].map((s, i) => (
                  <div key={i} style={{ padding: "14px 24px", border: `1px solid ${GOLD_DIM}`, borderRight: i < 2 ? "none" : undefined, background: "rgba(255,255,255,0.01)" }}>
                    <div style={{ fontSize: "22px", fontWeight: 800, color: GOLD }}>{s.v}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginTop: "2px" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ORBITAL SECTION ── */}
        <section style={{ padding: "40px 0 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em", marginBottom: "32px", textAlign: "center" }}>
              // ORAKZAI GROUP — CENTER NODE · 3 LIVE CORES
            </div>

            {/* ── Desktop: SVG orbital ── */}
            {!isMobile && (
              <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "min(600px, 100%)", aspectRatio: "1" }}>
                  {/* SVG rings and lines */}
                  <svg
                    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                  >
                    <defs>
                      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={GOLD} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
                      </radialGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                    <circle cx={CX} cy={CY} r={80} fill="url(#centerGlow)" />
                    <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke={`rgba(243,186,47,0.12)`} strokeWidth="1" strokeDasharray="2 6" />
                    <circle cx={CX} cy={CY} r={52} fill="none" stroke={`rgba(243,186,47,0.25)`} strokeWidth="1.5" />
                    {LIVE_CORES.map((core) => {
                      const p = corePos(core.angle, INNER_R, CX, CY);
                      return (
                        <line key={core.id}
                          x1={CX} y1={CY} x2={p.x} y2={p.y}
                          stroke={`rgba(243,186,47,0.2)`} strokeWidth="1"
                          filter="url(#glow)"
                        />
                      );
                    })}
                  </svg>

                  {/* Center node */}
                  <div
                    onClick={() => window.open("https://www.linkedin.com/company/orakzaigroup/", "_blank")}
                    style={{
                      position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%, -65%)",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      cursor: "pointer", zIndex: 10,
                    }}
                  >
                    <div style={{ position: "relative", width: "110px", height: "110px" }}>
                      <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", background: `conic-gradient(${GOLD}, rgba(243,186,47,0.2), ${GOLD})`, animation: "spin 8s linear infinite" }} />
                      <div style={{ position: "absolute", inset: "-4px", borderRadius: "50%", background: "#000" }} />
                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${GOLD}`, boxShadow: `0 0 28px rgba(243,186,47,0.5), 0 0 60px rgba(243,186,47,0.15)`, overflow: "hidden", background: "#111", zIndex: 2 }}>
                        <img src="/og-logo.jpg" alt="Faisal Orakzai — Founder & Chairman Orakzai Group"
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                          onError={(e) => { (e.target as HTMLImageElement).src = "/logos/orakzai-group.jpg"; }}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "8px", textAlign: "center", background: "rgba(0,0,0,0.85)", border: `1px solid rgba(243,186,47,0.25)`, padding: "5px 12px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: "8px", color: GOLD, letterSpacing: "0.2em" }}>ORAKZAI GROUP</div>
                    </div>
                  </div>

                  {/* Live Core nodes */}
                  {LIVE_CORES.map((core) => {
                    const p = corePos(core.angle, INNER_R, CX, CY);
                    const pct = { left: `${(p.x / SVG_W) * 100}%`, top: `${(p.y / SVG_H) * 100}%` };
                    const isActive = activeCore === core.id;
                    return (
                      <motion.button
                        key={core.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (core.url) { window.open(core.url, "_blank"); return; }
                          setActiveCore(isActive ? null : core.id);
                        }}
                        style={{
                          position: "absolute", left: pct.left, top: pct.top,
                          transform: "translate(-50%, -50%)",
                          width: "80px", height: "80px", borderRadius: "50%",
                          border: `2px solid ${isActive ? core.statusColor : "rgba(243,186,47,0.4)"}`,
                          background: "#050505",
                          boxShadow: `0 0 ${isActive ? "24px" : "12px"} ${core.statusColor}40`,
                          overflow: "hidden", cursor: "pointer", padding: 0, zIndex: 10,
                          transition: "box-shadow 0.3s, border-color 0.3s",
                        }}
                      >
                        <img src={core.logo} alt={core.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            t.style.display = "none";
                            const p = t.parentElement!;
                            p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#F3BA2F;">${core.ticker}</div>`;
                          }}
                        />
                        <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "8px", height: "8px", borderRadius: "50%", background: core.statusColor, boxShadow: `0 0 6px ${core.statusColor}`, animation: "dp 2s infinite" }} />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Mobile: flat layout ── */}
            {isMobile && (
              <div>
                <div onClick={() => window.open("https://www.linkedin.com/company/orakzaigroup/", "_blank")}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px", cursor: "pointer" }}>
                  <div style={{ position: "relative", width: "100px", height: "100px", marginBottom: "10px" }}>
                    <div style={{ position: "absolute", inset: "-7px", borderRadius: "50%", background: `conic-gradient(${GOLD}, rgba(243,186,47,0.2), ${GOLD})`, animation: "spin 8s linear infinite" }} />
                    <div style={{ position: "absolute", inset: "-3px", borderRadius: "50%", background: "#000" }} />
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${GOLD}`, overflow: "hidden", boxShadow: `0 0 24px rgba(243,186,47,0.4)` }}>
                      <img src="/og-logo.jpg" alt="Faisal Orakzai" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                        onError={(e) => { (e.target as HTMLImageElement).src = "/logos/orakzai-group.jpg"; }} />
                    </div>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.2em" }}>ORAKZAI GROUP</div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.35em", marginBottom: "12px" }}>// LIVE CORES</div>
                  <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
                    {LIVE_CORES.map((core) => (
                      <div key={core.id}
                        onClick={() => core.url ? window.open(core.url, "_blank") : setActiveCore(activeCore === core.id ? null : core.id)}
                        style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", minWidth: "80px" }}>
                        <div style={{ width: "68px", height: "68px", borderRadius: "50%", border: `2px solid ${core.statusColor}`, boxShadow: `0 0 16px ${core.statusColor}40`, overflow: "hidden", background: "#000" }}>
                          <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: "80px" }}>{core.name}</div>
                        <div style={{ fontFamily: "monospace", fontSize: "8px", color: core.statusColor, letterSpacing: "0.1em" }}>{core.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── EXPANDED PANEL: Live Core info ── */}
        <AnimatePresence mode="wait">
          {activeCore && (
            <motion.section
              key={activeCore}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
                {(() => {
                  const core = LIVE_CORES.find(c => c.id === activeCore)!;
                  return (
                    <div style={{ border: `1px solid ${core.statusColor}30`, borderTop: `2px solid ${core.statusColor}`, padding: "24px 28px", background: `linear-gradient(135deg, ${core.statusColor}05 0%, transparent 60%)`, display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: `2px solid ${core.statusColor}`, overflow: "hidden", flexShrink: 0 }}>
                        <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: "220px" }}>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: core.statusColor, letterSpacing: "0.3em", marginBottom: "4px" }}>{core.tag}</div>
                        <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>{core.name}</h3>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{core.desc}</p>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <span style={{ padding: "4px 10px", border: `1px solid ${core.statusColor}40`, fontFamily: "monospace", fontSize: "9px", color: core.statusColor }}>{core.status}</span>
                        <button onClick={() => setActiveCore(null)} style={{ all: "unset", cursor: "pointer", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>✕ CLOSE</button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── LIVE CORES STRIP ── */}
        <section style={{ padding: "40px 0 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em", marginBottom: "20px" }}>// LIVE CORES</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: GOLD_DIM }}>
              {LIVE_CORES.map((core) => (
                <div key={core.id} style={{ background: "#000", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start", cursor: core.url ? "pointer" : "default" }}
                  onClick={() => core.url && window.open(core.url, "_blank")}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `1.5px solid ${core.statusColor}50`, overflow: "hidden", flexShrink: 0, background: "#050505" }}>
                    <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: core.statusColor, letterSpacing: "0.2em", marginBottom: "4px" }}>● {core.status} · {core.tag}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{core.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{core.desc.substring(0, 80)}…</div>
                    {core.url && <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, marginTop: "8px" }}>{core.url.replace("https://", "")} ↗</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── UNDER DEVELOPMENT SECTION ── */}
        <section style={{ padding: "60px 0 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em" }}>// UNDER DEVELOPMENT</div>
              <div style={{ flex: 1, height: "1px", background: GOLD_DIM }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
              {UNDER_DEV.map((venture) => (
                <motion.div key={venture.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => VENTURE_DETAILS[venture.id] ? setActiveVenture(activeVenture === venture.id ? null : venture.id) : undefined}
                  style={{ background: "#000", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start", position: "relative", overflow: "hidden", cursor: VENTURE_DETAILS[venture.id] ? "pointer" : "default" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${venture.statusColor}60, transparent)` }} />
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: `1.5px solid ${venture.statusColor}30`, overflow: "hidden", flexShrink: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {venture.logo ? (
                      <img src={venture.logo} alt={venture.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <span style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 800, color: venture.statusColor }}>{venture.ticker}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: "4px" }}>{venture.tag}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{venture.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{venture.desc.substring(0, 75)}…</div>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.2em", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
                      IN DEVELOPMENT
                      {VENTURE_DETAILS[venture.id] && <span style={{ color: GOLD, marginLeft: "8px" }}>· TAP FOR DETAILS</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

  
        {/* ── VENTURE DETAIL PANEL ── */}
        <AnimatePresence mode="wait">
          {activeVenture && VENTURE_DETAILS[activeVenture] && (() => {
            const v = UNDER_DEV.find(u => u.id === activeVenture)!;
            const d = VENTURE_DETAILS[activeVenture];
            return (
              <motion.section
                key={activeVenture}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 20px" }}>
                  <div style={{ border: `1px solid ${v.statusColor}25`, borderTop: `3px solid ${v.statusColor}`, background: `linear-gradient(180deg, ${v.statusColor}06 0%, transparent 40%)`, padding: "32px" }}>
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap", marginBottom: "28px" }}>
                      <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `2px solid ${v.statusColor}50`, overflow: "hidden", flexShrink: 0, background: "#050505" }}>
                        {v.logo && <img src={v.logo} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: "240px" }}>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "6px" }}>{v.tag}</div>
                        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" }}>{v.name}</h2>
                        <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>{d.title}</p>
                      </div>
                      <div style={{ display: "flex", gap: "10px", flexShrink: 0, flexWrap: "wrap" }}>
                        {d.pdfUrl && (
                          <a href={d.pdfUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: `${v.statusColor}15`, border: `1px solid ${v.statusColor}50`, color: v.statusColor, fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none", cursor: "pointer" }}>
                            ↓ PDF DETAILS
                          </a>
                        )}
                        {d.githubUrl && (
                          <a href={d.githubUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none" }}>
                            ↗ GITHUB REPO
                          </a>
                        )}
                        <button onClick={() => setActiveVenture(null)}
                          style={{ all: "unset", cursor: "pointer", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>
                          ✕ CLOSE
                        </button>
                      </div>
                    </div>

                    {/* Bio */}
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "800px", borderLeft: `3px solid ${v.statusColor}40`, paddingLeft: "16px" }}>{d.bio}</p>

                    {/* Description */}
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.8, marginBottom: "32px", maxWidth: "800px" }}>{d.description}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                      {/* Unique Features */}
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// UNIQUE FEATURES</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {d.uniqueFeatures.map((f, i) => (
                            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                              <span style={{ color: v.statusColor, fontSize: "10px", flexShrink: 0, marginTop: "2px" }}>▸</span>
                              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// GLOBAL BENEFITS</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {d.benefits.map((b, i) => (
                            <div key={i} style={{ padding: "10px 14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                              <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>{b.label}</div>
                              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{b.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Roadmap */}
                    <div style={{ marginTop: "28px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// ROADMAP & MODULES</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {d.roadmap.map((r, i) => (
                          <div key={i} style={{ display: "flex", gap: "16px", padding: "14px 18px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", alignItems: "flex-start" }}>
                            <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.1em", flexShrink: 0, paddingTop: "2px", minWidth: "24px" }}>{String(i + 1).padStart(2, "0")}</div>
                            <div>
                              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{r.module}</div>
                              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{r.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.section>
            );
          })()}
        </AnimatePresence>

        {/* ── ORGANIZATIONS SECTION ── */}
        <section style={{ padding: "60px 0 80px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em" }}>// ORGANIZATIONS & FOUNDATIONS</div>
              <div style={{ flex: 1, height: "1px", background: GOLD_DIM }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
              {ORGANIZATIONS.map((org) => (
                <motion.div key={org.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  style={{ background: "#000", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start", position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${org.statusColor}60, transparent)` }} />
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: `1.5px solid ${org.statusColor}30`, overflow: "hidden", flexShrink: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {org.logo ? (
                      <img src={org.logo} alt={org.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <span style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 800, color: org.statusColor }}>{org.ticker}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: "4px" }}>{org.tag}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{org.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{org.desc}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: org.statusColor, letterSpacing: "0.2em", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: org.statusColor, display: "inline-block", animation: "dp 2s infinite" }} />
                      ACTIVE
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          @keyframes dp { 0%,100%{opacity:1;box-shadow:0 0 6px #F3BA2F} 50%{opacity:0.4;box-shadow:0 0 16px #F3BA2F} }
          @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        `}</style>
      </div>
      </>
    );
  }
  