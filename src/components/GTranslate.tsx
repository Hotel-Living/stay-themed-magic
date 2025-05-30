
import { useEffect, useRef } from 'react';

export function GTranslate() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const initGTranslate = () => {
      // Clear any existing timeout
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }

      // Check if scripts are loaded and initialize
      if (window.gtranslateSettings && window.GTranslateFireEvent) {
        try {
          // Clear any existing widget content
          if (wrapperRef.current) {
            wrapperRef.current.innerHTML = '';
          }
          
          // Fire the widget initialization event
          window.GTranslateFireEvent('gt_show_widget');
          console.log('GTranslate widget initialized successfully');
        } catch (error) {
          console.error('Error initializing GTranslate widget:', error);
        }
      } else {
        // Retry initialization after a short delay
        initTimeoutRef.current = setTimeout(initGTranslate, 200);
      }
    };

    // Start initialization
    initGTranslate();

    // Cleanup timeout on unmount
    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={wrapperRef}
      className="gtranslate_wrapper flex items-center min-w-[40px] h-6"
      style={{ minHeight: '24px' }}
    />
  );
}
