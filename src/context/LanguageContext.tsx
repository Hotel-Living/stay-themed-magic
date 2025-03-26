
import React, { createContext, useContext, useState, useEffect } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";

// Available languages
export type Language = "en" | "es" | "fr" | "de" | "it";

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
};

// Default context
const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
};

// Create context
const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Translation data can be nested objects or strings
export type TranslationData = {
  [key: string]: string | Record<string, any>;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language: geoLanguage, loading: geoLoading } = useGeolocation();
  
  // Get language from localStorage, geolocation, browser language, or default to English
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split("-")[0];
    return (["en", "es", "fr", "de", "it"].includes(browserLang) ? browserLang : "en") as Language;
  };

  const getInitialLanguage = (): Language => {
    // Priority: localStorage > geolocation > browser language > default
    const savedLanguage = localStorage.getItem("userLanguage") as Language;
    
    if (savedLanguage && ["en", "es", "fr", "de", "it"].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    if (!geoLoading && geoLanguage && ["en", "es", "fr", "de", "it"].includes(geoLanguage)) {
      return geoLanguage as Language;
    }
    
    return getBrowserLanguage();
  };

  const [language, setLanguageState] = useState<Language>("en"); // Default, will be updated
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isLoading, setIsLoading] = useState(true);

  // Update language once geolocation is loaded
  useEffect(() => {
    if (!geoLoading) {
      setLanguageState(getInitialLanguage());
    }
  }, [geoLoading, geoLanguage]);

  // Set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem("userLanguage", newLanguage);
    setLanguageState(newLanguage);
  };

  // Load language file
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const translationModule = await import(`../translations/${language}.ts`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English
        if (language !== "en") {
          const fallbackModule = await import(`../translations/en.ts`);
          setTranslations(fallbackModule.default);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  // Translation function with parameter support and dot notation
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (isLoading) return key;
    
    // Handle dot notation for nested objects
    const keys = key.split('.');
    let value: any = translations;
    
    // Traverse the nested objects
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Key not found, return the original key
      }
    }
    
    // If the final value is not a string, return the original key
    if (typeof value !== 'string') {
      return key;
    }
    
    let text = value;
    
    // Replace parameters in the string if they exist
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
