
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterState } from '@/components/filters';
import { FilterSectionWrapper } from '@/components/home/FilterSectionWrapper';
import { useThemes } from '@/hooks/useThemes';
import { useHotels } from '@/hooks/useHotels';

export default function Index() {
  const { data: themes } = useThemes();
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    amenities: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
  });

  // Initialize useHotels hook to prepare for filtering
  const { updateFilters } = useHotels({ initialFilters: filters });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  // Extract theme names for the filter dropdown
  const themeNames = themes ? themes.map(theme => theme.name) : [];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Navbar />
      
      <main className="flex-1 w-full">
        <HeroSection />
        <FilterSectionWrapper onFilterChange={handleFilterChange} availableThemes={themeNames} />
      </main>
      
      <Footer />
    </div>
  );
}
