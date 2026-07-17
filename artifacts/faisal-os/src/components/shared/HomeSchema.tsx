import { useEffect } from "react";

// NOTE: The primary FAQPage JSON-LD is injected STATICALLY in index.html
// so Google crawls it without needing JavaScript rendering.
// This component injects a duplicate via JS for completeness (belt-and-suspenders),
// but the static version in index.html is the authoritative one for Google.

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://faisalorakzai.com/#faq",
  "url": "https://faisalorakzai.com/",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Muhammad Faisal Orakzai (فیصل اورکزئی) is a Pakistani technology entrepreneur born on 30 April 2006 in Orakzai Agency, Khyber Pakhtunkhwa (KPK), Pakistan. He is the Founder and Chairman of Orakzai Group — the parent organization behind Orakzai Bond (OKBOND) on Polygon blockchain, OkzByte Technology, Shamim Forever luxury brand, and OrakzaiX AI. He is recognized as one of Pakistan's youngest blockchain architects and technology entrepreneurs."
      }
    },
    {
      "@type": "Question",
      "name": "What is Orakzai Group?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orakzai Group is a technology and venture organization founded by Faisal Orakzai, operating across blockchain, artificial intelligence, fintech, luxury commerce, and digital infrastructure. Its ventures include Orakzai Bond (OKBOND) on Polygon, OkzByte Technology, Shamim Forever, OrakzaiX AI, QORIX, and Orakzai Real Estate. Orakzai Group is headquartered in Karachi, Pakistan, with a global operational presence."
      }
    },
    {
      "@type": "Question",
      "name": "What is Orakzai Bond (OKBOND)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orakzai Bond (OKBOND) is a blockchain-based digital asset built on the Polygon Layer-2 network by Faisal Orakzai. It is a sovereign tokenized digital asset exploring transparent treasury systems, staking infrastructure, and DeFi yield mechanisms. OKBOND is available at orakzaibond.com and represents Pakistan's blockchain-native sovereign digital bond instrument."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Faisal Orakzai from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai is originally from Orakzai Agency (Tirah Valley), Khyber Pakhtunkhwa (KPK), Pakistan. He currently operates from Karachi. He has represented Pakistan internationally at Silicon Valley, Wall Street New York, and Düsseldorf Germany. He is of Pashtun heritage from the historic Orakzai tribe."
      }
    },
    {
      "@type": "Question",
      "name": "How old is Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai was born on 30 April 2006, making him 20 years old as of 2026. He is considered one of Pakistan's youngest founders in blockchain and AI, having launched Orakzai Group and multiple ventures before the age of 20."
      }
    },
    {
      "@type": "Question",
      "name": "What companies does Faisal Orakzai own?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai is Founder and Chairman of Orakzai Group, which includes: (1) Orakzai Bond (OKBOND) on Polygon blockchain; (2) Shamim Forever — Pakistani luxury fashion brand at shamimforever.com; (3) OkzByte Technology — AI automation and enterprise software; (4) OrakzaiX AI — artificial intelligence research platform; (5) QORIX — strategic technology venture; (6) Orakzai Real Estate — real estate tokenization and property investment."
      }
    },
    {
      "@type": "Question",
      "name": "What is Orakzai Bond on Polygon blockchain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orakzai Bond (OKBOND) is deployed on Polygon Layer-2 — a scalable, low-fee Ethereum-compatible network. This gives OKBOND fast transaction settlement, minimal gas fees, and DeFi ecosystem compatibility. The Orakzai Bond white paper describes it as a sovereign tokenized debt instrument built on blockchain transparency and programmability."
      }
    },
    {
      "@type": "Question",
      "name": "What is OkzByte Technology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OkzByte Technology (OKZBYTE) is a technology venture under Orakzai Group founded by Faisal Orakzai. It provides web development, AI automation, blockchain integration, enterprise software engineering, and digital transformation services for clients in Pakistan and internationally."
      }
    },
    {
      "@type": "Question",
      "name": "What is Shamim Forever?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shamim Forever is a Pakistani luxury fashion and lifestyle brand founded by Faisal Orakzai under Orakzai Group. It blends premium craftsmanship with modern digital storytelling and Pakistani cultural heritage. Accessible at shamimforever.com."
      }
    },
    {
      "@type": "Question",
      "name": "What is OrakzaiX AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OrakzaiX AI is an artificial intelligence automation platform and research framework under Orakzai Group, founded by Faisal Orakzai. It develops AI-driven systems including intelligent workflow automation, AI agents, LLM integrations, and AI infrastructure for Pakistani and global markets."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies does Faisal Orakzai specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai specializes in: Blockchain Architecture (Polygon, Ethereum, Solidity smart contracts), Artificial Intelligence and Machine Learning, Web3 and DeFi, Real World Asset (RWA) Tokenization, Enterprise Software Engineering, Cloud Technologies, and Digital Infrastructure — applied across all Orakzai Group ventures."
      }
    },
    {
      "@type": "Question",
      "name": "Has Faisal Orakzai appeared at international events?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Faisal Orakzai has represented Pakistan at Wall Street New York (Global Blockchain Summit), Silicon Valley USA, and Düsseldorf Germany (International Expansion Summit). He is one of the few young Pakistani entrepreneurs to present blockchain projects on global financial and technology stages."
      }
    },
    {
      "@type": "Question",
      "name": "Does Faisal Orakzai publish research papers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Faisal Orakzai publishes technical research and white papers through Orakzai Research Lab, covering blockchain architecture, DeFi, AI, digital identity, cross-chain interoperability, smart contracts, and Pakistan's digital economy. Full portfolio at faisalorakzai.com/research. ORCID: 0009-0000-0915-7272."
      }
    },
    {
      "@type": "Question",
      "name": "What is the official website of Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The official website is faisalorakzai.com. Individual venture websites: orakzaibond.com (Orakzai Bond / OKBOND) and shamimforever.com (Shamim Forever). Founder biography at faisalorakzai.com/founder and full ecosystem at faisalorakzai.com/ecosystem."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I follow Faisal Orakzai on social media?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Follow Faisal Orakzai on: X (Twitter) @faisalorakzaii, Instagram @faisalorakzaii, LinkedIn as Faisal Orakzai, GitHub at github.com/faisalorakzai-lab. He holds Crunchbase Rank #28 among tracked founders."
      }
    },
    {
      "@type": "Question",
      "name": "What is Faisal Orakzai's vision and mission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai's mission is to build scalable technology platforms that shape industries — combining AI, blockchain, and real-world economic systems. His vision is Pakistan-originated technology ecosystems competing globally. His philosophy: 'I don't build businesses. I build systems that shape industries.'"
      }
    },
    {
      "@type": "Question",
      "name": "What is the Orakzai tribe in Pakistan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Orakzai are a proud Pashtun tribe from Orakzai District (formerly Orakzai Agency) in Khyber Pakhtunkhwa (KPK), Pakistan, with deep roots in Tirah Valley. Faisal Orakzai, founder of Orakzai Group and creator of Orakzai Bond, carries this name as tribute to his tribal identity and KPK heritage."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Faisal Orakzai or Orakzai Group?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contact Faisal Orakzai or Orakzai Group at faisalorakzai.com/contact. The form accepts partnership inquiries, media/press requests, investment discussions, speaking engagements, and collaboration opportunities. Also reachable on LinkedIn and X (Twitter) @faisalorakzaii."
      }
    }
  ]
};

export default function HomeSchema() {
  useEffect(() => {
    const id = "home-faq-schema-js";
    if (document.getElementById(id)) return;
    // Only inject if the static version (from index.html) is somehow missing
    if (!document.getElementById("faq-static")) {
      const s = document.createElement("script");
      s.id = id;
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(FAQ_SCHEMA);
      document.head.appendChild(s);
      return () => { document.getElementById(id)?.remove(); };
    }
  }, []);
  return null;
}
