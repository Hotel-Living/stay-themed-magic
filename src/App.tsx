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
import HotelLogin from "./pages/HotelLogin";
import HotelRegistration from "./pages/HotelRegistration";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import HotelEdit from "./pages/HotelEdit";
import HotelCreate from "./pages/HotelCreate";
import HotelView from "./pages/HotelView";
import HotelSearch from "./pages/HotelSearch";
import HotelResults from "./pages/HotelResults";
import HotelThemes from "./pages/HotelThemes";
import HotelThemeEdit from "./pages/HotelThemeEdit";
import HotelThemeCreate from "./pages/HotelThemeCreate";
import RatesCalculator from "./pages/RatesCalculator";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HotelPartnerAgreement from "./pages/HotelPartnerAgreement";
import Affinities from "./pages/Affinities";
import HotelLiving from "./pages/HotelLiving";
import Contact from "./pages/Contact";
import About from "./pages/About";
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
              <Route path="/hotel-login" element={<HotelLogin />} />
              <Route path="/hotel-registration" element={<HotelRegistration />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/hotel-partner-agreement" element={<HotelPartnerAgreement />} />
              <Route path="/affinities" element={<Affinities />} />
              <Route path="/hotel-living" element={<HotelLiving />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              
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
              <Route
                path="/hotel-edit/:id"
                element={
                  <ProtectedRoute requireHotelOwner={true}>
                    <HotelEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hotel-create"
                element={
                  <ProtectedRoute requireHotelOwner={true}>
                    <HotelCreate />
                  </ProtectedRoute>
                }
              />
              <Route path="/hotel-view/:id" element={<HotelView />} />
              <Route path="/hotel-search" element={<HotelSearch />} />
              <Route path="/hotel-results" element={<HotelResults />} />
              
              {/* Hotel Themes Routes */}
              <Route
                path="/hotel-themes/:hotelId"
                element={
                  <ProtectedRoute requireHotelOwner={true}>
                    <HotelThemes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hotel-theme-edit/:id"
                element={
                  <ProtectedRoute requireHotelOwner={true}>
                    <HotelThemeEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hotel-theme-create/:hotelId"
                element={
                  <ProtectedRoute requireHotelOwner={true}>
                    <HotelThemeCreate />
                  </ProtectedRoute>
                }
              />
              
              {/* Rates Calculator Route - Public for now, consider protecting */}
              <Route path="/rates-calculator" element={<RatesCalculator />} />
              
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
