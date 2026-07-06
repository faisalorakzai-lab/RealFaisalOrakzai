import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Web3FutureVisual() {
  const h2Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.45rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem", lineHeight:1.25, letterSpacing:"-0.02em" };
  const h3Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.1rem,3vw,1.45rem)", color:"rgba(255,255,255,0.88)", margin:"2.25rem 0 0.75rem", lineHeight:1.3 };
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const [activeLayer, setActiveLayer] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState(0);
  const [activeSector, setActiveSector] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };

  React.useEffect(() => {
    const schemas = [
      { "@context":"https://schema.org","@type":"TechArticle",
        "headline":"The Future of Web3 Infrastructure: AI, Digital Identity, Cross-Chain Networks & the Next Internet",
        "description":"Explore the future of Web3 infrastructure, including AI integration, decentralized identity, cross-chain interoperability, tokenized economies, enterprise adoption, digital public infrastructure, and emerging technologies shaping the next generation of the internet.",
        "keywords":"Future of Web3, Web3 Infrastructure, Decentralized Internet, AI and Web3, Digital Identity, Self-Sovereign Identity, Cross-Chain Interoperability, Chain Abstraction, Modular Blockchain, DePIN, Tokenized Economy, CBDC, Enterprise Web3, Smart Cities, DAOs, Post Quantum Cryptography",
        "author":{"@type":"Person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii"],"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
        "publisher":{"@type":"Organization","name":"Orakzai Research Lab","url":"https://faisalorakzai.com","logo":{"@type":"ImageObject","url":"https://faisalorakzai.com/logo.png"}},
        "datePublished":"2026-07-01","dateModified":"2026-07-01",
        "url":"https://faisalorakzai.com/research/future-of-web3",
        "image":{"@type":"ImageObject","url":"https://faisalorakzai.com/mk/web3-future-hero.png","width":1200,"height":630},
        "inLanguage":"en-US","isAccessibleForFree":true,"proficiencyLevel":"Beginner" },
      { "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},
          {"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},
          {"@type":"ListItem","position":3,"name":"The Future of Web3 Infrastructure","item":"https://faisalorakzai.com/research/future-of-web3"}
        ] },
      {"@context":"https://schema.org","@type":"Person","@id":"https://faisalorakzai.com#person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii","https://github.com/faisalorakzai-lab"],"jobTitle":"Founder & Chairman","affiliation":{"@type":"Organization","name":"Orakzai Group"},"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
      {"@context":"https://schema.org","@type":"Organization","@id":"https://faisalorakzai.com#org","name":"Orakzai Group","url":"https://faisalorakzai.com","founder":{"@type":"Person","name":"Faisal Orakzai"}},
      {"@context":"https://schema.org","@type":"WebPage","name":"The Future of Web3 Infrastructure (2026)","url":"https://faisalorakzai.com/research/future-of-web3","description":"Explore the future of Web3 infrastructure, including AI, digital identity, cross-chain interoperability, tokenized economies, and emerging technologies.","author":{"@type":"Person","name":"Faisal Orakzai"},"datePublished":"2026-07-01","inLanguage":"en-US","isPartOf":{"@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com"}},
      {"@context":"https://schema.org","@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://faisalorakzai.com/research?q={search_term_string}"},"query-input":"required name=search_term_string"}},
      {"@context":"https://schema.org","@type":"Speakable","cssSelector":[".w3f-intro",".w3f-def"]}
    ];
    const existing = document.getElementById("w3f-extra-ld");
    if (existing) existing.remove();
    const el = document.createElement("script");
    el.id = "w3f-extra-ld"; el.type = "application/ld+json";
    el.text = JSON.stringify(schemas);
    document.head.appendChild(el);
    let canon = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://faisalorakzai.com/research/future-of-web3";
    return () => { document.getElementById("w3f-extra-ld")?.remove(); };
  }, []);

  const webEras = [
    { era:"Web1", subtitle:"Read-Only Internet", years:"1991–2004", col:"rgba(255,255,255,0.25)", items:["Static HTML pages","Centralized publishing","Basic search engines","Digital library model","No user interaction","Personal websites & directories"] },
    { era:"Web2", subtitle:"Interactive Internet", years:"2004–2020", col:"#60a5fa", items:["Social media platforms","Cloud computing","Mobile applications","E-commerce & SaaS","User-generated content","Platform-based economies"] },
    { era:"Web3", subtitle:"Ownership Internet", years:"2020–∞", col:G, items:["Decentralization","Digital ownership","Open protocols","Programmable assets","Cryptographic trust","Community governance"] },
  ];

  const infraLayers = [
    { name:"Blockchain Networks", icon:"⛓", col:"#60a5fa", desc:"Secure, decentralized ledgers for recording transactions and executing programmable logic — the trust foundation of every Web3 application.", examples:["Ethereum","Solana","Avalanche","Polygon"] },
    { name:"Decentralized Storage", icon:"💾", col:G, desc:"Files and digital content distributed across independent storage providers — improving resilience, reducing single points of failure, and enabling content-addressed data retrieval.", examples:["IPFS","Filecoin","Arweave","Storj"] },
    { name:"Distributed Computing", icon:"🖥", col:"#4ade80", desc:"Computational workloads shared across decentralized participants — enabling new cloud service models without dependence on centralized data center providers.", examples:["Akash Network","Golem","Render Network","io.net"] },
    { name:"Digital Identity", icon:"🪪", col:"#a78bfa", desc:"Individuals and organizations manage verifiable credentials while maintaining greater control over personal information — eliminating centralized identity databases.", examples:["ENS","Ceramic","Polygon ID","World ID"] },
    { name:"Interoperability Protocols", icon:"🔗", col:"#f87171", desc:"Allow independent blockchain networks and applications to exchange data and assets securely — creating an internet of blockchains rather than isolated digital islands.", examples:["Chainlink CCIP","LayerZero","Wormhole","IBC Protocol"] },
    { name:"Developer Infrastructure", icon:"🛠", col:"#34d399", desc:"APIs, SDKs, indexing services, testing environments, and deployment tools that simplify application development on decentralized networks.", examples:["The Graph","Alchemy","Infura","Hardhat"] },
  ];

  const aiWeb3 = [
    { title:"AI Agents", col:"#60a5fa", desc:"Autonomous software entities that observe data, make decisions, and execute actions without human input — managing portfolios, executing DeFi strategies, monitoring security, and negotiating M2M transactions." },
    { title:"Fraud Detection", col:G, desc:"AI systems analyze millions of transactions in real time to detect suspicious wallet activity, money laundering patterns, and smart contract exploits before significant damage occurs." },
    { title:"Blockchain Analytics", col:"#4ade80", desc:"Machine learning models analyze on-chain data to reveal network health, validator behavior, whale activity, liquidity flows, and emerging risks across decentralized ecosystems." },
    { title:"Governance Automation", col:"#a78bfa", desc:"AI automates routine governance decisions — proposal analysis, voter sentiment scoring, treasury allocation optimization — while humans retain authority over strategic choices." },
    { title:"Smart Infrastructure", col:"#f87171", desc:"Autonomous digital infrastructure that self-monitors, self-optimizes, self-heals, and predicts maintenance needs — powered by AI decision-making layered over blockchain auditability." },
  ];

  const identitySections = [
    { name:"Decentralized Identity (DID)", col:"#60a5fa",
      desc:"Instead of organizations owning user identities, individuals control their own digital identity through cryptographic credentials stored in secure digital wallets. No more scattered accounts and passwords across hundreds of platforms.",
      features:["User ownership of identity","Privacy by design","Verifiable credentials","Selective disclosure","Interoperability across platforms","No single identity provider"] },
    { name:"Self-Sovereign Identity (SSI)", col:G,
      desc:"SSI extends DID — individuals own, manage, and control identity credentials without permanent dependence on governments, corporations, or centralized databases. Organizations issue verifiable credentials; blockchain acts as a trust layer.",
      features:["Users hold their own credentials","Organizations issue verifiable proofs","Other organizations verify on-chain","No personal data stored on blockchain","Reduces fraud and identity theft","Cryptographic authentication"] },
    { name:"Account Abstraction", col:"#4ade80",
      desc:"Makes blockchain wallets behave like modern applications — eliminating the need for users to manage private keys manually. Future smart wallets support social recovery, biometrics, multi-device access, and programmable security policies.",
      features:["Social recovery of wallets","Multi-device access","Biometric authentication","Spending limits & automation","Multi-signature authorization","Subscription management"] },
  ];

  const chainSections = [
    { name:"Cross-Chain Bridges", col:"#60a5fa", desc:"Secure asset transfers between independent blockchain networks — allowing tokens, NFTs, and data to move across ecosystems that were previously isolated." },
    { name:"Interoperability Protocols", col:G, desc:"Standardized communication methods enabling cross-network messaging, shared identity, data synchronization, and unified application experiences across blockchains." },
    { name:"Chain Abstraction", col:"#4ade80", desc:"Removes the complexity of managing wallets, tokens, and fees across multiple chains from end users. Applications automatically handle technical details — the blockchain becomes nearly invisible." },
    { name:"Modular Blockchain", col:"#a78bfa", desc:"Separates blockchain into specialized layers — Execution (smart contracts), Consensus (validators), Data Availability (transaction data), and Settlement (final confirmation) — enabling higher scalability." },
  ];

  const modularLayers = [
    { layer:"Execution Layer", desc:"Processes transactions and executes smart contracts. Examples: Ethereum L2s, Rollups, Solana VM.", col:"#60a5fa" },
    { layer:"Consensus Layer", desc:"Determines agreement among validators on block validity. Examples: Ethereum PoS, Tendermint, PBFT.", col:G },
    { layer:"Data Availability Layer", desc:"Ensures transaction data remains accessible for verification. Examples: Celestia, EigenDA, Avail.", col:"#4ade80" },
    { layer:"Settlement Layer", desc:"Provides final confirmation and dispute resolution. Examples: Ethereum mainnet, Starknet settlement.", col:"#a78bfa" },
  ];

  const realWorldSectors = [
    { sector:"Finance & CBDCs", icon:"🏦", col:"#60a5fa", desc:"Central Bank Digital Currencies, stablecoins, programmable payments, automated settlement, cross-border transactions, and DeFi integration with traditional financial systems." },
    { sector:"Enterprise Web3", icon:"🏢", col:G, desc:"Supply chain transparency, digital document verification, asset tracking, financial reconciliation, trade finance, compliance reporting — Web3 complementing enterprise IT." },
    { sector:"Smart Cities", icon:"🌆", col:"#4ade80", desc:"Secure digital identity, intelligent transportation, public record management, utility coordination, transparent procurement, citizen services, and urban data integrity." },
    { sector:"Healthcare", icon:"🏥", col:"#a78bfa", desc:"Verifiable medical credentials, patient-controlled health records, pharmaceutical supply chain verification, medical research collaboration, and consent management." },
    { sector:"Education", icon:"🎓", col:"#f87171", desc:"Degree verification, academic transcripts, professional certifications, lifelong learning records, and cross-border credential recognition — portable educational identities." },
    { sector:"Energy & DePIN", icon:"⚡", col:"#34d399", desc:"Peer-to-peer energy trading, renewable energy certificates, smart grid coordination, carbon credit management, and decentralized physical infrastructure networks." },
    { sector:"Logistics & Supply Chain", icon:"📦", col:"#fbbf24", desc:"Shipment traceability, product authenticity, customs documentation, inventory visibility, trade documentation, and supplier verification at global scale." },
    { sector:"DAOs & Governance", icon:"🏛", col:"#60a5fa", desc:"Decentralized Autonomous Organizations enabling community governance through smart contracts — open-source communities, investment collectives, research collaborations, grant programs." },
    { sector:"IoT + Web3", icon:"📡", col:G, desc:"Billions of connected devices exchanging trusted data, authenticating securely, and participating in automated digital transactions — predictive maintenance, smart grids, autonomous logistics." },
  ];

  const visionTimeline = [
    { period:"2026–2028", title:"Infrastructure Maturation", items:["Cross-chain interoperability standards solidify","Account abstraction reaches mainstream wallets","AI agents launch in enterprise DeFi","CBDCs pilot in 50+ countries"] },
    { period:"2029–2032", title:"Enterprise & Government Adoption", items:["Web3 identity used in national digital ID systems","Tokenized assets reach $5T+ market cap","DePIN wireless networks compete with carriers","Smart city pilots scale to millions of users"] },
    { period:"2033–2035", title:"Integration Era", items:["Blockchain becomes invisible infrastructure layer","AI agents autonomously manage treasury operations","Post-quantum cryptography deployed across major chains","Multi-chain internet operates seamlessly"] },
    { period:"2036–2050", title:"Autonomous Digital Society", items:["AI + blockchain power autonomous economies","Self-healing, self-optimizing digital infrastructure","Quantum-resistant global financial networks","Digital public infrastructure on every continent"] },
  ];

  const challenges = [
    { name:"Scalability", col:"#f87171", desc:"Infrastructure must support billions of concurrent users while maintaining transaction throughput, low latency, and cryptographic security simultaneously." },
    { name:"User Experience", col:"#fbbf24", desc:"Complex wallets, key management, transaction fees, and technical jargon remain significant barriers to mainstream adoption beyond crypto-native users." },
    { name:"Regulation", col:"#a78bfa", desc:"Governments worldwide continue developing legal frameworks for digital assets, privacy, taxation, consumer protection, and financial compliance — timelines vary significantly." },
    { name:"Interoperability", col:"#60a5fa", desc:"Independent blockchain ecosystems must communicate reliably through open, secure standards — without creating new centralized points of failure in bridge infrastructure." },
    { name:"Cybersecurity", col:"#f87171", desc:"Smart contracts, cross-chain bridges, wallets, applications, and infrastructure require continuous auditing, monitoring, and improvement against evolving attack vectors." },
    { name:"Sustainability", col:"#4ade80", desc:"Future digital infrastructure must prioritize energy efficiency, responsible resource usage, and long-term environmental considerations as adoption scales globally." },
  ];

  const faqs = [
    { q:"What is Web3 infrastructure?", a:"Web3 infrastructure is the collection of technologies — blockchain networks, decentralized storage, identity systems, cloud computing, interoperability protocols, and developer tools — that support decentralized digital applications and services." },
    { q:"Will Web3 replace the current internet?", a:"No. Web3 is expected to complement and extend the existing internet by introducing decentralized capabilities, digital ownership, programmable assets, and improved interoperability — not replace Web1 or Web2 entirely." },
    { q:"Why is interoperability important in Web3?", a:"Interoperability allows independent blockchain networks and digital systems to exchange information and assets securely, reducing fragmentation, improving user experience, and enabling a unified multi-chain internet instead of isolated digital islands." },
    { q:"What role will AI play in Web3?", a:"AI supports automation, analytics, fraud detection, infrastructure optimization, digital assistants, and intelligent decision-making while blockchain provides transparency and verifiable records — together enabling increasingly autonomous digital economies." },
    { q:"Are governments adopting Web3 technologies?", a:"Many governments are actively exploring digital identity systems, land registries, Central Bank Digital Currencies (CBDCs), and public procurement platforms using Web3 technologies. Implementation timelines and approaches vary significantly by jurisdiction." },
    { q:"What is DePIN?", a:"DePIN (Decentralized Physical Infrastructure Networks) connects blockchain incentives with real-world infrastructure — wireless networks, storage hardware, computing resources, energy systems — where participants contribute physical resources and receive token incentives in return." },
    { q:"What is chain abstraction?", a:"Chain abstraction removes the complexity of managing different blockchains from end users. Future applications automatically handle which blockchain, wallet, and token to use in the background — making the technology nearly invisible to everyday users." },
    { q:"What challenges does Web3 face?", a:"Major challenges include scalability (supporting billions of users), user experience complexity, evolving regulation across jurisdictions, cross-chain interoperability standards, cybersecurity of smart contracts and bridges, and long-term environmental sustainability." },
  ];

  const myths = [
    { myth:"Web3 will completely replace the internet", reality:"Web3 extends and complements the existing internet. It adds decentralized infrastructure layers alongside traditional cloud and web technologies — not replacing them." },
    { myth:"Web3 is only about cryptocurrency speculation", reality:"Web3 encompasses digital identity, decentralized storage, AI agents, cross-chain infrastructure, tokenized real-world assets, enterprise supply chains, smart cities, and digital public infrastructure." },
    { myth:"DePIN is just another crypto project", reality:"DePIN connects blockchain incentives to real physical infrastructure — wireless networks, storage hardware, computing resources, energy systems — creating distributed alternatives to centralized providers." },
    { myth:"Web3 is too complex for mainstream adoption", reality:"Chain abstraction, account abstraction, and smart wallets are actively being developed to hide blockchain complexity from end users — making the technology as seamless as modern cloud applications." },
    { myth:"Quantum computing will immediately break Web3", reality:"Large-scale quantum computing capable of breaking current cryptography is still years or decades away. The blockchain community is already developing post-quantum cryptographic standards proactively." },
  ];

  const takeaways = [
    "Web3 infrastructure combines blockchain, AI, decentralized storage, digital identity, interoperability protocols, and DePIN into a unified programmable digital foundation for the next internet.",
    "The evolution Web1 (read) → Web2 (interact) → Web3 (own) represents a fundamental shift in digital ownership, trust, and participation — each era building on the last.",
    "AI agents and blockchain together enable autonomous digital economies — machines transacting, self-optimizing, and coordinating without constant human intervention, verified on immutable ledgers.",
    "Decentralized Identity (DID) and Self-Sovereign Identity (SSI) give individuals control over their digital credentials without dependence on centralized identity providers or passwords.",
    "Modular blockchain architecture separates execution, consensus, data availability, and settlement into specialized layers — enabling higher scalability, faster innovation, and flexible deployment.",
    "By 2035–2050, Web3 is expected to become foundational digital infrastructure for governments, enterprises, healthcare, education, energy, transportation, and global commerce worldwide.",
  ];

  const internalLinks = [
    { title:"What is Blockchain? A Complete Beginner's Guide", slug:"blockchain-basic", desc:"The foundational primer — understanding blockchain before exploring Web3's future." },
    { title:"Blockchain Infrastructure Explained", slug:"blockchain-infra", desc:"Nodes, validators, RPC, and the technical foundation Web3 builds upon." },
    { title:"Public vs Private vs Consortium Blockchains", slug:"blockchain-types", desc:"How different blockchain architectures power different Web3 use cases." },
    { title:"How Smart Contracts Work", slug:"smart-contracts", desc:"The programmable automation layer enabling AI agents and DAOs." },
    { title:"Tokenization of Real World Assets (RWA)", slug:"rwa-tokenization", desc:"How tokenized economies connect physical assets to Web3 infrastructure." },
    { title:"Blockchain Security & Consensus Mechanisms", slug:"blockchain-security", desc:"The cryptographic and consensus security foundation Web3 depends on." },
  ];

  return (
    <div>
      {/* ── Intro ── */}
      <div id="intro" data-section="intro">
        <p style={pSt} className="w3f-intro">The internet has transformed nearly every aspect of modern life. However, despite its remarkable success, today's digital ecosystem still faces significant challenges. Centralized platforms control vast amounts of data, users have limited ownership over their digital identities and assets, and online services rely on a small number of cloud providers whose failures affect billions.</p>
        <p style={pSt}>The next stage of internet evolution is commonly referred to as <strong style={{ color:"rgba(255,255,255,0.92)" }}>Web3</strong>. Rather than being defined by a single technology, Web3 represents a broader architectural shift toward decentralized infrastructure, programmable digital assets, user-controlled identity, and intelligent automation.</p>

        {/* Web Evolution Timeline */}
        <div className="w3f-def" style={{ marginBottom:"3rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.35em", color:G, textTransform:"uppercase", marginBottom:"14px" }}>The Evolution of the Internet</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden" }}>
            {webEras.map((w,i) => (
              <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1*i }}
                style={{ background:"#000", padding:"1.4rem" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"22px", color:w.col, marginBottom:"2px" }}>{w.era}</div>
                <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", color:`${w.col}99`, marginBottom:"4px", textTransform:"uppercase" }}>{w.subtitle}</div>
                <div style={{ fontFamily:"monospace", fontSize:"9px", color:"rgba(255,255,255,0.2)", marginBottom:"12px" }}>{w.years}</div>
                {w.items.map((it,j) => (
                  <div key={j} style={{ display:"flex", gap:"8px", padding:"4px 0", borderBottom:j<w.items.length-1?"1px solid rgba(255,255,255,0.03)":"none" }}>
                    <span style={{ color:w.col, fontSize:"9px", flexShrink:0, opacity:0.6 }}>◆</span>
                    <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.4)" }}>{it}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Infrastructure Layers */}
        <h2 style={h2Style}>Core Layers of Web3 Infrastructure</h2>
        <p style={pSt}>Web3 is not a single technology — it is a stack of interconnected infrastructure layers, each providing essential services that enable decentralized applications to scale securely and efficiently.</p>
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {infraLayers.map((l,i) => (
            <button key={i} onClick={() => setActiveLayer(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 12px", border:`1px solid ${activeLayer===i ? l.col : "rgba(255,255,255,0.1)"}`, color: activeLayer===i ? l.col : "rgba(255,255,255,0.3)", background: activeLayer===i ? `${l.col}10` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{l.icon} {l.name.split(" ")[0]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeLayer} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${infraLayers[activeLayer].col}30`, background:`${infraLayers[activeLayer].col}06`, padding:"1.5rem 1.75rem", marginBottom:"3rem", borderRadius:"2px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
              <span style={{ fontSize:"22px" }}>{infraLayers[activeLayer].icon}</span>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"17px", color:infraLayers[activeLayer].col }}>{infraLayers[activeLayer].name}</div>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.3vw,1.12rem)", color:"rgba(255,255,255,0.72)", lineHeight:1.8, margin:"0 0 14px" }}>{infraLayers[activeLayer].desc}</p>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {infraLayers[activeLayer].examples.map((e,i) => (
                <span key={i} style={{ fontFamily:"monospace", fontSize:"10px", color:infraLayers[activeLayer].col, background:`${infraLayers[activeLayer].col}10`, padding:"2px 10px", borderRadius:"2px" }}>{e}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── AI + Web3 ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>AI + Web3: Intelligent Decentralized Infrastructure</h2>
        <p style={pSt}>Artificial Intelligence and Web3 are two of the most transformative technologies of the digital era. AI enables machines to learn, reason, and automate complex tasks. Web3 provides decentralized infrastructure that enhances transparency, security, and user ownership. Together, they create intelligent, autonomous digital ecosystems capable of operating with minimal human intervention.</p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"2.5rem" }}>
          {aiWeb3.map((a,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.25rem", transition:"background 0.18s" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"14.5px", color:a.col, marginBottom:"8px" }}>{a.title}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.33)", lineHeight:1.65, margin:0 }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* DePIN */}
        <h3 style={h3Style}>DePIN: Decentralized Physical Infrastructure Networks</h3>
        <p style={pSt}>One of the fastest-growing areas within Web3, DePIN connects blockchain incentives with real-world physical infrastructure. Instead of a single company owning and operating infrastructure, individuals and organizations contribute physical resources to a shared network and receive token incentives in return.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {[
            { item:"Wireless Networks", icon:"📶", desc:"Decentralized 5G and WiFi coverage contributed by individual hotspot operators." },
            { item:"Storage Hardware", icon:"💾", desc:"Distributed storage across independent providers replacing centralized data centers." },
            { item:"Computing Resources", icon:"🖥", desc:"Unused GPU and CPU power aggregated for AI training, rendering, and computation." },
            { item:"Energy Systems", icon:"⚡", desc:"Peer-to-peer energy trading, renewable certificates, and smart grid coordination." },
            { item:"Environmental Sensors", icon:"🌡", desc:"Distributed sensor networks providing real-time environmental and weather data." },
            { item:"Mapping & Location", icon:"🗺", desc:"Community-contributed geospatial data replacing centralized mapping monopolies." },
          ].map((d,i) => (
            <div key={i} style={{ background:"#000", padding:"1rem" }}>
              <div style={{ fontSize:"20px", marginBottom:"6px" }}>{d.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"13px", color:G, marginBottom:"5px" }}>{d.item}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.3)", lineHeight:1.55, margin:0 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Identity & Cross-Chain ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>Decentralized Identity & Cross-Chain Infrastructure</h2>
        <p style={pSt}>As Web3 ecosystems expand, two critical infrastructure challenges have emerged: <strong style={{ color:"rgba(255,255,255,0.88)" }}>who you are</strong> on the decentralized internet, and <strong style={{ color:"rgba(255,255,255,0.88)" }}>how different blockchain networks communicate</strong>. Decentralized identity and cross-chain infrastructure solve both problems.</p>

        {/* Identity Sections */}
        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {identitySections.map((s,i) => (
            <button key={i} onClick={() => setActiveSection(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.1em", padding:"5px 12px", border:`1px solid ${activeSection===i ? s.col : "rgba(255,255,255,0.1)"}`, color: activeSection===i ? s.col : "rgba(255,255,255,0.3)", background: activeSection===i ? `${s.col}10` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{s.name.split(" ")[0]}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${identitySections[activeSection].col}30`, background:`${identitySections[activeSection].col}06`, padding:"1.4rem 1.6rem", marginBottom:"2rem", borderRadius:"2px" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"16px", color:identitySections[activeSection].col, marginBottom:"10px" }}>{identitySections[activeSection].name}</div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.98rem,2.2vw,1.1rem)", color:"rgba(255,255,255,0.68)", lineHeight:1.8, margin:"0 0 14px" }}>{identitySections[activeSection].desc}</p>
            <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" }}>
              {identitySections[activeSection].features.map((f,i) => (
                <span key={i} style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.5)", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", padding:"3px 10px", borderRadius:"2px" }}>{f}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cross-Chain */}
        <h3 style={h3Style}>Cross-Chain & Modular Blockchain</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"1.5rem" }}>
          {chainSections.map((c,i) => (
            <div key={i} style={{ background:"#000", padding:"1.2rem" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"14px", color:c.col, marginBottom:"8px" }}>{c.name}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.65, margin:0 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Modular Layers */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          <div style={{ padding:"10px 14px", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:G, textTransform:"uppercase", borderBottom:"1px solid rgba(243,186,47,0.1)" }}>Modular Blockchain Architecture</div>
          {modularLayers.map((ml,i) => (
            <div key={i} style={{ background:"#000", padding:"0.85rem 1.1rem", display:"flex", gap:"14px", alignItems:"center" }}>
              <div style={{ width:"3px", height:"36px", background:ml.col, borderRadius:"2px", flexShrink:0 }}/>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"13.5px", color:ml.col, marginBottom:"3px" }}>{ml.layer}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.35)", lineHeight:1.55, margin:0 }}>{ml.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Real World Industries ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>Real-World Adoption: 9 Sectors Being Transformed</h2>
        <p style={pSt}>The next generation of Web3 infrastructure is not simply about replacing existing systems — it is about creating programmable, interoperable, and secure digital foundations for finance, commerce, public services, and global collaboration. Governments, enterprises, and financial institutions are actively investing.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {realWorldSectors.map((s,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.2rem", transition:"background 0.18s" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                <span style={{ fontSize:"18px" }}>{s.icon}</span>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"13.5px", color:s.col }}>{s.sector}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.3)", lineHeight:1.6, margin:0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Vision Timeline ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>Web3 Vision: 2026–2050</h2>
        <p style={pSt}>By 2035 and beyond, Web3 is expected to evolve from an emerging technology stack into foundational digital infrastructure supporting governments, enterprises, financial institutions, and billions of connected devices. The focus moves beyond cryptocurrencies toward interoperable ecosystems where identity, assets, intelligence, and digital services interact seamlessly.</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"2.5rem" }}>
          {visionTimeline.map((v,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.08*i }}
              style={{ background:"#000", padding:"1.2rem 1.5rem", display:"flex", gap:"16px" }}>
              <div style={{ flexShrink:0 }}>
                <div style={{ fontFamily:"monospace", fontWeight:700, fontSize:"10px", color:G, background:"rgba(243,186,47,0.08)", border:"1px solid rgba(243,186,47,0.2)", padding:"3px 10px", borderRadius:"2px", whiteSpace:"nowrap" }}>{v.period}</div>
              </div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"15px", color:"rgba(255,255,255,0.88)", marginBottom:"8px" }}>{v.title}</div>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {v.items.map((it,j) => (
                    <span key={j} style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.38)", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", padding:"2px 10px", borderRadius:"2px" }}>{it}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Challenges */}
        <h3 style={h3Style}>Key Challenges Ahead</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {challenges.map((c,i) => (
            <div key={i} style={{ background:"#000", padding:"1.2rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"7px" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:c.col, flexShrink:0 }}/>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"14px", color:c.col }}>{c.name}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.65, margin:0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Internal Links ── */}
      <div id="future" data-section="future">
        <h3 style={h3Style}>The Complete Blockchain Series</h3>
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

/* ── Blockchain Security Visual Article ────────────────────────────────── */
