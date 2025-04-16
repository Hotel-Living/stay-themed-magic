
import { FaqItem, FaqCategory } from "./hotel-types";
import { benefitsFaqs } from "./hotel-categories/benefitsFaqs";
import { programsFaqs } from "./hotel-categories/programsFaqs";
import { operationFaqs } from "./hotel-categories/operationFaqs";
import { integrationFaqs } from "./hotel-categories/integrationFaqs";
import { revenueFaqs } from "./hotel-categories/revenueFaqs";
import { guestsFaqs } from "./hotel-categories/guestsFaqs";
import { marketingFaqs } from "./hotel-categories/marketingFaqs";
import { paymentFaqs } from "./hotel-categories/paymentFaqs";
import { affinitiesFaqs } from "./hotel-categories/affinitiesFaqs";
import { videoFaqs } from "./hotel-categories/videoFaqs";
import { seniorsFaqs } from "./hotel-categories/seniorsFaqs";

// Use export type for type re-exports
export type { FaqItem, FaqCategory };

export const hotelFaqCategories: FaqCategory[] = [
  { id: "video", name: "VIDEO" },
  { id: "benefits", name: "BENEFITS" },
  { id: "programs", name: "PROGRAMS" },
  { id: "revenue", name: "REVENUE" },
  { id: "guests", name: "GUESTS" },
  { id: "seniors", name: "SENIORS" },
  { id: "affinities", name: "AFFINITIES" },
  { id: "operation", name: "OPERATION" },
  { id: "integration", name: "INTEGRATION" },
  { id: "marketing", name: "MARKETING" },
  { id: "payment", name: "PAYMENT & COMMISSIONS" }
];

// Combine all FAQs into a single record
export const hotelFaqsByCategory: Record<string, FaqItem[]> = {
  video: videoFaqs,
  benefits: benefitsFaqs,
  programs: programsFaqs,
  operation: operationFaqs,
  integration: integrationFaqs,
  revenue: revenueFaqs,
  guests: guestsFaqs,
  seniors: seniorsFaqs,
  marketing: marketingFaqs,
  payment: paymentFaqs,
  affinities: affinitiesFaqs
};
