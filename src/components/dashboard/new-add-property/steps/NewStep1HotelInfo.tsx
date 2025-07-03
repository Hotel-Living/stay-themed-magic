
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Property Images & Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Image Upload Section */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Property Images</Label>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">Upload Property Images</p>
              <p className="text-gray-500 mb-4">Drag and drop your images here or click to browse</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
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
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Main Image
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hotel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hotelName">Property Name *</Label>
              <Input
                id="hotelName"
                value={formData.hotelName || ''}
                onChange={(e) => updateFormData('hotelName', e.target.value)}
                placeholder="Enter property name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <select 
                id="propertyType"
                value={formData.propertyType || ''}
                onChange={(e) => updateFormData('propertyType', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select property type</option>
                <option value="hotel">Hotel</option>
                <option value="resort">Resort</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="guesthouse">Guesthouse</option>
                <option value="hostel">Hostel</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Describe your property"
              rows={4}
              required
            />
          </div>

          {/* CRITICAL: Exact atmosphere phrasing */}
          <div className="space-y-2">
            <Label htmlFor="atmosphere">Atmosphere</Label>
            <div className="flex items-start space-x-2">
              <span className="mt-2 text-sm font-medium whitespace-nowrap">The atmosphere is...</span>
              <Textarea
                id="atmosphere"
                value={formData.atmosphere || ''}
                onChange={(e) => updateFormData('atmosphere', e.target.value)}
                placeholder="warm and welcoming..."
                rows={2}
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                value={formData.country || ''}
                onChange={(e) => updateFormData('country', e.target.value)}
                placeholder="Enter country"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city || ''}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Enter full address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode || ''}
                onChange={(e) => updateFormData('postalCode', e.target.value)}
                placeholder="Enter postal code"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                value={formData.contactName || ''}
                onChange={(e) => updateFormData('contactName', e.target.value)}
                placeholder="Contact person name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
                placeholder="contact@property.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone || ''}
                onChange={(e) => updateFormData('contactPhone', e.target.value)}
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
