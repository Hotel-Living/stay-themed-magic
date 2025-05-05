
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useState } from 'react';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';
import { FilterState } from '@/components/filters';
import { Button } from '@/components/ui/button';
import { Search, Calendar, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  const { data: themes } = useThemes();
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: { min: 0, max: 1000 },
    searchTerm: null,
    minPrice: 0,
    maxPrice: 1000,
    stars: [],
    location: null,
    propertyType: null,
    propertyStyle: null,
    activities: [],
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    mealPlans: [],
    stayLengths: [],
    atmosphere: null
  });

  // Initialize useHotels hook to prepare for filtering
  const { updateFilters } = useHotels({ initialFilters: filters });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  // Extract theme names for the filter dropdown
  const themeNames = themes ? themes.map(theme => theme.name) : [];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Navbar />
      
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full min-h-[600px] flex items-center justify-center px-4">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#2D2212] to-[#463621]"></div>
          <div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: "url('/lovable-uploads/fe0b8f22-ec21-4b14-b6a1-d10b1db86c3f.png')",
              backgroundSize: "200px",
              backgroundRepeat: "repeat"
            }}
          ></div>
          
          <div className="relative z-10 max-w-6xl w-full mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              LIVE IN <span className="text-[#D4AF37]">HOTELS</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-10 text-white/90 max-w-2xl mx-auto">
              Discover a new way of living with extended stays in themed hotels around the world.
            </p>
            
            {/* Search Box */}
            <div className="bg-black/30 p-6 rounded-xl backdrop-blur-sm border border-[#D4AF37]/30 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37] h-5 w-5" />
                  <select className="w-full pl-10 pr-4 py-3 bg-black/40 text-white rounded-lg border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:outline-none">
                    <option value="">Any Location</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="americas">Americas</option>
                  </select>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37] h-5 w-5" />
                  <select className="w-full pl-10 pr-4 py-3 bg-black/40 text-white rounded-lg border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:outline-none">
                    <option value="">Any Month</option>
                    <option value="jan">January</option>
                    <option value="feb">February</option>
                    <option value="mar">March</option>
                    <option value="apr">April</option>
                    <option value="may">May</option>
                    <option value="jun">June</option>
                    <option value="jul">July</option>
                    <option value="aug">August</option>
                    <option value="sep">September</option>
                    <option value="oct">October</option>
                    <option value="nov">November</option>
                    <option value="dec">December</option>
                  </select>
                </div>
                <div className="relative">
                  <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37] h-5 w-5" />
                  <select className="w-full pl-10 pr-4 py-3 bg-black/40 text-white rounded-lg border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:outline-none">
                    <option value="">Any Theme</option>
                    {themeNames.map((theme, index) => (
                      <option key={index} value={theme}>{theme}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Link to="/hotels">
                <Button className="w-full md:w-auto bg-[#D4AF37] hover:bg-[#C4A02C] text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" />
                  <span>Search Hotels</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#463621] to-[#2D2212]"></div>
          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: "url('/lovable-uploads/fe0b8f22-ec21-4b14-b6a1-d10b1db86c3f.png')",
              backgroundSize: "200px",
              backgroundRepeat: "repeat"
            }}
          ></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Why <span className="text-[#D4AF37]">Hotel-Living?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 transition-all hover:transform hover:scale-105">
                <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">Boost Your Social Life</h3>
                <p className="text-white/80 text-center">
                  Meet like-minded people with similar interests in themed communities designed for connection.
                </p>
              </div>
              
              <div className="backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 transition-all hover:transform hover:scale-105">
                <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">Themed Experiences</h3>
                <p className="text-white/80 text-center">
                  Choose hotels based on your favorite themes, from art and culture to sports and entertainment.
                </p>
              </div>
              
              <div className="backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 transition-all hover:transform hover:scale-105">
                <div className="bg-[#D4AF37]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">No Household Chores</h3>
                <p className="text-white/80 text-center">
                  Forget about maintenance, cleaning, and household tasks. Focus on living your best life.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 relative text-center">
          <div className="absolute inset-0 z-0 bg-[#2D2212]"></div>
          <div 
            className="absolute inset-0 z-0 opacity-15"
            style={{
              backgroundImage: "url('/lovable-uploads/fe0b8f22-ec21-4b14-b6a1-d10b1db86c3f.png')",
              backgroundSize: "200px",
              backgroundRepeat: "repeat"
            }}
          ></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="backdrop-blur-sm bg-[#D4AF37]/10 p-8 md:p-12 rounded-xl border border-[#D4AF37]/30 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Start Your <span className="text-[#D4AF37]">Hotel-Living</span> Journey
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of people who have transformed their lifestyle by living in hotels around the world.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button className="bg-[#D4AF37] hover:bg-[#C4A02C] text-white px-8 py-3 rounded-lg">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/hotels">
                  <Button className="bg-transparent hover:bg-white/10 text-white border border-[#D4AF37] px-8 py-3 rounded-lg">
                    Browse Hotels
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
