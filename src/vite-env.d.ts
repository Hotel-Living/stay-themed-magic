
/// <reference types="vite/client" />

declare global {
  interface Window {
    gtranslateSettings?: any;
    gtranslate?: {
      getUserLanguage(): string;
      translatePageTo(language: string): void;
    };
    GTranslateFireEvent?: (event: string) => void;
  }
}

export {};
