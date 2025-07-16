import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterState } from '@/components/filters';
import { FilterSectionWrapper } from '@/components/home/FilterSectionWrapper';
import { useThemes } from '@/hooks/useThemes';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';
import { IntroStarAnimation } from '@/components/intro/IntroStarAnimation';
import BubbleCounter from '@/components/common/BubbleCounter';
import { AvatarIntro } from '@/components/avatars/AvatarIntro';
import { RandomAvatarAssistant } from '@/components/avatars/RandomAvatarAssistant';

export default function Index() {
  const { data: themes } = useThemes();
  const [showIntro, setShowIntro] = useState(false); // Temporarily disabled
  const [showAvatarIntro, setShowAvatarIntro] = useState(false); // Disabled avatar animations per user request

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
    stayLengths: null,
    atmosphere: null
  });

  const handleFilterChange = (newFilters: FilterState) => {
    console.log("🔄 Index page filter change:", newFilters);
    setFilters(newFilters);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleAvatarIntroInteraction = () => {
    console.log("🎭 User interacted with avatars - hiding avatar intro");
    setShowAvatarIntro(false);
  };

  const themeNames = themes ? themes.map(theme => theme.name) : [];

  return (
    <div className="min-h-screen bg-background">
      <HotelStarfield />
      <Navbar />
      
      {showIntro && (
        <IntroStarAnimation onComplete={handleIntroComplete} />
      )}
      
      {showAvatarIntro && (
        <AvatarIntro onUserInteraction={handleAvatarIntroInteraction} />
      )}
      
      <HeroSection />
      
      <FilterSectionWrapper 
        onFilterChange={handleFilterChange}
        availableThemes={themeNames}
      />
      
      <BubbleCounter />
      <RandomAvatarAssistant />
      
      <Footer />
    </div>
  );
}
