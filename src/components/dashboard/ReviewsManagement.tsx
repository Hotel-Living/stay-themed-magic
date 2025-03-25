import React, { useState, useMemo } from 'react';
import { useReviewList } from '@/hooks/hotel-detail/useReviewList';
import { useReviewOperations } from '@/hooks/dashboard/useReviewOperations';
import { ReviewsHeader } from './reviews/ReviewsHeader';
import { ReviewsFilters } from './reviews/ReviewsFilters';
import { ReviewsCardView } from './reviews/ReviewsCardView';
import { ReviewsTableView } from './reviews/ReviewsTableView';
import { ReviewsPagination } from './reviews/ReviewsPagination';
import ReviewResponseDialog from './ReviewResponseDialog';
import { DashboardReview } from './types';

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
    created_at: '2023-03-22T12:00:00Z',
    notified: true
  },
  {
    id: '2',
    name: 'Lisa Garcia',
    rating: 4,
    property: 'TechHub Barcelona',
    comment: 'Great facilities and tech workshops. Would recommend for longer stays.',
    date: '1 week ago',
    isResponded: true,
    response: "Thank you for your feedback, Lisa! We're glad you enjoyed our workshops and facilities.",
    hotel_id: 'hotel-2',
    user_id: 'user-2',
    created_at: '2023-03-18T12:00:00Z',
    notified: true
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
    response: "We appreciate your kind words, Sarah! Our goal is to create the perfect environment for digital nomads.",
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
    response: "We sincerely apologize for the issues you experienced, David. We've since upgraded our Wi-Fi system and updated our room descriptions.",
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
    response: "Thank you for your review, Robert! We take pride in our language classes and are glad you found them valuable.",
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
  const { reviews, isSending, respondToReview, sendNotifications } = useReviewOperations(mockReviews);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [selectedReview, setSelectedReview] = useState<DashboardReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredByPropertyReviews = useMemo(() => {
    if (!propertyFilter) return reviews;
    return reviews.filter(review => review.property === propertyFilter);
  }, [reviews, propertyFilter]);
  
  const unnotifiedReviews = useMemo(() => {
    return filteredByPropertyReviews.filter(review => !review.notified);
  }, [filteredByPropertyReviews]);
  
  const tabFilteredReviews = useMemo(() => {
    switch(activeTab) {
      case 'unresponded':
        return filteredByPropertyReviews.filter(r => !r.isResponded);
      case 'positive':
        return filteredByPropertyReviews.filter(r => r.rating >= 4);
      case 'negative':
        return filteredByPropertyReviews.filter(r => r.rating <= 3);
      default:
        return filteredByPropertyReviews;
    }
  }, [activeTab, filteredByPropertyReviews]);
  
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
    reviews: tabFilteredReviews,
    reviewsPerPage: 4,
    initialSortOption: 'newest'
  });

  const openResponseDialog = (review: DashboardReview) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const closeResponseDialog = () => {
    setIsDialogOpen(false);
    setSelectedReview(null);
  };

  const handleSendNotifications = () => {
    sendNotifications(unnotifiedReviews);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <ReviewsHeader 
        propertyFilter={propertyFilter}
        filteredReviews={filteredByPropertyReviews}
        unnotifiedReviews={unnotifiedReviews}
        isSending={isSending}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onSendNotifications={handleSendNotifications}
      />

      <ReviewsFilters 
        activeTab={activeTab}
        sortOption={sortOption}
        ratingFilter={ratingFilter}
        onTabChange={setActiveTab}
        onSortChange={handleSortChange}
        onRatingFilterChange={handleRatingFilterChange}
      />

      {viewMode === 'card' ? (
        <ReviewsCardView 
          reviews={currentReviews}
          openResponseDialog={openResponseDialog}
        />
      ) : (
        <ReviewsTableView 
          reviews={currentReviews}
          openResponseDialog={openResponseDialog}
        />
      )}

      <ReviewsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalReviews={filteredReviews.length}
        reviewsPerPage={4}
        currentCount={currentReviews.length}
        onPageChange={handlePageChange}
      />

      <ReviewResponseDialog
        review={selectedReview}
        isOpen={isDialogOpen}
        onClose={closeResponseDialog}
        onRespond={respondToReview}
      />
    </div>
  );
}

export default ReviewsManagement;
