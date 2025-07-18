import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AvatarManagerProvider } from '@/contexts/AvatarManager';
import { VideoTestimonialProvider } from '@/contexts/VideoTestimonialContext';
import { EnglishVideoTestimonialProvider } from '@/contexts/EnglishVideoTestimonialContext';
import { GlobalTestimonials } from '@/components/testimonials/GlobalTestimonials';
import { GlobalEnglishTestimonials } from '@/components/testimonials/GlobalEnglishTestimonials';

function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <VideoTestimonialProvider>
        <EnglishVideoTestimonialProvider>
          <AvatarManagerProvider>
            <BrowserRouter>
              <Toaster />
              <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/pricing" element={<div>Pricing</div>} />
                <Route path="/about" element={<div>About</div>} />
                <Route path="/contact" element={<div>Contact</div>} />
                <Route path="/blog" element={<div>Blog</div>} />
                <Route path="/blog/:slug" element={<div>Article</div>} />
                <Route path="/legal" element={<div>Legal</div>} />
                <Route path="/terms" element={<div>Terms</div>} />
                <Route path="/privacy" element={<div>Privacy</div>} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
              <GlobalTestimonials />
              <GlobalEnglishTestimonials />
            </BrowserRouter>
          </AvatarManagerProvider>
        </EnglishVideoTestimonialProvider>
      </VideoTestimonialProvider>
    </QueryClientProvider>
  );
}

export default App;
