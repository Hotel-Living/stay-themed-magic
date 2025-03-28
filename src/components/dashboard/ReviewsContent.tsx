
import React from 'react';
import { MessageSquare } from 'lucide-react';
import EmptyState from './EmptyState';

export const ReviewsContent = () => {
  return (
    <EmptyState 
      icon={<MessageSquare className="w-8 h-8" />}
      title="No Reviews Yet"
      description="Reviews from your guests will appear here after they complete their stays."
    />
  );
};

export default ReviewsContent;
