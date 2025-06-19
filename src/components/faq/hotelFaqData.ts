
import { FaqItem, FaqCategory } from "./hotel-types";
import { useTranslation } from "@/hooks/useTranslation";

// Spanish imports
import { benefitsFaqs as benefitsFaqsEs } from "./hotel-categories/benefitsFaqs";
import { modelsFaqs as modelsFaqsEs } from "./hotel-categories/modelsFaqs";
import { operationFaqs as operationFaqsEs } from "./hotel-categories/operationFaqs";
import { integrationFaqs as integrationFaqsEs } from "./hotel-categories/integrationFaqs";
import { revenueFaqs as revenueFaqsEs } from "./hotel-categories/revenueFaqs";
import { guestsFaqs as guestsFaqsEs } from "./hotel-categories/guestsFaqs";
import { marketingFaqs as marketingFaqsEs } from "./hotel-categories/marketingFaqs";
import { paymentFaqs as paymentFaqsEs } from "./hotel-categories/paymentFaqs";
import { affinitiesFaqs as affinitiesFaqsEs } from "./hotel-categories/affinitiesFaqs";
import { videoFaqs } from "./hotel-categories/videoFaqs";
import { seniorsFaqs as seniorsFaqsEs } from "./hotel-categories/seniorsFaqs";
import { stepsFaqs } from "./hotel-categories/stepsFaqs";
import { rentalFaqs } from "./hotel-categories/rentalFaqs";

// English imports
import { benefitsFaqs as benefitsFaqsEn } from "./hotel-categories/en/benefitsFaqs";
import { modelsFaqs as modelsFaqsEn } from "./hotel-categories/en/modelsFaqs";
import { operationFaqs as operationFaqsEn } from "./hotel-categories/en/operationFaqs";
import { integrationFaqs as integrationFaqsEn } from "./hotel-categories/en/integrationFaqs";
import { revenueFaqs as revenueFaqsEn } from "./hotel-categories/en/revenueFaqs";
import { guestsFaqs as guestsFaqsEn } from "./hotel-categories/en/guestsFaqs";
import { marketingFaqs as marketingFaqsEn } from "./hotel-categories/en/marketingFaqs";
import { paymentFaqs as paymentFaqsEn } from "./hotel-categories/en/paymentFaqs";
import { affinitiesFaqs as affinitiesFaqsEn } from "./hotel-categories/en/affinitiesFaqs";
import { seniorsFaqs as seniorsFaqsEn } from "./hotel-categories/en/seniorsFaqs";

export type { FaqItem, FaqCategory };

export const useHotelFaqCategories = () => {
  const { t, language } = useTranslation();
  const isEnglish = language === 'en';
  
  return [
    { id: "video", name: "Video" },
    { id: "benefits", name: isEnglish ? "BENEFITS" : "Beneficios" },
    { id: "models", name: isEnglish ? "MODELS" : "Modelos" },
    { id: "revenue", name: isEnglish ? "REVENUE" : "Ingresos" },
    { id: "guests", name: isEnglish ? "GUESTS" : "Huéspedes" },
    { id: "seniors", name: isEnglish ? "SENIORS" : "Mayores" },
    { id: "affinities", name: isEnglish ? "AFFINITIES" : "Afinidades" },
    { id: "operation", name: isEnglish ? "OPERATIONS" : "Operativa" },
    { id: "integration", name: isEnglish ? "INTEGRATION" : "Integración" },
    { id: "marketing", name: isEnglish ? "MARKETING" : "Marketing" },
    { id: "payment", name: isEnglish ? "PAYMENTS & COMMISSIONS" : "Pagos y Comisiones" },
    { id: "steps", name: "Pasos" },
    { id: "rental", name: "Alquiler" }
  ];
};

export const hotelFaqCategories: FaqCategory[] = [
  { id: "video", name: "Video" },
  { id: "benefits", name: "Beneficios" },
  { id: "models", name: "Modelos" },
  { id: "revenue", name: "Ingresos" },
  { id: "guests", name: "Huéspedes" },
  { id: "seniors", name: "Mayores" },
  { id: "affinities", name: "Afinidades" },
  { id: "operation", name: "Operativa" },
  { id: "integration", name: "Integración" },
  { id: "marketing", name: "Marketing" },
  { id: "payment", name: "Pagos y Comisiones" },
  { id: "steps", name: "Pasos" },
  { id: "rental", name: "Alquiler" }
];

export const useHotelFaqsByCategory = () => {
  const { language } = useTranslation();
  const isEnglish = language === 'en';

  const hotelFaqsByCategory: Record<string, FaqItem[]> = {
    video: videoFaqs,
    benefits: isEnglish ? benefitsFaqsEn : benefitsFaqsEs,
    models: isEnglish ? modelsFaqsEn : modelsFaqsEs,
    operation: isEnglish ? operationFaqsEn : operationFaqsEs,
    integration: isEnglish ? integrationFaqsEn : integrationFaqsEs,
    revenue: isEnglish ? revenueFaqsEn : revenueFaqsEs,
    guests: isEnglish ? guestsFaqsEn : guestsFaqsEs,
    seniors: isEnglish ? seniorsFaqsEn : seniorsFaqsEs,
    marketing: isEnglish ? marketingFaqsEn : marketingFaqsEs,
    payment: isEnglish ? paymentFaqsEn : paymentFaqsEs,
    affinities: isEnglish ? affinitiesFaqsEn : affinitiesFaqsEs,
    steps: stepsFaqs,
    rental: rentalFaqs
  };

  return hotelFaqsByCategory;
};

// Keep the old export for backward compatibility
export const hotelFaqsByCategory: Record<string, FaqItem[]> = {
  video: videoFaqs,
  benefits: benefitsFaqsEs,
  models: modelsFaqsEs,
  operation: operationFaqsEs,
  integration: integrationFaqsEs,
  revenue: revenueFaqsEs,
  guests: guestsFaqsEs,
  seniors: seniorsFaqsEs,
  marketing: marketingFaqsEs,
  payment: paymentFaqsEs,
  affinities: affinitiesFaqsEs,
  steps: stepsFaqs,
  rental: rentalFaqs
};
