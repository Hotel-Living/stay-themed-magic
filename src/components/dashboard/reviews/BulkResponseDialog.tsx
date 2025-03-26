
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAIResponseGenerator, ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
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
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState<ResponseTone>('professional');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedResponses, setGeneratedResponses] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const unrespondedReviews = reviews.filter(review => !review.isResponded);
  
  const { generateBulkResponses, isGenerating } = useAIResponseGenerator();
  const { respondToReview } = useReviewOperations(reviews);

  useEffect(() => {
    if (isOpen) {
      setSelectedReviews([]);
      setGeneratedResponses({});
    }
  }, [isOpen, reviews]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedReviews(checked ? unrespondedReviews.map(r => r.id) : []);
  };

  const handleSelectReview = (reviewId: string, checked: boolean) => {
    setSelectedReviews(prev => 
      checked 
        ? [...prev, reviewId] 
        : prev.filter(id => id !== reviewId)
    );
  };

  const handleToneChange = (value: string) => {
    setSelectedTone(value as ResponseTone);
  };

  const handleGenerate = async () => {
    if (selectedReviews.length === 0) {
      toast({
        title: "No reviews selected",
        description: "Please select at least one review to generate responses.",
        variant: "destructive",
      });
      return;
    }
    
    const reviewsToProcess = unrespondedReviews.filter(r => selectedReviews.includes(r.id));
    
    generateBulkResponses(
      reviewsToProcess,
      selectedTone,
      (responses) => {
        setGeneratedResponses(responses);
      }
    );
  };

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
            <div className="flex items-center gap-2">
              <Checkbox 
                id="select-all" 
                checked={selectedReviews.length === unrespondedReviews.length && unrespondedReviews.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select all unresponded ({unrespondedReviews.length})
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={selectedTone} onValueChange={handleToneChange}>
                <SelectTrigger className="w-[130px] h-8 text-xs">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="apologetic">Apologetic</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                className="gap-1 text-fuchsia-400 border-fuchsia-400/20 hover:bg-fuchsia-400/10"
                onClick={handleGenerate}
                disabled={isGenerating || selectedReviews.length === 0}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    Generate All
                  </>
                )}
              </Button>
            </div>
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
                        onCheckedChange={(checked) => handleSelectReview(review.id, !!checked)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-medium">{review.name}</span>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{review.property}</span>
                              <span className="mx-1">•</span>
                              <span>{review.date}</span>
                              <span className="mx-1">•</span>
                              <span className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i} className={`text-xs ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                ))}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm mb-2 line-clamp-2">{review.comment}</p>
                        
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
