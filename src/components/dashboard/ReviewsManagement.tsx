
import React, { useState, useMemo } from 'react';
import { Star, ThumbsUp, MessageCircle, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ReviewItem from './ReviewItem';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReviewList } from '@/hooks/hotel-detail/useReviewList';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Review } from '@/hooks/hotel-detail/types';

// Define a dashboard-specific review interface that extends the base Review type
interface DashboardReview {
  id: string;
  name: string;
  rating: number;
  property: string;
  comment: string;
  date: string;
  isResponded?: boolean;
  // Include required fields from the imported Review type
  hotel_id: string;
  user_id: string;
  created_at?: string;
}

const mockReviews: DashboardReview[] = [
  {
    id: '1',
    name: 'James Wilson',
    rating: 5,
    property: 'Parador de Granada',
    comment: 'Amazing experience! The Spanish language immersion program exceeded my expectations.',
    date: '3 days ago',
    isResponded: false,
    hotel_id: 'hotel-1',
    user_id: 'user-1',
    created_at: '2023-03-22T12:00:00Z'
  },
  {
    id: '2',
    name: 'Lisa Garcia',
    rating: 4,
    property: 'TechHub Barcelona',
    comment: 'Great facilities and tech workshops. Would recommend for longer stays.',
    date: '1 week ago',
    isResponded: true,
    hotel_id: 'hotel-2',
    user_id: 'user-2',
    created_at: '2023-03-18T12:00:00Z'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    rating: 3,
    property: 'Parador de Granada',
    comment: 'Good location but the amenities could be improved. The staff was very friendly though.',
    date: '2 weeks ago',
    isResponded: false,
    hotel_id: 'hotel-1',
    user_id: 'user-3',
    created_at: '2023-03-11T12:00:00Z'
  },
  {
    id: '4',
    name: 'Sarah Thompson',
    rating: 5,
    property: 'TechHub Barcelona',
    comment: 'Perfect for digital nomads! The coworking space and networking events were outstanding.',
    date: '3 weeks ago',
    isResponded: true,
    hotel_id: 'hotel-2',
    user_id: 'user-4',
    created_at: '2023-03-04T12:00:00Z'
  },
  {
    id: '5',
    name: 'David Lee',
    rating: 2,
    property: 'Parador de Granada',
    comment: 'Disappointing stay. The room was not as advertised and the Wi-Fi was constantly down.',
    date: '1 month ago',
    isResponded: true,
    hotel_id: 'hotel-1',
    user_id: 'user-5',
    created_at: '2023-02-25T12:00:00Z'
  },
  {
    id: '6',
    name: 'Emma Rodriguez',
    rating: 5,
    property: 'TechHub Barcelona',
    comment: 'Loved the community feel and the rooftop workspaces. Will definitely be back!',
    date: '1 month ago',
    isResponded: false,
    hotel_id: 'hotel-2',
    user_id: 'user-6',
    created_at: '2023-02-25T14:00:00Z'
  },
  {
    id: '7',
    name: 'Robert Chen',
    rating: 4,
    property: 'Parador de Granada',
    comment: 'Good value for money. The language classes were excellent.',
    date: '2 months ago',
    isResponded: true,
    hotel_id: 'hotel-1',
    user_id: 'user-7',
    created_at: '2023-01-25T12:00:00Z'
  }
];

type ViewMode = 'card' | 'table';

interface ReviewsManagementProps {
  propertyFilter: string | null;
}

export function ReviewsManagement({ propertyFilter }: ReviewsManagementProps) {
  const [reviews, setReviews] = useState<DashboardReview[]>(mockReviews);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  
  // Filter reviews by property if a property filter is provided
  const filteredByPropertyReviews = useMemo(() => {
    if (!propertyFilter) return reviews;
    return reviews.filter(review => review.property === propertyFilter);
  }, [reviews, propertyFilter]);
  
  const {
    filteredReviews,
    currentReviews,
    currentPage,
    totalPages,
    sortOption,
    ratingFilter,
    handleSortChange,
    handlePageChange,
    handleRatingFilterChange
  } = useReviewList({
    reviews: activeTab === 'all' 
      ? filteredByPropertyReviews 
      : activeTab === 'unresponded' 
        ? filteredByPropertyReviews.filter(r => !r.isResponded) 
        : activeTab === 'positive' 
          ? filteredByPropertyReviews.filter(r => r.rating >= 4) 
          : filteredByPropertyReviews.filter(r => r.rating <= 3),
    reviewsPerPage: 4,
    initialSortOption: 'newest'
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
        <h2 className="text-xl font-bold">
          {propertyFilter ? `Reviews for ${propertyFilter}` : 'Guest Reviews'}
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <div className="flex items-center mr-4">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>
                {filteredByPropertyReviews.length > 0 
                  ? (filteredByPropertyReviews.reduce((sum, r) => sum + r.rating, 0) / filteredByPropertyReviews.length).toFixed(1) 
                  : '0'} Avg
              </span>
            </div>
            <div className="flex items-center mr-4">
              <MessageCircle className="w-4 h-4 text-fuchsia-400 mr-1" />
              <span>{filteredByPropertyReviews.length} Total</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 text-green-400 mr-1" />
              <span>{filteredByPropertyReviews.filter(r => r.rating >= 4).length} Positive</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className={viewMode === 'card' ? 'bg-primary/10' : ''}
              onClick={() => setViewMode('card')}
            >
              Card
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className={viewMode === 'table' ? 'bg-primary/10' : ''}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="unresponded">Unresponded</TabsTrigger>
            <TabsTrigger value="positive">Positive</TabsTrigger>
            <TabsTrigger value="negative">Negative</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 items-center">
          <SlidersHorizontal className="h-4 w-4 text-foreground/70" />
          <Select
            value={sortOption}
            onValueChange={(value) => handleSortChange(value as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="highest">Highest Rating</SelectItem>
              <SelectItem value="lowest">Lowest Rating</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={ratingFilter ? ratingFilter.toString() : 'all'}
            onValueChange={(value) => handleRatingFilterChange(value === 'all' ? null : Number(value))}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars Only</SelectItem>
              <SelectItem value="4">4 Stars Only</SelectItem>
              <SelectItem value="3">3 Stars Only</SelectItem>
              <SelectItem value="2">2 Stars Only</SelectItem>
              <SelectItem value="1">1 Star Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {viewMode === 'card' ? (
        <div className="space-y-6">
          {currentReviews.length > 0 ? (
            currentReviews.map((review: DashboardReview) => (
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
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review: DashboardReview) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.name}</TableCell>
                  <TableCell>{review.property}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    {review.isResponded ? (
                      <span className="text-xs text-green-400">Responded</span>
                    ) : (
                      <span className="text-xs text-amber-400">Pending</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {!review.isResponded && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => respondToReview(review.id)}
                      >
                        Respond
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  <p className="text-foreground/70">No reviews match your filter</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-foreground/70">
            Showing {currentReviews.length} of {filteredReviews.length} reviews
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsManagement;
