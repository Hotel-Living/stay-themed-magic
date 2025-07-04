
import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNewPropertyForm } from '../hooks/useNewPropertyForm';
import { useCountriesData } from '@/hooks/useCountriesData';
import { useTranslation } from "@/hooks/useTranslation";

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
  const { countries, isLoading, getCitiesForCountry } = useCountriesData();
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Property type options
  const propertyTypes = [
    'Hotel',
    'Resort',
    'Boutique Hotel',
    'Business Hotel',
    'Luxury Hotel',
    'Budget Hotel',
    'Hostel',
    'Apartment Hotel',
    'Extended Stay',
    'Bed & Breakfast'
  ];

  // Style options
  const styleOptions = [
    'Modern',
    'Classic',
    'Boutique',
    'Traditional',
    'Contemporary',
    'Vintage',
    'Minimalist',
    'Luxury',
    'Rustic',
    'Urban'
  ];

  // Category options (star rating)
  const categoryOptions = [
    { value: '1', label: '1 Star' },
    { value: '2', label: '2 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '5', label: '5 Stars' }
  ];

  // Update available cities when country changes
  useEffect(() => {
    if (formData.country) {
      const cities = getCitiesForCountry(formData.country);
      setAvailableCities(cities);
      
      // Clear city if it's not available in the new country
      if (formData.city && !cities.includes(formData.city)) {
        updateFormData('city', '');
      }
    } else {
      setAvailableCities([]);
      updateFormData('city', '');
    }
  }, [formData.country, getCitiesForCountry, updateFormData]);

  // Validation logic
  useEffect(() => {
    const requiredFields = [
      'hotelName',
      'propertyType', 
      'description',
      'country',
      'city',
      'address',
      'contactName',
      'contactEmail',
      'contactPhone',
      'category',
      'style'
    ];

    const isValid = requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });

    onValidationChange(isValid);
  }, [formData, onValidationChange]);

  const handleInputChange = (field: string, value: string) => {
    updateFormData(field, value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading countries data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Hotel Information</h2>
        <p className="text-white/80">Enter basic information about your property</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hotel Name */}
        <div className="space-y-2">
          <Label htmlFor="hotelName" className="text-white font-medium">
            Hotel Name *
          </Label>
          <Input
            id="hotelName"
            value={formData.hotelName || ''}
            onChange={(e) => handleInputChange('hotelName', e.target.value)}
            placeholder="Enter hotel name"
            className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
          />
        </div>

        {/* Referral Association - Admin Only */}
        {isAdmin && (
          <div className="space-y-2">
            <Label htmlFor="referralAssociation" className="text-white font-medium">
              Referral Association (admin only)
            </Label>
            <Input
              id="referralAssociation"
              value={formData.referralAssociation || ''}
              onChange={(e) => handleInputChange('referralAssociation', e.target.value)}
              placeholder="Enter referral association"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>
        )}

        {/* Property Type */}
        <div className="space-y-2">
          <Label htmlFor="propertyType" className="text-white font-medium">
            Property Type *
          </Label>
          <Select value={formData.propertyType || ''} onValueChange={(value) => handleInputChange('propertyType', value)}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-white hover:bg-purple-700">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-white font-medium">
            Category *
          </Label>
          <Select value={formData.category || ''} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white hover:bg-purple-700">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Style */}
        <div className="space-y-2">
          <Label htmlFor="style" className="text-white font-medium">
            Style *
          </Label>
          <Select value={formData.style || ''} onValueChange={(value) => handleInputChange('style', value)}>
            <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent className="bg-purple-800 border-purple-600">
              {styleOptions.map((style) => (
                <SelectItem key={style} value={style} className="text-white hover:bg-purple-700">
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white font-medium">
          Description *
        </Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your property"
          rows={4}
          className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
        />
      </div>

      {/* Location Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country" className="text-white font-medium">
              Country *
            </Label>
            <Select value={formData.country || ''} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600 max-h-60">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code} className="text-white hover:bg-purple-700">
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-white font-medium">
              City *
            </Label>
            <Select 
              value={formData.city || ''} 
              onValueChange={(value) => handleInputChange('city', value)}
              disabled={!formData.country}
            >
              <SelectTrigger className="bg-purple-800/50 border-purple-600 text-white">
                <SelectValue placeholder={formData.country ? "Select city" : "Select country first"} />
              </SelectTrigger>
              <SelectContent className="bg-purple-800 border-purple-600">
                {availableCities.map((city) => (
                  <SelectItem key={city} value={city} className="text-white hover:bg-purple-700">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-white font-medium">
              Address *
            </Label>
            <Input
              id="address"
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter full address"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-white font-medium">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              value={formData.postalCode || ''}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder="Enter postal code"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Name */}
          <div className="space-y-2">
            <Label htmlFor="contactName" className="text-white font-medium">
              Contact Name *
            </Label>
            <Input
              id="contactName"
              value={formData.contactName || ''}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              placeholder="Enter contact name"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-white font-medium">
              Contact Email *
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail || ''}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              placeholder="Enter contact email"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone" className="text-white font-medium">
              Contact Phone *
            </Label>
            <Input
              id="contactPhone"
              type="tel"
              value={formData.contactPhone || ''}
              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              placeholder="Enter contact phone"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      {/* Optional coordinates section for map display */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Coordinates (Optional)</h3>
        <p className="text-white/60 text-sm">These coordinates will be used for map display only</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latitude */}
          <div className="space-y-2">
            <Label htmlFor="latitude" className="text-white font-medium">
              Latitude
            </Label>
            <Input
              id="latitude"
              value={formData.latitude || ''}
              onChange={(e) => handleInputChange('latitude', e.target.value)}
              placeholder="Enter latitude"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>

          {/* Longitude */}
          <div className="space-y-2">
            <Label htmlFor="longitude" className="text-white font-medium">
              Longitude
            </Label>
            <Input
              id="longitude"
              value={formData.longitude || ''}
              onChange={(e) => handleInputChange('longitude', e.target.value)}
              placeholder="Enter longitude"
              className="bg-purple-800/50 border-purple-600 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
