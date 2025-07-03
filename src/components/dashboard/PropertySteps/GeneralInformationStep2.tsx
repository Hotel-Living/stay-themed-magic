
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface GeneralInformationStep2Props {
  onValidationChange?: (isValid: boolean) => void;
  formData?: any;
  updateFormData?: (field: string, value: any) => void;
}

export default function GeneralInformationStep2({
  onValidationChange = () => {},
  formData = {},
  updateFormData = () => {}
}: GeneralInformationStep2Props) {
  const { toast } = useToast();
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Fix infinite loop by properly managing state updates
  useEffect(() => {
    if (!hasInitialized) {
      // Initialize form data only once
      const requiredFields = [
        'idealGuests',
        'atmosphere', 
        'perfectLocation',
        'address',
        'postalCode',
        'contactName',
        'contactEmail',
        'contactPhone',
        'latitude',
        'longitude'
      ];
      
      let needsUpdate = false;
      const updates: Record<string, any> = {};
      
      requiredFields.forEach(field => {
        if (formData[field] === undefined) {
          updates[field] = '';
          needsUpdate = true;
        }
      });
      
      if (needsUpdate) {
        Object.keys(updates).forEach(field => {
          updateFormData(field, updates[field]);
        });
      }
      
      setHasInitialized(true);
    }
  }, [hasInitialized, updateFormData]);

  // Validate form without causing infinite loops
  useEffect(() => {
    if (hasInitialized) {
      const isValid = Boolean(
        formData.idealGuests &&
        formData.atmosphere &&
        formData.perfectLocation &&
        formData.address &&
        formData.city &&
        formData.country
      );
      
      onValidationChange(isValid);
    }
  }, [
    formData.idealGuests,
    formData.atmosphere,
    formData.perfectLocation,
    formData.address,
    formData.city,
    formData.country,
    hasInitialized,
    onValidationChange
  ]);

  const handleFieldChange = (field: string, value: string) => {
    updateFormData(field, value);
  };

  return (
    <div className="space-y-6 max-w-[80%]">
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          IDEAL PARA HUÉSPEDES QUE DISFRUTAN DE…
        </label>
        <textarea 
          placeholder="Describa a sus huéspedes ideales y sus intereses"
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[100px] bg-[#8a07b2]"
          value={formData.idealGuests || ''}
          onChange={(e) => handleFieldChange('idealGuests', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          EL AMBIENTE ES…
        </label>
        <textarea 
          placeholder="Describa el ambiente y la atmósfera de su hotel"
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[100px] bg-[#a505d4]"
          value={formData.atmosphere || ''}
          onChange={(e) => handleFieldChange('atmosphere', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          NUESTRA UBICACIÓN ES PERFECTA PARA…
        </label>
        <textarea 
          placeholder="Describa qué hace especial a su ubicación"
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[100px] bg-[#aa07da]"
          value={formData.perfectLocation || ''}
          onChange={(e) => handleFieldChange('perfectLocation', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          DIRECCIÓN COMPLETA
        </label>
        <input 
          type="text" 
          placeholder="Ingrese la dirección completa del hotel"
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#af09df]"
          value={formData.address || ''}
          onChange={(e) => handleFieldChange('address', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            CÓDIGO POSTAL
          </label>
          <input 
            type="text" 
            placeholder="Código postal"
            className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b10be0]"
            value={formData.postalCode || ''}
            onChange={(e) => handleFieldChange('postalCode', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            PERSONA DE CONTACTO
          </label>
          <input 
            type="text" 
            placeholder="Nombre del contacto"
            className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b10be0]"
            value={formData.contactName || ''}
            onChange={(e) => handleFieldChange('contactName', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            EMAIL DE CONTACTO
          </label>
          <input 
            type="email" 
            placeholder="email@hotel.com"
            className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b10be0]"
            value={formData.contactEmail || ''}
            onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            TELÉFONO DE CONTACTO
          </label>
          <input 
            type="tel" 
            placeholder="+34 123 456 789"
            className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b10be0]"
            value={formData.contactPhone || ''}
            onChange={(e) => handleFieldChange('contactPhone', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            LATITUD (Opcional)
          </label>
          <input 
            type="number" 
            step="any"
            placeholder="40.4168"
            className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b10be0]"
            value={formData.latitude || ''}
            onChange={(e) => handleFieldChange('latitude', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
            LONGITUD (Opcional)
          </label>
          <input 
            type="number" 
            step="any"
            placeholder="-3.7038"
            className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#b10be0]"
            value={formData.longitude || ''}
            onChange={(e) => handleFieldChange('longitude', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
