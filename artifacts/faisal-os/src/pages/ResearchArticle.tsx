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
  