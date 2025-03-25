
import React from 'react';
import { Star } from 'lucide-react';
import { DashboardReview } from '../../types';

interface ReviewCardProps {
  review: DashboardReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="border rounded-lg p-4 my-4 bg-fuchsia-950/20 border-fuchsia-800/20">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium">{review.name}</p>
          <p className="text-xs text-foreground/60">{review.property}</p>
        </div>
        <div className="flex">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>
      </div>
      <p className="text-sm text-foreground/80 mb-2">{review.comment}</p>
      <p className="text-xs text-foreground/60">{review.date}</p>
    </div>
  );
}
