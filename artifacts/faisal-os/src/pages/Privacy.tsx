import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

const LAST_UPDATED = "July 9, 2026";

export default function Privacy() {
  useEffect(() => {
    const id = "privacy-schema";
    document.getElementById(id)?.remove();
    const ld = document.createElement("script");
    ld.id = id; ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://faisalorakzai.com/privacy",
      "url": "https://faisalorakzai.com/privacy",
      "name": "Privacy Policy — Faisal Orakzai",
      "description": "Privacy Policy for faisalorakzai.com — how we collect, use, and protect your data.",
      "datePublished": "2026-07-09",
      "dateModified": "2026-07-09",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" },
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://faisalorakzai.com/" },
        { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://faisalorakzai.com/privacy" }
      ]}
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead
        title="Privacy Policy"
        description="Privacy Policy for faisalorakzai.com — how Muhammad Faisal Orakzai and Orakzai Group collect, use, and protect your personal data."
        path="/privacy"
      />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Legal · Privacy</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/40 font-mono text-xs">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              Muhammad Faisal Orakzai ("we", "our", "Orakzai Group") operates faisalorakzai.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-white">Contact form data</strong> — name, email, message when you submit the contact form.</li>
              <li><strong className="text-white">Usage data</strong> — pages visited, time spent, browser type, IP address (anonymized).</li>
              <li><strong className="text-white">Cookies</strong> — session and preference cookies. See our Cookie Policy for details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>To respond to your contact and collaboration inquiries.</li>
              <li>To improve website content and user experience.</li>
              <li>To analyze traffic patterns and optimize performance.</li>
              <li>To send updates if you have opted in.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal data to third parties. We may share data with trusted service providers (hosting, email delivery) who assist in operating our website, under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience. You may disable cookies in your browser settings. For full details, see our <Link href="/cookie-policy" className="text-[#F3BA2F] hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
            <p>
              Contact form submissions are retained for up to 12 months. You may request deletion at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data. Submit requests to: <a href="mailto:privacy@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">privacy@faisalorakzai.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Security</h2>
            <p>
              We implement HTTPS, security headers, and industry-standard measures to protect your data. No transmission over the internet is 100% secure; we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this policy periodically. Changes are effective immediately upon posting. Continued use of the site constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Contact</h2>
            <p>
              Questions about this Privacy Policy? Contact us at{" "}
              <a href="mailto:privacy@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">privacy@faisalorakzai.com</a>
              {" "}or via <Link href="/contact" className="text-[#F3BA2F] hover:underline">our contact page</Link>.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-[#F3BA2F] transition-colors">Disclaimer</Link>
          <Link href="/editorial-policy" className="hover:text-[#F3BA2F] transition-colors">Editorial Policy</Link>
          <Link href="/cookie-policy" className="hover:text-[#F3BA2F] transition-colors">Cookie Policy</Link>
          <Link href="/ai-usage-policy" className="hover:text-[#F3BA2F] transition-colors">AI Usage Policy</Link>
        </div>
      </div>
    </div>
  );
}
