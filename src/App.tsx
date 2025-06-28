import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { SEOMetadata } from "@/components/SEOMetadata";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import { DashboardAccess } from "@/components/DashboardAccess";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { IntroAnimation, useIntroAnimation } from "@/components/intro";
import OurTeam from "@/pages/OurTeam";
import IntroTest from "@/pages/IntroTest";

// Initialize i18n
import "./i18n/config";

import Home from "@/pages/Index";
import Hotels from "@/pages/Hotels";
import HotelDetail from "@/pages/HotelDetail";
import Login from "@/pages/Login";
import Signup from "@/pages/SignUp";
import UserDashboard from "@/pages/UserDashboard";
import HotelDashboard from "@/pages/HotelDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import HotelRegistration from "@/pages/HotelSignUp";
import FeaturedHotels from "@/pages/FeaturedHotels";
import Videos from "@/pages/Videos";
import AffinityStays from "@/pages/AffinityStays";
import FAQ from "@/pages/FAQ";
import AdminRoles from "@/pages/AdminRoles";
import Search from "@/pages/Search";
import JoinUs from "@/pages/JoinUs";
import OurServices from "@/pages/OurServices";
import OurValues from "@/pages/OurValues";
import CustomerService from "@/pages/CustomerService";
import Contact from "@/pages/Contact";
import IntellectualProperty from "@/pages/IntellectualProperty";
import Compare from "@/pages/Compare";
import AddPropertyPage from "@/pages/AddPropertyPage";
import PanelFernando from "@/pages/PanelFernando";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Prueba from "@/pages/Prueba";
import ExcelGenerator from "@/pages/ExcelGenerator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  const { shouldShowIntro, handleIntroComplete } = useIntroAnimation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <Router>
            <SEOMetadata />
            
            {/* Intro Animation Overlay */}
            {shouldShowIntro && (
              <IntroAnimation onComplete={handleIntroComplete} />
            )}
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/our-services" element={<OurServices />} />
              <Route path="/our-values" element={<OurValues />} />
              <Route path="/customer-service" element={<CustomerService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/intellectual-property" element={<IntellectualProperty />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/excel-generator" element={<ExcelGenerator />} />
              
              {/* Test Routes for Intro Animations */}
              <Route path="/intro-test" element={<IntroTest />} />
              
              {/* Protected Routes */}
              <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
              <Route path="/hotel-dashboard" element={<ProtectedRoute requireHotelOwner={true}><HotelDashboard /></ProtectedRoute>} />
              <Route path="/hotel-registration" element={<ProtectedRoute><HotelRegistration /></ProtectedRoute>} />
              <Route path="/add-property" element={<ProtectedRoute requireHotelOwner={true}><AddPropertyPage /></ProtectedRoute>} />
              <Route path="/featured-hotels" element={<FeaturedHotels />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/affinity-stays" element={<AffinityStays />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Admin Routes - NO FORCED REDIRECTS */}
              <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/roles" element={<AdminRoute><AdminRoles /></AdminRoute>} />
              
              {/* Panel Fernando - New Admin Panel */}
              <Route path="/panel-fernando/*" element={<AdminRoute><PanelFernando /></AdminRoute>} />
              
              {/* Prueba - INDEPENDENT Admin Page - NO AdminRoute wrapper */}
              <Route path="/prueba" element={<Prueba />} />
              
              {/* Comparison Route */}
              <Route path="/compare" element={<Compare />} />
            </Routes>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
