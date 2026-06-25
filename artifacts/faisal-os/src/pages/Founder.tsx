import { motion } from "framer-motion";
import { useListTimeline } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Globe, Cpu, Zap, BookOpen, Award, Mic, Star } from "lucide-react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const achievements = [
  { title: "Web3 Pioneer", desc: "Built OKBOND tokenization platform for blockchain assets", icon: <Zap className="h-5 w-5" /> },
  { title: "AI Innovator", desc: "Founded AdamX — an AI intelligence platform", icon: <Cpu className="h-5 w-5" /> },
  { title: "Ecosystem Builder", desc: "Leads 5+ companies across tech, luxury, and commerce", icon: <Globe className="h-5 w-5" /> },
  { title: "Research Author", desc: "Published whitepapers on blockchain economics and AI", icon: <BookOpen className="h-5 w-5" /> },
  { title: "Speaker & Thought Leader", desc: "Invited speaker on Web3, AI, and entrepreneurship", icon: <Mic className="h-5 w-5" /> },
  { title: "Vision 2040 Architect", desc: "Blueprint for Pakistan's transformation into a tech superpower", icon: <Star className="h-5 w-5" /> },
];

const philosophy = [
  { quote: "Technology is not just a tool — it is the new language of civilization.", attr: "Faisal Orakzai" },
  { quote: "Every great empire started as an idea that refused to be small.", attr: "Faisal Orakzai" },
  { quote: "Pakistan is not emerging. Pakistan is arriving.", attr: "Faisal Orakzai" },
  { quote: "Build for 2100. Think from 2006. Act today.", attr: "Faisal Orakzai" },
];

const topics = ["Web3 & Blockchain", "Artificial Intelligence", "Digital Entrepreneurship", "Pakistan Tech Ecosystem", "Tokenomics & DeFi", "AI Research & Ethics", "Building Digital Empires", "Vision 2040"];

export default function Founder() {
  const { data: timeline, isLoading } = useListTimeline();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none" />
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-shrink-0">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 border border-primary/30 rounded-sm" />
              <div className="absolute top-4 -left-4 w-full h-full border border-secondary/20 rounded-sm" />
              <img src="/founder.jpg" alt="Faisal Orakzai" className="relative w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop"; }} />
              <div className="absolute -bottom-3 -right-3 bg-primary/10 border border-primary/30 px-3 py-1 font-mono text-xs text-primary">ID: FOUNDER_01</div>
            </div>
          </div>
          <div className="space-y-6 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest">
              <span className="animate-pulse h-2 w-2 rounded-full bg-primary inline-block" /> PROFILE LOADED
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter uppercase">FAISAL <span className="text-primary">ORAKZAI</span></h1>
            <div className="flex flex-wrap gap-2">
              {["Pakistani Entrepreneur", "Web3 Founder", "AI Builder", "Blockchain Innovator", "Technology Leader"].map((t) => (
                <Badge key={t} variant="outline" className="border-primary/30 text-primary font-mono text-xs">{t}</Badge>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
              Born in 2006, Faisal Orakzai is building a multi-company digital empire from Pakistan to the world. Founder of Orakzai Group, OKBOND, AdamX, OrakzaiX, and Shamim Forever — he is architecting the future of blockchain, AI, and global digital infrastructure.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-primary/50 pl-4">
                <div className="text-xs text-muted-foreground font-mono tracking-widest mb-1">LOCATION</div>
                <div className="text-sm font-medium">Pakistan → Global</div>
              </div>
              <div className="border-l-2 border-secondary/50 pl-4">
                <div className="text-xs text-muted-foreground font-mono tracking-widest mb-1">STATUS</div>
                <div className="text-sm font-medium text-primary">ACTIVE BUILDER</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1 bg-border/50" />
            <h2 className="text-2xl font-bold font-mono tracking-widest uppercase text-center">TIMELINE: 2006 → 2100</h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-primary/20" />
            {isLoading ? (
              <div className="space-y-8">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 w-full max-w-lg mx-auto" />)}</div>
            ) : (
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
                {(timeline ?? []).map((event, i) => (
                  <motion.div key={event.id} variants={item} className={`relative flex gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-start lg:items-center`}>
                    <div className="hidden lg:flex flex-1 justify-end">
                      {i % 2 === 0 && (
                        <div className="bg-card border border-border/50 p-6 rounded-sm max-w-sm w-full hover:border-primary/30 transition-colors">
                          <div className={`text-xs font-mono mb-2 ${event.isVision ? "text-secondary" : "text-primary"}`}>{event.year} {event.isVision ? "— VISION" : "— MILESTONE"}</div>
                          <div className="font-bold text-sm mb-1">{event.title}</div>
                          <div className="text-xs text-muted-foreground">{event.description}</div>
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 relative z-10">
                      <div className={`w-3 h-3 rounded-full border-2 ${event.isVision ? "border-secondary bg-secondary/20" : "border-primary bg-primary/20"}`} />
                    </div>
                    <div className="flex-1 lg:hidden">
                      <div className="bg-card border border-border/50 p-4 rounded-sm">
                        <div className={`text-xs font-mono mb-1 ${event.isVision ? "text-secondary" : "text-primary"}`}>{event.year}</div>
                        <div className="font-bold text-sm mb-1">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.description}</div>
                      </div>
                    </div>
                    <div className="hidden lg:flex flex-1">
                      {i % 2 !== 0 && (
                        <div className="bg-card border border-border/50 p-6 rounded-sm max-w-sm w-full hover:border-primary/30 transition-colors">
                          <div className={`text-xs font-mono mb-2 ${event.isVision ? "text-secondary" : "text-primary"}`}>{event.year} {event.isVision ? "— VISION" : "— MILESTONE"}</div>
                          <div className="font-bold text-sm mb-1">{event.title}</div>
                          <div className="text-xs text-muted-foreground">{event.description}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-mono tracking-widest uppercase mb-12 text-center">ACHIEVEMENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-card border border-border/50 p-6 hover:border-primary/40 transition-colors group">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform inline-block">{a.icon}</div>
                <h3 className="font-bold mb-2 text-sm tracking-wide uppercase">{a.title}</h3>
                <p className="text-muted-foreground text-sm">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-mono tracking-widest uppercase mb-12 text-center">PHILOSOPHY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {philosophy.map((p, i) => (
              <motion.blockquote key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="border-l-2 border-primary pl-6 py-2">
                <p className="text-lg text-foreground font-medium italic mb-3">"{p.quote}"</p>
                <footer className="text-xs text-primary font-mono">— {p.attr}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-mono tracking-widest uppercase mb-12 text-center">SPEAKING TOPICS</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {topics.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="px-5 py-2 border border-primary/30 text-primary text-sm font-mono hover:bg-primary/10 transition-colors cursor-default">
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
