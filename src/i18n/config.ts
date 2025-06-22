
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import navigationEn from './locales/en/navigation.json';
import footerEn from './locales/en/footer.json';
import filtersEn from './locales/en/filters.json';
import ourServicesEn from './locales/en/ourServices.json';
import miscEn from './locales/en/misc.json';
import intellectualPropertyEn from './locales/en/intellectualProperty.json';
import batchTranslationEn from './locales/en/batchTranslation.json';
import ourValuesEn from './locales/en/ourValues.json';
import privacyEn from './locales/en/privacy.json';
import affinityEn from './locales/en/affinity.json';
import authEn from './locales/en/auth.json';
import bookingEn from './locales/en/booking.json';
import contentEn from './locales/en/content.json';
import customerServiceEn from './locales/en/customerService.json';
import contactEn from './locales/en/contact.json';

// Import Spanish translations
import commonEs from './locales/es/common.json';
import homeEs from './locales/es/home.json';
import navigationEs from './locales/es/navigation.json';
import footerEs from './locales/es/footer.json';
import filtersEs from './locales/es/filters.json';
import ourServicesEs from './locales/es/ourServices.json';
import miscEs from './locales/es/misc.json';
import intellectualPropertyEs from './locales/es/intellectualProperty.json';
import batchTranslationEs from './locales/es/batchTranslation.json';
import ourValuesEs from './locales/es/ourValues.json';
import privacyEs from './locales/es/privacy.json';
import affinityEs from './locales/es/affinity.json';
import authEs from './locales/es/auth.json';
import bookingEs from './locales/es/booking.json';
import contentEs from './locales/es/content.json';
import customerServiceEs from './locales/es/customerService.json';
import contactEs from './locales/es/contact.json';

// Import Portuguese translations
import commonPt from './locales/pt/common.json';
import homePt from './locales/pt/home.json';
import navigationPt from './locales/pt/navigation.json';
import footerPt from './locales/pt/footer.json';
import filtersPt from './locales/pt/filters.json';
import ourServicesPt from './locales/pt/ourServices.json';
import miscPt from './locales/pt/misc.json';
import intellectualPropertyPt from './locales/pt/intellectualProperty.json';
import batchTranslationPt from './locales/pt/batchTranslation.json';
import ourValuesPt from './locales/pt/ourValues.json';
import privacyPt from './locales/pt/privacy.json';
import affinityPt from './locales/pt/affinity.json';
import authPt from './locales/pt/auth.json';
import bookingPt from './locales/pt/booking.json';
import contentPt from './locales/pt/content.json';
import customerServicePt from './locales/pt/customerService.json';
import contactPt from './locales/pt/contact.json';

// Import Romanian translations
import commonRo from './locales/ro/common.json';
import homeRo from './locales/ro/home.json';
import navigationRo from './locales/ro/navigation.json';
import footerRo from './locales/ro/footer.json';
import filtersRo from './locales/ro/filters.json';
import ourServicesRo from './locales/ro/ourServices.json';
import miscRo from './locales/ro/misc.json';
import intellectualPropertyRo from './locales/ro/intellectualProperty.json';
import batchTranslationRo from './locales/ro/batchTranslation.json';
import ourValuesRo from './locales/ro/ourValues.json';
import privacyRo from './locales/ro/privacy.json';
import affinityRo from './locales/ro/affinity.json';
import authRo from './locales/ro/auth.json';
import bookingRo from './locales/ro/booking.json';
import contentRo from './locales/ro/content.json';
import customerServiceRo from './locales/ro/customerService.json';
import contactRo from './locales/ro/contact.json';

const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    navigation: navigationEn,
    footer: footerEn,
    filters: filtersEn,
    ourServices: ourServicesEn,
    misc: miscEn,
    intellectualProperty: intellectualPropertyEn,
    batchTranslation: batchTranslationEn,
    ourValues: ourValuesEn,
    privacy: privacyEn,
    affinity: affinityEn,
    auth: authEn,
    booking: bookingEn,
    content: contentEn,
    customerService: customerServiceEn,
    contact: contactEn
  },
  es: {
    common: commonEs,
    home: homeEs,
    navigation: navigationEs,
    footer: footerEs,
    filters: filtersEs,
    ourServices: ourServicesEs,
    misc: miscEs,
    intellectualProperty: intellectualPropertyEs,
    batchTranslation: batchTranslationEs,
    ourValues: ourValuesEs,
    privacy: privacyEs,
    affinity: affinityEs,
    auth: authEs,
    booking: bookingEs,
    content: contentEs,
    customerService: customerServiceEs,
    contact: contactEs
  },
  pt: {
    common: commonPt,
    home: homePt,
    navigation: navigationPt,
    footer: footerPt,
    filters: filtersPt,
    ourServices: ourServicesPt,
    misc: miscPt,
    intellectualProperty: intellectualPropertyPt,
    batchTranslation: batchTranslationPt,
    ourValues: ourValuesPt,
    privacy: privacyPt,
    affinity: affinityPt,
    auth: authPt,
    booking: bookingPt,
    content: contentPt,
    customerService: customerServicePt,
    contact: contactPt
  },
  ro: {
    common: commonRo,
    home: homeRo,
    navigation: navigationRo,
    footer: footerRo,
    filters: filtersRo,
    ourServices: ourServicesRo,
    misc: miscRo,
    intellectualProperty: intellectualPropertyRo,
    batchTranslation: batchTranslationRo,
    ourValues: ourValuesRo,
    privacy: privacyRo,
    affinity: affinityRo,
    auth: authRo,
    booking: bookingRo,
    content: contentRo,
    customerService: customerServiceRo,
    contact: contactRo
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
