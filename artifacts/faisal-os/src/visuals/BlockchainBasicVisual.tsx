import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlockchainBasicVisual() {
  const G = "#F3BA2F";
  const GB = "rgba(243,186,47,0.18)";
  const GD = "rgba(243,186,47,0.05)";
  const [activeStep, setActiveStep] = React.useState(0);
  const [activePrinciple, setActivePrinciple] = React.useState<number|null>(null);
  const [openFaq, setOpenFaq] = React.useState<number|null>(null);

  const pSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(1rem,2.4vw,1.15rem)", lineHeight:1.85, color:"rgba(255,255,255,0.72)", margin:"0 0 1.4rem" };
  const listSt: React.CSSProperties = { fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.08rem)", lineHeight:1.8, color:"rgba(255,255,255,0.58)", margin:"0 0 0.5rem 0", paddingLeft:"1.2rem" };

  const stats = [
    { value:"$2.5T+", label:"Market Cap",   sub:"Combined blockchain assets 2026" },
    { value:"1,000+", label:"Live Networks", sub:"Active blockchain networks" },
    { value:"12M+",   label:"Daily TXs",    sub:"Across all major chains" },
    { value:"120+",   label:"Countries",     sub:"With blockchain legislation" },
  ];

  const principles = [
    { icon:"⬡", title:"Decentralization", col:G,         desc:"No single entity controls the network. Data lives across thousands of independent computers globally, making censorship or shutdown by any authority practically impossible.", detail:"Even if 30% of nodes go offline the network keeps operating. Bitcoin has had 99.98% uptime since 2009 — far exceeding any bank's record." },
    { icon:"◎", title:"Transparency",     col:"#60a5fa",  desc:"Every transaction is publicly verifiable. Anyone can audit the complete ledger history at any time without special access, creating accountability impossible in traditional banking.", detail:"On Bitcoin you can trace every satoshi ever moved since block #0 in January 2009. This is radical financial transparency at a civilizational scale." },
    { icon:"⬒", title:"Immutability",     col:"#4ade80",  desc:"Once confirmed, data cannot be altered. Each block's hash depends on all previous blocks — changing one invalidates the entire subsequent chain, making tampering immediately detectable.", detail:"To rewrite blockchain history, an attacker needs more computational power than the entire network combined. On Bitcoin, that costs billions of dollars." },
    { icon:"⬛", title:"Security",         col:"#e879f9",  desc:"Cryptography, consensus mechanisms, and distributed architecture create multiple overlapping security layers that protect information without relying on any single point of trust.", detail:"SHA-256 has never been broken. Elliptic curve cryptography protects private keys. Proof of Work requires real-world energy, making attacks economically irrational." },
  ];

  const txSteps = [
    { label:"Create",    icon:"✎", desc:"Alice opens her blockchain wallet and initiates a transfer — entering Bob's address and the amount to send.", detail:"The wallet software prepares a transaction object containing sender address, recipient address, amount, and fee. At this point, nothing has moved. This is simply a digital instruction waiting to be authorised and broadcast." },
    { label:"Sign",      icon:"⚿", desc:"Alice's private key digitally signs the transaction, proving she is the rightful owner without revealing the key itself.", detail:"The Elliptic Curve Digital Signature Algorithm (ECDSA) creates a unique cryptographic signature. Even a single character change in the transaction data completely invalidates this signature — making forgery mathematically impossible." },
    { label:"Broadcast", icon:"↗", desc:"The signed transaction propagates across thousands of network nodes within seconds via the peer-to-peer gossip protocol.", detail:"Nodes validate the signature format and add the transaction to their mempool — a waiting area for unconfirmed transactions pending inclusion in the next block." },
    { label:"Verify",    icon:"✓", desc:"Each node independently checks: valid signature? sufficient funds? no double-spend? Does it comply with all protocol rules?", detail:"This peer-to-peer verification replaces the bank entirely. No single party approves — the mathematics does. Thousands of nodes reach the same conclusion independently, without communicating about their decision." },
    { label:"Mine",      icon:"⛏", desc:"Miners (PoW) or validators (PoS) compete to bundle verified transactions into a block. On Bitcoin this takes approximately 10 minutes.", detail:"Proof of Work requires finding a hash below a target value — a lottery requiring massive computation. Proof of Stake selects validators proportionally to their staked collateral. Both mechanisms make cheating prohibitively expensive." },
    { label:"Confirm",   icon:"⬛", desc:"The new block joins the chain. After 6 confirmations (~1 hour for Bitcoin) the transaction is considered irreversible by any economically rational actor.", detail:"Each additional block makes reversal exponentially harder. After 6 blocks, reversing the transaction would require the attacker to rebuild the entire chain from scratch faster than the honest network — statistically and economically impossible." },
  ];

  const timeline = [
    { year:"1976", event:"Public-Key Cryptography",    desc:"Diffie & Hellman publish the foundational paper enabling asymmetric encryption — the security backbone of every blockchain in existence.", cur:false },
    { year:"1991", event:"First Blockchain Concept",   desc:"Haber & Stornetta propose cryptographically timestamped chains of documents to prevent tampering — the direct intellectual ancestor of Bitcoin.", cur:false },
    { year:"1998", event:"Digital Cash Concepts",      desc:"Wei Dai's b-money and Nick Szabo's Bit Gold introduce decentralised digital money — both are cited by Satoshi Nakamoto in the Bitcoin whitepaper.", cur:false },
    { year:"2008", event:"Bitcoin Whitepaper",         desc:"During the global financial crisis, Satoshi Nakamoto publishes 'Bitcoin: A Peer-to-Peer Electronic Cash System' — the document that changed everything.", cur:false },
    { year:"2009", event:"Genesis Block Mined",        desc:"Block #0 launched with embedded message: 'Chancellor on brink of second bailout for banks.' The first real blockchain transaction follows 10 days later.", cur:false },
    { year:"2015", event:"Ethereum & Smart Contracts", desc:"Vitalik Buterin launches Ethereum, introducing programmable blockchain. Developers can now build dApps, DeFi, NFTs, DAOs, and decentralised enterprises.", cur:false },
    { year:"2020", event:"DeFi & NFT Explosion",       desc:"Decentralised finance surpasses $13B locked. NFTs, DAOs, and Web3 enter mainstream consciousness. Institutional interest accelerates rapidly.", cur:false },
    { year:"2024", event:"Bitcoin ETF Approved",       desc:"The SEC approves spot Bitcoin ETFs. BlackRock, Fidelity, and others enter. Institutional capital floods blockchain markets at scale.", cur:true },
    { year:"2026", event:"RWA Tokenization Era",       desc:"Real-world assets — real estate, bonds, commodities — migrate on-chain. Orakzai leads Pakistan's blockchain infrastructure revolution.", cur:true },
  ];

  const industries = [
    { icon:"₿", label:"Finance & DeFi",     desc:"Borderless payments, lending, and trading without banks or intermediaries" },
    { icon:"⬡", label:"Real Estate",         desc:"Fractional ownership and tokenised property titles on-chain" },
    { icon:"♡", label:"Healthcare",          desc:"Secure patient records and pharmaceutical supply chain verification" },
    { icon:"⬤", label:"Supply Chain",        desc:"End-to-end product tracking from raw material to consumer shelf" },
    { icon:"◎", label:"Digital Identity",    desc:"Self-sovereign identity without centralised databases or passwords" },
    { icon:"♛", label:"Luxury & Art",        desc:"Cryptographic provenance for high-value items and cultural heritage" },
    { icon:"⚖", label:"Legal & Governance", desc:"Tamper-proof contracts and transparent on-chain voting systems" },
    { icon:"◈", label:"AI Infrastructure",  desc:"Decentralised compute markets and verifiable AI model provenance" },
  ];

  const faqs = [
    { q:"What is blockchain in simple words?", a:"Blockchain is a decentralised digital ledger that records information securely across multiple computers. Instead of relying on one central authority like a bank, every participant maintains a copy of the ledger, making records transparent, secure, and extremely difficult to alter. Think of it as a shared notebook that thousands of people all hold simultaneously — and everyone would notice instantly if anyone tried to erase or change a page." },
    { q:"Is blockchain the same as Bitcoin?", a:"No. Bitcoin is a cryptocurrency — a digital money application. Blockchain is the underlying technology that powers Bitcoin. Many blockchain applications have nothing to do with cryptocurrency, including digital identity systems, healthcare record management, supply chain tracking, real estate tokenisation, enterprise automation, and government infrastructure. Bitcoin is to blockchain what email is to the internet." },
    { q:"Who invented blockchain?", a:"The concept evolved over several decades through cryptography research starting in the 1970s. Modern blockchain became practical in 2008 when Satoshi Nakamoto (an anonymous person or group) published the Bitcoin whitepaper. Nakamoto drew on prior work by Haber & Stornetta (1991), Wei Dai (1998), and Nick Szabo (1998) to create the first functional implementation." },
    { q:"Why is blockchain considered secure?", a:"Blockchain combines five layers of security: cryptographic hashing (any change to data creates a completely different fingerprint), digital signatures (only private key holders can authorise transactions), decentralised nodes (thousands of independent computers must all agree), consensus mechanisms (the network rejects fraudulent blocks), and immutability (changing one block invalidates every block that follows). These overlapping layers make successful attacks extraordinarily difficult and prohibitively expensive." },
    { q:"Can blockchain be hacked?", a:"The blockchain protocol itself is designed to be highly resistant to attack — Bitcoin has operated for 15+ years without the core protocol being broken. However, vulnerabilities can arise from poorly written smart contracts, compromised centralised exchanges, stolen private keys, phishing attacks targeting users, or insecure applications built on top of the blockchain. The chain itself is extremely secure; the interfaces around it require careful security practices." },
    { q:"What industries use blockchain?", a:"Blockchain is actively being deployed across banking and finance, real estate tokenisation, supply chain management, pharmaceutical verification, healthcare records, government identity systems, luxury goods authentication, legal contracts, voting systems, gaming and NFTs, carbon credit markets, insurance, cross-border payments, trade finance, and AI infrastructure. The technology is most valuable wherever multiple parties need to share trusted data without a central intermediary." },
    { q:"What is decentralisation?", a:"Decentralisation means no single organisation controls the network. Instead of one company's servers holding all the data, thousands of independent computers spread around the world collectively maintain and verify the blockchain. This eliminates single points of failure, reduces censorship risk, removes the need to trust any one institution, and makes the network extremely resilient — Bitcoin has never had a sustained outage in 15+ years." },
    { q:"What is a smart contract?", a:"A smart contract is a self-executing computer programme stored permanently on a blockchain. It automatically performs predefined actions when specific conditions are met, eliminating the need for lawyers, escrow agents, or other intermediaries. For example, a property sale smart contract automatically transfers ownership when payment is confirmed — no solicitor required. Smart contracts power DeFi, NFT marketplaces, DAOs, tokenised real estate, insurance, and much more." },
    { q:"What is Web3?", a:"Web3 is the next generation of the internet built on decentralised blockchain technology. Web1 was static web pages (read only). Web2 is the social media era where platforms like Google and Meta own user data and monetise it. Web3 aims to give users genuine ownership of their digital assets, identity, and data through blockchain-based applications where no single company controls the platform." },
    { q:"What is tokenisation?", a:"Tokenisation is the process of converting ownership rights of real-world or digital assets into blockchain-based digital tokens. A single property worth $1 million could be split into 1,000,000 tokens worth $1 each, enabling anyone worldwide to own a fraction. Tokenisable assets include real estate, gold, bonds, equities, art, luxury goods, carbon credits, and intellectual property. This dramatically increases liquidity and accessibility of traditionally illiquid assets." },
    { q:"What are Real World Assets (RWA)?", a:"Real World Assets (RWA) are physical or financial assets — property, commodities, bonds, equities, infrastructure — represented as digital tokens on a blockchain. RWA tokenisation enables these assets to be traded globally with fractional ownership, instant settlement, transparent provenance, and programmable compliance. The RWA market is projected to reach $16 trillion by 2030, with major financial institutions including BlackRock and JPMorgan actively building RWA infrastructure." },
    { q:"Is blockchain only for large companies?", a:"No. Blockchain solutions are being adopted by solo entrepreneurs, startups, small businesses, enterprises, NGOs, and governments alike. Simple blockchain applications — like verifying product authenticity or issuing digital certificates — require minimal technical resources. The appropriate implementation depends entirely on the specific use case and business requirements, not the size of the organisation." },
    { q:"Why is blockchain important for the future?", a:"Blockchain has the potential to fundamentally reshape how value, trust, and ownership work in the digital economy. As AI, IoT, and Web3 technologies converge, blockchain provides the trust layer that allows machines, companies, and individuals to transact securely without centralised gatekeepers. Real-world asset tokenisation, decentralised identity, verifiable AI provenance, and programmable money are all blockchain-enabled shifts that will define the next decade of global commerce." },
  ];

  return (
    <div style={{ paddingBottom:"4rem" }}>

      {/* ── Stats bar ── */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:"1px", background:GB, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
        {stats.map((s,i) => (
          <div key={i} style={{ padding:"1.4rem 1rem", background:"#000", textAlign:"center" }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.5rem,4vw,2.1rem)", fontWeight:700, color:G, lineHeight:1 }}>{s.value}</div>
            <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", margin:"7px 0 3px" }}>{s.label}</div>
            <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.18)" }}>{s.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Introduction ── */}
      <div id="intro" data-section="intro">
        <h2 style={h2Style}>What is Blockchain?</h2>
        <p style={pSt}>Blockchain is one of the most revolutionary technologies of the 21st century. Often associated with cryptocurrencies like Bitcoin, blockchain is far more than digital money. It is a <strong style={{ color:G }}>secure, transparent, decentralised, and tamper-resistant system</strong> for storing, managing, and verifying data — without relying on any central authority.</p>
        <p style={pSt}>Today, blockchain is transforming finance, healthcare, supply chain management, government infrastructure, real estate, digital identity, gaming, and luxury commerce. It is becoming the foundation of Web3, tokenised assets (RWA), decentralised finance (DeFi), and next-generation digital infrastructure.</p>
        <p style={pSt}>Just as the internet transformed how people <em>share information</em>, blockchain is transforming how people <em>exchange value, establish trust, and own digital assets</em> — without requiring banks, governments, or corporations as intermediaries.</p>

        <h3 style={h3Style}>A Simple Example</h3>
        <p style={pSt}>Imagine five friends share an expense notebook. In a traditional system, one person owns the notebook — they can edit, erase, or lose records, and everyone must trust that individual. Now imagine every friend owns an identical copy. Whenever someone writes a new entry, every copy is simultaneously updated and everyone verifies the information. Nobody can secretly alter past records.</p>
        <p style={pSt}>This shared notebook represents the core idea of blockchain. Instead of one owner, thousands of computers worldwide maintain perfectly synchronised copies of the same ledger. Any attempt to alter history is instantly visible to everyone.</p>

        {/* Block diagram */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ margin:"2.5rem 0", padding:"2rem 1.5rem", background:GD, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflowX:"auto" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.35em", color:"rgba(243,186,47,0.4)", textAlign:"center", marginBottom:"1.75rem" }}>BLOCKCHAIN STRUCTURE — CRYPTOGRAPHICALLY LINKED BLOCKS</div>
          <div style={{ display:"flex", alignItems:"stretch", gap:0, minWidth:"580px", justifyContent:"center" }}>
            {([
              { label:"BLOCK #8,417,293", hash:"0xa3f2...9c1e", prev:"0x00000...genesis", txs:"2,841 TXs", nonce:"39,284,710" },
              { label:"BLOCK #8,417,294", hash:"0x7b44...2f8a", prev:"0xa3f2...9c1e",     txs:"3,112 TXs", nonce:"51,029,481" },
              { label:"BLOCK #8,417,295", hash:"0xc91d...5e72", prev:"0x7b44...2f8a",     txs:"2,997 TXs", nonce:"44,817,223" },
            ] as {label:string;hash:string;prev:string;txs:string;nonce:string}[]).map((block,i) => (
              <React.Fragment key={i}>
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3+i*0.18 }}
                  style={{ background:"rgba(243,186,47,0.04)", border:"1px solid rgba(243,186,47,0.18)", borderRadius:"3px", padding:"1rem 0.9rem", minWidth:"162px", fontFamily:"monospace", flex:1 }}>
                  <div style={{ fontSize:"7px", letterSpacing:"0.2em", color:G, marginBottom:"12px", borderBottom:"1px solid rgba(243,186,47,0.1)", paddingBottom:"8px" }}>{block.label}</div>
                  {([["HASH",block.hash,"rgba(255,255,255,0.7)"],["PREV HASH",block.prev,i===0?"rgba(255,255,255,0.2)":"rgba(243,186,47,0.6)"],["TXS",block.txs,"rgba(255,255,255,0.45)"],["NONCE",block.nonce,"rgba(255,255,255,0.3)"]] as [string,string,string][]).map(([k,v,c]) => (
                    <div key={k} style={{ marginBottom:"7px" }}>
                      <div style={{ fontSize:"6.5px", color:"rgba(255,255,255,0.22)", letterSpacing:"0.25em", marginBottom:"2px" }}>{k}</div>
                      <div style={{ fontSize:"9px", color:c, wordBreak:"break-all" }}>{v}</div>
                    </div>
                  ))}
                </motion.div>
                {i<2 && (
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 10px" }}>
                    <div style={{ width:"1px", flex:1, background:"linear-gradient(to bottom, transparent, rgba(243,186,47,0.35), transparent)" }}/>
                    <div style={{ color:G, opacity:0.5, fontSize:"16px" }}>▶</div>
                    <div style={{ width:"1px", flex:1, background:"linear-gradient(to bottom, transparent, rgba(243,186,47,0.35), transparent)" }}/>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.2)", textAlign:"center", margin:"1.25rem 0 0" }}>
            Each block stores the cryptographic hash of its predecessor. Altering Block #293 changes its hash — immediately invalidating every block that follows.
          </p>
        </motion.div>

        <h3 style={h3Style}>Why Blockchain Matters</h3>
        <p style={pSt}>For decades, digital systems have depended on centralised organisations — banks, governments, cloud providers, payment processors. These institutions store data on central servers and act as trusted intermediaries. Although centralised systems have powered the modern internet, they face fundamental challenges:</p>
        <ul style={{ margin:"0 0 1.4rem", padding:"0 0 0 1.5rem" }}>
          {["Single points of failure — one server down means the whole service goes down","Data can be secretly manipulated by those who control the database","Security breaches compromise millions of users at once","High operational costs passed on as fees","Slow and expensive cross-border transactions","Limited transparency — users must simply trust the institution","Complete dependence on third parties who may fail, be acquired, or change their terms"].map((t,i)=>(
            <li key={i} style={listSt}>{t}</li>
          ))}
        </ul>
        <p style={pSt}>Blockchain was designed to solve these problems by replacing centralised trust with cryptographic verification and distributed consensus. Instead of asking people to trust one organisation, blockchain enables participants to trust mathematics, cryptography, and a network of thousands of independent computers.</p>
      </div>

      {/* ── Centralized vs Decentralized ── */}
      <div style={{ margin:"3rem 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden" }}>
        <div style={{ background:"rgba(239,68,68,0.04)", padding:"1.75rem 1.5rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", color:"rgba(239,68,68,0.7)", marginBottom:"1.25rem" }}>✗ CENTRALISED SYSTEM</div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.25rem" }}>
            <svg width="110" height="88" viewBox="0 0 110 88">
              <circle cx="55" cy="28" r="18" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5"/>
              <text x="55" y="32" textAnchor="middle" fill="rgba(239,68,68,0.85)" fontSize="8" fontFamily="monospace">BANK</text>
              {([[16,78],[37,78],[73,78],[94,78]] as [number,number][]).map(([x,y],i) => (
                <g key={i}><line x1="55" y1="46" x2={x} y2={y-9} stroke="rgba(239,68,68,0.25)" strokeWidth="1" strokeDasharray="3 2"/><circle cx={x} cy={y} r="9" fill="rgba(239,68,68,0.07)" stroke="rgba(239,68,68,0.3)" strokeWidth="1"/><text x={x} y={y+3} textAnchor="middle" fill="rgba(239,68,68,0.5)" fontSize="5.5" fontFamily="monospace">U{i+1}</text></g>
              ))}
            </svg>
          </div>
          {["Single point of failure","Data can be secretly altered","Trust one institution blindly","High fees to intermediaries","Slow cross-border settlement","Can be censored or shut down"].map((t,i)=>(
            <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"7px" }}><span style={{ color:"rgba(239,68,68,0.65)", fontSize:"10px", flexShrink:0, marginTop:"3px" }}>✗</span><span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.4)", lineHeight:1.5 }}>{t}</span></div>
          ))}
        </div>
        <div style={{ background:"rgba(74,222,128,0.03)", padding:"1.75rem 1.5rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", color:"rgba(74,222,128,0.7)", marginBottom:"1.25rem" }}>✓ DECENTRALISED BLOCKCHAIN</div>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.25rem" }}>
            <svg width="110" height="88" viewBox="0 0 110 88">
              {([[55,10],[12,42],[98,42],[28,80],[82,80]] as [number,number][]).map(([cx,cy],i) => (
                <g key={i}><circle cx={cx} cy={cy} r="13" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.4)" strokeWidth="1.5"/><text x={cx} y={cy+3} textAnchor="middle" fill="rgba(74,222,128,0.7)" fontSize="6" fontFamily="monospace">N{i}</text></g>
              ))}
              {([[0,1],[0,2],[1,3],[2,4],[1,2],[3,4],[0,3],[0,4]] as [number,number][]).map(([a,b],i) => { const ns:[number,number][] = [[55,10],[12,42],[98,42],[28,80],[82,80]]; return <line key={i} x1={ns[a][0]} y1={ns[a][1]} x2={ns[b][0]} y2={ns[b][1]} stroke="rgba(74,222,128,0.18)" strokeWidth="1"/>; })}
            </svg>
          </div>
          {["No single point of failure","Cryptographically tamper-proof","Trust mathematics, not institutions","Lower fees — no intermediary cut","Instant 24/7 global settlement","Censorship-resistant by design"].map((t,i)=>(
            <div key={i} style={{ display:"flex", gap:"8px", marginBottom:"7px" }}><span style={{ color:"rgba(74,222,128,0.75)", fontSize:"10px", flexShrink:0, marginTop:"3px" }}>✓</span><span style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.5)", lineHeight:1.5 }}>{t}</span></div>
          ))}
        </div>
      </div>

      {/* ── 4 Core Principles ── */}
      <div id="components" data-section="components">
        <h2 style={h2Style}>The 4 Core Principles of Blockchain</h2>
        <p style={pSt}>Every blockchain network is built on four foundational properties. Together they replace the need for centralised trust with mathematical certainty. Each property reinforces the others — remove one and the entire system weakens. Tap any card to expand the deeper explanation.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:"1px", background:GB, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"2rem" }}>
          {principles.map((p,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.05)" }} onClick={() => setActivePrinciple(activePrinciple===i?null:i)}
              style={{ background:"#000", padding:"1.5rem", cursor:"pointer", transition:"background 0.2s" }}>
              <div style={{ fontSize:"26px", marginBottom:"10px", opacity:0.8 }}>{p.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.1rem", color:p.col, marginBottom:"8px" }}>{p.title}</div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.42)", lineHeight:1.65, margin:"0 0 10px" }}>{p.desc}</p>
              <AnimatePresence>
                {activePrinciple===i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} style={{ overflow:"hidden" }}>
                    <div style={{ padding:"10px 12px", background:"rgba(255,255,255,0.03)", borderLeft:"2px solid "+p.col, borderRadius:"0 2px 2px 0", marginBottom:"10px" }}>
                      <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.5)", lineHeight:1.65, margin:0 }}>{p.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.2em", color:p.col+"55" }}>{activePrinciple===i?"▲ COLLAPSE":"▼ EXPAND"}</div>
            </motion.div>
          ))}
        </div>

        <h3 style={h3Style}>Blockchain Is Not Bitcoin</h3>
        <p style={pSt}>A common misconception is that blockchain and Bitcoin are the same. They are not. Blockchain is the underlying technology — the protocol and architecture. Bitcoin is one application built on blockchain, just as email is one application of the internet. Many thousands of blockchain applications exist that have nothing to do with cryptocurrency, including digital identity, real estate tokenisation, healthcare records, supply chain management, cross-border settlement, luxury product authentication, voting systems, and enterprise automation.</p>

        <h3 style={h3Style}>What Is a Block?</h3>
        <p style={pSt}>A block is the fundamental storage unit of a blockchain — think of it as a digital page in a permanent ledger. Instead of recording one transaction at a time, the network groups multiple verified transactions together into a single block. Once validated by the network, the block becomes a permanent and immutable part of the blockchain.</p>
        <p style={pSt}>A typical block contains: Block Height (its sequential position in the chain), Timestamp (the exact time of creation), Transaction Data (all the included transactions), Previous Block Hash (the cryptographic fingerprint of the preceding block), Current Block Hash (this block's own fingerprint), Nonce (a number used in the mining process), and Merkle Root (a cryptographic summary of all included transactions).</p>

        <h3 style={h3Style}>Understanding the Chain</h3>
        <p style={pSt}>Every new block contains the cryptographic hash — a fixed-length digital fingerprint — of the block before it. If someone attempts to alter Block #100, its hash changes entirely. As a result, Block #101 no longer references the correct hash, Block #102 becomes invalid, and so on through every subsequent block. The entire network immediately detects the inconsistency and rejects the fraudulent chain. This is why blockchain is described as immutable — not because changing data is literally impossible, but because doing so would require recomputing the entire chain faster than the honest network adds new blocks, which is computationally and economically infeasible.</p>
      </div>

      {/* ── Transaction Lifecycle ── */}
      <div id="benefits" data-section="benefits">
        <h2 style={h2Style}>How a Transaction Works</h2>
        <p style={pSt}>Every blockchain transaction follows a deterministic cryptographic process from initiation to final confirmation. Understanding this lifecycle reveals exactly why blockchain is more secure and transparent than any centralised payment system in history.</p>
        <div style={{ marginBottom:"2.5rem" }}>
          <div style={{ display:"flex", overflowX:"auto" }}>
            {txSteps.map((step,i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                style={{ flex:"1 0 auto", minWidth:"72px", padding:"10px 6px", background:activeStep===i?"rgba(243,186,47,0.1)":"rgba(255,255,255,0.02)", border:"none", borderBottom:activeStep===i?"2px solid #F3BA2F":"2px solid rgba(255,255,255,0.07)", cursor:"pointer", fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.2em", color:activeStep===i?"#F3BA2F":"rgba(255,255,255,0.28)", textTransform:"uppercase", transition:"all 0.2s" }}>
                <div style={{ fontSize:"18px", marginBottom:"5px", opacity:0.8 }}>{step.icon}</div>
                {i+1}. {step.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} transition={{ duration:0.18 }}
              style={{ padding:"1.75rem 1.5rem", background:GD, border:"1px solid rgba(243,186,47,0.18)", borderTop:"none", borderRadius:"0 0 4px 4px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
                <div style={{ fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.5)" }}>STEP {activeStep+1} / {txSteps.length}</div>
                <div style={{ flex:1, height:"1px", background:"rgba(243,186,47,0.18)" }}/>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1rem", color:G }}>{txSteps[activeStep].label}</div>
              </div>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"15px", color:"rgba(255,255,255,0.75)", lineHeight:1.65, margin:"0 0 10px" }}>{txSteps[activeStep].desc}</p>
              <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.37)", lineHeight:1.6, margin:0 }}>{txSteps[activeStep].detail}</p>
              <div style={{ display:"flex", gap:"6px", marginTop:"16px" }}>
                {txSteps.map((_,i) => <div key={i} style={{ width:"6px", height:"6px", borderRadius:"50%", background:i===activeStep?G:"rgba(255,255,255,0.1)", transition:"background 0.2s" }}/>)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <h3 style={h3Style}>What Are Nodes?</h3>
        <p style={pSt}>A node is any computer connected to a blockchain network. Rather than relying on one central server, blockchain distributes identical copies of the ledger across thousands of independent nodes worldwide. Nodes validate transactions, store blockchain data, share newly created blocks, enforce network rules, and synchronise continuously with their peers. The larger and more geographically distributed the node network, the stronger, more resilient, and more censorship-resistant the blockchain becomes.</p>
        <p style={pSt}><strong style={{ color:G }}>Full Nodes</strong> download and verify the complete blockchain history independently — they are the backbone of decentralisation. <strong style={{ color:G }}>Light Nodes</strong> store only essential headers and rely on full nodes for verification — most mobile wallets operate this way. <strong style={{ color:G }}>Validator Nodes</strong> (on Proof of Stake chains) actively participate in producing and confirming new blocks, earning rewards for honest participation. <strong style={{ color:G }}>Archive Nodes</strong> store every historical state of the blockchain — essential for explorers, analytics, and enterprise auditing.</p>
      </div>

      {/* ── Smart Contracts ── */}
      <div id="limitations" data-section="limitations">
        <h2 style={h2Style}>Smart Contracts</h2>
        <p style={pSt}>Smart contracts are self-executing programmes stored permanently on a blockchain. They automatically enforce agreements when predefined conditions are met — no lawyers, escrow agents, banks, or any other intermediary needed. The code is the contract, deployed publicly on-chain, and executed automatically by the network when triggered.</p>
        <div style={{ fontFamily:"monospace", fontSize:"12px", background:"rgba(243,186,47,0.03)", border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", padding:"1.5rem 1.75rem", margin:"1.75rem 0", overflowX:"auto" }}>
          <div style={{ color:"rgba(243,186,47,0.4)", marginBottom:"10px", fontSize:"7.5px", letterSpacing:"0.3em" }}>SMART CONTRACT — PROPERTY SALE PSEUDOCODE</div>
          <pre style={{ color:"rgba(255,255,255,0.55)", margin:0, lineHeight:1.75, fontSize:"12px" }}>{`function propertyEscrow(buyer, seller, price) {
// Evaluated on-chain — no human intermediary required
if (buyer.hasDeposited(price) && seller.hasDelivered(deed)) {
  seller.receive(price);          // ← automatic payment release
  buyer.receive(ownership);       // ← instant title transfer
  emit Transfer(buyer, seller, price);
} else if (block.timestamp > deadline) {
  buyer.refund(price);            // ← auto-refund if deadline expires
}
}`}</pre>
        </div>
        <p style={pSt}>Ethereum introduced smart contracts in 2015, and they now power over $100 billion in DeFi protocols, millions of NFT transactions, DAO governance systems across thousands of organisations, tokenised real estate platforms, decentralised insurance, supply chain automation, and much more. The Orakzai Bond (OKBOND) uses smart contracts deployed on Polygon L2 for treasury-backed capital protection with fully programmable redemption mechanics.</p>
        <p style={pSt}>Smart contracts are transparent — anyone can read the code on-chain and verify exactly what conditions trigger what actions. This transparency eliminates the hidden fine print of traditional financial products and creates a new standard of trustless, auditable commerce.</p>
      </div>

      {/* ── History Timeline ── */}
      <div id="industries" data-section="industries">
        <h2 style={h2Style}>History of Blockchain</h2>
        <p style={pSt}>Understanding blockchain's full potential requires appreciating how it evolved from decades of cryptographic research into a transformative global infrastructure. Each milestone built on the last, culminating in the decentralised digital economy now emerging worldwide.</p>
        <div style={{ position:"relative", marginBottom:"3rem" }}>
          <div style={{ position:"absolute", left:"72px", top:0, bottom:0, width:"1px", background:"linear-gradient(to bottom, transparent, rgba(243,186,47,0.3) 8%, rgba(243,186,47,0.3) 92%, transparent)" }}/>
          {timeline.map((t,i) => (
            <motion.div key={i} initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.06*i }}
              style={{ display:"flex", gap:"20px", alignItems:"flex-start", marginBottom:"1.4rem" }}>
              <div style={{ minWidth:"64px", textAlign:"right", fontFamily:"monospace", fontSize:"10.5px", color:t.cur?G:"rgba(243,186,47,0.5)", paddingTop:"2px", letterSpacing:"0.04em", fontWeight:t.cur?700:400 }}>{t.year}</div>
              <div style={{ width:"11px", height:"11px", borderRadius:"50%", background:t.cur?G:"transparent", border:"1.5px solid "+(t.cur?G:"rgba(243,186,47,0.4)"), marginTop:"2px", flexShrink:0, zIndex:1, boxShadow:t.cur?"0 0 8px rgba(243,186,47,0.4)":"none" }}/>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:t.cur?700:600, fontSize:"15px", color:t.cur?G:"rgba(255,255,255,0.82)", marginBottom:"3px" }}>{t.event}</div>
                <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"12.5px", color:"rgba(255,255,255,0.35)", lineHeight:1.55 }}>{t.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Industries ── */}
      <div id="trends" data-section="trends">
        <h2 style={h2Style}>Blockchain Across Industries</h2>
        <p style={pSt}>Blockchain has expanded far beyond its cryptocurrency origins. The technology is now actively deployed in nearly every major sector of the global economy, solving problems that centralised systems have struggled with for decades: data integrity, transparency, cross-border trust, and the elimination of expensive intermediaries.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))", gap:"1px", background:GB, border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden", marginBottom:"3rem" }}>
          {industries.map((ind,i) => (
            <motion.div key={i} whileHover={{ background:"rgba(243,186,47,0.07)" }} style={{ background:"#000", padding:"1.25rem 1rem", transition:"background 0.2s" }}>
              <div style={{ fontSize:"22px", marginBottom:"8px", opacity:0.75 }}>{ind.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:600, fontSize:"13.5px", color:"rgba(255,255,255,0.82)", marginBottom:"5px" }}>{ind.label}</div>
              <div style={{ fontFamily:"system-ui,sans-serif", fontSize:"11px", color:"rgba(255,255,255,0.3)", lineHeight:1.55 }}>{ind.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Cryptographic Hashing ── */}
      <div id="future" data-section="future">
        <h2 style={h2Style}>Cryptographic Security</h2>
        <p style={pSt}>Cryptography is the mathematical foundation that makes blockchain trustworthy without requiring trust in any individual or institution. Three cryptographic technologies work together to secure every blockchain transaction.</p>
        <p style={pSt}><strong style={{ color:G }}>Hash Functions</strong> convert any amount of data into a fixed-length digital fingerprint. SHA-256 (used by Bitcoin) produces a 64-character hexadecimal string from any input. Crucially, even a single character change produces a completely different output — making any tampering immediately detectable by every node on the network. Hash functions are also one-way: you cannot reverse-engineer the original data from the hash.</p>
        <p style={pSt}><strong style={{ color:G }}>Public-Key Cryptography</strong> gives every blockchain user a pair of mathematically related keys. The public key is your address — share it freely to receive assets. The private key is your secret — it is the only thing that can authorise spending your assets. Losing your private key means losing access permanently. Sharing it means losing everything. Blockchain gives you direct, uncensorable ownership — with full personal responsibility.</p>
        <p style={pSt}><strong style={{ color:G }}>Digital Signatures</strong> prove that a transaction was authorised by the rightful key holder without revealing the private key itself. This allows the entire public network to verify your transaction is legitimate without you ever exposing your secret. This elegant cryptographic proof is what replaces the bank's traditional role of account verification.</p>
        <div style={{ fontFamily:"monospace", background:"rgba(243,186,47,0.03)", border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", padding:"1.5rem", margin:"1.75rem 0", overflowX:"auto" }}>
          <div style={{ color:"rgba(243,186,47,0.4)", fontSize:"7.5px", letterSpacing:"0.3em", marginBottom:"14px" }}>SHA-256: ONE CHARACTER DIFFERENCE → COMPLETELY DIFFERENT OUTPUT</div>
          {([{input:'"Hello, Blockchain!"',hash:"a7f2b9c1e4d8f3a2b6c9e1f4a7d2b8c3e6f1a4d7b2c5e8f3a1d4b7c2e5f8a3b6",note:""},{input:'"Hello, Blockchain! "',hash:"3e9d1a4f7b2c5e8a1d4b7c2e5f8a3b6c9f2e5a8d1b4c7f3a2d5b8c1e4a7f2b9c1",note:"(space added)"},{input:'"Hello, Blockchain!!"',hash:"b6c2e5f1a4d7b3c6e9f2a5d8b1c4e7a2d5f8b3c6a9e2f5d8a1b4c7e3f6a9d2e5",note:"(exclamation added)"}] as {input:string;hash:string;note:string}[]).map(({input,hash,note},i) => (
            <div key={i} style={{ marginBottom:"12px" }}>
              <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", marginBottom:"4px", letterSpacing:"0.15em" }}>INPUT</div>
              <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.65)", marginBottom:"5px" }}>{input} {note && <span style={{ color:"rgba(243,186,47,0.6)", fontSize:"9px" }}>{note}</span>}</div>
              <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.3)", marginBottom:"4px", letterSpacing:"0.15em" }}>SHA-256</div>
              <div style={{ fontSize:"9.5px", color:i===0?G:"rgba(243,186,47,0.45)", wordBreak:"break-all", letterSpacing:"0.04em" }}>{hash}</div>
              {i<2 && <div style={{ height:"1px", background:"rgba(255,255,255,0.05)", margin:"10px 0" }}/>}
            </div>
          ))}
        </div>

        <h3 style={h3Style}>From Digital Money to Digital Infrastructure</h3>
        <p style={pSt}>The first generation of blockchain introduced decentralised money — removing banks from peer-to-peer payments. The second generation enabled programmable smart contracts — removing intermediaries from complex agreements. The third generation now focuses on scalable infrastructure capable of supporting governments, enterprises, financial markets, AI systems, and billions of daily users.</p>
        <p style={pSt}>Blockchain is no longer just about cryptocurrency. It is becoming the operating system of the digital economy — the trust layer upon which the entire next generation of commerce, identity, ownership, and computation will be built. Understanding blockchain today is not merely a technical interest — it is financial and strategic literacy for the decade ahead.</p>
      </div>

      {/* ── Myths ── */}
      <div id="myths" data-section="myths">
        <h2 style={h2Style}>Common Blockchain Myths</h2>
        <p style={pSt}>Misconceptions about blockchain are widespread — often perpetuated by both uninformed critics and overhyped enthusiasts. Here is the evidence-based reality behind the most common myths.</p>
        {([
          { myth:"Blockchain is only used for cryptocurrency.", reality:"Blockchain supports applications across finance, healthcare, education, supply chains, real estate, digital identity, government infrastructure, AI, and many other sectors. Cryptocurrency is simply the first and most visible application." },
          { myth:"Blockchain transactions are completely anonymous.", reality:"Most public blockchains are pseudonymous — wallet addresses are publicly visible even if personal identities are not directly attached. Advanced chain analysis can often link addresses to individuals. True privacy requires additional cryptographic layers such as ZK-proofs or privacy-focused chains." },
          { myth:"Blockchain cannot be regulated.", reality:"Many countries have developed or are developing comprehensive regulatory frameworks for blockchain and digital assets. The technology is transparent by design, which actually makes compliance and auditing easier than traditional systems. Regulation and decentralisation are not mutually exclusive." },
          { myth:"Every business needs blockchain.", reality:"Blockchain is most valuable when decentralisation, transparency, auditability, or shared trust between multiple parties without a common intermediary are required. For problems that a simple database solves effectively, blockchain adds unnecessary complexity. The question is always whether the problem requires a shared, trustless ledger." },
        ] as {myth:string;reality:string}[]).map((m,i) => (
          <div key={i} style={{ marginBottom:"10px" }}>
            <div style={{ background:"rgba(239,68,68,0.04)", padding:"11px 16px", borderLeft:"3px solid rgba(239,68,68,0.45)" }}>
              <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.35em", color:"rgba(239,68,68,0.6)", display:"block", marginBottom:"5px" }}>MYTH</span>
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.05rem", color:"rgba(255,255,255,0.72)", margin:0, lineHeight:1.55 }}>{m.myth}</p>
            </div>
            <div style={{ background:"rgba(74,222,128,0.03)", padding:"11px 16px", borderLeft:"3px solid rgba(74,222,128,0.45)" }}>
              <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.35em", color:"rgba(74,222,128,0.6)", display:"block", marginBottom:"5px" }}>REALITY</span>
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1.05rem", color:"rgba(255,255,255,0.55)", margin:0, lineHeight:1.55 }}>{m.reality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── FAQs ── */}
      <div id="takeaways" data-section="takeaways">
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
      <div style={{ border:"1px solid rgba(243,186,47,0.18)", borderRadius:"4px", overflow:"hidden" }}>
        <div style={{ padding:"1rem 1.25rem", borderBottom:"1px solid rgba(243,186,47,0.12)", fontFamily:"monospace", fontSize:"7.5px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.5)" }}>KEY TAKEAWAYS</div>
        {[
          "Blockchain is a technology, not just cryptocurrency — it is a distributed ledger protocol powering thousands of applications across every industry",
          "Decentralisation increases resilience, transparency, and resistance to censorship by removing single points of control and failure",
          "Cryptography — hashing, public-key encryption, and digital signatures — provides the mathematical foundation for trustless verification",
          "Smart contracts automate trusted digital interactions, eliminating intermediaries from property sales, financial products, insurance, and governance",
          "Tokenisation expands access to real-world assets — property, commodities, bonds — enabling fractional global ownership with instant settlement",
          "Web3 introduces genuine digital ownership: users control their assets, identity, and data through cryptographic keys rather than corporate accounts",
          "Blockchain is evolving from financial infrastructure into the trust layer of the entire digital economy — as fundamental as the internet itself",
        ].map((t,i) => (
          <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.07*i }}
            style={{ display:"flex", gap:"16px", alignItems:"flex-start", padding:"14px 18px", borderBottom:i<6?"1px solid rgba(243,186,47,0.06)":"none", background:i%2===0?"rgba(243,186,47,0.02)":"#000" }}>
            <div style={{ minWidth:"22px", height:"22px", borderRadius:"50%", background:"rgba(243,186,47,0.1)", border:"1px solid rgba(243,186,47,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"monospace", fontSize:"9px", color:G, flexShrink:0, marginTop:"1px" }}>{i+1}</div>
            <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"13.5px", color:"rgba(255,255,255,0.62)", lineHeight:1.65, margin:0 }}>{t}</p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}



/* ── Blockchain Infra – Full Visual Article ─────────────────────────────── */
