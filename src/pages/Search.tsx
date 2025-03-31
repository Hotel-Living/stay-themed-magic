
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { useHotels } from "@/hooks/useHotels";
import { FilterState } from "@/components/filters";

export default function Search() {
  const [filters, setFilters] = useState<FilterState>({});
  const location = useLocation();
  const { hotels, loading, error } = useHotels();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // Process search parameters here if needed
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-16 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <FilterSidebar />
          </div>
          <div className="w-full md:w-3/4">
            <SearchResultsList 
              results={hotels || []} 
              loading={loading} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
