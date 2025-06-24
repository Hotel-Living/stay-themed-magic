import { FaqCategory } from "./types";

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

// Keep existing English imports
import { benefitsFaqs } from "./hotel-categories/benefitsFaqs";
import { affinitiesFaqs } from "./hotel-categories/affinitiesFaqs";

export const useHotelFaqCategories = (): FaqCategory[] => {
  return [
    { id: "benefits", name: "BENEFICIOS" },
    { id: "models", name: "MODELO" },
    { id: "revenue", name: "VENTAS" },
    { id: "guests", name: "CLIENTES" },
    { id: "seniors", name: "MAYORES" },
    { id: "affinities", name: "AFINIDADES" },
    { id: "operation", name: "OPERACIÓN" },
    { id: "integration", name: "INTEGRACIÓN" },
    { id: "marketing", name: "MARKETING" },
    { id: "payment", name: "PAGO" }
  ];
};

export const useHotelFaqsByCategory = () => {
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
};
