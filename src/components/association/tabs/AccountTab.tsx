import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, CreditCard, Lock, Save } from 'lucide-react';

// Mock data - will be replaced with real data from Supabase
const mockAssociationData = {
  association_name: 'Asociación Marítima Mediterránea',
  association_code: 'ASOCIAMARI',
  responsible_person: 'María García López',
  email: 'admin@asociacionmaritima.es',
  bank_account: 'ES91 2100 0418 4502 0005 1332'
};

export const AccountTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    responsible_person: mockAssociationData.responsible_person,
    email: mockAssociationData.email,
    bank_account: mockAssociationData.bank_account,
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Here we would update the association data in Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Éxito",
        description: "Datos actualizados correctamente"
      });
      
      setIsEditing(false);
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al actualizar los datos",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      responsible_person: mockAssociationData.responsible_person,
      email: mockAssociationData.email,
      bank_account: mockAssociationData.bank_account,
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Association Information */}
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Información de la Asociación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-400">Nombre de la Asociación</Label>
              <div className="mt-1 p-3 bg-slate-800 rounded-lg border border-slate-600">
                <p className="text-white">{mockAssociationData.association_name}</p>
                <p className="text-xs text-slate-500 mt-1">Solo lectura</p>
              </div>
            </div>

            <div>
              <Label className="text-slate-400">Código de Asociación</Label>
              <div className="mt-1 p-3 bg-slate-800 rounded-lg border border-slate-600">
                <p className="text-white font-mono text-lg">{mockAssociationData.association_code}</p>
                <p className="text-xs text-slate-500 mt-1">Código único para hoteles</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Information */}
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Datos de Contacto
            </CardTitle>
            {!isEditing && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="bg-slate-800 border-slate-600 text-white"
              >
                Editar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="responsible_person" className="text-slate-400">
              Persona Responsable
            </Label>
            <Input
              id="responsible_person"
              name="responsible_person"
              value={formData.responsible_person}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 bg-slate-800 border-slate-600 text-white disabled:opacity-60"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-slate-400">
              Email de Contacto
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 bg-slate-800 border-slate-600 text-white disabled:opacity-60"
            />
          </div>
        </CardContent>
      </Card>

      {/* Bank Account */}
      <Card className="border-slate-600 bg-slate-700/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Cuenta Bancaria para Comisiones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="bank_account" className="text-slate-400">
              IBAN o Número de Cuenta
            </Label>
            <Input
              id="bank_account"
              name="bank_account"
              value={formData.bank_account}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mt-1 bg-slate-800 border-slate-600 text-white disabled:opacity-60"
              placeholder="ES91 2100 0418 4502 0005 1332"
            />
            <p className="text-xs text-slate-500 mt-2">
              Las comisiones se pagarán mensualmente a esta cuenta
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Password Change */}
      {isEditing && (
        <Card className="border-slate-600 bg-slate-700/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Cambiar Contraseña (Opcional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current_password" className="text-slate-400">
                Contraseña Actual
              </Label>
              <Input
                id="current_password"
                name="current_password"
                type="password"
                value={formData.current_password}
                onChange={handleInputChange}
                className="mt-1 bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="new_password" className="text-slate-400">
                Nueva Contraseña
              </Label>
              <Input
                id="new_password"
                name="new_password"
                type="password"
                value={formData.new_password}
                onChange={handleInputChange}
                className="mt-1 bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="confirm_password" className="text-slate-400">
                Confirmar Nueva Contraseña
              </Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                className="mt-1 bg-slate-800 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-slate-800 border-slate-600 text-white"
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};