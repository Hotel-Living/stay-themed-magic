
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterState } from '@/components/filters';
import { FilterSectionWrapper } from '@/components/home/FilterSectionWrapper';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';
import { HotelStarfield } from '@/components/hotels/HotelStarfield';

export default function Index() {
  const { data: themes } = useThemes();
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
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

  // Initialize useHotels hook to prepare for filtering
  const { updateFilters } = useHotels({ initialFilters: filters });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <HotelStarfield />
      <Navbar />
      
      <main className="flex-1 w-full">
        <HeroSection />
        <FilterSectionWrapper onFilterChange={handleFilterChange} />
      </main>
      
      <Footer />
    </div>
  );
}
