import { motion, AnimatePresence } from "framer-motion";
  import { useState, useEffect } from "react";
  import SEOHead from "@/components/shared/SEOHead";

  /* ============================================================
     ORAKZAI SOVEREIGN ECOSYSTEM
     Orbital Node Design · Live Cores · Under Development · Organizations
     ============================================================ */

  const GOLD = "#F3BA2F";
  const GOLD_DIM = "rgba(243,186,47,0.15)";

  /* ── Live Core data ──────────────────────────────────────── */
  const LIVE_CORES = [
    {
      id: "okbond", name: "Orakzai Bond", ticker: "OKBOND",
      logo: "/logos/okbond.png", url: "https://orakzaibond.com",
      tag: "POLYGON L2", status: "LIVE", statusColor: "#00ff88",
      desc: "Decentralized Treasury Protocol. 10M max supply, treasury-backed capital protection on Polygon.",
      angle: 270,
    },
    {
      id: "shamim", name: "Shamim Forever", ticker: "SHF",
      logo: "/logos/shamim-forever.jpg", url: "https://www.shamimforever.com",
      tag: "LUXURY · WEB3", status: "LIVE", statusColor: "#00ff88",
      desc: "Elite luxury heritage brand — museum-grade perfumes, sapphire jewelry, cryptographic provenance.",
      angle: 30,
    },
    {
      id: "okzbyte", name: "OkzByte Technology", ticker: "OKZDEV",
      logo: "/logos/okzbyte.png", url: "https://github.com/faisalorakzai-lab",
      tag: "ENGINEERING · AI", status: "ACTIVE", statusColor: GOLD,
      desc: "High-throughput technical stack & engineering engine powering the entire Orakzai infrastructure.",
      angle: 150,
    },
  ];

  /* ── Under Development data ──────────────────────────────── */
  const UNDER_DEV = [
    {
      id: "qorix", name: "QORIX", ticker: "QRX",
      logo: "/logos/qorix.png",
      tag: "AI · FINANCE",
      desc: "Autonomous Financial Management AI System — algorithmic treasury ops and yield optimization.",
      statusColor: "#60a5fa",
    },
    {
      id: "orakzai-properties", name: "Orakzai Properties", ticker: "ORP",
      logo: "/logos/orakzai-properties.png",
      tag: "REAL ESTATE",
      desc: "Assets of Today | Legacies of Tomorrow — premium real estate and property investment platform.",
      statusColor: "#f97316",
    },
    {
      id: "otc", name: "Orakzai Transport Corp", ticker: "OTC",
      logo: "/logos/otc.png",
      tag: "TRANSPORT · MOBILITY",
      desc: "Premium transportation and logistics arm of the Orakzai Group sovereign infrastructure.",
      statusColor: GOLD,
    },
    {
      id: "psc-exchange", name: "PSC Exchange", ticker: "PSC",
      logo: "/logos/psc-exchange.png",
      tag: "BLOCKCHAIN · FINTECH",
      desc: "Pak Stock Chain — decentralized exchange bridging Pakistan's capital markets with blockchain.",
      statusColor: "#a78bfa",
    },
    {
      id: "orakzaix", name: "OrakzaiX", ticker: "OKX",
      logo: "/logos/orakzaix.png",
      tag: "AI · AUTOMATION",
      desc: "Next-generation AI automation and intelligence platform for the Orakzai sovereign ecosystem.",
      statusColor: "#2dd4bf",
    },
    {
      id: "orakzai-empire", name: "Orakzai Empire", ticker: "OKE",
      logo: "/logos/orakzai-empire.png",
      tag: "HERITAGE · SOVEREIGN",
      desc: "The sovereign heritage brand — carrying the legacy, vision, and identity of the Orakzai lineage.",
      statusColor: GOLD,
    },
  ];

  /* ── Organizations / Foundations ─────────────────────────── */
  const ORGANIZATIONS = [
      {
        id: "pihro", name: "PIHRO", ticker: "PIHRO",
        logo: null,
        tag: "HUMAN RIGHTS · PAKISTAN",
        desc: "Pakistan International Human Rights Organisation — Chairman Habib Malik Orakzai · Karachi Chairman Faisal Orakzai.",
        statusColor: "#60a5fa",
      },
      {
        id: "son-of-orakzai", name: "Son of Orakzai", ticker: "SOO",
        logo: "/logos/son-of-orakzai.jpg",
        tag: "ORGANIZATION",
        desc: "Son of Orakzai — a community and heritage organization representing the proud Orakzai identity.",
        statusColor: "#4ade80",
      },
    ];

  
  /* ── Venture detail panels ───────────────────────────────── */
  const VENTURE_DETAILS: Record<string, {
    title: string; bio: string; description: string;
    uniqueFeatures: string[]; benefits: { label: string; desc: string }[];
    roadmap: { module: string; desc: string }[];
    pdfUrl?: string; githubUrl?: string; socialUsername?: string;
  }> = {
    "qorix": {
        title: "Multi-agent AI Intelligence Platform: GPT-4o + LangGraph for Enterprise Automation",
        bio: "Qorix is a next-generation AI orchestration platform designed for enterprise ecosystems. It leverages multi-agent AI systems to automate complex workflows, generate critical insights, and operate business infrastructure efficiently — minimizing human intervention and bottlenecks. Built to provide sovereign infrastructure for advanced AI applications.",
        description: "Powered by a robust modern stack: Intelligence Layer (GPT-4o + Claude 3.5) for reasoning and generation; LangGraph + CrewAI for multi-agent pipelines and coordination; FastAPI + TypeScript as a unified API gateway; Vector DB (pgvector) for persistent agent memory across sessions; and n8n + custom workers for workflow automation. Designed to serve Real Estate, Perfume E-commerce, Blockchain, and enterprise Operations at scale.",
        uniqueFeatures: [
          "Multi-agent orchestration with GPT-4o + Claude 3.5 reasoning",
          "LangGraph + CrewAI for interconnected AI agent pipelines",
          "Persistent memory via Vector DB (pgvector) — context-aware agents",
          "Unified API gateway (FastAPI + TypeScript) for seamless enterprise integration",
          "End-to-end workflow automation via n8n + custom workers",
          "6 specialized agents: Research, Content, Financial, OPS, Comms, Code",
        ],
        benefits: [
          { label: "Increased Efficiency", desc: "Automates complex and repetitive tasks, freeing human resources to focus on strategic initiatives and dramatically boosting enterprise productivity." },
          { label: "Enhanced Decision-Making", desc: "Real-time AI-generated insights — especially in financial and research domains — enable more informed, data-driven decisions." },
          { label: "Cost Reduction", desc: "Automation of workflows and operational tasks delivers substantial and measurable cost savings for businesses at scale." },
          { label: "Innovation & Scalability", desc: "Modular architecture enables rapid deployment of new AI applications and seamless integration into diverse business environments." },
          { label: "Reduced Human Error", desc: "Automated systems perform tasks with higher accuracy and consistency than manual processes, improving overall output quality." },
          { label: "Democratization of AI", desc: "Makes advanced multi-agent AI capabilities accessible to enterprises without requiring extensive in-house AI expertise." },
        ],
        roadmap: [
          { module: "Core Multi-Agent Orchestration Engine", desc: "Development of the foundational orchestration layer connecting GPT-4o, Claude 3.5, LangGraph, and CrewAI agents into coherent pipelines." },
          { module: "API Gateway & Authentication Layer", desc: "Implementation of a unified FastAPI + TypeScript gateway with enterprise-grade authentication and rate limiting." },
          { module: "Production Deployment — Phase 1 (Q3 2025)", desc: "Full production rollout with enterprise client onboarding pipeline, SLA guarantees, and monitoring dashboards." },
          { module: "Custom LLM Fine-Tuning", desc: "Fine-tuning language models on ORAKZAI domain-specific data — real estate, fintech, and operations — for superior contextual performance." },
          { module: "Real-Time Decision Intelligence Dashboard", desc: "Live monitoring dashboard tracking agent performance, KPIs, system health, and AI-driven decision outcomes in real time." },
        ],
        githubUrl: "https://github.com/faisalorakzai-lab/Adamorakzaix",
      },
      "orakzai-properties": {
      title: "Pakistan's Premier Real Estate Tokenization & Investment Platform",
      bio: "Orakzai Properties is a prominent platform in Pakistan for tokenized real estate and property investment. It bridges physical land assets and blockchain-based ownership — enabling fractional investment, transparent title, and 24/7 liquidity.",
      description: "A PropTech and DeFi solution that digitalizes Pakistan's real estate market. Investments start from as low as PKR 50,000 using ERC-1155 fractional property tokens on the Polygon Network, with on-chain title deeds and automatic rental yield distribution via smart contracts. Focused on Lahore and Islamabad markets with plans for national expansion.",
      uniqueFeatures: [
        "Fractional ownership from PKR 50,000",
        "Blockchain title deeds — immutable & transparent on Polygon",
        "Automated monthly rental yield via smart contracts",
        "Secondary marketplace for exit liquidity",
        "ERC-1155 standard fractional property tokens",
      ],
      benefits: [
        { label: "Financial Inclusion", desc: "Allows small investors to participate in real estate for the first time." },
        { label: "Transparency & Trust", desc: "Blockchain ownership records reduce fraud risk and title disputes." },
        { label: "Increased Liquidity", desc: "Fractional tokens make real estate assets easily tradeable." },
        { label: "Economic Growth", desc: "Promotes investment and introduces new PropTech business models." },
        { label: "Innovation in PropTech", desc: "Integrates DeFi and blockchain into Pakistan's traditional property industry." },
      ],
      roadmap: [
        { module: "Module 6 — Elite Rental Engine", desc: "Full rental management with filters (Furnished Status, Occupancy Type, Duration), WhatsApp tenant–owner chat, and availability controls." },
        { module: "Module 14 — Subscription & Monetization", desc: "Three tiers — Free, Premium, Sovereign — with wallet-based payments, listing limits, and a full checkout flow." },
        { module: "Module 15 — Lead Management for Agents", desc: "Track leads by status (New, Contacted, Visit Scheduled, Negotiation, Closed) and score (Hot, Warm, Cold), with call logs, real-time chat, and performance analytics." },
      ],
      pdfUrl: "https://drive.google.com/file/d/1YTdi9b7eL6ECuBtkSZlbhJZsX-F0paI3/view?usp=drivesdk",
      githubUrl: "https://github.com/faisalorakzai-lab/Orakzai-Properties",
    },
      "otc": {
        title: "Multi-Service On-Demand Platform — Rides, Flights, Hotels & Real-Time Bidding",
        bio: "Orakzai Transport Corporation (OTC) is a dynamic mobile application built on Expo and React Native, serving as a comprehensive platform for on-demand services. OTC integrates ride-sharing, flight and hotel bookings, rentals, and a unique real-time bidding system — all supported by robust backend infrastructure and instant communication. It is the premium transportation and logistics arm of the Orakzai Group sovereign infrastructure.",
        description: "Built with Expo, React Native, and TypeScript for seamless cross-platform performance, OTC functions as a multi-service platform encompassing rides, flight reservations, hotel bookings, and rental accommodations. A standout feature is its integrated real-time bidding system powered by Ably — users request services and providers bid instantly. The backend runs on Supabase for secure authentication, scalable data storage, and real-time sync. Dedicated interfaces serve end-users, service providers (drivers), and administrators separately for optimal UX across all stakeholders.",
        uniqueFeatures: [
          "Integrated multi-service platform — rides, flights, hotels, rentals, and live bidding in one app",
          "Real-time bidding system powered by Ably — instant updates for requests, bids, and ride statuses",
          "Distinct optimized interfaces for users, drivers/service providers, and platform administrators",
          "Supabase backend for secure authentication, scalable data storage, and real-time synchronization",
          "Cross-platform Expo + React Native + TypeScript stack for high-performance iOS & Android experience",
          "AI-driven matching algorithms (roadmap) for optimized service allocation and dynamic pricing",
        ],
        benefits: [
          { label: "Enhanced Convenience", desc: "Centralizing multiple on-demand services simplifies daily logistics and travel planning, saving users significant time and effort." },
          { label: "Economic Empowerment", desc: "Creates flexible earning opportunities for service providers, contributing to local economies through an open bidding model." },
          { label: "Optimized Resource Utilization", desc: "Real-time demand-supply matching optimizes use of vehicles and accommodations, reducing waste and idle capacity." },
          { label: "Improved Accessibility", desc: "Provides a comprehensive digital platform for essential services, particularly impactful where traditional service infrastructure is limited." },
          { label: "Innovation Showcase", desc: "Demonstrates how mobile development, real-time communication, and scalable backends combine to create impactful consumer solutions." },
        ],
        roadmap: [
          { module: "Core Service Refinement (0–6 months)", desc: "Refine existing modules (rides, flights, hotels, rentals), optimize real-time bidding and communication, enhance UX for providers and customers." },
          { module: "AI Integration (6–18 months)", desc: "Introduce AI for personalized recommendations, dynamic pricing, and efficient resource matching. Explore blockchain for transaction security." },
          { module: "Global Scale (18+ months)", desc: "Scale to a global user base, build an ecosystem for third-party service integrations, and establish OTC as the industry standard for multi-service on-demand platforms." },
        ],
        githubUrl: "https://github.com/faisalorakzai-lab/otc",
        socialUsername: "okzotc",
      },

      "orakzaix": {
        title: "Sovereign Intelligence System — AI, Blockchain & Autonomous Digital Services (Est. 14 April 2024)",
        bio: "OrakzaiX is a cutting-edge, multi-faceted platform harnessing advanced Artificial Intelligence, Blockchain, and integrated digital services. Active since 14 April 2024, it serves as a sovereign intelligence system offering autonomous operations, predictive analytics, market intelligence, and creative content generation. Built with modularity and scalability at its core, OrakzaiX provides a robust intelligent ecosystem for diverse applications — from enterprise automation to personal AI assistance.",
        description: "OrakzaiX features a powerful API server orchestrating AI-driven reasoning (ORACLE), market intelligence (TRADER), legal AI, image generation (SENTINEL), and emotional AI (COACH). It integrates with Claude AI, Alchemy (blockchain), CoinMarketCap (crypto data), WhatsApp, Cloudinary, and GitHub — creating a comprehensive multi-service intelligence platform. The Sovereign Intelligence Dashboard provides real-time monitoring and control over all AI models and system health. Since its founding on 14 April 2024, OrakzaiX has operated continuously as the intelligent backbone of the Orakzai Group ecosystem.",
        uniqueFeatures: [
          "Founded 14 April 2024 — continuously operational sovereign AI system since inception",
          "Comprehensive AI model suite: ORACLE (reasoning), TRADER (market AI), SENTINEL (image gen), COACH (emotional AI)",
          "Advanced blockchain integration — multi-chain capabilities and digital asset management via Alchemy",
          "Sovereign Intelligence Dashboard — real-time monitoring and control center for all AI models and system health",
          "Autonomous and self-correcting systems — platform adapts and optimizes performance dynamically without manual intervention",
          "Extensive external integrations: Claude, CoinMarketCap, WhatsApp, Cloudinary, GitHub, and more",
        ],
        benefits: [
          { label: "Enhanced Decision-Making", desc: "Powerful predictive analytics and deep intelligence empower organizations and individuals to make more informed strategic decisions." },
          { label: "Increased Efficiency", desc: "Autonomous AI-driven capabilities streamline complex workflows, reduce manual effort, and significantly boost operational efficiency." },
          { label: "Improved Data Security", desc: "Blockchain integrations contribute to more secure and transparent digital environments, fostering trust in transactions and data management." },
          { label: "Democratization of Advanced AI", desc: "Comprehensive integrated AI tools make advanced artificial intelligence accessible to a broader audience, fostering innovation globally." },
          { label: "Digital Transformation Catalyst", desc: "Enables businesses to adopt cutting-edge technologies, adapt to the evolving digital landscape, and create new economic opportunities." },
        ],
        roadmap: [
          { module: "Short-term: AI & Blockchain Enhancement (0–6 months)", desc: "Enhance existing AI models and integrations in predictive analytics, market intelligence, and autonomous operations. Optimize API server performance and strengthen blockchain security protocols." },
          { module: "Mid-term: New AI Models & Multi-Chain (6–18 months)", desc: "Introduce new AI models, explore quantum computing readiness for blockchain, advanced NLP, and expanded multi-chain environment support." },
          { module: "Long-term: Global Sovereign AI Leadership (18+ months)", desc: "Establish OrakzaiX as a global leader in sovereign AI and decentralized intelligence, fostering an ecosystem of AI-powered applications and pioneering autonomous digital governance." },
        ],
        githubUrl: "https://github.com/faisalorakzai-lab",
        socialUsername: "orakzaix",
      },

      "psc-exchange": {
        title: "Pak Stock Chain — Decentralized Exchange Bridging Pakistan Capital Markets with Blockchain",
        bio: "PSC Exchange (Pak Stock Chain) is a pioneering decentralized exchange engineered to bridge Pakistan's traditional capital markets with the transparency, efficiency, and accessibility of blockchain technology. PSC Exchange represents the Orakzai Group's vision for a sovereign, on-chain financial infrastructure that democratizes access to Pakistani equities and instruments for both local and global investors.",
        description: "PSC Exchange is being architected on a blockchain-native stack, leveraging DeFi primitives to tokenize Pakistani equities, mutual funds, and capital market instruments. By bringing Pakistan Stock Exchange (PSX)-listed assets on-chain, PSC removes traditional intermediaries, enables T+0 settlement, and opens fractional investment to retail participants globally — merging regulatory-grade compliance with the permissionless efficiency of Web3 infrastructure.",
        uniqueFeatures: [
          "First decentralized exchange bridging Pakistan Stock Exchange (PSX) assets to blockchain",
          "Tokenization of Pakistani equities and capital market instruments for on-chain trading",
          "T+0 blockchain-native settlement — eliminating multi-day clearing delays of traditional markets",
          "Fractional investment enabling retail participation in high-value Pakistani blue-chip stocks",
          "DeFi primitives (AMM / order book) combined with regulatory-grade compliance infrastructure",
          "Global investor access to Pakistan capital markets without traditional brokerage barriers",
        ],
        benefits: [
          { label: "Financial Inclusion", desc: "Opens Pakistan's capital markets to retail investors globally who lack access to traditional brokerage accounts or face high minimums." },
          { label: "Market Efficiency", desc: "T+0 blockchain settlement and on-chain price discovery improve liquidity and reduce systemic risk vs legacy T+2 clearing." },
          { label: "Transparency", desc: "Every trade, settlement, and ownership transfer recorded immutably on-chain — an auditable public ledger for Pakistan's capital markets." },
          { label: "Economic Sovereignty", desc: "Keeps Pakistan's capital market infrastructure sovereign and on-chain, reducing dependency on foreign financial systems." },
          { label: "Innovation Catalyst", desc: "Signals to global DeFi communities that Pakistan's capital markets are open, modern, and blockchain-ready — attracting foreign investment." },
        ],
        roadmap: [
          { module: "Protocol Architecture & Smart Contracts", desc: "Design and audit core exchange smart contracts, AMM liquidity mechanisms, and tokenization standards for Pakistani equities." },
          { module: "Regulatory Framework & PSX Integration", desc: "Establish compliance framework and integration pathways with Pakistan Stock Exchange and SECP." },
          { module: "Alpha Launch — Tokenized Equity Trading", desc: "Launch alpha platform with a curated selection of tokenized PSX-listed securities for early adopters and institutional partners." },
          { module: "Retail Expansion & Global Access", desc: "Open to global retail investors with fiat on-ramps, mobile apps, and multi-language support for 30+ countries." },
        ],
        githubUrl: "https://github.com/faisalorakzai-lab",
      },

      "orakzai-empire": {
        title: "The Sovereign Heritage Brand — Legacy, Vision & Identity of the Orakzai Lineage",
        bio: "Orakzai Empire is the sovereign heritage brand of the Orakzai Group — the living embodiment of the Orakzai lineage's vision, values, and ambition. It serves as the cultural and identity nucleus from which all Orakzai Group ventures draw their founding philosophy: building systems that outlast generations, not just businesses that serve a quarter.",
        description: "Orakzai Empire operates at the intersection of heritage, sovereignty, and empire-building. It is the brand under which Faisal Orakzai's founding philosophy is codified — combining Pashtun tribal pride with a global builder's mindset. The Empire brand spans culture, thought leadership, and sovereign identity: from the architectural vision of the Orakzai Group to its public narrative, community, and legacy infrastructure. It is the flag under which every Orakzai venture marches.",
        uniqueFeatures: [
          "Sovereign identity brand — the cultural DNA and founding philosophy of every Orakzai Group venture",
          "Heritage-forward positioning — ancient Orakzai tribal lineage merged with a modern builder's ethos",
          "Long-horizon empire thinking — all ventures designed to outlast generations, not just market cycles",
          "Thought leadership platform — Faisal Orakzai's vision, research, and philosophy published under this brand",
          "Community nucleus — uniting the global Orakzai diaspora and Pashtun communities around a shared vision",
          "Cultural sovereignty — preserving and elevating Orakzai heritage permanently in the digital age",
        ],
        benefits: [
          { label: "Cultural Preservation", desc: "Documents and elevates Orakzai tribal heritage, history, and values for future generations in a permanent digital format." },
          { label: "Identity & Pride", desc: "Gives the global Orakzai diaspora and Pashtun community a sovereign brand to rally around — a digital homeland of identity." },
          { label: "Inspirational Blueprint", desc: "Demonstrates that heritage and innovation are not opposites — a tribe with centuries of history can build the systems of tomorrow." },
          { label: "Group Cohesion", desc: "Acts as the philosophical anchor giving all Orakzai Group ventures a shared mission, aesthetic, and long-term purpose beyond profit." },
          { label: "Legacy Infrastructure", desc: "Ensures the Orakzai name, story, and vision are permanently encoded in digital infrastructure — immutable and sovereign." },
        ],
        roadmap: [
          { module: "Heritage Documentation Platform", desc: "Build a digital archive of Orakzai lineage history, tribal records, and cultural artifacts — stored on decentralized infrastructure." },
          { module: "Thought Leadership Publication", desc: "Launch a flagship publication platform for Faisal Orakzai's philosophy, essays, and vision for Pakistan and the Orakzai Group." },
          { module: "Community & Diaspora Network", desc: "Connect the global Orakzai diaspora through a sovereign digital community platform with verified heritage credentials." },
          { module: "Empire Events & Activations", desc: "Host sovereign-level summits and cultural activations cementing Orakzai Empire as a respected cultural and business institution." },
        ],
        githubUrl: "https://github.com/faisalorakzai-lab",
      },
  
  };


    /* ── Live Core detail panels ─────────────────────────────── */
    const CORE_DETAILS: Record<string, {
      title: string; bio: string; description: string;
      uniqueFeatures: string[]; benefits: { label: string; desc: string }[];
      roadmap: { module: string; desc: string }[];
      websiteUrl?: string; githubUrl?: string;
      socialUsername?: string;
      docs?: { label: string; url: string }[];
    }> = {
      "okzbyte": {
        title: "End-to-End Digital Transformation — Blockchain, AI & Big Data Engineering",
        bio: "OkzByte is a forward-thinking technology company specializing in comprehensive digital solutions, ranging from foundational web development to cutting-edge advancements in Blockchain Technology, Artificial Intelligence (AI), and Big Data. With a commitment to innovation and excellence, OkzByte empowers businesses globally to navigate the complexities of the digital landscape and harness the power of emerging technologies for sustainable growth and competitive advantage.",
        description: "OkzByte provides end-to-end development and management services across advanced technological domains. Our expertise spans robust web development and extends into the transformative realms of Blockchain, AI, and Big Data. We design, implement, and manage bespoke solutions that drive efficiency, foster security, and unlock unprecedented insights. Our integrated approach ensures businesses leverage the full potential of each technology through a synergistic ecosystem — traditional infrastructure augmented by next-generation AI systems and decentralized protocols.",
        uniqueFeatures: [
          "Integrated ecosystem approach — traditional web + Blockchain + AI + Big Data in one unified stack",
          "Bespoke client-centric development process with adaptive architectures tailored per organization",
          "Enterprise-grade decentralized applications (dApps) and secure digital asset management",
          "Advanced machine learning models for predictive analytics, automation, and deep business insights",
          "Ethical innovation framework — every solution evaluated for security, privacy, and societal impact",
          "High-throughput engineering engine powering the entire Orakzai Group sovereign infrastructure",
        ],
        benefits: [
          { label: "Enhanced Data Security", desc: "Blockchain-powered transparency and security foster trust in digital interactions, protecting sensitive data in finance, healthcare, and governance." },
          { label: "Informed Decision-Making", desc: "AI and Big Data solutions empower organizations to optimize resource allocation and develop intelligent systems that anticipate market shifts." },
          { label: "Democratized Technology", desc: "Makes advanced Blockchain and AI capabilities accessible to businesses of all sizes, reducing the barriers to digital transformation." },
          { label: "Innovation Acceleration", desc: "By staying at the frontier of decentralized systems and autonomous AI, OkzByte enables clients to leapfrog traditional digital maturity cycles." },
          { label: "Sustainable Digital Growth", desc: "Integrated solutions drive efficiency, reduce waste, and build resilient digital infrastructure that scales with organizational growth." },
        ],
        roadmap: [
          { module: "AI & Big Data Platform Enhancement", desc: "Integrating advanced machine learning models for deeper insights and automation across the core analytics platform." },
          { module: "Enterprise Blockchain Expansion", desc: "Expanding offerings in enterprise-grade decentralized applications and secure digital asset management at scale." },
          { module: "Global Strategic Partnerships", desc: "Mid-term: establishing strategic partnerships with global technology leaders to broaden service capabilities and market reach." },
          { module: "Autonomous AI Solutions", desc: "Building a global ecosystem of interconnected digital services powered by decentralized systems and autonomous AI agents." },
        ],
        githubUrl: "https://github.com/faisalorakzai-lab",
        socialUsername: "OkzBytee",
      },
      "okbond": {
        title: "Pakistan's First On-Chain Bond Marketplace — Decentralized Treasury & RWA Tokenization",
        bio: "Orakzai Bond serves as Pakistan's pioneering on-chain bond marketplace, functioning as a decentralized financial platform engineered for staking, investment pools, and tokenized utilities. Operating as the DeFi arm of the Orakzai Group, the platform empowers a global investor base by migrating traditional fixed-income instruments onto the blockchain — establishing a transparent, secure, and highly accessible sovereign financial ecosystem.",
        description: "Built on the Polygon blockchain (PoS + zkEVM) for gas-efficient settlement, Orakzai Bond leverages the ERC-1155 multi-token standard to tokenize real-world debt instruments. The marketplace offers Government-backed instruments (91-day T-Bills, Pakistan Investment Bonds 1–30yr, Sukuk), fixed-yield corporate debt, and property-backed real estate notes with quarterly yields. Every bond issuance, transaction, and yield payment is recorded on-chain — providing immutable provenance and replacing central institutional authority with unstoppable smart contracts.",
        uniqueFeatures: [
          "First in region to tokenize real-world assets (RWA) — government & corporate debt — on Polygon blockchain",
          "ERC-1155 standard for complex bond logic: automated coupon distributions and maturity auto-redemption",
          "Polygon PoS + zkEVM dual-layer architecture for gas-efficient, rapid T+0 blockchain-native settlement",
          "Full investor sovereignty — no central authority controls user assets; self-custody or institutional custodian options",
          "OKBOND token as universal settlement currency across the Orakzai sovereign ecosystem",
          "Order-book DEX (in development) optimized specifically for bond trading with secondary market liquidity",
        ],
        benefits: [
          { label: "Democratized Fixed-Income Access", desc: "Lowers barriers to government and corporate debt, letting a broader range of investors access wealth-building opportunities previously reserved for institutions." },
          { label: "Unparalleled Transparency", desc: "Every issuance, transaction, and yield payment recorded immutably on-chain — accessible to anyone with an internet connection." },
          { label: "Financial Inclusion", desc: "Empowers individuals globally — including the unbanked — to participate in sovereign wealth management without traditional intermediaries." },
          { label: "Efficiency & Cost Reduction", desc: "Blockchain-native T+0 settlement drastically reduces time and costs vs traditional financial intermediaries." },
          { label: "Capital Protection", desc: "Treasury-backed capital protection combined with DeFi yield mechanisms positions OKBOND as a premier asset for the global elite." },
        ],
        roadmap: [
          { module: "Secondary Market DEX", desc: "Order-book-based DEX optimized for bond trading, enabling T+0 blockchain-native settlement and secondary market exit liquidity for all participants." },
          { module: "Mobile Applications (iOS & Android)", desc: "Dedicated mobile apps to bring sovereign wealth management to the fingertips of global users anywhere in the world." },
          { module: "International Expansion", desc: "Scaling the Orakzai Global Network from Karachi headquarters to key financial hubs worldwide." },
          { module: "Universal OKBOND Currency", desc: "Establishing OKBOND token as a universal settlement and loyalty currency across the entire Orakzai sovereign infrastructure." },
        ],
        websiteUrl: "https://orakzaibond.com",
        githubUrl: "https://github.com/faisalorakzai-lab/orakzaibondwebsiten",
        socialUsername: "orakzaibond",
        docs: [
          { label: "MASTER PDF", url: "https://drive.google.com/file/d/1Q6bClDOeBCBxBZfKdD9SnqSpNFrG-u7A/view?usp=drivesdk" },
          { label: "SECURITY REVIEW", url: "https://drive.google.com/file/d/1T_isI9xvQQr_Mbkt1YyBvNF4kLUOcVgj/view?usp=drivesdk" },
          { label: "WHITEPAPER", url: "https://drive.google.com/file/d/1Psz7Iy5aREH_ltKPGLglTwR2ln1VTHWS/view?usp=drivesdk" },
        ],
      },
      "shamim": {
        title: "Global Sovereign Luxury Digital House — Fragrances, Jewellery & Web3 Provenance",
        bio: "Shamim Forever is a global sovereign luxury digital house established in 2024 by Faisal Orakzai. Based in Pakistan and serving a worldwide clientele, the house specializes in bespoke fragrances, sovereign high jewellery, and blockchain-verified couture collections. It operates as part of the Orakzai Group portfolio, merging ancient Arabian perfumery heritage with modern digital commerce and Web3 technology.",
        description: "Shamim Forever is an avant-garde digital luxury platform that redefines luxury through cultural sovereignty, authenticity, and permanence. The platform offers curated fragrances from iconic maisons (Prada, Armani, Burberry, Carolina Herrera, Lancôme, Dolce & Gabbana, Narciso Rodriguez) alongside its own bespoke creations. Built on Next.js 14, Supabase, and Vercel Edge Network, the platform delivers a seamless mobile-first digital boutique with real-time inventory sync. Every creation receives a blockchain-verified identity on Polygon Mainnet — cryptographically immutable and permanently linked.",
        uniqueFeatures: [
          "Bio-Signature DNA Authentication — invisible nano-markers embedded in each fragrance, verifiable via spectrographic analysis",
          "Personal Scent Signature — client body chemistry documented and encoded as a biometric fingerprint for all future commissions",
          "Blockchain Verification & NFT Passports — every creation receives a Polygon Mainnet identity certifying authenticity, ownership, and collector history",
          "Quantum Encrypted Heirloom Vault — Swiss-grade digital succession system with smart-contract governed multi-generation transfer",
          "OKBOND Protocol — proprietary loyalty currency providing sovereign discounts and Web3 ecosystem integration",
          "Adaptive Fragrance Chemistry — future formulas designed to evolve with the wearer's unique skin chemistry over time",
        ],
        benefits: [
          { label: "Preservation of Heritage", desc: "Honors centuries of craftsmanship — from Taif roses to Assam oud — elevating ancient perfumery traditions with modern science." },
          { label: "Eradication of Counterfeits", desc: "DNA nano-markers and blockchain technology provide a foolproof solution against the global counterfeit luxury market." },
          { label: "Sustainable Legacy", desc: "Products engineered to last generations, reducing waste by encouraging heirlooms over fleeting trends." },
          { label: "Cultural Sovereignty", desc: "Empowers clients to architect their identity through personalized, biologically adapted creations celebrating cultural independence." },
          { label: "Web3 Retail Pioneer", desc: "Seamlessly blends NFTs and smart contracts with physical luxury goods, setting a new global standard for provenance and trust." },
        ],
        roadmap: [
          { module: "Future Luxury Releases", desc: "Continuous expansion of bespoke fragrance lines and sovereign jewellery collections with early access for Inner Circle members and founders." },
          { module: "Adaptive Fragrance Chemistry", desc: "Next-generation fragrance formulas designed to adapt to the wearer's biological profile, evolving with their unique skin chemistry over time." },
          { module: "Orakzai Group Expansion", desc: "Launch of future luxury ventures and expansion of the OKBOND Protocol utility as a sovereign loyalty currency across the Group ecosystem." },
          { module: "Multi-Generation Heirloom Transfer", desc: "Enhanced Heirloom Vault enabling legal, smart-contract-governed transfer of physical items and their digital NFT identities across generations." },
        ],
        websiteUrl: "https://www.shamimforever.com",
        githubUrl: "https://github.com/faisalorakzai-lab/shamimforever",
        socialUsername: "shamimforever",
      },
    };

  
    /* ── Organization detail panels ─────────────────────────── */
    const ORG_DETAILS: Record<string, {
      title: string; bio: string; description: string;
      leadership: { role: string; name: string }[];
      uniqueFeatures: string[]; benefits: { label: string; desc: string }[];
    }> = {
      "pihro": {
        title: "Pakistan International Human Rights Organisation — Defending Rights, Dignity & Justice",
        bio: "Pakistan International Human Rights Organisation (PIHRO) is a sovereign civil society organisation dedicated to the protection, promotion, and enforcement of fundamental human rights across Pakistan and internationally. Under the national chairmanship of Habib Malik Orakzai and the Karachi chapter led by Faisal Orakzai, PIHRO stands as an independent voice for justice, accountability, and the dignity of every individual regardless of status.",
        description: "PIHRO operates at the intersection of legal advocacy, community empowerment, and international human rights standards. The organisation works to document human rights violations, provide legal support to victims, engage with international bodies, and hold institutions accountable to Pakistan's constitutional obligations and international conventions. PIHRO's Karachi chapter, led by Faisal Orakzai, drives urban advocacy and bridges the gap between grassroots communities and formal legal systems.",
        leadership: [
          { role: "Chairman (National)", name: "Habib Malik Orakzai" },
          { role: "Chairman (Karachi)", name: "Faisal Orakzai" },
        ],
        uniqueFeatures: [
          "Independent civil society organisation — not affiliated with any political party or government body",
          "Dual-leadership structure: national chairman and city-level chairmanship for effective local advocacy",
          "International mandate — engages with global human rights bodies on Pakistan-specific issues",
          "Legal support and documentation services for victims of rights violations",
          "Community-level outreach and awareness programs across Karachi and beyond",
          "Orakzai lineage-driven ethos of justice, sovereignty, and service to the people",
        ],
        benefits: [
          { label: "Accountability", desc: "Holds institutions, officials, and entities accountable to Pakistan's constitutional obligations and international human rights law." },
          { label: "Victim Support", desc: "Provides direct legal assistance and documentation support to individuals whose fundamental rights have been violated." },
          { label: "Community Empowerment", desc: "Educates communities on their legal rights and equips them with the tools to advocate for themselves." },
          { label: "International Visibility", desc: "Elevates Pakistani human rights issues onto the international stage, engaging global bodies for systemic change." },
          { label: "Sovereign Voice", desc: "Represents an independent, uncaptured civil voice — free from political influence — that speaks truth to power." },
        ],
      },
      "son-of-orakzai": {
        title: "Community & Heritage Organisation — Representing the Proud Orakzai Identity",
        bio: "Son of Orakzai is a community and heritage organisation representing the proud Orakzai tribal identity and diaspora. It serves as a gathering point for the global Orakzai community — preserving cultural heritage, strengthening tribal bonds, and elevating the Orakzai name as a symbol of honour, resilience, and sovereignty.",
        description: "Son of Orakzai functions as a cultural institution that bridges the traditional Orakzai tribal heritage with the demands of the modern world. It facilitates community connections across geographies, documents and preserves Orakzai history and traditions, and creates platforms for the next generation of Orakzai leaders. The organisation is deeply aligned with the broader Orakzai Group mission — carrying forward the lineage's values of integrity, strength, and empire-building.",
        leadership: [
          { role: "Founder", name: "Faisal Orakzai" },
        ],
        uniqueFeatures: [
          "Heritage preservation — documents Orakzai tribal history, traditions, and lineage records",
          "Global diaspora network — connects Orakzai communities across Pakistan, the Gulf, and internationally",
          "Cultural identity platform — celebrates and elevates the Orakzai name and Pashtun heritage",
          "Next-generation leadership development — nurtures young Orakzai leaders for the future",
          "Aligned with Orakzai Group philosophy — empire-thinking, sovereignty, and long-horizon vision",
          "Community solidarity — welfare and mutual support among Orakzai community members",
        ],
        benefits: [
          { label: "Cultural Continuity", desc: "Ensures Orakzai heritage, traditions, and identity are preserved and passed to future generations in a changing world." },
          { label: "Community Cohesion", desc: "Strengthens bonds among the global Orakzai diaspora, creating a unified and supportive community network." },
          { label: "Identity & Pride", desc: "Gives Orakzai community members a sovereign identity to rally around — a source of pride, honour, and belonging." },
          { label: "Leadership Pipeline", desc: "Develops future Orakzai leaders who carry forward the tribe's values of integrity, resilience, and sovereign thinking." },
          { label: "Welfare & Solidarity", desc: "Provides community welfare support, ensuring no Orakzai community member faces hardship without a support network." },
        ],
      },
    };

    /* ── Position helpers ────────────────────────────────────── */
  function corePos(angleDeg: number, radius: number, cx: number, cy: number) {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) };
  }

  /* ── Main Component ─────────────────────────────────────── */
  export default function Ecosystem() {
    const [activeCore, setActiveCore] = useState<string | null>(null);
    const [activeVenture, setActiveVenture] = useState<string | null>(null);
      const [activeOrg, setActiveOrg] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener("resize", check);
      return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
      document.title = "Orakzai Ecosystem — Live Cores, Infrastructure & Organizations · Faisal Orakzai";
    }, []);

    const SVG_W = 600;
    const SVG_H = 600;
    const CX = SVG_W / 2;
    const CY = SVG_H / 2;
    const INNER_R = 170;

    return (
      <>
        <SEOHead
          title="Orakzai Ecosystem — Ventures, Blockchain & AI Infrastructure"
          description="The complete Orakzai Group ecosystem — OKBOND blockchain, Shamim Forever luxury brand, OkzByte Technology AI, OrakzaiX automation platform, and real estate tokenization."
          path="/ecosystem"
          keywords="Orakzai Group ecosystem, OKBOND Polygon, Shamim Forever, OkzByte, OrakzaiX AI, blockchain Pakistan"
        />
        <div style={{ background: "#000", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── HERO ── */}
        <section style={{ paddingTop: "100px", paddingBottom: "40px", borderBottom: `1px solid ${GOLD_DIM}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(243,186,47,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(243,186,47,1) 1px,transparent 1px),linear-gradient(90deg,rgba(243,186,47,1) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", border: `1px solid ${GOLD_DIM}`, marginBottom: "20px", background: "rgba(243,186,47,0.02)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: GOLD, boxShadow: `0 0 8px ${GOLD}`, animation: "dp 2s infinite", display: "inline-block" }} />
                <span style={{ fontFamily: "monospace", fontSize: "10px", color: GOLD, letterSpacing: "0.3em" }}>ORAKZAI GROUP</span>
              </div>
              <h1 style={{ fontSize: "clamp(40px, 8vw, 80px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 0.92, marginBottom: "20px" }}>
                <span style={{ display: "block" }}>SOVEREIGN</span>
                <span style={{ display: "block", background: `linear-gradient(135deg,#BF953F 0%,#FCF6BA 40%,${GOLD} 70%,#AA771C 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ECOSYSTEM</span>
              </h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px", maxWidth: "500px", lineHeight: 1.7, marginBottom: "28px" }}>
                3 live cores · <span style={{ color: GOLD }}>6 ventures under development</span> · 2 organizations.
                Tap any core to explore.
              </p>
              <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
                {[{ v: "3", l: "LIVE CORES" }, { v: "6", l: "IN DEVELOPMENT" }, { v: "2", l: "ORGANIZATIONS" }].map((s, i) => (
                  <div key={i} style={{ padding: "14px 24px", border: `1px solid ${GOLD_DIM}`, borderRight: i < 2 ? "none" : undefined, background: "rgba(255,255,255,0.01)" }}>
                    <div style={{ fontSize: "22px", fontWeight: 800, color: GOLD }}>{s.v}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", marginTop: "2px" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── ORBITAL SECTION ── */}
        <section style={{ padding: "40px 0 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em", marginBottom: "32px", textAlign: "center" }}>
              // ORAKZAI GROUP — CENTER NODE · 3 LIVE CORES
            </div>

            {/* ── Desktop: SVG orbital ── */}
            {!isMobile && (
              <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ position: "relative", width: "min(600px, 100%)", aspectRatio: "1" }}>
                  {/* SVG rings and lines */}
                  <svg
                    viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                  >
                    <defs>
                      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={GOLD} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
                      </radialGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                    <circle cx={CX} cy={CY} r={80} fill="url(#centerGlow)" />
                    <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke={`rgba(243,186,47,0.12)`} strokeWidth="1" strokeDasharray="2 6" />
                    <circle cx={CX} cy={CY} r={52} fill="none" stroke={`rgba(243,186,47,0.25)`} strokeWidth="1.5" />
                    {LIVE_CORES.map((core) => {
                      const p = corePos(core.angle, INNER_R, CX, CY);
                      return (
                        <line key={core.id}
                          x1={CX} y1={CY} x2={p.x} y2={p.y}
                          stroke={`rgba(243,186,47,0.2)`} strokeWidth="1"
                          filter="url(#glow)"
                        />
                      );
                    })}
                  </svg>

                  {/* Center node */}
                  <div
                    onClick={() => window.open("https://www.linkedin.com/company/orakzaigroup/", "_blank")}
                    style={{
                      position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%, -65%)",
                      display: "flex", flexDirection: "column", alignItems: "center",
                      cursor: "pointer", zIndex: 10,
                    }}
                  >
                    <div style={{ position: "relative", width: "110px", height: "110px" }}>
                      <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", background: `conic-gradient(${GOLD}, rgba(243,186,47,0.2), ${GOLD})`, animation: "spin 8s linear infinite" }} />
                      <div style={{ position: "absolute", inset: "-4px", borderRadius: "50%", background: "#000" }} />
                      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${GOLD}`, boxShadow: `0 0 28px rgba(243,186,47,0.5), 0 0 60px rgba(243,186,47,0.15)`, overflow: "hidden", background: "#111", zIndex: 2 }}>
                        <img src="/og-logo.jpg" alt="Faisal Orakzai — Founder & Chairman Orakzai Group"
                          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                          onError={(e) => { (e.target as HTMLImageElement).src = "/logos/orakzai-group.jpg"; }}
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: "8px", textAlign: "center", background: "rgba(0,0,0,0.85)", border: `1px solid rgba(243,186,47,0.25)`, padding: "5px 12px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: "8px", color: GOLD, letterSpacing: "0.2em" }}>ORAKZAI GROUP</div>
                    </div>
                  </div>

                  {/* Live Core nodes */}
                  {LIVE_CORES.map((core) => {
                    const p = corePos(core.angle, INNER_R, CX, CY);
                    const pct = { left: `${(p.x / SVG_W) * 100}%`, top: `${(p.y / SVG_H) * 100}%` };
                    const isActive = activeCore === core.id;
                    return (
                      <motion.button
                        key={core.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (core.url) { window.open(core.url, "_blank"); return; }
                          setActiveCore(isActive ? null : core.id);
                        }}
                        style={{
                          position: "absolute", left: pct.left, top: pct.top,
                          transform: "translate(-50%, -50%)",
                          width: "80px", height: "80px", borderRadius: "50%",
                          border: `2px solid ${isActive ? core.statusColor : "rgba(243,186,47,0.4)"}`,
                          background: "#050505",
                          boxShadow: `0 0 ${isActive ? "24px" : "12px"} ${core.statusColor}40`,
                          overflow: "hidden", cursor: "pointer", padding: 0, zIndex: 10,
                          transition: "box-shadow 0.3s, border-color 0.3s",
                        }}
                      >
                        <img src={core.logo} alt={core.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            t.style.display = "none";
                            const p = t.parentElement!;
                            p.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#F3BA2F;">${core.ticker}</div>`;
                          }}
                        />
                        <div style={{ position: "absolute", bottom: "4px", right: "4px", width: "8px", height: "8px", borderRadius: "50%", background: core.statusColor, boxShadow: `0 0 6px ${core.statusColor}`, animation: "dp 2s infinite" }} />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Mobile: flat layout ── */}
            {isMobile && (
              <div>
                <div onClick={() => window.open("https://www.linkedin.com/company/orakzaigroup/", "_blank")}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px", cursor: "pointer" }}>
                  <div style={{ position: "relative", width: "100px", height: "100px", marginBottom: "10px" }}>
                    <div style={{ position: "absolute", inset: "-7px", borderRadius: "50%", background: `conic-gradient(${GOLD}, rgba(243,186,47,0.2), ${GOLD})`, animation: "spin 8s linear infinite" }} />
                    <div style={{ position: "absolute", inset: "-3px", borderRadius: "50%", background: "#000" }} />
                    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${GOLD}`, overflow: "hidden", boxShadow: `0 0 24px rgba(243,186,47,0.4)` }}>
                      <img src="/og-logo.jpg" alt="Faisal Orakzai" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                        onError={(e) => { (e.target as HTMLImageElement).src = "/logos/orakzai-group.jpg"; }} />
                    </div>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.2em" }}>ORAKZAI GROUP</div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.35em", marginBottom: "12px" }}>// LIVE CORES</div>
                  <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px" }}>
                    {LIVE_CORES.map((core) => (
                      <div key={core.id}
                        onClick={() => CORE_DETAILS[core.id] ? setActiveCore(activeCore === core.id ? null : core.id) : core.url ? window.open(core.url, "_blank") : setActiveCore(activeCore === core.id ? null : core.id)}
                        style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", minWidth: "80px" }}>
                        <div style={{ width: "68px", height: "68px", borderRadius: "50%", border: `2px solid ${core.statusColor}`, boxShadow: `0 0 16px ${core.statusColor}40`, overflow: "hidden", background: "#000" }}>
                          <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                        </div>
                        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)", textAlign: "center", maxWidth: "80px" }}>{core.name}</div>
                        <div style={{ fontFamily: "monospace", fontSize: "8px", color: core.statusColor, letterSpacing: "0.1em" }}>{core.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── EXPANDED PANEL: Live Core info ── */}
          <AnimatePresence mode="wait">
            {activeCore && (
              <motion.section
                key={activeCore}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 20px" }}>
                  {(() => {
                    const core = LIVE_CORES.find(c => c.id === activeCore)!;
                    const d = CORE_DETAILS[activeCore];
                    if (!d) {
                      return (
                        <div style={{ border: `1px solid ${core.statusColor}30`, borderTop: `2px solid ${core.statusColor}`, padding: "24px 28px", background: `linear-gradient(135deg, ${core.statusColor}05 0%, transparent 60%)`, display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                          <div style={{ width: "56px", height: "56px", borderRadius: "50%", border: `2px solid ${core.statusColor}`, overflow: "hidden", flexShrink: 0 }}>
                            <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ flex: 1, minWidth: "220px" }}>
                            <div style={{ fontFamily: "monospace", fontSize: "9px", color: core.statusColor, letterSpacing: "0.3em", marginBottom: "4px" }}>{core.tag}</div>
                            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", marginBottom: "6px" }}>{core.name}</h3>
                            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{core.desc}</p>
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <span style={{ padding: "4px 10px", border: `1px solid ${core.statusColor}40`, fontFamily: "monospace", fontSize: "9px", color: core.statusColor }}>{core.status}</span>
                            <button onClick={() => setActiveCore(null)} style={{ all: "unset", cursor: "pointer", fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>✕ CLOSE</button>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div style={{ border: `1px solid ${core.statusColor}25`, borderTop: `3px solid ${core.statusColor}`, background: `linear-gradient(180deg, ${core.statusColor}06 0%, transparent 40%)`, padding: "32px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap", marginBottom: "28px" }}>
                          <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `2px solid ${core.statusColor}50`, overflow: "hidden", flexShrink: 0, background: "#050505" }}>
                            <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ flex: 1, minWidth: "240px" }}>
                            <div style={{ fontFamily: "monospace", fontSize: "9px", color: core.statusColor, letterSpacing: "0.3em", marginBottom: "6px" }}>{core.tag} · <span style={{ color: core.statusColor }}>● {core.status}</span></div>
                            <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" }}>{core.name}</h2>
                            <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>{d.title}</p>
                          </div>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                            {d.websiteUrl && (
                              <a href={d.websiteUrl} target="_blank" rel="noopener noreferrer"
                                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: `${core.statusColor}15`, border: `1px solid ${core.statusColor}50`, color: core.statusColor, fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none" }}>
                                ↗ VISIT WEBSITE
                              </a>
                            )}
                            {d.socialUsername && (
                              <a href={`https://twitter.com/${d.socialUsername}`} target="_blank" rel="noopener noreferrer"
                                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none" }}>
                                𝕏 @{d.socialUsername}
                              </a>
                            )}
                            {d.githubUrl && (
                              <a href={d.githubUrl} target="_blank" rel="noopener noreferrer"
                                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none" }}>
                                ↗ GITHUB REPO
                              </a>
                            )}
                            {d.docs && d.docs.map((doc, i) => (
                              <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer"
                                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: `${core.statusColor}10`, border: `1px solid ${core.statusColor}30`, color: core.statusColor, fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none" }}>
                                ↓ {doc.label}
                              </a>
                            ))}
                            <button onClick={() => setActiveCore(null)}
                              style={{ all: "unset", cursor: "pointer", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>
                              ✕ CLOSE
                            </button>
                          </div>
                        </div>
                        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "800px", borderLeft: `3px solid ${core.statusColor}40`, paddingLeft: "16px" }}>{d.bio}</p>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.8, marginBottom: "32px", maxWidth: "800px" }}>{d.description}</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                          <div>
                            <div style={{ fontFamily: "monospace", fontSize: "9px", color: core.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// UNIQUE FEATURES</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              {d.uniqueFeatures.map((f, i) => (
                                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                  <span style={{ color: core.statusColor, fontSize: "10px", flexShrink: 0, marginTop: "2px" }}>▸</span>
                                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontFamily: "monospace", fontSize: "9px", color: core.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// GLOBAL BENEFITS</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {d.benefits.map((b, i) => (
                                <div key={i} style={{ padding: "10px 14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>{b.label}</div>
                                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{b.desc}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: "28px" }}>
                          <div style={{ fontFamily: "monospace", fontSize: "9px", color: core.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// ROADMAP & FUTURE</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {d.roadmap.map((r, i) => (
                              <div key={i} style={{ display: "flex", gap: "16px", padding: "14px 18px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", alignItems: "flex-start" }}>
                                <div style={{ fontFamily: "monospace", fontSize: "9px", color: core.statusColor, letterSpacing: "0.1em", flexShrink: 0, paddingTop: "2px", minWidth: "24px" }}>{String(i + 1).padStart(2, "0")}</div>
                                <div>
                                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{r.module}</div>
                                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{r.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </motion.section>
            )}
          </AnimatePresence>

                  {/* ── LIVE CORES STRIP — auto-scroll ticker ── */}
          <section style={{ padding: "40px 0 0", overflow: "hidden" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", marginBottom: "12px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, letterSpacing: "0.4em" }}>// LIVE CORES</div>
            </div>
            <div style={{ position: "relative", overflow: "hidden", borderTop: `1px solid ${GOLD_DIM}`, borderBottom: `1px solid ${GOLD_DIM}` }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ display: "flex", animation: "ticker 28s linear infinite", width: "max-content" }}>
                {[...LIVE_CORES, ...LIVE_CORES].map((core, idx) => (
                  <div key={idx} onClick={() => CORE_DETAILS[core.id] ? setActiveCore(activeCore === core.id ? null : core.id) : core.url && window.open(core.url, "_blank")}
                    style={{ minWidth: "280px", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start", cursor: "pointer", borderRight: `1px solid ${GOLD_DIM}`, background: "#000", flexShrink: 0 }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `1.5px solid ${core.statusColor}50`, overflow: "hidden", flexShrink: 0, background: "#050505" }}>
                      <img src={core.logo} alt={core.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: "8px", color: core.statusColor, letterSpacing: "0.2em", marginBottom: "4px" }}>● {core.status} · {core.tag}</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{core.name}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5, maxWidth: "180px" }}>{core.desc.substring(0, 70)}…</div>
                      {CORE_DETAILS[core.id] ? (<div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, marginTop: "8px" }}>TAP FOR DETAILS ↓</div>) : core.url ? (<div style={{ fontFamily: "monospace", fontSize: "9px", color: GOLD, marginTop: "8px" }}>{core.url.replace("https://", "")} ↗</div>) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ALL VENTURES TICKER ── */}
          <section style={{ padding: "24px 0 0", overflow: "hidden" }}>
            <div style={{ position: "relative", overflow: "hidden", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
              <div style={{ display: "flex", animation: "ticker 50s linear infinite", width: "max-content", alignItems: "center" }}>
                {[...UNDER_DEV, ...LIVE_CORES.map(c => ({ id: c.id, name: c.name, ticker: c.ticker, tag: c.tag, statusColor: c.statusColor, desc: "" })), ...UNDER_DEV, ...LIVE_CORES.map(c => ({ id: c.id, name: c.name, ticker: c.ticker, tag: c.tag, statusColor: c.statusColor, desc: "" }))].map((v, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 28px", borderRight: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
                    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: v.statusColor, display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>{v.name}</span>
                    <span style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", whiteSpace: "nowrap" }}>{v.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── UNDER DEVELOPMENT SECTION ── */}
          <section style={{ padding: "60px 0 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em" }}>// UNDER DEVELOPMENT</div>
              <div style={{ flex: 1, height: "1px", background: GOLD_DIM }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
              {UNDER_DEV.map((venture) => (
                <motion.div key={venture.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => VENTURE_DETAILS[venture.id] ? setActiveVenture(activeVenture === venture.id ? null : venture.id) : undefined}
                  style={{ background: "#000", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start", position: "relative", overflow: "hidden", cursor: VENTURE_DETAILS[venture.id] ? "pointer" : "default" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${venture.statusColor}60, transparent)` }} />
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: `1.5px solid ${venture.statusColor}30`, overflow: "hidden", flexShrink: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {venture.logo ? (
                      <img src={venture.logo} alt={venture.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <span style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 800, color: venture.statusColor }}>{venture.ticker}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: "4px" }}>{venture.tag}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{venture.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{venture.desc.substring(0, 75)}…</div>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.2em", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "inline-block" }} />
                      IN DEVELOPMENT
                      {VENTURE_DETAILS[venture.id] && <span style={{ color: GOLD, marginLeft: "8px" }}>· TAP FOR DETAILS</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

  
        {/* ── VENTURE DETAIL PANEL ── */}
        <AnimatePresence mode="wait">
          {activeVenture && VENTURE_DETAILS[activeVenture] && (() => {
            const v = UNDER_DEV.find(u => u.id === activeVenture)!;
            const d = VENTURE_DETAILS[activeVenture];
            return (
              <motion.section
                key={activeVenture}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 20px" }}>
                  <div style={{ border: `1px solid ${v.statusColor}25`, borderTop: `3px solid ${v.statusColor}`, background: `linear-gradient(180deg, ${v.statusColor}06 0%, transparent 40%)`, padding: "32px" }}>
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap", marginBottom: "28px" }}>
                      <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `2px solid ${v.statusColor}50`, overflow: "hidden", flexShrink: 0, background: "#050505" }}>
                        {v.logo && <img src={v.logo} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                      </div>
                      <div style={{ flex: 1, minWidth: "240px" }}>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "6px" }}>{v.tag}</div>
                        <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" }}>{v.name}</h2>
                        <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>{d.title}</p>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
                        {d.pdfUrl && (
                          <a href={d.pdfUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: `${v.statusColor}15`, border: `1px solid ${v.statusColor}50`, color: v.statusColor, fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none", cursor: "pointer" }}>
                            ↓ PDF DETAILS
                          </a>
                        )}
                        {d.githubUrl && (
                          <a href={d.githubUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.15em", textDecoration: "none" }}>
                            ↗ GITHUB REPO
                          </a>
                        )}
                        <button onClick={() => setActiveVenture(null)}
                          style={{ all: "unset", cursor: "pointer", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>
                          ✕ CLOSE
                        </button>
                      </div>
                    </div>

                    {/* Bio */}
                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "28px", maxWidth: "800px", borderLeft: `3px solid ${v.statusColor}40`, paddingLeft: "16px" }}>{d.bio}</p>

                    {/* Description */}
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.8, marginBottom: "32px", maxWidth: "800px" }}>{d.description}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                      {/* Unique Features */}
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// UNIQUE FEATURES</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {d.uniqueFeatures.map((f, i) => (
                            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                              <span style={{ color: v.statusColor, fontSize: "10px", flexShrink: 0, marginTop: "2px" }}>▸</span>
                              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// GLOBAL BENEFITS</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {d.benefits.map((b, i) => (
                            <div key={i} style={{ padding: "10px 14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                              <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>{b.label}</div>
                              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{b.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Roadmap */}
                    <div style={{ marginTop: "28px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// ROADMAP & MODULES</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {d.roadmap.map((r, i) => (
                          <div key={i} style={{ display: "flex", gap: "16px", padding: "14px 18px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", alignItems: "flex-start" }}>
                            <div style={{ fontFamily: "monospace", fontSize: "9px", color: v.statusColor, letterSpacing: "0.1em", flexShrink: 0, paddingTop: "2px", minWidth: "24px" }}>{String(i + 1).padStart(2, "0")}</div>
                            <div>
                              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{r.module}</div>
                              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{r.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.section>
            );
          })()}
        </AnimatePresence>

        {/* ── ORGANIZATIONS SECTION ── */}
        <section style={{ padding: "60px 0 80px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.4em" }}>// ORGANIZATIONS & FOUNDATIONS</div>
              <div style={{ flex: 1, height: "1px", background: GOLD_DIM }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
              {ORGANIZATIONS.map((org) => (
                <motion.div key={org.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  style={{ background: "#000", padding: "20px 24px", display: "flex", gap: "16px", alignItems: "flex-start", position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${org.statusColor}60, transparent)` }} />
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: `1.5px solid ${org.statusColor}30`, overflow: "hidden", flexShrink: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {org.logo ? (
                      <img src={org.logo} alt={org.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    ) : (
                      <span style={{ fontFamily: "monospace", fontSize: "10px", fontWeight: 800, color: org.statusColor }}>{org.ticker}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", marginBottom: "4px" }}>{org.tag}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{org.name}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{org.desc}</div>
                    <div style={{ fontFamily: "monospace", fontSize: "8px", color: org.statusColor, letterSpacing: "0.2em", marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: org.statusColor, display: "inline-block", animation: "dp 2s infinite" }} />
                      ACTIVE
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


          {/* ── ORG DETAIL PANEL ── */}
          <AnimatePresence mode="wait">
            {activeOrg && ORG_DETAILS[activeOrg] && (() => {
              const org = ORGANIZATIONS.find(o => o.id === activeOrg)!;
              const d = ORG_DETAILS[activeOrg];
              return (
                <motion.section
                  key={activeOrg}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 20px" }}>
                    <div style={{ border: `1px solid ${org.statusColor}25`, borderTop: `3px solid ${org.statusColor}`, background: `linear-gradient(180deg, ${org.statusColor}06 0%, transparent 40%)`, padding: "32px" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", flexWrap: "wrap", marginBottom: "28px" }}>
                        <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: `2px solid ${org.statusColor}50`, overflow: "hidden", flexShrink: 0, background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {org.logo ? <img src={org.logo} alt={org.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 800, color: org.statusColor }}>{org.ticker}</span>}
                        </div>
                        <div style={{ flex: 1, minWidth: "240px" }}>
                          <div style={{ fontFamily: "monospace", fontSize: "9px", color: org.statusColor, letterSpacing: "0.3em", marginBottom: "6px" }}>{org.tag}</div>
                          <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" }}>{org.name}</h2>
                          <p style={{ fontFamily: "monospace", fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>{d.title}</p>
                        </div>
                        <button onClick={() => setActiveOrg(null)} style={{ all: "unset", cursor: "pointer", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>✕ CLOSE</button>
                      </div>
                      {/* Leadership */}
                      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
                        {d.leadership.map((l, i) => (
                          <div key={i} style={{ padding: "10px 18px", border: `1px solid ${org.statusColor}30`, background: `${org.statusColor}08` }}>
                            <div style={{ fontFamily: "monospace", fontSize: "8px", color: org.statusColor, letterSpacing: "0.2em", marginBottom: "4px" }}>{l.role}</div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{l.name}</div>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "24px", maxWidth: "800px", borderLeft: `3px solid ${org.statusColor}40`, paddingLeft: "16px" }}>{d.bio}</p>
                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", lineHeight: 1.8, marginBottom: "28px", maxWidth: "800px" }}>{d.description}</p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: "9px", color: org.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// KEY FEATURES</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {d.uniqueFeatures.map((f, i) => (
                              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                <span style={{ color: org.statusColor, fontSize: "10px", flexShrink: 0, marginTop: "2px" }}>▸</span>
                                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: "9px", color: org.statusColor, letterSpacing: "0.3em", marginBottom: "14px" }}>// IMPACT & BENEFITS</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {d.benefits.map((b, i) => (
                              <div key={i} style={{ padding: "10px 14px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
                                <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>{b.label}</div>
                                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{b.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>
              );
            })()}
          </AnimatePresence>
          <style>{`
          @keyframes dp { 0%,100%{opacity:1;box-shadow:0 0 6px #F3BA2F} 50%{opacity:0.4;box-shadow:0 0 16px #F3BA2F} }
          @keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        `}</style>
      </div>
      </>
    );
  }
  