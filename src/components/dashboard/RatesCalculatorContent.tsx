
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CostItemsTab } from "./rates-calculator/CostItemsTab";
import { DefaultCostsTab } from "./rates-calculator/DefaultCostsTab";
import { RatesCalculatorTab } from "./rates-calculator/RatesCalculatorTab";

export const RatesCalculatorContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-2xl">Rates Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cost-items" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="cost-items">Cost Items</TabsTrigger>
              <TabsTrigger value="default-costs">Default Costs</TabsTrigger>
              <TabsTrigger value="rates-calculator">Rates Calculator</TabsTrigger>
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
        </CardContent>
      </Card>
    </div>
  );
};
