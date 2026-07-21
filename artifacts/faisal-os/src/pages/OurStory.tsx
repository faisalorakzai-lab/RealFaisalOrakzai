import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/shared/SEOHead";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ─── All chapters — complete Orakzai story ─── */
const CHAPTERS = [
  {
    roman: "I",
    title: "Sacred Roots & Ancestral Identity",
    era: "Ancient — 19th Century",
    icon: "⚔️",
    accent: "Pashtunwali",
    accentColor: "#F3BA2F",
    body: `For generations beyond recorded memory, the Orakzai nation has carried an unyielding legacy forged in the rugged, sun-scorched valleys of our ancestral homeland — the Orakzai Agency, nestled between the Tirah Valley and the Khyber hills of what is now Khyber Pakhtunkhwa, Pakistan.

Characterized by an indelible spirit of courage, unwavering hospitality, and a sacred code of honor known as Pashtunwali, our ancestors built communities anchored in mutual protection and collective dignity. Every family was a pillar, every village a fortress of shared fate. The Orakzai are one of the most distinguished Pashtun tribes — historically known for their independent spirit, their refusal to bow to external domination, and their fierce protection of their land.

Through centuries of geopolitical shifts, Mughal influence, Sikh expansion, British colonial pressure, and regional conflicts, the core values of the Orakzai identity remained untouched: loyalty to kin, defense of the vulnerable, and a profound reverence for justice. Our elders say: "An Orakzai bends like the mountain wind — but the mountain itself does not move."`,
    pullQuote: "An Orakzai bends like the mountain wind — but the mountain itself does not move.",
  },
  {
    roman: "II",
    title: "Tribal Structure & the Code of Honor",
    era: "Traditional Society",
    icon: "🏔️",
    accent: "Jirga System",
    accentColor: "#22c55e",
    body: `The Orakzai tribe is divided into two primary sub-confederacies — the Gar and the Samil — a distinction rooted in ancient political alliances that governed inter-tribal relations across the frontier for centuries. Within these broad groupings exist numerous khels (sub-clans), each with their own territorial claims, elders (maliks), and councils (jirgas).

The Jirga — a council of respected elders — was and remains the backbone of Orakzai governance. Disputes over land, marriage, honor, and resources were resolved through collective consensus, bound by the principles of Pashtunwali. No court, no colonial administrator, and no external authority held more weight in an Orakzai community than the word of the jirga.

Hospitality (Melmastia) was not merely a custom — it was a sacred obligation. A stranger at the door was a guest to be honored, fed, and protected — even at personal cost. Badal (the right to seek justice for wrongs), Nanawatai (the right to seek forgiveness and sanctuary), and Namus (the protection of family honor) formed the tripartite soul of the Orakzai character. These are not relics of the past. They live in the hearts of Orakzai people today — whether in Tirah, Karachi, Dubai, London, or Toronto.`,
    pullQuote: "The Jirga speaks; the community listens. That is how a nation governs itself with dignity.",
  },
  {
    roman: "III",
    title: "The Age of Conflict & Displacement",
    era: "1890s — 2010s",
    icon: "🌊",
    accent: "Resilience",
    accentColor: "#ef4444",
    body: `The Orakzai region has historically been one of the most contested territories on the Pashtun frontier. During the British colonial era, the Orakzai tribesmen fiercely resisted the imposition of external control, participating in numerous uprisings that demonstrated their unwillingness to accept domination.

In the post-partition era of Pakistan, the Orakzai Agency — administered under the Federally Administered Tribal Areas (FATA) — remained outside mainstream legal and administrative frameworks. This isolation, while preserving cultural autonomy, also meant limited access to formal education, healthcare, economic infrastructure, and legal protection.

The most devastating chapter came in the late 2000s when military operations targeting militant groups in the region led to one of the largest internal displacement events in Pakistan's history. Hundreds of thousands of Orakzai families were forced to abandon their ancestral villages, their land, their graves, and their memories — becoming internally displaced persons (IDPs) in their own country.

Families were scattered. Communities were shattered. Children grew up in camps far from the mountains their grandfathers had defended with their lives. Yet even in displacement, the Orakzai spirit did not break. Families rebuilt. Elders held jirgas in exile. Mothers kept the language and stories alive. The mountain could be left behind — the identity could not.`,
    pullQuote: "The mountain could be left behind. The identity could not.",
  },
  {
    roman: "IV",
    title: "The Global Diaspora Expansion",
    era: "Mid 20th Century — Present",
    icon: "🌐",
    accent: "12+ Nations",
    accentColor: "#3b82f6",
    body: `As the modern era reshaped opportunities and survival demanded mobility, thousands of Orakzai families embarked on journeys across borders — first within Pakistan, then beyond. From the industrial hubs of Karachi, Lahore, and Peshawar to the fast-paced markets of the Gulf States, Europe, North America, and Southeast Asia, our community established roots globally.

They became engineers, legal minds, entrepreneurs, day laborers, academics, medical professionals, and civic leaders. In Dubai construction sites and London universities, in Saudi hospitals and German factories, in American technology firms and Canadian public service — the Orakzai work ethic carved a presence.

Yet, despite geographic dispersion and economic adaptation, the pulse of our homeland never faded. Overseas families worked tirelessly, sending remittances back to their villages, funding the education of nieces and nephews, building mosques and schools in places they could no longer physically inhabit. They raised new generations in foreign lands while holding tight to their language, their stories, and the pride of their lineage.

Today, it is estimated that Orakzai diaspora communities exist in over 12 nations — a scattered constellation that nonetheless shares a single identity, a single ancestry, and a single, burning desire to remain connected.`,
    pullQuote: "In every city they built a new life. In every heart, they kept the old one.",
  },
  {
    roman: "V",
    title: "The Fragmented Reality & The Systemic Gaps",
    era: "The Crisis Years",
    icon: "🛡️",
    accent: "Systemic Need",
    accentColor: "#a855f7",
    body: `Global dispersion brought unprecedented challenges that neither tribal tradition nor individual ambition could fully address alone. Separated by continents and time zones, our people faced a set of deeply structural problems that demanded an institutional response.

Migrant workers in the Gulf — often undocumented or working under exploitative kafala contracts — faced abuse, withheld wages, and deportation with no legal recourse and no advocate. Young men and women of exceptional ability in Pakistan's tribal regions found doors to higher education shut not by lack of talent, but by lack of financial access and institutional connectivity. Diaspora families in Europe and North America raised children who spoke the language of their adopted countries but could not access any structured connection to their Orakzai heritage.

There was no central registry. No global emergency fund. No legal defense network. No scholarship pipeline. No unified platform where an Orakzai family in Norway could connect with their cousins in Kohat, fund a student in Peshawar, or advocate for a worker in Riyadh.

Individual success stories existed — brilliant, inspiring ones. But collective, institutional empowerment was absent. The Orakzai nation had survived displacement, colonial pressure, and regional conflict. It could not afford to be fragmented by the very modernity that offered it new opportunities.`,
    pullQuote: "Individual success is not enough. A nation rises together or it drifts apart.",
  },
  {
    roman: "VI",
    title: "The Birth of Orakzai.org — A Digital Homeland",
    era: "The Founding",
    icon: "🏛️",
    accent: "Digital Embassy",
    accentColor: "#F3BA2F",
    body: `In response to this generational need, Orakzai.org was founded — not merely as an organization, but as a digital homeland and global humanitarian embassy for the Orakzai nation and all underprivileged communities connected to it.

By merging digital architecture with the traditional tribal governance principles of the jirga, Orakzai.org aims to unify the global diaspora into a single, empowered ecosystem. It is a platform where the wisdom of elders meets the tools of the modern age — where Pashtunwali's principle of collective protection is encoded into institutional programs.

Today, Orakzai.org operates as an emerging institutional force with a mandate to deliver:
— Pro-bono legal advocacy for Orakzai individuals facing exploitation, discrimination, or injustice
— Global scholarship programs funding access to higher education for deserving youth
— Emergency crisis relief for families facing conflict, displacement, or sudden hardship
— Economic grants enabling entrepreneurs and community leaders to build sustainable futures
— A living digital archive preserving our language, oral traditions, and tribal heritage

It stands as a living sanctuary — a place where no Orakzai, and no underprivileged individual who stands at our door, is ever left alone. Just as our ancestors never turned away the stranger seeking shelter, Orakzai.org does not turn away those who come seeking support, dignity, and a path forward.`,
    pullQuote: "Just as our ancestors never turned away the stranger, Orakzai.org does not turn away those who come seeking dignity.",
  },
  {
    roman: "VII",
    title: "Our Covenant With the Future",
    era: "Present & Beyond",
    icon: "🌅",
    accent: "Living Legacy",
    accentColor: "#F3BA2F",
    body: `History is not merely what happened. It is the foundation upon which every generation builds. The Orakzai people have survived mountains, empires, wars, and displacement. We have built homes in foreign cities without forgetting the village we came from. We have mastered new languages without abandoning our mother tongue.

Now, for the first time in our history, we have the tools to do something our ancestors could not: to connect every Orakzai on earth to a single institutional home. To preserve our heritage not in fading memories but in searchable archives. To defend our people not just with tribal honor but with legal advocacy. To lift our youth not just with family sacrifice but with structured scholarships and global mentorship.

Orakzai.org is not the end of a journey. It is the beginning of the next chapter — one written not in the shadow of conflict and displacement, but in the light of unity, empowerment, and sovereign identity.

The covenant is simple: every Orakzai who has made it — engineer, entrepreneur, doctor, academic, laborer, elder — carries a responsibility to reach back. To fund the scholarship that changes a child's life. To advocate for the worker who cannot speak for themselves. To tell the story to the generation that does not yet know it.

We are one nation. Divided by borders, united by blood, by honor, and by the unbreakable code passed down from the mountains of Tirah to every corner of the earth.`,
    pullQuote: "We are one nation. Divided by borders. United by blood, by honor, and by the code of the mountains.",
  },
];

/* ─── Timeline nodes ─── */
const TIMELINE_NODES = [
  {
    index: 1,
    phase: "Phase I",
    title: "Ancestral Foundation",
    sub: "Roots in Tirah & Orakzai Agency",
    year: "Ancient — 19th C",
    desc: "A civilization rooted in Pashtunwali. The Orakzai nation forges its identity across the rugged valleys of Khyber Pakhtunkhwa — built on honor, hospitality, and collective dignity.",
    color: "#F3BA2F",
    glow: "rgba(243,186,47,0.3)",
  },
  {
    index: 2,
    phase: "Phase II",
    title: "Conflict & Displacement",
    sub: "Colonial Resistance & IDP Crisis",
    year: "1890s — 2010s",
    desc: "From British colonial resistance to the devastating internal displacement of the 2000s — the Orakzai people face their greatest trials yet emerge with their identity intact.",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.3)",
  },
  {
    index: 3,
    phase: "Phase III",
    title: "Global Diaspora",
    sub: "Expanding Across 12+ Nations",
    year: "Mid 20th C — Present",
    desc: "Thousands of Orakzai families build new lives across Pakistan, Gulf States, Europe, North America, and Southeast Asia — carrying their heritage across every time zone.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    index: 4,
    phase: "Phase IV",
    title: "Digital Embassy Era",
    sub: "Orakzai.org Active Platform",
    year: "Present Day",
    desc: "Orakzai.org is founded as a sovereign digital homeland — delivering legal advocacy, global scholarships, crisis relief, heritage preservation, and economic grants for every Orakzai worldwide.",
    color: "#F3BA2F",
    glow: "rgba(243,186,47,0.4)",
  },
];

/* ─── Stat badges ─── */
const STATS = [
  { value: "12+", label: "Nations" },
  { value: "100s", label: "Years of History" },
  { value: "4", label: "Core Programs" },
  { value: "1", label: "Digital Homeland" },
];

/* ─── Chapter Card component ─── */
function ChapterCard({ chapter, index }: { chapter: typeof CHAPTERS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      custom={0.05}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative group"
    >
      {/* Animated gold left bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full transition-all duration-500 group-hover:top-0 group-hover:bottom-0"
        style={{ background: `linear-gradient(180deg, ${chapter.accentColor}cc 0%, ${chapter.accentColor}22 100%)` }}
      />

      <div
        className="ml-6 rounded-xl border relative overflow-hidden transition-all duration-500 group-hover:border-yellow-500/25 scan-hover"
        style={{
          background: "linear-gradient(150deg, rgba(4,26,16,0.93) 0%, rgba(2,17,10,0.97) 60%, rgba(1,12,7,0.99) 100%)",
          borderColor: "rgba(34,197,94,0.12)",
          boxShadow: "0 4px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(243,186,47,0.04)",
        }}
      >
        {/* Hover ambient glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl"
          style={{ background: "radial-gradient(ellipse 65% 40% at 50% 0%, rgba(243,186,47,0.05) 0%, transparent 70%)" }}
        />

        {/* Header bar */}
        <div
          className="flex items-center gap-3 px-6 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
            style={{ background: "rgba(243,186,47,0.07)", border: "1px solid rgba(243,186,47,0.15)" }}
          >
            {chapter.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-[9px] font-bold tracking-[0.35em]"
                style={{ color: "rgba(243,186,47,0.5)" }}
              >
                CHAPTER {chapter.roman}
              </span>
              <span className="text-white/10">·</span>
              <span
                className="text-[9px] tracking-wider"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {chapter.era}
              </span>
            </div>
            <h3
              className="text-base md:text-lg font-bold leading-tight mt-0.5"
              style={{ color: "#f0e8d0", fontFamily: "Georgia, serif" }}
            >
              {chapter.title}
            </h3>
          </div>
          <span
            className="shrink-0 hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider"
            style={{
              background: `${chapter.accentColor}12`,
              border: `1px solid ${chapter.accentColor}28`,
              color: chapter.accentColor,
            }}
          >
            {chapter.accent}
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-5 md:py-6">
          {/* Opening quote glyph */}
          <div
            className="text-5xl font-serif leading-none mb-2 select-none"
            style={{ color: "rgba(243,186,47,0.2)", lineHeight: 1 }}
          >
            ❝
          </div>

          {chapter.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm md:text-base leading-relaxed md:leading-[1.85] mb-4 last:mb-0"
              style={{ color: "rgba(218,208,192,0.85)" }}
            >
              {para}
            </p>
          ))}

          {/* Pull quote */}
          <div
            className="mt-6 pl-4 border-l-2 py-1"
            style={{ borderColor: `${chapter.accentColor}50` }}
          >
            <p
              className="text-sm md:text-base italic font-medium leading-relaxed"
              style={{ color: chapter.accentColor, fontFamily: "Georgia, serif" }}
            >
              "{chapter.pullQuote}"
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Timeline Node ─── */
function TimelineNode({
  node,
  index,
  active,
  onClick,
}: {
  node: typeof TIMELINE_NODES[0];
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        animate={active ? { scale: 1.12 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 z-10"
        style={{
          borderColor: active ? node.color : "rgba(255,255,255,0.1)",
          background: active
            ? `radial-gradient(circle, ${node.glow} 0%, rgba(0,0,0,0.9) 65%)`
            : "rgba(8,8,8,0.85)",
          boxShadow: active ? `0 0 28px ${node.glow}` : "none",
          transition: "all 0.35s ease",
        }}
      >
        <span className="text-2xl">{["⚔️", "🌊", "🌐", "🏛️"][index]}</span>
        {active && (
          <div
            className="absolute inset-[-8px] rounded-full border animate-ping opacity-40"
            style={{ borderColor: node.color }}
          />
        )}
      </motion.div>

      <div className="mt-3 text-center px-1.5">
        <div
          className="text-[9px] font-bold tracking-[0.25em] mb-0.5 transition-colors duration-300"
          style={{ color: active ? node.color : "rgba(255,255,255,0.3)" }}
        >
          {node.phase.toUpperCase()}
        </div>
        <div
          className="text-xs md:text-sm font-bold leading-tight transition-colors duration-300"
          style={{ color: active ? "#fff" : "rgba(255,255,255,0.4)" }}
        >
          {node.title}
        </div>
        <div
          className="text-[10px] mt-0.5 leading-tight hidden sm:block transition-colors duration-300"
          style={{ color: active ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)" }}
        >
          {node.sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function OurStory() {
  const [activeNode, setActiveNode] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    const id = setInterval(() => setActiveNode(v => (v + 1) % TIMELINE_NODES.length), 4500);
    return () => clearInterval(id);
  }, []);

  const active = TIMELINE_NODES[activeNode];

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <SEOHead
        title="Our Story — Orakzai.org | A Digital Homeland & Global Sanctuary"
        description="The complete story of the Orakzai nation — from ancestral roots in Tirah and the sacred Pashtunwali code, through centuries of resilience, global diaspora, and the founding of Orakzai.org as a digital homeland."
        path="/our-story"
        keywords="Orakzai history, Orakzai nation, Pashtunwali, Orakzai tribe, Orakzai agency, Tirah valley, Orakzai diaspora, digital homeland, Orakzai org story"
      />

      {/* ════ HERO ════ */}
      <section ref={heroRef} className="relative min-h-[88vh] flex flex-col items-center justify-center pt-24 pb-20 overflow-hidden">
        {/* Deep emerald radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 85% 65% at 50% 38%, rgba(4,48,26,0.6) 0%, rgba(0,0,0,0) 72%)" }}
        />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 constellation-bg opacity-25 pointer-events-none" />

        {/* Floating ambient orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[5%] w-72 h-72 rounded-full pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-16 right-[6%] w-96 h-96 rounded-full pointer-events-none blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(243,186,47,0.18) 0%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Category label */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-12" style={{ background: "rgba(243,186,47,0.4)" }} />
            <span
              className="text-[10px] md:text-xs font-bold tracking-[0.5em]"
              style={{ color: "#F3BA2F" }}
            >
              O U R &nbsp; S T O R Y
            </span>
            <div className="h-px w-12" style={{ background: "rgba(243,186,47,0.4)" }} />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6"
            style={{ fontFamily: "Georgia, serif", color: "#f5eed8" }}
          >
            A Digital Homeland
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #F3BA2F 0%, #ffe47a 45%, #e8a820 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &amp; Global Sanctuary
            </span>
          </motion.h1>

          {/* Heritage tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px flex-1 max-w-[70px]" style={{ background: "rgba(243,186,47,0.3)" }} />
            <p
              className="text-[10px] md:text-xs font-bold tracking-[0.35em]"
              style={{ color: "rgba(243,186,47,0.7)" }}
            >
              HERITAGE &nbsp;•&nbsp; RESILIENCE &nbsp;•&nbsp; UNIFICATION
            </p>
            <div className="h-px flex-1 max-w-[70px]" style={{ background: "rgba(243,186,47,0.3)" }} />
          </motion.div>

          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-base md:text-lg leading-relaxed md:leading-[1.8] max-w-2xl mx-auto mb-12"
            style={{ color: "rgba(215,205,188,0.82)" }}
          >
            Born from centuries of unbroken honor and tribal resilience, Orakzai.org stands as
            the modern sovereign bridge — connecting our ancestral heritage in the mountains of
            Khyber Pakhtunkhwa with the global empowerment every Orakzai deserves.
          </motion.p>

          {/* Stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-2.5 rounded-lg border text-center"
                style={{
                  background: "rgba(4,20,12,0.7)",
                  borderColor: "rgba(243,186,47,0.18)",
                }}
              >
                <div
                  className="text-lg md:text-xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #F3BA2F, #ffd666)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] tracking-wider mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] tracking-[0.4em] font-semibold" style={{ color: "rgba(255,255,255,0.2)" }}>
              READ THE FULL STORY
            </span>
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-10 mx-auto"
              style={{ background: "linear-gradient(180deg, rgba(243,186,47,0.45) 0%, transparent 100%)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ════ INTERACTIVE TIMELINE ════ */}
      <section className="relative py-16 md:py-20 overflow-hidden border-y" style={{ borderColor: "rgba(243,186,47,0.07)" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(4,18,10,0.45) 50%, rgba(0,0,0,0) 100%)" }}
        />

        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-[10px] font-bold tracking-[0.4em] mb-2" style={{ color: "rgba(243,186,47,0.5)" }}>
              CHRONOLOGICAL ARC
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
            >
              The Journey Through Time
            </h2>
          </motion.div>

          {/* Nodes */}
          <div className="relative">
            <div className="absolute top-7 md:top-8 left-0 right-0 pointer-events-none px-8 md:px-16 hidden sm:block">
              <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(243,186,47,0.18) 20%, rgba(243,186,47,0.18) 80%, transparent)" }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-4">
              {TIMELINE_NODES.map((node, i) => (
                <TimelineNode key={node.index} node={node} index={i} active={activeNode === i} onClick={() => setActiveNode(i)} />
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-10 rounded-2xl border p-6 md:p-8 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(3,22,13,0.95) 0%, rgba(1,15,8,0.98) 100%)",
                borderColor: `${active.color}28`,
                boxShadow: `0 0 48px ${active.glow}`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none blur-3xl opacity-15"
                style={{ background: active.glow }}
              />
              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-5">
                <div className="md:w-52 shrink-0">
                  <div className="text-[9px] font-bold tracking-[0.3em] mb-1.5" style={{ color: active.color }}>
                    {active.phase.toUpperCase()}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold" style={{ color: "#fff", fontFamily: "Georgia, serif" }}>
                    {active.title}
                  </h3>
                  <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{active.year}</div>
                  <div className="mt-2 text-[10px] font-semibold tracking-wide" style={{ color: `${active.color}88` }}>
                    {active.sub}
                  </div>
                </div>
                <div className="hidden md:block w-px self-stretch" style={{ background: `${active.color}20` }} />
                <p className="text-sm md:text-base leading-relaxed md:leading-loose flex-1" style={{ color: "rgba(218,208,192,0.85)" }}>
                  {active.desc}
                </p>
              </div>
              <div className="flex gap-2 mt-6 justify-center">
                {TIMELINE_NODES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveNode(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: activeNode === i ? "24px" : "6px",
                      height: "6px",
                      background: activeNode === i ? active.color : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════ CHAPTER NARRATIVES ════ */}
      <section className="relative py-20 md:py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 45% at 50% 55%, rgba(4,28,16,0.3) 0%, transparent 75%)" }}
        />

        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-[10px] font-bold tracking-[0.4em] mb-3" style={{ color: "rgba(243,186,47,0.5)" }}>
              THE CHRONICLES
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
            >
              Seven Chapters of a Nation
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              From ancient tribal foundations to the founding of a digital homeland — the complete, unabridged story of the Orakzai people.
            </p>
            <div className="h-px w-24 mx-auto mt-5" style={{ background: "rgba(243,186,47,0.3)" }} />
          </motion.div>

          <div className="space-y-8">
            {CHAPTERS.map((chapter, i) => (
              <ChapterCard key={chapter.roman} chapter={chapter} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════ CLOSING COVENANT ════ */}
      <section
        className="relative py-20 md:py-28 overflow-hidden border-t"
        style={{ borderColor: "rgba(243,186,47,0.08)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(4,40,22,0.45) 0%, transparent 65%)" }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85 }}
          >
            {/* Sigil */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 border"
              style={{
                background: "radial-gradient(circle, rgba(4,46,25,0.85) 0%, rgba(0,0,0,0.95) 70%)",
                borderColor: "rgba(243,186,47,0.22)",
                boxShadow: "0 0 36px rgba(243,186,47,0.1)",
              }}
            >
              <span className="text-2xl">🏔️</span>
            </div>

            <div className="text-[10px] font-bold tracking-[0.45em] mb-6" style={{ color: "rgba(243,186,47,0.5)" }}>
              THE COVENANT
            </div>

            <blockquote
              className="text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed mb-6"
              style={{ fontFamily: "Georgia, serif", color: "#f0e8d0" }}
            >
              "We are one nation. Divided by borders.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F3BA2F, #ffd666)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                United by blood, by honor, and by the code of the mountains.
              </span>
              "
            </blockquote>

            <p
              className="text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10"
              style={{ color: "rgba(215,205,188,0.65)" }}
            >
              Orakzai.org is not just an organization. It is a living, breathing sanctuary — a borderless
              embassy that honors every chapter of our past while engineering the future every Orakzai deserves.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/join"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #F3BA2F 0%, #e8a820 100%)",
                  color: "#000",
                  boxShadow: "0 0 24px rgba(243,186,47,0.3)",
                }}
              >
                Become a Member
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm border transition-all duration-300 hover:border-yellow-400/35 hover:bg-yellow-400/5"
                style={{ borderColor: "rgba(243,186,47,0.2)", color: "rgba(243,186,47,0.8)" }}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
