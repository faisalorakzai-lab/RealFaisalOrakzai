import { motion } from "framer-motion";
import { useGetDashboardSummary, useListProjects } from "@workspace/api-client-react";
import { getGetDashboardSummaryQueryKey, getListProjectsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, BarChart2, Globe, FileText, Lock } from "lucide-react";

const reports = [
  { title: "Ecosystem Overview 2024", type: "Annual Report", status: "Available", icon: <Globe className="h-5 w-5" /> },
  { title: "OKBOND Token Economics", type: "Tokenomics Report", status: "Available", icon: <BarChart2 className="h-5 w-5" /> },
  { title: "Q4 Market Analysis", type: "Market Report", status: "Available", icon: <TrendingUp className="h-5 w-5" /> },
  { title: "OrakzaiX Infrastructure Roadmap", type: "Roadmap Document", status: "Available", icon: <FileText className="h-5 w-5" /> },
  { title: "Portfolio Transparency Report", type: "Transparency", status: "Available", icon: <Shield className="h-5 w-5" /> },
  { title: "Vision 2040 Investment Thesis", type: "Strategy", status: "Coming Q2 2025", icon: <Lock className="h-5 w-5" /> },
];

const metrics = [
  { label: "ACTIVE COMPANIES", valueKey: "totalCompanies" as const },
  { label: "TOTAL PROJECTS", valueKey: "totalProjects" as const },
  { label: "RESEARCH PAPERS", valueKey: "totalResearch" as const },
  { label: "KNOWLEDGE ARTICLES", valueKey: "totalArticles" as const },
];

export default function Investment() {
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummary({
    query: { queryKey: getGetDashboardSummaryQueryKey() },
  });
  const { data: projects, isLoading: projectsLoading } = useListProjects(undefined, {
    query: { queryKey: getListProjectsQueryKey() },
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 border-b border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono tracking-widest mb-6">
              <TrendingUp className="h-3 w-3" /> INVESTOR RELATIONS
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-mono tracking-tighter uppercase mb-6">INVESTMENT <span className="text-primary">CENTER</span></h1>
            <p className="text-muted-foreground leading-relaxed text-lg">Access ecosystem overviews, roadmaps, market intelligence, and transparency reports from the Orakzai Group portfolio.</p>
          </div>
        </div>
      </section>

      {/* Live Metrics */}
      <section className="border-b border-border/50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8">LIVE ECOSYSTEM METRICS</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric) => (
              <div key={metric.label} className="border-l-2 border-primary/50 pl-5">
                <div className="text-xs text-muted-foreground font-mono tracking-widest mb-2">{metric.label}</div>
                {summaryLoading ? (
                  <Skeleton className="h-10 w-16" />
                ) : (
                  <div className="text-4xl font-bold text-primary">{summary?.[metric.valueKey] ?? 0}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-mono tracking-tighter uppercase mb-8">REPORTS & DOCUMENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }} className={`bg-card border p-6 group transition-all ${report.status === "Available" ? "border-border/50 hover:border-primary/40 cursor-pointer" : "border-border/30 opacity-60 cursor-not-allowed"}`}>
                <div className="text-primary mb-4">{report.icon}</div>
                <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors">{report.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs">{report.type}</Badge>
                  <span className={`text-xs font-mono ${report.status === "Available" ? "text-green-400" : "text-yellow-400"}`}>{report.status.toUpperCase()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects for Investors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold font-mono tracking-tighter uppercase mb-8">PORTFOLIO HIGHLIGHTS</h2>
          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects?.slice(0, 3).map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="bg-card border border-border/50 p-6 hover:border-primary/40 transition-colors">
                  <Badge className="bg-primary/10 text-primary border-primary/30 font-mono text-xs mb-4">{project.category}</Badge>
                  <h3 className="font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
                    <span className="text-xs font-mono text-green-400">{project.status.toUpperCase()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
