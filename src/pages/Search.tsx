
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SearchLayout } from "@/components/search/SearchLayout";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchContent } from "@/components/search/SearchContent";
import { useHotels, PaginationOptions, SortOption } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters/FilterTypes";

export default function Search() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Parse initial filters from URL params, ensuring they match the expected types
  const initialFilters: FilterState = {
    country: (searchParams.get("country") as FilterState["country"]) || null,
    month: (searchParams.get("month") as FilterState["month"]) || null,
    theme: null,
    priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null
  };
  
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [pagination, setPagination] = useState<PaginationOptions>({ page: 1, limit: 10 });
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'price_per_month', direction: 'asc' });
  
  // Use our enhanced useHotels hook
  const { data: hotels = [], isLoading, error } = useHotels(
    filters, 
    true, 
    pagination, 
    sortOption
  );
  
  const handleFilterChange = (filterType: string, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  const handleArrayFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    const currentArray = Array.isArray(filters[filterType as keyof FilterState]) 
      ? [...(filters[filterType as keyof FilterState] as string[])]
      : [];
    
    if (isChecked) {
      if (!currentArray.includes(value)) {
        currentArray.push(value);
      }
    } else {
      const index = currentArray.indexOf(value);
      if (index !== -1) {
        currentArray.splice(index, 1);
      }
    }
    
    handleFilterChange(filterType, currentArray);
  };
  
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortOption({ field, direction });
  };
  
  const handleClearFilters = () => {
    setFilters(initialFilters);
  };
  
  // Reset filters and pagination when URL changes
  useEffect(() => {
    // Parse params ensuring they match the expected types
    const newFilters: FilterState = {
      country: (searchParams.get("country") as FilterState["country"]) || null,
      month: (searchParams.get("month") as FilterState["month"]) || null,
      theme: null,
      priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null
    };
    
    setFilters(newFilters);
    setPagination({ page: 1, limit: 10 });
  }, [location.search, searchParams]);
  
  return (
    <SearchLayout>
      <h1 className="text-2xl font-bold mb-6 text-white">Search Results</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="sticky top-20">
            <FilterSidebar 
              activeFilters={{
                ...filters,
                propertyType: null,
                propertyStyle: null,
                roomTypes: [],
                hotelFeatures: [],
                roomFeatures: [],
                meals: [],
                lengthOfStay: null,
                activities: [],
                location: null,
                category: null
              }}
              handleFilterChange={handleFilterChange}
              handleArrayFilterChange={handleArrayFilterChange}
            />
          </div>
        </div>
        
        {/* Search Results Content */}
        <SearchContent 
          hotels={hotels}
          isLoading={isLoading}
          error={error}
          pagination={pagination}
          onSortChange={handleSortChange}
          onPageChange={handlePageChange}
          onClearFilters={handleClearFilters}
        />
      </div>
    </SearchLayout>
  );
}
