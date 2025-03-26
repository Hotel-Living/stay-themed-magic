
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardReview } from '@/components/dashboard/types';
import { ReviewCard } from './ReviewCard';
import { ResponseEditor } from './ResponseEditor';

interface ReviewSelectionListProps {
  unrespondedReviews: DashboardReview[];
  selectedReviews: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectReview: (reviewId: string, checked: boolean) => void;
  generatedResponses: Record<string, string>;
  editingReviewId: string | null;
  onStartEditing: (reviewId: string) => void;
  onUpdateResponse: (reviewId: string, newResponse: string) => void;
}

export function ReviewSelectionList({
  unrespondedReviews,
  selectedReviews,
  onSelectAll,
  onSelectReview,
  generatedResponses,
  editingReviewId,
  onStartEditing,
  onUpdateResponse,
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
                    {generatedResponses[review.id] && editingReviewId === review.id ? (
                      <ResponseEditor 
                        reviewId={review.id}
                        responseText={generatedResponses[review.id]}
                        onUpdateResponse={onUpdateResponse}
                      />
                    ) : generatedResponses[review.id] && (
                      <div className="mt-2 text-sm border-t pt-2">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-medium text-xs text-fuchsia-500">Generated Response:</p>
                          <button 
                            onClick={() => onStartEditing(review.id)}
                            className="text-xs text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                        </div>
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
