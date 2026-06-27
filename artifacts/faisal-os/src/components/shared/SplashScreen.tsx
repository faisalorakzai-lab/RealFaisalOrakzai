import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [scanDone, setScanDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScanDone(true), 1800);
    const t2 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!scanDone ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Scan-line sweeping top → bottom */}
          <motion.div
            initial={{ top: "-2px" }}
            animate={{ top: "100%" }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.6, 1] }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent 0%, #F3BA2F 30%, #ffe47a 50%, #F3BA2F 70%, transparent 100%)",
              boxShadow: "0 0 24px 6px rgba(243,186,47,0.5)",
              zIndex: 10,
            }}
          />

          {/* Ambient glow behind text */}
          <div style={{
            position: "absolute",
            width: "500px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(243,186,47,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Name */}
          <div className="relative z-20 text-center px-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-mono text-[10px] tracking-[0.6em] text-[#F3BA2F]/50 mb-5 uppercase"
            >
              initializing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.12em" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-black uppercase text-white"
              style={{ fontSize: "clamp(2rem, 9vw, 5rem)", lineHeight: 1 }}
            >
              FAISAL{" "}
              <span style={{
                background: "linear-gradient(135deg, #F3BA2F 0%, #ffe47a 50%, #c8900a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>ORAKZAI</span>
            </motion.h1>

            {/* Loading bar */}
            <div className="mt-10 w-48 mx-auto h-px bg-white/5 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="h-full"
                style={{ background: "linear-gradient(90deg, #F3BA2F, #ffe47a)" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-mono text-[9px] tracking-[0.4em] text-[#F3BA2F]/30 mt-3 uppercase"
            >
              sovereign · transparent · unbreachable
            </motion.div>
          </div>

          {/* Corner marks */}
          {[
            { top: "24px", left: "24px", bt: "border-t-2", bl: "border-l-2" },
            { top: "24px", right: "24px", bt: "border-t-2", br: "border-r-2" },
            { bottom: "24px", left: "24px", bb: "border-b-2", bl: "border-l-2" },
            { bottom: "24px", right: "24px", bb: "border-b-2", br: "border-r-2" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{ position: "absolute", width: "20px", height: "20px", ...c, borderColor: "rgba(243,186,47,0.35)" }}
              className={`${c.bt ?? ""} ${c.bl ?? ""} ${c.br ?? ""} ${c.bb ?? ""}`}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
