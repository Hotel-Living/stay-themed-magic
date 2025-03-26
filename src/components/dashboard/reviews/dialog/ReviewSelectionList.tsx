
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardReview } from '@/components/dashboard/types';
import { ReviewCard } from './ReviewCard';

interface ReviewSelectionListProps {
  unrespondedReviews: DashboardReview[];
  selectedReviews: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectReview: (reviewId: string, checked: boolean) => void;
  generatedResponses: Record<string, string>;
}

export function ReviewSelectionList({
  unrespondedReviews,
  selectedReviews,
  onSelectAll,
  onSelectReview,
  generatedResponses,
}: ReviewSelectionListProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox 
          id="select-all" 
          checked={selectedReviews.length === unrespondedReviews.length && unrespondedReviews.length > 0}
          onCheckedChange={onSelectAll}
        />
        <label htmlFor="select-all" className="text-sm font-medium">
          Select all unresponded ({unrespondedReviews.length})
        </label>
      </div>
      
      <ScrollArea className="flex-1 border rounded-md p-2">
        {unrespondedReviews.length > 0 ? (
          <div className="space-y-3">
            {unrespondedReviews.map((review) => (
              <div key={review.id} className="border rounded-md p-3 bg-muted/30">
                <div className="flex items-start gap-2">
                  <Checkbox 
                    id={`review-${review.id}`}
                    checked={selectedReviews.includes(review.id)}
                    onCheckedChange={(checked) => onSelectReview(review.id, !!checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <ReviewCard review={review} />
                    {generatedResponses[review.id] && (
                      <div className="mt-2 text-sm border-t pt-2">
                        <p className="font-medium text-xs mb-1 text-fuchsia-500">Generated Response:</p>
                        <p className="text-xs line-clamp-3">{generatedResponses[review.id]}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <p className="text-muted-foreground">No unresponded reviews available.</p>
          </div>
        )}
      </ScrollArea>
    </>
  );
}
