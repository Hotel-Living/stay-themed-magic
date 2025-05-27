
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

export default function Search() {
  const location = useLocation();
  const {
    hotels,
    loading,
    error,
    filters,
    updateFilters
  } = useHotels();
  const {
    toast
  } = useToast();

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
    mealPlans: string[]; // Changed from 'meals' to 'mealPlans'
    lengthOfStay: string | null;
    activities: string[];
    location: string | null;
    category: string | null;
    atmosphere: string | null;
    stayLengths: number[]; // Added missing stayLengths property
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
    mealPlans: [], // Changed from 'meals' to 'mealPlans'
    lengthOfStay: null,
    activities: [],
    location: null,
    category: null,
    atmosphere: null,
    stayLengths: [] // Added missing stayLengths property
  });

  // Parse URL parameters when the page loads
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      ...activeFilters
    };
    let filtersChanged = false;

    // Update filters based on URL parameters
    if (searchParams.has('country')) {
      newFilters.country = searchParams.get('country');
      filtersChanged = true;
    }
    if (searchParams.has('month')) {
      newFilters.month = searchParams.get('month');
      filtersChanged = true;
    }
    if (searchParams.has('price')) {
      newFilters.priceRange = Number(searchParams.get('price'));
      filtersChanged = true;
    }
    if (searchParams.has('location')) {
      newFilters.location = searchParams.get('location');
      filtersChanged = true;
    }
    if (searchParams.has('propertyType')) {
      newFilters.propertyType = searchParams.get('propertyType');
      filtersChanged = true;
    }
    if (searchParams.has('propertyStyle')) {
      newFilters.propertyStyle = searchParams.get('propertyStyle');
      filtersChanged = true;
    }
    if (searchParams.has('atmosphere')) {
      newFilters.atmosphere = searchParams.get('atmosphere');
      filtersChanged = true;
    }
    if (searchParams.has('theme')) {
      // Handle theme differently since it's an object
      const themeId = searchParams.get('theme');
      // This would need to be enhanced to fetch the actual theme object
      newFilters.theme = {
        id: themeId || '',
        name: themeId || ''
      } as Theme;
      filtersChanged = true;
    }
    
    if (filtersChanged) {
      console.log("Applying filters from URL:", newFilters);
      setActiveFilters(newFilters);

      // Update the filters in the useHotels hook for real-time filtering with standardized property names
      updateFilters({
        country: newFilters.country,
        month: newFilters.month,
        theme: newFilters.theme,
        priceRange: newFilters.priceRange,
        location: newFilters.location,
        propertyType: newFilters.propertyType,
        propertyStyle: newFilters.propertyStyle,
        atmosphere: newFilters.atmosphere,
        mealPlans: newFilters.mealPlans, // Use standardized property name
        stayLengths: newFilters.stayLengths // Use standardized property name
      });

      // Show a toast to inform user about applied filters
      let filterDescription = "Showing results";
      if (newFilters.country) filterDescription += ` in ${newFilters.country}`;
      if (newFilters.month) filterDescription += ` for ${newFilters.month}`;
      if (newFilters.theme) filterDescription += ` with theme "${newFilters.theme.name}"`;
      toast({
        title: "Filters Applied",
        description: filterDescription
      });
    }
  }, [location.search]);

  // Handle filter changes with standardized property names
  const handleFilterChange = (filterType: string, value: any) => {
    console.log("Filter change:", filterType, value);
    
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));

    // Map local filter names to FilterState property names
    const filterMapping: Record<string, string> = {
      'meals': 'mealPlans',
      'lengthOfStay': 'stayLengths'
    };
    
    const mappedFilterType = filterMapping[filterType] || filterType;

    // Real-time filtering: Update the filters in the useHotels hook
    updateFilters({
      [mappedFilterType]: value
    });
  };

  // Handle array filter changes (checkboxes) with proper mapping
  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    console.log("Array filter change:", filterType, value, isChecked);
    
    setActiveFilters(prev => {
      const currentValues = prev[filterType as keyof typeof prev] as string[] || [];
      const newValues = isChecked ? [...currentValues, value] : currentValues.filter(v => v !== value);
      return {
        ...prev,
        [filterType]: newValues
      };
    });

    // Map local filter names to FilterState property names for array filters
    const filterMapping: Record<string, string> = {
      'meals': 'mealPlans'
    };
    
    const mappedFilterType = filterMapping[filterType] || filterType;
    const currentValues = activeFilters[filterType as keyof typeof activeFilters] as string[] || [];
    const newValues = isChecked ? [...currentValues, value] : currentValues.filter(v => v !== value);
    
    updateFilters({
      [mappedFilterType]: newValues
    });
  };

  // Reset all filters function with standardized property names
  const handleResetAllFilters = () => {
    console.log("Resetting all filters");
    
    const resetFilters = {
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      propertyType: null,
      propertyStyle: null,
      roomTypes: [],
      hotelFeatures: [],
      roomFeatures: [],
      mealPlans: [], // Use standardized property name
      lengthOfStay: null,
      activities: [],
      location: null,
      category: null,
      atmosphere: null,
      stayLengths: [] // Use standardized property name
    };
    
    setActiveFilters(resetFilters);
    
    // Update useHotels hook with standardized filter state
    updateFilters({
      country: null,
      month: null,
      theme: null,
      priceRange: null,
      propertyType: null,
      propertyStyle: null,
      roomTypes: [],
      hotelFeatures: [],
      roomFeatures: [],
      mealPlans: [], // Use standardized property name
      activities: [],
      location: null,
      atmosphere: null,
      stayLengths: [] // Use standardized property name
    });
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared"
    });
  };

  // Add error logging to help debug issues
  useEffect(() => {
    if (error) {
      console.error("Search page error:", error);
    }
    console.log("Hotels loaded:", hotels?.length || 0);
    console.log("Loading state:", loading);
  }, [error, hotels, loading]);

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
              <h1 style={{
                color: '#860493'
              }} className="font-bold text-xl text-[#260341]">Search Results</h1>
              <p className="text-muted-foreground" style={{
                color: '#860493'
              }}>
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
