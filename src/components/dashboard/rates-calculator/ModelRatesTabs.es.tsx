
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DefaultCostsTab } from "./DefaultCostsTab";
import { RatesCalculatorTab } from "./RatesCalculatorTab";

export const ModelRatesTabs: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          EL MODELO DE COMIDAS DE HOTEL-LIVING: SIMPLE, SALUDABLE, CASERO
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            PREDICTABILIDAD
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            RESPONSABILIDAD
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            EFICIENCIA
          </span>
        </div>
        <p className="text-white/90 text-lg leading-relaxed mb-8">
          Los huéspedes de Hotel-Living no son turistas transitorios. Son residentes que buscan 
          consistencia, salud y comodidad en sus vidas diarias. Nuestro modelo de comidas refleja 
          esta realidad con cocina simple, nutritiva y casera que se convierte en una parte 
          confiable de su rutina.
        </p>
      </div>

      <Tabs defaultValue="costs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-purple-900/30">
          <TabsTrigger 
            value="costs" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Modelo Económico Estándar
          </TabsTrigger>
          <TabsTrigger 
            value="calculator" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Cree su Propio Modelo
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
