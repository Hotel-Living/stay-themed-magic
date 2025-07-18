import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages';
import Pricing from '@/pages/pricing';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import Blog from '@/pages/blog';
import Article from '@/pages/article';
import Legal from '@/pages/legal';
import Terms from '@/pages/terms';
import Privacy from '@/pages/privacy';
import NotFound from '@/pages/404';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AvatarManagerProvider } from '@/contexts/AvatarManager';
import { VideoTestimonialProvider } from '@/contexts/VideoTestimonialContext';
import { EnglishVideoTestimonialProvider } from '@/contexts/EnglishVideoTestimonialContext';
import { GlobalTestimonials } from '@/components/testimonials/GlobalTestimonials';
import { GlobalEnglishTestimonials } from '@/components/testimonials/GlobalEnglishTestimonials';

function App() {
  return (
    <QueryClient>
      <VideoTestimonialProvider>
        <EnglishVideoTestimonialProvider>
          <AvatarManagerProvider>
            <BrowserRouter>
              <Toaster />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<Article />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <GlobalTestimonials />
              <GlobalEnglishTestimonials />
            </BrowserRouter>
          </AvatarManagerProvider>
        </EnglishVideoTestimonialProvider>
      </VideoTestimonialProvider>
    </QueryClient>
  );
}

export default App;
