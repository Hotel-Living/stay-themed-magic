
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters/FilterTypes";
import { Theme } from "@/utils/themes";

export default function Search() {
  const location = useLocation();
  const { hotels, loading, error, filters, updateFilters } = useHotels();
  
  const [activeFilters, setActiveFilters] = useState<{
    country: string | null;
    month: string | null;
    theme: Theme | null;
    priceRange: number | null;
    propertyType: string | null;
    propertyStyle: string | null;
    roomTypes: string[];
    hotelFeatures: string[];
    roomFeatures: string[];
    meals: string[];
    lengthOfStay: string | null;
    activities: string[];
    location: string | null;
    category: string | null;
  }>({
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // Process search params and update filters as needed
  }, [location.search]);

  const handleFilterChange = (filterType: string, value: any) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
    // Update the filters in useHotels hook if needed
  };

  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterType as keyof typeof prev] as string[] || [];
      if (isChecked) {
        return { ...prev, [filterType]: [...currentValues, value] };
      } else {
        return { ...prev, [filterType]: currentValues.filter(v => v !== value) };
      }
    });
    // Update the filters in useHotels hook if needed
  };

  // Filter hotels based on activeFilters
  const filteredHotels = hotels || [];

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
              filteredHotels={filteredHotels}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
