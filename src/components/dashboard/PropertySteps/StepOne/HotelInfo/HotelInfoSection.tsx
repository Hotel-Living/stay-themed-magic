
import React from "react";
import HotelNameInput from "./HotelNameInput";
import CategorySelector from "./CategorySelector";
import PropertyTypeSelector from "./PropertyTypeSelector";
import DescriptionInput from "./DescriptionInput";

interface HotelInfoSectionProps {
  formData: {
    hotelName: string;
    category: string;
    propertyType: string;
    style: string;
    description: string;
    idealGuests?: string;
    atmosphere?: string;
    perfectLocation?: string;
  };
  errors: {
    hotelName?: string;
    category?: string;
    propertyType?: string;
    style?: string;
    description?: string;
    idealGuests?: string;
    atmosphere?: string;
    perfectLocation?: string;
  };
  touchedFields: {
    hotelName: boolean;
    category: boolean;
    propertyType: boolean;
    style: boolean;
    description: boolean;
    idealGuests?: boolean;
    atmosphere?: boolean;
    perfectLocation?: boolean;
  };
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
}

export default function HotelInfoSection({
  formData,
  errors,
  touchedFields,
  handleChange,
  handleBlur
}: HotelInfoSectionProps) {
  const inputClassName = "w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da] text-white placeholder:text-white/50";
  const labelClassName = "block text-sm font-medium text-white uppercase mb-2";
  const sectionClassName = "mb-6"; // Consistent vertical spacing between sections

  return (
    <div className="glass-card rounded-xl p-6 space-y-6 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white mb-6">Hotel Information</h3>
      
      <div className="space-y-6">
        <div className={sectionClassName}>
          <HotelNameInput
            value={formData.hotelName}
            onChange={(value) => handleChange("hotelName", value)}
            onBlur={() => handleBlur("hotelName")}
            hasError={touchedFields.hotelName && !!errors.hotelName}
            errorMessage={errors.hotelName}
          />
        </div>
        
        <div className={sectionClassName}>
          <CategorySelector
            value={formData.category}
            onChange={(value) => handleChange("category", value)}
            onBlur={() => handleBlur("category")}
            hasError={touchedFields.category && !!errors.category}
            errorMessage={errors.category}
          />
        </div>
        
        <div className={sectionClassName}>
          <PropertyTypeSelector
            value={formData.propertyType}
            onChange={(value) => handleChange("propertyType", value)}
            onBlur={() => handleBlur("propertyType")}
            hasError={touchedFields.propertyType && !!errors.propertyType}
            errorMessage={errors.propertyType}
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            STYLE OF PROPERTY
          </label>
          <select 
            required 
            className={inputClassName}
            value={formData.style || ''}
            onChange={(e) => handleChange('style', e.target.value)}
            onBlur={() => handleBlur('style')}
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
        
        <div className={sectionClassName}>
          <DescriptionInput
            value={formData.description}
            onChange={(value) => handleChange("description", value)}
            onBlur={() => handleBlur("description")}
            hasError={touchedFields.description && !!errors.description}
            errorMessage={errors.description}
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            This hotel is ideal for guests who enjoy...
          </label>
          <textarea 
            placeholder="Describe your ideal guests and their interests" 
            className={inputClassName + " min-h-[80px]"}
            value={formData.idealGuests || ''}
            onChange={(e) => handleChange('idealGuests', e.target.value)}
            onBlur={() => handleBlur('idealGuests')}
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            The atmosphere at this hotel is...
          </label>
          <textarea 
            placeholder="Describe the atmosphere and ambiance of your hotel" 
            className={inputClassName + " min-h-[80px]"}
            value={formData.atmosphere || ''}
            onChange={(e) => handleChange('atmosphere', e.target.value)}
            onBlur={() => handleBlur('atmosphere')}
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            Our location is perfect for...
          </label>
          <textarea 
            placeholder="Describe what makes your location special" 
            className={inputClassName + " min-h-[80px]"}
            value={formData.perfectLocation || ''}
            onChange={(e) => handleChange('perfectLocation', e.target.value)}
            onBlur={() => handleBlur('perfectLocation')}
          />
        </div>
      </div>
    </div>
  );
}
