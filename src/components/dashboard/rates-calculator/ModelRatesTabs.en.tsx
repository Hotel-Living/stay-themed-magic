
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DefaultCostsTab } from "./DefaultCostsTab";
import { RatesCalculatorTab } from "./RatesCalculatorTab";

export const ModelRatesTabs: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          THE HOTEL-LIVING MEALS MODEL: SIMPLE, HEALTHY, HOME-STYLE
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            PREDICTABILITY
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            RESPONSIBILITY
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            EFFICIENCY
          </span>
        </div>
        <p className="text-white/90 text-lg leading-relaxed mb-8">
          Hotel-Living guests are not transient tourists. They are residents seeking consistency, 
          health, and comfort in their daily lives. Our meals model reflects this reality with 
          simple, nutritious, home-style cooking that becomes a reliable part of their routine.
        </p>
      </div>

      <Tabs defaultValue="costs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-purple-900/30">
          <TabsTrigger 
            value="costs" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Standard Economic Model
          </TabsTrigger>
          <TabsTrigger 
            value="calculator" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Build Your Own Model
          </TabsTrigger>
        </TabsList>

        <TabsContent value="costs">
          <DefaultCostsTab />
        </TabsContent>

        <TabsContent value="calculator">
          <RatesCalculatorTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
