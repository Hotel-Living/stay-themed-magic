import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SecondFilterSidebar } from "@/components/search/SecondFilterSidebar";
import { NewSecondaryFilter } from "@/components/search/NewSecondaryFilter";
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

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = {
      ...activeFilters,
      [key]: value
    };
    setActiveFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, isSelected: boolean) => {
    const currentArray = activeFilters[key] as string[] || [];
    let newArray: string[];
    
    if (isSelected) {
      newArray = [...currentArray, value];
    } else {
      newArray = currentArray.filter(item => item !== value);
    }
    
    const newFilters = {
      ...activeFilters,
      [key]: newArray
    };
    setActiveFilters(newFilters);
    updateFilters(newFilters);
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
            {/* Filter Sidebar - Contains both filter components vertically stacked */}
            <div className="lg:col-span-1 space-y-4">
              {/* Original Filter Sidebar (unchanged) */}
              <SecondFilterSidebar 
                activeFilters={activeFilters} 
                handleFilterChange={handleFilterChange} 
                handleArrayFilterChange={handleArrayFilterChange} 
                onResetAllFilters={onResetAllFilters} 
              />
              
              {/* New Secondary Filter (added below) */}
              <NewSecondaryFilter
                activeFilters={activeFilters} 
                handleFilterChange={handleFilterChange} 
                handleArrayFilterChange={handleArrayFilterChange} 
                onResetAllFilters={onResetAllFilters}
              />
            </div>
            
            {/* Search Results - Takes up more space for 3 hotels per row */}
            <div className="lg:col-span-4">
              <SearchResults hotels={hotels} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
