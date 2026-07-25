import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

export default function EditorialPolicy() {
  useEffect(() => {
    const id = "editorial-schema";
    document.getElementById(id)?.remove();
    const ld = document.createElement("script");
    ld.id = id; ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://faisalorakzai.com/editorial-policy",
      "url": "https://faisalorakzai.com/editorial-policy",
      "name": "Editorial Policy — Faisal Orakzai Research Lab",
      "description": "Editorial standards, fact-checking procedures, and publication guidelines for Orakzai Research Lab.",
      "datePublished": "2026-07-09",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "publisher": { "@id": "https://faisalorakzai.com/#research-lab" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" }
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead
        title="Editorial Policy"
        description="Editorial standards, fact-checking procedures, and publication guidelines for Orakzai Research Lab — research by Muhammad Faisal Orakzai."
        path="/editorial-policy"
      />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Research · Editorial</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">Editorial Policy</h1>
          <p className="text-white/40 font-mono text-xs">Last updated: July 9, 2026 · Orakzai Research Lab</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Our Editorial Mission</h2>
            <p>Orakzai Research Lab is committed to publishing accurate, original, and intellectually rigorous content on blockchain technology, artificial intelligence, decentralized finance, and digital infrastructure. All publications reflect the independent views of Muhammad Faisal Orakzai and are not influenced by commercial interests.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Authorship Standards</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>All research is authored by Muhammad Faisal Orakzai.</li>
              <li>Co-authors are credited with their full names and affiliations.</li>
              <li>Ghost authorship is not permitted.</li>
              <li>Author affiliations and potential conflicts of interest are disclosed.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Fact-Checking Process</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>All factual claims are verified against primary sources (whitepapers, official documentation, on-chain data).</li>
              <li>Statistical data cites specific sources with publication dates.</li>
              <li>On-chain data is verified directly from blockchain explorers.</li>
              <li>Third-party claims are cross-referenced with multiple sources.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Corrections Policy</h2>
            <p>If factual errors are identified in published content, we commit to issuing clear corrections. Corrections are noted at the top of the article with the date and nature of the change. Substantive corrections are also updated in the sitemap's <code className="text-[#F3BA2F] bg-white/5 px-1">lastmod</code> date.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Independence & Conflicts of Interest</h2>
            <p>Orakzai Research Lab maintains editorial independence. When we publish research about Orakzai Group's own projects (OKBOND, Shamim Forever, OkzByte), this affiliation is disclosed clearly. Commercial relationships do not influence research conclusions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Plagiarism Policy</h2>
            <p>All content is original. When ideas or data from external sources are referenced, they are cited with full attribution. Reproduction of our content requires attribution under our <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" className="text-[#F3BA2F] hover:underline">CC BY 4.0 license</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">AI Usage in Content</h2>
            <p>Research articles on this site are written by Muhammad Faisal Orakzai. AI tools may be used for grammar assistance or research support, but all ideas, analysis, and conclusions are original. See our <Link href="/ai-usage-policy" className="text-[#F3BA2F] hover:underline">AI Usage Policy</Link> for full details.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Submit Feedback</h2>
            <p>Found an error or have editorial feedback? <Link href="/contact" className="text-[#F3BA2F] hover:underline">Contact us</Link> or email <a href="mailto:editorial@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">editorial@faisalorakzai.com</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-[#F3BA2F] transition-colors">Disclaimer</Link>
          <Link href="/cookie-policy" className="hover:text-[#F3BA2F] transition-colors">Cookie Policy</Link>
          <Link href="/ai-usage-policy" className="hover:text-[#F3BA2F] transition-colors">AI Usage Policy</Link>
        </div>
      </div>
    </div>
  );
}
