
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
      
      <main className="flex-1 pt-16 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <section className="py-10 md:py-16 px-4 overflow-hidden">
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-8 leading-tight">
              <span className="text-white">Live in permanent vacation</span><br />
              <span className="text-white text-xl md:text-2xl mt-2">Life as it always should be</span>
            </h1>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="space-y-3">
                {["Forget about house chores", "Multiply your social life"].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-3 text-base md:text-lg">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-left">{slogan}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                {["Choose hotels by favorite themes", "Surround yourself with like-minded people"].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-3 text-base md:text-lg">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-left">{slogan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 px-4 mb-24">
          <div className="container max-w-5xl mx-auto">
            <FilterSection onFilterChange={handleFilterChange} showSearchButton={true} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
