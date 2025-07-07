
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enFaq from './locales/en/faq.json';
import enAuth from './locales/en/auth.json';
import enBooking from './locales/en/booking.json';
import enFooter from './locales/en/footer.json';
import enHome from './locales/en/home.json';
import enAffinity from './locales/en/affinity.json';
import enFilters from './locales/en/filters.json';
import enContact from './locales/en/contact.json';
import enOurServices from './locales/en/ourServices.json';
import enMisc from './locales/en/misc.json';
import enContent from './locales/en/content.json';
import enCustomerService from './locales/en/customerService.json';
import enIntellectualProperty from './locales/en/intellectualProperty.json';
import enOurValues from './locales/en/ourValues.json';
import enPrivacy from './locales/en/privacy.json';
import enHotels from './locales/en/hotels.json';
import enDashboardGeneral from './locales/en/dashboard/general.json';
import enDashboardWelcome from './locales/en/dashboard/welcome.json';
import enDashboardStats from './locales/en/dashboard/stats.json';
import enDashboardAccommodation from './locales/en/dashboard/accommodation.json';
import enDashboardLocation from './locales/en/dashboard/location.json';
import enDashboardPricing from './locales/en/dashboard/pricing.json';
import enDashboardImages from './locales/en/dashboard/images.json';
import enDashboardFeatures from './locales/en/dashboard/features.json';
import enDashboardContact from './locales/en/dashboard/contact.json';
import enDashboardTerms from './locales/en/dashboard/terms.json';
import enDashboardContent from './locales/en/dashboard/content.json';
import enDashboardSettings from './locales/en/dashboard/settings.json';
import enDashboardProperty from './locales/en/dashboard/property.json';
import enDashboardAffinities from './locales/en/dashboard/affinities.json';
import enDashboardPropertySteps from './locales/en/dashboard/property-steps.json';
import enDashboardPropertyForm from './locales/en/dashboard/property-form.json';
import enDashboardCommon from './locales/en/dashboard/common.json';
import enDashboardFaqTerms from './locales/en/dashboard/faq-terms.json';
import enAdvertising from './locales/en/dashboard/advertising.json';
import enRatesCalculator from './locales/en/dashboard/rates-calculator.json';
import enWelcomeContent from './locales/en/dashboard/welcome-content.json';

// Spanish translations
import esCommon from './locales/es/common.json';
import esNavigation from './locales/es/navigation.json';
import esFaq from './locales/es/faq.json';
import esAuth from './locales/es/auth.json';
import esBooking from './locales/es/booking.json';
import esHome from './locales/es/home.json';
import esAffinity from './locales/es/affinity.json';
import esFilters from './locales/es/filters.json';
import esContact from './locales/es/contact.json';
import esOurServices from './locales/es/ourServices.json';
import esMisc from './locales/es/misc.json';
import esContent from './locales/es/content.json';
import esCustomerService from './locales/es/customerService.json';
import esIntellectualProperty from './locales/es/intellectualProperty.json';
import esOurValues from './locales/es/ourValues.json';
import esPrivacy from './locales/es/privacy.json';
import esFooter from './locales/es/footer.json';
import esHotels from './locales/es/hotels.json';
import esDashboardGeneral from './locales/es/dashboard/general.json';
import esDashboardCommon from './locales/es/dashboard/common.json';
import esDashboardAccommodation from './locales/es/dashboard/accommodation.json';
import esAdvertising from './locales/es/dashboard/advertising.json';

// Portuguese translations
import ptCommon from './locales/pt/common.json';
import ptNavigation from './locales/pt/navigation.json';
import ptFaq from './locales/pt/faq.json';
import ptAuth from './locales/pt/auth.json';
import ptBooking from './locales/pt/booking.json';
import ptHome from './locales/pt/home.json';
import ptAffinity from './locales/pt/affinity.json';
import ptFilters from './locales/pt/filters.json';
import ptContact from './locales/pt/contact.json';
import ptOurServices from './locales/pt/ourServices.json';
import ptMisc from './locales/pt/misc.json';
import ptContent from './locales/pt/content.json';
import ptCustomerService from './locales/pt/customerService.json';
import ptIntellectualProperty from './locales/pt/intellectualProperty.json';
import ptOurValues from './locales/pt/ourValues.json';
import ptPrivacy from './locales/pt/privacy.json';
import ptFooter from './locales/pt/footer.json';
import ptHotels from './locales/pt/hotels.json';
import ptDashboardGeneral from './locales/pt/dashboard/general.json';
import ptDashboardCommon from './locales/pt/dashboard/common.json';
import ptDashboardAccommodation from './locales/pt/dashboard/accommodation.json';
import ptAdvertising from './locales/pt/dashboard/advertising.json';

// Romanian translations
import roCommon from './locales/ro/common.json';
import roNavigation from './locales/ro/navigation.json';
import roFaq from './locales/ro/faq.json';
import roAuth from './locales/ro/auth.json';
import roBooking from './locales/ro/booking.json';
import roHome from './locales/ro/home.json';
import roAffinity from './locales/ro/affinity.json';
import roFilters from './locales/ro/filters.json';
import roContact from './locales/ro/contact.json';
import roOurServices from './locales/ro/ourServices.json';
import roMisc from './locales/ro/misc.json';
import roContent from './locales/ro/content.json';
import roCustomerService from './locales/ro/customerService.json';
import roIntellectualProperty from './locales/ro/intellectualProperty.json';
import roOurValues from './locales/ro/ourValues.json';
import roPrivacy from './locales/ro/privacy.json';
import roFooter from './locales/ro/footer.json';
import roHotels from './locales/ro/hotels.json';
import roDashboardGeneral from './locales/ro/dashboard/general.json';
import roDashboardCommon from './locales/ro/dashboard/common.json';
import roDashboardAccommodation from './locales/ro/dashboard/accommodation.json';

const resources = {
  en: {
    translation: {
      ...enCommon,
      ...enNavigation,
      ...enFaq,
      ...enAuth,
      ...enBooking,
      ...enFooter,
      ...enHome,
      ...enHotels,
      ...enAffinity,
      ...enFilters,
      ...enContact,
      ...enOurServices,
      ...enMisc,
      ...enContent,
      ...enCustomerService,
      ...enIntellectualProperty,
      ...enOurValues,
      ...enPrivacy,
      dashboard: {
        ...enDashboardGeneral.dashboard,
        ...enDashboardWelcome.dashboard.welcome,
        ...enDashboardStats.dashboard.stats,
        ...enDashboardLocation.dashboard.location,
        ...enDashboardPricing.dashboard.pricing,
        ...enDashboardImages.dashboard.images,
        ...enDashboardFeatures.dashboard.features,
        ...enDashboardContact.dashboard.contact,
        ...enDashboardTerms.dashboard.terms,
        ...enDashboardContent.dashboard.content,
        ...enDashboardSettings.dashboard.settings,
        ...enDashboardProperty.dashboard.property,
        ...enDashboardAffinities.dashboard.affinities,
        ...enDashboardPropertySteps.dashboard,
        ...enDashboardPropertyForm.dashboard,
        ...enDashboardCommon.dashboard,
        accommodation: {
          ...enDashboardAccommodation.dashboard.accommodation,
        },
        ratesCalculator: {
          ...enRatesCalculator.ratesCalculator,
        },
      },
      'dashboard-faq-terms': {
        ...enDashboardFaqTerms['dashboard-faq-terms'],
      },
      advertising: {
        ...enAdvertising.advertising,
        ...enAdvertising.dashboard?.advertising,
      },
      welcomeContent: {
        ...enWelcomeContent.welcomeContent,
      },
    },
  },
  es: {
    translation: {
      ...esCommon,
      ...esNavigation,
      ...esFaq,
      ...esAuth,
      ...esBooking,
      ...esFooter,
      ...esHome,
 hotels: esHotels,
      ...esAffinity,
      ...esFilters,
      ...esContact,
      ...esOurServices,
      ...esMisc,
      ...esContent,
      ...esCustomerService,
      ...esIntellectualProperty,
      ...esOurValues,
      ...esPrivacy,
      dashboard: {
        ...esDashboardGeneral.dashboard,
        ...esDashboardCommon.dashboard,
        accommodation: {
          ...esDashboardAccommodation.dashboard,
        },
      },
      advertising: {
        ...esAdvertising.advertising,
      },
    },
  },
  pt: {
    translation: {
      ...ptCommon,
      ...ptNavigation,
      ...ptFaq,
      ...ptAuth,
      ...ptBooking,
      ...ptFooter,
      ...ptHome,
      ...ptHotels,
      ...ptAffinity,
      ...ptFilters,
      ...ptContact,
      ...ptOurServices,
      ...ptMisc,
      ...ptContent,
      ...ptCustomerService,
      ...ptIntellectualProperty,
      ...ptOurValues,
      ...ptPrivacy,
      dashboard: {
        ...ptDashboardGeneral.dashboard,
        ...ptDashboardCommon.dashboard,
        accommodation: {
          ...ptDashboardAccommodation.dashboard,
        },
      },
      advertising: {
        ...ptAdvertising.advertising,
      },
    },
  },
  ro: {
    translation: {
      ...roCommon,
      ...roNavigation,
      ...roFaq,
      ...roAuth,
      ...roBooking,
      ...roFooter,
      ...roHome,
      ...roHotels,
      ...roAffinity,
      ...roFilters,
      ...roContact,
      ...roOurServices,
      ...roMisc,
      ...roContent,
      ...roCustomerService,
      ...roIntellectualProperty,
      ...roOurValues,
      ...roPrivacy,
      dashboard: {
        ...roDashboardGeneral.dashboard,
        ...roDashboardCommon.dashboard,
        accommodation: {
          ...roDashboardAccommodation.dashboard,
        },
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
