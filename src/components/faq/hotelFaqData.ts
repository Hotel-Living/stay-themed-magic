
import { FaqItem, FaqCategory } from "./hotel-types";
import { benefitsFaqs } from "./hotel-categories/benefitsFaqs";
import { modelsFaqs } from "./hotel-categories/modelsFaqs";
import { operationFaqs } from "./hotel-categories/operationFaqs";
import { integrationFaqs } from "./hotel-categories/integrationFaqs";
import { revenueFaqs } from "./hotel-categories/revenueFaqs";
import { guestsFaqs } from "./hotel-categories/guestsFaqs";
import { marketingFaqs } from "./hotel-categories/marketingFaqs";
import { paymentFaqs } from "./hotel-categories/paymentFaqs";
import { affinitiesFaqs } from "./hotel-categories/affinitiesFaqs";
import { videoFaqs } from "./hotel-categories/videoFaqs";
import { seniorsFaqs } from "./hotel-categories/seniorsFaqs";
import { stepsFaqs } from "./hotel-categories/stepsFaqs";
import { rentalFaqs } from "./hotel-categories/rentalFaqs";

export type { FaqItem, FaqCategory };

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

export const hotelFaqsByCategory: Record<string, FaqItem[]> = {
  video: videoFaqs,
  benefits: benefitsFaqs,
  models: modelsFaqs,
  operation: operationFaqs,
  integration: integrationFaqs,
  revenue: revenueFaqs,
  guests: guestsFaqs,
  seniors: seniorsFaqs,
  marketing: marketingFaqs,
  payment: paymentFaqs,
  affinities: affinitiesFaqs,
  steps: stepsFaqs,
  rental: rentalFaqs
};
