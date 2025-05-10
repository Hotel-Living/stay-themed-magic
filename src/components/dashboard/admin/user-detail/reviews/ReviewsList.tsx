
import React from "react";
import { type UserReview } from "../hooks/user-data/useUserReviews";
import { ReviewItem } from "./ReviewItem";

interface ReviewsListProps {
  reviews: UserReview[];
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <ul className="text-sm space-y-3">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
};
