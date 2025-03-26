
import React from 'react';
import { Star } from 'lucide-react';
import { DashboardReview } from '../../types';

interface ReviewCardProps {
  review: DashboardReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-4 bg-fuchsia-900/10 rounded-lg border border-fuchsia-900/20">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-medium">{review.name}</span>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{review.property}</span>
            <span className="mx-1">•</span>
            <span>{review.date}</span>
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
            />
          ))}
        </div>
      </div>
      <p className="text-sm">{review.comment}</p>
    </div>
  );
}
