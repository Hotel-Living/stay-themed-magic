
/// <reference types="vite/client" />

declare global {
  interface Window {
    gtranslateSettings?: any;
    GTranslateFireEvent?: (event: string) => void;
  }
}

export {};
