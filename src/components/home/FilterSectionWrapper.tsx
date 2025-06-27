import { useState } from 'react';
import { FilterSection, FilterState } from '@/components/filters';
import { useThemesWithTranslations } from '@/hooks/useThemesWithTranslations';
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
  availableThemes = ["Art", "Business", "Culture", "Education", "Entertainment", "Food and Drinks", "Health and Wellness", "History", "Hobbies", "Languages", "Lifestyle", "Nature", "Personal Development", "Relationships", "Science and Technology", "Social Impact", "Sports"]
}: FilterSectionWrapperProps) {
  const { data: themes } = useThemesWithTranslations();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null,
    location: null,
    propertyType: null
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    onFilterChange(newFilters);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (activeFilters.country) params.append("country", activeFilters.country);
    if (activeFilters.month) params.append("month", activeFilters.month);
    if (activeFilters.theme?.id) params.append("theme", activeFilters.theme.id);
    if (typeof activeFilters.priceRange === 'number') params.append("price", activeFilters.priceRange.toString());
    if (activeFilters.location) params.append("location", activeFilters.location);
    if (activeFilters.propertyType) params.append("propertyType", activeFilters.propertyType);
    
    console.log("Search with filters:", activeFilters);
    navigate(`/search?${params.toString()}`);
  };

  const getPlaceholders = () => {
    if (language === 'es') {
      return {
        month: "¿" + t('filters.month').toUpperCase() + "?",
        country: "¿" + t('filters.country').toUpperCase() + "?",
        theme: "¿" + t('filters.affinity').toUpperCase() + "?",
        priceRange: "¿" + t('filters.pricePerMonth') + "?"
      };
    }
    return {
      month: t('filters.month').toUpperCase() + "?",
      country: t('filters.country').toUpperCase() + "?",
      theme: t('filters.affinity').toUpperCase() + "?",
      priceRange: t('filters.pricePerMonth') + "?"
    };
  };

  return <section className="py-0 px-2 mb-20 mt-4 w-full">
      <div className="container max-w-3xl mx-auto">
        <div style={{
        backgroundColor: "#996515"
      }} className="rounded-lg p-1 shadow-lg border-3 border-fuchsia-400/80 bg-[#ffc30b]">
          <FilterSection onFilterChange={handleFilterChange} showSearchButton={false} placeholders={getPlaceholders()} useCollapsibleThemes={false} expandedLayout={true} compactSpacing={true} useBoldLabels={true} usePurpleFilterBackground={true} availableThemes={themes ? themes.map(theme => theme.name) : availableThemes} verticalLayout={isMobile} useLargerMobileText={isMobile} textColor="white" labelTextSize="text-xs" filterBgColor="bg-[#FFFFFF]" />
          
          <div className="flex justify-center" style={{
          backgroundColor: "#996515"
        }}>
            <Button size="sm" onClick={handleSearch} style={{
            backgroundColor: "#996515"
          }} className="text-white w-full max-w-6xl flex items-center justify-center py-0.5 font-bold border-t-2 border-fuchsia-400/70 bg-[#996515]">
              <Search className="w-4 h-4 mr-2" />
              <span className={`${isMobile ? "text-lg" : "text-base"} text-white`}>{t('home.filters.search')}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>;
}
