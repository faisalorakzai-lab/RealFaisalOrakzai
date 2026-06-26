import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronDown } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const QUICK = [
  "Tell me about Orakzai Group",
  "What is Orakzai Bond?",
  "How can I collaborate?",
  "Faisal's background",
];

const BOT_RESPONSES: Record<string, string> = {
  default:
    "Thank you for reaching out. For detailed inquiries please use the Contact page or connect via LinkedIn. I'll make sure Faisal's team gets back to you within 24–72 hours.",
  orakzai:
    "Orakzai Group is a multi-venture organization building at the intersection of AI, blockchain, digital assets, luxury commerce, and real-world investments. Founded by Faisal Orakzai.",
  bond: "Orakzai Bond is a blockchain-focused financial ecosystem exploring real-world asset tokenization, digital finance infrastructure, and decentralized financial systems.",
  collabo:
    "Faisal welcomes collaborations in AI, blockchain, luxury, and investment verticals. Please submit a formal inquiry via the Contact page with details about your proposal.",
  background:
    "Faisal Orakzai (born 30 April 2006) is a Pakistani entrepreneur. He began at age 12 in real estate, later expanding into crypto, forex, and blockchain. In 2023 he founded Orakzai Group.",
};

function getReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("orakzai group") || t.includes("group")) return BOT_RESPONSES.orakzai;
  if (t.includes("bond")) return BOT_RESPONSES.bond;
  if (t.includes("collab") || t.includes("partner") || t.includes("work")) return BOT_RESPONSES.collabo;
  if (t.includes("background") || t.includes("who") || t.includes("faisal")) return BOT_RESPONSES.background;
  return BOT_RESPONSES.default;
}

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: "Hello. I'm the Orakzai Group assistant. How can I help you today?", time: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: getReply(text), time: now() },
      ]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* Video button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-mono text-[#F3BA2F]/70 bg-black/80 border border-[#F3BA2F]/20 px-3 py-1.5 whitespace-nowrap"
            >
              Connect with Team
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#F3BA2F]/60 glow-gold-sm focus:outline-none"
          style={{ boxShadow: "0 0 20px rgba(243,186,47,0.3), 0 4px 20px rgba(0,0,0,0.5)" }}
          aria-label="Open chat"
        >
          {/* Looping background video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/bg-video.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Gold ring pulse */}
          <div className="absolute inset-0 rounded-full border border-[#F3BA2F]/40 animate-pulse-ring" />
          {/* Overlay icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <ChevronDown className="h-5 w-5 text-[#F3BA2F]" />
                </motion.div>
              ) : (
                <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="w-7 h-7 flex flex-col items-center justify-center gap-0.5"
                >
                  <div className="w-4 h-0.5 bg-[#F3BA2F] rounded" />
                  <div className="w-3 h-0.5 bg-[#F3BA2F] rounded self-start ml-0.5" />
                  <div className="w-4 h-0.5 bg-[#F3BA2F] rounded" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed bottom-28 right-6 z-50 w-80 sm:w-[360px] flex flex-col"
            style={{ maxHeight: "520px" }}
          >
            <div className="bg-black border border-[#F3BA2F]/20 flex flex-col overflow-hidden"
              style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(243,186,47,0.08)" }}>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3BA2F]/10 bg-black">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#F3BA2F]/40 flex-shrink-0">
                    <video src="/bg-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-green-400 border border-black" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold leading-none">Orakzai Team</div>
                    <div className="text-green-400 text-[10px] font-mono mt-0.5">● Online</div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/70 transition-colors p-1">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: "280px", maxHeight: "320px" }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-[#F3BA2F]/30 mr-2 flex-shrink-0 mt-1">
                        <video src="/bg-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#F3BA2F] text-black font-medium"
                          : "bg-white/5 border border-white/8 text-white/80"
                      }`}>
                        {msg.text}
                      </div>
                      <div className="text-white/20 text-[10px] font-mono px-1">{msg.time}</div>
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#F3BA2F]/30">
                      <video src="/bg-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/5 border border-white/8 px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]/60"
                          animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => send(q)}
                    className="flex-shrink-0 text-[10px] font-mono text-[#F3BA2F]/60 border border-[#F3BA2F]/15 px-3 py-1.5 hover:border-[#F3BA2F]/40 hover:text-[#F3BA2F] transition-colors whitespace-nowrap">
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-[#F3BA2F]/10">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-white/80 text-sm placeholder:text-white/20 outline-none font-sans"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  className="w-8 h-8 flex items-center justify-center bg-[#F3BA2F] text-black disabled:opacity-30 hover:bg-[#ffd666] transition-colors"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-center py-2 text-[9px] font-mono text-white/15 border-t border-[#F3BA2F]/5">
                ORAKZAI GROUP · SECURE CHANNEL
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
