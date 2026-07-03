/**
 * OkzByte Hub — Five-Phase Membership System
 * Phase 1: Cinematic Intro
 * Phase 2: Wallet Connect (window.ethereum / MetaMask)
 * Phase 3: 3-Tier Subscription Cards
 * Phase 4: Sovereign Cryptographic Passport Card Generator
 * Phase 5: Gated Community Hub (with expiry logic)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Globe, Bot, BarChart2, Users, Shield, Crown, Mic, Video,
  Heart, MessageCircle, Clock, Radio, ChevronRight, ChevronDown,
  Check, Wallet, Upload, Download, ArrowRight, X, Zap, RotateCcw, Pen,
} from "lucide-react";


/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const GOLD = "#F3BA2F";
const ADMIN_WALLET = "0x9b02e2edd6f58d626aaa91889708dbf39dfa8cd7";
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
   SIGNATURE CANVAS HOOK
───────────────────────────────────────── */
function useSignatureCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  strokeColor: string
) {
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent && e.touches.length > 0) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    const me = e as MouseEvent;
    return { x: (me.clientX - rect.left) * scaleX, y: (me.clientY - rect.top) * scaleY };
  };

  const startDraw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawingRef.current = true;
    lastPosRef.current = getPos(e, canvas);
  }, [canvasRef]);

  const draw = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e, canvas);
    const last = lastPosRef.current;
    if (!last) return;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPosRef.current = pos;
  }, [canvasRef, strokeColor]);

  const stopDraw = useCallback(() => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("mousedown", startDraw, { passive: false });
    canvas.addEventListener("mousemove", draw, { passive: false });
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", stopDraw);
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseleave", stopDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDraw);
    };
  }, [canvasRef, startDraw, draw, stopDraw]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }, [canvasRef]);

  const getDataUrl = useCallback((): string | null => {
    return canvasRef.current?.toDataURL("image/png") ?? null;
  }, [canvasRef]);

  return { clear, getDataUrl };
}

/* ─────────────────────────────────────────
   FOUNDER SIGNATURE (embedded)
───────────────────────────────────────── */
const FOUNDER_SIG_B64 = "data:image/png;base64,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";



  /* ─────────────────────────────────────────
     CARD TEMPLATES
  ───────────────────────────────────────── */
  interface CardProps {
    tier: Tier;
    userName: string;
    memberId: string;
    userPhotoUrl: string | null;
    userSignatureUrl: string | null;
    issueDate: string;
    expiryDate: string;
    qrDataUrl: string | null;
  }

  /* ── SVG Circuit Traces ── */
  function CircuitBg({ c }: { c: string }) {
    return (
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:2 }}
        viewBox="0 0 540 320" preserveAspectRatio="xMidYMid slice">
        {/* top-left L-bracket */}
        <polyline points="0,55 30,55 55,30 130,30" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <line x1="55" y1="0" x2="55" y2="27" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <circle cx="55" cy="30" r="2.5" fill={c} opacity="0.4"/>
        <circle cx="130" cy="30" r="1.5" fill={c} opacity="0.25"/>
        <line x1="130" y1="30" x2="130" y2="65" stroke={c} strokeWidth="0.5" opacity="0.18"/>
        <circle cx="130" cy="65" r="1" fill={c} opacity="0.2"/>
        {/* top-right L-bracket */}
        <polyline points="540,55 510,55 485,30 410,30" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <line x1="485" y1="0" x2="485" y2="27" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <circle cx="485" cy="30" r="2.5" fill={c} opacity="0.4"/>
        <circle cx="410" cy="30" r="1.5" fill={c} opacity="0.25"/>
        {/* bottom-left L-bracket */}
        <polyline points="0,265 30,265 55,290 130,290" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <line x1="55" y1="320" x2="55" y2="293" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <circle cx="55" cy="290" r="2.5" fill={c} opacity="0.4"/>
        {/* bottom-right L-bracket */}
        <polyline points="540,265 510,265 485,290 410,290" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <line x1="485" y1="320" x2="485" y2="293" stroke={c} strokeWidth="0.8" fill="none" opacity="0.3"/>
        <circle cx="485" cy="290" r="2.5" fill={c} opacity="0.4"/>
        {/* mid horizontal traces */}
        <line x1="0" y1="160" x2="60" y2="160" stroke={c} strokeWidth="0.6" opacity="0.2"/>
        <line x1="480" y1="160" x2="540" y2="160" stroke={c} strokeWidth="0.6" opacity="0.2"/>
        <circle cx="60" cy="160" r="1.5" fill={c} opacity="0.25"/>
        <circle cx="480" cy="160" r="1.5" fill={c} opacity="0.25"/>
        {/* center rings */}
        <circle cx="270" cy="160" r="50" stroke={c} strokeWidth="0.4" fill="none" strokeDasharray="4 7" opacity="0.14"/>
        <circle cx="270" cy="160" r="82" stroke={c} strokeWidth="0.3" fill="none" strokeDasharray="2 9" opacity="0.09"/>
        {/* extra nodes */}
        <circle cx="200" cy="82" r="1" fill={c} opacity="0.2"/>
        <line x1="200" y1="30" x2="200" y2="80" stroke={c} strokeWidth="0.4" opacity="0.15"/>
        <circle cx="340" cy="240" r="1" fill={c} opacity="0.2"/>
        <line x1="340" y1="242" x2="340" y2="290" stroke={c} strokeWidth="0.4" opacity="0.15"/>
      </svg>
    );
  }

  /* ── Gold Microchip ── */
  function Chip({ a }: { a: string }) {
    return (
      <div style={{width:40,height:30,borderRadius:5,flexShrink:0,position:"relative",
        background:"linear-gradient(145deg,#1a1200,#0d0900)",
        border:`1px solid ${a}80`,
        boxShadow:`0 0 10px ${a}40,inset 0 0 6px rgba(0,0,0,0.8)`}}>
        {/* chip grid lines */}
        <div style={{position:"absolute",top:"30%",left:0,right:0,height:0.5,background:`${a}45`}}/>
        <div style={{position:"absolute",top:"68%",left:0,right:0,height:0.5,background:`${a}45`}}/>
        <div style={{position:"absolute",left:"33%",top:0,bottom:0,width:0.5,background:`${a}45`}}/>
        <div style={{position:"absolute",left:"67%",top:0,bottom:0,width:0.5,background:`${a}45`}}/>
        {/* center die */}
        <div style={{position:"absolute",top:"20%",left:"20%",right:"20%",bottom:"20%",
          background:`linear-gradient(135deg,${a}60,${a}20)`,
          border:`0.5px solid ${a}90`,borderRadius:2,
          boxShadow:`0 0 4px ${a}50 inset`}}/>
        {/* left pins */}
        {[4,11,18].map(t=><div key={t} style={{position:"absolute",top:t,left:-3,width:3,height:2,background:a,borderRadius:"1px 0 0 1px",opacity:0.8}}/>)}
        {/* right pins */}
        {[4,11,18].map(t=><div key={t} style={{position:"absolute",top:t,right:-3,width:3,height:2,background:a,borderRadius:"0 1px 1px 0",opacity:0.8}}/>)}
        {/* top pins */}
        {[8,20].map(l=><div key={l} style={{position:"absolute",left:l,top:-3,height:3,width:2,background:a,borderRadius:"1px 1px 0 0",opacity:0.8}}/>)}
      </div>
    );
  }

  /* ──────────────────────────────────────────
     TIER 1 — MATRIX DEVELOPER (Cyberpunk Violet)
  ────────────────────────────────────────── */
  function Tier1Card({ userName, memberId, userPhotoUrl, userSignatureUrl, issueDate, expiryDate, qrDataUrl }: CardProps) {
    const A="#6d28d9"; const B="#8b5cf6"; const C="#a78bfa"; const D="#ddd6fe";
    return (
      <div style={{
        position:"relative",overflow:"hidden",fontFamily:"'Courier New',monospace",
        width:540,height:320,flexShrink:0,userSelect:"none",
        background:"radial-gradient(ellipse 80% 60% at 15% 20%,#0f0520 0%,#07011a 45%,#020008 100%)",
        borderRadius:20,border:`1px solid ${C}40`,
        boxShadow:`0 0 60px ${A}25,0 0 120px ${A}10,inset 0 0 60px rgba(0,0,0,0.5)`}}>

        {/* top shimmer border */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,zIndex:20,borderRadius:"20px 20px 0 0",
          background:`linear-gradient(90deg,transparent 5%,${A}70 25%,${C} 45%,${D} 50%,${C} 55%,${A}70 75%,transparent 95%)`}}/>
        {/* bottom shimmer */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,zIndex:20,borderRadius:"0 0 20px 20px",
          background:`linear-gradient(90deg,transparent,${B}60,${C}50,${B}60,transparent)`}}/>
        {/* left/right edge glows */}
        <div style={{position:"absolute",top:0,left:0,bottom:0,width:1.5,zIndex:20,
          background:`linear-gradient(180deg,transparent 5%,${B}40 40%,${C}50 50%,${B}40 60%,transparent 95%)`}}/>
        <div style={{position:"absolute",top:0,right:0,bottom:0,width:1.5,zIndex:20,
          background:`linear-gradient(180deg,transparent 5%,${B}40 40%,${C}50 50%,${B}40 60%,transparent 95%)`}}/>

        <CircuitBg c={C}/>

        {/* ambient glow center */}
        <div style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
          background:"radial-gradient(ellipse 50% 50% at 65% 50%,rgba(109,40,217,0.07) 0%,transparent 70%)"}}/>
        {/* watermark */}
        <div style={{position:"absolute",inset:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",
          pointerEvents:"none",overflow:"hidden"}}>
          <div style={{transform:"rotate(-20deg)",opacity:0.035,textAlign:"center",lineHeight:1.8,whiteSpace:"nowrap"}}>
            <div style={{fontSize:16,fontWeight:900,letterSpacing:"0.45em",color:D}}>OFFICIAL INTEGRITY</div>
            <div style={{fontSize:12,fontWeight:900,letterSpacing:"0.38em",color:D}}>ORAKZAI GROUP</div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{position:"relative",zIndex:10,padding:"20px 22px 18px 22px",height:"100%",
          display:"flex",flexDirection:"column",boxSizing:"border-box"}}>

          {/* ── HEADER ROW ── */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontSize:11,fontWeight:900,letterSpacing:"0.3em",color:C,
                textShadow:`0 0 16px ${B},0 0 4px ${C}`}}>OKZBYTE HUB</div>
              <div style={{fontSize:6,color:`${B}60`,letterSpacing:"0.12em",marginTop:3,textTransform:"uppercase"}}>
                Silicon Valley Innovation Network · Tier 01 — Matrix Developer</div>
            </div>
            {/* LOGO BOX */}
            <div style={{width:58,height:58,flexShrink:0,borderRadius:12,overflow:"hidden",
              background:"rgba(0,0,0,0.75)",
              border:`1.5px solid ${C}55`,
              boxShadow:`0 0 20px ${A}40,0 0 8px ${B}20,inset 0 0 12px rgba(0,0,0,0.6)`,
              padding:4,boxSizing:"border-box",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img src="/logos/okzbyte.webp" alt="OkzByte"
                style={{width:"100%",height:"100%",objectFit:"contain",
                  filter:`drop-shadow(0 0 6px ${C}80) brightness(1.1)`}}/>
            </div>
          </div>

          {/* ── MAIN ROW ── */}
          <div style={{display:"flex",alignItems:"center",gap:16,flex:1}}>
            {/* PHOTO */}
            <div style={{flexShrink:0,position:"relative",width:90,height:90}}>
              {/* outer ring */}
              <div style={{position:"absolute",inset:-5,borderRadius:18,border:`1px solid ${B}30`,
                boxShadow:`0 0 18px ${A}35`}}/>
              {/* photo frame */}
              <div style={{width:90,height:90,borderRadius:13,overflow:"hidden",
                border:`2px solid ${C}70`,
                boxShadow:`0 0 25px ${A}50,inset 0 0 12px rgba(0,0,0,0.7)`,
                background:`linear-gradient(135deg,${A}25,#040010)`,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                {userPhotoUrl
                  ? <img src={userPhotoUrl} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  : <div style={{fontSize:32,fontWeight:900,color:C,textShadow:`0 0 12px ${B}`}}>
                      {(userName||"?")[0].toUpperCase()}</div>}
              </div>
              {/* corner accents */}
              {([[0,0],[0,1],[1,0],[1,1]] as [0|1,0|1][]).map(([r,c2],i)=>(
                <div key={i} style={{position:"absolute",width:10,height:10,
                  top:r===0?-3:undefined,bottom:r===1?-3:undefined,
                  left:c2===0?-3:undefined,right:c2===1?-3:undefined,
                  borderTop:r===0?`2px solid ${C}`:"none",borderBottom:r===1?`2px solid ${C}`:"none",
                  borderLeft:c2===0?`2px solid ${C}`:"none",borderRight:c2===1?`2px solid ${C}`:"none",
                  borderRadius:r===0&&c2===0?2:r===0&&c2===1?2:2}}/>
              ))}
            </div>

            {/* IDENTITY */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:20,fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",
                color:D,textShadow:`0 0 20px ${C}90,0 0 6px ${B},0 0 2px ${A}`,
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.15,
                marginBottom:8}}>
                {userName||"IDENTITY NAME"}
              </div>
              {/* member ID capsule */}
              <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:7}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:C,boxShadow:`0 0 6px ${B}`,flexShrink:0}}/>
                <div style={{fontSize:7.5,color:C,fontWeight:900,letterSpacing:"0.22em",
                  background:`linear-gradient(135deg,${A}25,rgba(0,0,0,0.4))`,
                  border:`1px solid ${C}50`,padding:"3px 12px",borderRadius:99,
                  boxShadow:`0 0 8px ${A}30,inset 0 0 8px ${A}10`}}>
                  {memberId||"OKZ-2026-0000"}
                </div>
              </div>
              <div style={{fontSize:6,color:`${C}50`,letterSpacing:"0.2em",textTransform:"uppercase"}}>
                MATRIX DEVELOPER · ELITE ACCESS · SILICON VALLEY</div>
            </div>

            {/* QR */}
            {qrDataUrl && (
              <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <div style={{padding:5,borderRadius:9,
                  background:"rgba(0,0,0,0.65)",border:`1.5px solid ${B}45`,
                  boxShadow:`0 0 14px ${A}25,inset 0 0 8px rgba(0,0,0,0.5)`}}>
                  <div style={{width:58,height:58,background:"#fff",borderRadius:4,padding:2}}>
                    <img src={qrDataUrl} style={{width:"100%",height:"100%",imageRendering:"pixelated"}}/>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:3}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 5px #22c55e"}}/>
                  <span style={{fontSize:5,color:"#22c55e",fontWeight:700,letterSpacing:"0.1em"}}>VERIFIED</span>
                </div>
              </div>
            )}
          </div>

          {/* ── BOTTOM ROW ── */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:12}}>
            <div>
              <img src={FOUNDER_SIG_B64} style={{height:26,maxWidth:100,objectFit:"contain",display:"block",
                filter:`brightness(0.4) sepia(1) hue-rotate(235deg) saturate(6) brightness(1.6)`}}/>
              <div style={{fontSize:5.5,color:`${C}60`,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",marginTop:3}}>
                ISSUING AUTHORITY: FAISAL ORAKZAI</div>
              <div style={{display:"flex",gap:8,marginTop:3,fontSize:5,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                <span>ISSUE <span style={{color:`${C}70`}}>{issueDate}</span></span>
                <span>·</span>
                <span>EXPIRY <span style={{color:`${C}70`}}>{expiryDate}</span></span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:10}}>
              <div style={{height:36,width:105,position:"relative",flexShrink:0,borderRadius:7,
                background:"rgba(0,0,0,0.55)",border:`1px solid ${B}30`,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`inset 0 0 12px ${A}10`}}>
                {userSignatureUrl
                  ? <img src={userSignatureUrl} style={{height:26,maxWidth:95,objectFit:"contain",
                      filter:`drop-shadow(0 0 5px ${D}90) brightness(0.4) sepia(1) hue-rotate(235deg) saturate(6) brightness(1.6)`}}/>
                  : <span style={{fontSize:6,color:`${B}30`,letterSpacing:"0.05em"}}>MEMBER SIGNATURE</span>}
                <span style={{position:"absolute",bottom:3,right:4,fontSize:4.5,color:`${B}35`,letterSpacing:"0.06em"}}>AUTHORIZED NODE</span>
              </div>
              <Chip a={C}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────
     TIER 2 — ENTERPRISE ARCHITECT (Royal Gold)
  ────────────────────────────────────────── */
  function Tier2Card({ userName, memberId, userPhotoUrl, userSignatureUrl, issueDate, expiryDate, qrDataUrl }: CardProps) {
    const A="#92400e"; const B="#d97706"; const C="#f59e0b"; const D="#fde68a";
    return (
      <div style={{
        position:"relative",overflow:"hidden",fontFamily:"'Courier New',monospace",
        width:540,height:320,flexShrink:0,userSelect:"none",
        background:"radial-gradient(ellipse 80% 60% at 15% 20%,#130a00 0%,#080400 45%,#020100 100%)",
        borderRadius:20,border:`1px solid ${C}45`,
        boxShadow:`0 0 60px ${A}30,0 0 120px ${A}12,inset 0 0 60px rgba(0,0,0,0.5)`}}>

        <div style={{position:"absolute",top:0,left:0,right:0,height:2,zIndex:20,borderRadius:"20px 20px 0 0",
          background:`linear-gradient(90deg,transparent 5%,${A}70 20%,${C} 40%,${D} 50%,${C} 60%,${A}70 80%,transparent 95%)`}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:1.5,zIndex:20,borderRadius:"0 0 20px 20px",
          background:`linear-gradient(90deg,transparent,${B}60,${C}55,${B}60,transparent)`}}/>
        <div style={{position:"absolute",top:0,left:0,bottom:0,width:1.5,zIndex:20,
          background:`linear-gradient(180deg,transparent 5%,${B}45 40%,${C}55 50%,${B}45 60%,transparent 95%)`}}/>
        <div style={{position:"absolute",top:0,right:0,bottom:0,width:1.5,zIndex:20,
          background:`linear-gradient(180deg,transparent 5%,${B}45 40%,${C}55 50%,${B}45 60%,transparent 95%)`}}/>

        <CircuitBg c={C}/>

        <div style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
          background:"radial-gradient(ellipse 50% 50% at 65% 50%,rgba(146,64,14,0.08) 0%,transparent 70%)"}}/>
        <div style={{position:"absolute",inset:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",
          pointerEvents:"none",overflow:"hidden"}}>
          <div style={{transform:"rotate(-20deg)",opacity:0.035,textAlign:"center",lineHeight:1.8,whiteSpace:"nowrap"}}>
            <div style={{fontSize:16,fontWeight:900,letterSpacing:"0.45em",color:D}}>OFFICIAL INTEGRITY</div>
            <div style={{fontSize:12,fontWeight:900,letterSpacing:"0.38em",color:D}}>ORAKZAI GROUP</div>
          </div>
        </div>

        <div style={{position:"relative",zIndex:10,padding:"20px 22px 18px 22px",height:"100%",
          display:"flex",flexDirection:"column",boxSizing:"border-box"}}>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontSize:11,fontWeight:900,letterSpacing:"0.3em",color:D,
                textShadow:`0 0 18px ${C},0 0 5px ${B}`}}>OKZBYTE HUB</div>
              <div style={{fontSize:6,color:`${C}55`,letterSpacing:"0.12em",marginTop:3,textTransform:"uppercase"}}>
                Silicon Valley Innovation Network · Tier 02 — Enterprise Architect</div>
            </div>
            <div style={{width:58,height:58,flexShrink:0,borderRadius:12,overflow:"hidden",
              background:"rgba(0,0,0,0.75)",
              border:`1.5px solid ${C}60`,
              boxShadow:`0 0 22px ${A}45,0 0 10px ${B}25,inset 0 0 12px rgba(0,0,0,0.6)`,
              padding:4,boxSizing:"border-box",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img src="/logos/okzbyte.webp" alt="OkzByte"
                style={{width:"100%",height:"100%",objectFit:"contain",
                  filter:`drop-shadow(0 0 8px ${C}80) sepia(0.4) saturate(1.5) brightness(1.1)`}}/>
            </div>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:16,flex:1}}>
            <div style={{flexShrink:0,position:"relative",width:90,height:90}}>
              {/* outer glow ring */}
              <div style={{position:"absolute",inset:-5,borderRadius:18,border:`1px solid ${B}30`,
                boxShadow:`0 0 20px ${A}40`}}/>
              <div style={{width:90,height:90,borderRadius:13,overflow:"hidden",
                border:`2px solid ${C}75`,
                boxShadow:`0 0 28px ${A}55,inset 0 0 12px rgba(0,0,0,0.7)`,
                background:`linear-gradient(135deg,${A}25,#060200)`,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                {userPhotoUrl
                  ? <img src={userPhotoUrl} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  : <div style={{fontSize:32,fontWeight:900,color:D,textShadow:`0 0 12px ${C}`}}>
                      {(userName||"?")[0].toUpperCase()}</div>}
              </div>
              {([[0,0],[0,1],[1,0],[1,1]] as [0|1,0|1][]).map(([r,c2],i)=>(
                <div key={i} style={{position:"absolute",width:10,height:10,
                  top:r===0?-3:undefined,bottom:r===1?-3:undefined,
                  left:c2===0?-3:undefined,right:c2===1?-3:undefined,
                  borderTop:r===0?`2px solid ${C}`:"none",borderBottom:r===1?`2px solid ${C}`:"none",
                  borderLeft:c2===0?`2px solid ${C}`:"none",borderRight:c2===1?`2px solid ${C}`:"none"}}/>
              ))}
            </div>

            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:20,fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",
                color:D,textShadow:`0 0 22px ${C}90,0 0 6px ${B},0 0 2px ${A}`,
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.15,
                marginBottom:8}}>
                {userName||"IDENTITY NAME"}
              </div>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:7}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:C,boxShadow:`0 0 6px ${B}`,flexShrink:0}}/>
                <div style={{fontSize:7.5,color:C,fontWeight:900,letterSpacing:"0.22em",
                  background:`linear-gradient(135deg,${A}25,rgba(0,0,0,0.4))`,
                  border:`1px solid ${C}50`,padding:"3px 12px",borderRadius:99,
                  boxShadow:`0 0 10px ${A}35,inset 0 0 8px ${A}10`}}>
                  {memberId||"OKZ-2026-0000"}
                </div>
              </div>
              <div style={{fontSize:6,color:`${D}45`,letterSpacing:"0.2em",textTransform:"uppercase"}}>
                ENTERPRISE ARCHITECT · ELITE ACCESS · SILICON VALLEY</div>
            </div>

            {qrDataUrl && (
              <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <div style={{padding:5,borderRadius:9,
                  background:"rgba(0,0,0,0.65)",border:`1.5px solid ${C}50`,
                  boxShadow:`0 0 16px ${A}30,inset 0 0 8px rgba(0,0,0,0.5)`}}>
                  <div style={{width:58,height:58,background:"#fff",borderRadius:4,padding:2}}>
                    <img src={qrDataUrl} style={{width:"100%",height:"100%",imageRendering:"pixelated"}}/>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:3}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 5px #22c55e"}}/>
                  <span style={{fontSize:5,color:"#22c55e",fontWeight:700,letterSpacing:"0.1em"}}>PAYMENT VERIFIED</span>
                </div>
              </div>
            )}
          </div>

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:12}}>
            <div>
              <img src={FOUNDER_SIG_B64} style={{height:26,maxWidth:100,objectFit:"contain",display:"block",
                filter:`sepia(1) brightness(1.6) saturate(5) hue-rotate(5deg)`}}/>
              <div style={{fontSize:5.5,color:`${C}60`,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",marginTop:3}}>
                ISSUING AUTHORITY: FAISAL ORAKZAI</div>
              <div style={{display:"flex",gap:8,marginTop:3,fontSize:5,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase"}}>
                <span>ISSUE <span style={{color:`${C}70`}}>{issueDate}</span></span>
                <span>·</span>
                <span>EXPIRY <span style={{color:`${C}70`}}>{expiryDate}</span></span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:10}}>
              <div style={{height:36,width:105,position:"relative",flexShrink:0,borderRadius:7,
                background:"rgba(0,0,0,0.55)",border:`1px solid ${B}30`,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`inset 0 0 12px ${A}10`}}>
                {userSignatureUrl
                  ? <img src={userSignatureUrl} style={{height:26,maxWidth:95,objectFit:"contain",
                      filter:`sepia(1) brightness(1.6) saturate(5) hue-rotate(5deg) drop-shadow(0 0 5px ${D})`}}/>
                  : <span style={{fontSize:6,color:`${B}30`,letterSpacing:"0.05em"}}>MEMBER SIGNATURE</span>}
                <span style={{position:"absolute",bottom:3,right:4,fontSize:4.5,color:`${C}35`,letterSpacing:"0.06em"}}>AUTHORIZED NODE</span>
              </div>
              <Chip a={C}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────
     TIER 3 — SOVEREIGN FOUNDER (Ultimate Liquid Gold)
  ────────────────────────────────────────── */
  function Tier3Card({ userName, memberId, userPhotoUrl, userSignatureUrl, issueDate, expiryDate, qrDataUrl }: CardProps) {
    const G1="#7a5c00"; const G2="#D4AF37"; const G3="#FFD700"; const G4="#FFF3B0";
    return (
      <div style={{
        position:"relative",overflow:"hidden",fontFamily:"'Courier New',monospace",
        width:540,height:320,flexShrink:0,userSelect:"none",
        background:"radial-gradient(ellipse 80% 60% at 15% 20%,#150e00 0%,#080500 45%,#020100 100%)",
        borderRadius:20,border:`1px solid ${G2}60`,
        boxShadow:`0 0 70px rgba(212,175,55,0.25),0 0 140px rgba(212,175,55,0.1),inset 0 0 60px rgba(0,0,0,0.5)`}}>

        {/* PREMIUM TRIPLE BORDER */}
        {/* top shimmer */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,zIndex:20,borderRadius:"20px 20px 0 0",
          background:`linear-gradient(90deg,transparent 3%,${G1}80 18%,${G2} 35%,${G3} 45%,${G4} 50%,${G3} 55%,${G2} 65%,${G1}80 82%,transparent 97%)`}}/>
        {/* bottom shimmer */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:1.5,zIndex:20,borderRadius:"0 0 20px 20px",
          background:`linear-gradient(90deg,transparent 5%,${G1}70 25%,${G2}80 45%,${G3}70 50%,${G2}80 55%,${G1}70 75%,transparent 95%)`}}/>
        {/* left/right edge gold lines */}
        <div style={{position:"absolute",top:0,left:0,bottom:0,width:1.5,zIndex:20,
          background:`linear-gradient(180deg,transparent 5%,${G2}50 35%,${G3}65 50%,${G2}50 65%,transparent 95%)`}}/>
        <div style={{position:"absolute",top:0,right:0,bottom:0,width:1.5,zIndex:20,
          background:`linear-gradient(180deg,transparent 5%,${G2}50 35%,${G3}65 50%,${G2}50 65%,transparent 95%)`}}/>

        <CircuitBg c={G2}/>

        {/* holographic ambient */}
        <div style={{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",
          background:"radial-gradient(ellipse 55% 55% at 65% 50%,rgba(255,215,0,0.07) 0%,transparent 70%)"}}/>
        {/* watermark */}
        <div style={{position:"absolute",inset:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"center",
          pointerEvents:"none",overflow:"hidden"}}>
          <div style={{transform:"rotate(-20deg)",opacity:0.04,textAlign:"center",lineHeight:1.8,whiteSpace:"nowrap"}}>
            <div style={{fontSize:16,fontWeight:900,letterSpacing:"0.45em",color:G3}}>OFFICIAL INTEGRITY</div>
            <div style={{fontSize:12,fontWeight:900,letterSpacing:"0.38em",color:G3}}>ORAKZAI GROUP</div>
          </div>
        </div>

        <div style={{position:"relative",zIndex:10,padding:"20px 22px 18px 22px",height:"100%",
          display:"flex",flexDirection:"column",boxSizing:"border-box"}}>

          {/* ── HEADER ── */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div>
              <div style={{fontSize:12,fontWeight:900,letterSpacing:"0.3em",color:G3,
                textShadow:`0 0 20px ${G2},0 0 6px ${G3},0 0 2px ${G4}`}}>OKZBYTE HUB</div>
              <div style={{fontSize:6,color:`${G2}55`,letterSpacing:"0.12em",marginTop:3,textTransform:"uppercase"}}>
                Silicon Valley Innovation Network · Tier 03 Elite — Sovereign Founder</div>
            </div>
            {/* PREMIUM LOGO BOX */}
            <div style={{width:62,height:62,flexShrink:0,borderRadius:13,overflow:"hidden",
              background:"rgba(0,0,0,0.80)",
              border:`2px solid ${G2}70`,
              boxShadow:`0 0 25px ${G2}45,0 0 12px ${G3}20,0 0 0 1px ${G3}10,inset 0 0 16px rgba(0,0,0,0.7)`,
              padding:4,boxSizing:"border-box",
              display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img src="/logos/okzbyte.webp" alt="OkzByte"
                style={{width:"100%",height:"100%",objectFit:"contain",
                  filter:`drop-shadow(0 0 8px ${G3}90) drop-shadow(0 0 16px ${G2}60) brightness(1.15)`}}/>
            </div>
          </div>

          {/* ── MAIN ROW ── */}
          <div style={{display:"flex",alignItems:"center",gap:16,flex:1}}>
            {/* TRIPLE-LAYER GOLD PHOTO FRAME */}
            <div style={{flexShrink:0,position:"relative",width:94,height:94}}>
              {/* outermost aura */}
              <div style={{position:"absolute",inset:-8,borderRadius:22,
                border:`1px solid ${G1}30`,boxShadow:`0 0 22px ${G2}30`}}/>
              {/* mid gold ring */}
              <div style={{position:"absolute",inset:-4,borderRadius:17,
                border:`1px solid ${G2}50`,boxShadow:`0 0 10px ${G2}25`}}/>
              {/* inner frame */}
              <div style={{width:94,height:94,borderRadius:14,overflow:"hidden",
                border:`2px solid ${G3}80`,
                boxShadow:`0 0 32px ${G2}60,0 0 12px ${G3}15 inset`,
                background:`linear-gradient(135deg,#1c1100,#080400)`,
                display:"flex",alignItems:"center",justifyContent:"center"}}>
                {userPhotoUrl
                  ? <img src={userPhotoUrl} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  : <div style={{fontSize:34,fontWeight:900,color:G3,textShadow:`0 0 14px ${G2}`}}>
                      {(userName||"?")[0].toUpperCase()}</div>}
              </div>
              {/* gold corner brackets */}
              {([[0,0],[0,1],[1,0],[1,1]] as [0|1,0|1][]).map(([r,c2],i)=>(
                <div key={i} style={{position:"absolute",width:12,height:12,
                  top:r===0?-4:undefined,bottom:r===1?-4:undefined,
                  left:c2===0?-4:undefined,right:c2===1?-4:undefined,
                  borderTop:r===0?`2.5px solid ${G3}`:"none",borderBottom:r===1?`2.5px solid ${G3}`:"none",
                  borderLeft:c2===0?`2.5px solid ${G3}`:"none",borderRight:c2===1?`2.5px solid ${G3}`:"none",
                  filter:`drop-shadow(0 0 3px ${G2})`}}/>
              ))}
            </div>

            {/* IDENTITY */}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:21,fontWeight:900,letterSpacing:"0.08em",textTransform:"uppercase",
                color:G4,textShadow:`0 0 24px ${G3}90,0 0 8px ${G2},0 0 2px ${G1}`,
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.15,
                marginBottom:8}}>
                {userName||"IDENTITY NAME"}
              </div>
              {/* gold member ID capsule */}
              <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:7}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:G3,
                  boxShadow:`0 0 8px ${G2},0 0 4px ${G3}`,flexShrink:0}}/>
                <div style={{fontSize:8,color:G3,fontWeight:900,letterSpacing:"0.22em",
                  background:`linear-gradient(135deg,rgba(212,175,55,0.2),rgba(80,55,0,0.35))`,
                  border:`1px solid ${G2}70`,padding:"4px 14px",borderRadius:99,
                  boxShadow:`0 0 12px ${G2}35,inset 0 0 10px ${G2}10`}}>
                  {memberId||"OKZ-2026-0000"}
                </div>
              </div>
              <div style={{fontSize:6,color:`${G2}55`,letterSpacing:"0.2em",textTransform:"uppercase"}}>
                SOVEREIGN FOUNDER · ELITE ACCESS · SILICON VALLEY</div>
            </div>

            {/* QR */}
            {qrDataUrl && (
              <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
                <div style={{padding:5,borderRadius:9,
                  background:"rgba(0,0,0,0.70)",
                  border:`1.5px solid ${G2}60`,
                  boxShadow:`0 0 18px ${G2}30,0 0 0 0.5px ${G3}15,inset 0 0 8px rgba(0,0,0,0.5)`}}>
                  <div style={{width:60,height:60,background:"#fff",borderRadius:4,padding:2}}>
                    <img src={qrDataUrl} style={{width:"100%",height:"100%",imageRendering:"pixelated"}}/>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:3}}>
                  <div style={{width:5,height:5,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 6px #22c55e"}}/>
                  <span style={{fontSize:5,color:"#22c55e",fontWeight:700,letterSpacing:"0.1em"}}>PAYMENT VERIFIED</span>
                </div>
              </div>
            )}
          </div>

          {/* ── BOTTOM ROW ── */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:12}}>
            <div>
              <img src={FOUNDER_SIG_B64} style={{height:28,maxWidth:106,objectFit:"contain",display:"block",
                filter:`sepia(1) brightness(1.7) saturate(6) hue-rotate(5deg) drop-shadow(0 0 6px ${G2}80)`}}/>
              <div style={{fontSize:5.5,color:`${G2}70`,fontWeight:900,letterSpacing:"0.14em",textTransform:"uppercase",marginTop:3}}>
                ISSUING AUTHORITY: FAISAL ORAKZAI</div>
              <div style={{display:"flex",gap:6,marginTop:3}}>
                <div style={{fontSize:5,color:"rgba(255,255,255,0.22)",letterSpacing:"0.1em",textTransform:"uppercase",
                  border:`0.5px solid rgba(255,255,255,0.1)`,padding:"2px 7px",borderRadius:3}}>
                  ISSUE <span style={{color:`${G2}80`}}>{issueDate}</span></div>
                <div style={{fontSize:5,color:"rgba(255,255,255,0.22)",letterSpacing:"0.1em",textTransform:"uppercase",
                  border:`0.5px solid rgba(255,255,255,0.1)`,padding:"2px 7px",borderRadius:3}}>
                  EXPIRY <span style={{color:`${G2}80`}}>{expiryDate}</span></div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:10}}>
              <div style={{height:38,width:108,position:"relative",flexShrink:0,borderRadius:7,
                background:"rgba(0,0,0,0.60)",border:`1px solid ${G2}40`,
                display:"flex",alignItems:"center",justifyContent:"center",
                boxShadow:`inset 0 0 14px ${G2}08`}}>
                {userSignatureUrl
                  ? <img src={userSignatureUrl} style={{height:28,maxWidth:98,objectFit:"contain",
                      filter:`sepia(1) brightness(1.7) saturate(6) hue-rotate(5deg) drop-shadow(0 0 7px ${G3})`}}/>
                  : <span style={{fontSize:6,color:`${G2}30`,letterSpacing:"0.05em"}}>MEMBER SIGNATURE</span>}
                <span style={{position:"absolute",bottom:3,right:4,fontSize:4.5,color:`${G2}50`,letterSpacing:"0.06em"}}>AUTHORIZED NODE</span>
              </div>
              <Chip a={G3}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  /* ─────────────────────────────────────────
   PHASE 4 — SOVEREIGN CARD GENERATOR
───────────────────────────────────────── */
function CardPhase({
  tier: initialTier,
  memberId,
  txHash,
  onDone,
  isAdmin,
}: {
  tier: Tier;
  memberId: string;
  txHash: string;
  onDone: () => void;
  isAdmin?: boolean;
}) {
  const [tier, setTier] = useState<Tier>(initialTier);
  const cfg = TIER_CFG[tier];
  const cardRef = useRef<HTMLDivElement>(null);
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(LS.get("okz_name") || "");
  const [photoUrl, setPhotoUrl] = useState<string | null>(LS.get("okz_photo") || null);
  const [sigDataUrl, setSigDataUrl] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const { clear: clearSig, getDataUrl: getSigDataUrl } = useSignatureCanvas(sigCanvasRef, cfg.sigColor);

  const issueDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const expiryDate = new Date(Date.now() + MS_30_DAYS).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  useEffect(() => {
    if (!txHash) return;
    const url = `https://polygonscan.com/tx/${txHash}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=000000&margin=4`;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 200; canvas.height = 200;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.drawImage(img, 0, 0); setQrDataUrl(canvas.toDataURL("image/png")); }
    };
    img.onerror = () => {
      // Fallback: generate a simple placeholder
      const canvas = document.createElement("canvas");
      canvas.width = 200; canvas.height = 200;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, 200, 200);
        ctx.fillStyle = "#000";
        ctx.font = "bold 12px monospace";
        ctx.textAlign = "center";
        ctx.fillText("TX VERIFIED", 100, 100);
        setQrDataUrl(canvas.toDataURL("image/png"));
      }
    };
    img.src = qrApiUrl;
  }, [txHash]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setPhotoUrl(url);
      LS.set("okz_photo", url);
    };
    reader.readAsDataURL(file);
  };

  const handleSigCapture = () => {
    const url = getSigDataUrl();
    if (url) { setSigDataUrl(url); setHasDrawn(true); }
  };

  const handleClearSig = () => { clearSig(); setSigDataUrl(null); setHasDrawn(false); };

  const handleExport = async () => {
    const el = cardRef.current;
    if (!el || !name.trim()) return;
    setExporting(true);
    try {
      // Dynamic CDN import — vite-ignore skips bundling, no lockfile change needed
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mod = await import(/* @vite-ignore */ "https://esm.sh/html-to-image@1.11.11");
      const toPng = mod.toPng as (node: HTMLElement, opts?: object) => Promise<string>;
      const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement("a");
      link.download = `sovereign-id-${memberId}.png`;
      link.href = dataUrl;
      link.click();
      setExported(true);
      LS.set("okz_name", name.trim());
    } catch {
      // export failed silently
    }
    setExporting(false);
  };

  const cardProps: CardProps = {
    tier, userName: name, memberId, userPhotoUrl: photoUrl,
    userSignatureUrl: sigDataUrl, issueDate, expiryDate, qrDataUrl,
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Label text="Phase 4 · Membership Card Generator" />
          <h1 className="text-3xl font-black text-white mb-1">
            Generate Your<br /><span style={{ color: GOLD }}>Sovereign Card</span>
          </h1>
          <div className="mt-3 mb-8 flex items-center gap-2 px-3 py-2 border border-emerald-500/30 bg-emerald-500/10 w-fit">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[9px] tracking-widest text-emerald-400 uppercase">Payment Confirmed on Polygon</span>
            {txHash && (
              <a href={`https://polygonscan.com/tx/${txHash}`} target="_blank" rel="noreferrer" className="font-mono text-[8px] text-emerald-400/60 underline">
                {txHash.slice(0, 10)}...
              </a>
            )}
          </div>
        </motion.div>

        {/* Admin tier switcher */}
        {isAdmin && (
          <div className="flex flex-wrap items-center gap-2 mb-8 p-3 border border-[#F3BA2F]/15 bg-[#F3BA2F]/5">
            <div className="flex items-center gap-1 mr-2">
              <Crown size={10} style={{ color: GOLD }} />
              <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: `${GOLD}80` }}>Admin — Switch Card Design:</span>
            </div>
            {([1, 2, 3] as Tier[]).map((t) => {
              const c = TIER_CFG[t];
              return (
                <button key={t} onClick={() => setTier(t)}
                  className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase transition-all"
                  style={{
                    background: tier === t ? c.accent : "transparent",
                    color: tier === t ? "black" : c.accent,
                    border: `1px solid ${c.accent}60`,
                    fontWeight: 700,
                  }}
                >
                  {c.emoji} Tier {t}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* ── INPUT PANEL ── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            {/* Name */}
            <div>
              <label className="font-mono text-[9px] tracking-widest text-white/30 uppercase block mb-2">Your Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-black border border-white/[0.1] px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#F3BA2F]/50 transition-colors placeholder-white/20"
              />
            </div>

            {/* Photo */}
            <div>
              <label className="font-mono text-[9px] tracking-widest text-white/30 uppercase block mb-2">Profile Photo (optional)</label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full border border-dashed border-white/[0.12] hover:border-[#F3BA2F]/40 transition-colors py-5 flex flex-col items-center gap-2 group"
              >
                {photoUrl ? (
                  <img src={photoUrl} alt="preview" className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: `${cfg.accent}60` }} />
                ) : (
                  <Upload size={20} className="text-white/20 group-hover:text-[#F3BA2F]/60 transition-colors" />
                )}
                <span className="text-white/30 text-xs font-mono">{photoUrl ? "Click to change photo" : "Click to upload profile photo"}</span>
              </button>
            </div>

            {/* Signature Canvas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[9px] tracking-widest text-white/30 uppercase flex items-center gap-1.5">
                  <Pen size={9} /> Authorize Your Signature
                </label>
                <div className="flex gap-2">
                  <button onClick={handleClearSig} className="flex items-center gap-1 font-mono text-[8px] text-white/25 hover:text-white/60 px-2 py-1 border border-white/10 transition-colors">
                    <RotateCcw size={9} /> CLEAR
                  </button>
                  <button onClick={handleSigCapture} className="font-mono text-[8px] px-2 py-1 transition-colors" style={{ background: `${cfg.accent}22`, color: cfg.accent, border: `1px solid ${cfg.accent}44` }}>
                    CAPTURE
                  </button>
                </div>
              </div>
              <div style={{ border: `1px solid ${cfg.accent}30`, borderRadius: 4, background: "rgba(0,0,0,0.6)", position: "relative" }}>
                <canvas
                  ref={sigCanvasRef}
                  width={500}
                  height={110}
                  style={{ width: "100%", height: 110, cursor: "crosshair", display: "block", touchAction: "none" }}
                />
                {!hasDrawn && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                    <span style={{ fontSize: 10, color: `${cfg.accent}25`, fontFamily: "monospace", letterSpacing: "0.15em" }}>DRAW YOUR SIGNATURE HERE</span>
                  </div>
                )}
              </div>
              {sigDataUrl && (
                <div className="mt-1 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[8px] text-emerald-400">Signature captured — visible on card</span>
                </div>
              )}
            </div>

            {/* Auto-filled fields */}
            <div className="border border-white/[0.05] p-4 space-y-2">
              <div className="font-mono text-[8px] tracking-widest text-white/20 uppercase mb-3">Auto-Generated Fields</div>
              {[
                { label: "Member ID", value: memberId },
                { label: "Tier", value: `${cfg.emoji} ${cfg.name} — ${cfg.priceLabel}/month` },
                { label: "Issue Date", value: issueDate },
                { label: "Expiry Date", value: expiryDate },
                { label: "Issuing Authority", value: "F. Orakzai · OkzByte Hub" },
              ].map((f) => (
                <div key={f.label} className="flex justify-between text-xs">
                  <span className="text-white/25 font-mono">{f.label}</span>
                  <span className="text-white/60 font-mono">{f.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── CARD PREVIEW PANEL ── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-5">
            <div className="font-mono text-[9px] tracking-widest text-white/25 uppercase">Live Card Preview</div>

            <div className="overflow-x-auto pb-2">
              <div ref={cardRef} style={{ display: "inline-block" }}>
                {tier === 1 && <Tier1Card {...cardProps} />}
                {tier === 2 && <Tier2Card {...cardProps} />}
                {tier === 3 && <Tier3Card {...cardProps} />}
              </div>
            </div>

            <motion.button
              onClick={handleExport}
              disabled={!name.trim() || exporting}
              whileHover={{ scale: name.trim() ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wider font-mono transition-all disabled:opacity-40"
              style={{
                background: name.trim() ? `linear-gradient(135deg, ${cfg.accent}dd, ${cfg.accent}aa)` : "#333",
                color: "black",
                boxShadow: name.trim() ? `0 0 30px ${cfg.accent}40` : "none",
              }}
            >
              {exporting ? (
                <motion.div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
              ) : <Download size={15} />}
              {exporting ? "GENERATING 300 DPI PNG..." : "EXPORT SOVEREIGN ID (PNG)"}
            </motion.button>

            <AnimatePresence>
              {exported && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <button
                    onClick={onDone}
                    className="w-full flex items-center justify-center gap-2 py-4 font-bold text-sm tracking-wider font-mono text-black"
                    style={{ background: GOLD, boxShadow: `0 0 30px ${GOLD}50` }}
                  >
                    Proceed to OkzByte Hub Community
                    <ChevronRight size={15} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!name.trim() && (
              <p className="text-white/20 text-[10px] font-mono text-center">Enter your full name above to enable export</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────
/* ─────────────────────────────────────────
     PHASE 5 — WEB3 OS DASHBOARD
  ───────────────────────────────────────── */
  type NavTab = "home" | "community" | "academy" | "signals" | "spaces";

  const FOREX_SIGNALS = [
    { id:1, pair:"EUR/USD",  dir:"SHORT", entry:"1.0847", tp1:"1.0790", tp2:"1.0730", sl:"1.0890", conf:"HIGH",   date:"29 Jun", session:"London" },
    { id:2, pair:"GBP/JPY",  dir:"LONG",  entry:"198.40", tp1:"199.80", tp2:"201.20", sl:"197.10", conf:"MEDIUM", date:"28 Jun", session:"Tokyo"  },
    { id:3, pair:"USD/CAD",  dir:"SHORT", entry:"1.3620",  tp1:"1.3550", tp2:"1.3480", sl:"1.3680", conf:"HIGH",   date:"27 Jun", session:"NY"     },
    { id:4, pair:"AUD/USD",  dir:"LONG",  entry:"0.6485",  tp1:"0.6540", tp2:"0.6590", sl:"0.6445", conf:"MEDIUM", date:"26 Jun", session:"Sydney" },
    { id:5, pair:"XAU/USD",  dir:"LONG",  entry:"2318.0",  tp1:"2345.0", tp2:"2368.0", sl:"2295.0", conf:"HIGH",   date:"25 Jun", session:"London" },
  ];
  const SPOT_SIGNALS = [
    { id:1, pair:"BTC/USDT",   dir:"LONG",  entry:"67,450", tp1:"69,200", tp2:"71,000", sl:"66,000", conf:"HIGH",   date:"29 Jun", capital:"5%" },
    { id:2, pair:"ETH/USDT",   dir:"LONG",  entry:"3,420",  tp1:"3,580",  tp2:"3,750",  sl:"3,300",  conf:"HIGH",   date:"28 Jun", capital:"4%" },
    { id:3, pair:"SOL/USDT",   dir:"SHORT", entry:"182.40", tp1:"175.00", tp2:"168.00", sl:"189.00", conf:"MEDIUM", date:"27 Jun", capital:"3%" },
    { id:4, pair:"BNB/USDT",   dir:"LONG",  entry:"582.00", tp1:"610.00", tp2:"635.00", sl:"562.00", conf:"MEDIUM", date:"26 Jun", capital:"3%" },
    { id:5, pair:"MATIC/USDT", dir:"SHORT", entry:"0.685",  tp1:"0.640",  tp2:"0.600",  sl:"0.720",  conf:"LOW",    date:"25 Jun", capital:"2%" },
  ];
  const FUTURES_SIGNALS = [
    { id:1, pair:"DEXE/USDT", dir:"SHORT", entry:"11.80",  tp1:"10.50",  tp2:"9.20",   sl:"12.80",  lev:"1x", capital:"1%", date:"23 Jun" },
    { id:2, pair:"SYN/USDT",  dir:"SHORT", entry:"0.220",  tp1:"0.190",  tp2:"0.165",  sl:"0.245",  lev:"1x", capital:"1%", date:"22 Jun" },
    { id:3, pair:"BEAT/USDT", dir:"SHORT", entry:"0.0085", tp1:"0.0072", tp2:"0.0060", sl:"0.0095", lev:"1x", capital:"1%", date:"11 Jun" },
    { id:4, pair:"BTC/USDT",  dir:"LONG",  entry:"67,200", tp1:"69,000", tp2:"71,500", sl:"65,500", lev:"3x", capital:"2%", date:"29 Jun" },
    { id:5, pair:"ETH/USDT",  dir:"LONG",  entry:"3,400",  tp1:"3,600",  tp2:"3,800",  sl:"3,250",  lev:"2x", capital:"2%", date:"28 Jun" },
  ];
  const COMMUNITY_POSTS_DATA = [
    { id:1, initials:"FO", type:"SIGNAL",       time:"2m ago",  body:"📊 BTC/USD — LONG · Entry $67,450 · TP1 $69,200 · TP2 $71,000 · SL $66,000 · Confidence: HIGH", likes:34 },
    { id:2, initials:"FO", type:"ANALYSIS",     time:"18m ago", body:"🔍 ETH/USDT — Bullish divergence on 4H RSI. Support $3,420 holding. Watch breakout above $3,580.", likes:27 },
    { id:3, initials:"FO", type:"FOREX",        time:"1h ago",  body:"💱 EUR/USD SHORT · Entry 1.0847 · TP1 1.0790 · SL 1.0890 · London Open session. Manage risk.", likes:19 },
    { id:4, initials:"FO", type:"LEARNING",     time:"3h ago",  body:"📚 Module 7 live: Wyckoff Accumulation — Institutional order flow, spring patterns, sign-of-strength candles.", likes:41 },
    { id:5, initials:"FO", type:"ANNOUNCEMENT", time:"5h ago",  body:"🔔 NEXT ZOOM: Saturday July 5 · 8 PM PKT — Advanced Risk & Portfolio Sizing. Live Q&A. All tiers.", likes:56 },
  ];
  const COURSES_DATA = [
    { cat:"Forex Learning",           title:"Wyckoff Accumulation Secrets",        sub:"Institutional order flow & spring patterns",  locked:false, level:"INTERMEDIATE" },
    { cat:"Crypto Learning",          title:"BTC On-Chain Analysis Mastery",       sub:"UTXO sets, whale wallets & exchange flows",    locked:false, level:"ADVANCED"     },
    { cat:"Stock Markets",            title:"Elliott Wave & Fibonacci Confluence",  sub:"Multi-timeframe wave counting strategies",    locked:true,  level:"ADVANCED"     },
    { cat:"Artificial Intelligence",  title:"AI Trading Bots with Python",         sub:"ML signal generation & backtesting",          locked:false, level:"BEGINNER"     },
    { cat:"Blockchain Infrastructure",title:"DeFi Protocol Architecture",          sub:"Smart contracts, liquidity pools & AMMs",     locked:true,  level:"ADVANCED"     },
    { cat:"Forex Learning",           title:"London Session Breakout Strategy",    sub:"High-frequency setups during NY overlap",     locked:false, level:"BEGINNER"     },
    { cat:"Crypto Learning",          title:"Altcoin Season Rotation Model",       sub:"Sector rotation signals & BTC dominance",     locked:true,  level:"INTERMEDIATE" },
    { cat:"Artificial Intelligence",  title:"GPT Prompt Engineering for Traders",  sub:"AI-assisted market research automation",      locked:false, level:"BEGINNER"     },
  ];
  const ACADEMY_CATS = ["All","Forex Learning","Crypto Learning","Stock Markets","Artificial Intelligence","Blockchain Infrastructure"];
  const SPACES_DATA = [
    { id:1, host:"Faisal Orakzai", title:"Markets Open: BTC & Macro Analysis",  live:true,  listeners:47, speakers:["FO","MK","AS"], topic:"Crypto · Macro",  startIn:null           },
    { id:2, host:"Faisal Orakzai", title:"Forex London Session Prep",           live:false, listeners:0,  speakers:["FO"],           topic:"Forex",           startIn:"2h 15m"       },
    { id:3, host:"Faisal Orakzai", title:"Web3 Builder Roundtable",             live:false, listeners:0,  speakers:["FO","ZK"],      topic:"Web3 · Dev",      startIn:"Tomorrow 9PM" },
    { id:4, host:"Faisal Orakzai", title:"DeFi Protocol Deep Dive",             live:false, listeners:0,  speakers:["FO"],           topic:"DeFi · Crypto",   startIn:"Saturday 8PM" },
  ];
  const MOCK_SPEAKERS_DATA = [
    { initials:"FO", name:"Faisal Orakzai", handle:"faisalorakzaii", role:"Host",    muted:false, verified:true  },
    { initials:"MK", name:"M. Khan",        handle:"mkhan_web3",     role:"Speaker", muted:true,  verified:true  },
    { initials:"AS", name:"A. Sheikh",      handle:"asheikh_fx",     role:"Speaker", muted:false, verified:false },
    { initials:"ZR", name:"Zara R.",        handle:"zara_crypto",    role:"Speaker", muted:true,  verified:true  },
  ];
  const MOCK_LISTENERS_DATA = [
    { initials:"HR", name:"Hamza R.",  role:"Listener", verified:false },
    { initials:"NK", name:"Naveed K.", role:"Listener", verified:true  },
    { initials:"SA", name:"Sara A.",   role:"Listener", verified:false },
    { initials:"BI", name:"Bilal I.",  role:"Listener", verified:true  },
    { initials:"FQ", name:"Farhan Q.", role:"Listener", verified:false },
    { initials:"WN", name:"Waqar N.", role:"Listener", verified:false },
    { initials:"PK", name:"P. Khan",  role:"Listener", verified:true  },
    { initials:"DJ", name:"D. Javed", role:"Listener", verified:false },
  ];
  const SPACE_EMOJIS = ["😂","😮","😢","💜","💯","👏","🤜","👍","👎","🎉"];

  function VerifiedBadge({ tier, accent }: { tier: Tier; accent: string }) {
    const cfg = TIER_CFG[tier];
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[9px] font-black tracking-widest uppercase"
        style={{ background:`${accent}18`, border:`1px solid ${accent}50`, color:accent, boxShadow:`0 0 10px ${accent}25` }}>
        {tier === 3 && <img src="/logos/okzbyte.webp" alt="" style={{ width:9, height:9, objectFit:"contain", filter:`drop-shadow(0 0 3px ${accent})` }}/>}
        {cfg.emoji} {cfg.name}
      </span>
    );
  }

  function SignalGrid({ items }: { items: { label:string; val:string }[] }) {
    const colors: Record<string,{bg:string;border:string}> = {
      Entry: { bg:"rgba(212,175,55,0.10)", border:"rgba(212,175,55,0.30)" },
      TP1:   { bg:"rgba(34,197,94,0.08)",  border:"rgba(34,197,94,0.20)"  },
      TP2:   { bg:"rgba(34,197,94,0.08)",  border:"rgba(34,197,94,0.20)"  },
      SL:    { bg:"rgba(239,68,68,0.08)",  border:"rgba(239,68,68,0.20)"  },
    };
    return (
      <div className="grid grid-cols-4 gap-2">
        {items.map(({ label, val }) => (
          <div key={label} className="rounded-lg p-2 text-center" style={{ background:colors[label]?.bg, border:`1px solid ${colors[label]?.border}` }}>
            <div className="font-mono text-[7px] text-white/30 uppercase mb-1">{label}</div>
            <div className="font-mono text-[10px] font-bold text-white">{val}</div>
          </div>
        ))}
      </div>
    );
  }

  function CommunityPhase({
    tier, walletAddr, memberId, onExpired, onGoToCard, onReset,
  }: {
    tier: Tier; walletAddr: string; memberId: string;
    onExpired: ()=>void; onGoToCard: (t: Tier)=>void; onReset: ()=>void;
  }) {
    const cfg = TIER_CFG[tier];
    const accent = tier === 3 ? "#D4AF37" : cfg.accent;
    const isAdmin = walletAddr.toLowerCase() === ADMIN_WALLET;

    /* ── Navigation ── */
    const [activeTab, setActiveTab] = useState<NavTab>("home");
    const [daysLeft, setDaysLeft] = useState(30);

    /* ── Profile ── */
    const [editingProfile, setEditingProfile] = useState(false);
    const [profileName,    setProfileName]    = useState(LS.get("okz_name")  || "Sovereign Member");
    const [profileBio,     setProfileBio]     = useState(LS.get("okz_bio")   || "Web3 trader & builder. Silicon Valley.");
    const [profilePhoto,   setProfilePhoto]   = useState<string|null>(LS.get("okz_photo") || null);
    const photoRef = useRef<HTMLInputElement>(null);

    /* ── Community ── */
    const [posts,       setPosts]       = useState(COMMUNITY_POSTS_DATA);
    const [newPost,     setNewPost]     = useState("");
    const [liked,       setLiked]       = useState<Record<number,boolean>>({});
    const [reposted,    setReposted]    = useState<Record<number,boolean>>({});
    const [commentOpen, setCommentOpen] = useState<Record<number,boolean>>({});
    const [commentText, setCommentText] = useState<Record<number,string>>({});
    const [comments,    setComments]    = useState<Record<number,string[]>>({});
    const [followed,    setFollowed]    = useState<Record<number,boolean>>({});

    /* ── Academy ── */
    const [activeCat, setActiveCat] = useState("All");

    /* ── Signals ── */
    const [sigMarket, setSigMarket] = useState<"forex"|"crypto"|null>(null);
    const [sigSubcat, setSigSubcat] = useState<"spot"|"futures"|null>(null);

    /* ── Spaces — ALL STATE LIFTED HERE to prevent remount resets ── */
    const [spaceView,    setSpaceView]    = useState<"list"|"welcome"|"preview"|"room"|"guests">("list");
    const [selectedSpId, setSelectedSpId] = useState<number|null>(null);
    const [spMuted,      setSpMuted]      = useState(true);
    const [spSpeaking,   setSpSpeaking]   = useState(false);
    const [guestFilter,  setGuestFilter]  = useState<"all"|"cohosts"|"speakers"|"listening">("all");
    const [emojiBurst,   setEmojiBurst]   = useState<string|null>(null);
    const [chatOpen,     setChatOpen]     = useState(false);
    const [chatMsg,      setChatMsg]      = useState("");
    const [chatMsgs,     setChatMsgs]     = useState<{who:string;text:string;time:string}[]>([
      { who:"M. Khan",  text:"Great analysis on BTC setup 🔥",          time:"2m" },
      { who:"A. Sheikh",text:"Entry at 67k confirmed on 15M chart ✅",   time:"1m" },
      { who:"Zara R.",  text:"SL below 66k looks safe for this setup",   time:"30s"},
    ]);
    const chatScrollRef = useRef<HTMLDivElement>(null);

    const selectedSpace = SPACES_DATA.find(s => s.id === selectedSpId) ?? null;

    useEffect(() => {
      document.title = "OkzByte Hub";
      const exp = parseInt(LS.get("okz_expires") || "0");
      if (!exp) return;
      const tick = () => {
        const rem = exp - Date.now();
        if (rem <= 0) { LS.del("okz_wallet","okz_tier","okz_expires","okz_tx"); onExpired(); return; }
        setDaysLeft(Math.ceil(rem / 86400000));
      };
      tick();
      const id = setInterval(tick, 60_000);
      return () => clearInterval(id);
    }, [onExpired]);

    useEffect(() => {
      if (chatOpen && chatScrollRef.current) {
        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
      }
    }, [chatMsgs, chatOpen]);

    const saveProfile = () => {
      LS.set("okz_name", profileName);
      LS.set("okz_bio",  profileBio);
      if (profilePhoto) LS.set("okz_photo", profilePhoto);
      setEditingProfile(false);
    };

    const sendChat = () => {
      const t = chatMsg.trim();
      if (!t) return;
      const now = new Date();
      setChatMsgs(prev => [...prev, { who: profileName.split(" ")[0], text: t, time: "now" }]);
      setChatMsg("");
    };

    const firEmoji = (e: string) => {
      setEmojiBurst(e);
      setTimeout(() => setEmojiBurst(null), 1200);
    };

    /* ══════════════════ PROFILE HEADER ══════════════════ */
    const profileHeader = (
      <div className="relative rounded-3xl overflow-hidden mb-2"
        style={{ background:"rgba(12,9,3,0.85)", border:`1px solid ${accent}22`, backdropFilter:"blur(24px)" }}>
        <div className="h-20 relative overflow-hidden"
          style={{ background:`linear-gradient(135deg,#0a0600,#1a1000,${accent}22,#0d0800)` }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage:`linear-gradient(${accent} 1px,transparent 1px),linear-gradient(90deg,${accent} 1px,transparent 1px)`, backgroundSize:"18px 18px" }}/>
          {isAdmin && (
            <div className="absolute top-2 left-3 right-3 flex items-center gap-1.5 flex-wrap">
              <span className="font-mono text-[7px] uppercase" style={{color:`${accent}60`}}><Crown size={8} className="inline" style={{color:accent}}/> Admin:</span>
              {([1,2,3] as Tier[]).map(t=>(
                <button key={t} onClick={()=>onGoToCard(t)}
                  className="font-mono text-[7px] font-bold uppercase px-1.5 py-0.5 rounded"
                  style={{ background:`${TIER_CFG[t].accent}25`, color:TIER_CFG[t].accent, border:`1px solid ${TIER_CFG[t].accent}40` }}>
                  {TIER_CFG[t].emoji}T{t}
                </button>
              ))}
              <button onClick={onReset} className="ml-auto font-mono text-[7px] px-1.5 py-0.5 rounded border border-red-500/30 text-red-400">↺</button>
            </div>
          )}
        </div>
        <div className="px-5 pb-4">
          <div className="flex items-end justify-between -mt-8 mb-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center font-bold text-2xl"
                style={{ background:"linear-gradient(135deg,#1a1000,#2a1a00)", border:`2.5px solid ${accent}`, boxShadow:`0 0 20px ${accent}50`, color:accent }}>
                {profilePhoto ? <img src={profilePhoto} className="w-full h-full object-cover"/> : profileName[0]?.toUpperCase()}
              </div>
              <button onClick={()=>photoRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background:accent }}><Upload size={9} color="#000"/></button>
              <input ref={photoRef} type="file" accept="image/*" className="hidden"
                onChange={e=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=ev=>setProfilePhoto(ev.target?.result as string); r.readAsDataURL(f); }}/>
            </div>
            <button onClick={editingProfile ? saveProfile : ()=>setEditingProfile(true)}
              className="mb-1 font-mono text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
              style={{ border:`1px solid ${accent}50`, color:accent, background:`${accent}10` }}>
              {editingProfile ? "Save" : "Edit"}
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {editingProfile
              ? <input value={profileName} onChange={e=>setProfileName(e.target.value)}
                  className="bg-transparent border-b font-black text-lg outline-none" style={{ borderColor:`${accent}50`, color:"#FFF3B0" }} maxLength={40}/>
              : <span className="font-black text-lg" style={{ color:"#FFF3B0", textShadow:`0 0 20px ${accent}60` }}>{profileName}</span>
            }
            <VerifiedBadge tier={tier} accent={accent}/>
          </div>
          {editingProfile
            ? <input value={profileBio} onChange={e=>setProfileBio(e.target.value)}
                className="bg-transparent border-b text-neutral-400 text-[11px] font-mono w-full outline-none mb-2"
                style={{ borderColor:`${accent}30` }} maxLength={100}/>
            : <p className="text-[11px] font-mono text-neutral-400 tracking-wider mb-3 leading-relaxed">{profileBio}</p>
          }
          <div className="flex items-center gap-4 pt-3" style={{ borderTop:`1px solid ${accent}15` }}>
            <div><div className="font-mono text-[8px] text-white/20 uppercase tracking-widest mb-0.5">Member ID</div><div className="font-mono text-[11px] font-bold" style={{color:accent}}>{memberId}</div></div>
            <div className="w-px h-6 bg-white/10"/>
            <div><div className="font-mono text-[8px] text-white/20 uppercase tracking-widest mb-0.5">Wallet</div><div className="font-mono text-[10px] text-neutral-500">{walletAddr.slice(0,10)}…{walletAddr.slice(-6)}</div></div>
            <div className="ml-auto text-right"><div className="font-mono text-[8px] text-white/20 uppercase tracking-widest mb-0.5">Expires</div><div className="font-mono text-[11px] text-white/50">{daysLeft}d</div></div>
          </div>
        </div>
      </div>
    );

    /* ══════════════════ SPACES VIEWS (rendered directly, not as sub-component) ══════════════════ */
    if (activeTab === "spaces") {
      /* Welcome */
      if (spaceView === "welcome") return (
        <div className="min-h-screen bg-black text-white">
          <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between" style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <img src="/logos/okzbyte.webp" alt="" style={{ width:26, height:26, objectFit:"contain", filter:`drop-shadow(0 0 8px ${accent}80)` }}/>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{color:`${accent}70`}}>OkzByte Hub</span>
            </div>
            <div className="font-mono text-[8px] border border-white/10 px-2.5 py-1 rounded-full text-white/25">{daysLeft}d left</div>
          </div>
          <div className="max-w-lg mx-auto px-6 pt-12 flex flex-col items-center text-center">
            <div className="text-6xl mb-6">🎙️</div>
            <h2 className="text-white font-black text-2xl mb-2">Welcome to Spaces</h2>
            <p className="text-white/40 text-sm mb-10">Where live audio conversations happen</p>
            <div className="w-full space-y-6 mb-10 text-left">
              {[
                { icon:"🌐", title:"Spaces are public", desc:"Anyone can listen, including people not logged in to OkzByte Hub." },
                { icon:"🔊", title:"Listen or request to speak", desc:"Your followers can always see what Spaces you're speaking in." },
                { icon:"🛡️", title:"Manage your experience", desc:"You can block and report people in a Space." },
              ].map((item,i)=>(
                <div key={i} className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm mb-0.5">{item.title}</div>
                    <div className="text-white/40 text-[12px] leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={()=>setSpaceView("list")}
              className="w-full py-4 rounded-full font-bold text-base text-white"
              style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)" }}>Got it</button>
          </div>
        </div>
      );

      /* Guests list */
      if (spaceView === "guests") return (
        <div className="min-h-screen bg-black text-white">
          <div className="flex items-center gap-4 px-4 py-4 border-b border-white/08 sticky top-0 z-40 bg-black">
            <button onClick={()=>setSpaceView("room")} className="text-white/50"><ChevronRight size={22} style={{transform:"rotate(180deg)"}}/></button>
            <h2 className="text-white font-bold text-lg">Guests</h2>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-center gap-3 bg-white/08 rounded-full px-4 py-2.5">
              <span className="text-white/30 text-sm">🔍</span>
              <span className="text-white/25 text-sm">Search for people and groups</span>
            </div>
          </div>
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto" style={{scrollbarWidth:"none"}}>
            {(["all","cohosts","speakers","listening"] as const).map(f=>(
              <button key={f} onClick={()=>setGuestFilter(f)}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
                style={{ background:guestFilter===f?"rgba(124,58,237,0.15)":"transparent", borderColor:guestFilter===f?"#7c3aed":"rgba(255,255,255,0.2)", color:guestFilter===f?"#a78bfa":"rgba(255,255,255,0.6)" }}>
                {f==="all"?"All":f==="cohosts"?"Co-hosts":f==="speakers"?"Speakers":"Listening"}
              </button>
            ))}
          </div>
          <div className="px-4 pb-20">
            {(guestFilter==="all"||guestFilter==="cohosts") && (
              <div className="mb-6">
                <div className="text-white font-bold text-base mb-0.5">Co-hosts</div>
                <div className="text-white/30 text-sm">0 co-hosts</div>
              </div>
            )}
            {(guestFilter==="all"||guestFilter==="speakers") && (
              <div className="mb-6">
                <div className="text-white font-bold text-base mb-0.5">Speakers</div>
                <div className="text-white/30 text-sm mb-3">{MOCK_SPEAKERS_DATA.length} speakers · 5 open spots</div>
                {MOCK_SPEAKERS_DATA.map((s,i)=>(
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/06">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
                      style={{ background:`${accent}20`, border:`2px solid ${accent}50`, color:accent }}>{s.initials}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-sm">{s.name}</span>
                        {s.verified && <span className="text-xs" style={{color:accent}}>✓</span>}
                      </div>
                      <div className="text-white/30 text-[12px]">@{s.handle}</div>
                    </div>
                    {s.muted ? <MicOff size={14} color="rgba(255,255,255,0.2)"/> : <Mic size={14} color="#22c55e"/>}
                  </div>
                ))}
              </div>
            )}
            {(guestFilter==="all"||guestFilter==="listening") && (
              <div>
                <div className="text-white font-bold text-base mb-0.5">Listeners</div>
                <div className="text-white/30 text-sm mb-3">{MOCK_LISTENERS_DATA.length + 41} people listening</div>
                {MOCK_LISTENERS_DATA.map((s,i)=>(
                  <div key={i} className="flex items-center gap-3 py-3 border-b border-white/06">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0"
                      style={{ background:"rgba(255,255,255,0.07)", border:"2px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.5)" }}>{s.initials}</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-sm">{s.name}</span>
                        {s.verified && <span className="text-xs text-[#7c3aed]">✓</span>}
                      </div>
                      <div className="text-white/30 text-[12px]">Listener</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );

      /* Preview / Join screen */
      if (spaceView === "preview" && selectedSpace) return (
        <div className="min-h-screen bg-black text-white">
          <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between" style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <button onClick={()=>setSpaceView("list")} className="text-white/50 font-bold text-xl">‹</button>
            <div className="flex items-center gap-4">
              <span className="text-white/40 font-bold">•••</span>
              <button onClick={()=>setSpaceView("list")} className="font-bold text-sm text-red-400">Leave</button>
            </div>
          </div>
          <div className="max-w-lg mx-auto px-4 pt-4 pb-6">
            {/* REC notice */}
            {selectedSpace.live && (
              <div className="flex items-start gap-2 mb-4 p-3 rounded-xl" style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)" }}>
                <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                  <motion.div className="w-2 h-2 rounded-full bg-red-500" animate={{opacity:[1,0.3,1]}} transition={{duration:0.8,repeat:Infinity}}/>
                  <span className="font-bold text-white text-xs">REC</span>
                </div>
                <p className="text-white/40 text-[11px] leading-relaxed">The Host is recording this Space. Everyone that speaks will be included in the public recording.</p>
              </div>
            )}
            {/* Title */}
            <h1 className="text-white font-black text-2xl leading-tight mb-5">{selectedSpace.title}</h1>
            {/* Speakers grid */}
            <div className="grid grid-cols-4 gap-4 mb-5">
              {MOCK_SPEAKERS_DATA.map((s,i)=>(
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-base"
                      style={{ background:i===0?`${accent}20`:"rgba(255,255,255,0.07)", border:`2.5px solid ${i===0?accent:"rgba(255,255,255,0.2)"}`, color:i===0?accent:"rgba(255,255,255,0.6)" }}>{s.initials}</div>
                    {i===0 && <motion.div className="absolute -inset-0.5 rounded-full border-2" style={{borderColor:accent}} animate={{opacity:[0.8,0.15,0.8]}} transition={{duration:1.5,repeat:Infinity}}/>}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{background:"#000",border:"1.5px solid rgba(255,255,255,0.12)"}}>
                      {s.muted?<MicOff size={9} color="rgba(255,255,255,0.3)"/>:<Mic size={9} color="#22c55e"/>}
                    </div>
                  </div>
                  <div className="text-center w-full">
                    <div className="flex items-center justify-center gap-0.5">
                      {s.verified && <span className="text-[8px]" style={{color:accent}}>✓</span>}
                      <span className="text-white text-[10px] font-medium truncate">{s.name.split(" ")[0]}...</span>
                    </div>
                    <div className="text-white/30 text-[9px]">{s.role}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Listeners pill */}
            <div className="w-full py-3 rounded-full border border-white/12 text-white/40 text-sm font-medium text-center mb-5">
              +{MOCK_LISTENERS_DATA.length + 41} other listeners
            </div>
            {/* Start listening button */}
            <button onClick={()=>setSpaceView("room")}
              className="w-full py-4 rounded-full font-bold text-base text-white"
              style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)", boxShadow:"0 8px 30px rgba(124,58,237,0.4)" }}>
              Start listening
            </button>
          </div>
        </div>
      );

      /* Inside the Room */
      if (spaceView === "room" && selectedSpace) return (
        <div className="min-h-screen bg-black text-white flex flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
            <button onClick={()=>setSpaceView("preview")} className="text-white/40 text-2xl leading-none">∨</button>
            <div className="flex items-center gap-5">
              <button className="text-white/40 font-bold tracking-widest">•••</button>
              <button onClick={()=>{ setSpaceView("list"); setSpSpeaking(false); setSpMuted(true); setChatOpen(false); }}
                className="font-bold text-sm text-red-400">Leave</button>
            </div>
          </div>

          {/* Main scroll area */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {/* REC + Title */}
            <div className="mb-4">
              {selectedSpace.live && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-3"
                  style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)" }}>
                  <motion.div className="w-2 h-2 rounded-full bg-red-500" animate={{opacity:[1,0.3,1]}} transition={{duration:0.8,repeat:Infinity}}/>
                  <span className="font-bold text-white text-xs tracking-wider">REC</span>
                </div>
              )}
              <h1 className="text-white font-black text-xl leading-tight">{selectedSpace.title}</h1>
            </div>

            {/* Host context card */}
            <div className="rounded-2xl p-4 mb-5" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                  style={{ background:`${accent}20`, border:`2px solid ${accent}50`, color:accent }}>FO</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-white font-bold text-sm">Faisal Orakzai</span>
                    <span className="text-[10px]" style={{color:accent}}>✓</span>
                    <span className="text-white/30 text-[11px]">@faisalorakzaii · 2h</span>
                  </div>
                  <p className="text-white/65 text-[13px] leading-relaxed">OkzByte Hub — live voice session. Join for real-time market analysis, signals, and Q&A.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/08 text-white/35 text-xs">
                <span>🎙️</span><span>Shared by Faisal Orakzai</span>
              </div>
            </div>

            {/* Swipe indicator */}
            <div className="flex justify-center mb-4"><div className="w-8 h-1 rounded-full bg-white/15"/></div>

            {/* Grid: Speakers + Listeners */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {MOCK_SPEAKERS_DATA.map((s,i)=>(
                <div key={`sp${i}`} className="flex flex-col items-center gap-1.5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg"
                      style={{ background:i===0?`${accent}20`:"rgba(255,255,255,0.06)", border:`2.5px solid ${i===0?accent:!s.muted?"#22c55e":"rgba(255,255,255,0.15)"}`, color:i===0?accent:"rgba(255,255,255,0.7)", boxShadow:!s.muted&&i!==0?"0 0 12px rgba(34,197,94,0.25)":"none" }}>{s.initials}</div>
                    {(!s.muted) && <motion.div className="absolute -inset-0.5 rounded-full border-2" style={{borderColor:i===0?accent:"#22c55e"}} animate={{opacity:[0.8,0.15,0.8]}} transition={{duration:1.2,repeat:Infinity,delay:i*0.3}}/>}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{background:"#000",border:"1.5px solid rgba(255,255,255,0.1)"}}>
                      {s.muted?<MicOff size={9} color="rgba(255,255,255,0.3)"/>:<Mic size={9} color="#22c55e"/>}
                    </div>
                  </div>
                  <div className="text-center w-full">
                    <div className="flex items-center justify-center gap-0.5">
                      {s.verified && <span className="text-[8px]" style={{color:accent}}>✓</span>}
                      <span className="text-white text-[10px] font-semibold truncate">{s.name.split(" ")[0]}...</span>
                    </div>
                    <div className="text-white/30 text-[9px]">{s.role}</div>
                  </div>
                </div>
              ))}
              {MOCK_LISTENERS_DATA.map((s,i)=>(
                <div key={`li${i}`} className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ background:"rgba(255,255,255,0.05)", border:"2px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.4)" }}>{s.initials}</div>
                  <div className="text-center w-full">
                    <div className="flex items-center justify-center gap-0.5">
                      {s.verified && <span className="text-[8px] text-[#7c3aed]">✓</span>}
                      <span className="text-white text-[10px] font-medium truncate">{s.name.split(" ")[0]}</span>
                    </div>
                    <div className="text-white/25 text-[9px]">Listener</div>
                  </div>
                </div>
              ))}
              {spSpeaking && (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center font-bold text-lg"
                      style={{ background:`${accent}18`, border:`2.5px solid ${spMuted?"rgba(255,255,255,0.2)":"#22c55e"}`, color:accent }}>
                      {profilePhoto?<img src={profilePhoto} className="w-full h-full object-cover"/>:profileName[0]}
                    </div>
                    {!spMuted && <motion.div className="absolute -inset-0.5 rounded-full border-2 border-green-400" animate={{opacity:[0.8,0.15,0.8]}} transition={{duration:1,repeat:Infinity}}/>}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{background:"#000",border:"1.5px solid rgba(255,255,255,0.1)"}}>
                      {spMuted?<MicOff size={9} color="rgba(255,255,255,0.3)"/>:<Mic size={9} color="#22c55e"/>}
                    </div>
                  </div>
                  <div className="text-center w-full">
                    <span className="text-white text-[10px] font-medium truncate block">You</span>
                    <div className="text-white/30 text-[9px]">Speaker</div>
                  </div>
                </div>
              )}
            </div>

            {/* Emoji reactions */}
            <div className="relative mb-4">
              <AnimatePresence>
                {emojiBurst && (
                  <motion.div key={emojiBurst+Date.now()} initial={{opacity:1,y:0,scale:1}} animate={{opacity:0,y:-50,scale:1.8}} transition={{duration:1.1}}
                    className="absolute left-1/2 -translate-x-1/2 bottom-12 text-4xl pointer-events-none z-20">{emojiBurst}</motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-3 justify-center flex-wrap py-2">
                {SPACE_EMOJIS.map(e=>(
                  <button key={e} onClick={()=>firEmoji(e)} className="text-2xl active:scale-75 transition-transform">{e}</button>
                ))}
              </div>
            </div>

            {/* Live Chat panel */}
            {chatOpen && (
              <div className="rounded-2xl overflow-hidden mb-4" style={{ background:"rgba(15,12,6,0.9)", border:`1px solid ${accent}20`, backdropFilter:"blur(16px)" }}>
                <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={14} style={{color:accent}}/>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest" style={{color:accent}}>Live Chat</span>
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400" animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}/>
                  </div>
                  <button onClick={()=>setChatOpen(false)} className="text-white/30 text-lg leading-none">×</button>
                </div>
                <div ref={chatScrollRef} className="h-40 overflow-y-auto px-4 py-3 space-y-2.5" style={{scrollbarWidth:"none"}}>
                  {chatMsgs.map((m,i)=>(
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] flex-shrink-0"
                        style={{ background:`${accent}20`, border:`1px solid ${accent}40`, color:accent }}>{m.who[0]}</div>
                      <div className="flex-1">
                        <span className="font-bold text-[10px] text-white/60 mr-1.5">{m.who}</span>
                        <span className="text-white/70 text-[12px]">{m.text}</span>
                      </div>
                      <span className="text-white/20 text-[9px] flex-shrink-0">{m.time}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 px-4 py-3" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                    onKeyDown={e=>{ if(e.key==="Enter") sendChat(); }}
                    placeholder="Say something..." maxLength={200}
                    className="flex-1 bg-white/05 rounded-full px-4 py-2 text-[12px] text-white/70 outline-none border border-white/10 focus:border-amber-500/40 transition-colors"/>
                  <button onClick={sendChat}
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background:chatMsg.trim()?accent:`${accent}30`, color:"#000" }}>
                    <ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom dock */}
          <div className="border-t border-white/08 px-6 py-3 flex-shrink-0"
            style={{ background:"rgba(0,0,0,0.97)", backdropFilter:"blur(20px)" }}>
            <div className="flex items-center justify-between">
              {/* Mic */}
              <div className="flex flex-col items-center gap-1">
                <button onClick={()=>{ if(!spSpeaking){setSpSpeaking(true);setSpMuted(false);}else{setSpMuted(p=>!p);} }}
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
                  style={{ background:spSpeaking&&!spMuted?"rgba(34,197,94,0.2)":"rgba(255,255,255,0.08)", border:`2px solid ${spSpeaking&&!spMuted?"#22c55e":"rgba(255,255,255,0.2)"}` }}>
                  {spSpeaking&&!spMuted?<Mic size={22} color="#22c55e"/>:<MicOff size={22} color="rgba(255,255,255,0.5)"/>}
                </button>
                <span className="text-white/40 text-[9px] font-medium">{spSpeaking?spMuted?"Unmute":"Mute":"Request"}</span>
              </div>
              {/* People */}
              <div className="flex flex-col items-center gap-1">
                <button onClick={()=>setSpaceView("guests")}
                  className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:"rgba(255,255,255,0.05)"}}>
                  <span className="text-xl">👥</span>
                </button>
                <span className="text-white/30 text-[9px]">{MOCK_SPEAKERS_DATA.length+MOCK_LISTENERS_DATA.length+41}</span>
              </div>
              {/* Heart */}
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:"rgba(255,255,255,0.05)"}}>
                  <Heart size={20} color="rgba(255,255,255,0.4)"/>
                </button>
                <span className="text-white/30 text-[9px]">Like</span>
              </div>
              {/* Share */}
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 rounded-full flex items-center justify-center" style={{background:"rgba(255,255,255,0.05)"}}>
                  <ArrowRight size={20} color="rgba(255,255,255,0.4)"/>
                </button>
                <span className="text-white/30 text-[9px]">Share</span>
              </div>
              {/* Chat */}
              <div className="flex flex-col items-center gap-1">
                <button onClick={()=>setChatOpen(p=>!p)}
                  className="w-12 h-12 rounded-full flex items-center justify-center relative"
                  style={{ background:chatOpen?"rgba(212,175,55,0.2)":"linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
                  <MessageCircle size={20} color="#fff"/>
                  {chatMsgs.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">{Math.min(chatMsgs.length,9)}</span>
                    </div>
                  )}
                </button>
                <span className="text-white/30 text-[9px]">Chat</span>
              </div>
            </div>
          </div>
        </div>
      );


      /* ── Space List ── */
      return (
        <div className="min-h-screen bg-black text-white">
          <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between" style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2">
              <img src="/logos/okzbyte.webp" alt="" style={{ width:26, height:26, objectFit:"contain", filter:`drop-shadow(0 0 8px ${accent}80)` }}/>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{color:`${accent}70`}}>OkzByte Hub</span>
            </div>
            <div className="font-mono text-[8px] border border-white/10 px-2.5 py-1 rounded-full text-white/25">{daysLeft}d left</div>
          </div>
          <div className="max-w-lg mx-auto px-4 pt-4 pb-28">
            {profileHeader}
            {/* Tab strip */}
            <div className="flex mb-4 mt-3 rounded-2xl overflow-hidden" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
              {([ {id:"home",icon:"🏠",label:"Home"},{id:"community",icon:"👥",label:"Community"},{id:"academy",icon:"🎓",label:"Academy"},{id:"signals",icon:"📊",label:"Signals"},{id:"spaces",icon:"🎙️",label:"Spaces"} ] as {id:NavTab;icon:string;label:string}[]).map(tab=>{
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                    className="flex-1 flex flex-col items-center justify-center py-2.5 relative transition-all"
                    style={{ color:isActive?accent:"rgba(255,255,255,0.3)", background:isActive?`${accent}10`:"transparent" }}>
                    <span className="text-sm mb-0.5">{tab.icon}</span>
                    <span className="font-mono text-[7px] font-bold tracking-wide uppercase">{tab.label}</span>
                    {isActive && <motion.div layoutId="tab-line" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{background:accent}} transition={{type:"spring",bounce:0.2,duration:0.35}}/>}
                  </button>
                );
              })}
            </div>
            {/* Spaces content */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-4 h-px" style={{background:accent}}/>
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{color:`${accent}80`}}>OkzByte Spaces</span>
                  </div>
                  <p className="font-mono text-[10px] text-neutral-500 tracking-wider ml-6">Live voice rooms & scheduled sessions</p>
                </div>
                <button onClick={()=>setSpaceView("welcome")} className="font-mono text-[8px] border border-white/10 px-2 py-1 rounded-full text-white/25">?</button>
              </div>
              {isAdmin && (
                <button onClick={()=>alert("Space scheduling coming soon.")}
                  className="w-full py-3 rounded-2xl font-mono font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2"
                  style={{ background:`${accent}10`, border:`1px dashed ${accent}35`, color:`${accent}60` }}>
                  + Schedule a Space
                </button>
              )}
              {SPACES_DATA.map((room,i)=>(
                <motion.div key={room.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                  className="rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
                  style={{ background:"rgba(15,12,6,0.85)", border:`1px solid ${room.live?`${accent}35`:"rgba(255,255,255,0.06)"}`, boxShadow:room.live?`0 0 20px ${accent}10`:"none" }}
                  onClick={()=>{ setSelectedSpId(room.id); setSpaceView("preview"); }}>
                  <div className="p-4">
                    {room.live && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md mb-2"
                        style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)" }}>
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-red-500" animate={{opacity:[1,0.3,1]}} transition={{duration:0.8,repeat:Infinity}}/>
                        <span className="font-mono text-[8px] font-bold text-red-400 tracking-widest">LIVE</span>
                      </div>
                    )}
                    <h3 className="text-white font-bold text-[15px] leading-snug mb-2">{room.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      {room.speakers.map((s,si)=>(
                        <div key={si} className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0"
                          style={{ background:`${accent}18`, border:`1.5px solid ${accent}45`, color:accent }}>{s}</div>
                      ))}
                      <span className="font-mono text-[10px] text-white/30 ml-1">{room.live?`· ${room.listeners} listening`:room.startIn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest" style={{color:`${accent}50`}}>{room.topic}</span>
                      <span className="font-bold text-lg" style={{color:`${accent}40`}}>›</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    /* ══════════════════ MAIN DASHBOARD TABS ══════════════════ */
    const filtered = activeCat === "All" ? COURSES_DATA : COURSES_DATA.filter(c=>c.cat===activeCat);

    return (
      <div className="min-h-screen bg-black text-white" style={{ fontFamily:"system-ui,sans-serif" }}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
          style={{ background:"rgba(0,0,0,0.92)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2">
            <img src="/logos/okzbyte.webp" alt="OkzByte" style={{ width:26, height:26, objectFit:"contain", filter:`drop-shadow(0 0 8px ${accent}80)` }}/>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{color:`${accent}70`}}>OkzByte Hub</span>
          </div>
          <div className="font-mono text-[8px] border border-white/10 px-2.5 py-1 rounded-full text-white/25">{daysLeft}d left</div>
        </div>

        <div className="max-w-lg mx-auto px-4 pt-4 pb-10">
          {profileHeader}

          {/* Tab strip */}
          <div className="flex mb-4 mt-3 rounded-2xl overflow-hidden" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
            {([ {id:"home",icon:"🏠",label:"Home"},{id:"community",icon:"👥",label:"Community"},{id:"academy",icon:"🎓",label:"Academy"},{id:"signals",icon:"📊",label:"Signals"},{id:"spaces",icon:"🎙️",label:"Spaces"} ] as {id:NavTab;icon:string;label:string}[]).map(tab=>{
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
                  className="flex-1 flex flex-col items-center justify-center py-2.5 relative transition-all"
                  style={{ color:isActive?accent:"rgba(255,255,255,0.3)", background:isActive?`${accent}10`:"transparent" }}>
                  <span className="text-sm mb-0.5">{tab.icon}</span>
                  <span className="font-mono text-[7px] font-bold tracking-wide uppercase">{tab.label}</span>
                  {isActive && <motion.div layoutId="tab-line" className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full" style={{background:accent}} transition={{type:"spring",bounce:0.2,duration:0.35}}/>}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}} transition={{duration:0.18}}>

              {/* ── HOME ── */}
              {activeTab === "home" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-px" style={{background:accent}}/>
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{color:`${accent}80`}}>Daily Signals Feed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400" animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}/>
                      <span className="font-mono text-[8px] tracking-widest text-emerald-400 uppercase">Live</span>
                    </div>
                  </div>
                  {COMMUNITY_POSTS_DATA.map((post,i)=>(
                    <div key={post.id} className="rounded-2xl p-4" style={{ background:"rgba(15,12,6,0.8)", border:"1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0"
                          style={{ background:`${accent}20`, border:`1.5px solid ${accent}45`, color:accent }}>{post.initials}</div>
                        <span className="font-mono text-[8px] tracking-widest uppercase" style={{color:`${accent}55`}}>{post.type}</span>
                        <span className="font-mono text-[8px] text-white/20 ml-auto">{post.time}</span>
                      </div>
                      <p className="text-white/70 text-[13px] leading-relaxed mb-3">{post.body}</p>
                      <button onClick={()=>setLiked(prev=>({...prev,[i]:!prev[i]}))} className="flex items-center gap-1.5" style={{color:liked[i]?"#ef4444":"rgba(255,255,255,0.25)"}}>
                        <Heart size={12} fill={liked[i]?"#ef4444":"none"}/><span className="font-mono text-[10px]">{post.likes+(liked[i]?1:0)}</span>
                      </button>
                    </div>
                  ))}
                  <div className="rounded-2xl p-4" style={{background:"rgba(15,12,6,0.8)",border:"1px solid rgba(255,255,255,0.06)"}}>
                    <div className="flex items-center gap-2 mb-2"><Video size={13} style={{color:accent}}/><span className="font-mono text-[9px] uppercase tracking-widest" style={{color:accent}}>Zoom Masterclass</span><span className="ml-auto font-mono text-[7px] border border-white/10 px-1.5 py-0.5 text-white/25">UPCOMING</span></div>
                    <p className="text-white font-bold text-sm mb-1">Advanced Risk Management & Portfolio Sizing</p>
                    <p className="font-mono text-[10px] text-white/30 mb-3">Saturday, July 5 · 8:00 PM PKT</p>
                    <button onClick={()=>alert("Zoom link sent 30 mins before.")} className="w-full py-2.5 rounded-xl font-mono font-bold text-[10px] tracking-widest uppercase border" style={{borderColor:`${accent}40`,color:accent}}>Join Zoom Session</button>
                  </div>
                </div>
              )}

              {/* ── COMMUNITY ── */}
              {activeTab === "community" && (
                <div className="space-y-3">
                  <div className="rounded-2xl p-4" style={{background:"rgba(15,12,6,0.85)",border:`1px solid ${accent}22`,backdropFilter:"blur(16px)"}}>
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold overflow-hidden"
                        style={{background:`${accent}20`,border:`1.5px solid ${accent}50`,color:accent}}>
                        {profilePhoto?<img src={profilePhoto} className="w-full h-full object-cover"/>:profileName[0]?.toUpperCase()}
                      </div>
                      <textarea value={newPost} onChange={e=>setNewPost(e.target.value.slice(0,280))} placeholder="Share a signal, analysis or insight..." rows={3}
                        className="flex-1 bg-transparent text-white/80 text-sm resize-none outline-none leading-relaxed placeholder:text-white/20"
                        style={{borderBottom:`1px solid ${accent}15`,paddingBottom:8}}/>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2" style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                      <span className="font-mono text-[9px] text-white/20">{280-newPost.length}/280</span>
                      <button onClick={()=>{ if(!newPost.trim()) return; setPosts(prev=>[{id:Date.now(),initials:profileName.slice(0,2).toUpperCase(),type:"POST",time:"now",body:newPost.trim(),likes:0},...prev]); setNewPost(""); }}
                        className="font-mono text-[9px] font-black tracking-widest uppercase px-5 py-2 rounded-full active:scale-95"
                        style={{background:newPost.trim()?accent:`${accent}30`,color:"#000",boxShadow:newPost.trim()?`0 0 20px ${accent}40`:"none"}}>⚡ Broadcast</button>
                    </div>
                  </div>
                  {posts.map(post=>(
                    <div key={post.id} className="rounded-2xl p-4" style={{background:"rgba(15,12,6,0.8)",border:"1px solid rgba(255,255,255,0.06)"}}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{background:`${accent}22`,border:`1.5px solid ${accent}50`,color:accent}}>{post.initials}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white font-bold text-sm">{profileName}</span>
                            <VerifiedBadge tier={tier} accent={accent}/>
                            <button onClick={()=>setFollowed(p=>({...p,[post.id]:!p[post.id]}))} className="ml-auto font-mono text-[8px] font-bold uppercase px-2.5 py-0.5 rounded-full"
                              style={{border:`1px solid ${followed[post.id]?accent:"rgba(255,255,255,0.15)"}`,color:followed[post.id]?accent:"rgba(255,255,255,0.35)",background:followed[post.id]?`${accent}12`:"transparent"}}>
                              {followed[post.id]?"Following":"+ Follow"}
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[8px] uppercase px-1.5 py-0.5 rounded tracking-wider" style={{background:`${accent}12`,color:`${accent}70`}}>{post.type}</span>
                            <span className="font-mono text-[8px] text-white/20">{post.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/75 text-[13px] leading-relaxed mb-4">{post.body}</p>
                      <div className="flex items-center gap-6 pt-3" style={{borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                        <button onClick={()=>setLiked(p=>({...p,[post.id]:!p[post.id]}))} className="flex items-center gap-1.5">
                          <Heart size={14} fill={liked[post.id]?"#ef4444":"none"} style={{color:liked[post.id]?"#ef4444":"rgba(255,255,255,0.3)"}}/>
                          <span className="font-mono text-[10px]" style={{color:liked[post.id]?"#ef4444":"rgba(255,255,255,0.3)"}}>{post.likes+(liked[post.id]?1:0)}</span>
                        </button>
                        <button onClick={()=>setCommentOpen(p=>({...p,[post.id]:!p[post.id]}))} className="flex items-center gap-1.5">
                          <MessageCircle size={14} style={{color:commentOpen[post.id]?accent:"rgba(255,255,255,0.3)"}}/>
                          <span className="font-mono text-[10px]" style={{color:commentOpen[post.id]?accent:"rgba(255,255,255,0.3)"}}>{(comments[post.id]||[]).length}</span>
                        </button>
                        <button onClick={()=>setReposted(p=>({...p,[post.id]:!p[post.id]}))} className="flex items-center gap-1.5">
                          <ArrowRight size={14} style={{color:reposted[post.id]?"#22c55e":"rgba(255,255,255,0.3)"}}/>
                          <span className="font-mono text-[10px]" style={{color:reposted[post.id]?"#22c55e":"rgba(255,255,255,0.3)"}}>Repost</span>
                        </button>
                      </div>
                      {commentOpen[post.id] && (
                        <div className="mt-3 space-y-1.5">
                          {(comments[post.id]||[]).map((c,ci)=>(
                            <div key={ci} className="pl-3 py-1.5 text-[12px]" style={{borderLeft:`2px solid ${accent}30`}}>
                              <span className="font-bold text-white/60 mr-2">{profileName.split(" ")[0]}</span><span className="text-white/45">{c}</span>
                            </div>
                          ))}
                          <div className="flex gap-2 mt-2">
                            <input value={commentText[post.id]||""} onChange={e=>setCommentText(p=>({...p,[post.id]:e.target.value}))}
                              onKeyDown={e=>{ if(e.key==="Enter"){ const t=(commentText[post.id]||"").trim(); if(!t) return; setComments(p=>({...p,[post.id]:[...(p[post.id]||[]),t]})); setCommentText(p=>({...p,[post.id]:""})); }}}
                              placeholder="Reply..." className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-[12px] text-white/70 outline-none border border-white/10 focus:border-amber-500/40"/>
                            <button onClick={()=>{ const t=(commentText[post.id]||"").trim(); if(!t) return; setComments(p=>({...p,[post.id]:[...(p[post.id]||[]),t]})); setCommentText(p=>({...p,[post.id]:""})); }}
                              className="px-3 py-2 rounded-xl font-mono text-[9px] font-bold uppercase" style={{background:`${accent}25`,color:accent,border:`1px solid ${accent}40`}}>POST</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── ACADEMY ── */}
              {activeTab === "academy" && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5"><div className="w-4 h-px" style={{background:accent}}/><span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{color:`${accent}80`}}>OkzByte Academy</span></div>
                    <p className="font-mono text-[10px] text-neutral-500 tracking-wider ml-6">Elite trading & builder curriculum</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1" style={{scrollbarWidth:"none"}}>
                    {ACADEMY_CATS.map(cat=>(
                      <button key={cat} onClick={()=>setActiveCat(cat)}
                        className="flex-shrink-0 font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full transition-all"
                        style={{border:`1px solid ${activeCat===cat?accent:"rgba(212,175,55,0.3)"}`,background:activeCat===cat?accent:"rgba(9,7,2,0.6)",color:activeCat===cat?"#000":"#D4AF37",boxShadow:activeCat===cat?`0 0 18px ${accent}40`:"none"}}>{cat}</button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {filtered.map((c,i)=>(
                      <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
                        className="relative rounded-2xl overflow-hidden" style={{background:"rgba(15,12,6,0.85)",border:`1px solid ${c.locked?"rgba(255,255,255,0.05)":`${accent}25`}`}}>
                        {c.locked && <div className="absolute inset-0 flex flex-col items-center justify-center z-10 rounded-2xl" style={{background:"rgba(0,0,0,0.7)",backdropFilter:"blur(3px)"}}><div className="text-2xl mb-1">🔒</div><div className="font-mono text-[8px] text-white/35 uppercase tracking-widest">Higher Tier Required</div></div>}
                        <div className="p-4 flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm" style={{background:`${accent}12`,color:`${accent}70`,border:`1px solid ${accent}20`}}>{c.cat}</span>
                              <span className="font-mono text-[8px] text-white/20">{c.level}</span>
                            </div>
                            <h3 className="text-white font-bold text-sm mb-1">{c.title}</h3>
                            <p className="text-neutral-500 text-[11px] font-mono">{c.sub}</p>
                          </div>
                          {!c.locked && <button onClick={()=>alert(`Opening: ${c.title}`)} className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{background:`${accent}20`,border:`1px solid ${accent}50`}}><ChevronRight size={14} style={{color:accent}}/></button>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SIGNALS ── */}
              {activeTab === "signals" && (
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1"><div className="w-4 h-px" style={{background:"#D4AF37"}}/><span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{color:"rgba(212,175,55,0.8)"}}>Trading Signals</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(["forex","crypto"] as const).map(m=>{
                      const active = sigMarket === m;
                      return (
                        <button key={m} onClick={()=>{ setSigMarket(m); setSigSubcat(null); }}
                          className="py-4 rounded-2xl flex flex-col items-center gap-2 transition-all active:scale-95"
                          style={{background:active?"rgba(212,175,55,0.18)":"rgba(15,12,6,0.8)",border:`1.5px solid ${active?"#D4AF37":"rgba(255,255,255,0.07)"}`,boxShadow:active?"0 0 20px rgba(212,175,55,0.2)":"none"}}>
                          <span className="text-3xl">{m==="forex"?"💱":"🪙"}</span>
                          <span className="font-mono font-black text-[11px] tracking-widest uppercase" style={{color:active?"#D4AF37":"rgba(255,255,255,0.5)"}}>{m==="forex"?"Forex":"Crypto"}</span>
                        </button>
                      );
                    })}
                  </div>
                  {sigMarket === "crypto" && (
                    <div className="grid grid-cols-2 gap-3">
                      {(["spot","futures"] as const).map(s=>{
                        const active = sigSubcat === s;
                        return (
                          <button key={s} onClick={()=>setSigSubcat(s)}
                            className="py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                            style={{background:active?"rgba(212,175,55,0.18)":"rgba(15,12,6,0.8)",border:`1.5px solid ${active?"#D4AF37":"rgba(255,255,255,0.07)"}`}}>
                            <span className="text-xl">{s==="spot"?"📈":"⚡"}</span>
                            <span className="font-mono font-bold text-[11px] tracking-widest uppercase" style={{color:active?"#D4AF37":"rgba(255,255,255,0.4)"}}>{s==="spot"?"Spot":"Futures"}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {!sigMarket && <div className="text-center py-12"><div className="text-4xl mb-3">📊</div><p className="font-mono text-[11px] text-white/25 uppercase tracking-widest">Select a market above</p></div>}
                  {sigMarket==="crypto"&&!sigSubcat && <div className="text-center py-8"><div className="text-3xl mb-2">🪙</div><p className="font-mono text-[11px] text-white/25 uppercase tracking-widest">Select Spot or Futures above</p></div>}
                  {(sigMarket==="forex"||(sigMarket==="crypto"&&sigSubcat)) && (
                    <div className="space-y-3">
                      <p className="font-mono text-[8px] text-red-400/70 bg-red-900/20 border border-red-500/20 rounded-xl px-3 py-2 text-center tracking-wider">⚠ Trade at your own risk. OkzByte is not responsible for losses.</p>
                      {(sigMarket==="forex"?FOREX_SIGNALS:sigSubcat==="spot"?SPOT_SIGNALS:FUTURES_SIGNALS).map((s,i)=>(
                        <motion.div key={s.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}
                          className="rounded-2xl overflow-hidden" style={{background:"rgba(15,12,6,0.85)",border:"1px solid rgba(212,175,55,0.22)"}}>
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs" style={{background:"rgba(212,175,55,0.15)",border:"1px solid rgba(212,175,55,0.40)",color:"#D4AF37"}}>{s.pair.split("/")[0].slice(0,4)}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-bold text-base">{s.pair}</span>
                                  <span className="font-mono text-[9px] font-black px-2 py-0.5 rounded" style={{background:s.dir==="LONG"?"#16a34a22":"#dc262622",color:s.dir==="LONG"?"#22c55e":"#ef4444",border:`1px solid ${s.dir==="LONG"?"#22c55e40":"#ef444440"}`}}>{s.dir}</span>
                                </div>
                                <div className="font-mono text-[8px] text-white/25 mt-0.5">
                                  {'session' in s ? `${s.session} · ${s.date}` : s.date}
                                </div>
                              </div>
                              {'lev' in s ? (
                                <div className="flex gap-1.5">
                                  <div className="rounded px-2 py-1 text-center" style={{background:"#16a34a22",border:"1px solid #22c55e40"}}><div className="font-mono text-[7px] text-white/30 mb-0.5">Lev</div><div className="font-mono text-[10px] font-bold text-emerald-400">{(s as any).lev}</div></div>
                                  <div className="rounded px-2 py-1 text-center" style={{background:"rgba(212,175,55,0.12)",border:"1px solid rgba(212,175,55,0.30)"}}><div className="font-mono text-[7px] text-white/30 mb-0.5">Cap</div><div className="font-mono text-[10px] font-bold" style={{color:"#D4AF37"}}>{(s as any).capital}</div></div>
                                </div>
                              ) : 'conf' in s ? (
                                <div className="text-right"><div className="font-mono text-[8px] text-white/20 mb-0.5">Conf</div><div className="font-mono text-[9px] font-bold" style={{color:(s as any).conf==="HIGH"?"#22c55e":(s as any).conf==="MEDIUM"?"#f59e0b":"#94a3b8"}}>{(s as any).conf}</div></div>
                              ) : null}
                            </div>
                            <SignalGrid items={[{label:"Entry",val:s.entry},{label:"TP1",val:s.tp1},{label:"TP2",val:s.tp2},{label:"SL",val:s.sl}]}/>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
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

  // Admin-only: jump to card phase with chosen tier
  const handleAdminGoToCard = (t: Tier) => {
    setMemberTier(t);
    setStep("card");
  };

  // Admin-only: wipe session and restart from intro
  const handleAdminReset = () => {
    LS.del("okz_wallet", "okz_tier", "okz_expires", "okz_tx", "okz_name", "okz_photo");
    setWalletAddr("");
    setMemberTier(2);
    setTxHash("");
    setIsExpired(false);
    setStep("intro");
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
          <CardPhase tier={memberTier} memberId={memberId} txHash={txHash} onDone={handleCardDone} isAdmin={walletAddr.toLowerCase() === ADMIN_WALLET} />
        )}
        {step === "community" && (
          <CommunityPhase
            tier={memberTier}
            walletAddr={walletAddr}
            memberId={memberId}
            onExpired={handleExpired}
            onGoToCard={handleAdminGoToCard}
            onReset={handleAdminReset}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
