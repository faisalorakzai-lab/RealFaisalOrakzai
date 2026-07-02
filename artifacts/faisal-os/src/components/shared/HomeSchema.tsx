import { useEffect } from "react";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Who is Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai is a technology entrepreneur and founder of Orakzai Group, focused on AI, blockchain infrastructure, digital assets, and enterprise technology solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What is Orakzai Group?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orakzai Group is a technology-focused organization developing solutions in blockchain, artificial intelligence, fintech, and digital infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "What is Orakzai Bond?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orakzai Bond is a blockchain-based digital asset project designed to explore transparent treasury systems, staking infrastructure, and tokenized digital finance."
      }
    },
    {
      "@type": "Question",
      "name": "What is OKZBYTE Technology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OKZBYTE Technology provides technology services ranging from web development to AI, blockchain, software engineering, and digital transformation solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What is Shamim Forever?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shamim Forever is a digital platform created to preserve memories, stories, and meaningful tributes through modern technology."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Faisal Orakzai work in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai works in Artificial Intelligence, Blockchain, FinTech, Enterprise Software, Web Development, and Digital Infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "What is Faisal Orakzai's mission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To build scalable technology platforms that contribute to secure, efficient, and innovative digital ecosystems."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies does Faisal Orakzai specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai specializes in AI, Blockchain, Web3, Smart Contracts, Tokenization, Enterprise Systems, and Cloud Technologies."
      }
    },
    {
      "@type": "Question",
      "name": "Does Faisal Orakzai write technical articles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. He publishes educational articles covering blockchain, AI, Web3, digital identity, interoperability, and enterprise blockchain topics."
      }
    },
    {
      "@type": "Question",
      "name": "What is Faisal Orakzai's long-term vision?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To contribute to the development of trusted digital infrastructure that supports future financial and technological ecosystems."
      }
    },
    {
      "@type": "Question",
      "name": "Does Faisal Orakzai work on AI projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. His work includes AI-powered automation and intelligent digital solutions across multiple ventures."
      }
    },
    {
      "@type": "Question",
      "name": "What is blockchain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Blockchain is a distributed ledger technology that enables secure, transparent, and verifiable digital transactions without relying on a central authority."
      }
    },
    {
      "@type": "Question",
      "name": "What is tokenization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tokenization is the process of representing real-world or digital assets as blockchain-based tokens, enabling new models of ownership and value exchange."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The official contact information is available on the Contact page of faisalorakzai.com. You can also connect via LinkedIn at linkedin.com/in/faisalorakzaii."
      }
    },
    {
      "@type": "Question",
      "name": "Does Faisal Orakzai collaborate on technology projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Collaboration opportunities may be considered depending on the project's goals and alignment. Submit a formal inquiry via the Contact page at faisalorakzai.com/contact."
      }
    }
  ]
};

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Faisal Orakzai",
  "alternateName": ["Muhammad Faisal Orakzai", "faisalorakzaii"],
  "description": "Technology entrepreneur and founder of Orakzai Group, focused on AI, blockchain infrastructure, digital assets, and enterprise technology solutions.",
  "url": "https://faisalorakzai.com",
  "image": [
    "https://faisalorakzai.com/faisal-official.jpg",
    "https://faisalorakzai.com/faisal-photo-1.jpg",
    "https://faisalorakzai.com/faisal-photo-2.png",
    "https://faisalorakzai.com/faisal-photo-3.png"
  ],
  "birthDate": "2006-04-30",
  "nationality": "Pakistani",
  "jobTitle": "Founder & Technology Entrepreneur",
  "worksFor": {
    "@type": "Organization",
    "name": "Orakzai Group",
    "url": "https://faisalorakzai.com"
  },
  "knowsAbout": [
    "Artificial Intelligence",
    "Blockchain",
    "Web3",
    "Smart Contracts",
    "Digital Assets",
    "Tokenization",
    "Enterprise Technology",
    "FinTech"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/faisalorakzaii",
    "https://x.com/faisalorakzaii",
    "https://www.instagram.com/faisalorakzaii",
    "https://github.com/faisalorakzai-lab",
    "https://www.crunchbase.com/person/faisal-orakzai",
    "https://orcid.org/0009-0000-0915-7272",
    "https://www.wikidata.org/wiki/Q140264666"
  ]
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Faisal Orakzai",
  "url": "https://faisalorakzai.com",
  "description": "Official website of Faisal Orakzai — technology entrepreneur, blockchain and AI founder.",
  "publisher": {
    "@type": "Person",
    "name": "Faisal Orakzai"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://faisalorakzai.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

function injectSchema(id: string, schema: object) {
  document.getElementById(id)?.remove();
  const s = document.createElement("script");
  s.id = id;
  s.type = "application/ld+json";
  s.text = JSON.stringify(schema);
  document.head.appendChild(s);
}

export default function HomeSchema() {
  useEffect(() => {
    injectSchema("schema-faq", FAQ_SCHEMA);
    injectSchema("schema-person", PERSON_SCHEMA);
    injectSchema("schema-website", WEBSITE_SCHEMA);
    return () => {
      document.getElementById("schema-faq")?.remove();
      document.getElementById("schema-person")?.remove();
      document.getElementById("schema-website")?.remove();
    };
  }, []);
  return null;
}
