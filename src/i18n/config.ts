
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Archivos en español
import esCommon from './locales/es/common.json';
import esDashboardCommon from './locales/es/dashboard/common.json';
import esRates from './locales/es/dashboard/rates-calculator.json';
import esHome from './locales/es/home.json';

// Archivos en inglés
import enCommon from './locales/en/common.json';
import enDashboardCommon from './locales/en/dashboard/common.json';
import enRates from './locales/en/dashboard/rates-calculator.json';
import enHome from './locales/en/home.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        common: esCommon,
        dashboard: {
          ...esDashboardCommon,
          ...esRates
        },
        home: esHome
      },
      en: {
        common: enCommon,
        dashboard: {
          ...enDashboardCommon,
          ...enRates
        },
        home: enHome
      }
    },
    lng: 'es', // Idioma por defecto
    fallbackLng: 'en',
    ns: ['common', 'dashboard', 'home'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
