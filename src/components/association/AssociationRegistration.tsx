
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Starfield } from '@/components/Starfield';

export const AssociationRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    responsibleName: '',
    email: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.country || !formData.responsibleName) {
        toast.error('Por favor complete todos los campos requeridos');
        return;
      }

      // Create user account with temporary password
      const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: tempPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/panel-asociacion`,
          data: {
            association_name: formData.name,
            responsible_person: formData.responsibleName,
            country: formData.country
          }
        }
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          toast.error('Esta dirección de email ya está registrada');
        } else if (authError.message.includes('For security purposes') || authError.message.includes('429')) {
          toast.error('Demasiadas solicitudes. Por favor, espere un momento e intente nuevamente.');
        } else {
          toast.error('Error al crear la cuenta: ' + authError.message);
        }
        return;
      }

      if (!authData.user) {
        toast.error('Error al crear la cuenta de usuario');
        return;
      }

      // Insert association data
      const { data, error } = await supabase
        .from('hotel_associations')
        .insert([
          {
            user_id: authData.user.id,
            association_name: formData.name,
            responsible_person: formData.responsibleName,
            email: formData.email,
            country: formData.country
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email
      try {
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-association-confirmation', {
          body: { record: data },
        });
        
        if (emailError) {
          console.warn('Failed to send confirmation email:', emailError);
        }
      } catch (emailError) {
        console.warn('Error sending confirmation email:', emailError);
      }
      
      toast.success('Asociación registrada exitosamente. Revise su email para confirmar la cuenta.');
      setFormData({
        name: '',
        responsibleName: '',
        email: '',
        country: ''
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Error al registrar la asociación: ' + (error.message || 'Error desconocido'));
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
          <Card className="bg-[#7E00B3]/90 backdrop-blur-sm border-none shadow-[0_0_60px_rgba(0,200,255,0.8),0_0_120px_rgba(0,200,255,0.4),0_0_180px_rgba(0,200,255,0.2)]">
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
                  <Label htmlFor="country" className="text-white">
                    País *
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/50">
                      <SelectValue placeholder="Seleccione su país" />
                    </SelectTrigger>
                     <SelectContent className="bg-white border-gray-200">
                       <SelectItem value="Argentina" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">Argentina</SelectItem>
                       <SelectItem value="Brasil" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">Brasil</SelectItem>
                       <SelectItem value="Chile" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">Chile</SelectItem>
                       <SelectItem value="Colombia" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">Colombia</SelectItem>
                       <SelectItem value="España" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">España</SelectItem>
                       <SelectItem value="México" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">México</SelectItem>
                       <SelectItem value="Perú" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">Perú</SelectItem>
                       <SelectItem value="Uruguay" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">Uruguay</SelectItem>
                       <SelectItem value="Otro" className="hover:bg-[#7E26A6] hover:text-white focus:bg-[#7E26A6] focus:text-white data-[highlighted]:bg-[#7E26A6] data-[highlighted]:text-white">Otro</SelectItem>
                     </SelectContent>
                  </Select>
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
