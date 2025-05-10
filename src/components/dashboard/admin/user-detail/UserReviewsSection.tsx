
import React from "react";
import { type UserReview } from "./hooks/user-data/useUserReviews";

interface UserReviewsSectionProps {
  reviews: UserReview[];
}

export const UserReviewsSection: React.FC<UserReviewsSectionProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        This user has not submitted any reviews.
      </div>
    );
  }

  return (
    <ul className="text-sm space-y-3">
      {reviews.map((review) => (
        <li key={review.id} className="border p-3 rounded-md bg-muted/20">
          <div><strong>Hotel:</strong> {review.hotel?.name}</div>
          <div><strong>Rating:</strong> {review.rating} / 5</div>
          <div><strong>Comment:</strong> {review.comment || "No comment provided"}</div>
          <div className="text-xs text-muted-foreground">{review.formattedDate}</div>
        </li>
      ))}
    </ul>
  );
};
