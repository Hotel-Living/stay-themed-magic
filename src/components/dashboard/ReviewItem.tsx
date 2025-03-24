
import React from 'react';
import { StarIcon } from "lucide-react";

interface ReviewItemProps {
  name: string;
  rating: number;
  property: string;
  comment: string;
  date: string;
}

export const ReviewItem = ({ name, rating, property, comment, date }: ReviewItemProps) => {
  return (
    <div className="p-3 rounded-lg bg-fuchsia-950/30 border border-fuchsia-800/20">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-foreground/60">{property}</p>
        </div>
        <div className="flex items-center">
          {Array.from({ length: rating }).map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
          {Array.from({ length: 5 - rating }).map((_, i) => (
            <StarIcon key={i} className="w-4 h-4 text-foreground/30" />
          ))}
        </div>
      </div>
      <p className="text-sm text-foreground/80 mb-2 line-clamp-2">{comment}</p>
      <p className="text-xs text-foreground/60">{date}</p>
    </div>
  );
};

export default ReviewItem;
