
import React from "react";
import { type UserReview } from "./hooks/user-data/useUserReviews";
import { EmptyReviewsState } from "./reviews/EmptyReviewsState";
import { ReviewsList } from "./reviews/ReviewsList";

interface UserReviewsSectionProps {
  reviews: UserReview[];
}

export const UserReviewsSection: React.FC<UserReviewsSectionProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <EmptyReviewsState />;
  }

  return <ReviewsList reviews={reviews} />;
};
