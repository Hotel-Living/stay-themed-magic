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
  const sectionClassName = "mb-6"; // Consistent vertical spacing between sections

  return <div className="glass-card rounded-xl p-6 space-y-6 bg-[#690695]/40">
      
      
      <div className="space-y-6">
        <div className={sectionClassName}>
          <HotelNameInput value={formData.hotelName} onChange={value => handleChange("hotelName", value)} onBlur={() => handleBlur("hotelName")} hasError={touchedFields.hotelName && !!errors.hotelName} errorMessage={errors.hotelName} />
        </div>
        
        <div className={sectionClassName}>
          <CategorySelector value={formData.category} onChange={value => handleChange("category", value)} onBlur={() => handleBlur("category")} hasError={touchedFields.category && !!errors.category} errorMessage={errors.category} />
        </div>
        
        <div className={sectionClassName}>
          <PropertyTypeSelector value={formData.propertyType} onChange={value => handleChange("propertyType", value)} onBlur={() => handleBlur("propertyType")} hasError={touchedFields.propertyType && !!errors.propertyType} errorMessage={errors.propertyType} />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('basicInfo.style')}
          </label>
          <select required className={inputClassName} value={formData.style || ''} onChange={e => handleChange('style', e.target.value)} onBlur={() => handleBlur('style')}>
            <option value="">{t('basicInfo.stylePlaceholder')}</option>
            <option value="classic">{t('styles.classic')}</option>
            <option value="classic-elegant">{t('styles.classicElegant')}</option>
            <option value="modern">{t('styles.modern')}</option>
            <option value="fusion">{t('styles.fusion')}</option>
            <option value="urban">{t('styles.urban')}</option>
            <option value="minimalist">{t('styles.minimalist')}</option>
            <option value="luxury">{t('styles.luxury')}</option>
          </select>
        </div>
        
        <div className={sectionClassName}>
          <DescriptionInput value={formData.description} onChange={value => handleChange("description", value)} onBlur={() => handleBlur("description")} hasError={touchedFields.description && !!errors.description} errorMessage={errors.description} />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('basicInfo.idealGuests')}
          </label>
          <textarea placeholder={t('basicInfo.idealGuestsPlaceholder')} className={inputClassName + " min-h-[80px]"} value={formData.idealGuests || ''} onChange={e => handleChange('idealGuests', e.target.value)} onBlur={() => handleBlur('idealGuests')} />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('basicInfo.atmosphere')}
          </label>
          <textarea placeholder={t('basicInfo.atmospherePlaceholder')} className={inputClassName + " min-h-[80px]"} value={formData.atmosphere || ''} onChange={e => handleChange('atmosphere', e.target.value)} onBlur={() => handleBlur('atmosphere')} />
        </div>

        <div className={sectionClassName}>
          <label className={labelClassName}>
            {t('basicInfo.perfectLocation')}
          </label>
          <textarea placeholder={t('basicInfo.perfectLocationPlaceholder')} className={inputClassName + " min-h-[80px]"} value={formData.perfectLocation || ''} onChange={e => handleChange('perfectLocation', e.target.value)} onBlur={() => handleBlur('perfectLocation')} />
        </div>
      </div>
    </div>;
}
