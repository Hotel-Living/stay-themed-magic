
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssociationHotelsTab } from './tabs/AssociationHotelsTab';
import { RegisteredHotelsTab } from './tabs/RegisteredHotelsTab';
import { CommissionsTab } from './tabs/CommissionsTab';
import { AccountTab } from './tabs/AccountTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { Starfield } from '@/components/Starfield';

export const AssociationDashboard = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7801AA 0%, #4c1d95 50%, #7801AA 100%)' }}>
      {/* Enhanced Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-pink-400/25 rounded-full blur-2xl animate-pulse delay-500"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-400/25 rounded-full blur-2xl animate-pulse delay-700"></div>
      
      <Starfield />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">Panel de Asociación</h1>
          <p className="text-slate-300 text-center text-lg">Gestione sus hoteles y comisiones</p>
        </div>

        <Card className="glass-card border-blue-500/20 bg-slate-800/50 backdrop-blur-sm shadow-2xl shadow-blue-500/10">
          <CardContent className="p-6">
            <Tabs defaultValue="hotels" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-700/50 border border-blue-500/20">
                <TabsTrigger 
                  value="hotels" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Mis hoteles
                </TabsTrigger>
                <TabsTrigger 
                  value="registered" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Mis hoteles registrados
                </TabsTrigger>
                <TabsTrigger 
                  value="commissions" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Comisiones
                </TabsTrigger>
                <TabsTrigger 
                  value="account" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Mi cuenta
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300 hover:text-white transition-colors"
                >
                  Analíticas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hotels" className="mt-6">
                <AssociationHotelsTab />
              </TabsContent>

              <TabsContent value="registered" className="mt-6">
                <RegisteredHotelsTab />
              </TabsContent>

              <TabsContent value="commissions" className="mt-6">
                <CommissionsTab />
              </TabsContent>

              <TabsContent value="account" className="mt-6">
                <AccountTab />
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <AnalyticsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
