
import { useQuery } from '@tanstack/react-query';
import { HotelCard } from "@/components/HotelCard";
import { supabase } from "@/integrations/supabase/client";

export function FeaturedHotelsSection() {
  const { data: featuredHotels, isLoading } = useQuery({
    queryKey: ['featuredHotels'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hotels')
        .select('*, hotel_images(*), hotel_themes(theme_id, themes:themes(*))')
        .eq('is_featured', true)
        .limit(6);
        
      if (error) {
        console.error("Error fetching featured hotels:", error);
        throw error;
      }
      
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-72 bg-fuchsia-900/20 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!featuredHotels || featuredHotels.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8 text-center text-white">Featured Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredHotels.map(hotel => {
          // Ensure themes are properly handled - map only if theme exists and has a name
          const safeThemes = hotel.hotel_themes
            ? hotel.hotel_themes
                .filter((themeObj: any) => themeObj?.themes)
                .map((themeObj: any) => themeObj.themes)
            : [];
          
          return (
            <HotelCard 
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              city={hotel.city}
              country={hotel.country}
              stars={hotel.category || 0}
              pricePerMonth={hotel.price_per_month}
              themes={safeThemes}
              image={hotel.main_image_url || (hotel.hotel_images && hotel.hotel_images.length > 0 ? hotel.hotel_images[0].image_url : '')}
              availableMonths={hotel.available_months || []}
            />
          );
        })}
      </div>
    </div>
  );
}
