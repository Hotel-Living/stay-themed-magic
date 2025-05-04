
import { GeneralInformationStep1 } from "./GeneralInformationStep1";
import { GeneralInformationStep2 } from "./GeneralInformationStep2";
import { AccommodationTermsStep } from "./AccommodationTermsStep";
import { PackagesBuilderStep } from "./PackagesBuilderStep";
import { FinalTermsStep } from "./FinalTermsStep";

export const stepsConfig = [
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
    requiredFields: ["stayDurations", "checkinDay", "mealPlans", "roomTypes", "available_months"]
  },
  {
    id: 4,
    title: "Packages & Pricing",
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
    title: "FAQs & Terms",
    component: FinalTermsStep,
    description: "Hotel rules, cancellation policy, and optional FAQs.",
    requiredFields: ["termsAccepted"]
  }
];
