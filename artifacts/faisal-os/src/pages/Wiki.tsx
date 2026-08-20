import { useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "@/components/shared/SEOHead";

const TOC_SECTIONS = [
  { id: "early-life", label: "Early life and education", sub: [
    { id: "early-life-childhood", label: "Early life" },
    { id: "early-life-education", label: "Education" },
  ]},
  { id: "career", label: "Career", sub: [
    { id: "career-orakzai-group", label: "Orakzai Group" },
    { id: "career-okzbyte", label: "OkzByte" },
    { id: "career-orakzai-bond", label: "Orakzai Bond" },
    { id: "career-shamim-forever", label: "Shamim Forever" },
    { id: "career-orakzai-org", label: "Orakzai.org" },
  ]},
  { id: "philosophy", label: "Leadership and business philosophy" },
  { id: "research", label: "Research and publications", sub: [
    { id: "research-books", label: "Books" },
    { id: "research-papers", label: "Selected publications" },
  ]},
  { id: "timeline", label: "Timeline" },
  { id: "areas-of-work", label: "Areas of work" },
  { id: "public-speaking", label: "Public speaking" },
  { id: "affiliations", label: "Professional affiliations" },
  { id: "media", label: "Media coverage" },
  { id: "external-links", label: "External links" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Wiki() {
  const [tocOpen, setTocOpen] = useState(true);

  return (
    <>
      <SEOHead
        title="Muhammad Faisal Orakzai — Wiki | faisalorakzai.com"
        description="Muhammad Faisal Orakzai is a Pakistani technology entrepreneur, computer scientist, and founder of Orakzai Group. This wiki documents his life, career, projects, and publications."
        path="/wiki"
      />

      {/* Wiki-style page */}
      <div className="min-h-screen bg-[#0d0d0d] text-white" style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}>

        {/* Header bar — mimics Wikipedia top bar */}
        <div className="border-b border-[#F3BA2F]/15 bg-black/60 backdrop-blur-sm sticky top-[56px] z-10">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
            <span className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase">faisalorakzai.com</span>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-white/40 font-mono text-[9px] tracking-widest uppercase">Wiki</span>
            <span className="text-white/20 text-xs">/</span>
            <span className="text-white/60 font-mono text-[9px] tracking-widest">Muhammad_Faisal_Orakzai</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Page title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-1 border-b border-[#F3BA2F]/20 pb-3"
            style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}>
            Muhammad Faisal Orakzai
          </h1>
          <div className="text-white/40 text-sm mb-6 font-mono">محمد فیصل اورکزئی</div>

          {/* Main two-column layout */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Left: article body ── */}
            <div className="flex-1 min-w-0">

              {/* Infobox — floats right on desktop, stacks on mobile */}
              <div className="float-none lg:float-right lg:ml-6 lg:mb-4 mb-6 w-full lg:w-72 shrink-0
                border border-[#F3BA2F]/30 bg-[#0a0a0a] text-sm">

                {/* Infobox header */}
                <div className="bg-[#F3BA2F]/10 border-b border-[#F3BA2F]/30 px-3 py-2 text-center">
                  <div className="text-[#F3BA2F] font-semibold text-sm tracking-wide">Muhammad Faisal Orakzai</div>
                  <div className="text-white/40 text-xs font-mono">محمد فیصل اورکزئی</div>
                </div>

                {/* Photo */}
                <div className="border-b border-[#F3BA2F]/15 text-center py-3 px-3">
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663096108879/EiWGrdKfjMCRlCzX.jpg"
                    alt="Faisal Orakzai"
                    className="w-48 mx-auto object-cover"
                    style={{ aspectRatio: "1/1", objectPosition: "top" }}
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663096108879/EiWGrdKfjMCRlCzX.jpg"; }}
                  />
                  <div className="text-white/35 text-[11px] mt-1.5 italic">Orakzai in 2026</div>
                </div>

                {/* Infobox rows */}
                {[
                  ["Born", "30 April 2006 (age 19)\nMamozai, District Orakzai, Khyber Pakhtunkhwa, Pakistan"],
                  ["Nationality", "Pakistani"],
                  ["Citizenship", "Pakistan"],
                  ["Occupation", "Technology entrepreneur · Computer scientist · Business executive"],
                  ["Years active", "2018–present"],
                  ["Known for", "Blockchain infrastructure, AI, FinTech, Web3, software engineering"],
                  ["Title", "Founder and Chairman, Orakzai Group"],
                  ["Employer", "Orakzai Group"],
                  ["Education", "Cadet College Kohat\nZiauddin University\nFounder Institute\nY Combinator Startup School"],
                  ["Father", "Dawlat Sher"],
                  ["Website", "faisalorakzai.com"],
                ].map(([key, val]) => (
                  <div key={key} className="flex border-b border-[#F3BA2F]/8 last:border-0">
                    <div className="w-28 shrink-0 px-2 py-1.5 text-white/50 text-[11px] font-semibold bg-white/[0.02] align-top"
                      style={{ verticalAlign: "top" }}>
                      {key}
                    </div>
                    <div className="flex-1 px-2 py-1.5 text-white/80 text-[11px] leading-relaxed whitespace-pre-line">
                      {key === "Website"
                        ? <a href="https://faisalorakzai.com" target="_blank" rel="noopener noreferrer"
                            className="text-[#F3BA2F] hover:underline">faisalorakzai.com</a>
                        : val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Lead paragraph */}
              <p className="text-white/80 leading-relaxed mb-4 text-[15px]">
                <b className="text-white">Muhammad Faisal Orakzai</b>{" "}
                <span className="text-white/50">(Urdu: </span>
                <b className="text-white/70">محمد فیصل اورکزئی</b>
                <span className="text-white/50">; born 30 April 2006)</span>{" "}
                is a Pakistani technology entrepreneur, computer scientist, and business executive. He is the founder
                and chairman of <b className="text-white">Orakzai Group</b>, a technology-focused organization working in blockchain
                infrastructure, artificial intelligence (AI), financial technology (FinTech), software engineering,
                and digital innovation. He is also the founder of{" "}
                <b className="text-white">Orakzai Bond (OKBOND)</b>,{" "}
                <b className="text-white">OkzByte</b>,{" "}
                <b className="text-white">Shamim Forever</b>, and{" "}
                <b className="text-white">Orakzai.org</b>.
              </p>

              {/* TOC */}
              <div className="border border-[#F3BA2F]/25 bg-[#0a0a0a] inline-block mb-6 w-full lg:w-auto lg:max-w-xs">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#F3BA2F]/15">
                  <span className="text-white/70 text-xs font-semibold" style={{ fontFamily: "sans-serif" }}>
                    Contents
                  </span>
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="text-[#F3BA2F] text-[10px] font-mono hover:underline ml-4"
                    style={{ fontFamily: "sans-serif" }}>
                    [{tocOpen ? "hide" : "show"}]
                  </button>
                </div>
                {tocOpen && (
                  <ol className="px-3 py-2 space-y-0.5 text-[13px]" style={{ fontFamily: "sans-serif" }}>
                    {TOC_SECTIONS.map((s, i) => (
                      <li key={s.id}>
                        <button
                          onClick={() => scrollTo(s.id)}
                          className="text-[#F3BA2F] hover:underline text-left">
                          <span className="text-white/40 mr-1">{i + 1}</span> {s.label}
                        </button>
                        {s.sub && (
                          <ol className="ml-5 mt-0.5 space-y-0.5">
                            {s.sub.map((ss, j) => (
                              <li key={ss.id}>
                                <button
                                  onClick={() => scrollTo(ss.id)}
                                  className="text-[#F3BA2F] hover:underline text-left text-[12px]">
                                  <span className="text-white/30 mr-1">{i + 1}.{j + 1}</span> {ss.label}
                                </button>
                              </li>
                            ))}
                          </ol>
                        )}
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {/* ── Sections ── */}

              {/* Early Life */}
              <WikiH2 id="early-life">Early life and education</WikiH2>

              <WikiH3 id="early-life-childhood">Early life</WikiH3>
              <WikiP>
                Faisal Orakzai was born on <b className="text-white">30 April 2006</b> in <b className="text-white">Mamozai</b>,
                District Orakzai (formerly Orakzai Agency), Tirah, Khyber Pakhtunkhwa, Pakistan, to{" "}
                <b className="text-white">Dawlat Sher</b>. He spent his early childhood in the mountainous tribal
                region of Orakzai before relocating with his family to <b className="text-white">Kohat</b> during a
                period of regional instability.
              </WikiP>
              <WikiP>
                Growing up in a rural environment, Orakzai was exposed to agriculture, livestock management, and
                community life from an early age. These experiences influenced his interest in problem-solving,
                resource management, and entrepreneurship. During his childhood, he developed an interest in computers,
                software, and emerging technologies, often learning through books, technical documentation, and online
                educational resources.
              </WikiP>
              <WikiP>
                In 2018, Orakzai relocated to <b className="text-white">Karachi</b>, where he continued his education
                and became involved in the local real estate sector. His experience in property markets later
                contributed to his interest in financial technology, blockchain infrastructure, digital assets, and
                software development.
              </WikiP>

              <WikiH3 id="early-life-education">Education</WikiH3>
              <WikiP>Orakzai received his early education in Kohat before continuing his studies in Karachi.</WikiP>
              <WikiP>His educational background includes:</WikiP>
              <ul className="list-disc list-outside ml-6 mb-4 space-y-1.5 text-white/75 text-[15px] leading-relaxed">
                {[
                  ["Yahya Public School, Kohat", "Early primary education."],
                  ["Madrassa Mahad-ul-Uleman, Kohat", "Islamic studies alongside formal education."],
                  ["Cadet College Kohat", "Middle school education, where he participated in debating, student leadership, sports, and computer-related activities."],
                  ["Ziauddin University, Karachi", "Completed Secondary School Certificate (Matriculation in Science) under the Board of Secondary Education Karachi, studying Science, Islamiat, Pakistan Studies, and Civics."],
                  ["Founder Institute (Karachi – South Asia)", "Founder Program focused on entrepreneurship, venture building, startup development, leadership, and fundraising."],
                  ["Y Combinator Startup School", "Entrepreneurship and startup education program focused on company building, product development, go-to-market strategy, fundraising, and technology startup scaling."],
                ].map(([inst, desc]) => (
                  <li key={inst}><b className="text-white">{inst}</b> — {desc}</li>
                ))}
              </ul>
              <WikiP>
                Alongside his formal education, Orakzai has pursued independent study in software engineering,
                blockchain systems, artificial intelligence, distributed computing, economics, finance, cybersecurity,
                and digital infrastructure through technical documentation, research papers, open-source projects,
                and online educational platforms.
              </WikiP>

              {/* Career */}
              <WikiH2 id="career">Career</WikiH2>
              <WikiP>
                Orakzai began his professional career in 2018 through the real estate sector in Karachi, where he
                gained experience in property marketing, client relations, sales, and business development. During
                this period, he also pursued independent study in software engineering, blockchain technology,
                financial systems, cloud computing, and artificial intelligence through online learning resources
                and open-source communities.
              </WikiP>
              <WikiP>
                As his interest in technology expanded, Orakzai shifted his focus from traditional business activities
                toward software development and digital infrastructure. His work later evolved into technology ventures
                operating across blockchain infrastructure, artificial intelligence, enterprise software, financial
                technology (FinTech), and digital commerce.
              </WikiP>

              <WikiH3 id="career-orakzai-group">Orakzai Group</WikiH3>
              <WikiP>
                In 2018, Orakzai founded <b className="text-white">Orakzai Group</b>, a privately held technology
                organization serving as the parent company for several ventures operating in software development,
                blockchain technology, artificial intelligence, financial technology, enterprise software, and digital
                commerce. The organization develops technology products, software platforms, digital infrastructure,
                and educational resources related to emerging technologies. As chairman of the organization, Orakzai
                oversees its long-term strategic direction and technology initiatives.
              </WikiP>

              <WikiH3 id="career-okzbyte">OkzByte</WikiH3>
              <WikiP>
                <b className="text-white">OkzByte</b> is a software and technology company founded by Orakzai in
                2026. The company develops websites, enterprise software, cloud applications, artificial intelligence
                solutions, automation systems, blockchain applications, and custom digital platforms for businesses.
                Its areas of work include software engineering, cloud computing, digital infrastructure, blockchain
                integration, cybersecurity, enterprise automation, and Web3 technologies.
              </WikiP>

              <WikiH3 id="career-orakzai-bond">Orakzai Bond</WikiH3>
              <WikiP>
                <b className="text-white">Orakzai Bond</b> (also known as <b className="text-white">OKBOND</b>) is a
                blockchain project founded by Orakzai in 2026. The project explores applications of blockchain
                technology in digital assets, smart contracts, decentralized finance (DeFi), and the tokenization of
                real-world assets (RWA). Technical documentation relating to the project has been published through
                its official website and associated publications.
              </WikiP>

              <WikiH3 id="career-shamim-forever">Shamim Forever</WikiH3>
              <WikiP>
                <b className="text-white">Shamim Forever</b> is a digital commerce platform founded by Orakzai in
                2026. The platform operates in the online retail sector and focuses on luxury consumer products,
                including fragrances, cosmetics, jewellery, and lifestyle goods. The platform incorporates digital
                commerce technologies and has announced plans to explore blockchain-based product authentication
                and digital ownership systems.
              </WikiP>

              <WikiH3 id="career-orakzai-org">Orakzai.org</WikiH3>
              <WikiP>
                <b className="text-white">Orakzai.org</b> is a non-profit initiative established by Orakzai in 2025.
                The organization focuses on humanitarian and community development activities, including education,
                legal awareness, migrant assistance, healthcare, clean water initiatives, humanitarian relief, and
                economic empowerment. The organization also publishes educational resources related to technology,
                entrepreneurship, digital literacy, and innovation.
              </WikiP>

              {/* Philosophy */}
              <WikiH2 id="philosophy">Leadership and business philosophy</WikiH2>
              <WikiP>
                Orakzai has stated that his work is based on a systems-oriented approach that combines software
                engineering, business strategy, and emerging technologies. His areas of interest include blockchain
                infrastructure, artificial intelligence, enterprise software, financial technology, and digital
                transformation.
              </WikiP>
              <WikiP>
                In interviews and public statements, he has emphasized the importance of practical technology
                development, continuous learning, open knowledge sharing, and entrepreneurship. He has expressed
                support for open knowledge, responsible innovation, and the development of technology ecosystems
                that encourage entrepreneurship and research.
              </WikiP>
              <WikiP>
                According to Orakzai, blockchain technology has applications beyond cryptocurrencies, including
                digital identity, financial infrastructure, supply chain management, and the tokenization of
                real-world assets. He has also written about the role of artificial intelligence in enterprise
                automation, business analytics, and software development.
              </WikiP>

              {/* Research */}
              <WikiH2 id="research">Research and publications</WikiH2>
              <WikiP>
                Alongside his entrepreneurial activities, Orakzai has written educational articles, technical papers,
                and white papers on blockchain technology, artificial intelligence, financial technology (FinTech),
                software engineering, enterprise systems, and digital infrastructure. His publications are primarily
                intended for developers, entrepreneurs, students, and readers interested in emerging technologies.
              </WikiP>

              <WikiH3 id="research-books">Books</WikiH3>
              <ul className="list-disc list-outside ml-6 mb-4 text-white/75 text-[15px]">
                <li><i className="text-white/90">The Sovereign Stack: Engineering Next-Generation Blockchain Infrastructure</i> (2026)</li>
              </ul>

              <WikiH3 id="research-papers">Selected publications</WikiH3>
              <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-white/75 text-[15px]">
                {[
                  "Macro-Liquidity Networks & Cross-Border FinTech Dynamics (2024)",
                  "Real-World Asset Tokenisation: Protocol Mechanics & Market Depth (2024)",
                  "Orakzai Bond — Sovereign Tokenised Debt Instrument White Paper (2024)",
                  "OkzByte — Real Estate Tokenisation Protocol (2024)",
                ].map(p => <li key={p}><i className="text-white/90">{p.replace(/ \(\d+\)$/, "")}</i>{" "}({p.match(/\((\d+)\)$/)?.[1]})</li>)}
              </ul>

              {/* Timeline */}
              <WikiH2 id="timeline">Timeline</WikiH2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse text-[13px]" style={{ fontFamily: "sans-serif" }}>
                  <thead>
                    <tr className="bg-[#F3BA2F]/10 border-b border-[#F3BA2F]/30">
                      <th className="text-left px-3 py-2 text-[#F3BA2F] font-semibold w-28 border-r border-[#F3BA2F]/15">Year</th>
                      <th className="text-left px-3 py-2 text-[#F3BA2F] font-semibold">Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["2006", "Born in Mamozai, District Orakzai, Khyber Pakhtunkhwa, Pakistan."],
                      ["2010", "Relocated with his family to Kohat."],
                      ["2011–2017", "Completed early education in Kohat; studied both formal curriculum and Islamic studies at Madrassa Mahad-ul-Uleman."],
                      ["2018", "Relocated to Karachi and began professional career in the real estate sector; founded Orakzai Group."],
                      ["2024", "Published technical papers on blockchain infrastructure, financial technology, and tokenization."],
                      ["2025", "Established Orakzai.org, a non-profit focused on education, healthcare, legal awareness, and humanitarian assistance."],
                      ["2025", "Participated in the Founder Institute Founder Program (Karachi)."],
                      ["2026", "Participated in Y Combinator Startup School."],
                      ["2026", "Founded Orakzai Bond (OKBOND)."],
                      ["2026", "Founded OkzByte."],
                      ["2026", "Founded Shamim Forever."],
                      ["2026", "Published The Sovereign Stack: Engineering Next-Generation Blockchain Infrastructure."],
                    ].map(([year, event], idx) => (
                      <tr key={idx} className={`border-b border-[#F3BA2F]/8 ${idx % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                        <td className="px-3 py-2 text-white/60 font-mono border-r border-[#F3BA2F]/8 align-top whitespace-nowrap">{year}</td>
                        <td className="px-3 py-2 text-white/75">{event}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Areas of work */}
              <WikiH2 id="areas-of-work">Areas of work</WikiH2>
              <WikiP>Orakzai's professional work spans several areas of technology and software development, including:</WikiP>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mb-6 ml-4 text-[14px]" style={{ fontFamily: "sans-serif" }}>
                {["Blockchain", "Artificial intelligence", "Financial technology", "Software engineering",
                  "Enterprise software", "Cloud computing", "Digital infrastructure", "Automation",
                  "Cybersecurity", "Digital commerce", "Web3", "Real-world asset tokenization"].map(a => (
                  <div key={a} className="flex items-center gap-2 text-white/70">
                    <span className="text-[#F3BA2F]/50">•</span>
                    <span className="hover:text-[#F3BA2F] cursor-default transition-colors">{a}</span>
                  </div>
                ))}
              </div>

              {/* Public speaking */}
              <WikiH2 id="public-speaking">Public speaking</WikiH2>
              <WikiP>
                Orakzai has participated in interviews, podcasts, and public discussions on topics including
                blockchain technology, artificial intelligence, entrepreneurship, software engineering, financial
                technology, and digital infrastructure. His presentations generally focus on technology education,
                startup development, and the practical adoption of emerging technologies.
              </WikiP>

              {/* Affiliations */}
              <WikiH2 id="affiliations">Professional affiliations</WikiH2>
              <WikiP>
                Orakzai maintains professional profiles and research identifiers on several public platforms.
                He has participated in entrepreneurship and technology communities through a number of professional
                organizations and educational initiatives, including:
              </WikiP>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 mb-4 ml-4 text-[14px]" style={{ fontFamily: "sans-serif" }}>
                {["Founder Institute", "Y Combinator Startup School", "Global Entrepreneurship Network (GEN)",
                  "ORCID", "Crunchbase", "LinkedIn", "GitHub", "Peerlist", "HackerNoon",
                  "F6S", "The Org", "IMDb"].map(a => (
                  <div key={a} className="flex items-center gap-2 text-white/70">
                    <span className="text-[#F3BA2F]/50">•</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>

              {/* Media coverage */}
              <WikiH2 id="media">Media coverage</WikiH2>
              <WikiP>
                Orakzai's entrepreneurial activities, publications, and technology ventures have been covered by
                a number of online news and technology platforms. Coverage has primarily focused on blockchain
                technology, entrepreneurship, software development, and digital innovation.
              </WikiP>
              <div className="border border-[#F3BA2F]/15 bg-[#0a0a0a] p-3 mb-6 space-y-2 text-[13px]" style={{ fontFamily: "sans-serif" }}>
                {[
                  ["The Cow News", "Faisal Orakzai launches blockchain book on Amazon Kindle", "https://www.thecownews.com/blog/faisal-orakzai-launches-blockchain-book-on-amazon-kindle/"],
                  ["OpenPR", "Young Pakistani entrepreneur expands global vision through technology initiatives", "https://www.openpr.com/news/4560198/young-pakistani-entrepreneur-expands-global-vision-through"],
                  ["PRLog", "Young Pakistani entrepreneur expands global vision through OKBOND and Shamim Forever", "https://www.prlog.org/13154317-young-pakistani-entrepreneur-expands-global-vision-through-okbond-and-shamim-forever.html"],
                  ["61 News PK", "Technology entrepreneur coverage", "https://www.61news.pk/?p=279"],
                ].map(([src, title, url]) => (
                  <div key={url} className="flex gap-2">
                    <span className="text-[#F3BA2F]/50 shrink-0 mt-0.5">↗</span>
                    <div>
                      <a href={url} target="_blank" rel="noopener noreferrer"
                        className="text-[#F3BA2F] hover:underline">{title}</a>
                      <span className="text-white/30 ml-2">— {src}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* External links */}
              <WikiH2 id="external-links">External links</WikiH2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-8 text-[14px]" style={{ fontFamily: "sans-serif" }}>
                {[
                  ["Official website", "https://faisalorakzai.com"],
                  ["LinkedIn", "https://www.linkedin.com/in/faisalorakzaii"],
                  ["Crunchbase", "https://www.crunchbase.com/person/faisal-orakzai"],
                  ["ORCID", "https://orcid.org/0009-0000-0915-7272"],
                  ["GitHub", "https://github.com/faisalorakzai-lab"],
                  ["Peerlist", "https://peerlist.io/faisalorakzai"],
                  ["HackerNoon", "https://hackernoon.com/u/faisalorakzai"],
                  ["IMDb", "https://www.imdb.com/name/nm18674496"],
                  ["Linktree", "https://linktr.ee/faisalorakzaiofficial"],
                  ["X (Twitter)", "https://x.com/faisalorakzaii"],
                  ["Instagram", "https://www.instagram.com/faisalorakzaii"],
                  ["Facebook", "https://www.facebook.com/faisalorakzaii"],
                  ["TikTok", "https://www.tiktok.com/@chairmanorakzai"],
                  ["Wikidata", "https://www.wikidata.org/wiki/Q140264666"],
                ].map(([label, url]) => (
                  <div key={url} className="flex items-center gap-2">
                    <span className="text-[#F3BA2F]/40">•</span>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      className="text-[#F3BA2F] hover:underline">{label}</a>
                    <span className="text-white/20 text-[11px] font-mono truncate">{url.replace("https://", "").replace("www.", "").split("/")[0]}</span>
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div className="border-t border-[#F3BA2F]/15 pt-4 mt-2">
                <div className="text-white/30 text-[11px] font-mono mb-2 tracking-widest uppercase">Categories</div>
                <div className="flex flex-wrap gap-2">
                  {["2006 births", "Living people", "People from Orakzai District", "Pakistani businesspeople",
                    "Pakistani technology businesspeople", "Pakistani computer scientists", "Pakistani software engineers",
                    "Pakistani company founders", "Blockchain researchers", "Artificial intelligence researchers",
                    "Financial technology", "Businesspeople from Karachi", "Web3"].map(cat => (
                    <span key={cat}
                      className="px-2 py-0.5 border border-[#F3BA2F]/20 text-white/40 text-[10px] font-mono hover:text-[#F3BA2F] hover:border-[#F3BA2F]/40 transition-colors cursor-default">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Right sidebar: quick facts & nav ── */}
            <aside className="hidden xl:block w-52 shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="border border-[#F3BA2F]/20 bg-[#0a0a0a] p-3">
                  <div className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase mb-3">Quick navigation</div>
                  <div className="space-y-1">
                    {TOC_SECTIONS.map((s, i) => (
                      <button key={s.id} onClick={() => scrollTo(s.id)}
                        className="block w-full text-left text-white/50 hover:text-[#F3BA2F] text-[11px] transition-colors py-0.5"
                        style={{ fontFamily: "sans-serif" }}>
                        <span className="text-white/20 mr-1">{i + 1}.</span>{s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-[#F3BA2F]/20 bg-[#0a0a0a] p-3">
                  <div className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase mb-3">Related pages</div>
                  <div className="space-y-1.5 text-[11px]" style={{ fontFamily: "sans-serif" }}>
                    {[["Founder Profile", "/founder"], ["Ecosystem", "/ecosystem"], ["Research", "/research"],
                      ["Press", "/press"], ["Contact", "/contact"]].map(([label, href]) => (
                      <a key={href} href={href} className="block text-[#F3BA2F]/60 hover:text-[#F3BA2F] transition-colors">→ {label}</a>
                    ))}
                  </div>
                </div>

                <div className="border border-[#F3BA2F]/20 bg-[#0a0a0a] p-3">
                  <div className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.3em] uppercase mb-2">Identifiers</div>
                  <div className="space-y-1 text-[10px] font-mono" style={{ fontFamily: "monospace" }}>
                    {[["ORCID", "0009-0000-0915-7272"], ["IMDb", "nm18674496"], ["Wikidata", "Q140264666"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-1">
                        <span className="text-white/30">{k}</span>
                        <span className="text-white/55 truncate">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

function WikiH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-bold text-white border-b border-[#F3BA2F]/20 pb-1.5 mt-8 mb-3 scroll-mt-24"
      style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}>
      {children}
    </h2>
  );
}

function WikiH3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-base font-bold text-white/90 mt-5 mb-2 scroll-mt-24"
      style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}>
      {children}
    </h3>
  );
}

function WikiP({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/75 leading-relaxed mb-3 text-[15px]"
      style={{ fontFamily: "'Linux Libertine','Georgia','Times',serif" }}>
      {children}
    </p>
  );
}
