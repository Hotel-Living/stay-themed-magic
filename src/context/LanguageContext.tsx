
import React, { createContext, useContext, useState, useEffect } from "react";

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

// Translation data
export type TranslationData = {
  [key: string]: string;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get language from localStorage or use browser language or default to English
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split("-")[0];
    return (["en", "es", "fr", "de", "it"].includes(browserLang) ? browserLang : "en") as Language;
  };

  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem("userLanguage") as Language;
    return (savedLanguage && ["en", "es", "fr", "de", "it"].includes(savedLanguage)) 
      ? savedLanguage 
      : getBrowserLanguage();
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<TranslationData>({});
  const [isLoading, setIsLoading] = useState(true);

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

  // Translation function with parameter support
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (isLoading) return key;
    
    let text = translations[key] || key;
    
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
