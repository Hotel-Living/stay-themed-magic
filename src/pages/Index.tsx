
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Check } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Index() {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const isMobile = useIsMobile();
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <section className="py-4 px-4 overflow-hidden">
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <h1 className={`${isMobile ? 'text-3xl' : 'text-5xl md:text-7xl'} font-bold mb-2 tracking-tight animate-text-slow bg-gradient-to-r from-[#B1900F] via-[#F7F700] to-[#B1900F] bg-clip-text text-transparent`}>
              The Future of Living
            </h1>
            
            <p className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} mb-10 max-w-2xl mx-auto font-bold tracking-tight animate-text-slow bg-gradient-to-r from-[#B1900F] via-[#F7F700] to-[#B1900F] bg-clip-text text-transparent`}>
              Live in Hotels  -  Boost your Life
            </p>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 mb-6">
              <div className="space-y-0.5">
                {[
                  "Get rid of household chores", 
                  "Select hotels upon favourite themes"
                ].map((slogan, index) => (
                  <div key={index} className={`flex items-center gap-2 p-2 rounded-lg ${isMobile ? 'text-sm justify-start pl-4' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-[#860477] flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className={`${isMobile ? 'text-sm' : ''} text-left font-medium`}>{slogan}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-0.5">
                {[
                  "Boost your social life", 
                  "Find and enjoy your favorite people"
                ].map((slogan, index) => (
                  <div key={index} className={`flex items-center gap-2 p-2 rounded-lg ${isMobile ? 'text-sm justify-start pl-4' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-[#860477] flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className={`${isMobile ? 'text-sm' : ''} text-left font-medium`}>{slogan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section with reduced vertical spacing */}
        <section className="py-0 px-4 mb-16">
          <div className="container max-w-2xl mx-auto">
            <FilterSection onFilterChange={handleFilterChange} showSearchButton={true} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
