
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
import { pasosFaqs } from "./hotel-categories/pasosFaqs";
import { alquilerFaqs } from "./hotel-categories/alquilerFaqs";

export type { FaqItem, FaqCategory };

export const hotelFaqCategories: FaqCategory[] = [
  { id: "video", name: "Video" },
  { id: "beneficios", name: "Beneficios" },
  { id: "modelos", name: "Modelos" },
  { id: "ingresos", name: "Ingresos" },
  { id: "huespedes", name: "Huéspedes" },
  { id: "mayores", name: "Mayores" },
  { id: "afinidades", name: "Afinidades" },
  { id: "operativa", name: "Operativa" },
  { id: "integracion", name: "Integración" },
  { id: "marketing", name: "Marketing" },
  { id: "pagos", name: "Pagos y Comisiones" },
  { id: "pasos", name: "Primeros Pasos" },
  { id: "alquiler", name: "vs Alquiler" }
];

export const hotelFaqsByCategory: Record<string, FaqItem[]> = {
  video: videoFaqs,
  beneficios: benefitsFaqs,
  modelos: modelsFaqs,
  operativa: operationFaqs,
  integracion: integrationFaqs,
  ingresos: revenueFaqs,
  huespedes: guestsFaqs,
  mayores: seniorsFaqs,
  marketing: marketingFaqs,
  pagos: paymentFaqs,
  afinidades: affinitiesFaqs,
  pasos: pasosFaqs,
  alquiler: alquilerFaqs
};
