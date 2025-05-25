
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
  const { hotels, loading, error, filters, updateFilters } = useHotels();
  const { toast } = useToast();
  
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
    atmosphere: string | null;
    mealPlans: string[];
    stayLengths: number[];
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
    category: null,
    atmosphere: null,
    mealPlans: [],
    stayLengths: []
  });

  // Parse URL parameters when the page loads
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = { ...activeFilters };
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
    
    if (searchParams.has('theme')) {
      // Handle theme differently since it's an object
      const themeId = searchParams.get('theme');
      // This would need to be enhanced to fetch the actual theme object
      newFilters.theme = { id: themeId || '', name: themeId || '' } as Theme;
      filtersChanged = true;
    }
    
    if (filtersChanged) {
      setActiveFilters(newFilters);
      
      // Update the filters in the useHotels hook for real-time filtering
      updateFilters({
        country: newFilters.country,
        month: newFilters.month,
        theme: newFilters.theme,
        priceRange: newFilters.priceRange,
        location: newFilters.location,
        propertyType: newFilters.propertyType,
        propertyStyle: newFilters.propertyStyle
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

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: any) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
    
    // Real-time filtering: Update the filters in the useHotels hook
    updateFilters({ [filterType]: value });
  };

  // Handle array filter changes (checkboxes)
  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterType as keyof typeof prev] as string[] || [];
      const newValues = isChecked 
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
        
      return { ...prev, [filterType]: newValues };
    });
    
    // Real-time filtering: Update the useHotels hook with the new array values
    const currentValues = activeFilters[filterType as keyof typeof activeFilters] as string[] || [];
    const newValues = isChecked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
      
    updateFilters({ [filterType]: newValues });
  };

  // Reset all filters function
  const handleResetAllFilters = () => {
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
      meals: [],
      lengthOfStay: null,
      activities: [],
      location: null,
      category: null,
      atmosphere: null,
      mealPlans: [],
      stayLengths: []
    };
    
    setActiveFilters(resetFilters);
    updateFilters(resetFilters);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared"
    });
  };

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
              onResetAllFilters={handleResetAllFilters}
            />
          </div>
          <div className="w-full md:w-3/4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">Search Results</h1>
              <p className="text-muted-foreground">
                Found {hotels?.length || 0} properties matching your criteria
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
