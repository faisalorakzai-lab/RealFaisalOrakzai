import { motion, AnimatePresence } from "framer-motion";
import { useListProjects, getListProjectsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Blockchain", "AI", "Luxury", "Commerce", "Research", "Infrastructure"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const params = activeCategory !== "All" ? { category: activeCategory } : undefined;
  const { data: projects, isLoading } = useListProjects(params, {
    query: { queryKey: getListProjectsQueryKey(params) },
  });
  const selected = projects?.find((p) => p.id === selectedId);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-12 border-b border-[#F3BA2F]/10 bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
              <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">{projects?.length ?? 0} PROJECTS INDEXED</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Selected <span className="gold-gradient">Work</span></h1>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${activeCategory === cat ? "border-[#F3BA2F] text-[#F3BA2F] bg-[#F3BA2F]/5" : "border-white/10 text-white/40 hover:border-[#F3BA2F]/40 hover:text-white/70"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F3BA2F]/5">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 bg-black" />)}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F3BA2F]/10" layout>
            {projects?.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedId(project.id)}
                className="bg-black p-8 cursor-pointer hover:bg-[#F3BA2F]/3 transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-[#F3BA2F]/60 border border-[#F3BA2F]/20 px-2 py-1">{project.category.toUpperCase()}</span>
                  <span className="text-xs text-white/20 font-mono">{project.year}</span>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-[#F3BA2F] transition-colors">{project.title}</h3>
                <p className="text-sm text-white/40 line-clamp-3 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono px-3 py-1 border ${project.status === "Live" ? "border-green-500/30 text-green-400/70" : project.status === "In Development" ? "border-yellow-500/30 text-yellow-400/70" : "border-white/10 text-white/30"}`}>
                    {project.status.toUpperCase()}
                  </span>
                  <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-[#F3BA2F] transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-[#F3BA2F]/30 p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="font-mono text-xs text-[#F3BA2F]/60 border border-[#F3BA2F]/20 px-2 py-1 block w-fit mb-4">{selected.category.toUpperCase()}</span>
                  <h2 className="text-3xl font-bold">{selected.title}</h2>
                </div>
                <button onClick={() => setSelectedId(null)} className="text-white/30 hover:text-white transition-colors mt-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-8">
                <div>
                  <div className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] mb-3">OVERVIEW</div>
                  <p className="text-white/50 leading-relaxed">{selected.description}</p>
                </div>
                {selected.vision && (
                  <div>
                    <div className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] mb-3">VISION</div>
                    <p className="text-white/50 leading-relaxed">{selected.vision}</p>
                  </div>
                )}
                {selected.technologies && selected.technologies.length > 0 && (
                  <div>
                    <div className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] mb-3">TECHNOLOGY</div>
                    <div className="flex flex-wrap gap-2">
                      {selected.technologies.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 border border-[#F3BA2F]/20 text-[#F3BA2F]/60 font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selected.roadmap && (
                  <div>
                    <div className="text-[#F3BA2F] font-mono text-[10px] tracking-[0.3em] mb-3">ROADMAP</div>
                    <p className="text-white/50 leading-relaxed">{selected.roadmap}</p>
                  </div>
                )}
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-xs font-mono text-white/20">YEAR: {selected.year}</span>
                  <span className={`text-xs font-mono px-3 py-1 border ${selected.status === "Live" ? "border-green-500/30 text-green-400" : "border-yellow-500/30 text-yellow-400"}`}>{selected.status.toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
