import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enHome from './locales/en/home.json';
import enFooter from './locales/en/footer.json';
import enBooking from './locales/en/booking.json';
import enContent from './locales/en/content.json';
import enMisc from './locales/en/misc.json';
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
import enFaq from './locales/en/faq.json';
import enDashboardWelcomeContent from './locales/en/dashboard/welcome-content.json';
import enDashboardFaqTerms from './locales/en/dashboard/faq-terms.json';
import enDashboardCommon from './locales/en/dashboard/common.json';
import enDashboardGeneral from './locales/en/dashboard/general.json';
import enDashboardRatesCalculator from './locales/en/dashboard/rates-calculator.json';

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
import esDashboardCommonEs from './locales/es/dashboard/common.json';
import esDashboardSettings from './locales/es/dashboard/settings.json';
import esDashboardRatesCalculator from './locales/es/dashboard/rates-calculator.json';
import esDashboardAdvertising from './locales/es/dashboard/advertising.json';
import esDashboardWelcomeContent from './locales/es/dashboard/welcome-content.json';
import esDashboardFaqTerms from './locales/es/dashboard/faq-terms.json';

// Import Portuguese translation modules
import ptCommon from './locales/pt/common.json';
import ptNavigation from './locales/pt/navigation.json';
import ptAffinity from './locales/pt/affinity.json';
import ptAuth from './locales/pt/auth.json';
import ptBooking from './locales/pt/booking.json';
import ptFaq from './locales/pt/faq.json';
import ptContent from './locales/pt/content.json';
import ptMisc from './locales/pt/misc.json';
import ptHome from './locales/pt/home.json';
import ptFooter from './locales/pt/footer.json';
import ptHotels from './locales/pt/hotels.json';
import ptFilters from './locales/pt/filters.json';
import ptOurServices from './locales/pt/ourServices.json';
import ptOurValues from './locales/pt/ourValues.json';
import ptCustomerService from './locales/pt/customerService.json';
import ptContact from './locales/pt/contact.json';
import ptTerms from './locales/pt/terms.json';
import ptPrivacy from './locales/pt/privacy.json';
import ptIntellectualProperty from './locales/pt/intellectualProperty.json';

// Import Portuguese dashboard modules
import ptDashboardGeneral from './locales/pt/dashboard/general.json';
import ptDashboardStats from './locales/pt/dashboard/stats.json';
import ptDashboardWelcome from './locales/pt/dashboard/welcome.json';
import ptDashboardContent from './locales/pt/dashboard/content.json';
import ptDashboardPropertyForm from './locales/pt/dashboard/property-form.json';
import ptDashboardImages from './locales/pt/dashboard/images.json';
import ptDashboardLocation from './locales/pt/dashboard/location.json';
import ptDashboardContact from './locales/pt/dashboard/contact.json';
import ptDashboardFeatures from './locales/pt/dashboard/features.json';
import ptDashboardAccommodation from './locales/pt/dashboard/accommodation.json';
import ptDashboardPricing from './locales/pt/dashboard/pricing.json';
import ptDashboardTerms from './locales/pt/dashboard/terms.json';
import ptDashboardCommon from './locales/pt/dashboard/common.json';
import ptDashboardSettings from './locales/pt/dashboard/settings.json';
import ptDashboardRatesCalculator from './locales/pt/dashboard/rates-calculator.json';
import ptDashboardAdvertising from './locales/pt/dashboard/advertising.json';
import ptDashboardWelcomeContent from './locales/pt/dashboard/welcome-content.json';
import ptDashboardFaqTerms from './locales/pt/dashboard/faq-terms.json';

// Import Romanian translation modules
import roCommon from './locales/ro/common.json';
import roNavigation from './locales/ro/navigation.json';
import roAffinity from './locales/ro/affinity.json';
import roAuth from './locales/ro/auth.json';
import roBooking from './locales/ro/booking.json';
import roFaq from './locales/ro/faq.json';
import roContent from './locales/ro/content.json';
import roMisc from './locales/ro/misc.json';
import roHome from './locales/ro/home.json';
import roFooter from './locales/ro/footer.json';
import roHotels from './locales/ro/hotels.json';
import roFilters from './locales/ro/filters.json';
import roOurServices from './locales/ro/ourServices.json';
import roOurValues from './locales/ro/ourValues.json';
import roCustomerService from './locales/ro/customerService.json';
import roContact from './locales/ro/contact.json';
import roTerms from './locales/ro/terms.json';
import roPrivacy from './locales/ro/privacy.json';
import roIntellectualProperty from './locales/ro/intellectualProperty.json';

// Import Romanian dashboard modules
import roDashboardGeneral from './locales/ro/dashboard/general.json';
import roDashboardCommon from './locales/ro/dashboard/common.json';
import roDashboardRatesCalculator from './locales/ro/dashboard/rates-calculator.json';
import roDashboardWelcomeContent from './locales/ro/dashboard/welcome-content.json';
import roDashboardFaqTerms from './locales/ro/dashboard/faq-terms.json';

const resources = {
  en: {
    translation: {
      ...enCommon,
      ...enNavigation,
      ...enHome,
      ...enFooter,
      ...enBooking,
      ...enContent,
      ...enMisc,
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
      ...enFaq,
      dashboard: {
        ...enDashboardCommon.dashboard,
        ...enDashboardGeneral.dashboard,
        ratesCalculator: enDashboardRatesCalculator.ratesCalculator
      },
      "dashboard-faq-terms": enDashboardFaqTerms["dashboard-faq-terms"],
      welcomeContent: enDashboardWelcomeContent.welcomeContent
    }
  },
  es: {
    translation: {
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
        ...esDashboardCommonEs.dashboard,
        ...esDashboardSettings.dashboard,
        ratesCalculator: esDashboardRatesCalculator.ratesCalculator,
        ...esDashboardAdvertising.advertising
      },
      "dashboard-faq-terms": esDashboardFaqTerms["dashboard-faq-terms"],
      welcomeContent: esDashboardWelcomeContent.welcomeContent
    }
  },
  pt: {
    translation: {
      ...ptCommon,
      ...ptNavigation,
      ...ptAffinity,
      ...ptAuth,
      ...ptBooking,
      ...ptFaq,
      ...ptContent,
      ...ptMisc,
      ...ptHome,
      ...ptFooter,
      ...ptHotels,
      ...ptFilters,
      ...ptOurServices,
      ...ptOurValues,
      ...ptCustomerService,
      ...ptContact,
      ...ptTerms,
      ...ptPrivacy,
      ...ptIntellectualProperty,
      dashboard: {
        ...ptDashboardGeneral.dashboard,
        ...ptDashboardStats.dashboard,
        ...ptDashboardWelcome.dashboard,
        ...ptDashboardContent.dashboard,
        ...ptDashboardPropertyForm.dashboard,
        ...ptDashboardImages.dashboard,
        ...ptDashboardLocation.dashboard,
        ...ptDashboardContact.dashboard,
        ...ptDashboardFeatures.dashboard,
        ...ptDashboardAccommodation.dashboard,
        ...ptDashboardPricing.dashboard,
        ...ptDashboardTerms.dashboard,
        ...ptDashboardCommon.dashboard,
        ...ptDashboardSettings.dashboard,
        ratesCalculator: ptDashboardRatesCalculator.ratesCalculator
      },
      advertising: ptDashboardAdvertising.advertising,
      "dashboard-faq-terms": ptDashboardFaqTerms["dashboard-faq-terms"],
      welcomeContent: ptDashboardWelcomeContent.welcomeContent
    }
  },
  ro: {
    translation: {
      ...roCommon,
      ...roNavigation,
      ...roAffinity,
      ...roAuth,
      ...roBooking,
      ...roFaq,
      ...roContent,
      ...roMisc,
      ...roHome,
      ...roFooter,
      ...roHotels,
      ...roFilters,
      ...roOurServices,
      ...roOurValues,
      ...roCustomerService,
      ...roContact,
      ...roTerms,
      ...roPrivacy,
      ...roIntellectualProperty,
      dashboard: {
        ...roDashboardGeneral.dashboard,
        ...roDashboardCommon.dashboard,
        ratesCalculator: roDashboardRatesCalculator.ratesCalculator
      },
      "dashboard-faq-terms": roDashboardFaqTerms["dashboard-faq-terms"],
      welcomeContent: roDashboardWelcomeContent.welcomeContent
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
