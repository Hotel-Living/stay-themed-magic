
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DefaultCostsTab } from "./DefaultCostsTab";
import { RatesCalculatorTab } from "./RatesCalculatorTab";

export const ModelRatesTabs: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          MODELUL DE MESE HOTEL-LIVING: SIMPLU, SĂNĂTOS, CASERNIC
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            PREDICTIBILITATE
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            RESPONSABILITATE
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            EFICIENȚĂ
          </span>
        </div>
        <p className="text-white/90 text-lg leading-relaxed mb-8">
          Oaspeții Hotel-Living nu sunt turiști tranzitorii. Sunt rezidenți care caută consistență, 
          sănătate și confort în viața lor zilnică. Modelul nostru de mese reflectă această realitate 
          cu gătit simplu, nutritiv și casnic care devine o parte de încredere a rutinei lor.
        </p>
      </div>

      <Tabs defaultValue="costs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-purple-900/30">
          <TabsTrigger 
            value="costs" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Modelul Economic Standard
          </TabsTrigger>
          <TabsTrigger 
            value="calculator" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Construiește-ți Propriul Model
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
