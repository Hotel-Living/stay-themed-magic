
import { calculateAveragePrice } from "../utils/priceCalculator";

export const usePropertySubmission = () => {
  const handleSubmitProperty = async ({
    user,
    formData,
    termsAccepted,
    setIsSubmitting,
    setIsSubmitted,
    setSubmitSuccess,
    toast,
    navigate,
    stepValidation
  }: any) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a property.",
        variant: "destructive"
      });
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Terms & Conditions",
        description: "You must accept the Terms & Conditions to submit a property.",
        variant: "destructive"
      });
      return;
    }

    const allStepsValid = Object.values(stepValidation).every(isValid => isValid);
    
    if (!allStepsValid) {
      toast({
        title: "Cannot Submit Property",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const hotelData = {
        name: formData.basicInfo.name,
        description: formData.basicInfo.description,
        country: formData.basicInfo.country,
        city: formData.basicInfo.city,
        address: formData.basicInfo.address,
        propertyType: formData.basicInfo.propertyType,
        category: formData.basicInfo.category,
        pricePerMonth: calculateAveragePrice(formData.roomTypes),
        ownerId: user.id,
        style: formData.basicInfo.style,
        images: formData.images,
        themes: formData.themesAndActivities.themes
      };

      await createHotel(hotelData);
      
      setIsSubmitted(true);
      setSubmitSuccess(true);
      
      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review.",
        duration: 5000
      });
      
      setTimeout(() => {
        navigate("/hotel-dashboard");
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting property:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your property.",
        variant: "destructive"
      });
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmitProperty };
};
