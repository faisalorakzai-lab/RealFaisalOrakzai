import { motion, useInView } from "framer-motion";
  import { useRef } from "react";
  import SEOHead from "@/components/shared/SEOHead";
  import {
    TrendingUp, Shield, Globe, Cpu, Gem, Building2,
    BarChart2, FileText, Lock, ArrowUpRight, CheckCircle2
  } from "lucide-react";

  const GOLD = "#F3BA2F";

  const fade = { hidden:{opacity:0,y:28}, show:(i=0)=>({opacity:1,y:0,transition:{duration:0.65,delay:i*0.08}}) };

  function Section({ children, className="" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once:true, margin:"-80px" });
    return (
      <motion.div ref={ref} initial="hidden" animate={inView?"show":"hidden"} variants={fade} className={className}>
        {children}
      </motion.div>
    );
  }

  const SECTORS = [
    {
      icon: <BarChart2 size={22} />, label: "BLOCKCHAIN & DIGITAL ASSETS", color: "#F3BA2F",
      name: "Orakzai Bond (OKBOND)",
      tag: "POLYGON L2 · LIVE",
      items: [
        "Max Supply: 10,000,000 OKBOND (hard-capped, deflationary)",
        "Blockchain: Polygon Layer-2 (scalable, ultra-low gas fees)",
        "Architecture: Treasury-Backed Capital Protection Framework",
        "Validation: High Security Score on SolidityScan",
        "Mechanism: Cycle-Based Activation Logic (CBAL)",
        "DEX Listed: Available on decentralized exchanges",
        "Explorer: Verified on PolygonScan",
      ],
      link: "https://orakzaibond.com",
    },
    {
      icon: <Cpu size={22} />, label: "ARTIFICIAL INTELLIGENCE", color: "#a78bfa",
      name: "OrakzaiX AI & AdamX",
      tag: "AI AUTOMATION · ACTIVE",
      items: [
        "OrakzaiX: High-throughput enterprise AI automation framework",
        "AdamX: Machine-learning pipeline eliminating human latency in ops",
        "Use Case: Corporate digital transformation & workflow automation",
        "Stack: Python, LangChain, custom ML pipelines, API orchestration",
        "Target: $1M+ enterprise efficiency gains annually per deployment",
        "OkzByte Technology: Full-stack AI software development arm",
      ],
      link: "https://faisalorakzai.com/ecosystem",
    },
    {
      icon: <Gem size={22} />, label: "LUXURY COMMERCE & WEB3", color: "#34d399",
      name: "Shamim Forever",
      tag: "LUXURY · LIVE",
      items: [
        "Museum-grade luxury brand — perfumes, sapphire jewelry, cosmetics",
        "Web3 integration: cryptographic provenance tokens on blockchain",
        "Anti-counterfeit: Each product secured with unique NFT certificate",
        "Market: Premium Pakistani luxury segment + global diaspora",
        "Heritage: Founded on Orakzai tribal heritage and craftsmanship",
        "Distribution: Online + select luxury boutiques internationally",
      ],
      link: "https://www.shamimforever.com",
    },
    {
      icon: <Building2 size={22} />, label: "REAL ESTATE & TOKENIZATION", color: "#f87171",
      name: "Orakzai Real Estate",
      tag: "DEVELOPMENT · ACTIVE",
      items: [
        "Focus: Real estate tokenization and fractional property ownership",
        "Markets: Karachi (primary), Peshawar, Kohat expansion",
        "Model: Digital property certificates on blockchain infrastructure",
        "Origin: Real estate brokerage since age 12 across tri-city grid",
        "Vision: Bridge traditional property markets with DeFi liquidity",
        "Pipeline: 50+ verified property listings under management",
      ],
      link: "https://faisalorakzai.com/ecosystem",
    },
  ];

  const METRICS = [
    { label: "OKBOND MAX SUPPLY", value: "10M", sub: "Hard-capped deflationary" },
    { label: "BLOCKCHAIN NETWORK", value: "Polygon", sub: "Layer-2 scaling solution" },
    { label: "ACTIVE VENTURES", value: "6+", sub: "Across 4 verticals" },
    { label: "GLOBAL FOOTPRINT", value: "3", sub: "Continents · USA, EU, Asia" },
    { label: "CRUNCHBASE RANK", value: "#28", sub: "Pakistan blockchain founders" },
    { label: "ECOSYSTEM PROFILES", value: "40+", sub: "Verified global directories" },
  ];

  const REPORTS = [
    { title: "OKBOND Tokenomics White Paper", type: "White Paper", icon: <BarChart2 size={16}/>, url:"https://orakzaibond.com", status:"LIVE" },
    { title: "Orakzai Group Ecosystem Overview 2026", type: "Annual Overview", icon: <Globe size={16}/>, url:"https://faisalorakzai.com/ecosystem", status:"LIVE" },
    { title: "OrakzaiX AI Infrastructure Roadmap", type: "Roadmap", icon: <Cpu size={16}/>, url:"https://faisalorakzai.com/research", status:"LIVE" },
    { title: "OKBOND SolidityScan Security Review", type: "Security Audit", icon: <Shield size={16}/>, url:"https://orakzaibond.com", status:"LIVE" },
    { title: "Shamim Forever — Brand & Web3 Integration", type: "Brand Report", icon: <Gem size={16}/>, url:"https://www.shamimforever.com", status:"LIVE" },
    { title: "Vision 2040 — Orakzai Sovereign Strategy", type: "Strategy Paper", icon: <FileText size={16}/>, url:"#", status:"Q4 2026" },
  ];

  const PRINCIPLES = [
    { title: "Long-Term Capital Preservation", body: "Every venture within Orakzai Group is built with a 10+ year capital preservation mindset — assets structured for appreciation, not speculation." },
    { title: "Decentralized Infrastructure First", body: "Blockchain-native architecture ensures all digital assets operate without central points of failure, censorship, or counterparty risk." },
    { title: "Real-World Asset Backing", body: "OKBOND and other financial instruments are designed to be backed by real-world assets — luxury goods, property, and verified business cash flows." },
    { title: "Transparency by Protocol", body: "All token movements, smart contract interactions, and treasury operations are publicly verifiable on-chain — no black boxes." },
  ];

  export default function Investment() {
    return (
      <>
        <SEOHead
          title="Investment — Orakzai Group Sovereign Capital Framework"
          description="Investment thesis, OKBOND tokenomics, portfolio sectors, and strategic capital framework of Orakzai Group founded by Muhammad Faisal Orakzai. Blockchain, AI, luxury, real estate."
          path="/investment"
          keywords="Orakzai Group investment, OKBOND tokenomics, blockchain investment Pakistan, Faisal Orakzai ventures, Polygon token"
        />
        <div className="min-h-screen bg-black text-white">

          {/* ── Hero ───────────────────────────────────────────────── */}
          <section className="relative pt-32 pb-20 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <motion.div initial="hidden" animate="show" variants={fade} custom={0}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Orakzai Group</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                  Sovereign<br/>
                  <span style={{color:GOLD}}>Capital</span><br/>
                  Framework
                </h1>
                <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-10">
                  Orakzai Group operates across four verticals — blockchain digital assets,
                  AI automation, luxury commerce, and real estate tokenization.
                  Every venture is designed for 10-year capital preservation and global scalability.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 bg-[#F3BA2F] text-black font-bold px-6 py-3 text-sm tracking-wide hover:bg-[#F3BA2F]/90 transition-colors">
                    Explore OKBOND <ArrowUpRight size={16}/>
                  </a>
                  <a href="/contact"
                     className="inline-flex items-center gap-2 border border-[#F3BA2F]/30 text-[#F3BA2F]/80 px-6 py-3 text-sm tracking-wide hover:border-[#F3BA2F] hover:text-[#F3BA2F] transition-colors">
                    Strategic Partnership
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Metrics Bar ─────────────────────────────────────────── */}
          <section className="border-b border-[#F3BA2F]/10 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {METRICS.map((m,i) => (
                <motion.div key={m.label} initial="hidden" animate="show" variants={fade} custom={i*0.05} className="text-center">
                  <div className="text-3xl md:text-4xl font-black mb-1" style={{color:GOLD}}>{m.value}</div>
                  <div className="text-white/70 text-[10px] font-mono tracking-widest uppercase mb-1">{m.label}</div>
                  <div className="text-white/30 text-xs">{m.sub}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Investment Sectors ──────────────────────────────────── */}
          <section className="py-24 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <Section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Portfolio Sectors</span>
                </div>
                <h2 className="text-4xl font-black mb-16">Four Verticals.<br/><span className="text-white/40">One Sovereign Vision.</span></h2>
              </Section>
              <div className="grid md:grid-cols-2 gap-8">
                {SECTORS.map((s, i) => (
                  <Section key={s.name}>
                    <motion.div variants={fade} custom={i*0.1}
                      className="border border-white/8 p-8 hover:border-[#F3BA2F]/30 transition-colors group h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span style={{color:s.color}}>{s.icon}</span>
                            <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{color:s.color}}>{s.label}</span>
                          </div>
                          <h3 className="text-xl font-bold">{s.name}</h3>
                        </div>
                        <span className="font-mono text-[9px] tracking-widest px-2 py-1 border text-[#F3BA2F]/60 border-[#F3BA2F]/20">{s.tag}</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {s.items.map(item => (
                          <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                            <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{color:s.color}} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a href={s.link} target={s.link.startsWith("http")?"_blank":"_self"}
                         rel="noopener noreferrer"
                         className="inline-flex items-center gap-1 text-xs font-mono tracking-widest group-hover:text-[#F3BA2F] text-white/40 transition-colors uppercase">
                        Explore <ArrowUpRight size={12}/>
                      </a>
                    </motion.div>
                  </Section>
                ))}
              </div>
            </div>
          </section>

          {/* ── Investment Principles ───────────────────────────────── */}
          <section className="py-24 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <Section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Philosophy</span>
                </div>
                <h2 className="text-4xl font-black mb-16">Investment<br/><span className="text-white/40">Principles</span></h2>
              </Section>
              <div className="grid md:grid-cols-2 gap-6">
                {PRINCIPLES.map((p, i) => (
                  <Section key={p.title}>
                    <motion.div variants={fade} custom={i*0.1} className="border-l-2 border-[#F3BA2F]/30 pl-6 py-2">
                      <h3 className="font-bold text-lg mb-3">{p.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
                    </motion.div>
                  </Section>
                ))}
              </div>
            </div>
          </section>

          {/* ── Reports & Documents ─────────────────────────────────── */}
          <section className="py-24 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <Section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Documents</span>
                </div>
                <h2 className="text-4xl font-black mb-16">Research &amp;<br/><span className="text-white/40">Reports</span></h2>
              </Section>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REPORTS.map((r, i) => (
                  <Section key={r.title}>
                    <motion.a variants={fade} custom={i*0.08}
                      href={r.url} target={r.url=="#"?"_self":"_blank"} rel="noopener noreferrer"
                      className="flex items-start gap-4 border border-white/8 p-5 hover:border-[#F3BA2F]/30 transition-colors group">
                      <span className="text-[#F3BA2F] mt-0.5 shrink-0">{r.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm mb-1 group-hover:text-[#F3BA2F] transition-colors truncate">{r.title}</div>
                        <div className="text-white/40 text-xs mb-2">{r.type}</div>
                        <div className={`font-mono text-[9px] tracking-widest ${r.status==="LIVE"?"text-emerald-400":"text-[#F3BA2F]/60"}`}>{r.status}</div>
                      </div>
                      <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#F3BA2F] transition-colors shrink-0"/>
                    </motion.a>
                  </Section>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Section>
                <TrendingUp size={40} className="mx-auto mb-6" style={{color:GOLD}} />
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  Strategic<br/><span style={{color:GOLD}}>Partnerships</span>
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                  Orakzai Group is open to institutional partnerships, co-investment structures,
                  and strategic collaborations across blockchain infrastructure, AI automation,
                  luxury commerce, and emerging market real estate.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/contact"
                     className="inline-flex items-center gap-2 bg-[#F3BA2F] text-black font-bold px-8 py-4 tracking-wide hover:bg-[#F3BA2F]/90 transition-colors">
                    Initiate Partnership <ArrowUpRight size={16}/>
                  </a>
                  <a href="https://orakzaibond.com" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 border border-[#F3BA2F]/30 text-[#F3BA2F]/80 px-8 py-4 tracking-wide hover:border-[#F3BA2F] hover:text-[#F3BA2F] transition-colors">
                    View OKBOND <ArrowUpRight size={16}/>
                  </a>
                </div>
              </Section>
            </div>
          </section>

        </div>
      </>
    );
  }
  