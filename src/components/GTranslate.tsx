
import { useEffect, useRef } from "react";

export const GTranslate = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized.current) return;
    
    // Clear any existing settings first
    if (window.gtranslateSettings) {
      delete window.gtranslateSettings;
    }
    
    // Remove any existing scripts and widgets to prevent duplicates
    const existingScripts = document.querySelectorAll('script[src*="gtranslate"]');
    existingScripts.forEach(script => script.remove());
    
    // Remove any existing gtranslate widgets
    const existingWidgets = document.querySelectorAll('.gtranslate_wrapper > *');
    existingWidgets.forEach(widget => widget.remove());
    
    // Set up the configuration
    window.gtranslateSettings = {
      default_language: "en",
      native_language_names: true,
      detect_browser_language: true,
      url_structure: "sub_domain",
      languages: ["en", "es", "de", "fr", "ru"],
      globe_color: "#66aaff",
      wrapper_selector: ".gtranslate_wrapper",
      flag_size: 16,
      globe_size: 20,
    };

    // Load the script
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/globe.js";
    script.defer = true;
    document.body.appendChild(script);

    const init = () => {
      if (window.GTranslateFireEvent) {
        window.GTranslateFireEvent("gt_show_widget");
        isInitialized.current = true;
      } else {
        setTimeout(init, 300);
      }
    };

    script.onload = init;

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[src*="gtranslate"]');
      scripts.forEach(s => s.remove());
      if (wrapperRef.current) {
        wrapperRef.current.innerHTML = '';
      }
      isInitialized.current = false;
    };
  }, []);

  return <div ref={wrapperRef} className="gtranslate_wrapper" style={{ height: "32px", minWidth: "40px" }} />;
};
