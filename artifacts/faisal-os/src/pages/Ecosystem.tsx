import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SEOHead from "@/components/shared/SEOHead";

/* ============================================================
   ORAKZAI SOVEREIGN ECOSYSTEM
   Orbital Node Design · Logos · 12 Sectors · 250 Projects
   ============================================================ */

const GOLD = "#F3BA2F";
const GOLD_DIM = "rgba(243,186,47,0.15)";

/* ── Data ─────────────────────────────────────────────────── */
const LIVE_CORES = [
  {
    id: "okbond", name: "Orakzai Bond", ticker: "OKBOND",
    logo: "/logos/okbond.png", url: "https://orakzaibond.com",
    tag: "POLYGON L2", status: "LIVE", statusColor: "#00ff88",
    desc: "Decentralized Treasury Protocol. 10M max supply, treasury-backed capital protection on Polygon.",
    angle: 315,
  },
  {
    id: "shamim", name: "Shamim Forever", ticker: "SHF",
    logo: "/logos/shamim-forever.jpg", url: "https://www.shamimforever.com",
    tag: "LUXURY · WEB3", status: "LIVE", statusColor: "#00ff88",
    desc: "Elite luxury heritage brand — museum-grade perfumes, sapphire jewelry, cryptographic provenance.",
    angle: 45,
  },
  {
    id: "okzbyte", name: "OkzByte Technology", ticker: "OKZDEV",
    logo: "/logos/okzbyte.png", url: "https://github.com/faisalorakzai-lab",
    tag: "ENGINEERING · AI", status: "ACTIVE", statusColor: GOLD,
    desc: "High-throughput technical stack & engineering engine powering the entire Orakzai infrastructure.",
    angle: 135,
  },
  {
    id: "qorix", name: "QORIX", ticker: "QRX",
    logo: "/logos/qorix.png", url: null,
    tag: "AI · FINANCE", status: "DEPLOYED", statusColor: "#60a5fa",
    desc: "Autonomous Financial Management AI System — algorithmic treasury ops and yield optimization.",
    angle: 225,
  },
];

const NODES = [
  { id:1, code:"OT", name:"Technologies", full:"Orakzai Technologies", count:25, range:"01–25", sector:"TECH · AI · CLOUD", color:"#60a5fa",
    projects:["AI Reboard","Cloud","Cybersecurity","SaaS Hub","Web Services","App Lab","Tech Support","Automation","IoT","Digital Marketing","Robotics","AR/VR","Quantum Labs","Drone Tech","Gaming Studio","Data Analytics","Semiconductor","Space Tech","Cloud AI","Global IT","Smart Home","EdTech","HR Tech","Supply Chain Tech","Green Tech"] },
  { id:2, code:"OFC", name:"Finance", full:"Orakzai Finance & Capital", count:20, range:"26–45", sector:"BANKING · FINTECH", color:"#34d399",
    projects:["Bank","Pay","Insurance","Investments","Forex Hub","Microfinance","Gold Exchange","Venture Capital","Crowdfunding","Remittance","Wealth Management","Credit Bureau","Leasing","Pension Fund","Green Finance","Private Equity","Hedge Fund","Exchange","Charity Fund","IPO Hub"] },
  { id:3, code:"OREI", name:"Real Estate", full:"Orakzai Real Estate & Infrastructure", count:20, range:"46–65", sector:"REAL ESTATE · INFRA", color:"#f97316",
    projects:["Builders","Properties","Interiors","Smart Cities","Resorts","Shopping Malls","Industrial Parks","Affordable Housing","Farmhouses","Skyscrapers","Office Towers","Gated Communities","Hotels & Apartments","Bridges & Roads","Ports & Logistics","Aviation City","Eco Housing","Real Estate Funds","Mega Marts","Global Realtors"] },
  { id:4, code:"OFB", name:"Food & Bev", full:"Orakzai Food & Beverages", count:20, range:"66–85", sector:"FOOD · FMCG", color:"#a78bfa",
    projects:["Foods","Beverages","Organic Farms","Biryani","Tea","Coffee","Frozen Foods","Dairy","Meat","Sweets & Bakers","Catering","Packaged Water","Energy Drinks","Ice Cream","Organic Spices","Restaurant Tech","Food Trucks","Super Foods","Health Foods","Food Delivery"] },
  { id:5, code:"OME", name:"Media", full:"Orakzai Media & Entertainment", count:20, range:"86–105", sector:"MEDIA · OTT", color:"#fb7185",
    projects:["News","Film Studios","Music Studio","Sports Media","Ads","Events","Talent Agency","Magazine","Kids TV","Animation Studio","Radio","Podcasts","YouTube Network","Esports","Celebrity Management","Theater","Fashion Shows","Billboard Media","OTT","Documentary Hub"] },
  { id:6, code:"OLF", name:"Lifestyle", full:"Orakzai Lifestyle & Fashion", count:20, range:"106–125", sector:"LUXURY · LIFESTYLE", color:"#f59e0b",
    projects:["Fashion","Footwear","Jewelry","Perfumes","Watches","Cosmetics","Wellness","Fitness","Leather","Home Decor","Eyewear","Travel Gear","Party Wear","Grooming","Bridal Studio","Kids Wear","Handicrafts","Luxury Store","Sportswear","Uniforms"] },
  { id:7, code:"OTH", name:"Travel", full:"Orakzai Travel & Hospitality", count:20, range:"126–145", sector:"TRAVEL · LOGISTICS", color:"#2dd4bf",
    projects:["Hotels","Airlines","Air Cargo","Tours","Ride","Shipping","Bus Service","Metro","Resorts","Car Rentals","Cruise Line","Delivery","Express Couriers","Helicopters","Pilots Academy","Ticketing","Hajj & Umrah","Bike Sharing","Taxi","Transport Tech"] },
  { id:8, code:"OEI", name:"Energy", full:"Orakzai Energy & Industry", count:20, range:"146–165", sector:"ENERGY · INDUSTRIAL", color:"#e879f9",
    projects:["Power","Solar","Wind","Hydro","Nuclear","Oil & Gas","Coal","Smart Grid","Industrial Supplies","Steel","Cement","Chemicals","Plastics","Recycling","Batteries","EV Motors","Aviation Industry","Defense Tech","Heavy Machinery","Mining"] },
  { id:9, code:"OEH", name:"Edu & Health", full:"Orakzai Education & Health", count:20, range:"166–185", sector:"EDTECH · MEDTECH", color:"#4ade80",
    projects:["University","Schools","Academy","Skills Hub","Medical College","Hospitals","Clinics","Pharma","Labs","HealthTech","Biotech","Nursing School","Dental Care","Eye Hospitals","Health Insurance","Mental Health Centers","Fitness Academy","Education Publishing","Scholarships Foundation","Research Institute"] },
  { id:10, code:"OB", name:"Base", full:"Orakzai Base", count:31, range:"186–216", sector:"BLOCKCHAIN · DEFI · WEB3", color:GOLD,
    projects:["PSC Exchange","PSC Wallet","Orakzai Token","DeFi Hub","NFT Market","Launchpad","Orakzai Chain","Orakzai Scan","Crypto Mining","Validator Network","DEX","Stablecoin","Metaverse","Gaming Token","Payment Gateway","Cross-Chain Bridge","DAO","Smart Contracts","Oracles","Web3 ID","Security Audit","Cold Wallet","Hot Wallet","Investment Fund","Charity Chain","Remittance Chain","Lending Protocol","Derivatives Exchange","Yield Farming","SocialFi","Orakzai Bonds"] },
  { id:11, code:"OM", name:"Mills", full:"Orakzai Mills", count:15, range:"216–230", sector:"AGRO · PROCESSING", color:"#94a3b8",
    projects:["Sugar","Rice","Flour","Oil Mills","Cotton Ginning","Corn Processing","Pulses","Salt Refinery","Paper","Packaging","Agro Mills","Mineral Water Plant","Edible Oils","Industrial Mills","Beverage Plant"] },
  { id:12, code:"OTX", name:"Textile", full:"Orakzai Textile", count:20, range:"231–250", sector:"TEXTILE · EXPORTS", color:"#f87171",
    projects:["Spinning","Weaving","Garments","Home Textiles","Denim Factory","Knitwear","Sportswear Exports","Fashion Tech","Leather Garments","Fabric Exports","School Uniforms","Workwear","Carpets","Silk Factory","Textile Machinery","Accessories","Dyeing & Finishing","Textile Chemicals","Ready-Made Garments","Global Textiles"] },
];

const NODE_START: Record<number, number> = {1:1,2:26,3:46,4:66,5:86,6:106,7:126,8:146,9:166,10:186,11:216,12:231};

/* ── Orbital positions ─────────────────────────────────────── */
// 12 nodes evenly spaced around a circle, starting from top
function orbitalPos(index: number, total: number, radius: number, cx: number, cy: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}
function corePos(angleDeg: number, radius: number, cx: number, cy: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
}

/* ── Main Component ─────────────────────────────────────────── */
export default function Ecosystem() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [activeCore, setActiveCore] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.title = "Orakzai Ecosystem — 12 Sectors · 250 Projects · Faisal Orakzai";
  }, []);

  // SVG canvas size
  const SVG_W = 700;
  const SVG_H = 700;
  const CX = SVG_W / 2;
  const CY = SVG_H / 2;
  const INNER_R = 145; // live cores orbit
  const OUTER_R = 290; // 12 nodes orbit

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
              12 mother companies · <span style={{ color: GOLD }}>250 infrastructure projects</span> · 4 live cores.
              Tap any node to explore its sector.
            </p>
            <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
              {[{ v: "4", l: "LIVE CORES" }, { v: "12", l: "SECTORS" }, { v: "250", l: "PROJECTS" }].map((s, i) => (
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
            // ORAKZAI GROUP — CENTER NODE · 4 LIVE CORES · 12 MOTHER SECTORS
          </div>

          {/* ── Desktop: SVG orbital ── */}
          {!isMobile && (
            <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "min(700px, 100%)", aspectRatio: "1" }}>
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

                  {/* Background glow at center */}
                  <circle cx={CX} cy={CY} r={80} fill="url(#centerGlow)" />

                  {/* Outer ring */}
                  <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke={`rgba(243,186,47,0.08)`} strokeWidth="1" strokeDasharray="4 8" />
                  {/* Inner ring */}
                  <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke={`rgba(243,186,47,0.12)`} strokeWidth="1" strokeDasharray="2 6" />
                  {/* Center ring */}
                  <circle cx={CX} cy={CY} r={52} fill="none" stroke={`rgba(243,186,47,0.25)`} strokeWidth="1.5" />

                  {/* Lines: center → live cores */}
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

                  {/* Lines: live cores → outer nodes */}
                  {NODES.map((node, i) => {
                    const op = orbitalPos(i, 12, OUTER_R, CX, CY);
                    // Connect to nearest core
                    const nearestCoreAngle = [315, 45, 135, 225];
                    const nearestIdx = nearestCoreAngle.reduce((best, angle, ci) => {
                      const nodeAngle = (i / 12) * 360;
                      const diff = Math.abs(nodeAngle - angle);
                      const bestAngle = nearestCoreAngle[best];
                      const bestDiff = Math.abs(nodeAngle - bestAngle);
                      return diff < bestDiff ? ci : best;
                    }, 0);
                    const cp = corePos(LIVE_CORES[nearestIdx].angle, INNER_R, CX, CY);
                    return (
                      <line key={node.id}
                        x1={cp.x} y1={cp.y} x2={op.x} y2={op.y}
                        stroke={`rgba(243,186,47,0.1)`} strokeWidth="0.8"
                      />
                    );
                  })}
                </svg>

                {/* Center node — Faisal Photo + LinkedIn link */}
                <div
                  onClick={() => window.open("https://www.linkedin.com/company/orakzaigroup/", "_blank")}
                  style={{
                    position: "absolute",
                    left: "50%", top: "50%",
                    transform: "translate(-50%, -65%)",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    cursor: "pointer", zIndex: 10,
                  }}
                >
                  {/* Outer glow ring */}
                  <div style={{
                    position: "relative",
                    width: "110px", height: "110px",
                  }}>
                    <div style={{
                      position: "absolute", inset: "-8px", borderRadius: "50%",
                      background: `conic-gradient(${GOLD}, rgba(243,186,47,0.2), ${GOLD})`,
                      animation: "spin 8s linear infinite",
                    }} />
                    <div style={{
                      position: "absolute", inset: "-4px", borderRadius: "50%",
                      background: "#000",
                    }} />
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "50%",
                      border: `2px solid ${GOLD}`,
                      boxShadow: `0 0 28px rgba(243,186,47,0.5), 0 0 60px rgba(243,186,47,0.15)`,
                      overflow: "hidden",
                      background: "#111",
                      zIndex: 2,
                    }}>
                      <img
                        src="/og-logo.jpg"
                        alt="Faisal Orakzai — Founder & Chairman Orakzai Group"
                        style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.src = "/logos/orakzai-group.jpg";
                        }}
                      />
                    </div>
                  </div>
                  {/* Label below */}
                  <div style={{
                    marginTop: "8px", textAlign: "center",
                    background: "rgba(0,0,0,0.85)",
                    border: `1px solid rgba(243,186,47,0.25)`,
                    padding: "5px 12px",
                  }}>
                    
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: GOLD, letterSpacing: "0.2em", lineHeight: 1.5, textAlign: "center" }}>ORAKZAI GROUP</div>
                  </div>
                </div>

                {/* Live Core nodes — inner orbit */}
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
                        position: "absolute",
                        left: pct.left, top: pct.top,
                        transform: "translate(-50%, -50%)",
                        width: "76px", height: "76px",
                        borderRadius: "50%",
                        border: `2px solid ${isActive ? core.statusColor : "rgba(243,186,47,0.4)"}`,
                        background: "#050505",
                        boxShadow: `0 0 ${isActive ? "24px" : "12px"} ${core.statusColor}40`,
                        overflow: "hidden",
                        cursor: "pointer",
                        padding: 0, zIndex: 10,
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
                      {/* Status dot */}
                      <div style={{
                        position: "absolute", bottom: "4px", right: "4px",
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: core.statusColor,
                        boxShadow: `0 0 6px ${core.statusColor}`,
                        animation: "dp 2s infinite",
                      }} />
                    </motion.button>
                  );
                })}

                {/* 12 Mother Sector nodes — outer orbit */}
                {NODES.map((node, i) => {
                  const p = orbitalPos(i, 12, OUTER_R, CX, CY);
                  const pct = { left: `${(p.x / SVG_W) * 100}%`, top: `${(p.y / SVG_H) * 100}%` };
                  const isActive = activeNode === node.id;
                  return (
                    <motion.button
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setActiveNode(isActive ? null : node.id)}
                      style={{
                        position: "absolute",
                        left: pct.left, top: pct.top,
                        transform: "translate(-50%, -50%)",
                        width: "64px", height: "64px",
                        borderRadius: "50%",
                        border: `1.5px solid ${isActive ? node.color : "rgba(255,255,255,0.12)"}`,
                        background: isActive ? `radial-gradient(circle, ${node.color}20 0%, #050505 70%)` : "#050505",
                        boxShadow: isActive ? `0 0 20px ${node.color}50` : `0 0 8px rgba(0,0,0,0.8)`,
                        cursor: "pointer", padding: 0, zIndex: 10,
                        transition: "all 0.3s",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "2px",
                      }}
                    >
                      <span style={{ fontFamily: "monospace", fontSize: "8px", fontWeight: 700, color: isActive ? node.color : "rgba(243,186,47,0.6)", letterSpacing: "0.1em" }}>
                        {node.code}
                      </span>
                      <span style={{ fontSize: "7px", color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)", letterSpacing: "0.05em", maxWidth: "52px", textAlign: "center", lineHeight: 1.2 }}>
                        {node.name}
                      </span>
                      <span style={{ fontFamily: "monospace", fontSize: "7px", color: isActive ? node.color : "rgba(255,255,255,0.2)" }}>
                        {node.count}▸
                      </span>
                      {/* Outer pulse ring when active */}
                      {isActive && (
                        <div style={{
                          position: "absolute", inset: "-6px", borderRadius: "50%",
                          border: `1px solid ${node.color}60`,
                          animation: "ring-pulse 1.5s ease-out infinite",
                        }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Mobile: flat grid ── */}
          {isMobile && (
            <div>
              {/* Center — Faisal photo + LinkedIn */}
              <div
                onClick={() => window.open("https://www.linkedin.com/company/orakzaigroup/", "_blank")}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px", cursor: "pointer" }}
              >
                <div style={{ position: "relative", width: "100px", height: "100px", marginBottom: "10px" }}>
                  <div style={{ position: "absolute", inset: "-7px", borderRadius: "50%", background: `conic-gradient(${GOLD}, rgba(243,186,47,0.2), ${GOLD})`, animation: "spin 8s linear infinite" }} />
                  <div style={{ position: "absolute", inset: "-3px", borderRadius: "50%", background: "#000" }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${GOLD}`, overflow: "hidden", boxShadow: `0 0 24px rgba(243,186,47,0.4)` }}>
                    <img src="/og-logo.jpg" alt="Faisal Orakzai" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                      onError={(e) => { (e.target as HTMLImageElement).src = "/logos/orakzai-group.jpg"; }} />
                  </div>
                </div>
                
                <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.2em", textAlign: "center" }}>ORAKZAI GROUP</div>
              </div>

              {/* Live Cores — horizontal scroll row */}
              <div style={{ marginBottom: "32px" }}>
                <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.35em", marginBottom: "12px" }}>// LIVE CORES</div>
                <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
                  {LIVE_CORES.map((core) => (
                    <div key={core.id}
                      onClick={() => core.url ? window.open(core.url, "_blank") : setActiveCore(activeCore === core.id ? null : core.id)}
                      style={{
                        flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                        cursor: "pointer", minWidth: "72px",
                      }}>
                      <div style={{
                        width: "64px", height: "64px", borderRadius: "50%",
                        border: `2px solid ${core.statusColor}`,
                        boxShadow: `0 0 16px ${core.statusColor}40`,
                        overflow: "hidden", background: "#000",
                      }}>
                        <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      </div>
                      <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: "72px" }}>{core.name}</div>
                      <div style={{ fontFamily: "monospace", fontSize: "8px", color: core.statusColor, letterSpacing: "0.1em" }}>{core.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12 sectors grid */}
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.35em", marginBottom: "12px" }}>// 12 SECTORS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {NODES.map((node) => {
                  const isActive = activeNode === node.id;
                  return (
                    <button key={node.id}
                      onClick={() => setActiveNode(isActive ? null : node.id)}
                      style={{
                        all: "unset", cursor: "pointer",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                        padding: "14px 8px",
                        border: `1px solid ${isActive ? node.color : "rgba(255,255,255,0.08)"}`,
                        background: isActive ? `${node.color}0f` : "rgba(255,255,255,0.01)",
                        borderRadius: "4px",
                        transition: "all 0.3s",
                        gap: "4px", textAlign: "center",
                      }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1.5px solid ${isActive ? node.color : "rgba(255,255,255,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4px" }}>
                        <span style={{ fontFamily: "monospace", fontSize: "8px", fontWeight: 700, color: isActive ? node.color : GOLD }}>{String(node.id).padStart(2,"0")}</span>
                      </div>
                      <div style={{ fontSize: "9px", fontWeight: 600, color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}>{node.name}</div>
                      <div style={{ fontFamily: "monospace", fontSize: "8px", color: isActive ? node.color : "rgba(255,255,255,0.2)" }}>{node.count} nodes</div>
                    </button>
                  );
                })}
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
            style={{ padding: "0 0 0" }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 0" }}>
              {(() => {
                const core = LIVE_CORES.find(c => c.id === activeCore)!;
                return (
                  <div style={{
                    border: `1px solid ${core.statusColor}30`, borderTop: `2px solid ${core.statusColor}`,
                    padding: "24px 28px", background: `linear-gradient(135deg, ${core.statusColor}05 0%, transparent 60%)`,
                    display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
                  }}>
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

      {/* ── EXPANDED PANEL: Sector sub-projects ── */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.section
            key={activeNode}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", marginTop: "16px" }}
          >
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 60px" }}>
              {(() => {
                const node = NODES.find(n => n.id === activeNode)!;
                const startIdx = NODE_START[node.id];
                return (
                  <div style={{
                    border: `1px solid ${node.color}25`,
                    borderTop: `2px solid ${node.color}`,
                    background: `linear-gradient(180deg, ${node.color}06 0%, transparent 30%)`,
                    padding: "28px",
                  }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: node.color, letterSpacing: "0.35em", marginBottom: "6px" }}>
                          SECTOR {String(node.id).padStart(2,"0")} · PROJECTS {node.range}
                        </div>
                        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
                          {node.full}
                        </h2>
                        <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", marginTop: "6px" }}>{node.sector}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "28px", fontWeight: 800, color: node.color }}>{node.count}</div>
                          <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>PROJECTS</div>
                        </div>
                        <button onClick={() => setActiveNode(null)}
                          style={{ all: "unset", cursor: "pointer", padding: "8px 16px", border: `1px solid rgba(255,255,255,0.1)`, fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>
                          ✕ CLOSE
                        </button>
                      </div>
                    </div>

                    {/* Project chips */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "6px" }}>
                      {node.projects.map((proj, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.015 }}
                          style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "10px 14px",
                            border: "1px solid rgba(255,255,255,0.06)",
                            background: "rgba(255,255,255,0.02)",
                          }}
                        >
                          <span style={{ fontFamily: "monospace", fontSize: "9px", fontWeight: 700, color: node.color, opacity: 0.7, flexShrink: 0, minWidth: "26px" }}>
                            {String(startIdx + i).padStart(3, "0")}
                          </span>
                          <span style={{ width: "1px", height: "12px", background: `${node.color}30`, flexShrink: 0 }} />
                          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{proj}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── LIVE CORES STRIP (always visible below orbital) ── */}
        {!activeNode && !activeCore && (
          <section style={{ padding: "40px 0 80px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em", marginBottom: "20px" }}>// CLICK A LIVE CORE TO VIEW · CLICK AN OUTER NODE TO EXPLORE SECTOR</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: GOLD_DIM }}>
                {LIVE_CORES.map((core) => (
                  <div key={core.id} style={{ background: "#000", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start", cursor: core.url ? "pointer" : "default" }}
                    onClick={() => core.url && window.open(core.url, "_blank")}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `1.5px solid ${core.statusColor}50`, overflow: "hidden", flexShrink: 0, background: "#050505" }}>
                      <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: "8px", color: core.statusColor, letterSpacing: "0.2em", marginBottom: "4px" }}>
                        ● {core.status} · {core.tag}
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{core.name}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{core.desc.substring(0, 80)}…</div>
                      {core.url && <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, marginTop: "8px" }}>{core.url.replace("https://", "")} ↗</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

              <style>{`
        @keyframes dp { 0%,100%{opacity:1;box-shadow:0 0 6px #F3BA2F} 50%{opacity:0.4;box-shadow:0 0 16px #F3BA2F} }
        @keyframes ring-pulse { 0%{opacity:0.8;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(-50%,-50%) scale(1.5)} }
        @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      `}</style>
    </div>
    </>
  );
}
