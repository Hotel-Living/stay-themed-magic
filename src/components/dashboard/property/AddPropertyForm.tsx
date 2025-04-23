import React, { useEffect } from "react";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import PropertyFormNavigation from "./components/PropertyFormNavigation";
import { usePropertyForm } from "./hooks/usePropertyForm";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { format, parse } from "date-fns";

export default function AddPropertyForm({
  editingHotelId,
  onDoneEditing
}: {
  editingHotelId?: string | null;
  onDoneEditing?: () => void;
} = {}) {
  const {
    currentStep,
    setCurrentStep,
    stepValidation,
    validateStep,
    isSubmitted,
    setIsSubmitted,
    submitSuccess,
    setSubmitSuccess,
    errorFields,
    setErrorFields,
    showValidationErrors,
    setShowValidationErrors,
    formData,
    setFormData,
    getIncompleteFields,
    toast
  } = usePropertyForm();

  const { user } = useAuth();
  const totalSteps = 4;
  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];

  useEffect(() => {
    async function fetchHotelIfEditing() {
      if (!editingHotelId) return;
      const { data, error } = await supabase
        .from("hotels")
        .select(`
          *,
          hotel_themes:hotel_themes(theme_id),
          hotel_activities:hotel_activities(activity_id),
          hotel_images(image_url, is_main)
        `)
        .eq("id", editingHotelId)
        .single();

      if (error || !data) {
        toast({
          title: "Error",
          description: "Unable to load property for editing."
        });
        return;
      }

      setFormData({
        hotelName: data.name || "",
        propertyType: data.property_type || "",
        description: data.description || "",
        country: data.country || "",
        address: data.address || "",
        city: data.city || "",
        postalCode: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        category: data.category?.toString() || "",
        stayLengths: Array.isArray(data.available_months) && data.available_months.length > 0 ? [30] : [],
        mealPlans: [],
        roomTypes: [],
        themes: Array.isArray(data.hotel_themes) ? data.hotel_themes.map((t: any) => t.theme_id) : [],
        activities: Array.isArray(data.hotel_activities) ? data.hotel_activities.map((a: any) => a.activity_id) : [],
        faqs: [],
        terms: "",
        termsAccepted: false
      });
      setCurrentStep(1);
    }
    fetchHotelIfEditing();
  }, [editingHotelId, setFormData]);

  const handleSubmitProperty = async () => {
    if (editingHotelId) {
      try {
        const { error: hotelError } = await supabase
          .from('hotels')
          .update({
            name: formData.hotelName,
            property_type: formData.propertyType,
            description: formData.description,
            country: formData.country,
            address: formData.address,
            city: formData.city,
            category: parseInt(formData.category) || null,
            price_per_month: calculateAveragePrice(formData.roomTypes) || 1000,
            status: 'pending',
          })
          .eq('id', editingHotelId);

        if (hotelError) {
          console.error('Error updating hotel:', hotelError);
          toast({
            title: "Update Error",
            description: "Failed to update property. Please try again.",
            variant: "destructive"
          });
          return;
        }

        if (formData.themes && formData.themes.length > 0) {
          await supabase
            .from('hotel_themes')
            .delete()
            .eq('hotel_id', editingHotelId);

          const themeRows = formData.themes.map(themeId => ({
            hotel_id: editingHotelId,
            theme_id: themeId
          }));
          if (themeRows.length > 0) {
            await supabase.from('hotel_themes').insert(themeRows);
          }
        }

        if (formData.activities && formData.activities.length > 0) {
          await supabase
            .from('hotel_activities')
            .delete()
            .eq('hotel_id', editingHotelId);

          const activityRows = formData.activities.map(activityId => ({
            hotel_id: editingHotelId,
            activity_id: activityId
          }));
          if (activityRows.length > 0) {
            await supabase.from('hotel_activities').insert(activityRows);
          }
        }

        setIsSubmitted(true);
        setSubmitSuccess(true);
        toast({
          title: "Property Updated",
          description: "Your edited property has been submitted for review again.",
          duration: 5000
        });

        setTimeout(() => {
          setCurrentStep(1);
          setIsSubmitted(false);
          setFormData({
            hotelName: "",
            propertyType: "",
            description: "",
            country: "",
            address: "",
            city: "",
            postalCode: "",
            contactName: "",
            contactEmail: "",
            contactPhone: "",
            category: "",
            stayLengths: [],
            mealPlans: [],
            roomTypes: [],
            themes: [],
            activities: [],
            faqs: [],
            terms: "",
            termsAccepted: false
          });
          if (onDoneEditing) onDoneEditing();
        }, 5000);

        return;
      } catch (error) {
        console.error('Error submitting edited property:', error);
        toast({
          title: "Submission Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive"
        });
        return;
      }
    }

    const allStepsValid = Object.values(stepValidation).every(isValid => isValid);
    if (!allStepsValid) {
      const invalidSteps = Object.entries(stepValidation)
        .filter(([_, isValid]) => !isValid)
        .map(([step]) => parseInt(step));
      const allIncompleteFields = invalidSteps.flatMap(step => getIncompleteFields(step));
      setErrorFields(allIncompleteFields);
      setShowValidationErrors(true);

      toast({
        title: "Cannot Submit Property",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }
    try {
      const { data: hotelData, error: hotelError } = await supabase
        .from('hotels')
        .insert({
          name: formData.hotelName,
          property_type: formData.propertyType,
          description: formData.description,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          category: parseInt(formData.category) || null,
          owner_id: user?.id,
          price_per_month: calculateAveragePrice(formData.roomTypes) || 1000,
          status: 'pending'
        })
        .select()
        .single();

      if (hotelError) {
        console.error('Error submitting hotel basic info:', hotelError);
        throw hotelError;
      }

      const hotelId = hotelData.id;

      if (formData.themes && formData.themes.length > 0) {
        const themeRows = formData.themes.map(themeId => ({
          hotel_id: hotelId,
          theme_id: themeId
        }));
        
        const { error: themesError } = await supabase
          .from('hotel_themes')
          .insert(themeRows);
        
        if (themesError) {
          console.error('Error saving hotel themes:', themesError);
          throw themesError;
        }
      }

      if (formData.activities && formData.activities.length > 0) {
        const activityRows = formData.activities.map(activityId => ({
          hotel_id: hotelId,
          activity_id: activityId
        }));
        
        const { error: activitiesError } = await supabase
          .from('hotel_activities')
          .insert(activityRows);
        
        if (activitiesError) {
          console.error('Error saving hotel activities:', activitiesError);
          throw activitiesError;
        }
      }

      if (formData.stayLengths && formData.stayLengths.length > 0) {
        const availableMonths = generateAvailableMonths();
        
        const { error: updateMonthsError } = await supabase
          .from('hotels')
          .update({ available_months: availableMonths })
          .eq('id', hotelId);
        
        if (updateMonthsError) {
          console.error('Error updating available months:', updateMonthsError);
          throw updateMonthsError;
        }
        
        const currentYear = new Date().getFullYear();
        const availabilityRows = availableMonths.map(month => {
          const firstDayOfMonth = parse(`01 ${month} ${currentYear}`, 'dd MMMM yyyy', new Date());
          const formattedDate = format(firstDayOfMonth, 'yyyy-MM-dd');
          return {
            hotel_id: hotelId,
            availability_month: month.toLowerCase(),
            availability_year: currentYear,
            availability_date: formattedDate,
            is_full_month: true,
            preferred_weekday: 'Monday',
          };
        });

        if (availabilityRows.length > 0) {
          const { error: availabilityError } = await supabase
            .from('hotel_availability')
            .insert(availabilityRows);
          
          if (availabilityError) {
            console.error('Error saving hotel availability:', availabilityError);
            throw availabilityError;
          }
        }
      }

      if (formData.roomTypes && formData.roomTypes.length > 0) {
        console.log('Room types would be saved to room_types table:', formData.roomTypes);
      }

      const placeholderImages = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
      ];
      
      const imageRows = placeholderImages.map((url, index) => ({
        hotel_id: hotelId,
        image_url: url,
        is_main: index === 0
      }));
      
      const { error: imagesError } = await supabase
        .from('hotel_images')
        .insert(imageRows);
      
      if (imagesError) {
        console.error('Error saving placeholder images:', imagesError);
        throw imagesError;
      }
      
      if (placeholderImages.length > 0) {
        const { error: mainImageError } = await supabase
          .from('hotels')
          .update({ main_image_url: placeholderImages[0] })
          .eq('id', hotelId);
        
        if (mainImageError) {
          console.error('Error updating main image:', mainImageError);
          throw mainImageError;
        }
      }

      console.log('Property submitted successfully with all related data!');
      setIsSubmitted(true);
      setSubmitSuccess(true);
      
      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review.",
        duration: 5000
      });
      
      setTimeout(() => {
        setCurrentStep(1);
        setIsSubmitted(false);
        setFormData({
          hotelName: "",
          propertyType: "",
          description: "",
          country: "",
          address: "",
          city: "",
          postalCode: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          category: "",
          stayLengths: [],
          mealPlans: [],
          roomTypes: [],
          themes: [],
          activities: [],
          faqs: [],
          terms: "",
          termsAccepted: false
        });
      }, 5000);
    } catch (error) {
      console.error('Error in handleSubmitProperty:', error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const validateCurrentStep = () => {
    return stepValidation[currentStep];
  };

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      const fields = getIncompleteFields(currentStep);
      setErrorFields(fields);
      setShowValidationErrors(true);
      toast({
        title: "Warning",
        description: "Some fields are incomplete. You can still proceed but please complete them later.",
        variant: "destructive"
      });
    } else {
      setErrorFields([]);
      setShowValidationErrors(false);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const calculateAveragePrice = (roomTypes) => {
    if (!roomTypes || roomTypes.length === 0) return 1000; // Default price
    let totalPrice = 0;
    let count = 0;
    roomTypes.forEach(room => {
      if (room.price) {
        totalPrice += parseFloat(room.price);
        count++;
      }
    });
    return count > 0 ? Math.round(totalPrice / count) : 1000;
  };

  const generateAvailableMonths = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    const availableMonths = [];
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth + i) % 12;
      availableMonths.push(months[monthIndex]);
    }

    return availableMonths;
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log('Updated form data:', field, value);
  };

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepTitle={stepTitles[currentStep - 1]} 
      />

      <PropertyFormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={handleSubmitProperty}
      />

      {showValidationErrors && errorFields.length > 0 && (
        <ValidationErrorBanner errorFields={errorFields} />
      )}

      {isSubmitted && submitSuccess ? (
        <SuccessMessage />
      ) : (
        <StepContent 
          currentStep={currentStep}
          onValidationChange={isValid => validateStep(currentStep, isValid)}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}

      <ImportantNotice />

      <PropertyFormNavigation
        currentStep={currentStep}
        totalSteps={totalSteps}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSubmit={handleSubmitProperty}
      />

      {editingHotelId && (
        <div className="mt-4">
          <button
            onClick={onDoneEditing}
            className="px-4 py-2 rounded bg-fuchsia-700 text-white"
          >
            Cancel Editing
          </button>
        </div>
      )}
    </div>
  );
}
