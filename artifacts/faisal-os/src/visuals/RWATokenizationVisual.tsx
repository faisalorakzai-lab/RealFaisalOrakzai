import React from "react";

export default function RWATokenizationVisual() {
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeStructure, setActiveStructure] = React.useState(0);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };

  React.useEffect(() => {
    const schemas = [
      {
        "@context":"https://schema.org","@type":"TechArticle",
        "headline":"Tokenization of Real World Assets (RWA): Complete Guide to Blockchain Asset Tokenization (2026)",
        "description":"Learn how Real World Asset (RWA) tokenization works, including blockchain infrastructure, fractional ownership, smart contracts, compliance, benefits, risks, enterprise adoption, and future trends in digital finance.",
        "keywords":"Real World Assets, RWA, RWA Tokenization, Asset Tokenization, Blockchain Assets, Tokenized Real Estate, Fractional Ownership, Digital Assets, Security Tokens, Blockchain Investment, Token Economy, Enterprise Blockchain, Digital Finance, Smart Contracts",
        "author":{"@type":"Person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii"],"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
        "publisher":{"@type":"Organization","name":"Orakzai Research Lab","url":"https://faisalorakzai.com","logo":{"@type":"ImageObject","url":"https://faisalorakzai.com/logo.png"}},
        "datePublished":"2026-06-30","dateModified":"2026-06-30",
        "url":"https://faisalorakzai.com/research/rwa-tokenization",
        "image":{"@type":"ImageObject","url":"https://faisalorakzai.com/mk/rwa-hero.png","width":1200,"height":630},
        "inLanguage":"en-US","isAccessibleForFree":true,"proficiencyLevel":"Beginner"
      },
      {
        "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},
          {"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},
          {"@type":"ListItem","position":3,"name":"Tokenization of Real World Assets (RWA)","item":"https://faisalorakzai.com/research/rwa-tokenization"}
        ]
      },
      {
        "@context":"https://schema.org","@type":"Person","@id":"https://faisalorakzai.com#person",
        "name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder",
        "sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii","https://github.com/faisalorakzai-lab"],
        "jobTitle":"Founder & Chairman","affiliation":{"@type":"Organization","name":"Orakzai Group"},
        "identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}
      },
      {
        "@context":"https://schema.org","@type":"Organization","@id":"https://faisalorakzai.com#org",
        "name":"Orakzai Group","url":"https://faisalorakzai.com",
        "founder":{"@type":"Person","name":"Faisal Orakzai"}
      },
      {
        "@context":"https://schema.org","@type":"WebPage",
        "name":"Tokenization of Real World Assets (RWA): Complete Guide (2026)",
        "url":"https://faisalorakzai.com/research/rwa-tokenization",
        "description":"Learn how Real World Asset (RWA) tokenization works, including blockchain infrastructure, fractional ownership, smart contracts, compliance, benefits, risks, and enterprise adoption.",
        "author":{"@type":"Person","name":"Faisal Orakzai"},
        "datePublished":"2026-06-30","inLanguage":"en-US",
        "isPartOf":{"@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com"},
        "breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},{"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},{"@type":"ListItem","position":3,"name":"RWA Tokenization","item":"https://faisalorakzai.com/research/rwa-tokenization"}]}
      },
      {
        "@context":"https://schema.org","@type":"WebSite",
        "name":"Faisal Orakzai","url":"https://faisalorakzai.com",
        "description":"Research, blockchain engineering, and enterprise technology by Faisal Orakzai.",
        "potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://faisalorakzai.com/research?q={search_term_string}"},"query-input":"required name=search_term_string"}
      },
      {"@context":"https://schema.org","@type":"Speakable","cssSelector":[".rwa-intro",".rwa-def"]}
    ];
    const existing = document.getElementById("rwa-extra-ld");
    if (existing) existing.remove();
    const el = document.createElement("script");
    el.id = "rwa-extra-ld"; el.type = "application/ld+json";
    el.text = JSON.stringify(schemas);
    document.head.appendChild(el);

    let canon = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://faisalorakzai.com/research/rwa-tokenization";

    return () => { document.getElementById("rwa-extra-ld")?.remove(); };
  }, []);

  const stats = [
    { value:"$16T+",  label:"Addressable Market",  sub:"Estimated RWA tokenization potential by 2030" },
    { value:"$10M",   label:"Minimum → $10",        sub:"Fractional ownership lowers barriers dramatically" },
    { value:"12+",    label:"Industries",            sub:"Real estate, gold, bonds, art, energy & more" },
    { value:"T+0",    label:"Settlement Speed",      sub:"vs T+2 to T+5 in traditional markets" },
  ];

  const lifecycle = [
    { step:1, title:"Asset Selection", desc:"Identify a suitable asset with clear legal ownership, measurable market value, transferable rights, regulatory compliance, and sufficient investor demand." },
    { step:2, title:"Legal Due Diligence", desc:"Verify title ownership, check for encumbrances, debts, legal disputes, and tax compliance. Legal certainty is the foundation of every successful RWA project." },
    { step:3, title:"Asset Valuation", desc:"Independent valuation firms determine current market value, historical performance, income generation capacity, risk profile, and future appreciation potential." },
    { step:4, title:"Ownership Structure", desc:"Create a legal vehicle — Special Purpose Vehicle (SPV), trust, or direct ownership — that legally owns the asset on behalf of token holders." },
    { step:5, title:"Smart Contract Development", desc:"Developers create smart contracts defining total token supply, ownership rules, transfer permissions, dividend distribution, voting rights, and compliance restrictions." },
    { step:6, title:"Token Minting", desc:"The smart contract issues blockchain tokens. Each token represents a defined ownership fraction of the underlying asset and receives a unique immutable blockchain record." },
    { step:7, title:"Investor KYC/AML", desc:"All investors complete Know Your Customer, Anti-Money Laundering, risk assessment, jurisdiction checks, and sanctions screening before purchasing regulated security tokens." },
    { step:8, title:"Primary Token Sale", desc:"Verified investors purchase tokens using bank transfers, stablecoins, or digital assets. Raised funds finance the acquisition, development, or refinancing of the underlying asset." },
    { step:9, title:"Secondary Trading", desc:"After issuance, tokens may be traded on approved digital exchanges. Unlike traditional private investments, investors can potentially exit faster without waiting years." },
    { step:10, title:"Income Distribution & Governance", desc:"Smart contracts automatically distribute rental income, bond yields, or dividends proportionally to all token holders. Governance tokens allow voting on major asset decisions." },
  ];

  const structures = [
    { name:"Special Purpose Vehicle (SPV)", desc:"The physical asset is transferred into a legally established company (SPV). The SPV becomes the legal owner. Investors own shares in the SPV through blockchain tokens. Provides legal clarity, investor protection, and simplified compliance.", col:"#60a5fa" },
    { name:"Trust Structure", desc:"Assets are placed inside a trust. The trustee legally manages the asset. Blockchain tokens represent beneficial ownership. Common in investment funds and wealth management structures.", col:G },
    { name:"Direct Ownership", desc:"In some jurisdictions, blockchain records may directly represent legal ownership. This model is still developing globally and requires strong legal recognition of digital asset ownership.", col:"#4ade80" },
  ];

  const benefits = [
    { n:"01", title:"Fractional Ownership", desc:"A $20M commercial building divided into 20M tokens — each worth $1. A university student can now invest $50 instead of needing millions.", col:"#60a5fa" },
    { n:"02", title:"Increased Liquidity", desc:"Tokenized assets can potentially be traded on compliant digital marketplaces much faster than traditional real estate which takes weeks or months to sell.", col:G },
    { n:"03", title:"Global Investment Access", desc:"Eligible investors from Pakistan can access real estate in Europe, infrastructure in Singapore, or renewable energy in Canada — where regulations permit.", col:"#4ade80" },
    { n:"04", title:"Lower Entry Barrier", desc:"Traditional commercial property minimum: $500,000+. With tokenization: minimum investments may start at $10–$100 depending on platform structure.", col:"#e879f9" },
    { n:"05", title:"Faster Settlement", desc:"Traditional settlement: T+2 to T+5 days or longer. Blockchain transactions settle near instantly, reducing counterparty risk and improving cash flow.", col:"#f87171" },
    { n:"06", title:"Transparency", desc:"Every transaction is recorded on the blockchain. Investors can verify ownership transfers, transaction history, issuance records, and smart contract activity anytime.", col:"#34d399" },
    { n:"07", title:"Reduced Paperwork", desc:"Smart contracts digitize much of the transfer workflow — ownership, distribution, and compliance — while legal documentation remains important where required.", col:"#fbbf24" },
    { n:"08", title:"Automated Compliance", desc:"Modern tokenization platforms integrate KYC, AML, transfer restrictions, jurisdiction rules, and investor eligibility directly into smart contract logic.", col:"#a78bfa" },
    { n:"09", title:"Lower Transaction Costs", desc:"By streamlining functions of banks, brokers, custodians, registrars, and settlement agents, blockchain can reduce operational costs significantly.", col:"#60a5fa" },
    { n:"10", title:"24/7 Availability", desc:"Traditional exchanges operate during business hours. Blockchain networks operate continuously, enabling trading across all time zones without waiting for market open.", col:G },
  ];

  const challenges = [
    { title:"Legal Ownership Bridge", desc:"The hardest challenge: ensuring blockchain ownership represents actual legal ownership. Without a legal structure (SPV, trust, or custodian), tokens may have little real-world value." },
    { title:"Regulatory Complexity", desc:"Every country classifies tokenized assets differently — securities, investment contracts, digital commodities, or property rights — requiring jurisdiction-specific KYC, AML, and tax compliance." },
    { title:"Asset Valuation Accuracy", desc:"Physical assets change value constantly. Platforms require trusted professional appraisers, financial auditors, and market price oracle networks to maintain accurate token pricing." },
    { title:"Liquidity Is Not Automatic", desc:"Tokenization creates the potential for liquidity, but liquidity requires active buyers, sellers, licensed exchanges, market makers, and institutional confidence — not just token creation." },
    { title:"Security Risks", desc:"RWA platforms face smart contract vulnerabilities, wallet theft, private key loss, exchange hacks, oracle manipulation, identity fraud, and insider attacks — requiring enterprise-grade security." },
  ];

  const industries = [
    { sector:"Real Estate", icon:"🏢", desc:"Apartments, office towers, hotels, shopping malls, warehouses, farmland, industrial parks — fractional ownership, easier capital raising, broader investor access.", col:"#60a5fa" },
    { sector:"Precious Metals", icon:"🥇", desc:"Gold, silver, platinum — digital ownership records, simplified transfers, fractional holdings, transparent on-chain asset tracking.", col:G },
    { sector:"Fine Art", icon:"🎨", desc:"High-value artworks divided into digital ownership interests where legally structured — multiple investors participating in premium collections.", col:"#e879f9" },
    { sector:"Infrastructure", icon:"🌉", desc:"Highways, airports, ports, bridges, renewable energy facilities — large projects raising capital through tokenized investment structures.", col:"#4ade80" },
    { sector:"Government Bonds", icon:"📜", desc:"Several governments and financial institutions exploring blockchain-based bond issuance for faster settlement, improved transparency, and streamlined operations.", col:"#f87171" },
    { sector:"Renewable Energy", icon:"⚡", desc:"Solar farms, wind farms, battery storage, hydroelectric plants — investors financing clean-energy projects through compliant tokenized offerings.", col:"#34d399" },
    { sector:"Intellectual Property", icon:"💡", desc:"Music rights, patents, software licenses, film royalties, publishing rights — royalty distribution simplified through programmable smart contracts.", col:"#a78bfa" },
    { sector:"Private Equity", icon:"💼", desc:"Private companies with limited investment access — tokenization improving fundraising efficiency, investor accessibility, and ownership management.", col:G },
    { sector:"Supply Chain Assets", icon:"📦", desc:"Inventory, shipping containers, warehouse receipts, trade finance assets, invoices — improving financing and supply chain asset visibility.", col:"#60a5fa" },
    { sector:"Luxury Collectibles", icon:"⌚", desc:"Luxury watches, rare cars, jewelry, vintage collections, premium handbags, rare wines — tokenization improving ownership tracking and market access.", col:"#fbbf24" },
    { sector:"Agriculture", icon:"🌾", desc:"Farmland, crops, agricultural equipment, irrigation infrastructure — blockchain improving traceability while tokenization broadens investment participation.", col:"#4ade80" },
    { sector:"Healthcare Assets", icon:"🏥", desc:"Medical equipment financing, research funding, pharmaceutical supply chains — blockchain enhancing transparency and traceability in healthcare finance.", col:"#e879f9" },
  ];

  const trends = [
    { title:"AI + RWA Automation", desc:"AI systems may automate asset valuation, risk assessment, fraud detection, compliance monitoring, and portfolio optimization — making RWA platforms smarter and faster." },
    { title:"Cross-Chain Tokenization", desc:"Assets will increasingly move across multiple blockchain ecosystems through secure interoperability protocols, improving liquidity and global market access simultaneously." },
    { title:"24/7 Global Markets", desc:"Unlike traditional exchanges with fixed trading hours, tokenized assets can potentially be traded continuously, enabling more efficient global capital markets." },
    { title:"Fractional Ownership at Scale", desc:"High-value assets — commercial real estate, infrastructure, fine art, private equity — becoming accessible to a much broader investor base through fractional digital ownership." },
    { title:"Institutional Blockchain Infrastructure", desc:"The next phase of blockchain is driven less by speculation and more by enterprise infrastructure: tokenized funds, digital bonds, trade finance, carbon credits, digital invoices." },
  ];

  const faqs = [
    { q:"What is a Real World Asset (RWA)?", a:"A Real World Asset (RWA) is any physical or legally recognized asset that exists outside the blockchain ecosystem but can be represented digitally through tokenization. Examples include real estate, gold, government bonds, artwork, luxury watches, vehicles, intellectual property, and carbon credits." },
    { q:"What is RWA Tokenization?", a:"RWA Tokenization is the process of converting ownership rights of a physical asset into blockchain-based digital tokens. Instead of selling an entire property or bond, ownership can be divided into thousands or millions of blockchain tokens that can be transferred, traded, or managed digitally." },
    { q:"Why is RWA important?", a:"Traditional assets are expensive, illiquid, geographically restricted, slow to settle, and dependent on intermediaries. Tokenization solves many of these challenges by enabling fractional ownership, faster settlement, greater transparency, improved liquidity, and global investor accessibility." },
    { q:"Are RWAs cryptocurrencies?", a:"No. Cryptocurrencies such as Bitcoin are native digital assets with no physical backing. RWAs represent ownership or economic rights linked to existing physical or financial assets that already have real-world value." },
    { q:"Can real estate really be tokenized?", a:"Yes. Commercial buildings, residential projects, land, hotels, warehouses, and rental properties can all be tokenized, provided the legal ownership structure is properly established and complies with local laws and regulations." },
    { q:"Are tokenized assets legally recognized?", a:"Recognition depends on the jurisdiction. Many countries are actively developing regulations for tokenized securities, digital asset custody, and blockchain-based ownership records. Investors and issuers should always ensure compliance with applicable laws." },
    { q:"Which industries will benefit the most?", a:"Major industries include Real Estate, Banking, Investment Management, Insurance, Supply Chain, Healthcare, Energy, Agriculture, Luxury Goods, Government Services, Infrastructure Finance, and Capital Markets." },
    { q:"Is RWA the future of finance?", a:"Many financial institutions believe tokenization can modernize capital markets by improving efficiency, transparency, and accessibility. While adoption is growing, the pace and scale will depend on technology maturity, regulation, and market acceptance." },
  ];

  const myths = [
    { myth:"Tokenization converts physical objects into digital assets", reality:"The physical asset remains completely unchanged. Only the method of recording ownership changes — from paper deeds and centralized databases to blockchain tokens." },
    { myth:"RWA tokens are the same as cryptocurrencies", reality:"RWA tokens represent real-world ownership rights backed by physical or financial assets. Cryptocurrencies are native digital assets with no underlying physical backing." },
    { myth:"Tokenization automatically provides liquidity", reality:"Liquidity requires active buyers, sellers, licensed exchanges, market makers, and investor confidence — not just token creation. Infrastructure matters more than tokens." },
    { myth:"RWA tokenization eliminates all intermediaries", reality:"Legal structures, custodians, compliance officers, valuation professionals, and regulators remain essential. Tokenization reduces unnecessary intermediaries, not all of them." },
    { myth:"Any asset can be tokenized immediately", reality:"Assets need clear legal ownership, regulatory approval, professional valuation, and proper legal structures. Due diligence is the foundation of every legitimate RWA project." },
  ];

  const takeaways = [
    "Real World Assets (RWAs) are physical or legally recognized assets represented digitally on a blockchain through a structured tokenization process.",
    "Tokenization enables fractional ownership — investors participate with $10 or $100 instead of millions — democratizing access to premium asset classes globally.",
    "Smart contracts automate ownership transfers, income distribution, compliance enforcement, governance voting, and secondary market trading.",
    "Blockchain increases transparency, security, and auditability — every transaction is permanently and publicly recorded on the immutable ledger.",
    "Regulatory compliance, legal frameworks, professional custody, reliable oracles, and independent valuation remain essential for successful RWA implementation.",
    "RWA tokenization is an evolution of financial infrastructure — modernizing how ownership is recorded, transferred, and managed rather than replacing traditional finance.",
  ];

  const internalLinks = [
    { title:"What is Blockchain? A Complete Beginner's Guide", slug:"blockchain-basic", desc:"The foundational primer — how blockchain works, its history, and core concepts." },
    { title:"Blockchain Infrastructure Explained", slug:"blockchain-infra", desc:"Nodes, validators, RPC, consensus, Layer-2, and the full technical foundation." },
    { title:"Public vs Private vs Consortium Blockchains", slug:"blockchain-types", desc:"Enterprise decision framework for choosing the right blockchain architecture." },
    { title:"How Smart Contracts Work", slug:"smart-contracts", desc:"The automation layer that powers RWA tokenization — complete beginner to advanced guide." },
  ];

  return (
    <div>
      {/* ── Intro ── */}
      <div id="intro" data-section="intro">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {stats.map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08*i }}
              style={{ background:"#000", padding:"1.25rem 1.5rem", display:"flex", flexDirection:"column", gap:"4px" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(1.3rem,3.5vw,1.9rem)", color:G }}>{s.value}</div>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", color:"rgba(255,255,255,0.55)", textTransform:"uppercase" }}>{s.label}</div>
              <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.25)", lineHeight:1.4 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <h2 style={h2Style}>Introduction</h2>
        <p style={pSt} className="rwa-intro">Throughout history, ownership of valuable assets has been recorded using physical documents, centralized databases, banks, government registries, and financial institutions. Buying a house, investing in gold, purchasing company shares, or owning fine art — all of it has relied on centralized systems that are often slow, expensive, fragmented, and geographically limited.</p>
        <p style={pSt}>The emergence of blockchain technology has introduced a new paradigm. Instead of relying on paper records or isolated databases, ownership rights can now be digitally represented through blockchain-based tokens. This transformation is known as <strong style={{ color:"rgba(255,255,255,0.92)" }}>Real World Asset (RWA) Tokenization</strong>.</p>

        <div className="rwa-def" style={{ border:`1px solid rgba(243,186,47,0.3)`, background:"rgba(243,186,47,0.04)", padding:"1.5rem 1.75rem", marginBottom:"2.5rem", borderRadius:"2px" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.38em", color:G, textTransform:"uppercase", marginBottom:"10px" }}>Definition</div>
          <p style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.05rem,2.6vw,1.3rem)", color:"rgba(255,255,255,0.92)", lineHeight:1.6, margin:0 }}>RWA tokenization bridges the gap between traditional finance and decentralized finance (DeFi), enabling physical and financial assets to be represented as secure digital tokens on a blockchain.</p>
        </div>

        {/* Traditional vs Tokenized comparison */}
        <h2 style={h2Style}>Traditional Ownership vs Tokenized Ownership</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {[
            ["Paper title deeds & government registries","Blockchain token representing ownership"],
            ["Lawyers, banks, brokers, notaries required","Smart contract automates transfers"],
            ["Weeks or months to settle","Near-instant digital settlement"],
            ["Minimum investment: hundreds of thousands","Minimum investment: $10–$100"],
            ["Geographically restricted","Globally accessible where regulations permit"],
            ["Opaque transaction records","Transparent, auditable blockchain ledger"],
            ["Manual compliance & reporting","Automated compliance via smart contracts"],
          ].map(([trad,token],i) => (
            <React.Fragment key={i}>
              <div style={{ background:"rgba(239,68,68,0.04)", padding:"0.85rem 1.1rem", borderBottom:i<6?"1px solid rgba(255,255,255,0.04)":"none", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
                {i===0 && <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.55)", marginBottom:"8px", textTransform:"uppercase" }}>Traditional Ownership</div>}
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.55)", lineHeight:1.6, margin:0 }}>{trad}</p>
              </div>
              <div style={{ background:"rgba(74,222,128,0.03)", padding:"0.85rem 1.1rem", borderBottom:i<6?"1px solid rgba(255,255,255,0.04)":"none" }}>
                {i===0 && <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.6)", marginBottom:"8px", textTransform:"uppercase" }}>Tokenized Ownership</div>}
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.65)", lineHeight:1.6, margin:0 }}>{token}</p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* What is Tokenization */}
        <h2 style={h2Style}>What is Tokenization?</h2>
        <p style={pSt}>Tokenization is the process of converting ownership rights of a real-world asset into blockchain-based digital tokens. Think of a token as a <em style={{ color:"rgba(255,255,255,0.82)" }}>digital certificate</em> representing ownership, entitlement, or participation in an underlying asset.</p>
        <p style={pSt}>The physical asset remains exactly where it is. What changes is the <strong style={{ color:"rgba(255,255,255,0.9)" }}>method of recording ownership</strong>. A commercial building still exists physically — but ownership is now digitally programmable.</p>

        {/* Simple example */}
        <div style={{ border:`1px solid rgba(243,186,47,0.15)`, background:"rgba(243,186,47,0.03)", padding:"1.5rem 1.75rem", marginBottom:"3rem", borderRadius:"2px" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:G, textTransform:"uppercase", marginBottom:"14px" }}>Simple Example</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:"1rem", alignItems:"center" }}>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", color:"rgba(239,68,68,0.7)", marginBottom:"8px", textTransform:"uppercase" }}>Traditional</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.45)", lineHeight:1.7, margin:0 }}>A $10M commercial building — only one wealthy investor or institution can purchase the entire property.</p>
            </div>
            <div style={{ color:G, fontSize:"20px", fontWeight:700 }}>→</div>
            <div>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", color:"rgba(74,222,128,0.7)", marginBottom:"8px", textTransform:"uppercase" }}>Tokenized</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.65)", lineHeight:1.7, margin:0 }}>Divided into 10 million tokens (each = $1). Anyone can invest $10, $100, $1,000 — democratizing the asset completely.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Architecture & Lifecycle ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>The 10-Step Tokenization Process</h2>
        <p style={pSt}>RWA tokenization is much more than creating blockchain tokens. It is a structured process involving legal ownership, compliance, valuation, blockchain infrastructure, and ongoing asset management.</p>

        <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"0", marginBottom:"3rem" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px", paddingRight:"1.5rem", borderRight:`1px solid rgba(243,186,47,0.1)` }}>
            {lifecycle.map((s,i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                style={{ display:"flex", alignItems:"center", gap:"10px", padding:"9px 12px", background: activeStep===i ? "rgba(243,186,47,0.06)" : "transparent", border:`1px solid ${activeStep===i?"rgba(243,186,47,0.25)":"transparent"}`, cursor:"pointer", textAlign:"left", transition:"all 0.18s" }}>
                <div style={{ width:"20px", height:"20px", borderRadius:"50%", background: activeStep===i ? G : "rgba(243,186,47,0.1)", border:`1px solid ${activeStep===i ? G : "rgba(243,186,47,0.2)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"8px", color: activeStep===i ? "#000" : G, flexShrink:0, fontWeight:700 }}>{s.step}</div>
                <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color: activeStep===i ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.28)", whiteSpace:"nowrap" }}>{s.title}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-8 }} transition={{ duration:0.2 }}
              style={{ paddingLeft:"1.75rem", paddingTop:"0.5rem" }}>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.35em", color:G, textTransform:"uppercase", marginBottom:"12px" }}>Step {lifecycle[activeStep].step} of 10</div>
              <h4 style={{ ...h4Style, color:G, marginTop:0 }}>{lifecycle[activeStep].title}</h4>
              <p style={{ ...pSt, fontSize:"clamp(0.95rem,2.2vw,1.1rem)" }}>{lifecycle[activeStep].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Legal Ownership Structures */}
        <h3 style={h3Style}>Legal Ownership Structures</h3>
        <p style={pSt}>One of the most important decisions in RWA tokenization is creating the legal structure behind the tokens. Without a legal bridge between the blockchain record and physical ownership, tokens have no real-world value.</p>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {structures.map((s,i) => (
            <button key={i} onClick={() => setActiveStructure(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.15em", padding:"5px 14px", border:`1px solid ${activeStructure===i ? s.col : "rgba(255,255,255,0.1)"}`, color: activeStructure===i ? s.col : "rgba(255,255,255,0.3)", background: activeStructure===i ? `${s.col}11` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{s.name.split(" (")[0]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeStructure} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${structures[activeStructure].col}33`, background:`${structures[activeStructure].col}08`, padding:"1.25rem 1.5rem", marginBottom:"3rem", borderRadius:"2px" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"15px", color:structures[activeStructure].col, marginBottom:"8px" }}>{structures[activeStructure].name}</div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.08rem)", color:"rgba(255,255,255,0.65)", lineHeight:1.8, margin:0 }}>{structures[activeStructure].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Token Standards */}
        <h3 style={h3Style}>Token Standards for RWA</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {[
            { type:"Fungible Tokens", std:"ERC-20 / SPL / BEP-20", use:"Stablecoins, investment shares, commodity tokens — interchangeable units where each token is identical.", col:"#60a5fa" },
            { type:"Non-Fungible (NFTs)", std:"ERC-721 / ERC-1155", use:"Real estate deeds, luxury collectibles, fine art, intellectual property — each token represents a unique asset.", col:G },
            { type:"Security Tokens", std:"ERC-3643 / ERC-1400", use:"Regulated financial assets with investor whitelists, compliance rules, transfer restrictions, and ownership permissions.", col:"#4ade80" },
          ].map((t,i) => (
            <div key={i} style={{ background:"#000", padding:"1.25rem" }}>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", color:t.col, textTransform:"uppercase", marginBottom:"8px" }}>{t.type}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"13px", color:"rgba(255,255,255,0.85)", marginBottom:"6px" }}>{t.std}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.35)", lineHeight:1.6, margin:0 }}>{t.use}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Benefits ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>10 Core Benefits of RWA Tokenization</h2>
        <p style={pSt}>RWA tokenization fundamentally changes how assets are owned, transferred, financed, traded, and managed. Traditional financial markets built decades ago rely heavily on intermediaries, paperwork, banking hours, and manual verification. Blockchain removes many of these inefficiencies.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {benefits.map((b,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.25rem", display:"flex", flexDirection:"column", gap:"8px", transition:"background 0.18s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ fontFamily:"monospace", fontWeight:700, fontSize:"11px", color:b.col, background:`${b.col}15`, padding:"2px 8px", borderRadius:"2px", flexShrink:0 }}>{b.n}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"14px", color:"rgba(255,255,255,0.9)" }}>{b.title}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.35)", lineHeight:1.6, margin:0 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Limitations ── */}
      <div id="limitations" data-section="limitations">
        <h2 style={h2Style}>Challenges & Risks</h2>
        <p style={pSt}>While RWA tokenization has enormous potential, implementing it correctly is far more complex than creating digital tokens. The biggest challenge is connecting legal ownership in the physical world with ownership recorded on a blockchain.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"2.5rem" }}>
          {challenges.map((c,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.08*i }}
              style={{ background:"#000", padding:"1.25rem 1.5rem", display:"flex", gap:"16px", alignItems:"flex-start" }}>
              <div style={{ minWidth:"28px", height:"28px", borderRadius:"50%", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"10px", color:"#f87171", flexShrink:0, marginTop:"1px" }}>{i+1}</div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"15px", color:"rgba(255,255,255,0.88)", marginBottom:"6px" }}>{c.title}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.65, margin:0 }}>{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance & Custody */}
        <h3 style={h3Style}>Identity, Compliance & Custody Requirements</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          <div style={{ background:"#000", padding:"1.25rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.25em", color:G, textTransform:"uppercase", marginBottom:"12px" }}>Investor KYC/AML Checklist</div>
            {["Government ID verification","Facial recognition","Address verification","Risk assessment","Source of funds declaration","AML screening","Politically Exposed Person (PEP) checks","Sanctions screening","Jurisdiction eligibility","Investor accreditation status"].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:"8px", alignItems:"center", padding:"5px 0", borderBottom:i<9?"1px solid rgba(255,255,255,0.04)":"none" }}>
                <span style={{ color:"#4ade80", fontSize:"9px", flexShrink:0 }}>✓</span>
                <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"#000", padding:"1.25rem", borderLeft:"1px solid rgba(243,186,47,0.08)" }}>
            <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.25em", color:"#60a5fa", textTransform:"uppercase", marginBottom:"12px" }}>Institutional Custody Features</div>
            {["Insurance coverage","Cold storage vaults","Multi-party authorization","Key sharding technology","Hardware Security Modules (HSM)","Multi-signature wallets","Continuous auditing","Penetration testing","Bug bounty programs","Disaster recovery protocols"].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:"8px", alignItems:"center", padding:"5px 0", borderBottom:i<9?"1px solid rgba(255,255,255,0.04)":"none" }}>
                <span style={{ color:"#60a5fa", fontSize:"9px", flexShrink:0 }}>◆</span>
                <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Industries ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>12+ Industries Being Tokenized</h2>
        <p style={pSt}>RWA is expanding far beyond real estate. Almost any asset with identifiable ownership and legal rights can potentially be tokenized. Here are the major industries actively exploring or implementing tokenization today.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {industries.map((ind,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.2rem", transition:"background 0.18s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                <span style={{ fontSize:"20px" }}>{ind.icon}</span>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:"rgba(255,255,255,0.88)", flex:1 }}>{ind.sector}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.32)", lineHeight:1.6, margin:0 }}>{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Trends ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>Enterprise Adoption & Emerging Trends</h2>
        <p style={pSt}>Large organizations are moving cautiously but steadily toward tokenized financial infrastructure. Financial institutions see benefits including faster settlement, lower operational costs, improved transparency, better auditability, and global capital access.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {trends.map((t,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.08*i }}
              style={{ background:"#000", padding:"1.25rem 1.5rem", display:"flex", gap:"16px", alignItems:"flex-start" }}>
              <div style={{ minWidth:"26px", height:"26px", borderRadius:"2px", background:"rgba(243,186,47,0.08)", border:`1px solid rgba(243,186,47,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0, marginTop:"2px" }}>{String(i+1).padStart(2,"0")}</div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"15px", color:G, marginBottom:"6px" }}>{t.title}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.65, margin:0 }}>{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Future ── */}
      <div id="future" data-section="future">
        <h2 style={h2Style}>The Future of RWA Tokenization</h2>
        <div style={{ border:`1px solid rgba(243,186,47,0.2)`, background:"rgba(243,186,47,0.03)", padding:"1.75rem 2rem", marginBottom:"3rem", borderRadius:"2px" }}>
          <p style={{ ...pSt, margin:"0 0 1rem" }}>RWA tokenization is transforming the relationship between physical assets and digital infrastructure. Many experts believe the tokenized asset market could reach $16 trillion or more by 2030 — representing one of the largest transfers of value onto blockchain infrastructure in history.</p>
          <p style={{ ...pSt, margin:"0 0 1rem" }}>However, success depends on combining blockchain technology with strong legal frameworks, secure custody, reliable oracle data, and robust regulatory compliance. Technology alone is not enough — governance, trust, and legal certainty are equally critical.</p>
          <p style={{ ...pSt, marginBottom:0 }}>Rather than replacing traditional finance, tokenization is increasingly viewed as a way to modernize and enhance existing financial systems — making them more efficient, transparent, accessible, and programmable for the global digital economy.</p>
        </div>

        <h3 style={h3Style}>Continue Reading: The Full Blockchain Series</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {internalLinks.map((lnk,i) => (
            <motion.a key={i} href={`/research/${lnk.slug}`}
              whileHover={{ background:"rgba(243,186,47,0.06)" }}
              style={{ background:"#000", padding:"1rem 1.25rem", display:"flex", alignItems:"center", gap:"14px", textDecoration:"none", transition:"background 0.18s" }}>
              <div style={{ minWidth:"24px", height:"24px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:`1px solid rgba(243,186,47,0.25)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0 }}>→</div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"14.5px", color:"rgba(255,255,255,0.88)", marginBottom:"3px" }}>{lnk.title}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.3)", lineHeight:1.5, margin:0 }}>{lnk.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* ── FAQs ── */}
      <div id="faq" data-section="faq">
        <h2 style={h2Style}>Frequently Asked Questions</h2>
        <div style={{ marginBottom:"2.5rem" }}>
          {faqs.map((f,i) => (
            <div key={i} style={{ borderBottom:"1px solid rgba(243,186,47,0.08)", overflow:"hidden" }}>
              <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                style={{ width:"100%", textAlign:"left", padding:"1rem 0", background:"transparent", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0 }}>{i+1}</div>
                <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"clamp(0.95rem,2.2vw,1.05rem)", color:openFaq===i?G:"rgba(255,255,255,0.82)", flex:1, textAlign:"left", lineHeight:1.4 }}>{f.q}</span>
                <span style={{ color:G, opacity:0.5, fontSize:"12px", flexShrink:0, fontFamily:"monospace" }}>{openFaq===i?"▲":"▼"}</span>
              </button>
              <AnimatePresence>
                {openFaq===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:"hidden" }}>
                    <div style={{ paddingBottom:"1rem", paddingLeft:"34px" }}>
                      <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.08rem)", color:"rgba(255,255,255,0.58)", lineHeight:1.8, margin:0 }}>{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* ── Myths ── */}
      <div id="myths" data-section="myths">
        <h2 style={h2Style}>Common Myths vs Reality</h2>
        <div style={{ display:"grid", gap:"12px", marginBottom:"3rem" }}>
          {myths.map((m,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.06*i }}
              style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0", border:"1px solid rgba(243,186,47,0.1)", borderRadius:"4px", overflow:"hidden" }}>
              <div style={{ padding:"1rem 1.25rem", background:"rgba(239,68,68,0.04)" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.5)", marginBottom:"6px" }}>MYTH</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.55)", lineHeight:1.6, margin:0 }}>{m.myth}</p>
              </div>
              <div style={{ padding:"1rem 1.25rem", background:"rgba(74,222,128,0.03)", borderLeft:"1px solid rgba(74,222,128,0.1)" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.6)", marginBottom:"6px" }}>REALITY</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.6)", lineHeight:1.6, margin:0 }}>{m.reality}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Key Takeaways ── */}
      <div id="takeaways" data-section="takeaways">
        <div style={{ border:`1px solid rgba(243,186,47,0.18)`, borderRadius:"4px", overflow:"hidden" }}>
          <div style={{ padding:"1rem 1.25rem", borderBottom:"1px solid rgba(243,186,47,0.12)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.5)", textTransform:"uppercase" }}>KEY TAKEAWAYS</div>
          {takeaways.map((t,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.07*i }}
              style={{ display:"flex", gap:"16px", alignItems:"flex-start", padding:"14px 18px", borderBottom:i<takeaways.length-1?"1px solid rgba(243,186,47,0.06)":"none", background:i%2===0?"rgba(243,186,47,0.02)":"#000" }}>
              <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0, marginTop:"1px" }}>{i+1}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"13.5px", color:"rgba(255,255,255,0.62)", lineHeight:1.65, margin:0 }}>{t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Smart Contracts Visual Article ────────────────────────────────────── */
