
import { useLocation } from 'react-router-dom';
import { GlobalVideoTestimonials } from './GlobalVideoTestimonials';

export function GlobalTestimonials() {
  const location = useLocation();
  
  // Don't show on Index page
  if (location.pathname === '/') {
    return null;
  }
  
  return <GlobalVideoTestimonials />;
}
