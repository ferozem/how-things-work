import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Topic from "@/pages/topic";
import Games from "@/pages/games";
import Videos from "@/pages/videos";
import Experiments from "@/pages/experiments";
import ParentZone from "@/pages/parent-zone";
import Header from "@/components/header";
import Footer from "@/components/footer";

function Routes() {
  return (
    <div className="min-h-screen bg-alice-blue exploration-bg">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/topic/:id" component={Topic} />
          <Route path="/games" component={Games} />
          <Route path="/videos" component={Videos} />
          <Route path="/experiments" component={Experiments} />
          <Route path="/parent-zone" component={ParentZone} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Routes />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;