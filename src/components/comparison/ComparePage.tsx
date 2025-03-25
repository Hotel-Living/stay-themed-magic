
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CompareTable } from "./CompareTable";
import { CompareError } from "./CompareError";
import { CompareEmpty } from "./CompareEmpty";
import { HotelForComparison } from "./types";

export default function ComparePage() {
  const [searchParams] = useSearchParams();
  const [hotelIds, setHotelIds] = useState<string[]>([]);
  const [hotels, setHotels] = useState<HotelForComparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract hotel IDs from URL params
  useEffect(() => {
    const hotelParam = searchParams.get("hotels");
    if (hotelParam) {
      setHotelIds(hotelParam.split(","));
    }
  }, [searchParams]);

  // Fetch hotel details for all IDs
  useEffect(() => {
    const fetchHotels = async () => {
      if (hotelIds.length === 0) return;
      
      setIsLoading(true);
      try {
        const hotelPromises = hotelIds.map(id => 
          import("@/hooks/hotel-detail/fetchHotelDetail").then(module => 
            module.fetchHotelWithDetails(id)
          )
        );
        
        const results = await Promise.all(hotelPromises);
        setHotels(results.filter(Boolean) as HotelForComparison[]);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError("Failed to load hotel information. Please try again.");
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [hotelIds]);

  // Handle removing a hotel from comparison
  const removeHotel = (id: string) => {
    const newHotelIds = hotelIds.filter(hotelId => hotelId !== id);
    const queryString = newHotelIds.length > 0 ? `?hotels=${newHotelIds.join(",")}` : "";
    window.history.replaceState(null, "", `/compare${queryString}`);
    setHotelIds(newHotelIds);
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 container mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <Link 
            to="/search" 
            className="inline-flex items-center gap-1 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to search
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-white">Hotel Comparison</h1>
        
        {error && <CompareError message={error} />}
        
        {hotels.length === 0 && !isLoading && !error && <CompareEmpty />}
        
        {(hotels.length > 0 || isLoading) && (
          <CompareTable 
            hotels={hotels} 
            isLoading={isLoading} 
            hotelIds={hotelIds}
            onRemoveHotel={removeHotel}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
