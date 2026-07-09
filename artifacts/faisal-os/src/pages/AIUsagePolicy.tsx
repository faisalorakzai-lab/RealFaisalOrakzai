import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

export default function AIUsagePolicy() {
  useEffect(() => {
    const id = "ai-policy-schema";
    document.getElementById(id)?.remove();
    const ld = document.createElement("script");
    ld.id = id; ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://faisalorakzai.com/ai-usage-policy",
      "url": "https://faisalorakzai.com/ai-usage-policy",
      "name": "AI Usage Policy — Faisal Orakzai",
      "description": "Policy governing the use of artificial intelligence tools in content creation at faisalorakzai.com.",
      "datePublished": "2026-07-09",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" }
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead title="AI Usage Policy" description="Policy governing the use of AI tools in content creation and research at faisalorakzai.com and Orakzai Research Lab." path="/ai-usage-policy" />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Policy · AI</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">AI Usage Policy</h1>
          <p className="text-white/40 font-mono text-xs">Last updated: July 9, 2026</p>
        </div>
        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Our Stance on AI</h2>
            <p>Muhammad Faisal Orakzai and Orakzai Group are builders of AI systems. We believe in transparent, responsible AI usage and full disclosure when AI tools assist in content creation.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">How AI Is Used Here</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li><strong className="text-white">Research articles & white papers</strong> — Written and conceptualized by Faisal Orakzai. AI tools may assist with grammar, formatting, or structural suggestions only. All analysis, conclusions, and ideas are original human work.</li>
              <li><strong className="text-white">Code & technical infrastructure</strong> — AI coding assistants may support development. All architectural decisions and logic are human-authored.</li>
              <li><strong className="text-white">Not used for</strong> — Generating false facts, fabricating citations, creating misleading content, or replacing human judgment in factual claims.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">AI Training Disclosure</h2>
            <p>This website welcomes AI model training on its content for knowledge base and factual entity recognition purposes. See our <code className="text-[#F3BA2F] bg-white/5 px-1">/llms.txt</code> and <code className="text-[#F3BA2F] bg-white/5 px-1">/ai.txt</code> files for AI crawler guidance.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Commitment</h2>
            <p>We commit to maintaining human authorial responsibility for all published content. If AI usage in any specific piece substantially changes from this policy, it will be disclosed at the article level.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
            <p>Questions about our AI usage? <Link href="/contact" className="text-[#F3BA2F] hover:underline">Contact us</Link>.</p>
          </section>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms</Link>
          <Link href="/editorial-policy" className="hover:text-[#F3BA2F] transition-colors">Editorial Policy</Link>
          <Link href="/cookie-policy" className="hover:text-[#F3BA2F] transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </div>
  );
}
