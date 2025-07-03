
import { useState, useEffect, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface NewPropertyFormData {
  // Step 1: Images + Hotel Info + Location
  hotelImages: any[];
  hotelName: string;
  description: string;
  atmosphere: string; // "The atmosphere is..." continuation
  country: string;
  city: string;
  address: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  
  // Step 2: Themes + Activities + Features
  themes: string[];
  activities: string[];
  featuresHotel: Record<string, boolean>;
  featuresRoom: Record<string, boolean>;
  
  // Step 3: Room Types + Meal Plans + Stay Durations + Availability
  roomTypes: any[]; // Simple room type with images and description
  mealPlans: string[];
  selectedStayDurations: number[]; // 8, 15, 22, 29 days
  preferredWeekday: string;
  availabilityPackages: any[]; // Room count + date ranges
  
  // Step 4: Pricing by Duration
  durationPricing: Record<string, { double: number; single: number }>; // Key pricing structure
  enablePriceIncrease: boolean;
  priceIncreaseCap: number;
  
  // Step 5: Final Review
  terms: string;
  termsAccepted: boolean;
  
  // Contact Info
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Property Details
  propertyType: string;
  style: string;
  category: string;
}

const initialFormData: NewPropertyFormData = {
  hotelImages: [],
  hotelName: '',
  description: '',
  atmosphere: '', // Critical: exact phrasing continuation
  country: '',
  city: '',
  address: '',
  postalCode: '',
  themes: [],
  activities: [],
  featuresHotel: {},
  featuresRoom: {},
  roomTypes: [],
  mealPlans: [],
  selectedStayDurations: [], // 8, 15, 22, 29 options
  preferredWeekday: 'Monday',
  availabilityPackages: [],
  durationPricing: {}, // Core pricing structure
  enablePriceIncrease: false,
  priceIncreaseCap: 20,
  terms: '',
  termsAccepted: false,
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  propertyType: '',
  style: '',
  category: ''
};

export function useNewPropertyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<NewPropertyFormData>(initialFormData);
  const [isStepValid, setIsStepValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Data backup system - prevents ANY data loss
  const backupRef = useRef<NewPropertyFormData>(initialFormData);
  
  // Auto-backup form data on every change
  useEffect(() => {
    backupRef.current = { ...formData };
    console.log('📦 Form data backed up:', formData);
  }, [formData]);

  const updateFormData = (field: keyof NewPropertyFormData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      console.log(`✏️ Updated ${field}:`, value);
      return updated;
    });
  };

  const onValidationChange = (isValid: boolean) => {
    console.log(`✅ Step ${currentStep} validation:`, isValid);
    setIsStepValid(isValid);
  };

  // Always allow navigation - validation only blocks final submission
  const canMoveToNextStep = currentStep < 5;
  const canMoveToPrevStep = currentStep > 1;

  const nextStep = () => {
    if (canMoveToNextStep) {
      console.log(`➡️ Moving to step ${currentStep + 1}`);
      setCurrentStep(prev => prev + 1);
      setIsStepValid(true); // Reset for new step
    }
  };

  const prevStep = () => {
    if (canMoveToPrevStep) {
      console.log(`⬅️ Moving to step ${currentStep - 1}`);
      setCurrentStep(prev => prev - 1);
      setIsStepValid(true); // Reset for new step
    }
  };

  const submitProperty = async (data: NewPropertyFormData) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a property.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('🔄 Converting form data for submission...');
      
      // Convert durationPricing to pricingMatrix for database
      const pricingMatrix = Object.entries(data.durationPricing).map(([duration, pricing]) => ({
        duration: parseInt(duration),
        double: pricing.double,
        single: pricing.single,
        currency: 'EUR'
      }));

      // Calculate monthly price from first valid pricing
      const firstValidPrice = pricingMatrix.find(p => p.double > 0);
      const monthlyPrice = firstValidPrice 
        ? Math.round((firstValidPrice.double / firstValidPrice.duration) * 28)
        : 0;

      const hotelData = {
        name: data.hotelName,
        description: data.description,
        atmosphere: data.atmosphere, // Exact field preservation
        country: data.country,
        city: data.city,
        address: data.address,
        postal_code: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
        contact_name: data.contactName,
        contact_email: data.contactEmail,
        contact_phone: data.contactPhone,
        property_type: data.propertyType,
        style: data.style,
        category: parseInt(data.category) || 1,
        price_per_month: monthlyPrice,
        stay_lengths: data.selectedStayDurations, // Exact duration preservation
        meal_plans: data.mealPlans,
        room_types: data.roomTypes,
        features_hotel: data.featuresHotel,
        features_room: data.featuresRoom,
        preferredWeekday: data.preferredWeekday,
        enable_price_increase: data.enablePriceIncrease,
        price_increase_cap: data.priceIncreaseCap,
        pricingmatrix: pricingMatrix, // Core pricing data
        terms: data.terms,
        owner_id: user.id,
        status: 'pending',
        main_image_url: data.hotelImages[0]?.url || null
      };

      console.log('📤 Submitting hotel data:', hotelData);

      const { data: hotel, error: hotelError } = await supabase
        .from('hotels')
        .insert([hotelData])
        .select()
        .single();

      if (hotelError) {
        console.error('❌ Hotel insertion error:', hotelError);
        throw hotelError;
      }

      console.log('✅ Hotel created successfully:', hotel);

      // Insert themes
      if (data.themes.length > 0) {
        const themeInserts = data.themes.map(themeId => ({
          hotel_id: hotel.id,
          theme_id: themeId
        }));

        const { error: themesError } = await supabase
          .from('hotel_themes')
          .insert(themeInserts);

        if (themesError) {
          console.error('⚠️ Themes insertion error:', themesError);
        }
      }

      // Insert activities
      if (data.activities.length > 0) {
        const activityInserts = data.activities.map(activityId => ({
          hotel_id: hotel.id,
          activity_id: activityId
        }));

        const { error: activitiesError } = await supabase
          .from('hotel_activities')
          .insert(activityInserts);

        if (activitiesError) {
          console.error('⚠️ Activities insertion error:', activitiesError);
        }
      }

      // Insert hotel images
      if (data.hotelImages.length > 0) {
        const imageInserts = data.hotelImages.map((image, index) => ({
          hotel_id: hotel.id,
          image_url: image.url,
          is_main: index === 0
        }));

        const { error: imagesError } = await supabase
          .from('hotel_images')
          .insert(imageInserts);

        if (imagesError) {
          console.error('⚠️ Images insertion error:', imagesError);
        }
      }

      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review.",
        variant: "default"
      });

      // Reset form after successful submission
      setFormData(initialFormData);
      setCurrentStep(1);
      
    } catch (error) {
      console.error('❌ Submission failed:', error);
      
      // CRITICAL: Restore data from backup on error
      setFormData(backupRef.current);
      
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your property. Your data has been preserved.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    updateFormData,
    isStepValid,
    onValidationChange,
    canMoveToNextStep,
    canMoveToPrevStep,
    nextStep,
    prevStep,
    submitProperty,
    isSubmitting
  };
}
