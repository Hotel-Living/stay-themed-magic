
import { GlobalVideoTestimonials } from './GlobalVideoTestimonials';

export function GlobalTestimonials() {
  // Remove the route checking logic since we want testimonials to show on all pages except index
  // The route checking will be handled in GlobalVideoTestimonials itself
  return <GlobalVideoTestimonials />;
}
