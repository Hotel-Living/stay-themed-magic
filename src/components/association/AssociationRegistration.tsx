
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Starfield } from '@/components/Starfield';
import { PasswordField } from '@/components/auth/PasswordField';
import { validatePassword } from '@/utils/passwordValidation';

export const AssociationRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    responsibleName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.country || !formData.responsibleName) {
        toast.error('Por favor complete todos los campos requeridos');
        return;
      }

      // Validate password strength
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        toast.error('La contraseña no cumple con los requisitos de seguridad');
        return;
      }

      // Validate password confirmation
      if (formData.password !== formData.confirmPassword) {
        toast.error('Las contraseñas no coinciden');
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/panel-asociacion`,
          data: {
            full_name: formData.responsibleName,
            is_hotel_owner: false,
            association_name: formData.name,
            country: formData.country
          }
        }
      });

      if (authError) {
        console.error('Auth signup error:', authError);
        if (authError.message.includes('already registered')) {
          toast.error('Este email ya está registrado. Por favor use otro email o inicie sesión.');
        } else {
          toast.error(`Error en el registro: ${authError.message}`);
        }
        return;
      }

      if (!authData.user) {
        toast.error('Error al crear la cuenta de usuario');
        return;
      }

      console.log('User created successfully:', authData.user.id);

      // Insert association record
      const { data: associationData, error: associationError } = await supabase
        .from('hotel_associations')
        .insert({
          user_id: authData.user.id,
          association_name: formData.name,
          responsible_person: formData.responsibleName,
          email: formData.email,
          country: formData.country,
          status: 'pending'
        })
        .select()
        .single();

      if (associationError) {
        console.error('Association creation error:', associationError);
        toast.error('Error al registrar la asociación');
        return;
      }

      console.log('Association created successfully:', associationData);

      // Send confirmation email
      try {
        console.log('Attempting to send confirmation email...');
        const { data: emailData, error: emailError } = await supabase.functions.invoke(
          'send-association-confirmation',
          {
            body: {
              associationData: {
                name: formData.name,
                responsibleName: formData.responsibleName,
                email: formData.email,
                country: formData.country
              }
            }
          }
        );

        if (emailError) {
          console.error('Email function error:', emailError);
          toast.error('Registro exitoso, pero hubo un problema enviando el email de confirmación. Por favor contacte al soporte.');
        } else {
          console.log('Email sent successfully:', emailData);
          toast.success('¡Registro exitoso! Hemos enviado un email de confirmación a su dirección.');
        }
      } catch (emailErr) {
        console.error('Email sending failed:', emailErr);
        toast.error('Registro exitoso, pero no se pudo enviar el email de confirmación. Por favor contacte al soporte.');
      }

      // Reset form
      setFormData({
        name: '',
        responsibleName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: ''
      });

      // Show success message with next steps
      toast.success('¡Registro completado! Revise su email para confirmar su cuenta y acceder al panel de asociación.', {
        duration: 6000
      });

    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error('Error durante el registro. Por favor intente nuevamente.');
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

                <PasswordField
                  id="password"
                  label="Contraseña"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Crear una contraseña"
                  showPassword={showPassword}
                  toggleShowPassword={() => setShowPassword(!showPassword)}
                  showValidation={true}
                />

                <PasswordField
                  id="confirmPassword"
                  label="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirme su contraseña"
                  showPassword={showConfirmPassword}
                  toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                />

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
