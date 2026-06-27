import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1 } }),
};

const GALLERY = [
  { src: "/gallery/g01.png",  caption: "Orakzai Executive Studio",    year: "2026" },
  { src: "/gallery/g02.png",  caption: "Global Vision — World Stage", year: "2026" },
  { src: "/gallery/g14.png",  caption: "The Chairman",                year: "2026" },
  { src: "/gallery/g13.png",  caption: "GMA Silicon Valley Summit",   year: "2026" },
  { src: "/gallery/g03.jpg",  caption: "Building the Future",         year: "2026" },
  { src: "/gallery/g04.jpg",  caption: "Orakzai Headquarters",        year: "2026" },
  { src: "/gallery/g05.jpg",  caption: "Dubai — Global Expansion",    year: "2024" },
  { src: "/gallery/g06.jpg",  caption: "Karachi — The Pivot",         year: "2024" },
  { src: "/gallery/g07.jpg",  caption: "Roots — Identity Preserved",  year: "2023" },
  { src: "/gallery/g08.jpg",  caption: "KPK — The Origin",            year: "2021" },
  { src: "/gallery/g09.jpg",  caption: "Karachi Coastline",           year: "2022" },
  { src: "/gallery/g10.jpg",  caption: "Vision from the Heights",     year: "2022" },
  { src: "/gallery/g11.jpg",  caption: "Metropolitan Network",        year: "2023" },
  { src: "/gallery/g12.jpg",  caption: "Orakzai Agency — Genesis",    year: "2020" },
];

// Book spreads: 2 photos per page
const BOOK_SPREADS = [];
for (let i = 0; i < GALLERY.length; i += 2) {
  BOOK_SPREADS.push([GALLERY[i], GALLERY[i + 1] || GALLERY[0]]);
}

const TIMELINE = [
  {
    phase: "PHASE I",
    label: "GENESIS NODE",
    range: "2006 – 2017",
    events: [
      { year: "2006", title: "Birth Matrix", body: "Muhammad Faisal Orakzai (فیصل اورکزئی) is born on April 30, 2006, in Mamuzai, Orakzai Agency, Tirah, Khyber Pakhtunkhwa — rugged tribal terrain that forged an uncommon resilience." },
      { year: "2010", title: "The Displacement Corridor", body: "Regional conflicts intensify. The family undergoes strategic relocation to Kohat. Faisal manages rural livestock assets in the mountains — anchoring an early, visceral understanding of decentralized resource management." },
      { year: "2011–2017", title: "Academic Foundations", body: "Parallel processing of traditional and modern systems. Enrolled at Madrassa Mahad-ul-Uleman alongside formal primary schooling at Yahya Public School, Kohat — developing sharp analytical and disciplined cognitive frameworks." },
    ],
  },
  {
    phase: "PHASE II",
    label: "METROPOLITAN SHIFT",
    range: "2018 – 2023",
    events: [
      { year: "2018", title: "The Karachi Core Deployment", body: "At just 12 years old, facing heavy family challenges, Faisal executes a high-risk transition to the economic capital, Karachi. Living in PECHS, he enters the cutthroat micro-markets of local real estate." },
      { year: "2019–2021", title: "Tri-City Real Estate Nexus", body: "Through rigorous self-study and high-level local mentorship, expands real estate brokerage and arbitrage networks across a tri-city grid: Karachi, Peshawar, and Kohat. Establishes the parent umbrella corporate identity: Orakzai Group." },
      { year: "2022–2023", title: "The Technical Pivot", body: "Recognizing that physical real estate lacks rapid scalability, Faisal pivots to global technology systems. Begins intensive research into digital asset custody, algorithmic trading, and system design — enrolling at Ziauddin Medical University (SMC) for elite structural academic paradigms." },
    ],
  },
  {
    phase: "PHASE III",
    label: "BLOCKCHAIN ARTIFACTS",
    range: "2024 – 2026",
    events: [
      { year: "2024–2025", title: "Global Network Assembly", body: "Orakzai Group evolves into a tech infrastructure lab. Engineers early database schemas for Orakzai Ventures. Expands horizons via institutional gateway networks spanning Dubai and Düsseldorf, Germany — absorbing BlackRock-level tokenization aesthetics." },
      { year: "Early 2026", title: "High-Throughput Automation Era", body: "Launches OrakzaiX and AdamX — high-throughput AI and machine-learning automation frameworks designed to eliminate human latency in corporate digital operations." },
      { year: "April 2026", title: "Orakzai Bond Launch", body: "Architecturally deploys Orakzai Bond (OKBOND) natively on Polygon Layer-2 — a deflationary, 10-million maximum supply, treasury-backed capital protection framework utilizing Cycle-Based Activation Logic with high industrial validation on SolidityScan." },
      { year: "June 2026", title: "Cryptographic Provenance", body: "Integrates Web3 networks with ultra-luxury markets. Takes ownership as Founder & Owner of Shamim Forever — a museum-grade luxury brand (perfumes, bespoke sapphire jewelry, cosmetics) secured through cryptographic provenance tokens to eliminate global counterfeits." },
    ],
  },
  {
    phase: "PHASE IV",
    label: "SOVEREIGN PROJECTIONS",
    range: "2027 – 2040",
    future: true,
    events: [
      { year: "2027–2030", title: "OreC Protocol Horizon", body: "Complete deployment of the OreC Protocol — tokenizing multi-million dollar institutional real estate nodes across Pakistan and UAE into tradeable digital fractions under OKBOND." },
      { year: "2031–2035", title: "Automated Global OTC Framework", body: "Launching the OKBOND Over-The-Counter (OTC) ecosystem application globally — integrating micro-mobility services, automated wealth distribution matrix, and high-end fractional investment layers." },
      { year: "2036–2040", title: "The Autonomous Sovereign Conglomerate", body: "Transitioning Orakzai Group into a fully autonomous, cross-border digital nation asset class — operating where artificial intelligence, blockchain custody, and luxury consumer markets merge into a self-sustaining economic system." },
    ],
  },
];

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
  // ── Main Slideshow ──
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideshowTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => setActiveSlide(v => (v + 1) % GALLERY.length), []);
  const prevSlide = useCallback(() => setActiveSlide(v => (v - 1 + GALLERY.length) % GALLERY.length), []);

  useEffect(() => {
    if (isPaused) return;
    slideshowTimer.current = setInterval(nextSlide, 3000);
    return () => { if (slideshowTimer.current) clearInterval(slideshowTimer.current); };
  }, [isPaused, nextSlide]);

  // ── Book Gallery ──
  const [bookPage, setBookPage] = useState(0);
  const [bookPaused, setBookPaused] = useState(false);
  const bookTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const nextBook = useCallback(() => setBookPage(v => (v + 1) % BOOK_SPREADS.length), []);
  const prevBook = useCallback(() => setBookPage(v => (v - 1 + BOOK_SPREADS.length) % BOOK_SPREADS.length), []);

  useEffect(() => {
    if (bookPaused) return;
    bookTimer.current = setInterval(nextBook, 4000);
    return () => { if (bookTimer.current) clearInterval(bookTimer.current); };
  }, [bookPaused, nextBook]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setBookPaused(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) nextBook(); else prevBook();
    }
    setTimeout(() => setBookPaused(false), 3000);
  };

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-16 border-b border-[#F3BA2F]/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(243,186,47,0.04) 0%, transparent 65%)", transform: "translate(20%,-20%)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/25 mb-8">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]" animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 0.9 }} />
            <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em]">THE STORY · فیصل اورکزئی</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-4">
            FAISAL<br /><span className="gold-gradient">ORAKZAI</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/35 font-mono text-xs tracking-[0.35em] mb-8 uppercase">
            Born April 30, 2006 · Orakzai Agency, KPK, Pakistan · Founder & Chairman, Orakzai Group
          </motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="text-white/60 text-xl leading-relaxed max-w-2xl font-light">
            From the mountains of Orakzai Agency to architecting blockchain infrastructure on Polygon —
            <span className="text-[#F3BA2F]"> a sovereign builder's journey across four decades of vision.</span>
          </motion.p>
        </div>
      </section>

      {/* ── MAIN SLIDESHOW ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: "90vh", maxHeight: "900px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(243,186,47,0.04) 0%, transparent 70%)" }} />

        <AnimatePresence mode="crossfade">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 z-[1]"
          >
            <img
              src={GALLERY[activeSlide].src}
              alt={GALLERY[activeSlide].caption}
              className="w-full h-full object-cover object-top"
              style={{ filter: "brightness(0.88) contrast(1.05)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.25) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)" }} />
          </motion.div>
        </AnimatePresence>

        {/* Corner brackets */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#F3BA2F]/50 z-10" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#F3BA2F]/50 z-10" />
        <div className="absolute bottom-20 left-6 w-12 h-12 border-b-2 border-l-2 border-[#F3BA2F]/50 z-10" />
        <div className="absolute bottom-20 right-6 w-12 h-12 border-b-2 border-r-2 border-[#F3BA2F]/50 z-10" />

        {/* HUD top */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/30 bg-black/50 backdrop-blur-sm">
          <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]" animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
          <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em]">GALLERY · {String(activeSlide + 1).padStart(2,"0")}/{String(GALLERY.length).padStart(2,"0")}</span>
        </div>

        {/* Bottom info + nav */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 flex items-end justify-between">
          <AnimatePresence mode="wait">
            <motion.div key={activeSlide} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-[#F3BA2F] font-mono text-[10px] tracking-widest mb-1">{GALLERY[activeSlide].year}</div>
              <div className="text-white font-bold text-xl">{GALLERY[activeSlide].caption}</div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center gap-3">
            <button onClick={prevSlide} className="w-10 h-10 border border-[#F3BA2F]/30 flex items-center justify-center text-[#F3BA2F] hover:bg-[#F3BA2F]/10 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={nextSlide} className="w-10 h-10 border border-[#F3BA2F]/30 flex items-center justify-center text-[#F3BA2F] hover:bg-[#F3BA2F]/10 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
          {GALLERY.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)} className="relative h-[3px] transition-all duration-300"
              style={{ width: i === activeSlide ? "24px" : "8px", background: i === activeSlide ? "#F3BA2F" : "rgba(255,255,255,0.2)" }} />
          ))}
        </div>
      </section>

      {/* ── BOOK GALLERY ── */}
      <section className="py-20 border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] uppercase">Photo Archive · Book View</span>
              <div className="h-px flex-1 bg-[#F3BA2F]/10" />
              <span className="text-white/20 font-mono text-[10px] tracking-widest">{String(bookPage + 1).padStart(2,"0")} / {String(BOOK_SPREADS.length).padStart(2,"0")}</span>
            </div>
          </motion.div>

          {/* Book container */}
          <div
            className="relative select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setBookPaused(true)}
            onMouseLeave={() => setBookPaused(false)}
          >
            <AnimatePresence mode="crossfade">
              <motion.div
                key={bookPage}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-2 gap-1"
                style={{ aspectRatio: "16/9" }}
              >
                {/* LEFT PAGE */}
                <div className="relative overflow-hidden" style={{ borderRight: "3px solid rgba(0,0,0,0.8)" }}>
                  {/* Book spine shadow */}
                  <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)" }} />
                  <img
                    src={BOOK_SPREADS[bookPage][0].src}
                    alt={BOOK_SPREADS[bookPage][0].caption}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                  {/* Page number */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="text-[#F3BA2F] font-mono text-[9px] tracking-widest mb-1">{BOOK_SPREADS[bookPage][0].year}</div>
                    <div className="text-white/80 text-sm font-medium">{BOOK_SPREADS[bookPage][0].caption}</div>
                  </div>
                  <div className="absolute top-3 left-3 font-mono text-[9px] text-white/20 z-10">{String(bookPage * 2 + 1).padStart(2,"0")}</div>
                  {/* Left page edge lines (book texture) */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#F3BA2F]/15 z-10" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F3BA2F]/15 z-10" />
                </div>

                {/* RIGHT PAGE */}
                <div className="relative overflow-hidden" style={{ borderLeft: "3px solid rgba(0,0,0,0.8)" }}>
                  {/* Book spine shadow */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 100%)" }} />
                  <img
                    src={BOOK_SPREADS[bookPage][1].src}
                    alt={BOOK_SPREADS[bookPage][1].caption}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.9) contrast(1.05)" }}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                  <div className="absolute bottom-4 right-4 z-10 text-right">
                    <div className="text-[#F3BA2F] font-mono text-[9px] tracking-widest mb-1">{BOOK_SPREADS[bookPage][1].year}</div>
                    <div className="text-white/80 text-sm font-medium">{BOOK_SPREADS[bookPage][1].caption}</div>
                  </div>
                  <div className="absolute top-3 right-3 font-mono text-[9px] text-white/20 z-10">{String(bookPage * 2 + 2).padStart(2,"0")}</div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-[#F3BA2F]/15 z-10" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F3BA2F]/15 z-10" />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev/Next Arrows */}
            <button
              onClick={prevBook}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-[#F3BA2F]/30 bg-black/70 backdrop-blur-sm flex items-center justify-center text-[#F3BA2F] hover:bg-[#F3BA2F]/10 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextBook}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 border border-[#F3BA2F]/30 bg-black/70 backdrop-blur-sm flex items-center justify-center text-[#F3BA2F] hover:bg-[#F3BA2F]/10 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Book page dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {BOOK_SPREADS.map((_, i) => (
              <button key={i} onClick={() => setBookPage(i)}
                className="transition-all duration-300 h-[3px]"
                style={{ width: i === bookPage ? "28px" : "10px", background: i === bookPage ? "#F3BA2F" : "rgba(255,255,255,0.15)" }}
              />
            ))}
          </div>
          <p className="text-center text-white/20 font-mono text-[10px] tracking-widest mt-3">SWIPE OR TAP ARROWS TO TURN PAGES</p>
        </div>
      </section>

      {/* ── SOVEREIGN TIMELINE ── */}
      <section className="py-28 border-t border-[#F3BA2F]/10 relative">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(243,186,47,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Sovereign Timeline Blueprint</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              2006 <span className="text-white/20">—</span> <span className="gold-gradient">2040</span>
            </h2>
          </motion.div>

          <div className="space-y-20">
            {TIMELINE.map((phase, pi) => (
              <motion.div key={pi} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="font-mono text-[10px] tracking-[0.35em] text-[#F3BA2F]/50">{phase.phase}</div>
                  <div className="h-px flex-1 bg-[#F3BA2F]/12" />
                  <div className={`font-bold text-lg tracking-wider ${phase.future ? "text-[#F3BA2F]/40" : "text-[#F3BA2F]"}`}>{phase.label}</div>
                  <div className="font-mono text-[10px] tracking-widest text-white/25">{phase.range}</div>
                </div>

                <div className="space-y-4 pl-4">
                  {phase.events.map((ev, ei) => (
                    <motion.div key={ei} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: ei * 0.1 }} viewport={{ once: true }}
                      className="timeline-node-card group relative p-6 pl-8"
                      style={{ background: "rgba(10,10,10,0.65)", backdropFilter: "blur(12px)", borderLeft: `2px solid ${phase.future ? "rgba(243,186,47,0.25)" : "#F3BA2F"}`, borderTop: "1px solid rgba(255,255,255,0.03)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                      <div className="absolute -left-[9px] top-7 w-4 h-4 border-2 border-[#F3BA2F] bg-black" style={{ transform: "rotate(45deg)", opacity: phase.future ? 0.3 : 1 }} />
                      <div className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] mb-2">{ev.year}</div>
                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#F3BA2F] transition-colors duration-300">{ev.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{ev.body}</p>
                      <div className="absolute top-0 left-0 right-0 h-px bg-[#F3BA2F]/0 group-hover:bg-[#F3BA2F]/20 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOCUSES ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em]">OPERATIONAL FOCUS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Where I Deploy Capital & Energy</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F3BA2F]/8">
            {focuses.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className="bg-black p-8 group hover:bg-[#F3BA2F]/3 transition-colors duration-300">
                <div className="text-[#F3BA2F]/40 font-mono text-[10px] mb-3 tracking-widest">0{i + 1}</div>
                <div className="text-white/70 text-base font-light leading-relaxed group-hover:text-white transition-colors duration-300">{f}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em]">CORE PRINCIPLES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">The Framework I Operate By</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="relative p-8 border border-[#F3BA2F]/10 group hover:border-[#F3BA2F]/30 transition-all duration-400 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 80% 80% at 0% 0%, rgba(243,186,47,0.04) 0%, transparent 60%)" }} />
                <div className="text-[#F3BA2F]/30 font-mono text-[10px] mb-4 tracking-widest">0{i + 1}</div>
                <h3 className="text-white font-bold text-xl mb-3">{p.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10 pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/20 font-mono text-[10px] tracking-[0.35em] mb-6 uppercase">Next Step</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              Explore the Ecosystem<br /><span className="gold-gradient">Faisal Orakzai Built</span>
            </h2>
            <Link href="/ecosystem">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-3 px-10 py-5 bg-[#F3BA2F] text-black font-bold tracking-widest text-sm cursor-pointer hover:bg-[#ffd666] transition-colors">
                ENTER THE ECOSYSTEM <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        .timeline-node-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .timeline-node-card:hover { border-left-color: #ffffff !important; box-shadow: 0 0 30px rgba(243,186,47,0.1); transform: translateX(5px); }
      `}</style>
    </div>
  );
}
