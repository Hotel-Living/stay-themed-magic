
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RatesCalculatorTab } from './RatesCalculatorTab';
import { CostItemsTab } from './CostItemsTab';
import { DefaultCostsTab } from './DefaultCostsTab';
import { useTranslation } from '@/hooks/useTranslation';

export const ModelRatesTabs = () => {
  const { t, language } = useTranslation();

  return (
    <Tabs defaultValue="costs-benefits" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-purple-900/30">
        <TabsTrigger value="costs-benefits" className="data-[state=active]:bg-fuchsia-600">
          {language === 'es' ? t('dashboard.costs') : 'COSTS'} | {language === 'es' ? t('dashboard.benefits') : 'BENEFITS'}
        </TabsTrigger>
        <TabsTrigger value="cost-items" className="data-[state=active]:bg-fuchsia-600">
          Cost Items
        </TabsTrigger>
        <TabsTrigger value="default-costs" className="data-[state=active]:bg-fuchsia-600">
          Default Costs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="costs-benefits" className="mt-6">
        <RatesCalculatorTab />
      </TabsContent>

      <TabsContent value="cost-items" className="mt-6">
        <CostItemsTab />
      </TabsContent>

      <TabsContent value="default-costs" className="mt-6">
        <DefaultCostsTab />
      </TabsContent>
    </Tabs>
  );
};
