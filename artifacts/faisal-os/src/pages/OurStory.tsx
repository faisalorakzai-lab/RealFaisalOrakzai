import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/shared/SEOHead";

/* ─── Fade-up variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ─── Chapter data ─── */
const CHAPTERS = [
  {
    roman: "I",
    title: "Sacred Roots & Ancestral Legacy",
    body: "For generations, the Orakzai nation has carried an unyielding legacy forged in the rugged, historical valleys of our homeland. Characterized by an indelible spirit of courage, unwavering hospitality, and a sacred code of honor (Pashtunwali), our ancestors built communities anchored in mutual protection and collective dignity. Every family was a pillar, every village a fortress of shared fate. Through centuries of geopolitical shifts and regional trials, the core values of the Orakzai identity remained untouched: loyalty to kin, defense of the vulnerable, and a profound reverence for justice.",
    accent: "Pashtunwali",
    icon: "⚔️",
  },
  {
    roman: "II",
    title: "The Global Diaspora Expansion",
    body: "As the modern era reshaped opportunities, thousands of Orakzai families embarked on a journey across borders. From the industrial hubs of Pakistan to the fast-paced markets of the Gulf, Europe, North America, and Southeast Asia, our community established roots globally. They became engineers, legal minds, entrepreneurs, laborers, academics, and civic leaders. Yet, despite geographic dispersion and economic adaptation, the pulse of our homeland never faded. Overseas families worked tirelessly, sending support back home while raising new generations in foreign lands, forever carrying the pride of their lineage.",
    accent: "12+ Nations",
    icon: "🌐",
  },
  {
    roman: "III",
    title: "The Fragmented Reality & The Call for Systemic Unity",
    body: "However, global dispersion brought unprecedented challenges. Separated by continents, our people faced fragmented communication, lack of centralized legal defense when facing exploitation abroad, limited access to higher education pathways for deserving youth, and an absence of a unified economic safety net. Individual success existed, but collective empowerment was missing. There was no single institutional shield to protect a migrant worker in distress, no global network to fund ambitious scholars, and no central registry to preserve our rich heritage for future generations. The need for a sovereign, borderless structure became undeniable.",
    accent: "Systemic Unity",
    icon: "🛡️",
  },
  {
    roman: "IV",
    title: "The Birth of Orakzai.org — A Global Digital Homeland",
    body: "In response to this generational need, Orakzai.org was founded—not merely as an organization, but as a digital homeland and global humanitarian embassy. By merging digital architecture with traditional tribal governance principles, Orakzai.org unifies the global diaspora into a single, empowered ecosystem. Today, it operates as an institutional force delivering pro-bono legal advocacy, global scholarship programs, emergency crisis relief, and economic grants. It stands as a living sanctuary where no Orakzai, and no underprivileged individual, is ever left standing alone.",
    accent: "Digital Embassy",
    icon: "🏛️",
  },
];

/* ─── Timeline nodes ─── */
const TIMELINE_NODES = [
  {
    index: 1,
    phase: "Node 1",
    title: "Ancestral Foundation",
    sub: "Heritage, Courage & Honor Code",
    year: "Ancient — 20th Century",
    desc: "The sacred roots of the Orakzai nation. A civilization built on Pashtunwali, mutual dignity, and unwavering tribal honor forged across rugged mountain valleys.",
    color: "#F3BA2F",
    glow: "rgba(243,186,47,0.35)",
  },
  {
    index: 2,
    phase: "Node 2",
    title: "Global Dispersion",
    sub: "Expanding Across 12+ Nations",
    year: "Late 20th Century",
    desc: "Thousands of Orakzai families spread across Pakistan, Gulf States, Europe, North America, and Southeast Asia — building lives while preserving their lineage.",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.35)",
  },
  {
    index: 3,
    phase: "Node 3",
    title: "The Unification Need",
    sub: "Facing Exploitation & Isolation",
    year: "2000s — 2010s",
    desc: "A fragmented diaspora facing legal exploitation abroad, blocked educational access, and no centralized shield. The collective cry for an institutional answer grew undeniable.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.35)",
  },
  {
    index: 4,
    phase: "Node 4",
    title: "Digital Embassy Era",
    sub: "Orakzai.org Active Platform",
    year: "Present Day",
    desc: "Orakzai.org is founded as a sovereign digital homeland — delivering legal advocacy, global scholarships, crisis relief, and economic grants for every Orakzai worldwide.",
    color: "#F3BA2F",
    glow: "rgba(243,186,47,0.45)",
  },
];

/* ─── Chapter Card ─── */
function ChapterCard({ chapter, index }: { chapter: typeof CHAPTERS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={index * 0.1}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative group"
    >
      {/* Gold left bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(180deg, rgba(243,186,47,0.9) 0%, rgba(243,186,47,0.2) 100%)" }}
      />

      <div
        className="ml-6 p-6 md:p-8 rounded-xl border border-emerald-900/40 backdrop-blur-sm relative overflow-hidden transition-all duration-500 group-hover:border-yellow-500/30"
        style={{
          background: "linear-gradient(135deg, rgba(4,28,18,0.92) 0%, rgba(2,20,12,0.96) 50%, rgba(1,15,9,0.98) 100%)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(243,186,47,0.06)",
        }}
      >
        {/* Background shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(243,186,47,0.04) 0%, transparent 70%)" }}
        />

        {/* Chapter header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-xl"
            style={{ background: "rgba(243,186,47,0.08)", border: "1px solid rgba(243,186,47,0.2)" }}
          >
            {chapter.icon}
          </div>
          <div>
            <div
              className="text-[10px] font-bold tracking-[0.3em] mb-1"
              style={{ color: "rgba(243,186,47,0.55)" }}
            >
              CHAPTER {chapter.roman}
            </div>
            <h3
              className="text-lg md:text-xl font-bold leading-snug"
              style={{ color: "#f0e8d0", fontFamily: "Georgia, serif" }}
            >
              {chapter.title}
            </h3>
          </div>
        </div>

        {/* Gold quote accent */}
        <div
          className="text-4xl font-serif leading-none mb-3 opacity-30 select-none"
          style={{ color: "#F3BA2F" }}
        >
          ❝
        </div>

        {/* Body */}
        <p
          className="text-sm md:text-base leading-relaxed md:leading-loose"
          style={{ color: "rgba(220,210,195,0.88)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {chapter.body}
        </p>

        {/* Accent tag */}
        <div className="mt-5 flex">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest"
            style={{ background: "rgba(243,186,47,0.08)", border: "1px solid rgba(243,186,47,0.22)", color: "#F3BA2F" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
            {chapter.accent}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Timeline Node ─── */
function TimelineNode({ node, index, active, onClick }: {
  node: typeof TIMELINE_NODES[0];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex flex-col items-center cursor-pointer group"
      onClick={onClick}
    >
      {/* Node circle */}
      <motion.div
        animate={active ? { scale: 1.15 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-400 z-10"
        style={{
          borderColor: active ? node.color : "rgba(255,255,255,0.12)",
          background: active
            ? `radial-gradient(circle, ${node.glow} 0%, rgba(0,0,0,0.9) 70%)`
            : "rgba(10,10,10,0.8)",
          boxShadow: active ? `0 0 24px ${node.glow}, 0 0 60px ${node.glow}` : "none",
        }}
      >
        <span className="text-2xl">{["⚔️", "🌐", "🛡️", "🏛️"][index]}</span>
        {active && (
          <motion.div
            className="absolute inset-[-6px] rounded-full border opacity-50 animate-ping"
            style={{ borderColor: node.color }}
            initial={false}
          />
        )}
      </motion.div>

      {/* Node label */}
      <div className="mt-3 text-center px-2">
        <div
          className="text-[9px] font-bold tracking-[0.25em] mb-1"
          style={{ color: active ? node.color : "rgba(255,255,255,0.35)" }}
        >
          {node.phase}
        </div>
        <div
          className="text-xs md:text-sm font-bold leading-tight"
          style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}
        >
          {node.title}
        </div>
        <div
          className="text-[10px] mt-0.5 leading-tight"
          style={{ color: active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}
        >
          {node.sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function OurStory() {
  const [activeNode, setActiveNode] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  /* Auto-cycle timeline */
  useEffect(() => {
    const id = setInterval(() => setActiveNode(v => (v + 1) % TIMELINE_NODES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const active = TIMELINE_NODES[activeNode];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <SEOHead
        title="Our Story — Orakzai.org | A Digital Homeland & Global Sanctuary"
        description="Born from centuries of unbroken honor and tribal resilience, Orakzai.org stands as the modern sovereign bridge connecting our ancestral heritage with global empowerment."
        path="/our-story"
        keywords="Orakzai history, Orakzai nation, Pashtunwali, digital homeland, global diaspora, Orakzai org story"
      />

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(4,50,28,0.55) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        {/* Constellation layer */}
        <div className="absolute inset-0 constellation-bg opacity-30 pointer-events-none" />

        {/* Animated emerald orbs */}
        <div
          className="absolute top-24 left-[10%] w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.3) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 right-[8%] w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, rgba(243,186,47,0.2) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Category label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-yellow-400/50" />
            <span
              className="text-[11px] md:text-xs font-bold tracking-[0.45em]"
              style={{ color: "#F3BA2F" }}
            >
              O U R &nbsp; S T O R Y
            </span>
            <div className="h-px w-10 bg-yellow-400/50" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#f5eed8" }}
          >
            A Digital Homeland{" "}
            <br className="hidden sm:block" />
            <span
              style={{
                background: "linear-gradient(135deg, #F3BA2F 0%, #ffd666 50%, #e8a820 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &amp; Global Sanctuary
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={heroInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(243,186,47,0.35)" }} />
            <p
              className="text-[11px] md:text-xs font-bold tracking-[0.3em] text-center"
              style={{ color: "rgba(243,186,47,0.75)" }}
            >
              HERITAGE &nbsp;•&nbsp; RESILIENCE &nbsp;•&nbsp; UNIFICATION
            </p>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(243,186,47,0.35)" }} />
          </motion.div>

          {/* Intro sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base md:text-lg leading-relaxed md:leading-loose max-w-2xl mx-auto"
            style={{ color: "rgba(220,210,195,0.8)" }}
          >
            Born from centuries of unbroken honor and tribal resilience, Orakzai.org stands as
            the modern sovereign bridge connecting our ancestral heritage with global empowerment.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <div className="text-[9px] tracking-[0.35em] text-white/25 font-semibold">SCROLL</div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 mx-auto"
              style={{ background: "linear-gradient(180deg, rgba(243,186,47,0.5) 0%, transparent 100%)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CHAPTERS
      ══════════════════════════════════ */}
      <section className="relative py-20 md:py-28">
        {/* Faint emerald radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(4,30,18,0.35) 0%, transparent 75%)" }}
        />

        <div className="max-w-3xl mx-auto px-6">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div
              className="text-[10px] font-bold tracking-[0.4em] mb-3"
              style={{ color: "rgba(243,186,47,0.55)" }}
            >
              THE CHRONICLES
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
            >
              Four Chapters of a Nation
            </h2>
            <div className="h-px w-20 mx-auto mt-4" style={{ background: "rgba(243,186,47,0.35)" }} />
          </motion.div>

          {/* Chapter cards */}
          <div className="space-y-8">
            {CHAPTERS.map((chapter, i) => (
              <ChapterCard key={chapter.roman} chapter={chapter} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          INTERACTIVE TIMELINE
      ══════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Dark emerald bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(4,22,13,0.5) 50%, rgba(0,0,0,0) 100%)" }}
        />

        <div className="max-w-5xl mx-auto px-6">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div
              className="text-[10px] font-bold tracking-[0.4em] mb-3"
              style={{ color: "rgba(243,186,47,0.55)" }}
            >
              CHRONOLOGICAL ARC
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
            >
              The Journey Through Time
            </h2>
            <p className="text-sm mt-3 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              Four defining phases that shaped the Orakzai nation from ancestral roots to digital sovereignty.
            </p>
          </motion.div>

          {/* Node map */}
          <div className="relative">
            {/* Connector lines */}
            <div className="absolute top-7 md:top-8 left-0 right-0 pointer-events-none px-8 md:px-16 hidden sm:block">
              <div
                className="h-px w-full"
                style={{ background: "linear-gradient(90deg, transparent 0%, rgba(243,186,47,0.2) 15%, rgba(243,186,47,0.2) 85%, transparent 100%)" }}
              />
            </div>

            {/* Nodes grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-4">
              {TIMELINE_NODES.map((node, i) => (
                <TimelineNode
                  key={node.index}
                  node={node}
                  index={i}
                  active={activeNode === i}
                  onClick={() => setActiveNode(i)}
                />
              ))}
            </div>
          </div>

          {/* Active node detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-10 rounded-2xl border p-6 md:p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(4,25,15,0.94) 0%, rgba(2,18,10,0.97) 100%)",
                borderColor: `${active.color}30`,
                boxShadow: `0 0 40px ${active.glow}, 0 4px 32px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Glow orb */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none blur-3xl opacity-20"
                style={{ background: active.glow }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-5">
                {/* Left meta */}
                <div className="md:w-48 shrink-0">
                  <div
                    className="text-[9px] font-bold tracking-[0.3em] mb-2"
                    style={{ color: active.color }}
                  >
                    {active.phase.toUpperCase()}
                  </div>
                  <h3
                    className="text-lg md:text-xl font-bold leading-tight"
                    style={{ color: "#fff", fontFamily: "Georgia, serif" }}
                  >
                    {active.title}
                  </h3>
                  <div
                    className="text-xs mt-1 font-medium"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {active.year}
                  </div>
                  <div
                    className="mt-3 text-[10px] font-semibold tracking-wider"
                    style={{ color: `${active.color}99` }}
                  >
                    {active.sub}
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="hidden md:block w-px self-stretch"
                  style={{ background: `${active.color}25` }}
                />

                {/* Description */}
                <p
                  className="text-sm md:text-base leading-relaxed md:leading-loose flex-1"
                  style={{ color: "rgba(220,210,195,0.85)" }}
                >
                  {active.desc}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2 mt-6 justify-center">
                {TIMELINE_NODES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveNode(i)}
                    className="transition-all duration-300"
                    style={{
                      width: activeNode === i ? "24px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: activeNode === i ? active.color : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════
          CLOSING STATEMENT
      ══════════════════════════════════ */}
      <section className="relative py-20 md:py-28 border-t" style={{ borderColor: "rgba(243,186,47,0.1)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Emerald sigil */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 border"
              style={{
                background: "radial-gradient(circle, rgba(4,50,28,0.8) 0%, rgba(0,0,0,0.9) 70%)",
                borderColor: "rgba(243,186,47,0.25)",
                boxShadow: "0 0 30px rgba(243,186,47,0.12)",
              }}
            >
              <span className="text-2xl">🏴</span>
            </div>

            <div
              className="text-[10px] font-bold tracking-[0.4em] mb-5"
              style={{ color: "rgba(243,186,47,0.5)" }}
            >
              OUR COMMITMENT
            </div>

            <blockquote
              className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed mb-6"
              style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
            >
              "No Orakzai stands alone. No deserving soul is left behind.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F3BA2F, #ffd666)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                This is our digital covenant.
              </span>
              "
            </blockquote>

            <p className="text-sm md:text-base leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(220,210,195,0.65)" }}>
              Orakzai.org is not just an organization. It is a living, breathing sanctuary — a borderless
              embassy that honors the past while engineering the future of our nation.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #F3BA2F 0%, #e8a820 100%)",
                  color: "#000",
                  boxShadow: "0 0 20px rgba(243,186,47,0.3)",
                }}
              >
                Become a Member
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-400/5"
                style={{ borderColor: "rgba(243,186,47,0.2)", color: "rgba(243,186,47,0.8)" }}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
