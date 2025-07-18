
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import HotelSignup from "./pages/HotelSignUp";
import UserDashboard from "./pages/UserDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAllRoutes from "./pages/AdminAllRoutes";
import DashboardSelection from "./pages/DashboardSelection";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Videos from "./pages/Videos";
import FeaturedHotels from "./pages/FeaturedHotels";
import AffinityStays from "./pages/AffinityStays";
import AboutUs from "./pages/AboutUs";
import Press from "./pages/Press";
import AmbassadorProgram from "./pages/AmbassadorProgram";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { GlobalTestimonials } from "@/components/testimonials/GlobalTestimonials";
import { GlobalEnglishTestimonials } from "@/components/testimonials/GlobalEnglishTestimonials";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/hotel-signup" element={<HotelSignup />} />
              <Route path="/user-dashboard" element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/hotel-dashboard" element={
                <ProtectedRoute requireHotelOwner>
                  <HotelDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/*" element={
                <AdminRoute>
                  <AdminAllRoutes />
                </AdminRoute>
              } />
              <Route path="/dashboard-selection" element={
                <ProtectedRoute>
                  <DashboardSelection />
                </ProtectedRoute>
              } />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/featured-hotels" element={<FeaturedHotels />} />
              <Route path="/affinity-stays" element={<AffinityStays />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/press" element={<Press />} />
              <Route path="/ambassador" element={<AmbassadorProgram />} />
            </Routes>
            <GlobalTestimonials />
            <GlobalEnglishTestimonials />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
