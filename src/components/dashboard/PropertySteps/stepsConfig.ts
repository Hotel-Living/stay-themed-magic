
import { StepOne } from "./StepOne";
import { GeneralInformationStep2 } from "./GeneralInformationStep2";
import { AccommodationTermsStep } from "./AccommodationTerms/AccommodationTermsStep";
import PackagesBuilderStep from "./PackagesBuilderStep";
import { FinalTermsStep } from "./FinalTermsStep";

export const stepsConfig = [
  {
    id: 1,
    title: "GENERAL INFORMATION",
    component: StepOne,
    description: "Basic details about the hotel (name, address, category, description)."
  },
  {
    id: 2,
    title: "HOTEL PROFILE",
    component: GeneralInformationStep2,
    description: "Affinities, activities, hotel features, and room type structure.",
    requiredFields: ["affinities", "activities", "roomTypes"]
  },
  {
    id: 3,
    title: "ACCOMMODATION TERMS",
    component: AccommodationTermsStep,
    description: "Stay durations, check-in rules, availability calendar, meals, and rooms.",
    requiredFields: ["stayDurations", "checkinDay", "mealPlans", "roomTypes", "available_months"]
  },
  {
    id: 4,
    title: "PACKAGES AND RATES",
    component: PackagesBuilderStep,
    description: "Define exact prices for each room × duration × meal plan combination.",
    validate: (formData: any) => {
      const matrix = formData.pricingMatrix || [];
      const allComplete = matrix.every(
        (row: any) =>
          row.price !== null &&
          row.price !== undefined &&
          row.price !== "" &&
          !isNaN(row.price)
      );
      return allComplete;
    },
    errorMessage: "Please complete all prices before continuing."
  },
  {
    id: 5,
    title: "FAQ AND TERMS",
    component: FinalTermsStep,
    description: "Hotel rules, cancellation policy, and optional FAQs.",
    requiredFields: ["termsAccepted"]
  }
];
