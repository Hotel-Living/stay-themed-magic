
import React, { useState } from 'react';
import { Star } from 'lucide-react';
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
import { DashboardReview } from './types';

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

  // Reset form when dialog opens with new review
  React.useEffect(() => {
    if (isOpen && review) {
      setResponse('');
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
          <label htmlFor="response" className="text-sm font-medium">
            Your Response
          </label>
          <Textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write your response here..."
            className="mt-1 h-32"
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
            {isSubmitting ? "Submitting..." : "Submit Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewResponseDialog;
