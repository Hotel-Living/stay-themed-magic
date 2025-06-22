
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

// Import Spanish translations
import commonEs from './locales/es/common.json';
import homeEs from './locales/es/home.json';
import navigationEs from './locales/es/navigation.json';
import footerEs from './locales/es/footer.json';
import filtersEs from './locales/es/filters.json';
import ourServicesEs from './locales/es/ourServices.json';
import miscEs from './locales/es/misc.json';
import contentEs from './locales/es/content.json';
import affinityEs from './locales/es/affinity.json';
import bookingEs from './locales/es/booking.json';
import customerServiceEs from './locales/es/customerService.json';
import authEs from './locales/es/auth.json';
import privacyEs from './locales/es/privacy.json';
import intellectualPropertyEs from './locales/es/intellectualProperty.json';
import ourValuesEs from './locales/es/ourValues.json';
import contactEs from './locales/es/contact.json';
import batchTranslationEs from './locales/es/batchTranslation.json';

// Import Portuguese translations
import commonPt from './locales/pt/common.json';
import homePt from './locales/pt/home.json';
import navigationPt from './locales/pt/navigation.json';
import footerPt from './locales/pt/footer.json';
import filtersePt from './locales/pt/filters.json';
import ourServicesPt from './locales/pt/ourServices.json';
import contentPt from './locales/pt/content.json';
import affinityPt from './locales/pt/affinity.json';
import bookingPt from './locales/pt/booking.json';
import customerServicePt from './locales/pt/customerService.json';
import authPt from './locales/pt/auth.json';
import contactPt from './locales/pt/contact.json';
import batchTranslationPt from './locales/pt/batchTranslation.json';
import miscPt from './locales/pt/misc.json';
import privacyPt from './locales/pt/privacy.json';
import ourValuesPt from './locales/pt/ourValues.json';

// Import Romanian translations
import commonRo from './locales/ro/common.json';
import homeRo from './locales/ro/home.json';
import navigationRo from './locales/ro/navigation.json';
import footerRo from './locales/ro/footer.json';
import filtersRo from './locales/ro/filters.json';
import contentRo from './locales/ro/content.json';
import affinityRo from './locales/ro/affinity.json';
import bookingRo from './locales/ro/booking.json';
import authRo from './locales/ro/auth.json';
import contactRo from './locales/ro/contact.json';
import batchTranslationRo from './locales/ro/batchTranslation.json';
import miscRo from './locales/ro/misc.json';
import privacyRo from './locales/ro/privacy.json';
import ourValuesRo from './locales/ro/ourValues.json';
import customerServiceRo from './locales/ro/customerService.json';

const resources = {
  en: {
    common: commonEn.common,
    home: homeEn.home,
    navigation: navigationEn.navigation,
    mainNavigationContent: navigationEn.mainNavigationContent,
    footer: footerEn.footer,
    filters: filtersEn.filters,
    ourServices: ourServicesEn.ourServices,
    misc: miscEn.misc,
    intellectualProperty: intellectualPropertyEn.intellectualProperty,
    batchTranslation: batchTranslationEn.batchTranslation,
    ourValues: ourValuesEn.ourValues,
    privacy: privacyEn.privacy
  },
  es: {
    common: commonEs.common,
    home: homeEs.home,
    navigation: navigationEs.navigation,
    mainNavigationContent: navigationEs.mainNavigationContent,
    footer: footerEs.footer,
    filters: filtersEs.filters,
    ourServices: ourServicesEs.ourServices,
    misc: miscEs.misc,
    content: contentEs.content,
    affinity: affinityEs.affinity,
    booking: bookingEs.booking,
    customerService: customerServiceEs.customerService,
    auth: authEs.auth,
    privacy: privacyEs.privacy,
    intellectualProperty: intellectualPropertyEs.intellectualProperty,
    ourValues: ourValuesEs.ourValues,
    contact: contactEs.contact,
    batchTranslation: batchTranslationEs.batchTranslation
  },
  pt: {
    common: commonPt.common,
    home: homePt.home,
    navigation: navigationPt.navigation,
    mainNavigationContent: navigationPt.mainNavigationContent,
    footer: footerPt.footer,
    filters: filtersePt.filters,
    ourServices: ourServicesPt.ourServices,
    content: contentPt.content,
    affinity: affinityPt.affinity,
    booking: bookingPt.booking,
    customerService: customerServicePt.customerService,
    auth: authPt.auth,
    contact: contactPt.contact,
    batchTranslation: batchTranslationPt.batchTranslation,
    misc: miscPt.misc,
    privacy: privacyPt.privacy,
    ourValues: ourValuesPt.ourValues
  },
  ro: {
    common: commonRo.common,
    home: homeRo.home,
    navigation: navigationRo.navigation,
    mainNavigationContent: navigationRo.mainNavigationContent,
    footer: footerRo.footer,
    filters: filtersRo.filters,
    content: contentRo.content,
    affinity: affinityRo.affinity,
    booking: bookingRo.booking,
    auth: authRo.auth,
    contact: contactRo.contact,
    batchTranslation: batchTranslationRo.batchTranslation,
    misc: miscRo.misc,
    privacy: privacyRo.privacy,
    ourValues: ourValuesRo.ourValues,
    customerService: customerServiceRo.customerService
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
