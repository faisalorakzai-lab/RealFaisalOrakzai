import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Download } from "lucide-react";

export default function PressKitButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-6 left-4 z-50"
        >
          <Link href="/press">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 px-4 py-2.5 border border-[#F3BA2F]/40 bg-black/90 backdrop-blur-sm cursor-pointer"
              style={{ boxShadow: "0 0 18px rgba(243,186,47,0.12), 0 2px 16px rgba(0,0,0,0.7)" }}
            >
              {/* Animated gold scan line on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F3BA2F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="flex items-center justify-center w-6 h-6 border border-[#F3BA2F]/50 group-hover:border-[#F3BA2F] transition-colors">
                <Download className="w-3 h-3 text-[#F3BA2F]" />
              </div>

              {/* Label — visible on sm+ */}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[#F3BA2F] font-mono text-[9px] tracking-[0.25em] uppercase">Press Kit</span>
                <span className="text-white/30 font-mono text-[8px] tracking-widest">Media · Bio · Assets</span>
              </div>

              {/* Mobile: just pulse dot */}
              <motion.span
                className="sm:hidden w-1.5 h-1.5 rounded-full bg-[#F3BA2F]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
            </motion.div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
