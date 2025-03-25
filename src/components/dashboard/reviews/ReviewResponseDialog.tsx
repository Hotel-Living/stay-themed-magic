
import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DashboardReview } from '../types';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIResponse = async () => {
    if (!review) return;

    setIsGenerating(true);
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
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      setResponse(data.generatedResponse);
      
      toast({
        title: "Response generated",
        description: "AI-powered response suggestion created. Feel free to edit it before submitting.",
      });
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: "Generation failed",
        description: "Could not generate an AI response. Please try again or write a response manually.",
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

        <div className="mt-2">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="response" className="text-sm font-medium">
              Your Response
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1 text-fuchsia-400 border-fuchsia-400/20 hover:bg-fuchsia-400/10"
              onClick={generateAIResponse}
              disabled={isGenerating}
            >
              <Sparkles className="w-3 h-3" />
              {isGenerating ? "Generating..." : "AI Suggest"}
            </Button>
          </div>
          <Textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write your response here..."
            className="mt-1 h-32"
          />
          {isGenerating && (
            <p className="text-xs text-fuchsia-400 mt-1 animate-pulse">
              Generating a thoughtful response...
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!response.trim() || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
