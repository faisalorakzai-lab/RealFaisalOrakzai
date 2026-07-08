import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlockchainSecurityVisual() {
  const h2Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.45rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem", lineHeight:1.25, letterSpacing:"-0.02em" };
  const h3Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.1rem,3vw,1.45rem)", color:"rgba(255,255,255,0.88)", margin:"2.25rem 0 0.75rem", lineHeight:1.3 };
  const h4Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1rem,2.4vw,1.2rem)", color:"rgba(255,255,255,0.85)", margin:"0 0 0.5rem", lineHeight:1.35 };
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const [activeConsensus, setActiveConsensus] = React.useState(0);
  const [activeAttack, setActiveAttack] = React.useState(0);
  const [activeCrypto, setActiveCrypto] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };

  React.useEffect(() => {
    const schemas = [
      {
        "@context":"https://schema.org","@type":"TechArticle",
        "headline":"Blockchain Security & Consensus Mechanisms Explained: PoW, PoS, Cryptography, Attacks & Future Security Guide",
        "description":"Learn how blockchain security works through consensus mechanisms, cryptography, validator security, common attacks, AI-driven protection, quantum computing readiness, and enterprise best practices in this comprehensive guide.",
        "keywords":"Blockchain Security, Consensus Mechanisms, Proof of Work, Proof of Stake, Blockchain Cryptography, Digital Signatures, Merkle Tree, Blockchain Hashing, 51% Attack, Sybil Attack, Eclipse Attack, Double Spending, Validator Security, Post Quantum Cryptography, AI in Blockchain Security, Zero Knowledge Proof",
        "author":{"@type":"Person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii"],"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
        "publisher":{"@type":"Organization","name":"Orakzai Research Lab","url":"https://faisalorakzai.com","logo":{"@type":"ImageObject","url":"https://faisalorakzai.com/logo.png"}},
        "datePublished":"2026-06-30","dateModified":"2026-06-30",
        "url":"https://faisalorakzai.com/research/blockchain-security",
        "image":{"@type":"ImageObject","url":"https://faisalorakzai.com/mk/blockchain-security-hero.png","width":1200,"height":630},
        "inLanguage":"en-US","isAccessibleForFree":true,"proficiencyLevel":"Beginner"
      },
      {
        "@context":"https://schema.org","@type":"BreadcrumbList",
        "itemListElement":[
          {"@type":"ListItem","position":1,"name":"Home","item":"https://faisalorakzai.com"},
          {"@type":"ListItem","position":2,"name":"Research","item":"https://faisalorakzai.com/research"},
          {"@type":"ListItem","position":3,"name":"Blockchain Security & Consensus Mechanisms","item":"https://faisalorakzai.com/research/blockchain-security"}
        ]
      },
      {"@context":"https://schema.org","@type":"Person","@id":"https://faisalorakzai.com#person","name":"Faisal Orakzai","url":"https://faisalorakzai.com/founder","sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii","https://github.com/faisalorakzai-lab"],"jobTitle":"Founder & Chairman","affiliation":{"@type":"Organization","name":"Orakzai Group"},"identifier":{"@type":"PropertyValue","propertyID":"ORCID","value":"0009-0000-0915-7272"}},
      {"@context":"https://schema.org","@type":"Organization","@id":"https://faisalorakzai.com#org","name":"Orakzai Group","url":"https://faisalorakzai.com","founder":{"@type":"Person","name":"Faisal Orakzai"}},
      {"@context":"https://schema.org","@type":"WebPage","name":"Blockchain Security & Consensus Mechanisms Explained (2026)","url":"https://faisalorakzai.com/research/blockchain-security","description":"Learn how blockchain security works through consensus mechanisms, cryptography, validator security, common attacks, and future security trends.","author":{"@type":"Person","name":"Faisal Orakzai"},"datePublished":"2026-06-30","inLanguage":"en-US","isPartOf":{"@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com"}},
      {"@context":"https://schema.org","@type":"WebSite","name":"Faisal Orakzai","url":"https://faisalorakzai.com","potentialAction":{"@type":"SearchAction","target":{"@type":"EntryPoint","urlTemplate":"https://faisalorakzai.com/research?q={search_term_string}"},"query-input":"required name=search_term_string"}},
      {"@context":"https://schema.org","@type":"Speakable","cssSelector":[".bsec-intro",".bsec-def"]}
    ];
    const existing = document.getElementById("bsec-extra-ld");
    if (existing) existing.remove();
    const el = document.createElement("script");
    el.id = "bsec-extra-ld"; el.type = "application/ld+json";
    el.text = JSON.stringify(schemas);
    document.head.appendChild(el);
    let canon = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = "https://faisalorakzai.com/research/blockchain-security";
    return () => { document.getElementById("bsec-extra-ld")?.remove(); };
  }, []);

  const pillars = [
    { name:"Cryptography", icon:"🔐", desc:"Protects information using advanced mathematical algorithms — securing transactions, verifying identities, preventing unauthorized modifications, and enabling digital signatures." },
    { name:"Consensus Mechanisms", icon:"🤝", desc:"Allow independent network participants to agree on valid transactions and the current state of the blockchain without trusting one another or relying on a central authority." },
    { name:"Decentralization", icon:"🌐", desc:"Distributes identical copies of the ledger across thousands of nodes worldwide, making it significantly more difficult for attackers to alter historical records or compromise the entire network." },
  ];

  const consensusMechanisms = [
    { name:"Proof of Work (PoW)", abbr:"PoW", col:"#f87171", energy:"Very High", speed:"Moderate", security:"Excellent", decentralization:"Very High", bestFor:"Public cryptocurrencies — Bitcoin, Litecoin",
      how:"Miners compete to solve complex mathematical puzzles. The first solver validates the block, earns block rewards, and fees. Others verify the solution. Changing history requires re-mining all subsequent blocks.",
      pros:["Extremely battle-tested security","Highly resistant to manipulation","Strong decentralization when mining is broad","No stake concentration risk"],
      cons:["Very high electricity consumption","Expensive ASIC hardware required","Lower transaction throughput","Longer confirmation times"],
      networks:["Bitcoin","Litecoin","Dogecoin","Monero","Kaspa"] },
    { name:"Proof of Stake (PoS)", abbr:"PoS", col:"#4ade80", energy:"Very Low", speed:"High", security:"Excellent", decentralization:"High", bestFor:"Modern Layer-1 blockchains — Ethereum, Cardano, Solana",
      how:"Validators lock cryptocurrency as collateral. The protocol selects validators based on stake and randomization. Honest validators earn rewards. Dishonest validators lose stake (slashing). No computing puzzle required.",
      pros:["99.95% less energy than PoW","Faster transaction finality","Lower hardware requirements","Better scalability and throughput"],
      cons:["Wealth concentration risk","Complex validator selection logic","Slashing risks for validators","More sophisticated governance needed"],
      networks:["Ethereum","Cardano","Solana","Avalanche","Polygon","Near Protocol"] },
    { name:"Delegated PoS (DPoS)", abbr:"DPoS", col:G, energy:"Very Low", speed:"Very High", security:"High", decentralization:"Medium", bestFor:"High-performance public networks — EOS, TRON",
      how:"Token holders vote to elect a limited number of trusted block producers (delegates/witnesses). These elected validators produce blocks on behalf of the community. Poor performers can be voted out.",
      pros:["Extremely high transaction throughput","Very fast confirmation times","Low operational fees","Democratic governance model"],
      cons:["Smaller validator set (fewer block producers)","Risk of cartel formation","Reduced decentralization if participation is low","Political dynamics in voting"],
      networks:["EOS","TRON","BitShares","Lisk"] },
    { name:"Proof of Authority (PoA)", abbr:"PoA", col:"#a78bfa", energy:"Very Low", speed:"Extremely High", security:"High", decentralization:"Low", bestFor:"Enterprise & private blockchains",
      how:"Validators are pre-approved based on verified identity and reputation rather than computing power or token holdings. Known entities stake their identity as collateral, creating reputational security.",
      pros:["Very high speed and predictability","Extremely low operational cost","Suitable for regulated environments","Easy governance and compliance"],
      cons:["Significantly less decentralized","Requires trust in validator identities","Not suitable for open public networks","Single points of failure risk"],
      networks:["Hyperledger Besu","VeChain","Energy Web Chain","Private enterprise networks"] },
    { name:"PBFT", abbr:"PBFT", col:"#60a5fa", energy:"Very Low", speed:"Very High", security:"Excellent", decentralization:"Low–Medium", bestFor:"Banking, consortium & enterprise systems",
      how:"Known validators exchange multiple rounds of messages (pre-prepare, prepare, commit) until a required majority agrees on a block. Provides immediate finality. Continues operating if some validators fail or act maliciously.",
      pros:["Immediate transaction finality","Very high throughput","Low energy consumption","Excellent for enterprise applications"],
      cons:["Communication overhead grows with validator count","Best suited for smaller permissioned networks","Not suited for thousands of validators","Complex failure recovery"],
      networks:["Hyperledger Fabric","Tendermint","Quorum","IBM Blockchain"] },
    { name:"Proof of History (PoH)", abbr:"PoH", col:"#34d399", energy:"Low", speed:"Extremely High", security:"High", decentralization:"High", bestFor:"High-throughput blockchain infrastructure",
      how:"Creates a cryptographic record proving that events occurred in a specific sequence before consensus. Validators have a verifiable clock, reducing coordination overhead massively. Often combined with PoS for final validation.",
      pros:["Extremely high performance","Faster parallel transaction processing","Improved scalability","Novel approach to timing consensus"],
      cons:["Technically complex architecture","Often needs companion consensus","Hardware requirements higher than basic PoS","Newer, less battle-tested"],
      networks:["Solana (combined with PoS)"] },
  ];

  const attacks = [
    { name:"51% Attack", severity:"CRITICAL", col:"#ef4444",
      what:"An attacker controls more than 50% of the network's consensus power (hash rate in PoW, staked tokens in PoS), gaining temporary majority control.",
      canDo:["Reverse recent transactions","Execute double-spending attacks","Prevent transaction confirmations","Censor specific users temporarily","Delay new block creation"],
      cannotDo:["Create coins from nothing","Alter deeply buried historical blocks","Break cryptographic signatures","Steal from unrelated wallets without private keys"],
      examples:["Ethereum Classic (ETC) — multiple reorganizations & double spends","Bitcoin Gold — successful majority attacks due to smaller network"],
      protection:"Large networks like Bitcoin require billions of dollars in hardware + energy for a 51% attack — making it economically irrational." },
    { name:"Sybil Attack", severity:"HIGH", col:"#f97316",
      what:"An attacker creates thousands of fake node identities inside a decentralized network to appear as independent participants while actually being controlled by one entity.",
      canDo:["Manipulate peer discovery","Spread false blockchain state information","Delay transaction propagation","Influence consensus in weak or new networks"],
      cannotDo:["Break economic consensus in mature PoW/PoS networks","Create valid blocks without real resources","Override honest majority validators"],
      examples:["P2P network manipulation","Reputation gaming in weak governance systems","Eclipse attack setup using Sybil nodes"],
      protection:"PoW requires expensive hardware. PoS requires locked capital. Both make creating fake identities economically costly rather than free." },
    { name:"Eclipse Attack", severity:"HIGH", col:"#f59e0b",
      what:"An attacker isolates one blockchain node by surrounding it with malicious peers, cutting it off from the honest network and feeding it false information.",
      canDo:["Feed victim outdated or false blockchain state","Cause victim to mine on wrong chain","Make victim vulnerable to double spending","Delay victim's transactions indefinitely"],
      cannotDo:["Affect the broader honest network","Compromise nodes with diverse peer connections","Break nodes that use randomized peer selection"],
      examples:["Research-demonstrated attacks on early Bitcoin node implementations","Routing-level attacks using BGP hijacking"],
      protection:"Modern clients use random peer selection, large peer tables, geographic diversity, peer rotation, connection limits, and reputation systems." },
    { name:"Double Spending", severity:"CRITICAL", col:"#8b5cf6",
      what:"An attacker attempts to spend the same digital coin twice — sending it to a merchant and simultaneously sending it back to themselves before the first transaction is confirmed.",
      canDo:["Defraud merchants accepting 0-confirmation transactions","Exploit fast-finality networks with insufficient confirmations","Combine with 51% attack to guarantee success"],
      cannotDo:["Successfully double-spend on networks requiring many confirmations","Fool nodes that wait for full block finality","Work without network majority in secure PoS systems"],
      examples:["Race attacks on merchants accepting 0-conf payments","Successful double-spends during 51% attacks on small chains"],
      protection:"Consensus mechanisms ensure only one valid transaction is permanently recorded. More confirmations = exponentially harder to reverse." },
    { name:"Long-Range Attack", severity:"MEDIUM", col:"#06b6d4",
      what:"In Proof of Stake systems, an attacker obtains old validator keys (from past participants who have withdrawn) to build an alternative blockchain starting far in the past.",
      canDo:["Build a longer alternative chain from historical point","Potentially deceive new nodes joining the network","Rewrite history on PoS chains without finality"],
      cannotDo:["Affect nodes with access to social consensus","Override finality checkpoints in modern PoS designs","Work against networks with proper slashing history"],
      examples:["Theoretical attack on early PoS designs","Mitigated in Ethereum via finality and slashing"],
      protection:"Modern PoS uses checkpoints, finality, weak subjectivity, validator slashing, and social consensus to prevent long-range rewrites." },
  ];

  const cryptoComponents = [
    { name:"Cryptographic Hashing", col:"#60a5fa",
      desc:"Converts any input into a fixed-length fingerprint. The same input always produces the same hash. Changing even one character produces a completely different hash — making tampering immediately detectable.",
      detail:"Bitcoin uses SHA-256. Ethereum uses Keccak-256. Properties: Deterministic, One-Way (cannot reverse), Collision Resistant, Avalanche Effect. Each block contains the previous block's hash — creating a tamper-evident chain.",
      examples:["SHA-256 (Bitcoin)","Keccak-256 (Ethereum)","SHA-3","BLAKE2","RIPEMD-160 (Bitcoin addresses)"] },
    { name:"Merkle Trees", col:G,
      desc:"Organizes all block transactions into a hierarchical hash structure, producing a single Merkle Root. Enables efficient verification of any transaction without downloading the full blockchain.",
      detail:"Every transaction is hashed. Pairs of hashes are combined and hashed again until one Merkle Root remains. This root is stored in the block header. Benefits: efficient verification, faster sync, tamper detection, lightweight client (SPV) support.",
      examples:["Bitcoin block transaction verification","Ethereum state tree","SPV (Simplified Payment Verification)","Cross-chain proof verification"] },
    { name:"Digital Signatures", col:"#4ade80",
      desc:"Prove a transaction was authorized by the owner of the private key — without revealing the private key. The network verifies using the public key, confirming authenticity and preventing denial.",
      detail:"When signing: the transaction is hashed, the hash is signed with the private key, other nodes verify with the public key. Confirms: transaction was authorized by owner, not modified after signing, sender cannot deny authorization.",
      examples:["ECDSA (Bitcoin & Ethereum)","EdDSA (Solana, Cardano)","Schnorr signatures (Bitcoin Taproot)","BLS signatures (Ethereum PoS)"] },
    { name:"Public Key Cryptography", col:"#a78bfa",
      desc:"Each participant has a mathematically related key pair. The public key is shared openly to receive assets or verify signatures. The private key must remain secret — it authorizes transactions and proves ownership.",
      detail:"Asymmetric cryptography: two different keys, one mathematical relationship. Anyone can verify a signature with the public key, but only the private key holder can create a valid signature. This enables trustless ownership without revealing secrets.",
      examples:["Elliptic Curve Cryptography (secp256k1)","RSA (legacy systems)","Ed25519 (modern blockchains)","X25519 (key exchange)"] },
  ];

  const trilemmaData = [
    { label:"Security", val:95, col:"#ef4444", note:"Resistance to attacks and fraud" },
    { label:"Scalability", val:35, col:"#60a5fa", note:"Transaction throughput capacity" },
    { label:"Decentralization", val:85, col:"#4ade80", note:"Independent participant distribution" },
  ];

  const futureTrends = [
    { title:"AI-Driven Threat Detection", col:"#60a5fa", desc:"AI systems monitor blockchain networks 24/7, analyzing millions of transactions to detect suspicious wallet activity, money laundering patterns, smart contract exploits, and validator anomalies before damage occurs." },
    { title:"Post-Quantum Cryptography", col:G, desc:"Blockchain industry proactively developing quantum-resistant algorithms: lattice-based cryptography, hash-based signatures, multivariate cryptography, and hybrid cryptographic systems to protect networks long-term." },
    { title:"Zero Knowledge Proofs (ZKPs)", col:"#4ade80", desc:"ZKPs allow users to prove information without revealing underlying data — enabling privacy-preserving identity, confidential transactions, secure authentication, and regulatory compliance with minimal data exposure." },
    { title:"Decentralized Identity (DID)", col:"#a78bfa", desc:"Users control their own digital identities using cryptographic credentials instead of centralized usernames and passwords — reducing identity theft, improving privacy, and enabling cross-platform interoperability." },
    { title:"Multi-Party Computation (MPC)", col:"#f87171", desc:"MPC divides cryptographic operations among multiple participants so no single party possesses the complete secret — greatly reducing private key theft risk for institutions managing large digital asset portfolios." },
    { title:"Zero Trust Enterprise Architecture", col:"#34d399", desc:"Every user, device, and application must be continuously verified before gaining access — combined with Hardware Security Modules (HSMs), confidential computing, and AI-driven threat intelligence for enterprise blockchain deployments." },
  ];

  const faqs = [
    { q:"What is blockchain security?", a:"Blockchain security is a combination of cryptography, consensus mechanisms, and decentralized network architecture that protects the integrity and authenticity of data stored on a blockchain without relying on a central authority." },
    { q:"What is a consensus mechanism?", a:"A consensus mechanism is the protocol that allows thousands of independent nodes to agree on a single, trusted version of the blockchain ledger without trusting each other or a central organization. Examples include Proof of Work, Proof of Stake, and PBFT." },
    { q:"What is Proof of Work vs Proof of Stake?", a:"Proof of Work requires miners to solve complex mathematical puzzles using computing power and electricity. Proof of Stake requires validators to lock cryptocurrency as collateral. PoS uses 99.95% less energy than PoW while achieving similar or better security for most use cases." },
    { q:"What is a 51% attack?", a:"A 51% attack occurs when one entity controls more than half of a blockchain's consensus power, allowing them to reverse recent transactions, perform double spending, and temporarily censor users — though they cannot create coins from nothing or steal from unrelated wallets." },
    { q:"What is the Blockchain Trilemma?", a:"The Blockchain Trilemma is the challenge of simultaneously optimizing Security, Scalability, and Decentralization. Most networks optimize two while sacrificing one. Bitcoin prioritizes Security + Decentralization. Enterprise chains often prioritize Scalability + Security." },
    { q:"What is cryptographic hashing?", a:"Cryptographic hashing converts any input into a fixed-length fingerprint. The same input always produces the same hash, but changing even one character produces a completely different hash — making unauthorized modifications immediately detectable on the blockchain." },
    { q:"What is a Merkle Tree in blockchain?", a:"A Merkle Tree organizes all transactions in a block into a hierarchical hash structure, producing a single Merkle Root stored in the block header. It enables efficient and tamper-proof verification of any transaction without downloading the full blockchain." },
    { q:"What is post-quantum cryptography?", a:"Post-quantum cryptography develops cryptographic algorithms that remain secure even against powerful quantum computers — including lattice-based cryptography, hash-based signatures, and multivariate cryptography — to protect blockchain networks as quantum computing advances." },
  ];

  const myths = [
    { myth:"Blockchain is completely unhackable", reality:"Blockchain protocol is extremely secure, but attacks target weak consensus networks, smart contract bugs, exchange vulnerabilities, private key theft, or social engineering — not always the blockchain itself." },
    { myth:"Proof of Work is always the most secure", reality:"PoW is very secure for large networks like Bitcoin, but smaller PoW networks are highly vulnerable to 51% attacks. PoS and PBFT can be equally or more secure depending on implementation." },
    { myth:"Quantum computing will break blockchain immediately", reality:"Large-scale quantum computing capable of breaking current cryptography is still years or decades away. The industry is already developing post-quantum solutions proactively." },
    { myth:"Decentralization alone makes blockchain secure", reality:"Decentralization is one pillar. Cryptography, consensus quality, smart contract auditing, validator security, and user practices are equally critical security components." },
    { myth:"Once on the blockchain, data can never be changed", reality:"Data on well-secured blockchains is extremely difficult to alter, but governance processes or protocol upgrades may allow limited modifications under predefined rules in certain systems." },
  ];

  const takeaways = [
    "Blockchain security relies on three interconnected pillars: Cryptography, Consensus Mechanisms, and Decentralization — weakness in any one creates attack opportunities.",
    "Cryptographic hash functions (SHA-256, Keccak-256) create tamper-evident records — changing any data completely changes the hash, making manipulation immediately detectable.",
    "The Blockchain Trilemma means networks must balance Security, Scalability, and Decentralization simultaneously — improving one typically reduces another.",
    "Major attacks (51%, Sybil, Eclipse, double-spending, long-range) exploit economic incentives and network participation gaps rather than breaking cryptography itself.",
    "Proof of Work prioritizes security and decentralization but uses high energy. Proof of Stake achieves similar security at 99.95% lower energy cost — enabling broader participation.",
    "Future blockchain security will combine AI-driven monitoring, Zero Knowledge Proofs, post-quantum cryptography, and decentralized identity to create more resilient global systems.",
  ];

  const internalLinks = [
    { title:"What is Blockchain? A Complete Beginner's Guide", slug:"blockchain-basic", desc:"The foundational primer — how blockchain works, its history, and core concepts." },
    { title:"Blockchain Infrastructure Explained", slug:"blockchain-infra", desc:"Nodes, validators, RPC, Layer-2, and the full technical foundation blockchain security protects." },
    { title:"Public vs Private vs Consortium Blockchains", slug:"blockchain-types", desc:"How different blockchain architectures make different security trade-offs." },
    { title:"How Smart Contracts Work", slug:"smart-contracts", desc:"Smart contract vulnerabilities and security are a critical part of blockchain security." },
    { title:"Tokenization of Real World Assets (RWA)", slug:"rwa-tokenization", desc:"How blockchain security enables trustless tokenization of physical assets." },
  ];

  return (
    <div>
      {/* ── Intro ── */}
      <div id="intro" data-section="intro">
        <p style={pSt} className="bsec-intro">Blockchain technology is often described as one of the most secure digital infrastructures ever created. Unlike traditional databases where a central administrator controls data, blockchain distributes information across thousands of independent nodes. Every transaction is verified through mathematical rules, cryptographic algorithms, and network consensus rather than trust in a single organization.</p>
        <p style={pSt}>However, blockchain is <strong style={{ color:"rgba(255,255,255,0.9)" }}>not automatically "unhackable."</strong> Security depends on several interconnected layers — cryptography, consensus mechanisms, network architecture, node security, smart contract quality, and user practices. A weakness in any layer creates attack opportunities even if the protocol itself remains sound.</p>

        {/* 3 Pillars */}
        <div className="bsec-def" style={{ marginBottom:"3rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.35em", color:G, textTransform:"uppercase", marginBottom:"16px" }}>The Three Pillars of Blockchain Security</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden" }}>
            {pillars.map((p,i) => (
              <div key={i} style={{ background:"#000", padding:"1.4rem" }}>
                <div style={{ fontSize:"28px", marginBottom:"10px" }}>{p.icon}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"16px", color:G, marginBottom:"8px" }}>{p.name}</div>
                <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.65, margin:0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Trilemma */}
        <h2 style={h2Style}>The Blockchain Trilemma</h2>
        <p style={pSt}>Every blockchain must balance three competing properties. Improving one typically reduces another — a fundamental engineering trade-off known as the Blockchain Trilemma. Bitcoin prioritizes Security + Decentralization. Enterprise chains prioritize Scalability + Security. Layer-2 systems improve scalability while relying on Layer-1 for security.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {trilemmaData.map((t,i) => (
            <div key={i} style={{ background:"#000", padding:"1.4rem" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"16px", color:t.col, marginBottom:"10px" }}>{t.label}</div>
              <div style={{ height:"4px", background:`${t.col}22`, borderRadius:"2px", marginBottom:"8px", overflow:"hidden" }}>
                <motion.div initial={{ width:0 }} animate={{ width:`${t.val}%` }} transition={{ duration:1, delay:0.1*i }} style={{ height:"100%", background:t.col, borderRadius:"2px" }}/>
              </div>
              <div style={{ fontFamily:"monospace", fontSize:"10px", color:`${t.col}aa` }}>{t.val}% optimized</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.3)", margin:"6px 0 0", lineHeight:1.5 }}>{t.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Cryptography Fundamentals ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>Cryptography Fundamentals</h2>
        <p style={pSt}>Without cryptography, blockchain technology could not function securely. Modern blockchain networks depend on four core cryptographic components — each serving a distinct but complementary security role.</p>

        <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"12px" }}>
          {cryptoComponents.map((c,i) => (
            <button key={i} onClick={() => setActiveCrypto(i)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.12em", padding:"5px 14px", border:`1px solid ${activeCrypto===i ? c.col : "rgba(255,255,255,0.1)"}`, color: activeCrypto===i ? c.col : "rgba(255,255,255,0.3)", background: activeCrypto===i ? `${c.col}11` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>{c.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeCrypto} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${cryptoComponents[activeCrypto].col}33`, background:`${cryptoComponents[activeCrypto].col}06`, padding:"1.5rem 1.75rem", marginBottom:"1rem", borderRadius:"2px" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"17px", color:cryptoComponents[activeCrypto].col, marginBottom:"10px" }}>{cryptoComponents[activeCrypto].name}</div>
            <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.3vw,1.12rem)", color:"rgba(255,255,255,0.72)", lineHeight:1.8, margin:"0 0 12px" }}>{cryptoComponents[activeCrypto].desc}</p>
            <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.38)", lineHeight:1.7, margin:"0 0 14px" }}>{cryptoComponents[activeCrypto].detail}</p>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {cryptoComponents[activeCrypto].examples.map((e,i) => (
                <span key={i} style={{ fontFamily:"monospace", fontSize:"10px", color:cryptoComponents[activeCrypto].col, background:`${cryptoComponents[activeCrypto].col}12`, padding:"2px 10px", borderRadius:"2px" }}>{e}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hash chain visualization */}
        <div style={{ display:"flex", gap:"2px", alignItems:"center", marginBottom:"3rem", overflowX:"auto", padding:"1rem", border:"1px solid rgba(243,186,47,0.08)", borderRadius:"4px" }}>
          {["Block 1","Block 2","Block 3","Block 4","Block 5"].map((b,i) => (
            <React.Fragment key={i}>
              <div style={{ background:i%2===0?"rgba(243,186,47,0.06)":"#0a0a0a", border:"1px solid rgba(243,186,47,0.12)", borderRadius:"3px", padding:"10px 12px", minWidth:"100px", flexShrink:0 }}>
                <div style={{ fontFamily:"monospace", fontSize:"7px", color:G, letterSpacing:"0.2em", marginBottom:"4px" }}>{b}</div>
                <div style={{ fontFamily:"monospace", fontSize:"7px", color:"rgba(255,255,255,0.2)" }}>Hash: A9F7...</div>
                <div style={{ fontFamily:"monospace", fontSize:"7px", color:"rgba(255,255,255,0.15)" }}>Prev: {i===0?"00000":["A9F7","B3C1","D8E2","F1A0"][i-1]}...</div>
              </div>
              {i<4 && <div style={{ color:"rgba(243,186,47,0.3)", fontSize:"14px", flexShrink:0 }}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Consensus Mechanisms ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>Consensus Mechanisms Deep Dive</h2>
        <p style={pSt}>A consensus mechanism is the protocol allowing all participating nodes to agree on a single trusted version of the blockchain without relying on any central organization. There is no universally "best" consensus — each makes different trade-offs between security, speed, energy, and decentralization.</p>

        <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:"0", marginBottom:"3.5rem" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:"2px", paddingRight:"1.25rem", borderRight:`1px solid rgba(243,186,47,0.08)` }}>
            {consensusMechanisms.map((c,i) => (
              <button key={i} onClick={() => setActiveConsensus(i)}
                style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 10px", background: activeConsensus===i ? `${c.col}0a` : "transparent", border:`1px solid ${activeConsensus===i ? `${c.col}40` : "transparent"}`, cursor:"pointer", textAlign:"left", transition:"all 0.18s" }}>
                <div style={{ width:"28px", height:"18px", background: activeConsensus===i ? `${c.col}20` : "rgba(255,255,255,0.03)", border:`1px solid ${activeConsensus===i ? c.col : "rgba(255,255,255,0.1)"}`, borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"7px", color: activeConsensus===i ? c.col : "rgba(255,255,255,0.2)", flexShrink:0 }}>{c.abbr}</div>
                <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color: activeConsensus===i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)", whiteSpace:"nowrap" }}>{c.name}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeConsensus} initial={{ opacity:0, x:8 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-8 }} transition={{ duration:0.2 }}
              style={{ paddingLeft:"1.5rem" }}>
              {(() => { const c = consensusMechanisms[activeConsensus]; return (
                <>
                  <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"12px" }}>
                    {[{k:"Energy",v:c.energy},{k:"Speed",v:c.speed},{k:"Security",v:c.security},{k:"Decentralization",v:c.decentralization}].map((m,i) => (
                      <div key={i} style={{ fontFamily:"monospace", fontSize:"8px", padding:"3px 10px", border:`1px solid ${c.col}33`, color:c.col, borderRadius:"2px" }}>
                        <span style={{ color:"rgba(255,255,255,0.25)" }}>{m.k}: </span>{m.v}
                      </div>
                    ))}
                  </div>
                  <h4 style={{ ...h4Style, color:c.col, marginTop:0, marginBottom:"8px" }}>{c.name}</h4>
                  <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.4)", lineHeight:1.7, margin:"0 0 14px" }}>{c.how}</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"12px" }}>
                    <div>
                      <div style={{ fontFamily:"monospace", fontSize:"7px", color:"rgba(74,222,128,0.6)", letterSpacing:"0.2em", marginBottom:"6px" }}>ADVANTAGES</div>
                      {c.pros.map((p,i) => <div key={i} style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.45)", lineHeight:1.6, padding:"2px 0" }}><span style={{ color:"#4ade80", marginRight:"6px", fontSize:"9px" }}>✓</span>{p}</div>)}
                    </div>
                    <div>
                      <div style={{ fontFamily:"monospace", fontSize:"7px", color:"rgba(239,68,68,0.6)", letterSpacing:"0.2em", marginBottom:"6px" }}>LIMITATIONS</div>
                      {c.cons.map((con,i) => <div key={i} style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.45)", lineHeight:1.6, padding:"2px 0" }}><span style={{ color:"#f87171", marginRight:"6px", fontSize:"9px" }}>✗</span>{con}</div>)}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" }}>
                    {c.networks.map((n,i) => <span key={i} style={{ fontFamily:"monospace", fontSize:"9px", background:`${c.col}10`, border:`1px solid ${c.col}25`, color:c.col, padding:"2px 8px", borderRadius:"2px" }}>{n}</span>)}
                  </div>
                </>
              ); })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Attacks ── */}
      <div id="limitations" data-section="limitations">
        <h2 style={h2Style}>Common Blockchain Attacks</h2>
        <p style={pSt}>Most blockchain attacks do not break cryptography — they exploit weaknesses in network participation, validator behavior, economic incentives, or software implementation. Understanding these attacks is essential for designing secure blockchain infrastructure.</p>

        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginBottom:"16px" }}>
          {attacks.map((a,i) => (
            <button key={i} onClick={() => setActiveAttack(i)}
              style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.12em", padding:"4px 12px", border:`1px solid ${activeAttack===i ? a.col : "rgba(255,255,255,0.1)"}`, color: activeAttack===i ? a.col : "rgba(255,255,255,0.3)", background: activeAttack===i ? `${a.col}11` : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>
              <span style={{ background:a.col, color:"#000", fontSize:"6px", padding:"1px 4px", borderRadius:"1px", marginRight:"4px", fontWeight:700 }}>{a.severity}</span>{a.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeAttack} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}
            style={{ border:`1px solid ${attacks[activeAttack].col}30`, background:`${attacks[activeAttack].col}05`, padding:"1.5rem 1.75rem", marginBottom:"2rem", borderRadius:"2px" }}>
            {(() => { const a = attacks[activeAttack]; return (
              <>
                <h4 style={{ ...h4Style, color:a.col, marginTop:0, marginBottom:"8px" }}>{a.name}</h4>
                <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.2vw,1.1rem)", color:"rgba(255,255,255,0.7)", lineHeight:1.8, margin:"0 0 16px" }}>{a.what}</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"14px" }}>
                  <div>
                    <div style={{ fontFamily:"monospace", fontSize:"7px", color:a.col, letterSpacing:"0.2em", marginBottom:"8px" }}>ATTACKER CAN</div>
                    {a.canDo.map((d,i) => <div key={i} style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.45)", lineHeight:1.65, padding:"2px 0" }}><span style={{ color:a.col, marginRight:"6px", fontSize:"9px" }}>◆</span>{d}</div>)}
                  </div>
                  <div>
                    <div style={{ fontFamily:"monospace", fontSize:"7px", color:"rgba(74,222,128,0.7)", letterSpacing:"0.2em", marginBottom:"8px" }}>ATTACKER CANNOT</div>
                    {a.cannotDo.map((d,i) => <div key={i} style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.45)", lineHeight:1.65, padding:"2px 0" }}><span style={{ color:"#4ade80", marginRight:"6px", fontSize:"9px" }}>✗</span>{d}</div>)}
                  </div>
                </div>
                <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:a.col, background:`${a.col}08`, border:`1px solid ${a.col}20`, padding:"8px 12px", borderRadius:"2px" }}>
                  <span style={{ opacity:0.6, marginRight:"6px" }}>🛡 Protection:</span>{a.protection}
                </div>
              </>
            ); })()}
          </motion.div>
        </AnimatePresence>

        {/* Validator & Node Security */}
        <h3 style={h3Style}>Validator & Node Security Best Practices</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          <div style={{ background:"#000", padding:"1.25rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.25em", color:G, textTransform:"uppercase", marginBottom:"12px" }}>Validator Security</div>
            {["Dedicated servers with minimal exposed services","Validator keys in HSMs or secure enclaves","Multi-signature or threshold signing","Rotate operational credentials regularly","Continuous behavioral monitoring","Automatic alerts for missed blocks or anomalies","Geographic distribution of validator infrastructure"].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:"8px", padding:"5px 0", borderBottom:i<6?"1px solid rgba(255,255,255,0.03)":"none" }}>
                <span style={{ color:G, fontSize:"9px", flexShrink:0 }}>◆</span>
                <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.45)" }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"#000", padding:"1.25rem", borderLeft:"1px solid rgba(243,186,47,0.06)" }}>
            <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.25em", color:"#60a5fa", textTransform:"uppercase", marginBottom:"12px" }}>Node Hardening</div>
            {["Keep blockchain clients updated with latest patches","Restrict access using firewalls and VPNs","Disable unnecessary ports and services","Enforce strong authentication and least-privilege","Encrypted backups of critical configuration and keys","Regular smart contract audits","Penetration testing on blockchain infrastructure","SIEM solutions for continuous threat monitoring"].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:"8px", padding:"5px 0", borderBottom:i<7?"1px solid rgba(255,255,255,0.03)":"none" }}>
                <span style={{ color:"#60a5fa", fontSize:"9px", flexShrink:0 }}>◆</span>
                <span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.45)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trends ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>The Future of Blockchain Security</h2>
        <p style={pSt}>As blockchain networks become the backbone of digital finance, decentralized applications, government infrastructure, healthcare, supply chains, and RWA tokenization, security requirements are becoming more sophisticated. Future blockchain security will combine AI-driven monitoring, quantum-resistant cryptography, and fully decentralized trust models.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1px", background:GB, border:`1px solid ${GB}`, borderRadius:"4px", overflow:"hidden", marginBottom:"3.5rem" }}>
          {futureTrends.map((t,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.04)" }}
              style={{ background:"#000", padding:"1.3rem", transition:"background 0.18s" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"14px", color:t.col, marginBottom:"8px" }}>{t.title}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.32)", lineHeight:1.65, margin:0 }}>{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Internal Links ── */}
      <div id="future" data-section="future">
        <h3 style={h3Style}>Continue Reading: The Full Blockchain Series</h3>
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
                <span style={{ color:G, opacity:0.5, fontSize:"12px", flexShrink:0, fontFamily:"monospace" }}>{openFaq===i?"▲":"▼"}</span>
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
        <h2 style={h2Style}>Common Security Myths vs Reality</h2>
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

/* ── RWA Tokenization Visual Article ───────────────────────────────────── */
