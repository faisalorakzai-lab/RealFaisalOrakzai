import { motion } from "framer-motion";
import { useListNews, getListNewsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Building2, Newspaper } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Company News", "Founder News", "Announcements", "Partnerships", "Product Launches", "Interviews"];

export default function Press() {
  const [activeCategory, setActiveCategory] = useState("All");
  const params = activeCategory !== "All" ? { category: activeCategory } : undefined;
  const { data: news, isLoading } = useListNews(params, {
    query: { queryKey: getListNewsQueryKey(params) },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-0 border-b border-[#F3BA2F]/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Newspaper className="h-4 w-4 text-[#F3BA2F]" />
                <span className="text-xs font-mono text-white/30 tracking-[0.3em]">ORAKZAI PRESS ROOM</span>
              </div>
              <div className="text-xs font-mono text-white/20">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}</div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter pb-8 border-b border-[#F3BA2F]/10">
              Press <span className="gold-gradient">Room</span>
            </h1>
            <div className="flex gap-0 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-4 text-xs font-mono uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${activeCategory === cat ? "border-[#F3BA2F] text-[#F3BA2F]" : "border-transparent text-white/30 hover:text-white"}`}
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
          <div className="space-y-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36 w-full bg-white/5" />)}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#F3BA2F]/5">
            {/* Lead story */}
            {news && news.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-black p-10 group cursor-pointer scan-hover">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-xs text-[#F3BA2F]/60 border border-[#F3BA2F]/20 px-2 py-1">{news[0].category.toUpperCase()}</span>
                  <span className="text-xs text-white/20 font-mono">LEAD STORY</span>
                </div>
                <h2 className="text-3xl font-bold mb-5 group-hover:text-[#F3BA2F] transition-colors leading-tight">{news[0].title}</h2>
                <p className="text-white/50 leading-relaxed mb-6">{news[0].excerpt}</p>
                {news[0].content && <p className="text-sm text-white/30 leading-relaxed border-t border-white/5 pt-6">{news[0].content}</p>}
                <div className="flex items-center gap-5 mt-8 text-xs text-white/25 font-mono">
                  <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3" /> {news[0].source}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {new Date(news[0].publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
              </motion.div>
            )}

            {/* Sidebar */}
            <div className="bg-black">
              {news?.slice(1, 4).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 border-b border-white/5 group cursor-pointer scan-hover"
                >
                  <span className="font-mono text-[10px] text-[#F3BA2F]/50 tracking-widest block mb-3">{item.category.toUpperCase()}</span>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-[#F3BA2F] transition-colors leading-snug">{item.title}</h3>
                  <p className="text-xs text-white/30 line-clamp-2 mb-4 leading-relaxed">{item.excerpt}</p>
                  <div className="flex items-center gap-3 text-[10px] text-white/20 font-mono">
                    <span>{item.source}</span><span>·</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* More news */}
            {news && news.length > 4 && (
              <div className="lg:col-span-3 bg-black p-10">
                <div className="text-[#F3BA2F] font-mono text-xs tracking-[0.3em] mb-8">MORE NEWS</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F3BA2F]/5">
                  {news.slice(4).map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-black p-6 group cursor-pointer scan-hover"
                    >
                      <span className="font-mono text-[10px] text-[#F3BA2F]/40 tracking-widest block mb-3">{item.category.toUpperCase()}</span>
                      <h3 className="font-bold text-sm mb-2 group-hover:text-[#F3BA2F] transition-colors">{item.title}</h3>
                      <p className="text-xs text-white/30 line-clamp-2">{item.excerpt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
