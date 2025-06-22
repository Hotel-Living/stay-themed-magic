
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import ptCommon from './locales/pt/common.json';
import roCommon from './locales/ro/common.json';

import enAuth from './locales/en/auth.json';
import esAuth from './locales/es/auth.json';
import ptAuth from './locales/pt/auth.json';
import roAuth from './locales/ro/auth.json';

import enBooking from './locales/en/booking.json';
import esBooking from './locales/es/booking.json';
import ptBooking from './locales/pt/booking.json';
import roBooking from './locales/ro/booking.json';

import enContact from './locales/en/contact.json';
import esContact from './locales/es/contact.json';
import ptContact from './locales/pt/contact.json';
import roContact from './locales/ro/contact.json';

import enContent from './locales/en/content.json';
import esContent from './locales/es/content.json';
import ptContent from './locales/pt/content.json';
import roContent from './locales/ro/content.json';

import enCustomerService from './locales/en/customerService.json';
import esCustomerService from './locales/es/customerService.json';
import ptCustomerService from './locales/pt/customerService.json';
import roCustomerService from './locales/ro/customerService.json';

import enFilters from './locales/en/filters.json';
import esFilters from './locales/es/filters.json';
import ptFilters from './locales/pt/filters.json';
import roFilters from './locales/ro/filters.json';

import enFooter from './locales/en/footer.json';
import esFooter from './locales/es/footer.json';
import ptFooter from './locales/pt/footer.json';
import roFooter from './locales/ro/footer.json';

import enHome from './locales/en/home.json';
import esHome from './locales/es/home.json';
import ptHome from './locales/pt/home.json';
import roHome from './locales/ro/home.json';

import enIntellectualProperty from './locales/en/intellectualProperty.json';
import esIntellectualProperty from './locales/es/intellectualProperty.json';
import ptIntellectualProperty from './locales/pt/intellectualProperty.json';
import roIntellectualProperty from './locales/ro/intellectualProperty.json';

import enMisc from './locales/en/misc.json';
import esMisc from './locales/es/misc.json';
import ptMisc from './locales/pt/misc.json';
import roMisc from './locales/ro/misc.json';

import enNavigation from './locales/en/navigation.json';
import esNavigation from './locales/es/navigation.json';
import ptNavigation from './locales/pt/navigation.json';
import roNavigation from './locales/ro/navigation.json';

import enOurServices from './locales/en/ourServices.json';
import esOurServices from './locales/es/ourServices.json';
import ptOurServices from './locales/pt/ourServices.json';
import roOurServices from './locales/ro/ourServices.json';

import enOurValues from './locales/en/ourValues.json';
import esOurValues from './locales/es/ourValues.json';
import ptOurValues from './locales/pt/ourValues.json';
import roOurValues from './locales/ro/ourValues.json';

import enPrivacy from './locales/en/privacy.json';
import esPrivacy from './locales/es/privacy.json';
import ptPrivacy from './locales/pt/privacy.json';
import roPrivacy from './locales/ro/privacy.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['navigator', 'htmlTag'],
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: [],
      excludeCacheFor: ['cimode']
    },
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        booking: enBooking,
        contact: enContact,
        content: enContent,
        customerService: enCustomerService,
        filters: enFilters,
        footer: enFooter,
        home: enHome,
        intellectualProperty: enIntellectualProperty,
        misc: enMisc,
        navigation: enNavigation,
        ourServices: enOurServices,
        ourValues: enOurValues,
        privacy: enPrivacy,
      },
      es: {
        common: esCommon,
        auth: esAuth,
        booking: esBooking,
        contact: esContact,
        content: esContent,
        customerService: esCustomerService,
        filters: esFilters,
        footer: esFooter,
        home: esHome,
        intellectualProperty: esIntellectualProperty,
        misc: esMisc,
        navigation: esNavigation,
        ourServices: esOurServices,
        ourValues: esOurValues,
        privacy: esPrivacy,
      },
      pt: {
        common: ptCommon,
        auth: ptAuth,
        booking: ptBooking,
        contact: ptContact,
        content: ptContent,
        customerService: ptCustomerService,
        filters: ptFilters,
        footer: ptFooter,
        home: ptHome,
        intellectualProperty: ptIntellectualProperty,
        misc: ptMisc,
        navigation: ptNavigation,
        ourServices: ptOurServices,
        ourValues: ptOurValues,
        privacy: ptPrivacy,
      },
      ro: {
        common: roCommon,
        auth: roAuth,
        booking: roBooking,
        contact: roContact,
        content: roContent,
        customerService: roCustomerService,
        filters: roFilters,
        footer: roFooter,
        home: roHome,
        intellectualProperty: roIntellectualProperty,
        misc: roMisc,
        navigation: roNavigation,
        ourServices: roOurServices,
        ourValues: roOurValues,
        privacy: roPrivacy,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'es', 'pt', 'ro'],
    nonExplicitSupportedLngs: true,
  });

export default i18n;
