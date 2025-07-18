
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Index from '@/pages/Index';
import Search from '@/pages/Search';
import HotelDetail from '@/pages/HotelDetail';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import AboutUs from '@/pages/AboutUs';
import FAQ from '@/pages/FAQ';
import Hotels from '@/pages/Hotels';
import Ambassador from '@/pages/Ambassador';
import AmbassadorsList from '@/pages/AmbassadorsList';
import AmbassadorsUSA from '@/pages/AmbassadorsUSA';
import Press from '@/pages/Press';
import IntellectualProperty from '@/pages/IntellectualProperty';
import OurServices from '@/pages/OurServices';
import OurValues from '@/pages/OurValues';
import AffinityStays from '@/pages/AffinityStays';
import CustomerService from '@/pages/CustomerService';
import HotelCrisis from '@/pages/HotelCrisis';
import HotelAssociation from '@/pages/HotelAssociation';
import NotFound from '@/pages/NotFound';
import { GlobalTestimonials } from '@/components/testimonials/GlobalTestimonials';
import { GlobalEnglishTestimonials } from '@/components/testimonials/GlobalEnglishTestimonials';
import { VideoTestimonialProvider } from '@/contexts/VideoTestimonialContext';
import { EnglishVideoTestimonialProvider } from '@/contexts/EnglishVideoTestimonialContext';
import { AvatarManagerProvider } from '@/contexts/AvatarManager';
import { AuthProvider } from '@/context/AuthContext';

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
        <AuthProvider>
          <VideoTestimonialProvider>
          <EnglishVideoTestimonialProvider>
            <AvatarManagerProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/hotel/:hotelId" element={<HotelDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/hotels" element={<Hotels />} />
                
                {/* Ambassador Routes */}
                <Route path="/ambassador" element={<Ambassador />} />
                <Route path="/ambassadors" element={<AmbassadorsList />} />
                <Route path="/ambassadors/usa" element={<AmbassadorsUSA />} />
                
                {/* Additional Pages */}
                <Route path="/press" element={<Press />} />
                <Route path="/intellectual-property" element={<IntellectualProperty />} />
                <Route path="/our-services" element={<OurServices />} />
                <Route path="/our-values" element={<OurValues />} />
                <Route path="/affinity-stays" element={<AffinityStays />} />
                <Route path="/customer-service" element={<CustomerService />} />
                <Route path="/hotel-crisis" element={<HotelCrisis />} />
                <Route path="/hotel-association" element={<HotelAssociation />} />
                
                {/* Spanish Routes */}
                <Route path="/hoteles" element={<Hotels />} />
                <Route path="/preguntas-frecuentes" element={<FAQ />} />
                <Route path="/embajador" element={<Ambassador />} />
                <Route path="/embajadores" element={<AmbassadorsList />} />
                <Route path="/prensa" element={<Press />} />
                <Route path="/servicios" element={<OurServices />} />
                <Route path="/valores" element={<OurValues />} />
                <Route path="/estancias-afinidades" element={<AffinityStays />} />
                <Route path="/servicio-cliente" element={<CustomerService />} />
                <Route path="/crisis-hotelera" element={<HotelCrisis />} />
                <Route path="/asociacion-hotelera" element={<HotelAssociation />} />
                
                {/* Portuguese Routes */}
                <Route path="/hoteis" element={<Hotels />} />
                <Route path="/perguntas-frequentes" element={<FAQ />} />
                <Route path="/torne-se-embaixador" element={<Ambassador />} />
                <Route path="/embaixadores" element={<AmbassadorsList />} />
                <Route path="/imprensa" element={<Press />} />
                <Route path="/nossos-servicos" element={<OurServices />} />
                <Route path="/nossos-valores" element={<OurValues />} />
                <Route path="/estadias-afinidades" element={<AffinityStays />} />
                <Route path="/atendimento-cliente" element={<CustomerService />} />
                <Route path="/crise-hoteleira" element={<HotelCrisis />} />
                <Route path="/associacao-hoteleira" element={<HotelAssociation />} />
                
                {/* Romanian Routes */}
                <Route path="/hoteluri" element={<Hotels />} />
                <Route path="/intrebari-frecvente" element={<FAQ />} />
                <Route path="/devino-ambasador" element={<Ambassador />} />
                <Route path="/ambasadori" element={<AmbassadorsList />} />
                <Route path="/presa" element={<Press />} />
                <Route path="/serviciile-noastre" element={<OurServices />} />
                <Route path="/valorile-noastre" element={<OurValues />} />
                <Route path="/sederi-afinitati" element={<AffinityStays />} />
                <Route path="/serviciu-clienti" element={<CustomerService />} />
                <Route path="/criza-hoteliera" element={<HotelCrisis />} />
                <Route path="/asociatia-hoteliera" element={<HotelAssociation />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Spanish Video Testimonials (existing system) */}
              <GlobalTestimonials />
              
              {/* English Video Testimonials (new system) */}
              <GlobalEnglishTestimonials />
            </AvatarManagerProvider>
          </EnglishVideoTestimonialProvider>
        </VideoTestimonialProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
