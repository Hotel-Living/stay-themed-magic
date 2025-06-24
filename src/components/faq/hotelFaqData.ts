
import { FaqItem, FaqCategory } from "./hotel-types";
import { useTranslation } from "@/hooks/useTranslation";

// English imports
import { benefitsFaqs as benefitsFaqsEn } from "./hotel-categories/en/benefitsFaqs";
import { modelsFaqs as modelsFaqsEn } from "./hotel-categories/en/modelsFaqs";
import { revenueFaqs as revenueFaqsEn } from "./hotel-categories/en/revenueFaqs";
import { guestsFaqs as guestsFaqsEn } from "./hotel-categories/en/guestsFaqs";
import { seniorsFaqs as seniorsFaqsEn } from "./hotel-categories/en/seniorsFaqs";
import { affinitiesFaqs as affinitiesFaqsEn } from "./hotel-categories/en/affinitiesFaqs";
import { operationFaqs as operationFaqsEn } from "./hotel-categories/en/operationFaqs";
import { integrationFaqs as integrationFaqsEn } from "./hotel-categories/en/integrationFaqs";
import { marketingFaqs as marketingFaqsEn } from "./hotel-categories/en/marketingFaqs";
import { paymentFaqs as paymentFaqsEn } from "./hotel-categories/en/paymentFaqs";

// Spanish imports - corrected paths
import { benefitsFaqs as benefitsFaqsEs } from "./hotel-categories/es/benefitsFaqs";
import { modelsFaqs as modelsFaqsEs } from "./hotel-categories/es/modelsFaqs";
import { revenueFaqs as revenueFaqsEs } from "./hotel-categories/es/revenueFaqs";
import { guestsFaqs as guestsFaqsEs } from "./hotel-categories/es/guestsFaqs";
import { seniorsFaqs as seniorsFaqsEs } from "./hotel-categories/es/seniorsFaqs";
import { affinitiesFaqs as affinitiesFaqsEs } from "./hotel-categories/es/affinitiesFaqs";
import { operationFaqs as operationFaqsEs } from "./hotel-categories/es/operationFaqs";
import { integrationFaqs as integrationFaqsEs } from "./hotel-categories/es/integrationFaqs";
import { marketingFaqs as marketingFaqsEs } from "./hotel-categories/es/marketingFaqs";
import { paymentFaqs as paymentFaqsEs } from "./hotel-categories/es/paymentFaqs";
import { stepsFaqs as stepsFaqsEs } from "./hotel-categories/es/stepsFaqs";
import { rentalFaqs as rentalFaqsEs } from "./hotel-categories/es/rentalFaqs";

export const useHotelFaqCategories = () => {
  const { language } = useTranslation();
  
  if (language === 'es') {
    return [
      { id: "video", name: "VIDEO" },
      { id: "benefits", name: "BENEFICIOS" },
      { id: "models", name: "MODELO" },
      { id: "revenue", name: "INGRESOS" },
      { id: "guests", name: "HUÉSPEDES" },
      { id: "seniors", name: "MAYORES" },
      { id: "affinities", name: "AFINIDADES" },
      { id: "operation", name: "OPERACIONES" },
      { id: "integration", name: "INTEGRACIÓN" },
      { id: "marketing", name: "MARKETING" },
      { id: "payment", name: "PAGOS" },
      { id: "steps", name: "PASOS" },
      { id: "rental", name: "ALQUILER" }
    ];
  }

  // English version (default)
  return [
    { id: "video", name: "VIDEO" },
    { id: "benefits", name: "BENEFITS" },
    { id: "models", name: "MODELS" },
    { id: "revenue", name: "REVENUE" },
    { id: "guests", name: "GUESTS" },
    { id: "seniors", name: "SENIORS" },
    { id: "affinities", name: "AFFINITIES" },
    { id: "operation", name: "OPERATION" },
    { id: "integration", name: "INTEGRATION" },
    { id: "marketing", name: "MARKETING" },
    { id: "payment", name: "PAYMENT" },
    { id: "steps", name: "STEPS" },
    { id: "rental", name: "RENTAL" }
  ];
};

export const useHotelFaqsByCategory = () => {
  const { language } = useTranslation();
  
  if (language === 'es') {
    return {
      benefits: benefitsFaqsEs,
      models: modelsFaqsEs,
      revenue: revenueFaqsEs,
      guests: guestsFaqsEs,
      seniors: seniorsFaqsEs,
      affinities: affinitiesFaqsEs,
      operation: operationFaqsEs,
      integration: integrationFaqsEs,
      marketing: marketingFaqsEs,
      payment: paymentFaqsEs,
      steps: stepsFaqsEs,
      rental: rentalFaqsEs
    };
  }

  // English version (default)
  return {
    benefits: benefitsFaqsEn,
    models: modelsFaqsEn,
    revenue: revenueFaqsEn,
    guests: guestsFaqsEn,
    seniors: seniorsFaqsEn,
    affinities: affinitiesFaqsEn,
    operation: operationFaqsEn,
    integration: integrationFaqsEn,
    marketing: marketingFaqsEn,
    payment: paymentFaqsEn,
    steps: [], // Empty for now
    rental: [] // Empty for now
  };
};
