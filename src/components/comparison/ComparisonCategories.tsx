
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
      sortable: true
    },
    { 
      name: "Category", 
      key: "category", 
      formatter: (value: number) => "⭐".repeat(value),
      sortable: true
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
      sortable: true
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
      sortable: true
    },
    { 
      name: "Amenities", 
      key: "amenities", 
      formatter: (amenities: string[]) => 
        amenities?.length ? amenities.join(", ") : "None listed",
      sortable: false
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

  return (
    <>
      {categories.map(category => (
        <TableRow key={category.name} className="even:bg-gray-900/20 hover:bg-gray-900/30">
          <TableCell 
            className={`px-6 py-4 text-sm font-medium text-white ${category.sortable ? 'cursor-pointer group' : ''}`}
            onClick={() => category.sortable ? onSortChange(category.key) : null}
          >
            <div className="flex items-center">
              {category.name}
              {renderSortIcon(category)}
            </div>
          </TableCell>
          {isLoading ? (
            Array(hotelIds.length).fill(0).map((_, index) => (
              <TableCell key={index} className="px-6 py-4 text-center">
                <Skeleton className="h-6 w-2/3 mx-auto bg-white/10" />
              </TableCell>
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
                <TableCell key={hotel.id} className="px-6 py-4 text-center text-white/90">
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
