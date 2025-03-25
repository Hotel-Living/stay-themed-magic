
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import ReviewItem from '../ReviewItem';
import { Button } from '@/components/ui/button';
import { DashboardReview } from '../types';

interface ReviewsCardViewProps {
  reviews: DashboardReview[];
  openResponseDialog: (review: DashboardReview) => void;
}

export function ReviewsCardView({ reviews, openResponseDialog }: ReviewsCardViewProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-foreground/70">No reviews match your filter</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="relative">
          <ReviewItem 
            name={review.name} 
            rating={review.rating}
            property={review.property}
            comment={review.comment}
            date={review.date}
          />
          
          {!review.notified && (
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-400/20 text-amber-400">
                <AlertTriangle className="w-3 h-3 mr-1" />
                New
              </span>
            </div>
          )}
          
          {review.isResponded ? (
            <div className="mt-2 ml-6 p-3 bg-fuchsia-800/10 rounded-lg border border-fuchsia-800/20">
              <div className="flex justify-between">
                <p className="text-xs font-semibold text-fuchsia-300 mb-1">Your Response:</p>
                <span className="text-xs text-green-400">Responded</span>
              </div>
              <p className="text-sm text-foreground/80">{review.response}</p>
            </div>
          ) : (
            <div className="mt-2 flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => openResponseDialog(review)}
              >
                Respond to Review
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
