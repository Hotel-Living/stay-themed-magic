
import React, { useState } from 'react';
import { DashboardReview } from '../types';
import { useToast } from '@/hooks/use-toast';
import { ReviewCard } from './dialog/ReviewCard';
import { ResponseInput } from './dialog/ResponseInput';
import { ResponseAlerts } from './dialog/ResponseAlerts';
import { useAIResponseGenerator, ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ReviewResponseDialogProps {
  review: DashboardReview | null;
  isOpen: boolean;
  onClose: () => void;
  onRespond: (reviewId: string, response: string) => void;
}

export function ReviewResponseDialog({
  review,
  isOpen,
  onClose,
  onRespond,
}: ReviewResponseDialogProps) {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Use the extracted AI generation hook
  const { 
    isGenerating, 
    generationError, 
    responseSource, 
    generateAIResponse 
  } = useAIResponseGenerator();

  // Reset form when dialog opens with new review
  React.useEffect(() => {
    if (isOpen && review) {
      setResponse(review.response || '');
    }
  }, [isOpen, review]);

  const handleSubmit = async () => {
    if (!review) return;
    
    setIsSubmitting(true);
    try {
      await onRespond(review.id, response);
      onClose();
    } catch (error) {
      console.error('Failed to submit response:', error);
      toast({
        title: "Failed to submit response",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for AI generation that uses the hook
  const handleGenerateAIResponse = (tone: ResponseTone) => {
    if (review) {
      generateAIResponse(review, setResponse, tone);
    }
  };

  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Respond to Review</DialogTitle>
          <DialogDescription>
            Write a thoughtful response to this guest review.
          </DialogDescription>
        </DialogHeader>

        <ReviewCard review={review} />

        <div className="mt-2">
          <ResponseInput 
            response={response}
            setResponse={setResponse}
            isGenerating={isGenerating}
            generateAIResponse={handleGenerateAIResponse}
          />
          
          <ResponseAlerts 
            generationError={generationError}
            responseSource={responseSource}
            isGenerating={isGenerating}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!response.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : "Submit Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
