/**
   * RESEARCH ARTICLE — /research/:slug
   * Features: TOC sidebar, profile photo, FAQ accordion, blockchain SVG graphics, SEO
   */
  import React, { useEffect, useRef, useState, useCallback } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useParams, useLocation } from "wouter";

  /* ── Fonts ─────────────────────────────────────────────────────────────────── */
  function useFonts() {
    useEffect(() => {
      if (document.getElementById("art-fonts")) return;
      const l = document.createElement("link");
      l.id = "art-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";
      document.head.appendChild(l);
    }, []);
  }

  /* ── SEO ────────────────────────────────────────────────────────────────────── */
  function useArticleSEO(article: typeof ARTICLES[string] | undefined) {
    useEffect(() => {
      if (!article) return;
      const prev = document.title;
      document.title = article.title + " | Faisal Orakzai Research Lab";

      const setMeta = (name: string, val: string, prop = false) => {
        const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
        let el = document.querySelector(sel) as HTMLMetaElement;
        if (!el) { el = document.createElement("meta"); el.setAttribute(prop ? "property" : "name", name); document.head.appendChild(el); }
        el.content = val;
      };
      setMeta("description", article.subtitle);
      setMeta("keywords", article.tags.join(", ") + ", Faisal Orakzai, blockchain Pakistan");
      setMeta("author", article.authors);
      setMeta("og:title", article.title, true);
      setMeta("og:description", article.subtitle, true);
      setMeta("og:type", "article", true);
      setMeta("og:url", "https://faisalorakzai.com/research/" + article.slug, true);
      if (article.thumbnail) setMeta("og:image", "https://faisalorakzai.com" + article.thumbnail, true);
      setMeta("twitter:card", "summary_large_image");
      setMeta("twitter:title", article.title);
      setMeta("twitter:description", article.subtitle);
      setMeta("citation_title", article.title);
      setMeta("citation_author", "Orakzai, Muhammad Faisal");
      setMeta("citation_publication_date", article.year + "/01/01");
      setMeta("citation_online_date", article.year + "/06/01");
      setMeta("citation_abstract_html_url", "https://faisalorakzai.com/research/" + article.slug);

      // JSON-LD schema
      const ld = document.createElement("script");
      ld.id = "article-ld"; ld.type = "application/ld+json";
      ld.text = JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        "headline": article.title, "description": article.subtitle,
        "author": { "@type": "Person", "name": article.authors, "url": "https://faisalorakzai.com/founder", "sameAs": ["https://orcid.org/0009-0000-0915-7272", "https://www.linkedin.com/in/faisalorakzaii"] },
        "publisher": { "@type": "Organization", "name": "Orakzai Research Lab", "url": "https://faisalorakzai.com" },
        "datePublished": article.year + "-06-01", "dateModified": "2026-06-28",
        "url": "https://faisalorakzai.com/research/" + article.slug,
        "image": article.thumbnail ? "https://faisalorakzai.com" + article.thumbnail : undefined,
        "keywords": article.tags.join(", "),
        "inLanguage": "en-US", "isAccessibleForFree": true,
      });
      document.getElementById("article-ld")?.remove();
      document.head.appendChild(ld);

      return () => {
        document.title = prev;
        document.getElementById("article-ld")?.remove();
      };
    }, [article]);
  }

  /* ── Blockchain SVG Decorators ──────────────────────────────────────────────── */
  function BlockchainDivider() {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0", margin:"2.5rem 0", opacity:0.22 }}>
        <div style={{ flex:1, height:"1px", background:"rgba(243,186,47,0.3)" }} />
        <svg width="220" height="44" viewBox="0 0 220 44" fill="none" style={{ flexShrink:0 }}>
          {[0,72,144].map((x,i) => (
            <g key={i}>
              <rect x={x} y="9" width="44" height="26" rx="3" stroke="#F3BA2F" strokeWidth="1"/>
              <line x1={x+6} y1="17" x2={x+38} y2="17" stroke="#F3BA2F" strokeWidth="0.6" opacity="0.6"/>
              <line x1={x+6} y1="22" x2={x+38} y2="22" stroke="#F3BA2F" strokeWidth="0.6" opacity="0.6"/>
              <line x1={x+6} y1="27" x2={x+30} y2="27" stroke="#F3BA2F" strokeWidth="0.6" opacity="0.4"/>
              {i < 2 && <><line x1={x+44} y1="22" x2={x+72} y2="22" stroke="#F3BA2F" strokeWidth="1" strokeDasharray="3 2"/><circle cx={x+58} cy="22" r="2.5" fill="#F3BA2F"/></>}
            </g>
          ))}
          <rect x="188" y="9" width="32" height="26" rx="3" stroke="#F3BA2F" strokeWidth="0.7" strokeDasharray="4 2" opacity="0.5"/>
          <text x="197" y="26" fontSize="11" fill="#F3BA2F" opacity="0.5" fontFamily="monospace">···</text>
        </svg>
        <div style={{ flex:1, height:"1px", background:"rgba(243,186,47,0.3)" }} />
      </div>
    );
  }

  function NodeGraphic() {
    return (
      <div style={{ display:"flex", justifyContent:"center", margin:"1.5rem 0", opacity:0.18 }}>
        <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
          <circle cx="80" cy="40" r="10" stroke="#F3BA2F" strokeWidth="1"/>
          {[[35,18],[125,18],[35,62],[125,62],[10,40],[150,40]].map(([cx,cy],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" stroke="#F3BA2F" strokeWidth="0.8" opacity="0.7"/>
              <line x1={cx > 80 ? cx-6 : cx+6} y1={cy} x2={cy < 40 ? (cx > 80 ? 86 : 74) : (cy > 40 ? (cx > 80 ? 86 : 74) : (cx > 80 ? 86 : 74))} y2={cy < 40 ? 32 : cy > 40 ? 48 : 40} stroke="#F3BA2F" strokeWidth="0.6" opacity="0.4" strokeDasharray="3 2"/>
            </g>
          ))}
          <text x="74" y="44" fontSize="8" fill="#F3BA2F" opacity="0.8" fontFamily="monospace">NODE</text>
        </svg>
      </div>
    );
  }

  /* ── Article Database ─────────────────────────────────────────────────────────── */
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
    slug: string; title: string; subtitle: string;
    authors: string; year: string; category: string;
    thumbnail?: string; tags: string[]; readTime: string; content: string;
  }> = {
    "blockchain-basic": {
      slug: "blockchain-basic",
      title: "What is Blockchain? A Complete Beginner's Guide",
      subtitle: "From distributed ledgers to smart contracts — the definitive primer on blockchain technology",
      authors: "Muhammad Faisal Orakzai",
      year: "2026", category: "BLOCKCHAIN",
      thumbnail: "/mk/blockchain-guide.png",
      readTime: "25 min read",
      tags: ["Blockchain","DLT","Web3","DeFi","Cryptography","RWA","Tokenization","Smart Contracts"],
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
  };

  /* ── TOC Sidebar ─────────────────────────────────────────────────────────────── */
  function TOCSidebar({ activeId }: { activeId: string }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const tocList = (
      <ol style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:"2px" }}>
        {TOC_SECTIONS.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a href={"#" + id} onClick={() => setMobileOpen(false)}
                style={{ display:"flex", alignItems:"center", gap:"8px", padding:"6px 8px", textDecoration:"none",
                  fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.18em", textTransform:"uppercase",
                  color: isActive ? "#F3BA2F" : "rgba(255,255,255,0.3)",
                  background: isActive ? "rgba(243,186,47,0.07)" : "transparent",
                  borderLeft: isActive ? "2px solid #F3BA2F" : "2px solid transparent",
                  transition:"all 0.2s ease", lineHeight:1.4 }}>
                {label}
              </a>
            </li>
          );
        })}
      </ol>
    );

    return (
      <>
        {/* Desktop sticky sidebar */}
        <aside style={{ display:"none" }} className="toc-desktop">
          <div style={{ position:"sticky", top:"100px", width:"180px", padding:"16px 0" }}>
            <div style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.45em", color:"rgba(243,186,47,0.5)", textTransform:"uppercase", marginBottom:"12px", paddingLeft:"8px" }}>Contents</div>
            {tocList}
          </div>
        </aside>

        {/* Mobile collapsible TOC */}
        <div className="toc-mobile" style={{ marginBottom:"1.5rem", border:"1px solid rgba(243,186,47,0.15)", background:"rgba(0,0,0,0.6)" }}>
          <button onClick={() => setMobileOpen(p => !p)}
            style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", background:"none", border:"none", cursor:"pointer", fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.35em", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>
            <span>Table of Contents</span>
            <span style={{ transform: mobileOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s", color:"#F3BA2F", fontSize:"11px" }}>▾</span>
          </button>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} style={{ overflow:"hidden" }}>
                <div style={{ padding:"4px 8px 12px" }}>{tocList}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  }

  /* ── FAQ Accordion ─────────────────────────────────────────────────────────── */
  interface FAQItem { q: string; a: string[] }

  function FAQAccordion({ items }: { items: FAQItem[] }) {
    const [open, setOpen] = useState<number | null>(null);
    return (
      <div style={{ display:"flex", flexDirection:"column", gap:"2px", margin:"1rem 0 2rem 0" }}>
        {items.map(({ q, a }, idx) => {
          const isOpen = open === idx;
          return (
            <div key={idx} style={{ border:"1px solid rgba(243,186,47,0.15)", background: isOpen ? "rgba(243,186,47,0.04)" : "transparent", transition:"background 0.2s" }}>
              <button onClick={() => setOpen(isOpen ? null : idx)}
                style={{ width:"100%", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"12px", padding:"14px 16px", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
                <span style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(0.95rem,2.5vw,1.1rem)", color:"rgba(255,255,255,0.88)", lineHeight:1.4, flex:1 }}>{q}</span>
                <span style={{ color:"#F3BA2F", flexShrink:0, fontSize:"14px", marginTop:"2px", transform: isOpen ? "rotate(45deg)" : "none", transition:"transform 0.25s", display:"inline-block" }}>+</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.28 }} style={{ overflow:"hidden" }}>
                    <div style={{ padding:"0 16px 16px 16px", borderTop:"1px solid rgba(243,186,47,0.08)" }}>
                      {a.map((line, j) => (
                        <p key={j} style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(0.95rem,2.3vw,1.05rem)", color:"rgba(255,255,255,0.6)", lineHeight:1.85, margin:"8px 0 0 0", fontWeight:400 }}>{line}</p>
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

  /* ── Myth/Reality Cards ──────────────────────────────────────────────────────── */
  function MythCard({ myth, reality }: { myth: string; reality: string }) {
    return (
      <div style={{ border:"1px solid rgba(255,255,255,0.06)", marginBottom:"12px", overflow:"hidden" }}>
        <div style={{ background:"rgba(243,186,47,0.06)", padding:"10px 14px", borderLeft:"3px solid rgba(243,186,47,0.5)" }}>
          <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.32em", color:"rgba(243,186,47,0.7)", textTransform:"uppercase", display:"block", marginBottom:"4px" }}>MYTH</span>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1rem", color:"rgba(255,255,255,0.75)", margin:0, lineHeight:1.6 }}>{myth}</p>
        </div>
        <div style={{ background:"rgba(74,222,128,0.03)", padding:"10px 14px", borderLeft:"3px solid rgba(74,222,128,0.4)" }}>
          <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.32em", color:"rgba(74,222,128,0.7)", textTransform:"uppercase", display:"block", marginBottom:"4px" }}>REALITY</span>
          <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"1rem", color:"rgba(255,255,255,0.6)", margin:0, lineHeight:1.6 }}>{reality}</p>
        </div>
      </div>
    );
  }

  /* ── Article Content Renderer ───────────────────────────────────────────────── */
  function ArticleBody({ content, onSection }: { content: string; onSection: (id: string) => void }) {
    const lines = content.split("\n");
    const nodes: React.ReactNode[] = [];
    let key = 0;
    let i = 0;
    let inFAQ = false;
    let inMyths = false;
    const faqItems: FAQItem[] = [];
    let currentFAQ: FAQItem | null = null;
    const myths: { myth: string; reality: string }[] = [];
    let currentMyth = "";

    // First pass: extract FAQ items and Myths
    for (let fi = 0; fi < lines.length; fi++) {
      const fl = lines[fi].trim();
      if (fl === "Frequently Asked Questions (FAQs)") { inFAQ = true; inMyths = false; continue; }
      if (fl === "Common Blockchain Myths") { inFAQ = false; inMyths = true; if (currentFAQ) { faqItems.push(currentFAQ); currentFAQ = null; } continue; }
      if (fl === "Key Takeaways") { inMyths = false; continue; }

      if (inFAQ && fl) {
        const qMatch = fl.match(/^(\d+)\.\s+(.+)/);
        if (qMatch) {
          if (currentFAQ) faqItems.push(currentFAQ);
          currentFAQ = { q: qMatch[2], a: [] };
        } else if (currentFAQ && !fl.startsWith("Blockchain is") && fl !== "No." || currentFAQ) {
          if (currentFAQ) currentFAQ.a.push(fl);
        }
      }
      if (inMyths) {
        if (fl.startsWith("Myth ")) { currentMyth = ""; }
        else if (fl.startsWith("Reality:")) {
          const r = fl.replace("Reality:", "").trim() || lines[fi+1]?.trim() || "";
          myths.push({ myth: currentMyth, reality: r });
          currentMyth = "";
        } else if (fl && !fl.startsWith("Reality:")) {
          currentMyth = currentMyth ? currentMyth + " " + fl : fl;
        }
      }
    }
    if (currentFAQ) faqItems.push(currentFAQ);

    // Second pass: render content
    inFAQ = false; inMyths = false;
    let faqRendered = false;
    let mythsRendered = false;
    let dividerCount = 0;

    while (i < lines.length) {
      const raw = lines[i]; const line = raw.trim();
      if (!line) { i++; continue; }

      // Section markers
      if (line === "Frequently Asked Questions (FAQs)") {
        inFAQ = true; inMyths = false;
        nodes.push(<h2 key={key++} id="faq" data-section="faq" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.5rem,4vw,2.1rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem 0", lineHeight:1.25, letterSpacing:"-0.02em" }}>Frequently Asked Questions</h2>);
        i++;
        if (!faqRendered) {
          nodes.push(<FAQAccordion key={key++} items={faqItems} />);
          faqRendered = true;
        }
        // Skip to end of FAQ section
        while (i < lines.length && lines[i].trim() !== "Common Blockchain Myths") i++;
        continue;
      }

      if (line === "Common Blockchain Myths") {
        inFAQ = false; inMyths = true;
        nodes.push(
          <div key={key++}>
            <h2 id="myths" data-section="myths" style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.5rem,4vw,2.1rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1.25rem 0", lineHeight:1.25 }}>Common Blockchain Myths</h2>
            {myths.map((m, mi) => <MythCard key={mi} myth={m.myth} reality={m.reality} />)}
          </div>
        );
        mythsRendered = true;
        // Skip to Key Takeaways
        while (i < lines.length && lines[i].trim() !== "Key Takeaways") i++;
        continue;
      }

      if (line === "Key Takeaways" || line === "Final Conclusion") {
        inMyths = false; inFAQ = false;
        const sectionId = line === "Key Takeaways" ? "takeaways" : "conclusion";
        nodes.push(<h2 key={key++} id={sectionId} data-section={sectionId} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.5rem,4vw,2.1rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem 0", lineHeight:1.25 }}>{line}</h2>);
        i++; continue;
      }

      // Dividers — alternate between chain graphic and simple line
      if (line === "---") {
        dividerCount++;
        if (dividerCount % 6 === 0) nodes.push(<BlockchainDivider key={key++} />);
        else if (dividerCount % 10 === 0) nodes.push(<NodeGraphic key={key++} />);
        else nodes.push(<div key={key++} style={{ margin:"2.5rem 0", borderTop:"1px solid rgba(243,186,47,0.1)" }} />);
        i++; continue;
      }

      // Bullet list
      if (line.startsWith("- ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) { items.push(lines[i].trim().slice(2)); i++; }
        nodes.push(
          <ul key={key++} style={{ margin:"1rem 0 1.5rem 0", padding:0, listStyle:"none" }}>
            {items.map((item, j) => (
              <li key={j} style={{ display:"flex", gap:"10px", alignItems:"flex-start", marginBottom:"7px", color:"rgba(255,255,255,0.62)", fontSize:"clamp(0.9rem,2vw,1rem)", lineHeight:1.8, fontFamily:"'Cormorant Garamond',Georgia,serif" }}>
                <span style={{ color:"#F3BA2F", flexShrink:0, marginTop:"0.5em", fontSize:"9px" }}>◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      const prevEmpty = i === 0 || lines[i - 1].trim() === "";

      // Headings
      if (prevEmpty && line.length < 80 && !line.startsWith("«") && !line.includes("→") && !line.startsWith("↓")) {
        const sectionId = HEADING_ID_MAP[line];

        if (/^\d+:\s/.test(line)) {
          nodes.push(<h2 key={key++} id={sectionId || undefined} data-section={sectionId} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.4rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem 0", lineHeight:1.25, letterSpacing:"-0.02em" }}>{line}</h2>);
          i++; continue;
        }

        const isMajorHeading = !!sectionId;
        if (isMajorHeading) {
          nodes.push(<h2 key={key++} id={sectionId} data-section={sectionId} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.4rem,4vw,2rem)", color:"rgba(255,255,255,0.95)", margin:"3.5rem 0 1rem 0", lineHeight:1.25 }}>{line}</h2>);
          i++; continue;
        }

        if (/^[1-9]\d?\.\s/.test(line) && line.length < 60) {
          nodes.push(<h3 key={key++} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.15rem,3vw,1.5rem)", color:"rgba(255,255,255,0.9)", margin:"2.5rem 0 0.75rem 0", lineHeight:1.3 }}>{line}</h3>);
          i++; continue;
        }
        if (/^Step\s+\d+:/i.test(line)) {
          nodes.push(<h4 key={key++} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1rem,2.5vw,1.25rem)", color:"#F3BA2F", margin:"2rem 0 0.6rem 0", lineHeight:1.35 }}>{line}</h4>);
          i++; continue;
        }
        if (/^\d{4}s?\s[–—]/.test(line) || /^\d{4}[–—]/.test(line)) {
          nodes.push(<h4 key={key++} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1rem,2.4vw,1.2rem)", color:"rgba(243,186,47,0.85)", margin:"2rem 0 0.6rem 0", lineHeight:1.35, borderLeft:"2px solid rgba(243,186,47,0.3)", paddingLeft:"12px" }}>{line}</h4>);
          i++; continue;
        }
        if (line.length < 70 && !line.endsWith(".") && !line.endsWith(",")) {
          nodes.push(<h3 key={key++} style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:600, fontSize:"clamp(1.05rem,2.6vw,1.35rem)", color:"rgba(255,255,255,0.85)", margin:"2rem 0 0.6rem 0", lineHeight:1.35 }}>{line}</h3>);
          i++; continue;
        }
      }

      // Code/special lines
      if (line.includes("→") || line.includes("↓") || line.startsWith("«") || line.startsWith("Block #")) {
        nodes.push(<div key={key++} style={{ fontFamily:"monospace", fontSize:"clamp(0.8rem,2vw,0.9rem)", color:"rgba(243,186,47,0.75)", background:"rgba(243,186,47,0.05)", border:"1px solid rgba(243,186,47,0.15)", padding:"8px 14px", margin:"0.4rem 0", letterSpacing:"0.04em" }}>{line}</div>);
        i++; continue;
      }

      // Default paragraph
      nodes.push(<p key={key++} style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontWeight:400, fontSize:"clamp(1rem,2.4vw,1.12rem)", lineHeight:1.92, color:"rgba(255,255,255,0.62)", marginBottom:"1.1rem" }}>{line}</p>);
      i++;
    }

    return <>{nodes}</>;
  }

  /* ── Main ─────────────────────────────────────────────────────────────────────── */
  export default function ResearchArticle() {
    useFonts();
    const { slug } = useParams<{ slug: string }>();
    const [, setLocation] = useLocation();
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState("intro");
    const article = ARTICLES[slug ?? ""];
    useArticleSEO(article);

    // Scroll spy using IntersectionObserver
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const id = (entry.target as HTMLElement).dataset.section;
              if (id) setActiveSection(id);
            }
          });
        },
        { rootMargin:"-20% 0px -70% 0px", threshold:0 }
      );
      const headings = document.querySelectorAll("[data-section]");
      headings.forEach(h => observer.observe(h));
      return () => observer.disconnect();
    }, [article]);

    if (!article) return (
      <div style={{ minHeight:"100vh", background:"#000", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
        <p style={{ fontFamily:"monospace", color:"rgba(255,255,255,0.2)", letterSpacing:"0.3em", fontSize:"11px", textTransform:"uppercase" }}>Article not found</p>
        <button onClick={() => setLocation("/research")} style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.35em", border:"1px solid rgba(243,186,47,0.4)", color:"#F3BA2F", background:"none", padding:"10px 20px", cursor:"pointer", textTransform:"uppercase" }}>← BACK TO RESEARCH</button>
      </div>
    );

    const handleCopy = () => {
      navigator.clipboard.writeText(window.location.href).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    };

    return (
      <div style={{ minHeight:"100vh", background:"#000", color:"#fff", overflowX:"hidden" }}>
        <style>{`
          @media (min-width:1100px){.toc-desktop{display:block!important}.toc-mobile{display:none!important}}
          @media (max-width:1099px){.toc-desktop{display:none!important}.toc-mobile{display:block!important}}
          a[href^="#"]{scroll-behavior:smooth}
        `}</style>

        {/* Hero */}
        <div style={{ position:"relative", width:"100%", maxHeight:"520px", overflow:"hidden", background:"#060606" }}>
          {article.thumbnail && (
            <motion.img src={article.thumbnail} alt={article.title} initial={{ scale:1.05, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
              style={{ width:"100%", maxHeight:"520px", objectFit:"cover", objectPosition:"center top", display:"block" }} />
          )}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.6) 70%,rgba(0,0,0,1) 100%)" }} />
          <motion.button initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }}
            onClick={() => setLocation("/research")}
            style={{ position:"absolute", top:"24px", left:"24px", fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.35em", border:"1px solid rgba(255,255,255,0.18)", color:"rgba(255,255,255,0.65)", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)", padding:"8px 14px", cursor:"pointer", textTransform:"uppercase", display:"flex", alignItems:"center", gap:"6px", zIndex:10 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 5H2M4 2.5L1.5 5 4 7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
            RESEARCH
          </motion.button>
        </div>

        {/* Layout: main content + TOC sidebar */}
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 clamp(1.25rem,4vw,2rem)", display:"flex", gap:"3rem", alignItems:"flex-start" }}>

          {/* Article column */}
          <div style={{ flex:1, minWidth:0 }}>
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }} style={{ paddingTop:"2.5rem" }}>

              {/* Category + meta badges */}
              <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", marginBottom:"1.1rem" }}>
                <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.38em", color:"#F3BA2F", textTransform:"uppercase", border:"1px solid rgba(243,186,47,0.3)", padding:"4px 10px", background:"rgba(243,186,47,0.05)" }}>{article.category}</span>
                <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.25)" }}>{article.readTime}</span>
                <span style={{ fontFamily:"monospace", fontSize:"9px", color:"rgba(255,255,255,0.18)", letterSpacing:"0.12em" }}>{article.year}</span>
              </div>

              {/* Title */}
              <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontWeight:700, fontSize:"clamp(1.9rem,6vw,3.2rem)", lineHeight:1.18, color:"rgba(255,255,255,0.97)", letterSpacing:"-0.025em", margin:"0 0 1rem 0" }}>{article.title}</h1>
              <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontStyle:"italic", fontWeight:300, fontSize:"clamp(1.05rem,2.8vw,1.35rem)", color:"rgba(255,255,255,0.42)", lineHeight:1.65, margin:"0 0 1.75rem 0" }}>{article.subtitle}</p>

              {/* Author row */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px", padding:"1rem 0", borderTop:"1px solid rgba(255,255,255,0.07)", borderBottom:"1px solid rgba(255,255,255,0.07)", marginBottom:"1.25rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                  <img src="/faisal-avatar.png" alt="Muhammad Faisal Orakzai"
                    style={{ width:"42px", height:"42px", borderRadius:"50%", objectFit:"cover", objectPosition:"center top", border:"2px solid rgba(243,186,47,0.5)", flexShrink:0 }} />
                  <div>
                    <div style={{ fontFamily:"monospace", fontSize:"10px", color:"rgba(255,255,255,0.7)", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:500 }}>Muhammad Faisal Orakzai</div>
                    <div style={{ fontFamily:"monospace", fontSize:"8px", color:"rgba(255,255,255,0.22)", letterSpacing:"0.1em", marginTop:"3px" }}>
                      Orakzai Research Lab · <a href="https://orcid.org/0009-0000-0915-7272" target="_blank" rel="noopener noreferrer" style={{ color:"rgba(166,206,57,0.6)", textDecoration:"none" }}>ORCID ↗</a>
                    </div>
                  </div>
                </div>
                <button onClick={handleCopy} style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.28em", border:"1px solid rgba(255,255,255,0.1)", color: copied ? "#4ade80" : "rgba(255,255,255,0.35)", background:"none", padding:"7px 14px", cursor:"pointer", textTransform:"uppercase", transition:"all 0.2s" }}>
                  {copied ? "✓ COPIED" : "SHARE ↗"}
                </button>
              </div>

              {/* Tags */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"2rem" }}>
                {article.tags.map(t => (<span key={t} style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.22em", padding:"3px 9px", border:"1px solid rgba(243,186,47,0.18)", color:"rgba(243,186,47,0.5)", textTransform:"uppercase" }}>#{t}</span>))}
              </div>

              {/* Mobile TOC */}
              <TOCSidebar activeId={activeSection} />
            </motion.div>

            {/* Article body */}
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25, duration:0.7 }} style={{ paddingBottom:"5rem" }}>
              <ArticleBody content={article.content} onSection={setActiveSection} />
            </motion.div>

            {/* Footer */}
            <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"2rem", paddingBottom:"4rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", alignItems:"center" }}>
                <span style={{ fontFamily:"monospace", fontSize:"8px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.25em" }}>CITE AS:</span>
                <code style={{ fontFamily:"monospace", fontSize:"10px", color:"rgba(255,255,255,0.38)", background:"rgba(255,255,255,0.04)", padding:"6px 12px", border:"1px solid rgba(255,255,255,0.07)", flex:1, minWidth:"200px", lineHeight:1.6 }}>
                  Orakzai, M. F. ({article.year}). {article.title}. Orakzai Research Lab. faisalorakzai.com/research/{article.slug}
                </code>
              </div>
              <div style={{ display:"flex", gap:"12px", alignItems:"center", flexWrap:"wrap" }}>
                <a href="https://orcid.org/0009-0000-0915-7272" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"monospace", fontSize:"8px", color:"rgba(166,206,57,0.65)", letterSpacing:"0.2em", textDecoration:"none" }}>ORCID 0009-0000-0915-7272 ↗</a>
                <span style={{ color:"rgba(255,255,255,0.1)" }}>·</span>
                <button onClick={() => setLocation("/research")} style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", border:"1px solid rgba(243,186,47,0.3)", color:"#F3BA2F", background:"none", padding:"8px 16px", cursor:"pointer", textTransform:"uppercase" }}>← ALL ARTICLES</button>
              </div>
            </div>
          </div>

          {/* Desktop TOC sidebar */}
          <TOCSidebar activeId={activeSection} />
        </div>
      </div>
    );
  }
  