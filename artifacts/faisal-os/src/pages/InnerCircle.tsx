/**
 * OkzByte Hub — Five-Phase Membership System
 * Phase 1: Cinematic Intro
 * Phase 2: Wallet Connect (window.ethereum / MetaMask)
 * Phase 3: 3-Tier Subscription Cards
 * Phase 4: Canvas Membership Card Generator
 * Phase 5: Gated Community Hub (with expiry logic)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Globe, Bot, BarChart2, Users, Shield, Crown, Mic, Video,
  Heart, MessageCircle, Clock, Radio, ChevronRight, ChevronDown,
  Check, Wallet, Upload, Download, ArrowRight, X, Zap,
} from "lucide-react";

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const GOLD = "#F3BA2F";
const OWNER = "0x9b02e2edd6f58d626aaa91889708dbf39dfa8cd7";
const USDT_POLYGON = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const CHAIN_ID_POLYGON = "0x89";
const MS_30_DAYS = 30 * 24 * 60 * 60 * 1000;

const LS = {
  get: (k: string) => localStorage.getItem(k) ?? "",
  set: (k: string, v: string) => localStorage.setItem(k, v),
  del: (...keys: string[]) => keys.forEach((k) => localStorage.removeItem(k)),
};

const genMemberId = () => {
  const ex = LS.get("okz_member_id");
  if (ex) return ex;
  const id = `OKZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  LS.set("okz_member_id", id);
  return id;
};

type Tier = 1 | 2 | 3;
type Step = "intro" | "wallet" | "tiers" | "card" | "community";

const TIER_CFG = {
  1: {
    name: "Matrix Developer",
    price: 50,
    priceLabel: "$50",
    period: "/month",
    badgeText: "MATRIX DEVELOPER",
    emoji: "🟣",
    accent: "#a855f7",
    cardBg: ["#080814", "#10082a"],
    features: [
      "Premium Blockchain & AI Knowledge Base",
      "Daily Forex & Crypto Trading Signals",
      "Crypto Deep-Dive Analysis",
      "Community Signal Feed Access",
      "Matrix Developer Profile Badge",
    ],
  },
  2: {
    name: "Enterprise Architect",
    price: 100,
    priceLabel: "$100",
    period: "/month",
    badgeText: "ENTERPRISE ARCHITECT",
    emoji: "🟡",
    accent: GOLD,
    cardBg: ["#0a0a08", "#1a1200"],
    features: [
      "Everything in Tier 1",
      "2× Daily High-Frequency Signals",
      "Priority Direct Support & Response",
      "10% Discount on OkzByte Development",
      "Enterprise Architect Profile Badge",
    ],
  },
  3: {
    name: "Sovereign Founder",
    price: 500,
    priceLabel: "$500",
    period: "/month",
    badgeText: "SOVEREIGN FOUNDER",
    emoji: "👑",
    accent: GOLD,
    cardBg: ["#090808", "#180a00"],
    features: [
      "Everything in Tier 1 & 2",
      "1-on-1 Zoom Masterclass with Founder",
      "Personal Brand Deployment by Team",
      "VIP Voice Room — Speak Live with Founder",
      "Sovereign Founder Profile Badge",
    ],
  },
} as const;

/* ─────────────────────────────────────────
   CANVAS CARD GENERATOR
───────────────────────────────────────── */
async function drawCard(
  canvas: HTMLCanvasElement,
  opts: { name: string; photoUrl: string | null; tier: Tier; memberId: string }
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = 900, H = 540;
  canvas.width = W;
  canvas.height = H;
  const cfg = TIER_CFG[opts.tier];

  // Background gradient
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, cfg.cardBg[0]);
  bg.addColorStop(1, cfg.cardBg[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = cfg.accent + "18";
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= W; x += 28) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y <= H; y += 28) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

  // Diagonal glare overlay
  const glare = ctx.createLinearGradient(0, 0, W, H);
  glare.addColorStop(0, "transparent");
  glare.addColorStop(0.45, cfg.accent + "09");
  glare.addColorStop(0.55, cfg.accent + "06");
  glare.addColorStop(1, "transparent");
  ctx.fillStyle = glare;
  ctx.fillRect(0, 0, W, H);

  // Tier-3 crown watermark
  if (opts.tier === 3) {
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = GOLD;
    ctx.font = "bold 200px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("♛", W / 2, H / 2);
    ctx.restore();
  }

  // Corner L-brackets
  const cw = 55;
  const corners: [number, number, number, number][] = [
    [0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1],
  ];
  ctx.strokeStyle = cfg.accent;
  ctx.lineWidth = opts.tier === 3 ? 3 : 2;
  corners.forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(cx + dx * cw, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + dy * cw);
    ctx.stroke();
  });

  // Photo circle
  const CX = 145, CY = H / 2, R = 80;
  ctx.save();
  ctx.beginPath();
  ctx.arc(CX, CY, R, 0, Math.PI * 2);
  ctx.clip();
  if (opts.photoUrl) {
    const img = new Image();
    img.src = opts.photoUrl;
    await new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res(); });
    ctx.drawImage(img, CX - R, CY - R, R * 2, R * 2);
  } else {
    ctx.fillStyle = cfg.accent + "22";
    ctx.fillRect(CX - R, CY - R, R * 2, R * 2);
    ctx.fillStyle = cfg.accent;
    ctx.font = "bold 44px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((opts.name || "M")[0].toUpperCase(), CX, CY);
  }
  ctx.restore();
  // Ring
  ctx.strokeStyle = cfg.accent;
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = cfg.accent + "33";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(CX, CY, R + 10, 0, Math.PI * 2); ctx.stroke();

  // Divider
  ctx.strokeStyle = cfg.accent + "28";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(255, 55); ctx.lineTo(255, H - 55); ctx.stroke();

  // Right panel
  const RX = 285;
  ctx.textAlign = "start";
  ctx.textBaseline = "alphabetic";

  // OkzByte Hub label
  ctx.fillStyle = cfg.accent;
  ctx.font = "bold 10px monospace";
  ctx.fillText("O K Z B Y T E  H U B", RX, 100);

  // Name
  const fontSize = opts.name && opts.name.length > 20 ? 22 : 28;
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.fillText(opts.name || "SOVEREIGN MEMBER", RX, 148);

  // Tier badge pill
  ctx.fillStyle = cfg.accent + "25";
  ctx.fillRect(RX, 160, 240, 28);
  ctx.strokeStyle = cfg.accent + "50";
  ctx.lineWidth = 1;
  ctx.strokeRect(RX, 160, 240, 28);
  ctx.fillStyle = cfg.accent;
  ctx.font = "10px monospace";
  ctx.fillText(`${cfg.emoji}  ${cfg.badgeText}`, RX + 10, 179);

  // Member ID
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  ctx.font = "9px monospace";
  ctx.fillText("MEMBER ID", RX, 222);
  ctx.fillStyle = cfg.accent;
  ctx.font = "bold 16px monospace";
  ctx.fillText(opts.memberId, RX, 246);

  // Dates
  const now = new Date();
  const joinStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const expDate = new Date(now.getTime() + MS_30_DAYS);
  const expStr = expDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.font = "9px monospace";
  ctx.fillText("ISSUED", RX, 288);
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = "12px monospace";
  ctx.fillText(joinStr, RX, 308);

  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.font = "9px monospace";
  ctx.fillText("EXPIRES", RX + 165, 288);
  ctx.fillStyle = cfg.accent;
  ctx.font = "12px monospace";
  ctx.fillText(expStr, RX + 165, 308);

  // Price
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.font = "9px monospace";
  ctx.fillText("SUBSCRIPTION", RX, 358);
  ctx.fillStyle = cfg.accent;
  ctx.font = `bold ${opts.tier === 1 ? 22 : 22}px monospace`;
  ctx.fillText(`${cfg.priceLabel}/month`, RX, 382);

  // Polygon badge bottom right
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.font = "8px monospace";
  ctx.textAlign = "right";
  ctx.fillText("Powered by Polygon Network · OkzByte Hub", W - 30, H - 22);
  ctx.textAlign = "start";

  // Outer border
  ctx.strokeStyle = cfg.accent + "55";
  ctx.lineWidth = 1;
  ctx.strokeRect(1, 1, W - 2, H - 2);

  // Inner glow border (tier 2 & 3)
  if (opts.tier >= 2) {
    const innerGlow = ctx.createLinearGradient(0, 0, W, 0);
    innerGlow.addColorStop(0, cfg.accent + "00");
    innerGlow.addColorStop(0.5, cfg.accent + "33");
    innerGlow.addColorStop(1, cfg.accent + "00");
    ctx.strokeStyle = innerGlow;
    ctx.lineWidth = 1;
    ctx.strokeRect(5, 5, W - 10, H - 10);
  }
}

/* ─────────────────────────────────────────
   SHARED UI ATOMS
───────────────────────────────────────── */
function GoldParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2, height: 2, background: GOLD,
            left: `${(i * 41 + 7) % 100}%`,
            top: `${(i * 59 + 13) % 100}%`,
            opacity: 0.15,
          }}
          animate={{ opacity: [0.06, 0.3, 0.06], scale: [1, 2, 1] }}
          transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </div>
  );
}

function Label({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="h-px w-4" style={{ background: GOLD }} />
      <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: GOLD }}>
        {text}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   PHASE 1 — CINEMATIC INTRO
───────────────────────────────────────── */
function IntroPhase({ onNext }: { onNext: () => void }) {
  const benefits = [
    { icon: <Globe size={20} />, title: "Global Sovereign Network", desc: "Elite founders, investors & builders across 40+ countries. Real relationships, real capital." },
    { icon: <Bot size={20} />, title: "AI & Algorithmic Edge", desc: "Access to 98 AI systems, quant bots, and proprietary strategies used by our core team." },
    { icon: <BarChart2 size={20} />, title: "Institutional-Grade Signals", desc: "Daily Forex & Crypto signals. Stop guessing — trade with institutional precision." },
    { icon: <Users size={20} />, title: "The Living Community Hub", desc: "Zoom masterclasses, live voice rooms, real-time signal feed — all inside one sovereign ecosystem." },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
        <GoldParticles />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 55% at 50% 60%, rgba(243,186,47,0.08) 0%, transparent 70%)" }}
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mb-5"
          >
            <span className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: `${GOLD}88` }}>
              Orakzai Group · Faisal Orakzai
            </span>
          </motion.div>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-5"
          >
            <span className="text-white">OkzByte</span>
            <br />
            <span style={{ color: GOLD }}>Hub</span>
          </motion.h1>

          <motion.div
            variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 0.9 } } }}
            className="h-px max-w-xs mx-auto mb-7 origin-left"
            style={{ background: GOLD, boxShadow: `0 0 16px ${GOLD}80` }}
          />

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="font-mono text-sm tracking-[0.35em] uppercase mb-3"
            style={{ color: `${GOLD}80` }}
          >
            Master the Code. Rule the World.
          </motion.p>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto mb-12"
          >
            OkzByte Hub was forged from a single conviction: the world's most powerful knowledge —
            algorithmic trading, blockchain architecture, and sovereign AI systems — should belong to
            those who have the courage to master it. This is not a community. This is an ecosystem.
          </motion.p>

          <motion.button
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            onClick={onNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 font-bold tracking-wider font-mono text-sm text-black"
            style={{ background: GOLD, boxShadow: `0 0 30px ${GOLD}50` }}
          >
            <Zap size={16} />
            ENTER THE ECOSYSTEM
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={18} className="text-white/20" />
        </motion.div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Label text="The Philosophy" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                  Built on the Architecture<br />
                  <span style={{ color: GOLD }}>of Sovereignty</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mb-4">
                  In 2024, Faisal Orakzai began deploying AI systems and algorithmic trading bots
                  across Polygon L2 — generating institutional-level market intelligence that was
                  inaccessible to the public.
                </p>
                <p className="text-white/40 text-sm leading-relaxed mb-4">
                  OkzByte Hub is the gateway to that intelligence. A sovereign, on-chain membership
                  system where access is cryptographically proven, not promised.
                </p>
                <p className="text-white/40 text-sm leading-relaxed">
                  Your membership lives on Polygon. Your signals are live. Your community is real.
                  No middlemen. No gatekeepers. Only builders, investors, and sovereign minds.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { stat: "98", label: "AI Systems Deployed" },
                  { stat: "40+", label: "Countries in the Network" },
                  { stat: "Polygon", label: "On-Chain Verification" },
                  { stat: "30 Day", label: "Auto-Renewing Membership" },
                ].map((s) => (
                  <div
                    key={s.stat}
                    className="flex items-center gap-4 border border-white/[0.06] px-5 py-4"
                  >
                    <span className="text-2xl font-black" style={{ color: GOLD }}>{s.stat}</span>
                    <span className="text-white/50 text-sm">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <Label text="The Ecosystem" />
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              What You Unlock<br />
              <span style={{ color: GOLD }}>Inside the Hub</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-white/[0.07] p-6 group hover:border-[#F3BA2F]/30 transition-colors"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center mb-4 border border-white/10 group-hover:border-[#F3BA2F]/30 transition-colors"
                  style={{ color: GOLD }}
                >
                  {b.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm group-hover:text-[#F3BA2F] transition-colors">
                  {b.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-white/[0.05] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Crown size={34} className="mx-auto mb-6" style={{ color: GOLD }} />
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Are You Ready to Enter<br />
            <span style={{ color: GOLD }}>The Ecosystem?</span>
          </h2>
          <p className="text-white/35 text-sm mb-10 max-w-md mx-auto">
            Connect your wallet. Choose your tier. Receive your membership card.
            Access the hub. All on-chain. All sovereign.
          </p>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 font-bold tracking-wider font-mono text-sm text-black"
            style={{ background: GOLD, boxShadow: `0 0 30px ${GOLD}50` }}
          >
            <Wallet size={16} />
            ENTER THE ECOSYSTEM
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────
   PHASE 2 — WALLET CONNECT
───────────────────────────────────────── */
function WalletPhase({ onConnected }: { onConnected: (addr: string) => void }) {
  const [status, setStatus] = useState<"idle" | "connecting" | "switching" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const connectMetaMask = async () => {
    const eth = (window as Window & { ethereum?: { request: (o: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
    if (!eth) {
      setErrMsg("MetaMask not detected. Please install the MetaMask browser extension.");
      setStatus("error");
      return;
    }
    try {
      setStatus("connecting");
      setErrMsg("");
      const accounts = await eth.request({ method: "eth_requestAccounts" }) as string[];
      const addr = accounts[0];

      // Switch to Polygon
      setStatus("switching");
      try {
        await eth.request({ method: "wallet_switchEthereumChain", params: [{ chainId: CHAIN_ID_POLYGON }] });
      } catch (switchErr: unknown) {
        const err = switchErr as { code?: number };
        if (err?.code === 4902) {
          await eth.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: CHAIN_ID_POLYGON,
              chainName: "Polygon Mainnet",
              nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
              rpcUrls: ["https://polygon-rpc.com/"],
              blockExplorerUrls: ["https://polygonscan.com/"],
            }],
          });
        }
      }
      onConnected(addr);
    } catch (e: unknown) {
      const err = e as { code?: number; message?: string };
      if (err?.code !== 4001) {
        setErrMsg(err?.message || "Connection failed. Please try again.");
        setStatus("error");
      } else {
        setStatus("idle");
      }
    }
  };

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "🦊",
      desc: "Browser extension wallet",
      action: connectMetaMask,
      real: true,
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "🔵",
      desc: "Mobile & hardware wallets",
      action: () => { setErrMsg("Scan the QR from your mobile wallet app. (WalletConnect SDK coming soon.)"); setStatus("error"); },
      real: false,
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "🔷",
      desc: "Coinbase native wallet",
      action: () => { setErrMsg("Open Coinbase Wallet and use WalletConnect to connect. (Native SDK coming soon.)"); setStatus("error"); },
      real: false,
    },
  ];

  const busy = status === "connecting" || status === "switching";

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <GoldParticles />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-sm"
      >
        <Label text="Phase 2 · Authentication" />
        <h1 className="text-3xl font-black text-white mb-2">Connect Your<br /><span style={{ color: GOLD }}>Web3 Wallet</span></h1>
        <p className="text-white/40 text-sm mb-8">
          Connect on Polygon Network. USDT / USDC accepted.
        </p>

        {/* Network badge */}
        <div className="flex items-center gap-2 mb-6 px-3 py-2 border border-[#F3BA2F]/20 bg-[#F3BA2F]/5 w-fit">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-[9px] tracking-widest text-[#F3BA2F]/70 uppercase">Polygon Mainnet</span>
        </div>

        {busy ? (
          <div className="text-center py-12 border border-white/[0.07]">
            <motion.div
              className="w-12 h-12 border-2 border-[#F3BA2F]/20 border-t-[#F3BA2F] rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="text-white/60 text-sm font-mono">
              {status === "connecting" ? "Requesting account access..." : "Switching to Polygon..."}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {wallets.map((w) => (
              <button
                key={w.id}
                onClick={w.action}
                className="w-full flex items-center gap-4 px-5 py-4 border border-white/[0.08] hover:border-[#F3BA2F]/30 hover:bg-[#F3BA2F]/5 transition-all text-left group"
              >
                <span className="text-2xl">{w.icon}</span>
                <div className="flex-1">
                  <div className="text-white/80 text-sm font-medium group-hover:text-[#F3BA2F] transition-colors">
                    {w.name}
                    {w.real && <span className="ml-2 font-mono text-[8px] tracking-widest text-emerald-400 border border-emerald-400/30 px-1 py-0.5">RECOMMENDED</span>}
                  </div>
                  <div className="text-white/30 text-[10px] font-mono">{w.desc}</div>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-[#F3BA2F] transition-colors" />
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 p-3 border border-red-500/30 bg-red-500/10 flex items-start gap-2"
            >
              <X size={13} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-red-400 text-xs font-mono leading-relaxed">{errMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-white/15 text-[10px] font-mono">
          Payments go directly to owner wallet<br />
          <span className="text-[#F3BA2F]/30">{OWNER.slice(0, 18)}...{OWNER.slice(-6)}</span>
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PHASE 3 — TIER SELECTION
───────────────────────────────────────── */
function TiersPhase({
  walletAddr,
  isExpired,
  onBuy,
}: {
  walletAddr: string;
  isExpired: boolean;
  onBuy: (tier: Tier, txHash: string) => void;
}) {
  const [buying, setBuying] = useState<Tier | null>(null);
  const [txStatus, setTxStatus] = useState<"idle" | "pending" | "confirming" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const executeBuy = async (tier: Tier) => {
    const eth = (window as Window & { ethereum?: { request: (o: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
    if (!eth) { setErrMsg("MetaMask not available."); return; }

    setBuying(tier);
    setTxStatus("pending");
    setErrMsg("");

    try {
      // ERC20 transfer encoding: transfer(address,uint256)
      const amounts: Record<Tier, bigint> = { 1: BigInt(50_000_000), 2: BigInt(100_000_000), 3: BigInt(500_000_000) };
      const selector = "0xa9059cbb";
      const toAddr = OWNER.replace("0x", "").padStart(64, "0");
      const amount = amounts[tier].toString(16).padStart(64, "0");
      const data = selector + toAddr + amount;

      const txHash = await eth.request({
        method: "eth_sendTransaction",
        params: [{ from: walletAddr, to: USDT_POLYGON, data, gas: "0x186a0" }],
      }) as string;

      setTxStatus("confirming");
      // Simulate 2s confirmation
      await new Promise((r) => setTimeout(r, 2000));
      setTxStatus("done");
      onBuy(tier, txHash);
    } catch (e: unknown) {
      const err = e as { code?: number; message?: string };
      if (err?.code !== 4001) {
        setErrMsg(err?.message || "Transaction failed. Please try again.");
      }
      setTxStatus("error");
      setBuying(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Label text="Phase 3 · Membership Tiers" />
          {isExpired && (
            <div className="mb-6 px-4 py-3 border border-red-500/30 bg-red-500/10 flex items-center gap-2">
              <X size={14} className="text-red-400 shrink-0" />
              <span className="text-red-400 text-sm font-mono">Your 30-day membership has expired. Renew to regain access.</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Choose Your<br /><span style={{ color: GOLD }}>Sovereignty Level</span>
          </h1>
          <p className="text-white/40 text-sm mb-3 max-w-lg">
            Payment is made in USDT on Polygon. Access is granted immediately upon confirmation.
          </p>
          <div className="mb-10 flex items-center gap-2 font-mono text-[9px] tracking-widest" style={{ color: `${GOLD}60` }}>
            <Wallet size={11} style={{ color: GOLD }} />
            <span>CONNECTED: {walletAddr.slice(0, 12)}...{walletAddr.slice(-6)}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {([1, 2, 3] as Tier[]).map((t, i) => {
            const cfg = TIER_CFG[t];
            const isPopular = t === 2;
            const isBuying = buying === t;
            return (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative border flex flex-col p-7"
                style={{
                  background: isPopular ? "#0a0a0a" : "black",
                  borderColor: isPopular ? `${GOLD}50` : "rgba(255,255,255,0.08)",
                  boxShadow: isPopular ? `0 0 50px ${GOLD}15` : undefined,
                }}
              >
                {isPopular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 font-black font-mono text-[9px] tracking-widest uppercase text-black"
                    style={{ background: GOLD }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <div
                  className="inline-flex items-center gap-1.5 self-start mb-5 px-2 py-1 font-mono text-[9px] tracking-widest uppercase border"
                  style={{ color: cfg.accent, borderColor: `${cfg.accent}33` }}
                >
                  {cfg.emoji} {cfg.name}
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black" style={{ color: cfg.accent }}>{cfg.priceLabel}</span>
                  <span className="text-white/30 font-mono text-sm">{cfg.period}</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {cfg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={12} className="mt-0.5 shrink-0" style={{ color: cfg.accent }} />
                      <span className="text-white/55 text-xs leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {isBuying ? (
                  <div className="text-center py-4">
                    {txStatus === "pending" && (
                      <>
                        <motion.div
                          className="w-8 h-8 border-2 border-[#F3BA2F]/20 border-t-[#F3BA2F] rounded-full mx-auto mb-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="font-mono text-[10px] text-white/50">Awaiting MetaMask approval...</div>
                      </>
                    )}
                    {txStatus === "confirming" && (
                      <>
                        <motion.div
                          className="w-8 h-8 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full mx-auto mb-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="font-mono text-[10px] text-emerald-400">Confirming on Polygon...</div>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => executeBuy(t)}
                    disabled={!!buying}
                    className="w-full py-3 font-bold text-xs tracking-wider font-mono transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                    style={
                      isPopular
                        ? { background: GOLD, color: "black" }
                        : { border: `1px solid ${cfg.accent}44`, color: cfg.accent }
                    }
                  >
                    <Wallet size={13} />
                    BUY TICKET — {cfg.priceLabel} USDT
                  </button>
                )}

                {isBuying && txStatus === "error" && (
                  <p className="mt-2 text-red-400 text-[10px] font-mono text-center">{errMsg}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center text-white/15 text-[10px] font-mono mt-8"
        >
          USDT (6 decimals) · Polygon Mainnet · Auto-expires 30 days after payment
        </motion.p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PHASE 4 — CARD GENERATOR
───────────────────────────────────────── */
function CardPhase({
  tier,
  memberId,
  txHash,
  onDone,
}: {
  tier: Tier;
  memberId: string;
  txHash: string;
  onDone: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const cfg = TIER_CFG[tier];

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGenerate = useCallback(async () => {
    if (!name.trim()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setGenerating(true);
    await drawCard(canvas, { name: name.trim(), photoUrl, tier, memberId });
    setGenerating(false);
    setGenerated(true);
    LS.set("okz_name", name.trim());
    if (photoUrl) LS.set("okz_photo", photoUrl);
  }, [name, photoUrl, tier, memberId]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `okzbyte-card-${memberId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Label text="Phase 4 · Membership Card Generator" />
          <h1 className="text-3xl font-black text-white mb-1">
            Generate Your<br /><span style={{ color: GOLD }}>Sovereign Card</span>
          </h1>
          {/* Tx confirmation */}
          <div className="mt-3 mb-8 flex items-center gap-2 px-3 py-2 border border-emerald-500/30 bg-emerald-500/10 w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase">Payment Confirmed on Polygon</span>
            {txHash && (
              <a
                href={`https://polygonscan.com/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[8px] text-emerald-400/60 underline"
              >
                {txHash.slice(0, 10)}...
              </a>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <div>
              <label className="font-mono text-[9px] tracking-widest text-white/30 uppercase block mb-2">
                Your Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setGenerated(false); }}
                placeholder="Enter your name..."
                className="w-full bg-black border border-white/[0.1] px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#F3BA2F]/50 transition-colors placeholder-white/20"
              />
            </div>

            <div>
              <label className="font-mono text-[9px] tracking-widest text-white/30 uppercase block mb-2">
                Profile Picture (optional)
              </label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border border-dashed border-white/[0.12] hover:border-[#F3BA2F]/40 transition-colors py-6 flex flex-col items-center gap-2 group"
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="preview" className="w-16 h-16 rounded-full object-cover border border-[#F3BA2F]/30" />
                ) : (
                  <Upload size={20} className="text-white/20 group-hover:text-[#F3BA2F]/60 transition-colors" />
                )}
                <span className="text-white/30 text-xs font-mono">
                  {photoUrl ? "Click to change" : "Click to upload photo"}
                </span>
              </button>
            </div>

            {/* Auto-filled fields */}
            <div className="space-y-2 border border-white/[0.05] p-4">
              <div className="font-mono text-[8px] tracking-widest text-white/20 uppercase mb-3">Auto-Generated Fields</div>
              {[
                { label: "Member ID", value: memberId },
                { label: "Tier", value: `${cfg.emoji} ${cfg.name} — ${cfg.priceLabel}/month` },
                { label: "Issue Date", value: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
                {
                  label: "Expiry Date", value: new Date(Date.now() + MS_30_DAYS).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
                },
              ].map((f) => (
                <div key={f.label} className="flex justify-between text-xs">
                  <span className="text-white/25 font-mono">{f.label}</span>
                  <span className="text-white/60 font-mono">{f.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={!name.trim() || generating}
              className="w-full py-3 font-bold text-sm tracking-wider font-mono transition-all flex items-center justify-center gap-2 disabled:opacity-30 text-black"
              style={{ background: name.trim() ? GOLD : "#555" }}
            >
              {generating ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  GENERATING...
                </>
              ) : "GENERATE MY CARD"}
            </button>
          </motion.div>

          {/* Canvas preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="font-mono text-[9px] tracking-widest text-white/25 uppercase mb-3">Card Preview</div>
            <div
              className="w-full border border-white/[0.08] overflow-hidden bg-[#060606]"
              style={{ aspectRatio: "900/540" }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: "block" }}
              />
              {!generated && (
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs font-mono">
                  Fill in your name and click Generate
                </div>
              )}
            </div>

            <AnimatePresence>
              {generated && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-3"
                >
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 py-3 border font-bold text-sm tracking-wider font-mono transition-colors"
                    style={{ borderColor: `${GOLD}50`, color: GOLD }}
                  >
                    <Download size={15} />
                    SAVE & DOWNLOAD CARD (PNG)
                  </button>
                  <button
                    onClick={onDone}
                    className="w-full flex items-center justify-center gap-2 py-3 font-bold text-sm tracking-wider font-mono text-black transition-all"
                    style={{ background: GOLD }}
                  >
                    PROCEED TO HUB
                    <ChevronRight size={15} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PHASE 5 — COMMUNITY HUB
───────────────────────────────────────── */
function CommunityPhase({
  tier,
  walletAddr,
  memberId,
  onExpired,
}: {
  tier: Tier;
  walletAddr: string;
  memberId: string;
  onExpired: () => void;
}) {
  const cfg = TIER_CFG[tier];
  const name = LS.get("okz_name") || "Sovereign Member";
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [daysLeft, setDaysLeft] = useState(30);

  useEffect(() => {
    document.title = "OkzByte Hub — Community";
    const expires = parseInt(LS.get("okz_expires") || "0");
    if (!expires) return;
    const tick = () => {
      const remaining = expires - Date.now();
      if (remaining <= 0) {
        LS.del("okz_wallet", "okz_tier", "okz_expires", "okz_tx");
        onExpired();
        return;
      }
      setDaysLeft(Math.ceil(remaining / 86400000));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [onExpired]);

  const posts = [
    { type: "SIGNAL", body: "📊 BTC/USD — LONG · Entry $67,450 · TP1 $69,200 · TP2 $71,000 · SL $66,000 · Confidence: HIGH", time: "2m ago", likes: 34 },
    { type: "ANALYSIS", body: "🔍 ETH/USDT — Bullish divergence on 4H RSI. Support $3,420 holding. Watch breakout above $3,580.", time: "18m ago", likes: 27 },
    { type: "FOREX", body: "💱 EUR/USD SHORT · Entry 1.0847 · TP1 1.0790 · SL 1.0890 · London Open session. NFP Friday — manage risk.", time: "1h ago", likes: 19 },
    { type: "LEARNING", body: "📚 Module 7 live: Wyckoff Accumulation — Institutional order flow, spring patterns, sign-of-strength candles.", time: "3h ago", likes: 41 },
    { type: "ANNOUNCEMENT", body: "🔔 NEXT ZOOM: Saturday July 5 · 8 PM PKT — Advanced Risk & Portfolio Sizing. Live Q&A. All tiers welcome.", time: "5h ago", likes: 56 },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#F3BA2F]/10 bg-black pt-20 pb-5 px-6 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="font-mono text-[8px] tracking-[0.4em] text-[#F3BA2F]/60 uppercase mb-0.5">OkzByte Hub · Member Dashboard</div>
            <div className="text-white font-bold text-lg">Welcome, {name.split(" ")[0]}</div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 border font-mono text-[9px] tracking-widest uppercase"
              style={{ color: cfg.accent, borderColor: `${cfg.accent}33` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.accent }} />
              {cfg.emoji} {cfg.name}
            </div>
            <div className="font-mono text-[9px] text-white/30 border border-white/10 px-2 py-1.5">
              {daysLeft}d left
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Member card mini */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Label text="Your Membership" />
          <div
            className="relative border p-5 overflow-hidden max-w-sm"
            style={{
              background: `linear-gradient(135deg, ${cfg.cardBg[0]} 0%, ${cfg.cardBg[1]} 100%)`,
              borderColor: `${cfg.accent}40`,
              boxShadow: `0 0 30px ${cfg.accent}12`,
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(${cfg.accent} 1px, transparent 1px), linear-gradient(90deg, ${cfg.accent} 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10">
              <div className="font-mono text-[7px] tracking-[0.4em] uppercase mb-0.5" style={{ color: `${cfg.accent}80` }}>OKZBYTE HUB</div>
              <div className="text-white font-semibold text-base mb-3">{name}</div>
              <div className="flex justify-between">
                <div>
                  <div className="font-mono text-[8px] text-white/25 uppercase mb-0.5">Member ID</div>
                  <div className="font-mono text-xs" style={{ color: cfg.accent }}>{memberId}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[8px] text-white/25 uppercase mb-0.5">Expires</div>
                  <div className="font-mono text-xs text-white/60">{daysLeft} days</div>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ border: `1px solid ${cfg.accent}` }}
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <div className="mt-2 font-mono text-[8px] text-white/20">
            Wallet: {walletAddr.slice(0, 14)}...{walletAddr.slice(-6)}
          </div>
        </motion.div>

        {/* Signals feed */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-5">
            <Label text="Daily Signals Feed" />
            <div className="flex items-center gap-1.5 -mt-3">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
              <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase">Live</span>
            </div>
          </div>
          <div className="space-y-2">
            {posts.map((p, i) => (
              <div key={i} className="border border-white/[0.06] p-4 hover:border-[#F3BA2F]/15 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 flex items-center justify-center font-bold text-[9px] shrink-0" style={{ background: `${GOLD}22`, color: GOLD }}>FO</div>
                  <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: `${GOLD}60` }}>{p.type}</span>
                  <span className="text-white/20 text-[9px] font-mono ml-auto">{p.time}</span>
                </div>
                <p className="text-white/65 text-sm leading-relaxed mb-2">{p.body}</p>
                <button
                  onClick={() => setLiked((prev) => ({ ...prev, [i]: !prev[i] }))}
                  className="flex items-center gap-1.5 text-xs transition-colors"
                  style={{ color: liked[i] ? GOLD : "rgba(255,255,255,0.25)" }}
                >
                  <Heart size={11} fill={liked[i] ? GOLD : "none"} />
                  <span>{p.likes + (liked[i] ? 1 : 0)}</span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sessions */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Label text="Live Sessions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zoom */}
            <div className="border border-white/[0.07] p-5 hover:border-[#F3BA2F]/20 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Video size={16} style={{ color: GOLD }} />
                <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: GOLD }}>Zoom Masterclass</span>
                <span className="ml-auto font-mono text-[7px] tracking-widest text-white/25 border border-white/10 px-1.5 py-0.5">UPCOMING</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Advanced Risk Management & Portfolio Sizing</h3>
              <div className="flex items-center gap-1.5 text-white/35 text-xs font-mono mb-4">
                <Clock size={10} />
                <span>Saturday, July 5 · 8:00 PM PKT</span>
              </div>
              <button
                onClick={() => alert("Zoom link will be sent 30 minutes before the session.")}
                className="w-full py-2.5 font-bold text-xs tracking-wider font-mono border transition-colors"
                style={{ borderColor: `${GOLD}40`, color: GOLD }}
              >
                JOIN ZOOM SESSION
              </button>
            </div>

            {/* Voice Room */}
            <div className="border border-white/[0.07] p-5 hover:border-[#F3BA2F]/20 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Radio size={16} style={{ color: GOLD }} />
                <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: GOLD }}>Voice Room</span>
                <div className="ml-auto flex items-center gap-1">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-red-400" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                  <span className="font-mono text-[7px] tracking-widest text-red-400 uppercase">Live</span>
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Weekly Market Briefing</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-white/35 text-xs font-mono">
                  <Mic size={10} /><span>12 listening</span>
                </div>
                <div className="flex items-end gap-0.5 h-4">
                  {[4, 8, 12, 9, 6, 11, 7, 14, 5, 9].map((h, j) => (
                    <motion.div key={j} className="w-1" style={{ height: h, background: GOLD, opacity: 0.6 }}
                      animate={{ height: [h, h * 1.8, h] }}
                      transition={{ duration: 0.5 + (j % 3) * 0.2, repeat: Infinity, delay: j * 0.08 }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => alert("Joined as listener.")} className="py-2 border border-white/10 text-white/50 font-mono text-[10px] tracking-wider font-bold hover:border-[#F3BA2F]/30 hover:text-[#F3BA2F] transition-colors">
                  LISTEN
                </button>
                <button onClick={() => alert("Raise hand sent to host.")} className="py-2 font-mono text-[10px] tracking-wider font-bold text-black transition-colors" style={{ background: GOLD }}>
                  RAISE HAND 🖐
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <Label text="Subscription Status" />
          <div className="border border-white/[0.07] p-6">
            <div className="flex flex-wrap gap-6 mb-5">
              <div>
                <div className="font-mono text-[8px] text-white/25 uppercase mb-1">Active Tier</div>
                <div className="font-semibold" style={{ color: cfg.accent }}>{cfg.emoji} {cfg.name}</div>
              </div>
              <div>
                <div className="font-mono text-[8px] text-white/25 uppercase mb-1">Expires</div>
                <div className="text-white/60 text-sm">
                  {new Date(parseInt(LS.get("okz_expires") || String(Date.now() + MS_30_DAYS))).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </div>
              </div>
              <div>
                <div className="font-mono text-[8px] text-white/25 uppercase mb-1">Days Left</div>
                <div className="text-white font-bold">{daysLeft} days</div>
              </div>
            </div>
            <div className="h-0.5 bg-white/[0.06] w-full mb-5">
              <motion.div
                className="h-full"
                style={{ background: cfg.accent }}
                initial={{ width: 0 }}
                animate={{ width: `${(daysLeft / 30) * 100}%` }}
                transition={{ duration: 1.2 }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="font-mono text-[8px] text-white/20 flex items-center gap-1.5 mt-1">
                <Shield size={10} className="text-white/20" />
                Access auto-revokes upon expiry
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE — STEP ROUTER
───────────────────────────────────────── */
export default function OkzByteHub() {
  const [step, setStep] = useState<Step>("intro");
  const [walletAddr, setWalletAddr] = useState("");
  const [memberTier, setMemberTier] = useState<Tier>(2);
  const [txHash, setTxHash] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [memberId] = useState(genMemberId);

  // On mount: restore session from localStorage
  useEffect(() => {
    document.title = "OkzByte Hub";
    const wallet = LS.get("okz_wallet");
    const tier = LS.get("okz_tier");
    const expires = LS.get("okz_expires");
    if (wallet && tier && expires) {
      const exp = parseInt(expires);
      if (Date.now() < exp) {
        setWalletAddr(wallet);
        setMemberTier(parseInt(tier) as Tier);
        setStep("community");
      } else {
        setIsExpired(true);
        setWalletAddr(wallet);
        setStep("wallet");
      }
    }
  }, []);

  const handleWalletConnected = (addr: string) => {
    setWalletAddr(addr);
    LS.set("okz_wallet", addr);
    setStep("tiers");
  };

  const handleBuy = (tier: Tier, hash: string) => {
    setMemberTier(tier);
    setTxHash(hash);
    LS.set("okz_tier", String(tier));
    LS.set("okz_expires", String(Date.now() + MS_30_DAYS));
    LS.set("okz_tx", hash);
    setStep("card");
  };

  const handleCardDone = () => {
    setStep("community");
  };

  const handleExpired = () => {
    setIsExpired(true);
    LS.del("okz_tier", "okz_expires", "okz_tx");
    setStep("tiers");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {step === "intro" && <IntroPhase onNext={() => setStep("wallet")} />}
        {step === "wallet" && (
          <WalletPhase onConnected={handleWalletConnected} />
        )}
        {step === "tiers" && (
          <TiersPhase walletAddr={walletAddr} isExpired={isExpired} onBuy={handleBuy} />
        )}
        {step === "card" && (
          <CardPhase tier={memberTier} memberId={memberId} txHash={txHash} onDone={handleCardDone} />
        )}
        {step === "community" && (
          <CommunityPhase
            tier={memberTier}
            walletAddr={walletAddr}
            memberId={memberId}
            onExpired={handleExpired}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
