import { motion, useInView } from "framer-motion";
  import { useRef, useState } from "react";
  import SEOHead from "@/components/shared/SEOHead";
  import { BookOpen, ArrowUpRight, Lightbulb, Code2, TrendingUp, Brain, ChevronRight } from "lucide-react";

  const GOLD = "#F3BA2F";
  const fade = { hidden:{opacity:0,y:28}, show:(i=0)=>({opacity:1,y:0,transition:{duration:0.65,delay:i*0.08}}) };

  function InView({ children, custom=0 }: { children:React.ReactNode; custom?:number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref,{once:true,margin:"-80px"});
    return <motion.div ref={ref} initial="hidden" animate={inView?"show":"hidden"} variants={fade} custom={custom}>{children}</motion.div>;
  }

  const TRACKS = [
    {
      icon: <Code2 size={20}/>, color:"#F3BA2F", label:"BLOCKCHAIN FUNDAMENTALS",
      title:"Blockchain & Web3 Architecture",
      level:"Foundation → Advanced",
      modules:[
        { title:"What is Blockchain?", desc:"Distributed ledger technology, consensus mechanisms (PoW vs PoS), immutability, and decentralization principles." },
        { title:"Smart Contracts & Solidity", desc:"Writing, deploying, and auditing smart contracts. ERC-20, ERC-721 standards. Security vulnerabilities and fixes." },
        { title:"Polygon Layer-2 Explained", desc:"How Polygon scales Ethereum — sidechains, plasma, zkEVM rollups, and ultra-low gas fee architecture used by OKBOND." },
        { title:"DeFi — Decentralized Finance", desc:"AMMs, liquidity pools, yield farming, staking protocols. How OKBOND's Cycle-Based Activation Logic (CBAL) works." },
        { title:"Token Economics (Tokenomics)", desc:"Designing deflationary supply models, treasury-backed tokens, vesting schedules, and sustainable reward structures." },
      ]
    },
    {
      icon: <Brain size={20}/>, color:"#a78bfa", label:"ARTIFICIAL INTELLIGENCE",
      title:"AI & Machine Learning for Business",
      level:"Foundation → Enterprise",
      modules:[
        { title:"AI Automation Fundamentals", desc:"How OrakzaiX eliminates human latency in corporate operations. Workflow automation, API orchestration, AI agents." },
        { title:"LLMs in Enterprise", desc:"Deploying large language models for business intelligence, customer interaction, and document processing." },
        { title:"Machine Learning Pipelines", desc:"Data ingestion, model training, validation, and deployment. MLOps best practices for production environments." },
        { title:"AI + Blockchain Integration", desc:"How AI systems can interact with smart contracts, automate on-chain transactions, and verify data integrity." },
        { title:"Pakistan's AI Landscape", desc:"Current AI ecosystem in Pakistan, talent opportunities, regulatory environment, and global competitive positioning." },
      ]
    },
    {
      icon: <TrendingUp size={20}/>, color:"#34d399", label:"ENTREPRENEURSHIP",
      title:"Sovereign Entrepreneurship",
      level:"Mindset → Execution",
      modules:[
        { title:"Building from Adversity", desc:"How Faisal Orakzai built Orakzai Group from tribal KPK origins, displacement, and age-12 migration to Karachi." },
        { title:"Holding Company Architecture", desc:"How to structure a multi-vertical holding group — legal entities, IP protection, inter-company transactions." },
        { title:"Global Brand Building", desc:"From Pakistan to Silicon Valley — how to build a globally recognized brand from an emerging market." },
        { title:"Capital Formation Strategies", desc:"Bootstrapping vs venture capital, tokenization as alternative financing, and community-driven fundraising." },
        { title:"Vision 2040 Planning", desc:"Setting 15-year sovereign vision, milestone phasing, and building infrastructure that outlasts market cycles." },
      ]
    },
    {
      icon: <Lightbulb size={20}/>, color:"#f87171", label:"DIGITAL LUXURY & WEB3",
      title:"Web3 Luxury Commerce",
      level:"Business Strategy",
      modules:[
        { title:"Luxury Brand Authentication", desc:"How Shamim Forever uses cryptographic provenance tokens to guarantee authenticity and eliminate counterfeiting." },
        { title:"NFTs for Physical Products", desc:"Linking physical luxury items to NFT certificates — ownership transfer, resale tracking, provenance history." },
        { title:"Global Luxury Markets", desc:"Pakistan's luxury segment, diaspora commerce, and how to position an emerging-market brand globally." },
        { title:"DeFi + Luxury Convergence", desc:"Tokenizing luxury assets — perfumes, jewelry, rare goods — as on-chain financial instruments." },
        { title:"Marketing in Web3 Era", desc:"Community-first marketing, DAO governance models, ambassador programs, and viral token launch strategies." },
      ]
    },
  ];

  const INSIGHTS = [
    {
      category:"BLOCKCHAIN", tag:"Essay",
      title:"Why Polygon Layer-2 is Pakistan's Gateway to Global DeFi",
      excerpt:"Pakistan's remittance corridors and unbanked population create a unique opportunity for Layer-2 blockchain solutions. OKBOND's deployment on Polygon demonstrates how local entrepreneurs can bridge this gap without relying on traditional financial infrastructure.",
      year:"2026", readTime:"8 min",
      link:"https://hackernoon.com/u/faisalorakzai"
    },
    {
      category:"ENTREPRENEURSHIP", tag:"Framework",
      title:"The Sovereign Founder Framework — Building from Emerging Markets",
      excerpt:"A framework for founders in developing economies: how to leverage identity, scarcity, and authenticity as competitive advantages. The Orakzai approach to brand sovereignty starts with absolute clarity about origins and values.",
      year:"2026", readTime:"12 min",
      link:"https://www.linkedin.com/in/faisalorakzaii"
    },
    {
      category:"AI & AUTOMATION", tag:"Technical",
      title:"Eliminating Human Latency — The OrakzaiX Automation Philosophy",
      excerpt:"In enterprise environments, human decision-latency is the single largest efficiency bottleneck. OrakzaiX was designed specifically to identify, map, and eliminate these latency corridors through AI pipeline automation and intelligent orchestration.",
      year:"2026", readTime:"10 min",
      link:"https://faisalorakzai.com/research"
    },
    {
      category:"LUXURY & WEB3", tag:"Vision",
      title:"Museum-Grade Luxury in the Age of Blockchain",
      excerpt:"Shamim Forever represents a new category: luxury goods secured by cryptographic provenance. The convergence of craftsmanship and cryptography creates an entirely new paradigm for luxury authentication and anti-counterfeiting at global scale.",
      year:"2026", readTime:"7 min",
      link:"https://www.shamimforever.com"
    },
    {
      category:"TOKENOMICS", tag:"Technical",
      title:"OKBOND: Designing Deflationary Treasury-Backed Digital Assets",
      excerpt:"A deep dive into OKBOND's tokenomics: Cycle-Based Activation Logic (CBAL), the 10M hard-capped supply, treasury backing mechanisms, and how the protocol maintains capital protection through market cycles.",
      year:"2026", readTime:"15 min",
      link:"https://orakzaibond.com"
    },
    {
      category:"PAKISTAN TECH", tag:"Analysis",
      title:"Pakistan's Blockchain Renaissance — Data, Trends, Opportunities",
      excerpt:"With a young population, high mobile penetration, and massive remittance flows, Pakistan sits at the intersection of blockchain's most compelling use cases. Analysis of the regulatory landscape, talent ecosystem, and founder opportunities.",
      year:"2026", readTime:"9 min",
      link:"https://faisalorakzai.com/research"
    },
  ];

  const CONCEPTS = [
    { term:"OKBOND", def:"Orakzai Bond — a deflationary digital asset on Polygon L2 with 10M max supply and treasury-backed capital protection." },
    { term:"Polygon L2", def:"Ethereum Layer-2 scaling network offering ultra-low transaction fees and high throughput. OKBOND's native blockchain." },
    { term:"CBAL", def:"Cycle-Based Activation Logic — OKBOND's proprietary mechanism for phased token activation and supply management." },
    { term:"DeFi", def:"Decentralized Finance — financial services (lending, trading, yield) running on blockchain without intermediaries." },
    { term:"OrakzaiX", def:"Faisal Orakzai's AI automation framework designed to eliminate human latency in enterprise digital operations." },
    { term:"Provenance Token", def:"A cryptographic certificate on blockchain that proves the origin and authenticity of a physical luxury item." },
    { term:"SolidityScan", def:"Blockchain security audit platform. OKBOND's smart contract achieved a high security score on SolidityScan." },
    { term:"Sovereign Brand", def:"A brand built on irrevocable identity and heritage — Shamim Forever's positioning rooted in Orakzai tribal craft." },
  ];

  export default function Learning() {
    const [activeTrack, setActiveTrack] = useState(0);
    const [openModule, setOpenModule] = useState<number|null>(null);

    return (
      <>
        <SEOHead
          title="Learning Hub — Blockchain, AI & Entrepreneurship"
          description="Educational resources by Faisal Orakzai covering blockchain fundamentals, DeFi, AI automation, Web3 luxury commerce, and sovereign entrepreneurship from Pakistan to the world."
          path="/learning"
          keywords="blockchain learning Pakistan, DeFi education, Faisal Orakzai insights, OKBOND tokenomics explained, AI automation tutorials"
        />
        <div className="min-h-screen bg-black text-white">

          {/* Hero */}
          <section className="pt-32 pb-20 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <motion.div initial="hidden" animate="show" variants={fade} custom={0}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Knowledge Repository</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                  Learn.<br/>
                  <span style={{color:GOLD}}>Build.</span><br/>
                  Dominate.
                </h1>
                <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
                  Insights, frameworks, and knowledge from Faisal Orakzai's journey building
                  Orakzai Group — covering blockchain architecture, AI automation,
                  sovereign entrepreneurship, and Web3 luxury commerce.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Learning Tracks */}
          <section className="py-24 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <InView>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Learning Tracks</span>
                </div>
                <h2 className="text-4xl font-black mb-12">Four Paths.<br/><span className="text-white/40">One Direction.</span></h2>
              </InView>

              {/* Track Tabs */}
              <div className="flex flex-wrap gap-2 mb-10">
                {TRACKS.map((t,i) => (
                  <button key={t.label} onClick={()=>{setActiveTrack(i);setOpenModule(null);}}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest uppercase transition-colors ${activeTrack===i ? "bg-[#F3BA2F] text-black" : "border border-white/10 text-white/40 hover:border-[#F3BA2F]/40 hover:text-[#F3BA2F]/60"}`}>
                    <span style={{color:activeTrack===i?"black":t.color}}>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Active Track Content */}
              {(() => {
                const t = TRACKS[activeTrack];
                return (
                  <motion.div key={activeTrack} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}}>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{t.title}</h3>
                        <span className="font-mono text-xs text-white/40 tracking-widest">{t.level}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {t.modules.map((m,i) => (
                        <div key={m.title} className="border border-white/8 hover:border-[#F3BA2F]/20 transition-colors">
                          <button className="w-full flex items-center justify-between p-5 text-left"
                            onClick={()=>setOpenModule(openModule===i?null:i)}>
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-[10px] text-white/25">{String(i+1).padStart(2,"0")}</span>
                              <span className="font-semibold">{m.title}</span>
                            </div>
                            <ChevronRight size={16} className={`text-[#F3BA2F]/40 transition-transform ${openModule===i?"rotate-90":""}`} />
                          </button>
                          {openModule===i && (
                            <div className="px-5 pb-5 pt-0">
                              <div className="pl-10 text-sm text-white/55 leading-relaxed">{m.desc}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </section>

          {/* Published Insights */}
          <section className="py-24 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <InView>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Published Insights</span>
                </div>
                <h2 className="text-4xl font-black mb-16">Faisal Orakzai's<br/><span className="text-white/40">Written Work</span></h2>
              </InView>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INSIGHTS.map((a,i) => (
                  <InView key={a.title} custom={i*0.06}>
                    <a href={a.link} target="_blank" rel="noopener noreferrer"
                       className="flex flex-col border border-white/8 p-6 hover:border-[#F3BA2F]/30 transition-colors group h-full">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#F3BA2F]/60">{a.category}</span>
                        <span className="font-mono text-[9px] px-2 py-0.5 border border-white/10 text-white/30">{a.tag}</span>
                      </div>
                      <h3 className="font-bold text-base leading-snug mb-3 group-hover:text-[#F3BA2F] transition-colors flex-1">{a.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed mb-4">{a.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3 text-white/30 text-xs font-mono">
                          <span>{a.year}</span>
                          <span>·</span>
                          <span>{a.readTime} read</span>
                        </div>
                        <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#F3BA2F] transition-colors"/>
                      </div>
                    </a>
                  </InView>
                ))}
              </div>
            </div>
          </section>

          {/* Concepts Glossary */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <InView>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Glossary</span>
                </div>
                <h2 className="text-4xl font-black mb-16">Key<br/><span className="text-white/40">Concepts</span></h2>
              </InView>
              <div className="grid md:grid-cols-2 gap-4">
                {CONCEPTS.map((c,i) => (
                  <InView key={c.term} custom={i*0.05}>
                    <div className="flex gap-4 border border-white/6 p-5 hover:border-[#F3BA2F]/15 transition-colors">
                      <span className="text-[#F3BA2F] font-black font-mono text-xs shrink-0 w-32 pt-0.5">{c.term}</span>
                      <p className="text-white/50 text-sm leading-relaxed">{c.def}</p>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </section>

        </div>
      </>
    );
  }
  