
import React from 'react';
import { useState } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import ReviewItem from './ReviewItem';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface Review {
  id: string;
  name: string;
  rating: number;
  property: string;
  comment: string;
  date: string;
  isResponded?: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    name: 'James Wilson',
    rating: 5,
    property: 'Parador de Granada',
    comment: 'Amazing experience! The Spanish language immersion program exceeded my expectations.',
    date: '3 days ago',
    isResponded: false
  },
  {
    id: '2',
    name: 'Lisa Garcia',
    rating: 4,
    property: 'TechHub Barcelona',
    comment: 'Great facilities and tech workshops. Would recommend for longer stays.',
    date: '1 week ago',
    isResponded: true
  },
  {
    id: '3',
    name: 'Michael Johnson',
    rating: 3,
    property: 'Parador de Granada',
    comment: 'Good location but the amenities could be improved. The staff was very friendly though.',
    date: '2 weeks ago',
    isResponded: false
  },
  {
    id: '4',
    name: 'Sarah Thompson',
    rating: 5,
    property: 'TechHub Barcelona',
    comment: 'Perfect for digital nomads! The coworking space and networking events were outstanding.',
    date: '3 weeks ago',
    isResponded: true
  }
];

export function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredReviews = reviews.filter(review => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unresponded') return !review.isResponded;
    if (activeTab === 'positive') return review.rating >= 4;
    if (activeTab === 'negative') return review.rating <= 3;
    return true;
  });

  const respondToReview = (reviewId: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, isResponded: true } 
          : review
      )
    );
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Guest Reviews</h2>
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <div className="flex items-center mr-4">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>4.6 Avg</span>
          </div>
          <div className="flex items-center mr-4">
            <MessageCircle className="w-4 h-4 text-fuchsia-400 mr-1" />
            <span>{reviews.length} Total</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 text-green-400 mr-1" />
            <span>{reviews.filter(r => r.rating >= 4).length} Positive</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
          <TabsTrigger value="unresponded">Unresponded</TabsTrigger>
          <TabsTrigger value="positive">Positive</TabsTrigger>
          <TabsTrigger value="negative">Negative</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div key={review.id} className="relative">
              <ReviewItem 
                name={review.name} 
                rating={review.rating}
                property={review.property}
                comment={review.comment}
                date={review.date}
              />
              {!review.isResponded && (
                <div className="mt-2 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => respondToReview(review.id)}
                  >
                    Respond to Review
                  </Button>
                </div>
              )}
              {review.isResponded && (
                <div className="mt-2 text-right">
                  <span className="text-xs text-green-400">Responded</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-foreground/70">No reviews match your filter</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <Button variant="outline" className="text-fuchsia-400 hover:text-fuchsia-300 transition">
          View all reviews
        </Button>
      </div>
    </div>
  );
}

export default ReviewsManagement;
