
import React from "react";
import { type UserReview } from "../../hooks/user-data/useUserReviews";

interface ReviewContentProps {
  review: UserReview;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({ review }) => {
  return (
    <>
      <div><strong>Rating:</strong> {review.rating} / 5</div>
      <div><strong>Comment:</strong> {review.comment || "No comment provided"}</div>
      <div className="text-xs text-muted-foreground">{review.formattedDate}</div>
    </>
  );
};
