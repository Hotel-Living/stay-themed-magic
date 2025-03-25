
import { Link } from "react-router-dom";
import { X, Info } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { HotelForComparison, SortOption } from "./types";
import { ComparisonCategories } from "./ComparisonCategories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompareTableProps {
  hotels: HotelForComparison[];
  isLoading: boolean;
  hotelIds: string[];
  onRemoveHotel: (id: string) => void;
  sortOption: SortOption | null;
  onSortChange: (column: keyof HotelForComparison) => void;
}

export function CompareTable({ 
  hotels, 
  isLoading, 
  hotelIds, 
  onRemoveHotel,
  sortOption,
  onSortChange
}: CompareTableProps) {
  return (
    <div className="space-y-3">
      {hotels.length > 1 && !isLoading && (
        <div className="flex justify-end">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 text-xs text-white/70 bg-fuchsia-900/20 px-3 py-1 rounded-full cursor-help">
                  <Info className="h-3.5 w-3.5" />
                  <span>Highlighted cells show best options</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Cells highlighted in purple indicate the best value for that category or 
                  unique features that only one hotel offers.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <Table className="w-full glass-card rounded-xl overflow-hidden">
          <TableHeader>
            <TableRow className="bg-fuchsia-950/40 hover:bg-fuchsia-950/40">
              <TableHead className="px-6 py-4 text-left text-sm font-semibold text-white">Features</TableHead>
              {isLoading ? (
                Array(hotelIds.length).fill(0).map((_, index) => (
                  <TableHead key={index} className="px-6 py-4 text-center min-w-[250px]">
                    <Skeleton className="h-6 w-3/4 mx-auto bg-white/10" />
                  </TableHead>
                ))
              ) : (
                hotels.map(hotel => (
                  <TableHead key={hotel.id} className="px-6 py-4 text-center min-w-[250px] relative">
                    <button 
                      className="absolute top-2 right-2 text-white/50 hover:text-white"
                      onClick={() => onRemoveHotel(hotel.id)}
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
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-gray-900/20">
              <TableCell className="px-6 py-4 text-sm font-medium text-white">Image</TableCell>
              {isLoading ? (
                Array(hotelIds.length).fill(0).map((_, index) => (
                  <TableCell key={index} className="px-6 py-4 text-center">
                    <Skeleton className="h-40 w-full mx-auto bg-white/10" />
                  </TableCell>
                ))
              ) : (
                hotels.map(hotel => {
                  const mainImage = hotel.hotel_images?.find((img: any) => img.is_main)?.image_url || 
                                hotel.hotel_images?.[0]?.image_url || 
                                hotel.main_image_url ||
                                '/placeholder.svg';
                  
                  return (
                    <TableCell key={hotel.id} className="px-6 py-4 text-center">
                      <Link to={`/hotel/${hotel.id}`}>
                        <img 
                          src={mainImage} 
                          alt={hotel.name} 
                          className="h-40 w-full object-cover rounded-lg" 
                        />
                      </Link>
                    </TableCell>
                  );
                })
              )}
            </TableRow>
            
            <ComparisonCategories 
              hotels={hotels} 
              isLoading={isLoading} 
              hotelIds={hotelIds} 
              sortOption={sortOption}
              onSortChange={onSortChange}
            />
            
            {/* Action buttons */}
            <TableRow className="hover:bg-gray-900/20">
              <TableCell className="px-6 py-4 text-sm font-medium text-white">Actions</TableCell>
              {isLoading ? (
                Array(hotelIds.length).fill(0).map((_, index) => (
                  <TableCell key={index} className="px-6 py-4 text-center">
                    <Skeleton className="h-10 w-1/2 mx-auto bg-white/10" />
                  </TableCell>
                ))
              ) : (
                hotels.map(hotel => (
                  <TableCell key={hotel.id} className="px-6 py-4 text-center">
                    <Button asChild className="bg-fuchsia-600 hover:bg-fuchsia-700">
                      <Link to={`/hotel/${hotel.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
