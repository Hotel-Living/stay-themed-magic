
import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, AlertTriangle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import EmptyState from './EmptyState';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReviewItem from './ReviewItem';

type Review = {
  id: string;
  hotel_id: string;
  rating: number;
  comment: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  response_text: string | null;
  is_notified: boolean;
  hotels?: {
    name: string;
  };
  profiles?: {
    first_name: string | null;
    last_name: string | null;
  };
};

export const ReviewsContent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
  const { user, profile } = useAuth();
  const { toast } = useToast();

  // Fetch reviews for hotels owned by the current user
  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get hotels owned by the current user
        const { data: hotels, error: hotelsError } = await supabase
          .from('hotels')
          .select('id')
          .eq('owner_id', user.id);
          
        if (hotelsError) throw hotelsError;
        
        if (!hotels || hotels.length === 0) {
          setReviews([]);
          return;
        }
        
        const hotelIds = hotels.map(hotel => hotel.id);
        
        // Get reviews for these hotels
        const { data, error } = await supabase
          .from('reviews')
          .select(`
            *,
            hotels:hotels(name),
            profiles:profiles(first_name, last_name)
          `)
          .in('hotel_id', hotelIds)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setReviews(data || []);
        
        // Initialize response states
        const initialResponses: Record<string, string> = {};
        data?.forEach(review => {
          if (review.response_text) {
            initialResponses[review.id] = review.response_text;
          } else {
            initialResponses[review.id] = '';
          }
        });
        
        setResponses(initialResponses);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: 'Error',
          description: 'Failed to load reviews. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [user, toast]);
  
  const handleResponseChange = (reviewId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [reviewId]: value
    }));
  };
  
  const submitResponse = async (reviewId: string) => {
    try {
      setSubmitting(prev => ({ ...prev, [reviewId]: true }));
      
      const { error } = await supabase
        .from('reviews')
        .update({ 
          response_text: responses[reviewId],
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId);
        
      if (error) throw error;
      
      toast({
        title: 'Response Submitted',
        description: 'Your response has been saved successfully.',
      });
      
      // Update the review in the local state
      setReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { ...review, response_text: responses[reviewId] } 
            : review
        )
      );
    } catch (error) {
      console.error('Error submitting response:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your response. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(prev => ({ ...prev, [reviewId]: false }));
    }
  };
  
  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-fuchsia-500/20 rounded w-1/3"></div>
          <div className="h-32 bg-fuchsia-500/10 rounded"></div>
          <div className="h-32 bg-fuchsia-500/10 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <EmptyState 
        icon={<MessageSquare className="w-8 h-8" />}
        title="No Reviews Yet"
        description="Reviews from your guests will appear here once they leave feedback on your properties."
      />
    );
  }
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">Guest Reviews</h2>
      
      <div className="space-y-6">
        {reviews.map((review) => {
          const guestName = review.profiles?.first_name && review.profiles?.last_name 
            ? `${review.profiles.first_name} ${review.profiles.last_name}` 
            : review.profiles?.first_name || 'Anonymous Guest';
          
          const formattedDate = new Date(review.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          return (
            <div key={review.id} className="border-b border-fuchsia-900/10 pb-6 last:border-0 last:pb-0">
              <ReviewItem 
                name={guestName}
                rating={review.rating}
                property={review.hotels?.name || 'Unknown Property'}
                comment={review.comment || 'No comment provided'}
                date={formattedDate}
              />
              
              <div className="mt-4 pl-4 border-l-2 border-fuchsia-500/30">
                {review.response_text ? (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Your Response:</p>
                    <p className="text-sm text-slate-50">{review.response_text}</p>
                  </div>
                ) : null}
                
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">
                    {review.response_text ? 'Update your response:' : 'Respond to this review:'}
                  </p>
                  <div className="flex gap-2">
                    <Textarea 
                      value={responses[review.id] || ''}
                      onChange={(e) => handleResponseChange(review.id, e.target.value)}
                      placeholder="Type your response here..."
                      className="min-h-[80px] bg-[#5c0869]/20 border-fuchsia-800/30"
                    />
                    <Button 
                      size="sm" 
                      className="self-end"
                      onClick={() => submitResponse(review.id)}
                      disabled={submitting[review.id] || !responses[review.id]?.trim()}
                    >
                      {submitting[review.id] ? (
                        <div className="h-4 w-4 border-2 border-slate-50/30 border-t-slate-50 rounded-full animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <Alert className="mt-4 bg-amber-500/10 border-amber-500/20">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <AlertDescription className="text-xs">
                      Hotel Living reserves the right to review, edit, or withhold the publication of any review that includes inappropriate language or content that violates our platform policies.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsContent;
