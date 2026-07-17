import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { Toaster } from "@/components/ui/toaster";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { AnimatePresence, motion } from "framer-motion";
  import Navbar from "@/components/layout/Navbar";
  import Footer from "@/components/layout/Footer";
  import ChatWidget from "@/components/shared/ChatWidget";
  import GlobalSearch from "@/components/shared/GlobalSearch";
  import SplashScreen from "@/components/shared/SplashScreen";
  import { Suspense, lazy, useState } from "react";

  const NotFound = lazy(() => import("@/pages/not-found"));
  const Home = lazy(() => import("@/pages/Home"));
  const Founder = lazy(() => import("@/pages/Founder"));
  const Ecosystem = lazy(() => import("@/pages/Ecosystem"));
  const Projects = lazy(() => import("@/pages/Projects"));
  const Research = lazy(() => import("@/pages/Research"));
  const ResearchArticle = lazy(() => import("@/pages/ResearchArticle"));
  const Privacy = lazy(() => import("@/pages/Privacy"));
  const Terms = lazy(() => import("@/pages/Terms"));
  const Disclaimer = lazy(() => import("@/pages/Disclaimer"));
  const EditorialPolicy = lazy(() => import("@/pages/EditorialPolicy"));
  const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
  const AIUsagePolicy = lazy(() => import("@/pages/AIUsagePolicy"));
    // Kick off the ResearchArticle chunk download early (prefetch on module init)
    if (typeof window !== "undefined") {
      const prefetch = () => { import("@/pages/ResearchArticle").catch(() => {}); };
      if (document.readyState === "complete") prefetch();
      else window.addEventListener("load", prefetch, { once: true });
    }
  const Press = lazy(() => import("@/pages/Press"));
  const Learning = lazy(() => import("@/pages/Learning"));
  const Media = lazy(() => import("@/pages/Media"));
  const Investment = lazy(() => import("@/pages/Investment"));
  const Contact = lazy(() => import("@/pages/Contact"));
  const InnerCircle = lazy(() => import("@/pages/InnerCircle"));

  function RouteLoading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-black gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin" />
        <p style={{ fontFamily:"monospace", fontSize:"9px", letterSpacing:"0.25em", color:"rgba(243,186,47,0.5)", textTransform:"uppercase" }}>Loading…</p>
      </div>
    );
  }

  const queryClient = new QueryClient();

  const pageVariants = {
    initial: { opacity: 0, x: 40, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit:    { opacity: 0, x: -24, filter: "blur(3px)" },
  };

  const pageTransition = {
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  };

  function Router() {
    const [location] = useLocation();

    return (
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={location}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ willChange: "transform, opacity" }}
            >
              <Suspense fallback={<RouteLoading />}>
                <Switch>
                  <Route path="/" component={Home} />
                  <Route path="/founder" component={Founder} />
                  <Route path="/ecosystem" component={Ecosystem} />
                  <Route path="/benchmarks" component={Projects} />
                  <Route path="/research/:slug" component={ResearchArticle} />
                  <Route path="/research" component={Research} />
                  <Route path="/press" component={Press} />
                  <Route path="/learning" component={Learning} />
                  <Route path="/media" component={Media} />
                  <Route path="/investment" component={Investment} />
                  <Route path="/contact" component={Contact} />
                  <Route path="/okzbyte-hub" component={InnerCircle} />
                  <Route path="/privacy" component={Privacy} />
                  <Route path="/terms" component={Terms} />
                  <Route path="/disclaimer" component={Disclaimer} />
                  <Route path="/editorial-policy" component={EditorialPolicy} />
                  <Route path="/cookie-policy" component={CookiePolicy} />
                  <Route path="/ai-usage-policy" component={AIUsagePolicy} />
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
        {!["/privacy","/terms","/disclaimer","/editorial-policy","/cookie-policy","/ai-usage-policy"].includes(location) && <Footer />}
        <ChatWidget />
        <GlobalSearch />
      </div>
    );
  }

  // Skip SplashScreen in headless Chrome (Puppeteer prerender) so bots get
  // full page content immediately. navigator.webdriver is true in headless mode.
  const isHeadlessBrowser =
    typeof navigator !== "undefined" && navigator.webdriver === true;

  function App() {
    const [splashDone, setSplashDone] = useState(isHeadlessBrowser);

    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  export default App;
  