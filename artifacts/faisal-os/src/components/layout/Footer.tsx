import { motion } from "framer-motion";

const socials = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/faisalorakzaii", short: "LI" },
  { label: "Twitter / X", url: "https://x.com/faisalorakzaii", short: "X" },
  { label: "Instagram", url: "https://www.instagram.com/faisalorakzaii", short: "IG" },
  { label: "TikTok", url: "https://tiktok.com/@chairmanorakzai", short: "TK" },
  { label: "GitHub", url: "https://github.com/faisalorakzai-lab", short: "GH" },
  { label: "Crunchbase", url: "https://www.crunchbase.com/person/faisal-orakzai", short: "CB" },
  { label: "Pinterest", url: "https://www.pinterest.com/faisalorakzaii", short: "PT" },
  { label: "Facebook", url: "https://web.facebook.com/faisalorakzaii", short: "FB" },
];

const links = [
  { label: "Orakzai Bond", url: "https://orakzaibond.com" },
  { label: "Shamim Forever", url: "https://www.shamimforever.com" },
  { label: "Wikidata", url: "https://www.wikidata.org/wiki/Q140264666" },
  { label: "EveryBodyWiki", url: "https://en.everybodywiki.com/Faisal_Orakzai" },
  { label: "ORCID", url: "https://orcid.org/0009-0000-0915-7272" },
  { label: "Hackernoon", url: "https://hackernoon.com/u/faisalorakzai" },
  { label: "Peerlist", url: "https://peerlist.io/faisalorakzai" },
  { label: "F6S", url: "https://www.f6s.com/faisalorakzai" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#F3BA2F]/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border border-[#F3BA2F]/60 flex items-center justify-center">
                <span className="text-[#F3BA2F] font-mono font-bold text-sm">FO</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Faisal Orakzai</div>
                <div className="text-[#F3BA2F]/50 font-mono text-[10px] tracking-widest">FOUNDER & CHAIRMAN</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Building long-term ventures at the intersection of AI, blockchain, digital assets, luxury commerce, and real-world investments.
            </p>
          </div>

          {/* Social Links */}
          <div>
            <div className="text-[#F3BA2F] font-mono text-xs tracking-widest mb-5">SOCIAL NETWORKS</div>
            <div className="grid grid-cols-2 gap-2">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/40 text-sm hover:text-[#F3BA2F] transition-colors group"
                >
                  <span className="w-6 h-6 border border-white/10 flex items-center justify-center text-[10px] font-mono group-hover:border-[#F3BA2F]/40 transition-colors">{s.short}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Ecosystem Links */}
          <div>
            <div className="text-[#F3BA2F] font-mono text-xs tracking-widest mb-5">ECOSYSTEM & PROFILES</div>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 text-sm hover:text-[#F3BA2F] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#F3BA2F]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/25 text-xs font-mono">
            © {new Date().getFullYear()} Faisal Orakzai. All rights reserved.
          </div>
          <div className="text-white/25 text-xs font-mono">
            Faisal Orakzai — Founder & Chairman, Orakzai Group | orakzaibond.com | shamimforever.com
          </div>
        </div>
      </div>
    </footer>
  );
}
