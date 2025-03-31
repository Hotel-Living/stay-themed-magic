
import { HotelCard } from "@/components/HotelCard";
import { Compass } from "lucide-react";
import { Hotel } from "@/utils/hotels";

export interface SearchResultsListProps {
  filteredHotels: Hotel[] | any[];
  loading?: boolean;
}

export function SearchResultsList({ filteredHotels, loading }: SearchResultsListProps) {
  return (
    <>
      <h2 className="text-lg font-bold mb-6 text-white">
        {loading ? "Loading hotels..." : 
          filteredHotels.length > 0 
            ? `Found ${filteredHotels.length} hotels` 
            : "No hotels match your filters"}
      </h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-72 bg-fuchsia-900/20 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => {
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
                stars={hotel.category || 0} // Use category as stars
                pricePerMonth={hotel.price_per_month}
                themes={safeThemes}
                image={hotel.main_image_url || (hotel.hotel_images && hotel.hotel_images.length > 0 ? hotel.hotel_images[0].image_url : '')}
                availableMonths={hotel.available_months || []}
              />
            );
          })}
        </div>
      )}
      
      {!loading && filteredHotels.length === 0 && (
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
