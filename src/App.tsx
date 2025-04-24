
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from './lib/query-client';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { Starfield } from "@/components/Starfield";
import { AuthProvider } from './context/auth/AuthProvider';
import { DashboardAccess } from './components/DashboardAccess';

import Index from './pages/Index';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HotelSignUp from './pages/HotelSignUp';
import HotelDashboard from './pages/HotelDashboard';
import UserDashboard from './pages/UserDashboard';
import HotelDetail from './pages/HotelDetail';
import Search from './pages/Search';
import FAQ from './pages/FAQ';
import FAQTravelers from './pages/FAQTravelers';
import FAQHotels from './pages/FAQHotels';
import Hotels from './pages/Hotels';
import AffinityStays from './pages/AffinityStays';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import OurValues from './pages/OurValues';
import OurServices from './pages/OurServices';
import IntellectualProperty from './pages/IntellectualProperty';
import CustomerService from './pages/CustomerService';
import HotelPartnerAgreement from './pages/HotelPartnerAgreement';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AddPropertyPage from './pages/AddPropertyPage';
import ThemesInformation from './pages/ThemesInformation';
import Contact from "./pages/Contact";
import AdminDashboard from './pages/AdminDashboard';
import AdminAllRoutes from './pages/AdminAllRoutes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const queryClient = createQueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <div className="min-h-screen overflow-x-hidden w-full">
            <Starfield />
            <div className="relative z-10 w-full">
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signin" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/hotel-signup" element={<HotelSignUp />} />
                  <Route path="/hotel-login" element={<Navigate to="/login?tab=hotel" />} />
                  <Route path="/hotel-dashboard" element={<HotelDashboard />} />
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="/hotel/:id" element={<HotelDetail />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/affinity-stays" element={<AffinityStays />} />
                  <Route path="/hoteles" element={<Navigate to="/hotels" />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/faq-travelers" element={<FAQTravelers />} />
                  <Route path="/faq-hotels" element={<FAQHotels />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/hotel-partner-agreement" element={<HotelPartnerAgreement />} />
                  <Route path="/our-values" element={<OurValues />} />
                  <Route path="/our-services" element={<OurServices />} />
                  <Route path="/intellectual-property" element={<IntellectualProperty />} />
                  <Route path="/customer-service" element={<CustomerService />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/add-property" element={<AddPropertyPage />} />
                  <Route path="/themes-information" element={<ThemesInformation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin/*" element={<AdminAllRoutes />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <DashboardAccess />
                <Toaster />
              </BrowserRouter>
            </div>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
