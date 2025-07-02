
import React from "react";
import HotelNameInput from "./HotelNameInput";
import CategorySelector from "./CategorySelector";
import PropertyTypeSelector from "./PropertyTypeSelector";
import DescriptionInput from "./DescriptionInput";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  
  const inputClassName = "w-full p-2.5 rounded-lg border border-fuchsia-800/30 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 bg-[#aa07da] text-white placeholder:text-white/50";
  const labelClassName = "block text-sm font-medium text-white uppercase mb-2";
  const sectionClassName = "mb-6";

  return (
    <div className="glass-card rounded-xl p-6 space-y-6 bg-[#690695]/40">
      <div className="space-y-6">
        <div className={sectionClassName}>
          <HotelNameInput 
            value={formData.hotelName} 
            onChange={value => handleChange("hotelName", value)} 
            onBlur={() => handleBlur("hotelName")} 
            hasError={touchedFields.hotelName && !!errors.hotelName} 
            errorMessage={errors.hotelName} 
          />
        </div>
        
        <div className={sectionClassName}>
          <CategorySelector 
            value={formData.category} 
            onChange={value => handleChange("category", value)} 
            onBlur={() => handleBlur("category")} 
            hasError={touchedFields.category && !!errors.category} 
            errorMessage={errors.category} 
          />
        </div>
        
        <div className={sectionClassName}>
          <PropertyTypeSelector 
            value={formData.propertyType} 
            onChange={value => handleChange("propertyType", value)} 
            onBlur={() => handleBlur("propertyType")} 
            hasError={touchedFields.propertyType && !!errors.propertyType} 
            errorMessage={errors.propertyType} 
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('dashboard.styleOfProperty')}
          </label>
          <select 
            required 
            className={inputClassName} 
            value={formData.style || ''} 
            onChange={e => handleChange('style', e.target.value)} 
            onBlur={() => handleBlur('style')}
          >
            <option value="">{t('dashboard.selectPropertyStyle')}</option>
            <option value="classic">{t('dashboard.propertyStyles.classic')}</option>
            <option value="classicElegant">{t('dashboard.propertyStyles.classicElegant')}</option>
            <option value="modern">{t('dashboard.propertyStyles.modern')}</option>
            <option value="fusion">{t('dashboard.propertyStyles.fusion')}</option>
            <option value="urban">{t('dashboard.propertyStyles.urban')}</option>
            <option value="rural">{t('dashboard.propertyStyles.rural')}</option>
            <option value="minimalist">{t('dashboard.propertyStyles.minimalist')}</option>
            <option value="luxury">{t('dashboard.propertyStyles.luxury')}</option>
          </select>
        </div>
        
        <div className={sectionClassName}>
          <DescriptionInput 
            value={formData.description} 
            onChange={value => handleChange("description", value)} 
            onBlur={() => handleBlur("description")} 
            hasError={touchedFields.description && !!errors.description} 
            errorMessage={errors.description} 
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('dashboard.idealGuestsEnjoy')}
          </label>
          <textarea 
            placeholder={t('dashboard.idealGuestsPlaceholder')} 
            className={inputClassName + " min-h-[80px]"} 
            value={formData.idealGuests || ''} 
            onChange={e => handleChange('idealGuests', e.target.value)} 
            onBlur={() => handleBlur('idealGuests')} 
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('dashboard.atmosphereIs')}
          </label>
          <textarea 
            placeholder={t('dashboard.atmospherePlaceholder')} 
            className={inputClassName + " min-h-[80px]"} 
            value={formData.atmosphere || ''} 
            onChange={e => handleChange('atmosphere', e.target.value)} 
            onBlur={() => handleBlur('atmosphere')} 
          />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('dashboard.locationPerfectFor')}
          </label>
          <textarea 
            placeholder={t('dashboard.locationPlaceholder')} 
            className={inputClassName + " min-h-[80px]"} 
            value={formData.perfectLocation || ''} 
            onChange={e => handleChange('perfectLocation', e.target.value)} 
            onBlur={() => handleBlur('perfectLocation')} 
          />
        </div>
      </div>
    </div>
  );
}
