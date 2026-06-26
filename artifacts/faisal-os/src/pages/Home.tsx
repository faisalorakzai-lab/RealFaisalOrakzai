import { useEffect, useRef, lazy, Suspense, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useGetDashboardSummary } from "@workspace/api-client-react";

const BlockchainOrb = lazy(() => import("@/components/three/BlockchainOrb"));

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const VIDEOS = [
  { src: "/video-globe.mp4", label: "01 / DIGITAL EARTH", title: "Global\nPresence", sub: "Building ventures that transcend borders — from Karachi to the world.", tag: "INTERNATIONAL" },
  { src: "/video-network.mp4", label: "02 / NETWORK INFRASTRUCTURE", title: "Connected\nSystems", sub: "Interconnected nodes of capital, intelligence, and real-world execution.", tag: "ECOSYSTEM" },
  { src: "/video-blockchain.mp4", label: "03 / BLOCKCHAIN LEDGER", title: "Immutable\nFoundations", sub: "Transparent, decentralized financial systems redefining asset ownership.", tag: "WEB3" },
];

const domains = [
  { title: "Artificial Intelligence", desc: "Automation-driven systems designed to scale — from intelligent workflows to enterprise AI platforms.", icon: "⬡" },
  { title: "Blockchain & Digital Assets", desc: "Modern financial frameworks, asset tokenization, and next-generation digital infrastructure.", icon: "◈" },
  { title: "Real World Investments", desc: "Long-term value creation through real estate, luxury commerce, and strategic asset allocation.", icon: "◉" },
];

const stats = [
  { label: "VENTURES", value: "250+", key: "totalCompanies" as const },
  { label: "CATEGORIES", value: "12", key: "totalProjects" as const },
  { label: "RESEARCH PAPERS", value: "46", key: "totalResearch" as const },
  { label: "ARTIFICIAL SYSTEMS", value: "98", key: "totalArticles" as const },
];

const PHIL_TEXT = "From effort to leverage. I operate where these shifts begin — at the intersection of artificial intelligence, blockchain infrastructure, and real-world economic systems.";
const philWords = PHIL_TEXT.split(" ");

function PhilWord({ word, index, total, scrollProgress }: {
  word: string; index: number; total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = Math.min(index / total, 0.95);
  const end = Math.min((index + 2) / total, 1);
  // Start at 60% opacity so it's readable on mobile, animate to 95%
  const color = useTransform(scrollProgress, [start, end], ["rgba(255,255,255,0.60)", "rgba(255,255,255,0.95)"]);
  return <motion.span style={{ color }}>{word}{" "}</motion.span>;
}

const HERO_NAME = "FAISAL ORAKZAI";

const MANIFESTO_LINES = [
  "Most people build products.",
  "I build systems that build products.",
  "This is not business.",
  "This is system thinking.",
];

// Gold matrix rain for hero only
function GoldMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const CHARS = "01アイウエカキクサシスタナニヌ⬡◈◉▲FOISALRKZ";
    const fontSize = 11;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -120);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = `rgba(243,186,47,${Math.random() * 0.45 + 0.08})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.974) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 55);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.16, zIndex: 1 }} />;
}

// Constellation canvas for philosophy/manifesto section background
function ConstellationBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.6,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(243,186,47,${0.06 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(243,186,47,0.12)";
        ctx.fill();
      }
    };
    const interval = setInterval(draw, 40);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 1 }} />;
}

type HeroPhase = "photo" | "webm" | "old";

export default function Home() {
  const { data: summary } = useGetDashboardSummary();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity1 = useTransform(scrollY, [0, 400], [1, 0]);
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [heroPhase, setHeroPhase] = useState<HeroPhase>("photo");
  const [glitchActive, setGlitchActive] = useState(false);
  const webmRef = useRef<HTMLVideoElement>(null);
  const oldVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const glitchTimer = setTimeout(() => setGlitchActive(true), 7000);
    const switchTimer = setTimeout(() => {
      setHeroPhase("webm");
      webmRef.current?.play().catch(() => {});
    }, 8000);
    return () => { clearTimeout(glitchTimer); clearTimeout(switchTimer); };
  }, []);

  const handleWebmEnded = useCallback(() => {
    setHeroPhase("old");
    if (oldVideoRef.current) { oldVideoRef.current.currentTime = 0; oldVideoRef.current.play().catch(() => {}); }
  }, []);

  const philosophyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: philScroll } = useScroll({ target: philosophyRef, offset: ["start 0.9", "end 0.25"] });

  useEffect(() => {
    const timer = setInterval(() => setActiveVideo((v) => (v + 1) % VIDEOS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeVideo) { vid.currentTime = 0; vid.play().catch(() => {}); }
      else vid.pause();
    });
  }, [activeVideo]);

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GoldMatrixRain />

        {/* PHOTO LAYER */}
        <AnimatePresence>
          {heroPhase === "photo" && (
            <motion.div key="hero-photo" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "brightness(2.5) blur(8px)" }} transition={{ duration: 0.7, ease: "easeIn" }} className="absolute inset-0 z-[2]">
              <img src="/faisal-hero.png" alt="Faisal Orakzai — Entrepreneur & Founder" className="absolute inset-0 w-full h-full object-cover object-top" style={{ filter: glitchActive ? "brightness(1.3) contrast(1.1) saturate(1.1)" : "brightness(1)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 80% at 50% 40%, transparent 25%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.92) 100%)" }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)" }} />
              {glitchActive && (
                <>
                  <motion.div className="absolute left-0 right-0 pointer-events-none" style={{ top:"28%",height:"3px",background:"rgba(243,186,47,0.85)",mixBlendMode:"screen" }} animate={{ scaleX:[1,0.4,1,0.6,1],x:[0,14,-6,10,0],opacity:[1,0.5,1,0.7,0] }} transition={{ duration:0.5,repeat:1 }} />
                  <motion.div className="absolute left-0 right-0 pointer-events-none" style={{ top:"62%",height:"2px",background:"rgba(0,200,255,0.6)",mixBlendMode:"screen" }} animate={{ scaleX:[1,0.7,1,0.3,1],x:[0,-10,14,-5,0],opacity:[1,0.6,1,0.8,0] }} transition={{ duration:0.4,repeat:1,delay:0.1 }} />
                </>
              )}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/50 to-transparent" />
              <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#F3BA2F]/60" />
              <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#F3BA2F]/60" />
              <div className="absolute bottom-20 left-6 w-10 h-10 border-b-2 border-l-2 border-[#F3BA2F]/60" />
              <div className="absolute bottom-20 right-6 w-10 h-10 border-b-2 border-r-2 border-[#F3BA2F]/60" />
              <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }} className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/40" style={{ zIndex:10 }}>
                <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]" animate={{ opacity:[1,0.2,1] }} transition={{ repeat:Infinity,duration:0.8 }} />
                <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">LIVE · FAISAL ORAKZAI</span>
              </motion.div>
              <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-3 z-10 px-4">
                <motion.div initial="hidden" animate="show" variants={{ show:{ transition:{ staggerChildren:0.055,delayChildren:0.3 } } }} className="flex flex-wrap justify-center">
                  {HERO_NAME.split("").map((char,i) => (
                    <motion.span key={i} variants={{ hidden:{opacity:0,y:-15,filter:"blur(4px)"},show:{opacity:1,y:0,filter:"blur(0px)"} }} transition={{ duration:0.25,ease:"easeOut" }} className="font-mono font-bold tracking-widest text-3xl md:text-5xl" style={{ color:char===" "?"transparent":"#F3BA2F",textShadow:char===" "?"none":"0 0 18px rgba(243,186,47,0.9), 0 0 40px rgba(243,186,47,0.4)",display:"inline-block",minWidth:char===" "?"1rem":undefined }}>{char}</motion.span>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity:0,scaleX:0 }} animate={{ opacity:1,scaleX:1 }} transition={{ delay:0.9,duration:0.6 }} className="h-px w-48 bg-gradient-to-r from-transparent via-[#F3BA2F]/60 to-transparent" />
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }} className="text-white/50 font-mono text-xs tracking-[0.3em] uppercase text-center">Entrepreneur · Founder · Builder</motion.p>
              </div>
              <motion.div className="absolute bottom-0 left-0 h-[3px] bg-[#F3BA2F]" initial={{ width:"100%" }} animate={{ width:"0%" }} transition={{ duration:8,ease:"linear" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WEBM VIDEO */}
        <motion.video ref={webmRef} src="/hero-new.webm" muted playsInline preload="auto" onEnded={handleWebmEnded} className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[2]" initial={{ opacity:0 }} animate={{ opacity:heroPhase==="webm"?1:0 }} transition={{ duration:0.8,ease:"easeOut" }} />
        {/* OLD VIDEO */}
        <motion.video ref={oldVideoRef} src="/hero-bg.mp4" loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[2]" initial={{ opacity:0 }} animate={{ opacity:heroPhase==="old"?1:0 }} transition={{ duration:0.8,ease:"easeOut" }} />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/65 pointer-events-none z-[3]" />
        <div className="absolute inset-0 pointer-events-none z-[3]" style={{ background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)" }} />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-[3]" />
        <div className="absolute inset-0 pointer-events-none z-[3]" style={{ background:"radial-gradient(ellipse 80% 70% at 50% 50%,transparent 30%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,0.9) 100%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F3BA2F]/5 rounded-full blur-[130px] pointer-events-none z-[3]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/40 to-transparent pointer-events-none z-[4]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/20 to-transparent pointer-events-none z-[4]" />
        <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <div className="absolute bottom-20 left-6 w-10 h-10 border-b-2 border-l-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <div className="absolute bottom-20 right-6 w-10 h-10 border-b-2 border-r-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <motion.div style={{ y:y1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
          <div className="w-[600px] h-[600px] opacity-30">
            <Suspense fallback={<div className="w-full h-full" />}><BlockchainOrb /></Suspense>
          </div>
        </motion.div>
        <motion.div className="absolute inset-x-0 h-[2px] pointer-events-none z-[4]" style={{ background:"linear-gradient(90deg,transparent,rgba(243,186,47,0.45),transparent)" }} animate={{ top:["0%","100%"] }} transition={{ duration:5,repeat:Infinity,ease:"linear" }} />

        <motion.div style={{ opacity:opacity1 }} className="relative z-[5] text-center px-6 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/30 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
            <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">SYSTEM ACTIVE — FAISAL ORAKZAI</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-none mb-6">
            <span className="text-white">FAISAL</span><br />
            <span className="gold-gradient text-glow">ORAKZAI</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/50 font-mono text-sm tracking-[0.3em] uppercase mb-8">Entrepreneur · Founder · Builder of Future Systems</motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            I don't build businesses.<br />
            <span className="text-[#F3BA2F]">I build systems that shape industries.</span>
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ecosystem">
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} className="flex items-center gap-3 px-8 py-4 bg-[#F3BA2F] text-black font-bold tracking-wider text-sm cursor-pointer glow-gold hover:bg-[#ffd666] transition-colors">ENTER THE ECOSYSTEM <ArrowRight className="h-4 w-4" /></motion.div>
            </Link>
            <Link href="/founder">
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} className="flex items-center gap-3 px-8 py-4 border border-[#F3BA2F]/30 text-[#F3BA2F] font-bold tracking-wider text-sm cursor-pointer hover:border-[#F3BA2F] hover:bg-[#F3BA2F]/5 transition-all">VIEW FOUNDER PROFILE</motion.div>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div animate={{ y:[0,8,0] }} transition={{ repeat:Infinity,duration:2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F3BA2F]/40 z-[5]">
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* ── CINEMATIC VIDEO SHOWCASE ── */}
      <section className="relative w-full" style={{ height:"100vh" }}>
        {VIDEOS.map((v,i) => (
          <video key={v.src} ref={(el) => { videoRefs.current[i]=el; }} src={v.src} autoPlay={i===0} loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" style={{ opacity:activeVideo===i?1:0 }} />
        ))}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow:"inset 0 0 120px rgba(0,0,0,0.8), inset 0 0 2px rgba(243,186,47,0.15)" }} />
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-16">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.div key={activeVideo} initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:20 }} transition={{ duration:0.4 }} className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em]">{VIDEOS[activeVideo].label}</motion.div>
            </AnimatePresence>
            <div className="text-white/20 font-mono text-xs tracking-widest">ORAKZAI GROUP · LIVE SIGNAL</div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeVideo} initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-20 }} transition={{ duration:0.6,ease:[0.25,0.46,0.45,0.94] }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#F3BA2F]/30 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
                <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.25em]">{VIDEOS[activeVideo].tag}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-bold leading-none mb-6">
                {VIDEOS[activeVideo].title.split("\n").map((line,li) => (
                  <span key={li} className={`block ${li===1?"gold-gradient text-glow":"text-white"}`}>{line}</span>
                ))}
              </h2>
              <p className="text-white/50 text-lg max-w-lg leading-relaxed font-light">{VIDEOS[activeVideo].sub}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-6">
              {VIDEOS.map((_,i) => (
                <button key={i} onClick={() => setActiveVideo(i)} className="group flex flex-col items-start gap-2 focus:outline-none">
                  <div className="text-white/30 font-mono text-[10px] tracking-widest group-hover:text-[#F3BA2F] transition-colors">0{i+1}</div>
                  <div className="w-16 h-px bg-white/15 relative overflow-hidden">
                    {activeVideo===i && <motion.div className="absolute inset-y-0 left-0 bg-[#F3BA2F]" initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration:6,ease:"linear" }} />}
                    {activeVideo!==i && <div className="absolute inset-y-0 left-0 bg-white/30" style={{ width:activeVideo>i?"100%":"0%" }} />}
                  </div>
                </button>
              ))}
            </div>
            <div className="text-right hidden md:block">
              <div className="text-white/20 font-mono text-[10px] tracking-widest mb-1">SIGNAL FEED</div>
              <motion.div animate={{ opacity:[0.3,1,0.3] }} transition={{ repeat:Infinity,duration:2 }} className="text-[#F3BA2F]/60 font-mono text-[10px] tracking-widest">
                ████████░░ {((activeVideo+1)/VIDEOS.length*100).toFixed(0)}% LOADED
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO — with constellation background ── */}
      <section className="relative py-32 border-t border-[#F3BA2F]/10 overflow-hidden">
        {/* Constellation canvas background */}
        <ConstellationBg />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity:0,x:-40 }} whileInView={{ opacity:1,x:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}>
              <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">THE PHILOSOPHY</div>
              {/* Headline — clear separate lines */}
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                The world is changing.<br />
                <span className="text-white/30">From companies to systems.</span><br />
                <span className="relative word-glow-gold text-[#F3BA2F]">systems.</span>
              </h2>
              {/* Philosophy paragraph — 60% base opacity for mobile readability */}
              <p ref={philosophyRef} className="text-lg leading-relaxed">
                {philWords.map((word,i) => (
                  <PhilWord key={i} word={word} index={i} total={philWords.length} scrollProgress={philScroll} />
                ))}
              </p>
            </motion.div>

            {/* Manifesto lines — progressive scroll fill on left border */}
            <motion.div initial={{ opacity:0,x:40 }} whileInView={{ opacity:1,x:0 }} transition={{ duration:0.8 }} viewport={{ once:true }} className="space-y-1 pr-4 sm:pr-0">
              {MANIFESTO_LINES.map((line,i) => {
                const isGold = i===1||i===3;
                return (
                  <motion.div key={i} initial={{ opacity:0,x:20 }} whileInView={{ opacity:1,x:0 }} transition={{ delay:i*0.1,duration:0.5 }} viewport={{ once:true }} className="relative pl-6 py-4">
                    {/* Static base border */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${isGold?"bg-[#F3BA2F]/20":"bg-white/8"}`} />
                    {/* Progressive scroll-fill line — fills from top as it enters view */}
                    <motion.div
                      className="absolute left-0 top-0 w-[2px]"
                      style={{
                        background: isGold
                          ? "linear-gradient(to bottom, #F3BA2F, #ffd666)"
                          : "rgba(255,255,255,0.25)",
                        boxShadow: isGold ? "0 0 8px rgba(243,186,47,0.7)" : "none",
                        transformOrigin: "top",
                      }}
                      initial={{ scaleY:0 }}
                      whileInView={{ scaleY:1 }}
                      viewport={{ once:false, margin:"-15%" }}
                      transition={{ duration:0.7, delay:i*0.12, ease:[0.25,0.46,0.45,0.94] }}
                    />
                    {/* Ambient glow behind gold lines */}
                    {isGold && (
                      <div className="absolute left-0 inset-y-0 w-16 pointer-events-none" style={{ background:"radial-gradient(ellipse 80% 100% at 0% 50%, rgba(243,186,47,0.08) 0%, transparent 70%)" }} />
                    )}
                    <span className={`text-lg font-light ${isGold?"text-[#F3BA2F]":"text-white/55"}`}>{line}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DOMAINS ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} className="mb-16">
            {/* Left-aligned on mobile to avoid chatbot overlap, centered on desktop */}
            <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-4 text-left sm:text-center">OPERATIONAL DOMAINS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-left sm:text-center">Where I Operate</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#F3BA2F]/10">
            {domains.map((d,i) => (
              <motion.div key={i} initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:i*0.15,duration:0.6 }} viewport={{ once:true }} className="bg-black p-10 group cursor-default scan-hover">
                <div className="text-[#F3BA2F] text-3xl mb-6 font-mono">{d.icon}</div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-[#F3BA2F] transition-colors">{d.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="py-32 border-t border-[#F3BA2F]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#F3BA2F]/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity:0,scale:0.9 }} whileInView={{ opacity:1,scale:1 }} transition={{ duration:0.8 }} viewport={{ once:true }}>
            <div className="text-[#F3BA2F]/20 text-8xl font-serif leading-none mb-4">"</div>
            <p className="text-3xl md:text-5xl font-bold leading-tight text-white/90 mb-8">Ideas are common.<br /><span className="text-[#F3BA2F]">Execution is rare.</span></p>
            <div className="text-white/30 font-mono text-xs tracking-[0.3em]">— FAISAL ORAKZAI, FOUNDER & CHAIRMAN, ORAKZAI GROUP</div>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE STATS ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#F3BA2F]/10">
            {stats.map((stat,i) => (
              <motion.div key={i} initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} transition={{ delay:i*0.1 }} viewport={{ once:true }} className="bg-black p-8 text-center">
                <div className="text-5xl font-bold text-[#F3BA2F] mb-3 font-mono">{summary?.[stat.key] ?? stat.value}</div>
                <div className="text-white/30 font-mono text-[10px] tracking-[0.25em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 pb-40 border-t border-[#F3BA2F]/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity:0,y:30 }} whileInView={{ opacity:1,y:0 }} transition={{ duration:0.8 }} viewport={{ once:true }}>
            <p className="text-white/30 font-mono text-xs tracking-[0.3em] mb-6">FINAL THOUGHT</p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              The future belongs to those<br />
              who <span className="gold-gradient">build systems,</span><br />
              not follow them.
            </h2>
            <Link href="/ecosystem">
              <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} className="inline-flex items-center gap-3 px-10 py-5 bg-[#F3BA2F] text-black font-bold tracking-widest text-sm cursor-pointer glow-gold hover:bg-[#ffd666] transition-colors">
                EXPLORE THE ECOSYSTEM <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
