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

const FAQ_KNOWLEDGE = `
You are the official AI assistant for Faisal Orakzai's personal website (faisalorakzai.com).
Answer questions professionally, concisely, and helpfully about Faisal Orakzai and his work.
Keep answers under 120 words unless the user asks for detail. Stay on topic.

KNOWLEDGE BASE:
1. Who is Faisal Orakzai? Faisal Orakzai is a technology entrepreneur and founder of Orakzai Group, focused on AI, blockchain infrastructure, digital assets, and enterprise technology solutions. Born 30 April 2006 in Pakistan, he began in real estate at age 12, later expanded into blockchain, AI, and founded Orakzai Group in 2023.
2. What is Orakzai Group? Orakzai Group is a technology-focused organization developing solutions in blockchain, artificial intelligence, fintech, and digital infrastructure.
3. What is Orakzai Bond? Orakzai Bond is a blockchain-based digital asset project designed to explore transparent treasury systems, staking infrastructure, and tokenized digital finance. Website: orakzaibond.com
4. What is OKZBYTE Technology? OKZBYTE Technology provides technology services ranging from web development to AI, blockchain, software engineering, and digital transformation solutions.
5. What is Shamim Forever? Shamim Forever is a digital platform created to preserve memories, stories, and meaningful tributes through modern technology. Website: shamimforever.com
6. What industries does Faisal Orakzai work in? Artificial Intelligence, Blockchain, FinTech, Enterprise Software, Web Development, and Digital Infrastructure.
7. What is Faisal Orakzai's mission? To build scalable technology platforms that contribute to secure, efficient, and innovative digital ecosystems.
8. What technologies does he specialize in? AI, Blockchain, Web3, Smart Contracts, Tokenization, Enterprise Systems, and Cloud Technologies.
9. Does Faisal Orakzai write technical articles? Yes. He publishes educational articles covering blockchain, AI, Web3, digital identity, interoperability, and enterprise blockchain topics.
10. What is his long-term vision? To contribute to the development of trusted digital infrastructure that supports future financial and technological ecosystems.
11. What is blockchain? Blockchain is a distributed ledger technology that enables secure, transparent, and verifiable digital transactions.
12. Why is AI important? AI helps automate processes, improve decision-making, and increase efficiency across industries.
13. What is Web3? Web3 represents the next generation of the internet built around decentralization, digital ownership, and blockchain technologies.
14. What is tokenization? Tokenization is the process of representing real-world or digital assets as blockchain-based tokens.
15. What is enterprise blockchain? Enterprise blockchain is the use of blockchain technology by organizations to improve security, transparency, and operational efficiency.
16. What is digital identity? Digital identity is a secure representation of an individual's or organization's identity in digital environments.
17. What are smart contracts? Smart contracts are self-executing blockchain programs that automatically enforce predefined rules.
18. What is DeFi? Decentralized Finance (DeFi) provides financial services using blockchain technology without relying solely on traditional intermediaries.
19. What is interoperability? Interoperability enables different blockchain networks to communicate and exchange data securely.
20. Why is cybersecurity important? Cybersecurity protects digital systems, infrastructure, and users from cyber threats and unauthorized access.
21. Does Faisal Orakzai work on AI projects? Yes. His work includes AI-powered automation and intelligent digital solutions.
22. Does he develop blockchain infrastructure? Yes. His focus includes blockchain architecture and related technologies.
23. What programming technologies are used? Projects involve HTML, CSS, JavaScript, React, Node.js, blockchain frameworks, and AI technologies depending on requirements.
24. Does OKZBYTE build custom software? Yes. Custom software development is one of its technology services.
25. What is digital transformation? Digital transformation is the adoption of technology to improve business processes, services, and customer experiences.
26. What is a blockchain wallet? A blockchain wallet stores digital credentials and allows interaction with blockchain networks.
27. Why are digital assets important? Digital assets enable new models for ownership, value exchange, and online economies.
28. What is Web3 infrastructure? It includes blockchain networks, decentralized storage, identity systems, and supporting technologies.
29. Does Faisal Orakzai support innovation? Yes. His work emphasizes research, innovation, and practical technology development.
30. Does he publish educational content? Yes. He regularly creates educational content about emerging technologies.
31. What is AI automation? AI automation combines artificial intelligence with automated workflows to improve efficiency.
32. What is digital infrastructure? Digital infrastructure includes networks, software platforms, cloud systems, and technologies supporting digital services.
33. What industries benefit from blockchain? Finance, healthcare, logistics, manufacturing, education, government, and supply chain management.
34. Why is transparency important? Transparency builds trust and improves accountability in digital systems.
35. What is cloud computing? Cloud computing provides computing resources over the internet instead of local hardware.
36. What is enterprise AI? Enterprise AI applies artificial intelligence to improve business operations and decision-making.
37. What is blockchain governance? Blockchain governance defines how decisions and protocol changes are managed within a blockchain ecosystem.
38. Does Faisal Orakzai encourage research? Yes. Research and continuous learning are central themes in his work.
39. What is decentralized technology? Decentralized technology distributes control across multiple participants rather than a single central authority.
40. What is digital innovation? Digital innovation is the development of new products, services, or processes using technology.
41. What is AI infrastructure? AI infrastructure includes computing resources, data systems, and software needed to build and deploy AI solutions.
42. What is blockchain scalability? Scalability refers to a blockchain's ability to process increasing transaction volumes efficiently.
43. Why is Web3 education important? It helps individuals and organizations understand emerging digital technologies and their practical applications.
44. What is digital trust? Digital trust is confidence in the security, privacy, and reliability of digital systems.
45. What is the future of AI and blockchain? Many experts expect these technologies to increasingly work together across automation, digital identity, finance, and enterprise applications.
46. Where can I learn more about Faisal Orakzai? Visit the official website at faisalorakzai.com for updates, projects, and articles.
47. How can I contact Faisal Orakzai? The official contact information is available on the Contact page of faisalorakzai.com.
48. Where can I follow his latest work? Updates are shared through faisalorakzai.com and professional social media profiles including LinkedIn (@faisalorakzaii) and X (@faisalorakzaii).
49. Does Faisal Orakzai collaborate on technology projects? Yes. Collaboration opportunities may be considered depending on the project's goals and alignment. Contact via the Contact page.
50. What is the ultimate goal of Faisal Orakzai's work? To contribute to practical, scalable, and secure digital technologies that help organizations and communities benefit from advances in AI, blockchain, and digital infrastructure.
`;

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || "AIzaSyAb8RN6KhIoPlSQoKdFGCMrck7aenSmZzGlPTCIfawDW4uCz90w";

async function askGemini(userMessage: string, history: Message[]): Promise<string> {
  const historyText = history.slice(-6).map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`).join("\n");
  const prompt = `${FAQ_KNOWLEDGE}\n\nConversation so far:\n${historyText}\n\nUser: ${userMessage}\nAssistant:`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
        }),
      }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return text || fallbackReply(userMessage);
  } catch {
    return fallbackReply(userMessage);
  }
}

function fallbackReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("bond")) return "Orakzai Bond is a blockchain-based digital asset project exploring transparent treasury systems, staking infrastructure, and tokenized digital finance. Visit orakzaibond.com for more.";
  if (t.includes("group") || t.includes("orakzai group")) return "Orakzai Group is a technology-focused organization developing solutions in blockchain, artificial intelligence, fintech, and digital infrastructure.";
  if (t.includes("collab") || t.includes("partner") || t.includes("contact")) return "Collaboration opportunities are considered based on alignment. Please visit the Contact page at faisalorakzai.com/contact to submit a formal inquiry.";
  if (t.includes("who") || t.includes("faisal")) return "Faisal Orakzai is a technology entrepreneur and founder of Orakzai Group, focused on AI, blockchain infrastructure, digital assets, and enterprise technology solutions.";
  if (t.includes("ai") || t.includes("artificial")) return "AI is central to Faisal's work — including AI-powered automation, intelligent digital solutions, and enterprise AI research.";
  if (t.includes("blockchain") || t.includes("web3")) return "Faisal specializes in blockchain infrastructure, Web3, smart contracts, tokenization, and enterprise blockchain solutions.";
  return "Thank you for your question. For detailed inquiries please visit faisalorakzai.com/contact and I'll ensure Faisal's team responds within 24–72 hours.";
}

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: "Hello. I'm the Orakzai Group AI assistant. I can answer questions about Faisal Orakzai, his ventures, blockchain, AI, and more. How can I help you today?", time: now() },
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
                    <div className="text-[#F3BA2F]/60 text-[10px] font-mono mt-0.5">Powered by Gemini</div>
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
                      <span className="text-white/30 text-[10px] font-mono ml-2">thinking…</span>
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
                ORAKZAI GROUP · AI POWERED BY GEMINI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
