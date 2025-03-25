
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Check } from "lucide-react";

export default function Index() {
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section with increased vertical spacing */}
        <section className="py-4 px-4 overflow-hidden">
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight" 
                style={{
                  background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
                  backgroundSize: '200% 200%',
                  animation: 'text-shine 2s linear infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              The Future of Living
            </h1>
            
            <p className="text-xl md:text-3xl mb-10 max-w-5xl mx-auto tracking-tight font-bold"
               style={{
                 background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
                 backgroundSize: '200% 200%',
                 animation: 'text-shine 2s linear infinite',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent'
               }}>
              Live in Hotels  -  Boost your Life
            </p>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
              <div className="space-y-0.5">
                {[
                  "Get rid of household chores", 
                  "Select hotels upon favourite themes"
                ].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-[#40013B] flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left font-medium">{slogan}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-0.5">
                {[
                  "Boost your social life", 
                  "Find and enjoy your favorite people"
                ].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-[#40013B] flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left font-medium">{slogan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section with reduced vertical spacing */}
        <section className="py-0 px-4">
          <div className="container max-w-6xl mx-auto">
            <FilterSection 
              onFilterChange={handleFilterChange} 
              showSearchButton={true} 
              placeholders={{
                month: "Month?",
                country: "Country?",
                theme: "Theme?",
                priceRange: "Price per Month?"
              }}
              useCollapsibleThemes={true}
              expandedLayout={true}
              compactSpacing={true}
              useBoldLabels={true}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
