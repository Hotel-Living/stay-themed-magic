
import { useState } from 'react';
import { FilterSection, FilterState } from '@/components/filters';
import { useThemes } from '@/hooks/useThemes';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes?: string[];
}

export function FilterSectionWrapper({
  onFilterChange
}: FilterSectionWrapperProps) {
  const {
    data: themes
  } = useThemes();

  // Extract theme category names for the main theme filter dropdown
  const themeCategories = [
    "Art", "Business", "Culture", "Education", "Entertainment", 
    "Food and Drinks", "Health and Wellness", "History", "Hobbies", 
    "Languages", "Lifestyle", "Nature", "Personal Development", 
    "Relationships", "Science and Technology", "Social Impact", "Sports"
  ];
  
  return <section className="py-0 px-2 mb-24 mt-8 w-full">
      <div className="container max-w-4xl mx-auto">
        <div className="rounded-lg p-1 bg-[#5F0368]">
          <FilterSection 
            onFilterChange={onFilterChange} 
            showSearchButton={false} 
            placeholders={{
              month: "Month?",
              country: "Country?",
              theme: "Theme?",
              priceRange: "Price per Month?"
            }} 
            useCollapsibleThemes={false} 
            expandedLayout={true} 
            compactSpacing={true} 
            useBoldLabels={true} 
            usePurpleFilterBackground={true} 
            availableThemes={themeCategories} 
          />
          
          <div className="flex justify-center mt-0 bg-[#5F0368]">
            <Button 
              size="sm" 
              className="text-white w-full max-w-6xl flex items-center justify-center py-1 bg-[#5F0368] hover:bg-[#460F54] font-bold"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>;
}
