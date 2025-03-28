
import { HotelCard } from "@/components/HotelCard";
import { Compass } from "lucide-react";
import { Hotel } from "@/utils/data";

interface SearchResultsListProps {
  filteredHotels: Hotel[];
}

export function SearchResultsList({ filteredHotels }: SearchResultsListProps) {
  return (
    <>
      <h2 className="text-lg font-bold mb-6 text-white">
        {filteredHotels.length > 0 
          ? `Found ${filteredHotels.length} hotels` 
          : "No hotels match your filters"}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(hotel => (
          <HotelCard 
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            city={hotel.city}
            country={hotel.country}
            stars={hotel.stars}
            pricePerMonth={hotel.pricePerMonth}
            themes={hotel.themes.map(theme => theme.name)}
            image={hotel.images[0]}
          />
        ))}
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
