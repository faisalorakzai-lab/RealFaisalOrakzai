import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

const LAST_UPDATED = "July 24, 2026";
const EFFECTIVE_DATE = "July 2026";

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
      "description": "Cookie Policy for faisalorakzai.com — how cookies and analytics tags are used to optimize user experience.",
      "datePublished": "2026-07-09",
      "dateModified": "2026-07-24",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" },
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://faisalorakzai.com/" },
        { "@type": "ListItem", "position": 2, "name": "Cookie Policy", "item": "https://faisalorakzai.com/cookie-policy" }
      ]}
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead
        title="Cookie Policy"
        description="Cookie Policy for faisalorakzai.com — how cookies and analytics tags are used to optimize user experience on the Faisal Orakzai website."
        path="/cookie-policy"
        keywords="cookie policy, faisal orakzai, cookies, analytics, user tracking, orakzai group"
      />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Legal · Cookies</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-white/40 font-mono text-xs">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last updated: {LAST_UPDATED}</p>
        </div>

        <p className="text-white/70 leading-relaxed mb-10">
          This page explains how cookies and analytics tags are used to optimize user experience on <strong className="text-white">faisalorakzai.com</strong>.
        </p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies?</h2>
            <p>Cookies are small text files stored on your browser to help analyze site traffic, remember session settings, and improve performance. They enable websites to remember your preferences and deliver a more consistent experience across visits.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Types of Cookies Used</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>
                <strong className="text-white">Essential Cookies:</strong> Required for core site navigation, session management, and security. The site cannot function properly without these cookies.
              </li>
              <li>
                <strong className="text-white">Analytics Cookies:</strong> Used to understand visitor behavior (e.g., Google Search Console / Analytics metrics). These cookies collect anonymized data about pages visited and time spent on the site.
              </li>
              <li>
                <strong className="text-white">Preference Cookies:</strong> Remember your settings and display preferences to improve your experience on return visits.
              </li>
              <li>
                <strong className="text-white">Third-Party Cookies:</strong> Some embedded services (fonts, media embeds) may set their own cookies. We have no direct control over these.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Managing Cookies</h2>
            <p>You can adjust your browser settings at any time to block or delete cookies, though certain interactive features may function differently. Most modern browsers allow you to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>View which cookies are stored on your device</li>
              <li>Delete individual or all cookies</li>
              <li>Block cookies from specific websites or all websites</li>
              <li>Set preferences for first-party vs. third-party cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Cookies</h2>
            <p>Some third-party services embedded on this site (such as Google Fonts, analytics platforms, or social media embeds) may set their own cookies independently. We hold no responsibility for third-party cookie practices. Please refer to those services' own cookie policies for details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Changes to This Policy</h2>
            <p>We may update this Cookie Policy periodically. Changes are effective immediately upon posting. Continued use of the site constitutes your acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Contact</h2>
            <p>Questions about cookies or our data practices? <Link href="/contact" className="text-[#F3BA2F] hover:underline">Contact us here</Link> or email <a href="mailto:privacy@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">privacy@faisalorakzai.com</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-[#F3BA2F] transition-colors">Disclaimer</Link>
          <Link href="/ai-usage-policy" className="hover:text-[#F3BA2F] transition-colors">AI Usage Policy</Link>
          <Link href="/editorial-policy" className="hover:text-[#F3BA2F] transition-colors">Editorial Policy</Link>
        </div>
      </div>
    </div>
  );
}
