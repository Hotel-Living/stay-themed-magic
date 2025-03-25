
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilterSection, FilterState } from "@/components/FilterSection";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Hotel, Theme } from "@/integrations/supabase/types-custom";
import { useQuery } from "@tanstack/react-query";
import { HotelCard } from "@/components/HotelCard";
import { useAuth } from "@/context/AuthContext";

// Función para obtener los hoteles filtrados
const fetchHotels = async (filters: FilterState) => {
  let query = supabase
    .from('hotels')
    .select(`
      *,
      hotel_images(image_url, is_main),
      hotel_themes(theme_id, themes:themes(id, name))
    `);
  
  // Aplicar filtros
  if (filters.country) {
    query = query.eq('country', filters.country);
  }
  
  // Agregar más filtros según sea necesario

  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

// Función para obtener los temas disponibles
const fetchThemes = async () => {
  const { data, error } = await supabase
    .from('themes')
    .select('*');
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

export default function Index() {
  const { isLoading: isAuthLoading, user, profile } = useAuth();
  const [filters, setFilters] = useState<FilterState>({
    country: null,
    month: null,
    theme: null,
    priceRange: null
  });
  
  const { data: themes = [], isLoading: isThemesLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes
  });
  
  const { data: hotels = [], isLoading: isHotelsLoading } = useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => fetchHotels(filters),
    enabled: !isAuthLoading
  });
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-8 text-white flex flex-col justify-center">
        {/* Hero Section with increased vertical spacing */}
        <section className="py-4 px-4 overflow-hidden">
          <div className="container relative z-10 max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight" 
                style={{
                  background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
                  backgroundSize: '200% 200%',
                  animation: 'text-shine 2s linear infinite',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
              The Future of Living
            </h1>
            
            <p className="text-xl md:text-3xl mb-10 max-w-5xl mx-auto tracking-tight font-bold"
               style={{
                 background: 'linear-gradient(-45deg, #B1900F, #F7F700)',
                 backgroundSize: '200% 200%',
                 animation: 'text-shine 2s linear infinite',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent'
               }}>
              Live in Hotels  -  Boost your Life
            </p>
            
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0.5 mb-2">
              <div className="space-y-0.5">
                {[
                  "Get rid of household chores", 
                  "Select hotels upon favourite themes"
                ].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left font-medium">{slogan}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-0.5">
                {[
                  "Boost your social life", 
                  "Find and enjoy your favorite people"
                ].map((slogan, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-[#B919B0] flex-shrink-0 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-left font-medium">{slogan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section with reduced vertical spacing */}
        <section className="py-0 px-4">
          <div className="container max-w-6xl mx-auto">
            <FilterSection 
              onFilterChange={handleFilterChange} 
              showSearchButton={true} 
              placeholders={{
                month: "Month?",
                country: "Country?",
                theme: "Theme?",
                priceRange: "Price per Month?"
              }}
              useCollapsibleThemes={true}
              expandedLayout={true}
              compactSpacing={true}
              useBoldLabels={true}
              usePurpleFilterBackground={true}
              availableThemes={themes.map((theme: Theme) => theme.name)}
            />
          </div>
        </section>
        
        {/* Hotels Section */}
        <section className="py-8 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Featured Hotels</h2>
            
            {isHotelsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-fuchsia-300">Loading hotels...</p>
              </div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No hotels found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel: any) => {
                  // Extrae la imagen principal
                  const mainImage = hotel.hotel_images?.find((img: any) => img.is_main)?.image_url || 
                                   hotel.hotel_images?.[0]?.image_url || 
                                   '/placeholder.svg';
                  
                  // Extrae los temas
                  const hotelThemes = hotel.hotel_themes?.map((ht: any) => ht.themes?.name).filter(Boolean) || [];
                  
                  return (
                    <HotelCard
                      key={hotel.id}
                      id={hotel.id}
                      name={hotel.name}
                      city={hotel.city}
                      country={hotel.country}
                      stars={hotel.category || 3}
                      pricePerMonth={hotel.price_per_month}
                      themes={hotelThemes}
                      image={mainImage}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
