
import { Check } from "lucide-react";

interface HotelAmenitiesProps {
  amenities: string[];
}

export function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  if (amenities.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Amenities</h2>
        <p className="text-foreground/60 italic">No amenities listed for this property.</p>
      </div>
    );
  }
  
  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-fuchsia-400" />
            </span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
