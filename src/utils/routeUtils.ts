
/**
 * Utility function to detect if the current page contains JotForm embeds
 * This prevents Google Maps API conflicts with embedded JotForm maps
 */
export const isJotFormPage = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.includes('add-property-2');
};
