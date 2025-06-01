
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CostItemsTab } from "./rates-calculator/CostItemsTab";
import { DefaultCostsTab } from "./rates-calculator/DefaultCostsTab";
import { RatesCalculatorTab } from "./rates-calculator/RatesCalculatorTab";

export const RatesCalculatorContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="cost-items" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#460F54]/30 backdrop-blur-sm">
          <TabsTrigger value="cost-items" className="data-[state=active]:bg-[#460F54] data-[state=active]:text-white">Cost Items</TabsTrigger>
          <TabsTrigger value="default-costs" className="data-[state=active]:bg-[#460F54] data-[state=active]:text-white">Default Costs</TabsTrigger>
          <TabsTrigger value="rates-calculator" className="data-[state=active]:bg-[#460F54] data-[state=active]:text-white">Rates Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cost-items">
          <CostItemsTab />
        </TabsContent>
        
        <TabsContent value="default-costs">
          <DefaultCostsTab />
        </TabsContent>
        
        <TabsContent value="rates-calculator">
          <RatesCalculatorTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
