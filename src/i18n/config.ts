
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

// Add diagnostic logging
console.log('=== I18N DIAGNOSTIC START ===');
console.log('commonEn loaded:', !!commonEn);
console.log('commonEs loaded:', !!commonEs);
console.log('commonPt loaded:', !!commonPt);
console.log('commonRo loaded:', !!commonRo);
console.log('commonEn structure:', Object.keys(commonEn || {}));
console.log('commonPt structure:', Object.keys(commonPt || {}));

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

console.log('Resources structure:', Object.keys(resources));
console.log('EN resources:', Object.keys(resources.en || {}));
console.log('PT resources:', Object.keys(resources.pt || {}));
console.log('=== I18N DIAGNOSTIC END ===');

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
  })
  .then(() => {
    console.log('i18n initialized successfully');
    console.log('Current language:', i18n.language);
    console.log('Available languages:', Object.keys(i18n.store.data));
  })
  .catch((error) => {
    console.error('i18n initialization failed:', error);
  });

export default i18n;
