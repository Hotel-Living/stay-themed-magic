
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PropertyFormData } from "../hooks/usePropertyFormData";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface GeneralInformationStep1Props {
  formData: PropertyFormData;
  updateFormData: (field: string, value: any) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const GeneralInformationStep1 = ({ 
  formData, 
  updateFormData,
  onValidationChange = () => {}
}: GeneralInformationStep1Props) => {
  const [isValid, setIsValid] = useState(false);

  const form = useForm({
    defaultValues: {
      hotelName: formData.hotelName || '',
      description: formData.description || '',
      country: formData.country || '',
      city: formData.city || '',
      address: formData.address || '',
      postalCode: formData.postalCode || '',
      category: formData.category || '',
      contactName: formData.contactName || '',
      contactEmail: formData.contactEmail || '',
      contactPhone: formData.contactPhone || '',
    }
  });

  useEffect(() => {
    // Check if all required fields are filled
    const requiredFields = ['hotelName', 'description', 'country', 'city', 'category'];
    const hasAllRequired = requiredFields.every(field => !!formData[field]);
    
    setIsValid(hasAllRequired);
    onValidationChange(hasAllRequired);
  }, [
    formData.hotelName,
    formData.description,
    formData.country,
    formData.city,
    formData.category,
    onValidationChange
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Hotel Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hotelName">Hotel Name *</Label>
            <Input
              id="hotelName"
              placeholder="Enter your hotel name"
              value={formData.hotelName || ''}
              onChange={(e) => updateFormData('hotelName', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category || ''}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full p-2 border rounded bg-white text-[#7A0486] border-[#7A0486]"
            >
              <option value="">Select Category</option>
              <option value="hotel">Hotel</option>
              <option value="resort">Resort</option>
              <option value="boutique">Boutique Hotel</option>
              <option value="motel">Motel</option>
              <option value="apartment">Apartment</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your property"
            value={formData.description || ''}
            onChange={(e) => updateFormData('description', e.target.value)}
            className="w-full min-h-[150px]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              placeholder="Country"
              value={formData.country || ''}
              onChange={(e) => updateFormData('country', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="City"
              value={formData.city || ''}
              onChange={(e) => updateFormData('city', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Street address"
              value={formData.address || ''}
              onChange={(e) => updateFormData('address', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode || ''}
              onChange={(e) => updateFormData('postalCode', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              placeholder="Contact Name"
              value={formData.contactName || ''}
              onChange={(e) => updateFormData('contactName', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="Contact Email"
              value={formData.contactEmail || ''}
              onChange={(e) => updateFormData('contactEmail', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              placeholder="Contact Phone"
              value={formData.contactPhone || ''}
              onChange={(e) => updateFormData('contactPhone', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400">
        Fields marked with * are required
      </div>
    </div>
  );
};
