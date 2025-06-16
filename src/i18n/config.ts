
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import en from './locales/en.json';

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
  ...esFooter
};

const resources = {
  en: {
    translation: en
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
