
import React from 'react';
import { HelpCircle } from 'lucide-react';
import EmptyState from './EmptyState';

export const SupportContent = () => {
  return (
    <EmptyState 
      icon={<HelpCircle className="w-8 h-8" />}
      title="Support"
      description="Contact our support team for assistance with your hotel management."
    />
  );
};

export default SupportContent;
