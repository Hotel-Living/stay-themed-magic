import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssociationHotelsTab } from './tabs/AssociationHotelsTab';
import { RegisteredHotelsTab } from './tabs/RegisteredHotelsTab';
import { CommissionsTab } from './tabs/CommissionsTab';
import { AccountTab } from './tabs/AccountTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';

export const AssociationDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Asociación</h1>
          <p className="text-slate-300">Gestione sus hoteles y comisiones</p>
        </div>

        <Card className="border-blue-500/20 bg-slate-800/50 backdrop-blur-sm shadow-2xl shadow-blue-500/10">
          <CardContent className="p-6">
            <Tabs defaultValue="hotels" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-slate-700/50">
                <TabsTrigger value="hotels" className="data-[state=active]:bg-blue-600">
                  Mis hoteles
                </TabsTrigger>
                <TabsTrigger value="registered" className="data-[state=active]:bg-blue-600">
                  Mis hoteles registrados
                </TabsTrigger>
                <TabsTrigger value="commissions" className="data-[state=active]:bg-blue-600">
                  Comisiones
                </TabsTrigger>
                <TabsTrigger value="account" className="data-[state=active]:bg-blue-600">
                  Mi cuenta
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
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