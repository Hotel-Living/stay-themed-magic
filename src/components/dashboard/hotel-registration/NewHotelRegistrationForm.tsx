import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Temporary type export to fix build errors
export type HotelRegistrationFormData = any;

export const NewHotelRegistrationForm = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    console.log('BUTTON CLICKED!', new Date().toISOString());
    setButtonClicked(true);
    setClickCount(prev => prev + 1);
    alert('¡BOTÓN FUNCIONA! Click #' + (clickCount + 1));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Test Simple Button</h1>
        
        {buttonClicked && (
          <div className="mb-6 p-4 rounded-lg border-2 bg-green-50 border-green-200 text-green-800">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-semibold">¡Botón funciona perfectamente! Clicks: {clickCount}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <p>Si este botón no funciona, hay un problema más profundo.</p>
          
          <Button 
            onClick={handleClick}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
          >
            CLICK AQUÍ - TEST SIMPLE
          </Button>
          
          <p className="text-sm text-gray-600">
            Este botón debería: 1) Mostrar alert, 2) Mostrar mensaje verde, 3) Console log
          </p>
        </div>
      </div>
    </div>
  );
};