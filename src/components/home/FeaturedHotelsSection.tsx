
import { Hotel, Theme } from "@/integrations/supabase/types-custom";
import { HotelCard } from "@/components/HotelCard";

interface FeaturedHotelsSectionProps {
  hotels: any[];
  isLoading: boolean;
}

export function FeaturedHotelsSection({ hotels, isLoading }: FeaturedHotelsSectionProps) {
  return (
    <section className="py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Featured Hotels</h2>
        
        {isLoading ? (
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
              // Extract the main image
              const mainImage = hotel.hotel_images?.find((img: any) => img.is_main)?.image_url || 
                               hotel.hotel_images?.[0]?.image_url || 
                               '/placeholder.svg';
              
              // Extract the themes
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
  );
}
