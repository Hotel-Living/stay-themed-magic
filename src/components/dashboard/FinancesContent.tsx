
import React from 'react';
import { CreditCard } from 'lucide-react';
import EmptyState from './EmptyState';

export const FinancesContent = () => {
  return (
    <EmptyState 
      icon={<CreditCard className="w-8 h-8" />}
      title="Financial Overview"
      description="Your financial data and transaction history will appear here once you have bookings."
    />
  );
};

export default FinancesContent;
