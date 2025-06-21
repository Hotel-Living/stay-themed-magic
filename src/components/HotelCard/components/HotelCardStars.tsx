
import React from "react";
import { Star } from "lucide-react";

interface HotelCardStarsProps {
  stars: number;
}

export const HotelCardStars: React.FC<HotelCardStarsProps> = ({ stars }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
};
