
import React from 'react';
import { useReviewsData } from '@/hooks/dashboard/useReviewsData';
import { useReviewOperations } from '@/hooks/dashboard/useReviewOperations';
import { ReviewsHeader } from './reviews/ReviewsHeader';
import { ReviewsFilters } from './reviews/ReviewsFilters';
import { ReviewsCardView } from './reviews/ReviewsCardView';
import { ReviewsTableView } from './reviews/ReviewsTableView';
import { ReviewsPagination } from './reviews/ReviewsPagination';
import { ReviewsLoading } from './reviews/ReviewsLoading';
import { useReviewList } from '@/hooks/hotel-detail/useReviewList';
import { ReviewResponseDialog } from './reviews/ReviewResponseDialog';
import { BulkResponseDialog } from './reviews/BulkResponseDialog';
import { DashboardReview } from './types';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

type ViewMode = 'card' | 'table';

interface ReviewsManagementProps {
  propertyFilter: string | null;
}

export function ReviewsManagement({ propertyFilter }: ReviewsManagementProps) {
  const [activeTab, setActiveTab] = React.useState<string>('all');
  const [viewMode, setViewMode] = React.useState<ViewMode>('card');
  const [selectedReview, setSelectedReview] = React.useState<DashboardReview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = React.useState(false);

  // Fetch reviews data from the API
  const { reviews: fetchedReviews, isLoading, refetch } = useReviewsData(propertyFilter);
  
  // Use the review operations with real data
  const { reviews, isSending, respondToReview, sendNotifications } = useReviewOperations(fetchedReviews, refetch);
  
  // Filter unnotified reviews
  const unnotifiedReviews = React.useMemo(() => {
    return reviews.filter(review => !review.notified);
  }, [reviews]);

  // Filter unresponded reviews
  const unrespondedReviews = React.useMemo(() => {
    return reviews.filter(review => !review.isResponded);
  }, [reviews]);
  
  // Apply tab filtering
  const tabFilteredReviews = React.useMemo(() => {
    switch(activeTab) {
      case 'unresponded':
        return reviews.filter(r => !r.isResponded);
      case 'positive':
        return reviews.filter(r => r.rating >= 4);
      case 'negative':
        return reviews.filter(r => r.rating <= 3);
      default:
        return reviews;
    }
  }, [activeTab, reviews]);
  
  // Use the review list hook for pagination and sorting
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

  const openBulkResponseDialog = () => {
    setIsBulkDialogOpen(true);
  };

  const closeBulkResponseDialog = () => {
    setIsBulkDialogOpen(false);
  };

  const handleSendNotifications = () => {
    sendNotifications(unnotifiedReviews);
  };

  const handleRespondToReview = async (reviewId: string, response: string) => {
    await respondToReview(reviewId, response);
    closeResponseDialog();
  };

  if (isLoading) {
    return <ReviewsLoading />;
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <ReviewsHeader 
        propertyFilter={propertyFilter}
        filteredReviews={reviews}
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

      {unrespondedReviews.length > 0 && (
        <div className="my-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={openBulkResponseDialog}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Bulk Respond ({unrespondedReviews.length})
          </Button>
        </div>
      )}

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
        onRespond={handleRespondToReview}
      />

      <BulkResponseDialog
        reviews={reviews}
        isOpen={isBulkDialogOpen}
        onClose={closeBulkResponseDialog}
        onComplete={refetch}
      />
    </div>
  );
}

export default ReviewsManagement;
