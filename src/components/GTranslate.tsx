
import { useEffect } from "react";

export const GTranslate = () => {
  useEffect(() => {
    // Clear any existing settings and widgets
    if (window.gtranslateSettings) {
      delete window.gtranslateSettings;
    }
    
    // Remove any existing scripts and widgets to prevent duplicates
    const existingScripts = document.querySelectorAll('script[src*="gtranslate"]');
    existingScripts.forEach(script => script.remove());
    
    const existingWidgets = document.querySelectorAll('.gtranslate_wrapper > *');
    existingWidgets.forEach(widget => widget.remove());
    
    // Set up the exact configuration provided by user
    window.gtranslateSettings = {
      "default_language": "en",
      "native_language_names": true,
      "detect_browser_language": true,
      "url_structure": "sub_domain",
      "languages": ["en", "es", "fr"],
      "globe_color": "#66aaff",
      "wrapper_selector": ".gtranslate_wrapper",
      "flag_size": 16,
      "globe_size": 40
    };

    // Load the script
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/globe.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[src*="gtranslate"]');
      scripts.forEach(s => s.remove());
    };
  }, []);

  return <div className="gtranslate_wrapper"></div>;
};
