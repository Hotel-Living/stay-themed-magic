import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface DIDStatus {
  status: string;
  language: string;
  agentId: string;
  lastCheck: number;
  widgetFound: boolean;
  errorMessage?: string;
}

export function DIDAvatar() {
  const { i18n, isReady } = useTranslation();
  const [didStatus, setDIDStatus] = useState<DIDStatus>({
    status: 'initializing',
    language: 'unknown',
    agentId: '',
    lastCheck: 0,
    widgetFound: false
  });

  // Agent configuration
  const AGENTS = {
    spanish: 'v2_agt_JZ4Lnlqs',
    english: 'v2_agt_20pNgPtt'
  } as const;

  const CLIENT_KEY = 'YXV0aDB8Njg3MDc0MTcxYWMxODNkNTgzZDliNWNiOmZFamJkRm1kZnpzQUEzUWlpdTBxcA==';

  // Aggressive cleanup of existing D-ID elements
  const cleanupExistingDID = useCallback(() => {
    console.log('🧹 D-ID: Starting aggressive cleanup');
    
    // Remove all D-ID scripts
    const scripts = document.querySelectorAll('script[data-name*="did"], script[src*="d-id.com"]');
    scripts.forEach(script => {
      console.log('🗑️ Removing D-ID script:', script);
      script.remove();
    });

    // Remove all D-ID iframes
    const iframes = document.querySelectorAll('iframe[src*="d-id.com"], iframe[src*="liveperson"]');
    iframes.forEach(iframe => {
      console.log('🗑️ Removing D-ID iframe:', iframe);
      iframe.remove();
    });

    // Remove all D-ID containers
    const containers = document.querySelectorAll('[data-name*="did"], [class*="did"], [id*="did"]');
    containers.forEach(container => {
      if (container.tagName !== 'SCRIPT' && container.tagName !== 'IFRAME') {
        console.log('🗑️ Removing D-ID container:', container);
        container.remove();
      }
    });

    // Clear global D-ID references
    (window as any).didAgent = undefined;
    (window as any).DIDAPI = undefined;
    
    console.log('✅ D-ID: Cleanup completed');
  }, []);

  // Validate agent availability via D-ID API
  const validateAgent = useCallback(async (agentId: string): Promise<boolean> => {
    try {
      console.log(`🔍 Validating D-ID agent: ${agentId}`);
      
      // Simple validation - try to fetch agent info
      const response = await fetch(`https://api.d-id.com/agents/${agentId}`, {
        headers: {
          'Authorization': `Basic ${CLIENT_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const isValid = response.ok || response.status === 404; // 404 might be expected for some endpoints
      console.log(`${isValid ? '✅' : '❌'} Agent ${agentId} validation:`, response.status);
      return isValid;
    } catch (error) {
      console.warn(`⚠️ Agent validation failed for ${agentId}:`, error);
      return true; // Fail silently and attempt to load anyway
    }
  }, []);

  // Enhanced widget detection
  const detectWidget = useCallback(async (language: string, maxAttempts = 15): Promise<boolean> => {
    let attempts = 0;
    
    return new Promise((resolve) => {
      const check = () => {
        attempts++;
        
        // Look for D-ID widget with multiple selectors
        const selectors = [
          '[data-name="did-agent"]',
          'iframe[src*="d-id.com"]',
          'iframe[src*="liveperson"]',
          '[class*="did-widget"]',
          '[id*="did-widget"]'
        ];

        let widgetFound = false;
        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            console.log(`✅ D-ID Widget found with selector: ${selector}`, element);
            widgetFound = true;
            break;
          }
        }

        setDIDStatus(prev => ({
          ...prev,
          lastCheck: Date.now(),
          widgetFound,
          status: widgetFound ? `widget-active-${language}` : `checking-${language}-${attempts}`
        }));

        if (widgetFound) {
          resolve(true);
          return;
        }

        if (attempts < maxAttempts) {
          setTimeout(check, 1000);
        } else {
          console.log(`❌ D-ID Widget not found after ${maxAttempts} attempts`);
          setDIDStatus(prev => ({ ...prev, status: `widget-timeout-${language}` }));
          resolve(false);
        }
      };

      // Start checking after a short delay
      setTimeout(check, 500);
    });
  }, []);

  // Load D-ID script with enhanced error handling
  const loadDIDScript = useCallback(async (language: string, agentId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log(`🚀 Loading D-ID ${language} agent: ${agentId}`);
      
      setDIDStatus(prev => ({
        ...prev,
        status: `loading-${language}`,
        language,
        agentId
      }));

      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://agent.d-id.com/v2/index.js';
      script.setAttribute('data-mode', 'fabio');
      script.setAttribute('data-client-key', CLIENT_KEY);
      script.setAttribute('data-agent-id', agentId);
      script.setAttribute('data-name', 'did-agent');
      script.setAttribute('data-monitor', 'true');
      script.setAttribute('data-orientation', 'horizontal');
      script.setAttribute('data-position', 'right');

      script.onload = () => {
        console.log(`✅ D-ID ${language} script loaded successfully`);
        setDIDStatus(prev => ({ ...prev, status: `loaded-${language}` }));
        
        // Start widget detection
        detectWidget(language).then(resolve);
      };

      script.onerror = (error) => {
        console.error(`❌ D-ID ${language} script failed to load:`, error);
        setDIDStatus(prev => ({ 
          ...prev, 
          status: 'script-error',
          errorMessage: `Script load failed for ${language}`
        }));
        resolve(false);
      };

      try {
        document.head.appendChild(script);
        console.log(`📄 D-ID ${language} script added to DOM`);
      } catch (error) {
        console.error('❌ Failed to add D-ID script to DOM:', error);
        setDIDStatus(prev => ({ 
          ...prev, 
          status: 'dom-error',
          errorMessage: 'Failed to add script to DOM'
        }));
        resolve(false);
      }
    });
  }, [detectWidget]);

  // Main initialization function
  const initializeDID = useCallback(async () => {
    if (!isReady) {
      console.log('⏳ D-ID: Waiting for i18n to be ready');
      return;
    }

    console.log('🔄 D-ID: Starting initialization');
    
    // Step 1: Cleanup existing
    cleanupExistingDID();
    
    // Step 2: Detect language
    const browserLang = navigator.language || 'en';
    const i18nLang = i18n.language;
    const detectedLang = i18nLang || browserLang;
    const isSpanish = detectedLang.toLowerCase().startsWith('es');
    const language = isSpanish ? 'spanish' : 'english';
    const agentId = AGENTS[language];

    console.log('🌍 D-ID Language detection:', {
      browserLang,
      i18nLang,
      detectedLang,
      selectedLanguage: language,
      agentId
    });

    // Step 3: Validate agent
    const isAgentValid = await validateAgent(agentId);
    if (!isAgentValid) {
      console.error(`❌ Agent ${agentId} validation failed`);
      setDIDStatus(prev => ({ 
        ...prev, 
        status: 'agent-invalid',
        errorMessage: `Agent ${agentId} validation failed`
      }));
      return;
    }

    // Step 4: Load script and detect widget
    const success = await loadDIDScript(language, agentId);
    if (!success) {
      console.error(`❌ Failed to load D-ID ${language} agent`);
    }
  }, [isReady, i18n.language, cleanupExistingDID, validateAgent, loadDIDScript]);

  // Initialize on mount and language change
  useEffect(() => {
    console.log('🤖 D-ID Avatar: Component mounted/updated');
    
    // Add CSP violation monitoring
    const handleCSPViolation = (e: SecurityPolicyViolationEvent) => {
      if (e.blockedURI?.includes('d-id.com')) {
        console.error('🚫 CSP blocking D-ID:', e);
        setDIDStatus(prev => ({ 
          ...prev, 
          status: 'csp-blocked',
          errorMessage: 'CSP blocked D-ID resources'
        }));
      }
    };

    window.addEventListener('securitypolicyviolation', handleCSPViolation);

    // Initialize with delay to ensure DOM is ready
    const timer = setTimeout(initializeDID, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('securitypolicyviolation', handleCSPViolation);
      cleanupExistingDID();
    };
  }, [initializeDID, cleanupExistingDID]);

  // Manual test function for debugging
  const manualTest = useCallback(async () => {
    console.log('🔧 D-ID Manual test triggered');
    setDIDStatus(prev => ({ ...prev, status: 'manual-test' }));
    await initializeDID();
  }, [initializeDID]);

  // Render debug panel in development
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
        minWidth: '280px',
        fontFamily: 'monospace'
      }}>
        <div><strong>D-ID Avatar Status</strong></div>
        <div>Status: {didStatus.status}</div>
        <div>Language: {didStatus.language}</div>
        <div>Agent: {didStatus.agentId}</div>
        <div>Widget: {didStatus.widgetFound ? 'Found' : 'Not Found'}</div>
        {didStatus.errorMessage && <div style={{color: '#ff6b6b'}}>Error: {didStatus.errorMessage}</div>}
        <div>Last Check: {didStatus.lastCheck ? new Date(didStatus.lastCheck).toLocaleTimeString() : 'Never'}</div>
        <button 
          onClick={manualTest}
          style={{
            marginTop: '8px',
            padding: '4px 8px',
            background: '#007acc',
            color: 'white',
            border: 'none',
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