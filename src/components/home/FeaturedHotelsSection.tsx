
import { Skeleton } from "@/components/ui/skeleton";
import { HotelCard } from "@/components/HotelCard";
import { useLanguage } from "@/context/LanguageContext";

interface FeaturedHotelsSectionProps {
  hotels: any[];
  isLoading: boolean;
  filtersActive?: boolean;
}

export function FeaturedHotelsSection({ hotels, isLoading, filtersActive }: FeaturedHotelsSectionProps) {
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">{t("home.featured")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-5">
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-7 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-6 w-1/4 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{t("home.featured")}</h2>
        
        {hotels.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl p-8">
            <p className="text-muted-foreground mb-4">{t("home.nohotels")}</p>
            <p className="text-fuchsia-400">{t("home.tryagain")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel: any) => {
              // Extract the main image
              const mainImage = hotel.hotel_images?.find((img: any) => img.is_main)?.image_url || 
                              hotel.hotel_images?.[0]?.image_url || 
                              hotel.main_image_url || 
                              '/placeholder.svg';
              
              // Extract the themes
              const hotelThemes = hotel.hotel_themes?.map((ht: any) => ht.themes?.name).filter(Boolean) || [];
              
              // Get available months if they exist
              const availableMonths = hotel.available_months || [];
              
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
                  availableMonths={availableMonths}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
