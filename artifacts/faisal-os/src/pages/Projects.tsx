import { motion } from "framer-motion";

const BENCHMARKS = [
  {
    index: "01",
    category: "THE MINDSET BENCHMARK",
    title: "COGNITIVE RESILIENCE",
    description:
      "Built from the rugged mountain terrains to the metropolitan grid. A personal standard that shifts survival parameters into extreme strategic independence, driving the capacity to navigate high-isolation and high-risk environments alone since the age of 12.",
    pillars: [
      {
        label: "THE SURVIVAL PARAMETER",
        body: "A 4-year-old forged in extreme mountain passes — raw cognitive resilience born not from comfort, but from terrain that tolerated no weakness.",
      },
      {
        label: "THE INDEPENDENCE RULE",
        body: "Relocated alone to Karachi at age 12. Zero institutional support. Market dynamics mastered through structural self-study and unassisted discipline.",
      },
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
      {
        label: "MUSEUM-GRADE VISUALS",
        body: "A personal collection of high-end precious metals and raw sapphire jewelry — each piece selected for structural purity and aesthetic integrity, not trend.",
      },
      {
        label: "SOVEREIGN ATTIRE",
        body: "Bespoke traditional garments and custom-named black shawls that establish a visual identity deliberately distinct from convention.",
      },
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
      {
        label: "ZERO HUMAN LATENCY",
        body: "Digital systems architected to operate autonomously — no queues, no delegation bottlenecks. Infrastructure that functions at machine speed, not human pace.",
      },
      {
        label: "ABSOLUTE LINEAGE CONTROL",
        body: "A personal stand against fraud and opacity. Every transaction, relationship, and system must be transparent, verifiable, and structurally sound.",
      },
    ],
    glyph: "◉",
  },
];

export default function Benchmarks() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 relative">
        <div className="pointer-events-none absolute inset-0">
          <div style={{
            position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
            width: "600px", height: "500px",
            background: "radial-gradient(circle, rgba(243,186,47,0.05) 0%, transparent 70%)",
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* eyebrow */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-7 bg-[#F3BA2F]" />
              <span className="font-mono text-[9px] tracking-[0.45em] text-[#F3BA2F] uppercase">Personal Standard</span>
              <div className="h-px flex-1 bg-[#F3BA2F]/10" />
            </motion.div>

            {/* title */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } }}
              className="font-black tracking-tight leading-none uppercase"
              style={{ fontSize: "clamp(3rem, 13vw, 7.5rem)", letterSpacing: "-0.02em" }}
            >
              BENCH
              <span style={{
                background: "linear-gradient(135deg, #F3BA2F 0%, #ffe47a 50%, #c8900a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>MARKS</span>
            </motion.h1>

            {/* sub */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } } }}
              className="font-mono text-white/25 text-[11px] md:text-xs tracking-[0.28em] uppercase mt-5 max-w-xs md:max-w-sm leading-relaxed"
            >
              Three pillars. Zero compromise. A personal architecture built to last.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── BENCHMARK CARDS — staggered one-by-one ── */}
      <section className="pb-28">
        <div className="max-w-4xl mx-auto px-5">
          {BENCHMARKS.map((bm, i) => (
            <motion.div
              key={bm.index}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                delay: i * 0.20,       /* 0ms, 200ms, 400ms stagger */
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Hairline divider */}
              <div className="h-px w-full bg-[#F3BA2F]/12 mb-0" />

              {/* Card with gold glow hover */}
              <motion.div
                whileHover={{ boxShadow: "0 0 32px rgba(243,186,47,0.14), inset 0 0 40px rgba(243,186,47,0.03)" }}
                transition={{ duration: 0.3 }}
                className="py-12 md:py-16 grid md:grid-cols-[160px_1fr] gap-8 md:gap-16 items-start"
                style={{ cursor: "default" }}
              >
                {/* LEFT — index + label */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-black text-[#F3BA2F]"
                      style={{
                        fontSize: "clamp(2.8rem, 10vw, 4.5rem)",
                        lineHeight: 1,
                        fontVariantNumeric: "tabular-nums",
                        textShadow: "0 0 32px rgba(243,186,47,0.28)",
                      }}
                    >
                      {bm.index}
                    </span>
                    <span className="text-[#F3BA2F]/18 text-3xl">{bm.glyph}</span>
                  </div>

                  <div>
                    <div className="font-mono text-[8px] tracking-[0.38em] text-[#F3BA2F]/45 mb-2 uppercase leading-relaxed">
                      {bm.category}
                    </div>
                    <h2
                      className="font-black uppercase leading-tight"
                      style={{
                        fontSize: "clamp(1.1rem, 4vw, 1.65rem)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {bm.title}
                    </h2>
                    {/* Gold underline */}
                    <div
                      className="mt-3 h-[2px] w-10"
                      style={{
                        background: "#F3BA2F",
                        boxShadow: "0 0 10px rgba(243,186,47,0.55)",
                      }}
                    />
                  </div>
                </div>

                {/* RIGHT — description + pillars */}
                <div className="space-y-8">
                  <p
                    className="text-white/45 leading-[1.75] font-light"
                    style={{ fontSize: "clamp(0.88rem, 2.4vw, 1rem)", letterSpacing: "0.01em" }}
                  >
                    {bm.description}
                  </p>

                  <div className="space-y-5">
                    {bm.pillars.map((p, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.2 + j * 0.1 + 0.3 }}
                        whileHover={{ borderLeftColor: "rgba(243,186,47,0.6)", paddingLeft: "24px" }}
                        style={{
                          borderLeft: "2px solid rgba(243,186,47,0.18)",
                          paddingLeft: "20px",
                          paddingTop: "4px",
                          paddingBottom: "4px",
                          transition: "border-color 0.3s, padding 0.3s",
                        }}
                      >
                        <div
                          className="font-mono text-[#F3BA2F]/55 mb-1.5 uppercase"
                          style={{ fontSize: "8px", letterSpacing: "0.35em" }}
                        >
                          {p.label}
                        </div>
                        <p
                          className="text-white/30 leading-relaxed font-light"
                          style={{ fontSize: "clamp(0.8rem, 2.2vw, 0.875rem)", letterSpacing: "0.01em" }}
                        >
                          {p.body}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Bottom line */}
          <div className="h-px w-full bg-[#F3BA2F]/12" />
        </div>
      </section>

      {/* ── CODA ── */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pt-8 border-t border-white/5"
          >
            <div>
              <div className="font-mono text-[8px] tracking-[0.42em] text-[#F3BA2F]/35 mb-1.5 uppercase">Standard Classification</div>
              <p className="font-mono text-white/12 text-[10px] tracking-[0.25em] uppercase">PERSONAL · SOVEREIGN · NON-NEGOTIABLE</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.32em] text-[#F3BA2F]/45">FAISAL ORAKZAI — 2006–∞</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
