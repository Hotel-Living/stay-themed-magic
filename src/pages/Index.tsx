
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Check } from "lucide-react";
import { Starfield } from "@/components/Starfield";

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
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <section className="py-4 px-4 overflow-hidden">
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight text-gradient">
              The Future of Living
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
              Live in hotels. Enjoy Life
            </p>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-8">
              <div className="space-y-3">
                {[
                  "Freedom from daily chores", 
                  "Select hotels and friends according to your preferences"
                ].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-2 glass-card-hover p-3 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left font-medium">{slogan}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                {[
                  "A community of like-minded individuals", 
                  "Enhance your social connections"
                ].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-2 glass-card-hover p-3 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left font-medium">{slogan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-2 px-4">
          <div className="container max-w-2xl mx-auto">
            <FilterSection onFilterChange={handleFilterChange} showSearchButton={true} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
