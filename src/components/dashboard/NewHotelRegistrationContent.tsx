import React from 'react';
import { NewHotelRegistrationForm } from './hotel-registration/NewHotelRegistrationForm';
export const NewHotelRegistrationContent = () => {
  return <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D1B69] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          
          
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <NewHotelRegistrationForm />
        </div>
      </div>
    </div>;
};