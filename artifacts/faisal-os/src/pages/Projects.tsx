import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import SEOHead from "@/components/shared/SEOHead";

// ─── CSS Keyframes ────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes spinSlow  { from { transform: rotate(0deg) }   to { transform: rotate(360deg) } }
  @keyframes spinCCW   { from { transform: rotate(0deg) }   to { transform: rotate(-360deg) } }
  @keyframes pulseGem  { 0%,100% { opacity: 0.25; } 50% { opacity: 0.75; } }
  @keyframes flowDash  { from { stroke-dashoffset: 28; } to { stroke-dashoffset: 0; } }
  @keyframes flowDashR { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 28; } }
  @keyframes nodePulse { 0%,100% { r: 2; opacity: 0.7; } 50% { r: 3.5; opacity: 1; } }
  @keyframes facetGlow { 0%,100% { opacity: 0.15; } 50% { opacity: 0.55; } }
  @keyframes goldShim  { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes scanLine  {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(200%); opacity: 0; }
  }
`;

// ─── SVG: Rotating Wireframe Mountain (Card 01) ───────────────────────────────
function WireframeMountain() {
  return (
    <svg viewBox="0 0 100 100" width="88" height="88" style={{ overflow: "visible" }} aria-hidden>
      {/* Outer ring — slow CCW */}
      <g style={{ transformOrigin: "50px 50px", animation: "spinCCW 18s linear infinite" }}>
        <polygon points="50,8 92,72 8,72"
          fill="none" stroke="rgba(243,186,47,0.18)" strokeWidth="0.8" />
        <line x1="50" y1="8"  x2="8"  y2="72" stroke="rgba(243,186,47,0.08)" strokeWidth="0.5" />
        <line x1="50" y1="8"  x2="92" y2="72" stroke="rgba(243,186,47,0.08)" strokeWidth="0.5" />
        <line x1="8"  y1="72" x2="92" y2="72" stroke="rgba(243,186,47,0.08)" strokeWidth="0.5" />
      </g>
      {/* Middle diamond — CW */}
      <g style={{ transformOrigin: "50px 50px", animation: "spinSlow 12s linear infinite" }}>
        <polygon points="50,22 72,50 50,78 28,50"
          fill="none" stroke="rgba(243,186,47,0.45)" strokeWidth="0.9" />
        <line x1="50" y1="22" x2="50" y2="78" stroke="rgba(243,186,47,0.15)" strokeWidth="0.5" strokeDasharray="2 3" />
        <line x1="28" y1="50" x2="72" y2="50" stroke="rgba(243,186,47,0.15)" strokeWidth="0.5" strokeDasharray="2 3" />
      </g>
      {/* Inner dot */}
      <circle cx="50" cy="50" r="2.5" fill="none" stroke="#F3BA2F" strokeWidth="1"
        style={{ animation: "goldShim 2.5s ease-in-out infinite" }} />
      <circle cx="50" cy="50" r="1" fill="#F3BA2F"
        style={{ animation: "goldShim 2.5s ease-in-out infinite 0.4s" }} />
      {/* Corner tick marks */}
      {[[50,8],[92,72],[8,72]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="#F3BA2F"
          style={{ animation: `goldShim 3s ease-in-out infinite ${i*0.6}s` }} />
      ))}
    </svg>
  );
}

// ─── SVG: Sapphire Gem Facets (Card 02) ──────────────────────────────────────
function SapphireFacets() {
  const facets = [
    // top facets
    { points: "50,5 70,30 50,30", delay: "0s" },
    { points: "50,5 30,30 50,30", delay: "0.4s" },
    // mid facets
    { points: "70,30 85,60 65,60 50,30", delay: "0.8s" },
    { points: "50,30 65,60 50,65 35,60", delay: "1.2s" },
    { points: "30,30 50,30 35,60 15,60", delay: "0.6s" },
    // bottom facets
    { points: "65,60 85,60 50,95", delay: "1s" },
    { points: "35,60 65,60 50,95", delay: "0.2s" },
    { points: "15,60 35,60 50,95", delay: "1.4s" },
  ];
  return (
    <svg viewBox="0 0 100 100" width="72" height="82" aria-hidden>
      {/* Fill facets with subtle gold tint and staggered pulse */}
      {facets.map((f, i) => (
        <polygon key={i} points={f.points}
          fill="rgba(243,186,47,0.04)"
          stroke="rgba(243,186,47,0.35)" strokeWidth="0.7"
          style={{ animation: `facetGlow 3s ease-in-out infinite ${f.delay}` }} />
      ))}
      {/* Outer gem silhouette */}
      <polygon points="50,5 85,60 50,95 15,60"
        fill="none" stroke="rgba(243,186,47,0.6)" strokeWidth="1"
        style={{ animation: "goldShim 4s ease-in-out infinite" }} />
      {/* Center shine dot */}
      <circle cx="50" cy="50" r="2" fill="#F3BA2F"
        style={{ animation: "pulseGem 2s ease-in-out infinite" }} />
      {/* Vertex nodes */}
      {[[50,5],[85,60],[50,95],[15,60]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#F3BA2F" opacity="0.5"
          style={{ animation: `goldShim 3.5s ease-in-out infinite ${i*0.35}s` }} />
      ))}
    </svg>
  );
}

// ─── SVG: Data Flow Matrix (Card 03) ─────────────────────────────────────────
function DataFlow() {
  const rows = [
    { y: 18,  anim: "flowDash",  dur: "2.2s",  op: 0.65 },
    { y: 32,  anim: "flowDashR", dur: "3.1s",  op: 0.35 },
    { y: 46,  anim: "flowDash",  dur: "2.7s",  op: 0.55 },
    { y: 60,  anim: "flowDashR", dur: "3.8s",  op: 0.28 },
    { y: 74,  anim: "flowDash",  dur: "2.4s",  op: 0.5  },
  ];
  const nodes = [
    { cx: 18, cy: 18, dur: "2s",  delay: "0s" },
    { cx: 75, cy: 32, dur: "2.8s",delay: "0.5s" },
    { cx: 42, cy: 46, dur: "2.2s",delay: "0.8s" },
    { cx: 88, cy: 60, dur: "3s",  delay: "0.3s" },
    { cx: 30, cy: 74, dur: "2.5s",delay: "1s" },
  ];
  return (
    <svg viewBox="0 0 100 90" width="90" height="80" aria-hidden>
      {/* Flow lines */}
      {rows.map((r, i) => (
        <line key={i} x1="0" y1={r.y} x2="100" y2={r.y}
          stroke="#F3BA2F" strokeWidth={i % 2 === 0 ? "0.8" : "0.5"}
          strokeDasharray="7 4" opacity={r.op}
          style={{ animation: `${r.anim} ${r.dur} linear infinite` }} />
      ))}
      {/* Vertical connectors */}
      {[22, 50, 75].map((x, i) => (
        <line key={i} x1={x} y1="10" x2={x} y2="82"
          stroke="rgba(243,186,47,0.18)" strokeWidth="0.5"
          strokeDasharray="3 6"
          style={{ animation: `flowDash ${2.5 + i * 0.7}s linear infinite` }} />
      ))}
      {/* Animated nodes */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r="2.5" fill="#F3BA2F"
          style={{ animation: `nodePulse ${n.dur} ease-in-out infinite ${n.delay}` }} />
      ))}
      {/* Scan line */}
      <rect x="0" y="0" width="100" height="2" fill="url(#scanGrad)"
        style={{ animation: "scanLine 4s ease-in-out infinite" }} />
      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(243,186,47,0.6)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Page Frame (fixed corner crosshairs) ────────────────────────────────────
function PageFrame() {
  const corners = [
    { top: "16px",    left: "12px"  },
    { top: "16px",    right: "12px" },
    { bottom: "16px", left: "12px"  },
    { bottom: "16px", right: "12px" },
  ];
  return (
    <>
      {/* Side rails */}
      <div style={{ position: "fixed", top: 0, left: "6px", width: "1px", height: "100vh",
        background: "linear-gradient(to bottom, transparent 5%, rgba(243,186,47,0.07) 30%, rgba(243,186,47,0.07) 70%, transparent 95%)",
        pointerEvents: "none", zIndex: 5 }} />
      <div style={{ position: "fixed", top: 0, right: "6px", width: "1px", height: "100vh",
        background: "linear-gradient(to bottom, transparent 5%, rgba(243,186,47,0.07) 30%, rgba(243,186,47,0.07) 70%, transparent 95%)",
        pointerEvents: "none", zIndex: 5 }} />
      {/* Corner crosshairs */}
      {corners.map((pos, i) => (
        <div key={i} style={{ position: "fixed", ...pos, width: "18px", height: "18px", pointerEvents: "none", zIndex: 5 }}>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(243,186,47,0.45)", transform: "translateY(-50%)" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "rgba(243,186,47,0.45)", transform: "translateX(-50%)" }} />
        </div>
      ))}
    </>
  );
}

// ─── Verification Widget ──────────────────────────────────────────────────────
function VerificationWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="my-10"
    >
      <div
        className="grid grid-cols-2 gap-4 px-4 py-4 border border-[#F3BA2F]/12"
        style={{ background: "rgba(243,186,47,0.018)" }}
      >
        {/* Left metrics */}
        <div className="space-y-2.5">
          {[
            { label: "IDENTITY",  val: "FOUNDER · CHAIRMAN" },
            { label: "STATUS",    val: "LINKEDIN PREMIUM" },
          ].map(m => (
            <div key={m.label}>
              <div className="font-mono text-[7px] tracking-[0.42em] text-[#F3BA2F]/40 mb-0.5">{m.label}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] text-white/65 uppercase">{m.val}</div>
            </div>
          ))}
        </div>
        {/* Right metrics */}
        <div className="space-y-2.5 text-right">
          {[
            { label: "LOCATION", val: "KARACHI, PK" },
            { label: "MATRIX",   val: "INDEPENDENT" },
          ].map(m => (
            <div key={m.label}>
              <div className="font-mono text-[7px] tracking-[0.42em] text-[#F3BA2F]/40 mb-0.5">{m.label}</div>
              <div className="font-mono text-[9px] tracking-[0.15em] text-white/65 uppercase">{m.val}</div>
            </div>
          ))}
        </div>
        {/* Live indicator */}
        <div className="col-span-2 flex items-center gap-2 pt-2 border-t border-[#F3BA2F]/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
          <span className="font-mono text-[7px] tracking-[0.38em] text-[#F3BA2F]/45 uppercase">Operational · Global Cores Active</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Individual Benchmark Card ────────────────────────────────────────────────
const SVGS = [WireframeMountain, SapphireFacets, DataFlow];

function BenchmarkCard({ bm, i }: { bm: typeof BENCHMARKS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const Visual = SVGS[i];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-px w-full bg-[#F3BA2F]/12" />

      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setTimeout(() => setHovered(false), 800)}
        animate={hovered ? { boxShadow: "0 0 40px rgba(243,186,47,0.1), inset 0 0 60px rgba(243,186,47,0.025)" } : { boxShadow: "none" }}
        transition={{ duration: 0.35 }}
        className="py-11 md:py-16"
      >
        {/* ─ Grid: [left anchor | right content] ─ */}
        <div className="grid grid-cols-[96px_1fr] md:grid-cols-[160px_1fr] gap-6 md:gap-14 items-start">

          {/* LEFT — number + SVG visual */}
          <div className="flex flex-col items-start gap-5">
            {/* Number with glow on hover */}
            <motion.span
              animate={hovered ? {
                textShadow: "0 0 20px rgba(243,186,47,0.7), 0 0 50px rgba(243,186,47,0.35)"
              } : {
                textShadow: "0 0 30px rgba(243,186,47,0.2)"
              }}
              transition={{ duration: 0.3 }}
              className="font-black text-[#F3BA2F] leading-none select-none"
              style={{
                fontSize: "clamp(2.6rem, 9vw, 4.2rem)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {bm.index}
            </motion.span>

            {/* SVG Visual anchor */}
            <motion.div
              animate={hovered ? { opacity: 1, scale: 1.05 } : { opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ minHeight: "80px" }}
            >
              <Visual />
            </motion.div>

            {/* Category label — vertical on desktop */}
            <div className="mt-1">
              <div className="font-mono text-[7px] tracking-[0.38em] text-[#F3BA2F]/40 uppercase leading-relaxed break-words max-w-[90px]">
                {bm.category}
              </div>
            </div>
          </div>

          {/* RIGHT — title + description + pillars */}
          <div className="space-y-7">
            <div>
              <motion.h2
                animate={hovered ? { color: "#FFFFFF" } : { color: "rgba(255,255,255,0.88)" }}
                transition={{ duration: 0.3 }}
                className="font-black uppercase leading-tight"
                style={{ fontSize: "clamp(1.15rem, 4.5vw, 1.7rem)", letterSpacing: "-0.01em" }}
              >
                {bm.title}
              </motion.h2>
              {/* Gold underline glow */}
              <motion.div
                animate={hovered ? { width: "80px", boxShadow: "0 0 14px rgba(243,186,47,0.8)" } : { width: "40px", boxShadow: "0 0 6px rgba(243,186,47,0.4)" }}
                transition={{ duration: 0.4 }}
                className="mt-2.5 h-[2px] bg-[#F3BA2F]"
              />
            </div>

            <p className="text-white/42 leading-[1.78] font-light"
              style={{ fontSize: "clamp(0.85rem, 2.3vw, 0.95rem)", letterSpacing: "0.012em" }}>
              {bm.description}
            </p>

            <div className="space-y-5">
              {bm.pillars.map((p, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.22 + j * 0.12 + 0.35 }}
                  style={{
                    borderLeft: `2px solid ${hovered ? "rgba(243,186,47,0.5)" : "rgba(243,186,47,0.16)"}`,
                    paddingLeft: "18px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    transition: "border-color 0.35s",
                  }}
                >
                  <div className="font-mono text-[#F3BA2F]/52 mb-1.5 uppercase"
                    style={{ fontSize: "7.5px", letterSpacing: "0.36em" }}>
                    {p.label}
                  </div>
                  <p className="text-white/28 leading-relaxed font-light"
                    style={{ fontSize: "clamp(0.78rem, 2vw, 0.85rem)", letterSpacing: "0.012em" }}>
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const BENCHMARKS = [
  {
    index: "01",
    category: "THE MINDSET BENCHMARK",
    title: "COGNITIVE RESILIENCE",
    description:
      "Built from the rugged mountain terrains to the metropolitan grid. A personal standard that shifts survival parameters into extreme strategic independence, driving the capacity to navigate high-isolation and high-risk environments alone since the age of 12.",
    pillars: [
      { label: "THE SURVIVAL PARAMETER", body: "A 4-year-old forged in extreme mountain passes — raw cognitive resilience born not from comfort, but from terrain that tolerated no weakness." },
      { label: "THE INDEPENDENCE RULE", body: "Relocated alone to Karachi at age 12. Zero institutional support. Market dynamics mastered through structural self-study and unassisted discipline." },
    ],
  },
  {
    index: "02",
    category: "THE AESTHETIC BENCHMARK",
    title: "ELITE VISUAL HERITAGE",
    description:
      "A commitment to museum-grade curation. From the selection of raw sapphire structures to custom-tailored sovereign garments and luxury custom shawls. Defining personal style through sharp, institutional-tier minimal symmetry.",
    pillars: [
      { label: "MUSEUM-GRADE VISUALS", body: "A personal collection of high-end precious metals and raw sapphire jewelry — each piece selected for structural purity and aesthetic integrity, not trend." },
      { label: "SOVEREIGN ATTIRE", body: "Bespoke traditional garments and custom-named black shawls that establish a visual identity deliberately distinct from convention." },
    ],
  },
  {
    index: "03",
    category: "THE CREATOR BENCHMARK",
    title: "TECHNICAL SOVEREIGNTY",
    description:
      "The philosophy of absolute systems design. Operating on the belief that human latency should be engineered out of infrastructure. Building individual frameworks based on flawless transparency, structural integrity, and unbreachable security.",
    pillars: [
      { label: "ZERO HUMAN LATENCY", body: "Digital systems architected to operate autonomously — no queues, no delegation bottlenecks. Infrastructure that functions at machine speed, not human pace." },
      { label: "ABSOLUTE LINEAGE CONTROL", body: "A personal stand against fraud and opacity. Every transaction, relationship, and system must be transparent, verifiable, and structurally sound." },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Benchmarks() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <SEOHead
        title="Benchmarks — Personal Architecture"
        description="Three personal benchmarks and sovereign principles of Muhammad Faisal Orakzai — Founder & Chairman of Orakzai Group. Personal. Sovereign. Non-negotiable."
        path="/benchmarks"
        keywords="Faisal Orakzai benchmarks, personal standards, Orakzai Group founder, blockchain entrepreneur Pakistan"
      />
      {/* Inject CSS keyframes */}
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Fixed viewport frame + corner crosshairs */}
      <PageFrame />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(243,186,47,0.04) 0%, transparent 70%)"
      }} />

      {/* ── HERO ── */}
      <section className="pt-28 pb-4 relative z-10">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="h-px w-7 bg-[#F3BA2F]" />
              <span className="font-mono text-[8px] tracking-[0.48em] text-[#F3BA2F] uppercase">Personal Standard</span>
              <div className="h-px flex-1 bg-[#F3BA2F]/10" />
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } }}
              className="font-black uppercase leading-none"
              style={{ fontSize: "clamp(3rem, 13vw, 7rem)", letterSpacing: "-0.025em" }}
            >
              BENCH
              <span style={{
                background: "linear-gradient(135deg, #F3BA2F 0%, #ffe47a 50%, #c8900a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>MARKS</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, delay: 0.15 } } }}
              className="font-mono text-white/22 text-[10px] md:text-[11px] tracking-[0.3em] uppercase mt-5 leading-relaxed max-w-xs"
            >
              Three pillars. Zero compromise.<br />A personal architecture built to last.
            </motion.p>
          </motion.div>

          {/* ── VERIFICATION WIDGET ── */}
          <VerificationWidget />
        </div>
      </section>

      {/* ── BENCHMARK CARDS ── */}
      <section className="pb-24 relative z-10">
        <div className="max-w-4xl mx-auto px-5">
          {BENCHMARKS.map((bm, i) => (
            <BenchmarkCard key={bm.index} bm={bm} i={i} />
          ))}
          <div className="h-px w-full bg-[#F3BA2F]/12" />
        </div>
      </section>

      {/* ── CODA ── */}
      <section className="pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-7 border-t border-white/5"
          >
            <p className="font-mono text-white/10 text-[9px] tracking-[0.28em] uppercase">
              PERSONAL · SOVEREIGN · NON-NEGOTIABLE
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#F3BA2F] animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.32em] text-[#F3BA2F]/40">FAISAL ORAKZAI — 2006–∞</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
