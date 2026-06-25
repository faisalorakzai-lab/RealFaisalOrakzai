import { motion } from "framer-motion";
import { useListMedia } from "@workspace/api-client-react";
import { getListMediaQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Play, Mic, Video, MonitorPlay, Clock } from "lucide-react";
import { useState } from "react";

const types = ["All", "Video", "Podcast", "Interview", "Keynote", "Product Demo"];

const typeIcons: Record<string, React.ReactNode> = {
  Video: <Video className="h-4 w-4" />,
  Podcast: <Mic className="h-4 w-4" />,
  Interview: <MonitorPlay className="h-4 w-4" />,
  Keynote: <MonitorPlay className="h-4 w-4" />,
  "Product Demo": <Play className="h-4 w-4" />,
};

export default function Media() {
  const [activeType, setActiveType] = useState("All");
  const params = activeType !== "All" ? { type: activeType } : undefined;
  const { data: media, isLoading } = useListMedia(params, {
    query: { queryKey: getListMediaQueryKey(params) },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-20 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(ellipse at center, #00d4ff 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-mono tracking-widest mb-6">
            <span className="animate-pulse h-2 w-2 rounded-full bg-secondary inline-block" /> MEDIA CENTER
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter uppercase mb-4">VIDEO & <span className="text-primary">AUDIO HUB</span></h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Founder videos, podcasts, interviews, keynote speeches, and product demos from across the Orakzai ecosystem.</p>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b border-border/50 bg-card/20 sticky top-16 z-30">
        <div className="container mx-auto px-4 flex gap-0 overflow-x-auto">
          {types.map((type) => (
            <button key={type} onClick={() => setActiveType(type)} className={`px-5 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap border-b-2 transition-all ${activeType === type ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {media?.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="bg-card border border-border/50 group cursor-pointer hover:border-secondary/40 transition-all overflow-hidden" data-testid={`card-media-${item.id}`}>
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {item.thumbnailUrl ? (
                    <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-muted">
                      <div className="text-secondary opacity-50">{typeIcons[item.type] ?? <Play className="h-8 w-8" />}</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-2 border-secondary flex items-center justify-center text-secondary glow-blue">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-0.5 text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {item.duration}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-secondary/10 text-secondary border-secondary/30 font-mono text-xs flex items-center gap-1">
                      {typeIcons[item.type] ?? <Play className="h-3 w-3" />} {item.type}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-sm mb-2 group-hover:text-secondary transition-colors leading-snug">{item.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="text-xs text-muted-foreground font-mono mt-3">{new Date(item.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {media?.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono text-sm">NO MEDIA FOUND</div>
        )}
      </section>
    </motion.div>
  );
}
