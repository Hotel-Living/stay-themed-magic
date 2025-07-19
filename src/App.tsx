
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from '@/context/AuthContext';
import i18n from './i18n/config';
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import TestMaps from "./pages/TestMaps";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import AddProperty2 from "./pages/AddProperty2";
import AddPropertyPage from "./pages/AddPropertyPage";
import AdminAllRoutes from "./pages/AdminAllRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoles from "./pages/AdminRoles";
import AffinityStays from "./pages/AffinityStays";
import Ambassador from "./pages/Ambassador";
import AmbassadorsList from "./pages/AmbassadorsList";
import AmbassadorsUSA from "./pages/AmbassadorsUSA";
import Ayuda from "./pages/Ayuda";
import CodeStats from "./pages/CodeStats";
import Compare from "./pages/Compare";
import Contact from "./pages/Contact";
import CustomerService from "./pages/CustomerService";
import DashboardSelection from "./pages/DashboardSelection";
import ExcelGenerator from "./pages/ExcelGenerator";
import FAQ from "./pages/FAQ";
import FAQHotels from "./pages/FAQHotels";
import FAQTravelers from "./pages/FAQTravelers";
import FeaturedHotels from "./pages/FeaturedHotels";
import ForgotPassword from "./pages/ForgotPassword";
import Help from "./pages/Help";
import HotelAssociation from "./pages/HotelAssociation";
import HotelCrisis from "./pages/HotelCrisis";
import HotelDashboard from "./pages/HotelDashboard";
import HotelPartnerAgreement from "./pages/HotelPartnerAgreement";
import HotelSignUp from "./pages/HotelSignUp";
import HotelsPage from "./pages/HotelsPage";
import IntellectualProperty from "./pages/IntellectualProperty";
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
import JoinUs from "./pages/JoinUs";
import JoinUsTest from "./pages/JoinUsTest";
import Login from "./pages/Login";
import OurServices from "./pages/OurServices";
import OurTeam from "./pages/OurTeam";
import OurValues from "./pages/OurValues";
import PanelFernando from "./pages/PanelFernando";
import Press from "./pages/Press";
import Privacy from "./pages/Privacy";
import ProfessionalStudy from "./pages/ProfessionalStudy";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import Terms from "./pages/Terms";
import Videos from "./pages/Videos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotel/:id" element={<HotelDetail />} />
              <Route path="/test-maps" element={<TestMaps />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/hotel-signup" element={<HotelSignUp />} />
              
              {/* Dashboard Routes */}
              <Route path="/hotel-dashboard" element={<HotelDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-roles" element={<AdminRoles />} />
              <Route path="/dashboard-selection" element={<DashboardSelection />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route path="/add-property2" element={<AddProperty2 />} />
              
              {/* Info Pages */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/press" element={<Press />} />
              <Route path="/our-services" element={<OurServices />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/our-values" element={<OurValues />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/intellectual-property" element={<IntellectualProperty />} />
              
              {/* FAQ & Help */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/faq-hotels" element={<FAQHotels />} />
              <Route path="/faq-travelers" element={<FAQTravelers />} />
              <Route path="/help" element={<Help />} />
              <Route path="/ayuda" element={<Ayuda />} />
              <Route path="/customer-service" element={<CustomerService />} />
              
              {/* Features */}
              <Route path="/videos" element={<Videos />} />
              <Route path="/affinity-stays" element={<AffinityStays />} />
              <Route path="/featured-hotels" element={<FeaturedHotels />} />
              <Route path="/hotels-page" element={<HotelsPage />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/excel-generator" element={<ExcelGenerator />} />
              
              {/* Ambassadors */}
              <Route path="/ambassador" element={<Ambassador />} />
              <Route path="/ambassadors-list" element={<AmbassadorsList />} />
              <Route path="/ambassadors-usa" element={<AmbassadorsUSA />} />
              
              {/* Studies & Tests */}
              <Route path="/professional-study" element={<ProfessionalStudy />} />
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
              
              {/* Other Features */}
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/join-us-test" element={<JoinUsTest />} />
              <Route path="/hotel-association" element={<HotelAssociation />} />
              <Route path="/hotel-crisis" element={<HotelCrisis />} />
              <Route path="/hotel-partner-agreement" element={<HotelPartnerAgreement />} />
              <Route path="/panel-fernando" element={<PanelFernando />} />
              <Route path="/code-stats" element={<CodeStats />} />
              <Route path="/admin-all-routes" element={<AdminAllRoutes />} />
              
              {/* Catch all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </I18nextProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
