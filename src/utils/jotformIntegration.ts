/**
 * Utility functions for JotForm integration with user authentication
 */

/**
 * Creates a JotForm URL with user token for authentication
 * @param formId - The JotForm form ID  
 * @param userToken - The user's secure token for authentication
 * @returns Complete JotForm URL with token parameter
 */
export const createJotFormURL = (formId: string, userToken: string | null): string => {
  const baseUrl = `https://form.jotform.com/${formId}`;
  
  if (!userToken) {
    return baseUrl;
  }
  
  // Store token in localStorage for retrieval by JotForm
  if (typeof window !== 'undefined') {
    localStorage.setItem('jotform_user_token', userToken);
  }
  
  // Also try URL parameter approach (may not work with webhook)
  return `${baseUrl}?user_token=${encodeURIComponent(userToken)}`;
};

/**
 * Handles JotForm post-submission events
 * @param callback - Function to call when submission is complete
 */
export const setupJotFormListener = (callback: () => void) => {
  const handleMessage = (event: MessageEvent) => {
    // Listen for JotForm submission events
    if (event.origin === 'https://form.jotform.com') {
      if (event.data && typeof event.data === 'string' && event.data.includes('submit')) {
        console.log('JotForm submission detected');
        callback();
      }
    }
  };

  window.addEventListener('message', handleMessage);
  
  return () => {
    window.removeEventListener('message', handleMessage);
  };
};