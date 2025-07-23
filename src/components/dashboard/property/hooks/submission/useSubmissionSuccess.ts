
import { useToast, toast } from "@/hooks/use-toast";
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
  const { toast: useToastRef } = useToast();

  const handleSubmissionSuccess = () => {
    console.log('Property submitted successfully!');
    setIsSubmitted(false);
    setSubmitSuccess(true);
    
    toast.success("Property saved successfully", {
      description: "Your property has been saved and is pending administrator approval."
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
        termsAccepted: false,
        hotelImages: []
      });
      if (onDoneEditing) onDoneEditing();
    }, 2000);
  };

  return { handleSubmissionSuccess };
};
