import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Mail, Calendar } from 'lucide-react';

// Mock data - will be replaced with real data from Supabase
const mockRegisteredHotels = [
  {
    id: '1',
    name: 'Hotel Maravilla',
    city: 'Barcelona',
    contact_email: 'info@hotelmaravilla.com',
    registered_date: '2024-01-15',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Hostal Costa Azul',
    city: 'Valencia',
    contact_email: 'reservas@costaazul.es',
    registered_date: '2024-02-20',
    status: 'pending'
  }
];

export const RegisteredHotelsTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Hoteles Registrados Independientemente
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Hoteles que se registraron en Hotel Living y proporcionaron el código de su asociación
          </p>
        </CardHeader>
        <CardContent>
          {mockRegisteredHotels.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No hay hoteles registrados aún</p>
              <p className="text-sm text-slate-500 mt-2">
                Los hoteles aparecerán aquí cuando se registren con su código de asociación
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockRegisteredHotels.map((hotel) => (
                <Card key={hotel.id} className="border-slate-600 bg-slate-800/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-semibold">{hotel.name}</h3>
                          <Badge 
                            variant={hotel.status === 'approved' ? 'default' : 'secondary'}
                            className={hotel.status === 'approved' ? 'bg-green-600' : 'bg-yellow-600'}
                          >
                            {hotel.status === 'approved' ? 'Aprobado' : 'Pendiente'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {hotel.city}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {hotel.contact_email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Registrado: {new Date(hotel.registered_date).toLocaleDateString('es-ES')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">Información Importante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-white font-medium mb-1">Código de Asociación</p>
              <p className="text-sm text-slate-300">
                Los hoteles deben introducir el código de su asociación en su panel para aparecer aquí
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-white font-medium mb-1">Generación de Comisiones</p>
              <p className="text-sm text-slate-300">
                Solo los hoteles que aparecen en esta lista generan comisiones del 4% de sus reservas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};