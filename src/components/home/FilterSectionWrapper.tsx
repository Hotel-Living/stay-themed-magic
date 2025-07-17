import { useState } from 'react';
import { FilterState } from '@/components/filters';
import { IndexPageFilters } from './IndexPageFilters';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes?: string[];
}
export function FilterSectionWrapper({
  onFilterChange,
  availableThemes = []
}: FilterSectionWrapperProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    t
  } = useTranslation('filters');
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
    searchTerm: null,
    location: null,
    propertyType: null,
    minPrice: 0,
    maxPrice: 1000,
    stars: [],
    propertyStyle: null,
    activities: [],
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    mealPlans: [],
    stayLengths: null,
    atmosphere: null
  });
  const handleIndividualFilterChange = (key: keyof FilterState, value: any) => {
    console.log(`🔄 FilterSectionWrapper: Individual filter change - ${key}:`, value);
    const updatedFilters = {
      ...activeFilters,
      [key]: value
    };
    console.log('📝 FilterSectionWrapper: Updated active filters', updatedFilters);
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };
  const handleSearch = () => {
    console.log('🚀 SEARCH INITIATED FROM INDEX PAGE');
    console.log('📋 Current active filters:', activeFilters);
    const params = new URLSearchParams();
    let hasFilters = false;
    if (activeFilters.country) {
      params.append("country", activeFilters.country);
      console.log(`🌍 Adding country to URL: ${activeFilters.country}`);
      hasFilters = true;
    }
    if (activeFilters.month) {
      params.append("month", activeFilters.month);
      console.log(`🗓️ Adding month to URL: ${activeFilters.month}`);
      hasFilters = true;
    }
    if (activeFilters.theme && activeFilters.theme.id) {
      params.append("theme", activeFilters.theme.id);
      console.log(`🎯 Adding theme to URL: ${activeFilters.theme.name} (ID: ${activeFilters.theme.id})`);
      hasFilters = true;
    }
    if (activeFilters.priceRange) {
      if (typeof activeFilters.priceRange === 'number') {
        params.append("price", activeFilters.priceRange.toString());
        console.log(`💰 Adding price to URL: ${activeFilters.priceRange}`);
        hasFilters = true;
      } else if (activeFilters.priceRange && typeof activeFilters.priceRange === 'object' && 'max' in activeFilters.priceRange) {
        const maxPrice = activeFilters.priceRange.max?.toString() || '';
        if (maxPrice) {
          params.append("price", maxPrice);
          console.log(`💰 Adding max price to URL: ${maxPrice}`);
          hasFilters = true;
        }
      }
    }
    if (activeFilters.location) {
      params.append("location", activeFilters.location);
      console.log(`📍 Adding location to URL: ${activeFilters.location}`);
      hasFilters = true;
    }
    if (activeFilters.propertyType) {
      params.append("propertyType", activeFilters.propertyType);
      console.log(`🏨 Adding property type to URL: ${activeFilters.propertyType}`);
      hasFilters = true;
    }

    // If no filters are selected, navigate to search page without parameters to show all hotels
    const finalUrl = hasFilters ? `/search?${params.toString()}` : '/search';
    console.log(`🔗 Navigating to: ${finalUrl}`);
    console.log("Search with filters:", activeFilters);
    console.log("Has filters:", hasFilters);
    navigate(finalUrl);
  };
  return <section className="py-0 px-2 mb-20 mt-4 w-full">
      <div className="container max-w-3xl mx-auto">
        <div style={{
        backgroundColor: "#996515"
      }} className="rounded-lg p-1 shadow-lg border-3 border-fuchsia-400/80 bg-[#ffc30b]">
          <IndexPageFilters activeFilters={activeFilters} onFilterChange={handleIndividualFilterChange} />
          
          <div className="flex justify-center" style={{
          backgroundColor: "#996515"
        }}>
            <Button size="sm" onClick={handleSearch} style={{
            backgroundColor: "#996515"
          }} className="text-white w-full max-w-6xl flex items-center justify-center font-bold border-t-2 border-fuchsia-400/70 bg-[#996515] py-0">
              <Search className="w-4 h-4 mr-2" />
              <span className={`${isMobile ? "text-lg" : "text-base"} text-white`}>{t('filters.search')}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}