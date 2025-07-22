
import React from 'react';
import { NewHotelRegistrationForm } from './hotel-registration/NewHotelRegistrationForm';

export const NewHotelRegistrationContent = () => {
  return (
    <div className="min-h-screen p-6 py-0 px-0" style={{ backgroundColor: '#670193' }}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          
          
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 px-0 py-0">
          <NewHotelRegistrationForm />
        </div>
      </div>
    </div>
  );
};
