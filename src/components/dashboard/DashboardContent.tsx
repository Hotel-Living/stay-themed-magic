
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { DashboardContentEN } from './DashboardContent.en';
import { DashboardContentES } from './DashboardContent.es';
import { DashboardContentPT } from './DashboardContent.pt';
import { DashboardContentRO } from './DashboardContent.ro';

export const DashboardContent = () => {
  const { language } = useTranslation();
  
  if (language === 'en') return <DashboardContentEN />;
  if (language === 'es') return <DashboardContentES />;
  if (language === 'pt') return <DashboardContentPT />;
  if (language === 'ro') return <DashboardContentRO />;
  
  // Default fallback to English
  return <DashboardContentEN />;
};

export default DashboardContent;
