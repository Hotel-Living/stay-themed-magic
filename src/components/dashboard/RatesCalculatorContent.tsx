
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CostItemsTab } from "./rates-calculator/CostItemsTab";
import { DefaultCostsTab } from "./rates-calculator/DefaultCostsTab";
import { RatesCalculatorTab } from "./rates-calculator/RatesCalculatorTab";

export const RatesCalculatorContent: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-[#0807a0]">
        <h2 className="text-xl font-bold text-center">
          HOTEL-LIVING STANDARD ECONOMIC MODEL
        </h2>
      </div>

      {/* Informational Text Block */}
      <div className="text-white/80 text-sm text-center px-4">
        <p>
          These figures represent an example of average incremental costs per additional occupied room for a 3-star standard hotel model in Western markets. Actual costs may vary and should be adjusted based on each hotel's specific category, level of service, positioning, and operational model.
        </p>
      </div>

      <Tabs defaultValue="costs-profits" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#460F54]/30 backdrop-blur-sm h-16 p-2">
          <TabsTrigger 
            value="costs-profits" 
            className="py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg"
          >
            COSTS & PROFITS
          </TabsTrigger>
          
          <TabsTrigger 
            value="model-rates-calculator" 
            className="py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg"
          >
            BUILD YOUR OWN MODEL & RATES
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="costs-profits">
          <Tabs defaultValue="costs" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#460F54]/30 backdrop-blur-sm h-12 p-1">
              <TabsTrigger 
                value="costs" 
                className="py-3 px-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-semibold"
              >
                COSTS
              </TabsTrigger>
              
              <TabsTrigger 
                value="profits" 
                className="py-3 px-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-semibold"
              >
                PROFITS
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="costs">
              <CostItemsTab />
            </TabsContent>
            
            <TabsContent value="profits">
              <div className="glass-card rounded-lg p-8 text-white/80 border-fuchsia-500/20 bg-[#8017B0]/40">
                <div className="text-lg">
                  Profits content will be added here.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="model-rates-calculator">
          <div className="glass-card rounded-lg p-8 text-white/80 border-fuchsia-500/20 bg-[#8017B0]/40">
            <div className="text-lg">
              Model & Rates Calculator content will be added here.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
