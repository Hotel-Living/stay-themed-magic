
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useAccessibilityMode } from '@/hooks/useAccessibilityMode';

export const AccessibilityToggle: React.FC = () => {
  const { isAccessibilityMode, toggleAccessibilityMode } = useAccessibilityMode();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleAccessibilityMode}
      className="text-white hover:text-white/80 text-xs uppercase font-bold flex items-center gap-1"
      aria-label={`${isAccessibilityMode ? 'Disable' : 'Enable'} accessibility mode`}
    >
      <Eye className="w-3 h-3" />
      {isAccessibilityMode ? 'Normal Mode' : 'Accessibility'}
    </Button>
  );
};
