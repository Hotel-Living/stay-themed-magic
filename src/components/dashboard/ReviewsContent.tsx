
import React from 'react';
import { MessageSquare } from 'lucide-react';
import EmptyState from './EmptyState';

export const ReviewsContent = () => {
  return (
    <EmptyState 
      icon={<MessageSquare className="w-8 h-8" />}
      title="No Reviews Yet"
      description="Guest reviews for your stays will appear here. After completing a stay, you can come back to see what others thought about their experience."
      actionLink="/search"
      actionText="Explore Properties"
    />
  );
};

export default ReviewsContent;
