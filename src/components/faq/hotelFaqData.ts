
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

// Romanian imports
import { benefitsFaqs as benefitsFaqsRo } from "./hotel-categories/ro/benefitsFaqs";
import { modelsFaqs as modelsFaqsRo } from "./hotel-categories/ro/modelsFaqs";
import { operationFaqs as operationFaqsRo } from "./hotel-categories/ro/operationFaqs";
import { integrationFaqs as integrationFaqsRo } from "./hotel-categories/ro/integrationFaqs";
import { revenueFaqs as revenueFaqsRo } from "./hotel-categories/ro/revenueFaqs";
import { guestsFaqs as guestsFaqsRo } from "./hotel-categories/ro/guestsFaqs";
import { marketingFaqs as marketingFaqsRo } from "./hotel-categories/ro/marketingFaqs";
import { paymentFaqs as paymentFaqsRo } from "./hotel-categories/ro/paymentFaqs";
import { affinitiesFaqs as affinitiesFaqsRo } from "./hotel-categories/ro/affinitiesFaqs";
import { seniorsFaqs as seniorsFaqsRo } from "./hotel-categories/ro/seniorsFaqs";

export type { FaqItem, FaqCategory };

export const useHotelFaqCategories = () => {
  const { language } = useTranslation();
  const isEnglish = language === 'en';
  const isRomanian = language === 'ro';
  
  return [
    { id: "video", name: "Video" },
    { id: "benefits", name: isEnglish ? "BENEFITS" : isRomanian ? "BENEFICII" : "Beneficios" },
    { id: "models", name: isEnglish ? "MODELS" : isRomanian ? "MODELE" : "Modelos" },
    { id: "revenue", name: isEnglish ? "REVENUE" : isRomanian ? "VENITURI" : "Ingresos" },
    { id: "guests", name: isEnglish ? "GUESTS" : isRomanian ? "OASPEȚI" : "Huéspedes" },
    { id: "seniors", name: isEnglish ? "SENIORS" : isRomanian ? "SENIORI" : "Mayores" },
    { id: "affinities", name: isEnglish ? "AFFINITIES" : isRomanian ? "AFINITĂȚI" : "Afinidades" },
    { id: "operation", name: isEnglish ? "OPERATIONS" : isRomanian ? "OPERAȚIUNI" : "Operativa" },
    { id: "integration", name: isEnglish ? "INTEGRATION" : isRomanian ? "INTEGRARE" : "Integración" },
    { id: "marketing", name: isEnglish ? "MARKETING" : isRomanian ? "MARKETING" : "Marketing" },
    { id: "payment", name: isEnglish ? "PAYMENTS & COMMISSIONS" : isRomanian ? "PLĂȚI ȘI COMISIOANE" : "Pagos y Comisiones" },
    { id: "steps", name: isEnglish ? "STEPS" : isRomanian ? "PAȘI" : "Pasos" },
    { id: "rental", name: isEnglish ? "RENTAL" : isRomanian ? "ÎNCHIRIERE" : "Alquiler" }
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
  const isRomanian = language === 'ro';

  const hotelFaqsByCategory: Record<string, FaqItem[]> = {
    video: videoFaqs,
    benefits: isEnglish ? benefitsFaqsEn : isRomanian ? benefitsFaqsRo : benefitsFaqsEs,
    models: isEnglish ? modelsFaqsEn : isRomanian ? modelsFaqsRo : modelsFaqsEs,
    operation: isEnglish ? operationFaqsEn : isRomanian ? operationFaqsRo : operationFaqsEs,
    integration: isEnglish ? integrationFaqsEn : isRomanian ? integrationFaqsRo : integrationFaqsEs,
    revenue: isEnglish ? revenueFaqsEn : isRomanian ? revenueFaqsRo : revenueFaqsEs,
    guests: isEnglish ? guestsFaqsEn : isRomanian ? guestsFaqsRo :guestsFaqsEs,
    seniors: isEnglish ? seniorsFaqsEn : isRomanian ? seniorsFaqsRo : seniorsFaqsEs,
    marketing: isEnglish ? marketingFaqsEn : isRomanian ? marketingFaqsRo : marketingFaqsEs,
    payment: isEnglish ? paymentFaqsEn : isRomanian ? paymentFaqsRo : paymentFaqsEs,
    affinities: isEnglish ? affinitiesFaqsEn : isRomanian ? affinitiesFaqsRo : affinitiesFaqsEs,
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
