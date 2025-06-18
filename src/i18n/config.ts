
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

// Import Spanish translation modules
import esCommon from './locales/es/common.json';
import esNavigation from './locales/es/navigation.json';
import esAffinity from './locales/es/affinity.json';
import esAuth from './locales/es/auth.json';
import esBooking from './locales/es/booking.json';
import esDashboard from './locales/es/dashboard.json';
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

// Combine Spanish translations
const es = {
  ...esCommon,
  ...esNavigation,
  ...esAffinity,
  ...esAuth,
  ...esBooking,
  ...esDashboard,
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
  ...esIntellectualProperty
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
  ...enAuth
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
