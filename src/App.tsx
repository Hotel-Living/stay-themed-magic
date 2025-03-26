
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ComparisonProvider } from "@/components/comparison/ComparisonContext";
import { ComparisonBar } from "@/components/comparison/ComparisonBar";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

// Page imports - organized by sections
// Public pages
import Index from "@/pages/Index";
import Search from "@/pages/Search";
import HotelDetail from "@/pages/HotelDetail";
import Compare from "@/pages/Compare";
import FAQ from "@/pages/FAQ";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import CustomerService from "@/pages/CustomerService";
import OurServices from "@/pages/OurServices";
import OurValues from "@/pages/OurValues";
import NotFound from "@/pages/NotFound";

// Auth pages
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";

// Protected pages
import UserDashboard from "@/pages/UserDashboard";
import HotelDashboard from "@/pages/HotelDashboard";
import Bookings from "@/pages/Bookings";
import Favorites from "@/pages/Favorites";

// Utility pages
import CodeStats from "@/pages/CodeStats";

// Create a client with better caching strategy
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hotel-living-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <LanguageProvider>
            <CurrencyProvider>
              <AuthProvider>
                <ComparisonProvider>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/hotel/:id" element={<HotelDetail />} />
                    <Route path="/compare" element={<Compare />} />
                    
                    {/* Auth routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    
                    {/* Protected routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <UserDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/host"
                      element={
                        <ProtectedRoute>
                          <HotelDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/bookings"
                      element={
                        <ProtectedRoute>
                          <Bookings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/favorites"
                      element={
                        <ProtectedRoute>
                          <Favorites />
                        </ProtectedRoute>
                      }
                    />
                    
                    {/* Information pages */}
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/customer-service" element={<CustomerService />} />
                    <Route path="/services" element={<OurServices />} />
                    <Route path="/values" element={<OurValues />} />
                    
                    {/* Utility pages */}
                    <Route path="/stats" element={<CodeStats />} />
                    
                    {/* Catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  
                  {/* Comparison bar */}
                  <ComparisonBar />
                  
                  {/* Toast notifications */}
                  <Toaster />
                </ComparisonProvider>
              </AuthProvider>
            </CurrencyProvider>
          </LanguageProvider>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
