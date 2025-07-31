import { FaqCategory } from "./types";
import { useTranslation } from "@/hooks/useTranslation";

// Spanish imports
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

// English imports
import { benefitsFaqs as benefitsFaqsEn } from "./hotel-categories/en/benefitsFaqs";
import { affinitiesFaqs as affinitiesFaqsEn } from "./hotel-categories/en/affinitiesFaqs";

// Portuguese imports  
import { affinitiesFaqs as affinitiesFaqsPt } from "./hotel-categories/pt/affinitiesFaqs";

// Romanian imports
import { affinitiesFaqs as affinitiesFaqsRo } from "./hotel-categories/ro/affinitiesFaqs";

export const useHotelFaqCategories = (): FaqCategory[] => {
  const { language } = useTranslation();
  
  const categoryTranslations = {
    en: {
      benefits: "BENEFITS",
      models: "MODEL", 
      revenue: "SALES",
      guests: "GUESTS",
      seniors: "SENIORS",
      affinities: "AFFINITIES",
      operation: "OPERATION",
      integration: "INTEGRATION", 
      marketing: "MARKETING",
      payment: "PAYMENT"
    },
    es: {
      benefits: "BENEFICIOS",
      models: "MODELO",
      revenue: "VENTAS", 
      guests: "CLIENTES",
      seniors: "MAYORES",
      affinities: "AFINIDADES",
      operation: "OPERACIÓN",
      integration: "INTEGRACIÓN",
      marketing: "MARKETING",
      payment: "PAGO"
    },
    pt: {
      benefits: "BENEFÍCIOS",
      models: "MODELO",
      revenue: "VENDAS",
      guests: "CLIENTES", 
      seniors: "IDOSOS",
      affinities: "AFINIDADES",
      operation: "OPERAÇÃO",
      integration: "INTEGRAÇÃO",
      marketing: "MARKETING", 
      payment: "PAGAMENTO"
    },
    ro: {
      benefits: "BENEFICII",
      models: "MODEL",
      revenue: "VÂNZĂRI",
      guests: "OASPEȚI",
      seniors: "SENIORI", 
      affinities: "AFINITĂȚI",
      operation: "OPERARE",
      integration: "INTEGRARE",
      marketing: "MARKETING",
      payment: "PLATĂ"
    }
  };
  
  const translations = categoryTranslations[language as keyof typeof categoryTranslations] || categoryTranslations.en;
  
  return [
    { id: "benefits", name: translations.benefits },
    { id: "models", name: translations.models },
    { id: "revenue", name: translations.revenue },
    { id: "guests", name: translations.guests },
    { id: "seniors", name: translations.seniors },
    { id: "affinities", name: translations.affinities },
    { id: "operation", name: translations.operation },
    { id: "integration", name: translations.integration },
    { id: "marketing", name: translations.marketing },
    { id: "payment", name: translations.payment }
  ];
};

export const useHotelFaqsByCategory = () => {
  const { language } = useTranslation();
  
  // Return language-specific content
  switch (language) {
    case 'en':
      return {
        benefits: benefitsFaqsEn,
        models: modelsFaqsEs, // Fallback to Spanish until English translation exists
        revenue: revenueFaqsEs, // Fallback to Spanish until English translation exists
        guests: guestsFaqsEs, // Fallback to Spanish until English translation exists
        seniors: seniorsFaqsEs, // Fallback to Spanish until English translation exists
        affinities: affinitiesFaqsEn,
        operation: operationFaqsEs, // Fallback to Spanish until English translation exists
        integration: integrationFaqsEs, // Fallback to Spanish until English translation exists
        marketing: marketingFaqsEs, // Fallback to Spanish until English translation exists
        payment: paymentFaqsEs // Fallback to Spanish until English translation exists
      };
    case 'pt':
      return {
        benefits: benefitsFaqsEs, // Fallback to Spanish until Portuguese translation exists
        models: modelsFaqsEs, // Fallback to Spanish until Portuguese translation exists
        revenue: revenueFaqsEs, // Fallback to Spanish until Portuguese translation exists
        guests: guestsFaqsEs, // Fallback to Spanish until Portuguese translation exists
        seniors: seniorsFaqsEs, // Fallback to Spanish until Portuguese translation exists
        affinities: affinitiesFaqsPt,
        operation: operationFaqsEs, // Fallback to Spanish until Portuguese translation exists
        integration: integrationFaqsEs, // Fallback to Spanish until Portuguese translation exists
        marketing: marketingFaqsEs, // Fallback to Spanish until Portuguese translation exists
        payment: paymentFaqsEs // Fallback to Spanish until Portuguese translation exists
      };
    case 'ro':
      return {
        benefits: benefitsFaqsEs, // Fallback to Spanish until Romanian translation exists
        models: modelsFaqsEs, // Fallback to Spanish until Romanian translation exists
        revenue: revenueFaqsEs, // Fallback to Spanish until Romanian translation exists
        guests: guestsFaqsEs, // Fallback to Spanish until Romanian translation exists
        seniors: seniorsFaqsEs, // Fallback to Spanish until Romanian translation exists
        affinities: affinitiesFaqsRo,
        operation: operationFaqsEs, // Fallback to Spanish until Romanian translation exists
        integration: integrationFaqsEs, // Fallback to Spanish until Romanian translation exists
        marketing: marketingFaqsEs, // Fallback to Spanish until Romanian translation exists
        payment: paymentFaqsEs // Fallback to Spanish until Romanian translation exists
      };
    default: // Spanish (es)
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
        payment: paymentFaqsEs
      };
  }
};
