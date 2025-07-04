
import React, { useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    const isValid = 
      formData.hotelName &&
      formData.category &&
      formData.propertyType &&
      formData.description &&
      formData.country &&
      formData.city &&
      formData.address &&
      formData.contactName &&
      formData.contactEmail &&
      formData.contactPhone &&
      formData.idealGuestsEnjoy &&
      formData.atmosphereIs &&
      formData.locationPerfectFor;

    onValidationChange(isValid);
  }, [
    formData.hotelName,
    formData.category,
    formData.propertyType,
    formData.description,
    formData.country,
    formData.city,
    formData.address,
    formData.contactName,
    formData.contactEmail,
    formData.contactPhone,
    formData.idealGuestsEnjoy,
    formData.atmosphereIs,
    formData.locationPerfectFor,
    onValidationChange
  ]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('dashboard.generalInformation')}</h2>
        <p className="text-white/80">{t('dashboard.propertyForm.basicInfoDescription')}</p>
      </div>

      {/* Basic Hotel Information */}
      <div className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.hotelCategory')} <span className="text-red-500">*</span>
            </Label>
            <select
              value={formData.category || ''}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full p-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white"
            >
              <option value="">{t('dashboard.propertyForm.selectHotelCategory')}</option>
              <option value={1}>1 {t('dashboard.star')}</option>
              <option value={2}>2 {t('dashboard.stars')}</option>
              <option value={3}>3 {t('dashboard.stars')}</option>
              <option value={4}>4 {t('dashboard.stars')}</option>
              <option value={5}>5 {t('dashboard.stars')}</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.propertyType')} <span className="text-red-500">*</span>
            </Label>
            <select
              value={formData.propertyType || ''}
              onChange={(e) => updateFormData('propertyType', e.target.value)}
              className="w-full p-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white"
            >
              <option value="">{t('dashboard.propertyForm.selectPropertyType')}</option>
              <option value="Hotel">Hotel</option>
              <option value="Resort">Resort</option>
              <option value="Boutique Hotel">Boutique Hotel</option>
              <option value="Country House">Country House</option>
              <option value="Roadside Motel">Roadside Motel</option>
            </select>
          </div>
        </div>

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

        {/* New Narrative Fields */}
        <div className="space-y-6 border-t border-purple-600/30 pt-6">
          <h3 className="text-lg font-semibold text-white">{t('dashboard.propertyForm.narrativeFields')}</h3>
          
          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.idealGuestsEnjoy')} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.idealGuestsEnjoy || ''}
              onChange={(e) => updateFormData('idealGuestsEnjoy', e.target.value)}
              placeholder={t('dashboard.propertyForm.idealGuestsEnjoyPlaceholder')}
              className="min-h-[120px] bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.atmosphereIs')} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={formData.atmosphereIs || ''}
              onChange={(e) => updateFormData('atmosphereIs', e.target.value)}
              placeholder={t('dashboard.propertyForm.atmospherePlaceholder')}
              className="min-h-[120px] bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white font-medium">
              {t('dashboard.propertyForm.locationPerfectFor')} <span className="text-red-500">*</span>
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
        <div className="space-y-6 border-t border-purple-600/30 pt-6">
          <h3 className="text-lg font-semibold text-white">{t('dashboard.propertyForm.locationInfo')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.country')} <span className="text-red-500">*</span>
              </Label>
              <select
                value={formData.country || ''}
                onChange={(e) => updateFormData('country', e.target.value)}
                className="w-full p-3 rounded-lg bg-purple-800/50 border border-purple-600 text-white"
                disabled={isLoading}
              >
                <option value="">{t('dashboard.propertyForm.selectCountry')}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.latitude')}
              </Label>
              <Input
                value={formData.latitude || ''}
                onChange={(e) => updateFormData('latitude', e.target.value)}
                placeholder="e.g., 40.7128"
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">
                {t('dashboard.propertyForm.longitude')}
              </Label>
              <Input
                value={formData.longitude || ''}
                onChange={(e) => updateFormData('longitude', e.target.value)}
                placeholder="e.g., -74.0060"
                className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6 border-t border-purple-600/30 pt-6">
          <h3 className="text-lg font-semibold text-white">{t('dashboard.propertyForm.contactInfo')}</h3>
          
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
  );
};
