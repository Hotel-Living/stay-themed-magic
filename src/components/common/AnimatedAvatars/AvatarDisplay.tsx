import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface AvatarDisplayProps {
  avatarType: string;
  message?: string;
  onDismiss?: () => void;
  position?: 'bottom-right' | 'center' | 'top-right';
  autoHide?: boolean;
  autoHideDelay?: number;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatarType,
  message,
  onDismiss,
  position = 'bottom-right',
  autoHide = false,
  autoHideDelay = 5000
}) => {
  const { t } = useTranslation('avatars');
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    if (autoHide && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoHideDelay);
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay]);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, 300);
  };

  if (!isVisible) return null;

  const avatarUrl = `https://pgdzrvdwgoomjnnegkcn.supabase.co/storage/v1/object/public/avatars/${avatarType}.gif`;
  const displayMessage = message || t(`messages.${avatarType}`, { defaultValue: '' });

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'center': 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
    'top-right': 'fixed top-6 right-6'
  };

  return (
    <div 
      className={`${positionClasses[position]} z-50 transition-all duration-300 ${
        isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
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
            {displayMessage && (
              <p className="text-sm text-foreground mb-2">
                {displayMessage}
              </p>
            )}
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};