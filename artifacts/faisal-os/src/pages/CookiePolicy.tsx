import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

export default function CookiePolicy() {
  useEffect(() => {
    const id = "cookie-schema";
    document.getElementById(id)?.remove();
    const ld = document.createElement("script");
    ld.id = id; ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://faisalorakzai.com/cookie-policy",
      "url": "https://faisalorakzai.com/cookie-policy",
      "name": "Cookie Policy — Faisal Orakzai",
      "datePublished": "2026-07-09",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" }
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead title="Cookie Policy" description="Cookie Policy for faisalorakzai.com — how we use cookies and how to control them." path="/cookie-policy" />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Legal · Cookies</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-white/40 font-mono text-xs">Last updated: July 9, 2026</p>
        </div>
        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">What Are Cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">How We Use Cookies</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-white">Essential cookies</strong> — Required for the website to function (session management, security).</li>
              <li><strong className="text-white">Analytics cookies</strong> — Used to understand how visitors use the site (anonymized). We may use Google Analytics or similar tools.</li>
              <li><strong className="text-white">Preference cookies</strong> — Remember your settings and preferences.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Managing Cookies</h2>
            <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality. Most browsers allow you to: view cookies, delete cookies, block cookies from specific or all sites.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Third-Party Cookies</h2>
            <p>Some third-party services embedded on this site (fonts, analytics) may set their own cookies. We have no control over these cookies. Refer to those services' own cookie policies.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
            <p>Questions? <Link href="/contact" className="text-[#F3BA2F] hover:underline">Contact us</Link> or email <a href="mailto:privacy@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">privacy@faisalorakzai.com</a>.</p>
          </section>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms</Link>
          <Link href="/disclaimer" className="hover:text-[#F3BA2F] transition-colors">Disclaimer</Link>
          <Link href="/ai-usage-policy" className="hover:text-[#F3BA2F] transition-colors">AI Usage Policy</Link>
        </div>
      </div>
    </div>
  );
}
