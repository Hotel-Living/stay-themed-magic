
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters/FilterTypes";
import { Theme } from "@/utils/themes";
import { useToast } from "@/hooks/use-toast";

interface LocalFilterState {
  country: string | null;
  month: string | null;
  theme: Theme | null;
  priceRange: number | null;
  propertyType: string | null;
  propertyStyle: string | null;
  roomTypes: string[];
  hotelFeatures: string[];
  roomFeatures: string[];
  mealPlans: string[];
  lengthOfStay: string | null;
  activities: string[];
  location: string | null;
  category: string | null;
  atmosphere: string | null;
  stayLengths: number[];
}

export default function Search() {
  const location = useLocation();
  const {
    hotels,
    loading,
    error,
    filters,
    updateFilters
  } = useHotels();
  const { toast } = useToast();

  const [activeFilters, setActiveFilters] = useState<LocalFilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
    propertyType: null,
    propertyStyle: null,
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    mealPlans: [],
    lengthOfStay: null,
    activities: [],
    location: null,
    category: null,
    atmosphere: null,
    stayLengths: []
  });

  // Parse URL parameters when the page loads
  useEffect(() => {
    console.log("=== SEARCH PAGE DEBUG: URL Parameters ===");
    console.log("Search page mounted, parsing URL parameters...");
    const searchParams = new URLSearchParams(location.search);
    console.log("URL search params:", Object.fromEntries(searchParams.entries()));
    
    const newFilters: LocalFilterState = {
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      propertyType: null,
      propertyStyle: null,
      roomTypes: [],
      hotelFeatures: [],
      roomFeatures: [],
      mealPlans: [],
      lengthOfStay: null,
      activities: [],
      location: null,
      category: null,
      atmosphere: null,
      stayLengths: []
    };
    let filtersChanged = false;

    // Update filters based on URL parameters
    if (searchParams.has('country')) {
      newFilters.country = searchParams.get('country');
      filtersChanged = true;
      console.log("Found country filter from URL:", newFilters.country);
    }
    if (searchParams.has('month')) {
      newFilters.month = searchParams.get('month');
      filtersChanged = true;
      console.log("Found month filter from URL:", newFilters.month);
    }
    if (searchParams.has('price')) {
      newFilters.priceRange = Number(searchParams.get('price'));
      filtersChanged = true;
      console.log("Found price filter from URL:", newFilters.priceRange);
    }
    if (searchParams.has('location')) {
      newFilters.location = searchParams.get('location');
      filtersChanged = true;
      console.log("Found location filter from URL:", newFilters.location);
    }
    if (searchParams.has('propertyType')) {
      newFilters.propertyType = searchParams.get('propertyType');
      filtersChanged = true;
      console.log("Found propertyType filter from URL:", newFilters.propertyType);
    }
    if (searchParams.has('propertyStyle')) {
      newFilters.propertyStyle = searchParams.get('propertyStyle');
      filtersChanged = true;
      console.log("Found propertyStyle filter from URL:", newFilters.propertyStyle);
    }
    if (searchParams.has('atmosphere')) {
      newFilters.atmosphere = searchParams.get('atmosphere');
      filtersChanged = true;
      console.log("Found atmosphere filter from URL:", newFilters.atmosphere);
    }
    if (searchParams.has('theme')) {
      const themeId = searchParams.get('theme');
      newFilters.theme = {
        id: themeId || '',
        name: themeId || ''
      } as Theme;
      filtersChanged = true;
      console.log("Found theme filter from URL:", newFilters.theme);
    }
    
    console.log("=== SEARCH PAGE DEBUG: Filter Application ===");
    console.log("Parsed filters from URL:", newFilters);
    console.log("Filters changed:", filtersChanged);
    
    if (filtersChanged) {
      console.log("Applying filters from URL to component state:", newFilters);
      setActiveFilters(newFilters);

      // Create proper FilterState for useHotels hook
      const filterStateForHook: Partial<FilterState> = {
        country: newFilters.country,
        month: newFilters.month,
        theme: newFilters.theme,
        priceRange: newFilters.priceRange,
        location: newFilters.location,
        propertyType: newFilters.propertyType,
        propertyStyle: newFilters.propertyStyle,
        atmosphere: newFilters.atmosphere,
        mealPlans: newFilters.mealPlans,
        stayLengths: newFilters.stayLengths
      };
      
      console.log("Sending filter state to useHotels hook:", filterStateForHook);
      updateFilters(filterStateForHook);

      // Show a toast to inform user about applied filters
      let filterDescription = "Showing results";
      if (newFilters.country) filterDescription += ` in ${newFilters.country}`;
      if (newFilters.month) filterDescription += ` for ${newFilters.month}`;
      if (newFilters.theme) filterDescription += ` with theme "${newFilters.theme.name}"`;
      toast({
        title: "Filters Applied",
        description: filterDescription
      });
    } else {
      // No URL filters, but we should still initialize with empty filters to load all hotels
      console.log("No URL filters found, loading all hotels with empty filters");
      updateFilters({});
    }
  }, [location.search]);

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: any) => {
    console.log("=== SEARCH PAGE DEBUG: Filter Change ===");
    console.log("Filter change:", filterType, value);
    
    setActiveFilters(prev => {
      const updated: LocalFilterState = { ...prev };
      (updated as any)[filterType] = value;
      return updated;
    });

    // Create proper FilterState for the hook
    const filterUpdate: Partial<FilterState> = {};
    
    // Map local filter names to FilterState property names if needed
    if (filterType === 'lengthOfStay') {
      // Convert length of stay string to stayLengths array
      if (value) {
        const lengthMatch = value.match(/(\d+)/);
        if (lengthMatch) {
          filterUpdate.stayLengths = [parseInt(lengthMatch[1])];
        }
      } else {
        filterUpdate.stayLengths = [];
      }
    } else {
      (filterUpdate as any)[filterType] = value;
    }
    
    console.log("Sending filter update to useHotels:", filterUpdate);
    updateFilters(filterUpdate);
  };

  // Handle array filter changes (checkboxes)
  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    console.log("=== SEARCH PAGE DEBUG: Array Filter Change ===");
    console.log("Array filter change:", filterType, value, isChecked);
    
    setActiveFilters(prev => {
      const currentValues = (prev as any)[filterType] as string[] || [];
      const newValues = isChecked ? [...currentValues, value] : currentValues.filter(v => v !== value);
      const updated: LocalFilterState = { ...prev };
      (updated as any)[filterType] = newValues;
      return updated;
    });

    // Update the hook with proper property name
    const currentValues = (activeFilters as any)[filterType] as string[] || [];
    const newValues = isChecked ? [...currentValues, value] : currentValues.filter(v => v !== value);
    
    const filterUpdate: Partial<FilterState> = {};
    (filterUpdate as any)[filterType] = newValues;
    
    console.log("Sending array filter update to useHotels:", filterUpdate);
    updateFilters(filterUpdate);
  };

  // Reset all filters function
  const handleResetAllFilters = () => {
    console.log("=== SEARCH PAGE DEBUG: Reset Filters ===");
    console.log("Resetting all filters");
    
    const resetFilters: LocalFilterState = {
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      propertyType: null,
      propertyStyle: null,
      roomTypes: [],
      hotelFeatures: [],
      roomFeatures: [],
      mealPlans: [],
      lengthOfStay: null,
      activities: [],
      location: null,
      category: null,
      atmosphere: null,
      stayLengths: []
    };
    
    setActiveFilters(resetFilters);
    
    // Reset useHotels hook with empty filters to show all hotels
    console.log("Resetting useHotels filters to show all hotels");
    updateFilters({});
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared"
    });
  };

  // Add detailed logging for debugging
  useEffect(() => {
    console.log("=== SEARCH PAGE DEBUG: State Information ===");
    console.log("Hotels array:", hotels);
    console.log("Hotels count:", hotels?.length || 0);
    console.log("Loading state:", loading);
    console.log("Error state:", error);
    console.log("Current filters in useHotels:", filters);
    console.log("Active filters in component:", activeFilters);
    console.log("===============================");
    
    if (error) {
      console.error("Search page error:", error);
    }
  }, [error, hotels, loading, filters, activeFilters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-16 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <FilterSidebar 
              activeFilters={{
                ...activeFilters,
                meals: activeFilters.mealPlans // Map back to component's expected property name
              }} 
              handleFilterChange={handleFilterChange} 
              handleArrayFilterChange={handleArrayFilterChange} 
              onResetAllFilters={handleResetAllFilters} 
            />
          </div>
          <div className="w-full md:w-3/4">
            <div className="mb-4 p-4 backdrop-blur-sm bg-[#f0d7fc]/70 rounded-3xl">
              <h1 style={{ color: '#860493' }} className="font-bold text-xl text-[#260341]">Search Results</h1>
              <p className="text-muted-foreground" style={{ color: '#860493' }}>
                Found {hotels?.length || 0} properties matching your criteria
                {loading && " (Loading...)"}
                {error && " (Error loading results)"}
              </p>
            </div>
            
            <SearchResultsList 
              filteredHotels={hotels || []} 
              isLoading={loading} 
              error={error instanceof Error ? error : error ? new Error(String(error)) : null} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
