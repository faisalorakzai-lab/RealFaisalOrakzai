import React from "react";

export default function BlockchainTypesVisual() {
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const GD = "rgba(243,186,47,0.05)";
  const [activeType, setActiveType] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);
  const [decisionStep, setDecisionStep] = React.useState(0);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };

  const stats = [
    { value:"1,000+", label:"Public Chains",   sub:"Active public blockchain networks" },
    { value:"$2T+",   label:"Public Market",   sub:"Total public blockchain market cap" },
    { value:"500+",   label:"Enterprise Nets", sub:"Private & consortium deployments" },
    { value:"4",      label:"Core Models",     sub:"Public · Private · Consortium · Hybrid" },
  ];

  const types = [
    {
      name:"Public", icon:"⬡", col:"#60a5fa",
      tagline:"Open to the World",
      permission:"Permissionless",
      governance:"Community-driven",
      speed:"Moderate (7–65,000 TPS)",
      privacy:"Low — all data visible",
      decentralisation:"Maximum",
      examples:["Bitcoin","Ethereum","Solana","Cardano","Avalanche"],
      bestFor:"Cryptocurrencies, DeFi, NFTs, DAOs, Web3 applications, global payments",
      desc:"A Public Blockchain is an open, permissionless network where anyone in the world can participate without approval from any central authority. No company, government, or individual owns it. Thousands of independent participants collectively maintain and secure the network through decentralised consensus. The transaction history is permanently visible and independently verifiable by any participant on earth.",
      pros:["Maximum transparency & auditability","True decentralisation — no single point of control","Global accessibility — no registration required","Highest censorship resistance","Community governance — no central authority"],
      cons:["Lower transaction throughput","Higher fees during peak demand","Public data visibility — unsuitable for sensitive data","Complex governance — changes require community consensus","Smart contract vulnerability risk"],
      industries:["Cryptocurrency","DeFi","NFTs","Web3","Gaming","Creator Economy","DAOs"],
    },
    {
      name:"Private", icon:"◉", col:G,
      tagline:"Controlled Access",
      permission:"Permissioned (one org)",
      governance:"Single organisation",
      speed:"Very High (1,000–100,000 TPS)",
      privacy:"High — restricted access",
      decentralisation:"Limited",
      examples:["Hyperledger Fabric","Corda","Quorum","MultiChain"],
      bestFor:"Internal banking, healthcare records, enterprise ERP, government databases, manufacturing",
      desc:"A Private Blockchain is a permissioned blockchain controlled by a single organisation. Only authorised users can join, read data, submit transactions, and operate nodes. Private blockchains prioritise performance, confidentiality, compliance, and operational efficiency over complete decentralisation. Since only trusted participants validate transactions, they achieve significantly higher speeds and lower costs than public networks.",
      pros:["Very high transaction throughput","Strong data privacy","Lower operating costs","Easy regulatory compliance (KYC, AML, GDPR)","Fast upgrades without community consensus"],
      cons:["Reduced decentralisation — one org controls governance","Requires trusting the managing organisation","Single point of governance failure","External parties cannot independently verify data","Less transparent than public alternatives"],
      industries:["Banking","Healthcare","Insurance","Government","Manufacturing","Legal","Corporate ERP"],
    },
    {
      name:"Consortium", icon:"◈", col:"#4ade80",
      tagline:"Shared Governance",
      permission:"Permissioned (multi-org)",
      governance:"Multiple organisations",
      speed:"High (1,000–10,000 TPS)",
      privacy:"Medium — selective sharing",
      decentralisation:"Moderate to High",
      examples:["R3 Corda (Banking)","Marco Polo (Trade)","TradeLens (Shipping)","We.Trade"],
      bestFor:"International banking, supply chains, trade finance, healthcare networks, energy trading",
      desc:"A Consortium Blockchain — also called a Federated Blockchain — combines characteristics of both public and private blockchains. Instead of one organisation controlling the network, governance is shared among multiple trusted organisations. Each participant operates validator nodes and collectively manages the network. This model is ideal for industries where multiple organisations need to collaborate securely without giving any single party complete control.",
      pros:["Shared trust — no single organisation dominates","Better security than single-company systems","Excellent scalability with known validators","Ideal for multi-party business collaboration","Shared costs reduce individual operational burden"],
      cons:["Complex governance requiring multi-party coordination","Slower decision-making — negotiation required","Membership management adds overhead","Consortium members must maintain ongoing participation","Harder to achieve truly open public access"],
      industries:["International Banking","Supply Chain","Trade Finance","Shipping","Energy","Healthcare Networks","Government Collaboration"],
    },
    {
      name:"Hybrid", icon:"◎", col:"#e879f9",
      tagline:"Best of Both Worlds",
      permission:"Configurable",
      governance:"Flexible",
      speed:"High — depends on config",
      privacy:"Configurable — high where needed",
      decentralisation:"Selective",
      examples:["Dragonchain","XinFin (XDC)","IBM Blockchain Platform","Polygon CDK"],
      bestFor:"Enterprises needing both privacy and public verification — RWA, financial settlements, regulated DeFi",
      desc:"A Hybrid Blockchain combines private infrastructure for confidential operations with public blockchain anchoring for transparency and verification. Sensitive data stays on a private or consortium chain; cryptographic proofs, hashes, or asset ownership records are anchored to a public chain. This architecture is expected to become the dominant enterprise model — enabling privacy, global verification, regulatory compliance, and scalability simultaneously.",
      pros:["Selective transparency — private data stays private","Public verification for trust-critical records","Regulatory compliance with public auditability","Combines speed of private with security of public","Most flexible architecture for complex enterprise needs"],
      cons:["Most complex to architect and maintain","Higher development costs","Requires expertise in both private and public chain tech","Integration complexity between layers","Security depends on both chain configurations"],
      industries:["RWA Tokenisation","Regulated DeFi","Trade Settlement","Digital Identity","Government + Public Verification","Healthcare + Patient Consent"],
    },
  ];

  const comparisonRows = [
    { feature:"Access Control", vals:["Anyone","Authorised only","Authorised orgs","Configurable"] },
    { feature:"Governance",     vals:["Community","Single org","Multi-org","Flexible"] },
    { feature:"Transparency",   vals:["Very High","Low","Medium","Selective"] },
    { feature:"Speed (TPS)",    vals:["Moderate","Very High","High","High"] },
    { feature:"Privacy",        vals:["Low","High","High","Configurable"] },
    { feature:"Decentralisation",vals:["Maximum","Limited","Moderate","Selective"] },
    { feature:"Operating Cost", vals:["Gas fees","Org-funded","Shared","Mixed"] },
    { feature:"Compliance",     vals:["Challenging","Easy","Good","Excellent"] },
  ];

  const decisionQuestions = [
    { q:"Who should access the network?", opts:["Anyone worldwide → Public","Only employees/users → Private","Multiple organisations → Consortium","Both public & private needs → Hybrid"] },
    { q:"How important is data privacy?", opts:["Transparency is essential → Public","Full confidentiality needed → Private","Selective sharing required → Consortium","Configurable privacy levels → Hybrid"] },
    { q:"Who controls governance?", opts:["Global community → Public","Single organisation → Private","Shared among partners → Consortium","Flexible governance needed → Hybrid"] },
    { q:"What is the performance requirement?", opts:["Decentralisation > Speed → Public","Maximum throughput → Private","High speed + multi-org → Consortium","Best-fit by layer → Hybrid"] },
  ];

  const industries = [
    { sector:"Cryptocurrency",      type:"Public",      col:"#60a5fa", why:"Open participation, global access, censorship resistance are non-negotiable" },
    { sector:"DeFi",                type:"Public",      col:"#60a5fa", why:"Anyone with a wallet should be able to borrow, lend, or trade without a bank account" },
    { sector:"NFTs & Gaming",       type:"Public",      col:"#60a5fa", why:"Digital ownership must be independently verifiable by anyone, anywhere" },
    { sector:"Banking Ops",         type:"Private",     col:G,         why:"Confidential customer data, regulatory compliance, and settlement speed are paramount" },
    { sector:"Healthcare Records",  type:"Private",     col:G,         why:"Patient data requires strict access control and HIPAA/GDPR compliance" },
    { sector:"Government DBs",      type:"Private",     col:G,         why:"National data requires administrative control and strict identity management" },
    { sector:"Supply Chain",        type:"Consortium",  col:"#4ade80", why:"Multiple companies (manufacturers, logistics, customs) must share data without ceding control" },
    { sector:"International Banking",type:"Consortium", col:"#4ade80", why:"Multiple banks need shared settlement without trusting one bank to control the network" },
    { sector:"Trade Finance",       type:"Consortium",  col:"#4ade80", why:"Importers, exporters, banks, and insurers collaborate on shared documentation" },
    { sector:"RWA Tokenisation",    type:"Hybrid",      col:"#e879f9", why:"Asset details stay private; token ownership is verifiable publicly on-chain" },
    { sector:"Regulated DeFi",      type:"Hybrid",      col:"#e879f9", why:"Compliance data stays private while DeFi mechanics run on public infrastructure" },
    { sector:"Digital Identity",    type:"Hybrid",      col:"#e879f9", why:"Identity data is private; credential verification is publicly anchored" },
  ];

  const myths = [
    { myth:"Public blockchain is always better", reality:"Public blockchains excel in openness but are not ideal for confidential enterprise operations — governance complexity and data visibility make them unsuitable for many regulated industries." },
    { myth:"Private blockchain is not real blockchain", reality:"Private blockchains still use distributed ledgers, cryptography, digital signatures, and consensus mechanisms. The primary difference is governance and permissions — not the technology itself." },
    { myth:"Consortium blockchain is rare", reality:"Many of the world's largest blockchain deployments are consortium-based — R3 Corda, TradeLens, We.Trade, and Marco Polo all involve multiple major financial institutions operating shared validator infrastructure." },
    { myth:"Public blockchain has no security", reality:"Large public networks (Bitcoin, Ethereum) are among the most secure distributed systems ever built. Attacking them requires more capital than most nation-state budgets. Most 'blockchain hacks' target user wallets or smart contracts — not the chain itself." },
    { myth:"One blockchain solves every problem", reality:"Blockchain is a tool — not every business needs decentralisation. Traditional databases remain better for many applications where distributed trust provides no additional value." },
  ];

  const faqs = [
    { q:"What is the main difference between public and private blockchains?", a:"A public blockchain is open to anyone — no permission required to join, read, or transact. A private blockchain restricts access to authorised participants only, controlled by one organisation. Public blockchains maximise decentralisation and transparency; private blockchains maximise performance, privacy, and regulatory compliance. The right choice depends entirely on whether your use case requires open participation or controlled access." },
    { q:"What is a consortium blockchain and when should I use it?", a:"A consortium blockchain (also called federated blockchain) is a permissioned network governed by multiple trusted organisations rather than one. Use consortium blockchain when multiple independent companies need to share data, collaborate on processes, or jointly maintain trusted records — without giving any single organisation complete control. International supply chains, banking settlement networks, and cross-border trade finance are typical consortium use cases." },
    { q:"Is a private blockchain truly decentralised?", a:"Not in the same way as public blockchains. A private blockchain is technically distributed across multiple nodes, but governance and access control remain with one organisation. This creates a centralised governance layer even if the data is replicated across multiple servers. True decentralisation — where no single entity controls the network — is a property of public blockchains, not private ones." },
    { q:"What is a hybrid blockchain?", a:"A hybrid blockchain combines private infrastructure for confidential operations with public blockchain anchoring for transparency and verification. Sensitive business data stays on a private or consortium layer; cryptographic proofs, asset records, or hashes are anchored to a public blockchain for independent verification. This approach is increasingly popular for Real World Asset (RWA) tokenisation, regulated financial systems, and enterprise applications that need both privacy and public trust." },
    { q:"Why do banks prefer consortium or private blockchains?", a:"Banks face strict regulatory requirements (KYC, AML, Basel III), handle confidential customer data, and require high transaction throughput. Public blockchains are pseudonymous, slow relative to banking needs, and expose transaction data publicly — all incompatible with banking regulations. Consortium blockchains like R3 Corda allow multiple banks to share settlement infrastructure while maintaining identified participants, regulatory compliance, and the privacy required by financial services regulations globally." },
    { q:"Which blockchain type is best for supply chain management?", a:"Consortium blockchains are generally the best fit for supply chains. Modern supply chains involve multiple independent organisations — manufacturers, logistics providers, customs authorities, warehouses, and retailers — all of whom need to share verified data. A consortium blockchain allows each participant to operate nodes and verify shared data without giving any single company control. TradeLens (Maersk + IBM) and Marco Polo are real-world examples that used consortium architecture for exactly this reason." },
    { q:"Can a business start with a private blockchain and move to consortium later?", a:"Yes — this is actually a common progression. Many organisations start with a private blockchain for internal operations, then expand to a consortium model when they begin collaborating with partners. Well-designed blockchain architectures (using platforms like Hyperledger Fabric or R3 Corda) allow this transition by adding new validator organisations to the governance structure without rebuilding the entire system from scratch." },
    { q:"What are the security risks of each blockchain type?", a:"Public blockchains face risks from smart contract vulnerabilities, user wallet theft, and (theoretically) 51% attacks on smaller networks. Private blockchains face insider threat, administrator misuse, and single-organisation compromise — if the controlling organisation is hacked or goes rogue, the entire chain is compromised. Consortium blockchains distribute this risk across multiple organisations, making insider attacks harder but introducing coordination vulnerabilities if consortium governance breaks down." },
    { q:"Is blockchain always better than a traditional database?", a:"No — this is one of the most common misconceptions. Blockchain is better than a traditional database specifically when: (1) multiple parties who don't fully trust each other need to share data, (2) an immutable audit trail is required, (3) automated enforcement of rules (smart contracts) adds value, or (4) decentralisation and censorship resistance are important. If you only need a fast, efficient single-organisation database, a traditional relational or NoSQL database will outperform any blockchain in speed, cost, and simplicity." },
    { q:"How will public, private, and consortium blockchains evolve by 2030?", a:"The most significant trend is convergence toward interoperable hybrid architectures. Public chains are becoming more scalable through Layer-2 networks and ZK-proofs. Private and consortium chains are increasingly anchoring their proofs to public chains for external verification. Cross-chain protocols (Polkadot, Cosmos IBC, LayerZero) are enabling seamless data flow between all chain types. By 2030, most enterprise blockchain infrastructure is expected to be hybrid — using private or consortium chains for operations and public chains for trust anchoring, creating one interconnected blockchain ecosystem rather than isolated networks." },
  ];

  const typeColors = ["#60a5fa", G, "#4ade80", "#e879f9"];

  return (
    <div style={{ paddingBottom:"4rem" }}>

      {/* ── Stats bar ── */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:"1px", background:GB, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
        {stats.map((s,i) => (
          <div key={i} style={{ padding:"1.4rem 1rem", background:"#000", textAlign:"center" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.4rem,3.5vw,1.9rem)", fontWeight:700, color:G, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", margin:"7px 0 3px" }}>{s.label}</div>
            <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.18)" }}>{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Introduction ── */}
      <div id="intro" data-section="intro">
        <h2 style={h2Style}>Why Different Blockchain Types Exist</h2>
        <p style={pSt}>Many people believe every blockchain is identical because they have heard about Bitcoin or Ethereum. In reality, blockchain networks are designed for fundamentally different purposes. A global cryptocurrency network, an enterprise banking system, and a government digital identity platform all require different levels of transparency, security, governance, and access control.</p>
        <p style={pSt}><strong style={{ color:G }}>Blockchain is not a one-size-fits-all technology.</strong> To understand why, consider three real scenarios: a global cryptocurrency needs to allow anyone on earth to join and transact freely; a multinational bank needs strict privacy and regulatory compliance; and a supply chain shared by dozens of companies needs collaboration without giving any single organisation complete control. One blockchain model cannot satisfy all three requirements simultaneously.</p>
        <p style={pSt}>To solve these fundamentally different challenges, blockchain technology evolved into four major network architectures. Each architecture makes deliberate tradeoffs across five dimensions: <strong style={{ color:G }}>accessibility, governance, transparency, performance,</strong> and <strong style={{ color:G }}>security.</strong> Understanding these tradeoffs is one of the most important decisions any developer, enterprise architect, or policymaker makes when designing a blockchain system.</p>

        <h3 style={h3Style}>Permissionless vs Permissioned Networks</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"2rem", fontFamily:"system-ui,sans-serif", fontSize:"12px" }}>
          <div style={{ background:"rgba(96,165,250,0.04)", padding:"1.25rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(96,165,250,0.8)", marginBottom:"1rem" }}>PERMISSIONLESS</div>
            {["Anyone can join without approval","Read all blockchain data freely","Submit transactions directly","Operate validating nodes","Full protocol participation","Public blockchains only"].map((t,i)=>(
              <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", gap:"8px" }}><span style={{ color:"rgba(96,165,250,0.7)", fontSize:"9px" }}>◆</span>{t}</div>
            ))}
          </div>
          <div style={{ background:"rgba(243,186,47,0.03)", padding:"1.25rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.7)", marginBottom:"1rem" }}>PERMISSIONED</div>
            {["Participation requires prior approval","Administrators control data access","Who can validate transactions","Permission level per participant","Membership is identity-verified","Private & Consortium blockchains"].map((t,i)=>(
              <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.5)", display:"flex", alignItems:"center", gap:"8px" }}><span style={{ color:"rgba(243,186,47,0.7)", fontSize:"9px" }}>◆</span>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Interactive Type Explorer ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>The Four Blockchain Types — Deep Dive</h2>
        <p style={pSt}>Each blockchain architecture makes deliberate design choices that determine where it excels and where it falls short. Understanding these tradeoffs in depth is essential for making the right architectural decision for any blockchain project.</p>

        {/* Type tabs */}
        <div style={{ display:"flex", overflowX:"auto", marginBottom:0 }}>
          {types.map((t,i) => (
            <button key={i} onClick={() => setActiveType(i)}
              style={{ flex:"1 0 auto", minWidth:"80px", padding:"12px 8px", background:activeType===i?"rgba(243,186,47,0.07)":"rgba(255,255,255,0.02)", border:"none", borderBottom:activeType===i?`2px solid ${t.col}`:"2px solid rgba(255,255,255,0.07)", cursor:"pointer", transition:"all 0.2s" }}>
              <div style={{ fontSize:"22px", marginBottom:"4px", opacity:activeType===i?1:0.35 }}>{t.icon}</div>
              <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.2em", color:activeType===i?t.col:"rgba(255,255,255,0.3)", textTransform:"uppercase" }}>{t.name}</div>
              <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"9px", color:"rgba(255,255,255,0.2)", marginTop:"2px" }}>{t.tagline}</div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeType} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.2 }}
            style={{ padding:"1.75rem 1.5rem", background:GD, border:"1px solid rgba(243,186,47,0.18)", borderTop:"none", borderRadius:"0 0 4px 4px", marginBottom:"2rem" }}>

            {/* Header */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"16px", alignItems:"flex-start", marginBottom:"1.25rem" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.4)", marginBottom:"6px" }}>BLOCKCHAIN TYPE</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.4rem", color:types[activeType].col }}>{types[activeType].name} Blockchain</div>
                <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.35)", marginTop:"4px" }}>{types[activeType].permission} · {types[activeType].governance}</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", fontSize:"11px", fontFamily:"system-ui,sans-serif" }}>
                {[["Speed",types[activeType].speed],["Privacy",types[activeType].privacy],["Decentralisation",types[activeType].decentralisation]].map(([k,v],i) => (
                  <div key={i} style={{ padding:"6px 10px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"2px" }}>
                    <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.2em", color:"rgba(243,186,47,0.4)", marginBottom:"3px" }}>{k}</div>
                    <div style={{ color:"rgba(255,255,255,0.6)" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"14.5px", color:"rgba(255,255,255,0.7)", lineHeight:1.7, margin:"0 0 1.25rem" }}>{types[activeType].desc}</p>

            {/* Pros / Cons */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"1rem" }}>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.6)", marginBottom:"8px" }}>ADVANTAGES</div>
                {types[activeType].pros.map((p,i) => (
                  <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"6px", fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.5)" }}>
                    <span style={{ color:"rgba(74,222,128,0.7)", fontSize:"9px", marginTop:"3px", flexShrink:0 }}>✓</span>{p}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.6)", marginBottom:"8px" }}>LIMITATIONS</div>
                {types[activeType].cons.map((c,i) => (
                  <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"6px", fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.5)" }}>
                    <span style={{ color:"rgba(239,68,68,0.6)", fontSize:"9px", marginTop:"3px", flexShrink:0 }}>△</span>{c}
                  </div>
                ))}
              </div>
            </div>

            {/* Examples + Best For */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
              <div style={{ flex:1, minWidth:"140px" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.4)", marginBottom:"8px" }}>EXAMPLES</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {types[activeType].examples.map((e,i) => (
                    <span key={i} style={{ padding:"3px 10px", background:`rgba(${activeType===0?'96,165,250':activeType===1?'243,186,47':activeType===2?'74,222,128':'232,121,249'},0.1)`, border:`1px solid rgba(${activeType===0?'96,165,250':activeType===1?'243,186,47':activeType===2?'74,222,128':'232,121,249'},0.2)`, borderRadius:"20px", fontFamily:"monospace", fontSize:"10px", color:types[activeType].col }}>{e}</span>
                  ))}
                </div>
              </div>
              <div style={{ flex:2, minWidth:"200px" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.4)", marginBottom:"8px" }}>BEST FOR</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.45)", lineHeight:1.6, margin:0 }}>{types[activeType].bestFor}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Comparison Table ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>Side-by-Side Comparison</h2>
        <p style={pSt}>The following table compares all four blockchain architectures across the dimensions that matter most for enterprise and developer decision-making. No single architecture wins on every dimension — each is optimised for a different set of priorities.</p>
        <div style={{ overflowX:"auto", marginBottom:"2.5rem" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"system-ui,sans-serif", fontSize:"12.5px" }}>
            <thead>
              <tr>
                <th style={{ padding:"10px 14px", background:"rgba(243,186,47,0.08)", border:"1px solid rgba(243,186,47,0.12)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.25em", color:"rgba(243,186,47,0.6)", textAlign:"left", fontWeight:400 }}>DIMENSION</th>
                {types.map((t,i) => (
                  <th key={i} style={{ padding:"10px 14px", background:"rgba(243,186,47,0.08)", border:"1px solid rgba(243,186,47,0.12)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.25em", color:t.col, textAlign:"center", fontWeight:400 }}>{t.name.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row,ri) => (
                <tr key={ri}>
                  <td style={{ padding:"10px 14px", border:"1px solid rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.5)", background: ri%2===0?"#000":"rgba(255,255,255,0.01)" }}>{row.feature}</td>
                  {row.vals.map((v,vi) => (
                    <td key={vi} style={{ padding:"10px 14px", border:"1px solid rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.65)", textAlign:"center", background: ri%2===0?"#000":"rgba(255,255,255,0.01)" }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Decision Framework ── */}
      <div id="limitations" data-section="limitations">
        <h2 style={h2Style}>How to Choose the Right Blockchain</h2>
        <p style={pSt}>There is no universally "best" blockchain type. The right choice depends entirely on your project's operational, legal, and business requirements. These four questions provide a structured decision framework used by enterprise blockchain architects worldwide.</p>
        <div style={{ border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          <div style={{ display:"flex", overflowX:"auto" }}>
            {decisionQuestions.map((_,i) => (
              <button key={i} onClick={() => setDecisionStep(i)}
                style={{ flex:"1 0 auto", padding:"10px 8px", background:decisionStep===i?"rgba(243,186,47,0.08)":"transparent", border:"none", borderBottom:decisionStep===i?"2px solid "+G:"2px solid rgba(255,255,255,0.07)", cursor:"pointer", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.18em", color:decisionStep===i?G:"rgba(255,255,255,0.28)", textTransform:"uppercase" }}>
                Q{i+1}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={decisionStep} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.18 }}
              style={{ padding:"1.5rem" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1rem", color:"rgba(255,255,255,0.85)", fontWeight:600, marginBottom:"1rem" }}>Q{decisionStep+1}: {decisionQuestions[decisionStep].q}</div>
              {decisionQuestions[decisionStep].opts.map((opt,i) => {
                const parts = opt.split(' → ');
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 12px", marginBottom:"6px", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", borderRadius:"2px" }}>
                    <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.5)", flex:1 }}>{parts[0]}</div>
                    {parts[1] && (
                      <div style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.15em", color:typeColors[i], padding:"2px 8px", background:`rgba(${i===0?'96,165,250':i===1?'243,186,47':i===2?'74,222,128':'232,121,249'},0.1)`, borderRadius:"20px", flexShrink:0 }}>{parts[1]}</div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Industry Grid ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>Industry Use Cases by Blockchain Type</h2>
        <p style={pSt}>Different sectors have converged on different blockchain architectures based on their specific regulatory, operational, and trust requirements. The following shows which blockchain type is most appropriate for each major industry and the reasoning behind each recommendation.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {industries.map((ind,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.06)" }} style={{ background:"#000", padding:"1.2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:"rgba(255,255,255,0.85)", flex:1 }}>{ind.sector}</div>
                <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.15em", color:ind.col, padding:"2px 8px", background:`rgba(${i<3?'96,165,250':i<7?'243,186,47':i<10?'74,222,128':'232,121,249'},0.12)`, borderRadius:"20px", flexShrink:0, whiteSpace:"nowrap" }}>{ind.type}</span>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.32)", lineHeight:1.55, margin:0 }}>{ind.why}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Myths Section ── */}
      <div id="myths" data-section="myths">
        <h2 style={h2Style}>Common Misconceptions</h2>
        <p style={pSt}>Blockchain discourse is filled with myths that lead organisations to make incorrect architectural decisions. Understanding what is true versus what is misunderstood is essential for anyone working with blockchain technology.</p>
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

      {/* ── FAQs ── */}
      <div id="faqs" data-section="faqs">
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

      {/* ── Key Takeaways ── */}
      <div id="takeaways" data-section="takeaways">
        <div style={{ border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden" }}>
          <div style={{ padding:"1rem 1.25rem", borderBottom:"1px solid rgba(243,186,47,0.12)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.5)" }}>KEY TAKEAWAYS</div>
          {[
            "Public blockchain is best for open, transparent, decentralised ecosystems — cryptocurrencies, DeFi, NFTs, DAOs, and Web3 applications where anyone must be able to participate",
            "Private blockchain is ideal for single organisations requiring maximum speed, data confidentiality, and regulatory compliance — banking, healthcare, government, and enterprise ERP",
            "Consortium blockchain provides the balanced approach — multiple trusted organisations share governance without giving any single party control — dominant in supply chains, trade finance, and international banking",
            "Hybrid blockchain is the emerging enterprise standard — combining private infrastructure for confidential data with public blockchain anchoring for trust and verification",
            "The permissioned vs permissionless distinction is fundamental — public chains are permissionless (anyone can join); private and consortium chains are permissioned (identity-verified access)",
            "No blockchain type is universally superior — selecting the wrong model leads to poor performance, unnecessary cost, governance failures, or compliance violations",
            "The future of enterprise blockchain is interoperable hybrid architectures where public chains, consortium networks, and private systems work together as one connected ecosystem",
          ].map((t,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.07*i }}
              style={{ display:"flex", gap:"16px", alignItems:"flex-start", padding:"14px 18px", borderBottom:i<6?"1px solid rgba(243,186,47,0.06)":"none", background:i%2===0?"rgba(243,186,47,0.02)":"#000" }}>
              <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0, marginTop:"1px" }}>{i+1}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"13.5px", color:"rgba(255,255,255,0.62)", lineHeight:1.65, margin:0 }}>{t}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}



/* ── Cross-Chain Visual Article ─────────────────────────────────────────── */
