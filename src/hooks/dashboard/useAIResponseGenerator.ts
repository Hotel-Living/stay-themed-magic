
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DashboardReview } from '@/components/dashboard/types';

export function useAIResponseGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [responseSource, setResponseSource] = useState<'ai' | 'template' | null>(null);
  const { toast } = useToast();

  const generateAIResponse = async (
    review: DashboardReview,
    setResponse: (value: string) => void
  ) => {
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

  return {
    isGenerating,
    generationError,
    responseSource,
    generateAIResponse,
  };
}
