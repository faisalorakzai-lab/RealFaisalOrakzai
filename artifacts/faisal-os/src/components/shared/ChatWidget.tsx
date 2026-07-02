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

interface FAQ { q: string[]; a: string; }

const FAQS: FAQ[] = [
  {
    q: ["who is faisal", "about faisal", "tell me about faisal", "faisal orakzai who"],
    a: "Faisal Orakzai is a technology entrepreneur and founder of Orakzai Group, focused on AI, blockchain infrastructure, digital assets, and enterprise technology solutions. Born on 30 April 2006, he started in real estate at age 12, later expanded into blockchain and AI, and founded Orakzai Group in 2023.",
  },
  {
    q: ["orakzai group", "what is orakzai group", "group"],
    a: "Orakzai Group is a technology-focused organization developing solutions in blockchain, artificial intelligence, fintech, and digital infrastructure. It serves as the parent organization overseeing multiple ventures including Orakzai Bond, OKZBYTE Technology, Shamim Forever, and OrakzaiX.",
  },
  {
    q: ["orakzai bond", "bond", "okbond", "digital asset", "tokeniz"],
    a: "Orakzai Bond is a blockchain-based digital asset project designed to explore transparent treasury systems, staking infrastructure, and tokenized digital finance. It bridges traditional finance with Web3 infrastructure. Visit orakzaibond.com for more details.",
  },
  {
    q: ["okzbyte", "okz byte", "technology services", "web development"],
    a: "OKZBYTE Technology provides technology services ranging from web development to AI, blockchain, software engineering, and digital transformation solutions. Custom software development is one of its core offerings.",
  },
  {
    q: ["shamim forever", "shamim", "memories", "tribute"],
    a: "Shamim Forever is a digital platform created to preserve memories, stories, and meaningful tributes through modern technology. It represents the fusion of heritage and digital innovation.",
  },
  {
    q: ["mission", "goal", "what does faisal do", "purpose"],
    a: "Faisal Orakzai's mission is to build scalable technology platforms that contribute to secure, efficient, and innovative digital ecosystems. His ultimate goal is practical, scalable digital technologies that benefit organizations and communities through AI, blockchain, and digital infrastructure.",
  },
  {
    q: ["industries", "sectors", "fields", "which industry"],
    a: "Faisal Orakzai works across Artificial Intelligence, Blockchain, FinTech, Enterprise Software, Web Development, and Digital Infrastructure — building solutions that span multiple high-growth technology sectors.",
  },
  {
    q: ["technologies", "specializ", "expert", "skills", "tech stack"],
    a: "Faisal specializes in AI, Blockchain, Web3, Smart Contracts, Tokenization, Enterprise Systems, and Cloud Technologies. His technical work spans both cutting-edge research and production-grade implementations.",
  },
  {
    q: ["articles", "publish", "write", "blog", "content"],
    a: "Yes. Faisal regularly publishes educational articles and research covering blockchain, AI, Web3, digital identity, interoperability, and enterprise blockchain topics. You can explore his research on the Research page at faisalorakzai.com/research.",
  },
  {
    q: ["vision", "future", "long term", "2040", "plan"],
    a: "Faisal's long-term vision is to contribute to the development of trusted digital infrastructure that supports future financial and technological ecosystems. His Vision 2040 roadmap targets building world-class AI and blockchain infrastructure across Pakistan and globally.",
  },
  {
    q: ["ai project", "artificial intelligence project", "ai work"],
    a: "Yes. Faisal's AI work includes AI-powered automation, intelligent digital solutions, and enterprise AI platforms. AI is central to his vision — building systems that scale through intelligent automation.",
  },
  {
    q: ["blockchain", "distributed ledger", "what is blockchain"],
    a: "Blockchain is a distributed ledger technology that enables secure, transparent, and verifiable digital transactions without relying on a central authority. Faisal has deep expertise in blockchain architecture, enterprise blockchain, and Web3 infrastructure development.",
  },
  {
    q: ["web3", "decentraliz", "next internet", "web 3"],
    a: "Web3 represents the next generation of the internet built around decentralization, digital ownership, and blockchain technologies. Faisal is a pioneering Web3 innovator — his work spans smart contracts, DeFi, and decentralized infrastructure.",
  },
  {
    q: ["tokeniz", "tokenization", "token"],
    a: "Tokenization is the process of representing real-world or digital assets as blockchain-based tokens, enabling new models of ownership and value exchange. This is a core focus of Orakzai Bond and Faisal's blockchain research.",
  },
  {
    q: ["smart contract", "self-executing", "contract"],
    a: "Smart contracts are self-executing blockchain programs that automatically enforce predefined rules — eliminating the need for intermediaries. Faisal's research and projects include extensive work on smart contract architecture.",
  },
  {
    q: ["defi", "decentralized finance", "decentralised finance"],
    a: "Decentralized Finance (DeFi) provides financial services using blockchain technology without relying solely on traditional intermediaries. Faisal's work in DeFi explores transparent, permissionless financial infrastructure.",
  },
  {
    q: ["collab", "partner", "work with", "opportunity"],
    a: "Yes. Collaboration opportunities are considered based on goals and alignment. Please submit a formal inquiry via the Contact page at faisalorakzai.com/contact with details about your proposal. Faisal's team reviews every submission.",
  },
  {
    q: ["contact", "reach", "email", "inquir", "get in touch"],
    a: "You can contact Faisal Orakzai via the Contact page at faisalorakzai.com/contact. For urgent inquiries, connect via LinkedIn at linkedin.com/in/faisalorakzaii or follow on X/Twitter at @faisalorakzaii.",
  },
  {
    q: ["social media", "linkedin", "twitter", "instagram", "follow"],
    a: "You can follow Faisal Orakzai on LinkedIn (linkedin.com/in/faisalorakzaii), X/Twitter (@faisalorakzaii), Instagram (@faisalorakzaii), and GitHub (github.com/faisalorakzai-lab). Latest updates are shared on faisalorakzai.com.",
  },
  {
    q: ["pakistan", "karachi", "pakistani"],
    a: "Faisal Orakzai is proudly Pakistani and committed to transforming Pakistan into a global technology leader. His Vision 2040 targets building world-class AI and blockchain infrastructure, creating thousands of tech jobs across Pakistan.",
  },
  {
    q: ["research", "paper", "academic", "publication"],
    a: "Faisal publishes technical and research papers on blockchain architecture, AI, Web3, and digital infrastructure. His full research portfolio is available at faisalorakzai.com/research.",
  },
  {
    q: ["programming", "coding", "language", "react", "node", "javascript"],
    a: "Faisal's projects involve HTML, CSS, JavaScript, React, Node.js, PostgreSQL, blockchain frameworks, and AI technologies. His full-stack expertise spans both frontend interfaces and backend infrastructure.",
  },
  {
    q: ["digital transform", "enterprise software"],
    a: "Digital transformation is the adoption of technology to improve business processes, services, and customer experiences. Faisal's ventures — especially OKZBYTE — offer enterprise digital transformation services.",
  },
  {
    q: ["cloud", "cloud computing", "infrastructure"],
    a: "Cloud computing and digital infrastructure are core to Faisal's work. His ventures leverage cloud systems, distributed architecture, and modern DevOps to build scalable, production-grade technology platforms.",
  },
  {
    q: ["investment", "investor", "fund", "capital"],
    a: "Faisal's investment philosophy focuses on deep tech: AI, blockchain, decentralized infrastructure. For collaboration or investment inquiries, visit faisalorakzai.com/contact to submit a formal inquiry.",
  },
  {
    q: ["ecosystem", "venture", "companies", "startup"],
    a: "The Orakzai Group ecosystem includes Orakzai Bond (blockchain/digital assets), OKZBYTE Technology (software services), Shamim Forever (digital heritage), and OrakzaiX (tech infrastructure). Explore the full ecosystem at faisalorakzai.com/ecosystem.",
  },
  {
    q: ["interoperab", "blockchain networks", "cross-chain"],
    a: "Interoperability enables different blockchain networks to communicate and exchange data securely. It's a key research area in Faisal's blockchain work — ensuring different systems can work together seamlessly.",
  },
  {
    q: ["security", "cybersecurity", "protect"],
    a: "Cybersecurity is central to all of Faisal's projects. His infrastructure projects incorporate row-level security, audit trails, and secure system design to protect digital assets and user data.",
  },
  {
    q: ["digital identity", "identity", "decentralized identity"],
    a: "Digital identity is a secure representation of an individual's or organization's identity in digital environments. Faisal's research covers decentralized identity systems as part of his broader Web3 work.",
  },
  {
    q: ["scalab", "blockchain scale", "transaction volume"],
    a: "Blockchain scalability — the ability to process increasing transaction volumes efficiently — is a core technical challenge Faisal addresses in his research and infrastructure projects.",
  },
];

function getSmartReply(input: string): string {
  const t = input.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|salaam|salam|assalam|greetings|good morning|good evening|good afternoon|howdy|sup|yo)[\s!.?]*$/.test(t) || t.length < 5) {
    return "Hello! 👋 I'm Faisal Orakzai's AI assistant. I can answer questions about Faisal, his ventures (Orakzai Group, Orakzai Bond, OKZBYTE, Shamim Forever), blockchain, AI, Web3, and collaboration opportunities. What would you like to know?";
  }

  // Thanks
  if (/thank|thanks|thx|appreciate/.test(t)) {
    return "You're welcome! Feel free to ask anything else about Faisal Orakzai or his work. You can also connect directly via faisalorakzai.com/contact for detailed inquiries.";
  }

  // Match FAQs
  for (const faq of FAQS) {
    if (faq.q.some((keyword) => t.includes(keyword))) {
      return faq.a;
    }
  }

  // Contextual fallbacks
  if (t.includes("age") || t.includes("born") || t.includes("old")) {
    return "Faisal Orakzai was born on 30 April 2006. He began his entrepreneurial journey at age 12 and founded Orakzai Group in 2023. He is one of Pakistan's youngest technology founders in the blockchain and AI space.";
  }

  return "Thank you for your message. I can answer questions about Faisal Orakzai, Orakzai Group, blockchain, AI, Web3, and his ventures. Try asking 'Who is Faisal Orakzai?' or 'What is Orakzai Bond?' — or visit faisalorakzai.com/contact for detailed inquiries.";
}

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: "Hello! I'm Faisal Orakzai's AI assistant. Ask me anything about Faisal, his ventures, blockchain, AI, Web3, or how to collaborate.", time: now() },
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
    if (!text.trim() || typing) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: getSmartReply(text.trim()), time: now() }]);
    }, delay);
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
          <video className="absolute inset-0 w-full h-full object-cover" src="/bg-video.mp4" autoPlay loop muted playsInline />
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
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3BA2F]/10 bg-black">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#F3BA2F]/40 flex-shrink-0">
                    <video src="/bg-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-green-400 border border-black" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold leading-none">AI Assistant</div>
                    <div className="text-green-400 text-[10px] font-mono mt-0.5">● Online — 50 FAQs loaded</div>
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
                      <video src="/bg-video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white/5 border border-white/8 px-4 py-3 flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => send(q)} disabled={typing} className="flex-shrink-0 text-[10px] font-mono text-[#F3BA2F]/60 border border-[#F3BA2F]/15 px-3 py-1.5 hover:border-[#F3BA2F]/40 hover:text-[#F3BA2F] transition-colors whitespace-nowrap disabled:opacity-40">
                    {q}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-[#F3BA2F]/10">
                <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !typing && send(input)} placeholder="Ask anything about Faisal or his work…" className="flex-1 bg-transparent text-white/80 text-sm placeholder:text-white/20 outline-none font-sans" />
                <button onClick={() => send(input)} disabled={!input.trim() || typing} className="w-8 h-8 flex items-center justify-center bg-[#F3BA2F] text-black disabled:opacity-30 hover:bg-[#ffd666] transition-colors">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="text-center py-2 text-[9px] font-mono text-white/15 border-t border-[#F3BA2F]/5">
                ORAKZAI GROUP · AI ASSISTANT
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
