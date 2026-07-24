import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

const LAST_UPDATED = "July 24, 2026";
const EFFECTIVE_DATE = "July 2026";

export default function Terms() {
  useEffect(() => {
    const id = "terms-schema";
    document.getElementById(id)?.remove();
    const ld = document.createElement("script");
    ld.id = id; ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://faisalorakzai.com/terms",
      "url": "https://faisalorakzai.com/terms",
      "name": "Terms of Service — Faisal Orakzai",
      "description": "Terms of Service for faisalorakzai.com — governing use of this website and its content.",
      "datePublished": "2026-07-09",
      "dateModified": "2026-07-24",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" },
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://faisalorakzai.com/" },
        { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://faisalorakzai.com/terms" }
      ]}
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead
        title="Terms of Service"
        description="Terms of Service for faisalorakzai.com — governing use of this website, content, and intellectual property of Muhammad Faisal Orakzai and Orakzai Group."
        path="/terms"
        keywords="terms of service, faisal orakzai, orakzai group, legal, website terms"
      />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Legal · Terms</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-white/40 font-mono text-xs">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last updated: {LAST_UPDATED}</p>
        </div>

        <p className="text-white/70 leading-relaxed mb-10">
          Welcome to <strong className="text-white">faisalorakzai.com</strong>. By accessing or using this website, you agree to comply with and be bound by the following Terms of Service. If you do not agree, please discontinue use immediately.
        </p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Intellectual Property</h2>
            <p>All content, branding, media, logos, architectural designs, research articles, white papers, and code displayed on this website are the intellectual property of Muhammad Faisal Orakzai and Orakzai Group unless otherwise stated. Unauthorized reproduction, distribution, or commercial use is strictly prohibited.</p>
            <p className="mt-2">Research publications are licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-[#F3BA2F] hover:underline">Creative Commons Attribution 4.0 International (CC BY 4.0)</a> unless otherwise stated.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Use of Site</h2>
            <p>You agree to use this website only for lawful purposes. You must not attempt to breach site security, scrape data without permission, use automated tools to overload the server, reproduce content without attribution, or misuse any form or communication channel provided on this site.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Financial &amp; Technical Disclaimers</h2>
            <p>Information provided regarding decentralized finance (DeFi), real-world asset tokenization, smart contracts, or Orakzai Bond (OKBOND) is for informational purposes only and does not constitute financial, investment, or legal advice. Digital assets carry significant risk. Always consult a licensed financial advisor before making investment decisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Disclaimer of Warranties</h2>
            <p>This website is provided "as is" without warranties of any kind, express or implied. We do not warrant accuracy, completeness, or fitness for a particular purpose of any content published herein.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Limitation of Liability</h2>
            <p>Muhammad Faisal Orakzai and Orakzai Group shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on information provided herein.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. External Links</h2>
            <p>This site may contain links to third-party websites. We are not responsible for the content, privacy practices, or accuracy of any external sites. Links are provided for convenience only.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Governing Law</h2>
            <p>These Terms are governed by the laws of Pakistan. Any disputes shall be resolved in the courts of Karachi, Sindh, Pakistan.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Amendments</h2>
            <p>We reserve the right to update these Terms at any time without prior notice. Continued use of the site after any modification constitutes your acceptance of the updated Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Contact</h2>
            <p>Questions? <Link href="/contact" className="text-[#F3BA2F] hover:underline">Contact us here</Link> or email <a href="mailto:legal@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">legal@faisalorakzai.com</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/disclaimer" className="hover:text-[#F3BA2F] transition-colors">Disclaimer</Link>
          <Link href="/cookie-policy" className="hover:text-[#F3BA2F] transition-colors">Cookie Policy</Link>
          <Link href="/ai-usage-policy" className="hover:text-[#F3BA2F] transition-colors">AI Usage Policy</Link>
          <Link href="/editorial-policy" className="hover:text-[#F3BA2F] transition-colors">Editorial Policy</Link>
        </div>
      </div>
    </div>
  );
}
