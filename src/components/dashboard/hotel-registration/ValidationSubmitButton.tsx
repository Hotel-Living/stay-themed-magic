import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
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

  const convertToHotelData = (data: HotelRegistrationFormData) => {
    console.log("Converting form data to hotel data", { data, user });
    
    return {
      name: data.hotelName,
      property_type: data.propertyType,
      description: data.hotelDescription,
      ideal_guests: data.idealGuests,
      atmosphere: data.atmosphere,
      perfect_location: data.location,
      style: data.propertyStyle,
      country: data.country,
      address: data.address,
      city: data.city,
      postal_code: data.postalCode,
      contact_name: user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || '',
      contact_email: user?.email || '',
      contact_phone: user?.user_metadata?.phone || user?.phone || '',
      classification: data.classification,
      stay_lengths: data.stayLengths?.map(length => parseInt(length)) || [],
      meal_plan: data.mealPlan,
      room_description: data.roomDescription,
      check_in_day: data.checkInDay,
      hotel_features: data.hotelFeatures,
      room_features: data.roomFeatures,
      price_per_month: data.price_per_month || 0,
      terms_accepted: data.termsAccepted,
      status: 'pending',
      user_id: user?.id
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
      const hotelData = convertToHotelData(currentData);
      
      console.log("=== STARTING HOTEL SUBMISSION ===");
      console.log("Hotel data:", hotelData);
      
      // Submit directly to hotels table
      const { data: result, error } = await supabase
        .from('hotels')
        .insert(hotelData)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
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