
import { useEffect, useRef } from "react";

export default function GTranslateWidget() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptAddedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple script additions
    if (scriptAddedRef.current) return;
    
    // Clean up any existing GTranslate elements
    const existingWrappers = document.querySelectorAll('.gtranslate_wrapper');
    existingWrappers.forEach(wrapper => {
      if (wrapper !== widgetRef.current) {
        wrapper.remove();
      }
    });

    // Remove any existing scripts
    const existingScripts = document.querySelectorAll('script[src*="gtranslate"]');
    existingScripts.forEach(script => script.remove());

    const settingsScript = document.createElement("script");
    settingsScript.innerHTML = `
      window.gtranslateSettings = {
        default_language: "en",
        native_language_names: true,
        detect_browser_language: true,
        url_structure: "sub_domain",
        languages: ["en", "es", "fr"],
        globe_color: "#66aaff",
        wrapper_selector: ".gtranslate_wrapper",
        flag_size: 16,
        globe_size: 40
      };
    `;
    document.body.appendChild(settingsScript);

    const applyTranslation = () => {
      if (window.gtranslate) {
        window.gtranslate.translatePageTo(window.gtranslate.getUserLanguage());
      }
    };

    const widgetScript = document.createElement("script");
    widgetScript.src = "https://cdn.gtranslate.net/widgets/latest/globe.js";
    widgetScript.defer = true;
    widgetScript.onload = applyTranslation;
    document.body.appendChild(widgetScript);
    
    scriptAddedRef.current = true;

    // Cleanup function
    return () => {
      const wrappers = document.querySelectorAll('.gtranslate_wrapper');
      wrappers.forEach(wrapper => {
        if (wrapper !== widgetRef.current) {
          wrapper.remove();
        }
      });
    };
  }, []);

  return <div ref={widgetRef} className="gtranslate_wrapper" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }} />;
}
