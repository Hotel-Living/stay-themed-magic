import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { createNewHotel } from '../property/hooks/submission/createNewHotel';
import { PropertyFormData } from '../property/hooks/usePropertyFormData';
import { HotelRegistrationFormData } from './NewHotelRegistrationForm';

interface ValidationSubmitButtonProps {
  form: UseFormReturn<HotelRegistrationFormData>;
}

export function ValidationSubmitButton({ form }: ValidationSubmitButtonProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRequiredFields = (data: HotelRegistrationFormData) => {
    const missingFields: string[] = [];

    // Only hotel name is required
    if (!data.hotelName?.trim()) missingFields.push('Hotel Name');

    return missingFields;
  };

  const convertToPropertyFormData = (data: HotelRegistrationFormData): PropertyFormData => {
    console.log("Converting form data to PropertyFormData", { data, user });
    
    return {
      hotelName: data.hotelName,
      propertyType: data.propertyType,
      description: data.hotelDescription,
      idealGuests: data.idealGuests,
      atmosphere: data.atmosphere,
      perfectLocation: data.location,
      style: data.propertyStyle,
      country: data.country,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      contactName: user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || '',
      contactEmail: user?.email || '', // Use authenticated user's email
      contactPhone: user?.user_metadata?.phone || user?.phone || '', // Use user's phone with fallback
      category: data.classification,
      stayLengths: data.stayLengths.map(length => parseInt(length)),
      mealPlans: [data.mealPlan].filter(Boolean),
      roomTypes: [{ description: data.roomDescription }].filter(rt => rt.description),
      themes: data.clientAffinities || [], // FIX: Use only clientAffinities for themes
      activities: data.activities || [], // FIX: Ensure array fallback
      faqs: [],
      terms: '',
      termsAccepted: data.termsAccepted,
      // FIX: Properly format images with correct structure
      hotelImages: [
        ...(data.photos?.hotel || []).map(img => ({
          url: img.url || img,
          isMain: img.isMain || false,
          name: img.name || 'hotel-image'
        })),
        ...(data.photos?.room || []).map(img => ({
          url: img.url || img,
          isMain: false,
          name: img.name || 'room-image'
        }))
      ],
      mainImageUrl: data.photos?.hotel?.[0]?.url || data.photos?.hotel?.[0] || '',
      preferredWeekday: data.checkInDay,
      featuresHotel: data.hotelFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
      featuresRoom: data.roomFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
      // FIX: Process availability packages for months
      available_months: data.availabilityPackages?.map(pkg => {
        const month = new Date(pkg.startDate).toLocaleString('default', { month: 'long' }).toLowerCase();
        return month;
      }) || [],
      rates: {},
      currency: 'USD',
      enablePriceIncrease: false,
      priceIncreaseCap: 20,
      pricingMatrix: data.pricingMatrix || [],
      price_per_month: data.price_per_month || 0,
      checkinDay: data.checkInDay,
      stayDurations: data.stayLengths.map(length => parseInt(length)),
      // FIX: Add availability packages data for processing
      availabilityPackages: data.availabilityPackages || []
    };
  };

  const handleValidationAndSubmit = async () => {
    const currentData = form.getValues();
    const missingFields = validateRequiredFields(currentData);

    if (missingFields.length > 0) {
      // Show validation error with specific missing fields
      toast({
        title: "Missing Required Fields",
        description: `Please complete the following fields: ${missingFields.join(', ')}`,
        variant: 'destructive',
        duration: 8000
      });
      
      // Also set form errors for visual feedback
      missingFields.forEach(field => {
        const fieldName = field.toLowerCase().replace(/\s+/g, '');
        if (fieldName.includes('hotelname')) form.setError('hotelName', { message: 'Required' });
      });
      
      return;
    }

    if (!user?.id) {
      toast({
        title: "Authentication Error",
        description: "User not authenticated. Please log in and try again.",
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const propertyData = convertToPropertyFormData(currentData);
      
      console.log("=== STARTING HOTEL SUBMISSION ===");
      console.log("Property data:", propertyData);
      
      // Submit to hotel creation system
      const result = await createNewHotel(propertyData, user.id);
      
      console.log("=== HOTEL SUBMISSION RESULT ===");
      console.log("Result:", result);
      
      if (result) {
        console.log("=== HOTEL CREATION SUCCESSFUL ===");
        toast({
          title: "Success!",
          description: "Hotel submitted successfully for approval.",
          duration: 5000
        });

        // Redirect to current hotel panel route after successful submission
        console.log("=== NAVIGATING TO PANEL-HOTEL ===");
        navigate('/panel-hotel');
      } else {
        console.error("=== HOTEL CREATION FAILED - NO RESULT ===");
        throw new Error("Hotel creation failed - no result returned");
      }
    } catch (error) {
      console.error('=== ERROR SUBMITTING HOTEL ===');
      console.error('Error details:', error);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      
      toast({
        title: "Submission Failed",
        description: error?.message || "There was an error submitting your hotel. Please try again.",
        variant: 'destructive'
      });
    } finally {
      console.log("=== RESETTING SUBMISSION STATE ===");
      setIsSubmitting(false);
    }
  };

  return (
    <Button 
      type="button"
      onClick={handleValidationAndSubmit}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold mr-4"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Validating & Submitting...' : 'Validate & Submit'}
    </Button>
  );
}