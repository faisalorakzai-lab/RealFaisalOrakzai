/**
 * research-entries.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Single source of truth for all research articles, white papers, artifacts,
 * and production-code repos on faisalorakzai.com/research.
 *
 * Both the Research page component (src/pages/Research.tsx) and the RSS feed
 * generator (generate-rss.ts) import from here, so adding one entry here
 * automatically updates the rendered page AND the live RSS feed on next build.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Author identity ──────────────────────────────────────────────────────────
export const AUTHOR = {
  name:         "Faisal Orakzai",
  nameCitation: "Orakzai, Faisal",
  orcid:        "https://orcid.org/0009-0000-0915-7272",
  orcidId:      "0009-0000-0915-7272",
  scholar:      "https://scholar.google.com/citations?user=faisalorakzai",
  linkedin:     "https://www.linkedin.com/in/faisalorakzaii",
  hackernoon:   "https://hackernoon.com/u/faisalorakzai",
  github:       "https://github.com/faisalorakzai-lab",
  imdb:         "https://www.imdb.com/name/nm18674496/",
  website:      "https://faisalorakzai.com",
  org:          "Orakzai Research Lab",
};

// ─── Google Drive helpers (internal — used only to build ENTRIES below) ───────
const gView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const gDl   = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

// ─── Real document IDs ────────────────────────────────────────────────────────
export const DOCS = {
  profile:     { view: gView("1X1NT-UZzeyqacmjJo2HoAkYE9mUxad-x"), dl: gDl("1X1NT-UZzeyqacmjJo2HoAkYE9mUxad-x") },
  properties:  { view: gView("1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3"), dl: gDl("1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3") },
  okbondPres:  { view: gView("1Q6bClDOeBCBxBZfKdD9SnqSpNFrG-u7A"), dl: gDl("1Q6bClDOeBCBxBZfKdD9SnqSpNFrG-u7A") },
  okbondSec:   { view: gView("1T_isI9xvQQr_Mbkt1YyBvNF4kLUOcVgj"), dl: gDl("1T_isI9xvQQr_Mbkt1YyBvNF4kLUOcVgj") },
  okbondWp:    { view: gView("1Psz7Iy5aREH_ltKPGLglTwR2ln1VTHWS"), dl: gDl("1Psz7Iy5aREH_ltKPGLglTwR2ln1VTHWS") },
};

// ─── Types ────────────────────────────────────────────────────────────────────
export type Category =
  | "MARKET KNOWLEDGE"
  | "BLOCKCHAIN"
  | "ARTIFACTS & BLUEPRINTS"
  | "CRYPTOGRAPHIC WHITE PAPERS"
  | "PRODUCTION CODE";

export interface Entry {
  id:        string;
  category:  Category;
  year:      string;
  title:     string;
  subtitle:  string;
  abstract:  string;
  equations?: string[];
  tags:      string[];
  status:    string;
  repo?:     string;
  repoUrl?:  string;
  stack?:    string[];
  commits?:  string;
  deploy?:   string;
  db?:       string;
  pdfUrl?:   string;
  pdfDl?:    string;
  slug?:     string;
  thumbnail?: string;
  readTime?:  string;
  keywords:  string;
}

// ─── Dataset ──────────────────────────────────────────────────────────────────
export const ENTRIES: Entry[] = [
  // ── CRYPTOGRAPHIC WHITE PAPERS ─────────────────────────────────────────────
  {
    id: "wp-cross-chain", category: "CRYPTOGRAPHIC WHITE PAPERS", year: "2026",
    title: "Cross-Chain Interoperability: Formal Verification and Recursive Zero-Knowledge Architectures",
    subtitle: "Architecting a Unified Multi-Chain Ecosystem for Vision 2100",
    abstract: "The fragmentation of liquidity and consensus state across disparate L1 and L2 networks remains one of the key challenges in modern distributed systems. This work explores a unified architecture designed for secure, scalable, and interoperable blockchain infrastructure. Key Technical Contributions: Formal Verification (TLA+ and Coq), Recursive ZK-Proofs, and Cryptographic Safety. As we build toward Vision 2100, the Sovereign Stack represents my long-term vision for a unified, secure, and scalable digital infrastructure.",
    equations: ["F_i = \\frac{FragmentedTVL}{BridgedTVL} \\rightarrow 0"],
    tags: ["Blockchain", "ComputerScience", "ZeroKnowledge", "FormalVerification", "Web3Infrastructure", "Faisal Orakzai", "OrakzaiGroup"],
    status: "PUBLISHED",
    slug: "cross-chain-zenodo",
    thumbnail: "/mk/cross-chain-zenodo.png",
    readTime: "White Paper",
    keywords: "Cross-Chain Interoperability, Formal Verification, Recursive Zero-Knowledge Architectures, Heterogeneous Distributed Systems, Faisal Orakzai, Zenodo, ORCID 0009-0000-0915-7272",
    pdfUrl: "https://doi.org/10.5281/zenodo.22047129",
  },
  // ── BLOCKCHAIN ARTICLES ───────────────────────────────────────────────────
  {
    id: "bc-01", category: "BLOCKCHAIN", year: "2026",
    title: "What is Blockchain? A Complete Beginner's Guide",
    subtitle: "From distributed ledgers to smart contracts — the definitive primer on blockchain technology",
    abstract: "Blockchain is more than digital money — it is a distributed ledger protocol for storing, verifying, and managing data without a central authority. Often introduced through Bitcoin, the technology spans smart contracts, decentralized applications, and enterprise infrastructure across more than ten industries. This article examines blockchain fundamentals, its technical components, historical development, practical applications, and the trade-offs practitioners must understand before deployment.",
    tags: ["Blockchain", "DLT", "Web3", "DeFi", "Cryptography", "RWA", "Tokenization", "Smart Contracts"],
    status: "PUBLISHED",
    slug: "blockchain-basic",
    thumbnail: "/mk/blockchain-guide.webp",
    readTime: "25 min read",
    keywords: "blockchain, what is blockchain, distributed ledger, smart contracts, DeFi, Web3, cryptocurrency, Faisal Orakzai",
  },
  {
    id: "bc-02", category: "BLOCKCHAIN", year: "2026",
    title: "Blockchain Infrastructure Explained",
    subtitle: "The Complete Guide to the Technology That Powers Blockchain Networks",
    abstract:
      "Blockchain infrastructure encompasses every technical layer that keeps a distributed network running — from node hardware and validator operations to consensus protocols, RPC endpoints, Layer-2 scaling, oracle networks, and cross-chain messaging. Understanding this stack is essential for anyone building production systems on blockchain. This article maps each infrastructure component and explains how they interact to maintain security, decentralization, and continuous operation at scale.",
    tags: ["Blockchain", "Infrastructure", "Nodes", "Consensus", "Layer-2", "Validators", "RPC", "Web3"],
    status: "PUBLISHED",
    slug: "blockchain-infra",
    thumbnail: "/mk/thumb-blockchain-infra.webp",
    readTime: "35 min read",
    keywords: "blockchain infrastructure, blockchain nodes, validators, consensus, Layer-2, RPC, smart contracts, Web3, Faisal Orakzai",
  },
  {
    id: "bc-09", category: "BLOCKCHAIN", year: "2026",
    title: "Cross-Chain Technology Explained",
    subtitle: "Blockchain Interoperability, Bridges, IBC, CCIP & LayerZero Guide (2026)",
    abstract: "Cross-chain technology solves one of distributed systems' hardest problems: how independent blockchain networks exchange assets and data without trusting a central party. This article examines bridge architectures (lock-and-mint, burn-and-release, federated, and trustless models), atomic swaps using HTLCs, and the major interoperability protocols — LayerZero, Chainlink CCIP, Axelar, Cosmos IBC, and Polkadot XCM — analyzing their security trade-offs and practical deployment contexts.",
    tags: ["Cross-Chain Technology","Blockchain Interoperability","Cross-Chain Bridges","Atomic Swaps","LayerZero","Chainlink CCIP","Cosmos IBC","Polkadot XCM","Chain Abstraction","Multi-Chain Architecture","Web3 Interoperability","Cross-Chain Liquidity"],
    status: "PUBLISHED",
    slug: "cross-chain-technology",
    thumbnail: "/mk/cross-chain-hero.webp",
    readTime: "38 min read",
    keywords: "cross-chain technology, blockchain interoperability, cross-chain bridges, blockchain bridges, atomic swaps, HTLC, LayerZero, Chainlink CCIP, Cosmos IBC, Polkadot XCM, cross-chain messaging, chain abstraction, multi-chain architecture, web3 interoperability, cross-chain liquidity, Faisal Orakzai",
  },
  {
    id: "bc-08", category: "BLOCKCHAIN", year: "2026",
    title: "How Digital Identity Works on Blockchain",
    subtitle: "DIDs, SSI, Verifiable Credentials, Zero-Knowledge Proofs & Future Guide (2026)",
    abstract: "Blockchain digital identity shifts credential ownership from institutions to individuals through Decentralized Identifiers (DIDs), Verifiable Credentials, and Zero-Knowledge Proofs. This article explains how Self-Sovereign Identity (SSI) works technically — covering DID documents, Verifiable Presentations, revocation registries, selective disclosure, and identity wallets — and examines deployment contexts across banking KYC, healthcare, government, and enterprise, including post-quantum considerations for long-term system design.",
    tags: ["Digital Identity","Blockchain Identity","DIDs","SSI","Verifiable Credentials","Zero-Knowledge Proofs","Identity Wallets","Post-Quantum Cryptography"],
    status: "PUBLISHED",
    slug: "blockchain-digital-identity",
    thumbnail: "/mk/blockchain-digital-identity-hero.webp",
    readTime: "40 min read",
    keywords: "blockchain digital identity, DIDs, decentralized identifiers, SSI, self-sovereign identity, verifiable credentials, zero-knowledge proofs, identity wallets, post-quantum cryptography, Faisal Orakzai",
  },
  {
    id: "bc-07", category: "BLOCKCHAIN", year: "2026",
    title: "The Future of Web3 Infrastructure",
    subtitle: "AI, Digital Identity, Cross-Chain Networks & the Next Internet (2026)",
    abstract: "Web3 represents a structural shift in internet architecture — from platforms that hold user data and assets toward protocols where users own both. This article traces that shift across six infrastructure layers: blockchain networks, decentralized storage, distributed computing, digital identity, interoperability protocols, and AI agents. It examines where this technology stands today across government, enterprise, and finance, and analyzes what autonomous digital ecosystems will look like through 2035–2050.",
    tags: ["Web3","Future Internet","AI Agents","Digital Identity","DePIN","Modular Blockchain","CBDCs","DAOs"],
    status: "PUBLISHED",
    slug: "future-of-web3",
    thumbnail: "/mk/future-of-web3-hero.webp",
    readTime: "42 min read",
    keywords: "future of Web3, Web3 infrastructure, AI agents, digital identity, DePIN, modular blockchain, CBDCs, DAOs, quantum-resistant cryptography, Faisal Orakzai",
  },
  {
    id: "bc-06", category: "BLOCKCHAIN", year: "2026",
    title: "Blockchain Security & Consensus Mechanisms Explained",
    subtitle: "PoW, PoS, Cryptography, Attacks, Validator Security & Future Security Guide (2026)",
    abstract: "Blockchain security rests on cryptographic primitives — hash functions, digital signatures, Merkle trees — layered with consensus protocols that align economic incentives against attack. This article examines how Proof of Work, Proof of Stake, DPoS, PBFT, and PoA distribute trust differently, what the Blockchain Trilemma constrains in practice, and how specific attacks (51%, Sybil, Eclipse, double-spend) map to validator and node hardening requirements. Post-quantum considerations and AI-assisted threat detection are covered for enterprise deployments.",
    tags: ["Blockchain Security","Consensus Mechanisms","PoW","PoS","Cryptography","Validator Security","ZK-Proofs","Post-Quantum"],
    status: "PUBLISHED",
    slug: "blockchain-security",
    thumbnail: "/mk/blockchain-security-hero.webp",
    readTime: "36 min read",
    keywords: "blockchain security, consensus mechanisms, Proof of Work, Proof of Stake, cryptographic hash functions, validator security, 51% attack, zero knowledge proofs, post-quantum cryptography, Faisal Orakzai",
  },
  {
    id: "bc-05", category: "BLOCKCHAIN", year: "2026",
    title: "Tokenization of Real World Assets (RWA)",
    subtitle: "Complete Guide to Blockchain Asset Tokenization — Fractional Ownership, Infrastructure, Compliance & Enterprise Adoption (2026)",
    abstract: "Real World Asset tokenization converts ownership rights in physical and financial assets — real estate, bonds, commodities, and intellectual property — into programmable blockchain tokens. This article explains the complete tokenization lifecycle from legal structure and valuation through smart contract issuance, KYC/AML compliance, and secondary trading. It also examines the genuine challenges: establishing the legal bridge between on-chain records and off-chain ownership, oracle dependency, and jurisdiction-specific regulatory requirements.",
    tags: ["RWA","Tokenization","DeFi","Real World Assets","Fractional Ownership","Blockchain Finance","Smart Contracts","Enterprise Blockchain"],
    status: "PUBLISHED",
    slug: "rwa-tokenization",
    thumbnail: "/mk/rwa-tokenization-hero.webp",
    readTime: "32 min read",
    keywords: "RWA tokenization, real world asset tokenization, fractional ownership, DeFi, blockchain finance, smart contracts, enterprise blockchain, Faisal Orakzai",
  },
  {
    id: "bc-04", category: "BLOCKCHAIN", year: "2026",
    title: "How Smart Contracts Work",
    subtitle: "Complete Beginner to Advanced Guide — Architecture, Lifecycle, Security & Enterprise Use Cases (2026)",
    abstract: "Smart contracts are programs stored on a blockchain that execute automatically when predefined conditions are met — no intermediary required. This article covers how the execution lifecycle works from wallet signature to finalized ledger state, what gas mechanics mean for production design, how oracle networks bring external data on-chain, and where security vulnerabilities most commonly occur. Use cases span DeFi, supply chain, insurance, real estate, and enterprise automation.",
    tags: ["Smart Contracts","Solidity","EVM","DeFi","Blockchain Automation","Oracle Networks","Security","Token Standards"],
    status: "PUBLISHED",
    slug: "smart-contracts",
    thumbnail: "/mk/smart-contracts-hero.webp",
    readTime: "30 min read",
    keywords: "smart contracts, how smart contracts work, Solidity, EVM, DeFi, oracle networks, token standards, blockchain automation, Faisal Orakzai",
  },
  {
    id: "bc-03", category: "BLOCKCHAIN", year: "2026",
    title: "Public vs Private vs Consortium Blockchains",
    subtitle: "The Complete Enterprise Guide to Blockchain Architecture (2026)",
    abstract:
      "Blockchain networks are not all the same. Public blockchains are open and permissionless; private blockchains are controlled by one organization; consortium blockchains are governed by multiple trusted partners; and hybrid blockchains combine both. This guide compares all four across security, scalability, governance, cost, and compliance, and provides a decision framework for choosing the right architecture — particularly useful for enterprises evaluating where permissioned infrastructure makes more sense than public networks.",
    tags: ["Blockchain Types", "Public Blockchain", "Private Blockchain", "Consortium Blockchain", "Hybrid Blockchain", "Enterprise Blockchain", "Permissioned", "Web3"],
    status: "PUBLISHED",
    slug: "blockchain-types",
    thumbnail: "/mk/thumb-blockchain-types.webp",
    readTime: "28 min read",
    keywords: "public blockchain, private blockchain, consortium blockchain, hybrid blockchain, enterprise blockchain, permissioned blockchain, blockchain architecture, Faisal Orakzai",
  },
  {
    id: "bc-10", category: "BLOCKCHAIN", year: "2026",
    title: "Building Enterprise Blockchain Ecosystems",
    subtitle: "The Complete Guide for Businesses & Governments — Architecture, Governance & Future (2026)",
    abstract: "Enterprise blockchain ecosystems extend well beyond cryptocurrency — integrating AI, cloud infrastructure, digital identity, IoT, tokenization, and compliance into a shared trust layer for multi-organization workflows. This article examines permissioned deployment models (private, consortium, hybrid), smart contract architecture for production environments, governance structures for multi-party networks, and how AI and blockchain combine for intelligent automation. Real-world applications are traced across finance, healthcare, manufacturing, logistics, and government. This is the final article in the 10-part Blockchain Knowledge Hub.",
    tags: ["Enterprise Blockchain", "Blockchain Architecture", "Enterprise Smart Contracts", "Blockchain Governance", "Digital Public Infrastructure", "AI and Blockchain", "Enterprise Tokenization", "Permissioned Blockchain", "Blockchain Interoperability", "Enterprise Digital Identity", "Blockchain Security", "Enterprise Web3"],
    status: "PUBLISHED",
    slug: "enterprise-blockchain-ecosystems-guide",
    thumbnail: "/mk/enterprise-blockchain-hero.webp",
    readTime: "40 min read",
    keywords: "enterprise blockchain, enterprise blockchain ecosystem, blockchain architecture, enterprise smart contracts, blockchain governance, AI and blockchain, digital public infrastructure, blockchain interoperability, enterprise tokenization, permissioned blockchain, blockchain security, enterprise web3, enterprise digital transformation, Faisal Orakzai",
  },
  // ── MARKET KNOWLEDGE ──────────────────────────────────────────────────────
  {
    id: "mk-01", category: "MARKET KNOWLEDGE", year: "2024",
    title: "Macro-Liquidity Networks & Cross-Border Fintech Dynamics",
    subtitle: "Structural Analysis of Tokenized Asset Corridors",
    abstract:
      "Deep-dive examination of macro-liquidity network architecture across cross-border fintech corridors. Explores how sovereign tokenized asset pools create structural arbitrage dynamics in G20-adjacent emerging markets, with emphasis on protocol-layer liquidity provisioning and settlement velocity at institutional scale.",
    tags: ["Macro-Liquidity", "Cross-Border", "Fintech", "RWA", "Settlement"],
    status: "PUBLISHED",
    pdfUrl: DOCS.profile.view,
    pdfDl:  DOCS.profile.dl,
    keywords: "macro-liquidity, cross-border fintech, tokenized assets, DeFi, settlement velocity, Pakistan, Faisal Orakzai",
  },
  {
    id: "mk-02", category: "MARKET KNOWLEDGE", year: "2024",
    title: "Real-World Asset Tokenization: Protocol Mechanics & Market Depth",
    subtitle: "On-chain RWA Infrastructure for Institutional Capital Corridors",
    abstract:
      "Investigates the structural mechanics of on-chain real-world asset tokenization across illiquid capital markets. Analyzes protocol-layer custody models, oracle dependency chains, and secondary market depth constraints in RWA-backed DeFi infrastructure serving institutional corridors with high-net-worth capital flows.",
    tags: ["RWA", "Tokenization", "DeFi", "Institutional", "Oracle Design"],
    status: "PUBLISHED",
    keywords: "real-world asset tokenization, RWA, DeFi, institutional finance, oracle systems, blockchain, Orakzai",
  },
  // ── ARTIFACTS & BLUEPRINTS ────────────────────────────────────────────────
  {
    id: "ab-01", category: "ARTIFACTS & BLUEPRINTS", year: "2024",
    title: "Orakzai Properties — Fractional Real Estate Platform",
    subtitle: "Tokenized Real Estate Infrastructure Presentation",
    abstract:
      "Full-stack platform for the Orakzai Properties fractional real estate tokenization protocol. Handles property listing management, token issuance workflows, investor onboarding, rental yield distribution automation, and secondary market interface. Integrates on-chain settlement layer for real-time position tracking.",
    tags: ["Real Estate", "Tokenization", "RWA", "Property", "DeFi"],
    status: "ACTIVE",
    pdfUrl: DOCS.properties.view,
    pdfDl:  DOCS.properties.dl,
    keywords: "Orakzai Properties, real estate tokenization, fractional property, RWA Pakistan, property blockchain",
  },
  {
    id: "ab-02", category: "ARTIFACTS & BLUEPRINTS", year: "2024",
    title: "Orakzai Bond (OKBOND) — Sovereign Protocol Presentation",
    subtitle: "Tokenized Debt Architecture on EVM-Compatible Infrastructure",
    abstract:
      "Full architectural specification for the OKBOND sovereign debt protocol. Defines issuance mechanics, coupon distribution logic, redemption pathways, and on-chain governance voting modules. Includes smart contract interaction diagrams, escrow models, and regulatory compliance boundary mapping for institutional-grade deployment.",
    tags: ["OKBOND", "Tokenized Debt", "EVM", "Smart Contracts", "Protocol Design"],
    status: "BLUEPRINT",
    pdfUrl: DOCS.okbondPres.view,
    pdfDl:  DOCS.okbondPres.dl,
    keywords: "OKBOND, tokenized debt, EVM, sovereign bond, blockchain protocol, DeFi architecture, Pakistan",
  },
  {
    id: "ab-03", category: "ARTIFACTS & BLUEPRINTS", year: "2024",
    title: "OrakzaiX Production Database Schema v2.0",
    subtitle: "Multi-Entity PostgreSQL Architecture for Sovereign Venture Tracking",
    abstract:
      "Complete production-grade PostgreSQL schema for the OrakzaiX venture infrastructure. Covers multi-entity relational models for orakzai_ventures, orakzai_positions, compliance_ledger, and capital_allocation tables. Includes index strategies, JSONB field patterns, row-level security configurations, and full audit trail design.",
    tags: ["PostgreSQL", "SQL Architecture", "JSONB", "RLS", "Schema Design"],
    status: "PRODUCTION",
    pdfUrl: "https://drive.google.com/file/d/1hY3iUVNgBofI3lOsK2Os3QMJcjGIdcnS/view?usp=drivesdk",
    keywords: "PostgreSQL schema, database architecture, venture tracking, RLS, OrakzaiX, sovereign infrastructure",
  },
  // ── CRYPTOGRAPHIC WHITE PAPERS ────────────────────────────────────────────
  {
    id: "wp-01", category: "CRYPTOGRAPHIC WHITE PAPERS", year: "2024",
    title: "OKBOND Protocol White Paper: Cryptographic Sovereign Debt",
    subtitle: "Formal Specification of the Orakzai Bond on EVM Infrastructure",
    abstract:
      "Formal white paper defining the OKBOND sovereign debt tokenization protocol. Presents cryptographic issuance mechanics, on-chain coupon distribution proofs, redemption pathway formalization, and governance voting integrity models. Rigorous treatment of security assumptions and trust boundary analysis for institutional deployment.",
    equations: [
      "Bond value: $V(t) = F \\cdot e^{-r \\cdot (T-t)} + \\sum_{i=1}^{n} C_i \\cdot e^{-r \\cdot (t_i-t)}$",
      "Coupon proof: $\\pi_{coupon} = SNARK_{prove}(bond_{id}, holder, amount)$",
      "Governance weight: $W_v = \\sum_{i=1}^{n} stake_i \\cdot \\delta(vote_i, v)$",
    ],
    tags: ["OKBOND", "Sovereign Debt", "Cryptography", "EVM", "Formal Spec"],
    status: "WHITE PAPER",
    pdfUrl: DOCS.okbondWp.view,
    pdfDl:  DOCS.okbondWp.dl,
    keywords: "OKBOND white paper, sovereign debt tokenization, cryptographic bond protocol, EVM, DeFi fixed income, Pakistan blockchain",
  },
  {
    id: "wp-02", category: "CRYPTOGRAPHIC WHITE PAPERS", year: "2024",
    title: "OKBOND Security Review: Formal Vulnerability Analysis",
    subtitle: "Structural Security Audit & SolidityScan Validation Framework",
    abstract:
      "Comprehensive security review of the OKBOND protocol covering smart contract vulnerability analysis, reentrancy attack vectors, oracle manipulation risks, and governance takeover scenarios. Employs formal verification methods and SolidityScan frameworks to certify protocol security boundaries for institutional-grade deployment.",
    equations: [
      "Attack surface: $A_s = \\sum_{v \\in V} severity(v) \\cdot P(exploit_v)$",
      "Reentrancy guard: $R(call) = \\{lock \\rightarrow execute \\rightarrow unlock\\} \\mid \\forall call_i: lock_i \\neq lock_j$",
      "Security score: $S = 100 - \\sum_{c \\in critical} w_c \\cdot (1 - P(mitigated_c))$",
    ],
    tags: ["Security Audit", "SolidityScan", "Smart Contracts", "OKBOND", "Formal Verification"],
    status: "SECURITY REVIEW",
    pdfUrl: DOCS.okbondSec.view,
    pdfDl:  DOCS.okbondSec.dl,
    keywords: "OKBOND security review, smart contract audit, SolidityScan, reentrancy, formal verification blockchain",
  },
  {
    id: "wp-03", category: "CRYPTOGRAPHIC WHITE PAPERS", year: "2024",
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
    keywords: "zero-knowledge proofs, zkSNARK, supply chain provenance, OkzByte, cryptographic validation, blockchain",
  },
  {
    id: "wp-04", category: "CRYPTOGRAPHIC WHITE PAPERS", year: "2024",
    title: "QORIX AI Trust Protocol: Formal Verification Model",
    subtitle: "Autonomous Inference with Cryptographic Accountability",
    abstract:
      "Defines a formal verification model for AI inference accountability in high-throughput autonomous systems. Introduces a cryptographic audit trail architecture where every inference decision is hash-linked to its input state, enabling post-hoc verification without compromising sub-100ms inference latency targets.",
    equations: [
      "Inference chain: $I_t = f_{\\theta}(x_t) \\mid H(I_t) = SHA_{256}(x_t \\| \\theta_t)$",
      "Accountability: $A(\\sigma) = \\sum_{i=1}^{n} w_i \\cdot V(I_i, H_i)$",
      "Latency bound: $\\lambda \\leq \\delta_{max} \\rightarrow \\forall t: t_i - t_{i-1} < \\delta$",
    ],
    tags: ["AI Trust", "Formal Verification", "Inference Audit", "QORIX", "Cryptography"],
    status: "FORMAL DRAFT",
    keywords: "AI trust, formal verification, inference accountability, QORIX AI, cryptographic audit trail",
  },
  // ── PRODUCTION CODE ───────────────────────────────────────────────────────
  {
    id: "pc-01", category: "PRODUCTION CODE", year: "2024",
    title: "QORIX AI — Autonomous Inference Engine",
    subtitle: "High-Throughput AI Orchestration with Cryptographic Audit",
    abstract:
      "Production AI engine for zero-latency inference orchestration across distributed compute nodes. Handles real-time data ingestion, model routing, and cryptographic audit trail generation at high throughput with sub-100ms P99 response targets and full lineage accountability on-chain.",
    tags: [],
    repoUrl: "https://github.com/faisalorakzai-lab/qorix-ai",
    stack: ["TypeScript", "Python", "ONNX", "Redis", "PostgreSQL"],
    commits: "Active", deploy: "VERCEL · LIVE", db: "SUPABASE · SYNCED", status: "ACTIVE",
    keywords: "QORIX AI, autonomous inference, AI engine, cryptographic audit, high-throughput",
  },
  {
    id: "pc-02", category: "PRODUCTION CODE", year: "2024",
    title: "AdamX Protocol Engine",
    subtitle: "Sovereign DeFi Execution & Cross-Chain Settlement Layer",
    abstract:
      "Core execution engine for the AdamX sovereign DeFi protocol. Manages on-chain state transitions, liquidity routing, and cross-chain message passing with embedded compliance rule validation and real-time settlement confirmation targeting sub-second finality.",
    tags: [],
    repoUrl: "https://github.com/faisalorakzai-lab/Adamorakzaix",
    stack: ["Solidity", "TypeScript", "Hardhat", "The Graph"],
    commits: "Active", deploy: "VERCEL · LIVE", db: "ON-CHAIN · ACTIVE", status: "BUILDING",
    keywords: "AdamX DeFi, cross-chain liquidity, Solidity, sovereign DeFi, execution engine",
  },
  {
    id: "pc-03", category: "PRODUCTION CODE", year: "2024",
    title: "OrakzaiX Infrastructure Stack",
    subtitle: "Sovereign Multi-Entity Venture Platform",
    abstract:
      "Full-stack infrastructure backing the OrakzaiX venture portfolio. Integrates real-time position tracking, compliance automation, capital allocation routing, and investor-facing reporting modules with PostgreSQL + Vercel deployment.",
    tags: [],
    repoUrl: "https://github.com/faisalorakzai-lab/orakzaix-stack",
    stack: ["React", "Express", "Drizzle ORM", "PostgreSQL", "Vercel"],
    commits: "Active", deploy: "VERCEL · LIVE", db: "POSTGRES · LIVE", status: "ACTIVE",
    keywords: "OrakzaiX, venture platform, full-stack, sovereign infrastructure, portfolio tracking",
  },
  {
    id: "pc-04", category: "PRODUCTION CODE", year: "2024",
    title: "PSC StockChain — Tokenized Securities Protocol",
    subtitle: "Pakistan Stock Exchange On-Chain Settlement Infrastructure",
    abstract:
      "Blockchain settlement infrastructure for PSC-compatible tokenized equity. Maps traditional equity instruments to on-chain representations with full audit trail, regulatory reporting automation, and real-time settlement finality for institutional compliance.",
    tags: [],
    repoUrl: "https://github.com/faisalorakzai-lab/PSC-StockChain",
    stack: ["Solidity", "TypeScript", "Node.js", "PostgreSQL", "Chainlink"],
    commits: "Active", deploy: "VERCEL · LIVE", db: "POSTGRES · ACTIVE", status: "BUILDING",
    keywords: "PSC StockChain, Pakistan Stock Exchange, tokenized securities, blockchain equity",
  },
];
