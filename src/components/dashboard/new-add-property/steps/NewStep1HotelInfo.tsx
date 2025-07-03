
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import CountrySelector from "../../PropertySteps/StepOne/Location/CountrySelector";
import CitySelector from "../../PropertySteps/StepOne/Location/CitySelector";
import AddressInput from "../../PropertySteps/StepOne/Location/AddressInput";
import InteractiveMap from "../../PropertySteps/StepOne/Location/InteractiveMap";

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

  const propertyStyles = [
    "Classic",
    "Classic Elegant", 
    "Modern",
    "Fusion",
    "Urban",
    "Rural",
    "Minimalist",
    "Luxury"
  ];

  const propertyTypes = [
    "Hotel", 
    "Resort", 
    "Boutique Hotel", 
    "Country House", 
    "Roadside Motel"
  ];

  const categories = [
    "5-star", 
    "4-star", 
    "3-star", 
    "Budget", 
    "Luxury", 
    "Family-friendly", 
    "Adults-only"
  ];

  const handleLocationSelect = (latitude: number, longitude: number, address: string) => {
    updateFormData('latitude', latitude);
    updateFormData('longitude', longitude);
    updateFormData('address', address);
  };

  return (
    <div className="space-y-6 bg-[#2A1A3D] p-6 rounded-lg">
      {/* Hotel Information Section */}
      <Card className="bg-[#3D2A52] border-purple-400/30">
        <CardHeader className="bg-purple-900/30 rounded-t-lg">
          <CardTitle className="text-white text-xl">Hotel Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div>
            <Label htmlFor="hotelName" className="text-white mb-2 block">
              Hotel Name
            </Label>
            <Input
              id="hotelName"
              value={formData.hotelName || ''}
              onChange={(e) => updateFormData('hotelName', e.target.value)}
              placeholder="Enter hotel name"
              className="bg-[#4A3461] text-white border-purple-400/50 focus:border-purple-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="propertyStyle" className="text-white mb-2 block">
                Property Style
              </Label>
              <Select
                value={formData.propertyStyle || ''}
                onValueChange={(value) => updateFormData('propertyStyle', value)}
              >
                <SelectTrigger className="bg-[#4A3461] text-white border-purple-400/50">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent className="bg-[#4A3461] border-purple-400/50">
                  {propertyStyles.map((style) => (
                    <SelectItem 
                      key={style} 
                      value={style}
                      className="text-white hover:bg-purple-600/50 focus:bg-purple-600/50"
                    >
                      {style}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="propertyType" className="text-white mb-2 block">
                Property Type
              </Label>
              <Select
                value={formData.propertyType || ''}
                onValueChange={(value) => updateFormData('propertyType', value)}
              >
                <SelectTrigger className="bg-[#4A3461] text-white border-purple-400/50">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-[#4A3461] border-purple-400/50">
                  {propertyTypes.map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      className="text-white hover:bg-purple-600/50 focus:bg-purple-600/50"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="text-white mb-2 block">
                Category
              </Label>
              <Select
                value={formData.category || ''}
                onValueChange={(value) => updateFormData('category', value)}
              >
                <SelectTrigger className="bg-[#4A3461] text-white border-purple-400/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#4A3461] border-purple-400/50">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-white hover:bg-purple-600/50 focus:bg-purple-600/50"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-white mb-2 block">
              Hotel Description
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Describe your hotel..."
              rows={4}
              className="bg-[#4A3461] text-white border-purple-400/50 focus:border-purple-300 placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="idealGuests" className="text-white mb-2 block">
              Ideal Guests
            </Label>
            <Textarea
              id="idealGuests"
              value={formData.idealGuests || ''}
              onChange={(e) => updateFormData('idealGuests', e.target.value)}
              placeholder="Describe your ideal guests..."
              rows={3}
              className="bg-[#4A3461] text-white border-purple-400/50 focus:border-purple-300 placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="atmosphere" className="text-white mb-2 block">
              Atmosphere
            </Label>
            <Textarea
              id="atmosphere"
              value={formData.atmosphere || ''}
              onChange={(e) => updateFormData('atmosphere', e.target.value)}
              placeholder="Describe the atmosphere..."
              rows={3}
              className="bg-[#4A3461] text-white border-purple-400/50 focus:border-purple-300 placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label htmlFor="locationDescription" className="text-white mb-2 block">
              Location Description
            </Label>
            <Textarea
              id="locationDescription"
              value={formData.locationDescription || ''}
              onChange={(e) => updateFormData('locationDescription', e.target.value)}
              placeholder="Describe the location..."
              rows={3}
              className="bg-[#4A3461] text-white border-purple-400/50 focus:border-purple-300 placeholder:text-gray-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Address Section */}
      <Card className="bg-[#3D2A52] border-purple-400/30">
        <CardHeader className="bg-purple-900/30 rounded-t-lg">
          <CardTitle className="text-white text-xl">Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CountrySelector
              value={formData.country || ''}
              onChange={(e) => updateFormData('country', e.target.value)}
              onValueChange={(value) => updateFormData('country', value)}
              onBlur={() => {}}
              error={null}
              touched={false}
              onCustomClick={() => {}}
            />

            <CitySelector
              value={formData.city || ''}
              country={formData.country || ''}
              onChange={(e) => updateFormData('city', e.target.value)}
              onValueChange={(value) => updateFormData('city', value)}
              onBlur={() => {}}
              error={null}
              touched={false}
              disabled={!formData.country}
              onCustomClick={() => {}}
            />
          </div>

          <AddressInput
            value={formData.address || ''}
            onChange={(e) => updateFormData('address', e.target.value)}
            onBlur={() => {}}
            error={null}
            touched={false}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude" className="text-white mb-2 block">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude || ''}
                onChange={(e) => updateFormData('latitude', parseFloat(e.target.value) || 0)}
                placeholder="41.8902"
                className="bg-[#4A3461] text-white border-purple-400/50 focus:border-purple-300"
              />
            </div>
            
            <div>
              <Label htmlFor="longitude" className="text-white mb-2 block">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude || ''}
                onChange={(e) => updateFormData('longitude', parseFloat(e.target.value) || 0)}
                placeholder="12.4922"
                className="bg-[#4A3461] text-white border-purple-400/50 focus:border-purple-300"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-white mb-2 block">
              Location on Map
            </Label>
            <div className="bg-[#4A3461] rounded-lg p-2 border border-purple-400/30">
              <InteractiveMap
                latitude={formData.latitude || 0}
                longitude={formData.longitude || 0}
                address={formData.address || ''}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
