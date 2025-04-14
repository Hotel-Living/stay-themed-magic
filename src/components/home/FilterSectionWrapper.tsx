import { useState } from 'react';
import { FilterSection, FilterState } from '@/components/filters';
import { useThemes } from '@/hooks/useThemes';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes?: string[];
}

export function FilterSectionWrapper({
  onFilterChange,
  availableThemes = [
    "Art", "Business", "Culture", "Education", "Entertainment", 
    "Food and Drinks", "Health and Wellness", "History", "Hobbies", 
    "Languages", "Lifestyle", "Nature", "Personal Development", 
    "Relationships", "Science and Technology", "Social Impact", "Sports"
  ]
}: FilterSectionWrapperProps) {
  const { data: themes } = useThemes();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
    searchTerm: null,
    location: null,
    propertyType: null
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (activeFilters.country) params.append("country", activeFilters.country);
    if (activeFilters.month) params.append("month", activeFilters.month);
    if (activeFilters.theme && activeFilters.theme.id) params.append("theme", activeFilters.theme.id);
    if (typeof activeFilters.priceRange === 'number') params.append("price", activeFilters.priceRange.toString());
    if (activeFilters.location) params.append("location", activeFilters.location);
    if (activeFilters.propertyType) params.append("propertyType", activeFilters.propertyType);
    
    console.log("Search with filters:", activeFilters);
    
    navigate(`/search?${params.toString()}`);
  };
  
  return <section className="py-0 px-2 mb-20 mt-4 w-full">
      <div className="container max-w-3xl mx-auto">
        <div className="rounded-lg p-1 bg-[#7030A0] shadow-lg border-3 border-fuchsia-400/80">
          <FilterSection 
            onFilterChange={handleFilterChange} 
            showSearchButton={false} 
            placeholders={{
              month: "Month?",
              country: "Country?",
              theme: "Affinity?",
              priceRange: "Price per Month?"
            }} 
            useCollapsibleThemes={false} 
            expandedLayout={true} 
            compactSpacing={true} 
            useBoldLabels={true} 
            usePurpleFilterBackground={true} 
            availableThemes={themes ? themes.map(theme => theme.name) : availableThemes}
            verticalLayout={isMobile}
            useLargerMobileText={isMobile}
            textColor="#FFFFFF"
          />
          
          <div className="flex justify-center bg-[#7030A0]">
            <Button 
              size="sm" 
              className="text-white w-full max-w-6xl flex items-center justify-center py-0.5 bg-[#7030A0] hover:bg-[#5A1876] font-bold border-t-2 border-fuchsia-400/70"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="text-white">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}
