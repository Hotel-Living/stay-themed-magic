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
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#460F54]/30 backdrop-blur-sm h-16 p-2">
          <TabsTrigger 
            value="cost-items" 
            className="py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-[#8017B0]/60 hover:text-white transition-all duration-300 font-bold text-lg flex flex-col"
          >
            <span>HOTEL-LIVING EXAMPLE COST</span>
            <span className="mt-0.5">MODEL FOR A STANDARD 3-STAR HOTEL</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="model-rates-calculator" 
            className="py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-[#8017B0]/60 hover:text-white transition-all duration-300 font-bold text-lg flex flex-col"
          >
            <span>MODEL & RATES</span>
            <span className="mt-0.5">CALCULATOR</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cost-items">
          <CostItemsTab />
        </TabsContent>
        
        <TabsContent value="model-rates-calculator">
          <div className="glass-card rounded-lg p-8 text-white/80 border-fuchsia-500/20 bg-[#8017B0]/40">
            <div className="text-lg">
              Model & Rates Calculator content will be added here.
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="default-costs">
          <DefaultCostsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
