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

  // Extract theme names for the filter dropdown
  const themeNames = themes ? themes.map(theme => theme.name) : [];
  return <section className="py-0 px-4 mb-32 mt-12 w-full">
      <div className="container max-w-6xl mx-auto">
        <div className="rounded-lg p-2 bg-[#860493]">
          <FilterSection onFilterChange={onFilterChange} showSearchButton={false} placeholders={{
          month: "Month?",
          country: "Country?",
          theme: "Theme?",
          priceRange: "Price per Month?"
        }} useCollapsibleThemes={true} expandedLayout={true} compactSpacing={true} useBoldLabels={true} usePurpleFilterBackground={true} availableThemes={themeNames} />
          
          <div className="flex justify-center mt-0">
            <Button size="sm" className="text-white w-full max-w-6xl flex items-center justify-center py-2 bg-[#860493] font-bold">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>;
}