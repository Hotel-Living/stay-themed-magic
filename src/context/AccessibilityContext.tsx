
import React, { createContext, useContext, useState, useEffect } from 'react';

type AccessibilityContextType = {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'x-large';
  setFontSize: (size: 'normal' | 'large' | 'x-large') => void;
  focusMode: boolean;
  toggleFocusMode: () => void;
};

const defaultContext: AccessibilityContextType = {
  highContrast: false,
  toggleHighContrast: () => {},
  fontSize: 'normal',
  setFontSize: () => {},
  focusMode: false,
  toggleFocusMode: () => {},
};

export const AccessibilityContext = createContext<AccessibilityContextType>(defaultContext);

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default values
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('highContrast') === 'true';
    }
    return false;
  });
  
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'x-large'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('fontSize') as 'normal' | 'large' | 'x-large') || 'normal';
    }
    return 'normal';
  });
  
  const [focusMode, setFocusMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('focusMode') === 'true';
    }
    return false;
  });

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  // Apply font size
  useEffect(() => {
    document.documentElement.classList.remove('font-size-normal', 'font-size-large', 'font-size-x-large');
    document.documentElement.classList.add(`font-size-${fontSize}`);
    
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  // Apply focus mode
  useEffect(() => {
    if (focusMode) {
      document.documentElement.classList.add('focus-mode');
    } else {
      document.documentElement.classList.remove('focus-mode');
    }
    
    localStorage.setItem('focusMode', focusMode.toString());
  }, [focusMode]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleFocusMode = () => setFocusMode(prev => !prev);

  return (
    <AccessibilityContext.Provider 
      value={{ 
        highContrast, 
        toggleHighContrast, 
        fontSize, 
        setFontSize,
        focusMode,
        toggleFocusMode
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
