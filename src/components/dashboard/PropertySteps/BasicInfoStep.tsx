
import React, { useEffect } from "react";
import { UploadedImage } from "@/hooks/usePropertyImages";
import PicturesStep from "./PicturesStep";

interface BasicInfoStepProps {
  formData: {
    hotelName?: string;
    propertyType?: string;
    description?: string;
    category?: string;
    style?: string;
    hotelImages?: UploadedImage[];
    mainImageUrl?: string;
    idealGuests?: string;
    atmosphere?: string;
    perfectLocation?: string;
  };
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export default function BasicInfoStep({ 
  formData = {},
  updateFormData = () => {},
  onValidationChange = () => {} 
}: BasicInfoStepProps) {
  useEffect(() => {
    const hasImages = formData.hotelImages && formData.hotelImages.length > 0;
    
    const isValid = Boolean(formData.hotelName) && 
                    Boolean(formData.propertyType) && 
                    Boolean(formData.description) &&
                    hasImages;
    
    console.log("BasicInfoStep validation:", {
      hotelName: Boolean(formData.hotelName),
      propertyType: Boolean(formData.propertyType),
      description: Boolean(formData.description),
      hasImages: hasImages,
      imageCount: formData.hotelImages?.length || 0,
      isValid: isValid
    });
    
    onValidationChange(isValid);
  }, [formData.hotelName, formData.propertyType, formData.description, formData.hotelImages, onValidationChange]);

  return (
    <div className="space-y-5 max-w-[80%]">
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
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da]"
          value={formData.style || ''}
          onChange={(e) => updateFormData('style', e.target.value)}
        >
          <option value="">Select property style</option>
          <option value="classic">Classic</option>
          <option value="classic-elegant">Classic Elegant</option>
          <option value="modern">Modern</option>
          <option value="fusion">Fusion</option>
          <option value="urban">Urban</option>
          <option value="minimalist">Minimalist</option>
          <option value="luxury">Luxury</option>
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

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase bg-[#690695]">
          This hotel is ideal for guests who enjoy...
        </label>
        <textarea 
          placeholder="Describe your ideal guests and their interests" 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[80px] bg-[#b10be0]"
          value={formData.idealGuests || ''}
          onChange={(e) => updateFormData('idealGuests', e.target.value)}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase bg-[#690695]">
          The atmosphere at this hotel is...
        </label>
        <textarea 
          placeholder="Describe the atmosphere and ambiance of your hotel" 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[80px] bg-[#b10be0]"
          value={formData.atmosphere || ''}
          onChange={(e) => updateFormData('atmosphere', e.target.value)}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground/90 mb-1 uppercase bg-[#690695]">
          Our location is perfect for...
        </label>
        <textarea 
          placeholder="Describe what makes your location special" 
          className="w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 min-h-[80px] bg-[#b10be0]"
          value={formData.perfectLocation || ''}
          onChange={(e) => updateFormData('perfectLocation', e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
