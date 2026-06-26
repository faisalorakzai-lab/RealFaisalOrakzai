
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1 } }),
};

const storyImages = [
  { src: "/story/story-01.jpg", alt: "Muhammad Faisal Orakzai - Founder Orakzai Group, Blockchain Entrepreneur Pakistan" },
  { src: "/story/story-02.jpg", alt: "Faisal Orakzai - CEO Orakzai Group, Crypto Blockchain Innovator" },
  { src: "/story/story-03.png", alt: "Faisal Orakzai - Orakzai Bond Founder, Polygon Blockchain Architect Pakistan" },
  { src: "/story/story-04.jpg", alt: "Faisal Orakzai - Entrepreneur Pakistan, AI Blockchain Visionary" },
  { src: "/story/story-05.png", alt: "Faisal Orakzai - GMA Silicon Valley Conference Speaker" },
  { src: "/story/story-06.jpg", alt: "Muhammad Faisal Orakzai - Traditional Dress Entrepreneur Pakistan" },
  { src: "/story/story-07.jpg", alt: "Faisal Orakzai - Orakzai Ventures Founder, Beach Pakistan" },
  { src: "/story/story-08.jpg", alt: "Faisal Orakzai - Digital Asset Founder, Rooftop Karachi Pakistan" },
  { src: "/story/story-09.jpg", alt: "Faisal Orakzai - Orakzai Group Chairman, Karachi Seafront" },
  { src: "/story/story-10.jpg", alt: "Faisal Orakzai - Real Estate Blockchain Pakistan, Orakzai Heritage Mountains" },
  { src: "/story/story-11.jpg", alt: "Faisal Orakzai - Orakzai Group Founder, City Karachi Background" },
  { src: "/story/story-12.jpg", alt: "Faisal Orakzai - Wall Street New York, Blockchain Tokenization Global" },
  { src: "/story/story-13.jpg", alt: "Muhammad Faisal Orakzai - Orakzai Mountains KPK Pakistan Scenic" },
  { src: "/story/story-14.jpg", alt: "Faisal Orakzai - Young Orakzai Agency Mountains Genesis Story" },
  { src: "/story/story-15.jpg", alt: "Faisal Orakzai - Orakzai Vision Leading the Future Conference Speaker" },
  { src: "/story/story-16.jpg", alt: "Faisal Orakzai - Childhood Photo Orakzai Agency Pakistan Early Life" },
  { src: "/story/story-17.jpg", alt: "Faisal Orakzai - Dusseldorf Germany International Expansion" },
  { src: "/story/story-18.jpg", alt: "Faisal Orakzai - Karachi Stock Exchange Pakistan Financial Innovation" },
  { src: "/story/story-19.jpg", alt: "Faisal Orakzai - Kohat Heritage Orakzai Tribal Roots KPK" },
  { src: "/story/story-20.jpg", alt: "Faisal Orakzai - Early Life Karachi Entrepreneurship Journey" },
];

const timelineData = [
  {
    year: "2006",
    phase: "GENESIS",
    title: "Birth in Orakzai Agency, Tirah, KPK",
    desc: "Muhammad Faisal Orakzai (Native: فیصل اورکزئی) is born on April 30, 2006, in the rugged terrain of Mamuzai, Orakzai Agency, Tirah, Khyber Pakhtunkhwa — a land of mountains, resilience, and ancient heritage.",
    isVision: false,
  },
  {
    year: "2010",
    phase: "DISPLACEMENT",
    title: "Strategic Relocation to Kohat",
    desc: "As regional conflicts intensify in the tribal belt, the family undergoes strategic relocation to Kohat. During this era of raw survival, young Faisal manages rural livestock assets in the mountains — anchoring an early understanding of decentralized resource management.",
    isVision: false,
  },
  {
    year: "2011–2017",
    phase: "FOUNDATIONS",
    title: "Dual Academic Framework — Madrassa & Yahya Public School",
    desc: "Parallel processing of traditional and modern systems: enrollment at Madrassa Mahad-ul-Uleman alongside formal primary schooling at Yahya Public School, Kohat — developing sharp analytical and disciplined cognitive frameworks.",
    isVision: false,
  },
  {
    year: "2018",
    phase: "METROPOLITAN SHIFT",
    title: "The Karachi Core Deployment — PECHS",
    desc: "At just 12 years old, facing heavy family challenges, Faisal executes a high-risk transition to the economic capital, Karachi. Living in PECHS, he enters the cutthroat micro-markets of local real estate.",
    isVision: false,
  },
  {
    year: "2019–2021",
    phase: "EXPANSION",
    title: "Tri-City Real Estate Nexus — Karachi, Peshawar, Kohat",
    desc: "Through rigorous self-study and high-level local mentorship, he expands real estate brokerage and arbitrage networks across a tri-city grid: Karachi, Peshawar, and Kohat. He establishes the parent umbrella corporate identity: Orakzai Group.",
    isVision: false,
  },
  {
    year: "2022–2023",
    phase: "TECHNICAL PIVOT",
    title: "The Digital Transition — Ziauddin University",
    desc: "Recognizing that physical real estate lacks rapid scalability, Faisal pivots to global technology systems. He begins intensive research into digital asset custody, algorithmic trading, and system design — enrolling at Ziauddin Medical University (SMC) for elite structural academic foundations.",
    isVision: false,
  },
  {
    year: "2024–2025",
    phase: "GLOBAL NETWORK",
    title: "International Infrastructure — Dubai & Düsseldorf",
    desc: "Orakzai Group evolves into a tech infrastructure lab. Faisal engineers early database schemas for Orakzai Ventures. He expands via institutional gateway networks spanning Dubai and Düsseldorf, Germany — absorbing BlackRock-level tokenization aesthetics.",
    isVision: false,
  },
  {
    year: "Early 2026",
    phase: "AUTOMATION ERA",
    title: "OrakzaiX & AdamX AI Frameworks Launch",
    desc: "Faisal launches OrakzaiX and AdamX — high-throughput artificial intelligence and machine-learning automation frameworks designed to eliminate human latency in corporate digital operations.",
    isVision: false,
  },
  {
    year: "April 2026",
    phase: "BLOCKCHAIN ARTIFACT",
    title: "Orakzai Bond (OKBOND) — Polygon Layer-2 Deployment",
    desc: "Faisal architecturally deploys Orakzai Bond (OKBOND) natively on the Polygon Layer-2 network — a deflationary, 10-million maximum supply, treasury-backed capital protection framework utilizing programmatic Cycle-Based Activation Logic with high industrial validation on SolidityScan.",
    isVision: false,
  },
  {
    year: "June 2026",
    phase: "LUXURY TECH",
    title: "Shamim Forever — Cryptographic Provenance & Luxury Brand",
    desc: "He integrates Web3 networks with ultra-luxury markets, taking ownership as Founder & Owner of Shamim Forever — a museum-grade luxury brand (perfumes, bespoke sapphire jewelry, cosmetics) secured through cryptographic provenance tokens to eliminate global counterfeits.",
    isVision: false,
  },
  {
    year: "2027–2030",
    phase: "VISION",
    title: "OreC Protocol — Real Estate Tokenization Pakistan & UAE",
    desc: "Complete deployment of the OreC Protocol — tokenizing multi-million dollar institutional real estate nodes across Pakistan and the UAE into tradeable digital fractions under OKBOND.",
    isVision: true,
  },
  {
    year: "2031–2035",
    phase: "VISION",
    title: "Automated Global OTC Framework — OKBOND Ecosystem",
    desc: "Launching the OKBOND Over-The-Counter (OTC) ecosystem application globally — integrating micro-mobility services, automated wealth distribution matrix, and high-end fractional investment layers.",
    isVision: true,
  },
  {
    year: "2036–2040",
    phase: "VISION",
    title: "Autonomous Sovereign Conglomerate — AI + Blockchain + Luxury",
    desc: "Transitioning Orakzai Group into a fully autonomous, cross-border digital nation asset class — operating where artificial intelligence, blockchain custody, and luxury consumer markets merge into a self-sustaining economic system.",
    isVision: true,
  },
];

const focuses = [
  "AI-driven systems & intelligent automation (OrakzaiX, AdamX)",
  "Blockchain infrastructure & digital assets (OKBOND, Polygon Layer-2)",
  "Real estate tokenization & investment models (OreC Protocol)",
  "Scalable business structures & conglomerate architecture",
  "Luxury commerce & cryptographic brand authentication (Shamim Forever)",
  "Financial technology, DeFi & decentralized wealth systems",
];

const principles = [
  { title: "System Thinking", desc: "Every business is a system. Understanding the structure reveals the leverage points that compound." },
  { title: "Long-Term Value", desc: "Short-term trends fade. Only fundamentals compound across decades and generations." },
  { title: "Technology as Infrastructure", desc: "AI and blockchain are not sectors — they are the new foundation of all commerce and wealth." },
  { title: "Execution Over Ideas", desc: "Ideas are abundant. The rarest resource is disciplined, consistent, sovereign execution." },
];

export default function Founder() {
  const [currentImg, setCurrentImg] = useState(0);
  const [imgFading, setImgFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgFading(true);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % storyImages.length);
        setImgFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "Story of Faisal Orakzai | Founder Orakzai Group | Blockchain Entrepreneur Pakistan";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "The inspiring story of Muhammad Faisal Orakzai — born in Orakzai Agency KPK Pakistan. Founder of Orakzai Group, Orakzai Bond (OKBOND) on Polygon blockchain, and Shamim Forever luxury brand. From tribal mountains to global blockchain architect."
      );
    }
    const existing = document.getElementById("founder-jsonld");
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = "founder-jsonld";
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Muhammad Faisal Orakzai",
      alternateName: ["Faisal Orakzai", "فیصل اورکزئی", "Faisal Orakzai Blockchain", "Faisal Orakzai Pakistan", "فیصل اورکزئی بلاکچین"],
      birthDate: "2006-04-30",
      birthPlace: { "@type": "Place", name: "Orakzai Agency, Tirah, Khyber Pakhtunkhwa, Pakistan" },
      nationality: "Pakistani",
      jobTitle: "Founder & Chairman",
      worksFor: { "@type": "Organization", name: "Orakzai Group", url: "https://faisalorakzai.com" },
      url: "https://faisalorakzai.com/founder",
      sameAs: [
        "https://orakzaibond.com",
        "https://www.shamimforever.com",
        "https://faisalorakzai.vercel.app",
      ],
      description:
        "Pakistani blockchain entrepreneur, founder of Orakzai Group, Orakzai Bond (OKBOND) on Polygon Layer-2, and Shamim Forever luxury brand. Pioneer in real estate tokenization and AI automation in Pakistan.",
      knowsAbout: ["Blockchain", "Artificial Intelligence", "Real Estate", "Cryptocurrency", "Polygon", "DeFi", "Luxury Brands", "Tokenization", "OKBOND"],
      image: "https://faisalorakzai.com/story/story-01.jpg",
    });
    document.head.appendChild(script);
    return () => {
      const s = document.getElementById("founder-jsonld");
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen" itemScope itemType="https://schema.org/Person">
      <span itemProp="name" className="hidden">Muhammad Faisal Orakzai</span>
      <span itemProp="jobTitle" className="hidden">Founder &amp; Chairman, Orakzai Group</span>

      {/* Hero */}
      <section
        className="relative pt-32 pb-24 border-b border-[#F3BA2F]/10 overflow-hidden"
        style={{ background: "radial-gradient(circle at 50% 50%, #050505 0%, #000000 100%)" }}
      >
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(243,186,47,0.04) 0%, transparent 70%)",
            top: "20%",
            right: "-10%",
            animation: "orbRotation 40s linear infinite",
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/20 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
                <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">THE SOVEREIGN STORY</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6"
                itemProp="name"
              >
                FAISAL<br /><span className="gold-gradient">ORAKZAI</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="text-white/40 font-mono text-xs tracking-[0.3em] mb-2 uppercase"
              >
                Muhammad Faisal Orakzai · فیصل اورکزئی
              </motion.p>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="text-white/40 font-mono text-xs tracking-[0.3em] mb-8 uppercase"
                itemProp="jobTitle"
              >
                Founder &amp; Chairman · Orakzai Group
              </motion.p>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="text-white/60 text-lg leading-relaxed max-w-lg"
              >
                From the mountains of <strong className="text-white">Orakzai Agency, KPK</strong> to architecting
                blockchain infrastructure on <span className="text-[#F3BA2F]">Polygon Layer-2</span>. Founder of{" "}
                <span className="text-[#F3BA2F]">Orakzai Bond (OKBOND)</span> and{" "}
                <span className="text-[#F3BA2F]">Shamim Forever</span> luxury brand. A story of raw resilience and
                sovereign ambition.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                {[
                  { label: "Born", value: "30 April 2006" },
                  { label: "Origin", value: "Orakzai Agency, KPK" },
                  { label: "Base", value: "Karachi, Pakistan" },
                  { label: "Network", value: "Dubai · Düsseldorf · Global" },
                ].map((f, i) => (
                  <div key={i} className="border border-[#F3BA2F]/10 p-3">
                    <div className="text-[#F3BA2F] font-mono text-[10px] tracking-widest mb-1">{f.label}</div>
                    <div className="text-white text-sm font-semibold">{f.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Auto-Rotating Slideshow */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute inset-0 border border-[#F3BA2F]/20 z-10 pointer-events-none" />
                <div className="absolute top-6 -left-6 w-full h-full border border-[#F3BA2F]/10 pointer-events-none" />

                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    key={currentImg}
                    src={storyImages[currentImg].src}
                    alt={storyImages[currentImg].alt}
                    itemProp="image"
                    className="w-full h-full object-cover object-top"
                    style={{ transition: "opacity 0.4s ease", opacity: imgFading ? 0 : 1 }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/founder.jpg";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 z-10">
                    <div className="text-[#F3BA2F] font-mono text-xs mb-1">FAISAL ORAKZAI · فیصل اورکزئی</div>
                    <div className="text-white/50 font-mono text-[10px] tracking-widest">ORAKZAI GROUP · BLOCKCHAIN · AI</div>
                    <div className="flex gap-1 mt-3">
                      {storyImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImg(i)}
                          aria-label={`Go to image ${i + 1}`}
                          style={{
                            width: i === currentImg ? "20px" : "6px",
                            height: "2px",
                            background: i === currentImg ? "#F3BA2F" : "rgba(243,186,47,0.3)",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/80 border border-[#F3BA2F]/30 px-2 py-1 font-mono text-[10px] text-[#F3BA2F] z-10">
                    {String(currentImg + 1).padStart(2, "0")} / {storyImages.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail row */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {storyImages.slice(0, 8).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className="flex-shrink-0 w-14 h-14 overflow-hidden border transition-all duration-300"
                    style={{ borderColor: currentImg === i ? "#F3BA2F" : "rgba(243,186,47,0.1)" }}
                    aria-label={`Photo ${i + 1} of Faisal Orakzai`}
                  >
                    <img
                      src={img.src}
                      alt={`Faisal Orakzai photo ${i + 1}`}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: currentImg === i ? "none" : "grayscale(0.7)" }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Bio */}
      <section className="py-24 border-b border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-2">
                THE JOURNEY · Muhammad Faisal Orakzai · فیصل اورکزئی
              </div>
              <div className="space-y-6 text-white/60 text-lg leading-relaxed" itemProp="description">
                <p>
                  <strong className="text-white">Muhammad Faisal Orakzai</strong> (born 30 April 2006) is a Pakistani
                  entrepreneur and Founder &amp; Chairman of{" "}
                  <strong className="text-[#F3BA2F]">Orakzai Group</strong> — an organization developing ventures
                  across emerging technologies and traditional industries. He is one of Pakistan's youngest blockchain
                  infrastructure architects, born in the tribal mountains of Orakzai Agency, Tirah, Khyber Pakhtunkhwa.
                </p>
                <p>
                  His story begins in raw survival. Amid regional conflict in the tribal belt, his family relocated from
                  Orakzai Agency to Kohat — where young Faisal managed rural livestock in the mountains while building
                  the cognitive discipline that would later power his business acumen. He simultaneously enrolled at{" "}
                  <strong className="text-white">Madrassa Mahad-ul-Uleman</strong> and{" "}
                  <strong className="text-white">Yahya Public School, Kohat</strong>, forging a parallel academic
                  framework between traditional and modern knowledge systems.
                </p>
                <p>
                  At just 12 years old, he made a high-risk transition to{" "}
                  <strong className="text-white">Karachi's PECHS district</strong> — entering the cutthroat
                  micro-markets of local real estate. By 2019–2021, he had built a tri-city brokerage network across
                  Karachi, Peshawar, and Kohat, establishing the parent corporate identity:{" "}
                  <strong className="text-[#F3BA2F]">Orakzai Group</strong>.
                </p>
                <p>
                  Recognizing real estate's scalability limits, he pivoted to global technology systems. By 2024,
                  Orakzai Group had evolved into a full tech infrastructure lab — with institutional gateway networks
                  spanning <strong className="text-white">Dubai and Düsseldorf, Germany</strong>. In April 2026, he
                  deployed <strong className="text-[#F3BA2F]">Orakzai Bond (OKBOND)</strong> natively on Polygon
                  Layer-2 — a deflationary, 10-million maximum supply, treasury-backed capital protection framework with
                  programmatic Cycle-Based Activation Logic, validated on SolidityScan.
                </p>
                <p>
                  In June 2026, he integrated Web3 provenance into ultra-luxury markets by founding{" "}
                  <strong className="text-[#F3BA2F]">Shamim Forever</strong> — a museum-grade luxury brand (perfumes,
                  bespoke sapphire jewelry, cosmetics) secured through cryptographic provenance tokens to eliminate
                  global counterfeiting.
                </p>
                <blockquote className="border-l-2 border-[#F3BA2F] pl-8 py-2 my-8">
                  <p className="text-2xl font-medium text-white/90 italic">
                    "From the mountains of Orakzai to the chains of Polygon — I build systems that build businesses."
                  </p>
                  <footer className="text-[#F3BA2F] font-mono text-xs mt-3 tracking-widest">
                    — FAISAL ORAKZAI, FOUNDER &amp; CHAIRMAN, ORAKZAI GROUP
                  </footer>
                </blockquote>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-6">AREAS OF FOCUS</div>
              {focuses.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-white/50 text-sm"
                >
                  <div className="w-1 h-1 rounded-full bg-[#F3BA2F] mt-2 flex-shrink-0" />
                  {f}
                </motion.div>
              ))}

              <div className="mt-10 pt-8 border-t border-[#F3BA2F]/10 space-y-4">
                <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-4">NOTABLE VENTURES</div>
                {[
                  { name: "Orakzai Group", role: "Founder & Chairman — Conglomerate", url: null },
                  { name: "Orakzai Bond (OKBOND)", role: "Polygon Layer-2 Blockchain Protocol", url: "https://orakzaibond.com" },
                  { name: "Shamim Forever", role: "Museum-Grade Luxury Jewelry & Lifestyle", url: "https://www.shamimforever.com" },
                  { name: "OrakzaiX", role: "AI Automation Framework", url: null },
                  { name: "AdamX", role: "ML Automation Platform", url: null },
                ].map((v, i) => (
                  <div
                    key={i}
                    className="border border-[#F3BA2F]/10 p-4 hover:border-[#F3BA2F]/30 transition-colors"
                    style={{ backdropFilter: "blur(12px)" }}
                  >
                    <div className="text-white text-sm font-semibold">{v.name}</div>
                    <div className="text-white/30 text-xs mt-1">{v.role}</div>
                    {v.url && (
                      <a
                        href={v.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#F3BA2F] text-xs font-mono mt-2 inline-block hover:underline"
                      >
                        {v.url.replace("https://", "")} →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 border-b border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-2">PHOTO GALLERY</div>
          <h2 className="text-2xl font-bold text-white mb-8">
            Faisal Orakzai — فیصل اورکزئی · Orakzai Group Founder Pakistan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {storyImages.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                viewport={{ once: true }}
                onClick={() => setCurrentImg(i)}
                className="relative overflow-hidden group"
                style={{ aspectRatio: "3/4" }}
                aria-label={`Faisal Orakzai photo ${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/founder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-[#F3BA2F] font-mono text-[10px]">VIEW</div>
                </div>
                {currentImg === i && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F3BA2F]" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 border-b border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-12">CORE PRINCIPLES</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#F3BA2F]/10">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-black p-8 group"
              >
                <div className="text-[#F3BA2F] font-mono text-2xl font-bold mb-4">0{i + 1}</div>
                <h3 className="text-white font-bold mb-3 group-hover:text-[#F3BA2F] transition-colors">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sovereign Timeline */}
      <section
        className="py-24"
        style={{ background: "radial-gradient(circle at 50% 50%, #050505 0%, #000000 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-4">THE SOVEREIGN TIMELINE · 2006 → 2040</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Muhammad Faisal Orakzai — From Orakzai Mountains to Global Blockchain Architecture
          </h2>
          <p className="text-white/40 text-sm mb-12 font-mono">
            فیصل اورکزئی · Orakzai Group · OKBOND Blockchain · Shamim Forever · Pakistan Entrepreneur
          </p>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#F3BA2F]/15" />
            <div className="space-y-0">
              {timelineData.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="flex gap-8 group"
                >
                  <div className="flex-shrink-0 w-24 text-right pt-6">
                    <div
                      className={`font-mono text-xs font-bold ${
                        event.isVision ? "text-[#F3BA2F]/40" : "text-[#F3BA2F]"
                      }`}
                    >
                      {event.year}
                    </div>
                  </div>
                  <div className="flex-shrink-0 relative pt-6">
                    <div
                      className={`w-3 h-3 rounded-full border-2 relative z-10 transition-all duration-300 group-hover:scale-125 ${
                        event.isVision
                          ? "border-[#F3BA2F]/30 bg-transparent"
                          : "border-[#F3BA2F] bg-[#F3BA2F]/20"
                      }`}
                      style={!event.isVision ? { boxShadow: "0 0 10px rgba(243,186,47,0.4)" } : {}}
                    />
                  </div>
                  <div className="flex-1 pb-10 pt-3 border-b border-white/5 group-hover:border-[#F3BA2F]/10 transition-all duration-300">
                    <div
                      className={`text-xs font-mono mb-2 ${
                        event.isVision ? "text-white/20" : "text-[#F3BA2F]/60"
                      }`}
                    >
                      {event.isVision ? "VISION NODE" : "MILESTONE"} · {event.phase}
                    </div>
                    <h3
                      className={`font-bold mb-2 text-lg ${
                        event.isVision ? "text-white/40" : "text-white"
                      }`}
                    >
                      {event.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        event.isVision ? "text-white/25" : "text-white/50"
                      }`}
                    >
                      {event.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes orbRotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
