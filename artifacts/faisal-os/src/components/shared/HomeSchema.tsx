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
        "text": "Muhammad Faisal Orakzai is a Pakistani technology entrepreneur born on 30 April 2006 in Orakzai Agency, KPK, Pakistan. He is the Founder and Chairman of Orakzai Group, creator of Orakzai Bond (OKBOND) on Polygon blockchain, Shamim Forever, OkzByte Technology, and OrakzaiX AI."
      }
    },
    {
      "@type": "Question",
      "name": "What is Orakzai Bond (OKBOND)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orakzai Bond (OKBOND) is a digital asset built on the Polygon Layer-2 blockchain. It is a blockchain-based digital asset project exploring transparent treasury systems, staking infrastructure, and tokenized digital finance. Visit orakzaibond.com."
      }
    },
    {
      "@type": "Question",
      "name": "What is Orakzai Group?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Orakzai Group is a technology-focused organization founded by Faisal Orakzai, developing solutions in blockchain, artificial intelligence, fintech, and digital infrastructure. It encompasses Orakzai Bond, OKZBYTE Technology, Shamim Forever, and OrakzaiX."
      }
    },
    {
      "@type": "Question",
      "name": "Where is Faisal Orakzai from?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai is originally from Orakzai Agency, Tirah, Khyber Pakhtunkhwa (KPK), Pakistan. He currently operates from Karachi and has represented Pakistan internationally at Silicon Valley, Wall Street New York, and Dusseldorf Germany."
      }
    },
    {
      "@type": "Question",
      "name": "What is OKZBYTE Technology?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OKZBYTE Technology is a venture under Orakzai Group providing web development, AI, blockchain, software engineering, and digital transformation services."
      }
    },
    {
      "@type": "Question",
      "name": "What is Shamim Forever?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shamim Forever is a digital platform created to preserve memories, stories, and meaningful tributes through modern technology. Visit shamimforever.com."
      }
    },
    {
      "@type": "Question",
      "name": "What is OrakzaiX AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "OrakzaiX AI is an artificial intelligence automation platform and research framework under Orakzai Group, founded by Faisal Orakzai. It focuses on developing AI-driven systems for enterprise and consumer applications including intelligent workflow automation and AI infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "How old is Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai was born on 30 April 2006, making him 20 years old as of 2026. He is recognized as one of Pakistan's youngest blockchain architects and technology entrepreneurs."
      }
    },
    {
      "@type": "Question",
      "name": "What technologies does Faisal Orakzai specialize in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai specializes in AI, Blockchain, Web3, Smart Contracts, Tokenization, Enterprise Systems, and Cloud Technologies. His work spans blockchain architecture, AI automation, and enterprise digital infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Faisal Orakzai work in?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai works across Artificial Intelligence, Blockchain, FinTech, Enterprise Software, Web Development, and Digital Infrastructure."
      }
    },
    {
      "@type": "Question",
      "name": "Does Faisal Orakzai write technical articles?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Faisal publishes research and educational articles covering blockchain, AI, Web3, digital identity, interoperability, and enterprise blockchain. His full research portfolio is at faisalorakzai.com/research."
      }
    },
    {
      "@type": "Question",
      "name": "How can I contact Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contact Faisal Orakzai via the Contact page at faisalorakzai.com/contact. You can also connect on LinkedIn and X (Twitter) at @faisalorakzaii."
      }
    },
    {
      "@type": "Question",
      "name": "Does Faisal Orakzai collaborate on technology projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Collaboration opportunities are considered based on goals and alignment. Submit a formal inquiry at faisalorakzai.com/contact."
      }
    },
    {
      "@type": "Question",
      "name": "What is Faisal Orakzai's mission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Faisal Orakzai's mission is to build scalable technology platforms that contribute to secure, efficient, and innovative digital ecosystems, with a long-term vision of digital infrastructure that benefits organizations and communities globally."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I follow Faisal Orakzai?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Follow Faisal Orakzai on LinkedIn, X (Twitter), and Instagram @faisalorakzaii, and on GitHub at github.com/faisalorakzai-lab. Updates are shared at faisalorakzai.com."
      }
    }
  ]
};

export default function HomeSchema() {
  useEffect(() => {
    const id = "home-faq-schema";
    if (document.getElementById(id)) return;
    // Skip if static FAQPage schema already present (prevents duplicate with index.html)
    const alreadyHasFAQ = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .some(s => s.textContent?.includes('"FAQPage"'));
    if (alreadyHasFAQ) return;
    const s = document.createElement("script");
    s.id = id;
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(s);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
  return null;
}
