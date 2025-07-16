import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function SpanishDIDAvatar() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check if current language is Spanish
    const isSpanish = i18n.language === 'es' || 
                      (i18n.language === 'es-ES') || 
                      (i18n.language === 'es-MX') ||
                      i18n.language?.startsWith('es');

    // Fallback: Check browser language if i18n language is not set or is default
    const browserLangIsSpanish = !i18n.language || i18n.language === 'en' 
      ? navigator.language?.startsWith('es') 
      : false;

    const shouldLoadSpanishAgent = isSpanish || browserLangIsSpanish;

    if (shouldLoadSpanishAgent) {
      // Check if script is already loaded
      const existingScript = document.querySelector('script[data-name="did-agent"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://agent.d-id.com/v2/index.js';
        script.setAttribute('data-mode', 'fabio');
        script.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
        script.setAttribute('data-agent-id', 'v2_agt_JZ4Lnlqs');
        script.setAttribute('data-name', 'did-agent');
        script.setAttribute('data-monitor', 'true');
        script.setAttribute('data-orientation', 'horizontal');
        script.setAttribute('data-position', 'right');
        
        document.head.appendChild(script);
      }
    } else {
      // Remove script if language is not Spanish
      const existingScript = document.querySelector('script[data-name="did-agent"]');
      if (existingScript) {
        existingScript.remove();
      }
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      const script = document.querySelector('script[data-name="did-agent"]');
      if (script) {
        script.remove();
      }
    };
  }, [i18n.language]); // Re-run when language changes

  return null; // This component doesn't render anything visible
}