
import { useState, useCallback, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterState } from "@/components/filters/FilterTypes";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterSectionWrapper } from "@/components/home/FilterSectionWrapper";
import { useThemes } from "@/hooks/useThemes";
import { Theme, allThemes } from "@/utils/data";
import { hasActiveFilters } from "@/hooks/hotels/filterUtils";
import { RecommendationsSection } from "@/components/recommendations/RecommendationsSection";
import { FeaturedHotelsSection } from "@/components/home/FeaturedHotelsSection";
import { useToast } from "@/hooks/use-toast";

// Default initial filters
const DEFAULT_FILTERS: FilterState = {
  country: null,
  month: null,
  theme: null,
  priceRange: null
};

export default function Index() {
  // Network status detection
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();
  
  // Safe auth usage with fallback for when auth is loading
  const { isLoading: isAuthLoading, user } = useAuth() || { isLoading: true, user: null };
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  
  // Fetch themes
  const { data: themes = [], isLoading: isThemesLoading } = useThemes();
  
  // Track app loading state
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Handle network status changes
  useEffect(() => {
    const handleNetworkChange = () => {
      const newOnlineStatus = navigator.onLine;
      
      // Only update and notify if status changed
      if (isOnline !== newOnlineStatus) {
        setIsOnline(newOnlineStatus);
        
        if (newOnlineStatus) {
          toast({
            title: "Connected",
            description: "Your network connection has been restored.",
            variant: "default"
          });
        } else {
          toast({
            title: "Offline Mode",
            description: "You're currently viewing Hotel Life in offline mode. Some features may be limited.",
            variant: "destructive"
          });
        }
      }
    };
    
    // Set initial state
    handleNetworkChange();
    
    // Listen for changes
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);
    
    // Set app as ready after a timeout to ensure rendering
    const readyTimer = setTimeout(() => {
      setAppIsReady(true);
    }, 800);
    
    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
      clearTimeout(readyTimer);
    };
  }, [isOnline, toast]);
  
  // Memoized callback to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);
  
  // Use fetched themes or fall back to imported allThemes
  const availableThemes = useMemo<Theme[]>(() => {
    return themes.length > 0 ? themes : allThemes;
  }, [themes]);
  
  // Determine if any filters are active
  const areFiltersActive = useMemo(() => {
    return hasActiveFilters(filters);
  }, [filters]);
  
  // Show a minimal loading state
  if (!appIsReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-t-2 border-fuchsia-500 animate-spin mx-auto mb-4"></div>
          <p>Loading Hotel Life...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Filter Section */}
        <FilterSectionWrapper 
          onFilterChange={handleFilterChange}
          availableThemes={availableThemes}
        />
        
        {/* Fallback notice for offline mode */}
        {!isOnline && (
          <div className="container max-w-6xl mx-auto px-4 py-2 mb-6">
            <div className="bg-amber-900/30 text-amber-200 rounded-lg px-4 py-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>You're currently viewing Hotel Life in offline mode. Some features may be limited.</p>
            </div>
          </div>
        )}
        
        {/* AI-Powered Recommendations Section - only shown when user is logged in */}
        {user && <RecommendationsSection />}
        
        {/* Featured Hotels Section with adapted data */}
        <FeaturedHotelsSection 
          hotels={[]}  
          isLoading={false}
          filtersActive={areFiltersActive}
        />
      </main>
      
      <Footer />
    </div>
  );
}
