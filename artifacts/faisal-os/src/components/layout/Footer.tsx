import { motion } from "framer-motion";

  const socials = [
    { label: "LinkedIn",    url: "https://www.linkedin.com/in/faisalorakzaii",           logo: "/logos/linkedin.jpg",   filter: undefined },
    { label: "Twitter / X", url: "https://x.com/faisalorakzaii",                         logo: "/logos/x.png",          filter: undefined },
    { label: "Instagram",   url: "https://www.instagram.com/faisalorakzaii",             logo: "/logos/instagram.png",  filter: undefined },
    { label: "TikTok",      url: "https://tiktok.com/@chairmanorakzai",                  logo: "/logos/tiktok.png",     filter: undefined },
    { label: "GitHub",      url: "https://github.com/faisalorakzai-lab",                 logo: "/logos/github.png",     filter: "invert(1)" },
    { label: "Crunchbase",  url: "https://www.crunchbase.com/person/faisal-orakzai",    logo: "/logos/crunchbase.png", filter: undefined },
    { label: "Pinterest",   url: "https://www.pinterest.com/faisalorakzaii",             logo: "/logos/pinterest.png",  filter: undefined },
    { label: "Facebook",    url: "https://web.facebook.com/faisalorakzaii",              logo: "/logos/facebook.png",   filter: undefined },
    { label: "Clubhouse",   url: "https://www.clubhouse.com/c/join/jGOPW7Kp",           logo: "/logos/clubhouse.png",  filter: undefined },
    { label: "Mastodon",    url: "https://mastodon.social/@Faisalorakzai",               logo: "/logos/mastodon.png",   filter: undefined },
  ];

  const tier1 = [
    { label: "Google Panel",    url: "https://share.google/jJqhayo6kkfz4k7Nb",                           cat: "KNOWLEDGE GRAPH" },
    { label: "Wikidata",        url: "https://www.wikidata.org/wiki/Q140264666",                          cat: "KNOWLEDGE GRAPH" },
    { label: "Crunchbase #28",  url: "https://www.crunchbase.com/person/faisal-orakzai",                 cat: "INVESTOR NETWORK" },
    { label: "EveryBodyWiki",   url: "https://en.everybodywiki.com/Faisal_Orakzai",                      cat: "ENCYCLOPEDIA" },
    { label: "ORCID",           url: "https://orcid.org/0009-0000-0915-7272",                            cat: "RESEARCH ID" },
    { label: "Orakzai Bond",    url: "https://orakzaibond.com",                                           cat: "VENTURE · LIVE" },
    { label: "Shamim Forever",  url: "https://www.shamimforever.com",                                     cat: "VENTURE · LIVE" },
    { label: "Wellfound",       url: "https://wellfound.com/u/faisal-orakzai-1",                         cat: "STARTUP" },
  ];

  const tier2 = [
    { label: "Peerlist",       url: "https://peerlist.io/faisalorakzai" },
    { label: "Hackernoon",     url: "https://hackernoon.com/u/faisalorakzai" },
    { label: "F6S",            url: "https://www.f6s.com/faisalorakzai" },
    { label: "TheOrg",         url: "https://theorg.com/org/orakzai-bond?person=faisal-orakzai" },
    { label: "Gust",           url: "https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e" },
    { label: "Startup School", url: "https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2" },
    { label: "About.me",       url: "https://about.me/faisalorakzai" },
    { label: "Gravatar",       url: "https://gravatar.com/faisalorakzaii" },
    { label: "Linktree",       url: "https://linktr.ee/faisalorakzaiofficial" },
    { label: "GenGlobal",      url: "https://www.genglobal.org/user/faisal1" },
    { label: "Bebee",          url: "https://bebee.com/pk/people/faisalorakzai" },
    { label: "Pa.bio",         url: "https://pa.bio/faisalorakzaii" },
    { label: "Bio.site",       url: "https://bio.site/faisalorakzai" },
    { label: "LeetCode",       url: "https://leetcode.com/u/faisalorakzai/" },
    { label: "PRLog",          url: "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html" },
    { label: "Polygon Scan",   url: "https://polygonscan.com" },
  ];

  export default function Footer() {
    return (
      <footer className="bg-black border-t border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-28 md:pb-16">

          {/* ── Top 3-col grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-14">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src="/logo.png" alt="Faisal Orakzai" className="w-9 h-9 object-contain"
                  style={{ filter: "drop-shadow(0 0 6px rgba(243,186,47,0.45))" }} />
                <div>
                  <div className="text-white font-semibold text-sm">Faisal Orakzai</div>
                  <div className="text-[#F3BA2F]/55 font-mono text-[10px] tracking-widest">FOUNDER & CHAIRMAN</div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-4">
                Building sovereign ventures at the intersection of AI, blockchain,
                digital assets, luxury commerce, and real-world investments.
              </p>
              <div className="text-white/25 text-[11px] font-mono leading-relaxed mb-4 space-y-0.5">
                <div>📍 Karachi · Born: Orakzai Agency, KPK, Pakistan</div>
                <div>✉ chairman@faisalorakzai.com</div>
                <div>🌐 faisalorakzai.com · orakzaibond.com</div>
              </div>
              <div className="flex items-center gap-2">
                <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]"
                  animate={{ opacity: [1, 0.25, 1] }} transition={{ repeat: Infinity, duration: 1.4 }} />
                <span className="text-[#F3BA2F]/40 font-mono text-[9px] tracking-[0.3em] uppercase">System Active · 2026</span>
              </div>
            </div>

            {/* Social Networks */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-4 bg-[#F3BA2F]" />
                <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] uppercase">Social Networks</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 group">
                    <span className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden rounded-sm">
                      <img src={s.logo} alt={s.label} className="w-full h-full object-cover"
                        style={s.filter ? { filter: s.filter } : undefined} />
                    </span>
                    <span className="text-white/60 text-sm group-hover:text-[#F3BA2F] transition-colors truncate">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Authority Profiles — Knowledge Graph tier */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-4 bg-[#F3BA2F]" />
                <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] uppercase">Authority Profiles</span>
              </div>
              <div className="space-y-2">
                {tier1.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between group py-1 border-b border-white/4 hover:border-[#F3BA2F]/20 transition-colors">
                    <span className="text-white/60 text-sm group-hover:text-[#F3BA2F] transition-colors">{l.label}</span>
                    <span className="font-mono text-[8px] tracking-widest text-white/20 group-hover:text-[#F3BA2F]/50 transition-colors shrink-0 ml-2">{l.cat}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Extended directories row ── */}
          <div className="mb-12 border-t border-[#F3BA2F]/6 pt-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-4 bg-[#F3BA2F]/50" />
              <span className="text-white/25 font-mono text-[9px] tracking-[0.3em] uppercase">Directories & Profiles</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-x-5 gap-y-2.5">
              {tier2.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="text-white/35 text-xs hover:text-[#F3BA2F] transition-colors truncate">{l.label}</a>
              ))}
            </div>
          </div>

          {/* ── Site nav ── */}
          <div className="mb-10 border-t border-[#F3BA2F]/6 pt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-4 bg-[#F3BA2F]/20" />
              <span className="text-white/15 font-mono text-[9px] tracking-[0.3em] uppercase">Pages</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-1.5">
              {[["/","Home"],["/founder","Founder"],["/ecosystem","Ecosystem"],["/research","Research"],["/press","Press"],["/learning","Learning"],["/media","Media"],["/investment","Investment"],["/contact","Contact"]].map(([href, label]) => (
                <a key={href} href={href} className="text-white/25 text-xs hover:text-[#F3BA2F] transition-colors font-mono tracking-wider">{label}</a>
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-[#F3BA2F]/10" />

          {/* ── Copyright ── */}
          <div className="pt-8 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-white/25 text-xs font-mono mb-1">© {new Date().getFullYear()} Muhammad Faisal Orakzai. All rights reserved.</div>
              <div className="text-white/15 text-[10px] font-mono">Founder & Chairman · Orakzai Group · Karachi, Pakistan</div>
            </div>
            <div className="text-white/15 text-[10px] font-mono text-right leading-relaxed">
              <div>orakzaibond.com · shamimforever.com · faisalorakzai.com</div>
              <div className="mt-1">Crunchbase #28 · Wikidata Q140264666 · ORCID 0009-0000-0915-7272</div>
            </div>
          </div>

        </div>
      </footer>
    );
  }
  