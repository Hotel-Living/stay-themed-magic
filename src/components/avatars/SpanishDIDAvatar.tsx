import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function SpanishDIDAvatar() {
  const { i18n, isReady } = useTranslation();
  const [status, setStatus] = useState<string>('initializing');

  useEffect(() => {
    console.log('🤖 D-ID Avatar: Component mounted');
    
    // Wait for DOM to be ready
    const init = () => {
      // Remove any existing agent first
      const existingScript = document.querySelector('script[data-name="did-agent"]');
      if (existingScript) {
        console.log('🗑️ D-ID Avatar: Removing existing script');
        existingScript.remove();
      }

      // Simple language detection with fallbacks
      const browserLang = navigator.language || 'en';
      const i18nLang = isReady ? i18n.language : null;
      const detectedLang = i18nLang || browserLang;
      
      console.log('🌍 D-ID Avatar: Language detection', {
        browserLang,
        i18nLang,
        detectedLang,
        isReady
      });

      // Determine which agent to load
      const isSpanish = detectedLang.toLowerCase().startsWith('es');
      const agentId = isSpanish ? 'v2_agt_JZ4Lnlqs' : 'v2_agt_20pNgPtt';
      const language = isSpanish ? 'Spanish' : 'English';

      console.log(`🚀 D-ID Avatar: Loading ${language} agent (${agentId})`);
      setStatus(`loading-${language.toLowerCase()}`);

      // Create and load script
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

      // Enhanced error handling
      script.onload = () => {
        console.log(`✅ D-ID Avatar: ${language} script loaded successfully`);
        setStatus(`loaded-${language.toLowerCase()}`);
        
        // Check if widget actually rendered
        setTimeout(() => {
          const didWidget = document.querySelector('[data-name="did-agent"]');
          const didIframe = document.querySelector('iframe[src*="d-id.com"]');
          console.log('🔍 D-ID Avatar: Widget check', { didWidget, didIframe });
        }, 2000);
      };

      script.onerror = (error) => {
        console.error(`❌ D-ID Avatar: Error loading ${language} script:`, error);
        setStatus('error');
      };

      // Load script
      try {
        document.head.appendChild(script);
        console.log(`📄 D-ID Avatar: ${language} script added to DOM`);
      } catch (error) {
        console.error('❌ D-ID Avatar: Error adding script to DOM:', error);
        setStatus('error');
      }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      setTimeout(init, 100); // Small delay to ensure everything is ready
    }

    // Cleanup
    return () => {
      const script = document.querySelector('script[data-name="did-agent"]');
      if (script) {
        console.log('🗑️ D-ID Avatar: Cleanup - removing script');
        script.remove();
      }
      setStatus('cleaned-up');
    };
  }, [i18n.language, isReady]);

  // Debug status changes
  useEffect(() => {
    console.log('📊 D-ID Avatar Status:', status);
  }, [status]);

  // Render debug info in development
  if (import.meta.env.DEV) {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        left: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '8px', 
        fontSize: '12px',
        borderRadius: '4px',
        zIndex: 9999
      }}>
        D-ID Status: {status}
      </div>
    );
  }

  return null;
}