
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Theme } from "@/integrations/supabase/types-custom";

interface FilterSectionWrapperProps {
  onFilterChange: (filters: FilterState) => void;
  availableThemes: string[];
}

export function FilterSectionWrapper({ onFilterChange, availableThemes }: FilterSectionWrapperProps) {
  return (
    <section className="py-0 px-4">
      <div className="container max-w-3xl mx-auto">
        <FilterSection 
          onFilterChange={onFilterChange} 
          showSearchButton={true} 
          placeholders={{
            month: "Month?",
            country: "Country?",
            theme: "Theme?",
            priceRange: "Price per Month?"
          }}
          useCollapsibleThemes={true}
          expandedLayout={false}
          verticalLayout={true}
          compactSpacing={true}
          useBoldLabels={true}
          usePurpleFilterBackground={true}
          availableThemes={availableThemes}
        />
      </div>
    </section>
  );
}
