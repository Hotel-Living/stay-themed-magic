import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HotelCard } from "@/components/HotelCard";
import { Search, Filter, SortAsc } from "lucide-react";
import { useSmartSearch } from "@/hooks/useSmartSearch";
import { useSmartToast } from "@/hooks/useSmartToast";
import { NoResultsFallback } from "./NoResultsFallback";
import { SearchSuggestions } from "./SearchSuggestions";

interface Hotel {
  id: string;
  name: string;
  location: string;
  city?: string;
  country?: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
  category?: number;
  hotel_images?: Array<{ image_url: string, is_main?: boolean }>;
  themes?: Array<{ id: string; name: string }>;
  availableMonths?: string[];
  rates?: Record<string, number>;
  hotel_themes?: Array<{ themes?: { name: string } }>;
  hotel_activities?: Array<{ activities?: { name: string } }>;
  meal_plans?: string[];
}

interface SearchResultsProps {
  hotels: Hotel[];
  loading: boolean;
  error: Error | null;
}

export function SearchResultsEnhanced({ hotels, loading, error }: SearchResultsProps) {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Smart search enhancements
  const { addRecentSearch, getNoResultsFallback } = useSmartSearch();
  const { showLoadingError } = useSmartToast();

  // Add to recent searches when results are loaded
  useEffect(() => {
    if (hotels && hotels.length > 0 && !loading) {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.toString();
      if (query) {
        addRecentSearch(query, hotels.length);
      }
    }
  }, [hotels, loading, addRecentSearch]);

  // Enhanced loading state with skeleton cards
  const LoadingSkeleton = () => (
    <div className="space-y-6 px-2">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-white/10 rounded-lg w-32 animate-pulse"></div>
        <div className="h-10 bg-white/10 rounded-lg w-24 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl p-4 space-y-4 animate-pulse" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="h-48 bg-white/10 rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-6 bg-white/10 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Sort hotels
  const sortedHotels = React.useMemo(() => {
    if (!hotels) return [];
    
    return [...hotels].sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price_per_month - b.price_per_month;
        case 'price-desc':
          return b.price_per_month - a.price_per_month;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [hotels, sortOrder]);

  console.log("🔍 SearchResults component - received hotels:", hotels?.length || 0);
  console.log("🔍 SearchResults - hotels data:", hotels);
  console.log("🔍 SearchResults - loading:", loading);
  console.log("🔍 SearchResults - error:", error);

  // Handle error toast at the top level (BEFORE any conditional returns)
  useEffect(() => {
    if (error) {
      showLoadingError("hotels");
    }
  }, [error, showLoadingError]);

  if (loading) {
    console.log("⏳ SearchResults - showing enhanced loading state");
    return <LoadingSkeleton />;
  }

  if (error) {
    console.error("❌ SearchResults - showing error state:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center space-y-4 transform transition-all duration-500 hover:scale-105">
          <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-red-400" />
          </div>
          <div className="text-red-400 font-semibold">Error loading hotels</div>
          <div className="text-red-300 text-sm">{errorMessage}</div>
        </div>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    console.warn("⚠️ SearchResults - NO HOTELS TO DISPLAY");
    console.log("⚠️ SearchResults - hotels array:", hotels);
    console.log("⚠️ SearchResults - is hotels null/undefined?", hotels === null || hotels === undefined);
    console.log("⚠️ SearchResults - hotels.length:", hotels?.length);
    console.log("⚠️ SearchResults - loading state:", loading);
    console.log("⚠️ SearchResults - error state:", error);
    
    // Get smart fallback suggestions
    const urlParams = new URLSearchParams(window.location.search);
    const currentQuery = urlParams.toString() || 'current search';
    const suggestions = getNoResultsFallback(currentQuery);
    
    const handleSuggestionClick = (suggestion: string) => {
      window.location.reload(); // Simple reload for fallback suggestions
    };
    
    const handleClearSearch = () => {
      window.location.href = '/search'; // Clear all parameters
    };
    
    return (
      <NoResultsFallback 
        searchQuery={currentQuery}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
        onClearSearch={handleClearSearch}
      />
    );
  }

  const handleHotelClick = (hotelId: string) => {
    console.log("🏨 Navigating to hotel:", hotelId);
    navigate(`/hotel/${hotelId}`);
  };

  console.log("✅ SearchResults - rendering", hotels.length, "hotels");

  return (
    <div className="space-y-6 px-2">
      {/* Enhanced header with results count and sort controls */}
      <div className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <div className="text-white text-lg font-semibold flex items-center gap-3">
          <div className="w-8 h-8 bg-fuchsia-500/20 rounded-lg flex items-center justify-center">
            <Search className="w-4 h-4 text-fuchsia-400" />
          </div>
          <span className="transform transition-all duration-300 hover:tracking-wide">
            {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} found
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-white/60" />
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-3 py-1 text-sm hover:bg-white/20 transition-all duration-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Enhanced grid with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {(() => {
          console.log("🎯 About to render hotels, sortedHotels:", sortedHotels);
          console.log("🎯 sortedHotels.length:", sortedHotels.length);
          return sortedHotels.map((hotel, index) => {
          // Extract city and country from location if they don't exist separately
          const locationParts = hotel.location?.split(', ') || [];
          const city = hotel.city || locationParts[0] || '';
          const country = hotel.country || locationParts[1] || '';
          
          // Get main image
          const mainImage = hotel.hotel_images?.find(img => img.is_main)?.image_url || 
                           hotel.hotel_images?.[0]?.image_url || 
                           hotel.thumbnail || 
                           "/placeholder.svg";

          // Convert themes format
          const themes = hotel.hotel_themes?.map(ht => ({
            id: ht.themes?.name || '',
            name: ht.themes?.name || ''
          })) || hotel.themes || [];

          console.log("🏨 Rendering hotel card for:", hotel.name);

          return (
            <div
              key={hotel.id}
              className="animate-fade-in hover:scale-[1.02] hover:shadow-2xl hover:shadow-fuchsia-500/20 group cursor-pointer"
              style={{ 
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="relative overflow-hidden rounded-xl">
                {/* Subtle hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-fuchsia-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 transition-all duration-500 z-10 pointer-events-none"></div>
                
                <HotelCard
                  id={hotel.id}
                  name={hotel.name}
                  city={city}
                  country={country}
                  stars={hotel.category || 0}
                  pricePerMonth={hotel.price_per_month}
                  themes={themes}
                  image={mainImage}
                  availableMonths={hotel.availableMonths}
                  rates={hotel.rates}
                  hotel_themes={hotel.hotel_themes}
                  hotel_activities={hotel.hotel_activities}
                  meal_plans={hotel.meal_plans}
                  location={hotel.location}
                  thumbnail={hotel.thumbnail}
                  onClick={() => handleHotelClick(hotel.id)}
                />
              </div>
            </div>
          );
        });
        })()}
      </div>

      {/* Floating action hint */}
      {hotels.length > 6 && (
        <div className="fixed bottom-8 right-8 bg-fuchsia-600 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-fuchsia-400/30 animate-bounce z-50">
          <span className="text-sm font-medium">Scroll for more</span>
        </div>
      )}
    </div>
  );
}