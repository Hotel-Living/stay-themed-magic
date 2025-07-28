import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { MonitoringProvider } from "@/components/monitoring/MonitoringProvider";
import { ConnectionBanner } from "@/components/ui/connection-banner";
import { BackToTopButton } from "@/components/ui/back-to-top";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useBatchScrollReveal } from "@/hooks/useScrollReveal";
import { AvatarManagerProvider } from "@/contexts/AvatarManager";
import { VideoTestimonialProvider } from "@/contexts/VideoTestimonialContext";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalAvatarSystem } from "@/components/avatars/GlobalAvatarSystem";
import { GlobalTestimonials } from "@/components/testimonials/GlobalTestimonials";
import { SEOMetadata } from "@/components/SEOMetadata";
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
import "./styles/micro-enhancements.css";

import Home from "@/pages/Index";
import Hotels from "@/pages/Hotels";
import HotelDetail from "@/pages/HotelDetail";
import DemoHotelDetail from "@/pages/DemoHotelDetail";

import UserDashboard from "@/pages/UserDashboard";
import HotelDashboard from "@/pages/HotelDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import FeaturedHotels from "@/pages/FeaturedHotels";
import Videos from "@/pages/Videos";
import AffinityStays from "@/pages/AffinityStays";
import FAQ from "@/pages/FAQ";
import Search from "@/pages/Search";
import JoinUs from "@/pages/JoinUs";
import OurServices from "@/pages/OurServices";
import OurValues from "@/pages/OurValues";
import CustomerService from "@/pages/CustomerService";
import Contact from "@/pages/Contact";
import IntellectualProperty from "@/pages/IntellectualProperty";
import Ayuda from "@/pages/Ayuda";
import ExcelGenerator from "@/pages/ExcelGenerator";
import ProfessionalStudy from "@/pages/ProfessionalStudy";
import Ambassador from "@/pages/Ambassador";
import Agents from "@/pages/Agents";
import AgentRegistration from "@/pages/AgentRegistration";
import AgentDashboard from "@/pages/AgentDashboard";
import AssociationLanding from "@/pages/AssociationLanding";
import AssociationRegistration from "@/pages/AssociationRegistration";
import { AssociationDashboard } from "@/components/association/AssociationDashboard";
import AmbassadorsList from "@/pages/AmbassadorsList";
import AmbassadorsUSA from "@/pages/AmbassadorsUSA";
import Press from "@/pages/Press";
import PromoterDashboard from "@/pages/PromoterDashboard";
import Compare from "@/pages/Compare";
import HotelModelPage from "@/pages/HotelModelPage";
import EmergencyAdminReset from "@/pages/EmergencyAdminReset";

// Authentication Components - ISOLATED
import SignupUser from "@/pages/auth/SignupUser";
import SignupHotel from "@/pages/auth/SignupHotel";
import SignupAssociation from "@/pages/auth/SignupAssociation";
import SignupPromoter from "@/pages/auth/SignupPromoter";
import LoginUser from "@/pages/auth/LoginUser";
import LoginHotel from "@/pages/auth/LoginHotel";
import LoginAssociation from "@/pages/auth/LoginAssociation";
import LoginPromoter from "@/pages/auth/LoginPromoter";
import AuthCallback from "@/pages/auth/AuthCallback";
import SigningPersonal from "@/pages/signingPersonal";
import RegisterUser from "@/pages/registerUser";
import RegisterHotel from "@/pages/registerHotel";
import RegisterAssociation from "@/pages/registerAssociation";
import RegisterPromotor from "@/pages/registerPromotor";

const queryClient = createQueryClient();

// Main App Routes with ALL providers and global components
function MainAppRoutes() {
  const { shouldShowIntro, handleIntroComplete } = useIntroAnimation();
  
  // Initialize smooth scroll behavior
  useSmoothScroll();
  
  // Initialize batch scroll reveal animations
  useBatchScrollReveal();
  
  return (
    <MonitoringProvider>
        <AccessibilityProvider>
          <VideoTestimonialProvider>
            <AvatarManagerProvider>
              <AuthProvider>
                <SEOMetadata />
                <ScrollToTop />
                <DashboardAccess />
                <GoogleAnalytics />
                <ConnectionBanner />
                
                {shouldShowIntro && (
                  <IntroAnimation onComplete={handleIntroComplete} />
                )}
          
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/demo/hotel-detail" element={<DemoHotelDetail />} />
            <Route path="/emergency-admin-reset" element={<EmergencyAdminReset />} />
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
            <Route path="/panel-asociacion" element={<AssociationDashboard />} />
            <Route path="/ambassadors" element={<AmbassadorsList />} />
            <Route path="/ambassadors/usa" element={<AmbassadorsUSA />} />
            <Route path="/press" element={<Press />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/affinity-stays" element={<AffinityStays />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/featured-hotels" element={<FeaturedHotels />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/preguntas-frecuentes" element={<FAQ />} />
            <Route path="/nosotros" element={<OurValues />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/hotel-dashboard" element={<HotelDashboard />} />
            <Route path="/panel-hotel" element={<HotelDashboard />} />
            <Route path="/panel-fernando" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/panel-admin" element={<Navigate to="/admin" replace />} />
            <Route path="/promoter/*" element={<PromoterDashboard />} />
            <Route path="/promoter-dashboard" element={<Navigate to="/promoter/dashboard" replace />} />
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
            <Route path="/compare" element={<Compare />} />
            <Route path="/hotel-model" element={<HotelModelPage />} />
            <Route path="/signingPersonal" element={<SigningPersonal />} />
            </Routes>
          </main>
          
          {/* Global Avatar System - appears on all pages except homepage, why-hotel-living, and hotels */}
          <GlobalAvatarSystem />
          
          {/* Global Video Testimonials - appears on all pages except homepage */}
          <GlobalTestimonials />
          
          {/* Global UI Enhancements */}
          <BackToTopButton />
            </AuthProvider>
          </AvatarManagerProvider>
        </VideoTestimonialProvider>
      </AccessibilityProvider>
    </MonitoringProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MonitoringProvider>
          <Router>
          <nav id="main-navigation" className="sr-only">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-background p-2 border border-border rounded">
              Skip to main content
            </a>
          </nav>
          <Routes>
            {/* Authentication Routes - ISOLATED from global components but with AuthProvider for login functionality */}
            <Route path="/signup/user" element={<AuthProvider><SignupUser /></AuthProvider>} />
            <Route path="/signup/hotel" element={<AuthProvider><SignupHotel /></AuthProvider>} />
            <Route path="/signup/association" element={<AuthProvider><SignupAssociation /></AuthProvider>} />
            <Route path="/signup/promoter" element={<AuthProvider><SignupPromoter /></AuthProvider>} />
            <Route path="/login/user" element={<AuthProvider><LoginUser /></AuthProvider>} />
            <Route path="/login/hotel" element={<AuthProvider><LoginHotel /></AuthProvider>} />
            <Route path="/login/association" element={<AuthProvider><LoginAssociation /></AuthProvider>} />
            <Route path="/login/promoter" element={<AuthProvider><LoginPromoter /></AuthProvider>} />
            <Route path="/auth/callback" element={<AuthProvider><AuthCallback /></AuthProvider>} />
            <Route path="/registerUser" element={<AuthProvider><RegisterUser /></AuthProvider>} />
            <Route path="/registerHotel" element={<AuthProvider><RegisterHotel /></AuthProvider>} />
            <Route path="/registerAssociation" element={<AuthProvider><RegisterAssociation /></AuthProvider>} />
            <Route path="/registerPromotor" element={<AuthProvider><RegisterPromotor /></AuthProvider>} />
            <Route path="/signingPersonal" element={<AuthProvider><SigningPersonal /></AuthProvider>} />
            
            {/* All other routes with full providers and global components */}
            <Route path="/*" element={<MainAppRoutes />} />
          </Routes>
          
          <Toaster />
          </Router>
        </MonitoringProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;