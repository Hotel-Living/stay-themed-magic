
import { useLocation } from 'react-router-dom';
import { GlobalVideoTestimonials } from './GlobalVideoTestimonials';

export function GlobalTestimonials() {
  const location = useLocation();
  
  console.log('GlobalTestimonials - Current pathname:', location.pathname);
  
  // Don't show on Index page
  if (location.pathname === '/') {
    console.log('GlobalTestimonials - Hiding on Index page');
    return null;
  }
  
  console.log('GlobalTestimonials - Showing video testimonials');
  return <GlobalVideoTestimonials />;
}
