import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

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
      "name": "Disclaimer — Faisal Orakzai",
      "description": "Disclaimer for faisalorakzai.com covering financial, investment, and informational limitations.",
      "datePublished": "2026-07-09",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" }
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead
        title="Disclaimer"
        description="Disclaimer for faisalorakzai.com — important limitations on financial advice, investment information, and general content accuracy."
        path="/disclaimer"
      />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Legal · Disclaimer</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Disclaimer</h1>
          <p className="text-white/40 font-mono text-xs">Last updated: July 9, 2026</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">General Information</h2>
            <p>The information on faisalorakzai.com is provided for general informational and educational purposes only. It is not intended as, and does not constitute, professional advice of any kind.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">No Financial Advice</h2>
            <p>Nothing on this website — including information about Orakzai Bond (OKBOND), digital assets, blockchain projects, or investment opportunities — constitutes financial advice, investment advice, trading advice, or any other type of advice. <strong className="text-white">Digital assets carry significant risk. You may lose your entire investment.</strong> Always consult a licensed financial advisor.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">No Legal Advice</h2>
            <p>Content on this site does not constitute legal advice. For legal matters, consult a qualified attorney in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Research Accuracy</h2>
            <p>Research articles and white papers published by Orakzai Research Lab represent the views and findings of Muhammad Faisal Orakzai at the time of publication. They may not reflect the most current developments. We make every effort to ensure accuracy but cannot guarantee it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Forward-Looking Statements</h2>
            <p>This site may contain forward-looking statements about Orakzai Group ventures, products, and plans. These statements involve risks and uncertainties. Actual results may differ materially from those expressed or implied.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">External Links</h2>
            <p>Links to third-party websites are provided for convenience only. Orakzai Group does not endorse and is not responsible for third-party content.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Muhammad Faisal Orakzai and Orakzai Group shall not be liable for any damages arising from reliance on information provided on this website.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms of Service</Link>
          <Link href="/editorial-policy" className="hover:text-[#F3BA2F] transition-colors">Editorial Policy</Link>
          <Link href="/cookie-policy" className="hover:text-[#F3BA2F] transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </div>
  );
}
