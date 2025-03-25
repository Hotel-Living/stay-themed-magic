
import React, { useState } from 'react';
import { Star, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';

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
              {isGenerating ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" />
                  AI Suggest
                </>
              )}
            </Button>
          </div>

          {generationError && (
            <Alert variant="destructive" className="mb-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {generationError}
              </AlertDescription>
            </Alert>
          )}

          {responseSource === 'template' && !generationError && (
            <Alert className="mb-3 bg-amber-500/10 border-amber-500/30 text-amber-500">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This is a template-based response as our AI system was unavailable. Feel free to edit it.
              </AlertDescription>
            </Alert>
          )}

          <Textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write your response here..."
            className="mt-1 h-32"
          />
          
          {isGenerating && (
            <div className="mt-2 flex items-center gap-2 text-xs text-fuchsia-400">
              <div className="relative w-4 h-4">
                <div className="absolute inset-0 rounded-full border-2 border-fuchsia-400/20 border-t-fuchsia-400 animate-spin"></div>
              </div>
              <p>Creating a personalized response based on the guest's feedback...</p>
            </div>
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
