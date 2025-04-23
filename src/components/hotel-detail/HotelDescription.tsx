
import { HotelDescriptionProps } from "@/types/hotel";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";

export function HotelDescription({ 
  description, 
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

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        About this hotel
        <FileText className="w-5 h-5 text-fuchsia-400" />
      </h2>
      {description ? (
        <p className="text-foreground/80 mb-6 whitespace-pre-line leading-relaxed">
          {description}
        </p>
      ) : (
        <p className="text-foreground/60 italic">
          No description available for this hotel.
        </p>
      )}
    </div>
  );
}
