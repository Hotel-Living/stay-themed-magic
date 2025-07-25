
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterState } from '@/components/filters';
import { FilterSectionWrapper } from '@/components/home/FilterSectionWrapper';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';
import { IntroStarAnimation } from '@/components/intro/IntroStarAnimation';
import BubbleCounter from '@/components/common/BubbleCounter';
import { IndexPageAvatars } from '@/components/avatars/IndexPageAvatars';

export default function Index() {
  const { data: themes } = useThemes();
  const [showIntro, setShowIntro] = useState(false); // Temporarily disabled - was: useState(true)
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: { min: 0, max: 1000 },
    searchTerm: null,
    minPrice: 0,
    maxPrice: 1000,
    stars: [],
    location: null,
    propertyType: null,
    propertyStyle: null,
    activities: [],
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    mealPlans: [],
    stayLengths: null, // Single string, not array
    atmosphere: null
  });

  // Don't initialize useHotels hook here since we're just navigating to search
  // const { updateFilters } = useHotels({ initialFilters: filters });

  const handleFilterChange = (newFilters: FilterState) => {
    console.log("🔄 Index page filter change:", newFilters);
    setFilters(newFilters);
    // Note: We don't need to update any hotel results here since the Index page doesn't show results
    // The FilterSectionWrapper handles navigation to /search with proper parameters
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Extract theme names for the filter dropdown
  const themeNames = themes ? themes.map(theme => theme.name) : [];

  if (showIntro) {
    return <IntroStarAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <HotelStarfield />
      <Navbar />
      <BubbleCounter />
      
      <main className="flex-1 w-full">
        <HeroSection />
        <FilterSectionWrapper onFilterChange={handleFilterChange} availableThemes={themeNames} />
      </main>
      
      <Footer />
      
      {/* Dual Avatar Animation - Index Page Only */}
      <IndexPageAvatars />
      
    </div>
  );
}
