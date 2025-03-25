
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, X } from "lucide-react";
import { Starfield } from "@/components/Starfield";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Define proper types for the hotel data to avoid type issues
interface HotelForComparison {
  id: string;
  name: string;
  price_per_month: number;
  category: number;
  city: string;
  country: string;
  available_months: string[];
  amenities: string[];
  hotel_images?: { image_url: string; is_main?: boolean }[];
  main_image_url?: string;
}

// Define types for comparison categories
interface ComparisonCategory {
  name: string;
  key: keyof HotelForComparison;
  secondKey?: keyof HotelForComparison;
  formatter: (value: any, secondValue?: any) => string | number;
}

export default function Compare() {
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

  // Define comparison categories with proper typing
  const categories: ComparisonCategory[] = [
    { 
      name: "Price per Month", 
      key: "price_per_month", 
      formatter: (value: number) => `$${value.toLocaleString()}` 
    },
    { 
      name: "Category", 
      key: "category", 
      formatter: (value: number) => "⭐".repeat(value) 
    },
    { 
      name: "Location", 
      key: "city", 
      secondKey: "country", 
      formatter: (city: string, country: string) => `${city}, ${country}` 
    },
    { 
      name: "Available Months", 
      key: "available_months", 
      formatter: (months: string[]) => months?.length || 0 
    },
    { 
      name: "Amenities", 
      key: "amenities", 
      formatter: (amenities: string[]) => 
        amenities?.length ? amenities.join(", ") : "None listed" 
    },
  ];

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
        
        {error && (
          <div className="glass-card rounded-xl p-6 mb-6 text-red-400">
            {error}
          </div>
        )}
        
        {hotels.length === 0 && !isLoading && !error && (
          <div className="glass-card rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-3 text-white">No hotels to compare</h2>
            <p className="text-white/70 mb-4">
              Add some hotels to comparison from the search results first.
            </p>
            <Button asChild>
              <Link to="/search">Go to search</Link>
            </Button>
          </div>
        )}
        
        {(hotels.length > 0 || isLoading) && (
          <div className="overflow-x-auto">
            <table className="w-full glass-card rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-fuchsia-950/40">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Features</th>
                  {isLoading ? (
                    Array(hotelIds.length).fill(0).map((_, index) => (
                      <th key={index} className="px-6 py-4 text-center min-w-[250px]">
                        <Skeleton className="h-6 w-3/4 mx-auto bg-white/10" />
                      </th>
                    ))
                  ) : (
                    hotels.map(hotel => (
                      <th key={hotel.id} className="px-6 py-4 text-center min-w-[250px] relative">
                        <button 
                          className="absolute top-2 right-2 text-white/50 hover:text-white"
                          onClick={() => removeHotel(hotel.id)}
                          aria-label={`Remove ${hotel.name} from comparison`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <Link 
                          to={`/hotel/${hotel.id}`} 
                          className="text-lg font-bold text-white hover:text-fuchsia-400 transition"
                        >
                          {hotel.name}
                        </Link>
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-white">Image</td>
                  {isLoading ? (
                    Array(hotelIds.length).fill(0).map((_, index) => (
                      <td key={index} className="px-6 py-4 text-center">
                        <Skeleton className="h-40 w-full mx-auto bg-white/10" />
                      </td>
                    ))
                  ) : (
                    hotels.map(hotel => {
                      const mainImage = hotel.hotel_images?.find((img: any) => img.is_main)?.image_url || 
                                    hotel.hotel_images?.[0]?.image_url || 
                                    hotel.main_image_url ||
                                    '/placeholder.svg';
                      
                      return (
                        <td key={hotel.id} className="px-6 py-4 text-center">
                          <Link to={`/hotel/${hotel.id}`}>
                            <img 
                              src={mainImage} 
                              alt={hotel.name} 
                              className="h-40 w-full object-cover rounded-lg" 
                            />
                          </Link>
                        </td>
                      );
                    })
                  )}
                </tr>
                
                {categories.map(category => (
                  <tr key={category.name} className="even:bg-gray-900/20">
                    <td className="px-6 py-4 text-sm font-medium text-white">{category.name}</td>
                    {isLoading ? (
                      Array(hotelIds.length).fill(0).map((_, index) => (
                        <td key={index} className="px-6 py-4 text-center">
                          <Skeleton className="h-6 w-2/3 mx-auto bg-white/10" />
                        </td>
                      ))
                    ) : (
                      hotels.map(hotel => {
                        let value;
                        if (category.secondKey && hotel[category.key] && hotel[category.secondKey]) {
                          value = category.formatter(hotel[category.key], hotel[category.secondKey]);
                        } else {
                          value = category.formatter(hotel[category.key]);
                        }
                        
                        return (
                          <td key={hotel.id} className="px-6 py-4 text-center text-white/90">
                            {value}
                          </td>
                        );
                      })
                    )}
                  </tr>
                ))}
                
                {/* Action buttons */}
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-white">Actions</td>
                  {isLoading ? (
                    Array(hotelIds.length).fill(0).map((_, index) => (
                      <td key={index} className="px-6 py-4 text-center">
                        <Skeleton className="h-10 w-1/2 mx-auto bg-white/10" />
                      </td>
                    ))
                  ) : (
                    hotels.map(hotel => (
                      <td key={hotel.id} className="px-6 py-4 text-center">
                        <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700">
                          <Link to={`/hotel/${hotel.id}`}>View Details</Link>
                        </Button>
                      </td>
                    ))
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
