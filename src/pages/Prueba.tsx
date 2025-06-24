
import React, { useState } from "react";
import PruebaLayout from "@/components/prueba/PruebaLayout";
import PruebaHotels from "@/components/prueba/PruebaHotels";
import PruebaAffinities from "@/components/prueba/PruebaAffinities";
import PruebaFilters from "@/components/prueba/PruebaFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Prueba() {
  const [activeTab, setActiveTab] = useState("hotels");

  return (
    <PruebaLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">PRUEBA ADMIN PANEL</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-purple-900/20 border border-purple-800/30">
            <TabsTrigger value="hotels" className="data-[state=active]:bg-purple-700">
              Hotels
            </TabsTrigger>
            <TabsTrigger value="affinities" className="data-[state=active]:bg-purple-700">
              Affinities
            </TabsTrigger>
            <TabsTrigger value="filters" className="data-[state=active]:bg-purple-700">
              Filters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hotels">
            <PruebaHotels />
          </TabsContent>

          <TabsContent value="affinities">
            <PruebaAffinities />
          </TabsContent>

          <TabsContent value="filters">
            <PruebaFilters />
          </TabsContent>
        </Tabs>
      </div>
    </PruebaLayout>
  );
}
