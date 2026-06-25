import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Activity, Terminal, Code, Cpu } from "lucide-react";
import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: summary, isLoading } = useGetDashboardSummary();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-1/2 h-[50vh] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM ONLINE
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-foreground uppercase">
            FAISAL <span className="text-primary">ORAKZAI</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            Sovereign digital civilization hub. Pakistani entrepreneur, Web3 founder, AI builder, and multi-company ecosystem leader.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/ecosystem">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-mono glow-gold">
                ENTER ECOSYSTEM <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/founder">
              <Button size="lg" variant="outline" className="rounded-none font-mono border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 hover:text-primary">
                INITIALIZE PROFILE
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-lg aspect-square">
          {/* Decorative frame for founder image */}
          <div className="absolute inset-0 border border-primary/20 rounded-sm" />
          <div className="absolute top-4 -left-4 w-full h-full border border-secondary/20 rounded-sm" />
          <div className="absolute inset-0 bg-card overflow-hidden">
            <img 
              src="/founder.jpg" 
              alt="Faisal Orakzai" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                // Fallback if image not loaded properly in env
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop";
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
              <div className="font-mono text-xs text-primary mb-1">ID: FOUNDER_01</div>
              <div className="flex gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <Code className="h-4 w-4 text-muted-foreground" />
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 border-t border-border/50 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "COMPANIES", value: summary?.totalCompanies, loading: isLoading },
            { label: "PROJECTS", value: summary?.totalProjects, loading: isLoading },
            { label: "ARTICLES", value: summary?.totalArticles, loading: isLoading },
            { label: "RESEARCH PAPERS", value: summary?.totalResearch, loading: isLoading },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col space-y-2 border-l border-primary/30 pl-4">
              <span className="text-xs text-muted-foreground font-mono tracking-widest">{stat.label}</span>
              {stat.loading ? (
                <Skeleton className="h-10 w-20 bg-muted/50" />
              ) : (
                <span className="text-4xl font-bold text-primary">{stat.value || 0}</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
