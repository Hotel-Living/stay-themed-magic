
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hotel, MapPin, Mail, Phone } from 'lucide-react';

export const RegisteredHotelsTab = () => {
  // Mock data - replace with actual data from Supabase
  const registeredHotels = [
    {
      id: 1,
      name: 'Hotel Example',
      city: 'Madrid',
      email: 'contact@hotel.com',
      phone: '+34 123 456 789',
      status: 'active',
      registrationDate: '2024-01-15'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-card border-blue-500/20 bg-slate-700/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Hotel className="w-5 h-5 text-blue-400" />
            Hoteles Registrados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {registeredHotels.length === 0 ? (
            <div className="text-center py-8">
              <Hotel className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No hay hoteles registrados aún</p>
            </div>
          ) : (
            <div className="space-y-4">
              {registeredHotels.map((hotel) => (
                <Card key={hotel.id} className="bg-slate-800/50 border-slate-600/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-semibold text-lg">{hotel.name}</h3>
                      <Badge 
                        variant={hotel.status === 'active' ? 'default' : 'secondary'}
                        className="bg-green-600/20 text-green-400 border-green-600/30"
                      >
                        Activo
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {hotel.city}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-4 h-4 text-blue-400" />
                        {hotel.email}
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        {hotel.phone}
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-slate-600/50">
                      <p className="text-xs text-slate-400">
                        Registrado el {new Date(hotel.registrationDate).toLocaleDateString()}
                      </p>
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
