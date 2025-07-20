import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Building2, Calendar, Euro, Users } from 'lucide-react';

// Mock data - will be replaced with real data from Supabase
const mockAnalytics = {
  totalHotels: 12,
  registeredHotels: 3,
  activeHotels: 2,
  totalCommissions: 487.50,
  thisMonthCommissions: 140.00,
  monthlyStats: [
    { month: 'Enero', hotels: 1, commissions: 85.50, bookings: 2 },
    { month: 'Febrero', hotels: 2, commissions: 142.00, bookings: 4 },
    { month: 'Marzo', hotels: 3, commissions: 260.00, bookings: 7 }
  ],
  topHotels: [
    { name: 'Hotel Maravilla', bookings: 8, commissions: 320.00 },
    { name: 'Hostal Costa Azul', bookings: 5, commissions: 167.50 }
  ]
};

export const AnalyticsTab = () => {
  const conversionRate = mockAnalytics.totalHotels > 0 
    ? ((mockAnalytics.registeredHotels / mockAnalytics.totalHotels) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-600 bg-gradient-to-br from-blue-900/40 to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Hoteles Totales</p>
                <p className="text-2xl font-bold text-white">{mockAnalytics.totalHotels}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-gradient-to-br from-green-900/40 to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Registrados</p>
                <p className="text-2xl font-bold text-white">{mockAnalytics.registeredHotels}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-gradient-to-br from-purple-900/40 to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Tasa Conversión</p>
                <p className="text-2xl font-bold text-white">{conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-gradient-to-br from-yellow-900/40 to-yellow-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <Euro className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Este Mes</p>
                <p className="text-2xl font-bold text-white">€{mockAnalytics.thisMonthCommissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Evolución Mensual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAnalytics.monthlyStats.map((stat, index) => (
              <div key={stat.month} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-white font-medium">{stat.month}</p>
                    <p className="text-sm text-slate-400">{stat.bookings} reservas</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Hoteles Registrados</p>
                    <p className="text-lg font-semibold text-white">{stat.hotels}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Comisiones</p>
                    <p className="text-lg font-semibold text-green-400">€{stat.commissions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Hotels */}
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Hoteles Más Activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnalytics.topHotels.map((hotel, index) => (
              <div key={hotel.name} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-blue-600">
                    #{index + 1}
                  </Badge>
                  <div>
                    <p className="text-white font-medium">{hotel.name}</p>
                    <p className="text-sm text-slate-400">{hotel.bookings} reservas totales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-400">€{hotel.commissions}</p>
                  <p className="text-xs text-slate-500">comisiones generadas</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-slate-600 bg-gradient-to-r from-slate-800 to-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Resumen General
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Rendimiento de la Asociación</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• {mockAnalytics.registeredHotels} hoteles activos generando comisiones</li>
                <li>• {((mockAnalytics.registeredHotels / mockAnalytics.totalHotels) * 100).toFixed(0)}% de tasa de conversión</li>
                <li>• €{mockAnalytics.totalCommissions} en comisiones totales</li>
              </ul>
            </div>
            
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-medium mb-2">Oportunidades de Mejora</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• {mockAnalytics.totalHotels - mockAnalytics.registeredHotels} hoteles sin registrar</li>
                <li>• Contactar hoteles de la lista para registro</li>
                <li>• Promover beneficios de la asociación</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};