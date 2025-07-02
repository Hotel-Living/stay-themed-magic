
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DefaultCostsTab } from "./DefaultCostsTab";
import { RatesCalculatorTab } from "./RatesCalculatorTab";

export const ModelRatesTabs: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          O MODELO DE REFEIÇÕES DO HOTEL-LIVING: SIMPLES, SAUDÁVEL, CASEIRO
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            PREVISIBILIDADE
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            RESPONSABILIDADE
          </span>
          <span className="bg-fuchsia-600 text-white px-4 py-2 rounded-full font-semibold">
            EFICIÊNCIA
          </span>
        </div>
        <p className="text-white/90 text-lg leading-relaxed mb-8">
          Os hóspedes do Hotel-Living não são turistas transitórios. São residentes que buscam 
          consistência, saúde e conforto em suas vidas diárias. Nosso modelo de refeições reflete 
          essa realidade com culinária simples, nutritiva e caseira que se torna uma parte 
          confiável de sua rotina.
        </p>
      </div>

      <Tabs defaultValue="costs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-purple-900/30">
          <TabsTrigger 
            value="costs" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Modelo Econômico Padrão
          </TabsTrigger>
          <TabsTrigger 
            value="calculator" 
            className="data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white"
          >
            Crie Seu Próprio Modelo
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
