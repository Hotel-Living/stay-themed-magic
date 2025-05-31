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
import { HotelStarfield } from "@/components/hotels/HotelStarfield";

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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      ...activeFilters
    };
    let filtersChanged = false;
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
      const themeId = searchParams.get('theme');
      newFilters.theme = {
        id: themeId || '',
        name: themeId || ''
      } as Theme;
      filtersChanged = true;
    }
    if (filtersChanged) {
      setActiveFilters(newFilters);
      updateFilters(newFilters);
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

  const handleFilterChange = (filterType: string, value: any) => {
    console.log("Search page - Filter change:", filterType, value);
    
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    updateFilters({
      [filterType]: value
    });
  };

  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    console.log("Search page - Array filter change:", filterType, value, isChecked);
    
    setActiveFilters(prev => {
      const currentValues = prev[filterType as keyof typeof prev] as string[] || [];
      const newValues = isChecked ? [...currentValues, value] : currentValues.filter(v => v !== value);
      return {
        ...prev,
        [filterType]: newValues
      };
    });
    
    const currentValues = activeFilters[filterType as keyof typeof activeFilters] as string[] || [];
    const newValues = isChecked ? [...currentValues, value] : currentValues.filter(v => v !== value);
    
    updateFilters({
      [filterType]: newValues
    });
  };

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

  return <div className="min-h-screen flex flex-col">
      <HotelStarfield />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-16 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <FilterSidebar activeFilters={activeFilters} handleFilterChange={handleFilterChange} handleArrayFilterChange={handleArrayFilterChange} onResetAllFilters={handleResetAllFilters} />
          </div>
          <div className="w-full md:w-3/4">
            <div className="mb-4 p-4 backdrop-blur-sm bg-[#f0d7fc]/70 rounded-3xl">
              <h1 className="font-bold text-xl text-[#260341]" style={{
              color: '#860493'
            }}>
                Search Results
              </h1>
              <p className="text-muted-foreground" style={{
              color: '#860493'
            }}>
                Found {hotels?.length || 0} properties matching your criteria
              </p>
            </div>
            <SearchResultsList filteredHotels={hotels || []} isLoading={loading} error={error instanceof Error ? error : error ? new Error(String(error)) : null} />
          </div>
        </div>
      </main>
      <Footer />
    </div>;
}
