
import React, { useState } from 'react';
import { DashboardReview } from '../types';
import { useToast } from '@/hooks/use-toast';
import { ReviewCard } from './dialog/ReviewCard';
import { ResponseInput } from './dialog/ResponseInput';
import { ResponseAlerts } from './dialog/ResponseAlerts';
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [responseSource, setResponseSource] = useState<'ai' | 'template' | null>(null);
  const { toast } = useToast();

  // Reset form when dialog opens with new review
  React.useEffect(() => {
    if (isOpen && review) {
      setResponse(review.response || '');
      setGenerationError(null);
      setResponseSource(null);
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

  const generateAIResponse = async () => {
    if (!review) return;

    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      const response = await fetch('https://pgdzrvdwgoomjnnegkcn.supabase.co/functions/v1/generate-review-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: review.rating,
          comment: review.comment,
          property: review.property,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate response');
      }

      const data = await response.json();
      
      if (data.success) {
        setResponse(data.generatedResponse);
        setResponseSource(data.source || 'template');
        
        toast({
          title: data.source === 'ai' ? "AI response generated" : "Template response generated",
          description: "Response created with assistance. Please review and edit before submitting.",
        });
      } else {
        throw new Error(data.error || 'Failed to generate response');
      }
      
    } catch (error) {
      console.error('Error generating response:', error);
      setGenerationError(error instanceof Error ? error.message : "Could not generate a response. Please try again or write a response manually.");
      
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Could not generate a response",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
            generateAIResponse={generateAIResponse}
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
