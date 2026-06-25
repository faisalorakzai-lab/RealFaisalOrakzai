import { useEffect, useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useGetDashboardSummary } from "@workspace/api-client-react";

const BlockchainOrb = lazy(() => import("@/components/three/BlockchainOrb"));

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const domains = [
  {
    title: "Artificial Intelligence",
    desc: "Automation-driven systems designed to scale — from intelligent workflows to enterprise AI platforms.",
    icon: "⬡",
  },
  {
    title: "Blockchain & Digital Assets",
    desc: "Modern financial frameworks, asset tokenization, and next-generation digital infrastructure.",
    icon: "◈",
  },
  {
    title: "Real World Investments",
    desc: "Long-term value creation through real estate, luxury commerce, and strategic asset allocation.",
    icon: "◉",
  },
];

const stats = [
  { label: "VENTURES", key: "totalCompanies" as const },
  { label: "PROJECTS", key: "totalProjects" as const },
  { label: "RESEARCH PAPERS", key: "totalResearch" as const },
  { label: "PUBLISHED ARTICLES", key: "totalArticles" as const },
];

export default function Home() {
  const { data: summary } = useGetDashboardSummary();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity1 = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Orb background */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] opacity-60">
            <Suspense fallback={<div className="w-full h-full" />}>
              <BlockchainOrb />
            </Suspense>
          </div>
        </motion.div>

        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

        {/* Radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,black_75%)] pointer-events-none" />

        {/* Gold ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F3BA2F]/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div style={{ opacity: opacity1 }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Status badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/30 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
            <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">SYSTEM ACTIVE — FAISAL ORAKZAI</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-none mb-6">
            <span className="text-white">FAISAL</span>
            <br />
            <span className="gold-gradient text-glow">ORAKZAI</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/50 font-mono text-sm tracking-[0.3em] uppercase mb-8">
            Entrepreneur · Founder · Builder of Future Systems
          </motion.p>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            I don't build businesses.
            <br />
            <span className="text-[#F3BA2F]">I build systems that shape industries.</span>
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ecosystem">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-8 py-4 bg-[#F3BA2F] text-black font-bold tracking-wider text-sm cursor-pointer glow-gold hover:bg-[#ffd666] transition-colors">
                ENTER THE ECOSYSTEM <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
            <Link href="/founder">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-8 py-4 border border-[#F3BA2F]/30 text-[#F3BA2F] font-bold tracking-wider text-sm cursor-pointer hover:border-[#F3BA2F] hover:bg-[#F3BA2F]/5 transition-all">
                VIEW FOUNDER PROFILE
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F3BA2F]/40"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="relative py-32 border-t border-[#F3BA2F]/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">THE PHILOSOPHY</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                The world is changing.
                <br />
                <span className="text-white/30">From companies</span>
                <br />
                to <span className="text-[#F3BA2F]">systems.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                From effort to leverage. I operate where these shifts begin — at the intersection of artificial intelligence, blockchain infrastructure, and real-world economic systems.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-px">
              {[
                "Most people build products.",
                "I build systems that build products.",
                "This is not business.",
                "This is system thinking.",
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`px-6 py-4 border-l-2 ${i === 1 || i === 3 ? "border-[#F3BA2F] text-[#F3BA2F]" : "border-white/10 text-white/50"} text-lg font-light`}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DOMAINS ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-4">OPERATIONAL DOMAINS</div>
            <h2 className="text-4xl md:text-5xl font-bold">Where I Operate</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#F3BA2F]/10">
            {domains.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ backgroundColor: "rgba(243,186,47,0.04)" }}
                className="bg-black p-10 group cursor-default transition-colors"
              >
                <div className="text-[#F3BA2F] text-3xl mb-6 font-mono">{d.icon}</div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[#F3BA2F] transition-colors">{d.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="py-32 border-t border-[#F3BA2F]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F3BA2F]/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="text-[#F3BA2F]/20 text-8xl font-serif leading-none mb-4">"</div>
            <p className="text-3xl md:text-5xl font-bold leading-tight text-white/90 mb-8">
              Ideas are common.
              <br />
              <span className="text-[#F3BA2F]">Execution is rare.</span>
            </p>
            <div className="text-white/30 font-mono text-xs tracking-[0.3em]">— FAISAL ORAKZAI, FOUNDER & CHAIRMAN, ORAKZAI GROUP</div>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE STATS ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#F3BA2F]/10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-black p-8 text-center"
              >
                <div className="text-5xl font-bold text-[#F3BA2F] mb-3 font-mono">{summary?.[stat.key] ?? "—"}</div>
                <div className="text-white/30 font-mono text-[10px] tracking-[0.25em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 border-t border-[#F3BA2F]/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <p className="text-white/30 font-mono text-xs tracking-[0.3em] mb-6">FINAL THOUGHT</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              The future belongs to those
              <br />
              who <span className="gold-gradient">build systems,</span>
              <br />
              not follow them.
            </h2>
            <Link href="/ecosystem">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-3 px-10 py-5 bg-[#F3BA2F] text-black font-bold tracking-widest text-sm cursor-pointer glow-gold hover:bg-[#ffd666] transition-colors">
                EXPLORE THE ECOSYSTEM <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
