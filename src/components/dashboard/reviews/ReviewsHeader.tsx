
import React from 'react';
import { Star, ThumbsUp, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardReview } from '../types';

interface ReviewsHeaderProps {
  propertyFilter: string | null;
  filteredReviews: DashboardReview[];
  unnotifiedReviews: DashboardReview[];
  isSending: boolean;
  viewMode: 'card' | 'table';
  setViewMode: (mode: 'card' | 'table') => void;
  onSendNotifications: () => void;
}

export function ReviewsHeader({
  propertyFilter,
  filteredReviews,
  unnotifiedReviews,
  isSending,
  viewMode,
  setViewMode,
  onSendNotifications
}: ReviewsHeaderProps) {
  const calculateAvgRating = () => {
    if (filteredReviews.length === 0) return '0';
    const sum = filteredReviews.reduce((total, review) => total + review.rating, 0);
    return (sum / filteredReviews.length).toFixed(1);
  };

  const positiveReviewsCount = filteredReviews.filter(r => r.rating >= 4).length;

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold">
        {propertyFilter ? `Reviews for ${propertyFilter}` : 'Guest Reviews'}
      </h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <div className="flex items-center mr-4">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{calculateAvgRating()} Avg</span>
          </div>
          <div className="flex items-center mr-4">
            <MessageCircle className="w-4 h-4 text-fuchsia-400 mr-1" />
            <span>{filteredReviews.length} Total</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 text-green-400 mr-1" />
            <span>{positiveReviewsCount} Positive</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {unnotifiedReviews.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-amber-400 border-amber-400/20 hover:bg-amber-400/10"
              onClick={onSendNotifications}
              disabled={isSending}
            >
              <Mail className="w-3 h-3" />
              {isSending ? "Sending..." : `Notify (${unnotifiedReviews.length})`}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className={viewMode === 'card' ? 'bg-primary/10' : ''}
            onClick={() => setViewMode('card')}
          >
            Card
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={viewMode === 'table' ? 'bg-primary/10' : ''}
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
        </div>
      </div>
    </div>
  );
}
