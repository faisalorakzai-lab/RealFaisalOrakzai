import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import {
  Globe, Bot, BarChart2, Users, Shield, Crown, Star,
  Mic, Video, Heart, MessageCircle, ChevronDown, X,
  Wallet, Check, ArrowRight, Zap, Clock, Bell,
  TrendingUp, Lock, Radio
} from "lucide-react";

const GOLD = "#F3BA2F";
const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

function useAnimInView() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return { ref, inView };
}

/* ── Particle dots background ── */
function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full"
          style={{
            background: GOLD,
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            opacity: 0.18,
          }}
          animate={{ opacity: [0.08, 0.35, 0.08], scale: [1, 1.8, 1] }}
          transition={{ duration: 2.5 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

/* ── Sovereign Card (holographic member card) ── */
function SovereignCard({ tier, memberId }: { tier: number; memberId: string }) {
  const badges = ["", "🟣 MATRIX DEVELOPER", "🟡 ENTERPRISE ARCHITECT", "👑 SOVEREIGN FOUNDER"];
  const tierColors = ["", "#a855f7", GOLD, GOLD];
  const joinDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="relative w-full max-w-md mx-auto overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d0d0d 0%, #111 40%, #0a0a0a 100%)",
        border: `1px solid ${tierColors[tier]}44`,
        boxShadow: `0 0 40px ${tierColors[tier]}22, inset 0 0 60px rgba(0,0,0,0.8)`,
        aspectRatio: "1.6 / 1",
      }}
    >
      {/* Holographic shimmer */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, transparent 30%, ${tierColors[tier]}40 50%, transparent 70%)`,
        }}
        animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid mesh */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[8px] tracking-[0.35em] uppercase mb-1" style={{ color: `${tierColors[tier]}99` }}>
              SOVEREIGN MEMBER
            </div>
            <div className="text-white font-semibold text-base">Orakzai Inner Circle</div>
          </div>
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain opacity-80"
            style={{ filter: `drop-shadow(0 0 6px ${tierColors[tier]}60)` }} />
        </div>

        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1 opacity-40">MEMBER ID</div>
          <div className="font-mono text-lg tracking-widest" style={{ color: tierColors[tier] }}>{memberId}</div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1 opacity-40">JOINED</div>
            <div className="text-white/70 text-xs font-mono">{joinDate}</div>
          </div>
          <div
            className="font-mono text-[9px] tracking-widest px-2 py-1 border"
            style={{ color: tierColors[tier], borderColor: `${tierColors[tier]}44` }}
          >
            {badges[tier]}
          </div>
        </div>
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ border: `1px solid ${tierColors[tier]}` }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

/* ── Wallet Modal ── */
function WalletModal({
  open, onClose, selectedTier, onConnect,
}: {
  open: boolean; onClose: () => void; selectedTier: number | null; onConnect: () => void;
}) {
  const [connecting, setConnecting] = useState(false);
  const tierNames = ["", "Matrix Developer — $50/mo", "Enterprise Architect — $100/mo", "Sovereign Founder — $500/mo"];

  const handleConnect = async (wallet: string) => {
    setConnecting(true);
    await new Promise((r) => setTimeout(r, 2200));
    setConnecting(false);
    onConnect();
  };

  const wallets = [
    { name: "MetaMask", icon: "🦊", desc: "Most popular browser wallet" },
    { name: "WalletConnect", icon: "🔵", desc: "Mobile & hardware wallets" },
    { name: "Coinbase Wallet", icon: "🔷", desc: "Coinbase native wallet" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm border border-[#F3BA2F]/20 bg-[#0a0a0a] p-8"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
              <X size={16} />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-px w-4 bg-[#F3BA2F]" />
                <span className="font-mono text-[9px] tracking-[0.35em] text-[#F3BA2F] uppercase">Polygon Network</span>
              </div>
              <h3 className="text-white text-xl font-bold">Connect Wallet</h3>
              <p className="text-white/40 text-xs mt-1">Pay with USDT or USDC on Polygon</p>
            </div>

            {selectedTier && (
              <div className="mb-6 px-3 py-2 border border-[#F3BA2F]/15 bg-[#F3BA2F]/5">
                <div className="font-mono text-[9px] tracking-widest text-[#F3BA2F]/60 uppercase mb-0.5">Selected Tier</div>
                <div className="text-white/80 text-sm">{tierNames[selectedTier]}</div>
              </div>
            )}

            {connecting ? (
              <div className="text-center py-8">
                <motion.div
                  className="w-10 h-10 border-2 border-[#F3BA2F]/30 border-t-[#F3BA2F] rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="text-white/60 text-sm font-mono">Confirming on Polygon...</div>
                <div className="text-white/25 text-xs mt-1 font-mono">Awaiting transaction confirmation</div>
              </div>
            ) : (
              <div className="space-y-2">
                {wallets.map((w) => (
                  <button
                    key={w.name}
                    onClick={() => handleConnect(w.name)}
                    className="w-full flex items-center gap-3 px-4 py-3 border border-white/8 hover:border-[#F3BA2F]/30 hover:bg-[#F3BA2F]/5 transition-all text-left group"
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <div>
                      <div className="text-white/80 text-sm group-hover:text-[#F3BA2F] transition-colors">{w.name}</div>
                      <div className="text-white/30 text-[10px] font-mono">{w.desc}</div>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-[#F3BA2F] transition-colors" />
                  </button>
                ))}
              </div>
            )}

            <p className="mt-5 text-center text-white/20 text-[10px] font-mono leading-relaxed">
              Payments processed via Polygon Network<br />USDT / USDC accepted · Non-custodial
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Feed Post ── */
function FeedPost({ post, delay = 0 }: { post: { type: string; content: string; time: string; likes: number; comments: number }; delay?: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <motion.div
      variants={fade} custom={delay}
      className="border border-white/6 p-4 hover:border-[#F3BA2F]/15 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 flex items-center justify-center shrink-0 font-bold text-xs"
          style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}33` }}
        >
          FO
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white/60 text-xs font-semibold">Faisal Orakzai</span>
            <span className="font-mono text-[8px] tracking-widest text-[#F3BA2F]/50 uppercase">{post.type}</span>
            <span className="text-white/20 text-[10px] font-mono ml-auto shrink-0">{post.time}</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{post.content}</p>
          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 text-white/30 hover:text-[#F3BA2F] transition-colors text-xs"
            >
              <Heart size={12} fill={liked ? GOLD : "none"} style={liked ? { color: GOLD } : {}} />
              <span>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-white/30 hover:text-[#F3BA2F] transition-colors text-xs">
              <MessageCircle size={12} />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Voice Waveform ── */
function VoiceWaveform() {
  const bars = [4, 8, 14, 10, 6, 12, 8, 16, 7, 11, 5, 9];
  return (
    <div className="flex items-end gap-0.5 h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#F3BA2F]"
          style={{ height: `${h}px`, opacity: 0.6 }}
          animate={{ height: [`${h}px`, `${h * 1.8}px`, `${h}px`] }}
          transition={{ duration: 0.5 + (i % 3) * 0.2, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export default function InnerCircle() {
  const [connected, setConnected] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [memberId] = useState(() => `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [memberTier, setMemberTier] = useState(2);

  const { ref: heroRef, inView: heroInView } = useAnimInView();
  const { ref: benefitsRef, inView: benefitsInView } = useAnimInView();
  const { ref: pricingRef, inView: pricingInView } = useAnimInView();
  const { ref: dashRef, inView: dashInView } = useAnimInView();

  const openWallet = (tier: number) => {
    setSelectedTier(tier);
    setShowWalletModal(true);
  };

  const handleConnect = () => {
    setMemberTier(selectedTier ?? 2);
    setShowWalletModal(false);
    setConnected(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tierPrices = ["", "$50", "$100", "$500"];
  const tierSuffix = "/month";

  const benefits = [
    { icon: <Globe size={22} />, title: "Global Sovereign Network", desc: "Elite founders, investors, and builders across 40+ countries. Real relationships, real capital, real power." },
    { icon: <Bot size={22} />, title: "AI & Algorithmic Edge", desc: "Access to 98 AI systems, quantitative trading bots, and proprietary algorithmic strategies used by our team." },
    { icon: <BarChart2 size={22} />, title: "Institutional-Grade Signals", desc: "Daily Forex & Crypto signals from an expert analyst team. Stop guessing — trade with institutional precision." },
    { icon: <Users size={22} />, title: "Exclusive Community Hub", desc: "Live Zoom masterclasses, voice rooms, real-time signal feed, and daily market analysis — all inside one hub." },
  ];

  const tiers = [
    {
      tier: 1, name: "The Matrix Developer", price: "$50", period: "/month",
      badge: "🟣 Matrix Developer", badgeColor: "#a855f7",
      glow: false, popular: false,
      features: [
        "Premium Blockchain & AI Knowledge Base",
        "Daily Forex & Crypto Trading Signals",
        "Crypto Deep Analysis & Learning",
        "Community Signal Feed Access",
        "Matrix Developer Profile Badge",
      ],
    },
    {
      tier: 2, name: "The Enterprise Architect", price: "$100", period: "/month",
      badge: "🟡 Enterprise Architect", badgeColor: GOLD,
      glow: true, popular: true,
      features: [
        "Everything in Tier 1",
        "Higher Frequency Signals (2× daily)",
        "Priority Support & Direct Response",
        "10% Flat Discount on OkzByte Development",
        "Enterprise Architect Profile Badge",
      ],
    },
    {
      tier: 3, name: "The Sovereign Founder", price: "$500", period: "/month",
      badge: "👑 Sovereign Founder", badgeColor: GOLD,
      glow: false, popular: false,
      features: [
        "Everything in Tier 1 & 2",
        "1-on-1 Zoom Masterclasses with Founder",
        "Personal Brand Deployment Managed by Team",
        "VIP Voice Room — Speak Live with Founder",
        "Sovereign Founder Profile Badge",
      ],
    },
  ];

  const feedPosts = [
    { type: "SIGNAL", content: "📊 BTC/USD — LONG Signal · Entry: $67,450 · TP1: $69,200 · TP2: $71,000 · SL: $66,000 · Confidence: HIGH. Risk 1-2% per trade max.", time: "2m ago", likes: 34, comments: 8 },
    { type: "ANALYSIS", content: "🔍 ETH/USDT Market Structure — Bullish divergence forming on 4H RSI. Key support holding at $3,420. Watch for a breakout above $3,580 to confirm continuation. Next resistance: $3,750.", time: "18m ago", likes: 27, comments: 5 },
    { type: "FOREX", content: "💱 EUR/USD Signal — SHORT · Entry: 1.0847 · TP1: 1.0790 · TP2: 1.0740 · SL: 1.0890 · Session: London Open. NFP data due Friday — manage risk accordingly.", time: "1h ago", likes: 19, comments: 3 },
    { type: "LEARNING", content: "📚 Module 7 is live: Wyckoff Accumulation Method — Understanding institutional order flow, spring patterns, and sign-of-strength candles. 45-minute deep-dive in the Knowledge Base.", time: "3h ago", likes: 41, comments: 12 },
    { type: "ANNOUNCEMENT", content: "🔔 NEXT ZOOM SESSION: Saturday, July 5 · 8:00 PM PKT — Advanced Risk Management & Portfolio Sizing. This will be a live Q&A session. All tiers welcome. Link in your dashboard.", time: "5h ago", likes: 56, comments: 18 },
  ];

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  const expiryStr = expiryDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const daysLeft = 30;

  /* ══ DASHBOARD VIEW ══ */
  if (connected) {
    const tierNames = ["", "Matrix Developer", "Enterprise Architect", "Sovereign Founder"];
    const tierColors = ["", "#a855f7", GOLD, GOLD];

    return (
      <>
        <SEOHead
          title="Inner Circle Dashboard — Faisal Orakzai"
          description="Your exclusive Inner Circle community hub"
        />
        <div className="min-h-screen bg-black">

          {/* Dashboard Header */}
          <div className="border-b border-[#F3BA2F]/10 bg-black pt-20 pb-6 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="h-px w-4 bg-[#F3BA2F]" />
                    <span className="font-mono text-[9px] tracking-[0.35em] text-[#F3BA2F] uppercase">Member Dashboard</span>
                  </div>
                  <h1 className="text-white text-2xl font-bold">The Inner Circle</h1>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 border font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: tierColors[memberTier], borderColor: `${tierColors[memberTier]}33` }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: tierColors[memberTier] }}
                  />
                  {tierNames[memberTier]}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div
              ref={dashRef}
              initial="hidden"
              animate={dashInView ? "show" : "hidden"}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="space-y-10"
            >

              {/* ── Sovereign Card ── */}
              <motion.section variants={fade}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px w-4 bg-[#F3BA2F]/50" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">Your Sovereign Card</span>
                </div>
                <SovereignCard tier={memberTier} memberId={memberId} />
              </motion.section>

              {/* ── Community Feed ── */}
              <motion.section variants={fade}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-px w-4 bg-[#F3BA2F]/50" />
                    <span className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">Daily Signals Feed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase">Live</span>
                  </div>
                </div>

                <motion.div
                  className="space-y-2"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                >
                  {feedPosts.map((post, i) => (
                    <FeedPost key={i} post={post} delay={i * 0.08} />
                  ))}
                </motion.div>

                {/* Post bar */}
                <div className="mt-4 flex items-center gap-3 border border-white/8 px-4 py-3">
                  <div
                    className="w-7 h-7 flex items-center justify-center shrink-0 font-bold text-[10px]"
                    style={{ background: `${GOLD}22`, color: GOLD }}
                  >
                    YOU
                  </div>
                  <span className="text-white/25 text-sm flex-1">Share your trade results or feedback...</span>
                </div>
              </motion.section>

              {/* ── Sessions ── */}
              <motion.section variants={fade}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px w-4 bg-[#F3BA2F]/50" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">Live Sessions</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Zoom */}
                  <div className="border border-white/8 p-6 hover:border-[#F3BA2F]/20 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Video size={18} style={{ color: GOLD }} />
                        <span className="font-mono text-[9px] tracking-widest text-[#F3BA2F] uppercase">Zoom Masterclass</span>
                      </div>
                      <span className="font-mono text-[8px] tracking-widest text-white/25 border border-white/10 px-1.5 py-0.5">SCHEDULED</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Forex Masterclass — Advanced Risk Management</h3>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs font-mono mb-5">
                      <Clock size={11} />
                      <span>Saturday, July 5, 2026 · 8:00 PM PKT</span>
                    </div>
                    <button
                      className="w-full py-2.5 border border-[#F3BA2F]/30 text-[#F3BA2F] text-xs font-bold tracking-wider hover:bg-[#F3BA2F]/10 transition-colors font-mono"
                      onClick={() => alert("Zoom session link will be sent to members 30 minutes before the session starts.")}
                    >
                      JOIN ZOOM SESSION
                    </button>
                  </div>

                  {/* Voice Room */}
                  <div className="border border-white/8 p-6 hover:border-[#F3BA2F]/20 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Radio size={18} style={{ color: GOLD }} />
                        <span className="font-mono text-[9px] tracking-widest text-[#F3BA2F] uppercase">Voice Room</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-red-400"
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <span className="font-mono text-[8px] tracking-widest text-red-400 uppercase">Live Now</span>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Weekly Market Briefing</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 text-white/40 text-xs font-mono">
                        <Mic size={11} />
                        <span>12 listening</span>
                      </div>
                      <VoiceWaveform />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="py-2 border border-white/15 text-white/60 text-xs font-bold tracking-wider hover:border-[#F3BA2F]/30 hover:text-[#F3BA2F] transition-colors font-mono"
                        onClick={() => alert("Joining as listener...")}
                      >
                        JOIN LISTEN
                      </button>
                      <button
                        className="py-2 bg-[#F3BA2F] text-black text-xs font-bold tracking-wider hover:bg-[#ffd666] transition-colors font-mono"
                        onClick={() => alert("Raise hand request sent to host.")}
                      >
                        RAISE HAND 🖐
                      </button>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* ── Subscription Status ── */}
              <motion.section variants={fade}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-px w-4 bg-[#F3BA2F]/50" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">Subscription</span>
                </div>

                <div className="border border-white/8 p-6">
                  <div className="flex flex-wrap gap-6 justify-between mb-5">
                    <div>
                      <div className="font-mono text-[9px] tracking-widest text-white/25 uppercase mb-1">Active Tier</div>
                      <div className="font-semibold" style={{ color: tierColors[memberTier] }}>{tierNames[memberTier]}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-widest text-white/25 uppercase mb-1">Renews On</div>
                      <div className="text-white/70 text-sm">{expiryStr}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-widest text-white/25 uppercase mb-1">Days Remaining</div>
                      <div className="text-white font-bold">{daysLeft} days</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="h-0.5 bg-white/8 w-full">
                      <motion.div
                        className="h-full"
                        style={{ background: tierColors[memberTier] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(daysLeft / 30) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  <button
                    className="px-6 py-2.5 bg-[#F3BA2F] text-black text-xs font-bold tracking-wider hover:bg-[#ffd666] transition-colors font-mono"
                    onClick={() => openWallet(memberTier)}
                  >
                    RENEW SUBSCRIPTION
                  </button>
                </div>
              </motion.section>

            </motion.div>
          </div>
        </div>

        <WalletModal
          open={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          selectedTier={selectedTier}
          onConnect={handleConnect}
        />
      </>
    );
  }

  /* ══ PUBLIC LANDING VIEW ══ */
  return (
    <>
      <SEOHead
        title="Inner Circle — Sovereign Tech & Wealth Guild | Faisal Orakzai"
        description="The Sovereign Tech & Wealth Guild. Join the Inner Circle — elite Forex/Crypto signals, AI knowledge, 1-on-1 masterclasses, and a global community hub."
      />

      <div className="min-h-screen bg-black">

        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
          <GoldParticles />

          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(243,186,47,0.07) 0%, transparent 70%)",
            }}
          />

          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "show" : "hidden"}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <motion.div variants={fade} className="mb-4">
              <span className="font-mono text-[9px] tracking-[0.5em] text-[#F3BA2F]/60 uppercase">
                Orakzai Group · Inner Circle
              </span>
            </motion.div>

            <motion.h1 variants={fade} className="text-4xl sm:text-6xl lg:text-7xl font-black mb-4 leading-none tracking-tight">
              <span className="text-white">THE SOVEREIGN</span>
              <br />
              <span style={{ color: GOLD }}>TECH & WEALTH</span>
              <br />
              <span className="text-white">GUILD</span>
            </motion.h1>

            {/* Gold line */}
            <motion.div
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 0.8 }}
              className="h-px bg-[#F3BA2F] max-w-xs mx-auto mb-6 origin-left"
              style={{ boxShadow: "0 0 12px rgba(243,186,47,0.6)" }}
            />

            <motion.h2 variants={fade} className="text-xl sm:text-2xl font-bold text-white/70 mb-4">
              Enter The Inner Circle
            </motion.h2>

            <motion.p variants={fade} className="font-mono text-sm tracking-[0.3em] text-[#F3BA2F]/60 uppercase mb-10">
              Master the Code. Rule the World.
            </motion.p>

            <motion.div variants={fade} className="flex flex-wrap justify-center gap-4">
              <a
                href="#pricing"
                className="flex items-center gap-2 px-6 py-3 border border-[#F3BA2F]/30 text-[#F3BA2F] text-sm font-bold tracking-wider hover:bg-[#F3BA2F]/10 transition-colors font-mono"
              >
                VIEW MEMBERSHIP TIERS
                <ChevronDown size={16} />
              </a>
              <button
                onClick={() => { setSelectedTier(2); setShowWalletModal(true); }}
                className="flex items-center gap-2 px-6 py-3 bg-[#F3BA2F] text-black text-sm font-bold tracking-wider hover:bg-[#ffd666] transition-colors font-mono"
              >
                <Wallet size={16} />
                CONNECT WALLET
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={18} className="text-white/20" />
          </motion.div>
        </section>

        {/* ─── BENEFITS ─── */}
        <section className="py-24 px-6 border-t border-white/6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              ref={benefitsRef}
              initial="hidden"
              animate={benefitsInView ? "show" : "hidden"}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fade} className="mb-12">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-4 bg-[#F3BA2F]" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-[#F3BA2F] uppercase">The Protocol</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Why The Inner Circle<br />
                  <span style={{ color: GOLD }}>Exists</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    variants={fade}
                    custom={i * 0.08}
                    className="border border-white/8 p-6 hover:border-[#F3BA2F]/30 transition-all group"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#F3BA2F]/30 transition-colors"
                      style={{ color: GOLD }}
                    >
                      {b.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-2 text-sm group-hover:text-[#F3BA2F] transition-colors">{b.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="py-24 px-6 border-t border-white/6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              ref={pricingRef}
              initial="hidden"
              animate={pricingInView ? "show" : "hidden"}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={fade} className="mb-14 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="h-px w-4 bg-[#F3BA2F]" />
                  <span className="font-mono text-[9px] tracking-[0.35em] text-[#F3BA2F] uppercase">Membership Tiers</span>
                  <div className="h-px w-4 bg-[#F3BA2F]" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  Choose Your<br />
                  <span style={{ color: GOLD }}>Sovereignty Level</span>
                </h2>
                <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
                  All memberships paid in USDT/USDC on Polygon. Access is auto-granted upon on-chain confirmation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((t) => (
                  <motion.div
                    key={t.tier}
                    variants={fade}
                    custom={t.tier * 0.1}
                    className="relative border p-7 flex flex-col"
                    style={{
                      background: t.popular ? "#0a0a0a" : "black",
                      borderColor: t.popular ? `${GOLD}44` : "rgba(255,255,255,0.08)",
                      boxShadow: t.popular ? `0 0 40px ${GOLD}12` : undefined,
                    }}
                  >
                    {t.popular && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-black font-bold font-mono text-[9px] tracking-widest uppercase"
                        style={{ background: GOLD }}
                      >
                        MOST POPULAR
                      </div>
                    )}

                    {/* Badge */}
                    <div
                      className="inline-flex items-center gap-1.5 mb-5 font-mono text-[9px] tracking-widest uppercase border px-2 py-1 self-start"
                      style={{ color: t.badgeColor, borderColor: `${t.badgeColor}33` }}
                    >
                      {t.badge}
                    </div>

                    <h3 className="text-white font-bold text-lg mb-1">{t.name}</h3>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-black" style={{ color: t.badgeColor }}>{t.price}</span>
                      <span className="text-white/30 text-sm font-mono">{t.period}</span>
                    </div>

                    <div className="space-y-2.5 flex-1 mb-7">
                      {t.features.map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <Check size={13} className="mt-0.5 shrink-0" style={{ color: t.badgeColor }} />
                          <span className="text-white/60 text-sm leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => openWallet(t.tier)}
                      className="w-full py-3 font-bold text-xs tracking-wider font-mono transition-all flex items-center justify-center gap-2"
                      style={
                        t.popular
                          ? { background: GOLD, color: "black" }
                          : { border: `1px solid ${t.badgeColor}44`, color: t.badgeColor }
                      }
                      onMouseEnter={(e) => {
                        if (!t.popular) {
                          (e.currentTarget as HTMLButtonElement).style.background = `${t.badgeColor}10`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!t.popular) {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        }
                      }}
                    >
                      <Wallet size={14} />
                      CONNECT WALLET · JOIN TIER {t.tier}
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fade} className="mt-10 text-center">
                <p className="text-white/20 text-xs font-mono">
                  All tiers require USDT or USDC on Polygon Network · Auto-revoke on non-renewal after 30 days
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── COMMUNITY HUB PREVIEW ─── */}
        <section className="py-24 px-6 border-t border-white/6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-4 bg-[#F3BA2F]" />
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#F3BA2F] uppercase">Inside The Hub</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                  A Living, Breathing<br />
                  <span style={{ color: GOLD }}>Community Hub</span>
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: <BarChart2 size={16} />, title: "Real-Time Signal Feed", desc: "Daily Forex/Crypto signals posted live. Like, comment, and share trade results — updated in real-time." },
                    { icon: <Video size={16} />, title: "Integrated Zoom Masterclasses", desc: "Join live interactive sessions with the founder. One-click access from inside your dashboard." },
                    { icon: <Mic size={16} />, title: "Voice Rooms (Audio Spaces)", desc: "Twitter Spaces-style live audio rooms. Listen, raise your hand, get unmuted. Real conversations, real alpha." },
                    { icon: <Shield size={16} />, title: "Gated Members Only", desc: "Access revokes automatically if you don't renew. Your membership, your sovereignty, maintained on-chain." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div
                        className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5 border border-white/10"
                        style={{ color: GOLD }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold mb-0.5">{item.title}</div>
                        <div className="text-white/40 text-xs leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview card */}
              <div className="border border-white/8 p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#F3BA2F] uppercase">Live Feed Preview</span>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="font-mono text-[8px] text-emerald-400">LIVE</span>
                  </div>
                </div>

                {feedPosts.slice(0, 3).map((post, i) => (
                  <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className="w-6 h-6 flex items-center justify-center font-bold text-[9px]"
                        style={{ background: `${GOLD}22`, color: GOLD }}
                      >
                        FO
                      </div>
                      <span className="font-mono text-[8px] tracking-widest text-[#F3BA2F]/50 uppercase">{post.type}</span>
                      <span className="text-white/20 text-[9px] font-mono ml-auto">{post.time}</span>
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{post.content}</p>
                  </div>
                ))}

                <div className="pt-2 text-center">
                  <span className="font-mono text-[9px] tracking-widest text-white/20 uppercase">Members-only · Join to unlock full feed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-24 px-6 border-t border-white/6">
          <div className="max-w-3xl mx-auto text-center">
            <Crown size={36} className="mx-auto mb-6" style={{ color: GOLD }} />
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Ready to Enter<br />
              <span style={{ color: GOLD }}>The Inner Circle?</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-md mx-auto">
              Join a sovereign network of builders and investors. Real signals.
              Real knowledge. Real community. Paid on-chain — no gatekeepers.
            </p>
            <button
              onClick={() => { setSelectedTier(2); setShowWalletModal(true); }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#F3BA2F] text-black font-bold tracking-wider hover:bg-[#ffd666] transition-colors font-mono text-sm"
            >
              <Wallet size={18} />
              CONNECT WALLET · BEGIN
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>

      <WalletModal
        open={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        selectedTier={selectedTier}
        onConnect={handleConnect}
      />
    </>
  );
}
