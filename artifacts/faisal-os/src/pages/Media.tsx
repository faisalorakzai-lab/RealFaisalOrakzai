import { motion, useInView, AnimatePresence } from "framer-motion";
  import { useRef, useState } from "react";
  import SEOHead from "@/components/shared/SEOHead";
  import { X, MapPin, Calendar, ExternalLink, Play } from "lucide-react";

  const GOLD = "#F3BA2F";
  const fade = { hidden:{opacity:0,y:28}, show:(i=0)=>({opacity:1,y:0,transition:{duration:0.65,delay:i*0.08}}) };

  function InView({ children, custom=0, className="" }: { children:React.ReactNode; custom?:number; className?:string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref,{once:true,margin:"-60px"});
    return <motion.div ref={ref} className={className} initial="hidden" animate={inView?"show":"hidden"} variants={fade} custom={custom}>{children}</motion.div>;
  }

  const GALLERY = [
    { src:"/story/story-01.jpg", caption:"Orakzai Executive Studio",    year:"2026", location:"Karachi, Pakistan" },
    { src:"/story/story-02.jpg", caption:"Global Vision — World Stage", year:"2026", location:"International" },
    { src:"/story/story-03.png", caption:"The Chairman",                year:"2026", location:"Karachi, Pakistan" },
    { src:"/story/story-04.webp", caption:"GMA Silicon Valley Summit",   year:"2025", location:"Silicon Valley, USA" },
    { src:"/story/story-05.png", caption:"Building the Future",         year:"2026", location:"Karachi, Pakistan" },
    { src:"/story/story-06.webp", caption:"Orakzai Headquarters",        year:"2026", location:"Karachi, Pakistan" },
    { src:"/story/story-07.webp", caption:"Dubai — Global Expansion",    year:"2024", location:"Dubai, UAE" },
    { src:"/story/story-08.webp", caption:"Karachi — The Pivot",         year:"2024", location:"Karachi, Pakistan" },
    { src:"/story/story-09.webp", caption:"Roots — Identity Preserved",  year:"2023", location:"KPK, Pakistan" },
    { src:"/story/story-10.webp", caption:"KPK — The Origin",            year:"2021", location:"Orakzai Agency, KPK" },
    { src:"/story/story-11.webp", caption:"Karachi Coastline",           year:"2022", location:"Karachi, Pakistan" },
    { src:"/story/story-12.jpg", caption:"Vision from the Heights",     year:"2022", location:"Pakistan" },
    { src:"/story/story-13.webp", caption:"Metropolitan Network",        year:"2023", location:"Karachi, Pakistan" },
    { src:"/story/story-14.webp", caption:"Orakzai Agency — Genesis",    year:"2020", location:"Orakzai Agency, KPK" },
    { src:"/story/story-15.webp", caption:"Sovereign Vision",            year:"2025", location:"International" },
    { src:"/story/story-16.webp", caption:"The Architect",               year:"2025", location:"Karachi, Pakistan" },
    { src:"/story/story-17.webp", caption:"Heritage & Legacy",           year:"2024", location:"KPK, Pakistan" },
    { src:"/story/story-18.webp", caption:"Rising Leader",               year:"2024", location:"Karachi, Pakistan" },
    { src:"/story/story-19.webp", caption:"Orakzai Nation",              year:"2023", location:"Pakistan" },
    { src:"/story/story-20.webp", caption:"Genesis Point",               year:"2019", location:"Orakzai Agency, KPK" },
  ];

  const APPEARANCES = [
    {
      event:"GMA Silicon Valley Global Blockchain Conference",
      date:"2025", location:"Silicon Valley, California, USA",
      type:"CONFERENCE", color:"#F3BA2F",
      desc:"Recognized as an emerging blockchain leader from Pakistan. Speaker and award recipient at one of Silicon Valley's premier blockchain summits. Represented Pakistan's growing tech ecosystem on the global stage.",
      link:"https://faisalorakzai.com/press",
    },
    {
      event:"Stevie Awards — Gold for Technology Innovation",
      date:"2026", location:"International",
      type:"AWARD", color:"#34d399",
      desc:"Orakzai Group received the prestigious Stevie Gold Award for Technology Innovation 2026 — one of the world's most competitive business awards programs recognizing exceptional innovation in technology.",
      link:"https://faisalorakzai.com/press",
    },
    {
      event:"Wall Street — Global Blockchain Summit",
      date:"2025", location:"Wall Street, New York City, USA",
      type:"SUMMIT", color:"#a78bfa",
      desc:"Represented Orakzai Bond (OKBOND) at the global blockchain summit on Wall Street. Engaged with institutional investors, fund managers, and blockchain infrastructure builders on decentralized finance and tokenomics.",
      link:"https://orakzaibond.com",
    },
    {
      event:"Dusseldorf International Expansion Summit",
      date:"2024", location:"Dusseldorf, Germany",
      type:"EXPANSION", color:"#f87171",
      desc:"Represented Orakzai Group in Dusseldorf, Germany for European market outreach and international expansion discussions. Established key European partnership frameworks for Shamim Forever and OKBOND.",
      link:"https://www.shamimforever.com",
    },
    {
      event:"Dubai Global Ventures Forum",
      date:"2024", location:"Dubai, UAE",
      type:"FORUM", color:"#fbbf24",
      desc:"Participated in Dubai's global ventures forum, exploring Middle East market entry for Orakzai Group ventures. UAE is a key target market for Shamim Forever luxury distribution and OKBOND DeFi adoption.",
      link:"https://faisalorakzai.com/ecosystem",
    },
    {
      event:"Pakistan Blockchain Summit — Keynote",
      date:"2025", location:"Karachi, Pakistan",
      type:"KEYNOTE", color:"#06b6d4",
      desc:"Delivered keynote address on Pakistan's blockchain renaissance — covering OKBOND's architecture, the case for Polygon L2 in emerging markets, and the Orakzai model for sovereign digital asset infrastructure.",
      link:"https://faisalorakzai.com/research",
    },
  ];

  const PRESS_LINKS = [
      { pub:"Google Panel",    type:"KNOWLEDGE GRAPH",  title:"Muhammad Faisal Orakzai — Google Knowledge Panel",                                    url:"https://www.google.com/search?q=Muhammad+Faisal+Orakzai", logo:"/logos/google.webp" },
      { pub:"Wikidata",        type:"KNOWLEDGE GRAPH",  title:"Muhammad Faisal Orakzai — Q140264666",                                                url:"https://www.wikidata.org/wiki/Q140264666",                logo:"/logos/wikidata.webp" },
      { pub:"Crunchbase",      type:"INVESTOR NETWORK", title:"Faisal Orakzai — Founder & Chairman @ Orakzai Group (Rank #28)",                      url:"https://www.crunchbase.com/person/faisal-orakzai",        logo:null },
      { pub:"EveryBodyWiki",   type:"ENCYCLOPEDIA",     title:"Faisal Orakzai — Entrepreneur, Blockchain",                                           url:"https://en.everybodywiki.com/Faisal_Orakzai",            logo:"/logos/everybodywiki.webp" },
      { pub:"ORCID",           type:"RESEARCH ID",      title:"Muhammad Faisal Orakzai — 0009-0000-0915-7272",                                       url:"https://orcid.org/0009-0000-0915-7272",                  logo:"/logos/orcid.webp" },
      { pub:"Orakzai Bond",    type:"VENTURE · LIVE",   title:"OKBOND — Polygon L2 Blockchain Token",                                               url:"https://orakzaibond.com",                                logo:"/logos/orakzai-bond.webp" },
      { pub:"Shamim Forever",  type:"VENTURE · LIVE",   title:"Faisal Orakzai — Founder & Blockchain Architect",                                    url:"https://www.shamimforever.com",                          logo:"/logos/shamim-forever.webp" },
      { pub:"Wellfound",       type:"STARTUP",          title:"Faisal Orakzai — Startup Profile",                                                   url:"https://wellfound.com/u/faisal-orakzai-1",               logo:"/logos/wellfound.png" },
      { pub:"Tracxn · OKBOND", type:"VENTURE · LIVE",   title:"OKBOND — Tracxn Company Profile",                                                    url:"https://tracxn.com/d/companies/okbond",                  logo:"/logos/tracxn.webp" },
      { pub:"PRLog",           type:"PRESS",            title:"Young Pakistani Entrepreneur Expands Global Vision Through OKBOND and Shamim Forever", url:"https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html", logo:null },
      { pub:"Hackernoon",      type:"PRESS",            title:"Faisal Orakzai — Blockchain Architect, Author",                                       url:"https://hackernoon.com/u/faisalorakzai",                 logo:null },
      { pub:"F6S",             type:"STARTUP",          title:"Faisal Orakzai — Founder Profile",                                                   url:"https://www.f6s.com/faisalorakzai",                      logo:null },
    ];

  type GalleryItem = typeof GALLERY[0];

  export default function Media() {
    const [lightbox, setLightbox] = useState<GalleryItem|null>(null);
    const [activeFilter, setActiveFilter] = useState("All");

    const years = ["All", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"];
    const filtered = activeFilter === "All" ? GALLERY : GALLERY.filter(g => g.year === activeFilter);

    return (
      <>
        <SEOHead
          title="Media Gallery — Faisal Orakzai | Events, Conferences & Campaigns"
          description="Photo gallery, conference appearances, and press coverage of Faisal Orakzai — GMA Silicon Valley, Wall Street NY, Dusseldorf Germany, Stevie Awards, and Pakistan events."
          path="/media"
          keywords="Faisal Orakzai photos, GMA Silicon Valley, Orakzai Group events, blockchain conference Pakistan, Stevie Awards 2026"
        />
        <div className="min-h-screen bg-black text-white">

          {/* Hero */}
          <section className="pt-32 pb-20 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <motion.div initial="hidden" animate="show" variants={fade} custom={0}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Media Archive</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                  Global<br/>
                  <span style={{color:GOLD}}>Presence</span>
                </h1>
                <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
                  From Orakzai Agency KPK to Silicon Valley — a visual archive of Faisal Orakzai's
                  journey across 3 continents, 6+ countries, and dozens of international
                  stages, conferences, and media appearances.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <section className="border-b border-[#F3BA2F]/10 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value:"3+", label:"CONTINENTS COVERED" },
                { value:"6+", label:"COUNTRIES VISITED" },
                { value:"20+", label:"EVENTS & CONFERENCES" },
                { value:"2019–2026", label:"DOCUMENTED JOURNEY" },
              ].map((s,i) => (
                <motion.div key={s.label} initial="hidden" animate="show" variants={fade} custom={i*0.08}>
                  <div className="text-4xl font-black mb-1" style={{color:GOLD}}>{s.value}</div>
                  <div className="text-white/40 font-mono text-[9px] tracking-widest uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Photo Gallery */}
          <section className="py-24 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <InView>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Photo Archive</span>
                </div>
                <h2 className="text-4xl font-black mb-8">Visual<br/><span className="text-white/40">Chronicle</span></h2>
              </InView>

              {/* Year filter */}
              <div className="flex flex-wrap gap-2 mb-10">
                {years.map(y => (
                  <button key={y} onClick={()=>setActiveFilter(y)}
                    className={`px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-colors ${activeFilter===y?"bg-[#F3BA2F] text-black":"border border-white/10 text-white/40 hover:border-[#F3BA2F]/40 hover:text-[#F3BA2F]/60"}`}>
                    {y}
                  </button>
                ))}
              </div>

              {/* Masonry-style Grid */}
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((img, i) => (
                    <motion.button key={img.src} layout initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.9}}
                      transition={{duration:0.3,delay:i*0.03}}
                      onClick={()=>setLightbox(img)}
                      className={`relative group overflow-hidden bg-white/5 ${i % 7 === 0 || i % 7 === 4 ? "col-span-2 row-span-2" : ""}`}
                      style={{aspectRatio: (i%7===0||i%7===4) ? "1.5/1" : "1/1"}}>
                      <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                        <div className="text-white font-semibold text-sm mb-1">{img.caption}</div>
                        <div className="flex items-center gap-2 text-[#F3BA2F] text-xs font-mono">
                          <MapPin size={10}/> {img.location}
                          <span className="text-white/30">·</span>
                          {img.year}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Lightbox */}
          <AnimatePresence>
            {lightbox && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
                onClick={()=>setLightbox(null)}>
                <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}}
                  className="relative max-w-4xl w-full" onClick={e=>e.stopPropagation()}>
                  <button onClick={()=>setLightbox(null)}
                    className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors z-10">
                    <X size={28}/>
                  </button>
                  <img src={lightbox.src} alt={lightbox.caption} className="w-full max-h-[75vh] object-contain" />
                  <div className="mt-4 flex items-start justify-between">
                    <div>
                      <div className="font-bold text-lg mb-1">{lightbox.caption}</div>
                      <div className="flex items-center gap-3 text-white/40 text-sm font-mono">
                        <MapPin size={12}/> {lightbox.location}
                        <span>·</span>
                        <Calendar size={12}/> {lightbox.year}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Appearances */}
          <section className="py-24 px-6 border-b border-[#F3BA2F]/10">
            <div className="max-w-7xl mx-auto">
              <InView>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Global Appearances</span>
                </div>
                <h2 className="text-4xl font-black mb-16">Stages &<br/><span className="text-white/40">Summits</span></h2>
              </InView>
              <div className="space-y-6">
                {APPEARANCES.map((a,i) => (
                  <InView key={a.event} custom={i*0.08}>
                    <div className="border border-white/8 p-6 md:p-8 hover:border-[#F3BA2F]/20 transition-colors group">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex-shrink-0">
                          <span className="font-mono text-[9px] tracking-[0.3em] px-3 py-1 border text-xs uppercase"
                            style={{borderColor:a.color+"40",color:a.color}}>{a.type}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-[#F3BA2F] transition-colors">{a.event}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-white/40 text-xs font-mono mb-4">
                            <span className="flex items-center gap-1"><MapPin size={10}/>{a.location}</span>
                            <span className="flex items-center gap-1"><Calendar size={10}/>{a.date}</span>
                          </div>
                          <p className="text-white/55 text-sm leading-relaxed">{a.desc}</p>
                        </div>
                        <a href={a.link} target="_blank" rel="noopener noreferrer"
                           className="flex-shrink-0 flex items-center gap-1 text-white/20 hover:text-[#F3BA2F] transition-colors text-xs font-mono">
                          Details <ExternalLink size={12}/>
                        </a>
                      </div>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </section>

          {/* Press Coverage */}
          <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <InView>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-[#F3BA2F]" />
                  <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Press Coverage</span>
                </div>
                <h2 className="text-4xl font-black mb-16">As Seen<br/><span className="text-white/40">In</span></h2>
              </InView>
              <div className="grid md:grid-cols-2 gap-3">
                  {PRESS_LINKS.map((p,i) => (
                    <InView key={p.pub} custom={i*0.06}>
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-3 border border-white/8 p-4 hover:border-[#F3BA2F]/30 transition-colors group rounded-sm">
                        <div className="w-11 h-11 rounded-lg shrink-0 flex items-center justify-center overflow-hidden bg-white/5 border border-white/8">
                          {p.logo ? (
                            <img src={p.logo} alt={p.pub} className="w-full h-full object-contain p-1.5" />
                          ) : (
                            <span className="font-mono text-[8px] font-bold text-[#F3BA2F] text-center leading-tight">{p.pub.slice(0,3).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono text-[10px] text-[#F3BA2F] tracking-widest uppercase leading-none">{p.pub}</span>
                            {p.type && <span className="font-mono text-[7px] text-white/30 tracking-wider border border-white/10 px-1 py-px rounded leading-none">{p.type}</span>}
                          </div>
                          <span className="text-white/55 text-xs group-hover:text-white/80 transition-colors leading-snug line-clamp-2 block">{p.title}</span>
                        </div>
                        <ExternalLink size={13} className="text-white/20 group-hover:text-[#F3BA2F] transition-colors shrink-0"/>
                      </a>
                    </InView>
                  ))}
                </div>
            </div>
          </section>

        </div>
      </>
    );
  }
  