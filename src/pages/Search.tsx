
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import FilterSidebar from "@/components/filters/FilterSidebar";
import { SearchResults } from "@/components/search/SearchResults";
import { Starfield } from "@/components/Starfield";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters/FilterTypes";
import { createDefaultFilters } from "@/utils/filterUtils";

export default function Search() {
  const [activeFilters, setActiveFilters] = useState<FilterState>(createDefaultFilters());
  
  const {
    hotels,
    loading,
    error,
    updateFilters
  } = useHotels({
    initialFilters: activeFilters
  });

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
    updateFilters(filters);
  };

  const onResetAllFilters = () => {
    const defaultFilters = createDefaultFilters();
    setActiveFilters(defaultFilters);
    updateFilters(defaultFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-0 py-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar 
                onFilterChange={handleFilterChange}
                showSearchButton={false}
              />
            </div>
            
            {/* Search Results */}
            <div className="lg:col-span-4">
              <SearchResults 
                hotels={hotels} 
                loading={loading} 
                error={error} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
