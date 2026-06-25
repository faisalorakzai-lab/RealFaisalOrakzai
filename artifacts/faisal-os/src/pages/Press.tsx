import { motion } from "framer-motion";
import { useListNews } from "@workspace/api-client-react";
import { getListNewsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Clock, Building2 } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Company News", "Founder News", "Announcements", "Partnerships", "Product Launches", "Interviews"];

export default function Press() {
  const [activeCategory, setActiveCategory] = useState("All");
  const params = activeCategory !== "All" ? { category: activeCategory } : undefined;
  const { data: news, isLoading } = useListNews(params, {
    query: { queryKey: getListNewsQueryKey(params) },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Newsroom header */}
      <section className="py-12 border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Newspaper className="h-5 w-5 text-primary" />
              <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">ORAKZAI PRESS ROOM</span>
            </div>
            <div className="text-xs font-mono text-muted-foreground">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).toUpperCase()}</div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold font-mono tracking-tighter uppercase border-b border-border/50 pb-6">PRESS <span className="text-primary">ROOM</span></h1>
          <div className="flex gap-0 overflow-x-auto mt-4">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${activeCategory === cat ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="space-y-6">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36 w-full" />)}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main story */}
            {news && news.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-card border border-primary/30 p-8 group cursor-pointer hover:border-primary/60 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/30 font-mono text-xs">{news[0].category}</Badge>
                  <span className="text-xs text-muted-foreground font-mono">TOP STORY</span>
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{news[0].title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{news[0].excerpt}</p>
                {news[0].content && <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">{news[0].content}</p>}
                <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {news[0].source}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(news[0].publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
              </motion.div>
            )}

            {/* Sidebar stories */}
            <div className="space-y-4">
              {news?.slice(1).map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="bg-card border border-border/50 p-5 group cursor-pointer hover:border-primary/30 transition-all">
                  <Badge className="bg-muted text-muted-foreground border-border/50 font-mono text-xs mb-3">{item.category}</Badge>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* More news */}
            {news && news.length > 4 && (
              <div className="lg:col-span-3 border-t border-border/50 pt-8">
                <h3 className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-6">MORE NEWS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.slice(4).map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border-t border-border/50 pt-4 group cursor-pointer">
                      <Badge className="bg-muted text-muted-foreground border-border/50 font-mono text-xs mb-3">{item.category}</Badge>
                      <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </motion.div>
  );
}
