
import { useLocation } from 'react-router-dom';
import { GlobalEnglishVideoTestimonials } from './GlobalEnglishVideoTestimonials';

export function GlobalEnglishTestimonials() {
  const location = useLocation();
  
  // Don't show on Index page
  if (location.pathname === '/') {
    return null;
  }
  
  return <GlobalEnglishVideoTestimonials />;
}
