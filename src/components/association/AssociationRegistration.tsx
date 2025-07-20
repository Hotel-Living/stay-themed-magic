
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Starfield } from '@/components/Starfield';

export const AssociationRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    responsibleName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    bankAccount: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TODO: Uncomment when authentication is implemented
      /*
      const { data, error } = await supabase
        .from('hotel_associations')
        .insert([
          {
            name: formData.name,
            responsible_name: formData.responsibleName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            description: formData.description,
            bank_account: formData.bankAccount
          }
        ]);

      if (error) throw error;
      */
      
      toast.success('Asociación registrada exitosamente');
      setFormData({
        name: '',
        responsibleName: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        bankAccount: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al registrar la asociación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <Starfield />
      
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          <Card className="glass-card border-blue-500/20 bg-slate-800/50 backdrop-blur-sm shadow-2xl shadow-blue-500/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Registro de Asociación
              </CardTitle>
              <p className="text-slate-300 text-sm">
                Registre su asociación para acceder al panel de gestión
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nombre de la Asociación
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ej: Asociación Marítima"
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibleName" className="text-white">
                    Nombre completo del responsable
                  </Label>
                  <Input
                    id="responsibleName"
                    type="text"
                    value={formData.responsibleName}
                    onChange={(e) => handleInputChange('responsibleName', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@asociacion.com"
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">
                    Dirección
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount" className="text-white">
                    IBAN o número de cuenta para comisiones
                  </Label>
                  <Input
                    id="bankAccount"
                    type="text"
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Descripción (opcional)
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-blue-400 focus:ring-blue-400/50 min-h-[80px]"
                    placeholder="Describa brevemente su asociación..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  {isLoading ? 'Registrando...' : 'Registrar Asociación'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
