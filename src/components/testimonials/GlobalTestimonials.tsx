
import { useLocation } from 'react-router-dom';
import { SpanishVideoTestimonials } from './SpanishVideoTestimonials';

export function GlobalTestimonials() {
  const location = useLocation();
  
  // Don't show on Index page
  if (location.pathname === '/') {
    return null;
  }
  
  return <SpanishVideoTestimonials />;
}
