
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Users, Euro } from 'lucide-react';

export const AnalyticsTab = () => {
  // Mock data for charts
  const monthlyData = [
    { month: 'Ene', reservas: 12, comisiones: 1800 },
    { month: 'Feb', reservas: 19, comisiones: 2850 },
    { month: 'Mar', reservas: 15, comisiones: 2250 },
    { month: 'Abr', reservas: 22, comisiones: 3300 },
    { month: 'May', reservas: 18, comisiones: 2700 },
    { month: 'Jun', reservas: 25, comisiones: 3750 }
  ];

  const hotelPerformance = [
    { name: 'Hotel Madrid', reservas: 45, color: '#3B82F6' },
    { name: 'Hotel Barcelona', reservas: 32, color: '#8B5CF6' },
    { name: 'Hotel Valencia', reservas: 28, color: '#06B6D4' },
    { name: 'Hotel Sevilla', reservas: 22, color: '#10B981' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Reservas Totales</p>
                <p className="text-white font-bold text-xl">127</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <Euro className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Comisiones</p>
                <p className="text-white font-bold text-xl">16,650€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Hoteles Activos</p>
                <p className="text-white font-bold text-xl">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-600/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Crecimiento</p>
                <p className="text-white font-bold text-xl">+12%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Rendimiento Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #3B82F6', 
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
                <Line type="monotone" dataKey="reservas" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="comisiones" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hotel Performance */}
        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Rendimiento por Hotel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={hotelPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="reservas"
                >
                  {hotelPerformance.map((entry, index) => (
                    <Cell key={`chart-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #3B82F6', 
                    borderRadius: '8px',
                    color: '#FFFFFF'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {hotelPerformance.map((hotel, index) => (
                <div key={`legend-${index}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: hotel.color }}
                    ></div>
                    <span className="text-white">{hotel.name}</span>
                  </div>
                  <span className="text-slate-400">{hotel.reservas} reservas</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
