
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssociationHotelsTab } from './tabs/AssociationHotelsTab';
import { RegisteredHotelsTab } from './tabs/RegisteredHotelsTab';
import { CommissionsTab } from './tabs/CommissionsTab';
import { AccountTab } from './tabs/AccountTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { Starfield } from '@/components/Starfield';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const AssociationDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen relative">
        <Starfield />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 text-center">Panel de Asociación</h1>
            <p className="text-slate-300 text-center text-lg">Gestione sus hoteles y comisiones</p>
          </div>

          <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
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
      <Footer />
    </>
  );
};
