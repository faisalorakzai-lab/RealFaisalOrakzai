import { motion } from "framer-motion";
import { useListResearch, getListResearchQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, Users, Calendar } from "lucide-react";
import { useState } from "react";

const types = ["All", "Whitepaper", "Research Paper", "Technical Document", "Tokenomics", "AI Research", "Economic Models"];

export default function Research() {
  const [activeType, setActiveType] = useState("All");
  const params = activeType !== "All" ? { type: activeType } : undefined;
  const { data: papers, isLoading } = useListResearch(params, {
    query: { queryKey: getListResearchQueryKey(params) },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-12 border-b border-[#F3BA2F]/10 bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/20 mb-8">
              <FileText className="h-3 w-3 text-[#F3BA2F]" />
              <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">RESEARCH LAB</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Knowledge <span className="gold-gradient">Repository</span></h1>
            <p className="text-white/40 text-lg max-w-xl mb-10">Research, whitepapers, and original contributions to blockchain, AI, and digital economics.</p>
            <div className="flex flex-wrap gap-0 border-b border-white/5">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-5 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${activeType === type ? "border-[#F3BA2F] text-[#F3BA2F]" : "border-transparent text-white/30 hover:text-white"}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="space-y-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 w-full bg-white/5" />)}</div>
        ) : (
          <div className="space-y-px bg-[#F3BA2F]/5">
            {papers?.map((paper, i) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-black p-8 hover:bg-[#F3BA2F]/3 transition-colors group"
              >
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0 w-12 h-12 border border-[#F3BA2F]/20 flex items-center justify-center text-[#F3BA2F] group-hover:border-[#F3BA2F]/50 transition-colors">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="font-mono text-xs text-[#F3BA2F]/50 border border-[#F3BA2F]/15 px-2 py-0.5 block w-fit mb-3">{paper.type.toUpperCase()}</span>
                        <h3 className="font-bold text-xl group-hover:text-[#F3BA2F] transition-colors">{paper.title}</h3>
                      </div>
                      {paper.downloadUrl && (
                        <a href={paper.downloadUrl} target="_blank" rel="noreferrer" className="flex-shrink-0 flex items-center gap-1 text-xs text-[#F3BA2F] font-mono hover:underline">
                          <Download className="h-3 w-3" /> PDF
                        </a>
                      )}
                    </div>
                    <p className="text-white/40 leading-relaxed mb-4 text-sm">{paper.abstract}</p>
                    <div className="flex items-center gap-6 text-xs text-white/25 font-mono">
                      <span className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {paper.authors.join(", ")}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {new Date(paper.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                    </div>
                    {paper.tags && paper.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {paper.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 border border-white/10 text-white/25 font-mono">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {papers?.length === 0 && (
              <div className="text-center py-24 text-white/20 font-mono text-xs tracking-[0.3em]">NO PAPERS IN THIS CATEGORY</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
