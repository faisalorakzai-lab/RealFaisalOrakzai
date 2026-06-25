import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Founder from "@/pages/Founder";
import Ecosystem from "@/pages/Ecosystem";
import Projects from "@/pages/Projects";
import Research from "@/pages/Research";
import Press from "@/pages/Press";
import Learning from "@/pages/Learning";
import Media from "@/pages/Media";
import Investment from "@/pages/Investment";
import Contact from "@/pages/Contact";
import Navbar from "@/components/layout/Navbar";
import AiAssistant from "@/components/shared/AiAssistant";
import GlobalSearch from "@/components/shared/GlobalSearch";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 mt-16">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/founder" component={Founder} />
            <Route path="/ecosystem" component={Ecosystem} />
            <Route path="/projects" component={Projects} />
            <Route path="/research" component={Research} />
            <Route path="/press" component={Press} />
            <Route path="/learning" component={Learning} />
            <Route path="/media" component={Media} />
            <Route path="/investment" component={Investment} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      <AiAssistant />
      <GlobalSearch />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
