import { useEffect } from "react";
import SEOHead from "@/components/shared/SEOHead";
import { Link } from "wouter";

const LAST_UPDATED = "July 24, 2026";
const EFFECTIVE_DATE = "July 2026";

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
      "description": "Policy governing the use of artificial intelligence tools, trading engines, and algorithmic systems at faisalorakzai.com.",
      "datePublished": "2026-07-09",
      "dateModified": "2026-07-24",
      "author": { "@id": "https://faisalorakzai.com/#person" },
      "isPartOf": { "@id": "https://faisalorakzai.com/#website" },
      "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://faisalorakzai.com/" },
        { "@type": "ListItem", "position": 2, "name": "AI Usage Policy", "item": "https://faisalorakzai.com/ai-usage-policy" }
      ]}
    });
    document.head.appendChild(ld);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <SEOHead
        title="AI Usage Policy"
        description="Policy governing the use of artificial intelligence models, trading engines, and algorithmic tools deployed across ecosystems developed by Faisal Orakzai."
        path="/ai-usage-policy"
        keywords="AI usage policy, faisal orakzai, algorithmic trading, AI transparency, orakzai group"
      />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#F3BA2F]" />
            <span className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.35em] uppercase">Policy · AI</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">AI Usage Policy</h1>
          <p className="text-white/40 font-mono text-xs">Effective Date: {EFFECTIVE_DATE} &nbsp;·&nbsp; Last updated: {LAST_UPDATED}</p>
        </div>

        <p className="text-white/70 leading-relaxed mb-10">
          This policy outlines how artificial intelligence models, trading engines, and algorithmic tools are deployed across ecosystems developed by Faisal Orakzai and Orakzai Group.
        </p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Algorithmic Automation</h2>
            <p>Automated software systems and AI trading bots operate on predefined algorithmic parameters. Past performance or backtested metrics do not guarantee future execution outcomes. All algorithmic systems are subject to market conditions, technical constraints, and regulatory limitations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. User Responsibility</h2>
            <p>Users interacting with AI-driven software, protocol tools, or analytics platforms are solely responsible for evaluating the risks associated with automated execution and smart contract interaction. No output from these systems constitutes financial, legal, or investment advice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Data &amp; Privacy in AI Operations</h2>
            <p>We do not store or sell private user prompt data, cryptographic keys, or sensitive personal indicators used during algorithmic operations. Data processed during AI-assisted workflows is handled in strict accordance with our <Link href="/privacy" className="text-[#F3BA2F] hover:underline">Privacy Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Content Creation &amp; Authorship</h2>
            <p>Research articles and white papers published by Orakzai Research Lab are written and conceptualized by Faisal Orakzai. AI tools may assist with grammar, formatting, or structural suggestions only. All analysis, conclusions, and ideas are original human work. We commit to full disclosure at the article level if AI usage substantially changes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. AI Training Disclosure</h2>
            <p>This website welcomes AI model training on its content for knowledge base and factual entity recognition purposes. See our <code className="text-[#F3BA2F] bg-white/5 px-1">/llms.txt</code> and <code className="text-[#F3BA2F] bg-white/5 px-1">/ai.txt</code> files for AI crawler guidance and permissions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Prohibited AI Uses</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Generating false facts or fabricating citations about Faisal Orakzai or Orakzai Group</li>
              <li>Creating misleading content using our name or branding</li>
              <li>Replacing human judgment in factual, legal, or financial claims attributed to us</li>
              <li>Training models to impersonate Faisal Orakzai without explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Commitment</h2>
            <p>We believe in transparent, responsible AI usage. Orakzai Group is a builder of AI systems and holds itself to the highest standard of disclosure and accountability in all AI-assisted operations.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Contact</h2>
            <p>Questions about our AI usage? <Link href="/contact" className="text-[#F3BA2F] hover:underline">Contact us here</Link> or email <a href="mailto:legal@faisalorakzai.com" className="text-[#F3BA2F] hover:underline">legal@faisalorakzai.com</a>.</p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-xs text-white/30 font-mono">
          <Link href="/privacy" className="hover:text-[#F3BA2F] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#F3BA2F] transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-[#F3BA2F] transition-colors">Disclaimer</Link>
          <Link href="/cookie-policy" className="hover:text-[#F3BA2F] transition-colors">Cookie Policy</Link>
          <Link href="/editorial-policy" className="hover:text-[#F3BA2F] transition-colors">Editorial Policy</Link>
        </div>
      </div>
    </div>
  );
}
