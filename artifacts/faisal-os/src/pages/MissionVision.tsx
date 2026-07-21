import { motion } from "framer-motion";
import SEOHead from "@/components/shared/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const PILLARS = [
  {
    icon: "⚖️",
    label: "Legal Advocacy",
    desc: "Pro-bono legal defense and counsel for Orakzai individuals facing exploitation, discrimination, or injustice across international borders.",
  },
  {
    icon: "🎓",
    label: "Global Scholarships",
    desc: "Funding access to higher education for deserving Orakzai youth — eliminating economic barriers that block brilliant minds from reaching their potential.",
  },
  {
    icon: "🚨",
    label: "Crisis Relief",
    desc: "Emergency humanitarian response for Orakzai families impacted by conflict, natural disaster, or sudden economic hardship anywhere in the world.",
  },
  {
    icon: "💰",
    label: "Economic Grants",
    desc: "Seed capital and structured grants enabling Orakzai entrepreneurs and community leaders to build self-sustaining economic futures.",
  },
  {
    icon: "🏺",
    label: "Heritage Preservation",
    desc: "A living digital archive preserving Orakzai language, oral traditions, tribal history, and cultural identity for generations yet to come.",
  },
  {
    icon: "🤝",
    label: "Community Unity",
    desc: "A unified global network connecting diaspora communities — ensuring no Orakzai family feels isolated, forgotten, or without institutional support.",
  },
];

export default function MissionVision() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <SEOHead
        title="Mission & Vision — Orakzai.org | Building a Sovereign Digital Future"
        description="The mission of Orakzai.org: pro-bono legal advocacy, global scholarships, crisis relief, economic grants, and heritage preservation for the Orakzai nation worldwide."
        path="/mission-vision"
        keywords="Orakzai mission, Orakzai vision, digital homeland, legal advocacy, scholarships, Orakzai org"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(4,50,28,0.5) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute constellation-bg inset-0 opacity-25 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-yellow-400/50" />
            <span className="text-[11px] font-bold tracking-[0.4em]" style={{ color: "#F3BA2F" }}>
              A B O U T &nbsp; U S
            </span>
            <div className="h-px w-10 bg-yellow-400/50" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#f5eed8" }}
          >
            Mission{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F3BA2F 0%, #ffd666 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &amp; Vision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(220,210,195,0.75)" }}
          >
            To be the sovereign, borderless institutional force that unifies, protects, empowers,
            and elevates every member of the global Orakzai community — leaving no one standing alone.
          </motion.p>
        </div>
      </section>

      {/* Mission + Vision statements */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border p-7 md:p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(4,28,18,0.92) 0%, rgba(2,18,10,0.96) 100%)",
                borderColor: "rgba(243,186,47,0.2)",
                boxShadow: "0 0 40px rgba(243,186,47,0.06)",
              }}
            >
              <div
                className="text-[9px] font-bold tracking-[0.4em] mb-3"
                style={{ color: "rgba(243,186,47,0.55)" }}
              >
                OUR MISSION
              </div>
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
              >
                Protect. Unite. Empower.
              </h2>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(220,210,195,0.78)" }}>
                To operate as a sovereign digital homeland that delivers tangible institutional support —
                legal, educational, humanitarian, and economic — to every Orakzai individual and family,
                wherever they are in the world. We bridge the gap between ancestral identity and modern
                global opportunity.
              </p>
              <div className="mt-5 w-12 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #F3BA2F, transparent)" }} />
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl border p-7 md:p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(4,22,13,0.92) 0%, rgba(1,15,8,0.97) 100%)",
                borderColor: "rgba(34,197,94,0.2)",
                boxShadow: "0 0 40px rgba(34,197,94,0.06)",
              }}
            >
              <div
                className="text-[9px] font-bold tracking-[0.4em] mb-3"
                style={{ color: "rgba(34,197,94,0.6)" }}
              >
                OUR VISION
              </div>
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
              >
                A Nation Without Borders.
              </h2>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(220,210,195,0.78)" }}>
                A future where every Orakzai — regardless of geography, economic standing, or social
                circumstance — has access to institutional protection, educational advancement, and
                community belonging. A fully realized digital nation preserving our heritage while
                engineering a sovereign, prosperous future for generations to come.
              </p>
              <div className="mt-5 w-12 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #22c55e, transparent)" }} />
            </motion.div>
          </div>

          {/* Core pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="text-[10px] font-bold tracking-[0.4em] mb-2" style={{ color: "rgba(243,186,47,0.5)" }}>
              INSTITUTIONAL PILLARS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}>
              What We Deliver
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                custom={i * 0.08}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className="group rounded-xl border p-5 transition-all duration-400 hover:border-yellow-500/25"
                style={{
                  background: "rgba(4,20,12,0.85)",
                  borderColor: "rgba(243,186,47,0.1)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
                  style={{ background: "rgba(243,186,47,0.07)", border: "1px solid rgba(243,186,47,0.15)" }}
                >
                  {pillar.icon}
                </div>
                <h3
                  className="text-sm font-bold mb-2"
                  style={{ color: "#f0e8d0" }}
                >
                  {pillar.label}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(220,210,195,0.65)" }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 border-t" style={{ borderColor: "rgba(243,186,47,0.1)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-lg md:text-xl font-bold leading-relaxed mb-8"
              style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
            >
              "We do not merely record history. We build the institutional infrastructure that ensures
              our nation thrives across every generation."
            </p>
            <a
              href="/our-story"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:gap-3"
              style={{ color: "#F3BA2F" }}
            >
              Read Our Full Story
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
