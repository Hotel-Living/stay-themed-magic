
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Building, Check } from "lucide-react";
import { Link } from "react-router-dom";
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
      
      <main className="flex-1 pt-16 text-white">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 leading-tight">
              <span className="text-white">Viva en eternas vacaciones</span><br />
              <span className="text-white text-3xl md:text-4xl mt-2">La vida como siempre debió ser</span>
            </h1>
            
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="space-y-6">
                {["Olvídese de las tareas de la casa", "Multiplique su vida social"].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-3 text-xl md:text-2xl">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left">{slogan}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                {["Elija hoteles por temáticas favoritas", "Rodéese de personas a su medida"].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-3 text-xl md:text-2xl">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left">{slogan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-10 px-4">
          <div className="container max-w-6xl mx-auto">
            <FilterSection onFilterChange={handleFilterChange} showSearchButton={true} />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Hotel-Living. La revolución necesaria</h2>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
