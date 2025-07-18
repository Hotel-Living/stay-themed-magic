
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Ambassador from "./pages/Ambassador";
import { AmbassadorsList } from "./pages/AmbassadorsList";
import { AmbassadorsUSA } from "./pages/AmbassadorsUSA";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Booking from "./pages/Booking";
import Reviews from "./pages/Reviews";
import Videos from "./pages/Videos";
import { GlobalAvatarSystem } from "./components/avatars/GlobalAvatarSystem";
import { SpanishVideoTestimonials } from "./components/testimonials/SpanishVideoTestimonials";
import './i18n/i18n';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <GlobalAvatarSystem />
          <SpanishVideoTestimonials />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ambassador" element={<Ambassador />} />
            <Route path="/ambassadors" element={<AmbassadorsList />} />
            <Route path="/ambassadors/usa" element={<AmbassadorsUSA />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
