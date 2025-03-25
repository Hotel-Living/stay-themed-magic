
import React from 'react';
import ReviewsManagement from './ReviewsManagement';

export function ReviewsContent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Reviews Management</h2>
      <p className="text-foreground/70 mb-6">
        Manage and respond to guest reviews for your properties.
      </p>
      
      <ReviewsManagement />
    </div>
  );
}

export default ReviewsContent;
