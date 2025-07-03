import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

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
  
  const [dragActive, setDragActive] = useState(false);

  // Validation logic
  useEffect(() => {
    const isValid = formData.hotelName && 
                   formData.description && 
                   formData.country && 
                   formData.city &&
                   formData.hotelImages?.length > 0;
    
    console.log('✅ Step 1 validation:', isValid);
    onValidationChange(isValid);
  }, [formData.hotelName, formData.description, formData.country, formData.city, formData.hotelImages, onValidationChange]);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newImages = Array.from(files).map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));
    
    updateFormData('hotelImages', [...(formData.hotelImages || []), ...newImages]);
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.hotelImages.filter((_: any, i: number) => i !== index);
    updateFormData('hotelImages', updatedImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files) {
      handleImageUpload(files);
    }
  };

  const propertyTypes = [
    "Hotel", "Boutique Hotel", "Resort", "Bed & Breakfast", 
    "Hostel", "Apartment", "Villa", "Guest House", "Other"
  ];

  return (
    <div className="space-y-6 bg-purple-900 text-white p-6 rounded-lg">
      
      <Card className="bg-purple-800 border-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Step 1: General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Hotel Images */}
          <div className="space-y-4">
            <Label className="text-white">Hotel Images *</Label>
            <div 
              className="border-2 border-dashed border-purple-400 rounded-lg p-6 text-center bg-purple-700/50"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-8 w-8 text-purple-300 mb-2" />
              <p className="text-sm text-purple-200 mb-2">Drag & drop images or click to upload</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="hotel-image-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('hotel-image-upload')?.click()}
              >
                Choose Images
              </Button>
            </div>

            {/* Image Preview */}
            {formData.hotelImages && formData.hotelImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.hotelImages.map((image: any, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Hotel ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hotel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hotelName" className="text-white">Hotel Name *</Label>
              <Input
                id="hotelName"
                value={formData.hotelName || ''}
                onChange={(e) => updateFormData('hotelName', e.target.value)}
                placeholder="Enter hotel name"
                className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-white">Property Type</Label>
              <select
                id="propertyType"
                value={formData.propertyType || ''}
                onChange={(e) => updateFormData('propertyType', e.target.value)}
                className="w-full px-3 py-2 border border-purple-500 rounded-md bg-purple-700 text-white"
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Hotel Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Description (Atmosphere) *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Describe the atmosphere and unique characteristics of your property..."
              rows={4}
              className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
              required
            />
          </div>

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-white">Country *</Label>
              <Input
                id="country"
                value={formData.country || ''}
                onChange={(e) => updateFormData('country', e.target.value)}
                placeholder="Country"
                className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city" className="text-white">City *</Label>
              <Input
                id="city"
                value={formData.city || ''}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="City"
                className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">Address</Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Street address"
                className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="contact@hotel.com"
                className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+1 234 567 8900"
                className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
              />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website" className="text-white">Website (Optional)</Label>
            <Input
              id="website"
              type="url"
              value={formData.website || ''}
              onChange={(e) => updateFormData('website', e.target.value)}
              placeholder="https://www.yourhotel.com"
              className="bg-purple-700 border-purple-500 text-white placeholder:text-purple-300"
            />
          </div>

        </CardContent>
      </Card>
    </div>
  );
}