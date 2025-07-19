
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalVideoTestimonials } from './GlobalVideoTestimonials';
import { EnglishVideoTestimonials } from './EnglishVideoTestimonials';

export function GlobalTestimonials() {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  // Don't show on Index page
  if (location.pathname === '/') {
    return null;
  }
  
  // Show Spanish testimonials for Spanish language
  if (i18n.language === 'es') {
    return <GlobalVideoTestimonials />;
  }
  
  // Show English testimonials for non-Spanish languages
  return <EnglishVideoTestimonials />;
}
