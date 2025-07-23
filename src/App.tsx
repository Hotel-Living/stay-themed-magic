import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/auth/AuthProvider";
import { AvatarManagerProvider } from "@/contexts/AvatarManager";
import { VideoTestimonialProvider } from "@/contexts/VideoTestimonialContext";
import { GlobalAvatarSystem } from "@/components/avatars/GlobalAvatarSystem";
import { GlobalTestimonials } from "@/components/testimonials/GlobalTestimonials";
import { SEOMetadata } from "@/components/SEOMetadata";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import { DashboardAccess } from "@/components/DashboardAccess";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { IntroAnimation, useIntroAnimation } from "@/components/intro";
import OurTeam from "@/pages/OurTeam";
import IntroTest from "@/pages/IntroTest";
import IntroTest1 from "@/pages/IntroTest1";
import IntroTest2 from "@/pages/IntroTest2";
import IntroTest3 from "@/pages/IntroTest3";
import IntroTest4 from "@/pages/IntroTest4";
import IntroTest5 from "@/pages/IntroTest5";
import IntroTest6 from "@/pages/IntroTest6";
import IntroTest7 from "@/pages/IntroTest7";
import IntroTest8 from "@/pages/IntroTest8";
import IntroTest9 from "@/pages/IntroTest9";

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
// AddPropertyPage removed with 5-step form
// AddProperty2 removed with JotForm removal
import PanelFernando from "@/pages/PanelFernando";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Prueba from "@/pages/Prueba";
import ExcelGenerator from "@/pages/ExcelGenerator";
import ProfessionalStudy from "@/pages/ProfessionalStudy";
import Ambassador from "@/pages/Ambassador";
import Agents from "@/pages/Agents";
import AgentRegistration from "@/pages/AgentRegistration";
import AgentDashboard from "@/pages/AgentDashboard";
import AssociationRegistration from "@/pages/AssociationRegistration";
import { AssociationDashboard } from "@/components/association/AssociationDashboard";
import AssociationLanding from "@/pages/AssociationLanding";
import PromoterDashboard from "@/pages/PromoterDashboard";
import Press from "@/pages/Press";
import HotelCrisis from "@/pages/HotelCrisis";
import HotelAssociation from "@/pages/HotelAssociation";
import Help from "@/pages/Help";
import Ayuda from "@/pages/Ayuda";
import AmbassadorsList from "@/pages/AmbassadorsList";
import AmbassadorsUSA from "@/pages/AmbassadorsUSA";

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
        <Router>
          <AuthProvider>
            <VideoTestimonialProvider>
              <AvatarManagerProvider>
              <SEOMetadata />
              <ScrollToTop />
              <GoogleAnalytics />
              <DashboardAccess />
              
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
              <Route path="/hotel-signup" element={<HotelRegistration />} />
              <Route path="/hotel-login" element={<Login />} />
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
              <Route path="/professional-study" element={<ProfessionalStudy />} />
                <Route path="/ambassador" element={<Ambassador />} />
                <Route path="/agentes" element={<Agents />} />
                <Route path="/agentes/registro" element={<AgentRegistration />} />
                <Route path="/panel-agente" element={<AgentDashboard />} />
                <Route path="/asociacion" element={<AssociationLanding />} />
                <Route path="/asociacion/registro" element={<AssociationRegistration />} />
                <Route path="/panel-asociacion" element={<ProtectedRoute requireAssociation={true}><AssociationDashboard /></ProtectedRoute>} />
                <Route path="/ambassadors" element={<AmbassadorsList />} />
                <Route path="/ambassadors/usa" element={<AmbassadorsUSA />} />
                <Route path="/press" element={<Press />} />
                 <Route path="/hotel-crisis" element={<HotelCrisis />} />
                 <Route path="/asociacion/:slug" element={<HotelAssociation />} />
                 <Route path="/help" element={<Help />} />
                 <Route path="/ayuda" element={<Ayuda />} />
              
              {/* Test Routes for Intro Animations */}
              <Route path="/intro-test" element={<IntroTest />} />
              <Route path="/intro-test1" element={<IntroTest1 />} />
              <Route path="/intro-test2" element={<IntroTest2 />} />
              <Route path="/intro-test3" element={<IntroTest3 />} />
              <Route path="/intro-test4" element={<IntroTest4 />} />
              <Route path="/intro-test5" element={<IntroTest5 />} />
              <Route path="/intro-test6" element={<IntroTest6 />} />
              <Route path="/intro-test7" element={<IntroTest7 />} />
              <Route path="/intro-test8" element={<IntroTest8 />} />
              <Route path="/intro-test9" element={<IntroTest9 />} />
              
               {/* Protected Routes */}
               <Route path="/user-dashboard" element={<ProtectedRoute requireTraveler={true}><UserDashboard /></ProtectedRoute>} />
               <Route path="/hotel-dashboard" element={<ProtectedRoute requireHotelOwner={true}><HotelDashboard /></ProtectedRoute>} />
               <Route path="/promoter/dashboard" element={<ProtectedRoute requirePromoter={true}><PromoterDashboard /></ProtectedRoute>} />
              <Route path="/hotel-registration" element={<ProtectedRoute><HotelRegistration /></ProtectedRoute>} />
              {/* Old 5-step form route removed */}
              {/* Route removed with JotForm removal */}
              <Route path="/featured-hotels" element={<FeaturedHotels />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/affinity-stays" element={<AffinityStays />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Admin Routes - DEPRECATED - Redirects to Fernando Panel */}
              <Route path="/admin/*" element={<Navigate to="/panel-fernando/hotels" replace />} />
              <Route path="/admin/roles" element={<Navigate to="/panel-fernando/user-roles" replace />} />
              
              {/* Panel Fernando - New Admin Panel */}
              <Route path="/panel-fernando/*" element={<AdminRoute><PanelFernando /></AdminRoute>} />
              
              {/* Prueba - INDEPENDENT Admin Page - NO AdminRoute wrapper */}
              <Route path="/prueba" element={<Prueba />} />
              
              {/* Comparison Route */}
              <Route path="/compare" element={<Compare />} />
            </Routes>
            
            {/* Global Avatar System - appears on all pages except homepage, why-hotel-living, and hotels */}
            <GlobalAvatarSystem />
            
            {/* Global Video Testimonials - appears on all pages except homepage */}
            <GlobalTestimonials />
            </AvatarManagerProvider>
            </VideoTestimonialProvider>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
