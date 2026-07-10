import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmartContractsVisual() {
  const h2Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.45rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem", lineHeight:1.25, letterSpacing:"-0.02em" };
  const h3Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.1rem,3vw,1.45rem)", color:"rgba(255,255,255,0.88)", margin:"2.25rem 0 0.75rem", lineHeight:1.3 };
  const h4Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1rem,2.4vw,1.2rem)", color:"rgba(255,255,255,0.85)", margin:"0 0 0.5rem", lineHeight:1.35 };
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const GD = "rgba(243,186,47,0.05)";
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [activeLang, setActiveLang] = React.useState(0);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };

  // Enhanced SEO schemas
  React.useEffect(() => {
    const schemas = [
      {
        "@context":"https://schema.org","@type":"TechArticle",
        "headline":"How Smart Contracts Work: Complete Beginner to Advanced Guide (2026)",
        "description":"Learn how smart contracts work from beginner to advanced level. Explore architecture, lifecycle, security, enterprise use cases, benefits, limitations, and the future of blockchain automation.",
        "keywords":"How Smart Contracts Work, Smart Contract Explained, Smart Contract Guide, Blockchain Smart Contracts, Solidity Smart Contracts, Ethereum Smart Contracts, Smart Contract Development, Enterprise Blockchain, Decentralized Applications, Web3 Infrastructure, Blockchain Automation, Digital Contracts",
        "author":{"@type":"Person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii"],"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
        "publisher":{"@type":"Organization","name":"Orakzai Research Lab","url":"https://faisalorakzai.com","logo":{"@type":"ImageObject","url":"https://faisalorakzai.com/logo.png"}},
        "datePublished":"2026-06-01","dateModified":"2026-06-30",
        "url":"https://faisalorakzai.com/research/smart-contracts",
        "image":{"@type":"ImageObject","url":"https://faisalorakzai.com/mk/smart-contracts-hero.png","width":1200,"height":630},
        "inLanguage":"en-US","isAccessibleForFree":true,"proficiencyLevel":"Beginner"
      },
      {
        "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},
          {"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},
          {"@type":"ListItem","position":3,"name":"How Smart Contracts Work","item":"https://faisalorakzai.com/research/smart-contracts"}
        ]
      },
      {
        "@context":"https://schema.org","@type":"Person","@id":"https://faisalorakzai.com#person",
        "name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder",
        "sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii","https://github.com/faisalorakzai-lab","https://hackernoon.com/u/faisalorakzai","https://www.imdb.com/name/nm18674496/"],
        "jobTitle":"Founder & Chairman","affiliation":{"@type":"Organization","name":"Orakzai Group"},
        "identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}
      },
      {
        "@context":"https://schema.org","@type":"Organization","@id":"https://faisalorakzai.com#org",
        "name":"Orakzai Group","url":"https://faisalorakzai.com",
        "founder":{"@type":"Person","name":"Faisal Orakzai"},
        "sameAs":["https://github.com/faisalorakzai-lab"]
      },
      {
        "@context":"https://schema.org","@type":"WebPage",
        "name":"How Smart Contracts Work: Complete Beginner to Advanced Guide (2026)",
        "url":"https://faisalorakzai.com/research/smart-contracts",
        "description":"Learn how smart contracts work from beginner to advanced level. Explore architecture, lifecycle, security, enterprise use cases, benefits, limitations, and the future of blockchain automation.",
        "breadcrumb":{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},{"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},{"@type":"ListItem","position":3,"name":"How Smart Contracts Work","item":"https://faisalorakzai.com/research/smart-contracts"}]},
        "author":{"@type":"Person","name":"Faisal Orakzai"},
        "datePublished":"2026-06-01","inLanguage":"en-US","isPartOf":{"@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com"}
      },
      {
        "@context":"https://schema.org","@type":"WebSite",
        "name":"Faisal Orakzai","url":"https://faisalorakzai.com",
        "description":"Research, blockchain engineering, and enterprise technology by Faisal Orakzai.",
        "potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://faisalorakzai.com/research?q={search_term_string}"},"query-input":"required name=search_term_string"}
      },
      {
        "@context":"https://schema.org","@type":"Speakable",
        "cssSelector":[".speakable-intro",".speakable-what-is"]
      }
    ];
    const existing = document.getElementById("sc-extra-ld");
    if (existing) existing.remove();
    const el = document.createElement("script");
    el.id = "sc-extra-ld"; el.type = "application/ld+json";
    el.text = JSON.stringify(schemas);
    document.head.appendChild(el);

    // Canonical link
    let canon = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://faisalorakzai.com/research/smart-contracts";

    // Additional meta tags for focus keywords
    const extras: [string, string][] = [
      ["article:published_time","2026-06-01"],
      ["article:modified_time","2026-06-30"],
      ["article:author","https://faisalorakzai.com/founder"],
      ["article:section","Blockchain"],
      ["article:tag","Smart Contracts"],
    ];
    const injected: HTMLMetaElement[] = [];
    extras.forEach(([k,v]) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${k}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property",k); document.head.appendChild(el); injected.push(el); }
      el.content = v;
    });

    return () => {
      document.getElementById("sc-extra-ld")?.remove();
      injected.forEach(el => el.remove());
    };
  }, []);

  const stats = [
    { value:"$100B+", label:"DeFi TVL",       sub:"Locked in smart contracts" },
    { value:"1994",   label:"Invented",        sub:"Nick Szabo's original concept" },
    { value:"2015",   label:"Ethereum Launch", sub:"Programmable smart contracts" },
    { value:"500M+",  label:"Transactions",    sub:"Monthly on-chain executions" },
  ];

  const history = [
    { year:"1994", title:"Nick Szabo's Vision", desc:"Computer scientist Nick Szabo proposes the concept of digital contracts that automatically enforce agreements through software — no intermediary required." },
    { year:"2009", title:"Bitcoin Script", desc:"Bitcoin introduces a limited scripting language supporting multi-signature wallets, time-locked transactions, and basic escrow — the first programmable blockchain." },
    { year:"2015", title:"Ethereum Revolution", desc:"Ethereum launches with the EVM (Ethereum Virtual Machine), enabling fully programmable smart contracts. Developers can now build DeFi, NFTs, DAOs, and dApps." },
    { year:"2020+", title:"Multi-Chain Ecosystem", desc:"Smart contracts expand to Solana, Polkadot, Avalanche, Cardano, and enterprise platforms. Cross-chain protocols and Layer-2 networks multiply capacity and use cases." },
  ];

  const lifecycle = [
    { step:1, title:"User Initiates Transaction", desc:"A user clicks an action — Buy NFT, Transfer tokens, Vote, Stake assets. The wallet prepares the transaction request." },
    { step:2, title:"Transaction Signed", desc:"The wallet signs using the user's private key. This digital signature proves authenticity without exposing the private key." },
    { step:3, title:"Transaction Broadcast", desc:"The signed transaction is broadcast to the blockchain network. Validators receive the request across thousands of nodes." },
    { step:4, title:"Validation", desc:"Validators verify the signature, nonce (replay attack prevention), account balance, permissions, and gas limit. Invalid transactions are rejected." },
    { step:5, title:"Smart Contract Executes", desc:"The smart contract runs inside the blockchain's virtual machine. Every instruction processes exactly as written — no validator can alter the logic." },
    { step:6, title:"State Update", desc:"If execution succeeds, blockchain data changes: ownership, balances, tokens, votes, staking records. All updates become part of the immutable ledger." },
    { step:7, title:"Transaction Finalized", desc:"After consensus, the transaction is permanently recorded. Confirmation events are emitted. The user interface updates automatically." },
  ];

  const benefits = [
    { icon:"⚡", title:"Automation", desc:"Execution occurs automatically when predefined conditions are met — no human approval or manual processing required." },
    { icon:"🔒", title:"Immutability", desc:"Once deployed, the contract code cannot be altered without a predefined upgrade mechanism, ensuring predictable outcomes." },
    { icon:"👁", title:"Transparency", desc:"The contract logic can be inspected and verified by all participants. Rules are visible before any interaction occurs." },
    { icon:"🎯", title:"Deterministic Execution", desc:"Given the same inputs, every node reaches the same result. No ambiguity, no interpretation — pure mathematical certainty." },
    { icon:"🛡", title:"Security", desc:"Cryptographic verification and blockchain consensus protect contract integrity from unauthorized interference." },
    { icon:"🤝", title:"Trust Minimization", desc:"Participants rely on mathematics and consensus rather than trusting a central intermediary or counterparty." },
  ];

  const limitations = [
    { title:"Code Bugs Are Permanent", desc:"A vulnerability deployed on-chain is extremely difficult to patch. Poor coding can lock or drain millions of dollars. Professional audits are essential before deployment." },
    { title:"The Oracle Problem", desc:"Blockchains cannot directly access external data. Smart contracts rely on oracle networks — if an oracle provides incorrect data, the contract produces incorrect outcomes." },
    { title:"Scalability Constraints", desc:"High network usage causes slower confirmations and higher gas fees. Layer-2 solutions continue improving scalability, but congestion remains a real challenge." },
    { title:"Legal Recognition", desc:"Many countries still lack comprehensive legal frameworks for smart contracts. Questions remain about jurisdiction, consumer protection, dispute resolution, and taxation." },
    { title:"Upgradability Complexity", desc:"Unlike traditional software, blockchain contracts require careful upgrade mechanisms (proxy patterns, governance modules) without compromising security or decentralization." },
  ];

  const industries = [
    { sector:"Decentralized Finance (DeFi)", type:"Core Infrastructure", col:"#60a5fa", why:"Lending, borrowing, trading, yield generation — all automated without banks or brokers." },
    { sector:"Real Estate", type:"Settlement", col:"#F3BA2F", why:"Ownership token transfers, escrow automation, fractional ownership, and instant title verification on-chain." },
    { sector:"Supply Chain", type:"Traceability", col:"#4ade80", why:"Every participant updates product status; smart contracts synchronize records and trigger payments at each milestone." },
    { sector:"Healthcare", type:"Access Control", col:"#e879f9", why:"Patients authorize medical record access via blockchain permissions; every access request is permanently logged." },
    { sector:"Insurance", type:"Parametric Payouts", col:"#f87171", why:"Flight delayed? Oracle confirms → smart contract checks policy → compensation transfers automatically. No paperwork." },
    { sector:"Government Services", type:"Public Automation", col:"#34d399", why:"Digital identity, tax collection, public procurement, land registration, and voting — all auditable on-chain." },
    { sector:"Enterprise Automation", type:"Internal Ops", col:"#fbbf24", why:"Employee bonuses, supplier payments, invoice verification, royalty distribution, and compliance reporting automated end-to-end." },
    { sector:"NFTs & Digital Assets", type:"Ownership", col:"#a78bfa", why:"The smart contract stores ownership, creator info, royalty percentage, and transfer logic for every unique digital asset." },
    { sector:"DAOs", type:"Governance", col:"#60a5fa", why:"Members vote on proposals; the smart contract counts votes and automatically executes approved treasury actions." },
    { sector:"IoT Integration", type:"Machine Payments", col:"#F3BA2F", why:"EV arrives at charging station → identity verified → charging begins → electricity measured → wallet charged automatically." },
  ];

  const langs = [
    { name:"Solidity", chain:"Ethereum / EVM", color:"#627EEA", desc:"The dominant smart contract language. Statically typed, contract-oriented, designed for the EVM. Powers most DeFi and NFT protocols." },
    { name:"Rust", chain:"Solana / Near", color:"#CE422B", desc:"High-performance systems language adapted for blockchain. Used on Solana for speed-critical programs and on Near Protocol." },
    { name:"Move", chain:"Aptos / Sui", color:"#00A3FF", desc:"Designed by Meta for Diem. Emphasizes resource safety — digital assets cannot be copied or accidentally destroyed." },
    { name:"Vyper", chain:"Ethereum", color:"#6C7280", desc:"Python-like Ethereum language prioritizing security and simplicity. Smaller attack surface than Solidity — favored for DeFi audits." },
    { name:"CosmWasm", chain:"Cosmos Ecosystem", color:"#7B49DA", desc:"Rust-based smart contract framework for the Cosmos SDK. Enables secure multi-chain contracts across the IBC ecosystem." },
  ];

  const trends = [
    { title:"AI-Assisted Execution", desc:"AI systems monitor smart contract health, predict gas costs, detect anomalies, and can trigger automatic responses to on-chain events." },
    { title:"Cross-Chain Smart Contracts", desc:"Contracts that operate across multiple blockchains simultaneously — enabling unified DeFi, cross-chain NFT ownership, and interoperable DAOs." },
    { title:"Zero-Knowledge (ZK) Contracts", desc:"Privacy-preserving smart contracts that prove computation correctness without revealing underlying data. Essential for enterprise and healthcare adoption." },
    { title:"Account Abstraction", desc:"Simplifying user experience by removing the complexity of managing private keys. Smart contract wallets handle gas, recovery, and permissions automatically." },
    { title:"Real-World Asset (RWA) Automation", desc:"Tokenized bonds, real estate, commodities, and equities governed by smart contracts with automated compliance, distributions, and settlement." },
    { title:"IoT + Smart Contract Mesh", desc:"Billions of connected devices executing micropayments and agreements autonomously — from smart grids to autonomous vehicles paying for services." },
  ];

  const faqs = [
    { q:"What is a smart contract?", a:"A smart contract is a self-executing computer program stored on a blockchain. It automatically performs predefined actions when specific conditions are met, eliminating the need for intermediaries and reducing the risk of human error." },
    { q:"Are smart contracts legally binding?", a:"It depends on the country and legal framework. Many jurisdictions recognize electronic agreements, but legal recognition of blockchain-based smart contracts is still evolving. Businesses should ensure compliance with local regulations when using smart contracts for legally enforceable agreements." },
    { q:"Can smart contracts be changed after deployment?", a:"Most smart contracts are immutable, meaning they cannot be altered once deployed. However, developers can build upgradeable architectures using proxy contracts or governance mechanisms that allow future improvements while maintaining transparency." },
    { q:"Which programming language is used for smart contracts?", a:"The most widely used language is Solidity, primarily for Ethereum and EVM-compatible blockchains. Other languages include Rust, Move, Vyper, Go, and CosmWasm (Rust-based), depending on the blockchain platform." },
    { q:"Can smart contracts access internet data?", a:"No. Blockchains cannot directly access external information. Smart contracts rely on trusted oracle networks to securely bring real-world data — such as asset prices, weather information, or sports results — onto the blockchain." },
    { q:"Are smart contracts secure?", a:"They can be highly secure if properly designed, audited, and tested. However, poorly written code can contain vulnerabilities that attackers may exploit. Independent security audits, formal verification, and continuous testing are essential for production-grade smart contracts." },
    { q:"Do smart contracts eliminate lawyers?", a:"No. Smart contracts automate execution, not legal interpretation. Lawyers are still important for drafting legal frameworks, ensuring regulatory compliance, resolving disputes, and managing complex contractual relationships." },
    { q:"What happens if a smart contract contains a bug?", a:"A bug may cause incorrect execution, financial loss, or locked funds. Since blockchain transactions are irreversible, smart contract development requires extensive testing, peer review, and independent security audits before deployment." },
    { q:"Which industries use smart contracts?", a:"Smart contracts are increasingly adopted across Banking and Finance, DeFi, Real Estate, Supply Chain Management, Healthcare, Insurance, Gaming, Government Services, Digital Identity, Intellectual Property, and Tokenized Real-World Assets (RWA)." },
    { q:"What is the future of smart contracts?", a:"The future includes AI-assisted automation, cross-chain interoperability, privacy-preserving computation, tokenized real-world assets, decentralized identity systems, IoT integration, and enterprise-grade blockchain infrastructure powering global digital economies." },
  ];

  const myths = [
    { myth:"Smart contracts are legal contracts", reality:"They are programmable code that can support legal agreements but are not automatically recognized as legal contracts everywhere." },
    { myth:"Smart contracts never fail", reality:"Bugs, flawed logic, or compromised oracles can still create failures. The DAO hack (2016) drained $60M due to a reentrancy bug." },
    { myth:"They only work with cryptocurrencies", reality:"They automate many business processes beyond digital currencies — supply chain, identity, voting, real estate, healthcare, and more." },
    { myth:"They replace every intermediary", reality:"They reduce unnecessary intermediaries but do not eliminate all regulatory or legal roles. Oracles, auditors, and legal counsel remain essential." },
    { myth:"Blockchain makes contracts completely risk-free", reality:"Blockchain improves security dramatically, but secure development practices, audits, and formal verification remain essential for safety." },
  ];

  const takeaways = [
    "Smart contracts are self-executing programs deployed on blockchain networks that automatically enforce predefined rules without human intervention.",
    "They were conceptualized by Nick Szabo in 1994, became practical with Ethereum in 2015, and now power trillions of dollars in on-chain value.",
    "Execution is transparent, deterministic, and tamper-resistant — every participant sees the same rules and every validator reaches the same result.",
    "They power DeFi, NFTs, DAOs, digital identity, tokenized real-world assets, and enterprise automation across dozens of industries worldwide.",
    "Security, professional audits, and robust architecture are critical. A single bug deployed on-chain can result in permanent, irreversible financial loss.",
    "The future of smart contracts includes AI-assisted execution, cross-chain interoperability, ZK privacy, IoT integration, and global RWA tokenization.",
  ];

  const internalLinks = [
    { title:"What is Blockchain? A Complete Beginner's Guide", slug:"blockchain-basic", desc:"The foundational primer — how blockchain works, its history, and core concepts." },
    { title:"Blockchain Infrastructure Explained", slug:"blockchain-infra", desc:"Nodes, validators, RPC, consensus, Layer-2, and the full technical foundation." },
    { title:"Public vs Private vs Consortium Blockchains", slug:"blockchain-types", desc:"Enterprise decision framework for choosing the right blockchain architecture." },
  ];

  return (
    <div>
      {/* ── Intro & History ── */}
      <div id="intro" data-section="intro">
        {/* Stats Bar */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {stats.map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08*i }}
              style={{ background:"#000", padding:"1.25rem 1.5rem", display:"flex", flexDirection:"column", gap:"4px" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"clamp(1.4rem,3.5vw,2rem)", color:G }}>{s.value}</div>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", color:"rgba(255,255,255,0.55)", textTransform:"uppercase" }}>{s.label}</div>
              <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.25)", lineHeight:1.4 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        <h2 style={h2Style}>Introduction</h2>
        <p style={pSt} className="speakable-intro">The invention of blockchain made it possible to transfer digital value without a central authority. However, blockchain alone could only record transactions — it could not automatically enforce agreements, execute business logic, or manage complex digital processes.</p>
        <p style={pSt}>This limitation led to one of the most significant innovations in modern computing: <strong style={{ color:"rgba(255,255,255,0.9)" }}>Smart Contracts</strong>. Rather than relying on lawyers, banks, brokers, or intermediaries to verify and execute agreements, smart contracts allow predefined rules to execute automatically when specified conditions are met.</p>

        {/* What Is a Smart Contract — highlight box */}
        <div className="speakable-what-is" style={{ border:`1px solid rgba(243,186,47,0.3)`, background:"rgba(243,186,47,0.04)", padding:"1.5rem 1.75rem", marginBottom:"2.5rem", borderRadius:"2px" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.38em", color:G, textTransform:"uppercase", marginBottom:"10px" }}>Definition</div>
          <p style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.05rem,2.6vw,1.3rem)", color:"rgba(255,255,255,0.92)", lineHeight:1.6, margin:0 }}>A smart contract is a self-executing computer program stored on a blockchain that automatically performs agreed actions when predetermined conditions are satisfied.</p>
        </div>

        {/* Traditional vs Smart Contract comparison */}
        <h2 style={h2Style}>Traditional Contracts vs Smart Contracts</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {[
            ["Written in legal language","Written in programming code"],
            ["Executed by people or institutions","Executed automatically by blockchain"],
            ["Requires intermediaries","Operates peer-to-peer"],
            ["Manual verification","Automatic verification"],
            ["Slower settlement","Near real-time execution"],
            ["Higher administrative costs","Lower operational costs"],
            ["Enforcement through legal systems","Enforcement through code and consensus"],
          ].map(([trad,smart],i) => (
            <React.Fragment key={i}>
              <div style={{ background:"rgba(239,68,68,0.04)", padding:"0.85rem 1.1rem", borderBottom:i<6?"1px solid rgba(255,255,255,0.04)":"none", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
                {i===0 && <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.55)", marginBottom:"8px", textTransform:"uppercase" }}>Traditional Contract</div>}
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.55)", lineHeight:1.6, margin:0 }}>{trad}</p>
              </div>
              <div style={{ background:"rgba(74,222,128,0.03)", padding:"0.85rem 1.1rem", borderBottom:i<6?"1px solid rgba(255,255,255,0.04)":"none" }}>
                {i===0 && <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.6)", marginBottom:"8px", textTransform:"uppercase" }}>Smart Contract</div>}
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.65)", lineHeight:1.6, margin:0 }}>{smart}</p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* History Timeline */}
        <h2 style={h2Style}>History & Evolution</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:"0", marginBottom:"3.5rem", borderLeft:`2px solid rgba(243,186,47,0.2)`, paddingLeft:"0" }}>
          {history.map((h,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1*i }}
              style={{ display:"flex", gap:"0", marginLeft:"-1px" }}>
              <div style={{ width:"2px", background:i===history.length-1?"transparent":GB, flexShrink:0 }}/>
              <div style={{ paddingLeft:"1.5rem", paddingBottom:"2rem", flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px", marginLeft:"-1.75rem" }}>
                  <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:G, boxShadow:`0 0 12px rgba(243,186,47,0.5)`, flexShrink:0 }}/>
                  <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.3em", color:G, textTransform:"uppercase" }}>{h.year}</span>
                  <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"clamp(0.95rem,2.2vw,1.1rem)", color:"rgba(255,255,255,0.88)" }}>{h.title}</span>
                </div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.06rem)", color:"rgba(255,255,255,0.55)", lineHeight:1.8, margin:0 }}>{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Architecture & Lifecycle ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>Architecture: How Smart Contracts Work</h2>
        <p style={pSt}>A smart contract is not simply a block of code. It is a complete digital system consisting of multiple components working together on a blockchain network — from the user's wallet all the way to the distributed ledger.</p>

        {/* 4-Step Flow (matches the hero image) */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {[
            { step:"1", title:"Contract Written in Code", icon:"💻", desc:"Developer writes rules and conditions in a smart contract language like Solidity or Rust." },
            { step:"2", title:"Condition Met", icon:"✅", desc:"Predefined trigger occurs — e.g., payment received, deadline reached, or data threshold crossed." },
            { step:"3", title:"Automatic Execution", icon:"⚙", desc:"The blockchain virtual machine runs the contract logic deterministically across all validators." },
            { step:"4", title:"Settlement & Ledger Updated", icon:"🔗", desc:"Transaction finalizes. Ownership, balances, and state changes are permanently recorded on-chain." },
          ].map((f,i) => (
            <motion.div key={i} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1*i }}
              style={{ background:"#000", padding:"1.5rem 1.25rem", display:"flex", flexDirection:"column", gap:"12px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:`1px solid rgba(243,186,47,0.3)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"11px", color:G, flexShrink:0 }}>{f.step}</div>
                <span style={{ fontSize:"18px" }}>{f.icon}</span>
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"14px", color:"rgba(255,255,255,0.9)", lineHeight:1.4 }}>{f.title}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.38)", lineHeight:1.6, margin:0 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Execution Lifecycle */}
        <h3 style={h3Style}>The 7-Step Execution Lifecycle</h3>
        <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"0", marginBottom:"3rem" }}>
          {/* Step selector */}
          <div style={{ display:"flex", flexDirection:"column", gap:"2px", paddingRight:"1.5rem", borderRight:`1px solid rgba(243,186,47,0.1)` }}>
            {lifecycle.map((s,i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", background: activeStep===i ? "rgba(243,186,47,0.06)" : "transparent", border:`1px solid ${activeStep===i?"rgba(243,186,47,0.25)":"transparent"}`, cursor:"pointer", textAlign:"left", transition:"all 0.18s" }}>
                <div style={{ width:"22px", height:"22px", borderRadius:"50%", background: activeStep===i ? G : "rgba(243,186,47,0.1)", border:`1px solid ${activeStep===i ? G : "rgba(243,186,47,0.2)"}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color: activeStep===i ? "#000" : G, flexShrink:0, fontWeight:700 }}>{s.step}</div>
                <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color: activeStep===i ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.32)", whiteSpace:"nowrap" }}>{s.title}</span>
              </button>
            ))}
          </div>
          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-8 }} transition={{ duration:0.22 }}
              style={{ paddingLeft:"1.75rem", paddingTop:"0.5rem" }}>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.35em", color:G, textTransform:"uppercase", marginBottom:"12px" }}>Step {lifecycle[activeStep].step} of 7</div>
              <h4 style={{ ...h4Style, color:G, marginTop:0 }}>{lifecycle[activeStep].title}</h4>
              <p style={{ ...pSt, fontSize:"clamp(0.95rem,2.2vw,1.1rem)" }}>{lifecycle[activeStep].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gas Fees */}
        <h3 style={h3Style}>Gas Fees: The Cost of Computation</h3>
        <p style={pSt}>Executing smart contracts consumes computational resources. To prevent spam and fairly compensate validators, users pay gas fees. Gas is not the contract itself — it measures the computational work required to execute blockchain operations.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"1px", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.12)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {["Prevents network spam","Rewards validators","Allocates resources fairly","Discourages infinite loops","Maintains network stability"].map((g,i) => (
            <div key={i} style={{ background:"#000", padding:"1rem 1.1rem", display:"flex", alignItems:"flex-start", gap:"8px" }}>
              <span style={{ color:G, fontSize:"8px", marginTop:"4px", flexShrink:0 }}>◆</span>
              <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13.5px", color:"rgba(255,255,255,0.58)", lineHeight:1.6 }}>{g}</span>
            </div>
          ))}
        </div>

        {/* Programming Languages */}
        <h3 style={h3Style}>Smart Contract Programming Languages</h3>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {langs.map((l,i) => (
            <button key={i} onClick={() => setActiveLang(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", padding:"5px 14px", border:`1px solid ${activeLang===i ? l.color : "rgba(255,255,255,0.1)"}`, color: activeLang===i ? l.color : "rgba(255,255,255,0.3)", background: activeLang===i ? `${l.color}11` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{l.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeLang} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${langs[activeLang].color}33`, background:`${langs[activeLang].color}08`, padding:"1.25rem 1.5rem", marginBottom:"3rem", borderRadius:"2px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px" }}>
              <div style={{ fontFamily:"monospace", fontWeight:700, fontSize:"16px", color:langs[activeLang].color }}>{langs[activeLang].name}</div>
              <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase" }}>{langs[activeLang].chain}</div>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.08rem)", color:"rgba(255,255,255,0.65)", lineHeight:1.8, margin:0 }}>{langs[activeLang].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Benefits ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>Core Benefits of Smart Contracts</h2>
        <p style={pSt}>Smart contracts represent one of the most important innovations in digital infrastructure because they enable programmable trust. Instead of asking "Can I trust the other party?", participants ask "Has the code been audited, and are the contract rules correct?"</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {benefits.map((b,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.05)" }}
              style={{ background:"#000", padding:"1.5rem 1.25rem", display:"flex", flexDirection:"column", gap:"10px", transition:"background 0.18s" }}>
              <div style={{ fontSize:"24px" }}>{b.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"15px", color:"rgba(255,255,255,0.9)" }}>{b.title}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.6, margin:0 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Limitations ── */}
      <div id="limitations" data-section="limitations">
        <h2 style={h2Style}>Challenges & Limitations</h2>
        <p style={pSt}>Despite their advantages, smart contracts still face important limitations that every developer, enterprise, and investor must understand before deployment.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {limitations.map((l,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.08*i }}
              style={{ background:"#000", padding:"1.25rem 1.5rem", display:"flex", gap:"16px", alignItems:"flex-start" }}>
              <div style={{ minWidth:"28px", height:"28px", borderRadius:"50%", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"10px", color:"#f87171", flexShrink:0, marginTop:"1px" }}>{i+1}</div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"15px", color:"rgba(255,255,255,0.88)", marginBottom:"6px" }}>{l.title}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.65, margin:0 }}>{l.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Best Practices */}
        <h3 style={h3Style}>Security Best Practices</h3>
        <p style={pSt}>Professional blockchain companies follow strict development standards to protect smart contracts and their users.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1px", background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.12)", borderRadius:"4px", overflow:"hidden", marginBottom:"1.5rem" }}>
          {["Thorough code reviews","Independent security audits","Automated testing","Formal verification","Bug bounty programs","Multi-signature administration","Access control enforcement","Emergency pause mechanisms","Time-lock governance","Continuous monitoring"].map((p,i) => (
            <div key={i} style={{ background:"#000", padding:"0.8rem 1rem", display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ color:"#4ade80", fontSize:"9px", flexShrink:0 }}>✓</span>
              <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.55)", lineHeight:1.5 }}>{p}</span>
            </div>
          ))}
        </div>

        {/* Common vulnerabilities */}
        <h3 style={h3Style}>Common Vulnerabilities to Defend Against</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))", gap:"1px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.12)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {["Reentrancy attacks","Integer overflow","Integer underflow","Front-running","Flash loan attacks","Access control failures","Logic errors","Signature replay","Oracle manipulation","Timestamp dependence"].map((v,i) => (
            <div key={i} style={{ background:"#000", padding:"0.75rem 1rem", display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ color:"#f87171", fontSize:"8px", flexShrink:0 }}>⚠</span>
              <span style={{ fontFamily:"monospace", fontSize:"11px", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Industries ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>Smart Contracts Across Industries</h2>
        <p style={pSt}>Smart contracts have evolved beyond cryptocurrency. Today they power entire digital economies, enabling secure automation across finance, supply chains, healthcare, government services, gaming, and enterprise software.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {industries.map((ind,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.2rem", transition:"background 0.18s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:"rgba(255,255,255,0.88)", flex:1 }}>{ind.sector}</div>
                <span style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.12em", color:ind.col, padding:"2px 8px", background:`${ind.col}15`, borderRadius:"20px", flexShrink:0, whiteSpace:"nowrap" }}>{ind.type}</span>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.32)", lineHeight:1.55, margin:0 }}>{ind.why}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Emerging Trends ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>Emerging Trends</h2>
        <p style={pSt}>The next generation of smart contracts will be far more intelligent, interoperable, and integrated with real-world systems. These trends are already shaping the next wave of blockchain innovation.</p>
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
        <h2 style={h2Style}>The Future of Smart Contracts</h2>
        <div style={{ border:`1px solid rgba(243,186,47,0.2)`, background:"rgba(243,186,47,0.03)", padding:"1.75rem 2rem", marginBottom:"3rem", borderRadius:"2px" }}>
          <p style={{ ...pSt, margin:"0 0 1rem" }}>Smart contracts are evolving from simple automation scripts into the programmable foundation of the next generation of digital infrastructure. Their trajectory points toward becoming as fundamental to the global digital economy as cloud computing and the internet itself.</p>
          <p style={{ ...pSt, margin:"0 0 1rem" }}>The organizations that understand and adopt this technology responsibly will be well positioned to build secure, scalable, and future-ready systems in the decades ahead.</p>
          <p style={{ ...pSt, marginBottom:0 }}>As the digital economy evolves, blockchain is expected to become a foundational layer supporting Web3, tokenized assets, decentralized finance, trusted AI systems, and next-generation enterprise infrastructure.</p>
        </div>

        {/* Internal Links to Related Articles */}
        <h3 style={h3Style}>Continue Reading: Related Blockchain Guides</h3>
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

/* ── Content Renderer ───────────────────────────────────────────────────── */
