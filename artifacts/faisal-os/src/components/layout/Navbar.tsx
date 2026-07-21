
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Info, Users, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/* ─── Top-level nav links ─── */
const links = [
  { href: "/", label: "Home" },
  { href: "/founder", label: "Story" },
  { href: "/ecosystem", label: "Ventures" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/research", label: "Research" },
  { href: "/press", label: "Press" },
  { href: "/okzbyte-hub", label: "OkzByte Hub" },
  { href: "/contact", label: "Contact" },
];

/* ─── About Us dropdown items ─── */
const aboutLinks = [
  { href: "/our-story", label: "Our Story", icon: Info, desc: "Heritage, resilience & unification" },
  { href: "/leadership", label: "Leadership", icon: Users, desc: "Guiding councils & representatives" },
  { href: "/mission-vision", label: "Mission & Vision", icon: TrendingUp, desc: "Our institutional purpose" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false);
    setAboutOpen(false);
    setMobileAboutOpen(false);
  }, [location]);

  const isAboutActive = aboutLinks.some(l => location === l.href);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/90 backdrop-blur-xl border-b border-[#F3BA2F]/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="/logo.webp"
              alt="Faisal Orakzai — Founder Orakzai Group Pakistan"
              className="h-10 w-auto object-contain"
              style={{ filter: "drop-shadow(0 0 6px rgba(243,186,47,0.35))" }}
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Regular links (before About Us insertion point) */}
          {[links[0]].map((link) => (
            <NavLink key={link.href} link={link} location={location} />
          ))}

          {/* About Us dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setAboutOpen(v => !v)}
              className={`relative flex items-center gap-1 px-4 py-2 text-sm transition-all font-medium ${
                isAboutActive || aboutOpen ? "text-[#F3BA2F]" : "text-white/60 hover:text-white"
              }`}
            >
              About Us
              <motion.div
                animate={{ rotate: aboutOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </motion.div>
              {isAboutActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-px bg-[#F3BA2F]"
                  style={{ boxShadow: "0 0 8px rgba(243,186,47,0.8)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute top-full left-0 mt-2 w-60 rounded-xl border overflow-hidden"
                  style={{
                    background: "rgba(4,16,10,0.97)",
                    backdropFilter: "blur(20px)",
                    borderColor: "rgba(243,186,47,0.15)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(243,186,47,0.06)",
                  }}
                >
                  <div className="p-1.5">
                    {aboutLinks.map((item) => {
                      const Icon = item.icon;
                      const isActive = location === item.href;
                      return (
                        <Link key={item.href} href={item.href}>
                          <div
                            onClick={() => setAboutOpen(false)}
                            className={`flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${
                              isActive ? "bg-yellow-400/10" : "hover:bg-white/5"
                            }`}
                          >
                            <div
                              className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200"
                              style={{
                                background: isActive ? "rgba(243,186,47,0.15)" : "rgba(255,255,255,0.05)",
                                border: `1px solid ${isActive ? "rgba(243,186,47,0.3)" : "rgba(255,255,255,0.08)"}`,
                              }}
                            >
                              <Icon
                                className="h-3.5 w-3.5"
                                style={{ color: isActive ? "#F3BA2F" : "rgba(255,255,255,0.45)" }}
                              />
                            </div>
                            <div>
                              <div
                                className="text-sm font-semibold leading-tight"
                                style={{ color: isActive ? "#F3BA2F" : "rgba(255,255,255,0.85)" }}
                              >
                                {item.label}
                              </div>
                              <div className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Remaining links */}
          {links.slice(1).map((link) => (
            <NavLink key={link.href} link={link} location={location} />
          ))}
        </div>

        {/* Desktop CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/contact"
            className="hidden lg:block px-4 py-1.5 bg-[#F3BA2F] text-black text-xs font-bold tracking-wider hover:bg-[#ffd666] transition-colors"
          >
            CONNECT
          </a>
          <button
            className="lg:hidden text-white/60 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
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
            className="lg:hidden bg-black/95 border-b border-[#F3BA2F]/10"
          >
            <div className="px-6 py-4 space-y-1">
              {/* Home */}
              <Link href="/">
                <div
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-sm border-b border-white/5 ${location === "/" ? "text-[#F3BA2F]" : "text-white/60"}`}
                >
                  Home
                </div>
              </Link>

              {/* About Us accordion */}
              <div className="border-b border-white/5">
                <button
                  onClick={() => setMobileAboutOpen(v => !v)}
                  className={`w-full flex items-center justify-between py-3 text-sm ${isAboutActive ? "text-[#F3BA2F]" : "text-white/60"}`}
                >
                  <span>About Us</span>
                  <motion.div animate={{ rotate: mobileAboutOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2 pl-4 space-y-1">
                        {aboutLinks.map((item) => {
                          const Icon = item.icon;
                          const isActive = location === item.href;
                          return (
                            <Link key={item.href} href={item.href}>
                              <div
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-2.5 py-2.5 text-sm ${isActive ? "text-[#F3BA2F]" : "text-white/50"}`}
                              >
                                <Icon className="h-4 w-4 shrink-0" />
                                {item.label}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other links */}
              {links.slice(1).map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 text-sm border-b border-white/5 ${location === link.href ? "text-[#F3BA2F]" : "text-white/60"}`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}

              <a
                href="/contact"
                className="block mt-4 px-4 py-2 bg-[#F3BA2F] text-black text-xs font-bold text-center"
              >
                CONNECT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─── Reusable desktop nav link ─── */
function NavLink({ link, location }: { link: { href: string; label: string }; location: string }) {
  const isActive = location === link.href;
  return (
    <Link href={link.href}>
      <div
        className={`relative px-4 py-2 text-sm transition-all cursor-pointer font-medium ${
          isActive ? "text-[#F3BA2F]" : "text-white/60 hover:text-white"
        }`}
      >
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
}
