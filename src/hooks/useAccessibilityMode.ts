
import { useState, useEffect } from 'react';

export const useAccessibilityMode = () => {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);

  useEffect(() => {
    // Load preference from localStorage on mount
    const savedMode = localStorage.getItem('accessibility-mode');
    if (savedMode === 'true') {
      setIsAccessibilityMode(true);
      document.documentElement.classList.add('accessibility-mode');
    }
  }, []);

  const toggleAccessibilityMode = () => {
    const newMode = !isAccessibilityMode;
    setIsAccessibilityMode(newMode);
    
    // Save to localStorage
    localStorage.setItem('accessibility-mode', newMode.toString());
    
    // Toggle CSS class on document root
    if (newMode) {
      document.documentElement.classList.add('accessibility-mode');
    } else {
      document.documentElement.classList.remove('accessibility-mode');
    }
  };

  return {
    isAccessibilityMode,
    toggleAccessibilityMode
  };
};
