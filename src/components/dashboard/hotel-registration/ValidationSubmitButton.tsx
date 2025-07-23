import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateRequiredFields = (data: HotelRegistrationFormData) => {
    const missingFields: string[] = [];

    // Basic Info validation
    if (!data.hotelName?.trim()) missingFields.push('Hotel Name');
    if (!data.address?.trim()) missingFields.push('Address');
    if (!data.city?.trim()) missingFields.push('City');
    if (!data.postalCode?.trim()) missingFields.push('Postal Code');
    if (!data.country?.trim()) missingFields.push('Country');
    
    // Contact Info validation
    if (!data.email?.trim()) missingFields.push('Email');
    if (!data.phone?.trim()) missingFields.push('Phone');
    
    // Classification validation
    if (!data.classification?.trim()) missingFields.push('Classification');
    
    // Property Details validation
    if (!data.propertyType?.trim()) missingFields.push('Property Type');
    if (!data.propertyStyle?.trim()) missingFields.push('Property Style');
    if (!data.hotelDescription?.trim() || data.hotelDescription.length < 200) {
      missingFields.push('Hotel Description (minimum 200 characters)');
    }
    if (!data.roomDescription?.trim()) missingFields.push('Room Description');
    if (!data.idealGuests?.trim()) missingFields.push('Ideal Guests');
    if (!data.atmosphere?.trim()) missingFields.push('Atmosphere');
    if (!data.location?.trim()) missingFields.push('Location Description');
    
    // Accommodation Terms validation
    if (!data.checkInDay?.trim()) missingFields.push('Check-in Day');
    if (!data.mealPlan?.trim()) missingFields.push('Meal Plan');
    if (!data.stayLengths || data.stayLengths.length === 0) {
      missingFields.push('Stay Lengths (at least one)');
    }
    
    // Availability validation
    if (!data.numberOfRooms?.trim()) missingFields.push('Number of Rooms');
    
    // Terms validation
    if (!data.termsAccepted) missingFields.push('Terms & Conditions Acceptance');

    return missingFields;
  };

  const convertToPropertyFormData = (data: HotelRegistrationFormData): PropertyFormData => ({
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
    contactEmail: data.email,
    contactPhone: data.phone,
    category: data.classification,
    stayLengths: data.stayLengths.map(length => parseInt(length)),
    mealPlans: [data.mealPlan],
    roomTypes: [{ description: data.roomDescription }],
    themes: data.clientAffinities,
    activities: data.activities,
    faqs: [],
    terms: '',
    termsAccepted: data.termsAccepted,
    hotelImages: [...data.photos.hotel, ...data.photos.room],
    mainImageUrl: data.photos.hotel[0]?.url || '',
    preferredWeekday: data.checkInDay,
    featuresHotel: data.hotelFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
    featuresRoom: data.roomFeatures.reduce((acc, feature) => ({ ...acc, [feature]: true }), {}),
    available_months: [],
    rates: {},
    currency: 'USD',
    enablePriceIncrease: false,
    priceIncreaseCap: 20,
    pricingMatrix: data.pricingMatrix,
    checkinDay: data.checkInDay,
    stayDurations: data.stayLengths.map(length => parseInt(length)),
    affinities: data.clientAffinities
  });

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
        if (fieldName.includes('address')) form.setError('address', { message: 'Required' });
        if (fieldName.includes('city')) form.setError('city', { message: 'Required' });
        if (fieldName.includes('postalcode')) form.setError('postalCode', { message: 'Required' });
        if (fieldName.includes('country')) form.setError('country', { message: 'Required' });
        if (fieldName.includes('email')) form.setError('email', { message: 'Required' });
        if (fieldName.includes('phone')) form.setError('phone', { message: 'Required' });
        if (fieldName.includes('classification')) form.setError('classification', { message: 'Required' });
        if (fieldName.includes('propertytype')) form.setError('propertyType', { message: 'Required' });
        if (fieldName.includes('propertystyle')) form.setError('propertyStyle', { message: 'Required' });
        if (fieldName.includes('hoteldescription')) form.setError('hotelDescription', { message: 'Required (min 200 chars)' });
        if (fieldName.includes('roomdescription')) form.setError('roomDescription', { message: 'Required' });
        if (fieldName.includes('idealguests')) form.setError('idealGuests', { message: 'Required' });
        if (fieldName.includes('atmosphere')) form.setError('atmosphere', { message: 'Required' });
        if (fieldName.includes('location')) form.setError('location', { message: 'Required' });
        if (fieldName.includes('checkinday')) form.setError('checkInDay', { message: 'Required' });
        if (fieldName.includes('mealplan')) form.setError('mealPlan', { message: 'Required' });
        if (fieldName.includes('staylengths')) form.setError('stayLengths', { message: 'Required' });
        if (fieldName.includes('numberofrooms')) form.setError('numberOfRooms', { message: 'Required' });
        if (fieldName.includes('terms')) form.setError('termsAccepted', { message: 'Must be accepted' });
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
      
      // Submit to hotel creation system
      const result = await createNewHotel(propertyData, user.id);
      
      if (result) {
        toast({
          title: "Success!",
          description: "Hotel submitted successfully for approval.",
          duration: 5000
        });

        // Redirect to hotel dashboard after successful submission
        setTimeout(() => {
          window.location.href = '/hotel-dashboard';
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting hotel:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your hotel. Please try again.",
        variant: 'destructive'
      });
    } finally {
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