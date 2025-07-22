
import React, { useEffect } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { useJotFormToken } from "@/hooks/useJotFormToken";
import { createJotFormURL, setupJotFormListener } from "@/utils/jotformIntegration";
import { toast } from "sonner";

export const AddProperty2Content = () => {
  const { t } = useTranslation('dashboard/general');
  const { token: userToken, isLoading: tokenLoading, error: tokenError } = useJotFormToken();

  // Set up JotForm submission listener
  useEffect(() => {
    const cleanup = setupJotFormListener(() => {
      toast.success(
        "Property submission received! Your property will appear in your dashboard shortly after processing.",
        { duration: 5000 }
      );
    });

    return cleanup;
  }, []);

  // Inject token into JotForm when it loads
  useEffect(() => {
    if (userToken) {
      // Wait for iframe to load then inject token
      const timer = setTimeout(() => {
        const iframe = document.getElementById('jotform-hotel-submission') as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
          try {
            // Send token to JotForm for hidden field population
            iframe.contentWindow.postMessage({
              type: 'SET_USER_TOKEN',
              token: userToken
            }, 'https://form.jotform.com');
          } catch (error) {
            console.warn('Could not inject token into JotForm iframe:', error);
          }
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [userToken]);

  if (tokenLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-2 text-white">Loading form...</span>
        </div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500 p-8">
          Error loading form: {tokenError}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          {t('addProperty2Title')}
        </h1>
      </div>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <iframe
          id="jotform-hotel-submission"
          src={createJotFormURL('251846986373069', userToken)}
          className="w-full h-[900px] rounded-xl border shadow-md"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default AddProperty2Content;
