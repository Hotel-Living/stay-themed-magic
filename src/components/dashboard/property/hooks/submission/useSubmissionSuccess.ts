
import { useToast } from "@/hooks/use-toast";
import { PropertyFormData } from '../usePropertyFormData';

interface SubmissionSuccessProps {
  setIsSubmitted: (value: boolean) => void;
  setSubmitSuccess: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<PropertyFormData>) => void;
  onDoneEditing?: () => void;
}

export const useSubmissionSuccess = ({
  setIsSubmitted,
  setSubmitSuccess,
  setCurrentStep,
  setFormData,
  onDoneEditing
}: SubmissionSuccessProps) => {
  const { toast } = useToast();

  const handleSubmissionSuccess = () => {
    console.log('Property submitted successfully!');
    setIsSubmitted(true);
    setSubmitSuccess(true);
    
    // Removed specific toast message
    
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
        termsAccepted: false,
        hotelImages: []
      });
      if (onDoneEditing) onDoneEditing();
    }, 5000);
  };

  return { handleSubmissionSuccess };
};
