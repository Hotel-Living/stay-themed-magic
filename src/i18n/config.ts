
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import en from './locales/en.json';
import enHotels from './locales/en/hotels.json';
import enAffinity from './locales/en/affinity.json';
import enFilters from './locales/en/filters.json';
import enOurServices from './locales/en/ourServices.json';
import enOurValues from './locales/en/ourValues.json';
import enCustomerService from './locales/en/customerService.json';
import enContact from './locales/en/contact.json';
import enTerms from './locales/en/terms.json';
import enPrivacy from './locales/en/privacy.json';
import enIntellectualProperty from './locales/en/intellectualProperty.json';
import enAuth from './locales/en/auth.json';
import enDashboardWelcomeContent from './locales/en/dashboard/welcome-content.json';

// Import Spanish translation modules
import esCommon from './locales/es/common.json';
import esNavigation from './locales/es/navigation.json';
import esAffinity from './locales/es/affinity.json';
import esAuth from './locales/es/auth.json';
import esBooking from './locales/es/booking.json';
import esFaq from './locales/es/faq.json';
import esContent from './locales/es/content.json';
import esMisc from './locales/es/misc.json';
import esHome from './locales/es/home.json';
import esFooter from './locales/es/footer.json';
import esHotels from './locales/es/hotels.json';
import esFilters from './locales/es/filters.json';
import esOurServices from './locales/es/ourServices.json';
import esOurValues from './locales/es/ourValues.json';
import esCustomerService from './locales/es/customerService.json';
import esContact from './locales/es/contact.json';
import esTerms from './locales/es/terms.json';
import esPrivacy from './locales/es/privacy.json';
import esIntellectualProperty from './locales/es/intellectualProperty.json';

// Import Spanish dashboard modules
import esDashboardGeneral from './locales/es/dashboard/general.json';
import esDashboardStats from './locales/es/dashboard/stats.json';
import esDashboardWelcome from './locales/es/dashboard/welcome.json';
import esDashboardContent from './locales/es/dashboard/content.json';
import esDashboardPropertyForm from './locales/es/dashboard/property-form.json';
import esDashboardImages from './locales/es/dashboard/images.json';
import esDashboardLocation from './locales/es/dashboard/location.json';
import esDashboardContact from './locales/es/dashboard/contact.json';
import esDashboardFeatures from './locales/es/dashboard/features.json';
import esDashboardAccommodation from './locales/es/dashboard/accommodation.json';
import esDashboardPricing from './locales/es/dashboard/pricing.json';
import esDashboardTerms from './locales/es/dashboard/terms.json';
import esDashboardCommon from './locales/es/dashboard/common.json';
import esDashboardSettings from './locales/es/dashboard/settings.json';
import esDashboardRatesCalculator from './locales/es/dashboard/rates-calculator.json';
import esDashboardAdvertising from './locales/es/dashboard/advertising.json';
import esDashboardWelcomeContent from './locales/es/dashboard/welcome-content.json';
import esDashboardFaqTerms from './locales/es/dashboard/faq-terms.json';

// Combine Spanish translations - ensure all dashboard modules are properly merged
const es = {
  ...esCommon,
  ...esNavigation,
  ...esAffinity,
  ...esAuth,
  ...esBooking,
  ...esFaq,
  ...esContent,
  ...esMisc,
  ...esHome,
  ...esFooter,
  ...esHotels,
  ...esFilters,
  ...esOurServices,
  ...esOurValues,
  ...esCustomerService,
  ...esContact,
  ...esTerms,
  ...esPrivacy,
  ...esIntellectualProperty,
  // All dashboard translations merged directly into the main translation object
  dashboard: {
    ...esDashboardGeneral.dashboard,
    ...esDashboardStats.dashboard,
    ...esDashboardWelcome.dashboard,
    ...esDashboardContent.dashboard,
    ...esDashboardPropertyForm.dashboard,
    ...esDashboardImages.dashboard,
    ...esDashboardLocation.dashboard,
    ...esDashboardContact.dashboard,
    ...esDashboardFeatures.dashboard,
    ...esDashboardAccommodation.dashboard,
    ...esDashboardPricing.dashboard,
    ...esDashboardTerms.dashboard,
    ...esDashboardCommon.dashboard,
    ...esDashboardSettings.dashboard,
    ...esDashboardRatesCalculator.ratesCalculator,
    ...esDashboardAdvertising.advertising
  },
  // Preserve dashboard-faq-terms as a separate namespace
  "dashboard-faq-terms": esDashboardFaqTerms["dashboard-faq-terms"],
  welcomeContent: esDashboardWelcomeContent.welcomeContent
};

// Combine English translations
const enCombined = {
  ...en,
  ...enHotels,
  ...enAffinity,
  ...enFilters,
  ...enOurServices,
  ...enOurValues,
  ...enCustomerService,
  ...enContact,
  ...enTerms,
  ...enPrivacy,
  ...enIntellectualProperty,
  ...enAuth,
  welcomeContent: enDashboardWelcomeContent.welcomeContent
};

const resources = {
  en: {
    translation: enCombined
  },
  es: {
    translation: es
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
