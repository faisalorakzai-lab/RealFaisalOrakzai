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
  "Who is Faisal Orakzai?",
  "What is Orakzai Bond?",
  "What is Orakzai Group?",
  "How can I collaborate?",
];

const SYSTEM_PROMPT = `You are the official AI assistant for Faisal Orakzai's personal website (faisalorakzai.com). Answer professionally and concisely (under 120 words unless asked for detail). Only answer questions related to Faisal Orakzai, his ventures, or related technology topics.

KEY FACTS:
- Faisal Orakzai: technology entrepreneur, founder of Orakzai Group, born 30 April 2006, Pakistani, started in real estate at age 12, founded Orakzai Group in 2023
- Orakzai Group: parent organization for blockchain, AI, fintech, digital infrastructure ventures
- Orakzai Bond (orakzaibond.com): blockchain digital asset project — staking, tokenization, treasury systems
- OKZBYTE Technology: web dev, AI, blockchain, software engineering, digital transformation services
- Shamim Forever (shamimforever.com): digital platform for preserving memories and tributes
- OrakzaiX: next-gen technology infrastructure
- Specialties: AI, Blockchain, Web3, Smart Contracts, Tokenization, Enterprise Systems, Cloud
- Contact: faisalorakzai.com/contact
- Social: LinkedIn/X/Instagram @faisalorakzaii, GitHub: faisalorakzai-lab
- Research: faisalorakzai.com/research

FAQ ANSWERS:
1. Who is Faisal Orakzai? → Technology entrepreneur, founder of Orakzai Group, focused on AI, blockchain, digital assets. Born 30 April 2006, started at age 12, founded Orakzai Group in 2023.
2. What is Orakzai Bond? → Blockchain-based digital asset project exploring transparent treasury systems, staking, and tokenized digital finance. Visit orakzaibond.com.
3. What is Orakzai Group? → Technology organization developing blockchain, AI, fintech, and digital infrastructure solutions.
4. What is OKZBYTE? → Technology services: web dev, AI, blockchain, software engineering, digital transformation.
5. What is Shamim Forever? → Digital platform preserving memories and tributes through technology. Visit shamimforever.com.
6. How to contact/collaborate? → Visit faisalorakzai.com/contact to submit an inquiry. Team reviews every submission.
7. What technologies? → AI, Blockchain, Web3, Smart Contracts, Tokenization, Cloud Technologies, Enterprise Systems.
8. What industries? → AI, Blockchain, FinTech, Enterprise Software, Web Development, Digital Infrastructure.

If asked something unrelated to Faisal or technology, politely redirect to his website.`;

const GEMINI_API_KEY = "AQ.Ab8RN6KhIoPlSQoKdFGCMrck7aenSmZzGlPTCIfawDW4uCz90w";

interface FAQ { q: string[]; a: string; }
const FAQS: FAQ[] = [
  { q: ["who is faisal","about faisal","faisal orakzai"], a: "Faisal Orakzai is a technology entrepreneur and founder of Orakzai Group, focused on AI, blockchain infrastructure, digital assets, and enterprise technology. Born 30 April 2006, he began in real estate at age 12 and founded Orakzai Group in 2023." },
  { q: ["orakzai group","what is orakzai group"], a: "Orakzai Group is a technology-focused organization developing blockchain, AI, fintech, and digital infrastructure solutions. It oversees Orakzai Bond, OKZBYTE Technology, Shamim Forever, and OrakzaiX." },
  { q: ["orakzai bond","bond","okbond","tokeniz","digital asset"], a: "Orakzai Bond is a blockchain-based digital asset project exploring transparent treasury systems, staking infrastructure, and tokenized digital finance. Visit orakzaibond.com." },
  { q: ["okzbyte","software","web development"], a: "OKZBYTE Technology provides web development, AI, blockchain, software engineering, and digital transformation services. Custom software development is a core offering." },
  { q: ["shamim forever","shamim","memories"], a: "Shamim Forever is a digital platform for preserving memories and tributes through modern technology. Visit shamimforever.com." },
  { q: ["mission","goal","purpose","what does faisal do"], a: "Faisal's mission is to build scalable technology platforms contributing to secure, efficient, and innovative digital ecosystems." },
  { q: ["collab","partner","work with","opportunit"], a: "Yes, collaboration opportunities are considered based on alignment. Submit a formal inquiry at faisalorakzai.com/contact with your proposal details." },
  { q: ["contact","reach","email","inquir","get in touch"], a: "Contact Faisal via faisalorakzai.com/contact. You can also connect on LinkedIn or X at @faisalorakzaii." },
  { q: ["blockchain","distributed ledger"], a: "Blockchain is a distributed ledger enabling secure, transparent digital transactions. Faisal has deep expertise in blockchain architecture, enterprise blockchain, and Web3 infrastructure." },
  { q: ["ai project","artificial intelligence","ai work"], a: "AI is central to Faisal's work — including AI-powered automation, intelligent digital solutions, and enterprise AI platforms across his ventures." },
  { q: ["web3","decentraliz"], a: "Web3 represents the next internet generation — decentralized, built around digital ownership and blockchain. Faisal is a pioneering Web3 innovator." },
  { q: ["research","paper","publish","articles"], a: "Yes, Faisal publishes research covering blockchain, AI, Web3, digital identity, and enterprise blockchain. Full portfolio at faisalorakzai.com/research." },
  { q: ["pakistan","pakistani"], a: "Faisal Orakzai is proudly Pakistani, committed to transforming Pakistan into a global tech leader through AI and blockchain infrastructure." },
  { q: ["technologies","specializ","tech stack","skills"], a: "Faisal specializes in AI, Blockchain, Web3, Smart Contracts, Tokenization, Enterprise Systems, and Cloud Technologies." },
  { q: ["industries","sectors"], a: "Faisal works in AI, Blockchain, FinTech, Enterprise Software, Web Development, and Digital Infrastructure." },
  { q: ["vision","future","long term","2040"], a: "Faisal's Vision 2040 targets building world-class AI and blockchain infrastructure, creating tech jobs, and making Pakistan a global tech hub." },
  { q: ["social media","linkedin","twitter","instagram","follow"], a: "Follow Faisal on LinkedIn, X (Twitter), and Instagram @faisalorakzaii. GitHub: faisalorakzai-lab. Updates at faisalorakzai.com." },
  { q: ["investment","investor","fund","capital"], a: "Faisal's investment focus: deep tech — AI, blockchain, decentralized infrastructure. Submit investment inquiries at faisalorakzai.com/contact." },
  { q: ["smart contract"], a: "Smart contracts are self-executing blockchain programs enforcing predefined rules automatically. A core area of Faisal's blockchain research." },
  { q: ["defi","decentralized finance"], a: "DeFi provides financial services via blockchain without traditional intermediaries. Faisal's work explores transparent, permissionless financial infrastructure." },
];

function getLocalReply(input: string): string {
  const t = input.toLowerCase().trim();
  if (/^(hi|hello|hey|salaam|salam|assalam|greetings|yo|sup)[\s!.?]*$/.test(t) || t.length < 4) {
    return "Hello! 👋 I'm Faisal Orakzai's AI assistant. Ask me about Faisal, his ventures (Orakzai Bond, OKZBYTE, Shamim Forever), blockchain, AI, Web3, or collaboration. How can I help?";
  }
  if (/thank|thanks|thx/.test(t)) {
    return "You're welcome! Feel free to ask anything else, or visit faisalorakzai.com/contact for detailed inquiries.";
  }
  for (const faq of FAQS) {
    if (faq.q.some((k) => t.includes(k))) return faq.a;
  }
  return "I can answer questions about Faisal Orakzai, his ventures, blockchain, AI, and Web3. Try 'Who is Faisal Orakzai?' or visit faisalorakzai.com/contact for detailed inquiries.";
}

async function askGemini(userMessage: string, history: Message[]): Promise<string> {
  const historyText = history.slice(-6).map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`).join("\n");
  const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${historyText}\n\nUser: ${userMessage}\nAssistant:`;
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 250, temperature: 0.7 },
        }),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error("empty");
    return text;
  } catch {
    return getLocalReply(userMessage);
  }
}

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: "Hello! I'm Faisal Orakzai's AI assistant, powered by Gemini. Ask me anything about Faisal, his ventures, blockchain, AI, or how to collaborate.", time: now() },
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

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    const reply = await askGemini(text.trim(), messages);
    setTyping(false);
    setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: reply, time: now() }]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="hidden sm:block text-[10px] font-mono text-[#F3BA2F]/70 bg-black/80 border border-[#F3BA2F]/20 px-3 py-1.5 whitespace-nowrap"
            >
              Ask AI Assistant
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#F3BA2F]/60 focus:outline-none"
          style={{ boxShadow: "0 0 20px rgba(243,186,47,0.3), 0 4px 20px rgba(0,0,0,0.5)" }}
          aria-label="Open AI assistant"
        >
          <video className="absolute inset-0 w-full h-full object-cover" src="/bg-video.mp4" autoPlay loop muted playsInline preload="none" />
          <div className="absolute inset-0 rounded-full border border-[#F3BA2F]/40 animate-pulse-ring" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <ChevronDown className="h-5 w-5 text-[#F3BA2F]" />
                </motion.div>
              ) : (
                <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-7 h-7 flex flex-col items-center justify-center gap-0.5">
                  <div className="w-4 h-0.5 bg-[#F3BA2F] rounded" />
                  <div className="w-3 h-0.5 bg-[#F3BA2F] rounded self-start ml-0.5" />
                  <div className="w-4 h-0.5 bg-[#F3BA2F] rounded" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed bottom-24 right-3 sm:bottom-28 sm:right-6 z-40 w-[calc(100vw-1.5rem)] max-w-[360px] flex flex-col"
            style={{ maxHeight: "520px" }}
          >
            <div className="bg-black border border-[#F3BA2F]/20 flex flex-col overflow-hidden" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(243,186,47,0.08)" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3BA2F]/10 bg-black">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#F3BA2F]/40 flex-shrink-0">
                    <video src="/bg-video.mp4" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-green-400 border border-black" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold leading-none">AI Assistant</div>
                    <div className="text-[#F3BA2F]/60 text-[10px] font-mono mt-0.5">● Powered by Gemini</div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white/70 transition-colors p-1">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: "280px", maxHeight: "320px" }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-[#F3BA2F]/30 mr-2 flex-shrink-0 mt-1">
                        <video src="/bg-video.mp4" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-[#F3BA2F] text-black font-medium" : "bg-white/5 border border-white/8 text-white/80"}`}>
                        {msg.text}
                      </div>
                      <div className="text-white/20 text-[10px] font-mono px-1">{msg.time}</div>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#F3BA2F]/30">
                      <video src="/bg-video.mp4" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/5 border border-white/8 px-4 py-3 flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                      ))}
                      <span className="text-white/30 text-[10px] font-mono ml-2">thinking…</span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => send(q)} disabled={typing} className="flex-shrink-0 text-[10px] font-mono text-[#F3BA2F]/60 border border-[#F3BA2F]/15 px-3 py-1.5 hover:border-[#F3BA2F]/40 hover:text-[#F3BA2F] transition-colors whitespace-nowrap disabled:opacity-40">
                    {q}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 px-4 py-3 border-t border-[#F3BA2F]/10">
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !typing && send(input)} placeholder="Ask anything about Faisal or his work…" className="flex-1 bg-transparent text-white/80 text-sm placeholder:text-white/20 outline-none font-sans" />
                <button onClick={() => send(input)} disabled={!input.trim() || typing} className="w-8 h-8 flex items-center justify-center bg-[#F3BA2F] text-black disabled:opacity-30 hover:bg-[#ffd666] transition-colors">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-center py-2 text-[9px] font-mono text-white/15 border-t border-[#F3BA2F]/5">
                ORAKZAI GROUP · AI POWERED BY GEMINI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
