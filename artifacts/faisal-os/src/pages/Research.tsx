import { motion } from "framer-motion";
import { useListResearch } from "@workspace/api-client-react";
import { getListResearchQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Users, Calendar } from "lucide-react";
import { useState } from "react";

const types = ["All", "Whitepaper", "Research Paper", "Technical Document", "Tokenomics", "Smart Contracts", "AI Research", "Economic Models"];

export default function Research() {
  const [activeType, setActiveType] = useState("All");
  const params = activeType !== "All" ? { type: activeType } : undefined;
  const { data: papers, isLoading } = useListResearch(params, {
    query: { queryKey: getListResearchQueryKey(params) },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 border-b border-border/50 bg-gradient-to-b from-card/40 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-mono tracking-widest mb-6">
            <FileText className="h-3 w-3" /> RESEARCH LAB
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter uppercase mb-4">KNOWLEDGE <span className="text-primary">REPOSITORY</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Peer-reviewed research, technical whitepapers, and original contributions to blockchain, AI, and digital economics.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-border/50 bg-card/20 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {types.map((type) => (
              <button key={type} onClick={() => setActiveType(type)} className={`px-5 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${activeType === type ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="space-y-6">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}</div>
        ) : (
          <div className="space-y-6">
            {papers?.map((paper, i) => (
              <motion.div key={paper.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="bg-card border border-border/50 p-8 hover:border-primary/30 transition-colors group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{paper.title}</h3>
                        <Badge variant="outline" className="border-secondary/30 text-secondary font-mono text-xs">{paper.type}</Badge>
                      </div>
                      {paper.downloadUrl && (
                        <a href={paper.downloadUrl} target="_blank" rel="noreferrer" className="flex-shrink-0 flex items-center gap-1 text-xs text-primary font-mono hover:underline">
                          <Download className="h-3 w-3" /> PDF
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{paper.abstract}</p>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {paper.authors.join(", ")}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(paper.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                    </div>
                    {paper.tags && paper.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {paper.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 border border-border/50 text-muted-foreground font-mono">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {papers?.length === 0 && (
              <div className="text-center py-20 text-muted-foreground font-mono text-sm">NO PAPERS FOUND FOR THIS CATEGORY</div>
            )}
          </div>
        )}
      </section>
    </motion.div>
  );
}
