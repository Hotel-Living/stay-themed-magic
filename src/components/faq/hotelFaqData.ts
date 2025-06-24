
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

// Spanish imports
import { benefitsFaqs as benefitsFaqsEs } from "./hotelFaqData/es/benefitsFaqs";
import { modelsFaqs as modelsFaqsEs } from "./hotelFaqData/es/modelsFaqs";
import { revenueFaqs as revenueFaqsEs } from "./hotelFaqData/es/revenueFaqs";
import { guestsFaqs as guestsFaqsEs } from "./hotelFaqData/es/guestsFaqs";
import { seniorsFaqs as seniorsFaqsEs } from "./hotelFaqData/es/seniorsFaqs";
import { affinitiesFaqs as affinitiesFaqsEs } from "./hotelFaqData/es/affinitiesFaqs";
import { operationFaqs as operationFaqsEs } from "./hotelFaqData/es/operationFaqs";
import { integrationFaqs as integrationFaqsEs } from "./hotelFaqData/es/integrationFaqs";
import { marketingFaqs as marketingFaqsEs } from "./hotelFaqData/es/marketingFaqs";
import { paymentFaqs as paymentFaqsEs } from "./hotelFaqData/es/paymentFaqs";

// Portuguese imports
import { benefitsFaqs as benefitsFaqsPt } from "./hotel-categories/pt/benefitsFaqs";
import { modelsFaqs as modelsFaqsPt } from "./hotel-categories/pt/modelsFaqs";
import { revenueFaqs as revenueFaqsPt } from "./hotel-categories/pt/revenueFaqs";
import { guestsFaqs as guestsFaqsPt } from "./hotel-categories/pt/guestsFaqs";
import { seniorsFaqs as seniorsFaqsPt } from "./hotel-categories/pt/seniorsFaqs";
import { affinitiesFaqs as affinitiesFaqsPt } from "./hotel-categories/pt/affinitiesFaqs";
import { operationFaqs as operationFaqsPt } from "./hotel-categories/pt/operationFaqs";
import { integrationFaqs as integrationFaqsPt } from "./hotel-categories/pt/integrationFaqs";
import { marketingFaqs as marketingFaqsPt } from "./hotel-categories/pt/marketingFaqs";
import { paymentFaqs as paymentFaqsPt } from "./hotel-categories/pt/paymentFaqs";

// Romanian imports
import { benefitsFaqs as benefitsFaqsRo } from "./hotel-categories/ro/benefitsFaqs";
import { modelsFaqs as modelsFaqsRo } from "./hotel-categories/ro/modelsFaqs";
import { revenueFaqs as revenueFaqsRo } from "./hotel-categories/ro/revenueFaqs";
import { guestsFaqs as guestsFaqsRo } from "./hotel-categories/ro/guestsFaqs";
import { seniorsFaqs as seniorsFaqsRo } from "./hotel-categories/ro/seniorsFaqs";
import { affinitiesFaqs as affinitiesFaqsRo } from "./hotel-categories/ro/affinitiesFaqs";
import { operationFaqs as operationFaqsRo } from "./hotel-categories/ro/operationFaqs";
import { integrationFaqs as integrationFaqsRo } from "./hotel-categories/ro/integrationFaqs";
import { marketingFaqs as marketingFaqsRo } from "./hotel-categories/ro/marketingFaqs";
import { paymentFaqs as paymentFaqsRo } from "./hotel-categories/ro/paymentFaqs";

export const useHotelFaqCategories = () => {
  const { language } = useTranslation();

  if (language === 'es') {
    return [
      { id: "video", name: "Video" },
      { id: "benefits", name: "Beneficios" },
      { id: "models", name: "Modelos" },
      { id: "revenue", name: "Ingresos" },
      { id: "guests", name: "¿Huéspedes?" },
      { id: "seniors", name: "¿Mayores?" },
      { id: "affinities", name: "¿Afinidades?" },
      { id: "operation", name: "Operación" },
      { id: "integration", name: "Integración" },
      { id: "marketing", name: "Marketing" },
      { id: "payment", name: "Pago" },
      { id: "steps", name: "Pasos" },
      { id: "rental", name: "Alquiler" }
    ];
  }

  if (language === 'pt') {
    return [
      { id: "video", name: "Vídeo" },
      { id: "benefits", name: "Benefícios" },
      { id: "models", name: "Modelos" },
      { id: "revenue", name: "Receitas" },
      { id: "guests", name: "Hóspedes?" },
      { id: "seniors", name: "Idosos?" },
      { id: "affinities", name: "Afinidades?" },
      { id: "operation", name: "Operação" },
      { id: "integration", name: "Integração" },
      { id: "marketing", name: "Marketing" },
      { id: "payment", name: "Pagamento" },
      { id: "steps", name: "Passos" },
      { id: "rental", name: "Aluguel" }
    ];
  }

  if (language === 'ro') {
    return [
      { id: "video", name: "Video" },
      { id: "benefits", name: "Beneficii" },
      { id: "models", name: "Modele" },
      { id: "revenue", name: "Venituri" },
      { id: "guests", name: "Oaspeți?" },
      { id: "seniors", name: "Seniori?" },
      { id: "affinities", name: "Afinități?" },
      { id: "operation", name: "Operațiune" },
      { id: "integration", name: "Integrare" },
      { id: "marketing", name: "Marketing" },
      { id: "payment", name: "Plată" },
      { id: "steps", name: "Pași" },
      { id: "rental", name: "Închiriere" }
    ];
  }

  // English version with question formatting
  return [
    { id: "video", name: "Video" },
    { id: "benefits", name: "Benefits" },
    { id: "models", name: "Models" },
    { id: "revenue", name: "Revenue" },
    { id: "guests", name: "Guests?" },
    { id: "seniors", name: "SENIORS?" },
    { id: "affinities", name: "Affinities?" },
    { id: "operation", name: "Operation" },
    { id: "integration", name: "Integration" },
    { id: "marketing", name: "Marketing" },
    { id: "payment", name: "Payment" },
    { id: "steps", name: "Steps" },
    { id: "rental", name: "Rental" }
  ];
};

export const useHotelFaqsByCategory = () => {
  const { language } = useTranslation();

  if (language === 'es') {
    return {
      video: [],
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
      steps: [],
      rental: []
    };
  }

  if (language === 'pt') {
    return {
      video: [],
      benefits: benefitsFaqsPt,
      models: modelsFaqsPt,
      revenue: revenueFaqsPt,
      guests: guestsFaqsPt,
      seniors: seniorsFaqsPt,
      affinities: affinitiesFaqsPt,
      operation: operationFaqsPt,
      integration: integrationFaqsPt,
      marketing: marketingFaqsPt,
      payment: paymentFaqsPt,
      steps: [],
      rental: []
    };
  }

  if (language === 'ro') {
    return {
      video: [],
      benefits: benefitsFaqsRo,
      models: modelsFaqsRo,
      revenue: revenueFaqsRo,
      guests: guestsFaqsRo,
      seniors: seniorsFaqsRo,
      affinities: affinitiesFaqsRo,
      operation: operationFaqsRo,
      integration: integrationFaqsRo,
      marketing: marketingFaqsRo,
      payment: paymentFaqsRo,
      steps: [],
      rental: []
    };
  }

  // Default to English
  return {
    video: [],
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
    steps: [],
    rental: []
  };
};
