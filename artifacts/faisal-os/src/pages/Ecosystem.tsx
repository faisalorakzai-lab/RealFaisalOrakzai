import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ============================================================
   SOVEREIGN ECOSYSTEM LEDGER
   Orakzai Group · 12 Mother Companies · 250 Infrastructure Projects
   Theme: #000 · #FFF · #F3BA2F Gold
   ============================================================ */

const GOLD = "#F3BA2F";
const GOLD_DIM = "rgba(243,186,47,0.12)";
const GOLD_MID = "rgba(243,186,47,0.35)";

/* ── Live Core Projects ─────────────────────────────────────── */
const LIVE_CORES = [
  {
    id: "okbond",
    name: "Orakzai Bond",
    ticker: "OKBOND",
    tag: "LAYER-2 · POLYGON",
    desc: "Decentralized Treasury Protocol. 10M max supply, cycle-based activation logic, treasury-backed capital protection.",
    url: "https://orakzaibond.com",
    metric: "10M MAX SUPPLY",
    chain: "POLYGON L2",
    status: "LIVE",
    color: "#F3BA2F",
  },
  {
    id: "shamim",
    name: "Shamim Forever",
    ticker: "SHF",
    tag: "LUXURY · WEB3",
    desc: "Elite luxury heritage brand — museum-grade perfumes, sapphire jewelry, cosmetics — secured via cryptographic provenance.",
    url: "https://www.shamimforever.com",
    metric: "PROVENANCE TOKENS",
    chain: "WEB3 NATIVE",
    status: "LIVE",
    color: "#c9a84c",
  },
  {
    id: "okzbyte",
    name: "OkzByte Development",
    ticker: "OKZDEV",
    tag: "ENGINEERING · AI",
    desc: "High-throughput technical stack & engineering engine powering the entire Orakzai infrastructure and automation layer.",
    url: null,
    metric: "FULL-STACK ENGINE",
    chain: "MULTI-CHAIN",
    status: "ACTIVE",
    color: "#e8d48a",
  },
  {
    id: "qorix",
    name: "QORIX",
    ticker: "QRX",
    tag: "AI · FINANCE",
    desc: "Autonomous Financial Management AI System — algorithmic treasury operations, yield optimization, and risk-adjusted capital allocation.",
    url: null,
    metric: "AI AUTONOMOUS",
    chain: "CROSS-CHAIN",
    status: "DEPLOYED",
    color: "#BF953F",
  },
];

/* ── 12 Mother Company Nodes ─────────────────────────────────── */
const NODES = [
  {
    id: 1,
    name: "Orakzai Technologies",
    code: "OT",
    count: 25,
    range: "01–25",
    sector: "TECH · AI · CLOUD",
    projects: ["AI Reboard","Cloud","Cybersecurity","SaaS Hub","Web Services","App Lab","Tech Support","Automation","IoT","Digital Marketing","Robotics","AR/VR","Quantum Labs","Drone Tech","Gaming Studio","Data Analytics","Semiconductor","Space Tech","Cloud AI","Global IT","Smart Home","EdTech","HR Tech","Supply Chain Tech","Green Tech"],
  },
  {
    id: 2,
    name: "Orakzai Finance & Capital",
    code: "OFC",
    count: 20,
    range: "26–45",
    sector: "BANKING · FINTECH",
    projects: ["Bank","Pay","Insurance","Investments","Forex Hub","Microfinance","Gold Exchange","Venture Capital","Crowdfunding","Remittance","Wealth Management","Credit Bureau","Leasing","Pension Fund","Green Finance","Private Equity","Hedge Fund","Exchange","Charity Fund","IPO Hub"],
  },
  {
    id: 3,
    name: "Orakzai Real Estate & Infrastructure",
    code: "OREI",
    count: 20,
    range: "46–65",
    sector: "REAL ESTATE · INFRA",
    projects: ["Builders","Properties","Interiors","Smart Cities","Resorts","Shopping Malls","Industrial Parks","Affordable Housing","Farmhouses","Skyscrapers","Office Towers","Gated Communities","Hotels & Apartments","Bridges & Roads","Ports & Logistics","Aviation City","Eco Housing","Real Estate Funds","Mega Marts","Global Realtors"],
  },
  {
    id: 4,
    name: "Orakzai Food & Beverages",
    code: "OFB",
    count: 20,
    range: "66–85",
    sector: "FOOD · FMCG",
    projects: ["Foods","Beverages","Organic Farms","Biryani","Tea","Coffee","Frozen Foods","Dairy","Meat","Sweets & Bakers","Catering","Packaged Water","Energy Drinks","Ice Cream","Organic Spices","Restaurant Tech","Food Trucks","Super Foods","Health Foods","Food Delivery"],
  },
  {
    id: 5,
    name: "Orakzai Media & Entertainment",
    code: "OME",
    count: 20,
    range: "86–105",
    sector: "MEDIA · OTT",
    projects: ["News","Film Studios","Music Studio","Sports Media","Ads","Events","Talent Agency","Magazine","Kids TV","Animation Studio","Radio","Podcasts","YouTube Network","Esports","Celebrity Management","Theater","Fashion Shows","Billboard Media","OTT","Documentary Hub"],
  },
  {
    id: 6,
    name: "Orakzai Lifestyle & Fashion",
    code: "OLF",
    count: 20,
    range: "106–125",
    sector: "LUXURY · LIFESTYLE",
    projects: ["Fashion","Footwear","Jewelry","Perfumes","Watches","Cosmetics","Wellness","Fitness","Leather","Home Decor","Eyewear","Travel Gear","Party Wear","Grooming","Bridal Studio","Kids Wear","Handicrafts","Luxury Store","Sportswear","Uniforms"],
  },
  {
    id: 7,
    name: "Orakzai Travel & Hospitality",
    code: "OTH",
    count: 20,
    range: "126–145",
    sector: "TRAVEL · LOGISTICS",
    projects: ["Hotels","Airlines","Air Cargo","Tours","Ride","Shipping","Bus Service","Metro","Resorts","Car Rentals","Cruise Line","Delivery","Express Couriers","Helicopters","Pilots Academy","Ticketing","Hajj & Umrah","Bike Sharing","Taxi","Transport Tech"],
  },
  {
    id: 8,
    name: "Orakzai Energy & Industry",
    code: "OEI",
    count: 20,
    range: "146–165",
    sector: "ENERGY · INDUSTRIAL",
    projects: ["Power","Solar","Wind","Hydro","Nuclear","Oil & Gas","Coal","Smart Grid","Industrial Supplies","Steel","Cement","Chemicals","Plastics","Recycling","Batteries","EV Motors","Aviation Industry","Defense Tech","Heavy Machinery","Mining"],
  },
  {
    id: 9,
    name: "Orakzai Education & Health",
    code: "OEH",
    count: 20,
    range: "166–185",
    sector: "EDTECH · MEDTECH",
    projects: ["University","Schools","Academy","Skills Hub","Medical College","Hospitals","Clinics","Pharma","Labs","HealthTech","Biotech","Nursing School","Dental Care","Eye Hospitals","Health Insurance","Mental Health Centers","Fitness Academy","Education Publishing","Scholarships Foundation","Research Institute"],
  },
  {
    id: 10,
    name: "Orakzai Base",
    code: "OB",
    count: 31,
    range: "186–216",
    sector: "BLOCKCHAIN · DEFI · WEB3",
    projects: ["PSC Exchange","PSC Wallet","Orakzai Token","DeFi Hub","NFT Market","Launchpad","Orakzai Chain","Orakzai Scan","Crypto Mining","Validator Network","DEX","Stablecoin","Metaverse","Gaming Token","Payment Gateway","Cross-Chain Bridge","DAO","Smart Contracts","Oracles","Web3 ID","Security Audit","Cold Wallet","Hot Wallet","Investment Fund","Charity Chain","Remittance Chain","Lending Protocol","Derivatives Exchange","Yield Farming","SocialFi","Orakzai Bonds"],
  },
  {
    id: 11,
    name: "Orakzai Mills",
    code: "OM",
    count: 15,
    range: "216–230",
    sector: "AGRO · PROCESSING",
    projects: ["Sugar","Rice","Flour","Oil Mills","Cotton Ginning","Corn Processing","Pulses","Salt Refinery","Paper","Packaging","Agro Mills","Mineral Water Plant","Edible Oils","Industrial Mills","Beverage Plant"],
  },
  {
    id: 12,
    name: "Orakzai Textile",
    code: "OTX",
    count: 20,
    range: "231–250",
    sector: "TEXTILE · EXPORTS",
    projects: ["Spinning","Weaving","Garments","Home Textiles","Denim Factory","Knitwear","Sportswear Exports","Fashion Tech","Leather Garments","Fabric Exports","School Uniforms","Workwear","Carpets","Silk Factory","Textile Machinery","Accessories","Dyeing & Finishing","Textile Chemicals","Ready-Made Garments","Global Textiles"],
  },
];

/* Compute project start index for each node */
const nodeStartIndex: Record<number, number> = { 1:1,2:26,3:46,4:66,5:86,6:106,7:126,8:146,9:166,10:186,11:216,12:231 };

/* ── Sub-components ─────────────────────────────────────────── */
function LiveBadge({ status }: { status: string }) {
  const color = status === "LIVE" ? "#00ff88" : status === "ACTIVE" ? GOLD : "#60a5fa";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "5px",
      padding: "3px 9px", border: `1px solid ${color}30`,
      fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.2em",
      color, background: `${color}0a`,
    }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, animation: "dot-pulse 2s infinite", display: "inline-block" }} />
      {status}
    </span>
  );
}

function CoreCard({ core, index }: { core: typeof LIVE_CORES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01, y: -2 }}
      style={{
        position: "relative", overflow: "hidden",
        border: `1px solid ${GOLD_DIM}`,
        background: "linear-gradient(135deg, rgba(243,186,47,0.04) 0%, rgba(0,0,0,0) 60%), #000",
        padding: "28px",
        cursor: core.url ? "pointer" : "default",
        transition: "border-color 0.3s",
      }}
      onClick={() => core.url && window.open(core.url, "_blank")}
    >
      {/* Top gold line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${core.color}, transparent)`, opacity: 0.6 }} />
      {/* Glow orb */}
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "160px", height: "160px", borderRadius: "50%", background: `radial-gradient(circle, ${core.color}10 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: `${core.color}80`, letterSpacing: "0.3em", marginBottom: "8px" }}>{core.tag}</div>
          <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "4px" }}>{core.name}</h3>
          <div style={{ fontFamily: "monospace", fontSize: "11px", color: core.color, letterSpacing: "0.2em" }}>{core.ticker}</div>
        </div>
        <LiveBadge status={core.status} />
      </div>

      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "20px" }}>{core.desc}</p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: "3px" }}>CHAIN</div>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: core.color }}>{core.chain}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: "3px" }}>METRIC</div>
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>{core.metric}</div>
        </div>
        {core.url && (
          <div style={{ fontFamily: "monospace", fontSize: "10px", color: core.color, opacity: 0.7 }}>↗</div>
        )}
      </div>
    </motion.div>
  );
}

function NodeHub({
  node,
  isActive,
  onClick,
  index,
}: {
  node: typeof NODES[0];
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        all: "unset",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", cursor: "pointer",
        padding: "20px 12px",
        border: `1px solid ${isActive ? GOLD_MID : GOLD_DIM}`,
        background: isActive
          ? "linear-gradient(135deg, rgba(243,186,47,0.08) 0%, rgba(243,186,47,0.02) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, transparent 100%)",
        transition: "all 0.3s",
        boxShadow: isActive ? `0 0 24px rgba(243,186,47,0.12)` : "none",
        textAlign: "center",
      }}
    >
      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: isActive ? `linear-gradient(90deg, transparent, ${GOLD}, transparent)` : "transparent",
        transition: "all 0.3s",
      }} />

      {/* Node number circle */}
      <div style={{
        width: "52px", height: "52px", borderRadius: "50%",
        border: `1.5px solid ${isActive ? GOLD : GOLD_DIM}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "12px",
        background: isActive ? `radial-gradient(circle, rgba(243,186,47,0.15) 0%, transparent 70%)` : "transparent",
        boxShadow: isActive ? `0 0 16px rgba(243,186,47,0.25)` : "none",
        transition: "all 0.3s",
        position: "relative",
      }}>
        <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, color: isActive ? GOLD : "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
          {String(node.id).padStart(2, "0")}
        </span>
        {isActive && (
          <div style={{
            position: "absolute", inset: "-4px", borderRadius: "50%",
            border: `1px solid rgba(243,186,47,0.2)`,
            animation: "ring-pulse 2s ease-out infinite",
          }} />
        )}
      </div>

      {/* Code */}
      <div style={{ fontFamily: "monospace", fontSize: "9px", color: isActive ? GOLD : "rgba(243,186,47,0.4)", letterSpacing: "0.3em", marginBottom: "6px" }}>
        {node.code}
      </div>

      {/* Name */}
      <div style={{ fontSize: "11px", fontWeight: 600, color: isActive ? "#fff" : "rgba(255,255,255,0.5)", lineHeight: 1.3, marginBottom: "8px", maxWidth: "110px" }}>
        {node.name.replace("Orakzai ", "")}
      </div>

      {/* Count badge */}
      <div style={{
        padding: "2px 8px",
        background: isActive ? `rgba(243,186,47,0.15)` : "rgba(255,255,255,0.04)",
        border: `1px solid ${isActive ? GOLD_DIM : "rgba(255,255,255,0.06)"}`,
        fontFamily: "monospace", fontSize: "9px",
        color: isActive ? GOLD : "rgba(255,255,255,0.25)",
        letterSpacing: "0.15em",
        transition: "all 0.3s",
      }}>
        {node.count} NODES
      </div>

      {/* Expand indicator */}
      <div style={{
        position: "absolute", bottom: "8px", right: "10px",
        fontFamily: "monospace", fontSize: "8px",
        color: isActive ? GOLD : "rgba(255,255,255,0.1)",
        transition: "all 0.3s",
      }}>
        {isActive ? "▲" : "▼"}
      </div>
    </motion.button>
  );
}

function SubProjectPanel({ node }: { node: typeof NODES[0] }) {
  const startIdx = nodeStartIndex[node.id];
  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div style={{
        border: `1px solid ${GOLD_DIM}`,
        borderTop: `2px solid ${GOLD}`,
        background: "linear-gradient(180deg, rgba(243,186,47,0.04) 0%, rgba(0,0,0,0) 50%)",
        padding: "28px 28px 24px",
        position: "relative",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "24px" }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.35em", marginBottom: "6px" }}>
              MOTHER NODE {String(node.id).padStart(2, "0")} · PROJECTS {node.range}
            </div>
            <h3 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
              {node.name}
            </h3>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: "22px", fontWeight: 700, color: GOLD }}>{node.count}</div>
              <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em" }}>SUB-PROJECTS</div>
            </div>
            <div style={{ width: "1px", background: GOLD_DIM }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", lineHeight: 1.5 }}>
                {node.sector}
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>SECTOR</div>
            </div>
          </div>
        </div>

        {/* Sub-projects grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "6px",
        }}>
          {node.projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.018, duration: 0.25 }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: "monospace", fontSize: "9px", fontWeight: 700,
                color: GOLD, opacity: 0.6, flexShrink: 0, minWidth: "24px",
              }}>
                {String(startIdx + i).padStart(3, "0")}
              </span>
              {/* Divider */}
              <span style={{ width: "1px", height: "12px", background: GOLD_DIM, flexShrink: 0 }} />
              {/* Name */}
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", fontWeight: 500, letterSpacing: "0.01em" }}>
                {proj}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom node connector line */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "12px", background: `linear-gradient(to bottom, ${GOLD_DIM}, transparent)` }} />
      </div>
    </motion.div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */
export default function Ecosystem() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [blockCount] = useState(250);
  const [totalCompanies] = useState(12);

  // SEO
  useEffect(() => {
    document.title = "Orakzai Ecosystem — 12 Sectors · 250 Projects · Faisal Orakzai";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "The Orakzai Sovereign Ecosystem — 12 mother companies spanning 250 infrastructure projects across technology, finance, real estate, luxury, energy, blockchain, and more. Founded by Muhammad Faisal Orakzai.");
  }, []);

  const handleNodeClick = (id: number) => {
    setActiveNode((prev) => (prev === id ? null : id));
  };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "120px", paddingBottom: "64px", position: "relative", borderBottom: `1px solid ${GOLD_DIM}`, overflow: "hidden" }}>
        {/* Atmosphere */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 70% 40%, rgba(243,186,47,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(rgba(243,186,47,1) 1px, transparent 1px), linear-gradient(90deg, rgba(243,186,47,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", border: `1px solid ${GOLD_DIM}`, marginBottom: "28px", background: "rgba(243,186,47,0.02)" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GOLD, boxShadow: `0 0 8px ${GOLD}`, animation: "dot-pulse 2s infinite", display: "inline-block" }} />
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.3em" }}>ORAKZAI SOVEREIGN ECOSYSTEM · LIVE</span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.92, marginBottom: "24px" }}>
              <span style={{ display: "block", color: "#fff" }}>SOVEREIGN</span>
              <span style={{
                display: "block",
                background: `linear-gradient(135deg, #BF953F 0%, #FCF6BA 40%, ${GOLD} 70%, #AA771C 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>ECOSYSTEM</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", maxWidth: "560px", lineHeight: 1.75, marginBottom: "40px" }}>
              An interconnected conglomerate of{" "}
              <span style={{ color: "rgba(255,255,255,0.75)" }}>12 mother companies</span> across{" "}
              <span style={{ color: GOLD }}>250 infrastructure sub-projects</span> —
              spanning blockchain, finance, real estate, luxury, energy, media, and beyond.
              Engineered by <span style={{ color: "#fff" }}>Muhammad Faisal Orakzai</span>.
            </p>

            {/* Stats bar */}
            <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
              {[
                { val: "4", label: "LIVE CORES" },
                { val: "12", label: "MOTHER CO." },
                { val: "250", label: "SUB-PROJECTS" },
                { val: "∞", label: "SCALE" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "16px 28px", border: `1px solid ${GOLD_DIM}`,
                  borderRight: i < 3 ? "none" : `1px solid ${GOLD_DIM}`,
                  background: "rgba(255,255,255,0.01)",
                }}>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: GOLD, letterSpacing: "-0.02em" }}>{s.val}</div>
                  <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.25em", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION A: LIVE CORES ── */}
      <section style={{ padding: "80px 0", borderBottom: `1px solid ${GOLD_DIM}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em", marginBottom: "8px" }}>
              SECTION A · LIVE CORE SYSTEMS
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
              4 Primary Infrastructure Cores
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: GOLD_DIM,
          }}>
            {LIVE_CORES.map((core, i) => (
              <div key={core.id} style={{ background: "#000" }}>
                <CoreCard core={core} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION B: INTERACTIVE HORIZON ── */}
      <section style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          {/* Section header */}
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em", marginBottom: "8px" }}>
              SECTION B · INTERACTIVE CORPORATE HORIZON
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
                12 Mother Companies · 250 Nodes
              </h2>
              <div style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
                {activeNode ? `NODE ${String(activeNode).padStart(2,"0")} ACTIVE — CLICK TO COLLAPSE` : "SELECT A NODE TO EXPLORE"}
              </div>
            </div>
          </div>

          {/* Node grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1px",
            background: GOLD_DIM,
            marginBottom: activeNode ? "0" : "0",
          }}>
            {NODES.map((node, i) => (
              <div key={node.id} style={{ background: "#000" }}>
                <NodeHub
                  node={node}
                  isActive={activeNode === node.id}
                  onClick={() => handleNodeClick(node.id)}
                  index={i}
                />
              </div>
            ))}
          </div>

          {/* Expanded sub-project panel */}
          <AnimatePresence mode="wait">
            {activeNode && (
              <SubProjectPanel
                key={activeNode}
                node={NODES.find((n) => n.id === activeNode)!}
              />
            )}
          </AnimatePresence>

          {/* Closed state label */}
          {!activeNode && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ textAlign: "center", padding: "32px", border: `1px solid ${GOLD_DIM}`, borderTop: "none", background: "rgba(243,186,47,0.01)" }}>
              <div style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.3em" }}>
                ↑ SELECT ANY MOTHER NODE TO REVEAL ITS {" "}
                <span style={{ color: GOLD }}>INFRASTRUCTURE PROJECTS</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CROSS-LINKS ── */}
      <section style={{ padding: "64px 0", borderTop: `1px solid ${GOLD_DIM}`, background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(243,186,47,0.02) 0%, transparent 65%)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em", marginBottom: "16px" }}>FLAGSHIP PORTALS</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "OKBOND PORTAL", url: "https://orakzaibond.com", note: "Polygon Layer-2" },
              { label: "SHAMIM FOREVER", url: "https://www.shamimforever.com", note: "Luxury Web3" },
              { label: "FAISAL ORAKZAI", url: "https://faisalorakzai.com/founder", note: "Founder Profile" },
            ].map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noreferrer"
                style={{
                  padding: "14px 28px", border: `1px solid ${GOLD_DIM}`,
                  textDecoration: "none", color: "#fff",
                  background: "rgba(243,186,47,0.02)",
                  transition: "all 0.3s",
                  display: "block",
                }}>
                <div style={{ fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", marginBottom: "4px" }}>{l.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.2em" }}>{l.note}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Global styles */}
      <style>{`
        @keyframes dot-pulse {
          0%,100%{opacity:1;box-shadow:0 0 6px #F3BA2F}
          50%{opacity:0.5;box-shadow:0 0 14px #F3BA2F}
        }
        @keyframes ring-pulse {
          0%{opacity:0.8;transform:scale(1)}
          100%{opacity:0;transform:scale(1.4)}
        }
      `}</style>
    </div>
  );
}
