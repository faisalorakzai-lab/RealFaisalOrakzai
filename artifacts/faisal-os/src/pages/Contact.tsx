import { motion, AnimatePresence } from "framer-motion";
  import { useSubmitContact, useGetContactStats, getGetContactStatsQueryKey } from "@workspace/api-client-react";
  import { useQueryClient } from "@tanstack/react-query";
  import { useToast } from "@/hooks/use-toast";
  import { useState } from "react";
  import { ChevronRight, CheckCircle } from "lucide-react";

  const requestTypes = [
    "Business Inquiry",
    "Partnership",
    "Media Contact",
    "Investment",
    "Speaking Invitation",
    "Collaboration",
  ];

  const socialLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/faisalorakzaii" },
    { label: "Twitter / X", url: "https://x.com/faisalorakzaii" },
    { label: "Instagram", url: "https://www.instagram.com/faisalorakzaii" },
    { label: "Crunchbase", url: "https://www.crunchbase.com/person/faisal-orakzai" },
    { label: "GitHub", url: "https://github.com/faisalorakzai-lab" },
    { label: "ORCID", url: "https://orcid.org/0009-0000-0915-7272" },
  ];

  const HANDSHAKE_LINES = [
    ">> Initializing transport layer handshake...",
    ">> Routing packet directly to Founder Core...",
    ">> Secure message logged successfully.",
  ];

  function TerminalPanel({
    inquiryType,
    onSuccess,
  }: {
    inquiryType: string;
    onSuccess: () => void;
  }) {
    const { toast } = useToast();
    const mutation = useSubmitContact();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [executing, setExecuting] = useState(false);
    const [logLines, setLogLines] = useState<string[]>([]);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState<{
      name?: string;
      email?: string;
      message?: string;
    }>({});

    const validate = () => {
      const errs: typeof errors = {};
      if (!name || name.trim().length < 2) errs.name = "name required";
      if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = "valid email required";
      if (!message || message.trim().length < 10) errs.message = "min 10 characters";
      setErrors(errs);
      return Object.keys(errs).length === 0;
    };

    const handleExecute = async () => {
      if (!validate()) return;
      setExecuting(true);
      setLogLines([]);

      for (let i = 0; i < HANDSHAKE_LINES.length; i++) {
        await new Promise((r) => setTimeout(r, 500));
        setLogLines((prev) => [...prev, HANDSHAKE_LINES[i]]);
      }

      mutation.mutate(
        { data: { name, email, type: inquiryType, message } },
        {
          onSuccess: () => {
            setDone(true);
            onSuccess();
          },
          onError: () => {
            setExecuting(false);
            setLogLines([]);
            toast({
              title: "Transmission failed",
              description: "Please retry.",
              variant: "destructive",
            });
          },
        }
      );
    };

    if (done) {
      return (
        <div className="px-6 py-5 border border-[#F3BA2F]/40 bg-black flex items-center gap-3 font-mono">
          <CheckCircle className="h-4 w-4 text-[#F3BA2F] shrink-0" />
          <span className="text-[#F3BA2F] text-[10px] tracking-[0.25em]">
            TRANSMISSION COMPLETE · LOGGED TO FOUNDER CORE
          </span>
        </div>
      );
    }

    return (
      <div className="border border-[#F3BA2F]/30 bg-[#000000] px-6 py-5 font-mono text-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F3BA2F]/10">
          <span className="w-2 h-2 rounded-full bg-[#F3BA2F] animate-pulse" />
          <span className="text-[#F3BA2F]/50 tracking-[0.2em] text-[10px]">
            SECURE TERMINAL · {inquiryType.toUpperCase()}
          </span>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-[#F3BA2F]/50 shrink-0 select-none leading-6">
            founder@core:~#
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-[#F3BA2F]/30 leading-6">enter_identity:</span>
            <div className="grid grid-cols-2 gap-3 mt-1.5">
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name"
                  disabled={executing}
                  className="w-full bg-transparent border-b border-[#F3BA2F]/20 text-white/80 placeholder-white/15 focus:outline-none focus:border-[#F3BA2F]/60 text-xs pb-1 caret-[#F3BA2F] transition-colors"
                />
                {errors.name && (
                  <div className="text-red-500/60 text-[9px] mt-0.5">{errors.name}</div>
                )}
              </div>
              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  type="email"
                  disabled={executing}
                  className="w-full bg-transparent border-b border-[#F3BA2F]/20 text-white/80 placeholder-white/15 focus:outline-none focus:border-[#F3BA2F]/60 text-xs pb-1 caret-[#F3BA2F] transition-colors"
                />
                {errors.email && (
                  <div className="text-red-500/60 text-[9px] mt-0.5">{errors.email}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-[#F3BA2F]/50 shrink-0 select-none leading-6">
            founder@core:~#
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-[#F3BA2F]/30 leading-6">enter_payload:</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="your message..."
              rows={3}
              disabled={executing}
              className="w-full bg-transparent border-b border-[#F3BA2F]/20 text-white/80 placeholder-white/15 focus:outline-none focus:border-[#F3BA2F]/60 text-xs pb-1 resize-none mt-1.5 caret-[#F3BA2F] transition-colors"
            />
            {errors.message && (
              <div className="text-red-500/60 text-[9px] mt-0.5">{errors.message}</div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {logLines.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-3 border-t border-[#F3BA2F]/10 space-y-1.5"
            >
              {logLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#F3BA2F] tracking-wide leading-relaxed"
                  style={{ fontSize: "10px" }}
                >
                  {line}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleExecute}
          disabled={executing}
          className="w-full py-3 mt-1 border border-[#F3BA2F]/35 text-[#F3BA2F] text-[10px] tracking-[0.3em] hover:bg-[#F3BA2F]/5 hover:border-[#F3BA2F]/70 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {executing ? (
            <span className="animate-pulse tracking-[0.3em]">TRANSMITTING...</span>
          ) : (
            <span>[ EXECUTE SECURE TRANSMISSION ]</span>
          )}
        </button>
      </div>
    );
  }

  function PacketCounter({ onMount }: { onMount?: () => void }) {
    const { data } = useGetContactStats({
      query: { queryKey: getGetContactStatsQueryKey(), refetchInterval: 30000 },
    });
    const count = data?.count ?? 0;

    return (
      <motion.span
        key={count}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[#F3BA2F] font-mono tabular-nums"
      >
        {String(count).padStart(6, "0")}
      </motion.span>
    );
  }

  export default function Contact() {
    const [activeType, setActiveType] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const toggle = (type: string) =>
      setActiveType((prev) => (prev === type ? null : type));

    const handleSuccess = () => {
      queryClient.invalidateQueries({ queryKey: getGetContactStatsQueryKey() });
    };

    return (
      <div className="bg-black text-white min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Sovereign Gateway — Muhammad Faisal Orakzai",
              description:
                "Secure institutional communication portal for Orakzai infrastructure routing.",
              mainEntity: { "@type": "Person", name: "Muhammad Faisal Orakzai" },
            }),
          }}
        />

        <section className="pt-32 pb-16 border-b border-[#F3BA2F]/10 bg-grid">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/20 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
                <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">
                  NETWORK HUB
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Connect</h1>
              <p className="text-white/40 text-xl max-w-xl">
                Collaboration is built on clarity and shared vision. Every serious request
                receives a response.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left — Inquiry types with terminal accordions */}
              <div className="space-y-10">
                <div>
                  <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">
                    INQUIRY TYPES
                  </div>
                  <div className="bg-[#F3BA2F]/5">
                    {requestTypes.map((type, i) => (
                      <div key={type}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          onClick={() => toggle(type)}
                          className={`flex items-center justify-between bg-black px-6 py-4 cursor-pointer group transition-colors border-b border-white/5 ${
                            activeType === type ? "bg-[#F3BA2F]/5" : "hover:bg-[#F3BA2F]/3"
                          }`}
                        >
                          <span
                            className={`transition-colors text-sm font-mono ${
                              activeType === type
                                ? "text-[#F3BA2F]"
                                : "text-white/60 group-hover:text-white"
                            }`}
                          >
                            {type}
                          </span>
                          <motion.div
                            animate={{ rotate: activeType === type ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight
                              className={`h-3 w-3 transition-colors ${
                                activeType === type
                                  ? "text-[#F3BA2F]"
                                  : "text-white/20 group-hover:text-[#F3BA2F]"
                              }`}
                            />
                          </motion.div>
                        </motion.div>

                        <AnimatePresence initial={false}>
                          {activeType === type && (
                            <motion.div
                              key="terminal"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                                opacity: { duration: 0.25 },
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <TerminalPanel
                                inquiryType={type}
                                onSuccess={handleSuccess}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">
                    PROFILES & NETWORKS
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/30 hover:text-[#F3BA2F] transition-colors font-mono text-xs"
                      >
                        <span className="text-[#F3BA2F]/30">→</span> {s.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border border-[#F3BA2F]/10 p-6">
                  <div className="text-[#F3BA2F] font-mono text-xs tracking-widest mb-3">
                    RESPONSE TIME
                  </div>
                  <div className="text-white/50 text-sm">
                    24–72 hours · Pakistan / UAE / Global
                  </div>
                </div>
              </div>

              {/* Right — Gateway status + packet counter */}
              <div className="space-y-10">
                <div className="border border-[#F3BA2F]/10 p-8 font-mono">
                  <div className="text-[#F3BA2F] text-xs tracking-[0.3em] mb-8">
                    GATEWAY STATUS
                  </div>
                  <div className="space-y-5">
                    {[
                      { label: "GATEWAY", value: "OPERATIONAL", gold: true, pulse: true },
                      { label: "ENCRYPTION", value: "AES-256 / TLS 1.3" },
                      { label: "ROUTING", value: "FOUNDER_CORE_DIRECT" },
                      { label: "QUEUE", value: "REAL-TIME INGESTION" },
                      { label: "SESSION", value: "ANONYMOUS · SECURE" },
                    ].map(({ label, value, gold, pulse }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between text-xs border-b border-white/5 pb-4 last:border-0 last:pb-0"
                      >
                        <span className="text-white/25 tracking-[0.2em]">{label}</span>
                        <span
                          className={`flex items-center gap-2 ${
                            gold ? "text-[#F3BA2F]" : "text-white/40"
                          }`}
                        >
                          {pulse && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
                          )}
                          {value}
                        </span>
                      </div>
                    ))}

                    {/* Live packet counter row */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F3BA2F]/15 mt-2">
                      <span className="text-white/25 tracking-[0.2em]">PACKETS TRANSMITTED</span>
                      <PacketCounter />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#F3BA2F]/10 text-white/20 text-[10px] leading-relaxed tracking-wide">
                    All transmissions route directly to the Founder Core inbox. Inquiries
                    are logged with timestamp and origin metadata. This gateway accepts
                    institutional and high-intent requests only.
                  </div>
                </div>

                <div className="border border-[#F3BA2F]/10 p-8 font-mono space-y-4">
                  <div className="text-[#F3BA2F] text-xs tracking-[0.3em] mb-2">
                    TRANSMISSION PROTOCOL
                  </div>
                  <ol className="space-y-3 text-white/30 text-[10px] tracking-wide leading-relaxed list-none">
                    {[
                      "Select inquiry type from the list.",
                      "Terminal panel expands · enter identity + payload.",
                      "Execute · handshake animates · packet routes to Core.",
                      "Response within 24–72 hours.",
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-[#F3BA2F]/30 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  