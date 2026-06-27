/**
   * CENTRAL KNOWLEDGE REPOSITORY
   * Full semantic HTML5 + Dublin Core + Citation meta + JSON-LD per entry
   * Mobile-first responsive with hardware-accelerated transitions
   */

  import React from "react";
  import { motion, useInView } from "framer-motion";
  import { useEffect, useRef, useState } from "react";

  // âââ Types ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  type Category =
    | "MARKET KNOWLEDGE"
    | "ARTIFACTS & BLUEPRINTS"
    | "CRYPTOGRAPHIC WHITE PAPERS"
    | "PRODUCTION CODE";

  interface Entry {
    id: string;
    category: Category;
    year: string;
    title: string;
    subtitle: string;
    abstract: string;
    equations?: string[];
    tags: string[];
    status: string;
    repo?: string;
    repoUrl?: string;
    stack?: string[];
    commits?: string;
    stars?: string;
    branch?: string;
    deploy?: string;
    db?: string;
    authors: string;
    keywords: string;
    pdfUrl?: string;
    fullContent?: string;
    orcid?: string;
    googleScholar?: string;
    linkedin?: string;
    hackernoon?: string;
  }

  // Author profile links (global â same person all papers)
  const AUTHOR_LINKS = {
    orcid:         "https://orcid.org/0009-0000-0915-7272",
    googleScholar: "https://scholar.google.com/citations?user=faisalorakzai",
    linkedin:      "https://www.linkedin.com/in/faisalorakzaii",
    hackernoon:    "https://hackernoon.com/u/faisalorakzai",
    github:        "https://github.com/faisalorakzai-lab",
  };

  // CV download
  const CV_URL = "https://drive.google.com/uc?export=download&id=1X1NT-UZzeyqacmjJo2HoAkYE9mUxad-x";
  const CV_VIEW_URL = "https://drive.google.com/file/d/1X1NT-UZzeyqacmjJo2HoAkYE9mUxad-x/view";

  // âââ Dataset ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  const ENTRIES: Entry[] = [
    // ââ MARKET KNOWLEDGE ââââââââââââââââââââââââââââââââââââââââââââââââââââââ
    {
      id: "mk-01",
      category: "MARKET KNOWLEDGE",
      year: "2024",
      title: "Macro-Liquidity Networks & Cross-Border Fintech Dynamics",
      subtitle: "Structural Analysis of Tokenized Asset Corridors",
      abstract:
        "Deep-dive examination of macro-liquidity network architecture across cross-border fintech corridors. Explores how sovereign tokenized asset pools create structural arbitrage dynamics in G20-adjacent emerging markets, with emphasis on protocol-layer liquidity provisioning and settlement velocity at institutional scale.",
      tags: ["Macro-Liquidity", "Cross-Border", "Fintech", "RWA", "Settlement"],
      status: "PUBLISHED",
      authors: "Muhammad Faisal Orakzai",
      keywords: "macro-liquidity, cross-border fintech, tokenized assets, DeFi, settlement velocity",
    },
    {
      id: "mk-02",
      category: "MARKET KNOWLEDGE",
      year: "2024",
      title: "Real-World Asset Tokenization: Protocol Mechanics & Market Depth",
      subtitle: "On-chain RWA Infrastructure for Institutional Capital Corridors",
      abstract:
        "Investigates structural mechanics of on-chain real-world asset tokenization across illiquid capital markets. Analyzes protocol-layer custody models, oracle dependency chains, and secondary market depth constraints in RWA-backed DeFi infrastructure serving institutional corridors with high-net-worth capital flows.",
      tags: ["RWA", "Tokenization", "DeFi", "Institutional", "Oracle Design"],
      status: "PUBLISHED",
      authors: "Muhammad Faisal Orakzai",
      keywords: "real-world asset tokenization, RWA, DeFi, institutional finance, oracle systems",
    },

    // ── MARKET KNOWLEDGE: Blockchain Article ─────────────────────────────
    {
      id: "mk-03",
      category: "MARKET KNOWLEDGE",
      year: "2026",
      title: "What is Blockchain? A Complete Beginner's Guide (2026)",
      subtitle: "How Blockchain Works | History, Components, Applications & Future",
      abstract:
        "Blockchain is one of the most revolutionary technologies of the 21st century. Often associated with cryptocurrencies like Bitcoin, blockchain is far more than just digital money. It is a secure, transparent, decentralized, and tamper-resistant system for storing, managing, and verifying data without relying on a central authority. Today, blockchain is transforming industries including finance, healthcare, supply chain, government, real estate, digital identity, gaming, and luxury commerce — becoming the foundation of Web3, tokenized assets (RWA), decentralized finance (DeFi), and next-generation digital infrastructure. Just as the internet transformed how people share information, blockchain is transforming how people exchange value, establish trust, and own digital assets.",
      tags: ["Blockchain", "Web3", "DeFi", "Smart Contracts", "Bitcoin", "Ethereum", "RWA", "Distributed Ledger", "Decentralization", "Blockchain Security"],
      status: "PUBLISHED",
      authors: "Muhammad Faisal Orakzai",
      keywords: "what is blockchain, blockchain guide 2026, blockchain technology explained, how blockchain works, beginner blockchain tutorial, distributed ledger technology, smart contracts, Web3, decentralized technology, blockchain applications, future of blockchain",
      fullContent: `What is Blockchain? A Complete Beginner's Guide

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
As the digital economy evolves, blockchain is expected to become a foundational layer supporting Web3, tokenized assets, decentralized finance, trusted AI systems, and next-generation enterprise infrastructure. Understanding blockchain today is not only valuable for developers and businesses—it is increasingly important for anyone seeking to understand the future of technology.`,
    },

    // ââ ARTIFACTS & BLUEPRINTS âââââââââââââââââââââââââââââââââââââââââââââââââ
    {
      id: "ab-01",
      category: "ARTIFACTS & BLUEPRINTS",
      year: "2024",
      title: "OrakzaiX Production Database Schema v2.0",
      subtitle: "Multi-Entity PostgreSQL Architecture for Sovereign Venture Tracking",
      abstract:
        "Complete production-grade PostgreSQL schema for OrakzaiX venture infrastructure. Covers multi-entity relational models for orakzai_ventures, orakzai_positions, compliance_ledger, and capital_allocation tables. Includes index strategies, JSONB field patterns, row-level security policies, and audit trail configurations.",
      tags: ["PostgreSQL", "SQL Architecture", "JSONB", "RLS", "Schema Design"],
      status: "PRODUCTION",
      authors: "Muhammad Faisal Orakzai",
      keywords: "PostgreSQL schema, database architecture, venture tracking, RLS, OrakzaiX",
    },
    {
      id: "ab-02",
      category: "ARTIFACTS & BLUEPRINTS",
      year: "2024",
      title: "Orakzai Bond (OKBOND) Sovereign Protocol Blueprint",
      subtitle: "Tokenized Debt Architecture on EVM-Compatible Infrastructure",
      abstract:
        "Full architectural specification for the OKBOND sovereign debt protocol. Defines issuance mechanics, coupon distribution logic, redemption pathways, and on-chain governance voting modules. Includes smart contract interaction diagrams, escrow models, and regulatory compliance boundary mapping for Pakistan-adjacent capital markets.",
      tags: ["OKBOND", "Tokenized Debt", "EVM", "Smart Contracts", "Protocol Design"],
      status: "BLUEPRINT",
      authors: "Muhammad Faisal Orakzai",
      keywords: "OKBOND, tokenized debt, EVM, sovereign bond, blockchain protocol, DeFi",
    },

    // ââ CRYPTOGRAPHIC WHITE PAPERS âââââââââââââââââââââââââââââââââââââââââââââ
    {
      id: "wp-01",
      category: "CRYPTOGRAPHIC WHITE PAPERS",
      year: "2024",
      title: "Orakzai Bond â Sovereign Tokenized Debt Instrument White Paper",
      subtitle: "OKBOND Protocol: Full Issuance, Governance & Redemption Framework",
      abstract:
        "Comprehensive white paper for the Orakzai Bond (OKBOND) sovereign tokenized debt instrument. Covers on-chain issuance mechanics, coupon distribution, redemption pathways, governance voting modules, and regulatory compliance mapping for emerging-market capital corridors. Designed for institutional-grade deployment on EVM-compatible infrastructure with full legal boundary documentation.",
      equations: [
        "Coupon yield: $Y_c = \frac{C}{P_0} \times 100\%$",
        "Token supply: $S_t = \sum_{i=1}^{n} I_i - R_i \mid R_i \leq I_i$",
      ],
      tags: ["OKBOND", "Sovereign Debt", "Tokenized Bond", "EVM", "DeFi", "Orakzai"],
      status: "PUBLISHED",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Orakzai Bond, OKBOND, sovereign tokenized debt, blockchain bond, DeFi Pakistan, EVM bond",
      pdfUrl: "https://drive.google.com/uc?export=download&id=1Q6bClDOeBCBxBZfKdD9SnqSpNFrG-u7A",
    },
    {
      id: "wp-02",
      category: "CRYPTOGRAPHIC WHITE PAPERS",
      year: "2024",
      title: "Orakzai Bond Technical Architecture â Protocol Layer Specification",
      subtitle: "Smart Contract Architecture, Escrow Models & Oracle Integration",
      abstract:
        "Technical specification document for the Orakzai Bond protocol layer. Details Solidity smart contract architecture, multi-sig escrow models, oracle price-feed integration, and settlement finality guarantees. Covers security audit checkpoints, formal verification methodology, and deployment pipeline for EVM-compatible chains including Ethereum and Polygon.",
      equations: [
        "Settlement finality: $F(t) = \prod_{i=1}^{k} V_i \geq \theta_{min}$",
        "Oracle integrity: $O_{valid} = H(price_t \| timestamp_t \| sig_i) \mod p$",
      ],
      tags: ["Smart Contracts", "Escrow", "Oracle", "Solidity", "Formal Verification"],
      status: "PUBLISHED",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Orakzai Bond technical spec, Solidity smart contract, oracle integration, EVM escrow, bond settlement",
      pdfUrl: "https://drive.google.com/uc?export=download&id=1T_isI9xvQQr_Mbkt1YyBvNF4kLUOcVgj",
    },
    {
      id: "wp-03",
      category: "CRYPTOGRAPHIC WHITE PAPERS",
      year: "2024",
      title: "Orakzai Bond Regulatory Compliance & Cross-Border Framework",
      subtitle: "Legal Boundary Mapping for G20-Adjacent Emerging Market Deployment",
      abstract:
        "Regulatory compliance white paper for the OKBOND sovereign debt instrument. Maps jurisdiction-specific legal requirements across G20-adjacent emerging markets including Pakistan, UAE, and Southeast Asia. Covers AML/KYC protocol integration, securities law compliance boundaries, and investor accreditation pathways for tokenized sovereign debt instruments.",
      tags: ["Regulatory", "Compliance", "AML", "KYC", "Securities Law", "Pakistan"],
      status: "PUBLISHED",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Orakzai Bond compliance, OKBOND regulatory, AML KYC blockchain, Pakistan securities law, sovereign debt compliance",
      pdfUrl: "https://drive.google.com/uc?export=download&id=1Psz7Iy5aREH_ltKPGLglTwR2ln1VTHWS",
    },
    {
      id: "wp-04",
      category: "CRYPTOGRAPHIC WHITE PAPERS",
      year: "2024",
      title: "Orakzai Properties â Real Estate Tokenization White Paper",
      subtitle: "Fractional RWA Protocol for Physical Property On-Chain Settlement",
      abstract:
        "White paper presenting the Orakzai Properties tokenization framework for fractional real estate ownership on blockchain infrastructure. Covers property title digitization, fractional token issuance mechanics, on-chain rental yield distribution, secondary market liquidity provisioning, and regulatory compliance mapping for Pakistani and cross-border real estate markets.",
      equations: [
        "Fractional yield: $Y_f = \frac{R_{annual}}{N_{tokens}} \times (1 - \tau)$",
        "Liquidity ratio: $L_r = \frac{V_{traded}}{V_{total}} \times 100\%$",
      ],
      tags: ["Real Estate", "RWA", "Tokenization", "Fractional Ownership", "Property", "Orakzai"],
      status: "PUBLISHED",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Orakzai Properties, real estate tokenization, fractional property, RWA blockchain, Pakistan real estate, property token",
      pdfUrl: "https://drive.google.com/uc?export=download&id=1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3",
    },
    {
      id: "wp-05",
      category: "CRYPTOGRAPHIC WHITE PAPERS",
      year: "2024",
      title: "OkzByte Provenance Framework: Zero-Knowledge Validation",
      subtitle: "Formal Cryptographic Architecture for Supply-Chain Integrity",
      abstract:
        "Presents a rigorous zero-knowledge proof architecture for sovereign supply-chain provenance validation. The OkzByte framework eliminates trusted third-party dependency through on-chain zkSNARK attestation cycles, ensuring tamper-proof lineage tracing without exposing commercially sensitive routing metadata.",
      equations: [
        "Proof validity: $\\pi = SNARK_{prove}(x, w) \\rightarrow \\{0,1\\}$",
        "Hash commitment: $C(m) = SHA_{256}(m \\oplus k) \\mod p$",
        "Lineage root: $R_n = H(H(L_0) \\oplus H(L_1) \\oplus \\cdots \\oplus H(L_n))$",
      ],
      tags: ["ZK-Proofs", "zkSNARK", "Supply Chain", "Provenance", "Cryptography"],
      status: "FORMAL DRAFT",
      authors: "Muhammad Faisal Orakzai",
      keywords: "zero-knowledge proofs, zkSNARK, supply chain provenance, OkzByte, cryptographic validation",
    },
    {
      id: "wp-06",
      category: "CRYPTOGRAPHIC WHITE PAPERS",
      year: "2024",
      title: "QORIX AI Trust Protocol: Formal Verification Model",
      subtitle: "Autonomous Inference with Cryptographic Accountability",
      abstract:
        "Defines a formal verification model for AI inference accountability in high-throughput autonomous systems. Introduces a cryptographic audit trail architecture where every inference decision is hash-linked to its input state, enabling post-hoc verification without compromising sub-100ms inference latency targets.",
      equations: [
        "Inference chain: $I_t = f_\\theta(x_t) \\mid H(I_t) = SHA_{256}(x_t \\| \\theta_t)$",
        "Accountability score: $A(\\sigma) = \\sum_{i=1}^{n} w_i \\cdot V(I_i, H_i)$",
        "Latency bound: $\\lambda \\leq \\delta_{max} \\rightarrow \\forall t \\in T: t_i - t_{i-1} < \\delta$",
      ],
      tags: ["AI Trust", "Formal Verification", "Inference Audit", "QORIX", "ZK"],
      status: "FORMAL DRAFT",
      authors: "Muhammad Faisal Orakzai",
      keywords: "AI trust, formal verification, inference accountability, QORIX, cryptographic audit",
    },

    // ââ PRODUCTION CODE ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
    {
      id: "pc-01",
      category: "PRODUCTION CODE",
      year: "2024",
      title: "RealFaisalOrakzai â Sovereign Portfolio OS",
      subtitle: "Personal Founder OS: Full-Stack React + Express + PostgreSQL",
      abstract:
        "The primary sovereign portfolio operating system for Muhammad Faisal Orakzai. Full-stack React + Vite frontend with Express 5 API backend, Drizzle ORM, PostgreSQL, and Vercel deployment. Integrates research repository, venture tracking, press archive, timeline, and global search across all Orakzai ecosystem data.",
      tags: [],
      repo: "faisalorakzai-lab/RealFaisalOrakzai",
      repoUrl: "https://github.com/faisalorakzai-lab/RealFaisalOrakzai",
      stack: ["React", "TypeScript", "Express 5", "PostgreSQL", "Drizzle ORM", "Vercel"],
      commits: "Active",
      stars: "Public",
      branch: "main",
      deploy: "VERCEL Â· LIVE",
      db: "POSTGRES Â· ACTIVE",
      status: "ACTIVE",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Faisal Orakzai portfolio, founder OS, React, Express, PostgreSQL, Vercel",
    },
    {
      id: "pc-02",
      category: "PRODUCTION CODE",
      year: "2024",
      title: "Orakzai Bond Website",
      subtitle: "Sovereign Bond Protocol â Public Landing & Investor Interface",
      abstract:
        "Official web presence for the Orakzai Bond (OKBOND) sovereign tokenized debt protocol. Features investor-facing documentation portal, bond issuance timeline, tokenomics dashboard, and regulatory compliance documentation. Built for institutional-grade trust with full SEO and schema markup for global financial indexing.",
      tags: [],
      repo: "faisalorakzai-lab/orakzaibondwebsiten",
      repoUrl: "https://github.com/faisalorakzai-lab/orakzaibondwebsiten",
      stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Vercel"],
      commits: "Active",
      stars: "Public",
      branch: "main",
      deploy: "VERCEL Â· LIVE",
      db: "STATIC Â· CDN",
      status: "ACTIVE",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Orakzai Bond website, OKBOND, tokenized debt portal, blockchain bond Pakistan",
    },
    {
      id: "pc-03",
      category: "PRODUCTION CODE",
      year: "2024",
      title: "AdamOrakzaiX â Sovereign DeFi Execution Engine",
      subtitle: "Cross-Chain Liquidity Protocol & Autonomous Execution Layer",
      abstract:
        "Core execution engine for the AdamX sovereign DeFi protocol. Manages on-chain state transitions, liquidity routing, and cross-chain message passing with embedded compliance rule validation and real-time settlement confirmation. Targets sub-second finality across EVM-compatible chains.",
      tags: [],
      repo: "faisalorakzai-lab/Adamorakzaix",
      repoUrl: "https://github.com/faisalorakzai-lab/Adamorakzaix",
      stack: ["Solidity", "TypeScript", "Hardhat", "The Graph", "Ethers.js"],
      commits: "Active",
      stars: "Public",
      branch: "main",
      deploy: "VERCEL Â· LIVE",
      db: "ON-CHAIN Â· ACTIVE",
      status: "BUILDING",
      authors: "Muhammad Faisal Orakzai",
      keywords: "AdamX DeFi, cross-chain liquidity, Solidity protocol, sovereign DeFi, Orakzai",
    },
    {
      id: "pc-04",
      category: "PRODUCTION CODE",
      year: "2024",
      title: "Orakzai Properties Platform",
      subtitle: "Fractional Real Estate Tokenization Infrastructure",
      abstract:
        "Full-stack platform for the Orakzai Properties fractional real estate tokenization protocol. Handles property listing management, token issuance workflows, investor onboarding, rental yield distribution automation, and secondary market interface. Integrates with on-chain settlement layer for real-time position tracking.",
      tags: [],
      repo: "faisalorakzai-lab/Orakzai-Properties",
      repoUrl: "https://github.com/faisalorakzai-lab/Orakzai-Properties",
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Web3.js"],
      commits: "Active",
      stars: "Public",
      branch: "main",
      deploy: "VERCEL Â· LIVE",
      db: "POSTGRES Â· ACTIVE",
      status: "ACTIVE",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Orakzai Properties, real estate tokenization platform, fractional property, RWA Pakistan",
    },
    {
      id: "pc-05",
      category: "PRODUCTION CODE",
      year: "2024",
      title: "Orakzai DeFi Exchange â Decentralized Trading Protocol",
      subtitle: "Sovereign AMM & Cross-Border Settlement Engine",
      abstract:
        "Decentralized exchange protocol for the Orakzai ecosystem. Implements automated market-making (AMM), cross-border asset settlement, and sovereign liquidity pool management. Features embedded compliance hooks for jurisdiction-specific trade restrictions and real-time oracle price feeds for RWA-backed trading pairs.",
      tags: [],
      repo: "faisalorakzai-lab/Orakzai-defi-exchange-platform-decentralized-629",
      repoUrl: "https://github.com/faisalorakzai-lab/Orakzai-defi-exchange-platform-decentralized-629",
      stack: ["Solidity", "React", "TypeScript", "Uniswap V3 SDK", "Chainlink"],
      commits: "Active",
      stars: "Public",
      branch: "main",
      deploy: "VERCEL Â· LIVE",
      db: "ON-CHAIN Â· ACTIVE",
      status: "BUILDING",
      authors: "Muhammad Faisal Orakzai",
      keywords: "Orakzai DeFi exchange, decentralized trading, AMM protocol, sovereign liquidity, blockchain Pakistan",
    },
    {
      id: "pc-06",
      category: "PRODUCTION CODE",
      year: "2024",
      title: "PSC StockChain â Tokenized Securities Protocol",
      subtitle: "Pakistan Stock Exchange On-Chain Settlement Infrastructure",
      abstract:
        "Blockchain settlement infrastructure for Pakistan Securities Commission (PSC) compatible tokenized equity. Maps traditional equity instruments to on-chain representations with full audit trail, regulatory reporting automation, and real-time settlement finality. Designed for institutional-grade compliance with PSX trading protocols.",
      tags: [],
      repo: "faisalorakzai-lab/PSC-StockChain",
      repoUrl: "https://github.com/faisalorakzai-lab/PSC-StockChain",
      stack: ["Solidity", "TypeScript", "Node.js", "PostgreSQL", "Chainlink"],
      commits: "Active",
      stars: "Public",
      branch: "main",
      deploy: "VERCEL Â· LIVE",
      db: "POSTGRES Â· ACTIVE",
      status: "BUILDING",
      authors: "Muhammad Faisal Orakzai",
      keywords: "PSC StockChain, Pakistan Stock Exchange, tokenized securities, blockchain equity, PSX settlement",
    },
    {
      id: "pc-07",
      category: "PRODUCTION CODE",
      year: "2024",
      title: "faisalorakzai-lab â GitHub Organization Hub",
      subtitle: "Sovereign Open-Source Organization: All Public Repositories",
      abstract:
        "GitHub organization hub for the Orakzai lab ecosystem. Contains all open-source repositories across DeFi protocols, real estate tokenization, AI systems, blockchain infrastructure, and venture platform code. Public entry point for developers, researchers, and institutional partners to access Orakzai ecosystem codebases.",
      tags: [],
      repo: "faisalorakzai-lab/faisalorakzai-lab",
      repoUrl: "https://github.com/faisalorakzai-lab/faisalorakzai-lab",
      stack: ["TypeScript", "Solidity", "React", "Python", "Node.js"],
      commits: "Active",
      stars: "Public",
      branch: "main",
      deploy: "GITHUB Â· PUBLIC",
      db: "MULTI-REPO",
      status: "ACTIVE",
      authors: "Muhammad Faisal Orakzai",
      keywords: "faisalorakzai lab GitHub, Orakzai open source, blockchain repositories, DeFi GitHub Pakistan",
    },
  ];

  const FILTERS = [
    "ALL INTEL",
    "MARKET KNOWLEDGE",
    "ARTIFACTS & BLUEPRINTS",
    "CRYPTOGRAPHIC WHITE PAPERS",
    "PRODUCTION CODE",
  ] as const;
  type Filter = typeof FILTERS[number];

  // âââ SEO: Dublin Core + Citation per-paper + JSON-LD ââââââââââââââââââââââââââ
  function useSEO(active: Filter) {
    useEffect(() => {
      const prevTitle = document.title;
      document.title = "Central Knowledge Repository â Muhammad Faisal Orakzai";

      // Dublin Core link (schema declaration)
      let dcLink = document.querySelector<HTMLLinkElement>("link[rel='schema.DC']");
      if (!dcLink) {
        dcLink = document.createElement("link");
        dcLink.rel = "schema.DC";
        dcLink.href = "http://purl.org/dc/elements/1.1/";
        document.head.appendChild(dcLink);
      }

      const metaMap: Array<{ name?: string; property?: string; content: string }> = [
        { name: "description",            content: "Central Knowledge Repository of Muhammad Faisal Orakzai â blockchain engineering, AI systems, cryptographic white papers, RWA tokenization, real estate tokenization, and sovereign protocol architecture. Published works indexed on Google Scholar, ORCID, and global academic repositories." },
        { name: "keywords",               content: "Faisal Orakzai, blockchain research, RWA tokenization, cryptographic protocols, QORIX AI, OkzByte, AdamX, OrakzaiX, DeFi, zero-knowledge proofs, fintech Pakistan, Orakzai Bond, Orakzai Properties, real estate tokenization, PSC StockChain" },
        { name: "robots",                 content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
        { name: "author",                 content: "Muhammad Faisal Orakzai" },
        { name: "DC.title",               content: "Central Knowledge Repository â Faisal Orakzai" },
        { name: "DC.creator",             content: "Orakzai, Muhammad Faisal" },
        { name: "DC.subject",             content: "Blockchain Engineering; Cryptographic Protocols; AI Systems; RWA Tokenization; DeFi Architecture; Real Estate Tokenization; Sovereign Debt Instruments" },
        { name: "DC.description",         content: "Sovereign research hub: cryptographic white papers, RWA blueprints, AI systems, and live production repositories by Muhammad Faisal Orakzai." },
        { name: "DC.publisher",           content: "Orakzai Research Lab" },
        { name: "DC.date",                content: "2024" },
        { name: "DC.type",                content: "Collection" },
        { name: "DC.format",              content: "text/html" },
        { name: "DC.identifier",          content: "https://faisalorakzai.com/research" },
        { name: "DC.language",            content: "en" },
        { name: "DC.coverage",            content: "Global" },
        { name: "DC.rights",              content: "All rights reserved. Muhammad Faisal Orakzai, Orakzai Research Lab." },
        { property: "og:title",           content: "Central Knowledge Repository â Faisal Orakzai" },
        { property: "og:description",     content: "Sovereign research hub: cryptographic white papers, real estate tokenization, Orakzai Bond protocol, AI systems, and live production repositories." },
        { property: "og:type",            content: "website" },
        { property: "og:url",             content: "https://faisalorakzai.com/research" },
        { name: "twitter:card",           content: "summary_large_image" },
        { name: "twitter:title",          content: "Central Knowledge Repository â Faisal Orakzai" },
      ];

      // Per-paper Google Scholar citation tags
      const scholarly = ENTRIES.filter(e =>
        e.category === "CRYPTOGRAPHIC WHITE PAPERS" || e.category === "MARKET KNOWLEDGE"
      );
      scholarly.forEach(e => {
        metaMap.push(
          { name: "citation_title",            content: e.title },
          { name: "citation_author",           content: "Orakzai, Muhammad Faisal" },
          { name: "citation_publication_date", content: e.year },
          { name: "citation_abstract_html_url",content: `https://faisalorakzai.com/research#${e.id}` },
          { name: "citation_keywords",         content: e.keywords },
          { name: "citation_language",         content: "en" },
          { name: "citation_publisher",        content: "Orakzai Research Lab" },
          ...(e.pdfUrl ? [{ name: "citation_pdf_url", content: e.pdfUrl }] : []),
          { name: "DC.title",                  content: e.title },
          { name: "DC.creator",               content: "Orakzai, Muhammad Faisal" },
          { name: "DC.date",                  content: e.year + "/01" },
          { name: "DC.type",                  content: e.category === "CRYPTOGRAPHIC WHITE PAPERS" ? "Text" : "Dataset" },
        );
      });

      const injected: Element[] = [dcLink!];
      metaMap.forEach(({ name, property, content }) => {
        const attr   = property ? "property" : "name";
        const val    = (property ?? name)!;
        const selector = `meta[${attr}="${val}"]`;
        if (val.startsWith("citation_") || (val === "DC.title" || val === "DC.creator" || val === "DC.date" || val === "DC.type")) {
          const el = document.createElement("meta");
          el.setAttribute(attr, val);
          el.setAttribute("content", content);
          document.head.appendChild(el);
          injected.push(el);
        } else {
          let el = document.querySelector<HTMLMetaElement>(selector);
          if (!el) {
            el = document.createElement("meta");
            el.setAttribute(attr, val);
            document.head.appendChild(el);
            injected.push(el);
          }
          el.setAttribute("content", content);
        }
      });

      // JSON-LD schemas
      const schemas = [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Muhammad Faisal Orakzai",
          url: "https://faisalorakzai.com",
          jobTitle: "Founder & Chairman",
          affiliation: { "@type": "Organization", name: "Orakzai Research Lab" },
          sameAs: [
            "https://www.linkedin.com/in/faisalorakzaii",
            "https://github.com/faisalorakzai-lab",
            "https://orcid.org/0009-0000-0915-7272",
            "https://hackernoon.com/u/faisalorakzai",
          ],
          knowsAbout: ["Blockchain Engineering", "AI Systems", "Cryptographic Protocols", "RWA Tokenization", "DeFi", "Real Estate Tokenization", "Sovereign Debt Instruments"],
        },
        // Scholarly articles + white papers
        ...ENTRIES.filter(e => e.category === "CRYPTOGRAPHIC WHITE PAPERS" || e.category === "MARKET KNOWLEDGE").map(e => ({
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          "@id": `https://faisalorakzai.com/research#${e.id}`,
          headline: e.title,
          description: e.abstract,
          datePublished: e.year + "-01-01",
          keywords: e.keywords,
          author: { "@type": "Person", name: "Muhammad Faisal Orakzai", url: "https://faisalorakzai.com", sameAs: "https://orcid.org/0009-0000-0915-7272" },
          publisher: { "@type": "Organization", name: "Orakzai Research Lab", url: "https://faisalorakzai.com" },
          inLanguage: "en",
          isAccessibleForFree: true,
          ...(e.pdfUrl ? { url: e.pdfUrl } : {}),
        })),
        // Software repos
        ...ENTRIES.filter(e => e.category === "PRODUCTION CODE").map(e => ({
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          "@id": `https://faisalorakzai.com/research#${e.id}`,
          name: e.title,
          description: e.abstract,
          codeRepository: e.repoUrl ?? `https://github.com/${e.repo}`,
          programmingLanguage: e.stack,
          author: { "@type": "Person", name: "Muhammad Faisal Orakzai" },
          dateCreated: e.year + "-01-01",
          runtimePlatform: "Vercel / Node.js",
        })),
      ];

      const ldScripts = schemas.map(s => {
        const el = document.createElement("script");
        el.type = "application/ld+json";
        el.textContent = JSON.stringify(s, null, 0);
        document.head.appendChild(el);
        return el;
      });

      return () => {
        document.title = prevTitle;
        injected.forEach(el => el.remove());
        ldScripts.forEach(el => el.remove());
      };
    }, [active]);
  }

  // âââ LaTeX inline renderer ââââââââââââââââââââââââââââââââââââââââââââââââââââ
  const SUB: Record<string, string> = {"0":"â","1":"â","2":"â","3":"â","4":"â","5":"â","6":"â","7":"â","8":"â","9":"â","n":"â","i":"áµ¢","k":"â","t":"â","p":"â"};
  const SUP: Record<string, string> = {"0":"â°","1":"Â¹","2":"Â²","3":"Â³","4":"â´","5":"âµ","6":"â¶","7":"â·","8":"â¸","9":"â¹","n":"â¿","i":"â±","k":"áµ"};

  function renderTex(s: string) {
    return s
      .replace(/_\{([^}]+)\}/g, (_, x: string) => x.split("").map((c: string) => SUB[c] ?? c).join(""))
      .replace(/\^\{([^}]+)\}/g, (_, x: string) => x.split("").map((c: string) => SUP[c] ?? c).join(""))
      .replace(/\^(\w)/g, (_, c: string) => SUP[c] ?? c)
      .replace(/_(w)/g, (_, c: string) => SUB[c] ?? c)
      .replace(/\\times/g,"Ã").replace(/\\oplus/g,"â").replace(/\\cdot/g,"Â·")
      .replace(/\\rightarrow/g,"â").replace(/\\leq/g,"â¤").replace(/\\geq/g,"â¥")
      .replace(/\\sum/g,"â").replace(/\\forall/g,"â").replace(/\\exists/g,"â")
      .replace(/\\in/g,"â").replace(/\\mid/g,"|").replace(/\\sigma/g,"Ï")
      .replace(/\\theta/g,"Î¸").replace(/\\lambda/g,"Î»").replace(/\\delta/g,"Î´")
      .replace(/\\infty/g,"â").replace(/\\\|/g,"â")
      .replace(/\\pi/g,"Ï").replace(/\\\{/g,"{").replace(/\\\}/g,"}");
  }

  function MathText({ children }: { children: string }) {
    const parts = children.split(/($[^$]+$)/g);
    return (
      <>
        {parts.map((part, i) =>
          part.startsWith("$") && part.endsWith("$") ? (
            <span key={i} className="font-mono italic text-[#F3BA2F] bg-[#F3BA2F]/8 px-1.5 py-0.5 rounded-sm text-xs leading-relaxed">
              {renderTex(part.slice(1, -1))}
            </span>
          ) : (
            <span key={i} className="text-white/45">{part}</span>
          )
        )}
      </>
    );
  }

  // âââ Commit heatmap ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function heatmap(seed: string, cols = 20) {
    let v = seed.split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
    return Array.from({ length: cols * 5 }, () => {
      v = ((v * 1103515245 + 12345) & 0x7fffffff);
      return (v % 100) / 100;
    });
  }

  // âââ Status badge styles ââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  const S: Record<string, string> = {
    PUBLISHED:       "border-emerald-500/30 text-emerald-400/75",
    PRODUCTION:      "border-emerald-500/30 text-emerald-400/75",
    ACTIVE:          "border-emerald-500/30 text-emerald-400/75",
    BLUEPRINT:       "border-[#F3BA2F]/35 text-[#F3BA2F]/75",
    BUILDING:        "border-amber-500/35 text-amber-400/75",
    "FORMAL DRAFT":  "border-blue-400/30 text-blue-400/65",
  };

  // âââ Author links strip âââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function AuthorLinks() {
    const platforms = [
      { label: "ORCID", url: AUTHOR_LINKS.orcid, color: "#A6CE39" },
      { label: "Google Scholar", url: AUTHOR_LINKS.googleScholar, color: "#4285F4" },
      { label: "LinkedIn", url: AUTHOR_LINKS.linkedin, color: "#0A66C2" },
      { label: "HackerNoon", url: AUTHOR_LINKS.hackernoon, color: "#00D563" },
      { label: "GitHub", url: AUTHOR_LINKS.github, color: "#F3BA2F" },
    ];
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {platforms.map(p => (
          <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-white/25 transition-colors duration-200 group"
            style={{ minHeight: "32px" }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}80` }} />
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase group-hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}>{p.label}</span>
          </a>
        ))}
      </div>
    );
  }

  // âââ Fixed viewport frame âââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function Frame() {
    const pts = [{top:"14px",left:"8px"},{top:"14px",right:"8px"},{bottom:"14px",left:"8px"},{bottom:"14px",right:"8px"}] as const;
    return (
      <>
        {[{left:"4px"},{right:"4px"}].map((pos,i) => (
          <div key={i} aria-hidden style={{ position:"fixed", top:0, ...pos, width:"1px", height:"100vh",
            background:"linear-gradient(to bottom,transparent 5%,rgba(243,186,47,0.07) 30%,rgba(243,186,47,0.07) 70%,transparent 95%)",
            pointerEvents:"none", zIndex:5 }} />
        ))}
        {pts.map((pos,i) => (
          <div key={i} aria-hidden style={{ position:"fixed", ...pos, width:"14px", height:"14px", pointerEvents:"none", zIndex:5 }}>
            <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"rgba(243,186,47,0.5)", transform:"translateY(-50%)" }} />
            <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"1px", background:"rgba(243,186,47,0.5)", transform:"translateX(-50%)" }} />
          </div>
        ))}
      </>
    );
  }

  // âââ Platform link badges for each card ââââââââââââââââââââââââââââââââââââââ
  function PlatformBadges({ entryId }: { entryId: string }) {
    const badges = [
      { label: "ORCID", url: AUTHOR_LINKS.orcid + `&sortBy=pubdate`, short: "ORCID" },
      { label: "Google Scholar", url: AUTHOR_LINKS.googleScholar, short: "G.SCHOLAR" },
      { label: "LinkedIn", url: AUTHOR_LINKS.linkedin, short: "LINKEDIN" },
      { label: "HackerNoon", url: AUTHOR_LINKS.hackernoon, short: "HACKERNOON" },
    ];
    return (
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        {badges.map(b => (
          <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
            aria-label={`${b.label} profile of Muhammad Faisal Orakzai`}
            className="font-mono text-[10px] tracking-[0.2em] border border-[#F3BA2F]/18 text-[#F3BA2F]/55 px-2.5 py-1 uppercase hover:border-[#F3BA2F]/50 hover:text-[#F3BA2F]/90 transition-colors duration-200">
            â {b.short}
          </a>
        ))}
      </div>
    );
  }

  // âââ Card: Market / Artifacts âââââââââââââââââââââââââââââââââââââââââââââââââ

  // ─── Article Content Renderer ─────────────────────────────────────────────
  function ArticleViewer({ content }: { content: string }) {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} style={{ listStyle: "none", margin: "0.75rem 0 1.25rem", padding: 0 }}>
            {listItems.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "0.5rem", color: "rgba(255,255,255,0.65)", fontSize: "14px", lineHeight: 1.7, marginBottom: "0.35rem" }}>
                <span style={{ color: "#F3BA2F", flexShrink: 0, marginTop: "0.15rem" }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("- ")) {
        listItems.push(line.slice(2));
        continue;
      }

      flushList();

      if (line === "---") {
        elements.push(
          <hr key={key++} style={{ border: "none", borderTop: "1px solid rgba(243,186,47,0.1)", margin: "1.5rem 0" }} />
        );
      } else if (line.trim() === "") {
        // skip
      } else {
        // Detect heading: short line (≤80 chars), doesn't end in punctuation except ?
        const trimmed = line.trim();
        const isHeading = trimmed.length <= 80 &&
          !trimmed.endsWith(",") &&
          !trimmed.endsWith(";") &&
          (i === 0 || lines[i - 1].trim() === "" || lines[i - 1] === "---") &&
          (i === lines.length - 1 || lines[i + 1].trim() === "" || lines[i + 1] === "---" || lines[i + 1].startsWith("- "));

        if (isHeading) {
          elements.push(
            <h3 key={key++} style={{ color: "#F3BA2F", fontFamily: "monospace", fontSize: "clamp(0.8rem, 2vw, 0.9rem)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "1.75rem", marginBottom: "0.75rem", opacity: 0.9 }}>
              {trimmed}
            </h3>
          );
        } else {
          elements.push(
            <p key={key++} style={{ color: "rgba(255,255,255,0.72)", fontSize: "15px", lineHeight: 1.8, marginBottom: "0.9rem", fontWeight: 300 }}>
              {trimmed}
            </p>
          );
        }
      }
    }

    flushList();

    return (
      <div style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "0.5rem" }}
        className="scrollbar-thin scrollbar-thumb-[#F3BA2F]/20 scrollbar-track-transparent">
        <div style={{ borderBottom: "1px solid rgba(243,186,47,0.15)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "monospace", fontSize: "10px", letterSpacing: "0.25em", color: "rgba(243,186,47,0.5)", textTransform: "uppercase" }}>
            FULL ARTICLE · MUHAMMAD FAISAL ORAKZAI · 2026
          </span>
        </div>
        {elements}
      </div>
    );
  }

  function ResearchCard({ entry, i }: { entry: Entry; i: number }) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [hov, setHov] = useState(false);
    const [expanded, setExpanded] = useState(false);

    return (
      <motion.article
        ref={ref}
        id={entry.id}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        itemScope
        itemType={entry.category === "ARTIFACTS & BLUEPRINTS"
          ? "https://schema.org/TechArticle"
          : "https://schema.org/ScholarlyArticle"}
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          animate={{ boxShadow: hov ? "0 0 28px rgba(243,186,47,0.08), inset 0 0 40px rgba(243,186,47,0.02)" : "none" }}
          transition={{ duration: 0.28 }}
          className="border border-[#F3BA2F]/10 p-5 md:p-7 transition-colors duration-300"
          style={{ background: hov ? "rgba(243,186,47,0.012)" : "rgba(0,0,0,0.95)", transform: "translateZ(0)" }}
        >
          <header>
            <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-[#F3BA2F]/60 border border-[#F3BA2F]/18 px-2.5 py-0.5 uppercase">
                    {entry.category}
                  </span>
                  <time dateTime={entry.year} itemProp="datePublished"
                    className="font-mono text-[10px] tracking-widest text-white/25">
                    {entry.year}
                  </time>
                </div>
                <h3 itemProp="headline"
                  className="font-black leading-tight transition-colors duration-250"
                  style={{ fontSize:"clamp(1rem,2.8vw,1.25rem)", color: hov ? "#fff" : "rgba(255,255,255,0.88)" }}>
                  {entry.title}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.16em] text-[#F3BA2F]/40 mt-1.5 uppercase">{entry.subtitle}</p>
              </div>
              <span className={`flex-shrink-0 font-mono text-[10px] tracking-widest border px-2.5 py-1 uppercase min-h-[28px] flex items-center ${S[entry.status] ?? "border-white/10 text-white/25"}`}>
                {entry.status}
              </span>
            </div>
          </header>

          <p itemProp="abstract" className="text-white/55 text-[15px] leading-[1.75] font-light mb-5">
            {entry.abstract}
          </p>

          <footer className="flex flex-col gap-3">
            <address itemProp="author" itemScope itemType="https://schema.org/Person"
              className="font-mono text-[10px] tracking-[0.22em] text-white/30 not-italic uppercase">
              <a href={AUTHOR_LINKS.orcid} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#F3BA2F]/70 transition-colors">
                <span itemProp="name">{entry.authors}</span>
              </a>
            </address>

            {entry.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 list-none" aria-label="Keywords">
                {entry.tags.map(t => (
                  <li key={t}>
                    <span className="font-mono text-[10px] tracking-wide px-2.5 py-0.5 border border-white/10 text-white/35">
                      #{t}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {entry.fullContent && (
              <button
                onClick={() => setExpanded(e => !e)}
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase border border-[#F3BA2F]/30 text-[#F3BA2F]/80 px-4 py-2 hover:border-[#F3BA2F]/70 hover:text-[#F3BA2F] transition-all duration-250"
                style={{ background: 'rgba(243,186,47,0.04)' }}
              >
                {expanded ? "COLLAPSE ARTICLE ↑" : "READ FULL ARTICLE ↓"}
              </button>
            )}

            <PlatformBadges entryId={entry.id} />
          </footer>
        </motion.div>

        {entry.fullContent && expanded && (
          <div style={{ borderLeft: "2px solid rgba(243,186,47,0.2)", borderRight: "2px solid rgba(243,186,47,0.2)", borderBottom: "2px solid rgba(243,186,47,0.2)", background: "rgba(0,0,0,0.97)", padding: "2rem 1.75rem" }}>
            <ArticleViewer content={entry.fullContent} />
          </div>
        )}
      </motion.article>
    );
  }

  // âââ Card: White Paper with LaTeX âââââââââââââââââââââââââââââââââââââââââââââ
  function WhitePaperCard({ entry, i }: { entry: Entry; i: number }) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [hov, setHov] = useState(false);

    return (
      <motion.article
        ref={ref}
        id={entry.id}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        itemScope
        itemType="https://schema.org/ScholarlyArticle"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          animate={{ boxShadow: hov ? "0 0 35px rgba(243,186,47,0.1), inset 0 0 50px rgba(243,186,47,0.025)" : "none" }}
          transition={{ duration: 0.28 }}
          className="relative border p-5 md:p-7 overflow-hidden"
          style={{
            borderColor: hov ? "rgba(243,186,47,0.28)" : "rgba(243,186,47,0.16)",
            background: "rgba(0,0,0,0.97)",
            transform: "translateZ(0)",
          }}
        >
          {/* Corner marks */}
          <div aria-hidden className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#F3BA2F]/28 pointer-events-none" />
          <div aria-hidden className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#F3BA2F]/28 pointer-events-none" />
          <div aria-hidden className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#F3BA2F]/28 pointer-events-none" />
          <div aria-hidden className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#F3BA2F]/28 pointer-events-none" />

          <header>
            <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-[#F3BA2F]/75 border border-[#F3BA2F]/25 px-2.5 py-0.5 uppercase">
                    WHITE PAPER
                  </span>
                  <time dateTime={entry.year} itemProp="datePublished"
                    className="font-mono text-[10px] text-white/25">{entry.year}</time>
                </div>
                <h3 itemProp="headline"
                  className="font-black leading-tight transition-colors duration-250"
                  style={{ fontSize:"clamp(1rem,2.8vw,1.25rem)", color: hov ? "#F3BA2F" : "rgba(255,255,255,0.9)" }}>
                  {entry.title}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.14em] text-[#F3BA2F]/40 mt-1.5 uppercase">{entry.subtitle}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <span className={`flex-shrink-0 font-mono text-[10px] tracking-widest border px-2.5 py-1 uppercase ${S[entry.status] ?? ""}`}>
                  {entry.status}
                </span>
                {entry.pdfUrl && (
                  <a href={entry.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-[10px] tracking-[0.2em] border border-[#F3BA2F]/30 text-[#F3BA2F]/80 px-2.5 py-1 uppercase hover:bg-[#F3BA2F]/10 hover:border-[#F3BA2F]/60 transition-colors duration-200 flex items-center gap-1.5">
                    â PDF
                  </a>
                )}
              </div>
            </div>
          </header>

          <p itemProp="abstract" className="text-white/55 text-[15px] leading-[1.75] font-light mb-5">
            {entry.abstract}
          </p>

          {entry.equations && entry.equations.length > 0 && (
            <section aria-label="Formal notation" className="mb-5 p-4 border-l-2 border-[#F3BA2F]/28 bg-[#F3BA2F]/3 space-y-3">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#F3BA2F]/50 uppercase mb-2">
                Formal Notation
              </p>
              {entry.equations.map((eq, j) => (
                <p key={j} className="text-sm leading-relaxed">
                  <MathText>{eq}</MathText>
                </p>
              ))}
            </section>
          )}

          <footer className="flex flex-col gap-3">
            <address itemProp="author" itemScope itemType="https://schema.org/Person"
              className="font-mono text-[10px] tracking-[0.2em] text-white/30 not-italic">
              <a href={AUTHOR_LINKS.orcid} target="_blank" rel="noopener noreferrer"
                className="hover:text-[#F3BA2F]/70 transition-colors">
                <span itemProp="name">{entry.authors}</span>
              </a>
            </address>
            <PlatformBadges entryId={entry.id} />
          </footer>
        </motion.div>
      </motion.article>
    );
  }

  // âââ Card: Production Repo ââââââââââââââââââââââââââââââââââââââââââââââââââââ
  function RepoCard({ entry, i }: { entry: Entry; i: number }) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [hov, setHov] = useState(false);
    const heat = heatmap(entry.id, 20);
    const live = entry.status === "ACTIVE";

    return (
      <motion.article
        ref={ref}
        id={entry.id}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        itemScope
        itemType="https://schema.org/SoftwareSourceCode"
        style={{ willChange: "transform, opacity" }}
      >
        <motion.div
          animate={{ boxShadow: hov ? "0 0 40px rgba(243,186,47,0.11), inset 0 0 60px rgba(243,186,47,0.028)" : "none" }}
          transition={{ duration: 0.28 }}
          className="border p-5 md:p-7"
          style={{
            borderColor: hov ? "rgba(243,186,47,0.3)" : "rgba(243,186,47,0.11)",
            background: "rgba(0,0,0,0.97)",
            transform: "translateZ(0)",
          }}
        >
          <header>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-amber-400"}`}
                    style={{ animation: "repoPulse 2s ease-in-out infinite" }}
                  />
                  <span className={`font-mono text-[10px] tracking-[0.28em] uppercase ${live ? "text-emerald-400/70" : "text-amber-400/60"}`}>
                    {entry.status}
                  </span>
                  <time dateTime={entry.year} itemProp="dateCreated"
                    className="font-mono text-[10px] text-white/20">Â· {entry.year}</time>
                </div>
                <h3 itemProp="name"
                  className="font-black text-white leading-tight"
                  style={{ fontSize:"clamp(1rem,2.8vw,1.2rem)" }}>
                  {entry.title}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.14em] text-[#F3BA2F]/35 mt-1 uppercase">{entry.subtitle}</p>
              </div>
              {entry.repoUrl && (
                <a href={entry.repoUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-shrink-0 font-mono text-[10px] tracking-[0.2em] border border-[#F3BA2F]/25 text-[#F3BA2F]/65 px-2.5 py-1.5 uppercase hover:border-[#F3BA2F]/55 hover:text-[#F3BA2F] transition-colors duration-200">
                  â GITHUB
                </a>
              )}
            </div>
          </header>

          <p itemProp="description" className="text-white/50 text-[15px] leading-[1.75] font-light mb-5">
            {entry.abstract}
          </p>

          {/* Commit heatmap */}
          <section aria-label={`Commit activity`} className="mb-5">
            <p className="font-mono text-[10px] tracking-[0.28em] text-white/22 uppercase mb-2">
              Commit Activity Â· {entry.commits}
            </p>
            <div className="flex gap-0.5" style={{ transform:"translateZ(0)" }} role="img" aria-label="commit heatmap">
              {Array.from({ length: 20 }, (_, col) => (
                <div key={col} className="flex flex-col gap-0.5">
                  {Array.from({ length: 5 }, (_, row) => {
                    const val = heat[col * 5 + row];
                    return (
                      <div key={row} className="w-2.5 h-2.5 rounded-sm" style={{
                        background: val > 0.75 ? "#F3BA2F"
                          : val > 0.5  ? "rgba(243,186,47,0.52)"
                          : val > 0.25 ? "rgba(243,186,47,0.2)"
                          : "rgba(255,255,255,0.04)",
                      }} />
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          {/* Infrastructure metrics */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[{label:"DEPLOY",val:entry.deploy},{label:"DATABASE",val:entry.db}].map(m => (
              <div key={m.label} className="border border-white/5 px-3 py-2">
                <p className="font-mono text-[9px] tracking-[0.35em] text-white/20 mb-1">{m.label}</p>
                <p className="font-mono text-[11px] tracking-wider text-[#F3BA2F]/75">{m.val}</p>
              </div>
            ))}
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-white/5">
            <ul className="flex flex-wrap gap-1.5 list-none" aria-label="Tech stack" itemProp="programmingLanguage">
              {entry.stack?.map(s => (
                <li key={s}>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 border border-[#F3BA2F]/12 text-[#F3BA2F]/45">{s}</span>
                </li>
              ))}
            </ul>
            <a href={entry.repoUrl ?? `https://github.com/${entry.repo}`} target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-[0.22em] border border-[#F3BA2F]/20 text-[#F3BA2F]/55 px-2.5 py-1 uppercase hover:border-[#F3BA2F]/45 hover:text-[#F3BA2F]/85 transition-colors duration-200">
              [GITHUB LIVE]
            </a>
          </footer>
        </motion.div>
      </motion.article>
    );
  }

  // âââ Page âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
  export default function Research() {
    const [active, setActive] = useState<Filter>("ALL INTEL");
    useSEO(active);

    const filtered = ENTRIES.filter(e =>
      active === "ALL INTEL" || e.category === active
    );
    const counts: Record<string, number> = {};
    FILTERS.forEach(f => {
      counts[f] = f === "ALL INTEL" ? ENTRIES.length : ENTRIES.filter(e => e.category === f).length;
    });

    return (
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <style>{`
          @keyframes repoPulse { 0%,100%{opacity:.5;} 50%{opacity:1;} }
          .filter-ribbon { overflow-x:auto; overflow-y:hidden; -webkit-overflow-scrolling:touch; scrollbar-width:none; white-space:nowrap; -webkit-mask-image:linear-gradient(to right,black 80%,transparent 100%); mask-image:linear-gradient(to right,black 80%,transparent 100%); }
          .filter-ribbon::-webkit-scrollbar { display:none; }
        `}</style>

        <Frame />

        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0"
          style={{ background:"radial-gradient(ellipse 80% 40% at 50% 0%,rgba(243,186,47,0.035) 0%,transparent 70%)" }} />

        {/* ââ HERO ââ */}
        <header className="pt-28 pb-8 relative z-10">
          <div className="max-w-5xl mx-auto px-5">
            <motion.div initial="h" animate="s" variants={{ s:{transition:{staggerChildren:0.09}} }}>

              <motion.div
                variants={{ h:{opacity:0,y:14}, s:{opacity:1,y:0,transition:{duration:0.55}} }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-7 bg-[#F3BA2F] flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.45em] text-[#F3BA2F] uppercase">Research Lab</span>
                <div className="h-px flex-1 bg-[#F3BA2F]/10" />
                <span className="font-mono text-[11px] tracking-widest text-white/20 hidden sm:block">NODE: KARACHI Â· PK</span>
              </motion.div>

              <motion.h1
                variants={{ h:{opacity:0,y:20}, s:{opacity:1,y:0,transition:{duration:0.75,ease:[0.22,1,0.36,1]}} }}
                className="font-black uppercase leading-[0.95]"
                style={{ fontSize:"clamp(2rem,9vw,5.5rem)", letterSpacing:"-0.025em" }}
              >
                CENTRAL<br />
                KNOWLEDGE{" "}
                <span style={{
                  background:"linear-gradient(135deg,#F3BA2F 0%,#ffe47a 50%,#c8900a 100%)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                }}>
                  REPOSITORY
                </span>
              </motion.h1>

              <motion.p
                variants={{ h:{opacity:0}, s:{opacity:1,transition:{duration:0.55,delay:0.12}} }}
                className="font-mono text-white/30 text-[11px] tracking-[0.25em] uppercase mt-5 max-w-sm leading-relaxed"
              >
                Market intel Â· Protocol blueprints Â·<br />
                Cryptographic papers Â· Live production nodes
              </motion.p>
            </motion.div>

            {/* CV Download */}
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.5}}
              className="flex flex-wrap gap-3 mt-6">
              <a href={CV_VIEW_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#F3BA2F]/35 text-[#F3BA2F]/90 hover:bg-[#F3BA2F]/10 hover:border-[#F3BA2F]/65 transition-colors duration-200 font-mono text-[11px] tracking-[0.25em] uppercase">
                â DOWNLOAD CV / RESUME
              </a>
              <a href={AUTHOR_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/12 text-white/45 hover:border-white/25 hover:text-white/70 transition-colors duration-200 font-mono text-[11px] tracking-[0.25em] uppercase">
                â LINKEDIN PROFILE
              </a>
            </motion.div>

            {/* Authority badges â now real links */}
            <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.45,duration:0.5}}
              className="mt-5" role="list" aria-label="Academic indexing status">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase mb-2">Academic Profiles & Indexing</p>
              <AuthorLinks />
            </motion.div>
          </div>
        </header>

        {/* ââ FILTER RIBBON â horizontal scroll on mobile ââ */}
        <nav aria-label="Knowledge categories"
          className="sticky top-16 z-20 border-b border-[#F3BA2F]/10"
          style={{ background:"rgba(0,0,0,0.96)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" }}>
          <div className="max-w-5xl mx-auto px-5">
            <div className="filter-ribbon -mb-px" role="tablist">
              {FILTERS.map(f => {
                const isA = active === f;
                return (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={isA}
                    onClick={() => setActive(f)}
                    className="relative inline-flex items-center gap-1.5 px-4 transition-colors duration-200"
                    style={{
                      minHeight:"48px",
                      color: isA ? "#F3BA2F" : "rgba(255,255,255,0.40)",
                      fontFamily:"monospace",
                      fontSize:"11px",
                      letterSpacing:"0.22em",
                      textTransform:"uppercase",
                      whiteSpace:"nowrap",
                      background:"transparent",
                      border:"none",
                      cursor:"pointer",
                    }}
                  >
                    {f}
                    <span style={{ opacity:0.5, fontSize:"10px" }}>({counts[f]})</span>
                    {isA && (
                      <motion.span
                        layoutId="filter-bar"
                        className="absolute bottom-0 left-2 right-2 h-px bg-[#F3BA2F]"
                        style={{ boxShadow:"0 0 8px rgba(243,186,47,0.9)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ââ ENTRIES ââ */}
        <main className="py-8 pb-24 relative z-10" role="tabpanel" aria-label={active}>
          <div className="max-w-5xl mx-auto px-5 space-y-4">
            {filtered.length === 0 && (
              <p role="status" className="text-center py-20 font-mono text-sm tracking-[0.4em] text-white/20 uppercase">
                No entries in this category
              </p>
            )}
            {filtered.map((entry, i) => {
              if (entry.category === "CRYPTOGRAPHIC WHITE PAPERS") return <WhitePaperCard key={entry.id} entry={entry} i={i} />;
              if (entry.category === "PRODUCTION CODE")             return <RepoCard       key={entry.id} entry={entry} i={i} />;
              return                                                        <ResearchCard   key={entry.id} entry={entry} i={i} />;
            })}
          </div>
        </main>

        {/* ââ CODA ââ */}
        <footer className="pb-16 relative z-10">
          <div className="max-w-5xl mx-auto px-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/5">
              <p className="font-mono text-white/18 text-[11px] tracking-[0.25em] uppercase">
                CITATION: MUHAMMAD FAISAL ORAKZAI Â· ORAKZAI RESEARCH LAB Â· 2024
              </p>
              <div className="flex items-center gap-2">
                <span aria-hidden className="w-1 h-1 rounded-full bg-[#F3BA2F] animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.22em] text-[#F3BA2F]/45">
                  {ENTRIES.length} ENTRIES Â· ACADEMIC INDEXING ACTIVE
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  