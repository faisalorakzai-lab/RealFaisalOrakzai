/**
   * CENTRAL KNOWLEDGE REPOSITORY
   * Full semantic HTML5 + Dublin Core + Citation meta + JSON-LD per entry
   * Mobile-first responsive with hardware-accelerated transitions
   */

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
    slug?: string;
    thumbnail?: string;
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
      slug: "blockchain-basic",
      thumbnail: "/mk/blockchain-guide.png",

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



  // ─── Luxury Fonts (once) ─────────────────────────────────────────────────────
  function useMKFonts() {
    useEffect(() => {
      if (document.getElementById("mk-fonts")) return;
      const l = document.createElement("link");
      l.id = "mk-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap";
      document.head.appendChild(l);
    }, []);
  }


  // ─── Magazine Card (MARKET KNOWLEDGE) ────────────────────────────────────────
  function MagazineCard({ entry, i }: { entry: Entry; i: number }) {
    const [hov, setHov] = useState(false);
    const isFeatured = !!entry.thumbnail;
    useMKFonts();
    const basePath = (import.meta.env.BASE_URL || "").replace(/\/$/, "");

    const AbstractBg = () => (
      <div style={{ width:"100%", height:"100%", background:"linear-gradient(160deg,#0c0c0c 0%,#0d1117 50%,#0a0800 100%)", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(243,186,47,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(243,186,47,0.06) 1px, transparent 1px)", backgroundSize:"24px 24px" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity:0.18 }}>
            <rect x="30" y="30" width="20" height="20" stroke="#F3BA2F" strokeWidth="1"/>
            <rect x="20" y="20" width="40" height="40" stroke="#F3BA2F" strokeWidth="0.5"/>
            <line x1="40" y1="0" x2="40" y2="80" stroke="#F3BA2F" strokeWidth="0.5"/>
            <line x1="0" y1="40" x2="80" y2="40" stroke="#F3BA2F" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="28" stroke="#F3BA2F" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="4" fill="#F3BA2F"/>
          </svg>
        </div>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center, rgba(243,186,47,0.05) 0%, transparent 65%)" }} />
      </div>
    );

    return (
      <motion.article
        id={entry.id}
        initial={{ opacity:0, y:30 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.65, delay: i * 0.1, ease:[0.22,1,0.36,1] }}
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        onClick={() => entry.slug && (window.location.href = basePath + "/research/" + entry.slug)}
        style={{
          gridColumn: isFeatured ? "1 / -1" : "span 1",
          position:"relative", cursor: entry.slug ? "pointer" : "default",
          overflow:"hidden", display:"flex", flexDirection:"column",
          border: hov ? "1px solid rgba(243,186,47,0.45)" : "1px solid rgba(243,186,47,0.1)",
          transition:"border-color 0.3s, box-shadow 0.3s",
          boxShadow: hov ? "0 8px 48px rgba(243,186,47,0.06)" : "none",
          background:"#080808",
        }}
      >
        {/* ── Thumbnail (top, full width) ── */}
        <div style={{ position:"relative", height: isFeatured ? "clamp(260px, 40vw, 460px)" : "200px", overflow:"hidden", flexShrink:0 }}>
          {entry.thumbnail ? (
            <img
              src={entry.thumbnail}
              alt={entry.title}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.9s ease", transform: hov ? "scale(1.04)" : "scale(1)" }}
            />
          ) : (
            <AbstractBg />
          )}
          {/* Subtle bottom fade to match card bg */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"40%", background:"linear-gradient(to top, #080808, transparent)" }} />
          {/* Category pill top-left */}
          <div style={{ position:"absolute", top:"1rem", left:"1rem" }}>
            <span style={{ fontFamily:"monospace", fontSize:"8px", letterSpacing:"0.25em", color:"#F3BA2F", textTransform:"uppercase", background:"rgba(0,0,0,0.75)", padding:"0.3rem 0.6rem", border:"1px solid rgba(243,186,47,0.25)", backdropFilter:"blur(4px)" }}>
              {entry.category}
            </span>
          </div>
        </div>

        {/* ── Text content (below image) ── */}
        <div style={{ padding: isFeatured ? "1.75rem 1.75rem 2rem" : "1.25rem 1.25rem 1.5rem", display:"flex", flexDirection:"column", flex:1 }}>
          
          {/* Year */}
          <span style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.2em", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", display:"block", marginBottom:"0.75rem" }}>
            {entry.year}
          </span>

          {/* Title */}
          <h2 style={{
            fontFamily:"'Playfair Display', Georgia, serif",
            fontSize: isFeatured ? "clamp(1.35rem, 3vw, 2rem)" : "clamp(1rem, 2vw, 1.2rem)",
            fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:"0.75rem",
            letterSpacing:"-0.01em",
          }}>
            {entry.title}
          </h2>

          {/* Subtitle (featured only) */}
          {entry.subtitle && isFeatured && (
            <p style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"0.95rem", color:"rgba(243,186,47,0.65)", lineHeight:1.6, marginBottom:"0.85rem", fontStyle:"italic", fontWeight:300 }}>
              {entry.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p style={{
            fontFamily:"'Cormorant Garamond', Georgia, serif",
            fontSize: isFeatured ? "1rem" : "0.875rem",
            color:"rgba(255,255,255,0.5)", lineHeight:1.7,
            marginBottom:"1.25rem", fontWeight:300, flex:1,
            display:"-webkit-box", WebkitLineClamp: isFeatured ? 3 : 2, overflow:"hidden", ...({"WebkitBoxOrient":"vertical"} as Record<string,unknown>),
          }}>
            {entry.abstract}
          </p>

          {/* Gold divider */}
          <div style={{ height:"1px", background:"linear-gradient(90deg, rgba(243,186,47,0.3) 0%, transparent 100%)", marginBottom:"1.1rem" }} />

          {/* Read Article CTA */}
          <motion.div
            animate={{ x: hov ? 5 : 0 }}
            transition={{ duration:0.2 }}
            style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem" }}
          >
            <span style={{ fontFamily:"monospace", fontSize:"10px", letterSpacing:"0.22em", color:"#F3BA2F", textTransform:"uppercase" }}>
              READ ARTICLE
            </span>
            <span style={{ fontSize:"14px", color:"#F3BA2F" }}>→</span>
          </motion.div>
        </div>
      </motion.article>
    );
  }


  function ResearchCard({ entry, i }: { entry: Entry; i: number }) {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const [hov, setHov] = useState(false);

    return (
      <motion.article
        ref={ref}
        id={entry.id}
        style={{ gridColumn: "1 / -1" }}
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

            <PlatformBadges entryId={entry.id} />
          </footer>
        </motion.div>

            <PlatformBadges entryId={entry.id} />
          </footer>
        </motion.div>

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
          <div className="max-w-5xl mx-auto px-5" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.25rem", alignItems:"start" }}>
            {filtered.length === 0 && (
              <p role="status" className="text-center py-20 font-mono text-sm tracking-[0.4em] text-white/20 uppercase">
                No entries in this category
              </p>
            )}
            {filtered.map((entry, i) => {
              if (entry.category === "CRYPTOGRAPHIC WHITE PAPERS") return <WhitePaperCard key={entry.id} entry={entry} i={i} />;
              if (entry.category === "PRODUCTION CODE")             return <RepoCard       key={entry.id} entry={entry} i={i} />;
              if (entry.category === "MARKET KNOWLEDGE")            return <MagazineCard   key={entry.id} entry={entry} i={i} />;
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
  