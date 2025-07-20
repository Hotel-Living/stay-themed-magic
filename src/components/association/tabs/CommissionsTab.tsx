import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Euro, Calendar, Building2, Filter, TrendingUp } from 'lucide-react';

// Mock data - will be replaced with real data from Supabase
const mockCommissions = [
  {
    id: '1',
    hotel_name: 'Hotel Maravilla',
    booking_date: '2024-03-15',
    booking_total: 1200,
    commission_amount: 48,
    commission_rate: 0.04,
    status: 'paid',
    payment_date: '2024-04-01'
  },
  {
    id: '2',
    hotel_name: 'Hostal Costa Azul',
    booking_date: '2024-03-20',
    booking_total: 800,
    commission_amount: 32,
    commission_rate: 0.04,
    status: 'pending',
    payment_date: null
  },
  {
    id: '3',
    hotel_name: 'Hotel Maravilla',
    booking_date: '2024-03-25',
    booking_total: 1500,
    commission_amount: 60,
    commission_rate: 0.04,
    status: 'pending',
    payment_date: null
  }
];

export const CommissionsTab = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [hotelFilter, setHotelFilter] = useState('all');

  const filteredCommissions = mockCommissions.filter(commission => {
    if (statusFilter !== 'all' && commission.status !== statusFilter) return false;
    if (hotelFilter !== 'all' && commission.hotel_name !== hotelFilter) return false;
    return true;
  });

  const totalPending = mockCommissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.commission_amount, 0);

  const totalPaid = mockCommissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.commission_amount, 0);

  const totalEarned = totalPending + totalPaid;

  const uniqueHotels = [...new Set(mockCommissions.map(c => c.hotel_name))];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-600 bg-gradient-to-br from-blue-900/40 to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Ganado</p>
                <p className="text-2xl font-bold text-white">€{totalEarned.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-gradient-to-br from-green-900/40 to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Euro className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Pagado</p>
                <p className="text-2xl font-bold text-white">€{totalPaid.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-gradient-to-br from-yellow-900/40 to-yellow-800/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-600 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Pendiente</p>
                <p className="text-2xl font-bold text-white">€{totalPending.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Estado</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="paid">Pagado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Hotel</label>
              <Select value={hotelFilter} onValueChange={setHotelFilter}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los hoteles</SelectItem>
                  {uniqueHotels.map(hotel => (
                    <SelectItem key={hotel} value={hotel}>{hotel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter('all');
                  setHotelFilter('all');
                }}
                className="bg-slate-800 border-slate-600 text-white"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commissions List */}
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white">
            Historial de Comisiones ({filteredCommissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCommissions.length === 0 ? (
            <div className="text-center py-8">
              <Euro className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No hay comisiones que mostrar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCommissions.map((commission) => (
                <Card key={commission.id} className="border-slate-600 bg-slate-800/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-slate-400" />
                          <span className="text-white font-medium">{commission.hotel_name}</span>
                          <Badge 
                            variant={commission.status === 'paid' ? 'default' : 'secondary'}
                            className={commission.status === 'paid' ? 'bg-green-600' : 'bg-yellow-600'}
                          >
                            {commission.status === 'paid' ? 'Pagado' : 'Pendiente'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>Reserva: €{commission.booking_total}</span>
                          <span>Fecha: {new Date(commission.booking_date).toLocaleDateString('es-ES')}</span>
                          {commission.payment_date && (
                            <span>Pagado: {new Date(commission.payment_date).toLocaleDateString('es-ES')}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">
                          €{commission.commission_amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {(commission.commission_rate * 100)}% comisión
                        </p>
                      </div>
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