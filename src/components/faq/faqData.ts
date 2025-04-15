
import { FaqItem, FaqCategory } from "./types";
import { faqCategories } from "./faqCategories";
import { benefitsList } from "./benefits";
import { generalFaqs } from "./categories/generalFaqs";
import { bookingFaqs } from "./categories/bookingFaqs";
import { stayFaqs } from "./categories/stayFaqs";
import { paymentFaqs } from "./categories/paymentFaqs";
import { themesFaqs } from "./categories/themesFaqs";
import { lifestyleFaqs } from "./categories/lifestyleFaqs";
import { communityFaqs } from "./categories/communityFaqs";
import { practicalFaqs } from "./categories/practicalFaqs";

// Use export type for type re-exports
export type { FaqItem, FaqCategory };

export { faqCategories, benefitsList };

// Combine all FAQs into a single record
export const faqsByCategory: Record<string, FaqItem[]> = {
  general: generalFaqs,
  booking: bookingFaqs,
  stay: stayFaqs,
  payment: paymentFaqs,
  themes: themesFaqs,
  lifestyle: lifestyleFaqs,
  community: communityFaqs,
  practical: practicalFaqs
};
