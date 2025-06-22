
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enCommon from './locales/en/common.json';
import enNavigation from './locales/en/navigation.json';
import enFaq from './locales/en/faq.json';
import enAuth from './locales/en/auth.json';
import enBooking from './locales/en/booking.json';
import enProfile from './locales/en/profile.json';
import enDashboardGeneral from './locales/en/dashboard/general.json';
import enDashboardWelcome from './locales/en/dashboard/welcome.json';
import enDashboardStats from './locales/en/dashboard/stats.json';
import enDashboardSettings from './locales/en/dashboard/settings.json';
import enDashboardAccommodation from './locales/en/dashboard/accommodation.json';
import enDashboardLocation from './locales/en/dashboard/location.json';
import enDashboardPricing from './locales/en/dashboard/pricing.json';
import enDashboardImages from './locales/en/dashboard/images.json';
import enDashboardFeatures from './locales/en/dashboard/features.json';
import enDashboardContact from './locales/en/dashboard/contact.json';
import enDashboardTerms from './locales/en/dashboard/terms.json';
import enDashboardContent from './locales/en/dashboard/content.json';
import enDashboardPropertySteps from './locales/en/dashboard/property-steps.json';
import enDashboardPropertyForm from './locales/en/dashboard/property-form.json';
import enDashboardCommon from './locales/en/dashboard/common.json';
import enAdvertising from './locales/en/dashboard/advertising.json';

// Spanish translations
import esCommon from './locales/es/common.json';
import esNavigation from './locales/es/navigation.json';
import esFaq from './locales/es/faq.json';
import esAuth from './locales/es/auth.json';
import esBooking from './locales/es/booking.json';
import esProfile from './locales/es/profile.json';
import esDashboardGeneral from './locales/es/dashboard/general.json';
import esDashboardPropertySteps from './locales/es/dashboard/property-steps.json';
import esDashboardCommon from './locales/es/dashboard/common.json';
import esAdvertising from './locales/es/dashboard/advertising.json';

// Portuguese translations
import ptCommon from './locales/pt/common.json';
import ptNavigation from './locales/pt/navigation.json';
import ptFaq from './locales/pt/faq.json';
import ptAuth from './locales/pt/auth.json';
import ptBooking from './locales/pt/booking.json';
import ptProfile from './locales/pt/profile.json';
import ptDashboardGeneral from './locales/pt/dashboard/general.json';
import ptDashboardPropertySteps from './locales/pt/dashboard/property-steps.json';
import ptDashboardCommon from './locales/pt/dashboard/common.json';
import ptAdvertising from './locales/pt/dashboard/advertising.json';

// Romanian translations
import roCommon from './locales/ro/common.json';
import roNavigation from './locales/ro/navigation.json';
import roFaq from './locales/ro/faq.json';
import roAuth from './locales/ro/auth.json';
import roBooking from './locales/ro/booking.json';
import roProfile from './locales/ro/profile.json';
import roDashboardGeneral from './locales/ro/dashboard/general.json';
import roDashboardPropertySteps from './locales/ro/dashboard/property-steps.json';
import roDashboardCommon from './locales/ro/dashboard/common.json';
import roAdvertising from './locales/ro/dashboard/advertising.json';

const resources = {
  en: {
    translation: {
      ...enCommon,
      ...enNavigation,
      ...enFaq,
      ...enAuth,
      ...enBooking,
      ...enProfile,
      dashboard: {
        ...enDashboardGeneral.dashboard,
        ...enDashboardWelcome.dashboard.welcome,
        ...enDashboardStats.dashboard.stats,
        ...enDashboardSettings.dashboard.settings,
        ...enDashboardAccommodation.dashboard.accommodation,
        ...enDashboardLocation.dashboard.location,
        ...enDashboardPricing.dashboard.pricing,
        ...enDashboardImages.dashboard.images,
        ...enDashboardFeatures.dashboard.features,
        ...enDashboardContact.dashboard.contact,
        ...enDashboardTerms.dashboard.terms,
        ...enDashboardContent.dashboard.content,
        ...enDashboardPropertySteps.dashboard,
        ...enDashboardPropertyForm.dashboard,
        ...enDashboardCommon.dashboard,
      },
      advertising: {
        ...enAdvertising.advertising,
        ...enAdvertising.dashboard?.advertising,
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
      ...esProfile,
      dashboard: {
        ...esDashboardGeneral.dashboard,
        ...esDashboardPropertySteps.dashboard,
        ...esDashboardCommon.dashboard,
      },
      advertising: {
        ...esAdvertising.advertising,
        ...esAdvertising.dashboard?.advertising,
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
      ...ptProfile,
      dashboard: {
        ...ptDashboardGeneral.dashboard,
        ...ptDashboardPropertySteps.dashboard,
        ...ptDashboardCommon.dashboard,
      },
      advertising: {
        ...ptAdvertising.advertising,
        ...ptAdvertising.dashboard?.advertising,
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
      ...roProfile,
      dashboard: {
        ...roDashboardGeneral.dashboard,
        ...roDashboardPropertySteps.dashboard,
        ...roDashboardCommon.dashboard,
      },
      advertising: {
        ...roAdvertising.advertising,
        ...roAdvertising.dashboard?.advertising,
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
