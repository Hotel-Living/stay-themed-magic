
import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterState } from "@/components/FilterSection";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterSectionWrapper } from "@/components/home/FilterSectionWrapper";
import { FeaturedHotelsSection } from "@/components/home/FeaturedHotelsSection";
import { useHotels } from "@/hooks/useHotels";
import { useThemes } from "@/hooks/useThemes";
import { Theme } from "@/integrations/supabase/types-custom";
import { Starfield } from "@/components/Starfield";

// Default initial filters
const DEFAULT_FILTERS: FilterState = {
  country: null,
  month: null,
  theme: null,
  priceRange: null
};

export default function Index() {
  const { isLoading: isAuthLoading, user, profile } = useAuth();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  
  // Fetch themes
  const { data: themes = [], isLoading: isThemesLoading } = useThemes();
  
  // Fetch hotels with filters
  const { data: hotels = [], isLoading: isHotelsLoading } = useHotels(filters, !isAuthLoading);
  
  // Memoized callback to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);
  
  // Extract theme names for the filter dropdown
  const themeNames = themes.map((theme: Theme) => theme.name);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-16 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Filter Section */}
        <FilterSectionWrapper 
          onFilterChange={handleFilterChange}
          availableThemes={themeNames}
        />
        
        {/* Hotels Section */}
        <FeaturedHotelsSection 
          hotels={hotels} 
          isLoading={isHotelsLoading} 
        />
      </main>
      
      <Footer />
    </div>
  );
}
