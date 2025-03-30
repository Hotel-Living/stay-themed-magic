
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from "@/components/ui/toaster";
import { Starfield } from "@/components/Starfield";

import Index from './pages/Index';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import HotelLogin from './pages/HotelLogin';
import HotelSignUp from './pages/HotelSignUp';
import HotelDashboard from './pages/HotelDashboard';
import UserDashboard from './pages/UserDashboard';
import HotelDetail from './pages/HotelDetail';
import Search from './pages/Search';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import OurValues from './pages/OurValues';
import OurServices from './pages/OurServices';
import IntellectualProperty from './pages/IntellectualProperty';
import CustomerService from './pages/CustomerService';
import HotelPartnerAgreement from './pages/HotelPartnerAgreement';
import AuthProvider from './context/auth/AuthProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen bg-[#4a0155] bg-gradient-to-bl from-purple-900/90 via-[#4a0155] to-indigo-950/70">
      <Starfield />
      <div className="relative z-10">
        <BrowserRouter>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/hotel-login" element={<HotelLogin />} />
                  <Route path="/hotel-signup" element={<HotelSignUp />} />
                  <Route path="/hotel-dashboard" element={<HotelDashboard />} />
                  <Route path="/user-dashboard" element={<UserDashboard />} />
                  <Route path="/hotel/:id" element={<HotelDetail />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/hotel-partner-agreement" element={<HotelPartnerAgreement />} />
                  <Route path="/our-values" element={<OurValues />} />
                  <Route path="/our-services" element={<OurServices />} />
                  <Route path="/intellectual-property" element={<IntellectualProperty />} />
                  <Route path="/customer-service" element={<CustomerService />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </ThemeProvider>
            </QueryClientProvider>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
