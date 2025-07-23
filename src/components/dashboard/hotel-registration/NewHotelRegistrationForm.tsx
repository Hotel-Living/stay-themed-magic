
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { usePropertyFormData } from '../property/hooks/usePropertyFormData';
import { useStepManagement } from '../property/hooks/useStepManagement';

interface NewHotelRegistrationFormProps {
  onCancel?: () => void;
}

export const NewHotelRegistrationForm: React.FC<NewHotelRegistrationFormProps> = ({
  onCancel
}) => {
  const { formData, setFormData, updateFormData } = usePropertyFormData();
  const { currentStep, setCurrentStep, nextStep, previousStep } = useStepManagement();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleImageUpload = async (acceptedFiles: File[]) => {
    // Handle image upload logic here
    console.log('Uploading images:', acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    onDrop: handleImageUpload
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Transform form data to match database schema
      const hotelData = {
        name: formData.hotelName,
        description: formData.description,
        country: formData.country,
        city: formData.city,
        address: formData.address,
        property_type: formData.propertyType,
        style: formData.style,
        ideal_guests: formData.idealGuests,
        atmosphere: formData.atmosphere,
        perfect_location: formData.perfectLocation,
        postal_code: formData.postalCode,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
        contact_phone: formData.contactPhone,
        category: parseInt(formData.category) || 1,
        available_months: formData.available_months,
        features_hotel: formData.featuresHotel,
        features_room: formData.featuresRoom,
        meal_plans: formData.mealPlans,
        room_types: formData.roomTypes,
        stay_lengths: formData.stayLengths,
        terms: formData.terms,
        preferred_weekday: formData.preferredWeekday,
        rates: formData.rates,
        currency: formData.currency,
        enable_price_increase: formData.enablePriceIncrease,
        price_increase_cap: formData.priceIncreaseCap,
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        pricing_matrix: formData.pricingMatrix,
        checkin_day: formData.checkinDay,
        price_per_month: 0, // Default value
        status: 'pending' as const
      };

      const { data, error } = await supabase
        .from('hotels')
        .insert([hotelData])
        .select();

      if (error) throw error;

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['hotels'] });

      toast({
        title: "Success",
        description: "Property registered successfully!"
      });

      // Reset form and go back to first step
      setCurrentStep(1);
      if (onCancel) onCancel();

    } catch (error) {
      console.error('Error submitting hotel:', error);
      toast({
        title: "Error",
        description: "Failed to register property. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hotel Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.hotelName}
                onChange={(e) => updateFormData('hotelName', e.target.value)}
                placeholder="Enter hotel name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
                placeholder="Enter country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full p-2 border rounded-md h-24"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Describe your property"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.propertyType}
                onChange={(e) => updateFormData('propertyType', e.target.value)}
              >
                <option value="">Select property type</option>
                <option value="hotel">Hotel</option>
                <option value="boutique">Boutique Hotel</option>
                <option value="resort">Resort</option>
                <option value="bed_breakfast">Bed & Breakfast</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.category}
                onChange={(e) => updateFormData('category', e.target.value)}
              >
                <option value="">Select category</option>
                <option value="1">Budget</option>
                <option value="2">Mid-range</option>
                <option value="3">Luxury</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ideal Guests</label>
              <textarea
                className="w-full p-2 border rounded-md h-20"
                value={formData.idealGuests}
                onChange={(e) => updateFormData('idealGuests', e.target.value)}
                placeholder="Describe your ideal guests"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Atmosphere</label>
              <textarea
                className="w-full p-2 border rounded-md h-20"
                value={formData.atmosphere}
                onChange={(e) => updateFormData('atmosphere', e.target.value)}
                placeholder="Describe the atmosphere"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Perfect Location</label>
              <textarea
                className="w-full p-2 border rounded-md h-20"
                value={formData.perfectLocation}
                onChange={(e) => updateFormData('perfectLocation', e.target.value)}
                placeholder="Why is your location perfect?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="Full address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Postal Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.postalCode}
                onChange={(e) => updateFormData('postalCode', e.target.value)}
                placeholder="Postal code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={formData.contactName}
                onChange={(e) => updateFormData('contactName', e.target.value)}
                placeholder="Contact person name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                value={formData.contactEmail}
                onChange={(e) => updateFormData('contactEmail', e.target.value)}
                placeholder="Contact email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contact Phone</label>
              <input
                type="tel"
                className="w-full p-2 border rounded-md"
                value={formData.contactPhone}
                onChange={(e) => updateFormData('contactPhone', e.target.value)}
                placeholder="Contact phone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Hotel Images</label>
              <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer">
                <input {...getInputProps()} />
                <p>Drag & drop images here, or click to select files</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p>Step {currentStep} - Content coming soon</p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Register New Property - Step {currentStep}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6">
            <div className="space-x-2">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={previousStep}>
                  Previous
                </Button>
              )}
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
            
            <div className="space-x-2">
              {currentStep < 5 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Property'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
