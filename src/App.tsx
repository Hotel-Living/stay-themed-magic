import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/i18n';
import ScrollToTop from '@/components/ScrollToTop';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import SEOMetadata from '@/components/SEOMetadata';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import HotelDetail from '@/pages/HotelDetail';
import CompareHotels from '@/pages/CompareHotels';
import BookingSuccess from '@/pages/BookingSuccess';
import DashboardPage from '@/pages/Dashboard';
import FaqPage from '@/pages/FaqPage';
import ContactPage from '@/pages/ContactPage';
import LegalPage from '@/pages/LegalPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import BookingPage from '@/pages/BookingPage';
import UserDashboard from '@/pages/UserDashboard';
// Intro test pages are now disabled - not imported

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Router>
            <ScrollToTop />
            <GoogleAnalytics />
            <SEOMetadata />
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/compare" element={<CompareHotels />} />
                <Route path="/booking/:hotelId" element={<BookingPage />} />
                <Route path="/booking-success" element={<BookingSuccess />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                {/* Intro test routes are disabled - not included */}
              </Routes>
            </div>
            <Toaster />
          </Router>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

export default App;
