import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "HQ" },
  { href: "/founder", label: "FOUNDER" },
  { href: "/ecosystem", label: "ECOSYSTEM" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/research", label: "RESEARCH" },
  { href: "/press", label: "PRESS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer group">
            <span className="text-xl font-bold font-mono tracking-tighter text-primary group-hover:text-primary/80 transition-colors">FO</span>
            <span className="ml-2 text-xs text-muted-foreground uppercase tracking-widest hidden sm:inline-block">OS.01</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div className={`relative px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary glow-gold"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors" onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div 
                    className={`px-4 py-3 rounded-md text-sm font-medium ${location === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
