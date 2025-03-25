
import { SearchLayout } from "@/components/search/SearchLayout";
import { SearchFiltersProvider } from "@/components/search/context/SearchFiltersContext";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";
import { Starfield } from "@/components/Starfield";

export default function Search() {
  return (
    <>
      <Starfield />
      <SearchFiltersProvider>
        <SearchLayout>
          <h1 className="text-2xl font-bold mb-6 text-white">Search Results</h1>
          
          <div className="flex flex-col md:flex-row gap-6">
            <SearchFilters />
            <SearchResults />
          </div>
        </SearchLayout>
      </SearchFiltersProvider>
    </>
  );
}
