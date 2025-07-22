/**
 * Utility functions for JotForm integration with user authentication
 */

/**
 * Creates a JotForm URL with user token for authentication using prefill mechanism
 * @param formId - The JotForm form ID  
 * @param userToken - The user's secure token for authentication
 * @returns Complete JotForm URL with token prefilled into hidden field
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
  
  // Use JotForm's prefill mechanism to inject token into a hidden field
  // We need to use a specific field name that exists in the form
  // This field should be added to the JotForm as a hidden field named 'user_token'
  const prefillUrl = `${baseUrl}?q_user_token=${encodeURIComponent(userToken)}&user_token=${encodeURIComponent(userToken)}`;
  
  return prefillUrl;
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

/**
 * Injects user token into JotForm when it loads
 * @param userToken - The user's authentication token
 */
export const injectUserTokenIntoJotForm = (userToken: string | null) => {
  if (!userToken || typeof window === 'undefined') return;

  // Wait for JotForm to load and inject token
  const injectToken = () => {
    const iframe = document.getElementById('jotform-hotel-submission') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        // Try to inject token into form
        iframe.contentWindow.postMessage({
          type: 'SET_USER_TOKEN',
          token: userToken
        }, 'https://form.jotform.com');
      } catch (error) {
        console.warn('Could not inject token into JotForm iframe:', error);
      }
    }
  };

  // Try injection after a delay to ensure iframe is loaded
  setTimeout(injectToken, 2000);
};
