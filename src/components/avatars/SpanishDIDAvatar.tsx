import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function SpanishDIDAvatar() {
  const { i18n, isReady } = useTranslation();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Wait for i18n to be ready before proceeding
    if (!isReady) {
      console.log('D-ID Avatar: Waiting for i18n to be ready...');
      return;
    }

    // Get current language with fallbacks
    const currentLang = i18n.language || navigator.language || 'en';
    const browserLang = navigator.language || 'en';
    
    console.log('D-ID Avatar Debug:', {
      'i18n.language': i18n.language,
      'navigator.language': navigator.language,
      'currentLang': currentLang,
      'browserLang': browserLang,
      'isReady': isReady
    });

    // Language detection logic
    const isSpanish = currentLang === 'es' || 
                      currentLang === 'es-ES' || 
                      currentLang === 'es-MX' ||
                      currentLang.startsWith('es');

    const isEnglish = currentLang === 'en' || 
                      currentLang === 'en-US' || 
                      currentLang === 'en-GB' ||
                      currentLang.startsWith('en');

    // Fallback: Check browser language if i18n language is not set
    const browserIsSpanish = browserLang.startsWith('es');
    const browserIsEnglish = browserLang.startsWith('en');

    // Determine which agent to load
    let shouldLoadSpanish = isSpanish || (!isEnglish && browserIsSpanish);
    let shouldLoadEnglish = isEnglish || (!isSpanish && browserIsEnglish);

    console.log('D-ID Avatar Language Detection:', {
      isSpanish,
      isEnglish,
      browserIsSpanish,
      browserIsEnglish,
      shouldLoadSpanish,
      shouldLoadEnglish
    });

    // Remove any existing agent first
    const existingScript = document.querySelector('script[data-name="did-agent"]');
    if (existingScript) {
      console.log('D-ID Avatar: Removing existing script');
      existingScript.remove();
      setScriptLoaded(false);
    }

    // Function to create and load script
    const loadScript = (agentId: string, language: string) => {
      console.log(`D-ID Avatar: Loading ${language} agent (${agentId})`);
      
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'fabio');
      script.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
      script.setAttribute('data-agent-id', agentId);
      script.setAttribute('data-name', 'did-agent');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-orientation', 'horizontal');
      script.setAttribute('data-position', 'right');
      
      // Add error handling
      script.onload = () => {
        console.log(`D-ID Avatar: ${language} script loaded successfully`);
        setScriptLoaded(true);
      };
      
      script.onerror = (error) => {
        console.error(`D-ID Avatar: Error loading ${language} script:`, error);
        setScriptLoaded(false);
      };
      
      // Use a small delay to ensure DOM is ready
      setTimeout(() => {
        try {
          document.head.appendChild(script);
          console.log(`D-ID Avatar: ${language} script appended to head`);
        } catch (error) {
          console.error(`D-ID Avatar: Error appending ${language} script:`, error);
        }
      }, 100);
    };

    // Load appropriate agent
    if (shouldLoadSpanish) {
      loadScript('v2_agt_JZ4Lnlqs', 'Spanish');
    } else if (shouldLoadEnglish) {
      loadScript('v2_agt_20pNgPtt', 'English');
    } else {
      console.log('D-ID Avatar: No agent loaded - language not supported or detected');
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      const script = document.querySelector('script[data-name="did-agent"]');
      if (script) {
        console.log('D-ID Avatar: Cleanup - removing script');
        script.remove();
        setScriptLoaded(false);
      }
    };
  }, [i18n.language, isReady]); // Re-run when language changes or i18n becomes ready

  // Debug component state
  useEffect(() => {
    console.log('D-ID Avatar Component State:', { scriptLoaded, isReady });
  }, [scriptLoaded, isReady]);

  return null; // This component doesn't render anything visible
}