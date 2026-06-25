import { motion } from "framer-motion";
import { useListCompanies } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Ecosystem() {
  const { data: companies, isLoading } = useListCompanies();
  const [selected, setSelected] = useState<number | null>(null);

  const selectedCompany = companies?.find((c) => c.id === selected);

  const nodePositions = [
    { x: 50, y: 50 },
    { x: 20, y: 25 },
    { x: 80, y: 25 },
    { x: 15, y: 70 },
    { x: 85, y: 70 },
    { x: 50, y: 85 },
  ];

  const colors = ["#f5a623", "#00d4ff", "#f5a623", "#00d4ff", "#f5a623", "#00d4ff"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-mono tracking-widest mb-6">
            <span className="animate-pulse h-2 w-2 rounded-full bg-secondary inline-block" /> ECOSYSTEM ACTIVE
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter uppercase mb-4">ORAKZAI <span className="text-primary">ECOSYSTEM</span></h1>
          <p className="text-muted-foreground max-w-xl mx-auto">An interconnected network of companies, platforms, and ventures — each a node in a larger digital civilization.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Node Map */}
          <div className="relative">
            <div className="aspect-square bg-card border border-border/50 rounded-sm p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #f5a623 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              {isLoading ? (
                <div className="flex items-center justify-center h-full"><Skeleton className="w-48 h-48 rounded-full" /></div>
              ) : (
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Connection lines */}
                  {companies?.map((company, i) => {
                    const pos = nodePositions[i % nodePositions.length];
                    const centerPos = nodePositions[0];
                    if (i === 0) return null;
                    return (
                      <line
                        key={`line-${i}`}
                        x1={centerPos.x} y1={centerPos.y}
                        x2={pos.x} y2={pos.y}
                        stroke="#f5a62340"
                        strokeWidth="0.5"
                        strokeDasharray="2,2"
                      />
                    );
                  })}
                  {/* Nodes */}
                  {companies?.map((company, i) => {
                    const pos = nodePositions[i % nodePositions.length];
                    const isCenter = i === 0;
                    const isSelected = selected === company.id;
                    return (
                      <g key={company.id} onClick={() => setSelected(selected === company.id ? null : company.id)} style={{ cursor: "pointer" }}>
                        <circle
                          cx={pos.x} cy={pos.y}
                          r={isCenter ? 8 : 5}
                          fill={isSelected ? colors[i % colors.length] : "transparent"}
                          stroke={colors[i % colors.length]}
                          strokeWidth={isSelected ? 1.5 : 0.8}
                          opacity={isSelected ? 1 : 0.7}
                        />
                        <circle cx={pos.x} cy={pos.y} r={isCenter ? 12 : 9} fill="transparent" stroke={colors[i % colors.length]} strokeWidth="0.3" opacity="0.3" className="animate-pulse" />
                        <text x={pos.x} y={pos.y + (isCenter ? 14 : 11)} textAnchor="middle" fill="white" fontSize="3" fontFamily="monospace" opacity="0.9">
                          {company.name.split(" ")[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>
            <p className="text-xs text-muted-foreground font-mono text-center mt-3">Click a node to inspect the company</p>
          </div>

          {/* Company list / details */}
          <div className="space-y-4">
            {isLoading ? (
              [...Array(5)].map((_, i) => <Skeleton key={i} className="h-24 w-full" />)
            ) : selectedCompany ? (
              <motion.div key={selectedCompany.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-primary/40 p-8 rounded-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-1">{selectedCompany.name}</h3>
                    <Badge className="bg-primary/10 text-primary border-primary/30 font-mono text-xs">{selectedCompany.sector}</Badge>
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded border ${selectedCompany.status === "Active" ? "border-green-500/40 text-green-400" : "border-yellow-500/40 text-yellow-400"}`}>{selectedCompany.status.toUpperCase()}</span>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">{selectedCompany.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-l border-primary/30 pl-4">
                    <div className="text-xs text-muted-foreground font-mono mb-1">FOUNDED</div>
                    <div className="font-bold">{selectedCompany.founded}</div>
                  </div>
                  <div className="border-l border-secondary/30 pl-4">
                    <div className="text-xs text-muted-foreground font-mono mb-1">SECTOR</div>
                    <div className="font-bold text-secondary">{selectedCompany.sector}</div>
                  </div>
                </div>
                {selectedCompany.website && (
                  <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs text-primary font-mono hover:underline">
                    VISIT <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </motion.div>
            ) : (
              companies?.map((company, i) => (
                <motion.div key={company.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} onClick={() => setSelected(company.id)} className="bg-card border border-border/50 p-5 rounded-sm cursor-pointer hover:border-primary/40 transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{company.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{company.sector} · Est. {company.founded}</p>
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded border ${company.status === "Active" ? "border-green-500/40 text-green-400" : "border-yellow-500/40 text-yellow-400"}`}>{company.status.toUpperCase()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{company.description}</p>
                </motion.div>
              ))
            )}
            {selectedCompany && (
              <button onClick={() => setSelected(null)} className="text-xs text-muted-foreground hover:text-primary font-mono transition-colors">← BACK TO ALL NODES</button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
