
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { ScrollToTop } from '@/components/ScrollToTop';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SEOMetadata } from '@/components/SEOMetadata';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import HotelDetail from '@/pages/HotelDetail';
import Compare from '@/pages/Compare';
import Search from '@/pages/Search';
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
                <Route path="/hotel/:id" element={<HotelDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/search" element={<Search />} />
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
