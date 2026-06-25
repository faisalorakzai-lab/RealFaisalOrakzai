import { motion, AnimatePresence } from "framer-motion";
import { useListProjects } from "@workspace/api-client-react";
import { getListProjectsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { X, ChevronRight } from "lucide-react";
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest mb-4">
                <span className="animate-pulse h-2 w-2 rounded-full bg-primary inline-block" /> {projects?.length ?? 0} PROJECTS LOADED
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter uppercase">PROJECT <span className="text-primary">COMMAND</span></h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-all ${activeCategory === cat ? "border-primary bg-primary/10 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
            {projects?.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedId(project.id)}
                className="bg-card border border-border/50 p-6 cursor-pointer hover:border-primary/40 transition-all group relative overflow-hidden"
                data-testid={`card-project-${project.id}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500" />
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/30 font-mono text-xs">{project.category}</Badge>
                  <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono px-2 py-0.5 border rounded ${project.status === "Live" ? "border-green-500/40 text-green-400" : project.status === "In Development" ? "border-yellow-500/40 text-yellow-400" : "border-secondary/40 text-secondary"}`}>
                    {project.status.toUpperCase()}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={() => setSelectedId(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-card border border-primary/40 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-sm">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge className="bg-primary/10 text-primary border-primary/30 font-mono text-xs mb-2">{selected.category}</Badge>
                  <h2 className="text-2xl font-bold">{selected.title}</h2>
                </div>
                <button onClick={() => setSelectedId(null)} className="text-muted-foreground hover:text-primary transition-colors"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-muted-foreground tracking-widest mb-2">CASE STUDY</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                </div>
                {selected.vision && (
                  <div>
                    <h4 className="text-xs font-mono text-muted-foreground tracking-widest mb-2">VISION</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selected.vision}</p>
                  </div>
                )}
                {selected.technologies && selected.technologies.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono text-muted-foreground tracking-widest mb-2">TECHNOLOGY STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.technologies.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 border border-secondary/30 text-secondary font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selected.roadmap && (
                  <div>
                    <h4 className="text-xs font-mono text-muted-foreground tracking-widest mb-2">ROADMAP</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selected.roadmap}</p>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-xs font-mono text-muted-foreground">YEAR: {selected.year}</span>
                  <span className={`text-xs font-mono px-2 py-1 border rounded ${selected.status === "Live" ? "border-green-500/40 text-green-400" : "border-yellow-500/40 text-yellow-400"}`}>{selected.status.toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
