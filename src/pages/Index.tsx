
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterState } from "@/components/FilterSection";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterSectionWrapper } from "@/components/home/FilterSectionWrapper";
import { useHotels } from "@/hooks/useHotels";
import { useThemes } from "@/hooks/useThemes";
import { Theme } from "@/integrations/supabase/types-custom";

export default function Index() {
  // Add a try-catch to prevent the app from crashing if the auth context isn't available
  let authData = { isLoading: true, user: null, profile: null };
  try {
    authData = useAuth();
  } catch (error) {
    console.error("Auth context not available:", error);
  }
  
  const { isLoading: isAuthLoading, user, profile } = authData;
  
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  // Fetch themes
  const { data: themes = [], isLoading: isThemesLoading } = useThemes();
  
  // Fetch hotels with filters
  const { data: hotels = [], isLoading: isHotelsLoading } = useHotels(filters, !isAuthLoading);
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Filter Section */}
        <FilterSectionWrapper 
          onFilterChange={handleFilterChange}
          availableThemes={themes.map((theme: Theme) => theme.name)}
        />
      </main>
      
      <Footer />
    </div>
  );
}
