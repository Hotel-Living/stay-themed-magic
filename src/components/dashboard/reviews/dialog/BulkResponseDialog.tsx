
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReviewOperations } from '@/hooks/dashboard/useReviewOperations';
import { DashboardReview } from '@/components/dashboard/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReviewSelectionList } from './ReviewSelectionList';
import { DialogControls } from './DialogControls';
import { useBulkResponse } from '@/hooks/dashboard/useBulkResponse';

interface BulkResponseDialogProps {
  reviews: DashboardReview[];
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function BulkResponseDialog({
  reviews,
  isOpen,
  onClose,
  onComplete,
}: BulkResponseDialogProps) {
  const { toast } = useToast();
  const { respondToReview } = useReviewOperations(reviews);
  const unrespondedReviews = reviews.filter(review => !review.isResponded);
  
  const {
    selectedReviews,
    selectedTone,
    isProcessing,
    setIsProcessing,
    generatedResponses,
    isGenerating,
    handleSelectAll,
    handleSelectReview,
    handleToneChange,
    handleGenerate
  } = useBulkResponse(reviews, onComplete);

  const handleSubmitAll = async () => {
    if (Object.keys(generatedResponses).length === 0) {
      toast({
        title: "No responses to submit",
        description: "Please generate responses first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const promises = Object.entries(generatedResponses).map(([reviewId, responseText]) => 
        respondToReview(reviewId, responseText)
      );
      
      await Promise.all(promises);
      
      toast({
        title: "Responses submitted",
        description: `Successfully responded to ${Object.keys(generatedResponses).length} reviews.`,
      });
      
      onComplete();
      onClose();
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast({
        title: "Error submitting responses",
        description: "Some responses could not be submitted. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Bulk Response Generator</DialogTitle>
          <DialogDescription>
            Select reviews and generate AI responses for all of them at once.
          </DialogDescription>
        </DialogHeader>

        <div className="my-2 space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center">
            <DialogControls
              selectedTone={selectedTone}
              onToneChange={handleToneChange}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              selectedReviewsCount={selectedReviews.length}
            />
          </div>
          
          <ReviewSelectionList
            unrespondedReviews={unrespondedReviews}
            selectedReviews={selectedReviews}
            onSelectAll={handleSelectAll}
            onSelectReview={handleSelectReview}
            generatedResponses={generatedResponses}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmitAll} 
            disabled={isProcessing || Object.keys(generatedResponses).length === 0}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : `Submit All Responses (${Object.keys(generatedResponses).length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
