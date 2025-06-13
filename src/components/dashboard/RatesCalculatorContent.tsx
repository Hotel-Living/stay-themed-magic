
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CostItemsTab } from "./rates-calculator/CostItemsTab";
import { DefaultCostsTab } from "./rates-calculator/DefaultCostsTab";
import { RatesCalculatorTab } from "./rates-calculator/RatesCalculatorTab";

export const RatesCalculatorContent: React.FC = () => {
  const [costsSubTab, setCostsSubTab] = useState<string>("");
  const [modelSubTab, setModelSubTab] = useState<string>("");

  const handleMainTabDoubleClick = (tabType: "costs" | "model") => {
    if (tabType === "costs") {
      setCostsSubTab("");
    } else {
      setModelSubTab("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-lg p-6 text-white border-fuchsia-500/20 bg-[#0807a0]">
        <h2 className="text-xl font-bold text-center">
          HOTEL-LIVING STANDARD ECONOMIC MODEL
        </h2>
      </div>

      {/* Enhanced Informational Text Block */}
      <div className="relative text-white/90 text-sm text-center px-4">
        {/* Soft blue glow background */}
        <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl opacity-60"></div>
        <div className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-400/20 rounded-lg p-4">
          <p className="font-semibold">
            These figures represent an example of average incremental costs per additional occupied room for a 3-star standard hotel model in Western markets. Actual costs may vary and should be adjusted based on each hotel's specific category, level of service, positioning, and operational model.
          </p>
        </div>
      </div>

      <Tabs className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#460F54]/30 backdrop-blur-sm h-16 p-2">
          <TabsTrigger 
            value="costs-profits" 
            className="py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg"
            onDoubleClick={() => handleMainTabDoubleClick("costs")}
          >
            COSTS & PROFITS
          </TabsTrigger>
          
          <TabsTrigger 
            value="model-rates-calculator" 
            className="py-4 px-6 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:via-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg bg-[#8017B0] text-white hover:bg-[#8017B0]/80 transition-all duration-300 font-bold text-lg"
            onDoubleClick={() => handleMainTabDoubleClick("model")}
          >
            BUILD YOUR OWN MODEL & RATES
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="costs-profits">
          <Tabs value={costsSubTab} onValueChange={setCostsSubTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-lg border border-blue-400/20 rounded-xl h-14 p-2 shadow-lg">
              <TabsTrigger 
                value="costs" 
                className="py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base"
              >
                COSTS
              </TabsTrigger>
              
              <TabsTrigger 
                value="profits" 
                className="py-3 px-4 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/80 data-[state=active]:to-purple-500/80 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-blue-300/30 bg-transparent text-white/70 hover:text-white hover:bg-blue-500/20 transition-all duration-300 font-medium text-base"
              >
                PROFITS
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="costs">
              <CostItemsTab />
            </TabsContent>
            
            <TabsContent value="profits">
              <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
                <div className="text-lg">
                  Profits content will be added here.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="model-rates-calculator">
          <div className="glass-card rounded-lg p-8 text-white/80 border-blue-500/20 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm">
            <div className="text-lg">
              Model & Rates Calculator content will be added here.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
