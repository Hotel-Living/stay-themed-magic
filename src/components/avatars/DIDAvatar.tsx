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

  // Force D-ID widget visibility with CSS injection
  const forceWidgetVisibility = useCallback(() => {
    console.log('🎨 Applying D-ID visibility fixes');
    
    // Remove existing D-ID styles
    const existingStyle = document.getElementById('did-visibility-fix');
    if (existingStyle) existingStyle.remove();
    
    // Inject comprehensive CSS fixes
    const style = document.createElement('style');
    style.id = 'did-visibility-fix';
    style.textContent = `
      /* Force D-ID widget visibility */
      [data-name="did-agent"],
      [data-name*="did"],
      iframe[src*="d-id.com"],
      iframe[src*="liveperson"],
      [class*="did-widget"],
      [id*="did-widget"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: fixed !important;
        z-index: 999999 !important;
        bottom: 20px !important;
        right: 20px !important;
        width: 320px !important;
        height: 480px !important;
        min-width: 320px !important;
        min-height: 480px !important;
        max-width: none !important;
        max-height: none !important;
        border: 2px solid #007acc !important;
        border-radius: 12px !important;
        background: white !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.25) !important;
        transform: none !important;
        margin: 0 !important;
        padding: 0 !important;
        clip: none !important;
        overflow: visible !important;
      }
      
      /* Ensure container visibility */
      [data-name="did-agent"] > * {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Override any hiding styles */
      [data-name="did-agent"][style*="display: none"],
      [data-name="did-agent"][style*="visibility: hidden"],
      [data-name="did-agent"][style*="opacity: 0"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Debug outline for development */
      ${import.meta.env.DEV ? `
        [data-name="did-agent"]::before {
          content: "D-ID Widget Area";
          position: absolute;
          top: -25px;
          left: 0;
          background: #007acc;
          color: white;
          padding: 2px 8px;
          font-size: 10px;
          border-radius: 3px;
          z-index: 1000000;
        }
      ` : ''}
    `;
    
    document.head.appendChild(style);
    console.log('✅ D-ID visibility CSS applied');
  }, []);

  // Enhanced widget detection with visibility checks
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
        let widgetElement: Element | null = null;
        
        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            console.log(`✅ D-ID Widget found with selector: ${selector}`, element);
            widgetElement = element;
            widgetFound = true;
            break;
          }
        }

        // If widget found, apply visibility fixes and check if actually visible
        if (widgetFound && widgetElement) {
          forceWidgetVisibility();
          
          // Check if widget is actually visible
          const rect = widgetElement.getBoundingClientRect();
          const isVisible = rect.width > 0 && rect.height > 0 && 
                           rect.top < window.innerHeight && rect.bottom > 0 &&
                           rect.left < window.innerWidth && rect.right > 0;
          
          const styles = window.getComputedStyle(widgetElement);
          const isDisplayed = styles.display !== 'none' && 
                             styles.visibility !== 'hidden' && 
                             parseFloat(styles.opacity) > 0;
          
          console.log(`👁️ Widget visibility check:`, {
            element: widgetElement.tagName,
            rect: rect,
            isVisible,
            isDisplayed,
            display: styles.display,
            visibility: styles.visibility,
            opacity: styles.opacity,
            zIndex: styles.zIndex
          });
          
          if (!isVisible || !isDisplayed) {
            console.warn('⚠️ Widget found but not visible, applying additional fixes');
            
            // Force additional positioning
            if (widgetElement instanceof HTMLElement) {
              widgetElement.style.setProperty('display', 'block', 'important');
              widgetElement.style.setProperty('visibility', 'visible', 'important');
              widgetElement.style.setProperty('opacity', '1', 'important');
              widgetElement.style.setProperty('position', 'fixed', 'important');
              widgetElement.style.setProperty('bottom', '20px', 'important');
              widgetElement.style.setProperty('right', '20px', 'important');
              widgetElement.style.setProperty('z-index', '999999', 'important');
            }
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
  }, [forceWidgetVisibility]);

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

  // Manual visibility toggle for debugging
  const toggleVisibility = useCallback(() => {
    const widgets = document.querySelectorAll('[data-name="did-agent"], iframe[src*="d-id.com"]');
    widgets.forEach(widget => {
      if (widget instanceof HTMLElement) {
        const isHidden = widget.style.display === 'none';
        widget.style.setProperty('display', isHidden ? 'block' : 'none', 'important');
        console.log(`👁️ Widget visibility toggled: ${isHidden ? 'shown' : 'hidden'}`);
      }
    });
  }, []);

  // Manual positioning reset
  const resetPosition = useCallback(() => {
    console.log('🔧 Resetting D-ID widget position');
    forceWidgetVisibility();
    
    const widgets = document.querySelectorAll('[data-name="did-agent"], iframe[src*="d-id.com"]');
    widgets.forEach((widget, index) => {
      if (widget instanceof HTMLElement) {
        widget.style.setProperty('bottom', `${20 + (index * 20)}px`, 'important');
        widget.style.setProperty('right', `${20 + (index * 20)}px`, 'important');
        console.log(`📍 Widget ${index} repositioned`);
      }
    });
  }, [forceWidgetVisibility]);

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
        <div style={{ display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap' }}>
          <button 
            onClick={manualTest}
            style={{
              padding: '4px 8px',
              background: '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            Reload
          </button>
          <button 
            onClick={toggleVisibility}
            style={{
              padding: '4px 8px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            Toggle
          </button>
          <button 
            onClick={resetPosition}
            style={{
              padding: '4px 8px',
              background: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            Reset Position
          </button>
        </div>
      </div>
    );
  }

  return null;
}