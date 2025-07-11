import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

interface SimpleAvatarProps {
  onDismiss?: () => void;
}

export const SimpleAvatar: React.FC<SimpleAvatarProps> = ({ onDismiss }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [avatarType, setAvatarType] = useState<string>('welcome');

  // Determine avatar based on route
  useEffect(() => {
    const path = location.pathname;
    let shouldShow = false;
    let type = 'welcome';

    // Simple logic without localStorage to avoid build issues
    if (path === '/') {
      shouldShow = true;
      type = 'welcome';
    } else if (path.startsWith('/hotel/')) {
      shouldShow = true;
      type = 'hotel-guide';
    } else if (path === '/search') {
      shouldShow = true;
      type = 'search-helper';
    }

    setIsVisible(shouldShow);
    setAvatarType(type);
  }, [location.pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const avatarUrl = `https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatars/${avatarType}.gif`;
  
  const messages = {
    'welcome': 'Welcome to Hotel-Living! Ready to explore amazing hotels?',
    'hotel-guide': 'This looks like a great hotel! Need help with booking?',
    'search-helper': 'Great search! Let me help you find the perfect match.'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <img 
            src={avatarUrl}
            alt="Animated Avatar"
            className="w-16 h-16 rounded-full border-2 border-primary/20"
            onError={(e) => {
              console.warn(`Avatar ${avatarType} failed to load`);
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex-1">
            <p className="text-sm text-foreground mb-2">
              {messages[avatarType as keyof typeof messages]}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};