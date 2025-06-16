
import React from 'react';
import { MessageSquare } from 'lucide-react';
import EmptyState from './EmptyState';

export const MessagesContent = () => {
  return (
    <EmptyState 
      icon={<MessageSquare className="w-8 h-8" />}
      title="Messages"
      description="Guest messages and communication will appear here."
    />
  );
};

export default MessagesContent;
