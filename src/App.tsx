import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Index from '@/pages/Index';
import Search from '@/pages/Search';
import Hotel from '@/pages/Hotel';
import Blog from '@/pages/Blog';
import Article from '@/pages/Article';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import { GlobalTestimonials } from '@/components/testimonials/GlobalTestimonials';
import { GlobalEnglishTestimonials } from '@/components/testimonials/GlobalEnglishTestimonials';
import { VideoTestimonialProvider } from '@/contexts/VideoTestimonialContext';
import { EnglishVideoTestimonialProvider } from '@/contexts/EnglishVideoTestimonialContext';
import { AvatarProvider } from '@/contexts/AvatarManager';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <VideoTestimonialProvider>
          <EnglishVideoTestimonialProvider>
            <AvatarProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/hotel/:hotelId" element={<Hotel />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/article/:articleId" element={<Article />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Spanish Video Testimonials (existing system) */}
              <GlobalTestimonials />
              
              {/* English Video Testimonials (new system) */}
              <GlobalEnglishTestimonials />
            </AvatarProvider>
          </EnglishVideoTestimonialProvider>
        </VideoTestimonialProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
