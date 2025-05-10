
import React from "react";
import { Badge } from "@/components/ui/badge";
import { type UserReview } from "../../hooks/user-data/useUserReviews";

interface ReviewHeaderProps {
  review: UserReview;
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({ review }) => {
  return (
    <div className="flex justify-between items-start mb-2">
      <div><strong>Hotel:</strong> {review.hotel?.name}</div>
      <div className="flex gap-1">
        <Badge variant={review.is_flagged ? "error" : "outline"}>
          {review.is_flagged ? "Flagged" : "Reviewed"}
        </Badge>
        <Badge variant={review.is_hidden ? "warning" : "success"}>
          {review.is_hidden ? "Hidden" : "Published"}
        </Badge>
      </div>
    </div>
  );
};
