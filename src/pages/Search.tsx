
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hotel, themeCategories } from "@/utils/data";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { Theme } from "@/utils/data";

// Import the hotels from data.ts
import { hotels } from "@/utils/data";

export default function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const initialFilters = {
    country: searchParams.get("country") as string | null || null,
    month: searchParams.get("month") as string | null || null,
    theme: null as Theme | null,
    priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null,
    propertyType: null,
    propertyStyle: null,
    roomTypes: [] as string[],
    hotelFeatures: [] as string[],
    roomFeatures: [] as string[],
    meals: [] as string[],
    lengthOfStay: null,
    activities: [] as string[],
    location: null,
    category: null
  };
  
  // Handle theme separately since it needs to be looked up by ID
  const themeId = searchParams.get("theme");
  if (themeId) {
    const allThemes = themeCategories.flatMap(category => category.themes);
    const foundTheme = allThemes.find(theme => theme.id === themeId);
    if (foundTheme) {
      initialFilters.theme = foundTheme;
    }
  }
  
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  
  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };
  
  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const currentValues = [...(activeFilters[filterType as keyof typeof activeFilters] as string[] || [])];
    
    if (isChecked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }
    
    const newFilters = { ...activeFilters, [filterType]: currentValues };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };
  
  const applyFilters = (filters: typeof activeFilters) => {
    let results = [...hotels];
    
    if (filters.country) {
      // Convert country to lowercase for case-insensitive comparison
      const countryLower = filters.country.toLowerCase();
      results = results.filter(hotel => 
        hotel.country.toLowerCase() === countryLower
      );
    }
    
    if (filters.month) {
      // Convert month to proper case for comparison with hotel data
      const monthProperCase = filters.month.charAt(0).toUpperCase() + filters.month.slice(1).toLowerCase();
      results = results.filter(hotel => hotel.availableMonths.includes(monthProperCase));
    }
    
    if (filters.theme) {
      results = results.filter(hotel => 
        hotel.themes.some(theme => theme.id === filters.theme?.id)
      );
    }
    
    if (filters.priceRange) {
      if (filters.priceRange > 2000) {
        results = results.filter(hotel => hotel.pricePerMonth > 2000);
      } else {
        results = results.filter(hotel => hotel.pricePerMonth <= filters.priceRange!);
      }
    }
    
    // Additional filters can be applied here as they get implemented
    
    setFilteredHotels(results);
  };
  
  // Apply filters on initial load
  useEffect(() => {
    applyFilters(initialFilters);
  }, [location.search]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-white">Search Results</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="sticky top-20">
                <FilterSidebar 
                  activeFilters={activeFilters}
                  handleFilterChange={handleFilterChange}
                  handleArrayFilterChange={handleArrayFilterChange}
                />
              </div>
            </div>
            
            {/* Results */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <SearchResultsList filteredHotels={filteredHotels} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
