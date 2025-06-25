import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { SearchFilters } from "@/components/search/SearchFilters";
import { HotelCard } from "@/components/search/HotelCard";
import { FilterSidebar } from "@/components/search/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Search() {
  const [hotels, setHotels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [0, 1000],
    country: [],
    mealPlans: [],
    roomTypes: [],
    hotelFeatures: [],
    roomFeatures: [],
    activities: [],
    stayLengths: []
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from('hotels')
        .select('*');
      
      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleArrayFilterChange = (filterType, value, isChecked) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: isChecked 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const resetFilters = () => {
    setActiveFilters({
      priceRange: [0, 1000],
      country: [],
      mealPlans: [],
      roomTypes: [],
      hotelFeatures: [],
      roomFeatures: [],
      activities: [],
      stayLengths: []
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-fuchsia-900 to-pink-900 relative overflow-hidden">
      <Starfield />
      <Navbar />
      
      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <SearchFilters />
            </div>
            
            <div className="w-full lg:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <div className="text-sm text-gray-400">
                    {hotels.length} properties found
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {hotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>

              {hotels.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No hotels found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full">
            <FilterSidebar
              onClose={() => setShowFilters(false)}
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              handleArrayFilterChange={handleArrayFilterChange}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}
