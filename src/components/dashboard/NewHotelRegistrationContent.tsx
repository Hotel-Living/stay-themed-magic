
import React from 'react';
import { NewHotelRegistrationForm } from './hotel-registration/NewHotelRegistrationForm';

export const NewHotelRegistrationContent = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Add New Property</h1>
          <p className="text-muted-foreground">
            Register your hotel with our platform by completing the form below.
          </p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <NewHotelRegistrationForm />
        </div>
      </div>
    </div>
  );
};
