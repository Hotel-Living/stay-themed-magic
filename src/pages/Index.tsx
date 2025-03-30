import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FilterState } from '@/components/filters';
import { FilterSectionWrapper } from '@/components/home/FilterSectionWrapper';
import { FeaturedHotelsSection } from '@/components/home/FeaturedHotelsSection';

export default function Index() {
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    amenities: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <FilterSectionWrapper onFilterChange={handleFilterChange} />
        <FeaturedHotelsSection filters={filters} />
      </main>
      
      <Footer />
    
  );
}
