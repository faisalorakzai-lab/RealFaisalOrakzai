/**
   * RESEARCH ARTICLE — /research/:slug
   * Features: TOC sidebar, profile photo, FAQ accordion, 3D blockchain SVG, SEO
   */
  import React, { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useParams, useLocation } from "wouter";

  /* ── Fonts ─────────────────────────────────────────────────────────────── */
  function useFonts() {
    useEffect(() => {
      if (document.getElementById("art-fonts")) return;
      const l = document.createElement("link");
      l.id = "art-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";
      document.head.appendChild(l);
    }, []);
  }

  /* ── SEO ───────────────────────────────────────────────────────────────── */
  function useArticleSEO(a: typeof ARTICLES[string] | undefined) {
    useEffect(() => {
      if (!a) return;
      const prev = document.title;
      document.title = a.title + " | Faisal Orakzai Research Lab";
      const sm = (n: string, v: string, p = false) => {
        const s = p ? `meta[property="${n}"]` : `meta[name="${n}"]`;
        let el = document.querySelector(s) as HTMLMetaElement;
        if (!el) { el = document.createElement("meta"); el.setAttribute(p ? "property" : "name", n); document.head.appendChild(el); }
        el.content = v;
      };
      sm("description", a.subtitle); sm("keywords", a.tags.join(", ") + ", Faisal Orakzai, blockchain research");
      sm("author", a.authors); sm("og:title", a.title, true); sm("og:description", a.subtitle, true);
      sm("og:type", "article", true); sm("og:url", "https://faisalorakzai.com/research/" + a.slug, true);
      if (a.thumbnail) sm("og:image", "https://faisalorakzai.com" + a.thumbnail, true);
      sm("twitter:card", "summary_large_image"); sm("twitter:title", a.title); sm("twitter:description", a.subtitle);
      sm("citation_title", a.title); sm("citation_author", "Orakzai, Faisal");
      sm("citation_publication_date", a.year + "/06/01");
      const ld = document.createElement("script");
      ld.id = "article-ld"; ld.type = "application/ld+json";
      ld.text = JSON.stringify({ "@context":"https://schema.org", "@type":"Article",
        "headline": a.title, "description": a.subtitle,
        "author": { "@type":"Person", "name": a.authors, "url":"https://faisalorakzai.com/founder",
          "sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii"] },
        "publisher": { "@type":"Organization", "name":"Orakzai Research Lab", "url":"https://faisalorakzai.com" },
        "datePublished": a.year + "-06-01", "url": "https://faisalorakzai.com/research/" + a.slug,
        "keywords": a.tags.join(", "), "inLanguage":"en-US", "isAccessibleForFree":true });
      document.getElementById("article-ld")?.remove();
      document.head.appendChild(ld);

      // FAQPage schema — extract Q&As from article content for Google rich snippets
      document.getElementById("faq-ld")?.remove();
      const contentLines = (a.content || "").split("\n").map((s: string) => s.trim()).filter(Boolean);
      const faqPairs: { q: string; a: string }[] = [];
      let inFAQz = false;
      let curQz = "";
      let curAz: string[] = [];
      for (const fl of contentLines) {
        if (fl === "Frequently Asked Questions (FAQs)") { inFAQz = true; continue; }
        if (fl === "Key Takeaways" || fl === "Final Conclusion" || fl === "Common Blockchain Myths") {
          inFAQz = false;
          if (curQz && curAz.length) { faqPairs.push({ q: curQz, a: curAz.join(" ") }); curQz = ""; curAz = []; }
          continue;
        }
        if (!inFAQz) continue;
        const qm = fl.match(/^\d+\.\s+(.+)/);
        if (qm) {
          if (curQz && curAz.length) faqPairs.push({ q: curQz, a: curAz.join(" ") });
          curQz = qm[1]; curAz = [];
        } else if (curQz) curAz.push(fl);
      }
      if (curQz && curAz.length) faqPairs.push({ q: curQz, a: curAz.join(" ") });
      if (faqPairs.length > 0) {
        const faqLd = document.createElement("script");
        faqLd.id = "faq-ld"; faqLd.type = "application/ld+json";
        faqLd.text = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqPairs.slice(0, 10).map(({ q, a }) => ({
            "@type": "Question",
            "name": q,
            "acceptedAnswer": { "@type": "Answer", "text": a }
          }))
        });
        document.head.appendChild(faqLd);
      }

      return () => {
        document.title = prev;
        document.getElementById("article-ld")?.remove();
        document.getElementById("faq-ld")?.remove();
      };
    }, [a]);
  }

  /* ── 3D Blockchain Block SVG ───────────────────────────────────────────── */
  function Block3D({ x, label, hash, opacity = 1 }: { x: number; label: string; hash: string; opacity?: number }) {
    const w = 64, h = 56, d = 20;
    const cx = x + w / 2;
    return (
      <g opacity={opacity}>
        {/* Top face */}
        <polygon points={`${cx},${0} ${cx+w/2},${d/2} ${cx},${d} ${cx-w/2},${d/2}`} fill="rgba(243,186,47,0.07)" stroke="#F3BA2F" strokeWidth="0.8"/>
        {/* Left face */}
        <polygon points={`${cx-w/2},${d/2} ${cx},${d} ${cx},${d+h} ${cx-w/2},${d/2+h}`} fill="rgba(243,186,47,0.04)" stroke="#F3BA2F" strokeWidth="0.8"/>
        {/* Right face */}
        <polygon points={`${cx+w/2},${d/2} ${cx},${d} ${cx},${d+h} ${cx+w/2},${d/2+h}`} fill="rgba(243,186,47,0.06)" stroke="#F3BA2F" strokeWidth="0.8"/>
        {/* Lock icon on top face */}
        <g transform={`translate(${cx-8},${d/2-8})`}>
          <rect x="3" y="7" width="10" height="8" rx="1" fill="none" stroke="#F3BA2F" strokeWidth="0.7" opacity="0.7"/>
          <path d="M5 7 V5 Q8 1 11 5 V7" fill="none" stroke="#F3BA2F" strokeWidth="0.7" opacity="0.7"/>
          <circle cx="8" cy="11" r="1.2" fill="#F3BA2F" opacity="0.6"/>
        </g>
        {/* Binary lines on right face */}
        {[0,1,2,3].map(row => (
          <text key={row} x={cx + 4} y={d + 14 + row * 10} fontSize="5.5" fill="#F3BA2F" opacity="0.3" fontFamily="monospace">
            {["10110100","01001011","11010010","00101101"][row]}
          </text>
        ))}
        {/* Block label */}
        <text x={cx} y={d + h + 14} fontSize="6.5" fill="rgba(243,186,47,0.5)" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">{label}</text>
        <text x={cx} y={d + h + 22} fontSize="5" fill="rgba(255,255,255,0.18)" fontFamily="monospace" textAnchor="middle">{hash}</text>
      </g>
    );
  }

  function ChainLink({ x, y }: { x: number; y: number }) {
    return (
      <g>
        <ellipse cx={x} cy={y} rx="4" ry="6" fill="none" stroke="#F3BA2F" strokeWidth="0.8" opacity="0.5" transform={`rotate(30 ${x} ${y})`}/>
        <ellipse cx={x+6} cy={y} rx="4" ry="6" fill="none" stroke="#F3BA2F" strokeWidth="0.8" opacity="0.5" transform={`rotate(30 ${x+6} ${y})`}/>
      </g>
    );
  }

  function BlockchainGraphic() {
    return (
      <div style={{ display:"flex", justifyContent:"center", margin:"2.5rem 0", padding:"0.5rem" }}>
        <svg width="340" height="110" viewBox="0 0 340 110" fill="none">
          <Block3D x={0} label="BLOCK #N" hash="#a3f2...9c1e"/>
          {/* Chain 1 */}
          <line x1="96" y1="42" x2="120" y2="42" stroke="#F3BA2F" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.4"/>
          <ChainLink x={103} y={42}/>
          {/* Block 2 */}
          <Block3D x={118} label="BLOCK #N+1" hash="#7b44...2f8a"/>
          {/* Chain 2 */}
          <line x1="214" y1="42" x2="238" y2="42" stroke="#F3BA2F" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.4"/>
          <ChainLink x={221} y={42}/>
          {/* Block 3 */}
          <Block3D x={236} label="BLOCK #N+2" hash="#c91d...5e72"/>
          {/* Chain 3 — to pending */}
          <line x1="332" y1="42" x2="340" y2="42" stroke="#F3BA2F" strokeWidth="0.7" strokeDasharray="3 2" opacity="0.25"/>
        </svg>
      </div>
    );
  }

  function NodeNetworkSVG() {
    const nodes = [[90,45],[170,15],[250,45],[170,75],[130,30],[210,30],[130,60],[210,60]];
    const links: [number,number][] = [[0,1],[1,2],[2,3],[3,0],[0,4],[1,5],[4,5],[4,6],[5,7],[6,7],[2,7],[3,6]];
    return (
      <div style={{ display:"flex", justifyContent:"center", margin:"2rem 0", opacity:0.28 }}>
        <svg width="340" height="92" viewBox="0 0 340 92" fill="none">
          {links.map(([a,b],i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#F3BA2F" strokeWidth="0.6" strokeDasharray="3 3"/>)}
          {nodes.map(([cx,cy],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={i < 4 ? 8 : 5} fill="rgba(243,186,47,0.08)" stroke="#F3BA2F" strokeWidth="0.8"/>
              {i < 4 && <text x={cx} y={cy+3} fontSize="5" fill="#F3BA2F" textAnchor="middle" fontFamily="monospace">N{i+1}</text>}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  /* ── Article Database ──────────────────────────────────────────────────── */
  const TOC_SECTIONS = [
    { id:"intro",       label:"Introduction & History" },
    { id:"components",  label:"Core Components" },
    { id:"benefits",    label:"Benefits" },
    { id:"limitations", label:"Limitations" },
    { id:"industries",  label:"Industries" },
    { id:"trends",      label:"Emerging Trends" },
    { id:"future",      label:"The Future" },
    { id:"faq",         label:"FAQs" },
    { id:"myths",       label:"Common Myths" },
    { id:"takeaways",   label:"Key Takeaways" },
  ];

  const HEADING_ID_MAP: Record<string, string> = {
    "1: Introduction, Blockchain Basics & History": "intro",
    "Core Components of Blockchain": "components",
    "Benefits of Blockchain": "benefits",
    "Limitations of Blockchain": "limitations",
    "Blockchain Across Industries": "industries",
    "Emerging Trends in Blockchain": "trends",
    "The Future of Blockchain": "future",
    "Frequently Asked Questions (FAQs)": "faq",
    "Common Blockchain Myths": "myths",
    "Key Takeaways": "takeaways",
  };

  const ARTICLES: Record<string, {
    slug: string; title: string; subtitle: string; authors: string; year: string;
    category: string; thumbnail?: string; tags: string[]; readTime: string; content: string;
    customBody?: React.ComponentType;
  }> = {
    "blockchain-basic": {
      slug: "blockchain-basic",
      title: "What is Blockchain? A Complete Beginner's Guide",
      subtitle: "From distributed ledgers to smart contracts — the definitive primer on blockchain technology",
      authors: "Faisal Orakzai", year: "2026", category: "BLOCKCHAIN",
      thumbnail: "/mk/blockchain-guide.png", readTime: "25 min read",
      tags: ["Blockchain","DLT","Web3","DeFi","Cryptography","RWA","Tokenization","Smart Contracts"],
      customBody: BlockchainBasicVisual,
      content: `
What is Blockchain? A Complete Beginner's Guide

1: Introduction, Blockchain Basics & History

What is Blockchain?

Blockchain is one of the most revolutionary technologies of the 21st century. Often associated with cryptocurrencies like Bitcoin, blockchain is far more than just digital money. It is a secure, transparent, decentralized, and tamper-resistant system for storing, managing, and verifying data without relying on a central authority.

Today, blockchain is transforming industries including finance, healthcare, supply chain, government, real estate, digital identity, gaming, and luxury commerce. It is becoming the foundation of Web3, tokenized assets (RWA), decentralized finance (DeFi), and next-generation digital infrastructure.

Just as the internet transformed how people share information, blockchain is transforming how people exchange value, establish trust, and own digital assets.

---

Why Blockchain Matters

For decades, digital systems have depended on centralized organizations such as banks, governments, payment processors, cloud providers, and large technology companies. These institutions store data on centralized servers and act as trusted intermediaries.

Although centralized systems have powered the modern internet, they face several challenges:

- Single points of failure
- Data manipulation
- Security breaches
- High operational costs
- Slow cross-border transactions
- Limited transparency
- Dependence on trusted third parties

Blockchain was designed to solve many of these problems by replacing centralized trust with cryptographic verification and distributed consensus.

Instead of asking people to trust one organization, blockchain enables participants to trust mathematics, cryptography, and a decentralized network of computers.

---

A Simple Example

Imagine five friends share an expense notebook.

In a traditional system:

- One person owns the notebook.
- That person can edit, erase, or lose records.
- Everyone must trust that individual.

Now imagine every friend owns an identical copy of the notebook.

Whenever someone writes a new transaction:

- Every copy is updated.
- Everyone verifies the information.
- Nobody can secretly change past records.

This shared notebook represents the basic idea behind blockchain.

Instead of one owner, thousands of computers maintain synchronized copies of the same ledger.

---

The Definition of Blockchain

Blockchain is a distributed digital ledger that stores information in chronological blocks linked together using cryptographic hashes.

Every participant in the network maintains a copy of the ledger. Once information is verified and added, it becomes extremely difficult to modify or delete.

The blockchain continuously grows as new blocks are added to the chain.

Each block permanently records transactions or other digital information.

---

Understanding the Word "Blockchain"

The name comes from two simple words:

Block

A block is a digital container that stores information.

It may contain:

- Financial transactions
- Smart contract data
- Ownership records
- Asset transfers
- Identity information
- Supply chain updates

Every block also includes technical information that connects it to previous blocks.

---

Chain

Blocks are connected together in chronological order.

Every new block contains the cryptographic fingerprint (hash) of the previous block.

If someone attempts to change one block, every following block becomes invalid.

This structure creates a secure chain of records that cannot easily be altered.

Hence the name:

Block + Chain = Blockchain

---

Blockchain in One Sentence

Blockchain is a decentralized, secure, transparent, and immutable digital ledger maintained collectively by a network instead of a single organization.

---

The Four Core Principles of Blockchain

1. Decentralization

Traditional databases are controlled by one company.

Blockchain distributes data across thousands of independent computers called nodes.

No single participant has complete control.

---

2. Transparency

Most public blockchains allow anyone to verify transactions.

This creates accountability and significantly reduces opportunities for fraud.

---

3. Immutability

After data is confirmed and added to the blockchain, changing it becomes extraordinarily difficult.

This protects historical records from unauthorized modification.

---

4. Security

Blockchain combines advanced cryptography, distributed networking, and consensus mechanisms to secure information.

Even if one node fails or is compromised, the network continues to operate.

---

Blockchain Is Not Bitcoin

A common misconception is that blockchain and Bitcoin are the same.

They are not.

Blockchain is the underlying technology.

Bitcoin is one application built on blockchain.

Just as email is an application of the internet, Bitcoin is an application of blockchain.

Many other blockchain applications exist, including:

- Digital identity
- Real estate tokenization
- Healthcare records
- Supply chain management
- Cross-border payments
- Luxury product authentication
- Voting systems
- Enterprise infrastructure

---

Brief History of Blockchain

Understanding blockchain requires looking at how the idea evolved over several decades.

1970s – Cryptography Revolution

Researchers developed public-key cryptography, digital signatures, and secure encryption.

These innovations later became the foundation of blockchain security.

Without modern cryptography, blockchain would not exist.

---

1991 – The First Blockchain Concept

Researchers Stuart Haber and W. Scott Stornetta proposed a cryptographically secured chain of timestamped documents.

Their goal was to prevent digital documents from being altered after publication.

Although cryptocurrencies did not yet exist, their work introduced many concepts used by modern blockchains.

---

1998 – Digital Cash Ideas

Computer scientist Wei Dai introduced the concept of "b-money," describing decentralized digital currency.

Around the same time, Nick Szabo proposed "Bit Gold," another decentralized digital money concept.

These projects were never fully implemented but greatly influenced future blockchain development.

---

2008 – Bitcoin Whitepaper

During the global financial crisis, a person or group using the name Satoshi Nakamoto published the Bitcoin whitepaper titled:

"Bitcoin: A Peer-to-Peer Electronic Cash System."

The paper proposed a decentralized payment system that removed the need for banks or intermediaries.

This document is widely regarded as the birth of modern blockchain technology.

---

2009 – Bitcoin Network Launch

The Bitcoin blockchain officially launched.

For the first time in history:

- Digital money could be transferred without banks.
- Transactions were verified by decentralized computers.
- Double spending was prevented without central authorities.

Blockchain moved from theory into reality.

---

2015 – Ethereum Changes Everything

Bitcoin focused mainly on digital payments.

Ethereum expanded blockchain by introducing programmable smart contracts.

Developers could now build decentralized applications (dApps), decentralized finance (DeFi), NFTs, blockchain games, digital identity systems, and enterprise platforms.

This marked the beginning of the Web3 era.

---

2020–Present – Enterprise & Global Adoption

Today blockchain extends far beyond cryptocurrency.

Governments, financial institutions, logistics companies, healthcare providers, luxury brands, and technology firms are actively exploring blockchain for:

- Digital identity
- Asset tokenization
- Cross-border settlement
- Central Bank Digital Currencies (CBDCs)
- Supply chain transparency
- Digital ownership
- AI integration
- Enterprise automation
- Real World Assets (RWA)
- Pygital commerce

Blockchain has evolved into a foundational technology for the future digital economy.

---

From Digital Money to Digital Infrastructure

The first generation of blockchain introduced decentralized money.

The second generation enabled programmable smart contracts.

The third generation is focused on scalable infrastructure capable of supporting governments, enterprises, financial markets, AI systems, and billions of users.

Blockchain is no longer just about cryptocurrency—it is becoming the operating system of the digital economy.

---

Core Components of Blockchain

Every blockchain network consists of several interconnected components. Each plays a critical role in ensuring security, transparency, and decentralization.

The primary components are:

- Blocks
- Transactions
- Nodes
- Distributed Ledger
- Cryptographic Hashes
- Digital Signatures
- Consensus Mechanisms
- Smart Contracts (on programmable blockchains)

When these components work together, they create a decentralized ecosystem capable of securely recording and verifying information.

---

What Is a Block?

A block is the basic storage unit of a blockchain. Think of it as a page in a digital ledger that contains a collection of verified transactions.

Instead of recording one transaction at a time, the network groups multiple transactions into a single block. Once validated, the block becomes a permanent part of the blockchain.

A typical block contains:

- Block Height (its position in the chain)
- Timestamp (when the block was created)
- Transaction Data
- Previous Block Hash
- Current Block Hash
- Nonce (used in Proof of Work)
- Merkle Root (a cryptographic summary of all transactions)

Every block is cryptographically linked to the previous block, creating an unbroken chain of records.

---

What Is a Transaction?

A transaction is any action recorded on the blockchain.

While many people associate transactions only with cryptocurrency transfers, blockchain transactions can represent many types of digital activities, including:

- Sending cryptocurrency
- Minting NFTs
- Deploying smart contracts
- Buying tokenized real estate
- Recording digital identity
- Verifying academic certificates
- Registering intellectual property
- Updating supply chain information

Every interaction begins as a transaction request submitted to the blockchain network.

---

Understanding the Transaction Lifecycle

To understand how blockchain works, imagine Alice wants to send 1 Bitcoin to Bob.

Step 1: Transaction Creation

Alice opens her blockchain wallet.

She enters Bob's wallet address and specifies the amount she wants to send.

The wallet software prepares a transaction request.

---

Step 2: Digital Signature

Before the transaction leaves Alice's wallet, it is digitally signed using her private key.

This signature proves three important things:

- Alice is the legitimate owner of the funds.
- The transaction has not been modified.
- The transaction was genuinely authorized.

Importantly, Alice's private key never leaves her device.

---

Step 3: Broadcasting the Transaction

The signed transaction is broadcast to thousands of computers connected to the blockchain network.

These computers are called nodes.

Within seconds, nodes receive and examine the transaction.

---

Step 4: Transaction Verification

Each node independently checks whether the transaction follows the network's rules.

Typical verification includes:

- Does Alice own enough funds?
- Is the digital signature valid?
- Has Alice already spent these assets?
- Does the transaction comply with protocol rules?

If any validation fails, the transaction is rejected.

If successful, it enters a waiting area called the Mempool.

---

Step 5: Building a New Block

Validators or miners select verified transactions from the Mempool.

These transactions are grouped together to form a candidate block.

The network prepares this block for validation.

---

Step 6: Network Consensus

Before the new block becomes permanent, the blockchain network must agree that it is valid.

This agreement process is known as consensus.

Different blockchains use different consensus mechanisms, such as:

- Proof of Work (PoW)
- Proof of Stake (PoS)
- Practical Byzantine Fault Tolerance (PBFT)
- Delegated Proof of Stake (DPoS)

Consensus prevents fraudulent transactions from entering the blockchain.

---

Step 7: Block Confirmation

Once consensus is achieved, the block is officially added to the blockchain.

The new block contains a cryptographic reference to the previous block, ensuring the integrity of the chain.

Bob now receives the Bitcoin, and the transaction becomes a permanent part of blockchain history.

---

What Is a Cryptographic Hash?

One of blockchain's strongest security features is the hash function.

A hash is a fixed-length digital fingerprint generated from data.

Even a tiny change in the input completely changes the resulting hash.

For example:

Input:

«Blockchain»

Output:

«A unique cryptographic hash»

If even one letter changes, the output becomes entirely different.

This property makes tampering immediately detectable.

---

Previous Hash: The Chain Connection

Every block stores the hash of the block before it.

For example:

Block #100 → Hash ABC123

↓

Block #101 stores ABC123

↓

Block #102 stores XYZ789

If someone attempts to alter Block #100, its hash changes.

As a result:

- Block #101 no longer points to the correct hash.
- Block #102 also becomes invalid.

The chain instantly detects the inconsistency.

This cryptographic linking is the reason blockchain is considered immutable.

---

What Are Nodes?

A node is any computer connected to a blockchain network.

Rather than relying on one central server, blockchain distributes identical copies of the ledger across thousands of independent nodes worldwide.

Nodes perform several essential functions:

- Store blockchain data
- Validate transactions
- Share new blocks
- Enforce network rules
- Synchronize with other nodes

The larger the node network, the stronger and more resilient the blockchain becomes.

---

Types of Nodes

Full Nodes

Full nodes download and store the complete blockchain history.

They independently verify every transaction and every block.

These nodes provide the highest level of security.

---

Light Nodes

Light nodes store only essential blockchain information.

Instead of downloading the full blockchain, they rely on full nodes for verification.

Most mobile wallets use light nodes.

---

Validator Nodes

Validator nodes participate in Proof of Stake blockchains.

They stake cryptocurrency and validate new blocks according to the network's consensus rules.

Validators help secure the blockchain while earning rewards.

---

Mining Nodes

Mining nodes operate on Proof of Work blockchains such as Bitcoin.

They compete to solve complex mathematical puzzles.

The first successful miner earns the right to create the next block and receive a block reward.

---

Distributed Ledger Technology (DLT)

Traditional databases exist in one location and are controlled by one organization.

Blockchain uses a distributed ledger, where identical copies are stored across many computers.

This architecture provides several advantages:

- High availability
- Fault tolerance
- No single point of failure
- Greater transparency
- Increased resilience against attacks

Even if some nodes go offline, the blockchain continues operating normally.

---

Public and Private Keys

Blockchain security relies on asymmetric cryptography.

Every blockchain wallet generates two keys.

Public Key

The public key is similar to a bank account number.

It can be safely shared with others.

People use it to send assets to your wallet.

---

Private Key

The private key is comparable to the master key of a secure vault.

It proves ownership of your assets.

Anyone who gains access to your private key can control your funds.

For this reason, private keys must always remain confidential.

---

Why Blockchain Is Secure

Blockchain combines multiple layers of protection:

- Cryptographic hashing
- Digital signatures
- Distributed ledgers
- Consensus algorithms
- Thousands of independent nodes
- Immutable records
- Continuous verification

Instead of relying on one company for security, blockchain distributes trust across the entire network.

This architecture makes large public blockchains among the most secure digital systems ever created.

---

Conclusion

Blockchain works because several independent technologies cooperate seamlessly. Transactions are digitally signed, broadcast to thousands of nodes, verified through consensus, grouped into cryptographically linked blocks, and permanently recorded on a distributed ledger.

Understanding these components is essential before exploring more advanced topics such as smart contracts, tokenization, decentralized finance, and enterprise blockchain systems.


---

Benefits of Blockchain

1. Decentralization

One of blockchain's defining characteristics is decentralization.

Traditional systems rely on a central authority such as a bank, government agency, or technology company to manage and verify data. Blockchain distributes this responsibility across a network of independent nodes.

Advantages of Decentralization

- Eliminates single points of failure.
- Reduces dependence on intermediaries.
- Improves system resilience.
- Enhances transparency and trust.
- Supports global participation without centralized control.

This decentralized architecture makes blockchain particularly valuable for systems that require high availability and trust.

---

2. Enhanced Security

Blockchain networks use advanced cryptographic techniques to protect data.

Each transaction is digitally signed, verified by the network, and permanently recorded. Every new block references the previous block through cryptographic hashes, making unauthorized modifications extremely difficult.

Security features include:

- Public-key cryptography
- Digital signatures
- Hash functions
- Distributed validation
- Consensus algorithms

These layers work together to create one of the most secure digital record-keeping systems available today.

---

3. Transparency

Public blockchains allow participants to independently verify transactions without requiring permission from a central authority.

This transparency helps reduce:

- Fraud
- Data manipulation
- Hidden transactions
- Financial corruption

Businesses can also provide customers with greater visibility into supply chains, product authenticity, and financial operations.

---

4. Immutability

After data has been confirmed and added to the blockchain, modifying historical records becomes extremely difficult.

This immutability creates permanent audit trails that are particularly useful for:

- Financial reporting
- Medical records
- Academic certificates
- Property ownership
- Government registries

Organizations can confidently verify historical information without relying solely on internal databases.

---

5. Faster Global Transactions

Traditional international payments often require multiple banks, clearing houses, and settlement systems.

These processes may take several days.

Blockchain enables peer-to-peer value transfer that can significantly reduce settlement times, especially in cross-border scenarios, depending on the blockchain network and applicable regulations.

---

6. Reduced Costs

By reducing the need for intermediaries, blockchain can lower operational expenses in many business processes.

Potential cost savings include:

- Payment processing
- Document verification
- Supply chain management
- Asset transfers
- Digital identity verification

The extent of savings depends on implementation and the specific use case.

---

7. Improved Traceability

Every transaction recorded on a blockchain includes a timestamp and a permanent history.

Organizations can track products throughout their entire lifecycle.

Examples include:

- Food safety
- Pharmaceutical supply chains
- Luxury product authentication
- Manufacturing
- Logistics

Consumers gain greater confidence because product histories become easier to verify.

---

8. Digital Ownership

Blockchain enables verifiable ownership of digital assets.

Examples include:

- Cryptocurrencies
- NFTs
- Tokenized real estate
- Digital certificates
- Intellectual property
- Virtual assets

Ownership records can be transferred securely without relying on a centralized registry.

---

Limitations of Blockchain

Despite its advantages, blockchain also faces important challenges.

Understanding these limitations is essential for making informed technology decisions.

---

1. Scalability

Many public blockchains process fewer transactions per second than traditional payment networks.

As network usage increases:

- Transaction queues may grow.
- Confirmation times may increase.
- Network congestion can occur.

Modern solutions such as Layer 2 networks and sharding aim to improve scalability.

---

2. Energy Consumption

Some blockchain networks, particularly those using Proof of Work, require substantial computational resources.

This has raised concerns regarding:

- Electricity usage
- Environmental impact
- Carbon emissions

Many newer blockchain platforms have adopted more energy-efficient consensus mechanisms such as Proof of Stake.

---

3. Regulatory Uncertainty

Blockchain regulations continue to evolve worldwide.

Different countries have different approaches to:

- Digital assets
- Stablecoins
- Securities
- Taxation
- Anti-money laundering (AML)
- Consumer protection

Organizations operating internationally must stay informed about changing legal requirements.

---

4. User Responsibility

Blockchain gives users greater control over their assets.

However, this also increases personal responsibility.

If someone loses their private key:

- Assets may become permanently inaccessible.
- Transactions generally cannot be reversed.
- There is often no central authority to recover lost funds.

Secure key management is therefore essential.

---

5. Integration Challenges

Many businesses rely on legacy systems developed over decades.

Integrating blockchain with existing infrastructure may require:

- Software redesign
- Employee training
- Data migration
- Security assessments
- Regulatory compliance

Successful implementation often requires careful planning and investment.

---

6. Privacy Considerations

Public blockchains are transparent by design.

Although wallet addresses are pseudonymous, transaction histories may be visible to anyone.

Organizations handling sensitive information often use permissioned blockchains or privacy-enhancing technologies to address these concerns.

---

Real-World Use Cases of Blockchain

Blockchain technology now supports a wide range of industries beyond cryptocurrency.

---

Banking & Financial Services

Banks are exploring blockchain for:

- Cross-border payments
- Trade finance
- Digital asset custody
- Settlement systems
- Fraud prevention

Blockchain can improve transparency and operational efficiency in financial services.

---

Supply Chain Management

Companies use blockchain to monitor products from origin to customer.

Benefits include:

- Product traceability
- Authenticity verification
- Inventory visibility
- Reduced counterfeiting
- Faster recalls

---

Healthcare

Healthcare organizations can use blockchain to improve the management of:

- Electronic health records
- Medical research
- Drug tracking
- Insurance claims
- Patient identity

Secure data sharing may enhance collaboration while protecting data integrity.

---

Real Estate

Blockchain has the potential to modernize property markets through:

- Digital property records
- Tokenized ownership
- Faster transactions
- Reduced paperwork
- Transparent ownership history

Tokenization may also enable fractional investment in real estate.

---

Government Services

Governments are exploring blockchain for:

- Digital identity
- Land registries
- Public records
- Tax systems
- Voting infrastructure
- Document authentication

These applications aim to improve transparency and administrative efficiency.

---

Education

Educational institutions can issue tamper-resistant:

- Diplomas
- Certificates
- Professional licenses
- Academic transcripts

Employers can verify credentials more efficiently.

---

Luxury Goods

Luxury brands are increasingly exploring blockchain to enhance product authenticity.

Blockchain can help create digital records that support:

- Product provenance
- Ownership history
- Anti-counterfeiting measures
- Customer trust

---

Artificial Intelligence

AI systems increasingly depend on trustworthy, high-quality data.

Blockchain can contribute by:

- Verifying data integrity
- Tracking AI model updates
- Supporting decentralized AI networks
- Recording audit trails

The convergence of AI and blockchain is an active area of research and development.

---

Why Businesses Are Investing in Blockchain

Organizations are adopting blockchain not because it replaces every existing system, but because it offers unique capabilities where trust, transparency, security, and verifiable records are critical.

Successful blockchain adoption begins by identifying problems that genuinely benefit from decentralization rather than applying blockchain to every scenario.

---

Conclusion

Blockchain has moved beyond its origins as the technology behind cryptocurrency. Today, it serves as a versatile digital infrastructure capable of improving transparency, security, and efficiency across numerous industries. While challenges such as scalability, regulation, and integration remain, continued innovation is expanding blockchain's practical applications and long-term potential.


---

Blockchain Across Industries

One of blockchain's greatest strengths is its versatility. Rather than serving a single purpose, blockchain provides a secure and transparent foundation that can support countless applications.

Below are some of the industries where blockchain is creating significant impact.

---

1. Financial Services & Banking

The financial sector was the first industry to embrace blockchain at scale.

Traditional banking systems rely on multiple intermediaries, resulting in slower settlements, higher costs, and increased operational complexity.

Blockchain offers an alternative by enabling secure peer-to-peer value transfer and programmable financial applications.

Current Applications

- Cross-border payments
- Digital asset custody
- Trade finance
- Securities settlement
- Digital wallets
- Stablecoin infrastructure
- Decentralized Finance (DeFi)

Future Outlook

Banks are increasingly experimenting with blockchain to improve operational efficiency and modernize financial infrastructure. Many central banks are also researching or piloting Central Bank Digital Currencies (CBDCs).

---

2. Real Estate

The real estate industry involves complex ownership records, legal documentation, and multiple intermediaries.

Blockchain has the potential to simplify many of these processes.

Applications

- Digital land registries
- Property ownership records
- Tokenized real estate
- Fractional ownership
- Rental agreements
- Mortgage processing

Future Outlook

Tokenization may enable investors to purchase fractional interests in properties, increasing accessibility and liquidity while streamlining transactions.

---

3. Supply Chain & Logistics

Modern supply chains involve manufacturers, suppliers, logistics providers, retailers, and consumers across multiple countries.

Blockchain provides an immutable record of every stage in the product lifecycle.

Applications

- Product tracking
- Shipment verification
- Inventory management
- Food traceability
- Pharmaceutical authentication
- Anti-counterfeiting

Benefits

- Improved transparency
- Faster recalls
- Reduced fraud
- Enhanced consumer trust

---

4. Healthcare

Healthcare organizations generate vast amounts of sensitive data.

Blockchain can help improve the integrity and traceability of medical information while supporting secure data sharing.

Applications

- Electronic health records
- Medical research
- Prescription tracking
- Drug supply verification
- Patient identity management
- Insurance claims

Healthcare providers continue to evaluate blockchain as a tool for improving data integrity and interoperability.

---

5. Government & Public Services

Governments worldwide are exploring blockchain to modernize public administration.

Potential applications include:

- Digital identity
- Land registration
- Tax administration
- Business registration
- Voting systems
- Public procurement
- Document authentication

Blockchain may improve transparency, reduce fraud, and streamline government services when implemented appropriately.

---

6. Education

Educational institutions issue millions of certificates, diplomas, and academic records every year.

Blockchain enables these credentials to be securely recorded and independently verified.

Applications

- Academic transcripts
- Digital diplomas
- Professional certifications
- Skills verification
- Lifelong learning records

Employers can verify qualifications more efficiently while reducing credential fraud.

---

7. Retail & E-Commerce

Retailers are increasingly using blockchain to improve customer trust and operational efficiency.

Applications

- Product authenticity
- Digital receipts
- Loyalty programs
- Warranty management
- Supply chain visibility

Consumers benefit from greater confidence in the origin and authenticity of products.

---

8. Luxury Brands & Pygital Commerce

Luxury goods face ongoing challenges related to counterfeiting and ownership verification.

Blockchain enables brands to create secure digital records linked to physical products.

Applications

- Digital certificates of authenticity
- Ownership history
- NFC and QR verification
- Limited-edition collectibles
- Digital product passports

The combination of physical products and digital ownership experiences is often referred to as Pygital Commerce, an emerging model that blends traditional luxury with blockchain-based verification.

---

9. Artificial Intelligence (AI)

Artificial Intelligence and blockchain are increasingly viewed as complementary technologies.

AI relies on large volumes of trustworthy data, while blockchain provides mechanisms for verifying data integrity and maintaining transparent records.

Potential applications include:

- AI model verification
- Data provenance
- Decentralized AI marketplaces
- Secure model sharing
- Audit trails for AI systems

The convergence of AI and blockchain may support more transparent and accountable AI ecosystems.

---

10. Energy & Sustainability

Blockchain is also being explored in the energy sector.

Applications include:

- Renewable energy certificates
- Peer-to-peer energy trading
- Carbon credit tracking
- Smart grid management
- Sustainability reporting

These use cases aim to improve transparency and efficiency in energy markets.

---

Emerging Trends in Blockchain

Blockchain technology continues to evolve rapidly.

Several important trends are shaping its future.

---

Tokenization of Real-World Assets (RWA)

One of the fastest-growing blockchain sectors involves converting real-world assets into digital tokens.

Examples include:

- Real estate
- Bonds
- Commodities
- Precious metals
- Art
- Intellectual property

Tokenization may increase liquidity and expand investment opportunities by enabling fractional ownership.

---

Decentralized Finance (DeFi)

DeFi seeks to recreate financial services using blockchain-based protocols.

Examples include:

- Lending
- Borrowing
- Trading
- Asset management
- Insurance

Users interact with smart contracts rather than traditional financial intermediaries.

---

Decentralized Identity (DID)

Future digital identity systems may allow individuals to control their own credentials without depending entirely on centralized databases.

Potential benefits include:

- Enhanced privacy
- Reduced identity fraud
- Greater user control
- Improved interoperability

---

Enterprise Blockchain

Organizations are increasingly exploring permissioned blockchain networks for:

- Supply chain collaboration
- Business process automation
- Secure document management
- Multi-party data sharing

Enterprise blockchain focuses on efficiency, governance, and controlled participation.

---

Web3 Infrastructure

Web3 represents a vision of a more decentralized internet where users have greater ownership of their digital assets and identities.

Blockchain serves as one of the foundational technologies supporting this vision.

Key components include:

- Decentralized applications (dApps)
- Smart contracts
- Digital wallets
- Token economies
- Decentralized Autonomous Organizations (DAOs)

---

Challenges for the Future

Although blockchain adoption continues to grow, several challenges remain:

- Scalability
- Regulatory clarity
- User experience
- Interoperability
- Energy efficiency
- Security education
- Enterprise integration

Addressing these challenges will be essential for broader mainstream adoption.

---

The Future of Blockchain

Over the next decade, blockchain is expected to evolve from a specialized technology into a foundational layer of the digital economy.

Rather than replacing existing systems entirely, blockchain is likely to integrate with technologies such as Artificial Intelligence, cloud computing, the Internet of Things (IoT), advanced cryptography, and digital identity solutions.

Future blockchain ecosystems may support:

- Global financial infrastructure
- Tokenized real-world assets
- Secure digital identity
- Transparent supply chains
- Trusted AI systems
- Smart cities
- Digital governments
- Interoperable enterprise networks

The organizations that successfully combine blockchain with practical business value will play an important role in shaping the next generation of digital innovation.

---

Conclusion

Blockchain is no longer limited to cryptocurrency. Its applications now extend across finance, healthcare, government, education, retail, real estate, logistics, luxury commerce, and artificial intelligence. As the technology matures, it is increasingly being viewed as a foundational infrastructure for secure, transparent, and decentralized digital systems.

While technical, regulatory, and operational challenges remain, blockchain's ability to improve trust, efficiency, and interoperability positions it as one of the defining technologies of the coming decades.

Frequently Asked Questions (FAQs)
1. What is blockchain in simple words?
Blockchain is a decentralized digital ledger that records information securely across multiple computers. Instead of relying on one central authority, every participant maintains a copy of the ledger, making records transparent, secure, and extremely difficult to alter.
2. Is blockchain the same as Bitcoin?
No.
Bitcoin is a cryptocurrency.
Blockchain is the underlying technology that powers Bitcoin.
Many blockchain applications have nothing to do with cryptocurrency, including digital identity, healthcare, supply chain management, real estate, and enterprise systems.
3. Who invented blockchain?
The concept evolved over several decades through cryptography research. However, modern blockchain technology became practical in 2008 when Satoshi Nakamoto published the Bitcoin whitepaper.
4. Why is blockchain considered secure?
Blockchain combines:
Cryptographic hashing
Digital signatures
Decentralized nodes
Consensus mechanisms
Immutable records
These technologies make unauthorized modifications extremely difficult on well-secured networks.
5. Can blockchain be hacked?
The blockchain protocol itself is designed to be highly secure, but vulnerabilities can arise from poorly written smart contracts, compromised wallets, stolen private keys, phishing attacks, or insecure applications built on top of the blockchain.
6. What industries use blockchain?
Blockchain is being explored across many industries, including:
Banking & Finance
Real Estate
Supply Chain
Healthcare
Government
Education
Retail
Insurance
Logistics
Artificial Intelligence
Manufacturing
Energy
7. What is decentralization?
Decentralization means that no single organization controls the network.
Instead, thousands of computers collectively maintain and verify the blockchain.
8. What is a smart contract?
A smart contract is a self-executing program stored on a blockchain.
It automatically performs predefined actions when specific conditions are met, reducing the need for intermediaries.
9. What is Web3?
Web3 is the next generation of the internet built around decentralized technologies.
Instead of platforms owning users' data and digital assets, Web3 aims to give users greater ownership and control through blockchain-based applications.
10. What is tokenization?
Tokenization is the process of converting ownership rights of real-world or digital assets into blockchain-based digital tokens.
Examples include:
Real Estate
Gold
Bonds
Stocks
Art
Luxury Goods
11. What are Real World Assets (RWA)?
Real World Assets (RWA) are physical or financial assets represented digitally on a blockchain.
Tokenization enables these assets to become easier to trade, divide into fractional ownership, and manage more efficiently.
12. Is blockchain only for large companies?
No.
Blockchain solutions are being adopted by startups, small businesses, enterprises, governments, and nonprofit organizations. The appropriate implementation depends on the specific use case and business requirements.
13. Why is blockchain important for the future?
Blockchain has the potential to improve transparency, security, efficiency, and digital ownership. As technologies such as AI, IoT, and Web3 continue to evolve, blockchain is expected to play an increasingly important role in the digital economy.
Common Blockchain Myths
Myth 1:
Blockchain is only used for cryptocurrency.
Reality: Blockchain supports applications in finance, healthcare, education, supply chains, identity management, and many other sectors.
Myth 2:
Blockchain is completely anonymous.
Reality: Many public blockchains are pseudonymous, meaning wallet addresses are visible even if personal identities are not directly attached.
Myth 3:
Blockchain cannot be regulated.
Reality: Many countries are developing regulatory frameworks for blockchain and digital assets while encouraging responsible innovation.
Myth 4:
Every business needs blockchain.
Reality: Blockchain is valuable when decentralization, transparency, auditability, or shared trust are required. It is not the best solution for every problem.
Key Takeaways
Blockchain represents a significant evolution in how digital information and value can be recorded, verified, and exchanged. By combining cryptography, distributed networks, and consensus mechanisms, blockchain enables secure systems without relying entirely on centralized intermediaries.
Some of the most important lessons from this guide include:
Blockchain is a technology, not just cryptocurrency.
Decentralization increases resilience and transparency.
Cryptography protects data integrity and ownership.
Smart contracts automate trusted digital interactions.
Tokenization expands access to real-world assets.
Web3 introduces new models of digital ownership.
Blockchain adoption continues to grow across industries.
Final Conclusion
Blockchain has evolved from a groundbreaking idea into one of the most influential technologies of the digital age. While it first gained global attention through Bitcoin, its true potential lies far beyond digital currencies.
Today, blockchain is reshaping finance, healthcare, logistics, education, real estate, digital identity, enterprise systems, and many other industries. It enables organizations to build transparent, secure, and efficient solutions that reduce dependence on centralized intermediaries while improving trust and accountability.
Like any transformative technology, blockchain faces challenges including scalability, regulation, interoperability, and user adoption. However, ongoing innovation continues to address these limitations, paving the way for broader implementation.
As the digital economy evolves, blockchain is expected to become a foundational layer supporting Web3, tokenized assets, decentralized finance, trusted AI systems, and next-generation enterprise infrastructure. Understanding blockchain today is not only valuable for developers and businesses—it is increasingly important for anyone seeking to understand the future of technology.
`,
      },
    "blockchain-infra": {
        slug: "blockchain-infra",
        title: "Blockchain Infrastructure Explained",
        subtitle: "The Complete Guide to the Technology That Powers Blockchain Networks",
        authors: "Faisal Orakzai", year: "2026", category: "BLOCKCHAIN",
        thumbnail: "/mk/thumb-blockchain-infra.png", readTime: "35 min read",
        tags: ["Blockchain","Infrastructure","Nodes","Consensus","Layer-2","Validators","RPC","Web3"],
        customBody: BlockchainInfraVisual,
        content: `
  Blockchain Infrastructure Explained
The Complete Guide to the Technology That Powers Blockchain Networks
When people hear the word blockchain, they often think about cryptocurrencies such as Bitcoin or Ethereum. However, cryptocurrencies are only applications built on top of something much larger: blockchain infrastructure.
Infrastructure is the invisible foundation that allows an entire blockchain ecosystem to operate. Just as highways, bridges, airports, power grids, and internet cables enable modern civilization, blockchain infrastructure enables decentralized digital economies.
Without infrastructure:
There are no blockchain networks.
There are no validators.
There are no smart contracts.
There are no wallets.
There are no decentralized applications (dApps).
There is no Web3.
In simple terms, blockchain infrastructure is the complete technical environment that keeps a blockchain network secure, decentralized, synchronized, and continuously operational.
It includes everything from validator nodes and networking layers to storage systems, cryptography, APIs, consensus engines, developer tools, monitoring systems, and security architecture.
Understanding Infrastructure Through a Real-World Example
Imagine building an international airport.
Passengers only see the terminal, airplanes, and boarding gates.
But behind the scenes there are:
Air traffic control
Radar systems
Fuel pipelines
Security checkpoints
Electrical systems
Communication networks
Maintenance facilities
Runways
Emergency response systems
Without these hidden systems, the airport cannot function.
Blockchain works exactly the same way.
Users only see:
Wallets
Coins
Tokens
NFT marketplaces
Exchanges
DeFi applications
But behind those applications exists a massive infrastructure that processes transactions, validates data, stores blockchain history, synchronizes thousands of nodes, and protects the network from attacks.
Why Blockchain Infrastructure Matters
Every blockchain network depends on infrastructure to achieve five essential goals:
1. Security
Infrastructure protects the blockchain from cyberattacks, fraudulent transactions, and unauthorized modifications.
2. Decentralization
Instead of relying on a single server, blockchain infrastructure distributes responsibility across independent nodes around the world.
3. Reliability
Even if some servers fail, the network continues operating without interruption.
4. Transparency
Every participant can independently verify the blockchain's data using their own infrastructure.
5. Scalability
Modern infrastructure enables blockchain networks to process millions of users while maintaining performance and security.
Blockchain Infrastructure vs Traditional IT Infrastructure
Traditional internet services usually rely on centralized infrastructure.
For example:
A banking application typically uses:
Central servers
Central databases
Company-owned data centers
Internal security systems
Private cloud environments
The organization controls everything.
Blockchain infrastructure is fundamentally different.
Instead of one company controlling the network, thousands of independent computers cooperate using cryptographic rules and consensus mechanisms.
Traditional Infrastructure
Blockchain Infrastructure
Central server
Distributed nodes
Private database
Shared distributed ledger
Administrator control
Consensus-driven governance
Single point of failure
Highly fault tolerant
Organization trust
Cryptographic trust
This architectural shift is what enables blockchain to operate without requiring a central authority.
The Core Purpose of Blockchain Infrastructure
The infrastructure of any blockchain network performs several continuous functions:
Maintaining the ledger
Processing transactions
Executing smart contracts
Synchronizing global nodes
Validating new blocks
Protecting network integrity
Managing peer-to-peer communication
Preventing double spending
Storing historical blockchain data
Supporting decentralized applications
These responsibilities operate continuously, 24 hours a day, without manual intervention.
The Evolution of Blockchain Infrastructure
Blockchain infrastructure has evolved significantly over the past decade.
Generation 1: Basic Infrastructure
The first generation focused on simple digital payments.
Characteristics:
Basic nodes
Simple wallets
Limited scripting
Low scalability
Example use case: Peer-to-peer digital currency.
Generation 2: Smart Contract Infrastructure
The second generation introduced programmable blockchains.
New infrastructure components included:
Smart contract execution
Virtual machines
Developer frameworks
Token standards
Decentralized applications
This transformed blockchain from a payment network into a decentralized computing platform.
Generation 3: Scalable Infrastructure
Modern blockchain ecosystems focus on:
High-speed networks
Layer-2 scaling
Modular blockchain architecture
Cross-chain interoperability
Enterprise-grade security
AI-assisted monitoring
Cloud-native node deployment
Real World Asset (RWA) integration
Today's blockchain infrastructure is designed to support governments, enterprises, financial institutions, logistics networks, healthcare systems, and global digital commerce.

1. Blockchain Nodes
A node is any computer connected to a blockchain network. Nodes store blockchain data, validate transactions, communicate with other nodes, and help maintain the integrity of the network.
Unlike traditional centralized systems where a single server stores all information, blockchain distributes data across thousands of nodes worldwide.
Types of Nodes
Full Node
A Full Node stores the complete blockchain history and independently verifies every transaction and block according to the network's consensus rules.
Responsibilities include:
Verifying transactions
Validating blocks
Storing blockchain history
Sharing blockchain data with other nodes
Enforcing protocol rules
Full nodes are considered the backbone of decentralization because they independently verify all network activity.
Validator Node
Validator Nodes participate directly in producing and validating new blocks.
On Proof-of-Stake networks, validators stake cryptocurrency to earn the right to validate transactions.
Responsibilities:
Block production
Transaction verification
Consensus participation
Network security
Governance participation (on supported chains)
Archive Node
Archive Nodes store every historical blockchain state since the genesis block.
These nodes are essential for:
Blockchain explorers
Analytics platforms
Historical data providers
Enterprise auditing
Research institutions
Although storage requirements are significantly higher, archive nodes provide complete historical transparency.
Light Node
Light Nodes do not download the entire blockchain.
Instead, they verify transactions by requesting data from Full Nodes.
Advantages include:
Lower storage requirements
Faster synchronization
Mobile device compatibility
Efficient resource usage
Most cryptocurrency wallets operate as light nodes.
2. Consensus Layer
The Consensus Layer enables thousands of independent computers to agree on the current state of the blockchain without relying on a central authority.
Consensus prevents issues such as:
Double spending
Fraudulent transactions
Conflicting blockchain histories
Unauthorized modifications
Popular consensus mechanisms include:
Proof of Work (PoW)
Proof of Stake (PoS)
Delegated Proof of Stake (DPoS)
Proof of Authority (PoA)
Practical Byzantine Fault Tolerance (PBFT)
Each mechanism balances decentralization, security, scalability, and energy efficiency differently.
3. Networking Layer
Blockchain networks rely on Peer-to-Peer (P2P) communication instead of centralized servers.
Every node communicates directly with multiple neighboring nodes.
The networking layer is responsible for:
Broadcasting transactions
Sharing newly created blocks
Synchronizing blockchain data
Discovering new peers
Maintaining decentralized communication
If one node goes offline, the remaining network continues functioning without interruption.
4. Data Storage Layer
Every blockchain stores data in an organized and tamper-resistant format.
The storage layer contains:
Transactions
Blocks
Smart contract data
Token balances
Wallet addresses
Blockchain state
Each new block references the previous block through cryptographic hashing, creating an immutable chain of records.
Modern blockchain infrastructure also combines on-chain storage with decentralized off-chain storage solutions for handling larger files efficiently.
5. Cryptography Layer
Cryptography is the security foundation of blockchain infrastructure.
Without cryptography, blockchain could not guarantee authenticity, ownership, or data integrity.
Key cryptographic technologies include:
Hash Functions
Hash functions convert any amount of data into a fixed-length digital fingerprint.
They ensure:
Data integrity
Tamper detection
Block linking
Transaction verification
Public Key Cryptography
Each blockchain user has:
A Public Key (used to receive assets)
A Private Key (used to authorize transactions)
Only the owner of the private key can sign valid transactions, ensuring secure ownership of digital assets.
Digital Signatures
Digital signatures prove that a transaction was authorized by the rightful owner without revealing the private key itself.
They provide:
Authentication
Integrity
Non-repudiation
Security
6. Smart Contract Infrastructure
Modern blockchains are programmable through Smart Contracts.
A smart contract is self-executing code stored on the blockchain.
Instead of requiring intermediaries, smart contracts automatically execute predefined conditions.
Examples include:
Token creation
Decentralized finance (DeFi)
NFT marketplaces
Supply chain automation
Insurance claims
Real estate transactions
Smart contract infrastructure includes:
Virtual Machines (VMs)
Execution environments
Gas fee mechanisms
Contract storage
Developer frameworks
7. RPC Infrastructure
RPC (Remote Procedure Call) servers allow applications to communicate with blockchain networks.
Whenever a wallet, decentralized application, or blockchain explorer needs blockchain data, it usually sends requests to an RPC endpoint.
RPC infrastructure enables:
Wallet connectivity
Transaction broadcasting
Balance queries
Smart contract interactions
Blockchain synchronization
Without RPC infrastructure, most Web3 applications would not function.
8. APIs and SDKs
Developers rarely interact directly with raw blockchain data.
Instead, they use APIs (Application Programming Interfaces) and SDKs (Software Development Kits).
These tools simplify blockchain development by providing:
Wallet integration
Smart contract interaction
Transaction management
User authentication
Blockchain queries
They significantly reduce development complexity and accelerate application deployment.
9. Blockchain Explorers
A blockchain explorer is a public interface that allows users to inspect blockchain activity in real time.
Users can search for:
Transactions
Wallet addresses
Blocks
Validators
Tokens
Smart contracts
Explorers enhance transparency by making blockchain data easily accessible and verifiable.
10. Wallet Infrastructure
Wallets serve as the primary interface between users and blockchain networks.
A wallet does not actually store cryptocurrency; instead, it securely manages the user's private keys.
Wallet infrastructure supports:
Asset management
Transaction signing
Identity verification
Token transfers
Smart contract interactions
Wallets may be:
Software wallets
Hardware wallets
Mobile wallets
Browser wallets
Institutional custody solutions

1. Validator Infrastructure
Validators are the guardians of modern Proof-of-Stake (PoS) blockchains. They verify transactions, propose new blocks, maintain consensus, and secure the network.
Unlike traditional servers, validator infrastructure requires continuous uptime, robust security, and reliable connectivity.
A professional validator setup typically includes:
High-performance VPS or dedicated servers
Redundant internet connections
SSD/NVMe storage
Multi-core CPUs
Automatic monitoring
Backup nodes
Firewall protection
DDoS mitigation
Secure key management
Automatic failover systems
Large blockchain networks often operate hundreds or thousands of validators distributed across multiple countries, ensuring resilience and decentralization.
2. Layer-2 Scaling Infrastructure
As blockchain adoption grows, Layer-1 networks can become congested, leading to higher fees and slower transaction speeds.
Layer-2 solutions process transactions outside the main blockchain while ultimately settling them on Layer-1. This significantly increases throughput and reduces costs without sacrificing security.
Common Layer-2 technologies include:
Rollups (Optimistic & ZK-Rollups)
State Channels
Sidechains
Plasma
Validiums
Benefits:
Faster transaction processing
Lower transaction fees
Higher scalability
Improved user experience
Reduced network congestion
Layer-2 infrastructure is essential for supporting applications with millions of daily users, such as gaming, payments, and decentralized finance.
3. Oracle Infrastructure
Blockchains cannot directly access external information, such as weather data, stock prices, exchange rates, or sports results. Oracle infrastructure bridges this gap by securely delivering real-world data to smart contracts.
Oracle networks provide information such as:
Cryptocurrency prices
Foreign exchange rates
Weather conditions
Commodity prices
Sports outcomes
Election results
IoT sensor data
Supply chain tracking
Reliable oracle infrastructure is critical for DeFi platforms, insurance protocols, and Real World Asset (RWA) tokenization.
4. Cross-Chain Infrastructure
No single blockchain can serve every purpose. Cross-chain infrastructure enables different blockchain networks to communicate and exchange assets or data securely.
Cross-chain technology powers:
Asset transfers
Multi-chain applications
Cross-chain messaging
Shared liquidity
Interoperable smart contracts
Instead of isolated ecosystems, blockchain networks can collaborate to build a more connected decentralized internet.
5. Indexing Infrastructure
Raw blockchain data is not optimized for fast searches. Indexers process blockchain data into structured databases, making it easy for applications to retrieve information efficiently.
Indexing infrastructure supports:
Wallet dashboards
Blockchain explorers
Portfolio trackers
Analytics platforms
NFT marketplaces
DeFi interfaces
Without indexers, searching blockchain data would be significantly slower and more resource-intensive.
6. Enterprise Blockchain Infrastructure
Large organizations require blockchain solutions that meet enterprise standards for performance, compliance, and security.
Enterprise blockchain infrastructure typically includes:
Permissioned networks
Identity and access management
Compliance tools
Private data channels
Secure API gateways
Cloud-native deployment
Disaster recovery systems
Monitoring dashboards
Audit logging
Industries such as banking, healthcare, logistics, and government increasingly rely on enterprise blockchain platforms to improve transparency and operational efficiency.
7. Cloud Infrastructure for Blockchain
Running blockchain nodes in the cloud enables organizations to deploy and scale infrastructure efficiently.
Cloud-based blockchain infrastructure offers:
Rapid deployment
High availability
Automatic scaling
Load balancing
Geographic redundancy
Backup and recovery
Monitoring and alerting
Infrastructure automation
Hybrid architectures—combining on-premises systems with cloud services—are also common for enterprises with strict compliance requirements.
8. Monitoring and Observability
A blockchain network must be continuously monitored to ensure health, performance, and security.
Monitoring systems track:
Block production
Validator uptime
CPU usage
Memory consumption
Network latency
Disk performance
Transaction throughput
Peer connectivity
Synchronization status
Security events
Real-time alerts help operators respond quickly to failures and maintain network reliability.
9. Blockchain Security Infrastructure
Security is fundamental to every blockchain network. A comprehensive security architecture protects both the protocol and its supporting infrastructure.
Key security measures include:
Multi-signature wallets
Hardware Security Modules (HSMs)
Private key encryption
Firewall protection
Intrusion detection systems
DDoS mitigation
Regular software updates
Smart contract audits
Penetration testing
Continuous security monitoring
Strong security practices reduce the risk of attacks, data breaches, and financial loss.
10. Building a Complete Blockchain Ecosystem
A mature blockchain ecosystem integrates multiple infrastructure layers into a unified platform.
A complete ecosystem typically includes:
Blockchain Network
Validator Infrastructure
Wallet Applications
Explorer
Smart Contracts
Token Standards
RPC Services
Developer APIs & SDKs
Cross-Chain Bridge
Oracle Network
Layer-2 Scaling
Governance System
Staking Platform
Identity Framework
Analytics Dashboard
Enterprise Integration Tools
When these components work together, they create a secure, scalable, and developer-friendly foundation for decentralized applications and digital economies.

Blockchain is no longer just a technology for cryptocurrencies. Governments, banks, multinational corporations, healthcare providers, logistics companies, and real estate developers are investing in blockchain infrastructure to build secure, transparent, and efficient digital ecosystems.
1. Blockchain Infrastructure in Financial Services
The financial industry is one of the largest adopters of blockchain infrastructure. Traditional financial systems rely on centralized databases, intermediaries, and manual reconciliation, which can increase costs and settlement times.
Blockchain infrastructure enables:
Digital payments
Cross-border settlements
Asset tokenization
Stablecoins
Decentralized Finance (DeFi)
Digital banking
Securities settlement
Trade finance
Automated compliance
Instead of processing transactions over several days, blockchain networks can significantly reduce settlement times while improving transparency and operational efficiency.
2. Real World Asset (RWA) Infrastructure
One of the fastest-growing blockchain sectors is the tokenization of Real World Assets (RWAs).
RWA infrastructure connects physical assets with blockchain technology, allowing ownership rights to be represented digitally.
Assets that can be tokenized include:
Real estate
Commercial buildings
Land
Gold and precious metals
Government bonds
Corporate bonds
Fine art
Luxury watches
Jewelry
Collectibles
Intellectual property
Carbon credits
Benefits include:
Fractional ownership
Increased liquidity
Faster settlements
Transparent ownership records
Global investment access
Reduced administrative costs
RWA infrastructure is expected to play a major role in modernizing capital markets and expanding access to investment opportunities.
3. Government & Public Sector Infrastructure
Governments around the world are exploring blockchain infrastructure to improve transparency, efficiency, and trust in public services.
Potential applications include:
Digital identity systems
Land registries
Public records
Tax administration
Customs processing
Digital voting
Business registration
Public procurement
Welfare distribution
Central Bank Digital Currencies (CBDCs)
By using blockchain infrastructure, governments can reduce fraud, simplify administrative processes, and improve the delivery of public services.
4. Healthcare Infrastructure
Healthcare systems generate vast amounts of sensitive information that require secure storage and controlled access.
Blockchain infrastructure can support:
Electronic medical records
Prescription management
Clinical trial verification
Pharmaceutical supply chains
Medical device tracking
Patient identity management
Insurance claims processing
The objective is not to store every medical file directly on-chain but to create secure, verifiable records that improve trust, integrity, and interoperability across healthcare providers.
5. Supply Chain Infrastructure
Modern supply chains involve manufacturers, logistics providers, distributors, retailers, and consumers across multiple countries.
Blockchain infrastructure improves supply chain management by providing:
Product traceability
Tamper-resistant records
Shipment verification
Anti-counterfeiting measures
Inventory transparency
Automated documentation
Quality assurance tracking
Consumers can verify the authenticity and origin of products, while businesses gain better visibility across their operations.
6. Artificial Intelligence & Blockchain Infrastructure
Artificial Intelligence (AI) and blockchain are complementary technologies.
AI excels at analyzing data and automating decisions, while blockchain provides trusted, transparent, and immutable records.
Together, they can enable:
AI model verification
Secure AI training datasets
Decentralized AI marketplaces
Automated smart contract execution
Intelligent fraud detection
Predictive analytics
Autonomous financial systems
Blockchain infrastructure helps ensure that AI systems operate on trustworthy data and that important decisions can be audited when necessary.
7. Pygital Commerce Infrastructure
The future of commerce is increasingly phygital—integrating physical products with digital experiences.
Blockchain infrastructure can support:
Digital product passports
NFT-backed ownership certificates
Blockchain-verified authenticity
Customer loyalty systems
Luxury product authentication
Connected retail experiences
Digital warranties
Ownership transfer records
These capabilities enhance consumer trust and create new forms of engagement between brands and customers.
8. Enterprise Blockchain Ecosystems
Modern enterprises rarely use blockchain in isolation. Instead, they integrate blockchain with existing business systems.
Enterprise ecosystems may combine blockchain with:
ERP platforms
CRM systems
Cloud services
Identity management
AI platforms
IoT devices
Data analytics
Payment gateways
This integrated approach enables organizations to modernize operations while preserving compatibility with their existing technology stack.
9. Challenges Facing Blockchain Infrastructure
Despite rapid innovation, blockchain infrastructure still faces important challenges.
These include:
Network scalability
Interoperability between blockchains
Regulatory uncertainty
User experience complexity
Energy consumption (for some consensus models)
Privacy considerations
Security risks
High infrastructure costs
Shortage of skilled blockchain professionals
Addressing these challenges will be essential for broader adoption across industries.
10. The Future of Blockchain Infrastructure
Blockchain infrastructure is evolving from isolated cryptocurrency networks into a foundational layer of the global digital economy.
Future trends include:
AI-powered blockchain operations
Highly scalable Layer-2 and Layer-3 networks
Modular blockchain architectures
Cross-chain interoperability
Zero-Knowledge (ZK) technologies
Tokenized Real World Assets (RWAs)
Digital identity ecosystems
Enterprise blockchain adoption
Government digital services
Machine-to-machine (M2M) transactions
Internet of Things (IoT) integration
Decentralized cloud infrastructure
Autonomous financial systems
As these technologies mature, blockchain infrastructure is expected to become as fundamental to digital services as cloud computing and the internet are today.
Key Takeaways
Blockchain infrastructure is much more than the technology behind cryptocurrencies. It is a comprehensive digital foundation that supports secure, decentralized, and transparent systems across finance, government, healthcare, supply chains, artificial intelligence, real estate, and global commerce.
Organizations that invest in robust blockchain infrastructure today are positioning themselves to participate in the next generation of digital transformation.

Frequently Asked Questions (FAQs)
1. What is blockchain infrastructure?
Blockchain infrastructure is the complete technical foundation that allows a blockchain network to operate. It includes nodes, validators, consensus mechanisms, networking, cryptography, APIs, wallets, explorers, RPC servers, smart contract environments, storage systems, and security layers.
2. Why is blockchain infrastructure important?
Without infrastructure, a blockchain cannot function. Infrastructure ensures:
Security
Decentralization
Data integrity
Transaction processing
Smart contract execution
High availability
Scalability
Global accessibility
Think of infrastructure as the internet's cables, routers, servers, and protocols—but designed specifically for decentralized systems.
3. What is the difference between blockchain and blockchain infrastructure?
A blockchain is the distributed ledger that stores transactions.
Blockchain infrastructure is everything required to operate and maintain that ledger.
Example:
Blockchain = The highway.
Infrastructure = Roads, bridges, traffic signals, fuel stations, maintenance crews, and vehicles that make the highway usable.
4. What is a blockchain node?
A node is a computer connected to the blockchain network.
Nodes:
Store blockchain data
Validate transactions
Relay information
Help secure the network
Synchronize with other nodes
Thousands of nodes working together make blockchain decentralized.
5. What are validators?
Validators verify new blocks before they are added to the blockchain.
They:
Check transaction validity
Prevent fraud
Produce new blocks
Maintain network consensus
Validators replace traditional centralized authorities.
6. What is an RPC server?
RPC (Remote Procedure Call) allows applications to communicate with blockchain nodes.
Without RPC:
Wallets cannot connect
DApps cannot work
Exchanges cannot access blockchain data
Users cannot send transactions
RPC servers are the communication bridge between blockchain and applications.
7. What is an indexer?
Indexers organize blockchain data for fast searching.
Instead of reading millions of blocks every time,
Indexers allow:
Wallet history
NFT ownership
Token balances
Portfolio tracking
Analytics dashboards
8. Can blockchain infrastructure be centralized?
Yes.
Many projects start with centralized infrastructure during development.
Eventually they migrate toward decentralization by:
Increasing validator numbers
Distributing nodes globally
Opening governance
Removing single points of failure
9. Which industries use blockchain infrastructure?
Major industries include:
Banking
Finance
Real Estate
Healthcare
Logistics
Insurance
Supply Chain
Government
Digital Identity
Gaming
Education
Luxury Goods
Carbon Credits
Manufacturing
Artificial Intelligence
10. Is blockchain infrastructure expensive?
It depends on the scale.
A small testnet may cost only a few dollars per month.
Large enterprise networks may require:
Multiple global servers
Dedicated validators
Monitoring systems
Security teams
Cloud infrastructure
Backup nodes
Large blockchain infrastructures can cost millions annually.
11. What skills are required to build blockchain infrastructure?
Professionals usually need knowledge of:
Distributed Systems
Networking
Linux
Cloud Computing
Cybersecurity
Cryptography
Smart Contracts
Databases
DevOps
Containerization
Monitoring
API Development
12. What makes blockchain infrastructure secure?
Security comes from multiple layers:
Cryptography
Decentralized validators
Consensus algorithms
Immutable records
Digital signatures
Peer-to-peer networking
Hardware security
Continuous monitoring
Open-source verification
Key Takeaways
Blockchain infrastructure is not just about cryptocurrency.
It is the digital backbone powering the next generation of decentralized finance, digital identity, enterprise software, tokenized assets, AI ecosystems, supply chains, and global digital commerce.
Modern infrastructure combines distributed computing, networking, cryptography, automation, cloud systems, governance, and scalability into one integrated platform capable of supporting millions of users worldwide.
As adoption grows, blockchain infrastructure will increasingly become as fundamental to the digital economy as cloud computing and the internet itself.
Conclusion
Blockchain infrastructure represents one of the most significant technological foundations of the modern digital era. While blockchain networks often receive attention for cryptocurrencies and digital assets, the real strength lies in the sophisticated infrastructure operating behind the scenes.
Every node, validator, API, RPC endpoint, smart contract platform, explorer, storage system, and governance mechanism contributes to creating secure, decentralized, and resilient digital ecosystems.
As governments, enterprises, financial institutions, and technology companies continue embracing decentralized technologies, investment in blockchain infrastructure will become increasingly important. Organizations capable of building scalable, secure, and interoperable infrastructure will play a central role in shaping the future of Web3, decentralized finance, digital identity, real-world asset tokenization, and AI-integrated systems.
Understanding blockchain infrastructure is therefore essential not only for developers and engineers but also for entrepreneurs, investors, policymakers, researchers, and anyone seeking to understand how tomorrow's digital economy will operate.
SEO Meta Title
Blockchain Infrastructure Explained: Nodes, Validators, RPC, APIs & Web3 Architecture (Complete Guide)
SEO Meta Description
Learn how blockchain infrastructure works, including nodes, validators, RPC servers, consensus mechanisms, smart contracts, APIs, security, scalability, and enterprise blockchain architecture in this complete guide.
Focus Keywords
Blockchain Infrastructure
Blockchain Infrastructure Explained
Blockchain Nodes
Validators
RPC Server
Blockchain Architecture
Blockchain Network
Web3 Infrastructure
Enterprise Blockchain
Blockchain Security
Smart Contracts
Blockchain APIs
Distributed Ledger Technology
Decentralized Infrastructure
Blockchain Scalability
Blockchain Components
Consensus Mechanism
Digital Infrastructure
Layer 1 Blockchain
Layer 2 Blockchain
  `,
      },

      "blockchain-types": {
          slug: "blockchain-types",
          title: "Public vs Private vs Consortium Blockchains",
          subtitle: "The Complete Enterprise Guide to Blockchain Architecture (2026)",
          authors: "Faisal Orakzai", year: "2026", category: "BLOCKCHAIN",
          thumbnail: "/mk/thumb-blockchain-types.png", readTime: "28 min read",
          tags: ["Blockchain Types","Public Blockchain","Private Blockchain","Consortium Blockchain","Hybrid Blockchain","Enterprise Blockchain","Permissioned","Permissionless"],
          customBody: BlockchainTypesVisual,
          content: `
    Public vs Private vs Consortium Blockchains: The Complete Enterprise Guide

  As blockchain technology evolves beyond cryptocurrencies, organisations now face a critical architectural decision: which type of blockchain network is right for their use case? Public, Private, Consortium, and Hybrid blockchains each make different tradeoffs across accessibility, governance, transparency, performance, and security. This comprehensive guide explains each model in depth and provides a structured framework for choosing the right blockchain architecture.
  `,
      },

      "blockchain-security": {
        slug: "blockchain-security",
        title: "Blockchain Security & Consensus Mechanisms Explained",
        subtitle: "PoW, PoS, Cryptography, Attacks, Validator Security & Future Security Guide (2026)",
        authors: "Faisal Orakzai", year: "2026", category: "BLOCKCHAIN",
        thumbnail: "/mk/blockchain-security-hero.png", readTime: "35 min read",
        tags: ["Blockchain Security","Consensus Mechanisms","Proof of Work","Proof of Stake","Cryptography","51% Attack","Merkle Tree","Digital Signatures","Validator Security","Zero Knowledge Proof","Post-Quantum Cryptography","Web3 Security"],
        customBody: BlockchainSecurityVisual,
        content: `Blockchain Security & Consensus Mechanisms Explained\n\nBlockchain security depends on cryptography, consensus mechanisms, and network architecture working together.\n\nFrequently Asked Questions (FAQs)\n1. What is blockchain security?\nBlockchain security is a combination of cryptography, consensus mechanisms, and decentralized network architecture that protects the integrity and authenticity of data stored on a blockchain without relying on a central authority.\n2. What is a consensus mechanism?\nA consensus mechanism is the protocol that allows thousands of independent nodes to agree on a single, trusted version of the blockchain ledger without trusting each other or a central organization.\n3. What is Proof of Work?\nProof of Work (PoW) is the original blockchain consensus mechanism where miners compete to solve complex mathematical puzzles. The winner creates the next block and receives block rewards. Used by Bitcoin, it prioritizes security and decentralization.\n4. What is Proof of Stake?\nProof of Stake (PoS) replaces mining with staking. Validators lock cryptocurrency as collateral and are selected to create blocks. Dishonest validators lose their stake (slashing). It is far more energy-efficient than Proof of Work.\n5. What is a 51% attack?\nA 51% attack occurs when one entity controls more than half of a blockchain's consensus power, allowing them to reverse recent transactions, perform double spending, and censor users — though they cannot create coins from nothing or steal from unrelated wallets.\n6. What is cryptographic hashing?\nCryptographic hashing converts any input into a fixed-length fingerprint. The same input always produces the same hash, but changing even one character produces a completely different hash — making unauthorized modifications immediately detectable.\n7. What is a Merkle Tree?\nA Merkle Tree organizes all transactions in a block into a hierarchical hash structure, producing a single Merkle Root stored in the block header. It enables efficient and tamper-proof verification of any transaction without downloading the full blockchain.\n8. What is post-quantum cryptography?\nPost-quantum cryptography develops cryptographic algorithms that remain secure even against powerful quantum computers — including lattice-based cryptography, hash-based signatures, and multivariate cryptography — to protect blockchain networks long-term.\nCommon Blockchain Security Myths\nMyth 1:\nBlockchain is completely unhackable.\nReality: Blockchain is highly secure, but attacks can still target weak consensus networks (51% attacks), smart contract bugs, exchange vulnerabilities, private key theft, or social engineering — not necessarily the blockchain protocol itself.\nMyth 2:\nProof of Work is the most secure consensus mechanism.\nReality: PoW is very secure for large networks like Bitcoin, but smaller PoW networks are vulnerable to 51% attacks. PoS and PBFT can be equally or more secure depending on implementation.\nMyth 3:\nQuantum computing will break blockchain immediately.\nReality: Large-scale quantum computing capable of breaking current cryptography is still years or decades away. The industry is already developing post-quantum cryptographic solutions proactively.\nMyth 4:\nDecentralization alone makes blockchain secure.\nReality: Decentralization is one pillar of security. Cryptography, consensus mechanisms, smart contract quality, validator security, and user practices are equally important components.\nMyth 5:\nOnce on the blockchain, data can never be altered.\nReality: Data on well-secured blockchains is extremely difficult to alter, but governance processes or protocol upgrades may allow limited modifications under predefined rules in certain blockchain systems.\nKey Takeaways\nBlockchain security relies on three interconnected pillars: cryptography, consensus mechanisms, and decentralization — weakness in any one creates attack opportunities.\nCryptographic hash functions (SHA-256, Keccak-256) create tamper-evident records — changing any data completely changes the hash, making manipulation immediately detectable.\nConsensus mechanisms — PoW, PoS, DPoS, PBFT, PoA — each make different trade-offs between security, speed, energy, and decentralization.\nThe Blockchain Trilemma means networks must balance Security, Scalability, and Decentralization — improving one often reduces another.\nMajor attacks (51%, Sybil, Eclipse, double-spending, long-range) exploit economic incentives and network participation rather than breaking cryptography itself.\nFuture blockchain security will combine AI-driven monitoring, Zero Knowledge Proofs, post-quantum cryptography, and decentralized identity to create more resilient systems.`,
      },

      "rwa-tokenization": {
        slug: "rwa-tokenization",
        title: "Tokenization of Real World Assets (RWA)",
        subtitle: "Complete Guide to Blockchain Asset Tokenization — Fractional Ownership, Infrastructure, Compliance & Enterprise Adoption (2026)",
        authors: "Faisal Orakzai", year: "2026", category: "BLOCKCHAIN",
        thumbnail: "/mk/rwa-hero.png", readTime: "32 min read",
        tags: ["RWA","Real World Assets","Asset Tokenization","Blockchain Assets","Fractional Ownership","Tokenized Real Estate","Security Tokens","Digital Assets","Enterprise Blockchain","Digital Finance"],
        customBody: RWATokenizationVisual,
        content: `Tokenization of Real World Assets (RWA)\n\nRWA tokenization bridges traditional finance and DeFi by representing physical and financial assets as secure digital tokens on a blockchain.\n\nFrequently Asked Questions (FAQs)\n1. What is a Real World Asset (RWA)?\nA Real World Asset (RWA) is any physical or legally recognized asset that exists outside the blockchain ecosystem but can be represented digitally on a blockchain through tokenization. Examples include real estate, gold, government bonds, artwork, luxury watches, vehicles, intellectual property, carbon credits, and commodities.\n2. What is RWA Tokenization?\nRWA Tokenization is the process of converting ownership rights of a physical asset into blockchain-based digital tokens. Instead of selling an entire property, artwork, or bond, ownership can be divided into thousands or even millions of blockchain tokens that can be transferred, traded, or managed digitally.\n3. Why is RWA important?\nTraditional assets are often expensive, difficult to trade, limited by geography, slow to settle, and highly dependent on intermediaries. Tokenization solves many of these challenges by enabling fractional ownership, faster settlement, greater transparency, improved liquidity, and global accessibility.\n4. Are RWAs cryptocurrencies?\nNo. Cryptocurrencies such as Bitcoin are native digital assets. RWAs represent ownership or economic rights linked to existing physical or financial assets rather than being digital-native assets.\n5. Can real estate really be tokenized?\nYes. Commercial buildings, residential projects, land, hotels, warehouses, and rental properties can all be tokenized, provided the legal ownership structure complies with local laws and regulations.\n6. Are tokenized assets legally recognized?\nRecognition depends on the jurisdiction. Many countries are actively developing regulations for tokenized securities, digital asset custody, and blockchain-based ownership records. Investors and issuers should always ensure compliance with applicable laws.\n7. Which industries will benefit the most?\nMajor industries include Real Estate, Banking, Investment Management, Insurance, Supply Chain, Healthcare, Energy, Agriculture, Luxury Goods, Government Services, Infrastructure Finance, and Capital Markets.\n8. Is RWA the future of finance?\nMany financial institutions believe tokenization can modernize capital markets by improving efficiency, transparency, and accessibility. While adoption is growing, the pace and scale will depend on technology maturity, regulation, and market acceptance.\nCommon Blockchain Myths\nMyth 1:\nTokenization converts physical objects into digital assets.\nReality: The physical asset remains unchanged. Only the method of recording ownership changes — from paper deeds to blockchain tokens.\nMyth 2:\nRWA tokens are the same as cryptocurrencies.\nReality: RWA tokens represent real-world ownership rights. Cryptocurrencies are native digital assets with no physical backing.\nMyth 3:\nTokenization automatically provides liquidity.\nReality: Liquidity requires active buyers, sellers, licensed exchanges, market makers, and investor confidence — not just token creation.\nMyth 4:\nRWA tokenization eliminates all intermediaries.\nReality: Legal structures, custodians, compliance officers, and regulators remain essential components of compliant RWA platforms.\nMyth 5:\nAny asset can be tokenized immediately.\nReality: Assets need clear legal ownership, regulatory approval, professional valuation, and proper legal structures before tokenization proceeds.\nKey Takeaways\nReal World Assets are physical or legally recognized assets represented digitally on a blockchain.\nTokenization enables fractional ownership and global investment opportunities across previously illiquid asset classes.\nSmart contracts automate ownership transfers, income distribution, compliance enforcement, and governance.\nBlockchain increases transparency, security, and auditability of asset ownership records.\nRegulatory compliance and legal frameworks remain essential for successful implementation.\nRWA tokenization is an evolution of financial infrastructure rather than a replacement for traditional finance.\nFinal Conclusion\nReal World Asset tokenization represents one of the most significant developments in the evolution of blockchain technology. Instead of focusing solely on digital-native assets, tokenization connects blockchain with tangible economic value — real estate, commodities, financial instruments, infrastructure, and other productive assets. Its long-term potential lies in creating more efficient, transparent, and accessible financial systems.`,
      },

      "smart-contracts": {
        slug: "smart-contracts",
        title: "How Smart Contracts Work",
        subtitle: "Complete Beginner to Advanced Guide — Architecture, Lifecycle, Security & Enterprise Use Cases (2026)",
        authors: "Faisal Orakzai", year: "2026", category: "BLOCKCHAIN",
        thumbnail: "/mk/smart-contracts-hero.png", readTime: "30 min read",
        tags: ["Smart Contracts","Blockchain","Ethereum","Solidity","DeFi","Web3","dApps","Blockchain Automation","Smart Contract Security","Enterprise Blockchain"],
        customBody: SmartContractsVisual,
        content: `How Smart Contracts Work\n\nSmart contracts are self-executing programs stored on a blockchain that automatically perform predefined actions when specific conditions are met.\n\nFrequently Asked Questions (FAQs)\n1. What is a smart contract?\nA smart contract is a self-executing computer program stored on a blockchain. It automatically performs predefined actions when specific conditions are met, eliminating the need for intermediaries and reducing the risk of human error.\n2. Are smart contracts legally binding?\nIt depends on the country and legal framework. Many jurisdictions recognize electronic agreements, but legal recognition of blockchain-based smart contracts is still evolving. Businesses should ensure compliance with local regulations when using smart contracts for legally enforceable agreements.\n3. Can smart contracts be changed after deployment?\nMost smart contracts are immutable, meaning they cannot be altered once deployed. However, developers can build upgradeable architectures using proxy contracts or governance mechanisms that allow future improvements while maintaining transparency.\n4. Which programming language is used for smart contracts?\nThe most widely used language is Solidity, primarily for Ethereum and EVM-compatible blockchains. Other languages include Rust, Move, Vyper, Go, and CosmWasm (Rust-based), depending on the blockchain platform.\n5. Can smart contracts access internet data?\nNo. Blockchains cannot directly access external information. Smart contracts rely on trusted oracle networks to securely bring real-world data — such as asset prices, weather information, or sports results — onto the blockchain.\n6. Are smart contracts secure?\nThey can be highly secure if properly designed, audited, and tested. However, poorly written code can contain vulnerabilities that attackers may exploit. Independent security audits, formal verification, and continuous testing are essential for production-grade smart contracts.\n7. Which industries use smart contracts?\nSmart contracts are increasingly adopted across Banking and Finance, Decentralized Finance (DeFi), Real Estate, Supply Chain Management, Healthcare, Insurance, Gaming, Government Services, Digital Identity, Intellectual Property, and Tokenized Real-World Assets (RWA).\n8. Do smart contracts eliminate lawyers?\nNo. Smart contracts automate execution, not legal interpretation. Lawyers are still important for drafting legal frameworks, ensuring regulatory compliance, resolving disputes, and managing complex contractual relationships.\n9. What happens if a smart contract contains a bug?\nA bug may cause incorrect execution, financial loss, or locked funds. Since blockchain transactions are irreversible, smart contract development requires extensive testing, peer review, and independent security audits before deployment.\n10. What is the future of smart contracts?\nThe future includes AI-assisted automation, cross-chain interoperability, privacy-preserving computation, tokenized real-world assets, decentralized identity systems, IoT integration, and enterprise-grade blockchain infrastructure powering global digital economies.\nCommon Blockchain Myths\nMyth 1:\nSmart contracts are legal contracts.\nReality: They are programmable code that can support legal agreements but are not automatically recognized as legal contracts everywhere.\nMyth 2:\nSmart contracts never fail.\nReality: Bugs, flawed logic, or compromised oracles can still create failures.\nMyth 3:\nThey only work with cryptocurrencies.\nReality: They automate many business processes beyond digital currencies.\nMyth 4:\nThey replace every intermediary.\nReality: They reduce unnecessary intermediaries but do not eliminate all regulatory or legal roles.\nMyth 5:\nBlockchain makes contracts completely risk-free.\nReality: Blockchain improves security, but secure development practices remain essential.\nKey Takeaways\nSmart contracts are self-executing programs deployed on blockchain networks.\nThey automate transactions without requiring centralized intermediaries.\nExecution is transparent, deterministic, and tamper-resistant.\nThey power DeFi, NFTs, DAOs, digital identity, tokenized assets, and enterprise automation.\nSecurity, audits, and robust architecture are critical for successful deployment.\nSmart contracts represent one of the foundational technologies of the Web3 ecosystem.\nFinal Conclusion\nSmart contracts are transforming the way digital agreements are created, executed, and enforced. As blockchain infrastructure matures and technologies such as Artificial Intelligence, Zero-Knowledge Proofs, decentralized identity, and cross-chain interoperability continue to evolve, smart contracts will become a fundamental component of the global digital economy.`,
      },
      };

    /* ── TOC Components ─────────────────────────────────────────────────────── */
  function TOCList({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
    return (
      <ol style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"1px" }}>
        {TOC_SECTIONS.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <li key={id}>
              <a href={"#" + id} onClick={onNavigate} style={{
                display:"flex", alignItems:"center", gap:"8px", padding:"7px 10px",
                textDecoration:"none", fontFamily:"monospace", fontSize:"9px",
                letterSpacing:"0.18em", textTransform:"uppercase",
                color: active ? "#F3BA2F" : "rgba(255,255,255,0.3)",
                background: active ? "rgba(243,186,47,0.06)" : "transparent",
                borderLeft: active ? "2px solid #F3BA2F" : "2px solid transparent",
                transition:"all 0.18s ease", lineHeight:1.5,
              }}>{label}</a>
            </li>
          );
        })}
      </ol>
    );
  }

  /** Desktop sticky sidebar — only renders in the flex row */
  function TOCDesktop({ activeId }: { activeId: string }) {
    return (
      <aside style={{ width:"176px", flexShrink:0, display:"none" }} className="toc-desktop-wrap">
        <div style={{ position:"sticky", top:"90px", paddingTop:"2.5rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.45em", color:"rgba(243,186,47,0.45)", textTransform:"uppercase", marginBottom:"10px", paddingLeft:"10px" }}>Contents</div>
          <TOCList activeId={activeId}/>
        </div>
      </aside>
    );
  }

  /** Mobile collapsible — renders inside article column */
  function TOCMobile({ activeId }: { activeId: string }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="toc-mobile-wrap" style={{ marginBottom:"1.75rem", border:"1px solid rgba(243,186,47,0.14)", background:"rgba(0,0,0,0.7)" }}>
        <button onClick={() => setOpen(p => !p)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", background:"none", border:"none", cursor:"pointer", fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.32em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase" }}>
          <span style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="0" y="1" width="12" height="1.5" fill="rgba(243,186,47,0.6)"/><rect x="0" y="5" width="9" height="1.5" fill="rgba(243,186,47,0.4)"/><rect x="0" y="9" width="6" height="1.5" fill="rgba(243,186,47,0.3)"/></svg>
            Table of Contents
          </span>
          <span style={{ color:"#F3BA2F", fontSize:"12px", transform: open ? "rotate(180deg)" : "none", transition:"transform 0.22s", display:"inline-block" }}>▾</span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.22 }} style={{ overflow:"hidden" }}>
              <div style={{ padding:"4px 6px 10px" }}>
                <TOCList activeId={activeId} onNavigate={() => setOpen(false)}/>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* ── FAQ Accordion ──────────────────────────────────────────────────────── */
  interface FAQItem { q: string; a: string[] }
  function FAQAccordion({ items }: { items: FAQItem[] }) {
    const [open, setOpen] = useState<number | null>(null);
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:"2px", margin:"1rem 0 2rem" }}>
        {items.map(({ q, a }, idx) => {
          const isOpen = open === idx;
          return (
            <div key={idx} style={{ border:"1px solid rgba(243,186,47,0.15)", background: isOpen ? "rgba(243,186,47,0.03)" : "transparent", transition:"background 0.18s" }}>
              <button onClick={() => setOpen(isOpen ? null : idx)} style={{ width:"100%", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"12px", padding:"14px 16px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
                <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(0.95rem,2.5vw,1.08rem)", color:"rgba(255,255,255,0.88)", lineHeight:1.45, flex:1 }}>{q}</span>
                <span style={{ color:"#F3BA2F", flexShrink:0, fontSize:"18px", lineHeight:1, transform: isOpen ? "rotate(45deg)" : "none", transition:"transform 0.22s", display:"inline-block", marginTop:"2px" }}>+</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} style={{ overflow:"hidden" }}>
                    <div style={{ padding:"0 16px 16px", borderTop:"1px solid rgba(243,186,47,0.08)" }}>
                      {a.filter(Boolean).map((line, j) => (
                        <p key={j} style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.3vw,1.05rem)", color:"rgba(255,255,255,0.62)", lineHeight:1.85, margin:j===0?"10px 0 0":"4px 0 0", fontWeight:400 }}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Myth/Reality ───────────────────────────────────────────────────────── */
  function MythCard({ myth, reality }: { myth: string; reality: string }) {
    if (!myth || !reality) return null;
    return (
      <div style={{ marginBottom:"10px", overflow:"hidden" }}>
        <div style={{ background:"rgba(243,186,47,0.05)", padding:"10px 14px", borderLeft:"3px solid rgba(243,186,47,0.5)" }}>
          <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.35em", color:"rgba(243,186,47,0.65)", textTransform:"uppercase", display:"block", marginBottom:"4px" }}>MYTH</span>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1rem", color:"rgba(255,255,255,0.75)", margin:0, lineHeight:1.6 }}>{myth}</p>
        </div>
        <div style={{ background:"rgba(74,222,128,0.03)", padding:"10px 14px", borderLeft:"3px solid rgba(74,222,128,0.4)" }}>
          <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.35em", color:"rgba(74,222,128,0.65)", textTransform:"uppercase", display:"block", marginBottom:"4px" }}>REALITY</span>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1rem", color:"rgba(255,255,255,0.6)", margin:0, lineHeight:1.6 }}>{reality}</p>
        </div>
      </div>
    );
  }



  /* ── Blockchain Basic – Full Visual Article v2 ──────────────────────────── */
  function BlockchainBasicVisual() {
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
  function BlockchainInfraVisual() {
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
  function BlockchainTypesVisual() {
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



  /* ── Blockchain Security Visual Article ────────────────────────────────── */
  function BlockchainSecurityVisual() {
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
  function RWATokenizationVisual() {
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
  function SmartContractsVisual() {
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
          "sameAs":["https://orcid.org/0009-0000-0915-7272","https://www.linkedin.com/in/faisalorakzaii","https://github.com/faisalorakzai-lab","https://hackernoon.com/u/faisalorakzai"],
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
  function ArticleBody({ content, articleTitle }: { content: string; articleTitle: string }) {
    // Strip the first line if it matches the title, and any blank lines after it
    const rawLines = content.split("\n");
    let startIdx = 0;
    if (rawLines[0]?.trim() === articleTitle || rawLines[0]?.trim() === "") {
      startIdx = 1;
      while (startIdx < rawLines.length && rawLines[startIdx].trim() === "") startIdx++;
    }
    const lines = rawLines.slice(startIdx);

    // Pre-extract FAQ items and Myth pairs from raw lines
    const faqItems: FAQItem[] = [];
    const myths: { myth: string; reality: string }[] = [];
    let inFAQ = false, inMyths = false;
    let curFAQ: FAQItem | null = null;
    let mythBuf = "";

    for (let fi = 0; fi < lines.length; fi++) {
      const fl = lines[fi].trim();
      if (fl === "Frequently Asked Questions (FAQs)") { inFAQ = true; inMyths = false; continue; }
      if (fl === "Common Blockchain Myths") { inFAQ = false; inMyths = true; if (curFAQ) { faqItems.push(curFAQ); curFAQ = null; } continue; }
      if (fl === "Key Takeaways" || fl === "Final Conclusion") { if (curFAQ) { faqItems.push(curFAQ); curFAQ = null; } inFAQ = false; inMyths = false; continue; }

      if (inFAQ && fl) {
        const qm = fl.match(/^(\d+)\.\s+(.+)/);
        if (qm) { if (curFAQ) faqItems.push(curFAQ); curFAQ = { q: qm[2], a: [] }; }
        else if (curFAQ) curFAQ.a.push(fl);
      }
      if (inMyths && fl) {
        if (/^Myth \d+:/i.test(fl)) { mythBuf = ""; }
        else if (/^Reality:/i.test(fl)) {
          const rv = fl.replace(/^Reality:\s*/i, "").trim() || lines[fi + 1]?.trim() || "";
          myths.push({ myth: mythBuf.trim(), reality: rv }); mythBuf = "";
        } else { mythBuf = (mythBuf ? mythBuf + " " : "") + fl; }
      }
    }
    if (curFAQ) faqItems.push(curFAQ);

    // Render pass
    const nodes: React.ReactNode[] = [];
    let key = 0, i = 0;
    let inFAQBlock = false, inMythsBlock = false;
    let faqDone = false, mythsDone = false;
    let divCount = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      if (!line) { i++; continue; }

      /* ── Special sections ── */
      if (line === "Frequently Asked Questions (FAQs)") {
        inFAQBlock = true; inMythsBlock = false;
        nodes.push(<h2 key={key++} id="faq" data-section="faq" style={h2Style}>Frequently Asked Questions</h2>);
        if (!faqDone) { nodes.push(<FAQAccordion key={key++} items={faqItems}/>); faqDone = true; }
        while (i < lines.length && lines[i].trim() !== "Common Blockchain Myths") i++;
        continue;
      }
      if (line === "Common Blockchain Myths") {
        inFAQBlock = false; inMythsBlock = true;
        nodes.push(
          <div key={key++} id="myths" data-section="myths">
            <h2 style={h2Style}>Common Blockchain Myths</h2>
            {!mythsDone && myths.map((m,mi) => <MythCard key={mi} myth={m.myth} reality={m.reality}/>)}
          </div>
        );
        mythsDone = true;
        while (i < lines.length && lines[i].trim() !== "Key Takeaways" && lines[i].trim() !== "Final Conclusion") i++;
        continue;
      }
      if (line === "Key Takeaways" || line === "Final Conclusion") {
        inFAQBlock = false; inMythsBlock = false;
        const sid = line === "Key Takeaways" ? "takeaways" : "conclusion";
        nodes.push(<h2 key={key++} id={sid} data-section={sid} style={h2Style}>{line}</h2>);
        i++; continue;
      }

      /* ── Dividers ── */
      if (line === "---") {
        divCount++;
        if (divCount % 5 === 0) nodes.push(<BlockchainGraphic key={key++}/>);
        else if (divCount % 9 === 0) nodes.push(<NodeNetworkSVG key={key++}/>);
        else nodes.push(<div key={key++} style={{ margin:"2.25rem 0", borderTop:"1px solid rgba(243,186,47,0.09)" }}/>);
        i++; continue;
      }

      /* ── Bullet lists ── */
      if (line.startsWith("- ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) { items.push(lines[i].trim().slice(2)); i++; }
        nodes.push(
          <ul key={key++} style={{ margin:"0.75rem 0 1.5rem", padding:0, listStyle:"none" }}>
            {items.map((item, j) => (
              <li key={j} style={{ display:"flex", gap:"10px", alignItems:"flex-start", marginBottom:"7px" }}>
                <span style={{ color:"#F3BA2F", flexShrink:0, marginTop:"0.55em", fontSize:"8px" }}>◆</span>
                <span style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.2vw,1.05rem)", lineHeight:1.82, color:"rgba(255,255,255,0.62)" }}>{item}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      const prevEmpty = i === 0 || lines[i - 1].trim() === "";
      const sectionId = HEADING_ID_MAP[line];

      /* ── Major section headings (from map) ── */
      if (sectionId) {
        nodes.push(<h2 key={key++} id={sectionId} data-section={sectionId} style={h2Style}>{line}</h2>);
        i++; continue;
      }

      /* ── Numbered main section "1: …" ── */
      if (prevEmpty && /^\d+:\s/.test(line)) {
        nodes.push(<h2 key={key++} id="intro" data-section="intro" style={h2Style}>{line}</h2>);
        i++; continue;
      }

      /* ── Sub-headings ── */
      if (prevEmpty && line.length < 72) {
        if (/^[1-9]\d?\.\s/.test(line) && line.length < 60) {
          nodes.push(<h3 key={key++} style={h3Style}>{line}</h3>); i++; continue;
        }
        if (/^Step\s+\d+:/i.test(line)) {
          nodes.push(<h4 key={key++} style={{ ...h4Style, color:"#F3BA2F" }}>{line}</h4>); i++; continue;
        }
        if (/^\d{4}s?\s[–—-]/.test(line) || /^\d{4}[–—]/.test(line)) {
          nodes.push(<h4 key={key++} style={{ ...h4Style, color:"rgba(243,186,47,0.8)", borderLeft:"2px solid rgba(243,186,47,0.25)", paddingLeft:"12px" }}>{line}</h4>); i++; continue;
        }
        // Generic short standalone heading — only if not ending in sentence punctuation
        const nextL = lines[i + 1]?.trim() ?? "";
        if (!line.endsWith(".") && !line.endsWith(",") && !line.endsWith(";") && (nextL === "" || nextL === "---" || nextL.startsWith("- "))) {
          nodes.push(<h3 key={key++} style={h3Style}>{line}</h3>); i++; continue;
        }
      }

      /* ── Special formatted lines ── */
      if (line.includes("→") || line.includes("↓") || line.startsWith("«") || line.startsWith("Block #") || line.startsWith("Hash:")) {
        nodes.push(<div key={key++} style={{ fontFamily:"monospace", fontSize:"clamp(0.78rem,2vw,0.9rem)", color:"rgba(243,186,47,0.75)", background:"rgba(243,186,47,0.04)", border:"1px solid rgba(243,186,47,0.14)", padding:"8px 14px", margin:"0.4rem 0", letterSpacing:"0.04em" }}>{line}</div>);
        i++; continue;
      }

      /* ── Default paragraph ── */
      nodes.push(<p key={key++} style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontWeight:400, fontSize:"clamp(1rem,2.4vw,1.13rem)", lineHeight:1.92, color:"rgba(255,255,255,0.62)", marginBottom:"1rem" }}>{line}</p>);
      i++;
    }
    return <>{nodes}</>;
  }

  /* ── Shared heading styles ── */
  const h2Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.45rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem", lineHeight:1.25, letterSpacing:"-0.02em" };
  const h3Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.1rem,3vw,1.45rem)", color:"rgba(255,255,255,0.88)", margin:"2.25rem 0 0.75rem", lineHeight:1.3 };
  const h4Style: React.CSSProperties = { fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1rem,2.5vw,1.2rem)", color:"rgba(255,255,255,0.8)", margin:"1.75rem 0 0.6rem", lineHeight:1.35 };

  /* ── Main Component ──────────────────────────────────────────────────────── */

/* ── Cite This Article Block ──────────────────────────────────────────────── */
  function CiteBlock({ title, year, slug, pdfUrl }: { title: string; year: string; slug: string; pdfUrl?: string }) {
    const [fmt, setFmt] = React.useState<"APA"|"MLA"|"CHICAGO">("APA");
    const [cpd, setCpd] = React.useState(false);

    const citations = {
      APA: `Orakzai, F. (${year}). ${title}. Orakzai Research Lab. https://faisalorakzai.vercel.app/research/${slug}`,
      MLA: `Orakzai, Faisal. "${title}." Orakzai Research Lab, ${year}, faisalorakzai.vercel.app/research/${slug}.`,
      CHICAGO: `Orakzai, Faisal. "${title}." Orakzai Research Lab, ${year}. https://faisalorakzai.vercel.app/research/${slug}.`,
    };

    const copy = () => {
      navigator.clipboard.writeText(citations[fmt]).then(() => { setCpd(true); setTimeout(() => setCpd(false), 2000); });
    };

    const downloadCitationSheet = () => {
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Citation — ${title}</title>
  <style>
    body{font-family:'Georgia',serif;max-width:680px;margin:60px auto;color:#111;line-height:1.7}
    h1{font-size:1.45rem;margin-bottom:0.25rem}
    .subtitle{color:#555;font-style:italic;margin-bottom:1.5rem;font-size:0.95rem}
    .label{font-family:monospace;font-size:0.68rem;letter-spacing:0.18em;text-transform:uppercase;color:#888;margin-top:1.5rem;margin-bottom:0.4rem}
    .cite{background:#f5f5f0;padding:12px 16px;border-left:3px solid #c8900a;font-size:0.88rem;word-break:break-word}
    .meta{font-size:0.8rem;color:#777;margin-top:2rem;border-top:1px solid #ddd;padding-top:1rem}
    @media print{body{margin:40px}}
  </style></head>
  <body>
    <h1>${title}</h1>
    <div class="subtitle">Orakzai Research Lab · ${year}</div>
    <div class="label">APA</div>
    <div class="cite">${citations.APA}</div>
    <div class="label">MLA</div>
    <div class="cite">${citations.MLA}</div>
    <div class="label">Chicago</div>
    <div class="cite">${citations.CHICAGO}</div>
    <div class="meta">
      Author: Faisal Orakzai · ORCID: 0009-0000-0915-7272<br/>
      URL: https://faisalorakzai.vercel.app/research/${slug}<br/>
      Generated: ${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}
    </div>
  </body></html>`;
      const blob = new Blob([html], { type:"text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `citation-${slug}.html`;
      a.click(); URL.revokeObjectURL(url);
    };

    return (
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"1.5rem", marginBottom:"1.5rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
          <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", color:"rgba(243,186,47,0.55)", textTransform:"uppercase" }}>Cite This Article</span>
          <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,0.06)" }} />
        </div>
        {/* Format selector */}
        <div style={{ display:"flex", gap:"4px", marginBottom:"10px" }}>
          {(["APA","MLA","CHICAGO"] as const).map(f => (
            <button key={f} onClick={() => setFmt(f)}
              style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", padding:"4px 12px", border:`1px solid ${fmt===f ? "rgba(243,186,47,0.6)" : "rgba(255,255,255,0.1)"}`, color: fmt===f ? "#F3BA2F" : "rgba(255,255,255,0.3)", background: fmt===f ? "rgba(243,186,47,0.07)" : "none", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>
              {f}
            </button>
          ))}
        </div>
        {/* Citation text */}
        <div style={{ position:"relative" }}>
          <code style={{ display:"block", fontFamily:"monospace", fontSize:"11px", color:"rgba(255,255,255,0.55)", background:"rgba(255,255,255,0.03)", padding:"12px 14px", border:"1px solid rgba(255,255,255,0.07)", lineHeight:1.8, wordBreak:"break-word" as const }}>
            {citations[fmt]}
          </code>
          <button onClick={copy}
            style={{ position:"absolute", top:"8px", right:"8px", fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.25em", border:`1px solid ${cpd ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)"}`, color: cpd ? "#4ade80" : "rgba(255,255,255,0.3)", background:"rgba(0,0,0,0.8)", padding:"4px 10px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s" }}>
            {cpd ? "✓ COPIED" : "COPY"}
          </button>
        </div>
        {/* Download buttons */}
        <div style={{ display:"flex", gap:"8px", marginTop:"10px" }}>
          {pdfUrl ? (
            <a href={pdfUrl} download
              style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.25em", border:"1px solid rgba(243,186,47,0.35)", color:"#F3BA2F", background:"rgba(243,186,47,0.05)", padding:"6px 14px", cursor:"pointer", textTransform:"uppercase", textDecoration:"none", transition:"all 0.18s", display:"inline-flex", alignItems:"center", gap:"5px" }}>
              ↓ DOWNLOAD PDF
            </a>
          ) : (
            <button onClick={downloadCitationSheet}
              style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.25em", border:"1px solid rgba(243,186,47,0.35)", color:"#F3BA2F", background:"rgba(243,186,47,0.05)", padding:"6px 14px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.18s", display:"inline-flex", alignItems:"center", gap:"5px" }}>
              ↓ DOWNLOAD CITATION SHEET
            </button>
          )}
        </div>
      </div>
    );
  }


  export default function ResearchArticle() {
    useFonts();
    const { slug } = useParams<{ slug: string }>();
    const [, setLocation] = useLocation();
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState("intro");
    const [readProgress, setReadProgress] = useState(0);
    const article = ARTICLES[slug ?? ""];
    useArticleSEO(article);

    // Scroll spy
    useEffect(() => {
      const obs = new IntersectionObserver(
        entries => { entries.forEach(e => { if (e.isIntersecting) { const id = (e.target as HTMLElement).dataset.section; if (id) setActiveSection(id); } }); },
        { rootMargin:"-15% 0px -72% 0px", threshold:0 }
      );
      document.querySelectorAll("[data-section]").forEach(h => obs.observe(h));
      return () => obs.disconnect();
    }, [article]);

    // Reading progress
    useEffect(() => {
      const onScroll = () => {
        const el = document.documentElement;
        const scrolled = el.scrollTop;
        const total = el.scrollHeight - el.clientHeight;
        setReadProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!article) return (
      <div style={{ minHeight:"100vh", background:"#000", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
        <p style={{ fontFamily:"monospace", color:"rgba(255,255,255,0.2)", letterSpacing:"0.3em", fontSize:"11px" }}>Article not found</p>
        <button onClick={() => setLocation("/research")} style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.35em", border:"1px solid rgba(243,186,47,0.4)", color:"#F3BA2F", background:"none", padding:"10px 20px", cursor:"pointer", textTransform:"uppercase" }}>← BACK TO RESEARCH</button>
      </div>
    );

    return (
      <div style={{ minHeight:"100vh", background:"#000", color:"#fff", overflowX:"hidden" }}>
        <style>{`
          html { scroll-behavior: smooth; }
          @media(min-width:1100px){.toc-desktop-wrap{display:block!important}.toc-mobile-wrap{display:none!important}}
          @media(max-width:1099px){.toc-desktop-wrap{display:none!important}.toc-mobile-wrap{display:block!important}}
        `}</style>

        {/* Reading progress bar */}
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:9999, height:"3px", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }}>
          <div style={{ height:"100%", width:`${readProgress}%`, background:"linear-gradient(to right,#c8900a,#F3BA2F,#ffe27a)", transition:"width 0.15s linear", boxShadow:"0 0 10px rgba(243,186,47,0.55)" }} />
        </div>

        {/* Hero */}
        <div style={{ position:"relative", width:"100%", maxHeight:"500px", overflow:"hidden" }}>
          {article.thumbnail && (
            <motion.img src={article.thumbnail} alt={article.title} initial={{ scale:1.05, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.9 }}
              style={{ width:"100%", maxHeight:"500px", objectFit:"cover", objectPosition:"center top", display:"block" }}/>
          )}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.55) 65%,rgba(0,0,0,1) 100%)" }}/>
          <motion.button initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }} onClick={() => setLocation("/research")}
            style={{ position:"absolute", top:"24px", left:"24px", fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.32em", border:"1px solid rgba(255,255,255,0.18)", color:"rgba(255,255,255,0.65)", background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)", padding:"8px 14px", cursor:"pointer", textTransform:"uppercase", display:"flex", alignItems:"center", gap:"6px", zIndex:10 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 5H2M4 2.5L1.5 5 4 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            RESEARCH
          </motion.button>
        </div>

        {/* Page Layout */}
        <div style={{ maxWidth:"1180px", margin:"0 auto", padding:"0 clamp(1.25rem,4vw,2rem)", display:"flex", gap:"2.5rem", alignItems:"flex-start" }}>

          {/* Article Column */}
          <div style={{ flex:1, minWidth:0 }}>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65 }} style={{ paddingTop:"2.25rem" }}>

              {/* Category chips */}
              <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", marginBottom:"1.1rem" }}>
                <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.38em", color:"#F3BA2F", textTransform:"uppercase", border:"1px solid rgba(243,186,47,0.3)", padding:"4px 10px", background:"rgba(243,186,47,0.05)" }}>{article.category}</span>
                <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.18em", color:"rgba(255,255,255,0.24)" }}>{article.readTime}</span>
                <span style={{ fontFamily:"monospace", fontSize:"9px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.12em" }}>{article.year}</span>
              </div>

              {/* Title */}
              <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,5.5vw,3rem)", lineHeight:1.2, color:"rgba(255,255,255,0.97)", letterSpacing:"-0.022em", margin:"0 0 0.9rem" }}>{article.title}</h1>
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic", fontWeight:300, fontSize:"clamp(1.05rem,2.8vw,1.35rem)", color:"rgba(255,255,255,0.4)", lineHeight:1.65, margin:"0 0 1.6rem" }}>{article.subtitle}</p>

              {/* Author row */}
              <div style={{ padding:"1.5rem 0", borderTop:"1px solid rgba(255,255,255,0.07)", borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:"1.25rem" }}>
                {/* Lead Author */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px", marginBottom:"1.25rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
                    <img src="/faisal-avatar.png" alt="Faisal Orakzai"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; const fb = e.currentTarget.parentElement?.querySelector(".avatar-fb") as HTMLElement; if(fb) fb.style.display="flex"; }}
                      style={{ width:"64px", height:"64px", borderRadius:"50%", objectFit:"cover", objectPosition:"center 15%", border:"2px solid rgba(243,186,47,0.55)", flexShrink:0 }}/>
                    <div className="avatar-fb" style={{ display:"none", width:"64px", height:"64px", borderRadius:"50%", background:"linear-gradient(135deg,#F3BA2F,#c8900a)", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"22px", color:"#000", flexShrink:0 }}>F</div>
                    <div>
                      <div style={{ fontSize:"17px", fontWeight:700, color:"#fff", letterSpacing:"0.01em", marginBottom:"4px", fontFamily:"'Playfair Display', Georgia, serif" }}>Faisal Orakzai</div>
                      <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.42)", letterSpacing:"0.05em", marginBottom:"5px", fontFamily:"system-ui, sans-serif" }}>Orakzai Research Lab</div>
                      <a href="https://orcid.org/0009-0000-0915-7272" target="_blank" rel="noopener noreferrer" style={{ fontSize:"11px", color:"rgba(166,206,57,0.72)", textDecoration:"none", letterSpacing:"0.03em", fontFamily:"monospace" }}>ORCID 0009-0000-0915-7272 ↗</a>
                    </div>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
                    style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.28em", border:"1px solid rgba(255,255,255,0.1)", color: copied ? "#4ade80" : "rgba(255,255,255,0.35)", background:"none", padding:"7px 14px", cursor:"pointer", textTransform:"uppercase", transition:"color 0.18s" }}>
                    {copied ? "✓ COPIED" : "SHARE ↗"}
                  </button>
                </div>
                {/* Co-Authors */}
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                  <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.25em", color:"rgba(255,255,255,0.22)", textTransform:"uppercase", whiteSpace:"nowrap" }}>Co-Authors</span>
                  <div style={{ flex:1, height:"1px", background:"rgba(255,255,255,0.06)" }} />
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"20px" }}>
                  {([
                    { img:"/coauthor-parkes.jpg", name:"Dr. David Parkes",       role:"Harvard — CS & Economics" },
                    { img:"/coauthor-saif.jpg",   name:"Dr. Saif Ullah Rehman",  role:"Blockchain Research" },
                    { img:"/coauthor-shoab.jpg",  name:"Dr. Shoab A. Khan",      role:"NUST — Digital Systems" },
                  ] as { img: string; name: string; role: string }[]).map(co => (
                    <div key={co.name} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <img src={co.img} alt={co.name} style={{ width:"40px", height:"40px", borderRadius:"50%", objectFit:"cover", objectPosition:"center top", border:"1.5px solid rgba(243,186,47,0.28)", flexShrink:0, background:"#111" }} />
                      <div>
                        <div style={{ fontSize:"13px", fontWeight:600, color:"rgba(255,255,255,0.88)", letterSpacing:"0.01em", fontFamily:"system-ui,sans-serif" }}>{co.name}</div>
                        <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.35)", letterSpacing:"0.03em", fontFamily:"system-ui,sans-serif", marginTop:"2px" }}>{co.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile TOC — only here, inside article column */}
              <TOCMobile activeId={activeSection}/>
            </motion.div>

            {/* Body */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2, duration:0.6 }} style={{ paddingBottom:"5rem" }}>
              {article.customBody ? React.createElement(article.customBody) : <ArticleBody content={article.content} articleTitle={article.title}/>}
            </motion.div>

            {/* Footer */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"2rem", paddingBottom:"4.5rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              {/* Cite This Article */}
              <CiteBlock title={article.title} year={article.year} slug={article.slug} pdfUrl={article.pdfUrl} />
              <button onClick={() => setLocation("/research")} style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", border:"1px solid rgba(243,186,47,0.3)", color:"#F3BA2F", background:"none", padding:"8px 16px", cursor:"pointer", textTransform:"uppercase", alignSelf:"flex-start" }}>← ALL ARTICLES</button>
            </div>
          </div>

          {/* Desktop TOC — only in flex row, never duplicated */}
          <TOCDesktop activeId={activeSection}/>
        </div>
      </div>
    );
  }
  