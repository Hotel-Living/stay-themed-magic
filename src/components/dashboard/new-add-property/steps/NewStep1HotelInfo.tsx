
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';

interface NewStep1HotelInfoProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function NewStep1HotelInfo({ 
  formData, 
  updateFormData, 
  onValidationChange 
}: NewStep1HotelInfoProps) {
  const { t } = useTranslation();

  // Validate form data
  useEffect(() => {
    const isValid = formData.hotelName && 
                   formData.category && 
                   formData.propertyType && 
                   formData.style &&
                   formData.description;
    
    onValidationChange(isValid);
  }, [formData.hotelName, formData.category, formData.propertyType, formData.style, formData.description, onValidationChange]);

  return (
    <div className="space-y-6 bg-[#7A0486] p-6 rounded-lg">
      <Card className="bg-[#7A0486] border-purple-400/30">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            {t('dashboard.generalInformation')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Hotel Name */}
          <div>
            <Label htmlFor="hotelName" className="text-white text-sm font-medium mb-2 block">
              {t('dashboard.hotelName')} <span className="text-red-400">*</span>
            </Label>
            <Input
              id="hotelName"
              type="text"
              value={formData.hotelName || ''}
              onChange={(e) => updateFormData('hotelName', e.target.value)}
              placeholder={t('dashboard.hotelNamePlaceholder')}
              className="bg-[#8A0499] border-purple-400/50 text-white placeholder:text-purple-200 focus:border-purple-300"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-white text-sm font-medium mb-2 block">
              {t('dashboard.category')} <span className="text-red-400">*</span>
            </Label>
            <Select
              value={formData.category || ''}
              onValueChange={(value) => updateFormData('category', value)}
            >
              <SelectTrigger className="bg-[#8A0499] border-purple-400/50 text-white">
                <SelectValue placeholder={t('dashboard.selectHotelCategory')} />
              </SelectTrigger>
              <SelectContent className="bg-[#8A0499] border-purple-400/50">
                <SelectItem value="1" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">1 Estrella</SelectItem>
                <SelectItem value="2" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">2 Estrellas</SelectItem>
                <SelectItem value="3" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">3 Estrellas</SelectItem>
                <SelectItem value="4" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">4 Estrellas</SelectItem>
                <SelectItem value="5" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">5 Estrellas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div>
            <Label htmlFor="propertyType" className="text-white text-sm font-medium mb-2 block">
              {t('dashboard.propertyType')} <span className="text-red-400">*</span>
            </Label>
            <Select
              value={formData.propertyType || ''}
              onValueChange={(value) => updateFormData('propertyType', value)}
            >
              <SelectTrigger className="bg-[#8A0499] border-purple-400/50 text-white">
                <SelectValue placeholder={t('dashboard.selectPropertyType')} />
              </SelectTrigger>
              <SelectContent className="bg-[#8A0499] border-purple-400/50">
                <SelectItem value="Hotel" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">Hotel</SelectItem>
                <SelectItem value="Resort" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">Resort</SelectItem>
                <SelectItem value="Hotel Boutique" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">Hotel Boutique</SelectItem>
                <SelectItem value="Casa Rural" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">Casa Rural</SelectItem>
                <SelectItem value="Hotel de carretera" className="text-white hover:bg-[#9A059F] focus:bg-[#9A059F]">Hotel de carretera</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Style */}
          <div>
            <Label htmlFor="style" className="text-white text-sm font-medium mb-2 block uppercase">
              {t('dashboard.styleOfProperty')} <span className="text-red-400">*</span>
            </Label>
            <Select
              value={formData.style || ''}
              onValueChange={(value) => updateFormData('style', value)}
            >
              <SelectTrigger className="bg-purple-600 border-purple-400/50 text-white">
                <SelectValue placeholder={t('dashboard.selectPropertyStyle')} />
              </SelectTrigger>
              <SelectContent className="bg-purple-600 border-purple-400/50">
                <SelectItem value="Clásico" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.classic')}</SelectItem>
                <SelectItem value="Clásico Elegante" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.classicElegant')}</SelectItem>
                <SelectItem value="Moderno" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.modern')}</SelectItem>
                <SelectItem value="Fusión" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.fusion')}</SelectItem>
                <SelectItem value="Urbano" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.urban')}</SelectItem>
                <SelectItem value="Rural" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.rural')}</SelectItem>
                <SelectItem value="Minimalista" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.minimalist')}</SelectItem>
                <SelectItem value="Lujo" className="text-white hover:bg-purple-700 focus:bg-purple-700">{t('dashboard.propertyStyles.luxury')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hotel Description */}
          <div>
            <Label htmlFor="description" className="text-white text-sm font-medium mb-2 block uppercase">
              {t('dashboard.hotelDescription')} <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder={t('dashboard.hotelDescriptionPlaceholder')}
              className="bg-purple-600 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-purple-300 min-h-[100px]"
            />
          </div>

          {/* Ideal Guests */}
          <div>
            <Label htmlFor="idealGuests" className="text-white text-sm font-medium mb-2 block uppercase">
              {t('dashboard.idealGuestsEnjoy')}
            </Label>
            <Textarea
              id="idealGuests"
              value={formData.idealGuests || ''}
              onChange={(e) => updateFormData('idealGuests', e.target.value)}
              placeholder={t('dashboard.idealGuestsPlaceholder')}
              className="bg-purple-600 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-purple-300 min-h-[100px]"
            />
          </div>

          {/* Atmosphere */}
          <div>
            <Label htmlFor="atmosphere" className="text-white text-sm font-medium mb-2 block uppercase">
              {t('dashboard.atmosphereIs')}
            </Label>
            <Textarea
              id="atmosphere"
              value={formData.atmosphere || ''}
              onChange={(e) => updateFormData('atmosphere', e.target.value)}
              placeholder={t('dashboard.atmospherePlaceholder')}
              className="bg-purple-600 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-purple-300 min-h-[100px]"
            />
          </div>

          {/* Perfect Location */}
          <div>
            <Label htmlFor="perfectLocation" className="text-white text-sm font-medium mb-2 block uppercase">
              {t('dashboard.locationPerfectFor')}
            </Label>
            <Textarea
              id="perfectLocation"
              value={formData.perfectLocation || ''}
              onChange={(e) => updateFormData('perfectLocation', e.target.value)}
              placeholder={t('dashboard.locationPlaceholder')}
              className="bg-purple-600 border-purple-400/50 text-white placeholder:text-purple-200 focus:border-purple-300 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
