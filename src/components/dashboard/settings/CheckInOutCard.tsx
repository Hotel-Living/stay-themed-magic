
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CheckInOutSection from '../PropertySteps/rooms/CheckInOutSection';
import { useTranslation } from '@/hooks/useTranslation';

export const CheckInOutCard = () => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader className="bg-[#7a0486] border border-white">
        <CardTitle>{t('dashboard.checkinOutPolicy')}</CardTitle>
      </CardHeader>
      <CardContent className="bg-[#860493] border-x border-b border-white">
        <CheckInOutSection />
      </CardContent>
    </Card>
  );
};
