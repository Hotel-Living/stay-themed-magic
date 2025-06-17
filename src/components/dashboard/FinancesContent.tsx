
import React from 'react';
import { CreditCard } from 'lucide-react';
import EmptyState from './EmptyState';
import { useTranslation } from '@/hooks/useTranslation';

export const FinancesContent = () => {
  const { t } = useTranslation();
  
  return (
    <EmptyState 
      icon={<CreditCard className="w-8 h-8" />}
      title={t('dashboard.financialOverview')}
      description={t('dashboard.financialDataMessage')}
    />
  );
};

export default FinancesContent;
