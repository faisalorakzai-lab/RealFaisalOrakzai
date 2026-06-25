import { motion } from "framer-motion";
import { useListTimeline } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1 } }),
};

const focuses = [
  "AI-driven systems & intelligent automation",
  "Blockchain infrastructure & digital assets",
  "Real estate and investment models",
  "Scalable business structures",
  "Luxury commerce & brand development",
  "Financial technology & tokenization",
];

const principles = [
  { title: "System Thinking", desc: "Every business is a system. Understanding the structure reveals the leverage." },
  { title: "Long-Term Value", desc: "Short-term trends fade. Only fundamentals compound." },
  { title: "Technology as Infrastructure", desc: "AI and blockchain aren't sectors — they're the new foundation of commerce." },
  { title: "Execution Over Ideas", desc: "Ideas are abundant. The rarest resource is disciplined execution." },
];

export default function Founder() {
  const { data: timeline, isLoading } = useListTimeline();

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Hero */}
      <section className="relative pt-32 pb-24 border-b border-[#F3BA2F]/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(243,186,47,0.04),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/20 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
                <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">FOUNDER PROFILE</span>
              </motion.div>
              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
                FAISAL<br /><span className="gold-gradient">ORAKZAI</span>
              </motion.h1>
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/40 font-mono text-xs tracking-[0.3em] mb-8 uppercase">
                Founder & Chairman · Orakzai Group
              </motion.p>
              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="text-white/60 text-lg leading-relaxed max-w-lg">
                Entrepreneur building long-term ventures across AI, blockchain infrastructure, digital assets, luxury commerce, and real-world investments. Founder of <span className="text-[#F3BA2F]">Orakzai Bond</span> and <span className="text-[#F3BA2F]">Shamim Forever</span>.
              </motion.p>
            </div>

            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="relative">
              <div className="relative w-full max-w-sm mx-auto">
                <div className="absolute inset-0 border border-[#F3BA2F]/20" />
                <div className="absolute top-6 -left-6 w-full h-full border border-[#F3BA2F]/10" />
                <img
                  src="/founder.jpg"
                  alt="Faisal Orakzai — Founder & Chairman, Orakzai Group"
                  className="relative w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"; }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <div className="text-[#F3BA2F] font-mono text-xs mb-1">FAISAL ORAKZAI</div>
                  <div className="text-white/50 font-mono text-[10px] tracking-widest">BORN 30 APRIL 2006 · PAKISTAN</div>
                </div>
                <div className="absolute top-4 right-4 bg-black/80 border border-[#F3BA2F]/30 px-2 py-1 font-mono text-[10px] text-[#F3BA2F]">ID: FOUNDER_01</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Bio */}
      <section className="py-24 border-b border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-2">THE JOURNEY</div>
              <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                <p>
                  <strong className="text-white">Faisal Orakzai</strong> (born 30 April 2006) is a Pakistani entrepreneur and Founder & Chairman of <strong className="text-[#F3BA2F]">Orakzai Group</strong>, an organization developing ventures across emerging technologies and traditional industries.
                </p>
                <p>
                  He began his journey at the age of 12, entering business through real estate and learning through practical experience. Over time, he expanded across multiple markets, building a foundation in property before transitioning into digital finance, including cryptocurrency, forex, and blockchain infrastructure.
                </p>
                <p>
                  In 2023, he founded Orakzai Group with a focus on building scalable systems and long-term ventures. His work combines blockchain infrastructure, artificial intelligence, digital assets, luxury commerce, and investment-driven business models.
                </p>
                <p>
                  He is leading the development of <strong className="text-[#F3BA2F]">Orakzai Bond</strong>, a blockchain-focused ecosystem exploring real-world asset integration, digital finance, and next-generation financial infrastructure. He also founded <strong className="text-[#F3BA2F]">Shamim Forever</strong>, a luxury jewelry and lifestyle brand built around premium craftsmanship and long-term brand value.
                </p>
                <p>
                  His long-term vision is centered on combining AI, blockchain, and real-world assets to develop businesses that contribute to sustainable economic growth and innovation — building systems that build businesses.
                </p>
              </div>
              <blockquote className="border-l-2 border-[#F3BA2F] pl-8 py-2">
                <p className="text-2xl font-medium text-white/90 italic">"I build systems that build businesses."</p>
                <footer className="text-[#F3BA2F] font-mono text-xs mt-3 tracking-widest">— FAISAL ORAKZAI</footer>
              </blockquote>
            </div>
            <div className="space-y-4">
              <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">AREAS OF FOCUS</div>
              {focuses.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className="flex items-start gap-3 text-white/50 text-sm">
                  <div className="w-1 h-1 rounded-full bg-[#F3BA2F] mt-2 flex-shrink-0" />
                  {f}
                </motion.div>
              ))}

              <div className="mt-10 pt-8 border-t border-[#F3BA2F]/10 space-y-4">
                <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-4">NOTABLE VENTURES</div>
                {[
                  { name: "Orakzai Group", role: "Founder & Chairman", url: null },
                  { name: "Orakzai Bond", role: "Blockchain Financial Ecosystem", url: "https://orakzaibond.com" },
                  { name: "Shamim Forever", role: "Luxury Jewelry & Lifestyle", url: "https://www.shamimforever.com" },
                ].map((v, i) => (
                  <div key={i} className="border border-[#F3BA2F]/10 p-4 hover:border-[#F3BA2F]/30 transition-colors">
                    <div className="text-white text-sm font-semibold">{v.name}</div>
                    <div className="text-white/30 text-xs mt-1">{v.role}</div>
                    {v.url && <a href={v.url} target="_blank" rel="noreferrer" className="text-[#F3BA2F] text-xs font-mono mt-2 inline-block hover:underline">{v.url.replace("https://", "")} →</a>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 border-b border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-12">CORE PRINCIPLES</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F3BA2F]/10">
            {principles.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-black p-8 group">
                <div className="text-[#F3BA2F] font-mono text-2xl font-bold mb-4">0{i + 1}</div>
                <h3 className="text-white font-bold mb-3 group-hover:text-[#F3BA2F] transition-colors">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-12">TIMELINE — 2006 → 2100</div>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#F3BA2F]/15" />
            {isLoading ? (
              <div className="space-y-8 pl-10">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-20 w-full bg-white/5" />)}</div>
            ) : (
              <div className="space-y-0">
                {(timeline ?? []).map((event, i) => (
                  <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-20 text-right pt-6">
                      <div className={`font-mono text-xs font-bold ${event.isVision ? "text-[#F3BA2F]/50" : "text-[#F3BA2F]"}`}>{event.year}</div>
                    </div>
                    <div className="flex-shrink-0 relative pt-6">
                      <div className={`w-3 h-3 rounded-full border-2 relative z-10 ${event.isVision ? "border-[#F3BA2F]/30 bg-transparent" : "border-[#F3BA2F] bg-[#F3BA2F]/20"}`} />
                    </div>
                    <div className={`flex-1 pb-10 pt-4 border-b border-white/5 group-hover:border-[#F3BA2F]/10 transition-colors`}>
                      <div className={`text-xs font-mono mb-2 ${event.isVision ? "text-white/20" : "text-[#F3BA2F]/60"}`}>{event.isVision ? "VISION" : "MILESTONE"} · {event.type.toUpperCase()}</div>
                      <h3 className={`font-bold mb-1 ${event.isVision ? "text-white/40" : "text-white"}`}>{event.title}</h3>
                      <p className="text-white/30 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
