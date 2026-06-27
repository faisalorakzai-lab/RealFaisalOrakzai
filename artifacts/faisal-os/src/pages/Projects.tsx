import { motion } from "framer-motion";

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
    glyph: "◈",
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
    glyph: "◇",
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
    glyph: "◉",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Benchmarks() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 relative">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(243,186,47,0.055) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
              <div className="h-px w-8 bg-[#F3BA2F]" />
              <span className="font-mono text-[10px] tracking-[0.4em] text-[#F3BA2F] uppercase">Personal Standard</span>
              <div className="h-px flex-1 bg-[#F3BA2F]/10" />
            </motion.div>

            <motion.div variants={fadeUp} className="mb-4">
              <h1 className="font-black tracking-[-0.03em] leading-none uppercase" style={{ fontSize: "clamp(3.2rem, 12vw, 8rem)" }}>
                BENCH
                <span style={{
                  background: "linear-gradient(135deg, #F3BA2F 0%, #ffe47a 50%, #c8900a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>MARKS</span>
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="font-mono text-white/30 text-sm tracking-[0.25em] uppercase mt-6 max-w-md">
              Three pillars. Zero compromise. A personal architecture built to last.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* ── BENCHMARK CARDS ── */}
      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6 space-y-0">
          {BENCHMARKS.map((bm, i) => (
            <motion.div
              key={bm.index}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              {/* Top divider line */}
              <div className="h-px w-full bg-[#F3BA2F]/15 mb-0" />

              <div className="py-14 md:py-20 grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20 items-start">

                {/* LEFT — number + category */}
                <div className="flex flex-col gap-4 md:sticky md:top-32">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-black text-[#F3BA2F] leading-none"
                      style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontVariantNumeric: "tabular-nums", textShadow: "0 0 40px rgba(243,186,47,0.25)" }}
                    >
                      {bm.index}
                    </span>
                    <span
                      className="text-[#F3BA2F]/15 text-4xl"
                      style={{ textShadow: "0 0 24px rgba(243,186,47,0.3)" }}
                    >
                      {bm.glyph}
                    </span>
                  </div>

                  <div>
                    <div className="font-mono text-[9px] tracking-[0.35em] text-[#F3BA2F]/50 mb-2 uppercase">{bm.category}</div>
                    <h2
                      className="font-black tracking-tight leading-none uppercase"
                      style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}
                    >
                      {bm.title}
                    </h2>
                    {/* Gold underline glow */}
                    <div
                      className="mt-3 h-[2px] w-12"
                      style={{ background: "#F3BA2F", boxShadow: "0 0 12px rgba(243,186,47,0.6)" }}
                    />
                  </div>
                </div>

                {/* RIGHT — description + pillars */}
                <div className="space-y-10">
                  <p className="text-white/50 leading-relaxed text-base md:text-[17px]">
                    {bm.description}
                  </p>

                  <div className="space-y-6">
                    {bm.pillars.map((p, j) => (
                      <motion.div
                        key={j}
                        custom={i + j * 0.15}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="border-l-2 border-[#F3BA2F]/20 pl-5 py-1 hover:border-[#F3BA2F]/60 transition-colors duration-500"
                      >
                        <div className="font-mono text-[9px] tracking-[0.3em] text-[#F3BA2F]/60 mb-2 uppercase">{p.label}</div>
                        <p className="text-white/35 text-sm leading-relaxed">{p.body}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom line */}
          <div className="h-px w-full bg-[#F3BA2F]/15" />
        </div>
      </section>

      {/* ── FOOTER CODA ── */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10 border-t border-white/5"
          >
            <div>
              <div className="font-mono text-[9px] tracking-[0.4em] text-[#F3BA2F]/40 mb-2">STANDARD CLASSIFICATION</div>
              <p className="font-mono text-white/15 text-xs tracking-widest">PERSONAL · SOVEREIGN · NON-NEGOTIABLE</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.3em] text-[#F3BA2F]/50">FAISAL ORAKZAI — 2006–∞</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
