import { motion } from "framer-motion";
import { useListCompanies } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function Ecosystem() {
  const { data: companies, isLoading } = useListCompanies();
  const [selected, setSelected] = useState<number | null>(null);
  const selectedCompany = companies?.find((c) => c.id === selected);

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="pt-32 pb-16 border-b border-[#F3BA2F]/10 bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#F3BA2F]/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] animate-pulse" />
              <span className="text-[#F3BA2F] font-mono text-xs tracking-[0.25em]">ORAKZAI ECOSYSTEM</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              What I <span className="gold-gradient">Build</span>
            </h1>
            <p className="text-white/40 text-xl max-w-2xl">An interconnected network of ventures — each a node in a larger system designed for long-term value creation.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="space-y-4">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-28 w-full bg-white/5" />)}</div>
          ) : selectedCompany ? (
            <motion.div key={selectedCompany.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <button onClick={() => setSelected(null)} className="text-xs font-mono text-[#F3BA2F]/60 hover:text-[#F3BA2F] transition-colors mb-8">← BACK TO ALL VENTURES</button>
              <div className="border border-[#F3BA2F]/20 p-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-[#F3BA2F] font-mono text-xs tracking-widest mb-3">{selectedCompany.sector.toUpperCase()}</div>
                    <h2 className="text-4xl font-bold">{selectedCompany.name}</h2>
                  </div>
                  <span className={`font-mono text-xs px-3 py-1.5 border ${selectedCompany.status === "Active" ? "border-green-500/40 text-green-400" : "border-yellow-500/40 text-yellow-400"}`}>{selectedCompany.status.toUpperCase()}</span>
                </div>
                <p className="text-white/60 text-lg leading-relaxed mb-8">{selectedCompany.description}</p>
                <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-8">
                  <div>
                    <div className="text-[#F3BA2F] font-mono text-xs tracking-widest mb-2">ESTABLISHED</div>
                    <div className="text-2xl font-bold">{selectedCompany.founded}</div>
                  </div>
                  <div>
                    <div className="text-[#F3BA2F] font-mono text-xs tracking-widest mb-2">SECTOR</div>
                    <div className="text-lg">{selectedCompany.sector}</div>
                  </div>
                </div>
                {selectedCompany.website && (
                  <a href={selectedCompany.website} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[#F3BA2F] font-mono text-xs hover:underline">
                    VISIT WEBSITE <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-px bg-[#F3BA2F]/5">
              {companies?.map((company, i) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelected(company.id)}
                  className="flex items-center justify-between bg-black px-8 py-7 cursor-pointer group hover:bg-[#F3BA2F]/3 transition-colors border-b border-white/5"
                >
                  <div className="flex items-center gap-8">
                    <div className="text-[#F3BA2F] font-mono text-xs w-6 opacity-50">0{i + 1}</div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-[#F3BA2F] transition-colors">{company.name}</h3>
                      <p className="text-white/30 text-sm mt-1">{company.sector} · Est. {company.founded}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="hidden md:block text-white/30 text-sm max-w-sm line-clamp-1">{company.description}</p>
                    <span className={`hidden sm:block font-mono text-xs px-3 py-1 border ${company.status === "Active" ? "border-green-500/30 text-green-400/70" : "border-yellow-500/30 text-yellow-400/70"}`}>{company.status.toUpperCase()}</span>
                    <ArrowRight className="h-4 w-4 text-white/20 group-hover:text-[#F3BA2F] transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
