import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/founder", label: "About" },
  { href: "/ecosystem", label: "Ventures" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-[#F3BA2F]/10" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="/logo.png"
              alt="Faisal Orakzai Logo"
              className="h-10 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(243,186,47,0.35))" }}
            />
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <div className={`relative px-4 py-2 text-sm transition-all cursor-pointer font-medium ${isActive ? "text-[#F3BA2F]" : "text-white/60 hover:text-white"}`}>
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-px bg-[#F3BA2F]"
                      style={{ boxShadow: "0 0 8px rgba(243,186,47,0.8)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a href="/contact" className="hidden lg:block px-4 py-1.5 bg-[#F3BA2F] text-black text-xs font-bold tracking-wider hover:bg-[#ffd666] transition-colors">
            CONNECT
          </a>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 border-b border-[#F3BA2F]/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`px-4 py-3 text-sm font-medium transition-colors ${location === link.href ? "text-[#F3BA2F]" : "text-white/60"}`}
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
