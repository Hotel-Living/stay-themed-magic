
import React from 'react';
import ReviewItem from "../ReviewItem";
import { LinkButton } from "@/components/ui/link-button";

export function RecentReviews() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
      <div className="space-y-4">
        <ReviewItem 
          name="James Wilson" 
          rating={5}
          property="Parador de Granada"
          comment="Amazing experience! The Spanish language immersion program exceeded my expectations."
          date="3 days ago"
        />
        <ReviewItem 
          name="Lisa Garcia" 
          rating={4}
          property="TechHub Barcelona"
          comment="Great facilities and tech workshops. Would recommend for longer stays."
          date="1 week ago"
        />
      </div>
      <LinkButton 
        className="w-full mt-4 py-2 text-sm text-fuchsia-400 hover:text-fuchsia-300 transition"
        onClick={(e) => {
          e.preventDefault();
          const reviewsTab = document.querySelector('button[data-tab="reviews"]');
          if (reviewsTab instanceof HTMLElement) {
            reviewsTab.click();
          }
        }}
      >
        View all reviews
      </LinkButton>
    </div>
  );
}

export default RecentReviews;
