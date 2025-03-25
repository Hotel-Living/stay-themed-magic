
import { HotelCard } from "@/components/HotelCard";
import { Compass } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CompareButton } from "@/components/comparison/CompareButton";

interface SearchResultsListProps {
  filteredHotels: any[];
  isLoading?: boolean;
}

export function SearchResultsList({ filteredHotels, isLoading = false }: SearchResultsListProps) {
  if (isLoading) {
    return (
      <>
        <h2 className="text-lg font-bold mb-6 text-white">
          <Skeleton className="h-6 w-36 bg-white/10" />
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <HotelCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }
  
  return (
    <>
      <h2 className="text-lg font-bold mb-6 text-white">
        {filteredHotels.length > 0 
          ? `Found ${filteredHotels.length} hotels` 
          : "No hotels match your filters"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => {
          // Extract the main image
          const mainImage = hotel.hotel_images?.find((img: any) => img.is_main)?.image_url || 
                         hotel.hotel_images?.[0]?.image_url || 
                         hotel.main_image_url ||
                         '/placeholder.svg';
          
          // Extract the themes
          const hotelThemes = hotel.hotel_themes?.map((ht: any) => ht.themes?.name).filter(Boolean) || [];
          
          return (
            <div key={hotel.id} className="relative">
              <div className="absolute top-3 right-3 z-10">
                <CompareButton hotelId={hotel.id} hotelName={hotel.name} />
              </div>
              <HotelCard 
                id={hotel.id}
                name={hotel.name}
                city={hotel.city}
                country={hotel.country}
                stars={hotel.category || 0}
                pricePerMonth={hotel.price_per_month}
                themes={hotelThemes}
                image={mainImage}
              />
            </div>
          );
        })}
      </div>
      
      {filteredHotels.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fuchsia-900/20 flex items-center justify-center">
            <Compass className="w-10 h-10 text-fuchsia-400" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">No matching hotels</h3>
          <p className="text-white/70 mb-6">Try adjusting your filters to find more options.</p>
        </div>
      )}
    </>
  );
}

export function HotelCardSkeleton() {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="h-48 bg-white/5">
        <Skeleton className="w-full h-full bg-white/10" />
      </div>
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-white/10" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 bg-white/10 rounded-full" />
          <Skeleton className="h-5 w-16 bg-white/10 rounded-full" />
        </div>
        <div className="flex justify-between pt-2">
          <Skeleton className="h-5 w-20 bg-white/10" />
          <Skeleton className="h-4 w-16 bg-white/10" />
        </div>
      </div>
    </div>
  );
}
