
import { GeneralInformationStep1 } from "../steps/GeneralInformationStep1";
import { GeneralInformationStep2 } from "../steps/GeneralInformationStep2";
import { AccommodationTermsStep } from "../steps/AccommodationTermsStep";
import { PackagesBuilderStep } from "../steps/PackagesBuilderStep";
import { FinalTermsStep } from "../steps/FinalTermsStep";
import { PropertyFormData } from "../hooks/usePropertyFormData";

export const STEP_TITLES = [
  "GENERAL INFORMATION",
  "HOTEL PROFILE",
  "ACCOMMODATION TERMS",
  "PACKAGES & PRICING",
  "FAQS & TERMS"
];

export const TOTAL_STEPS = 5;

export interface StepConfig {
  id: number;
  title: string;
  component: React.ComponentType<{
    formData: PropertyFormData;
    updateFormData: (field: string, value: any) => void;
    onValidationChange?: (isValid: boolean) => void;
  }>;
  description: string;
  requiredFields?: string[];
  validate?: (formData: PropertyFormData) => boolean;
  errorMessage?: string;
}

export const stepsConfig: StepConfig[] = [
  {
    id: 1,
    title: "General Information",
    component: GeneralInformationStep1,
    description: "Basic details about the hotel (name, address, category, description)."
  },
  {
    id: 2,
    title: "Hotel Profile",
    component: GeneralInformationStep2,
    description: "Affinities, activities, hotel features, and room type structure.",
    requiredFields: ["affinities", "activities", "roomTypes"]
  },
  {
    id: 3,
    title: "Accommodation Terms",
    component: AccommodationTermsStep,
    description: "Stay durations, check-in rules, availability calendar, meals, and rooms.",
    requiredFields: ["stayDurations", "checkinDay", "mealPlans", "availability"]
  },
  {
    id: 4,
    title: "Packages & Pricing",
    component: PackagesBuilderStep,
    description: "Define exact prices for each room × duration × meal plan combination.",
    validate: (formData: PropertyFormData) => {
      const matrix = formData.pricingMatrix || [];
      const allComplete = matrix.every(
        (row: any) =>
          row.price !== null &&
          row.price !== undefined &&
          row.price !== '' &&
          !isNaN(row.price)
      );
      return allComplete;
    },
    errorMessage: "Please complete all prices before continuing."
  },
  {
    id: 5,
    title: "FAQs & Terms",
    component: FinalTermsStep,
    description: "Hotel rules, cancellation policy, and optional FAQs.",
    requiredFields: ["termsAccepted"]
  }
];
