
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { HotelCard } from "@/components/HotelCard";
import { hotels, Hotel } from "@/utils/data";
import { Compass } from "lucide-react";

export default function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const initialFilters: FilterState = {
    country: searchParams.get("country") as any || null,
    month: searchParams.get("month") as any || null,
    theme: null,
    priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null
  };
  
  // Handle theme separately since it needs to be looked up by ID
  const themeId = searchParams.get("theme");
  if (themeId) {
    const allThemes = hotels.flatMap(hotel => hotel.themes);
    const foundTheme = allThemes.find(theme => theme.id === themeId);
    if (foundTheme) {
      initialFilters.theme = foundTheme;
    }
  }
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  
  const handleFilterChange = (filters: FilterState) => {
    let results = [...hotels];
    
    if (filters.country) {
      // Convert country to lowercase for case-insensitive comparison
      const countryLower = filters.country.toLowerCase();
      results = results.filter(hotel => 
        hotel.country.toLowerCase() === countryLower.charAt(0).toUpperCase() + countryLower.slice(1)
      );
    }
    
    if (filters.month) {
      // Convert month to proper case for comparison with hotel data
      const monthProperCase = filters.month.charAt(0).toUpperCase() + filters.month.slice(1) as any;
      results = results.filter(hotel => hotel.availableMonths.includes(monthProperCase));
    }
    
    if (filters.theme) {
      results = results.filter(hotel => 
        hotel.themes.some(theme => theme.id === filters.theme!.id)
      );
    }
    
    if (filters.priceRange) {
      if (filters.priceRange > 2000) {
        results = results.filter(hotel => hotel.pricePerMonth > 2000);
      } else {
        results = results.filter(hotel => hotel.pricePerMonth <= filters.priceRange);
      }
    }
    
    setFilteredHotels(results);
  };
  
  // Apply filters on initial load
  useEffect(() => {
    handleFilterChange(initialFilters);
  }, [location.search]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 bg-[#5B0155]">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-white">Search Results</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="sticky top-20">
                <FilterSection 
                  onFilterChange={handleFilterChange} 
                  showSearchButton={false} 
                  verticalLayout={true} 
                  useCollapsibleThemes={true}
                />
              </div>
            </div>
            
            {/* Results */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <h2 className="text-lg font-bold mb-6 text-white">
                {filteredHotels.length > 0 
                  ? `Found ${filteredHotels.length} hotels` 
                  : "No hotels match your filters"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHotels.map(hotel => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
              
              {filteredHotels.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fuchsia-900/20 flex items-center justify-center">
                    <Compass className="w-10 h-10 text-fuchsia-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">No matching hotels</h3>
                  <p className="text-white/70 mb-6">Try adjusting your filters to find more options.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
