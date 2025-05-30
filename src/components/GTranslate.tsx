
import { useEffect } from "react";

export const GTranslate = () => {
  useEffect(() => {
    // Clear any existing settings first
    if (window.gtranslateSettings) {
      delete window.gtranslateSettings;
    }
    
    // Remove any existing scripts to prevent duplicates
    const existingScripts = document.querySelectorAll('script[src*="gtranslate"]');
    existingScripts.forEach(script => script.remove());
    
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
      } else {
        setTimeout(init, 300);
      }
    };

    script.onload = init;

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[src*="gtranslate"]');
      scripts.forEach(s => s.remove());
    };
  }, []);

  return <div className="gtranslate_wrapper" style={{ height: "32px", minWidth: "40px" }} />;
};
