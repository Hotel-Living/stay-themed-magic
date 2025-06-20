
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

// Portuguese imports
import { benefitsFaqs as benefitsFaqsPt } from "./hotel-categories/pt/benefitsFaqs";
import { modelsFaqs as modelsFaqsPt } from "./hotel-categories/pt/modelsFaqs";
import { operationFaqs as operationFaqsPt } from "./hotel-categories/pt/operationFaqs";
import { integrationFaqs as integrationFaqsPt } from "./hotel-categories/pt/integrationFaqs";
import { revenueFaqs as revenueFaqsPt } from "./hotel-categories/pt/revenueFaqs";
import { guestsFaqs as guestsFaqsPt } from "./hotel-categories/pt/guestsFaqs";
import { marketingFaqs as marketingFaqsPt } from "./hotel-categories/pt/marketingFaqs";
import { paymentFaqs as paymentFaqsPt } from "./hotel-categories/pt/paymentFaqs";
import { affinitiesFaqs as affinitiesFaqsPt } from "./hotel-categories/pt/affinitiesFaqs";
import { seniorsFaqs as seniorsFaqsPt } from "./hotel-categories/pt/seniorsFaqs";

export type { FaqItem, FaqCategory };

export const useHotelFaqCategories = () => {
  const { language } = useTranslation();
  const isEnglish = language === 'en';
  const isRomanian = language === 'ro';
  const isPortuguese = language === 'pt';
  
  return [
    { id: "video", name: "Video" },
    { id: "benefits", name: isEnglish ? "BENEFITS" : isRomanian ? "BENEFICII" : isPortuguese ? "BENEFÍCIOS" : "Beneficios" },
    { id: "models", name: isEnglish ? "MODELS" : isRomanian ? "MODELE" : isPortuguese ? "MODELOS" : "Modelos" },
    { id: "revenue", name: isEnglish ? "REVENUE" : isRomanian ? "VENITURI" : isPortuguese ? "RECEITAS" : "Ingresos" },
    { id: "guests", name: isEnglish ? "GUESTS" : isRomanian ? "OASPEȚI" : isPortuguese ? "HÓSPEDES" : "Huéspedes" },
    { id: "seniors", name: isEnglish ? "SENIORS" : isRomanian ? "SENIORI" : isPortuguese ? "IDOSOS" : "Mayores" },
    { id: "affinities", name: isEnglish ? "AFFINITIES" : isRomanian ? "AFINITĂȚI" : isPortuguese ? "AFINIDADES" : "Afinidades" },
    { id: "operation", name: isEnglish ? "OPERATIONS" : isRomanian ? "OPERAȚIUNI" : isPortuguese ? "OPERAÇÕES" : "Operativa" },
    { id: "integration", name: isEnglish ? "INTEGRATION" : isRomanian ? "INTEGRARE" : isPortuguese ? "INTEGRAÇÃO" : "Integración" },
    { id: "marketing", name: isEnglish ? "MARKETING" : isRomanian ? "MARKETING" : isPortuguese ? "MARKETING" : "Marketing" },
    { id: "payment", name: isEnglish ? "PAYMENTS & COMMISSIONS" : isRomanian ? "PLĂȚI ȘI COMISIOANE" : isPortuguese ? "PAGAMENTOS E COMISSÕES" : "Pagos y Comisiones" },
    { id: "steps", name: isEnglish ? "STEPS" : isRomanian ? "PAȘI" : isPortuguese ? "PASSOS" : "Pasos" },
    { id: "rental", name: isEnglish ? "RENTAL" : isRomanian ? "ÎNCHIRIERE" : isPortuguese ? "ALUGUEL" : "Alquiler" }
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
  const isPortuguese = language === 'pt';

  const hotelFaqsByCategory: Record<string, FaqItem[]> = {
    video: videoFaqs,
    benefits: isEnglish ? benefitsFaqsEn : isRomanian ? benefitsFaqsRo : isPortuguese ? benefitsFaqsPt : benefitsFaqsEs,
    models: isEnglish ? modelsFaqsEn : isRomanian ? modelsFaqsRo : isPortuguese ? modelsFaqsPt : modelsFaqsEs,
    operation: isEnglish ? operationFaqsEn : isRomanian ? operationFaqsRo : isPortuguese ? operationFaqsPt : operationFaqsEs,
    integration: isEnglish ? integrationFaqsEn : isRomanian ? integrationFaqsRo : isPortuguese ? integrationFaqsPt : integrationFaqsEs,
    revenue: isEnglish ? revenueFaqsEn : isRomanian ? revenueFaqsRo : isPortuguese ? revenueFaqsPt : revenueFaqsEs,
    guests: isEnglish ? guestsFaqsEn : isRomanian ? guestsFaqsRo : isPortuguese ? guestsFaqsPt : guestsFaqsEs,
    seniors: isEnglish ? seniorsFaqsEn : isRomanian ? seniorsFaqsRo : isPortuguese ? seniorsFaqsPt : seniorsFaqsEs,
    marketing: isEnglish ? marketingFaqsEn : isRomanian ? marketingFaqsRo : isPortuguese ? marketingFaqsPt : marketingFaqsEs,
    payment: isEnglish ? paymentFaqsEn : isRomanian ? paymentFaqsRo : isPortuguese ? paymentFaqsPt : paymentFaqsEs,
    affinities: isEnglish ? affinitiesFaqsEn : isRomanian ? affinitiesFaqsRo : isPortuguese ? affinitiesFaqsPt : affinitiesFaqsEs,
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
