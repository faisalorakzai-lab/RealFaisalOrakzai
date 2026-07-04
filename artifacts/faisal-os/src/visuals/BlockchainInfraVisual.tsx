import React from "react";

export default function BlockchainInfraVisual() {
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const GD = "rgba(243,186,47,0.05)";
  const [activeNode, setActiveNode] = React.useState(0);
  const [activeConsensus, setActiveConsensus] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);
  const [activeLayer, setActiveLayer] = React.useState<number|null>(null);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };
  const listSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.08rem)", lineHeight:1.8, color:"rgba(255,255,255,0.58)", margin:"0 0 0.5rem 0" };

  const stats = [
    { value:"15,000+", label:"Bitcoin Nodes",   sub:"Active full nodes globally" },
    { value:"1M+",     label:"ETH Validators",  sub:"Ethereum staking validators" },
    { value:"100K+",   label:"TPS",              sub:"Solana peak transactions/sec" },
    { value:"$3B+",    label:"Security Budget",  sub:"Annual PoW mining spend" },
  ];

  const layers = [
    { num:"01", title:"Application Layer",   col:"#60a5fa", desc:"Wallets, dApps, NFT markets, DeFi protocols, blockchain explorers — everything users interact with directly.", detail:"This is the only layer most users ever see. Every Web3 application — from MetaMask to Uniswap to OpenSea — is an application-layer product. The application layer depends on all layers below it." },
    { num:"02", title:"Smart Contract Layer", col:G,         desc:"Programmable logic deployed on-chain. Self-executing code that automatically enforces agreements without intermediaries.", detail:"The Ethereum Virtual Machine (EVM) executes smart contracts. Every major blockchain has a virtual machine. Gas fees compensate validators for executing this computation on-chain." },
    { num:"03", title:"Consensus Layer",      col:"#4ade80", desc:"The agreement mechanism by which thousands of independent nodes reach identical conclusions about valid transactions.", detail:"Proof of Work, Proof of Stake, Delegated PoS, PBFT, and other mechanisms each make different tradeoffs between security, decentralisation, and speed. No mechanism is perfect for all use cases." },
    { num:"04", title:"Network Layer",        col:"#e879f9", desc:"Peer-to-peer communication protocol enabling nodes to broadcast transactions, share blocks, and discover new peers.", detail:"Blockchain uses libp2p (Ethereum), Bitcoin's custom P2P protocol, or other networking stacks. Transactions propagate globally in under 2 seconds on most networks." },
    { num:"05", title:"Data Storage Layer",   col:"#f97316", desc:"The physical and logical layer where blockchain state, transaction history, and smart contract data are stored.", detail:"Ethereum's state trie stores account balances, contract code, and storage. Bitcoin's UTXO set tracks unspent outputs. Archive nodes hold the complete history; light nodes hold only headers." },
    { num:"06", title:"Cryptography Layer",   col:"#a78bfa", desc:"SHA-256, Keccak-256, ECDSA, BLS signatures, ZK-proofs — the mathematical foundation everything else is built on.", detail:"Without cryptography, blockchain cannot guarantee authenticity, ownership, or data integrity. This layer is where hashes, digital signatures, and zero-knowledge proofs operate." },
  ];

  const nodeTypes = [
    { type:"Full Node",      icon:"◉", col:G,        desc:"Downloads and independently verifies every transaction and block since genesis. The backbone of decentralisation.", props:["Complete blockchain history","Independent verification","Enforces all protocol rules","Highest security guarantee"] },
    { type:"Validator Node", icon:"⬡", col:"#4ade80", desc:"Actively participates in producing and confirming new blocks. On PoS networks, validators stake collateral to earn rewards.", props:["Block production","Transaction inclusion","Consensus participation","Earns staking rewards"] },
    { type:"Archive Node",   icon:"⬒", col:"#60a5fa", desc:"Stores every historical blockchain state since genesis. Essential for explorers, analytics, and enterprise auditing systems.", props:["Full historical state","Powers block explorers","Required for analytics","Enterprise auditing"] },
    { type:"Light Node",     icon:"◎", col:"#e879f9", desc:"Verifies transactions by requesting proof from full nodes. Used in mobile wallets and low-resource environments.", props:["Minimal storage required","Fast synchronisation","Mobile-compatible","Relies on full nodes"] },
  ];

  const consensusMechs = [
    { name:"Proof of Work", abbr:"PoW", col:G,         chain:"Bitcoin, Litecoin", desc:"Miners compete to solve a computationally intensive puzzle. The winner adds the next block and earns the block reward.", pros:["Most battle-tested","Maximum security","Truly permissionless participation"], cons:["Energy intensive","Slower block times","Hardware-dependent"] },
    { name:"Proof of Stake", abbr:"PoS", col:"#4ade80", chain:"Ethereum, Cardano", desc:"Validators stake cryptocurrency as collateral. They are randomly selected to propose blocks proportional to their stake.", pros:["99.95% less energy than PoW","Faster finality","Lower hardware barrier"], cons:["Potential stake centralisation","Newer / less battle-tested","Slashing risk"] },
    { name:"Delegated PoS", abbr:"DPoS", col:"#60a5fa", chain:"EOS, TRON, Lisk",  desc:"Token holders vote for a set of delegates who produce blocks on their behalf. Highly efficient but more centralised.", pros:["Very high throughput","Fast block times","Scalable by design"], cons:["More centralised","Fewer validators","Voter apathy risk"] },
    { name:"Proof of Authority", abbr:"PoA", col:"#e879f9", chain:"Binance Chain, enterprise chains", desc:"Pre-approved authorised validators produce blocks. Sacrifices decentralisation for maximum performance.", pros:["Extremely fast","Low cost","Predictable performance"], cons:["Highly centralised","Requires identity","Enterprise / private only"] },
  ];

  const infraComponents = [
    { icon:"◉", title:"RPC Endpoints",       desc:"Remote Procedure Call servers bridge applications and blockchain nodes. Every wallet, dApp, and exchange depends on RPC to send transactions and query state." },
    { icon:"⬡", title:"Indexers",            desc:"Process raw blockchain data into searchable databases. Enable wallet history, NFT ownership queries, portfolio tracking, and analytics dashboards." },
    { icon:"⬒", title:"Oracle Networks",     desc:"Deliver real-world data to smart contracts — price feeds, weather, sports outcomes, exchange rates. Chainlink is the dominant oracle infrastructure." },
    { icon:"◎", title:"Cross-Chain Bridges", desc:"Enable asset and data transfer between different blockchain networks. Polkadot, Cosmos IBC, and LayerZero provide interoperability infrastructure." },
    { icon:"♛", title:"Block Explorers",     desc:"Public interfaces for inspecting all blockchain activity in real time — transactions, addresses, blocks, validators, tokens, and smart contracts." },
    { icon:"◈", title:"APIs & SDKs",         desc:"Developer toolkits abstracting raw blockchain complexity. Enable rapid dApp development without building from raw protocol level." },
    { icon:"⚖", title:"Cloud Infrastructure", desc:"Professional validators and node operators use cloud providers (AWS, GCP, Azure) for redundant uptime, DDoS protection, and automated failover." },
    { icon:"⬤", title:"Monitoring Systems", desc:"24/7 automated monitoring of node health, consensus participation, transaction throughput, and security events across the network." },
  ];

  const l2Solutions = [
    { name:"ZK-Rollups",        col:"#60a5fa", tps:"2,000+", desc:"Bundle thousands of transactions off-chain, generating a cryptographic validity proof submitted to Layer-1. Maximum security with minimum data on-chain. Used by zkSync, StarkNet, Polygon zkEVM." },
    { name:"Optimistic Rollups", col:G,        tps:"4,000+", desc:"Process transactions off-chain assuming they are valid ('optimistically'). A fraud-proof window allows anyone to challenge invalid transactions. Used by Arbitrum, Optimism, Base." },
    { name:"State Channels",     col:"#4ade80", tps:"100K+", desc:"Open a direct off-chain channel between two parties for unlimited instant transactions. Only the opening and closing are settled on Layer-1. Bitcoin Lightning Network is the flagship example." },
    { name:"Sidechains",         col:"#e879f9", tps:"65,000+", desc:"Independent blockchains with their own consensus that periodically checkpoint to a main chain. Polygon PoS and Gnosis Chain are prominent examples with billions in deployed assets." },
  ];

  const faqs = [
    { q:"What exactly is blockchain infrastructure?", a:"Blockchain infrastructure is the complete technical environment that keeps a blockchain network operational — including validator nodes, networking protocols, storage systems, cryptography, consensus mechanisms, RPC endpoints, APIs, SDKs, monitoring systems, and security architecture. It is the invisible backbone that makes every wallet, dApp, and token transfer possible. Without infrastructure, there are no blockchain networks, no validators, no smart contracts, and no Web3." },
    { q:"What is the difference between Layer-1 and Layer-2?", a:"Layer-1 is the base blockchain itself — Bitcoin, Ethereum, Solana. It provides the ultimate security and finality guarantee but has limited transaction throughput. Layer-2 solutions are protocols built on top of Layer-1 that process transactions off the main chain, then batch-settle the results back to Layer-1. This increases speed and reduces fees dramatically while inheriting Layer-1 security. Arbitrum, Optimism, zkSync, and Base are all Ethereum Layer-2 networks." },
    { q:"Why do blockchain networks need validators?", a:"Validators replace the role of banks, clearing houses, and auditors. They verify that every transaction follows the network's rules, preventing double-spending and fraudulent activity. In Proof of Stake networks, validators stake their own cryptocurrency as collateral — giving them a financial incentive to behave honestly (dishonesty results in 'slashing', the permanent destruction of their stake). This economic alignment is what makes decentralised consensus possible without trusting any single party." },
    { q:"What is an RPC server in blockchain?", a:"An RPC (Remote Procedure Call) server is a communication interface that allows applications to talk to blockchain nodes. When you check your wallet balance, send a transaction, or interact with a dApp, your application is sending RPC requests to a node. Without RPC infrastructure, wallets cannot connect, dApps cannot read blockchain state, and exchanges cannot process deposits. Services like Infura and Alchemy provide professional RPC infrastructure for the Ethereum ecosystem." },
    { q:"What is an indexer in blockchain?", a:"An indexer processes raw blockchain data into structured, searchable databases optimised for specific queries. Raw blockchain data is stored as sequential blocks — not optimised for lookups like 'show all transactions for address X'. Indexers rebuild this data into efficient databases. They power wallet history views, NFT ownership lookups, token balances, DeFi portfolio trackers, and analytics dashboards. The Graph Protocol is the leading decentralised indexing infrastructure for Web3." },
    { q:"Can blockchain infrastructure be centralised?", a:"Yes — and this is a real tension in the ecosystem. Many 'decentralised' networks have infrastructure bottlenecks. For example, a majority of Ethereum nodes have historically run on AWS. If Amazon deactivated blockchain nodes, it could significantly impact the network. Genuine decentralisation requires infrastructure distributed across many different cloud providers, geographies, and operators. This is an active area of work for all major blockchain networks." },
    { q:"Which industries use blockchain infrastructure most?", a:"The most active sectors are: banking and DeFi (cross-border settlement, lending, trading), real estate (tokenisation, title management), healthcare (patient records, pharmaceutical verification), supply chain (end-to-end tracking), government (digital identity, CBDCs, voting), gaming (NFTs, in-game economies), insurance (automated claims processing), and AI infrastructure (decentralised compute, model provenance). As adoption grows, blockchain infrastructure is being treated as critical national infrastructure by forward-looking governments." },
    { q:"What skills are required to build blockchain infrastructure?", a:"Professional blockchain infrastructure engineers typically need: distributed systems design, Linux server administration, networking and P2P protocols, cloud computing (AWS/GCP/Azure), cybersecurity and cryptography, smart contract development (Solidity/Rust), database management, DevOps and containerisation (Docker/Kubernetes), monitoring and observability, and API development. Senior roles also require deep knowledge of specific protocol internals (consensus algorithms, mempool management, block propagation)." },
    { q:"What makes blockchain infrastructure secure?", a:"Security emerges from multiple independent layers working together: cryptographic hashing makes data tampering immediately detectable; digital signatures ensure only key holders can authorise transactions; decentralised validator sets mean no single compromise breaks the network; consensus algorithms economically penalise dishonest behaviour; immutable records prevent retroactive fraud; peer-to-peer networking removes central points of failure; and open-source code enables global security auditing. The combination of these layers is why well-secured blockchains have never been broken at the protocol level." },
    { q:"Is blockchain infrastructure expensive to run?", a:"It varies enormously by scale. Running a personal full node costs approximately $50-100 per month in cloud resources. A professional Ethereum validator node requires 32 ETH staked plus ongoing server costs. Large institutional validators running hundreds of nodes across multiple geographies spend millions annually on infrastructure, security teams, and monitoring. Enterprise private blockchain networks can cost tens of millions to build and operate. However, Layer-2 solutions and more efficient consensus mechanisms are rapidly reducing the cost of participating in blockchain infrastructure." },
  ];

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
        <h2 style={h2Style}>What is Blockchain Infrastructure?</h2>
        <p style={pSt}>When people hear blockchain, they think about cryptocurrencies, NFTs, or DeFi protocols. But those are just the visible surface. Beneath every wallet, every token, every smart contract execution is a vast, invisible technical ecosystem — blockchain infrastructure.</p>
        <p style={pSt}><strong style={{ color:G }}>Blockchain infrastructure is the complete technical environment that keeps a blockchain network secure, decentralised, synchronised, and continuously operational.</strong> It includes validator nodes, networking layers, storage systems, cryptographic engines, consensus mechanisms, RPC endpoints, oracle networks, APIs, monitoring systems, and security architecture — all working together 24 hours a day without human intervention.</p>
        <p style={pSt}>Think of building an international airport. Passengers only see the terminal, gates, and planes. But behind the scenes there is air traffic control, radar systems, fuel pipelines, security checkpoints, electrical grids, communication networks, and maintenance facilities. Without those hidden systems, the airport cannot function. Blockchain works exactly the same way.</p>

        <h3 style={h3Style}>Why Infrastructure Matters</h3>
        <p style={pSt}>Every blockchain network depends on infrastructure to achieve five essential goals. <strong style={{ color:G }}>Security</strong> — protecting against attacks, fraud, and manipulation. <strong style={{ color:G }}>Decentralisation</strong> — distributing responsibility across thousands of independent nodes rather than one server. <strong style={{ color:G }}>Reliability</strong> — continuing to operate even when individual components fail. <strong style={{ color:G }}>Transparency</strong> — allowing every participant to independently verify the blockchain's data. <strong style={{ color:G }}>Scalability</strong> — handling millions of users while maintaining performance and security.</p>
        <p style={pSt}>Without robust infrastructure, even the most elegant blockchain protocol is merely theoretical. The history of blockchain is partly a history of infrastructure challenges — and the increasingly sophisticated solutions the industry has developed to overcome them.</p>
      </div>

      {/* ── Architecture Layers ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>Blockchain Architecture Layers</h2>
        <p style={pSt}>Modern blockchain infrastructure is organised in hierarchical layers, each building on the one below. Understanding these layers reveals how the entire system works together — and where different components fit in the architecture.</p>
        <div style={{ border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {layers.map((layer,i) => (
            <motion.div key={i} onClick={() => setActiveLayer(activeLayer===i?null:i)}
              style={{ borderBottom:i<layers.length-1?"1px solid rgba(243,186,47,0.08)":"none", cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"16px", padding:"1rem 1.25rem", background:activeLayer===i?"rgba(243,186,47,0.04)":"transparent", transition:"background 0.2s" }}>
                <div style={{ fontFamily:"monospace", fontSize:"10px", color:layer.col, opacity:0.6, minWidth:"24px" }}>{layer.num}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1rem", color:layer.col, marginBottom:"3px" }}>{layer.title}</div>
                  <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.38)", lineHeight:1.5 }}>{layer.desc}</div>
                </div>
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:layer.col, opacity:0.6, flexShrink:0 }}/>
              </div>
              <AnimatePresence>
                {activeLayer===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:"hidden" }}>
                    <div style={{ padding:"0 1.25rem 1rem 60px", borderLeft:"2px solid "+layer.col, marginLeft:"1.25rem", marginBottom:"12px" }}>
                      <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.5)", lineHeight:1.65, margin:0 }}>{layer.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Traditional vs Blockchain */}
        <h3 style={h3Style}>Traditional Infrastructure vs Blockchain Infrastructure</h3>
        <p style={pSt}>The fundamental architectural difference between traditional and blockchain infrastructure creates entirely different security, trust, and resilience properties. Understanding this contrast is essential for evaluating when blockchain infrastructure is the right solution.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"2rem", fontFamily:"system-ui,sans-serif", fontSize:"12px" }}>
          <div style={{ background:"rgba(239,68,68,0.04)", padding:"1.25rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.7)", marginBottom:"1rem" }}>TRADITIONAL INFRASTRUCTURE</div>
            {[["Central server","Distributed nodes"],["Private database","Shared distributed ledger"],["Administrator control","Consensus-driven governance"],["Single point of failure","Highly fault tolerant"],["Organisation trust","Cryptographic trust"],["Proprietary audit","Open-source verification"]].map(([t],i)=>(
              <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.4)", display:"flex", alignItems:"center", gap:"8px" }}><span style={{ color:"rgba(239,68,68,0.6)", fontSize:"9px" }}>✗</span>{t}</div>
            ))}
          </div>
          <div style={{ background:"rgba(74,222,128,0.03)", padding:"1.25rem" }}>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.7)", marginBottom:"1rem" }}>BLOCKCHAIN INFRASTRUCTURE</div>
            {[["Central server","Distributed nodes"],["Private database","Shared distributed ledger"],["Administrator control","Consensus-driven governance"],["Single point of failure","Highly fault tolerant"],["Organisation trust","Cryptographic trust"],["Proprietary audit","Open-source verification"]].map(([,b],i)=>(
              <div key={i} style={{ padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.55)", display:"flex", alignItems:"center", gap:"8px" }}><span style={{ color:"rgba(74,222,128,0.7)", fontSize:"9px" }}>✓</span>{b}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Node Types ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>Blockchain Nodes</h2>
        <p style={pSt}>A node is any computer connected to a blockchain network. Rather than relying on one central server, blockchain distributes identical copies of the ledger across thousands of independent nodes worldwide. This distribution is what makes blockchain censorship-resistant, fault-tolerant, and genuinely decentralised — no single node failure can take down the network.</p>
        <div style={{ marginBottom:"3rem" }}>
          <div style={{ display:"flex", overflowX:"auto" }}>
            {nodeTypes.map((n,i) => (
              <button key={i} onClick={() => setActiveNode(i)}
                style={{ flex:"1 0 auto", minWidth:"80px", padding:"10px 8px", background:activeNode===i?"rgba(243,186,47,0.08)":"rgba(255,255,255,0.02)", border:"none", borderBottom:activeNode===i?"2px solid "+n.col:"2px solid rgba(255,255,255,0.07)", cursor:"pointer", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.18em", color:activeNode===i?n.col:"rgba(255,255,255,0.3)", textTransform:"uppercase", transition:"all 0.2s" }}>
                <div style={{ fontSize:"20px", marginBottom:"5px", opacity:0.8 }}>{n.icon}</div>
                {n.type}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeNode} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.18 }}
              style={{ padding:"1.75rem 1.5rem", background:GD, border:"1px solid rgba(243,186,47,0.18)", borderTop:"none", borderRadius:"0 0 4px 4px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.5)" }}>NODE TYPE</div>
                <div style={{ flex:1, height:"1px", background:"rgba(243,186,47,0.18)" }}/>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1rem", color:nodeTypes[activeNode].col }}>{nodeTypes[activeNode].type}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"15px", color:"rgba(255,255,255,0.75)", lineHeight:1.65, margin:"0 0 14px" }}>{nodeTypes[activeNode].desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"8px" }}>
                {nodeTypes[activeNode].props.map((prop,i) => (
                  <div key={i} style={{ padding:"8px 12px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"2px", fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.45)", display:"flex", gap:"8px", alignItems:"center" }}>
                    <span style={{ color:nodeTypes[activeNode].col, fontSize:"8px" }}>◆</span>{prop}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <p style={pSt}>A professional validator infrastructure setup — the kind needed to participate reliably in major Proof of Stake networks — typically requires: high-performance dedicated servers or VPS instances, redundant internet connections from different ISPs, NVMe SSD storage for fast state access, automated monitoring and alerting systems, backup nodes for failover, hardware security modules (HSMs) for key protection, DDoS mitigation, and firewall protection. Large blockchain networks operate hundreds or thousands of such validators distributed across multiple countries, ensuring both performance and geopolitical resilience.</p>
      </div>

      {/* ── Consensus Mechanisms ── */}
      <div id="limitations" data-section="limitations">
        <h2 style={h2Style}>Consensus Mechanisms</h2>
        <p style={pSt}>The consensus layer enables thousands of independent computers — none of which trust each other — to agree on a single shared truth about the state of the blockchain. Without consensus, there is no way to prevent conflicting transaction histories or fraudulent double-spends. Each mechanism makes different tradeoffs between security, decentralisation, speed, and energy efficiency.</p>
        <div style={{ marginBottom:"3rem" }}>
          <div style={{ display:"flex", overflowX:"auto" }}>
            {consensusMechs.map((c,i) => (
              <button key={i} onClick={() => setActiveConsensus(i)}
                style={{ flex:"1 0 auto", minWidth:"80px", padding:"10px 6px", background:activeConsensus===i?"rgba(243,186,47,0.08)":"rgba(255,255,255,0.02)", border:"none", borderBottom:activeConsensus===i?"2px solid "+c.col:"2px solid rgba(255,255,255,0.07)", cursor:"pointer", fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.15em", color:activeConsensus===i?c.col:"rgba(255,255,255,0.28)", textTransform:"uppercase", transition:"all 0.2s" }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"15px", marginBottom:"4px", color:activeConsensus===i?c.col:"rgba(255,255,255,0.2)", fontWeight:700 }}>{c.abbr}</div>
                {c.name.split(' ').slice(2).join(' ') || c.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeConsensus} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.18 }}
              style={{ padding:"1.75rem 1.5rem", background:GD, border:"1px solid rgba(243,186,47,0.18)", borderTop:"none", borderRadius:"0 0 4px 4px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.5)" }}>{consensusMechs[activeConsensus].chain}</div>
                <div style={{ flex:1, height:"1px", background:"rgba(243,186,47,0.18)" }}/>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1rem", color:consensusMechs[activeConsensus].col }}>{consensusMechs[activeConsensus].name}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"15px", color:"rgba(255,255,255,0.75)", lineHeight:1.65, margin:"0 0 16px" }}>{consensusMechs[activeConsensus].desc}</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
                <div>
                  <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.6)", marginBottom:"8px" }}>ADVANTAGES</div>
                  {consensusMechs[activeConsensus].pros.map((p,i) => (
                    <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"5px", fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.5)" }}>
                      <span style={{ color:"rgba(74,222,128,0.7)", fontSize:"9px", marginTop:"3px" }}>✓</span>{p}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.6)", marginBottom:"8px" }}>TRADEOFFS</div>
                  {consensusMechs[activeConsensus].cons.map((c,i) => (
                    <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"5px", fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.5)" }}>
                      <span style={{ color:"rgba(239,68,68,0.6)", fontSize:"9px", marginTop:"3px" }}>△</span>{c}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Layer-2 Scaling ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>Layer-2 Scaling Infrastructure</h2>
        <p style={pSt}>As blockchain adoption grows, Layer-1 networks face a fundamental constraint: the blockchain trilemma — the impossibility of simultaneously maximising decentralisation, security, and scalability. Layer-1 blockchains prioritise decentralisation and security, which limits throughput. Layer-2 solutions solve the scalability dimension by processing transactions off the main chain while still settling their final state on Layer-1, inheriting its security guarantees.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1px", background:GB, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"2.5rem" }}>
          {l2Solutions.map((s,i) => (
            <div key={i} style={{ background:"#000", padding:"1.5rem" }}>
              <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:s.col, marginBottom:"8px" }}>LAYER-2 SOLUTION</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.05rem", color:s.col, marginBottom:"6px" }}>{s.name}</div>
              <div style={{ fontFamily:"monospace", fontSize:"11px", color:"rgba(255,255,255,0.25)", marginBottom:"10px" }}>UP TO {s.tps} TPS</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:1.6, margin:0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <p style={pSt}>Layer-2 infrastructure is now handling the majority of Ethereum transaction volume. Arbitrum and Optimism process billions of dollars in daily transactions with fees below $0.01, compared to Layer-1 fees that can reach tens of dollars during peak demand. ZK-Rollups are considered the long-term future of scaling — they provide cryptographic validity proofs that are verifiable on Layer-1 without any fraud challenge period.</p>
      </div>

      {/* ── Infrastructure Components Grid ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>The Complete Infrastructure Stack</h2>
        <p style={pSt}>A production blockchain infrastructure deployment is a complex ecosystem of interdependent components. Each element plays a specific role in making decentralised applications work reliably at scale. Understanding the complete stack is essential for developers, investors, and enterprise architects evaluating blockchain solutions.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1px", background:GB, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {infraComponents.map((c,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.07)" }} style={{ background:"#000", padding:"1.25rem 1rem", transition:"background 0.2s" }}>
              <div style={{ fontSize:"22px", marginBottom:"8px", opacity:0.75 }}>{c.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"13.5px", color:"rgba(255,255,255,0.85)", marginBottom:"6px" }}>{c.title}</div>
              <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"11.5px", color:"rgba(255,255,255,0.3)", lineHeight:1.55 }}>{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Oracle & Cross-Chain ── */}
      <div id="future" data-section="future">
        <h2 style={h2Style}>Oracle Networks & Cross-Chain Infrastructure</h2>
        <p style={pSt}>Blockchains are deterministic, isolated systems — they can only process information already recorded on-chain. They have no native ability to access external data such as currency exchange rates, commodity prices, weather conditions, or sports outcomes. This creates a fundamental problem: smart contracts that need real-world data require a trusted data delivery mechanism.</p>
        <p style={pSt}><strong style={{ color:G }}>Oracle networks</strong> bridge the blockchain with the external world by delivering cryptographically signed real-world data to smart contracts. Chainlink is the dominant decentralised oracle network, securing over $75 billion in smart contract value. Oracles are critical infrastructure for DeFi price feeds, tokenised commodity pricing, real estate valuations for RWA protocols, insurance trigger data, and supply chain verification. Without reliable oracle infrastructure, an enormous category of blockchain applications simply cannot function.</p>
        <p style={pSt}><strong style={{ color:G }}>Cross-chain infrastructure</strong> solves a different problem: blockchain fragmentation. Today there are thousands of independent blockchain networks — each with its own assets, users, and liquidity. Without interoperability, blockchain becomes a series of isolated digital islands. Cross-chain bridges and messaging protocols (Polkadot's XCM, Cosmos IBC, LayerZero, Wormhole) enable assets and data to flow between different networks, creating a more connected and capital-efficient decentralised ecosystem.</p>

        <h3 style={h3Style}>The Evolution of Blockchain Infrastructure</h3>
        <p style={pSt}><strong style={{ color:G }}>Generation 1 (2009-2015):</strong> Basic peer-to-peer nodes, simple UTXO storage, basic wallet infrastructure. The focus was proving that decentralised digital money was possible. Scalability was not yet a concern at early adoption levels.</p>
        <p style={pSt}><strong style={{ color:G }}>Generation 2 (2015-2020):</strong> Smart contract platforms, virtual machines, developer frameworks, token standards (ERC-20, ERC-721), and DeFi-grade RPC infrastructure. Ethereum transformed blockchain from a payment network into a decentralised computing platform.</p>
        <p style={pSt}><strong style={{ color:G }}>Generation 3 (2020-Present):</strong> Layer-2 scaling, modular blockchain architecture, cross-chain interoperability, AI-assisted monitoring, cloud-native node deployment, institutional-grade custody, oracle networks, and Real World Asset integration. Today's infrastructure is designed to support governments, enterprises, financial institutions, and billions of daily users. Blockchain infrastructure is becoming as fundamental to the digital economy as cloud computing and broadband internet.</p>
      </div>

      {/* ── FAQs ── */}
      <div id="myths" data-section="myths">
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
            "Blockchain infrastructure is the invisible backbone enabling every wallet, dApp, and token — without it, there is no Web3, DeFi, or decentralised anything",
            "The six-layer architecture (Application, Smart Contract, Consensus, Network, Storage, Cryptography) works together as an integrated system — weakness in any layer compromises the whole",
            "Node diversity — full nodes, validators, archive nodes, light nodes — creates a resilient ecosystem where no single point of failure can bring down the network",
            "Consensus mechanisms are the core innovation: they enable thousands of strangers to agree on a shared financial truth without trusting any single party",
            "Layer-2 scaling (ZK-Rollups, Optimistic Rollups, State Channels) solves the blockchain trilemma by moving computation off-chain while inheriting Layer-1 security",
            "Oracle networks and cross-chain bridges complete the infrastructure by connecting blockchains to real-world data and to each other",
            "Blockchain infrastructure is evolving from experimental technology into critical digital infrastructure — as fundamental to tomorrow's economy as the internet is to today's",
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




/* ── Blockchain Types – Full Visual Article ─────────────────────────────── */
