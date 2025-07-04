
import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from '@/hooks/useTranslation';
import { useCountriesData } from '@/hooks/useCountriesData';

interface NewStep1HotelInfoProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
  isAdmin: boolean;
}

export const NewStep1HotelInfo: React.FC<NewStep1HotelInfoProps> = ({
  formData,
  updateFormData,
  onValidationChange,
  isAdmin
}) => {
  const { t } = useTranslation();
  const { countries, isLoading } = useCountriesData();

  // Validation logic
  useEffect(() => {
    const requiredFields = [
      'hotelName',
      'propertyType',
      'category',
      'description',
      'country',
      'city',
      'address',
      'contactName',
      'contactEmail',
      'contactPhone'
    ];

    const isValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  const propertyTypes = [
    { value: 'hotel', label: t('dashboard.propertyForm.propertyTypes.hotel') },
    { value: 'resort', label: t('dashboard.propertyForm.propertyTypes.resort') },
    { value: 'boutiqueHotel', label: t('dashboard.propertyForm.propertyTypes.boutiqueHotel') },
    { value: 'countryHouse', label: t('dashboard.propertyForm.propertyTypes.countryHouse') },
    { value: 'roadsideMotel', label: t('dashboard.propertyForm.propertyTypes.roadsideMotel') }
  ];

  const categories = [
    { value: '1star', label: t('dashboard.propertyForm.categories.1star') },
    { value: '2star', label: t('dashboard.propertyForm.categories.2star') },
    { value: '3star', label: t('dashboard.propertyForm.categories.3star') },
    { value: '4star', label: t('dashboard.propertyForm.categories.4star') },
    { value: '5star', label: t('dashboard.propertyForm.categories.5star') }
  ];

  const propertyStyles = [
    { value: 'classic', label: t('dashboard.propertyForm.propertyStyles.classic') },
    { value: 'classicElegant', label: t('dashboard.propertyForm.propertyStyles.classicElegant') },
    { value: 'modern', label: t('dashboard.propertyForm.propertyStyles.modern') },
    { value: 'fusion', label: t('dashboard.propertyForm.propertyStyles.fusion') },
    { value: 'urban', label: t('dashboard.propertyForm.propertyStyles.urban') },
    { value: 'rural', label: t('dashboard.propertyForm.propertyStyles.rural') },
    { value: 'minimalist', label: t('dashboard.propertyForm.propertyStyles.minimalist') },
    { value: 'luxury', label: t('dashboard.propertyForm.propertyStyles.luxury') }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.propertyForm.basicInfo')}</h2>
        <p className="text-white/80">Please provide basic information about your property</p>
      </div>

      <div className="space-y-6">
        {/* Hotel Name */}
        <div className="space-y-2">
          <Label className="text-white font-medium">
            {t('dashboard.propertyForm.hotelName')} <span className="text-red-500">*</span>
          </Label>
          <Input
            value={formData.hotelName || ''}
            onChange={(e) => updateFormData('hotelName', e.target.value)}
            placeholder={t('dashboard.propertyForm.hotelNamePlaceholder')}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
          />
        </div>

        {/* Property Type and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.propertyType')} <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.propertyType || ''} onValueChange={(value) => updateFormData('propertyType', value)}>
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder={t('dashboard.propertyForm.selectPropertyType')} />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.hotelCategory')} <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.category || ''} onValueChange={(value) => updateFormData('category', value)}>
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder={t('dashboard.propertyForm.selectHotelCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Property Style */}
        <div className="space-y-2">
          <Label className="text-white font-medium">
            {t('dashboard.propertyForm.selectPropertyStyle')}
          </Label>
          <Select value={formData.style || ''} onValueChange={(value) => updateFormData('style', value)}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder={t('dashboard.propertyForm.selectPropertyStyle')} />
            </SelectTrigger>
            <SelectContent>
              {propertyStyles.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Main Description */}
        <div className="space-y-2">
          <Label className="text-white font-medium">
            {t('dashboard.propertyForm.description')} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            value={formData.description || ''}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder={t('dashboard.propertyForm.descriptionPlaceholder')}
            className="min-h-[120px] bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50 resize-none"
          />
        </div>

        {/* New Descriptive Fields */}
        <div className="space-y-6">
          {/* Ideal Guests Enjoy */}
          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.idealGuestsEnjoy')}
            </Label>
            <Textarea
              value={formData.idealGuestsEnjoy || ''}
              onChange={(e) => updateFormData('idealGuestsEnjoy', e.target.value)}
              placeholder={t('dashboard.propertyForm.idealGuestsEnjoyPlaceholder')}
              className="min-h-[120px] bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50 resize-none"
            />
          </div>

          {/* Atmosphere */}
          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.atmosphereIs')}
            </Label>
            <Textarea
              value={formData.atmosphereIs || ''}
              onChange={(e) => updateFormData('atmosphereIs', e.target.value)}
              placeholder={t('dashboard.propertyForm.atmospherePlaceholder')}
              className="min-h-[120px] bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50 resize-none"
            />
          </div>

          {/* Location Perfect For */}
          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.locationPerfectFor')}
            </Label>
            <Textarea
              value={formData.locationPerfectFor || ''}
              onChange={(e) => updateFormData('locationPerfectFor', e.target.value)}
              placeholder={t('dashboard.propertyForm.locationPlaceholder')}
              className="min-h-[120px] bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50 resize-none"
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Location Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.country')} <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.country || ''} onValueChange={(value) => updateFormData('country', value)}>
                <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                  <SelectValue placeholder={t('dashboard.propertyForm.selectCountry')} />
                </SelectTrigger>
                <SelectContent>
                  {!isLoading && countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.city')} <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.city || ''}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder={t('dashboard.propertyForm.enterCityName')}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.address')} <span className="text-red-500">*</span>
            </Label>
            <Input
              value={formData.address || ''}
              onChange={(e) => updateFormData('address', e.target.value)}
              placeholder={t('dashboard.propertyForm.enterAddress')}
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.postalCode')}
            </Label>
            <Input
              value={formData.postalCode || ''}
              onChange={(e) => updateFormData('postalCode', e.target.value)}
              placeholder={t('dashboard.propertyForm.enterPostalCode')}
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">{t('dashboard.propertyForm.contactInformation')}</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.contactName')} <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.contactName || ''}
                onChange={(e) => updateFormData('contactName', e.target.value)}
                placeholder={t('dashboard.propertyForm.enterContactName')}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.contactEmail')} <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
                placeholder={t('dashboard.propertyForm.enterContactEmail')}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.contactPhone')} <span className="text-red-500">*</span>
              </Label>
              <Input
                type="tel"
                value={formData.contactPhone || ''}
                onChange={(e) => updateFormData('contactPhone', e.target.value)}
                placeholder={t('dashboard.propertyForm.enterContactPhone')}
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
              />
            </div>

            {isAdmin && (
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  {t('dashboard.propertyForm.referralAssociation')}
                </Label>
                <Input
                  value={formData.referralAssociation || ''}
                  onChange={(e) => updateFormData('referralAssociation', e.target.value)}
                  placeholder={t('dashboard.propertyForm.enterReferralAssociation')}
                  className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
