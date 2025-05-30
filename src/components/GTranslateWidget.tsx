
import { useEffect } from "react";

export default function GTranslateWidget() {
  useEffect(() => {
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
  }, []);

  return <div className="gtranslate_wrapper" />;
}
