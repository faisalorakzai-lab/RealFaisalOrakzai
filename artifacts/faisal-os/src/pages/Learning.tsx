import { motion } from "framer-motion";
import { useListArticles, useGlobalSearch } from "@workspace/api-client-react";
import { getListArticlesQueryKey, getGlobalSearchQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Search, X } from "lucide-react";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

const categories = ["All", "Blockchain", "AI", "Finance", "Business", "Entrepreneurship", "Leadership"];

export default function Learning() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  const params = {
    ...(activeCategory !== "All" ? { category: activeCategory } : {}),
    ...(searchTerm ? { search: searchTerm } : {}),
  };
  const { data: articles, isLoading } = useListArticles(
    Object.keys(params).length > 0 ? params : undefined,
    { query: { queryKey: getListArticlesQueryKey(Object.keys(params).length > 0 ? params : undefined) } }
  );

  const { data: searchResults, isLoading: searching } = useGlobalSearch(
    { q: searchQuery || "_" },
    { query: { enabled: !!searchQuery, queryKey: getGlobalSearchQueryKey({ q: searchQuery || "_" }) } }
  );

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    startTransition(() => { setSearchQuery(val); });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 border-b border-border/50 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest mb-6">
              <BookOpen className="h-3 w-3" /> LEARNING ROOM
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter uppercase mb-4">KNOWLEDGE <span className="text-primary">HUB</span></h1>
            <p className="text-muted-foreground max-w-lg mx-auto">Deep dives into blockchain, AI, finance, business, and the future of digital civilization.</p>
          </div>
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-12 pr-10 bg-card border-border/50 focus:border-primary font-mono text-sm h-12"
              placeholder="SEARCH ARTICLES, TOPICS, KEYWORDS..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              data-testid="input-search-articles"
            />
            {searchTerm && (
              <button onClick={() => { setSearchTerm(""); setSearchQuery(""); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-border/50 sticky top-16 z-30 bg-background">
        <div className="container mx-auto px-4 flex gap-0 overflow-x-auto">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${activeCategory === cat ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-56 w-full" />)}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles?.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-card border border-border/50 p-6 group cursor-pointer hover:border-primary/40 transition-all" data-testid={`card-article-${article.id}`}>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary/10 text-primary border-primary/30 font-mono text-xs">{article.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono"><Clock className="h-3 w-3" /> {article.readTime} MIN</span>
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex gap-1">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-muted/50 text-muted-foreground font-mono">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {articles?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">NO ARTICLES FOUND</div>
        )}
      </section>
    </motion.div>
  );
}
