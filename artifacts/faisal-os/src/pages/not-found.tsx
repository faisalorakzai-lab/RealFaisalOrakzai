import { useEffect } from "react";
import { Link } from "wouter";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | Faisal Orakzai";

    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.setAttribute("data-id", "noindex-404");
    document.head.appendChild(meta);

    return () => {
      const el = document.querySelector('meta[data-id="noindex-404"]');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      <p className="text-xs tracking-[0.3em] text-[#C9A84C] uppercase mb-6 font-medium">
        Error 404
      </p>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        Page Not Found
      </h1>
      <p className="text-white/40 text-sm md:text-base max-w-sm mb-12 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <span className="inline-block border border-[#C9A84C]/50 text-[#C9A84C] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#C9A84C]/10 transition-colors duration-200 cursor-pointer">
          Return Home
        </span>
      </Link>
    </div>
  );
}
