
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Ambassador from "./pages/Ambassador";
import AmbassadorsList from "./pages/AmbassadorsList";
import AmbassadorsUSA from "./pages/AmbassadorsUSA";
import Contact from "./pages/Contact";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Compare from "./pages/Compare";
import FAQ from "./pages/FAQ";
import Videos from "./pages/Videos";
import AffinityStays from "./pages/AffinityStays";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { GlobalAvatarSystem } from "./components/avatars/GlobalAvatarSystem";
import { SpanishVideoTestimonials } from "./components/testimonials/SpanishVideoTestimonials";
import { AuthProvider } from "./context/AuthContext";
import { AvatarManagerProvider } from "./contexts/AvatarManager";
import './i18n/config';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <AvatarManagerProvider>
              <GlobalAvatarSystem />
              <SpanishVideoTestimonials />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/ambassador" element={<Ambassador />} />
                <Route path="/ambassadors" element={<AmbassadorsList />} />
                <Route path="/ambassadors/usa" element={<AmbassadorsUSA />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/affinity-stays" element={<AffinityStays />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AvatarManagerProvider>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
