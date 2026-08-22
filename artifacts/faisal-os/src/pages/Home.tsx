import { useEffect, useRef, lazy, Suspense, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import SEOHead from "@/components/shared/SEOHead";
import HomeSchema from "@/components/shared/HomeSchema";

const BlockchainOrb = lazy(() => import("@/components/three/BlockchainOrb"));

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const } }),
};

const VIDEOS = [
  { src: "/video-globe.mp4", poster: "/video-globe-poster.webp", label: "01 / DIGITAL EARTH", title: "Global\nPresence", sub: "Building ventures that transcend borders — from Karachi to the world.", tag: "INTERNATIONAL" },
  { src: "/video-network.mp4", poster: "/video-network-poster.webp", label: "02 / NETWORK INFRASTRUCTURE", title: "Connected\nSystems", sub: "Interconnected nodes of capital, intelligence, and real-world execution.", tag: "ECOSYSTEM" },
  { src: "/video-blockchain.mp4", poster: "/video-blockchain-poster.webp", label: "03 / BLOCKCHAIN LEDGER", title: "Immutable\nFoundations", sub: "Transparent, decentralized financial systems redefining asset ownership.", tag: "WEB3" },
];

const domains = [
  { num: "01", title: "Artificial Intelligence", desc: "Developing intelligent software, automation tools, and AI-enabled applications that improve productivity and business operations.", icon: "⬡" },
  { num: "02", title: "Blockchain & Digital Assets", desc: "Exploring blockchain infrastructure, smart contracts, tokenisation, and digital asset technologies with a focus on practical implementation.", icon: "◈" },
  { num: "03", title: "Digital Commerce & Technology", desc: "Building software products, enterprise solutions, and digital commerce platforms that support modern businesses and long-term growth.", icon: "◉" },
];

const STATS = [
  { label: "LIVE VENTURES", value: "5", suffix: "", key: "totalCompanies" as const },
  { label: "CATEGORIES", value: "12", suffix: "", key: "totalProjects" as const },
  { label: "RESEARCH PAPERS", value: "46", suffix: "", key: "totalResearch" as const },
  { label: "ARTIFICIAL SYSTEMS", value: "98", suffix: "", key: "totalArticles" as const },
];

const PHIL_TEXT = "Technology is evolving beyond individual products toward connected digital systems. My work focuses on understanding how software, artificial intelligence, blockchain, and digital infrastructure can work together to solve practical problems and create sustainable value over time.";
const philWords = PHIL_TEXT.split(" ");

// ── Visible FAQ Accordion item (Google FAQ rich results requirement) ──
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
      viewport={{ once: true }}
      className="border-b border-[#F3BA2F]/10 last:border-b-0"
      itemScope itemProp="mainEntity" itemType="https://schema.org/Question"
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        style={{ background: "none", border: "none", cursor: "pointer", padding: "20px 0" }}
      >
        <span itemProp="name" className="text-white/85 font-medium text-sm md:text-base leading-snug group-hover:text-white transition-colors pr-4" style={{ flex: 1 }}>
          {question}
        </span>
        <ChevronDown
          className="flex-shrink-0 mt-0.5 text-[#F3BA2F]/60 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", width: 18, height: 18 }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
          >
            <p itemProp="text" className="text-white/45 text-sm leading-relaxed pb-5 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PhilWord({ word, index, total, scrollProgress }: {
  word: string; index: number; total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = Math.min(index / total, 0.95);
  const end = Math.min((index + 2) / total, 1);
  const color = useTransform(scrollProgress, [start, end], ["rgba(255,255,255,0.55)", "rgba(255,255,255,0.96)"]);
  return <motion.span style={{ color }}>{word}{" "}</motion.span>;
}

// Animated count-up number
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  useEffect(() => {
    if (!inView) return;
    let frame: ReturnType<typeof setTimeout>;
    const duration = 1600;
    const step = 14;
    const total = Math.ceil(duration / step);
    let current = 0;
    const tick = () => {
      current++;
      const progress = current / total;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (current < total) frame = setTimeout(tick, step);
    };
    frame = setTimeout(tick, step);
    return () => clearTimeout(frame);
  }, [inView, target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

const HERO_NAME = "FAISAL ORAKZAI";
const MANIFESTO_LINES = [
  { text: "Build with purpose.", gold: true },
  { text: "Design for scale.", gold: false },
  { text: "Learn continuously.", gold: false },
  { text: "Improve consistently.", gold: true },
];

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
    const nodes = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.4 + 0.5,
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
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(243,186,47,${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(243,186,47,0.15)";
        ctx.fill();
      }
    };
    const interval = setInterval(draw, 40);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

type HeroPhase = "photo" | "webm" | "old";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity1 = useTransform(scrollY, [0, 400], [1, 0]);
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cinematicSectionRef = useRef<HTMLElement>(null);
  const [cinematicInView, setCinematicInView] = useState(false);
  const [heroPhase, setHeroPhase] = useState<HeroPhase>("photo");
  const [glitchActive, setGlitchActive] = useState(false);
  const webmRef = useRef<HTMLVideoElement>(null);
  const oldVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const g = setTimeout(() => setGlitchActive(true), 7000);
    const s = setTimeout(() => {
      setHeroPhase("webm");
      webmRef.current?.play().catch(() => {});
    }, 8000);
    return () => { clearTimeout(g); clearTimeout(s); };
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
    const el = cinematicSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCinematicInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!cinematicInView) return;
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeVideo) { vid.currentTime = 0; vid.play().catch(() => {}); }
      else vid.pause();
    });
  }, [activeVideo, cinematicInView]);

  return (
    <>
      <SEOHead title="Faisal Orakzai — Founder & Chairman, Orakzai Group" description="Official site of Muhammad Faisal Orakzai — Pakistan's blockchain entrepreneur, creator of OKBOND on Polygon L2, Shamim Forever, OkzByte Technology & OrakzaiX AI. Crunchbase Rank #28." path="/" keywords="Faisal Orakzai, Muhammad Faisal Orakzai, Orakzai Group, OKBOND blockchain Pakistan" />
      <HomeSchema />
      <div className="bg-black text-white overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GoldMatrixRain />
        <AnimatePresence>
          {heroPhase === "photo" && (
            <motion.div key="hero-photo" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "brightness(2.5) blur(8px)" }} transition={{ duration: 0.7, ease: "easeIn" }} className="absolute inset-0 z-[2]">
              <img src="/faisal-official-knowledge-panel.jpg" alt="Faisal Orakzai — Official Portrait" className="absolute inset-0 w-full h-full object-cover object-top" style={{ filter: glitchActive ? "brightness(1.3) contrast(1.1)" : "brightness(1)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 80% at 50% 40%, transparent 25%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.92) 100%)" }} />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)" }} />
              {glitchActive && (
                <>
                  <motion.div className="absolute left-0 right-0 pointer-events-none" style={{ top: "28%", height: "3px", background: "rgba(243,186,47,0.85)", mixBlendMode: "screen" }} animate={{ scaleX: [1, 0.4, 1, 0.6, 1], x: [0, 14, -6, 10, 0], opacity: [1, 0.5, 1, 0.7, 0] }} transition={{ duration: 0.5, repeat: 1 }} />
                  <motion.div className="absolute left-0 right-0 pointer-events-none" style={{ top: "62%", height: "2px", background: "rgba(0,200,255,0.6)", mixBlendMode: "screen" }} animate={{ scaleX: [1, 0.7, 1, 0.3, 1], x: [0, -10, 14, -5, 0], opacity: [1, 0.6, 1, 0.8, 0] }} transition={{ duration: 0.4, repeat: 1, delay: 0.1 }} />
                </>
              )}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/50 to-transparent" />
              <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#F3BA2F]/60" />
              <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#F3BA2F]/60" />
              <div className="absolute bottom-20 left-6 w-10 h-10 border-b-2 border-l-2 border-[#F3BA2F]/60" />
              <div className="absolute bottom-20 right-6 w-10 h-10 border-b-2 border-r-2 border-[#F3BA2F]/60" />
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/40" style={{ zIndex: 10 }}>
                <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]" animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">LIVE · FAISAL ORAKZAI</span>
              </motion.div>
              <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-3 z-10 px-4">
                <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } } }} className="flex flex-wrap justify-center">
                  {HERO_NAME.split("").map((char, i) => (
                    <motion.span key={i} variants={{ hidden: { opacity: 0, y: -15, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.25, ease: "easeOut" }} className="font-mono font-bold tracking-widest text-3xl md:text-5xl" style={{ color: char === " " ? "transparent" : "#F3BA2F", textShadow: char === " " ? "none" : "0 0 18px rgba(243,186,47,0.9), 0 0 40px rgba(243,186,47,0.4)", display: "inline-block", minWidth: char === " " ? "1rem" : undefined }}>{char}</motion.span>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="h-px w-48 bg-gradient-to-r from-transparent via-[#F3BA2F]/60 to-transparent" />
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="text-white/50 font-mono text-xs tracking-[0.3em] uppercase text-center">Entrepreneur · Founder · Builder</motion.p>
              </div>
              <motion.div className="absolute bottom-0 left-0 h-[3px] bg-[#F3BA2F]" initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 8, ease: "linear" }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.video ref={webmRef} src={heroPhase === "webm" || heroPhase === "old" ? "/hero-new.webm" : undefined} poster="/hero-new-poster.webp" muted playsInline preload="metadata" onEnded={handleWebmEnded} className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[2]" initial={{ opacity: 0 }} animate={{ opacity: heroPhase === "webm" ? 1 : 0 }} transition={{ duration: 0.8 }} />
        <motion.video ref={oldVideoRef} src={heroPhase === "old" ? "/hero-bg.webm" : undefined} poster="/hero-bg-poster.webp" loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-[2]" initial={{ opacity: 0 }} animate={{ opacity: heroPhase === "old" ? 1 : 0 }} transition={{ duration: 0.8 }} />

        <div className="absolute inset-0 bg-black/65 pointer-events-none z-[3]" />
        <div className="absolute inset-0 pointer-events-none z-[3]" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)" }} />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-[3]" />
        <div className="absolute inset-0 pointer-events-none z-[3]" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%,transparent 30%,rgba(0,0,0,0.5) 70%,rgba(0,0,0,0.9) 100%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#F3BA2F]/5 rounded-full blur-[130px] pointer-events-none z-[3]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/40 to-transparent pointer-events-none z-[4]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/20 to-transparent pointer-events-none z-[4]" />
        <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <div className="absolute bottom-20 left-6 w-10 h-10 border-b-2 border-l-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <div className="absolute bottom-20 right-6 w-10 h-10 border-b-2 border-r-2 border-[#F3BA2F]/35 pointer-events-none z-[4]" />
        <motion.div style={{ y: y1 }} className="absolute inset-0 flex items-center justify-center pointer-events-none z-[4]">
          <div className="w-[600px] h-[600px] opacity-30">
            <Suspense fallback={<div className="w-full h-full" />}><BlockchainOrb /></Suspense>
          </div>
        </motion.div>
        <motion.div className="absolute inset-x-0 h-[2px] pointer-events-none z-[4]" style={{ background: "linear-gradient(90deg,transparent,rgba(243,186,47,0.45),transparent)" }} animate={{ top: ["0%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />

        <motion.div style={{ opacity: opacity1 }} className="relative z-[5] text-center px-6 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/30 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
            <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">SYSTEM ACTIVE — FAISAL ORAKZAI</span>
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1} className="text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-none mb-6">
            <span className="text-white">FAISAL</span><br />
            <span className="gold-gradient text-glow">ORAKZAI</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-white/50 font-mono text-sm tracking-[0.3em] uppercase mb-8">Technology Entrepreneur & Computer Scientist</motion.p>
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3} className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Redefining Asset Ownership<br />
            <span className="text-[#F3BA2F]">Through Blockchain Architecture.</span>
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ecosystem">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-8 py-4 bg-[#F3BA2F] text-black font-bold tracking-wider text-sm cursor-pointer glow-gold hover:bg-[#ffd666] transition-colors">ENTER THE ECOSYSTEM <ArrowRight className="h-4 w-4" /></motion.div>
            </Link>
            <Link href="/founder">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex items-center gap-3 px-8 py-4 border border-[#F3BA2F]/30 text-[#F3BA2F] font-bold tracking-wider text-sm cursor-pointer hover:border-[#F3BA2F] hover:bg-[#F3BA2F]/5 transition-all">VIEW FOUNDER PROFILE</motion.div>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#F3BA2F]/40 z-[5]">
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>


      {/* ── ABOUT FAISAL ORAKZAI (EEAT / SEO content) ── */}
      <section className="relative py-28 border-t border-[#F3BA2F]/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 20% 20%, rgba(243,186,47,0.03) 0%, transparent 60%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.35em] uppercase">Who Is Faisal Orakzai</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">About Faisal Orakzai</h2>

              <p className="text-white/60 text-base leading-[1.85] font-light mb-6">
                Faisal Orakzai is a Pakistani technology entrepreneur, computer scientist, and the Founder and Chairman of Orakzai Group. His work spans software engineering, artificial intelligence, blockchain technology, financial technology (FinTech), enterprise software, and digital infrastructure — disciplines he has spent years building across, not simply studying.
              </p>
              <p className="text-white/60 text-base leading-[1.85] font-light mb-6">
                He began his entrepreneurial journey at a young age, moving gradually from traditional business into technology. That transition was deliberate — driven by a focus on building practical digital solutions to real-world challenges, combining software development, emerging technologies, and long-term systems thinking to create products and platforms designed to scale.
              </p>
              <p className="text-white/60 text-base leading-[1.85] font-light mb-6">
                Through Orakzai Group, he leads a portfolio of distinct ventures: Orakzai Bond, a blockchain-focused digital asset platform; OkzByte Technology, a software development company delivering custom digital solutions for businesses; and Shamim Forever, a digital commerce brand. Beyond commercial work, he supports Orakzai.org — a non-profit organisation working across humanitarian relief, education, healthcare, legal assistance, migrant support, clean water, and community development.
              </p>
              <p className="text-white/60 text-base leading-[1.85] font-light mb-6">
                Alongside building companies, Faisal writes and publishes educational articles and technical research covering blockchain architecture, artificial intelligence, enterprise software, smart contracts, decentralised finance (DeFi), cybersecurity, cloud computing, digital identity, and real-world asset (RWA) tokenisation. The goal is straightforward: make complex technologies understandable and accessible for developers, entrepreneurs, students, and business leaders.
              </p>
              <p className="text-white/60 text-base leading-[1.85] font-light mb-6">
                His professional profiles and published work are represented across Crunchbase, Wikidata, ORCID, GitHub, LinkedIn, IMDb, Peerlist, and other public directories — contributing to a transparent and verifiable digital presence grounded in real output, not claims.
              </p>
              <p className="text-white/60 text-base leading-[1.85] font-light mb-6">
                His long-term objective is to contribute to the development of secure, scalable, and interoperable digital infrastructure — and to do that work in a way that promotes innovation, research, entrepreneurship, and responsible technology adoption for the long run.
              </p>
          </motion.div>

          {/* Professional Focus + Research Interests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-3">Professional Focus</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">Areas of work include:</p>
              <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Artificial Intelligence</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Blockchain Technology</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Enterprise Software</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Financial Technology (FinTech)</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Software Engineering</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Cloud Computing</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Digital Infrastructure</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Automation</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Cybersecurity</span>
                  <span className="px-3 py-1.5 border border-[#F3BA2F]/20 text-[#F3BA2F]/80 text-xs font-mono tracking-wide">Digital Commerce</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-3">Research Interests</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">Current research includes:</p>
              <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Blockchain Architecture</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Smart Contract Engineering</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Artificial Intelligence</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Enterprise Systems</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Digital Identity</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Tokenization</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Decentralized Finance (DeFi)</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Cloud Infrastructure</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Cross-Chain Technologies</span>
                  <span className="px-3 py-1.5 border border-white/10 text-white/50 text-xs font-mono tracking-wide">Real-World Asset (RWA) Tokenization</span>
              </div>
            </motion.div>
          </div>

          {/* Mission + Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="p-8 border border-[#F3BA2F]/15 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]" />
                <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] uppercase">Mission — Orakzai Group</span>
              </div>
              <p className="text-white/60 text-sm leading-[1.8] font-light">To develop secure, scalable, and practical digital infrastructure that supports innovation, responsible technology adoption, and long-term digital transformation.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }} className="p-8 border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-white/50 font-mono text-[10px] tracking-[0.3em] uppercase">Vision — Orakzai Group</span>
              </div>
              <p className="text-white/60 text-sm leading-[1.8] font-light">To contribute to the advancement of digital infrastructure through software engineering, artificial intelligence, blockchain technology, enterprise systems, and research — while creating solutions that deliver lasting value for businesses, institutions, and communities.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC VIDEO ── */}
      <section ref={cinematicSectionRef} className="relative w-full" style={{ height: "100vh" }}>
        {cinematicInView && VIDEOS.map((v, i) => (
          <video key={v.src} ref={(el) => { videoRefs.current[i] = el; }} src={v.src} poster={v.poster} autoPlay={i === 0} loop muted playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" style={{ opacity: activeVideo === i ? 1 : 0 }} />
        ))}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 120px rgba(0,0,0,0.8), inset 0 0 2px rgba(243,186,47,0.15)" }} />
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#F3BA2F]/40 pointer-events-none" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 md:p-16">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.div key={activeVideo} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4 }} className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em]">{VIDEOS[activeVideo].label}</motion.div>
            </AnimatePresence>
            <div className="text-white/20 font-mono text-xs tracking-widest">ORAKZAI GROUP · LIVE SIGNAL</div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeVideo} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#F3BA2F]/30 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
                <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.25em]">{VIDEOS[activeVideo].tag}</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-bold leading-none mb-6">
                {VIDEOS[activeVideo].title.split("\n").map((line, li) => (
                  <span key={li} className={`block ${li === 1 ? "gold-gradient text-glow" : "text-white"}`}>{line}</span>
                ))}
              </h2>
              <p className="text-white/50 text-lg max-w-lg leading-relaxed font-light">{VIDEOS[activeVideo].sub}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-6">
              {VIDEOS.map((_, i) => (
                <button key={i} onClick={() => setActiveVideo(i)} className="group flex flex-col items-start gap-2 focus:outline-none">
                  <div className="text-white/30 font-mono text-[10px] tracking-widest group-hover:text-[#F3BA2F] transition-colors">0{i + 1}</div>
                  <div className="w-16 h-px bg-white/15 relative overflow-hidden">
                    {activeVideo === i && <motion.div className="absolute inset-y-0 left-0 bg-[#F3BA2F]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} />}
                    {activeVideo !== i && <div className="absolute inset-y-0 left-0 bg-white/30" style={{ width: activeVideo > i ? "100%" : "0%" }} />}
                  </div>
                </button>
              ))}
            </div>
            <div className="text-right hidden md:block">
              <div className="text-white/20 font-mono text-[10px] tracking-widest mb-1">SIGNAL FEED</div>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[#F3BA2F]/60 font-mono text-[10px] tracking-widest">
                ████████░░ {((activeVideo + 1) / VIDEOS.length * 100).toFixed(0)}% LOADED
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO / PHILOSOPHY ── */}
      <section className="relative py-32 border-t border-[#F3BA2F]/10 overflow-hidden">
        <ConstellationBg />
        {/* Deep atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(243,186,47,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 75% 65%, rgba(243,186,47,0.03) 0%, transparent 55%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[#F3BA2F]" />
                <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.35em] uppercase">The Philosophy</span>
              </div>

              {/* Main headline — bold, dramatic, 3 clear lines */}
              <h2 className="font-bold leading-[1.08] mb-10">
                <span className="block text-4xl md:text-5xl text-white mb-1">The world is</span>
                <span className="block text-4xl md:text-5xl text-white mb-1">changing.</span>
                <div className="h-px w-24 bg-[#F3BA2F]/30 my-4" />
                <span className="block text-3xl md:text-4xl text-white/30 mb-1">From companies</span>
                <span className="block text-3xl md:text-4xl">
                  <span className="text-white/30">to </span>
                  <span className="relative word-glow-gold text-[#F3BA2F]">systems.</span>
                </span>
              </h2>

              {/* Philosophy paragraph */}
              <p ref={philosophyRef} className="text-lg leading-[1.85] font-light max-w-md">
                {philWords.map((word, i) => (
                  <PhilWord key={i} word={word} index={i} total={philWords.length} scrollProgress={philScroll} />
                ))}
              </p>

              {/* Signature line */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }} className="flex items-center gap-3 mt-10">
                <div className="w-6 h-px bg-[#F3BA2F]/50" />
                <span className="text-white/25 font-mono text-[10px] tracking-[0.3em] uppercase">Faisal Orakzai · Founder & Chairman</span>
              </motion.div>
            </motion.div>

            {/* Manifesto lines */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-0 pt-4 lg:pt-16">
              {MANIFESTO_LINES.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }} className="relative pl-7 py-5 group">
                  {/* Static dim base border */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${line.gold ? "bg-[#F3BA2F]/15" : "bg-white/6"}`} />
                  {/* Progressive fill border */}
                  <motion.div
                    className="absolute left-0 top-0 w-[2px]"
                    style={{
                      background: line.gold ? "linear-gradient(to bottom, #F3BA2F 0%, #ffd97d 100%)" : "rgba(255,255,255,0.22)",
                      boxShadow: line.gold ? "0 0 10px rgba(243,186,47,0.65), -2px 0 12px rgba(243,186,47,0.2)" : "none",
                      transformOrigin: "top",
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: false, margin: "-15%" }}
                    transition={{ duration: 0.75, delay: i * 0.13, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                  {/* Ambient glow for gold lines */}
                  {line.gold && (
                    <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 100% at 0% 50%, rgba(243,186,47,0.06) 0%, transparent 75%)" }} />
                  )}
                  <span className={`text-xl font-light leading-relaxed ${line.gold ? "text-[#F3BA2F] font-normal" : "text-white/45 group-hover:text-white/60 transition-colors duration-300"}`}>
                    {line.text}
                  </span>
                </motion.div>
              ))}

              {/* Bottom accent */}
              <div className="pt-6 pl-7">
                <div className="flex items-center gap-2">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]" animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                  <span className="text-[#F3BA2F]/40 font-mono text-[9px] tracking-[0.35em] uppercase">System Architecture Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OPERATIONAL DOMAINS ── */}
      <section className="py-24 border-t border-[#F3BA2F]/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(243,186,47,0.03) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center gap-3 mb-4 sm:justify-center">
              <div className="h-px w-8 bg-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.35em] uppercase">Operational Domains</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-left sm:text-center leading-tight">
              Where I <span className="gold-gradient">Operate</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#F3BA2F]/8">
            {domains.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }} className="relative bg-black p-10 group cursor-default overflow-hidden scan-hover">
                {/* Hover glow fill */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(243,186,47,0.04) 0%, transparent 65%)" }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-[#F3BA2F] text-3xl font-mono">{d.icon}</span>
                    <span className="text-white/10 font-mono text-xs tracking-widest">{d.num}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#F3BA2F] transition-colors duration-300">{d.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{d.desc}</p>
                  <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-px flex-1 bg-[#F3BA2F]/20" />
                    <span className="text-[#F3BA2F]/50 font-mono text-[9px] tracking-widest">EXPLORE</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MASTER THE CODE — Research Thumbnail Ticker ── */}
      <section className="py-20 border-t border-[#F3BA2F]/15 relative overflow-hidden" style={{ background:"linear-gradient(180deg,#0a0800 0%,#000 40%,#000 60%,#0a0800 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 80% 55% at 50% 50%, rgba(243,186,47,0.055) 0%, transparent 68%)" }} />

        {/* Heading */}
        <div className="text-center mb-14 px-6">
          <h3 style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontWeight:800,
            fontSize:"clamp(1.8rem,5.5vw,2.8rem)",
            letterSpacing:"-0.015em",
            lineHeight:1.2,
            background:"linear-gradient(90deg,#c8900a 0%,#F3BA2F 28%,#fff5c0 50%,#F3BA2F 72%,#c8900a 100%)",
            backgroundSize:"300% auto",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
            animation:"codeShimmer2 3s linear infinite",
            filter:"drop-shadow(0 0 28px rgba(243,186,47,0.75)) drop-shadow(0 0 70px rgba(243,186,47,0.3))",
          }}>Master the Code. Rule the World.</h3>
          <p style={{ fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.35em", color:"rgba(243,186,47,0.45)", textTransform:"uppercase", marginTop:"14px" }}>Research &amp; Education</p>
        </div>

        {/* Scrolling ticker */}
        <div className="relative overflow-hidden pb-6" style={{ maskImage:"linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)", WebkitMaskImage:"linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%)" }}>
          <div className="flex items-start" style={{ animation:"researchScroll2 65s linear infinite", willChange:"transform", width:"max-content", paddingLeft:"40px" }}>
            {([
              { src:"/mk/blockchain-guide.webp", label:"Blockchain Basic", href:"/research/blockchain-basic" },
              { src:"/mk/thumb-blockchain-infra.webp", label:"Blockchain Infra", href:"/research/blockchain-infra" },
              { src:"/mk/enterprise-blockchain-hero.webp", label:"Enterprise Blockchain", href:"/research/enterprise-blockchain-ecosystems-guide" },
              { src:"/mk/rwa-hero.webp", label:"RWA Tokenization", href:"/research/rwa-tokenization" },
              { src:"/mk/thumb-blockchain-types.webp", label:"Blockchain Types", href:"/research/blockchain-types" },
              { src:"/mk/smart-contracts-hero.webp", label:"Smart Contracts", href:"/research/smart-contracts" },
              { src:"/mk/blockchain-security-hero.webp", label:"Blockchain Security", href:"/research/blockchain-security" },
              { src:"/mk/web3-future-hero.webp", label:"Web3 Future", href:"/research/future-of-web3" },
              { src:"/mk/blockchain-identity-hero.webp", label:"Digital Identity", href:"/research/blockchain-digital-identity" },
              { src:"/mk/cross-chain-hero.webp", label:"Cross-Chain Tech", href:"/research/cross-chain-technology" },
              { src:"/mk/cross-chain-zenodo.png", label:"OIL Protocol", href:"/research/cross-chain-zenodo" },
              { src:"/mk/blockchain-guide.webp", label:"Blockchain Basic", href:"/research/blockchain-basic" },
              { src:"/mk/thumb-blockchain-infra.webp", label:"Blockchain Infra", href:"/research/blockchain-infra" },
              { src:"/mk/enterprise-blockchain-hero.webp", label:"Enterprise Blockchain", href:"/research/enterprise-blockchain-ecosystems-guide" },
              { src:"/mk/rwa-hero.webp", label:"RWA Tokenization", href:"/research/rwa-tokenization" },
              { src:"/mk/thumb-blockchain-types.webp", label:"Blockchain Types", href:"/research/blockchain-types" },
              { src:"/mk/smart-contracts-hero.webp", label:"Smart Contracts", href:"/research/smart-contracts" },
              { src:"/mk/blockchain-security-hero.webp", label:"Blockchain Security", href:"/research/blockchain-security" },
              { src:"/mk/web3-future-hero.webp", label:"Web3 Future", href:"/research/future-of-web3" },
              { src:"/mk/blockchain-identity-hero.webp", label:"Digital Identity", href:"/research/blockchain-digital-identity" },
              { src:"/mk/cross-chain-hero.webp", label:"Cross-Chain Tech", href:"/research/cross-chain-technology" },
              { src:"/mk/cross-chain-zenodo.png", label:"OIL Protocol", href:"/research/cross-chain-zenodo" },
            ] as { src: string; label: string; href: string | null }[]).map((card, i) => {
              const el = (
                <div key={i} style={{ width:"288px", marginRight:"20px", flexShrink:0, transition:"transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)", cursor: card.href ? "pointer" : "default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-8px) scale(1.03)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0) scale(1)"; }}>
                  {/* Thumbnail with gold glow border */}
                  <div style={{
                    position:"relative", borderRadius:"12px", overflow:"hidden", aspectRatio:"16/9",
                    border:"1.5px solid rgba(243,186,47,0.55)",
                    boxShadow:"0 0 0 1px rgba(243,186,47,0.1), 0 12px 40px rgba(0,0,0,0.9), 0 0 30px rgba(243,186,47,0.22)",
                    background:"#111",
                  }}>
                    <img src={card.src} alt={card.label} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)", pointerEvents:"none" }} />
                    {card.href && (
                      <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0)", transition:"background 0.28s", display:"flex", alignItems:"center", justifyContent:"center" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(0,0,0,0.28)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(0,0,0,0)"; }}>
                        <div style={{ width:"52px", height:"52px", borderRadius:"50%", background:"rgba(243,186,47,0.95)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 30px rgba(243,186,47,0.75), 0 4px 20px rgba(0,0,0,0.5)" }}>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4.5L13.5 9 7 13.5V4.5Z" fill="#000" stroke="#000" strokeWidth="0.5"/></svg>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Label with gold-lit background */}
                  <div style={{
                    marginTop:"10px",
                    background:"rgba(243,186,47,0.07)",
                    border:"1px solid rgba(243,186,47,0.2)",
                    borderRadius:"8px",
                    padding:"10px 14px",
                    boxShadow:"0 2px 12px rgba(243,186,47,0.1)",
                  }}>
                    <div style={{
                      fontFamily:"system-ui,sans-serif", fontSize:"13px", fontWeight:700,
                      color:"#ffffff",
                      textShadow:"0 0 14px rgba(243,186,47,0.7), 0 1px 6px rgba(0,0,0,0.9)",
                      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                      letterSpacing:"0.01em",
                    }}>{card.label}</div>
                    <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.28em", color: card.href ? "rgba(243,186,47,0.8)" : "rgba(255,255,255,0.3)", textTransform:"uppercase", marginTop:"5px" }}>
                      {card.href ? "● Live Article" : "○ Coming Soon"}
                    </div>
                  </div>
                </div>
              );
              return card.href ? (
                <a key={i} href={card.href} style={{ textDecoration:"none" }}>{el}</a>
              ) : (
                <div key={i}>{el}</div>
              );
            })}
          </div>
        </div>

        <style>{`
          @keyframes codeShimmer2 {
            0%   { background-position: 300% center; }
            100% { background-position: -300% center; }
          }
          @keyframes researchScroll2 {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        {/* View All Research button */}
        <div style={{ display:"flex", justifyContent:"center", marginTop:"40px" }}>
          <a href="/research" style={{
            fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.32em", textTransform:"uppercase",
            display:"inline-flex", alignItems:"center", gap:"10px", textDecoration:"none",
            padding:"13px 32px",
            border:"1px solid rgba(243,186,47,0.55)",
            color:"#F3BA2F",
            background:"rgba(243,186,47,0.05)",
            boxShadow:"0 0 22px rgba(243,186,47,0.13)",
            transition:"all 0.25s",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="rgba(243,186,47,0.13)"; el.style.boxShadow="0 0 32px rgba(243,186,47,0.3)"; el.style.borderColor="rgba(243,186,47,0.9)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="rgba(243,186,47,0.05)"; el.style.boxShadow="0 0 22px rgba(243,186,47,0.13)"; el.style.borderColor="rgba(243,186,47,0.55)"; }}>
            View All Research
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="#F3BA2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
            </section>

            {/* ── INVESTORS & SUPPORTERS ── */}
        <section className="py-16 border-t border-[#F3BA2F]/15 relative overflow-hidden bg-black">
          {/* Ambient glow behind section */}
          <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(243,186,47,0.04) 0%, transparent 70%)" }} />

          {/* Title */}
          <div className="flex items-center justify-center gap-5 mb-10">
            <div className="h-px flex-1 max-w-[80px]" style={{ background:"linear-gradient(to right,transparent,rgba(243,186,47,0.5))" }} />
            <h3 className="font-mono tracking-[0.22em] uppercase text-center" style={{
              fontSize:"clamp(1rem,3.5vw,1.45rem)",
              fontWeight:700,
              background:"linear-gradient(90deg,#c8900a 0%,#F3BA2F 40%,#ffe27a 60%,#F3BA2F 80%,#c8900a 100%)",
              backgroundSize:"200% auto",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
              backgroundClip:"text",
              animation:"goldShimmer 3s linear infinite",
              textShadow:"none",
              filter:"drop-shadow(0 0 18px rgba(243,186,47,0.55)) drop-shadow(0 0 40px rgba(243,186,47,0.25))",
            }}>Investors &amp; Supporters</h3>
            <div className="h-px flex-1 max-w-[80px]" style={{ background:"linear-gradient(to left,transparent,rgba(243,186,47,0.5))" }} />
          </div>

          {/* Scrolling ticker */}
          <div className="relative overflow-hidden" style={{ maskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)", WebkitMaskImage:"linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%)" }}>
            <div className="flex items-center" style={{ animation:"investorScroll 28s linear infinite", willChange:"transform", width:"max-content" }}>
              {(() => {
                const logos = [
                  { src:"/logos/investors/sequoia.webp",          name:"Sequoia Capital",        dark:false, href:"https://www.sequoiacap.com" },
                  { src:"/logos/investors/a16z.webp",             name:"Andreessen Horowitz",     dark:false, href:"https://a16z.com" },
                  { src:"/logos/investors/ycombinator.webp",      name:"Y Combinator",            dark:false, href:"https://www.ycombinator.com" },
                  { src:"/logos/investors/pantera.png",          name:"Pantera Capital",         dark:false, href:"https://panteracapital.com" },
                  { src:"/logos/investors/paradigm.png",         name:"Paradigm",                dark:true,  href:"https://www.paradigm.xyz" },
                  { src:"/logos/investors/dcg.png",              name:"Digital Currency Group",  dark:true,  href:"https://dcg.co" },
                  { src:"/logos/investors/coinbase.png",         name:"Coinbase Ventures",       dark:false, href:"https://www.coinbase.com/ventures" },
                  { src:"/logos/investors/polygon.webp",          name:"Polygon",                 dark:true,  href:"https://polygon.technology" },
                  { src:"/logos/investors/mgx.webp",              name:"MGX",                     dark:true,  href:"https://www.mgx.com" },
                  { src:"/logos/investors/systems.webp",          name:"Systems Limited",         dark:false, href:"https://www.systemsltd.com" },
                  { src:"/logos/investors/founder-institute.webp",name:"Founder Institute",       dark:false, href:"https://fi.co" },
                ];
                const all = [...logos, ...logos]; // duplicate for seamless loop
                return all.map((logo, i) => (
                  <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 mx-8" title={`Visit ${logo.name}`}
                    style={{ padding:"14px 22px", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"6px", background: logo.dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.92)", height:"72px", width:"148px", display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color 0.3s, transform 0.3s, box-shadow 0.3s", cursor:"pointer", textDecoration:"none" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor="rgba(243,186,47,0.55)"; el.style.transform="scale(1.06)"; el.style.boxShadow="0 0 18px rgba(243,186,47,0.18)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor="rgba(255,255,255,0.07)"; el.style.transform="scale(1)"; el.style.boxShadow="none"; }}>
                    <img src={logo.src} alt={logo.name} title={logo.name}
                      style={{ maxHeight:"44px", maxWidth:"120px", objectFit:"contain", display:"block" }} />
                  </a>
                ));
              })()}
            </div>
          </div>

          <style>{`
            @keyframes goldShimmer {
              0%   { background-position: 200% center; }
              100% { background-position: -200% center; }
            }
            @keyframes investorScroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </section>

        {/* ── LIVE STATS — with count-up and gold glows ── */}
      <section className="py-0 border-t border-[#F3BA2F]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-0">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className="relative group bg-black border-r border-b border-[#F3BA2F]/8 last:border-r-0 p-10 md:p-12 text-center overflow-hidden">
                {/* Per-card radial glow behind number */}
                <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(243,186,47,0.08) 0%, transparent 70%)" }} />
                <div className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(243,186,47,0.05) 0%, transparent 80%)" }} />
                {/* Top gold accent line */}
                <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-[#F3BA2F]/0 group-hover:bg-[#F3BA2F]/40 transition-all duration-500" style={{ boxShadow: "0 0 12px rgba(243,186,47,0)" }} />

                <div className="relative z-10">
                  <div className="text-5xl md:text-6xl font-bold text-[#F3BA2F] mb-4 font-mono tabular-nums" style={{ textShadow: "0 0 30px rgba(243,186,47,0.25)" }}>
                    <CountUp target={parseInt(stat.value)} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/25 font-mono text-[10px] tracking-[0.28em] leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
           FAQ — VISIBLE ACCORDION (Google FAQ rich results)
           Visible to users + bots — matches FAQPage JSON-LD
      ══════════════════════════════════════════════════════ */}
      <section id="faq-section" className="py-24 border-t border-[#F3BA2F]/10 relative overflow-hidden bg-black">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(243,186,47,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.7 }} viewport={{ once:true }} className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-10 bg-[#F3BA2F]/35" />
              <span className="text-[#F3BA2F]/50 font-mono text-[10px] tracking-[0.35em] uppercase">Knowledge Base</span>
              <div className="h-px w-10 bg-[#F3BA2F]/35" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked <span style={{ background:"linear-gradient(90deg,#c8900a,#F3BA2F,#ffe27a,#F3BA2F,#c8900a)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Questions</span>
            </h2>
            <p className="text-white/35 text-sm font-mono tracking-wide">About Faisal Orakzai &amp; Orakzai Group</p>
          </motion.div>
          {/* Accordion items */}
          {[
            { q:"Who is Faisal Orakzai?", a:"Muhammad Faisal Orakzai (فیصل اورکزئی) is a Pakistani technology entrepreneur and computer scientist born on 30 April 2006 in Orakzai Agency, Khyber Pakhtunkhwa (KPK), Pakistan. He is the Founder and Chairman of Orakzai Group — the parent organization behind Orakzai Bond (OKBOND) on Polygon blockchain, OkzByte Technology, Shamim Forever luxury brand, and OrakzaiX AI. He is recognized as one of Pakistan's youngest blockchain architects and technology entrepreneurs." },
            { q:"What is Orakzai Group?", a:"Orakzai Group is a sovereign technology and venture organization founded by Faisal Orakzai, operating across blockchain, artificial intelligence, fintech, luxury commerce, and digital infrastructure. Its ventures include Orakzai Bond (OKBOND) on Polygon, OkzByte Technology, Shamim Forever, OrakzaiX AI, QORIX, and Orakzai Real Estate. Orakzai Group is headquartered in Karachi, Pakistan, with a global operational presence." },
            { q:"What is Orakzai Bond (OKBOND)?", a:"Orakzai Bond (OKBOND) is a blockchain-based digital asset built on the Polygon Layer-2 network by Faisal Orakzai. It is a sovereign tokenized digital asset with transparent treasury systems, staking infrastructure, and DeFi yield mechanisms. OKBOND is available at orakzaibond.com and represents Pakistan's blockchain-native sovereign digital bond instrument." },
            { q:"What companies does Faisal Orakzai own?", a:"Faisal Orakzai is Founder and Chairman of Orakzai Group, which includes: (1) Orakzai Bond (OKBOND) on Polygon blockchain; (2) Shamim Forever — Pakistani luxury fashion brand; (3) OkzByte Technology — AI automation and enterprise software; (4) OrakzaiX AI — artificial intelligence research platform; (5) QORIX — strategic technology venture; (6) Orakzai Real Estate — real estate tokenization and property investment." },
            { q:"Where is Faisal Orakzai from?", a:"Faisal Orakzai is originally from Orakzai Agency (Tirah Valley), Khyber Pakhtunkhwa (KPK), Pakistan. He currently operates from Karachi. He is of Pashtun heritage from the historic Orakzai tribe." },
            { q:"How old is Faisal Orakzai?", a:"Faisal Orakzai was born on 30 April 2006, making him 20 years old as of 2026. He is considered one of Pakistan's youngest founders in blockchain and AI, having launched Orakzai Group and multiple ventures before the age of 20." },
            { q:"Is Faisal Orakzai a Technology Entrepreneur and Computer Scientist?", a:"Yes. Faisal Orakzai is a Pakistani technology entrepreneur and computer scientist. He specializes in blockchain architecture (Polygon, Ethereum, Solidity), artificial intelligence, Web3, DeFi, real-world asset tokenization, and enterprise software engineering. He is the Founder & Chairman of Orakzai Group and creator of OKBOND on Polygon Layer-2 blockchain." },
            { q:"What is Faisal Orakzai's education background?", a:"Faisal Orakzai completed matriculation in Sciences at Ziauddin University (SMC), Karachi (Board of Secondary Education, Karachi). He completed the Founder Institute Program in Karachi — South Asia Chapter 2026. He is also part of Y Combinator's Startup Accelerator Program (2026). Earlier schooling at Yahya Public School, Kohat, and Madrassa Mahad-ul-Uleman, Kohat." },
            { q:"What is OkzByte Technology?", a:"OkzByte Technology (OKZBYTE) is a technology venture under Orakzai Group providing web development, AI automation, blockchain integration, enterprise software, and digital transformation services in Pakistan and internationally." },
            { q:"What is Shamim Forever?", a:"Shamim Forever is a Pakistani luxury fashion and lifestyle brand founded by Faisal Orakzai under Orakzai Group. It blends premium craftsmanship with digital storytelling and Pakistani cultural heritage. Available at shamimforever.com." },
            { q:"What is OrakzaiX AI?", a:"OrakzaiX AI is an artificial intelligence automation platform and research framework under Orakzai Group. It develops AI workflow automation, AI agents, LLM integrations, and AI infrastructure for Pakistani and global markets." },
            { q:"Does Faisal Orakzai publish research papers?", a:"Yes. Faisal Orakzai publishes technical research through Orakzai Research Lab on blockchain architecture, DeFi, AI, digital identity, and smart contracts. Full portfolio at faisalorakzai.com/research. ORCID: 0009-0000-0915-7272. He has published 6 white papers and 10+ research articles." },
            { q:"What technologies does Faisal Orakzai specialize in?", a:"Faisal Orakzai specializes in Blockchain Architecture (Polygon, Ethereum, Solidity), Artificial Intelligence and Machine Learning, Web3 and DeFi, Real World Asset (RWA) Tokenization, Enterprise Software Engineering, Cloud Technologies, and Digital Infrastructure." },
            { q:"What is the Orakzai tribe in Pakistan?", a:"The Orakzai are a proud Pashtun tribe from Orakzai District (formerly Orakzai Agency) in Khyber Pakhtunkhwa (KPK), Pakistan, with deep roots in Tirah Valley. Faisal Orakzai carries this name as tribute to his tribal identity and KPK heritage." },
            { q:"What is Faisal Orakzai's vision and mission?", a:"Faisal Orakzai's mission is to build scalable technology platforms that shape industries — combining AI, blockchain, and real-world economic systems. His vision is Pakistan-originated technology ecosystems competing globally. His philosophy: 'Redefining Asset Ownership Through Blockchain Architecture.'" },
            { q:"What is the official website of Faisal Orakzai?", a:"The official website is faisalorakzai.com. Venture sites: orakzaibond.com (OKBOND) and shamimforever.com. Founder biography at faisalorakzai.com/founder. Social media: @faisalorakzaii on Instagram, X (Twitter), and LinkedIn." },
            { q:"How can I contact Faisal Orakzai or Orakzai Group?", a:"Contact Faisal Orakzai or Orakzai Group at faisalorakzai.com/contact for partnerships, media/press, investment discussions, speaking, and collaboration. Also reachable at chairman@faisalorakzai.com and on LinkedIn and X (Twitter) @faisalorakzaii." },
          ].map(({ q, a }, idx) => (
            <FAQItem key={idx} question={q} answer={a} index={idx} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 pb-44 border-t border-[#F3BA2F]/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-[80px]" style={{ background: "radial-gradient(ellipse, rgba(243,186,47,0.05) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-[#F3BA2F]/30" />
              <span className="text-white/20 font-mono text-[10px] tracking-[0.35em] uppercase">Final Thought</span>
              <div className="h-px w-12 bg-[#F3BA2F]/30" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-12">
              <span className="text-white">The future belongs<br />to those who </span>
              <span className="gold-gradient">build systems,</span>
              <br />
              <span className="text-white">not follow them.</span>
            </h2>
            <Link href="/ecosystem">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-3 px-10 py-5 bg-[#F3BA2F] text-black font-bold tracking-widest text-sm cursor-pointer glow-gold hover:bg-[#ffd666] transition-colors">
                EXPLORE THE ECOSYSTEM <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
    </>
  );
}
