import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HotelSignUp from "./pages/HotelSignUp";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import HotelDetail from "./pages/HotelDetail";
import Hotels from "./pages/Hotels";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HotelPartnerAgreement from "./pages/HotelPartnerAgreement";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/hotel-signup" element={<HotelSignUp />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/hotel-partner-agreement" element={<HotelPartnerAgreement />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              
              {/* User Routes */}
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />
              
              {/* Hotel Owner Routes */}
              <Route
                path="/hotel-dashboard"
                element={
                  <ProtectedRoute requireHotelOwner={true}>
                    <HotelDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
