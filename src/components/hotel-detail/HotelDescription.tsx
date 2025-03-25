
import { HotelDescriptionProps } from "@/types/hotel";

export function HotelDescription({ description }: HotelDescriptionProps) {
  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">About this hotel</h2>
      {description ? (
        <p className="text-foreground/80 mb-6 whitespace-pre-line">
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
