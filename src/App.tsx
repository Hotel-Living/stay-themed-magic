
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { AuthProvider } from './context/auth/AuthProvider';
import { AvatarManagerProvider } from './contexts/AvatarManager';
// Core pages
import Index from "./pages/Index";
import HotelDetail from "./pages/HotelDetail";
import HotelListingModel from "./pages/HotelListingModel";

// Dashboard pages
import UserDashboard from "./pages/UserDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import HotelDashboard from "./pages/HotelDashboard";
import DashboardSelection from "./pages/DashboardSelection";
import PromoterDashboard from "./pages/PromoterDashboard";

// Language-specific dashboards
import HotelDashboardEN from "./pages/HotelDashboard.en";
import HotelDashboardES from "./pages/HotelDashboard.es";
import HotelDashboardPT from "./pages/HotelDashboard.pt";
import HotelDashboardRO from "./pages/HotelDashboard.ro";

// Contact pages
import Contact from "./pages/Contact";
import ContactEN from "./pages/Contact.en";
import ContactES from "./pages/Contact.es";
import ContactPT from "./pages/Contact.pt";
import ContactRO from "./pages/Contact.ro";

// Authentication pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import HotelSignUp from "./pages/HotelSignUp";

// Main content pages
import Hotels from "./pages/Hotels";
import AffinityStays from "./pages/AffinityStays";
import JoinUs from "./pages/JoinUs";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import Ambassador from "./pages/Ambassador";
import Agents from "./pages/Agents";
import Videos from "./pages/Videos";
import Press from "./pages/Press";
import Ayuda from "./pages/Ayuda";

// Specialized pages
import AddProperty2 from "./pages/AddProperty2";
import HotelPartnerAgreement from "./pages/HotelPartnerAgreement";
import AgentRegistration from "./pages/AgentRegistration";
import Compare from "./pages/Compare";
import CustomerService from "./pages/CustomerService";
import IntellectualProperty from "./pages/IntellectualProperty";
import OurServices from "./pages/OurServices";
import OurTeam from "./pages/OurTeam";
import HotelCrisis from "./pages/HotelCrisis";
import HotelAssociation from "./pages/HotelAssociation";
import FeaturedHotels from "./pages/FeaturedHotels";
import CodeStats from "./pages/CodeStats";
import ExcelGenerator from "./pages/ExcelGenerator";

// FAQ variations
import FAQHotels from "./pages/FAQHotels";
import FAQTravelers from "./pages/FAQTravelers";

// Ambassador pages
import AmbassadorsList from "./pages/AmbassadorsList";
import AmbassadorsUSA from "./pages/AmbassadorsUSA";

// Association pages
import AssociationLanding from "./pages/AssociationLanding";
import AssociationRegistration from "./pages/AssociationRegistration";

// Test/Demo pages
import IntroTest from "./pages/IntroTest";
import IntroTest1 from "./pages/IntroTest1";
import IntroTest2 from "./pages/IntroTest2";
import IntroTest3 from "./pages/IntroTest3";
import IntroTest4 from "./pages/IntroTest4";
import IntroTest5 from "./pages/IntroTest5";
import IntroTest6 from "./pages/IntroTest6";
import IntroTest7 from "./pages/IntroTest7";
import IntroTest8 from "./pages/IntroTest8";
import IntroTest9 from "./pages/IntroTest9";
import JoinUsTest from "./pages/JoinUsTest";

// Admin pages
import AdminAllRoutes from "./pages/AdminAllRoutes";
import AdminRoles from "./pages/AdminRoles";

// Other pages
import HotelsPage from "./pages/HotelsPage";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AvatarManagerProvider>
              <Routes>
                {/* Core Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/hotel-listing-model" element={<HotelListingModel />} />
                
                {/* Dashboard Routes */}
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/agent-dashboard" element={<AgentDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/hotel-dashboard" element={<HotelDashboard />} />
                <Route path="/dashboard-selection" element={<DashboardSelection />} />
                <Route path="/promoter-dashboard" element={<PromoterDashboard />} />
                
                {/* Language-specific Dashboards */}
                <Route path="/hotel-dashboard-en" element={<HotelDashboardEN />} />
                <Route path="/hotel-dashboard-es" element={<HotelDashboardES />} />
                <Route path="/hotel-dashboard-pt" element={<HotelDashboardPT />} />
                <Route path="/hotel-dashboard-ro" element={<HotelDashboardRO />} />
                
                {/* Authentication Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/hotel-signup" element={<HotelSignUp />} />
                
                {/* Contact Routes */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact-en" element={<ContactEN />} />
                <Route path="/contact-es" element={<ContactES />} />
                <Route path="/contact-pt" element={<ContactPT />} />
                <Route path="/contact-ro" element={<ContactRO />} />
                
                {/* Main Content Routes */}
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/affinity-stays" element={<AffinityStays />} />
                <Route path="/join-us" element={<JoinUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/ambassador" element={<Ambassador />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/agentes" element={<Agents />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/press" element={<Press />} />
                <Route path="/ayuda" element={<Ayuda />} />
                
                {/* Specialized Routes */}
                <Route path="/add-property-2" element={<AddProperty2 />} />
                <Route path="/hotel-partner-agreement" element={<HotelPartnerAgreement />} />
                <Route path="/agent-registration" element={<AgentRegistration />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/customer-service" element={<CustomerService />} />
                <Route path="/intellectual-property" element={<IntellectualProperty />} />
                <Route path="/our-services" element={<OurServices />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/hotel-crisis" element={<HotelCrisis />} />
                <Route path="/hotel-association" element={<HotelAssociation />} />
                <Route path="/featured-hotels" element={<FeaturedHotels />} />
                <Route path="/code-stats" element={<CodeStats />} />
                <Route path="/excel-generator" element={<ExcelGenerator />} />
                
                {/* FAQ Variations */}
                <Route path="/faq-hotels" element={<FAQHotels />} />
                <Route path="/faq-travelers" element={<FAQTravelers />} />
                
                {/* Ambassador Routes */}
                <Route path="/ambassadors-list" element={<AmbassadorsList />} />
                <Route path="/ambassadors-usa" element={<AmbassadorsUSA />} />
                
                {/* Association Routes */}
                <Route path="/association-landing" element={<AssociationLanding />} />
                <Route path="/association-registration" element={<AssociationRegistration />} />
                
                {/* Test/Demo Routes */}
                <Route path="/intro-test" element={<IntroTest />} />
                <Route path="/intro-test-1" element={<IntroTest1 />} />
                <Route path="/intro-test-2" element={<IntroTest2 />} />
                <Route path="/intro-test-3" element={<IntroTest3 />} />
                <Route path="/intro-test-4" element={<IntroTest4 />} />
                <Route path="/intro-test-5" element={<IntroTest5 />} />
                <Route path="/intro-test-6" element={<IntroTest6 />} />
                <Route path="/intro-test-7" element={<IntroTest7 />} />
                <Route path="/intro-test-8" element={<IntroTest8 />} />
                <Route path="/intro-test-9" element={<IntroTest9 />} />
                <Route path="/join-us-test" element={<JoinUsTest />} />
                
                {/* Admin Routes */}
                <Route path="/admin-all-routes" element={<AdminAllRoutes />} />
                <Route path="/admin-roles" element={<AdminRoles />} />
                
                {/* Other Routes */}
                <Route path="/hotels-page" element={<HotelsPage />} />
                <Route path="/help" element={<Help />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AvatarManagerProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
