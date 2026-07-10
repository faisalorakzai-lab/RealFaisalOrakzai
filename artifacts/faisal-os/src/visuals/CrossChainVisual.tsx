import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CrossChainVisual() {
  const h2Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.45rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem", lineHeight:1.25, letterSpacing:"-0.02em" };
  const h3Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.1rem,3vw,1.45rem)", color:"rgba(255,255,255,0.88)", margin:"2.25rem 0 0.75rem", lineHeight:1.3 };
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const [activePhase, setActivePhase] = React.useState(0);
  const [activeBridge, setActiveBridge] = React.useState(0);
  const [activeProtocol, setActiveProtocol] = React.useState(0);
  const [activeSector, setActiveSector] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };

  React.useEffect(() => {
    const schemas = [
      { "@context":"https://schema.org","@type":"TechArticle",
        "headline":"Cross-Chain Technology Explained: Blockchain Interoperability, Bridges, IBC, CCIP & LayerZero Guide (2026)",
        "description":"Learn how cross-chain technology works, including blockchain bridges, interoperability protocols, LayerZero, Chainlink CCIP, Cosmos IBC, Polkadot XCM, atomic swaps, chain abstraction, and the future of multi-chain Web3 infrastructure.",
        "keywords":"Cross-Chain Technology, Blockchain Interoperability, Cross-Chain Bridges, Blockchain Bridges, Atomic Swaps, HTLC, LayerZero, Chainlink CCIP, Cosmos IBC, Polkadot XCM, Cross-Chain Messaging, Chain Abstraction, Multi-Chain Architecture, Web3 Interoperability, Cross-Chain Liquidity",
        "author":{"@type":"Person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii"],"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
        "publisher":{"@type":"Organization","name":"Orakzai Research Lab","url":"https://faisalorakzai.com","logo":{"@type":"ImageObject","url":"https://faisalorakzai.com/logo.png"}},
        "datePublished":"2026-07-01","dateModified":"2026-07-01",
        "url":"https://faisalorakzai.com/research/cross-chain-technology",
        "image":{"@type":"ImageObject","url":"https://faisalorakzai.com/mk/cross-chain-hero.png","width":1200,"height":630},
        "inLanguage":"en-US","isAccessibleForFree":true,"proficiencyLevel":"Intermediate" },
      { "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},
          {"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},
          {"@type":"ListItem","position":3,"name":"Cross-Chain Technology Explained","item":"https://faisalorakzai.com/research/cross-chain-technology"}
        ] },
      {"@context":"https://schema.org","@type":"Person","@id":"https://faisalorakzai.com#person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii","https://github.com/faisalorakzai-lab","https://www.imdb.com/name/nm18674496/"],"jobTitle":"Founder & Chairman","affiliation":{"@type":"Organization","name":"Orakzai Group"},"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
      {"@context":"https://schema.org","@type":"Organization","@id":"https://faisalorakzai.com#org","name":"Orakzai Group","url":"https://faisalorakzai.com","founder":{"@type":"Person","name":"Faisal Orakzai"}},
      {"@context":"https://schema.org","@type":"WebPage","name":"Cross-Chain Technology Explained (2026)","url":"https://faisalorakzai.com/research/cross-chain-technology","description":"Learn how cross-chain technology works, including blockchain bridges, interoperability protocols, LayerZero, Chainlink CCIP, Cosmos IBC, Polkadot XCM, atomic swaps, and chain abstraction.","author":{"@type":"Person","name":"Faisal Orakzai"},"datePublished":"2026-07-01","inLanguage":"en-US","isPartOf":{"@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com"}},
      {"@context":"https://schema.org","@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://faisalorakzai.com/research?q={search_term_string}"},"query-input":"required name=search_term_string"}},
      {"@context":"https://schema.org","@type":"Speakable","cssSelector":[".cc-intro",".cc-def"]}
    ];
    const existing = document.getElementById("cc-extra-ld");
    if (existing) existing.remove();
    const el = document.createElement("script");
    el.id = "cc-extra-ld"; el.type = "application/ld+json";
    el.text = JSON.stringify(schemas);
    document.head.appendChild(el);
    let canon = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://faisalorakzai.com/research/cross-chain-technology";
    return () => { document.getElementById("cc-extra-ld")?.remove(); };
  }, []);

  const evolutionPhases = [
    { phase:"Phase 1", name:"Independent Blockchains", col:"rgba(255,255,255,0.25)", years:"2009–2015", desc:"Bitcoin and Ethereum operated as isolated systems with almost no interaction — resembling early computer networks before the Internet.", traits:["Bitcoin: decentralized money only","Ethereum: smart contracts added","No cross-chain communication","Each chain is an isolated island","Innovation siloed per ecosystem","No shared liquidity or state"] },
    { phase:"Phase 2", name:"Blockchain Ecosystems", col:"#60a5fa", years:"2016–2019", desc:"Specialized ecosystems emerged optimized for speed, privacy, enterprise use, gaming, NFTs, and stablecoins — but remained largely disconnected.", traits:["Speed-optimized chains (Solana)","Privacy chains (Zcash, Monero)","Enterprise blockchains (Hyperledger)","NFT-focused ecosystems","Stablecoin networks","Gaming chains emerge"] },
    { phase:"Phase 3", name:"Multi-Chain Economy", col:"#4ade80", years:"2020–2024", desc:"Organizations now use multiple blockchains simultaneously — Ethereum for security, Polygon for fees, Arbitrum for scaling, Cosmos for interoperability.", traits:["Ethereum: asset issuance & security","Polygon: low-fee transactions","Arbitrum: L2 scaling","Solana: high-frequency trading","Cosmos: sovereign interoperability","Chainlink: oracle data feeds"] },
    { phase:"Phase 4", name:"Unified Cross-Chain", col:G, years:"2025–∞", desc:"The vision: blockchain networks communicate automatically. Users interact with applications — the infrastructure routes across chains invisibly through chain abstraction.", traits:["Chain abstraction: chains invisible","Intent-based architecture","Unified liquidity layers","AI-powered routing","One wallet, all chains","Seamless user experience"] },
  ];

  const bridgeTypes = [
    { name:"Lock-and-Mint", icon:"🔒", col:"#60a5fa",
      desc:"The most common bridge model. Tokens are locked in a smart contract on the source chain, verified by the bridge, and equivalent wrapped tokens are minted on the destination chain. When returning, wrapped tokens are burned and originals unlocked.",
      steps:["User locks 100 ETH on Ethereum","Bridge verifies the lock event","100 Wrapped ETH minted on Polygon","User interacts normally on Polygon","To return: WETH burned on Polygon","Original ETH unlocked on Ethereum"],
      pros:["Easy to implement","Widely adopted","Fast UX","Multi-chain support"],
      cons:["Locked assets = high-value target","Bridge hack = lost funds","Wrapped token backing risk"] },
    { name:"Burn-and-Release", icon:"🔥", col:G,
      desc:"Instead of creating wrapped assets, tokens are permanently burned on the source chain and native tokens are released on the destination chain. Reduces supply inconsistencies but requires stronger chain synchronization.",
      steps:["User initiates transfer on Source Chain","Tokens are permanently burned","Burn proof is generated","Proof transmitted to destination","Destination chain verifies proof","Native tokens released to user"],
      pros:["No wrapped asset risk","Clean supply model","Native token experience"],
      cons:["Requires strong synchronization","Less widely adopted","More complex implementation"] },
    { name:"Federated Bridge", icon:"👥", col:"#4ade80",
      desc:"A set of trusted validators collectively confirm cross-chain events. When a majority agrees assets are locked on the source chain, the bridge releases equivalent assets on the destination chain — faster but requires partial trust.",
      steps:["User locks assets on source chain","Validator A confirms","Validator B confirms","Validator C confirms — majority reached","Bridge releases assets on destination","Enterprise governance enforced"],
      pros:["Fast confirmation","Easier upgrades","Enterprise friendly"],
      cons:["Partial trust required","Validator compromise risk","Centralization concern"] },
    { name:"Trustless Bridge", icon:"🔐", col:"#a78bfa",
      desc:"Relies almost entirely on cryptography — smart contracts, cryptographic proofs, decentralized validators, and consensus verification — instead of a single trusted party. Aligns most closely with Web3 decentralization principles.",
      steps:["Asset locked on source chain","Cryptographic proof generated","Zero-knowledge proof or light client used","Decentralized validators verify independently","Smart contract executes automatically","No single trusted intermediary involved"],
      pros:["Maximum decentralization","Cryptographic security","No single point of failure"],
      cons:["More complex to build","Slower settlement","Higher gas costs"] },
  ];

  const protocols = [
    { name:"LayerZero", icon:"Ø", col:"#60a5fa",
      tagline:"Lightweight Messaging Protocol",
      desc:"A messaging protocol designed for lightweight, secure communication between blockchains. Instead of maintaining its own blockchain, LayerZero provides a messaging layer connecting independent networks through Endpoint smart contracts, Oracles, and Relayers.",
      architecture:["Endpoint Smart Contracts on each chain","Oracle verifies blockchain state","Relayer delivers transaction proof","Destination chain validates both independently","Smart contract executes automatically","Separation of verification responsibilities"],
      useCases:["Multi-chain dApps","Cross-chain DeFi","Omnichain NFTs","Cross-chain governance","Unified token standards"],
      strength:"Lightweight & multi-chain" },
    { name:"Chainlink CCIP", icon:"⬡", col:"#375bd2",
      tagline:"Cross-Chain Interoperability Protocol",
      desc:"Chainlink's CCIP extends oracle infrastructure beyond price feeds into secure cross-chain communication and token transfers. Designed for both public and private blockchain environments, making it attractive for financial institutions.",
      architecture:["Decentralized oracle networks","Cross-chain messaging layer","Token transfer capability","Programmable transaction logic","Risk management layer","Enterprise-grade reliability"],
      useCases:["Banking & financial services","Enterprise blockchain","Tokenized securities","CBDC interoperability","Cross-chain DeFi"],
      strength:"Enterprise & finance focused" },
    { name:"Axelar", icon:"✕", col:"#4ade80",
      tagline:"Universal Cross-Chain Network",
      desc:"An independent decentralized interoperability network with its own validator set. Developers can build applications communicating across dozens of blockchains without writing separate bridge logic for each — through General Message Passing (GMP).",
      architecture:["Independent Validator Network","Gateway Contracts on each chain","Cross-Chain API for developers","General Message Passing (GMP)","Decentralized security layer","Multi-chain orchestration"],
      useCases:["Universal cross-chain apps","DEX aggregation","Cross-chain liquidity","dApp development","NFT portability"],
      strength:"Universal developer API" },
    { name:"Cosmos IBC", icon:"⊙", col:"#f87171",
      tagline:"Inter-Blockchain Communication",
      desc:"The industry's most advanced native interoperability framework. IBC enables sovereign blockchains to exchange verified information packets directly — without centralized bridges — while each chain remains independently governed.",
      architecture:["Light client verification","Relayer network transmits packets","IBC channel establishment","Packet acknowledgement protocol","Timeout and error handling","Independent chain governance preserved"],
      useCases:["Cosmos ecosystem chains","Sovereign blockchain networks","Cross-chain DeFi","Token transfers","Governance coordination"],
      strength:"Native & trust-minimized" },
    { name:"Polkadot XCM", icon:"◎", col:"#e879f9",
      tagline:"Cross-Consensus Messaging",
      desc:"Polkadot connects specialized parachains through a shared Relay Chain. XCM (Cross-Consensus Messaging) enables parachains to transfer assets, call smart contracts, coordinate governance, and move NFTs — all sharing the Relay Chain's security.",
      architecture:["Relay Chain shared security","Parachain slots (specialized chains)","XCM message format","XCMP channel between parachains","Shared security model","Parachain upgrades via governance"],
      useCases:["Parachain communication","Cross-chain staking","NFT movement","Governance coordination","Identity synchronization"],
      strength:"Shared security model" },
  ];

  const securityRisks = [
    { risk:"Bridge Exploits", icon:"💀", col:"#f87171", desc:"Bridges lock large asset pools — making them high-value targets. Common causes: smart contract vulnerabilities, validator compromise, private key theft, faulty verification logic, and inadequate security audits." },
    { risk:"Validator Compromise", icon:"⚠", col:"#fbbf24", desc:"If validators act dishonestly or are compromised, incorrect cross-chain events could be accepted. Modern protocols use decentralized validator sets, economic staking, slashing mechanisms, and BFT consensus to mitigate this." },
    { risk:"Oracle Manipulation", icon:"📡", col:"#a78bfa", desc:"Oracles delivering inaccurate price feeds or manipulated data can cause incorrect cross-chain decisions. Decentralized node operators, redundant data sources, and cryptographic verification reduce this risk." },
    { risk:"Double-Spending", icon:"🔄", col:"#60a5fa", desc:"When tokens are locked on Chain A and wrapped on Chain B, attackers may attempt to unlock originals without burning wrapped versions. Cryptographic proofs, finality checks, and replay protection prevent duplicate representations." },
    { risk:"Liquidity Pool Attacks", icon:"💧", col:"#4ade80", desc:"Cross-chain liquidity pools aggregating value from multiple networks become high-value targets. Economic incentives, multi-signature governance, and timelocks protect against flash loan attacks and governance exploits." },
    { risk:"Cross-Chain Governance Lag", icon:"⏱", col:G, desc:"Multiple blockchain ecosystems with different governance models, upgrade schedules, and consensus mechanisms can create synchronization issues and compatibility risks during protocol upgrades." },
  ];

  const chainAbstraction = [
    { concept:"Chain Abstraction", col:"#60a5fa", desc:"Users don't know or care which blockchain they're using. Applications automatically manage wallet selection, fee tokens, bridge routing, and asset settlement — blockchain complexity becomes invisible." },
    { concept:"Intent-Based Architecture", col:G, desc:"Users express desired outcomes — 'swap Token A for Token B at best rate' — and the infrastructure automatically finds the optimal execution path, liquidity source, and settlement chain." },
    { concept:"Unified Liquidity Layer", col:"#4ade80", desc:"Liquidity from multiple blockchain ecosystems is aggregated into a single accessible network — better pricing, lower slippage, improved capital efficiency, and greater resilience during volatility." },
    { concept:"Account Abstraction", col:"#a78bfa", desc:"Smart wallets manage multi-chain interactions automatically — one wallet address works across all chains, paying fees in any token, with biometric security and social recovery." },
  ];

  const futureUseCases = [
    { sector:"Governments", icon:"🏛", col:"#60a5fa", desc:"Digital identity verification, cross-border public services, secure document exchange, CBDC interoperability between central banks, and national blockchain infrastructure." },
    { sector:"Financial Institutions", icon:"🏦", col:G, desc:"International settlements, tokenized securities transferring across chains, CBDC-to-CBDC interoperability, cross-chain DeFi for institutional investors, and regulatory compliance." },
    { sector:"AI & Autonomous Agents", icon:"🤖", col:"#4ade80", desc:"AI agents with blockchain identities autonomously transacting across chains, machine-to-machine micropayments, trusted AI data exchange verified on-chain, and decentralized AI computation markets." },
    { sector:"IoT & Smart Cities", icon:"🌆", col:"#a78bfa", desc:"Billions of IoT devices authenticating and transacting across chains, smart city infrastructure coordination, energy grid balancing, autonomous vehicle payments, and industrial automation." },
    { sector:"Enterprise Automation", icon:"🏢", col:"#f87171", desc:"Supply chain coordination across multiple blockchain ecosystems, cross-organizational data sharing, programmable multi-chain compliance, and automated cross-border trade settlement." },
  ];

  const internalLinks = [
    { title:"What is Blockchain? A Complete Beginner's Guide", slug:"blockchain-basic", desc:"Understand the blockchain foundation before exploring cross-chain technology." },
    { title:"Blockchain Infrastructure Explained", slug:"blockchain-infra", desc:"Nodes, validators, consensus — the infrastructure cross-chain protocols run on." },
    { title:"Public vs Private vs Consortium Blockchains", slug:"blockchain-types", desc:"How different blockchain types create the need for cross-chain interoperability." },
    { title:"How Smart Contracts Work", slug:"smart-contracts", desc:"Cross-chain messaging protocols execute smart contracts across multiple chains." },
    { title:"Tokenization of Real World Assets (RWA)", slug:"rwa-tokenization", desc:"Tokenized assets require cross-chain interoperability to reach global markets." },
    { title:"Blockchain Security & Consensus Mechanisms", slug:"blockchain-security", desc:"The cryptographic security foundations that make cross-chain proofs trustworthy." },
    { title:"The Future of Web3 Infrastructure", slug:"future-of-web3", desc:"Cross-chain interoperability is the backbone of the unified Web3 ecosystem." },
    { title:"How Digital Identity Works on Blockchain", slug:"blockchain-digital-identity", desc:"Cross-chain identity enables portability of verifiable credentials across ecosystems." },
  ];

  const faqs = [
    { q:"What is cross-chain technology?", a:"Cross-chain technology refers to protocols, communication standards, and infrastructure that enable two or more independent blockchains to exchange digital assets, data, smart contract instructions, and messages without relying on centralized intermediaries." },
    { q:"How do blockchain bridges work?", a:"Blockchain bridges lock or burn tokens on the source chain and mint or release equivalent tokens on the destination chain, maintaining a 1:1 backing. More advanced bridges use cryptographic proofs, validator networks, or light client verification for trustless cross-chain operation." },
    { q:"What is the difference between a bridge and a messaging protocol?", a:"Bridges primarily transfer tokens and manage liquidity. Messaging protocols transfer information and smart contract instructions — enabling cross-chain logic execution without necessarily moving assets, making them more powerful for complex decentralized applications." },
    { q:"What are atomic swaps?", a:"Atomic swaps enable two users on different blockchains to directly exchange assets without a centralized exchange. Using Hashed Time-Locked Contracts (HTLCs), the swap either completes fully for both parties or refunds both — no partial execution is possible." },
    { q:"Why is cross-chain security so challenging?", a:"Cross-chain infrastructure must protect multiple networks, bridges, messaging layers, validators, oracles, and liquidity pools simultaneously. Each additional component increases the attack surface, requiring layered cryptographic and economic security models." },
    { q:"What is chain abstraction?", a:"Chain abstraction removes the need for users to understand which blockchain they are using, which wallet is compatible, or which bridge to use. Applications automatically manage these technical details — making blockchain infrastructure nearly invisible to end users." },
    { q:"How does Cosmos IBC differ from other protocols?", a:"Cosmos IBC (Inter-Blockchain Communication) enables sovereign blockchains to exchange verified information packets directly, without centralized bridges or validator consensus. Each connected chain remains independently governed while participating in the IBC ecosystem." },
    { q:"What is the future of cross-chain technology?", a:"Cross-chain interoperability will evolve toward chain abstraction, intent-based architecture, unified liquidity layers, and AI-powered routing — ultimately making blockchain infrastructure as seamless as the modern internet for governments, enterprises, and individuals globally." },
  ];

  const myths = [
    { myth:"Blockchain bridges are safe because they use smart contracts", reality:"Many of the largest Web3 hacks targeted bridges specifically. Smart contracts alone are insufficient — trustless bridges require decentralized validators, cryptographic proofs, independent audits, and continuous monitoring." },
    { myth:"Cross-chain means you need multiple wallets for each blockchain", reality:"Chain abstraction and account abstraction are making single-wallet, multi-chain experiences the standard. Users interact with one wallet address that works across all chains seamlessly." },
    { myth:"Atomic swaps are only for cryptocurrency speculation", reality:"Atomic swaps enable trustless peer-to-peer asset exchange across blockchains for any purpose — cross-border payments, trade settlement, asset diversification — without centralized exchanges or custodians." },
    { myth:"Cross-chain technology is too slow for enterprise use", reality:"Modern protocols like Chainlink CCIP and Cosmos IBC achieve near-instant cross-chain finality. Enterprise-grade solutions combine reliability, compliance frameworks, and performance characteristics suitable for institutional deployment." },
    { myth:"A single blockchain will eventually win and make cross-chain unnecessary", reality:"Different blockchains will continue to specialize — just as different databases serve different purposes. Interoperability between specialized chains will become more important as the ecosystem matures, not less." },
  ];

  const takeaways = [
    "Cross-chain technology enables independent blockchain networks to exchange assets, data, and smart contract instructions — forming the foundational communication layer of the multi-chain Web3 ecosystem.",
    "Blockchain bridges use lock-and-mint, burn-and-release, federated, or trustless models — each with different security properties, trust assumptions, and performance characteristics suited to different use cases.",
    "Cross-chain messaging protocols (LayerZero, Chainlink CCIP, Axelar, Cosmos IBC, Polkadot XCM) enable smart contract execution across multiple chains — far beyond simple token transfers.",
    "Atomic swaps with HTLCs enable trustless peer-to-peer asset exchange across blockchains — mathematically guaranteeing that swaps complete fully or refund both parties automatically.",
    "Bridge security is one of the biggest challenges in Web3 — requiring decentralized validators, cryptographic proofs, economic incentives, independent audits, and continuous monitoring.",
    "Chain abstraction and intent-based architecture will make blockchain complexity invisible — applications automatically route, settle, and optimize across multiple networks behind the scenes.",
  ];

  return (
    <div>
      {/* ── Intro ── */}
      <div id="intro" data-section="intro">
        <p style={pSt} className="cc-intro">The blockchain industry has evolved from a single-network ecosystem into a rapidly expanding multi-chain world. Thousands of blockchain networks now exist, each designed with unique architectures, consensus mechanisms, and specialized use cases. While this diversity has accelerated innovation, it has also created one of the biggest challenges in Web3: <strong style={{ color:"rgba(255,255,255,0.9)" }}>how can independent blockchains communicate securely?</strong></p>
        <p style={pSt}>Just as the modern internet connects millions of independent computer networks through standardized protocols, the future Web3 ecosystem depends on blockchain interoperability to create a truly global decentralized economy. Today, nearly every major blockchain project is investing heavily in cross-chain infrastructure.</p>

        {/* Problems without cross-chain */}
        <div className="cc-def" style={{ marginBottom:"3rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.35em", color:G, textTransform:"uppercase", marginBottom:"14px" }}>The Problem: Isolated Blockchain Ecosystems</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden" }}>
            {[
              { prob:"Fragmented Liquidity", icon:"💧", desc:"Ethereum liquidity stays on Ethereum. Solana liquidity stays on Solana. Capital becomes isolated — unable to flow where it is needed most." },
              { prob:"Poor User Experience", icon:"😩", desc:"Users install multiple wallets, transfer assets manually, use centralized exchanges, and pay multiple fees just to move between ecosystems." },
              { prob:"Developer Duplication", icon:"👨‍💻", desc:"Developers build identical applications on multiple blockchains separately — maintaining many codebases instead of one interoperable application." },
              { prob:"Enterprise Silos", icon:"🏢", desc:"Large organizations use multiple blockchain platforms that cannot communicate — creating data silos and integration complexity across departments." },
              { prob:"Global Economy Limits", icon:"🌍", desc:"Cross-border payments, tokenized assets, digital identity, CBDCs, and AI agents cannot function efficiently if every blockchain remains disconnected." },
              { prob:"Liquidity Inefficiency", icon:"📉", desc:"Without interoperability, the same capital must exist separately on each chain — reducing overall market efficiency and increasing slippage for users." },
            ].map((p,i) => (
              <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
                style={{ background:"#000", padding:"1.1rem", transition:"background 0.18s" }}>
                <div style={{ fontSize:"18px", marginBottom:"7px" }}>{p.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13px", color:"rgba(255,255,255,0.82)", marginBottom:"6px" }}>{p.prob}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.32)", lineHeight:1.6, margin:0 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Evolution Phases */}
        <h2 style={h2Style}>Evolution: From Single Chain to Unified Infrastructure</h2>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {evolutionPhases.map((p,i) => (
            <button key={i} onClick={() => setActivePhase(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 12px", border:`1px solid ${activePhase===i ? p.col : "rgba(255,255,255,0.1)"}`, color: activePhase===i ? p.col : "rgba(255,255,255,0.3)", background: activePhase===i ? `${p.col}12` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{p.phase}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activePhase} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${evolutionPhases[activePhase].col}30`, background:`${evolutionPhases[activePhase].col}06`, padding:"1.4rem 1.6rem", marginBottom:"3rem", borderRadius:"2px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px", flexWrap:"wrap", gap:"8px" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"18px", color:evolutionPhases[activePhase].col }}>{evolutionPhases[activePhase].phase}: {evolutionPhases[activePhase].name}</div>
              <div style={{ fontFamily:"monospace", fontSize:"9px", color:`${evolutionPhases[activePhase].col}80`, background:`${evolutionPhases[activePhase].col}10`, padding:"3px 10px", borderRadius:"2px" }}>{evolutionPhases[activePhase].years}</div>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.3vw,1.1rem)", color:"rgba(255,255,255,0.68)", lineHeight:1.8, margin:"0 0 14px" }}>{evolutionPhases[activePhase].desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"6px" }}>
              {evolutionPhases[activePhase].traits.map((t,j) => (
                <div key={j} style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                  <span style={{ color:evolutionPhases[activePhase].col, fontSize:"9px", flexShrink:0, opacity:0.6 }}>◆</span>
                  <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bridge Types ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>Blockchain Bridge Architecture: 4 Models</h2>
        <p style={pSt}>A blockchain bridge is a protocol that allows digital assets or information to move from one blockchain to another while maintaining ownership and consistency. There are four primary bridge architectures — each with different security properties, trust assumptions, and performance characteristics.</p>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {bridgeTypes.map((b,i) => (
            <button key={i} onClick={() => setActiveBridge(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 12px", border:`1px solid ${activeBridge===i ? b.col : "rgba(255,255,255,0.1)"}`, color: activeBridge===i ? b.col : "rgba(255,255,255,0.3)", background: activeBridge===i ? `${b.col}10` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{b.icon} {b.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeBridge} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${bridgeTypes[activeBridge].col}30`, background:`${bridgeTypes[activeBridge].col}06`, padding:"1.5rem 1.75rem", marginBottom:"2rem", borderRadius:"2px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
              <span style={{ fontSize:"22px" }}>{bridgeTypes[activeBridge].icon}</span>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"17px", color:bridgeTypes[activeBridge].col }}>{bridgeTypes[activeBridge].name}</div>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.98rem,2.2vw,1.1rem)", color:"rgba(255,255,255,0.68)", lineHeight:1.8, margin:"0 0 16px" }}>{bridgeTypes[activeBridge].desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:`${bridgeTypes[activeBridge].col}60`, marginBottom:"10px", textTransform:"uppercase" }}>How It Works</div>
                {bridgeTypes[activeBridge].steps.map((s,j) => (
                  <div key={j} style={{ display:"flex", gap:"10px", alignItems:"flex-start", padding:"4px 0", borderBottom:j<bridgeTypes[activeBridge].steps.length-1?"1px solid rgba(255,255,255,0.03)":"none" }}>
                    <span style={{ fontFamily:"monospace", fontSize:"9px", color:`${bridgeTypes[activeBridge].col}60`, flexShrink:0, marginTop:"1px" }}>{j+1}.</span>
                    <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.5)", marginBottom:"8px", textTransform:"uppercase" }}>Advantages</div>
                {bridgeTypes[activeBridge].pros.map((p,j) => (
                  <div key={j} style={{ display:"flex", gap:"8px", padding:"3px 0" }}>
                    <span style={{ color:"#4ade80", fontSize:"9px", flexShrink:0, opacity:0.6 }}>✔</span>
                    <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.38)" }}>{p}</span>
                  </div>
                ))}
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.5)", margin:"12px 0 8px", textTransform:"uppercase" }}>Risks</div>
                {bridgeTypes[activeBridge].cons.map((c,j) => (
                  <div key={j} style={{ display:"flex", gap:"8px", padding:"3px 0" }}>
                    <span style={{ color:"#f87171", fontSize:"9px", flexShrink:0, opacity:0.6 }}>✘</span>
                    <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.38)" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Atomic Swaps */}
        <h3 style={h3Style}>Atomic Swaps & HTLCs</h3>
        <p style={pSt}>An atomic swap enables two users on different blockchains to exchange assets directly — with no centralized exchange. The protocol guarantees that either both transactions complete or neither occurs. The mechanism relies on <strong style={{ color:"rgba(255,255,255,0.88)" }}>Hashed Time-Locked Contracts (HTLCs)</strong>.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          <div style={{ background:"#000", padding:"1.2rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.5)", marginBottom:"10px", textTransform:"uppercase" }}>Hash Lock</div>
            <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.35)", lineHeight:1.65, margin:"0 0 12px" }}>The receiver must reveal a secret cryptographic value to claim funds. Without this secret, assets remain inaccessible — even if the lock period passes.</p>
            <div style={{ fontFamily:"monospace", fontSize:"11px", color:G, background:"rgba(243,186,47,0.06)", padding:"8px 10px", borderRadius:"2px" }}>HASH(secret) → locks funds</div>
          </div>
          <div style={{ background:"#000", padding:"1.2rem", borderLeft:"1px solid rgba(243,186,47,0.06)" }}>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(96,165,250,0.5)", marginBottom:"10px", textTransform:"uppercase" }}>Time Lock</div>
            <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.35)", lineHeight:1.65, margin:"0 0 12px" }}>If the swap is not completed before a predefined deadline, funds automatically return to their original owners — preventing partial or fraudulent transactions.</p>
            <div style={{ fontFamily:"monospace", fontSize:"11px", color:"#60a5fa", background:"rgba(96,165,250,0.06)", padding:"8px 10px", borderRadius:"2px" }}>TIMEOUT → auto-refund both</div>
          </div>
        </div>
      </div>

      {/* ── Protocols ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>5 Leading Interoperability Protocols Compared</h2>
        <p style={pSt}>Modern decentralized applications require smart contracts, liquidity, identity, governance, and data to work seamlessly across multiple blockchains. Five leading protocols have emerged — each with different architectures, security models, and strengths.</p>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {protocols.map((p,i) => (
            <button key={i} onClick={() => setActiveProtocol(i)}
              style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.05em", padding:"5px 12px", border:`1px solid ${activeProtocol===i ? p.col : "rgba(255,255,255,0.1)"}`, color: activeProtocol===i ? p.col : "rgba(255,255,255,0.3)", background: activeProtocol===i ? `${p.col}10` : "none", cursor:"pointer", transition:"all 0.18s" }}>{p.icon} {p.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeProtocol} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${protocols[activeProtocol].col}30`, background:`${protocols[activeProtocol].col}06`, padding:"1.5rem 1.75rem", marginBottom:"2rem", borderRadius:"2px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px", flexWrap:"wrap", gap:"8px" }}>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"20px", color:protocols[activeProtocol].col }}>{protocols[activeProtocol].name}</div>
                <div style={{ fontFamily:"monospace", fontSize:"8px", color:`${protocols[activeProtocol].col}70`, letterSpacing:"0.2em", textTransform:"uppercase" }}>{protocols[activeProtocol].tagline}</div>
              </div>
              <span style={{ fontFamily:"monospace", fontSize:"9.5px", color:protocols[activeProtocol].col, background:`${protocols[activeProtocol].col}12`, border:`1px solid ${protocols[activeProtocol].col}25`, padding:"3px 12px", borderRadius:"2px" }}>{protocols[activeProtocol].strength}</span>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.98rem,2.2vw,1.1rem)", color:"rgba(255,255,255,0.68)", lineHeight:1.8, margin:"0 0 16px" }}>{protocols[activeProtocol].desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:`${protocols[activeProtocol].col}60`, marginBottom:"8px", textTransform:"uppercase" }}>Architecture</div>
                {protocols[activeProtocol].architecture.map((a,j) => (
                  <div key={j} style={{ display:"flex", gap:"8px", padding:"4px 0" }}>
                    <span style={{ color:protocols[activeProtocol].col, fontSize:"9px", flexShrink:0, opacity:0.5 }}>◆</span>
                    <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.5 }}>{a}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.5)", marginBottom:"8px", textTransform:"uppercase" }}>Best Use Cases</div>
                {protocols[activeProtocol].useCases.map((u,j) => (
                  <div key={j} style={{ display:"flex", gap:"8px", padding:"4px 0" }}>
                    <span style={{ color:"#4ade80", fontSize:"9px", flexShrink:0, opacity:0.5 }}>→</span>
                    <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.38)" }}>{u}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Protocol Comparison Table */}
        <div style={{ border:`1px solid rgba(243,186,47,0.1)`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          <div style={{ padding:"10px 14px", borderBottom:"1px solid rgba(243,186,47,0.1)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.45)", textTransform:"uppercase" }}>Protocol Comparison at a Glance</div>
          {[
            { name:"LayerZero", strength:"Lightweight messaging", best:"Multi-chain dApps", col:"#60a5fa" },
            { name:"Chainlink CCIP", strength:"Secure enterprise comms", best:"Banking & enterprise", col:"#375bd2" },
            { name:"Axelar", strength:"Universal interoperability", best:"Cross-chain dev", col:"#4ade80" },
            { name:"Cosmos IBC", strength:"Native blockchain comms", best:"Cosmos ecosystem", col:"#f87171" },
            { name:"Polkadot XCM", strength:"Shared security & messaging", best:"Polkadot parachains", col:"#e879f9" },
          ].map((r,i) => (
            <div key={i} style={{ display:"grid", gridTemplateColumns:"130px 1fr 1fr", gap:"0", background:i%2===0?"rgba(243,186,47,0.01)":"#000", borderBottom:i<4?"1px solid rgba(255,255,255,0.03)":"none", padding:"10px 14px", alignItems:"center" }}>
              <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13px", color:r.col }}>{r.name}</span>
              <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.35)" }}>{r.strength}</span>
              <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.25)" }}>{r.best}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Security ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>Cross-Chain Security: 6 Critical Risks</h2>
        <p style={pSt}>Cross-chain systems must protect multiple networks, communication protocols, bridges, and verification mechanisms simultaneously. Unlike a single blockchain, where validators secure one ledger, cross-chain infrastructure expands the attack surface across every connected component.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {securityRisks.map((r,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.2rem", transition:"background 0.18s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                <span style={{ fontSize:"18px" }}>{r.icon}</span>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:r.col }}>{r.risk}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.6, margin:0 }}>{r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Security best practices */}
        <div style={{ border:`1px solid rgba(74,222,128,0.12)`, borderRadius:"3px", padding:"1.2rem 1.5rem", background:"rgba(74,222,128,0.02)", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.5)", marginBottom:"10px", textTransform:"uppercase" }}>Modern Security Model Layers</div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            {["Cryptographic proofs","Validator consensus","Oracle verification","Multi-signature authorization","Fraud proofs","Light client verification","Economic incentives","Continuous monitoring"].map((s,i) => (
              <span key={i} style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(74,222,128,0.6)", background:"rgba(74,222,128,0.06)", border:"1px solid rgba(74,222,128,0.1)", padding:"3px 10px", borderRadius:"2px" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chain Abstraction & Future ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>Chain Abstraction & the Future of Web3</h2>
        <p style={pSt}>The most significant trend in cross-chain technology is <strong style={{ color:"rgba(255,255,255,0.9)" }}>Chain Abstraction</strong> — making blockchain complexity invisible to users. Applications automatically manage chain selection, bridge routing, fee payment, and settlement. Users simply interact with the application.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"2.5rem" }}>
          {chainAbstraction.map((c,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.25rem", transition:"background 0.18s" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"14px", color:c.col, marginBottom:"8px" }}>{c.concept}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.65, margin:0 }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <h3 style={h3Style}>Future Use Cases: Who Benefits?</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {futureUseCases.map((s,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.2rem", transition:"background 0.18s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                <span style={{ fontSize:"20px" }}>{s.icon}</span>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:s.col }}>{s.sector}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.6, margin:0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Internal Links */}
        <h3 style={h3Style}>Complete Blockchain Knowledge Series</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {internalLinks.map((lnk,i) => (
            <motion.a key={i} href={`/research/${lnk.slug}`} whileHover={{ background:"rgba(243,186,47,0.06)" }}
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
            <div key={i} style={{ borderBottom:"1px solid rgba(243,186,47,0.07)", overflow:"hidden" }}>
              <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                style={{ width:"100%", textAlign:"left", padding:"1rem 0", background:"transparent", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0 }}>{i+1}</div>
                <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"clamp(0.95rem,2.2vw,1.05rem)", color:openFaq===i?G:"rgba(255,255,255,0.82)", flex:1, textAlign:"left", lineHeight:1.4 }}>{f.q}</span>
                <span style={{ color:G, opacity:0.5, fontSize:"12px", flexShrink:0 }}>{openFaq===i?"▲":"▼"}</span>
              </button>
              <AnimatePresence>
                {openFaq===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:"hidden" }}>
                    <div style={{ paddingBottom:"1rem", paddingLeft:"34px" }}>
                      <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.08rem)", color:"rgba(255,255,255,0.55)", lineHeight:1.8, margin:0 }}>{f.a}</p>
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
        <div style={{ display:"grid", gap:"10px", marginBottom:"3rem" }}>
          {myths.map((m,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.06*i }}
              style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0", border:"1px solid rgba(243,186,47,0.08)", borderRadius:"3px", overflow:"hidden" }}>
              <div style={{ padding:"1rem 1.25rem", background:"rgba(239,68,68,0.03)" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.5)", marginBottom:"6px" }}>MYTH</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13px", color:"rgba(255,255,255,0.5)", lineHeight:1.6, margin:0 }}>{m.myth}</p>
              </div>
              <div style={{ padding:"1rem 1.25rem", background:"rgba(74,222,128,0.02)", borderLeft:"1px solid rgba(74,222,128,0.08)" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.55)", marginBottom:"6px" }}>REALITY</div>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"13px", color:"rgba(255,255,255,0.55)", lineHeight:1.6, margin:0 }}>{m.reality}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Takeaways ── */}
      <div id="takeaways" data-section="takeaways">
        <div style={{ border:`1px solid rgba(243,186,47,0.16)`, borderRadius:"4px", overflow:"hidden" }}>
          <div style={{ padding:"1rem 1.25rem", borderBottom:"1px solid rgba(243,186,47,0.1)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.45)", textTransform:"uppercase" }}>KEY TAKEAWAYS</div>
          {takeaways.map((t,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.07*i }}
              style={{ display:"flex", gap:"16px", alignItems:"flex-start", padding:"13px 18px", borderBottom:i<takeaways.length-1?"1px solid rgba(243,186,47,0.05)":"none", background:i%2===0?"rgba(243,186,47,0.015)":"#000" }}>
              <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.16)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0, marginTop:"1px" }}>{i+1}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.58)", lineHeight:1.65, margin:0 }}>{t}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Digital Identity Visual Article ───────────────────────────────────── */
