import { motion } from "framer-motion";

  const socials = [
    { label: "LinkedIn",    url: "https://www.linkedin.com/in/faisalorakzaii",           logo: "/logos/linkedin.webp",   filter: undefined },
    { label: "Twitter / X", url: "https://x.com/faisalorakzaii",                         logo: "/logos/x.webp",          filter: undefined },
    { label: "CoinMarketCap", url: "https://coinmarketcap.com/community/profile/faisalorakzai", logo: "/logos/coinmarketcap.jpg", filter: undefined },
    { label: "Instagram",   url: "https://www.instagram.com/faisalorakzaii",             logo: "/logos/instagram.webp",  filter: undefined },
    { label: "TikTok",      url: "https://tiktok.com/@chairmanorakzai",                  logo: "/logos/tiktok.png",     filter: undefined },
    { label: "GitHub",      url: "https://github.com/faisalorakzai-lab",                 logo: "/logos/github.webp",     filter: "invert(1)" },
    { label: "Crunchbase",  url: "https://www.crunchbase.com/person/faisal-orakzai",    logo: "/logos/crunchbase.webp", filter: undefined },
    { label: "Pinterest",   url: "https://www.pinterest.com/faisalorakzaii",             logo: "/logos/pinterest.webp",  filter: undefined },
    { label: "Facebook",    url: "https://web.facebook.com/faisalorakzaii",              logo: "/logos/facebook.webp",   filter: undefined },
    { label: "Clubhouse",   url: "https://www.clubhouse.com/c/join/jGOPW7Kp",           logo: "/logos/clubhouse.webp",  filter: undefined },
    { label: "Mastodon",    url: "https://mastodon.social/@Faisalorakzai",               logo: "/logos/mastodon.webp",   filter: undefined },
  ];

  const tier1 = [
    { label: "Google Panel",    url: "https://share.google/jJqhayo6kkfz4k7Nb",                           cat: "KNOWLEDGE GRAPH",  logo: "/logos/google.png" },
    { label: "Crunchbase #28",  url: "https://www.crunchbase.com/person/faisal-orakzai",                 cat: "INVESTOR NETWORK", logo: "/logos/crunchbase.webp" },
    { label: "EveryBodyWiki",   url: "https://en.everybodywiki.com/Faisal_Orakzai",                      cat: "ENCYCLOPEDIA",     logo: "/logos/everybodywiki.webp" },
    { label: "ORCID",           url: "https://orcid.org/0009-0000-0915-7272",                            cat: "RESEARCH ID",      logo: "/logos/orcid.webp" },
    { label: "IMDb",            url: "https://www.imdb.com/name/nm18674496/",                             cat: "MEDIA PROFILE",    logo: "/logos/imdb.svg" },
    { label: "Orakzai Bond",    url: "https://orakzaibond.com",                                           cat: "VENTURE · LIVE",   logo: "/logos/orakzai-bond.webp" },
    { label: "Shamim Forever",  url: "https://www.shamimforever.com",                                     cat: "VENTURE · LIVE",   logo: "/logos/shamim-forever.webp" },
    { label: "Wellfound",       url: "https://wellfound.com/u/faisal-orakzai-1",                         cat: "STARTUP",          logo: "/logos/wellfound.png" },
    { label: "Tracxn · OKBOND", url: "https://platform.tracxn.com/a/d/company/69d7b7bd06c1367e438e2743/orakzaibond", cat: "VENTURE · LIVE", logo: "/logos/tracxn.webp" },
  ];

  const tier2 = [
    { label: "Peerlist",       url: "https://peerlist.io/faisalorakzai",                                                                                          logo: "/logos/peerlist.png" },
    { label: "Hackernoon",     url: "https://hackernoon.com/u/faisalorakzai",                                                                                     logo: "/logos/hackernoon.png" },
    { label: "F6S",            url: "https://www.f6s.com/faisalorakzai",                                                                                          logo: "/logos/f6s.png" },
    { label: "TheOrg",         url: "https://theorg.com/org/orakzai-bond?person=faisal-orakzai",                                                                 logo: "/logos/theorg.png" },
    { label: "Gust",           url: "https://gust.com/user/014bee5e-1c09-4f2d-b5ae-f5c937bbcc0e",                                                                logo: "/logos/gust.png" },
    { label: "Startup School", url: "https://www.startupschool.org/cofounder-matching/candidate/Hm8t79WI2",                                                       logo: "/logos/startup-school.png" },
    { label: "About.me",       url: "https://about.me/faisalorakzai",                                                                                            logo: "/logos/about-me.png" },
    { label: "Gravatar",       url: "https://gravatar.com/faisalorakzaii",                                                                                        logo: "/logos/gravatar.png" },
    { label: "Linktree",       url: "https://linktr.ee/faisalorakzaiofficial",                                                                                    logo: "/logos/linktree.png" },
    { label: "GenGlobal",      url: "https://www.genglobal.org/user/faisal1",                                                                                     logo: "/logos/genglobal.png" },
    { label: "Bebee",          url: "https://bebee.com/pk/people/faisalorakzai",                                                                                  logo: "/logos/bebee.png" },
    { label: "Pa.bio",         url: "https://pa.bio/faisalorakzaii",                                                                                              logo: "/logos/pabio.png" },
    { label: "Bio.site",       url: "https://bio.site/faisalorakzai",                                                                                            logo: "/logos/biosite.png" },
    { label: "LeetCode",       url: "https://leetcode.com/u/faisalorakzai/",                                                                                     logo: "/logos/leetcode.png" },
    { label: "PRLog",          url: "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html",   logo: "/logos/prlog-logo.webp" },
    { label: "Polygon Scan",   url: "https://polygonscan.com",                                                                                                    logo: "/logos/polygonscan.png" },
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
                <img src="/logo.webp" alt="Faisal Orakzai" className="w-9 h-9 object-contain"
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
                    <span className="w-6 h-6 flex items-center justify-center shrink-0 overflow-hidden rounded-sm bg-white/5">
                      <img
                        src={s.logo}
                        alt={s.label}
                        className="w-full h-full object-cover"
                        style={s.filter ? { filter: s.filter } : undefined}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
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
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 flex items-center justify-center shrink-0 overflow-hidden rounded-sm bg-white/5">
                        <img
                          src={l.logo}
                          alt={l.label}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </span>
                      <span className="text-white/60 text-sm group-hover:text-[#F3BA2F] transition-colors truncate">{l.label}</span>
                    </div>
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
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-x-4 gap-y-3">
              {tier2.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 group min-w-0">
                  <span className="w-5 h-5 flex items-center justify-center shrink-0 overflow-hidden rounded-sm bg-white/5">
                    <img
                      src={l.logo}
                      alt={l.label}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </span>
                  <span className="text-white/35 text-xs group-hover:text-[#F3BA2F] transition-colors truncate">{l.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Site nav ── */}
          <div className="mb-6 border-t border-[#F3BA2F]/6 pt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-4 bg-[#F3BA2F]/20" />
              <span className="text-white/15 font-mono text-[9px] tracking-[0.3em] uppercase">Pages</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-1.5">
              {[["/","Home"],["/founder","Founder"],["/ecosystem","Ecosystem"],["/benchmarks","Benchmarks"],["/research","Research"],["/press","Press"],["/learning","Learning"],["/media","Media"],["/investment","Investment"],["/okzbyte-hub","OkzByte Hub"],["/contact","Contact"]].map(([href, label]) => (
                <a key={href} href={href} className="text-white/25 text-xs hover:text-[#F3BA2F] transition-colors font-mono tracking-wider">{label}</a>
              ))}
            </div>
          </div>

          {/* ── Legal / Trust links ── */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-4 bg-[#F3BA2F]/10" />
              <span className="text-white/10 font-mono text-[9px] tracking-[0.3em] uppercase">Legal & Trust</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              {[["/privacy","Privacy Policy"],["/terms","Terms of Service"],["/disclaimer","Disclaimer"],["/editorial-policy","Editorial Policy"],["/cookie-policy","Cookie Policy"],["/ai-usage-policy","AI Usage Policy"]].map(([href, label]) => (
                <a key={href} href={href} className="text-white/18 text-[11px] hover:text-[#F3BA2F]/60 transition-colors font-mono">{label}</a>
              ))}
            </div>
          </div>

          {/* ── Trustpilot ── */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-4 bg-[#F3BA2F]/10" />
            <span className="text-white/10 font-mono text-[9px] tracking-[0.3em] uppercase">Reviews</span>
          </div>
          <div className="mb-8">
            {/* TrustBox widget - Micro Button */}
            <div
              className="trustpilot-widget"
              data-locale="en-US"
              data-template-id="5419b757fa0340045cd0c938"
              data-businessunit-id="6a63aa31f54e1594b555b136"
              data-style-height="25px"
              data-style-width="100%"
              data-token="ee95f5da-f6cb-49f0-8088-eda33e1243bf"
            >
              <a href="https://www.trustpilot.com/review/faisalorakzai.com" target="_blank" rel="noopener">Trustpilot</a>
            </div>
            {/* End TrustBox widget */}
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
              <div className="mt-1">Crunchbase #28 · ORCID 0009-0000-0915-7272</div>
            </div>
          </div>

        </div>
      </footer>
    );
  }
