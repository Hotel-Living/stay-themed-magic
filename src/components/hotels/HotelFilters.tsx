
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import HotelFiltersEN from "./HotelFilters.en"; // Fixed: default import
import HotelFiltersES from "./HotelFilters.es"; // Fixed: default import
import HotelFiltersPT from "./HotelFilters.pt"; // Fixed: default import
import HotelFiltersRO from "./HotelFilters.ro"; // Fixed: default import
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters/FilterTypes";
import { createDefaultFilters } from "@/utils/filterUtils";

export default function HotelFilters() {
  const { language } = useTranslation();
  const [filters, setFilters] = React.useState<FilterState>(createDefaultFilters());
  
  const { updateFilters } = useHotels({
    initialFilters: filters
  });

  const handleFiltersChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    updateFilters(updatedFilters);
  };

  // Apply dark purple background styling
  const containerClasses = "bg-gradient-to-b from-[#460F54] to-[#300A38] rounded-xl border border-fuchsia-400/20 p-4 backdrop-blur-sm";

  return (
    <div className={containerClasses}>
      {language === 'en' && <HotelFiltersEN filters={filters} onFiltersChange={handleFiltersChange} />}
      {language === 'es' && <HotelFiltersES filters={filters} onFiltersChange={handleFiltersChange} />}
      {language === 'pt' && <HotelFiltersPT filters={filters} onFiltersChange={handleFiltersChange} />}
      {language === 'ro' && <HotelFiltersRO filters={filters} onFiltersChange={handleFiltersChange} />}
      {!['en', 'es', 'pt', 'ro'].includes(language) && <HotelFiltersEN filters={filters} onFiltersChange={handleFiltersChange} />}
    </div>
  );
}
