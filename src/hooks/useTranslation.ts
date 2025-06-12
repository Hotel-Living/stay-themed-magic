
import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = (namespace?: string) => {
  const { t, i18n } = useI18nTranslation(namespace);
  
  return {
    t,
    i18n,
    changeLanguage: i18n.changeLanguage,
    language: i18n.language,
    isReady: i18n.isInitialized
  };
};

export default useTranslation;
