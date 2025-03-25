
import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { useHotels, PaginationOptions, SortOption } from "@/hooks/useHotels";
import { FilterState } from "@/components/FilterSection";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowUpDown, SortAsc, SortDesc } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

export default function Search() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const initialFilters: FilterState = {
    country: searchParams.get("country") || null,
    month: searchParams.get("month") || null,
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
    const currentValues = [...(filters[filterType as keyof typeof filters] as string[] || [])];
    
    if (isChecked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }
    
    handleFilterChange(filterType, currentValues);
  };
  
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortOption({ field, direction });
  };
  
  // Reset filters and pagination when URL changes
  useEffect(() => {
    const newFilters = {
      country: searchParams.get("country") || null,
      month: searchParams.get("month") || null,
      theme: null,
      priceRange: searchParams.get("price") ? Number(searchParams.get("price")) : null
    };
    
    setFilters(newFilters);
    setPagination({ page: 1, limit: 10 });
  }, [location.search, searchParams]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-8">
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
            
            {/* Results */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              {/* Sorting controls */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-white/70">
                      {isLoading ? (
                        <Skeleton className="h-4 w-24" />
                      ) : (
                        `Found ${hotels.length} hotels`
                      )}
                    </span>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-auto">
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        Sort by
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem onClick={() => handleSortChange('price_per_month', 'asc')}>
                        <SortAsc className="mr-2 h-4 w-4" />
                        Price (Low to High)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSortChange('price_per_month', 'desc')}>
                        <SortDesc className="mr-2 h-4 w-4" />
                        Price (High to Low)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSortChange('name', 'asc')}>
                        <SortAsc className="mr-2 h-4 w-4" />
                        Name (A-Z)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSortChange('name', 'desc')}>
                        <SortDesc className="mr-2 h-4 w-4" />
                        Name (Z-A)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSortChange('category', 'desc')}>
                        <SortDesc className="mr-2 h-4 w-4" />
                        Rating (High to Low)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Results list */}
              <SearchResultsList filteredHotels={hotels} isLoading={isLoading} />
              
              {/* Pagination */}
              {!isLoading && hotels.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <span className="text-sm text-white/70 px-2">
                      Page {pagination.page}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={hotels.length < pagination.limit}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Error state */}
              {error && (
                <div className="glass-card rounded-xl p-6 mt-4 text-center">
                  <p className="text-red-400">Error loading hotels. Please try again.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Refresh
                  </Button>
                </div>
              )}
              
              {/* Empty state */}
              {!isLoading && hotels.length === 0 && !error && (
                <div className="glass-card rounded-xl p-6 mt-4 text-center">
                  <p className="text-white/70">No hotels match your current filters.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4"
                    onClick={() => setFilters(initialFilters)}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
