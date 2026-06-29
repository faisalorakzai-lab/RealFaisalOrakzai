import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { Toaster } from "@/components/ui/toaster";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { AnimatePresence, motion } from "framer-motion";
  import NotFound from "@/pages/not-found";
  import Home from "@/pages/Home";
  import Founder from "@/pages/Founder";
  import Ecosystem from "@/pages/Ecosystem";
  import Projects from "@/pages/Projects";
  import Research from "@/pages/Research";
  import ResearchArticle from "@/pages/ResearchArticle";
  import Press from "@/pages/Press";
  import Learning from "@/pages/Learning";
  import Media from "@/pages/Media";
  import Investment from "@/pages/Investment";
  import Contact from "@/pages/Contact";
  import InnerCircle from "@/pages/InnerCircle";
  import Navbar from "@/components/layout/Navbar";
  import Footer from "@/components/layout/Footer";
  import ChatWidget from "@/components/shared/ChatWidget";
  import GlobalSearch from "@/components/shared/GlobalSearch";
  import SplashScreen from "@/components/shared/SplashScreen";
  import { useState } from "react";

  const queryClient = new QueryClient();

  const pageVariants = {
    initial: { opacity: 0, x: 40, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit:    { opacity: 0, x: -24, filter: "blur(3px)" },
  };

  const pageTransition = {
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94],
  };

  function Router() {
    const [location] = useLocation();

    return (
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{ willChange: "transform, opacity" }}
            >
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
                <Route component={NotFound} />
              </Switch>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
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
  