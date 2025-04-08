
import React from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price_per_month: number;
  thumbnail?: string;
  theme?: string;
}

interface SearchResultsListProps {
  filteredHotels: Hotel[];
  isLoading: boolean;
  error: Error | null;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({ 
  filteredHotels, 
  isLoading, 
  error 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Error Loading Results</h3>
        <p className="text-muted-foreground">
          Please, search again. Thanks
        </p>
      </Card>
    );
  }

  if (filteredHotels.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
        <p className="text-xl font-semibold">Please, search again. Thanks</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredHotels.map((hotel) => (
        <Link key={hotel.id} to={`/hotels/${hotel.id}`}>
          <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img 
                src={hotel.thumbnail || "/placeholder.svg"} 
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              {hotel.theme && (
                <div className="absolute bottom-2 left-2 bg-fuchsia-600/90 text-white text-xs px-2 py-1 rounded-full">
                  {hotel.theme}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2">{hotel.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{hotel.location}</span>
                <span className="font-medium">${hotel.price_per_month}/mo</span>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
