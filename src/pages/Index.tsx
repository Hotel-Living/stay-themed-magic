
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterState } from '@/components/filters';
import { FilterSectionWrapper } from '@/components/home/FilterSectionWrapper';
import { FeaturedHotelsSection } from '@/components/home/FeaturedHotelsSection';
import { useThemes } from '@/hooks/useThemes';

export default function Index() {
  const { data: themes } = useThemes();
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    amenities: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Extract theme names for the filter dropdown
  const themeNames = themes ? themes.map(theme => theme.name) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <FilterSectionWrapper onFilterChange={handleFilterChange} availableThemes={themeNames} />
        <FeaturedHotelsSection filters={filters} />
      </main>
      
      <Footer />
    </div>
  );
}
