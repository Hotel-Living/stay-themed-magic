
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enHome from './locales/en/home.json';
import enAffinity from './locales/en/affinity.json';
import enFilters from './locales/en/filters.json';
import enContact from './locales/en/contact.json';
import enNavigation from './locales/en/navigation.json';
import enOurServices from './locales/en/ourServices.json';
import enMisc from './locales/en/misc.json';
import enContent from './locales/en/content.json';
import enCustomerService from './locales/en/customerService.json';
import enIntellectualProperty from './locales/en/intellectualProperty.json';
import enOurValues from './locales/en/ourValues.json';
import enPrivacy from './locales/en/privacy.json';
import enFooter from './locales/en/footer.json';
import enRatesCalculator from './locales/en/dashboard/rates-calculator.json';

// Import Spanish translations
import esHome from './locales/es/home.json';
import esAffinity from './locales/es/affinity.json';
import esFilters from './locales/es/filters.json';
import esContact from './locales/es/contact.json';
import esNavigation from './locales/es/navigation.json';
import esOurServices from './locales/es/ourServices.json';
import esMisc from './locales/es/misc.json';
import esContent from './locales/es/content.json';
import esCustomerService from './locales/es/customerService.json';
import esIntellectualProperty from './locales/es/intellectualProperty.json';
import esOurValues from './locales/es/ourValues.json';
import esPrivacy from './locales/es/privacy.json';
import esFooter from './locales/es/footer.json';
import esRatesCalculator from './locales/es/dashboard/rates-calculator.json';

// Import Portuguese translations
import ptHome from './locales/pt/home.json';
import ptAffinity from './locales/pt/affinity.json';
import ptFilters from './locales/pt/filters.json';
import ptContact from './locales/pt/contact.json';
import ptNavigation from './locales/pt/navigation.json';
import ptOurServices from './locales/pt/ourServices.json';
import ptMisc from './locales/pt/misc.json';
import ptContent from './locales/pt/content.json';
import ptCustomerService from './locales/pt/customerService.json';
import ptIntellectualProperty from './locales/pt/intellectualProperty.json';
import ptOurValues from './locales/pt/ourValues.json';
import ptPrivacy from './locales/pt/privacy.json';
import ptFooter from './locales/pt/footer.json';
import ptRatesCalculator from './locales/pt/dashboard/rates-calculator.json';

// Import Romanian translations
import roHome from './locales/ro/home.json';
import roAffinity from './locales/ro/affinity.json';
import roFilters from './locales/ro/filters.json';
import roContact from './locales/ro/contact.json';
import roNavigation from './locales/ro/navigation.json';
import roOurServices from './locales/ro/ourServices.json';
import roMisc from './locales/ro/misc.json';
import roContent from './locales/ro/content.json';
import roCustomerService from './locales/ro/customerService.json';
import roIntellectualProperty from './locales/ro/intellectualProperty.json';
import roOurValues from './locales/ro/ourValues.json';
import roPrivacy from './locales/ro/privacy.json';
import roFooter from './locales/ro/footer.json';
import roRatesCalculator from './locales/ro/dashboard/rates-calculator.json';

const resources = {
  en: {
    home: enHome,
    affinity: enAffinity,
    filters: enFilters,
    contact: enContact,
    navigation: enNavigation,
    ourServices: enOurServices,
    misc: enMisc,
    content: enContent,
    customerService: enCustomerService,
    intellectualProperty: enIntellectualProperty,
    ourValues: enOurValues,
    privacy: enPrivacy,
    footer: enFooter,
    ratesCalculator: enRatesCalculator,
  },
  es: {
    home: esHome,
    affinity: esAffinity,
    filters: esFilters,
    contact: esContact,
    navigation: esNavigation,
    ourServices: esOurServices,
    misc: esMisc,
    content: esContent,
    customerService: esCustomerService,
    intellectualProperty: esIntellectualProperty,
    ourValues: esOurValues,
    privacy: esPrivacy,
    footer: esFooter,
    ratesCalculator: esRatesCalculator,
  },
  pt: {
    home: ptHome,
    affinity: ptAffinity,
    filters: ptFilters,
    contact: ptContact,
    navigation: ptNavigation,
    ourServices: ptOurServices,
    misc: ptMisc,
    content: ptContent,
    customerService: ptCustomerService,
    intellectualProperty: ptIntellectualProperty,
    ourValues: ptOurValues,  
    privacy: ptPrivacy,
    footer: ptFooter,
    ratesCalculator: ptRatesCalculator,
  },
  ro: {
    home: roHome,
    affinity: roAffinity,
    filters: roFilters,
    contact: roContact,
    navigation: roNavigation,
    ourServices: roOurServices,
    misc: roMisc,
    content: roContent,
    customerService: roCustomerService,
    intellectualProperty: roIntellectualProperty,
    ourValues: roOurValues,
    privacy: roPrivacy,
    footer: roFooter,
    ratesCalculator: roRatesCalculator,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
