import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export function SpanishDIDAvatar() {
  const { i18n, isReady } = useTranslation();
  const [status, setStatus] = useState<string>('initializing');
  const [debugInfo, setDebugInfo] = useState<any>({});

  // Network monitoring function
  const monitorNetworkRequests = useCallback(() => {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const url = args[0]?.toString();
      if (url?.includes('d-id.com')) {
        console.log('🌐 D-ID Network Request:', url);
        return originalFetch.apply(this, args)
          .then(response => {
            console.log('📡 D-ID Response:', response.status, response.statusText);
            if (!response.ok) {
              console.error('❌ D-ID Request Failed:', response.status, response.statusText);
            }
            return response;
          })
          .catch(error => {
            console.error('❌ D-ID Network Error:', error);
            throw error;
          });
      }
      return originalFetch.apply(this, args);
    };
  }, []);

  // DOM mutation observer
  const setupDOMMutationObserver = useCallback(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.tagName === 'IFRAME' || 
                element.querySelector?.('iframe') || 
                element.getAttribute?.('data-name')?.includes('did') ||
                element.className?.includes?.('did')) {
              console.log('🔍 D-ID DOM Mutation:', element);
              setDebugInfo(prev => ({ ...prev, lastMutation: Date.now(), mutatedElement: element.tagName }));
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'data-name', 'class']
    });

    return () => observer.disconnect();
  }, []);

  // Extended widget detection with periodic checks
  const startPeriodicWidgetCheck = useCallback((language: string) => {
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkWidget = () => {
      attempts++;
      const didWidget = document.querySelector('[data-name="did-agent"]');
      const anyDidElement = document.querySelector('[class*="did"], [id*="did"]');
      const allIframes = document.querySelectorAll('iframe');
      const didIframes = Array.from(allIframes).filter(iframe => 
        iframe.src.includes('d-id.com') || 
        iframe.src.includes('liveperson') ||
        iframe.className.includes('did')
      );

      console.log(`🔍 D-ID Widget Check #${attempts}:`, {
        didWidget: !!didWidget,
        anyDidElement: !!anyDidElement,
        totalIframes: allIframes.length,
        didIframes: didIframes.length,
        allIframeSrcs: Array.from(allIframes).map(i => i.src).filter(s => s)
      });

      setDebugInfo(prev => ({
        ...prev,
        checkAttempts: attempts,
        widgetFound: !!didWidget,
        iframesFound: didIframes.length,
        lastCheck: Date.now()
      }));

      if (didWidget || didIframes.length > 0) {
        setStatus(`widget-found-${language.toLowerCase()}`);
        console.log('✅ D-ID Widget found!', { didWidget, didIframes });
        return;
      }

      if (attempts < maxAttempts) {
        setTimeout(checkWidget, 1000);
      } else {
        setStatus(`widget-not-found-${language.toLowerCase()}`);
        console.log('❌ D-ID Widget detection timeout after', maxAttempts, 'attempts');
      }
    };

    setTimeout(checkWidget, 1000);
  }, []);

  // Manual trigger function for testing
  const manualTrigger = useCallback(() => {
    console.log('🔧 Manual D-ID trigger activated');
    setStatus('manual-trigger');
    
    // Test with minimal config
    const testScript = document.createElement('script');
    testScript.type = 'module';
    testScript.src = 'https://agent.d-id.com/v2/index.js';
    testScript.setAttribute('data-mode', 'fabio');
    testScript.setAttribute('data-client-key', 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==');
    testScript.setAttribute('data-agent-id', 'v2_agt_20pNgPtt'); // Force English for test
    testScript.setAttribute('data-name', 'did-agent-test');
    
    testScript.onload = () => {
      console.log('✅ Manual test script loaded');
      setStatus('manual-loaded');
    };
    
    testScript.onerror = (error) => {
      console.error('❌ Manual test script error:', error);
      setStatus('manual-error');
    };
    
    document.head.appendChild(testScript);
  }, []);

  useEffect(() => {
    console.log('🤖 D-ID Avatar: Component mounted');
    
    // Start network monitoring
    monitorNetworkRequests();
    
    // Setup DOM mutation observer
    const cleanupObserver = setupDOMMutationObserver();
    
    // Check for CSP errors
    window.addEventListener('securitypolicyviolation', (e) => {
      console.error('🚫 CSP Violation detected:', e.violatedDirective, e.blockedURI);
      if (e.blockedURI?.includes('d-id.com')) {
        setStatus('csp-blocked');
      }
    });

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
        
        // Start periodic widget detection
        startPeriodicWidgetCheck(language);
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
      cleanupObserver();
      setStatus('cleaned-up');
    };
  }, [i18n.language, isReady, monitorNetworkRequests, setupDOMMutationObserver, startPeriodicWidgetCheck]);

  // Debug status changes
  useEffect(() => {
    console.log('📊 D-ID Avatar Status:', status);
  }, [status]);

  // Render enhanced debug info in development
  if (import.meta.env.DEV) {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        left: '10px', 
        background: 'rgba(0,0,0,0.9)', 
        color: 'white', 
        padding: '12px', 
        fontSize: '11px',
        borderRadius: '6px',
        zIndex: 9999,
        minWidth: '250px',
        fontFamily: 'monospace'
      }}>
        <div><strong>D-ID Debug Panel</strong></div>
        <div>Status: {status}</div>
        {debugInfo.checkAttempts && <div>Checks: {debugInfo.checkAttempts}/20</div>}
        {debugInfo.iframesFound !== undefined && <div>Iframes: {debugInfo.iframesFound}</div>}
        {debugInfo.widgetFound !== undefined && <div>Widget: {debugInfo.widgetFound ? 'Found' : 'Not Found'}</div>}
        {debugInfo.lastMutation && <div>Last DOM change: {new Date(debugInfo.lastMutation).toLocaleTimeString()}</div>}
        <button 
          onClick={manualTrigger}
          style={{
            marginTop: '8px',
            padding: '4px 8px',
            background: '#444',
            color: 'white',
            border: '1px solid #666',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '10px'
          }}
        >
          Manual Test
        </button>
      </div>
    );
  }

  return null;
}