
import React from 'react';
import { NewHotelRegistrationForm } from './hotel-registration/NewHotelRegistrationForm';

export const NewHotelRegistrationContent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D1B69] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            👉 Nuevo Sistema de Registro de Hoteles
          </h1>
          <p className="text-white/70 text-lg">
            Sistema de registro completo con 19 secciones de información
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <NewHotelRegistrationForm />
        </div>
      </div>
    </div>
  );
};
