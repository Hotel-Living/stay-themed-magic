
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Index from "./pages/Index";
import HotelDetail from "./pages/HotelDetail";
import HotelListingModel from "./pages/HotelListingModel";
import UserDashboard from "./pages/UserDashboard";
import AuthCallback from "./pages/AuthCallback";
import DestinationHotels from "./pages/DestinationHotels";
import MemberDashboard from "./pages/MemberDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import HowItWorks from "./pages/HowItWorks";
import BusinessInquiry from "./pages/BusinessInquiry";
import JoinUs from "./pages/JoinUs";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/hotel-listing-model" element={<HotelListingModel />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/member-dashboard" element={<MemberDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/destinations/:destination" element={<DestinationHotels />} />
            <Route path="/community-guidelines" element={<CommunityGuidelines />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/business-inquiry" element={<BusinessInquiry />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
