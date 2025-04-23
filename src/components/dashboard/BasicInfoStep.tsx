import React, { useEffect } from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";
import PicturesStep from "@/components/dashboard/PropertySteps/PicturesStep";

interface BasicInfoStepProps {
  formData: {
    hotelName?: string;
    propertyType?: string;
    description?: string;
    category?: string;
    style?: string;
    hotelImages?: UploadedImage[];
    mainImageUrl?: string;
  };
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function BasicInfoStep({ 
  formData = {},
  updateFormData = () => {},
  onValidationChange = () => {} 
}: BasicInfoStepProps) {
  // Validate step when necessary fields change
  useEffect(() => {
    const isValid = Boolean(formData.hotelName) && 
                    Boolean(formData.propertyType) && 
                    Boolean(formData.description);
    
    onValidationChange(isValid);
  }, [formData.hotelName, formData.propertyType, formData.description, onValidationChange]);

  return (
    <div className="space-y-5">
      {/* Add Pictures Section at the top */}
      <div>
        <PicturesStep 
          formData={formData}
          updateFormData={updateFormData}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          HOTEL NAME
        </label>
        <input 
          type="text" 
          placeholder="Enter hotel name" 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#8a07b2]" 
          value={formData.hotelName || ''}
          onChange={(e) => updateFormData('hotelName', e.target.value)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          CATEGORY
        </label>
        <select 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#a505d4]"
          value={formData.category || ''}
          onChange={(e) => updateFormData('category', e.target.value)}
        >
          <option value="">Select hotel category</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          TYPE OF PROPERTY
        </label>
        <select 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da]"
          value={formData.propertyType || ''}
          onChange={(e) => updateFormData('propertyType', e.target.value)}
        >
          <option value="">Select property type</option>
          <option value="hotel">Hotel</option>
          <option value="boutique">Hotel Boutique</option>
          <option value="resort">Resort</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase">
          STYLE OF PROPERTY
        </label>
        <select 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#af09df]"
          value={formData.style || ''}
          onChange={(e) => updateFormData('style', e.target.value)}
        >
          <option value="">Select property style</option>
          <option value="classic">Classic</option>
          <option value="classic-elegant">Classic Elegant</option>
          <option value="design">Design</option>
          <option value="modern">Modern</option>
          <option value="countryside">Countryside</option>
          <option value="urban">Urban</option>
          <option value="other">Other (Add New)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase bg-[#690695]">
          HOTEL DESCRIPTION
        </label>
        <textarea 
          placeholder="Enter a detailed description of your hotel" 
          required 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[120px] bg-[#b10be0]"
          value={formData.description || ''}
          onChange={(e) => updateFormData('description', e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
