
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Euro, Calendar, TrendingUp } from 'lucide-react';

export const CommissionsTab = () => {
  // Mock data - replace with actual data from Supabase
  const commissions = [
    {
      id: 1,
      hotelName: 'Hotel Example',
      amount: 150.00,
      bookingDate: '2024-01-20',
      status: 'paid',
      bookingReference: 'BK001'
    }
  ];

  const totalCommissions = commissions.reduce((sum, commission) => sum + commission.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Euro className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Comisiones</p>
                <p className="text-white font-bold text-xl">{totalCommissions.toFixed(2)}€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Este Mes</p>
                <p className="text-white font-bold text-xl">{totalCommissions.toFixed(2)}€</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Reservas</p>
                <p className="text-white font-bold text-xl">{commissions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commissions List */}
      <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Euro className="w-5 h-5 text-blue-400" />
            Historial de Comisiones
          </CardTitle>
        </CardHeader>
        <CardContent>
          {commissions.length === 0 ? (
            <div className="text-center py-8">
              <Euro className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No hay comisiones registradas aún</p>
            </div>
          ) : (
            <div className="space-y-4">
              {commissions.map((commission) => (
                <Card key={commission.id} className="bg-slate-800/50 border-slate-600/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{commission.hotelName}</h3>
                        <p className="text-slate-400 text-sm">Ref: {commission.bookingReference}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{commission.amount.toFixed(2)}€</p>
                        <Badge 
                          variant={commission.status === 'paid' ? 'default' : 'secondary'}
                          className="bg-green-600/20 text-green-400 border-green-600/30"
                        >
                          Pagado
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-400">
                      Fecha de reserva: {new Date(commission.bookingDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
