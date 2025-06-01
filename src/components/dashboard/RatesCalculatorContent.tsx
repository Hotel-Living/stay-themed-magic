
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
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#460F54]/30 backdrop-blur-sm h-16 p-2">
          <TabsTrigger 
            value="cost-items" 
            className="text-lg font-semibold py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-[#8017B0]/60 hover:text-white transition-all duration-300"
          >
            Cost Items
          </TabsTrigger>
          <TabsTrigger 
            value="default-costs" 
            className="text-lg font-semibold py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-[#8017B0]/60 hover:text-white transition-all duration-300"
          >
            Default Costs
          </TabsTrigger>
          <TabsTrigger 
            value="rates-calculator" 
            className="text-lg font-semibold py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-[#8017B0]/60 hover:text-white transition-all duration-300"
          >
            Rates Calculator
          </TabsTrigger>
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
