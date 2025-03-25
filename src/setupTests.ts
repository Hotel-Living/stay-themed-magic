
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Global console.log and error mocks to reduce noise in tests
global.console = {
  ...console,
  // Uncomment the following lines to silence console methods during tests
  // log: jest.fn(),
  // error: jest.fn(),
  // warn: jest.fn(),
  // info: jest.fn(),
  // debug: jest.fn(),
};

// Mock Supabase
jest.mock("@/integrations/supabase/client", () => {
  return {
    supabase: {
      auth: {
        getSession: jest.fn(),
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
        signOut: jest.fn(),
        onAuthStateChange: jest.fn(),
      },
      from: jest.fn(),
    },
  };
});
