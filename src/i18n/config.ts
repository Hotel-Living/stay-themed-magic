import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English
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

// Spanish
import esCommon from './locales/es/common.json';
import esNavigation from './locales/es/navigation.json';
import esFaq from './locales/es/faq.json';
import esAuth from './locales/es/auth.json';
import esBooking from './locales/es/booking.json';
import esFooter from './locales/es/footer.json';
import esHome from './locales/es/home.json';
import esAffinity from './locales/es/affinity.json';
import esContact from './locales/es/contact.json';
import esFilters from './locales/es/filters.json';
import esContent from './locales/es/content.json';
import esCustomerService from './locales/es/customerService.json';
import esHotels from './locales/es/hotels.json';
import esHeader from './locales/es/header.json';
import esLegal from './locales/es/legal.json';
import esMenu from './locales/es/menu.json';
import esMessages from './locales/es/messages.json';
import esNotifications from './locales/es/notifications.json';
import esOnboarding from './locales/es/onboarding.json';
import esProfile from './locales/es/profile.json';
import esQuestions from './locales/es/questions.json';
import esReviews from './locales/es/reviews.json';
import esSearch from './locales/es/search.json';
import esServices from './locales/es/services.json';
import esSignup from './locales/es/signup.json';
import esTerms from './locales/es/terms.json';
import esDashboardHotel from './locales/es/dashboard/hotel.json';
import esDashboardProfile from './locales/es/dashboard/profile.json';
import esDashboardRatesCalculator from './locales/es/dashboard/rates-calculator.json';
import esDashboardRates from './locales/es/dashboard/rates.json';
import esDashboardSettings from './locales/es/dashboard/settings.json';

// Portuguese
import ptCommon from './locales/pt/common.json';
import ptNavigation from './locales/pt/navigation.json';
import ptFaq from './locales/pt/faq.json';
import ptAuth from './locales/pt/auth.json';
import ptBooking from './locales/pt/booking.json';
import ptFooter from './locales/pt/footer.json';
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
import ptHotels from './locales/pt/hotels.json';
import ptDashboardGeneral from './locales/pt/dashboard/general.json';
import ptDashboardCommon from './locales/pt/dashboard/common.json';
import ptDashboardAccommodation from './locales/pt/dashboard/accommodation.json';
import ptAdvertising from './locales/pt/dashboard/advertising.json';

// Romanian
import roCommon from './locales/ro/common.json';
import roNavigation from './locales/ro/navigation.json';
import roFaq from './locales/ro/faq.json';
import roAuth from './locales/ro/auth.json';
import roBooking from './locales/ro/booking.json';
import roFooter from './locales/ro/footer.json';
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
import roHotels from './locales/ro/hotels.json';
import roDashboardGeneral from './locales/ro/dashboard/general.json';
import roDashboardCommon from './locales/ro/dashboard/common.json';
import roDashboardAccommodation from './locales/ro/dashboard/accommodation.json';

const resources = {
  en: {
    translation: enCommon,
    navigation: enNavigation,
    faq: enFaq,
    auth: enAuth,
    booking: enBooking,
    footer: enFooter,
    home: enHome,
    affinity: enAffinity,
    filters: enFilters,
    contact: enContact,
    ourServices: enOurServices,
    misc: enMisc,
    content: enContent,
    customerService: enCustomerService,
    intellectualProperty: enIntellectualProperty,
    ourValues: enOurValues,
    privacy: enPrivacy,
    hotels: enHotels,
    dashboard: {
      general: enDashboardGeneral,
      welcome: enDashboardWelcome,
      stats: enDashboardStats,
      accommodation: enDashboardAccommodation,
      location: enDashboardLocation,
      pricing: enDashboardPricing,
      images: enDashboardImages,
      features: enDashboardFeatures,
      contact: enDashboardContact,
      terms: enDashboardTerms,
      content: enDashboardContent,
      settings: enDashboardSettings,
      property: enDashboardProperty,
      affinities: enDashboardAffinities,
      propertySteps: enDashboardPropertySteps,
      propertyForm: enDashboardPropertyForm,
      common: enDashboardCommon,
      faqTerms: enDashboardFaqTerms,
      advertising: enAdvertising,
      ratesCalculator: enRatesCalculator,
      welcomeContent: enWelcomeContent,
    },
  },
  es: {
    translation: esCommon,
    navigation: esNavigation,
    faq: esFaq,
    auth: esAuth,
    booking: esBooking,
    footer: esFooter,
    home: esHome,
    affinity: esAffinity,
    contact: esContact,
    content: esContent,
    customerService: esCustomerService,
    hotels: esHotels,
    filters: esFilters,
    header: esHeader,
    legal: esLegal,
    menu: esMenu,
    messages: esMessages,
    notifications: esNotifications,
    onboarding: esOnboarding,
    profile: esProfile,
    questions: esQuestions,
    reviews: esReviews,
    search: esSearch,
    services: esServices,
    signup: esSignup,
    terms: esTerms,
    dashboard: {
      hotel: esDashboardHotel,
      profile: esDashboardProfile,
      ratesCalculator: esDashboardRatesCalculator,
      rates: esDashboardRates,
      settings: esDashboardSettings,
    },
  },
  pt: {
    translation: ptCommon,
    navigation: ptNavigation,
    faq: ptFaq,
    auth: ptAuth,
    booking: ptBooking,
    footer: ptFooter,
    home: ptHome,
    affinity: ptAffinity,
    filters: ptFilters,
    contact: ptContact,
    ourServices: ptOurServices,
    misc: ptMisc,
    content: ptContent,
    customerService: ptCustomerService,
    intellectualProperty: ptIntellectualProperty,
    ourValues: ptOurValues,
    privacy: ptPrivacy,
    hotels: ptHotels,
    dashboard: {
      general: ptDashboardGeneral,
      common: ptDashboardCommon,
      accommodation: ptDashboardAccommodation,
      advertising: ptAdvertising,
    },
  },
  ro: {
    translation: roCommon,
    navigation: roNavigation,
    faq: roFaq,
    auth: roAuth,
    booking: roBooking,
    footer: roFooter,
    home: roHome,
    affinity: roAffinity,
    filters: roFilters,
    contact: roContact,
    ourServices: roOurServices,
    misc: roMisc,
    content: roContent,
    customerService: roCustomerService,
    intellectualProperty: roIntellectualProperty,
    ourValues: roOurValues,
    privacy: roPrivacy,
    hotels: roHotels,
    dashboard: {
      general: roDashboardGeneral,
      common: roDashboardCommon,
      accommodation: roDashboardAccommodation,
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
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;