import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function SpanishDIDAvatar() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check current language and determine which agent to load
    const currentLang = i18n.language || navigator.language || 'en';
    
    const isSpanish = currentLang === 'es' || 
                      currentLang === 'es-ES' || 
                      currentLang === 'es-MX' ||
                      currentLang.startsWith('es');

    const isEnglish = currentLang === 'en' || 
                      currentLang === 'en-US' || 
                      currentLang === 'en-GB' ||
                      currentLang.startsWith('en');

    // Fallback: Check browser language if i18n language is not set
    const browserLang = navigator.language || 'en';
    const browserIsSpanish = browserLang.startsWith('es');
    const browserIsEnglish = browserLang.startsWith('en');

    // Determine which agent to load
    let shouldLoadSpanish = isSpanish || (!isEnglish && browserIsSpanish);
    let shouldLoadEnglish = isEnglish || (!isSpanish && browserIsEnglish);

    // Remove any existing agent first
    const existingScript = document.querySelector('script[data-name="did-agent"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Load appropriate agent
    if (shouldLoadSpanish) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'fabio');
      script.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
      script.setAttribute('data-agent-id', 'v2_agt_JZ4Lnlqs'); // Spanish agent
      script.setAttribute('data-name', 'did-agent');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-orientation', 'horizontal');
      script.setAttribute('data-position', 'right');
      
      document.head.appendChild(script);
    } else if (shouldLoadEnglish) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'fabio');
      script.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
      script.setAttribute('data-agent-id', 'v2_agt_20pNgPtt'); // English agent
      script.setAttribute('data-name', 'did-agent');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-orientation', 'horizontal');
      script.setAttribute('data-position', 'right');
      
      document.head.appendChild(script);
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