import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

const LAST_UPDATED = "July 24, 2026";
const EFFECTIVE_DATE = "July 2026";

export default function Disclaimer() {
  useEffect(() => {
    const id = "disclaimer-schema";
    document.getElementById(id)?.remove();
    const ld = document.createElement("script");
    ld.id = id; ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://faisalorakzai.com/disclaimer",
      "url": "https://faisalorakzai.com/disclaimer",
      "name": "Legal Disclaimer — Faisal Orakzai",
      "description": "Legal Disclaimer for faisalorakzai.com covering financial, investment, blockchain, and informational limitations.",
      "datePublished": "2026-07-09",
      "dateModified": "2026-07-24",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" },
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://faisalorakzai.com/" },
        { "@type": "ListItem", "position": 2, "name": "Disclaimer", "item": "https://faisalorakzai.com/disclaimer" }
      ]}
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead
        title="Legal Disclaimer"
        description="Legal Disclaimer for faisalorakzai.com — important limitations on financial advice, blockchain investment information, and general content accuracy by Muhammad Faisal Orakzai."
        path="/disclaimer"
        keywords="legal disclaimer, faisal orakzai, no financial advice, blockchain disclaimer, orakzai group"
      />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Legal · Disclaimer</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Legal Disclaimer</h1>
          <p className="text-white/40 font-mono text-xs">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. No Financial Advice</h2>
            <p>The information provided on this website — including details regarding blockchain protocols, digital assets, decentralized finance (DeFi), yields, and investment opportunities — is strictly for educational and informational purposes only. Nothing on this site constitutes professional financial, tax, investment, or legal advice. <strong className="text-white">Digital assets carry significant risk. You may lose your entire investment.</strong> Always consult a licensed financial advisor before making any investment decisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Blockchain &amp; Crypto Asset Risk</h2>
            <p>Interacting with blockchain networks, smart contracts, and decentralized finance protocols carries inherent technical and market risks. Smart contract code may contain bugs or vulnerabilities. Market prices are highly volatile and unpredictable. Users should perform independent due diligence before engaging with any smart contracts, digital assets, or tokenized instruments referenced on this site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. External Links</h2>
            <p>This website may contain links to third-party domains or platforms. We hold no responsibility for the content, privacy practices, accuracy, or security of third-party platforms. Links are provided for convenience and do not imply endorsement by Orakzai Group.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Research Accuracy</h2>
            <p>Research articles and white papers published by Orakzai Research Lab represent the views and findings of Muhammad Faisal Orakzai at the time of publication. They may not reflect the most current developments. Every effort is made to ensure accuracy, but we cannot guarantee it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Forward-Looking Statements</h2>
            <p>This site may contain forward-looking statements about Orakzai Group ventures, products, and plans. These statements involve risks and uncertainties. Actual results may differ materially from those expressed or implied. Do not rely on forward-looking statements as a basis for investment decisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. No Legal Advice</h2>
            <p>Content on this site does not constitute legal advice. For legal matters pertaining to blockchain, digital assets, or any other subject, consult a qualified attorney in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Muhammad Faisal Orakzai and Orakzai Group shall not be liable for any direct, indirect, incidental, or consequential damages arising from reliance on information provided on this website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Contact</h2>
            <p>Questions? <Link href="/contact" className="text-[#F3BA2F] hover:underline">Contact us here</Link> or email <a href="mailto:legal@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">legal@faisalorakzai.com</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms of Service</Link>
          <Link href="/editorial-policy" className="hover:text-[#F3BA2F] transition-colors">Editorial Policy</Link>
          <Link href="/cookie-policy" className="hover:text-[#F3BA2F] transition-colors">Cookie Policy</Link>
          <Link href="/ai-usage-policy" className="hover:text-[#F3BA2F] transition-colors">AI Usage Policy</Link>
        </div>
      </div>
    </div>
  );
}
