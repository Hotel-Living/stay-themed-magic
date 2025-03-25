
import { Skeleton } from "@/components/ui/skeleton";
import { HotelForComparison, ComparisonCategory, SortOption } from "./types";
import { TableRow, TableCell } from "@/components/ui/table";
import { Star, ArrowDownAZ, ArrowUpAZ } from "lucide-react";

interface ComparisonCategoriesProps {
  hotels: HotelForComparison[];
  isLoading: boolean;
  hotelIds: string[];
  sortOption: SortOption | null;
  onSortChange: (column: keyof HotelForComparison) => void;
}

export function ComparisonCategories({ 
  hotels, 
  isLoading, 
  hotelIds, 
  sortOption, 
  onSortChange 
}: ComparisonCategoriesProps) {
  // Define comparison categories with proper typing
  const categories: ComparisonCategory[] = [
    { 
      name: "Price per Month", 
      key: "price_per_month", 
      formatter: (value: number) => `$${value.toLocaleString()}`,
      sortable: true,
      highlightBest: 'lowest'
    },
    { 
      name: "Category", 
      key: "category", 
      formatter: (value: number) => "⭐".repeat(value),
      sortable: true,
      highlightBest: 'highest'
    },
    {
      name: "Rating",
      key: "average_rating",
      formatter: (value: number) => {
        if (!value && value !== 0) return "No ratings yet";
        return (
          <div className="flex items-center justify-center gap-1">
            <span>{value.toFixed(1)}</span>
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          </div>
        );
      },
      sortable: true,
      highlightBest: 'highest'
    },
    { 
      name: "Location", 
      key: "city", 
      secondKey: "country", 
      formatter: (city: string, country: string) => `${city}, ${country}`,
      sortable: false 
    },
    { 
      name: "Available Months", 
      key: "available_months", 
      formatter: (months: string[]) => months?.length || 0,
      sortable: true,
      highlightBest: 'highest'
    },
    { 
      name: "Amenities", 
      key: "amenities", 
      formatter: (amenities: string[]) => 
        amenities?.length ? amenities.join(", ") : "None listed",
      sortable: false,
      highlightPresence: true
    },
  ];

  const renderSortIcon = (category: ComparisonCategory) => {
    if (!category.sortable) return null;
    
    if (sortOption?.column === category.key) {
      return sortOption.direction === 'asc' 
        ? <ArrowUpAZ className="h-4 w-4 ml-2 inline-block" /> 
        : <ArrowDownAZ className="h-4 w-4 ml-2 inline-block" />;
    }
    
    return <div className="h-4 w-4 ml-2 inline-block opacity-0 group-hover:opacity-30">
      <ArrowUpAZ className="h-4 w-4" />
    </div>;
  };

  // Function to determine if a cell should be highlighted as the best value
  const getHighlightClass = (category: ComparisonCategory, value: any, hotelIndex: number) => {
    if (isLoading || !category.highlightBest || hotels.length <= 1) return "";
    
    // For numeric values, find the best (max or min) value in this category
    if (typeof value === "number") {
      const values = hotels.map(h => {
        const val = category.secondKey ? h[category.key] : h[category.key];
        return typeof val === "number" ? val : 0;
      });
      
      const bestValue = category.highlightBest === 'highest' 
        ? Math.max(...values) 
        : Math.min(...values);
      
      // If this hotel has the best value, highlight it
      if (value === bestValue) {
        return "bg-fuchsia-900/30 text-white font-medium";
      }
    }
    
    // For arrays (like amenities), highlight if this hotel has items that others don't
    if (category.highlightPresence && Array.isArray(value) && value.length > 0) {
      // Check if this hotel has any unique items
      const otherHotels = [...hotels];
      otherHotels.splice(hotelIndex, 1);
      
      const uniqueItems = value.filter(item => {
        return !otherHotels.some(hotel => {
          const otherValue = hotel[category.key];
          return Array.isArray(otherValue) && otherValue.includes(item);
        });
      });
      
      if (uniqueItems.length > 0) {
        return "bg-fuchsia-900/30 text-white font-medium";
      }
    }
    
    return "";
  };

  return (
    <>
      {categories.map(category => (
        <TableRow key={category.name} className="even:bg-gray-900/20 hover:bg-gray-900/30">
          <TableCell 
            className={`w-[120px] md:w-auto px-4 md:px-6 py-4 text-sm font-medium text-white sticky left-0 bg-black/80 backdrop-blur-sm z-10 ${category.sortable ? 'cursor-pointer group' : ''}`}
            onClick={() => category.sortable ? onSortChange(category.key) : null}
          >
            <div className="flex items-center">
              {category.name}
              {renderSortIcon(category)}
            </div>
          </TableCell>
          {isLoading ? (
            Array(hotelIds.length).fill(0).map((_, index) => (
              <TableCell key={index} className="px-4 md:px-6 py-4 text-center">
                <Skeleton className="h-6 w-2/3 mx-auto bg-white/10" />
              </TableCell>
            ))
          ) : (
            hotels.map((hotel, hotelIndex) => {
              let value;
              if (category.secondKey && hotel[category.key] && hotel[category.secondKey]) {
                value = category.formatter(hotel[category.key], hotel[category.secondKey]);
              } else {
                value = category.formatter(hotel[category.key]);
              }
              
              const highlightClass = getHighlightClass(category, hotel[category.key], hotelIndex);
              
              return (
                <TableCell 
                  key={hotel.id} 
                  className={`px-4 md:px-6 py-4 text-center text-white/90 transition-colors duration-300 ${highlightClass}`}
                >
                  {value}
                </TableCell>
              );
            })
          )}
        </TableRow>
      ))}
    </>
  );
}
