
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from './usePropertyForm';
import { format, parse } from "date-fns";

interface UsePropertySubmissionProps {
  formData: PropertyFormData;
  stepValidation: Record<number, boolean>;
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setErrorFields: (fields: string[]) => void;
  setShowValidationErrors: (show: boolean) => void;
  getIncompleteFields: (step: number) => string[];
  setCurrentStep: (step: number) => void;
  setFormData: (data: PropertyFormData) => void;
  userId?: string;
  onDoneEditing?: () => void;
}

export const usePropertySubmission = ({
  formData,
  stepValidation,
  setIsSubmitted,
  setSubmitSuccess,
  setErrorFields,
  setShowValidationErrors,
  getIncompleteFields,
  setCurrentStep,
  setFormData,
  userId,
  onDoneEditing
}: UsePropertySubmissionProps) => {
  const { toast } = useToast();

  const calculateAveragePrice = (roomTypes: any[]) => {
    if (!roomTypes || roomTypes.length === 0) return 1000;
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

  const handleSubmitProperty = async (editingHotelId?: string | null) => {
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

        await handleThemesAndActivities(editingHotelId);
        handleSubmissionSuccess();
        return;
      } catch (error) {
        handleSubmissionError(error);
        return;
      }
    }

    const allStepsValid = Object.values(stepValidation).every(isValid => isValid);
    if (!allStepsValid) {
      handleValidationError();
      return;
    }

    try {
      const hotelData = await createNewHotel();
      if (!hotelData) return;

      const hotelId = hotelData.id;
      await handleThemesAndActivities(hotelId);
      await handleAvailability(hotelId);
      await handlePlaceholderImages(hotelId);

      handleSubmissionSuccess();
    } catch (error) {
      handleSubmissionError(error);
    }
  };

  const createNewHotel = async () => {
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
        owner_id: userId,
        price_per_month: calculateAveragePrice(formData.roomTypes) || 1000,
        status: 'pending'
      })
      .select()
      .single();

    if (hotelError) {
      console.error('Error submitting hotel basic info:', hotelError);
      throw hotelError;
    }

    return hotelData;
  };

  const handleThemesAndActivities = async (hotelId: string) => {
    if (formData.themes && formData.themes.length > 0) {
      await supabase
        .from('hotel_themes')
        .delete()
        .eq('hotel_id', hotelId);

      const themeRows = formData.themes.map(themeId => ({
        hotel_id: hotelId,
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
        .eq('hotel_id', hotelId);

      const activityRows = formData.activities.map(activityId => ({
        hotel_id: hotelId,
        activity_id: activityId
      }));
      
      if (activityRows.length > 0) {
        await supabase.from('hotel_activities').insert(activityRows);
      }
    }
  };

  const handleAvailability = async (hotelId: string) => {
    if (formData.stayLengths && formData.stayLengths.length > 0) {
      const availableMonths = generateAvailableMonths();
      
      await supabase
        .from('hotels')
        .update({ available_months: availableMonths })
        .eq('id', hotelId);
      
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
        await supabase.from('hotel_availability').insert(availabilityRows);
      }
    }
  };

  const handlePlaceholderImages = async (hotelId: string) => {
    const placeholderImages = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
    ];
    
    const imageRows = placeholderImages.map((url, index) => ({
      hotel_id: hotelId,
      image_url: url,
      is_main: index === 0
    }));
    
    await supabase.from('hotel_images').insert(imageRows);
    
    if (placeholderImages.length > 0) {
      await supabase
        .from('hotels')
        .update({ main_image_url: placeholderImages[0] })
        .eq('id', hotelId);
    }
  };

  const handleValidationError = () => {
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
  };

  const handleSubmissionSuccess = () => {
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
      if (onDoneEditing) onDoneEditing();
    }, 5000);
  };

  const handleSubmissionError = (error: any) => {
    console.error('Error in handleSubmitProperty:', error);
    toast({
      title: "Submission Error",
      description: "An unexpected error occurred. Please try again.",
      variant: "destructive"
    });
  };

  return {
    handleSubmitProperty
  };
};
