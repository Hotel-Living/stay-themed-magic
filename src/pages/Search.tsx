import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { SearchResultsList } from "@/components/search/SearchResultsList";
import { useHotels } from "@/hooks/useHotels";

export default function Search() {
  const [filters, setFilters] = useState({});
  const location = useLocation();
  const { data: hotels, isLoading } = useHotels();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-16 pb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters}
            />
          </div>
          <div className="w-full md:w-3/4">
            <SearchResultsList 
              hotels={hotels || []} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
