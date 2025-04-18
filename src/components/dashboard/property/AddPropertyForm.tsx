
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { createHotel } from "@/services/hotelService";
import StepIndicator from "../PropertySteps/StepIndicator";
import StepNavigation from "../PropertySteps/StepNavigation";
import StepContent from "../PropertySteps/StepContent";
import ImportantNotice from "../PropertySteps/ImportantNotice";
import ValidationErrorBanner from "./ValidationErrorBanner";
import SuccessMessage from "./SuccessMessage";
import { StepValidationState } from "./types";

export default function AddPropertyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasNewItems, setHasNewItems] = useState(false);
  const [stepValidation, setStepValidation] = useState<StepValidationState>({
    1: false,
    2: false,
    3: false,
    4: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const totalSteps = 4;
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form data state for collecting all the property information
  const [formData, setFormData] = useState({
    basicInfo: {
      name: "",
      propertyType: "",
      description: "",
      country: "",
      city: "",
      address: "",
      category: 3, // Default to 3 stars
      style: ""
    },
    accommodationTerms: {
      stayLengths: [] as number[],
      mealPlans: [] as string[]
    },
    themesAndActivities: {
      themes: [] as string[],
      activities: [] as string[]
    },
    roomTypes: [] as any[],
    images: [] as string[],
    termsAccepted: false
  });

  const stepTitles = ["ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY", "ADD A NEW PROPERTY"];
  const { toast } = useToast();

  const validateStep = (step: number, isValid: boolean, stepData?: any) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));

    // If we have data for this step, update the form data
    if (stepData) {
      updateFormData(step, stepData);
    }
  };

  const updateFormData = (step: number, data: any) => {
    switch (step) {
      case 1:
        setFormData(prev => ({
          ...prev,
          basicInfo: { ...prev.basicInfo, ...data }
        }));
        break;
      case 2:
        setFormData(prev => ({
          ...prev,
          accommodationTerms: { ...prev.accommodationTerms, ...data },
          roomTypes: data.roomTypes || prev.roomTypes
        }));
        break;
      case 3:
        setFormData(prev => ({
          ...prev,
          themesAndActivities: { ...prev.themesAndActivities, ...data }
        }));
        break;
      case 4:
        // Update terms accepted state from the data
        if (data && typeof data.termsAccepted === 'boolean') {
          setTermsAccepted(data.termsAccepted);
          setFormData(prev => ({
            ...prev,
            termsAccepted: data.termsAccepted
          }));
        }
        break;
      default:
        break;
    }
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

  const validateCurrentStep = () => {
    return stepValidation[currentStep as keyof StepValidationState];
  };

  const getIncompleteFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["Property Name", "Property Type", "Description"];
      case 2:
        return ["Accommodation Terms", "Meal Plans", "Hotel Features", "Room Features"];
      case 3:
        return ["Themes", "Activities"];
      case 4:
        return ["FAQ", "Terms & Conditions"];
      default:
        return [];
    }
  };

  const handleSubmitProperty = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a property.",
        variant: "destructive"
      });
      return;
    }

    // Check if Terms & Conditions have been accepted
    if (!termsAccepted) {
      toast({
        title: "Terms & Conditions",
        description: "You must accept the Terms & Conditions to submit a property.",
        variant: "destructive"
      });
      setErrorFields(["Terms & Conditions"]);
      setShowValidationErrors(true);
      return;
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
      setIsSubmitting(true);

      // Prepare the hotel data from the form data
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

      console.log("Submitting hotel data:", hotelData);

      // Create the hotel in Supabase
      const result = await createHotel(hotelData);
      console.log("Hotel created:", result);

      setIsSubmitted(true);
      setSubmitSuccess(true);
      
      toast({
        title: "Property Submitted Successfully",
        description: "Your property has been submitted for review.",
        duration: 5000
      });
      
      // Redirect to the hotel dashboard after a short delay
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

  // Helper function to calculate the average price from room types
  const calculateAveragePrice = (roomTypes: any[]): number => {
    if (roomTypes.length === 0) return 0;
    
    let totalPrice = 0;
    let rateCount = 0;
    
    roomTypes.forEach(room => {
      if (room.rates) {
        Object.values(room.rates).forEach((rate: any) => {
          if (typeof rate === 'number' && rate > 0) {
            totalPrice += rate;
            rateCount++;
          }
        });
      }
    });
    
    return rateCount > 0 ? Math.round(totalPrice / rateCount) : 0;
  };

  return (
    <div className="glass-card rounded-2xl p-4 py-[20px] px-[18px] bg-[#7a0486]">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} stepTitle={stepTitles[currentStep - 1]} />
      
      <div className="flex items-center justify-between mb-3">
        <button 
          onClick={goToPreviousStep} 
          className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
            currentStep === 1 ? "invisible" : "bg-fuchsia-950/80 hover:bg-fuchsia-900/80 text-fuchsia-100"
          }`} 
          disabled={currentStep === 1}
        >
          Previous
        </button>
        
        {currentStep === totalSteps ? (
          <button 
            onClick={handleSubmitProperty} 
            className="rounded-lg px-4 py-1.5 text-white text-sm font-medium transition-colors bg-[#a209ad]/80 hover:bg-[#a209ad]"
            disabled={isSubmitting || !termsAccepted}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button 
            onClick={goToNextStep} 
            className="rounded-lg px-4 py-1.5 bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white text-sm font-medium transition-colors"
          >
            Next
          </button>
        )}
      </div>
      
      {showValidationErrors && errorFields.length > 0 && <ValidationErrorBanner errorFields={errorFields} />}
      
      {isSubmitted && submitSuccess ? (
        <SuccessMessage />
      ) : (
        <StepContent 
          currentStep={currentStep} 
          onValidationChange={(isValid, data) => validateStep(currentStep, isValid, data)} 
          formData={formData}
          setTermsAccepted={setTermsAccepted}
        />
      )}
      
      <ImportantNotice />
      
      <StepNavigation 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        onPrevious={goToPreviousStep} 
        onNext={goToNextStep} 
        onSubmit={handleSubmitProperty} 
        showPrevious={currentStep !== 1} 
        isNextDisabled={false}
        isSubmitting={isSubmitting}
        isSubmitDisabled={!termsAccepted}
      />
    </div>
  );
}
