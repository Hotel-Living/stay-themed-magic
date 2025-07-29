
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalVideoTestimonials } from './GlobalVideoTestimonials';
import { EnglishVideoTestimonials } from './EnglishVideoTestimonials';

export function GlobalTestimonials() {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  // Don't show on Index page
  const shouldShow = location.pathname !== '/';
  
  // Always render both components but conditionally show them
  // This ensures consistent hook calls
  return (
    <>
      {shouldShow && i18n.language === 'es' && <GlobalVideoTestimonials />}
      {shouldShow && i18n.language !== 'es' && <EnglishVideoTestimonials />}
    </>
  );
}
