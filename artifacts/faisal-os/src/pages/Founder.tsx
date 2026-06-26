import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

/* ============================================================
   FAISAL ORAKZAI — STORY PAGE
   Cyberpunk Dark Luxury · Cinematic · Blockchain Node Network
   ============================================================ */

const GOLD = "#F3BA2F";
const GOLD_DIM = "rgba(243,186,47,0.15)";
const GOLD_GLOW = "rgba(243,186,47,0.6)";

const storyImages = [
  { src: "/story/story-01.jpg", alt: "Muhammad Faisal Orakzai - Founder Orakzai Group, Blockchain Entrepreneur Pakistan" },
  { src: "/story/story-02.jpg", alt: "Faisal Orakzai - CEO Orakzai Group, Crypto Blockchain Innovator" },
  { src: "/story/story-03.png", alt: "Faisal Orakzai - Orakzai Bond Founder, Polygon Blockchain Architect Pakistan" },
  { src: "/story/story-04.jpg", alt: "Faisal Orakzai - Entrepreneur Pakistan, AI Blockchain Visionary" },
  { src: "/story/story-05.png", alt: "Faisal Orakzai - GMA Silicon Valley Conference Speaker" },
  { src: "/story/story-06.jpg", alt: "Muhammad Faisal Orakzai - Traditional Dress Entrepreneur Pakistan" },
  { src: "/story/story-07.jpg", alt: "Faisal Orakzai - Orakzai Ventures Founder, Beach Pakistan" },
  { src: "/story/story-08.jpg", alt: "Faisal Orakzai - Digital Asset Founder, Rooftop Karachi Pakistan" },
  { src: "/story/story-09.jpg", alt: "Faisal Orakzai - Orakzai Group Chairman, Karachi Seafront" },
  { src: "/story/story-10.jpg", alt: "Faisal Orakzai - Real Estate Blockchain Pakistan, Orakzai Heritage Mountains" },
  { src: "/story/story-11.jpg", alt: "Faisal Orakzai - Orakzai Group Founder, City Karachi Background" },
  { src: "/story/story-12.jpg", alt: "Faisal Orakzai - Wall Street New York, Blockchain Tokenization Global" },
  { src: "/story/story-13.jpg", alt: "Muhammad Faisal Orakzai - Orakzai Mountains KPK Pakistan Scenic" },
  { src: "/story/story-14.jpg", alt: "Faisal Orakzai - Young Orakzai Agency Mountains Genesis Story" },
  { src: "/story/story-15.jpg", alt: "Faisal Orakzai - Orakzai Vision Leading the Future Conference Speaker" },
  { src: "/story/story-16.jpg", alt: "Faisal Orakzai - Childhood Photo Orakzai Agency Pakistan Early Life" },
  { src: "/story/story-17.jpg", alt: "Faisal Orakzai - Dusseldorf Germany International Expansion" },
  { src: "/story/story-18.jpg", alt: "Faisal Orakzai - Karachi Stock Exchange Pakistan Financial Innovation" },
  { src: "/story/story-19.jpg", alt: "Faisal Orakzai - Kohat Heritage Orakzai Tribal Roots KPK" },
  { src: "/story/story-20.jpg", alt: "Faisal Orakzai - Early Life Karachi Entrepreneurship Journey" },
];

const timelineData = [
  { year: "2006", phase: "GENESIS", title: "Birth in Orakzai Agency, Tirah, KPK", desc: "Muhammad Faisal Orakzai (فیصل اورکزئی) is born on April 30, 2006, in the rugged terrain of Mamuzai, Orakzai Agency — a land of mountains, resilience, and ancient Pashtun heritage.", isVision: false },
  { year: "2010", phase: "DISPLACEMENT", title: "Strategic Relocation to Kohat", desc: "As regional conflicts intensify in the tribal belt, the family relocates to Kohat. Young Faisal manages rural livestock in the mountains — anchoring an early understanding of decentralized resource management.", isVision: false },
  { year: "2011–2017", phase: "FOUNDATIONS", title: "Dual Academic Framework", desc: "Parallel enrollment: Madrassa Mahad-ul-Uleman + Yahya Public School, Kohat — developing sharp analytical and disciplined cognitive frameworks across traditional and modern knowledge systems.", isVision: false },
  { year: "2018", phase: "METROPOLITAN SHIFT", title: "The Karachi Core Deployment", desc: "At just 12 years old, Faisal executes a high-risk transition to Karachi's PECHS district — entering the cutthroat micro-markets of local real estate without a roadmap, only determination.", isVision: false },
  { year: "2019–2021", phase: "EXPANSION", title: "Tri-City Real Estate Nexus", desc: "He expands brokerage and arbitrage networks across Karachi, Peshawar, and Kohat. Establishes the parent umbrella corporate identity: Orakzai Group.", isVision: false },
  { year: "2022–2023", phase: "TECHNICAL PIVOT", title: "The Digital Transition", desc: "Pivots to global technology systems — intensive research into digital asset custody, algorithmic trading, and system design. Enrolls at Ziauddin Medical University (SMC).", isVision: false },
  { year: "2024–2025", phase: "GLOBAL NETWORK", title: "Dubai · Düsseldorf · International Expansion", desc: "Orakzai Group evolves into a tech infrastructure lab. Institutional gateway networks spanning Dubai and Düsseldorf, Germany — absorbing BlackRock-level tokenization frameworks.", isVision: false },
  { year: "Early 2026", phase: "AUTOMATION ERA", title: "OrakzaiX & AdamX Launch", desc: "Launches OrakzaiX and AdamX — high-throughput AI and machine-learning automation frameworks designed to eliminate human latency in corporate digital operations.", isVision: false },
  { year: "April 2026", phase: "BLOCKCHAIN ARTIFACT", title: "Orakzai Bond (OKBOND) — Polygon Layer-2", desc: "Deploys OKBOND natively on Polygon Layer-2 — a deflationary, 10M max supply, treasury-backed capital protection framework with Cycle-Based Activation Logic. Validated on SolidityScan.", isVision: false },
  { year: "June 2026", phase: "LUXURY TECH", title: "Shamim Forever — Cryptographic Provenance", desc: "Integrates Web3 provenance into ultra-luxury: Shamim Forever — museum-grade luxury brand (perfumes, bespoke sapphire jewelry, cosmetics) secured through cryptographic provenance tokens.", isVision: false },
  { year: "2027–2030", phase: "VISION", title: "OreC Protocol — Real Estate Tokenization", desc: "Complete deployment of the OreC Protocol — tokenizing multi-million dollar institutional real estate nodes across Pakistan and UAE into tradeable digital fractions under OKBOND.", isVision: true },
  { year: "2031–2040", phase: "VISION", title: "Autonomous Sovereign Conglomerate", desc: "Transitioning Orakzai Group into a fully autonomous, cross-border digital nation asset class — where AI, blockchain custody, and luxury markets merge into a self-sustaining economic system.", isVision: true },
];

/* ── Live Blockchain Node Canvas ─────────────────────────── */
function BlockchainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const nodeCount = Math.floor((w * h) / 14000);
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number; speed: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let t = 0;
    function draw() {
      ctx!.clearRect(0, 0, w, h);
      t += 0.008;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.speed;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(243,186,47,${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const radius = n.r + glow * 1.5;
        const alpha = 0.3 + glow * 0.5;

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(243,186,47,${alpha})`;
        ctx!.fill();

        // Glow ring
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, radius + 2, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(243,186,47,${alpha * 0.3})`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}
    />
  );
}

/* ── Glitch Text ─────────────────────────────────────────── */
function GlitchText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`glitch-wrap ${className || ""}`} style={style} data-text={text}>
      {text}
    </span>
  );
}

/* ── Orb Background ──────────────────────────────────────── */
function CinematicOrbs() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* Main gold orb */}
      <div style={{
        position: "absolute", width: "900px", height: "900px",
        background: "radial-gradient(circle, rgba(243,186,47,0.06) 0%, rgba(243,186,47,0.02) 40%, transparent 70%)",
        top: "-200px", right: "-300px",
        animation: "orbFloat1 20s ease-in-out infinite",
        borderRadius: "50%",
      }} />
      {/* Secondary orb */}
      <div style={{
        position: "absolute", width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(243,186,47,0.04) 0%, transparent 65%)",
        bottom: "-100px", left: "-200px",
        animation: "orbFloat2 25s ease-in-out infinite",
        borderRadius: "50%",
      }} />
      {/* Scan lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ── Live Ticker ─────────────────────────────────────────── */
function LiveTicker() {
  const items = [
    "OKBOND · POLYGON L2 · ACTIVE",
    "ORAKZAI GROUP · EST 2019",
    "SHAMIM FOREVER · LIVE",
    "ORAKZAIX AI · DEPLOYED",
    "10M MAX SUPPLY · DEFLATIONARY",
    "ADAMX · OPERATIONAL",
    "فیصل اورکزئی · FOUNDER",
    "BLOCKCHAIN NODE · SYNCED",
  ];
  return (
    <div style={{
      overflow: "hidden", borderTop: `1px solid ${GOLD_DIM}`, borderBottom: `1px solid ${GOLD_DIM}`,
      background: "rgba(0,0,0,0.5)", padding: "8px 0",
    }}>
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ padding: "0 32px", color: GOLD, fontFamily: "monospace", fontSize: "11px", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>
            {item}
            <span style={{ marginLeft: "32px", opacity: 0.3 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stat Card ───────────────────────────────────────────── */
function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, borderColor: GOLD }}
      style={{
        border: `1px solid ${GOLD_DIM}`,
        background: "linear-gradient(135deg, rgba(243,186,47,0.03) 0%, rgba(0,0,0,0) 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s",
        cursor: "default",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        opacity: 0.5,
      }} />
      <div style={{ fontFamily: "monospace", fontSize: "10px", color: `rgba(243,186,47,0.5)`, letterSpacing: "0.25em", marginBottom: "8px" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>{sub}</div>}
    </motion.div>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function Founder() {
  const [currentImg, setCurrentImg] = useState(0);
  const [imgFading, setImgFading] = useState(false);
  const [blockHeight, setBlockHeight] = useState(21847392);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -80]);

  /* Auto-rotate images every 3s */
  useEffect(() => {
    const iv = setInterval(() => {
      setImgFading(true);
      setTimeout(() => {
        setCurrentImg((p) => (p + 1) % storyImages.length);
        setImgFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  /* Live block height counter */
  useEffect(() => {
    const iv = setInterval(() => setBlockHeight((h) => h + 1), 6000);
    return () => clearInterval(iv);
  }, []);

  /* SEO + Structured Data */
  useEffect(() => {
    document.title = "Story of Faisal Orakzai | Founder Orakzai Group | Blockchain Entrepreneur Pakistan | فیصل اورکزئی";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Muhammad Faisal Orakzai (فیصل اورکزئی) — Born 30 April 2006, Orakzai Agency, Tirah, KPK, Pakistan. Founder & Chairman of Orakzai Group, Orakzai Bond (OKBOND) on Polygon blockchain, Shamim Forever luxury brand, OrakzaiX AI. Pakistan's youngest blockchain architect.");
    }
    const prev = document.getElementById("founder-jsonld");
    if (prev) prev.remove();
    const s = document.createElement("script");
    s.id = "founder-jsonld";
    s.type = "application/ld+json";
    s.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://faisalorakzai.com/founder#profilepage",
          url: "https://faisalorakzai.com/founder",
          name: "Faisal Orakzai — Story | Founder Orakzai Group | فیصل اورکزئی",
          description: "Official profile of Muhammad Faisal Orakzai — blockchain entrepreneur, born Orakzai Agency KPK 2006. Founder of Orakzai Group, OKBOND, Shamim Forever.",
          datePublished: "2026-01-01T00:00:00Z",
          dateModified: "2026-06-27T00:00:00Z",
          inLanguage: "en",
          mainEntity: { "@id": "https://www.wikidata.org/wiki/Q140264666" },
        },
        {
          "@type": "Person",
          "@id": "https://www.wikidata.org/wiki/Q140264666",
          name: "Muhammad Faisal Orakzai",
          givenName: "Faisal",
          familyName: "Orakzai",
          alternateName: ["Faisal Orakzai", "فیصل اورکزئی", "Chairman Faisal Orakzai", "Faisal Orakzai Blockchain", "Faisal Orakzai Pakistan"],
          birthDate: "2006-04-30",
          birthPlace: {
            "@type": "Place",
            name: "Orakzai Agency, Tirah, Khyber Pakhtunkhwa, Pakistan",
            address: { "@type": "PostalAddress", addressRegion: "Khyber Pakhtunkhwa", addressCountry: "PK" },
          },
          nationality: "Pakistani",
          jobTitle: ["Founder & Chairman", "Blockchain Architect", "Entrepreneur"],
          worksFor: [
            { "@type": "Organization", name: "Orakzai Group", url: "https://faisalorakzai.com" },
            { "@type": "Organization", name: "Orakzai Bond", url: "https://orakzaibond.com" },
            { "@type": "Organization", name: "Shamim Forever", url: "https://www.shamimforever.com" },
          ],
          alumniOf: [
            { "@type": "EducationalOrganization", name: "Ziauddin Medical University (SMC)", url: "https://zu.edu.pk" },
            { "@type": "EducationalOrganization", name: "Yahya Public School, Kohat" },
            { "@type": "EducationalOrganization", name: "Madrassa Mahad-ul-Uleman, Kohat" },
          ],
          award: ["Stevie® Gold Award — Technology Innovation 2026", "GMA Silicon Valley Recognition 2025"],
          knowsAbout: ["Blockchain", "Polygon", "DeFi", "OKBOND", "Artificial Intelligence", "Real Estate Tokenization", "Luxury Commerce", "Web3"],
          image: [
            { "@type": "ImageObject", url: "https://faisalorakzai.com/story/story-01.jpg", name: "Muhammad Faisal Orakzai — Founder Orakzai Group Pakistan" },
            { "@type": "ImageObject", url: "https://faisalorakzai.com/story/story-02.jpg", name: "Faisal Orakzai — Blockchain Entrepreneur Pakistan" },
            { "@type": "ImageObject", url: "https://faisalorakzai.com/story/story-03.png", name: "Faisal Orakzai — OKBOND Polygon Blockchain" },
            { "@type": "ImageObject", url: "https://faisalorakzai.com/story/story-04.jpg", name: "Faisal Orakzai — AI Blockchain Visionary Pakistan" },
            { "@type": "ImageObject", url: "https://faisalorakzai.com/story/story-05.png", name: "Faisal Orakzai — GMA Silicon Valley Conference" },
          ],
          url: "https://faisalorakzai.com/founder",
          mainEntityOfPage: "https://faisalorakzai.com/founder",
          sameAs: [
            "https://orakzaibond.com/founder",
            "https://www.shamimforever.com/founder",
            "https://orakzaibond.com/faisal-orakzai",
            "https://www.wikidata.org/wiki/Q140264666",
            "https://www.crunchbase.com/person/faisal-orakzai",
            "https://en.everybodywiki.com/Faisal_Orakzai",
            "https://www.linkedin.com/in/faisalorakzaii",
            "https://x.com/faisalorakzaii",
            "https://www.instagram.com/faisalorakzaii",
            "https://github.com/faisalorakzai-lab",
            "https://tiktok.com/@chairmanorakzai",
            "https://orcid.org/0009-0000-0915-7272",
          ],
          identifier: { "@type": "PropertyValue", propertyID: "Wikidata", value: "Q140264666" },
        },
      ],
    });
    document.head.appendChild(s);
    return () => { document.getElementById("founder-jsonld")?.remove(); };
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}
      itemScope itemType="https://schema.org/Person">
      <span itemProp="name" style={{ display: "none" }}>Muhammad Faisal Orakzai</span>
      <span itemProp="birthDate" style={{ display: "none" }}>2006-04-30</span>
      <span itemProp="birthPlace" style={{ display: "none" }}>Orakzai Agency, Tirah, KPK, Pakistan</span>
      <span itemProp="jobTitle" style={{ display: "none" }}>Founder & Chairman, Orakzai Group</span>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "80px", overflow: "hidden" }}>
        {/* Deep black atmosphere */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(243,186,47,0.04) 0%, transparent 65%), radial-gradient(ellipse 50% 80% at 10% 90%, rgba(243,186,47,0.03) 0%, transparent 60%), #000" }} />
        <BlockchainCanvas />
        <CinematicOrbs />

        {/* Vertical gold line left */}
        <div style={{ position: "absolute", left: "0", top: 0, bottom: 0, width: "1px", background: `linear-gradient(180deg, transparent, ${GOLD}, transparent)`, opacity: 0.3 }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px", alignItems: "center" }}
            className="hero-grid">

            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              {/* Status badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", border: `1px solid ${GOLD_DIM}`, marginBottom: "28px", background: "rgba(243,186,47,0.03)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GOLD, boxShadow: `0 0 8px ${GOLD}`, animation: "pulse 2s infinite", display: "inline-block" }} />
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.3em" }}>BLOCK #{blockHeight.toLocaleString()} · POLYGON LIVE</span>
              </div>

              {/* Main name */}
              <h1 style={{ fontSize: "clamp(52px, 10vw, 96px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.9, margin: "0 0 16px" }}>
                <span style={{ display: "block", color: "#fff" }}>FAISAL</span>
                <span className="glitch-wrap" data-text="ORAKZAI" style={{
                  display: "block",
                  background: `linear-gradient(135deg, #BF953F 0%, #FCF6BA 40%, ${GOLD} 60%, #AA771C 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>ORAKZAI</span>
              </h1>

              <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(243,186,47,0.5)", letterSpacing: "0.3em", marginBottom: "6px" }}>MUHAMMAD FAISAL ORAKZAI · فیصل اورکزئی</div>
              <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", marginBottom: "32px" }} itemProp="jobTitle">
                FOUNDER &amp; CHAIRMAN · ORAKZAI GROUP
              </div>

              {/* Description */}
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: 1.8, maxWidth: "520px", marginBottom: "40px" }} itemProp="description">
                From the mountains of <strong style={{ color: "#fff" }}>Orakzai Agency, KPK</strong> to deploying
                blockchain infrastructure on <span style={{ color: GOLD }}>Polygon Layer-2</span>.
                Founder of <span style={{ color: GOLD }}>OKBOND</span> and
                <span style={{ color: GOLD }}> Shamim Forever</span>. A sovereign story of raw
                resilience and architectural ambition.
              </p>

              {/* Stat grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px", maxWidth: "420px", marginBottom: "40px" }}>
                <StatCard label="BORN" value="30 APR 2006" sub="Orakzai Agency, KPK" />
                <StatCard label="BASE" value="KARACHI" sub="Pakistan" />
                <StatCard label="NETWORK" value="GLOBAL" sub="Dubai · Düsseldorf · NYC" />
                <StatCard label="BLOCK CHAIN" value="POLYGON" sub="OKBOND Live" />
              </div>

              {/* CTA */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href="https://orakzaibond.com" target="_blank" rel="noreferrer" style={{
                  padding: "12px 28px",
                  background: `linear-gradient(135deg, #BF953F, ${GOLD}, #AA771C)`,
                  color: "#000", fontWeight: 700, fontSize: "12px", letterSpacing: "0.2em",
                  textDecoration: "none", display: "inline-block", transition: "opacity 0.2s",
                }}>OKBOND →</a>
                <a href="https://www.shamimforever.com" target="_blank" rel="noreferrer" style={{
                  padding: "12px 28px",
                  border: `1px solid ${GOLD_DIM}`, color: GOLD,
                  fontSize: "12px", letterSpacing: "0.2em",
                  textDecoration: "none", display: "inline-block",
                  background: "rgba(243,186,47,0.03)",
                }}>SHAMIM FOREVER →</a>
              </div>
            </motion.div>

            {/* Right: Photo Slideshow */}
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2 }} style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="hero-slideshow">
              <div style={{ position: "relative", width: "100%", maxWidth: "380px" }}>
                {/* Outer glow */}
                <div style={{
                  position: "absolute", inset: "-12px",
                  background: `radial-gradient(ellipse, rgba(243,186,47,0.12) 0%, transparent 70%)`,
                  filter: "blur(20px)",
                  animation: "orbFloat1 8s ease-in-out infinite",
                  zIndex: 0,
                }} />
                {/* Gold frame */}
                <div style={{
                  position: "relative", zIndex: 1,
                  border: `1px solid rgba(243,186,47,0.4)`,
                  boxShadow: `0 0 40px rgba(243,186,47,0.08), inset 0 0 40px rgba(0,0,0,0.5)`,
                }}>
                  {/* Corner ornaments */}
                  {[["0","0","border-top","border-left"],["0","auto","border-top","border-right"],["auto","0","border-bottom","border-left"],["auto","auto","border-bottom","border-right"]].map(([t,r,b1,b2], i) => (
                    <div key={i} style={{
                      position: "absolute", width: "20px", height: "20px",
                      top: i < 2 ? "8px" : "auto",
                      bottom: i >= 2 ? "8px" : "auto",
                      left: i % 2 === 0 ? "8px" : "auto",
                      right: i % 2 === 1 ? "8px" : "auto",
                      borderTop: i < 2 ? `1px solid ${GOLD}` : undefined,
                      borderBottom: i >= 2 ? `1px solid ${GOLD}` : undefined,
                      borderLeft: i % 2 === 0 ? `1px solid ${GOLD}` : undefined,
                      borderRight: i % 2 === 1 ? `1px solid ${GOLD}` : undefined,
                      opacity: 0.8, zIndex: 10,
                    }} />
                  ))}

                  {/* Image */}
                  <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImg}
                        src={storyImages[currentImg].src}
                        alt={storyImages[currentImg].alt}
                        itemProp="image"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }}
                        onError={(e) => { (e.target as HTMLImageElement).src = "/logo.png"; }}
                      />
                    </AnimatePresence>
                    {/* Scanline overlay */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
                      pointerEvents: "none",
                    }} />
                    {/* Bottom gradient */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                      padding: "20px 16px 16px", zIndex: 5,
                    }}>
                      <div style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.3em", marginBottom: "10px" }}>
                        FAISAL ORAKZAI · فیصل اورکزئی
                      </div>
                      {/* Progress dots */}
                      <div style={{ display: "flex", gap: "4px" }}>
                        {storyImages.map((_, i) => (
                          <button key={i} onClick={() => setCurrentImg(i)}
                            style={{
                              width: i === currentImg ? "24px" : "6px", height: "2px",
                              background: i === currentImg ? GOLD : "rgba(243,186,47,0.25)",
                              border: "none", cursor: "pointer", transition: "all 0.4s",
                              padding: 0,
                              boxShadow: i === currentImg ? `0 0 6px ${GOLD}` : "none",
                            }}
                            aria-label={`Photo ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Counter */}
                    <div style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: "rgba(0,0,0,0.8)", border: `1px solid ${GOLD_DIM}`,
                      padding: "4px 8px", fontFamily: "monospace", fontSize: "10px", color: GOLD, zIndex: 10,
                    }}>
                      {String(currentImg + 1).padStart(2, "0")} / {storyImages.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div style={{ display: "flex", gap: "6px", marginTop: "16px", overflowX: "auto", maxWidth: "380px", paddingBottom: "4px" }}>
                {storyImages.slice(0, 7).map((img, i) => (
                  <button key={i} onClick={() => setCurrentImg(i)} style={{
                    flexShrink: 0, width: "48px", height: "64px", border: `1px solid`,
                    borderColor: currentImg === i ? GOLD : "rgba(243,186,47,0.1)",
                    overflow: "hidden", cursor: "pointer", padding: 0, background: "none",
                    boxShadow: currentImg === i ? `0 0 12px rgba(243,186,47,0.3)` : "none",
                    transition: "all 0.3s",
                  }}>
                    <img src={img.src} alt={`Faisal Orakzai ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: currentImg === i ? "none" : "grayscale(0.6) brightness(0.6)" }} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: 0.4 }}>
          <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, transparent, ${GOLD})`, margin: "0 auto 8px" }} />
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.3em" }}>SCROLL</div>
        </motion.div>
      </section>

      {/* ── LIVE TICKER ── */}
      <LiveTicker />

      {/* ── STORY / BIO ── */}
      <section style={{ padding: "100px 0", position: "relative", borderBottom: `1px solid ${GOLD_DIM}` }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(243,186,47,0.025) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "64px" }} className="bio-grid">
            <div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.35em", marginBottom: "8px" }}>// THE JOURNEY · فیصل اورکزئی</div>
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", marginBottom: "32px", lineHeight: 1.1 }}>
                FROM ORAKZAI<br />
                <span style={{ color: GOLD }}>TO THE BLOCKCHAIN</span>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: 1.85 }}>
                <p>
                  <strong style={{ color: "#fff" }}>Muhammad Faisal Orakzai</strong> (born 30 April 2006) is a Pakistani
                  entrepreneur and Founder &amp; Chairman of{" "}
                  <strong style={{ color: GOLD }}>Orakzai Group</strong> — building ventures across emerging
                  technologies and traditional industries. One of Pakistan's youngest blockchain infrastructure
                  architects, born in the tribal mountains of Orakzai Agency, Tirah, Khyber Pakhtunkhwa.
                </p>
                <p>
                  His story begins in raw survival. Amid regional conflict in the tribal belt, his family relocated
                  from Orakzai Agency to Kohat — where young Faisal managed rural livestock while building the
                  cognitive discipline that would power his later business acumen. He simultaneously enrolled at{" "}
                  <strong style={{ color: "#fff" }}>Madrassa Mahad-ul-Uleman</strong> and{" "}
                  <strong style={{ color: "#fff" }}>Yahya Public School, Kohat</strong>.
                </p>
                <p>
                  At just <strong style={{ color: GOLD }}>12 years old</strong>, he made a high-risk transition
                  to Karachi's PECHS district — entering the cutthroat micro-markets of local real estate. By 2019–2021,
                  he had built a tri-city brokerage network across Karachi, Peshawar, and Kohat, establishing{" "}
                  <strong style={{ color: GOLD }}>Orakzai Group</strong>.
                </p>
                <p>
                  In April 2026, he deployed{" "}
                  <strong style={{ color: GOLD }}>Orakzai Bond (OKBOND)</strong> natively on Polygon Layer-2 —
                  a deflationary, 10-million maximum supply, treasury-backed capital protection framework. In June
                  2026, he integrated Web3 provenance into ultra-luxury markets by founding{" "}
                  <strong style={{ color: GOLD }}>Shamim Forever</strong>.
                </p>

                <blockquote style={{
                  borderLeft: `2px solid ${GOLD}`, paddingLeft: "28px", margin: "12px 0",
                  background: "linear-gradient(to right, rgba(243,186,47,0.03), transparent)",
                  padding: "20px 28px",
                }}>
                  <p style={{ fontSize: "20px", color: "rgba(255,255,255,0.85)", fontStyle: "italic", margin: 0 }}>
                    "From the mountains of Orakzai to the chains of Polygon — I build systems that build businesses."
                  </p>
                  <footer style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, marginTop: "12px", letterSpacing: "0.25em" }}>
                    — FAISAL ORAKZAI, FOUNDER &amp; CHAIRMAN
                  </footer>
                </blockquote>
              </div>
            </div>

            {/* Side: Ventures */}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.35em", marginBottom: "20px" }}>// VENTURES · ACTIVE</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { name: "Orakzai Group", tag: "CHAIRMAN", desc: "Strategic conglomerate — tech, real estate, luxury", url: null, status: "LIVE" },
                  { name: "Orakzai Bond (OKBOND)", tag: "FOUNDER", desc: "Polygon L2 · 10M Supply · Capital-Protected", url: "https://orakzaibond.com", status: "LIVE" },
                  { name: "Shamim Forever", tag: "FOUNDER & OWNER", desc: "Museum-grade luxury · Sapphire · Perfume · Web3", url: "https://www.shamimforever.com", status: "LIVE" },
                  { name: "OrakzaiX", tag: "ARCHITECT", desc: "AI Automation Framework", url: null, status: "DEPLOYED" },
                  { name: "AdamX", tag: "ARCHITECT", desc: "ML Automation Platform", url: null, status: "DEPLOYED" },
                ].map((v, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                    style={{
                      border: `1px solid ${GOLD_DIM}`, padding: "16px 20px",
                      background: "linear-gradient(135deg, rgba(243,186,47,0.02) 0%, transparent 100%)",
                      position: "relative", overflow: "hidden",
                    }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: 0.4 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, color: "#fff", fontSize: "14px", marginBottom: "4px" }}>{v.name}</div>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.2em", marginBottom: "6px" }}>{v.tag}</div>
                        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{v.desc}</div>
                        {v.url && <a href={v.url} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, marginTop: "8px", display: "block", textDecoration: "none" }}>
                          {v.url.replace("https://", "")} ↗
                        </a>}
                      </div>
                      <span style={{
                        padding: "3px 8px", fontSize: "9px", fontFamily: "monospace",
                        border: `1px solid rgba(0,255,100,0.3)`,
                        color: "rgba(0,255,100,0.8)", letterSpacing: "0.15em", flexShrink: 0, marginLeft: "8px",
                      }}>{v.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section style={{ padding: "80px 0", borderBottom: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "32px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.35em", marginBottom: "6px" }}>// PHOTO ARCHIVE · فیصل اورکزئی</div>
            <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Muhammad Faisal Orakzai <span style={{ color: GOLD, fontSize: "20px", fontWeight: 400 }}>— Visual Record</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "6px" }}>
            {storyImages.map((img, i) => (
              <motion.button key={i}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.025 }} viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setCurrentImg(i)}
                style={{
                  aspectRatio: "3/4", overflow: "hidden", border: `1px solid`,
                  borderColor: currentImg === i ? GOLD : "rgba(243,186,47,0.08)",
                  cursor: "pointer", background: "none", padding: 0, position: "relative",
                  boxShadow: currentImg === i ? `0 0 20px rgba(243,186,47,0.25)` : "none",
                  transition: "all 0.3s",
                }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/logo.png"; }} />
                {currentImg === i && (
                  <div style={{ position: "absolute", inset: 0, border: `2px solid ${GOLD}`, boxShadow: `inset 0 0 20px rgba(243,186,47,0.15)` }} />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOVEREIGN TIMELINE ── */}
      <section style={{ padding: "100px 0", position: "relative", background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(243,186,47,0.02) 0%, transparent 65%)" }}>
        <BlockchainCanvas />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.35em", marginBottom: "8px" }}>// SOVEREIGN TIMELINE · 2006 → 2040</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "8px" }}>
            From Orakzai Mountains<br /><span style={{ color: GOLD }}>to Global Blockchain Architecture</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace", fontSize: "11px", marginBottom: "64px", letterSpacing: "0.15em" }}>
            Muhammad Faisal Orakzai · فیصل اورکزئی · OKBOND · Orakzai Group · Shamim Forever
          </p>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "88px", top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom, transparent, ${GOLD}, rgba(243,186,47,0.1))`, opacity: 0.3 }} />

            {timelineData.map((ev, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                style={{ display: "flex", gap: "24px", marginBottom: "0" }}
              >
                {/* Year */}
                <div style={{ width: "80px", flexShrink: 0, textAlign: "right", paddingTop: "28px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 700, color: ev.isVision ? "rgba(243,186,47,0.3)" : GOLD, letterSpacing: "0.1em" }}>
                    {ev.year}
                  </div>
                </div>

                {/* Dot */}
                <div style={{ flexShrink: 0, paddingTop: "30px", position: "relative" }}>
                  <div style={{
                    width: "10px", height: "10px", borderRadius: "50%",
                    border: `2px solid ${ev.isVision ? "rgba(243,186,47,0.2)" : GOLD}`,
                    background: ev.isVision ? "transparent" : "rgba(243,186,47,0.2)",
                    boxShadow: ev.isVision ? "none" : `0 0 12px rgba(243,186,47,0.5)`,
                    position: "relative", zIndex: 2,
                  }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: "18px", paddingBottom: "40px", borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                  <div style={{ fontFamily: "monospace", fontSize: "9px", color: ev.isVision ? "rgba(255,255,255,0.15)" : "rgba(243,186,47,0.5)", letterSpacing: "0.25em", marginBottom: "6px" }}>
                    {ev.isVision ? "VISION NODE" : "MILESTONE"} · {ev.phase}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "16px", color: ev.isVision ? "rgba(255,255,255,0.3)" : "#fff", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                    {ev.title}
                  </h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.75, color: ev.isVision ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.5)" }}>
                    {ev.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section style={{ padding: "80px 0 120px", borderTop: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.35em", marginBottom: "40px" }}>// CORE PRINCIPLES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: GOLD_DIM }}>
            {[
              { n: "01", t: "System Thinking", d: "Every business is a system. Understanding structure reveals leverage points that compound." },
              { n: "02", t: "Long-Term Value", d: "Short-term trends fade. Only fundamentals compound across decades." },
              { n: "03", t: "Technology as Infrastructure", d: "AI and blockchain are not sectors — they are the new foundation of all commerce." },
              { n: "04", t: "Sovereign Execution", d: "Ideas are abundant. The rarest resource is disciplined, consistent execution." },
            ].map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{
                  background: "#000", padding: "40px 32px",
                  borderTop: `2px solid transparent`,
                  transition: "all 0.3s",
                }}
                whileHover={{ backgroundColor: "rgba(243,186,47,0.02)" }}
              >
                <div style={{ fontFamily: "monospace", fontSize: "28px", color: GOLD, fontWeight: 700, marginBottom: "16px", opacity: 0.6 }}>{p.n}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{p.t}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global styles */}
      <style>{`
        @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(0.97)} }
        @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,30px)} }
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 8px #F3BA2F} 50%{opacity:0.5;box-shadow:0 0 20px #F3BA2F} }
        @keyframes tickerMove { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-track { display:inline-flex; animation:tickerMove 28s linear infinite; white-space:nowrap; }
        .glitch-wrap { position:relative; }
        .glitch-wrap::before,.glitch-wrap::after { content:attr(data-text); position:absolute; top:0; left:0; background:inherit; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
        .glitch-wrap::before { animation:glitch1 4s infinite; clip-path:polygon(0 0,100% 0,100% 35%,0 35%); opacity:0.6; }
        .glitch-wrap::after { animation:glitch2 4s infinite; clip-path:polygon(0 65%,100% 65%,100% 100%,0 100%); opacity:0.4; }
        @keyframes glitch1 { 0%,90%,100%{transform:translate(0)} 92%{transform:translate(-2px,1px)} 95%{transform:translate(2px,-1px)} 98%{transform:translate(-1px,2px)} }
        @keyframes glitch2 { 0%,88%,100%{transform:translate(0)} 90%{transform:translate(2px,-1px)} 94%{transform:translate(-2px,1px)} 97%{transform:translate(1px,-2px)} }
        @media(min-width:1024px){.hero-grid{grid-template-columns:1fr 420px!important;}.bio-grid{grid-template-columns:3fr 2fr!important;}.hero-slideshow{align-items:flex-end;}}
      `}</style>
    </div>
  );
}
