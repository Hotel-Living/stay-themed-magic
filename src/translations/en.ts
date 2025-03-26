
import {
  heroTranslation,
  servicesTranslation,
  valuesTranslation,
  faqTranslation,
  termsTranslation,
  privacyTranslation,
  customerServiceTranslation,
} from "./information";
import { navTranslation } from "./nav";
import { footerTranslation } from "./footer";
import { authTranslation } from "./auth";
import { dashboardTranslation } from "./dashboard";
import { searchTranslation } from "./search";

// Add the new translation keys for recommendations
export const recommendationsTranslation = {
  title: "Recommended for You",
  signInTitle: "Sign in for Personalized Recommendations",
  signInDescription: "Create an account or sign in to see AI-powered hotel recommendations based on your preferences and browsing history.",
  errorTitle: "Unable to load recommendations",
  errorDescription: "We're having trouble loading your personalized recommendations. Please try again later.",
  emptyTitle: "No recommendations yet",
  emptyDescription: "Browse more hotels or update your preferences to get personalized recommendations.",
  exploreCta: "Explore Hotels"
};

const translations = {
  nav: navTranslation,
  footer: footerTranslation,
  hero: heroTranslation,
  services: servicesTranslation,
  values: valuesTranslation,
  faq: faqTranslation,
  terms: termsTranslation,
  privacy: privacyTranslation,
  customerService: customerServiceTranslation,
  auth: authTranslation,
  dashboard: dashboardTranslation,
  search: searchTranslation,
  recommendations: recommendationsTranslation
};

export default translations;
