
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAIResponseGenerator, ResponseTone } from './useAIResponseGenerator';
import { DashboardReview } from '@/components/dashboard/types';

export function useBulkResponse(reviews: DashboardReview[], onComplete: () => void) {
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState<ResponseTone>('professional');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedResponses, setGeneratedResponses] = useState<Record<string, string>>({});
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { generateBulkResponses, isGenerating } = useAIResponseGenerator();
  
  // Reset state when dialog opens/closes
  useEffect(() => {
    setSelectedReviews([]);
    setGeneratedResponses({});
    setEditingReviewId(null);
  }, [reviews]);

  const handleSelectAll = (checked: boolean) => {
    const unrespondedReviews = reviews.filter(r => !r.isResponded);
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
    
    const reviewsToProcess = reviews.filter(r => selectedReviews.includes(r.id));
    
    generateBulkResponses(
      reviewsToProcess,
      selectedTone,
      (responses) => {
        setGeneratedResponses(responses);
      }
    );
  };

  const handleCustomResponse = (responseText: string) => {
    if (selectedReviews.length === 0) {
      toast({
        title: "No reviews selected",
        description: "Please select at least one review to apply this response to.",
        variant: "destructive",
      });
      return;
    }
    
    // Create a record with the same response for all selected reviews
    const customResponses: Record<string, string> = {};
    selectedReviews.forEach(reviewId => {
      customResponses[reviewId] = responseText;
    });
    
    setGeneratedResponses(prev => ({...prev, ...customResponses}));
    
    toast({
      title: "Custom response applied",
      description: `Applied to ${selectedReviews.length} selected reviews.`,
    });
  };

  const handleStartEditing = (reviewId: string) => {
    setEditingReviewId(reviewId);
  };

  const handleUpdateResponse = (reviewId: string, newResponse: string) => {
    // Update the response and exit edit mode
    setGeneratedResponses(prev => ({
      ...prev,
      [reviewId]: newResponse
    }));
    setEditingReviewId(null);
  };

  return {
    selectedReviews,
    selectedTone,
    isProcessing,
    setIsProcessing,
    generatedResponses,
    isGenerating,
    editingReviewId,
    handleSelectAll,
    handleSelectReview,
    handleToneChange,
    handleGenerate,
    handleCustomResponse,
    handleStartEditing,
    handleUpdateResponse
  };
}
