
import { useState, useCallback, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterState } from "@/components/filters/FilterTypes";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterSectionWrapper } from "@/components/home/FilterSectionWrapper";
import { useThemes } from "@/hooks/useThemes";
import { Theme, allThemes } from "@/utils/data";
import { hasActiveFilters } from "@/hooks/hotels/filterUtils";
import { RecommendationsSection } from "@/components/recommendations/RecommendationsSection";

// Default initial filters
const DEFAULT_FILTERS: FilterState = {
  country: null,
  month: null,
  theme: null,
  priceRange: null
};

export default function Index() {
  // Safe auth usage with fallback for when auth is loading
  const { isLoading: isAuthLoading, user } = useAuth() || { isLoading: true, user: null };
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  
  // Fetch themes
  const { data: themes = [], isLoading: isThemesLoading } = useThemes();
  
  // Memoized callback to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);
  
  // Use fetched themes or fall back to imported allThemes
  const availableThemes = useMemo<Theme[]>(() => {
    return themes.length > 0 ? themes : allThemes;
  }, [themes]);
  
  // Determine if any filters are active
  const areFiltersActive = useMemo(() => {
    return hasActiveFilters(filters);
  }, [filters]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Filter Section */}
        <FilterSectionWrapper 
          onFilterChange={handleFilterChange}
          availableThemes={availableThemes}
        />
        
        {/* AI-Powered Recommendations Section - only shown when user is logged in */}
        {user && <RecommendationsSection />}
      </main>
      
      <Footer />
    </div>
  );
}
