
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResults } from "@/components/search/SearchResults";
import { Starfield } from "@/components/Starfield";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters/FilterTypes";
import { createDefaultFilters } from "@/utils/filterUtils";

export default function Search() {
  const [activeFilters, setActiveFilters] = useState<FilterState>(createDefaultFilters());
  const [filtersInitialized, setFiltersInitialized] = useState(false);
  
  const {
    hotels,
    loading,
    error,
    updateFilters
  } = useHotels({
    initialFilters: filtersInitialized ? activeFilters : undefined
  });
  
  // Parse URL parameters on component mount
  useEffect(() => {
    console.log('🔍 SEARCH PAGE: Parsing URL parameters');
    console.log('🌐 Current URL:', window.location.href);
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilters: Partial<FilterState> = {};
    
    // Extract filters from URL
    const country = urlParams.get('country');
    const month = urlParams.get('month');
    const theme = urlParams.get('theme');
    const price = urlParams.get('price');
    const location = urlParams.get('location');
    const propertyType = urlParams.get('propertyType');
    
    console.log('📥 URL Parameters found:');
    console.log(`   - country: ${country}`);
    console.log(`   - month: ${month}`);
    console.log(`   - theme: ${theme}`);
    console.log(`   - price: ${price}`);
    console.log(`   - location: ${location}`);
    console.log(`   - propertyType: ${propertyType}`);
    
    if (country) {
      urlFilters.country = country;
      console.log(`✅ Country filter will be applied: ${country}`);
    }
    if (month) {
      urlFilters.month = month;
      console.log(`✅ Month filter will be applied: ${month}`);
    }
    if (theme) {
      urlFilters.theme = { id: theme, name: theme, level: 1 };
      console.log(`✅ Theme filter will be applied: ${theme}`);
    }
    if (price) {
      const priceNum = parseInt(price);
      
      // Set proper min/max price based on the price range value
      let minPrice = 0;
      let maxPrice = priceNum;
      
      if (priceNum === 1000) {
        // "Up to $1,000"
        minPrice = 0;
        maxPrice = 1000;
      } else if (priceNum === 1500) {
        // "$1,000 - $1,500"
        minPrice = 1000;
        maxPrice = 1500;
      } else if (priceNum === 2000) {
        // "$1,500 - $2,000"
        minPrice = 1500;
        maxPrice = 2000;
      } else if (priceNum === 3000) {
        // "More than $2,000"
        minPrice = 2000;
        maxPrice = 999999;
      }
      
      urlFilters.minPrice = minPrice;
      urlFilters.maxPrice = maxPrice;
      urlFilters.priceRange = priceNum; // For UI display
      console.log(`✅ Price range filter will be applied: ${minPrice} - ${maxPrice}`);
    }
    if (location) {
      urlFilters.location = location;
      console.log(`✅ Location filter will be applied: ${location}`);
    }
    if (propertyType) {
      urlFilters.propertyType = propertyType;
      console.log(`✅ Property type filter will be applied: ${propertyType}`);
    }
    
    // Update filters if we have any from URL
    if (Object.keys(urlFilters).length > 0) {
      console.log("🔗 Applying URL filters:", urlFilters);
      const initialFilters = { ...createDefaultFilters(), ...urlFilters };
      console.log("🎯 Final filters being set:", initialFilters);
      
      // CRITICAL FIX: Set filters first, then mark as initialized to prevent race condition
      setActiveFilters(initialFilters);
      setFiltersInitialized(true);
      updateFilters(urlFilters); // Pass only the URL filters to avoid override
    } else {
      console.log("⚠️ No URL filters found - using default filters");
      setFiltersInitialized(true);
    }
  }, []); // Empty dependency array to run only once on mount

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
            {/* Filter Sidebar - All 14 filters */}
            <div className="lg:col-span-1 space-y-4">
              <FilterSidebar
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
