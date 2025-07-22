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
  
  // Enhanced token injection with multiple parameter strategies
  // Try multiple JotForm field naming conventions to ensure token transmission
  const tokenParams = [
    `user_token=${encodeURIComponent(userToken)}`,           // Direct field name
    `q_user_token=${encodeURIComponent(userToken)}`,         // Question field format
    `q6_userToken=${encodeURIComponent(userToken)}`,         // Specific field ID format
    `q_userToken=${encodeURIComponent(userToken)}`,          // Alternative format
    `token=${encodeURIComponent(userToken)}`,                // Simple token param
    `auth_token=${encodeURIComponent(userToken)}`            // Auth token format
  ].join('&');
  
  const prefillUrl = `${baseUrl}?${tokenParams}`;
  
  console.log('JotForm URL generated with token params:', prefillUrl);
  
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
