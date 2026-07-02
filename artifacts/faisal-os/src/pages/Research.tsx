import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";

// ─── Author identity ──────────────────────────────────────────────────────────
const AUTHOR = {
  name:         "Faisal Orakzai",
  nameCitation: "Orakzai, Faisal",
  orcid:        "https://orcid.org/0009-0000-0915-7272",
  orcidId:      "0009-0000-0915-7272",
  scholar:      "https://scholar.google.com/citations?user=faisalorakzai",
  linkedin:     "https://www.linkedin.com/in/faisalorakzaii",
  hackernoon:   "https://hackernoon.com/u/faisalorakzai",
  github:       "https://github.com/faisalorakzai-lab",
  website:      "https://www.faisalorakzai.com",
  org:          "Orakzai Research Lab",
};

// Google Drive helpers
const gView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const gDl   = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

// Real document IDs from Google Drive
const DOCS = {
  profile:     { view: gView("1X1NT-UZzeyqacmjJo2HoAkYE9mUxad-x"), dl: gDl("1X1NT-UZzeyqacmjJo2HoAkYE9mUxad-x") },
  properties:  { view: gView("1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3"), dl: gDl("1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3") },
  okbondPres:  { view: gView("1Q6bClDOeBCBxBZfKdD9SnqSpNFrG-u7A"), dl: gDl("1Q6bClDOeBCBxBZfKdD9SnqSpNFrG-u7A") },
  okbondSec:   { view: gView("1T_isI9xvQQr_Mbkt1YyBvNF4kLUOcVgj"), dl: gDl("1T_isI9xvQQr_Mbkt1YyBvNF4kLUOcVgj") },
  okbondWp:    { view: gView("1Psz7Iy5aREH_ltKPGLglTwR2ln1VTHWS"), dl: gDl("1Psz7Iy5aREH_ltKPGLglTwR2ln1VTHWS") },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Category =
  | "MARKET KNOWLEDGE"
  | "BLOCKCHAIN"
  | "ARTIFACTS & BLUEPRINTS"
  | "CRYPTOGRAPHIC WHITE PAPERS"
  | "PRODUCTION CODE";

interface Entry {
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
  slug?:      string;
  thumbnail?: string;
  readTime?:  string;
  keywords:  string;
}

// ─── Dataset ──────────────────────────────────────────────────────────────────
const ENTRIES: Entry[] = [
  // ── BLOCKCHAIN ARTICLES
    {
      id: "bc-01", category: "BLOCKCHAIN", year: "2026",
      title: "What is Blockchain? A Complete Beginner's Guide",
      subtitle: "From distributed ledgers to smart contracts — the definitive primer on blockchain technology",
      abstract: "Blockchain is one of the most revolutionary technologies of the 21st century. Often associated with cryptocurrencies like Bitcoin, blockchain is far more than just digital money — it is a secure, transparent, decentralized system for storing, managing, and verifying data. This comprehensive guide covers blockchain fundamentals, core components, history, benefits, limitations, real-world applications across 10+ industries, emerging trends, FAQs, and common myths.",
      tags: ["Blockchain", "DLT", "Web3", "DeFi", "Cryptography", "RWA", "Tokenization", "Smart Contracts"],
      status: "PUBLISHED",
      slug: "blockchain-basic",
      thumbnail: "/mk/blockchain-guide.png",
      readTime: "25 min read",
      keywords: "blockchain, what is blockchain, distributed ledger, smart contracts, DeFi, Web3, cryptocurrency, Faisal Orakzai",
      },
      {
        id: "bc-02", category: "BLOCKCHAIN", year: "2026",
        title: "Blockchain Infrastructure Explained",
        subtitle: "The Complete Guide to the Technology That Powers Blockchain Networks",
        abstract:
          "Blockchain infrastructure is the complete technical environment that keeps a blockchain network secure, decentralized, synchronized, and continuously operational. This comprehensive guide covers blockchain nodes, consensus layers, networking, cryptography, smart contracts, RPC infrastructure, APIs, validator operations, Layer-2 scaling, oracle networks, cross-chain protocols, indexing, monitoring, and the full spectrum of enterprise-grade blockchain infrastructure components.",
        tags: ["Blockchain", "Infrastructure", "Nodes", "Consensus", "Layer-2", "Validators", "RPC", "Web3"],
        status: "PUBLISHED",
        slug: "blockchain-infra",
        thumbnail: "/mk/thumb-blockchain-infra.png",
        readTime: "35 min read",
        keywords: "blockchain infrastructure, blockchain nodes, validators, consensus, Layer-2, RPC, smart contracts, Web3, Faisal Orakzai",
      },
        {
          id: "bc-09", category: "BLOCKCHAIN", year: "2026",
          title: "Cross-Chain Technology Explained",
          subtitle: "Blockchain Interoperability, Bridges, IBC, CCIP & LayerZero Guide (2026)",
          abstract: "A comprehensive guide to cross-chain technology and blockchain interoperability — covering blockchain bridges (lock-and-mint, burn-and-release, federated, trustless), atomic swaps, HTLC, cross-chain messaging protocols, LayerZero, Chainlink CCIP, Axelar, Cosmos IBC, Polkadot XCM, wrapped assets, cross-chain liquidity, chain abstraction, intent-based architecture, bridge security, and the future of multi-chain Web3 infrastructure.",
          tags: ["Cross-Chain Technology","Blockchain Interoperability","Cross-Chain Bridges","Atomic Swaps","LayerZero","Chainlink CCIP","Cosmos IBC","Polkadot XCM","Chain Abstraction","Multi-Chain Architecture","Web3 Interoperability","Cross-Chain Liquidity"],
          status: "PUBLISHED",
          slug: "cross-chain-technology",
          thumbnail: "/mk/cross-chain-hero.png",
          readTime: "38 min read",
          keywords: "cross-chain technology, blockchain interoperability, cross-chain bridges, blockchain bridges, atomic swaps, HTLC, LayerZero, Chainlink CCIP, Cosmos IBC, Polkadot XCM, cross-chain messaging, chain abstraction, multi-chain architecture, web3 interoperability, cross-chain liquidity, Faisal Orakzai",
        },
        {
          id: "bc-08", category: "BLOCKCHAIN", year: "2026",
          title: "How Digital Identity Works on Blockchain",
          subtitle: "DIDs, SSI, Verifiable Credentials, Zero-Knowledge Proofs & Future Guide (2026)",
          abstract: "A comprehensive technical guide to blockchain digital identity — covering Decentralized Identifiers (DIDs), Self-Sovereign Identity (SSI), Verifiable Credentials, Zero-Knowledge Proofs, selective disclosure, identity wallets, recovery mechanisms, revocation registries, enterprise identity architecture, cross-border identity, government programs, healthcare, banking KYC, education credentials, post-quantum cryptography, and the future of identity in 2035–2050.",
          tags: ["Blockchain Digital Identity","Decentralized Identity","Self-Sovereign Identity","DID","Verifiable Credentials","Zero-Knowledge Proofs","Web3 Identity","Enterprise Digital Identity","Blockchain Authentication","Blockchain Privacy","Future of Digital Identity","Identity Verification"],
          status: "PUBLISHED",
          slug: "blockchain-digital-identity",
          thumbnail: "/mk/blockchain-identity-hero.png",
          readTime: "40 min read",
          keywords: "blockchain digital identity, decentralized identity, self-sovereign identity, SSI, DID, decentralized identifiers, verifiable credentials, zero-knowledge proofs, blockchain authentication, identity on blockchain, web3 identity, enterprise digital identity, identity verification, blockchain privacy, future of digital identity, Faisal Orakzai",
        },
        {
          id: "bc-07", category: "BLOCKCHAIN", year: "2026",
          title: "The Future of Web3 Infrastructure",
          subtitle: "AI, Digital Identity, Cross-Chain Networks & the Next Internet (2026)",
          abstract: "Web3 infrastructure is the foundation of the next internet — combining blockchain networks, decentralized storage, AI agents, digital identity, cross-chain interoperability, DePIN, modular blockchain, CBDCs, stablecoins, enterprise adoption, smart cities, DAOs, and quantum-resistant cryptography into a unified programmable digital economy. This comprehensive guide explores every layer from Web1 evolution to the 2035–2050 vision of autonomous digital ecosystems.",
          tags: ["Future of Web3","Web3 Infrastructure","Decentralized Internet","AI and Web3","Digital Identity","Cross-Chain Interoperability","DePIN","Modular Blockchain","CBDC","Tokenized Economy","Enterprise Web3","Smart Cities"],
          status: "PUBLISHED",
          slug: "future-of-web3",
          thumbnail: "/mk/web3-future-hero.png",
          readTime: "38 min read",
          keywords: "future of web3, web3 infrastructure, decentralized internet, AI blockchain, digital identity, cross-chain interoperability, DePIN, modular blockchain, CBDC, stablecoin, enterprise web3, smart cities, DAOs, quantum cryptography, Faisal Orakzai",
        },
        {
          id: "bc-06", category: "BLOCKCHAIN", year: "2026",
          title: "Blockchain Security & Consensus Mechanisms Explained",
          subtitle: "PoW, PoS, Cryptography, Attacks, Validator Security & Future Security Guide (2026)",
          abstract: "Blockchain security depends on cryptography, consensus mechanisms, and network architecture working together. This comprehensive guide covers cryptographic hash functions, digital signatures, Merkle trees, Proof of Work, Proof of Stake, DPoS, PBFT, PoA, the Blockchain Trilemma, 51% attacks, Sybil attacks, Eclipse attacks, double spending, validator security, node hardening, Zero Knowledge Proofs, post-quantum cryptography, AI-driven threat detection, and enterprise blockchain security best practices.",
          tags: ["Blockchain Security","Consensus Mechanisms","Proof of Work","Proof of Stake","Cryptography","51% Attack","Merkle Tree","Digital Signatures","Validator Security","Zero Knowledge Proof","Post-Quantum Cryptography","Web3 Security"],
          status: "PUBLISHED",
          slug: "blockchain-security",
          thumbnail: "/mk/blockchain-security-hero.png",
          readTime: "35 min read",
          keywords: "blockchain security, consensus mechanisms, proof of work, proof of stake, cryptographic hashing, digital signatures, Merkle tree, 51% attack, Sybil attack, validator security, post-quantum cryptography, zero knowledge proof, enterprise blockchain security, Faisal Orakzai",
        },
        {
          id: "bc-05", category: "BLOCKCHAIN", year: "2026",
          title: "Tokenization of Real World Assets (RWA)",
          subtitle: "Complete Guide to Blockchain Asset Tokenization — Fractional Ownership, Infrastructure, Compliance & Enterprise Adoption (2026)",
          abstract: "Real World Asset (RWA) tokenization bridges traditional finance and DeFi by representing physical and financial assets as secure digital tokens on a blockchain. This complete guide covers what RWA tokenization is, how it works technically, the token lifecycle, fractional ownership, compliance requirements, challenges, 12+ industries being tokenized, enterprise adoption, and the future of programmable digital ownership.",
          tags: ["RWA","Real World Assets","Asset Tokenization","Blockchain Assets","Fractional Ownership","Tokenized Real Estate","Security Tokens","Digital Assets","Enterprise Blockchain","Digital Finance","DeFi","Smart Contracts"],
          status: "PUBLISHED",
          slug: "rwa-tokenization",
          thumbnail: "/mk/rwa-hero.png",
          readTime: "32 min read",
          keywords: "Real World Asset tokenization, RWA blockchain, asset tokenization guide, tokenized real estate, fractional ownership blockchain, security tokens, digital assets, enterprise blockchain, DeFi RWA, blockchain investment, token economy, Faisal Orakzai",
        },
        {
          id: "bc-04", category: "BLOCKCHAIN", year: "2026",
          title: "How Smart Contracts Work",
          subtitle: "Complete Beginner to Advanced Guide — Architecture, Lifecycle, Security & Enterprise Use Cases (2026)",
          abstract: "Smart contracts are self-executing computer programs stored on a blockchain that automatically perform agreed actions when predetermined conditions are satisfied. This comprehensive guide covers smart contract architecture, execution lifecycle, programming languages, gas mechanics, oracle networks, token standards, industries from DeFi to enterprise, security best practices, common vulnerabilities, and the future of blockchain automation.",
          tags: ["Smart Contracts", "Blockchain", "Ethereum", "Solidity", "DeFi", "Web3", "dApps", "Blockchain Automation", "Smart Contract Security", "Enterprise Blockchain"],
          status: "PUBLISHED",
          slug: "smart-contracts",
          thumbnail: "/mk/smart-contracts-hero.png",
          readTime: "30 min read",
          keywords: "how smart contracts work, smart contract explained, smart contract guide, blockchain smart contracts, solidity smart contracts, ethereum smart contracts, smart contract development, enterprise blockchain, decentralized applications, web3 infrastructure, blockchain automation, digital contracts, Faisal Orakzai",
        },
        {
          id: "bc-03", category: "BLOCKCHAIN", year: "2026",
          title: "Public vs Private vs Consortium Blockchains",
          subtitle: "The Complete Enterprise Guide to Blockchain Architecture (2026)",
          abstract:
            "Blockchain networks are not all the same. Public blockchains are open and permissionless; private blockchains are controlled by one organisation; consortium blockchains are governed by multiple trusted partners; and hybrid blockchains combine public and private infrastructure. This complete enterprise guide explains all four types in depth, compares them across security, scalability, governance, cost, and compliance, and provides a decision framework for choosing the right blockchain architecture for any use case.",
          tags: ["Blockchain Types", "Public Blockchain", "Private Blockchain", "Consortium Blockchain", "Hybrid Blockchain", "Enterprise Blockchain", "Permissioned", "Web3"],
          status: "PUBLISHED",
          slug: "blockchain-types",
          thumbnail: "/mk/thumb-blockchain-types.png",
          readTime: "28 min read",
          keywords: "public blockchain, private blockchain, consortium blockchain, hybrid blockchain, enterprise blockchain, permissioned blockchain, blockchain architecture, Faisal Orakzai",
        },
        {
          id: "bc-10", category: "BLOCKCHAIN", year: "2026",
          title: "Building Enterprise Blockchain Ecosystems",
          subtitle: "The Complete Guide for Businesses & Governments — Architecture, Governance & Future (2026)",
          abstract: "Enterprise blockchain ecosystems go far beyond cryptocurrency — connecting AI, cloud, digital identity, IoT, APIs, tokenization, analytics, compliance, and cybersecurity into one secure, scalable platform. This comprehensive guide covers enterprise blockchain architecture, permissioned deployment models (private, consortium, hybrid), smart contract automation, digital identity management, interoperability across ecosystems, AI integration, regulatory compliance frameworks, governance models, and real-world enterprise use cases across finance, healthcare, manufacturing, logistics, and government. The final article in the 10-part Blockchain Knowledge Hub.",
          tags: ["Enterprise Blockchain", "Blockchain Architecture", "Enterprise Smart Contracts", "Blockchain Governance", "Digital Public Infrastructure", "AI and Blockchain", "Enterprise Tokenization", "Permissioned Blockchain", "Blockchain Interoperability", "Enterprise Digital Identity", "Blockchain Security", "Enterprise Web3"],
          status: "PUBLISHED",
          slug: "enterprise-blockchain-ecosystems-guide",
          thumbnail: "/mk/enterprise-blockchain-hero.png",
          readTime: "40 min read",
          keywords: "enterprise blockchain, enterprise blockchain ecosystem, blockchain architecture, enterprise smart contracts, blockchain governance, AI and blockchain, digital public infrastructure, blockchain interoperability, enterprise tokenization, permissioned blockchain, blockchain security, enterprise web3, enterprise digital transformation, Faisal Orakzai",
        },
                // ── MARKET KNOWLEDGE
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
  // ── ARTIFACTS & BLUEPRINTS
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
  // ── CRYPTOGRAPHIC WHITE PAPERS
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
  // ── PRODUCTION CODE
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

const FILTERS = [
  "ALL INTEL",
  "MARKET KNOWLEDGE",
  "BLOCKCHAIN",
  "ARTIFACTS & BLUEPRINTS",
  "CRYPTOGRAPHIC WHITE PAPERS",
  "PRODUCTION CODE",
] as const;
type Filter = typeof FILTERS[number];

const STATUS_CLS: Record<string, string> = {
  PUBLISHED:         "#4ade80",
  PRODUCTION:        "#4ade80",
  ACTIVE:            "#4ade80",
  BLUEPRINT:         "#F3BA2F",
  BUILDING:          "#fbbf24",
  "FORMAL DRAFT":    "#60a5fa",
  "WHITE PAPER":     "#a78bfa",
  "SECURITY REVIEW": "#f87171",
};

// ─── SEO injection ────────────────────────────────────────────────────────────
function useSEO() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Central Knowledge Repository — Faisal Orakzai";

    let dcLink = document.querySelector<HTMLLinkElement>("link[rel='schema.DC']");
    const dcNew = !dcLink;
    if (!dcLink) {
      dcLink = document.createElement("link");
      dcLink.setAttribute("rel", "schema.DC");
      dcLink.setAttribute("href", "http://purl.org/dc/elements/1.1/");
      document.head.appendChild(dcLink);
    }

    const singletons: [string, string, "name" | "property"][] = [
      ["description",   `Central Knowledge Repository of ${AUTHOR.name} — blockchain engineering, AI systems, cryptographic white papers, RWA tokenization. ORCID: ${AUTHOR.orcidId}.`, "name"],
      ["keywords",      `Faisal Orakzai, Faisal Orakzai, blockchain research, RWA tokenization, cryptographic protocols, QORIX AI, OkzByte, OKBOND, AdamX, OrakzaiX, DeFi, fintech Pakistan, ORCID ${AUTHOR.orcidId}`, "name"],
      ["robots",        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1", "name"],
      ["author",        AUTHOR.name, "name"],
      ["DC.title",      "Central Knowledge Repository — Faisal Orakzai", "name"],
      ["DC.creator",    AUTHOR.nameCitation, "name"],
      ["DC.subject",    "Blockchain Engineering; Cryptographic Protocols; AI Systems; RWA Tokenization; DeFi; OKBOND", "name"],
      ["DC.publisher",  AUTHOR.org, "name"],
      ["DC.date",       "2024", "name"],
      ["DC.type",       "Collection", "name"],
      ["DC.format",     "text/html", "name"],
      ["DC.identifier", `${AUTHOR.website}/research`, "name"],
      ["DC.language",   "en", "name"],
      ["og:title",      "Central Knowledge Repository — Faisal Orakzai", "property"],
      ["og:description","Blockchain engineering research, cryptographic white papers, OKBOND sovereign bond protocol, and live production repositories.", "property"],
      ["og:type",       "website", "property"],
      ["og:url",        `${AUTHOR.website}/research`, "property"],
      ["twitter:card",  "summary_large_image", "name"],
    ];

    const injected: HTMLMetaElement[] = [];
    singletons.forEach(([key, content, attr]) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); injected.push(el); }
      el.setAttribute("content", content);
    });

    // Per-paper Google Scholar citation + Dublin Core tags
    const scholarly = ENTRIES.filter(e =>
      e.category === "CRYPTOGRAPHIC WHITE PAPERS" || e.category === "MARKET KNOWLEDGE"
    );
    const paperMetas: HTMLMetaElement[] = [];
    scholarly.forEach(e => {
      const url = `${AUTHOR.website}/research#${e.id}`;
      const pairs: [string, string][] = [
        ["citation_title",             e.title],
        ["citation_author",            AUTHOR.nameCitation],
        ["citation_publication_date",  `${e.year}/01/01`],
        ["citation_abstract_html_url", url],
        ["citation_keywords",          e.keywords],
        ["citation_language",          "en"],
        ["citation_publisher",         AUTHOR.org],
        ["citation_online_date",       `${e.year}/01/01`],
        // PDF URL for Google Scholar full-text indexing
        ...(e.pdfDl ? [["citation_pdf_url", e.pdfDl] as [string,string]] : []),
        ["DC.title",                   e.title],
        ["DC.creator",                AUTHOR.nameCitation],
        ["DC.date",                   `${e.year}-01`],
        ["DC.identifier",             url],
        ["DC.type",                   "Text"],
        ["DC.subject",                e.keywords],
        ...(e.pdfDl ? [["DC.format", "application/pdf"] as [string,string]] : []),
      ];
      pairs.forEach(([name, content]) => {
        const el = document.createElement("meta");
        el.setAttribute("name", name);
        el.setAttribute("content", content);
        document.head.appendChild(el);
        paperMetas.push(el);
      });
    });

    // JSON-LD schemas
    const repos = ENTRIES.filter(e => e.category === "PRODUCTION CODE");
    const schemas: object[] = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${AUTHOR.website}#person`,
        name: AUTHOR.name,
        url: AUTHOR.website,
        sameAs: [AUTHOR.orcid, AUTHOR.linkedin, AUTHOR.github, AUTHOR.scholar, AUTHOR.hackernoon],
        jobTitle: "Founder & Chairman",
        affiliation: { "@type": "Organization", name: AUTHOR.org },
        identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: AUTHOR.orcidId },
      },
      ...scholarly.map(e => ({
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "@id": `${AUTHOR.website}/research#${e.id}`,
        headline: e.title,
        description: e.abstract,
        datePublished: `${e.year}-01-01`,
        keywords: e.keywords,
        inLanguage: "en",
        isAccessibleForFree: true,
        url: `${AUTHOR.website}/research#${e.id}`,
        ...(e.pdfDl ? { encoding: { "@type": "MediaObject", encodingFormat: "application/pdf", contentUrl: e.pdfDl } } : {}),
        author: { "@type": "Person", "@id": `${AUTHOR.website}#person`, name: AUTHOR.name },
        publisher: { "@type": "Organization", name: AUTHOR.org, url: AUTHOR.website },
        provider: { "@type": "Organization", name: "ORCID Verified Node", url: AUTHOR.orcid },
      })),
      ...repos.map(e => ({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "@id": `${AUTHOR.website}/research#${e.id}`,
        name: e.title,
        description: e.abstract,
        codeRepository: e.repoUrl,
        programmingLanguage: e.stack,
        author: { "@type": "Person", "@id": `${AUTHOR.website}#person`, name: AUTHOR.name },
        dateCreated: `${e.year}-01-01`,
      })),
    ];

    const ldScripts = schemas.map(s => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = JSON.stringify(s);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      document.title = prev;
      if (dcNew) dcLink!.remove();
      injected.forEach(el => el.remove());
      paperMetas.forEach(el => el.remove());
      ldScripts.forEach(el => el.remove());
    };
  }, []);
}

// ─── LaTeX renderer ───────────────────────────────────────────────────────────
const SUB: Record<string, string> = {"0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉","n":"ₙ","i":"ᵢ","k":"ₖ","t":"ₜ","p":"ₚ","v":"ᵥ","s":"ₛ"};
const SUP: Record<string, string> = {"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","n":"ⁿ","i":"ⁱ","k":"ᵏ"};

function renderTex(s: string): string {
  return s
    .replace(/_\{([^}]+)\}/g, (_,x:string) => x.split("").map((c:string)=>SUB[c]??c).join(""))
    .replace(/\^\{([^}]+)\}/g, (_,x:string) => x.split("").map((c:string)=>SUP[c]??c).join(""))
    .replace(/\^(\w)/g, (_,c:string) => SUP[c]??c)
    .replace(/_(\w)/g,  (_,c:string) => SUB[c]??c)
    .replace(/\\cdot/g,"·").replace(/\\times/g,"×").replace(/\\oplus/g,"⊕")
    .replace(/\\rightarrow/g,"→").replace(/\\leq/g,"≤").replace(/\\geq/g,"≥")
    .replace(/\\sum/g,"∑").replace(/\\forall/g,"∀").replace(/\\in/g,"∈")
    .replace(/\\sigma/g,"σ").replace(/\\theta/g,"θ").replace(/\\lambda/g,"λ")
    .replace(/\\delta/g,"δ").replace(/\\infty/g,"∞").replace(/\\\|/g,"‖")
    .replace(/\\pi/g,"π").replace(/\\mid/g,"|").replace(/\\\{/g,"{").replace(/\\\}/g,"}");
}

function MathText({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\$[^$]+\$)/g).map((part, i) =>
        part.startsWith("$") && part.endsWith("$") ? (
          <span key={i} style={{ fontFamily:"monospace", fontStyle:"italic", color:"#F3BA2F", background:"rgba(243,186,47,0.09)", padding:"1px 6px", borderRadius:"3px", fontSize:"12px", letterSpacing:"0.04em" }}>
            {renderTex(part.slice(1,-1))}
          </span>
        ) : (
          <span key={i} style={{ color:"rgba(255,255,255,0.5)" }}>{part}</span>
        )
      )}
    </>
  );
}

// ─── Commit heatmap ───────────────────────────────────────────────────────────
function heatmap(seed: string, cols = 20): number[] {
  let v = seed.split("").reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0);
  return Array.from({ length: cols * 5 }, () => {
    v = ((v * 1103515245 + 12345) & 0x7fffffff);
    return (v % 100) / 100;
  });
}

// ─── Reusable components ──────────────────────────────────────────────────────
const G: React.CSSProperties = { display:"flex", flexWrap:"wrap" as const, gap:"6px" };

function PdfButton({ entry }: { entry: Entry }) {
  const hasPdf = !!entry.pdfUrl;
  if (!hasPdf) {
    return (
      <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.28em", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.2)", padding:"5px 12px", textTransform:"uppercase" as const, display:"inline-flex", alignItems:"center", gap:"5px" }}>
        PDF PENDING
      </span>
    );
  }
  return (
    <a href={entry.pdfUrl} target="_blank" rel="noopener noreferrer"
      style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.32em", border:"1px solid rgba(243,186,47,0.45)", color:"#F3BA2F", padding:"5px 12px", textDecoration:"none", textTransform:"uppercase" as const, background:"rgba(243,186,47,0.06)", transition:"all 0.2s ease", display:"inline-flex", alignItems:"center", gap:"5px" }}
      onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background="rgba(243,186,47,0.14)"; a.style.borderColor="rgba(243,186,47,0.8)"; }}
      onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background="rgba(243,186,47,0.06)"; a.style.borderColor="rgba(243,186,47,0.45)"; }}
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M4.5 1v5.5M2 5l2.5 2.5L7 5M1 8.5h7" stroke="#F3BA2F" strokeWidth="1.1" strokeLinecap="round"/></svg>
      PDF
    </a>
  );
}

function PlatformBadges() {
  return (
    <div style={{ ...G, paddingTop:"12px", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
      {([
        ["ORCID",          AUTHOR.orcid],
        ["GOOGLE SCHOLAR", AUTHOR.scholar],
        ["LINKEDIN",       AUTHOR.linkedin],
        ["HACKERNOON",     AUTHOR.hackernoon],
      ] as [string,string][]).map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:"monospace", fontSize:"6.5px", letterSpacing:"0.24em", border:"1px solid rgba(243,186,47,0.14)", color:"rgba(243,186,47,0.42)", padding:"3px 8px", textTransform:"uppercase" as const, textDecoration:"none", transition:"all 0.2s ease" }}
          onMouseEnter={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.borderColor="rgba(243,186,47,0.55)";a.style.color="rgba(243,186,47,0.85)";}}
          onMouseLeave={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.borderColor="rgba(243,186,47,0.14)";a.style.color="rgba(243,186,47,0.42)";}}
        >
          [{label} ↗]
        </a>
      ))}
    </div>
  );
}

// Card header row
function CardHeader({ entry, hov, isWp }: { entry: Entry; hov: boolean; isWp?: boolean }) {
  const col = STATUS_CLS[entry.status] ?? "rgba(255,255,255,0.3)";
  return (
    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"12px", marginBottom:"1rem", flexWrap:"wrap" as const }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px", flexWrap:"wrap" as const }}>
          <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.36em", color: isWp ? "rgba(243,186,47,0.7)" : "rgba(243,186,47,0.55)", border:`1px solid ${isWp ? "rgba(243,186,47,0.25)" : "rgba(243,186,47,0.15)"}`, padding:"2px 8px", textTransform:"uppercase" as const, whiteSpace:"nowrap" }}>
            {isWp ? "WHITE PAPER" : entry.category}
          </span>
          <time dateTime={`${entry.year}-01-01`} itemProp="datePublished" style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.3em", color:"rgba(255,255,255,0.2)" }}>
            {entry.year}
          </time>
        </div>
        <h3 itemProp="headline" style={{ fontSize:"clamp(1.1rem,3.2vw,1.45rem)", fontWeight:900, lineHeight:1.25, margin:0, color: hov ? (isWp ? "#F3BA2F" : "#fff") : "rgba(255,255,255,0.93)", transition:"color 0.25s ease" }}>
          {entry.title}
        </h3>
        <p style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.18em", color:"rgba(243,186,47,0.36)", marginTop:"6px", textTransform:"uppercase" }}>
          {entry.subtitle}
        </p>
      </div>
      <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.28em", border:`1px solid ${col}`, color:col, padding:"3px 8px", textTransform:"uppercase" as const, flexShrink:0, whiteSpace:"nowrap" }}>
        {entry.status}
      </span>
    </div>
  );
}

// ─── Card: Research / Artifacts ───────────────────────────────────────────────
// ─── Card: Article (journal/blog style with thumbnail) ──────────────────────
  function ArticleCard({ entry, i }: { entry: Entry; i: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [, setLocation] = useLocation();
    const excerpt = entry.abstract.length > 200 ? entry.abstract.slice(0, 200).trim() + "…" : entry.abstract;

    return (
      <motion.div ref={ref} initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}}
        transition={{ duration:0.65, delay:i*0.08, ease:[0.22,1,0.36,1] }}
        style={{ willChange:"transform, opacity", cursor:"pointer" }}
        onClick={() => setLocation(`/research/${entry.slug}`)}
      >
        <article style={{
          border:"1px solid rgba(243,186,47,0.12)",
          background:"rgba(0,0,0,0.97)",
          overflow:"hidden",
          transition:"all 0.28s ease",
        }}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.border="1px solid rgba(243,186,47,0.35)";el.style.boxShadow="0 8px 40px rgba(243,186,47,0.08)";}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.border="1px solid rgba(243,186,47,0.12)";el.style.boxShadow="none";}}
        >
          {/* Thumbnail */}
          {entry.thumbnail && (
            <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", overflow:"hidden", background:"#0a0a0a" }}>
              <img
                src={entry.thumbnail}
                alt={entry.title}
                style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block", transition:"transform 0.5s ease" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLImageElement).style.transform="scale(1.03)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLImageElement).style.transform="scale(1)";}}
                loading="lazy"
              />
              {/* Category badge overlay */}
              <div style={{ position:"absolute", top:"14px", left:"14px", background:"rgba(0,0,0,0.82)", backdropFilter:"blur(8px)", border:"1px solid rgba(243,186,47,0.4)", padding:"4px 10px" }}>
                <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.3em", color:"#F3BA2F", textTransform:"uppercase" }}>{entry.category}</span>
              </div>
              {entry.readTime && (
                <div style={{ position:"absolute", top:"14px", right:"14px", background:"rgba(0,0,0,0.82)", backdropFilter:"blur(8px)", padding:"4px 10px" }}>
                  <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.4)" }}>{entry.readTime}</span>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div style={{ padding:"clamp(1.25rem,3vw,1.75rem)" }}>
            {/* Tags */}
            <div style={{ display:"flex", flexWrap:"wrap" as const, gap:"5px", marginBottom:"1rem" }}>
              {entry.tags.slice(0,5).map(t => (
                <span key={t} style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.22em", padding:"2px 8px", border:"1px solid rgba(243,186,47,0.2)", color:"rgba(243,186,47,0.55)", textTransform:"uppercase" as const }}>#{t}</span>
              ))}
            </div>

            {/* Title */}
            <h3 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontWeight:700, fontSize:"clamp(1.15rem,2.8vw,1.55rem)", lineHeight:1.3, color:"rgba(255,255,255,0.92)", margin:"0 0 0.75rem 0", letterSpacing:"-0.01em" }}>
              {entry.title}
            </h3>

            {/* Subtitle */}
            {entry.subtitle && (
              <p style={{ color:"rgba(243,186,47,0.55)", fontSize:"12px", fontFamily:"monospace", letterSpacing:"0.05em", margin:"0 0 0.85rem 0", lineHeight:1.5, fontStyle:"italic" }}>
                {entry.subtitle}
              </p>
            )}

            {/* Excerpt */}
            <p style={{ color:"rgba(255,255,255,0.42)", fontSize:"clamp(0.85rem,2vw,0.95rem)", lineHeight:1.75, fontWeight:300, marginBottom:"1.25rem" }}>
              {excerpt}
            </p>

            {/* Footer meta */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap" as const, gap:"8px", paddingTop:"0.9rem", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <img src="/faisal-avatar.png" alt="Faisal Orakzai"
                  onError={(e)=>{ const el=e.target as HTMLImageElement; el.style.display="none"; const fb=el.parentElement?.querySelector(".card-fb") as HTMLElement; if(fb) fb.style.display="flex"; }}
                  style={{ width:"28px", height:"28px", borderRadius:"50%", objectFit:"cover", objectPosition:"center 15%", border:"1.5px solid rgba(243,186,47,0.45)", flexShrink:0 }} />
                <div className="card-fb" style={{ width:"28px", height:"28px", borderRadius:"50%", background:"linear-gradient(135deg,#F3BA2F,#c8900a)", display:"none", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"black", flexShrink:0 }}>F</div>
                <div>
                  <div style={{ fontSize:"12px", fontWeight:600, color:"rgba(255,255,255,0.72)", letterSpacing:"0.01em", fontFamily:"system-ui,sans-serif" }}>Faisal Orakzai</div>
                  <div style={{ fontFamily:"monospace", fontSize:"7px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.12em" }}>{entry.year} · Orakzai Research Lab</div>
                </div>
              </div>
              <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.25em", color:"#F3BA2F", textTransform:"uppercase" as const, opacity:0.7, display:"flex", alignItems:"center", gap:"4px" }}>
                READ ARTICLE
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6M5 2l3 3-3 3" stroke="#F3BA2F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </div>
        </article>
      </motion.div>
    );
  }

  function ResearchCard({ entry, i }: { entry: Entry; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hov, setHov] = useState(false);
  const itemType = entry.category === "ARTIFACTS & BLUEPRINTS" ? "https://schema.org/TechArticle" : "https://schema.org/ScholarlyArticle";

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, delay:i*0.08, ease:[0.22,1,0.36,1] }}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      style={{ willChange:"transform, opacity" }}>
      <article id={entry.id} itemScope itemType={itemType} style={{
        border:`1px solid ${hov ? "rgba(243,186,47,0.22)" : "rgba(243,186,47,0.1)"}`,
        background: hov ? "rgba(243,186,47,0.015)" : "rgba(0,0,0,0.97)",
        boxShadow: hov ? "0 0 30px rgba(243,186,47,0.08)" : "none",
        transition:"all 0.28s ease", transform:"translateZ(0)",
        padding:"clamp(1.25rem,3vw,2rem)",
      }}>
        <CardHeader entry={entry} hov={hov} />
        <p itemProp="abstract" style={{ color:"rgba(255,255,255,0.45)", fontSize:"clamp(0.9rem,2.4vw,1rem)", lineHeight:1.78, fontWeight:300, marginBottom:"1.25rem" }}>
          {entry.abstract}
        </p>
        {entry.tags.length > 0 && (
          <div style={{ ...G, marginBottom:"1rem" }}>
            {entry.tags.map(t => <span key={t} style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.2em", padding:"2px 8px", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.22)" }}>#{t}</span>)}
          </div>
        )}
        <footer>
          <div style={{ display:"flex", flexWrap:"wrap" as const, alignItems:"center", gap:"8px", marginBottom:"10px" }}>
            <address itemProp="author" itemScope itemType="https://schema.org/Person" style={{ fontStyle:"normal", fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.28em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase" }}>
              <span itemProp="name">{AUTHOR.name}</span>
            </address>
            <span style={{ color:"rgba(255,255,255,0.1)" }}>·</span>
            <a href={AUTHOR.orcid} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"monospace", fontSize:"7.5px", color:"rgba(166,206,57,0.65)", textDecoration:"none" }}>
              ORCID: {AUTHOR.orcidId} ↗
            </a>
            <div style={{ marginLeft:"auto" }}><PdfButton entry={entry} /></div>
          </div>
          <PlatformBadges />
        </footer>
      </article>
    </motion.div>
  );
}

// ─── Card: White Paper ────────────────────────────────────────────────────────
function WhitePaperCard({ entry, i }: { entry: Entry; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, delay:i*0.08, ease:[0.22,1,0.36,1] }}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      style={{ willChange:"transform, opacity" }}>
      <article id={entry.id} itemScope itemType="https://schema.org/ScholarlyArticle" style={{
        position:"relative", overflow:"hidden",
        border:`1px solid ${hov ? "rgba(243,186,47,0.35)" : "rgba(243,186,47,0.18)"}`,
        background:"rgba(0,0,0,0.98)",
        boxShadow: hov ? "0 0 40px rgba(243,186,47,0.1), inset 0 0 50px rgba(243,186,47,0.025)" : "none",
        transition:"all 0.28s ease", transform:"translateZ(0)",
        padding:"clamp(1.25rem,3vw,2rem)",
      }}>
        {([ {top:"8px",left:"8px",borderTop:"1px solid",borderLeft:"1px solid"},{top:"8px",right:"8px",borderTop:"1px solid",borderRight:"1px solid"},{bottom:"8px",left:"8px",borderBottom:"1px solid",borderLeft:"1px solid"},{bottom:"8px",right:"8px",borderBottom:"1px solid",borderRight:"1px solid"} ] as React.CSSProperties[]).map((s,ci)=>(
          <div key={ci} aria-hidden style={{ position:"absolute", width:"12px", height:"12px", borderColor:"rgba(243,186,47,0.3)", pointerEvents:"none", ...s }} />
        ))}
        <CardHeader entry={entry} hov={hov} isWp />
        <p itemProp="abstract" style={{ color:"rgba(255,255,255,0.45)", fontSize:"clamp(0.9rem,2.4vw,1rem)", lineHeight:1.78, fontWeight:300, marginBottom:"1.25rem" }}>
          {entry.abstract}
        </p>
        {entry.equations && entry.equations.length > 0 && (
          <section aria-label="Formal notation" style={{ marginBottom:"1.25rem", padding:"1rem 1.25rem", borderLeft:"2px solid rgba(243,186,47,0.3)", background:"rgba(243,186,47,0.03)" }}>
            <p style={{ fontFamily:"monospace", fontSize:"6.5px", letterSpacing:"0.42em", color:"rgba(243,186,47,0.45)", textTransform:"uppercase", margin:"0 0 10px 0" }}>
              Formal Notation
            </p>
            {entry.equations.map((eq, j) => (
              <p key={j} style={{ fontSize:"0.9rem", lineHeight:1.8, margin: j < (entry.equations!.length-1) ? "0 0 8px 0" : 0 }}>
                <MathText>{eq}</MathText>
              </p>
            ))}
          </section>
        )}
        <footer>
          <div style={{ display:"flex", flexWrap:"wrap" as const, alignItems:"center", gap:"8px", marginBottom:"10px" }}>
            <address itemProp="author" itemScope itemType="https://schema.org/Person" style={{ fontStyle:"normal", fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.28em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase" }}>
              <span itemProp="name">{AUTHOR.name}</span>
            </address>
            <span style={{ color:"rgba(255,255,255,0.1)" }}>·</span>
            <a href={AUTHOR.orcid} target="_blank" rel="noopener noreferrer" style={{ fontFamily:"monospace", fontSize:"7.5px", color:"rgba(166,206,57,0.65)", textDecoration:"none" }}>
              ORCID: {AUTHOR.orcidId} ↗
            </a>
            <div style={{ marginLeft:"auto" }}><PdfButton entry={entry} /></div>
          </div>
          <PlatformBadges />
        </footer>
      </article>
    </motion.div>
  );
}

// ─── Card: Repo ───────────────────────────────────────────────────────────────
function RepoCard({ entry, i }: { entry: Entry; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hov, setHov] = useState(false);
  const heat = heatmap(entry.id, 20);
  const live = entry.status === "ACTIVE";

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, delay:i*0.09, ease:[0.22,1,0.36,1] }}
      onHoverStart={()=>setHov(true)} onHoverEnd={()=>setHov(false)}
      style={{ willChange:"transform, opacity" }}>
      <article id={entry.id} itemScope itemType="https://schema.org/SoftwareSourceCode" style={{
        border:`1px solid ${hov ? "rgba(243,186,47,0.28)" : "rgba(243,186,47,0.1)"}`,
        background:"rgba(0,0,0,0.97)",
        boxShadow: hov ? "0 0 40px rgba(243,186,47,0.1)" : "none",
        transition:"all 0.28s ease", transform:"translateZ(0)",
        padding:"clamp(1.25rem,3vw,2rem)",
      }}>
        <header>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"12px", marginBottom:"1rem" }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
                <span style={{ display:"inline-block", width:"7px", height:"7px", borderRadius:"50%", flexShrink:0, background:live?"#4ade80":"#fbbf24", boxShadow:live?"0 0 6px rgba(74,222,128,0.7)":"0 0 6px rgba(251,191,36,0.7)", animation:"repoPulse 2s ease-in-out infinite" }} />
                <span style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.36em", textTransform:"uppercase", color:live?"rgba(74,222,128,0.75)":"rgba(251,191,36,0.65)" }}>{entry.status}</span>
                <time dateTime={`${entry.year}-01-01`} itemProp="dateCreated" style={{ fontFamily:"monospace", fontSize:"7px", color:"rgba(255,255,255,0.18)" }}>· {entry.year}</time>
              </div>
              <h3 itemProp="name" style={{ fontSize:"clamp(1.1rem,3.2vw,1.45rem)", fontWeight:900, lineHeight:1.25, color:"#fff", margin:0 }}>{entry.title}</h3>
              <p style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.16em", color:"rgba(243,186,47,0.32)", marginTop:"6px", textTransform:"uppercase" }}>{entry.subtitle}</p>
            </div>
            {entry.repoUrl && (
              <a href={entry.repoUrl} target="_blank" rel="noopener noreferrer" itemProp="codeRepository"
                style={{ fontFamily:"monospace", fontSize:"7px", letterSpacing:"0.2em", border:"1px solid rgba(243,186,47,0.2)", color:"rgba(243,186,47,0.5)", padding:"5px 12px", textDecoration:"none", flexShrink:0, whiteSpace:"nowrap", transition:"all 0.2s ease" }}
                onMouseEnter={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.borderColor="rgba(243,186,47,0.6)";a.style.color="#F3BA2F";}}
                onMouseLeave={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.borderColor="rgba(243,186,47,0.2)";a.style.color="rgba(243,186,47,0.5)";}}
              >GITHUB ↗</a>
            )}
          </div>
        </header>
        <p itemProp="description" style={{ color:"rgba(255,255,255,0.4)", fontSize:"clamp(0.9rem,2.4vw,1rem)", lineHeight:1.78, fontWeight:300, marginBottom:"1.25rem" }}>{entry.abstract}</p>
        <section aria-label="Commit activity" style={{ marginBottom:"1.25rem" }}>
          <p style={{ fontFamily:"monospace", fontSize:"6.5px", letterSpacing:"0.36em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase", margin:"0 0 8px 0" }}>Commit Activity · {entry.commits}</p>
          <div role="img" aria-label="commit heatmap" style={{ display:"flex", gap:"2px", transform:"translateZ(0)", overflow:"hidden" }}>
            {Array.from({length:20},(_,col)=>(
              <div key={col} style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
                {Array.from({length:5},(_,row)=>{
                  const val = heat[col*5+row];
                  return <div key={row} style={{ width:"10px", height:"10px", borderRadius:"2px", background:val>0.75?"#F3BA2F":val>0.5?"rgba(243,186,47,0.52)":val>0.25?"rgba(243,186,47,0.2)":"rgba(255,255,255,0.04)" }} />;
                })}
              </div>
            ))}
          </div>
        </section>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"1.25rem" }}>
          {[{label:"DEPLOY",val:entry.deploy},{label:"DATABASE",val:entry.db}].map(m=>(
            <div key={m.label} style={{ border:"1px solid rgba(255,255,255,0.05)", padding:"8px 12px" }}>
              <p style={{ fontFamily:"monospace", fontSize:"6px", letterSpacing:"0.4em", color:"rgba(255,255,255,0.16)", textTransform:"uppercase", margin:"0 0 4px 0" }}>{m.label}</p>
              <p style={{ fontFamily:"monospace", fontSize:"8.5px", letterSpacing:"0.14em", color:"rgba(243,186,47,0.7)", margin:0 }}>{m.val}</p>
            </div>
          ))}
        </div>
        <footer style={{ paddingTop:"12px", borderTop:"1px solid rgba(255,255,255,0.05)", display:"flex", flexWrap:"wrap" as const, alignItems:"center", justifyContent:"space-between", gap:"8px" }}>
          <ul style={{ display:"flex", flexWrap:"wrap" as const, gap:"6px", listStyle:"none", padding:0, margin:0 }} itemProp="programmingLanguage">
            {entry.stack?.map(s=><li key={s}><span style={{ fontFamily:"monospace", fontSize:"7px", padding:"2px 8px", border:"1px solid rgba(243,186,47,0.1)", color:"rgba(243,186,47,0.4)" }}>{s}</span></li>)}
          </ul>
          <span style={{ fontFamily:"monospace", fontSize:"6.5px", letterSpacing:"0.28em", border:"1px solid rgba(243,186,47,0.16)", color:"rgba(243,186,47,0.45)", padding:"3px 8px", textTransform:"uppercase" }}>[GITHUB LIVE SECURED]</span>
        </footer>
      </article>
    </motion.div>
  );
}

// ─── Page frame ───────────────────────────────────────────────────────────────
function Frame() {
  return (
    <>
      {[{left:"4px"},{right:"4px"}].map((pos,i)=>(
        <div key={i} aria-hidden style={{ position:"fixed", top:0, ...pos, width:"1px", height:"100vh", background:"linear-gradient(to bottom,transparent 5%,rgba(243,186,47,0.07) 30%,rgba(243,186,47,0.07) 70%,transparent 95%)", pointerEvents:"none", zIndex:5 }} />
      ))}
      {([{top:"14px",left:"8px"},{top:"14px",right:"8px"},{bottom:"14px",left:"8px"},{bottom:"14px",right:"8px"}] as React.CSSProperties[]).map((pos,i)=>(
        <div key={i} aria-hidden style={{ position:"fixed", ...pos, width:"14px", height:"14px", pointerEvents:"none", zIndex:5 }}>
          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"1px", background:"rgba(243,186,47,0.45)", transform:"translateY(-50%)" }} />
          <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:"1px", background:"rgba(243,186,47,0.45)", transform:"translateX(-50%)" }} />
        </div>
      ))}
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Research() {
  useSEO();
  const [active, setActive] = useState<Filter>("ALL INTEL");
  const filtered = ENTRIES.filter(e =>
      active === "ALL INTEL" ? true :
      active === "MARKET KNOWLEDGE" ? (e.category === "MARKET KNOWLEDGE" || e.category === "BLOCKCHAIN") :
      e.category === active
    );
    const counts = Object.fromEntries(FILTERS.map(f =>
      [f, f === "ALL INTEL" ? ENTRIES.length :
          f === "MARKET KNOWLEDGE" ? ENTRIES.filter(e => e.category === "MARKET KNOWLEDGE" || e.category === "BLOCKCHAIN").length :
          ENTRIES.filter(e => e.category === f).length]
    ));

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style>{`
        @keyframes repoPulse{0%,100%{opacity:.5}50%{opacity:1}}
        .frib{overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;scrollbar-width:none;white-space:nowrap;-webkit-mask-image:linear-gradient(to right,black 82%,transparent 100%);mask-image:linear-gradient(to right,black 82%,transparent 100%)}
        .frib::-webkit-scrollbar{display:none}
        .fbt{background:none;border:none;cursor:pointer;position:relative}
        .fbt:hover span:not([data-bar]){opacity:.75}
      `}</style>
      <Frame />
      <div aria-hidden style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",background:"radial-gradient(ellipse 80% 40% at 50% 0%,rgba(243,186,47,0.04) 0%,transparent 70%)" }} />

      {/* HERO */}
      <header className="pt-28 pb-8 relative z-10">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div initial="h" animate="s" variants={{ s:{transition:{staggerChildren:0.09}} }}>
            <motion.div variants={{ h:{opacity:0,y:14},s:{opacity:1,y:0,transition:{duration:0.55}} }}
              style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"1.5rem" }}>
              <div style={{ height:"1px",width:"28px",background:"#F3BA2F",flexShrink:0 }} />
              <span style={{ fontFamily:"monospace",fontSize:"8px",letterSpacing:"0.5em",color:"#F3BA2F",textTransform:"uppercase" }}>Research Lab</span>
              <div style={{ height:"1px",flex:1,background:"rgba(243,186,47,0.1)" }} />
              <span style={{ fontFamily:"monospace",fontSize:"7px",letterSpacing:"0.3em",color:"rgba(255,255,255,0.14)" }}>NODE: KARACHI · PK</span>
            </motion.div>
            <motion.h1
              variants={{ h:{opacity:0,y:22},s:{opacity:1,y:0,transition:{duration:0.75,ease:[0.22,1,0.36,1]}} }}
              style={{ fontWeight:900,textTransform:"uppercase",lineHeight:0.95,margin:0,fontSize:"clamp(2.2rem,9vw,6rem)",letterSpacing:"-0.025em" }}>
              CENTRAL KNOWLEDGE<br />
              <span style={{ background:"linear-gradient(135deg,#F3BA2F 0%,#ffe47a 50%,#c8900a 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
                REPOSITORY
              </span>
            </motion.h1>
            <motion.p variants={{ h:{opacity:0},s:{opacity:1,transition:{duration:0.5,delay:0.15}} }}
              style={{ fontFamily:"monospace",color:"rgba(255,255,255,0.22)",fontSize:"11px",letterSpacing:"0.3em",textTransform:"uppercase",marginTop:"1.25rem",lineHeight:1.7,maxWidth:"340px" }}>
              Market intel · Protocol blueprints ·<br/>Cryptographic papers · Live nodes
            </motion.p>
          </motion.div>

          {/* Profile PDF + Authority badges */}
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.4,duration:0.5}}
            style={{ display:"flex",flexWrap:"wrap",gap:"8px",marginTop:"1.75rem",alignItems:"center" }}>
            <a href={DOCS.profile.view} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"monospace",fontSize:"7.5px",letterSpacing:"0.32em",border:"1px solid rgba(243,186,47,0.5)",color:"#F3BA2F",padding:"8px 16px",textDecoration:"none",textTransform:"uppercase",background:"rgba(243,186,47,0.06)",transition:"all 0.2s ease",display:"inline-flex",alignItems:"center",gap:"6px" }}
              onMouseEnter={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.background="rgba(243,186,47,0.14)";}}
              onMouseLeave={e=>{const a=e.currentTarget as HTMLAnchorElement;a.style.background="rgba(243,186,47,0.06)";}}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v6M2 4.5l3 3 3-3M1 9h8" stroke="#F3BA2F" strokeWidth="1.1" strokeLinecap="round"/></svg>
              DOWNLOAD PROFILE PDF
            </a>
            {([
              ["ORCID",AUTHOR.orcidId,AUTHOR.orcid,"rgba(166,206,57,0.8)"],
              ["SCHOLAR","TRACEABLE",AUTHOR.scholar,"rgba(66,133,244,0.8)"],
              ["LINKEDIN","CONNECT",AUTHOR.linkedin,"rgba(10,102,194,0.8)"],
              ["HACKERNOON","PUBLISHED",AUTHOR.hackernoon,"rgba(0,209,130,0.75)"],
              ["GITHUB","LAB",AUTHOR.github,"rgba(243,186,47,0.8)"],
            ] as [string,string,string,string][]).map(([label,sub,href,col])=>(
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex",alignItems:"center",gap:"7px",padding:"7px 12px",border:"1px solid rgba(255,255,255,0.08)",textDecoration:"none",transition:"border-color 0.2s ease",minHeight:"38px" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor=col;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(255,255,255,0.08)";}}
              >
                <span style={{ width:"5px",height:"5px",borderRadius:"50%",background:col,flexShrink:0 }} />
                <div>
                  <p style={{ fontFamily:"monospace",fontSize:"6.5px",letterSpacing:"0.28em",color:"rgba(255,255,255,0.55)",textTransform:"uppercase",margin:0,lineHeight:1.3 }}>{label}</p>
                  <p style={{ fontFamily:"monospace",fontSize:"5.5px",letterSpacing:"0.18em",color:"rgba(255,255,255,0.25)",textTransform:"uppercase",margin:0,lineHeight:1.3 }}>{sub}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </header>

      {/* FILTER RIBBON */}
      <nav aria-label="Knowledge categories" style={{ position:"sticky",top:"64px",zIndex:20,background:"rgba(0,0,0,0.96)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid rgba(243,186,47,0.1)" }}>
        <div className="max-w-5xl mx-auto px-5">
          <div className="frib" role="tablist" style={{ display:"flex",marginBottom:"-1px" }}>
            {FILTERS.map(f=>{
              const isA=active===f;
              return (
                <button key={f} role="tab" aria-selected={isA} onClick={()=>setActive(f)} className="fbt"
                  style={{ display:"inline-flex",alignItems:"center",gap:"5px",padding:"0 16px",minHeight:"52px",fontFamily:"monospace",fontSize:"8.5px",letterSpacing:"0.28em",textTransform:"uppercase",whiteSpace:"nowrap",color:isA?"#F3BA2F":"rgba(255,255,255,0.28)",transition:"color 0.2s ease" }}>
                  {f} <span style={{ opacity:0.45,fontSize:"7.5px" }}>({counts[f]})</span>
                  {isA && <motion.span layoutId="filter-bar" data-bar style={{ position:"absolute",bottom:0,left:"8px",right:"8px",height:"1px",background:"#F3BA2F",boxShadow:"0 0 8px rgba(243,186,47,0.9)" }} />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ENTRIES */}
      <main role="tabpanel" aria-label={active} className="py-8 pb-24 relative z-10">
        <div className="max-w-5xl mx-auto px-5 space-y-4">
          {filtered.length === 0 && (
            <p role="status" style={{ textAlign:"center",padding:"5rem 0",fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.4em",color:"rgba(255,255,255,0.14)",textTransform:"uppercase" }}>
              No entries in this category
            </p>
          )}
          {filtered.map((entry, i) => {
            if (entry.category === "CRYPTOGRAPHIC WHITE PAPERS") return <WhitePaperCard key={entry.id} entry={entry} i={i} />;
            if (entry.category === "PRODUCTION CODE")             return <RepoCard       key={entry.id} entry={entry} i={i} />;
            if (entry.slug)                                        return <ArticleCard    key={entry.id} entry={entry} i={i} />;
            return                                                       <ResearchCard   key={entry.id} entry={entry} i={i} />;
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="pb-16 relative z-10">
        <div className="max-w-5xl mx-auto px-5">
          <div style={{ display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"12px",paddingTop:"1.5rem",borderTop:"1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ fontFamily:"monospace",color:"rgba(255,255,255,0.1)",fontSize:"8px",letterSpacing:"0.3em",textTransform:"uppercase",margin:0 }}>
              {AUTHOR.name} · {AUTHOR.org} · ORCID: {AUTHOR.orcidId}
            </p>
            <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
              <span className="animate-pulse" style={{ width:"6px",height:"6px",borderRadius:"50%",background:"#F3BA2F",display:"inline-block" }} />
              <span style={{ fontFamily:"monospace",fontSize:"8px",letterSpacing:"0.28em",color:"rgba(243,186,47,0.4)",textTransform:"uppercase" }}>{ENTRIES.length} ENTRIES · INDEXING ACTIVE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
