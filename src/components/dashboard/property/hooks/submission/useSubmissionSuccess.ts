
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from '../usePropertyForm';

export const useSubmissionSuccess = ({
  setIsSubmitted,
  setSubmitSuccess,
  setCurrentStep,
  setFormData,
  onDoneEditing
}: {
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  setFormData: (data: PropertyFormData) => void;
  onDoneEditing?: () => void;
}) => {
  const { toast } = useToast();

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

  return { handleSubmissionSuccess };
};
