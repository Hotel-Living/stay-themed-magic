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

export type { FaqItem, FaqCategory };

export const hotelFaqCategories: FaqCategory[] = [
  { id: "video", name: "Video" },
  { id: "benefits", name: "Benefits" },
  { id: "programs", name: "Programs" },
  { id: "revenue", name: "Revenue" },
  { id: "guests", name: "Guests" },
  { id: "seniors", name: "Seniors" },
  { id: "affinities", name: "Affinities" },
  { id: "operation", name: "Operation" },
  { id: "integration", name: "Integration" },
  { id: "payment", name: "Payment & Commissions" }
];

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
