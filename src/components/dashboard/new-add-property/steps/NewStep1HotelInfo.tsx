
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCountriesData } from '@/hooks/useCountriesData';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { countries, getCitiesForCountry } = useCountriesData();
  const [selectedCountryCode, setSelectedCountryCode] = useState(formData.country || '');
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Update available cities when country changes
  useEffect(() => {
    if (selectedCountryCode) {
      const cities = getCitiesForCountry(selectedCountryCode);
      setAvailableCities(cities);
      
      // Clear city if it's not available in the new country
      if (formData.city && !cities.includes(formData.city)) {
        updateFormData('city', '');
      }
    } else {
      setAvailableCities([]);
      updateFormData('city', '');
    }
  }, [selectedCountryCode, getCitiesForCountry, formData.city, updateFormData]);

  // Validation logic
  useEffect(() => {
    const requiredFields = [
      formData.hotelName,
      formData.propertyType,
      formData.category,
      formData.style,
      formData.description,
      formData.country,
      formData.city,
      formData.address,
      formData.postalCode,
      formData.contactName,
      formData.contactEmail,
      formData.contactPhone
    ];

    const isValid = requiredFields.every(field => field && field.trim() !== '');
    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    updateFormData('country', countryCode);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.propertyForm.basicInfo')}</h2>
        
        {/* Hotel Name */}
        <div className="space-y-2">
          <Label htmlFor="hotelName" className="text-white">
            {t('dashboard.propertyForm.hotelName')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="hotelName"
            value={formData.hotelName || ''}
            onChange={(e) => updateFormData('hotelName', e.target.value)}
            placeholder={t('dashboard.propertyForm.hotelNamePlaceholder')}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
          />
        </div>

        {/* Referral Association (Admin Only) */}
        {isAdmin && (
          <div className="space-y-2">
            <Label htmlFor="referralAssociation" className="text-white">
              {t('dashboard.propertyForm.referralAssociation')}
            </Label>
            <Input
              id="referralAssociation"
              value={formData.referralAssociation || ''}
              onChange={(e) => updateFormData('referralAssociation', e.target.value)}
              placeholder={t('dashboard.propertyForm.enterReferralAssociation')}
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
            />
          </div>
        )}

        {/* Property Type */}
        <div className="space-y-2">
          <Label className="text-white">
            {t('dashboard.propertyForm.propertyType')} <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.propertyType || ''} onValueChange={(value) => updateFormData('propertyType', value)}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder={t('dashboard.propertyForm.selectPropertyType')} />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              <SelectItem value="Hotel" className="text-white">{t('dashboard.propertyForm.propertyTypes.hotel')}</SelectItem>
              <SelectItem value="Resort" className="text-white">{t('dashboard.propertyForm.propertyTypes.resort')}</SelectItem>
              <SelectItem value="Boutique Hotel" className="text-white">{t('dashboard.propertyForm.propertyTypes.boutiqueHotel')}</SelectItem>
              <SelectItem value="Country House" className="text-white">{t('dashboard.propertyForm.propertyTypes.countryHouse')}</SelectItem>
              <SelectItem value="Roadside Motel" className="text-white">{t('dashboard.propertyForm.propertyTypes.roadsideMotel')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-white">
            {t('dashboard.propertyForm.hotelCategory')} <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category || ''} onValueChange={(value) => updateFormData('category', value)}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder={t('dashboard.propertyForm.selectHotelCategory')} />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              <SelectItem value="1" className="text-white">{t('dashboard.propertyForm.categories.1star')}</SelectItem>
              <SelectItem value="2" className="text-white">{t('dashboard.propertyForm.categories.2star')}</SelectItem>
              <SelectItem value="3" className="text-white">{t('dashboard.propertyForm.categories.3star')}</SelectItem>
              <SelectItem value="4" className="text-white">{t('dashboard.propertyForm.categories.4star')}</SelectItem>
              <SelectItem value="5" className="text-white">{t('dashboard.propertyForm.categories.5star')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Style */}
        <div className="space-y-2">
          <Label className="text-white">
            {t('dashboard.propertyForm.styleOfProperty')} <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.style || ''} onValueChange={(value) => updateFormData('style', value)}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder={t('dashboard.propertyForm.selectPropertyStyle')} />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              <SelectItem value="classic" className="text-white">{t('dashboard.propertyForm.propertyStyles.classic')}</SelectItem>
              <SelectItem value="classicElegant" className="text-white">{t('dashboard.propertyForm.propertyStyles.classicElegant')}</SelectItem>
              <SelectItem value="modern" className="text-white">{t('dashboard.propertyForm.propertyStyles.modern')}</SelectItem>
              <SelectItem value="fusion" className="text-white">{t('dashboard.propertyForm.propertyStyles.fusion')}</SelectItem>
              <SelectItem value="urban" className="text-white">{t('dashboard.propertyForm.propertyStyles.urban')}</SelectItem>
              <SelectItem value="rural" className="text-white">{t('dashboard.propertyForm.propertyStyles.rural')}</SelectItem>
              <SelectItem value="minimalist" className="text-white">{t('dashboard.propertyForm.propertyStyles.minimalist')}</SelectItem>
              <SelectItem value="luxury" className="text-white">{t('dashboard.propertyForm.propertyStyles.luxury')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">
            {t('dashboard.propertyForm.description')} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder={t('dashboard.propertyForm.descriptionPlaceholder')}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60 min-h-[100px]"
          />
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label className="text-white">
            {t('dashboard.propertyForm.country')} <span className="text-red-500">*</span>
          </Label>
          <Select value={selectedCountryCode} onValueChange={handleCountryChange}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder={t('dashboard.propertyForm.selectCountry')} />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code} className="text-white">
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label className="text-white">
            {t('dashboard.propertyForm.city')} <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.city || ''} 
            onValueChange={(value) => updateFormData('city', value)}
            disabled={!selectedCountryCode}
          >
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder={t('dashboard.propertyForm.enterCityName')} />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              {availableCities.map((city) => (
                <SelectItem key={city} value={city} className="text-white">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-white">
            {t('dashboard.propertyForm.address')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            value={formData.address || ''}
            onChange={(e) => updateFormData('address', e.target.value)}
            placeholder={t('dashboard.propertyForm.enterAddress')}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
          />
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label htmlFor="postalCode" className="text-white">
            {t('dashboard.propertyForm.postalCode')} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="postalCode"
            value={formData.postalCode || ''}
            onChange={(e) => updateFormData('postalCode', e.target.value)}
            placeholder={t('dashboard.propertyForm.enterPostalCode')}
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">{t('dashboard.contactInformation')}</h3>
          
          <div className="space-y-2">
            <Label htmlFor="contactName" className="text-white">
              {t('dashboard.propertyForm.contactName')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactName"
              value={formData.contactName || ''}
              onChange={(e) => updateFormData('contactName', e.target.value)}
              placeholder={t('dashboard.propertyForm.enterContactName')}
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-white">
              {t('dashboard.propertyForm.contactEmail')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail || ''}
              onChange={(e) => updateFormData('contactEmail', e.target.value)}
              placeholder={t('dashboard.propertyForm.enterContactEmail')}
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="text-white">
              {t('dashboard.propertyForm.contactPhone')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone || ''}
              onChange={(e) => updateFormData('contactPhone', e.target.value)}
              placeholder={t('dashboard.propertyForm.enterContactPhone')}
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Optional Coordinates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">{t('dashboard.propertyForm.coordinates')}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-white">
                {t('dashboard.propertyForm.latitude')}
              </Label>
              <Input
                id="latitude"
                value={formData.latitude || ''}
                onChange={(e) => updateFormData('latitude', e.target.value)}
                placeholder="40.7128"
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-white">
                {t('dashboard.propertyForm.longitude')}
              </Label>
              <Input
                id="longitude"
                value={formData.longitude || ''}
                onChange={(e) => updateFormData('longitude', e.target.value)}
                placeholder="-74.0060"
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
