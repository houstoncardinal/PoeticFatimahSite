import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Poetry from "@/pages/Poetry";
import CollectionView from "@/pages/CollectionView";
import PoemView from "@/pages/PoemView";
import Performances from "@/pages/Performances";
import Shop from "@/pages/Shop";
import Events from "@/pages/Events";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Journal from "@/pages/Journal";
import JournalPost from "@/pages/JournalPost";
import Links from "@/pages/Links";
import AdminLogin from "@/pages/AdminLogin";
import Admin from "@/pages/Admin";
import AdminPoems from "@/pages/AdminPoems";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/poetry" component={Poetry} />
      <Route path="/poetry/:slug" component={CollectionView} />
      <Route path="/poetry/poem/:slug" component={PoemView} />
      <Route path="/performances" component={Performances} />
      <Route path="/shop" component={Shop} />
      <Route path="/events" component={Events} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/journal" component={Journal} />
      <Route path="/journal/:slug" component={JournalPost} />
      <Route path="/links" component={Links} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/poems" component={AdminPoems} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
