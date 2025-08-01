import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

interface LoginFormProps {
  role: 'user' | 'hotel' | 'association' | 'promoter';
}

export function LoginForm({ role }: LoginFormProps) {
  const { t } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setMessage("❌ " + t('enterEmailPassword'));
      return;
    }
    
    try {
      setIsLoading(true);
      setMessage('');

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        console.error('Login error:', error);
        setMessage("❌ " + error.message);
        return;
      }

      // Direct redirect based on role using window.location.href
      switch(role) {
        case 'user': 
          window.location.href = '/user-dashboard';
          break;
        case 'hotel': 
          window.location.href = '/hotel-dashboard';
          break;
        case 'association': 
          window.location.href = '/panel-asociacion';
          break;
        case 'promoter': 
          window.location.href = '/promoter/dashboard';
          break;
        default:
          window.location.href = '/';
      }
    } catch (error: any) {
      setMessage("❌ " + (error.message || "An unexpected error occurred during login"));
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleDisplayName = () => {
    switch (role) {
      case 'user': return t('createUserAccount').replace('Create ', '').replace('Crear cuenta como ', '').replace('Creează Cont ca ', '').replace('Criar Conta de ', '');
      case 'hotel': return t('createHotelAccount').replace('Hotel Registration', 'Hotel Partner').replace('Registro de Hotel', 'Socio Hotelero').replace('Înregistrare Hotel', 'Partener Hotelier').replace('Registro de Hotel', 'Parceiro Hoteleiro');
      case 'association': return t('createAssociationAccount').replace('Association Registration', 'Association').replace('Registro de Asociación', 'Asociación').replace('Înregistrare Asociație', 'Asociație').replace('Registro de Associação', 'Associação');
      case 'promoter': return t('createPromoterAccount').replace('Promoter Registration', 'Promoter').replace('Registro de Promotor', 'Promotor').replace('Înregistrare Promotor', 'Promotor').replace('Registro de Promotor', 'Promotor');
      default: return t('createUserAccount').replace('Create ', '').replace('Crear cuenta como ', '').replace('Creează Cont ca ', '').replace('Criar Conta de ', '');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <Label htmlFor="email" className="text-[#7E26A6] text-sm sm:text-base font-semibold">{t('email')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-white text-[#7E26A6] border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6] placeholder:text-gray-400"
        />
      </div>
      
      <div>
        <Label htmlFor="password" className="text-[#7E26A6] text-sm sm:text-base font-semibold">{t('password')}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={formData.password}
          onChange={handleInputChange}
          className="bg-white text-[#7E26A6] border-gray-300 focus:border-[#7E26A6] focus:ring-[#7E26A6] placeholder:text-gray-400"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#7E26A6] hover:bg-[#5D0080] text-white font-bold py-2 sm:py-3 rounded-lg shadow-[0_0_15px_rgba(126,38,166,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(126,38,166,0.5)] text-sm sm:text-base"
        disabled={isLoading}
      >
        {isLoading ? t('signingIn') : `${t('signInAs')} ${getRoleDisplayName()}`}
      </Button>
      
      {message && (
        <p className="text-center text-sm text-gray-600">{message}</p>
      )}

      <p className="text-center text-xs sm:text-sm text-gray-600">
        {t('dontHaveAccount')}{' '}
        <a 
          href={`/signup/${role}`} 
          className="text-[#7E26A6] hover:underline"
        >
          {t('createOneHere')}
        </a>
      </p>
    </form>
  );
}