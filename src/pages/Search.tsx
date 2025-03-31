
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters";
import { Theme } from "@/utils/themes";

export default function Search() {
  const [filters, setFilters] = useState<FilterState>({});
  const location = useLocation();
  const { hotels, loading, error } = useHotels();
  
  // Initialize the active filters state for FilterSidebar
  const [activeFilters, setActiveFilters] = useState({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
    propertyType: null,
    propertyStyle: null,
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    meals: [],
    lengthOfStay: null,
    activities: [],
    location: null,
    category: null
  });

  // Handler for single value filters
  const handleFilterChange = (filterType: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    // You can add logic here to filter hotels based on the new filters
  };

  // Handler for array-based filters (checkboxes)
  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    setActiveFilters(prev => {
      const currentArray = prev[filterType as keyof typeof prev] as string[] || [];
      return {
        ...prev,
        [filterType]: isChecked 
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value)
      };
    });
    // You can add logic here to filter hotels based on the new filters
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // Process search parameters here if needed
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-16 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <FilterSidebar 
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              handleArrayFilterChange={handleArrayFilterChange}
            />
          </div>
          <div className="w-full md:w-3/4">
            <SearchResultsList 
              filteredHotels={hotels || []}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
