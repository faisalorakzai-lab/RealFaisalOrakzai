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

const LEADERS = [
  {
    name: "Grand Council of Elders",
    role: "Supreme Advisory Board",
    desc: "The ancestral council that preserves Pashtunwali principles and guides all institutional decisions with centuries of tribal wisdom.",
    icon: "👑",
  },
  {
    name: "Executive Directorate",
    role: "Global Operations Leadership",
    desc: "A cross-continental team of Orakzai professionals overseeing legal advocacy, humanitarian programs, and digital infrastructure worldwide.",
    icon: "🏛️",
  },
  {
    name: "Diaspora Representatives",
    role: "12+ Nations Coordination",
    desc: "Elected community voices from Pakistan, Gulf States, Europe, North America, and Southeast Asia ensuring every branch is heard and empowered.",
    icon: "🌐",
  },
  {
    name: "Youth Leadership Corps",
    role: "Next Generation Initiative",
    desc: "A dedicated cohort of emerging Orakzai scholars and professionals carrying the mission forward through technology, law, and civic engagement.",
    icon: "⚡",
  },
];

export default function Leadership() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <SEOHead
        title="Leadership — Orakzai.org | Guiding the Nation Forward"
        description="Meet the leadership councils and representatives of Orakzai.org — a global network of tribal elders, diaspora leaders, and next-generation advocates."
        path="/leadership"
        keywords="Orakzai leadership, Orakzai council, tribal governance, diaspora representatives"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(4,50,28,0.5) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

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
            Leadership &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F3BA2F 0%, #ffd666 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Governance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(220,210,195,0.75)" }}
          >
            Guided by ancestral wisdom and modern institutional frameworks, our leadership spans
            continents and generations — united in a single mission of empowerment and protection.
          </motion.p>
        </div>
      </section>

      {/* Leaders grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERS.map((leader, i) => (
              <motion.div
                key={leader.name}
                custom={i * 0.1}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="group rounded-xl border p-6 md:p-8 relative overflow-hidden transition-all duration-500 hover:border-yellow-500/30"
                style={{
                  background: "linear-gradient(135deg, rgba(4,28,18,0.9) 0%, rgba(2,18,10,0.95) 100%)",
                  borderColor: "rgba(34,197,94,0.15)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(243,186,47,0.04) 0%, transparent 70%)" }}
                />

                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: "rgba(243,186,47,0.08)", border: "1px solid rgba(243,186,47,0.18)" }}
                  >
                    {leader.icon}
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-bold tracking-[0.3em] mb-1"
                      style={{ color: "rgba(243,186,47,0.55)" }}
                    >
                      {leader.role}
                    </div>
                    <h3
                      className="text-base md:text-lg font-bold mb-3"
                      style={{ color: "#f0e8d0", fontFamily: "Georgia, serif" }}
                    >
                      {leader.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(220,210,195,0.72)" }}>
                      {leader.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming soon notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center py-10 rounded-xl border"
            style={{
              background: "rgba(4,22,13,0.6)",
              borderColor: "rgba(243,186,47,0.12)",
            }}
          >
            <div className="text-2xl mb-3">🔒</div>
            <div
              className="text-[10px] font-bold tracking-[0.35em] mb-2"
              style={{ color: "rgba(243,186,47,0.5)" }}
            >
              FULL PROFILES
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Individual leadership profiles and biographies will be published during the formal launch phase.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
