
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterState } from "@/components/FilterSection";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterSectionWrapper } from "@/components/home/FilterSectionWrapper";
import { useHotels } from "@/hooks/useHotels";
import { useThemes } from "@/hooks/useThemes";
import { Theme } from "@/utils/themes"; // Updated import for Theme type
import { themeCategories } from "@/utils/themes"; // Updated import for theme data

export default function Index() {
  // Use try-catch to avoid issues with auth context on initial load
  let userData = { user: null, profile: null, isLoading: false };
  
  try {
    // We're purposely NOT importing useAuth here to prevent redirection loops on the home page
    // This page should be accessible to everyone without forced redirects
  } catch (error) {
    console.error("Auth context not available:", error);
  }
  
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  // Fetch themes
  const { data: themes = [], isLoading: isThemesLoading } = useThemes();
  
  // Fetch hotels with filters
  const { data: hotels = [], isLoading: isHotelsLoading } = useHotels(filters, true);
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  // Create a list of all theme names from the themeCategories
  const allThemeNames = themeCategories.flatMap(category => 
    category.themes.map(theme => theme.name)
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Filter Section */}
        <FilterSectionWrapper 
          onFilterChange={handleFilterChange}
          availableThemes={allThemeNames}
        />
      </main>
      
      <Footer />
    </div>
  );
}
