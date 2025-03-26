
import React, { useState, useEffect } from 'react';
import { DashboardReview } from '../types';
import { useToast } from '@/hooks/use-toast';
import { ReviewCard } from './dialog/ReviewCard';
import { ResponseInput } from './dialog/ResponseInput';
import { ResponseAlerts } from './dialog/ResponseAlerts';
import { useAIResponseGenerator, ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';
import { useResponseTemplates } from '@/hooks/dashboard/useResponseTemplates';
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
    generateAIResponse,
    useTemplateResponse
  } = useAIResponseGenerator();
  
  // Use the templates hook
  const { 
    templates, 
    isLoading: isLoadingTemplates, 
    applyTemplate 
  } = useResponseTemplates(review?.property ? review.property : null);

  // Reset form when dialog opens with new review
  useEffect(() => {
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

  // Handler for template selection
  const handleTemplateSelect = (templateId: string) => {
    const templateContent = applyTemplate(templateId);
    if (templateContent && review) {
      setResponse(templateContent);
      
      // Find the tone of the selected template
      const selectedTemplate = templates.find(t => t.id === templateId);
      if (selectedTemplate) {
        // Mark response as coming from template
        useTemplateResponse(templateContent, selectedTemplate.tone);
        
        toast({
          title: "Template applied",
          description: `"${selectedTemplate.name}" template applied. Feel free to edit it.`,
        });
      }
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
            templates={templates}
            isLoadingTemplates={isLoadingTemplates}
            onTemplateSelect={handleTemplateSelect}
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
