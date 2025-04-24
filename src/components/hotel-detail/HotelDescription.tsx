
import { HotelDescriptionProps } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

export function HotelDescription({ 
  description, 
  idealGuests,
  atmosphere,
  perfectLocation,
  isLoading 
}: HotelDescriptionProps & { isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="bg-[#5C088F] rounded-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // Only show the section if there's at least one field with content
  const hasContent = description || idealGuests || atmosphere || perfectLocation;

  if (!hasContent) {
    return (
      <div className="mb-8 bg-[#5C088F] rounded-lg p-6 text-white">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          About this hotel
          <FileText className="w-5 h-5 text-fuchsia-400" />
        </h2>
        <p className="text-foreground/60 italic">
          No description available for this hotel.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 bg-[#5C088F] rounded-lg p-6 text-white">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        About this hotel
        <FileText className="w-5 h-5 text-fuchsia-400" />
      </h2>
      
      {description && (
        <div className="mb-6">
          <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {idealGuests && (
        <div className="mb-4">
          <p className="text-fuchsia-400 font-medium mb-1">This hotel is ideal for guests who enjoy...</p>
          <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{idealGuests}</p>
        </div>
      )}

      {atmosphere && (
        <div className="mb-4">
          <p className="text-fuchsia-400 font-medium mb-1">The atmosphere at this hotel is...</p>
          <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{atmosphere}</p>
        </div>
      )}

      {perfectLocation && (
        <div className="mb-4">
          <p className="text-fuchsia-400 font-medium mb-1">Our location is perfect for...</p>
          <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{perfectLocation}</p>
        </div>
      )}
    </div>
  );
}
