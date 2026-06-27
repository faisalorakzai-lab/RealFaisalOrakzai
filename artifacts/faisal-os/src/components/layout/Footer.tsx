import { motion } from "framer-motion";

const socials = [
  { label: "LinkedIn",    url: "https://www.linkedin.com/in/faisalorakzaii",            logo: "/logos/linkedin.jpg" },
  { label: "Twitter / X", url: "https://x.com/faisalorakzaii",                          logo: "/logos/x.png"       },
  { label: "Instagram",   url: "https://www.instagram.com/faisalorakzaii",              logo: "/logos/instagram.png" },
  { label: "TikTok",      url: "https://tiktok.com/@chairmanorakzai",                   logo: "/logos/tiktok.png"  },
  { label: "GitHub",      url: "https://github.com/faisalorakzai-lab",                  logo: "/logos/github.png"  },
  { label: "Crunchbase",  url: "https://www.crunchbase.com/person/faisal-orakzai",     logo: "/logos/crunchbase.png" },
  { label: "Pinterest",   url: "https://www.pinterest.com/faisalorakzaii",              logo: "/logos/pinterest.png" },
  { label: "Facebook",    url: "https://web.facebook.com/faisalorakzaii",               logo: "/logos/facebook.png" },
  { label: "Clubhouse",   url: "https://www.clubhouse.com/c/join/jGOPW7Kp",            logo: "/logos/clubhouse.png" },
  { label: "Mastodon",    url: "https://mastodon.social/@Faisalorakzai",                logo: "/logos/mastodon.png" },
];

const ecosystem = [
  { label: "Orakzai Bond",    url: "https://orakzaibond.com" },
  { label: "Shamim Forever",  url: "https://www.shamimforever.com" },
  { label: "Wikidata",        url: "https://www.wikidata.org/wiki/Q140264666" },
  { label: "EveryBodyWiki",   url: "https://en.everybodywiki.com/Faisal_Orakzai" },
  { label: "Google Panel",    url: "https://share.google/jJqhayo6kkfz4k7Nb" },
  { label: "Linktree",        url: "https://linktr.ee/faisalorakzaiofficial" },
  { label: "Wellfound",       url: "https://wellfound.com/u/faisal-orakzai-1" },
  { label: "Peerlist",        url: "https://peerlist.io/faisalorakzai" },
  { label: "Hackernoon",      url: "https://hackernoon.com/u/faisalorakzai" },
  { label: "F6S",             url: "https://www.f6s.com/faisalorakzai" },
  { label: "TheOrg",          url: "https://theorg.com/org/orakzai-bond?person=faisal-orakzai" },
  { label: "Gust",            url: "https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e" },
  { label: "ORCID",           url: "https://orcid.org/0009-0000-0915-7272" },
  { label: "GenGlobal",       url: "https://www.genglobal.org/user/faisal1" },
  { label: "Startup School",  url: "https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2" },
  { label: "About.me",        url: "https://about.me/faisalorakzai" },
  { label: "Gravatar",        url: "https://gravatar.com/faisalorakzaii" },
  { label: "Bebee",           url: "https://bebee.com/pk/people/faisalorakzai" },
  { label: "Pa.bio",          url: "https://pa.bio/faisalorakzaii" },
  { label: "Bio.site",        url: "https://bio.site/faisalorakzai" },
  { label: "LeetCode",        url: "https://leetcode.com/u/faisalorakzai/" },
  { label: "PRLog (News)",    url: "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#F3BA2F]/10">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-28 md:pb-16">

        {/* ── Top 3-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-14">

          {/* Brand — with logo */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/logo.png"
                alt="Faisal Orakzai"
                className="w-9 h-9 object-contain"
                style={{ filter: "drop-shadow(0 0 6px rgba(243,186,47,0.45))" }}
              />
              <div>
                <div className="text-white font-semibold text-sm">Faisal Orakzai</div>
                <div className="text-[#F3BA2F]/55 font-mono text-[10px] tracking-widest">FOUNDER & CHAIRMAN</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Building long-term ventures at the intersection of AI, blockchain,
              digital assets, luxury commerce, and real-world investments.
            </p>
            {/* Live status */}
            <div className="flex items-center gap-2">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F]"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
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
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group"
                >
                  <span className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden rounded-sm">
                    <img
                      src={s.logo}
                      alt={s.label}
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span className="text-white/60 text-sm group-hover:text-[#F3BA2F] transition-colors truncate">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Ecosystem — first 10 shown, rest in expanded grid below */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-4 bg-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] uppercase">Ecosystem & Profiles</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {ecosystem.slice(0, 10).map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 text-sm hover:text-[#F3BA2F] transition-colors truncate"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Extended profiles row ── */}
        {ecosystem.length > 10 && (
          <div className="mb-14 border-t border-[#F3BA2F]/6 pt-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px w-4 bg-[#F3BA2F]/50" />
              <span className="text-white/25 font-mono text-[9px] tracking-[0.3em] uppercase">More Directories</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-2.5">
              {ecosystem.slice(10).map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 text-xs hover:text-[#F3BA2F] transition-colors truncate"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        <div className="border-t border-[#F3BA2F]/10" />

        {/* ── Copyright block — clear and unobstructed ── */}
        <div className="pt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-white/25 text-xs font-mono">
            © {new Date().getFullYear()} Faisal Orakzai. All rights reserved.
          </div>
          <div className="text-white/20 text-[10px] font-mono tracking-wide leading-relaxed">
            Founder & Chairman, Orakzai Group · orakzaibond.com · shamimforever.com
          </div>
        </div>

      </div>
    </footer>
  );
}
