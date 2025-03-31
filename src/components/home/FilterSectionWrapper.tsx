
import { useState } from 'react';
import { FilterSection, FilterState } from '@/components/filters';
import { themeCategories } from '@/utils/themes'; // Updated import path
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simplified theme extraction from the theme categories
const extractAllThemes = () => {
  const allThemes: string[] = [];
  
  themeCategories.forEach(category => {
    if (category.themes) {
      category.themes.forEach(theme => {
        if (!theme.isAddOption) {
          allThemes.push(theme.name);
        }
      });
    }
  });
  
  return allThemes;
};

interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes?: string[];
}

export function FilterSectionWrapper({
  onFilterChange
}: FilterSectionWrapperProps) {
  const navigate = useNavigate();
  const allPropertyThemes = extractAllThemes();
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    amenities: [],
    priceRange: { min: 0, max: 1000 },
    rating: 0,
  });
  
  // Handle the search button click
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.country) params.append("country", filters.country);
    if (filters.month) params.append("month", filters.month);
    if (filters.theme) params.append("theme", filters.theme.id);
    if (typeof filters.priceRange === 'number') params.append("price", filters.priceRange.toString());
    
    navigate(`/search?${params.toString()}`);
  };
  
  return (
    <section className="py-0 px-4 mb-32 mt-12">
      <div className="container max-w-6xl mx-auto">
        <div className="rounded-lg p-2 bg-[#860493]">
          <FilterSection 
            onFilterChange={onFilterChange} 
            showSearchButton={false} 
            placeholders={{
              month: "Month?",
              country: "Country?",
              theme: "Theme?",
              priceRange: "Price per Month?"
            }} 
            expandedLayout={true} 
            compactSpacing={true} 
            useBoldLabels={true} 
            usePurpleFilterBackground={true} 
            availableThemes={allPropertyThemes}
            fullHeightDropdowns={true} // Added to ensure dropdowns are fully visible
          />
          
          <div className="flex justify-center mt-0">
            <Button 
              size="sm" 
              className="text-white w-full max-w-6xl flex items-center justify-center py-2 bg-[#860493]"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
