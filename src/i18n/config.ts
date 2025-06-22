
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import commonEn from './locales/en/common.json';
import batchTranslationEn from './locales/en/batchTranslation.json';

// Import Spanish translations
import commonEs from './locales/es/common.json';
import batchTranslationEs from './locales/es/batchTranslation.json';

// Import Portuguese translations
import commonPt from './locales/pt/common.json';
import ourServicesPt from './locales/pt/ourServices.json';
import batchTranslationPt from './locales/pt/batchTranslation.json';

// Import Romanian translations
import commonRo from './locales/ro/common.json';
import batchTranslationRo from './locales/ro/batchTranslation.json';

const resources = {
  en: {
    common: commonEn.common,
    batchTranslation: batchTranslationEn.batchTranslation
  },
  es: {
    common: commonEs.common,
    batchTranslation: batchTranslationEs.batchTranslation
  },
  pt: {
    common: commonPt.common,
    ourServices: ourServicesPt.ourServices,
    batchTranslation: batchTranslationPt.batchTranslation
  },
  ro: {
    common: commonRo.common,
    batchTranslation: batchTranslationRo.batchTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
