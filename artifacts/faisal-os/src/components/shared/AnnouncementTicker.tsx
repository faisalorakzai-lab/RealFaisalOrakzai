import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const TICKER_ITEMS = [
  "CURRENTLY BUILDING: Orakzai AI Platform · Dubai HQ · Q3 2026",
  "Digital Asset Infrastructure · Active Development Phase",
  "Real Estate Tokenization Protocol · Phase 2 Funding",
  "Karachi Tech Ecosystem · Research & Systems Design",
  "Blockchain DeFi Protocol · Testnet Live",
  "AI-Powered Venture Studio · Team Building",
];

const tickerText = TICKER_ITEMS.join("   ·  ·  ·   ");

export default function AnnouncementTicker() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative w-full overflow-hidden bg-black border-b border-[#F3BA2F]/25"
      style={{ zIndex: 100 }}
    >
      {/* Left badge */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center bg-[#F3BA2F] px-3 shrink-0">
        <div className="flex items-center gap-1.5">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-black"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 0.9 }}
          />
          <span className="font-mono text-[9px] tracking-[0.22em] text-black font-bold uppercase whitespace-nowrap">
            Live Signal
          </span>
        </div>
      </div>

      {/* Scrolling ticker */}
      <div className="overflow-hidden ml-[88px] mr-8 py-2">
        <div className="flex whitespace-nowrap" style={{ animation: "ticker 38s linear infinite" }}>
          <span className="text-[#F3BA2F]/80 font-mono text-[10px] tracking-[0.2em] pr-16">{tickerText}</span>
          <span className="text-[#F3BA2F]/80 font-mono text-[10px] tracking-[0.2em] pr-16">{tickerText}</span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setClosed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/25 hover:text-[#F3BA2F] transition-colors z-10 p-1"
        aria-label="Dismiss ticker"
      >
        <X className="w-3 h-3" />
      </button>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}
