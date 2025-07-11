import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface AvatarContextType {
  avatarType: string | null;
  message?: string;
  shouldShow: boolean;
  position?: 'bottom-right' | 'center' | 'top-right';
  autoHide?: boolean;
  autoHideDelay?: number;
}

interface AvatarState {
  hasSeenIntro: boolean;
  lastVisitedPage: string;
  dismissedAvatars: string[];
}

export const useAvatarContext = () => {
  const location = useLocation();
  const [avatarContext, setAvatarContext] = useState<AvatarContextType>({
    avatarType: null,
    shouldShow: false
  });

  const [avatarState, setAvatarState] = useState<AvatarState>(() => {
    const stored = localStorage.getItem('avatar-state');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.warn('Failed to parse avatar state from localStorage');
      }
    }
    return {
      hasSeenIntro: false,
      lastVisitedPage: '',
      dismissedAvatars: []
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('avatar-state', JSON.stringify(avatarState));
  }, [avatarState]);

  // Determine which avatar to show based on context
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Don't show anything if user has dismissed recent avatars
    const shouldSkip = avatarState.dismissedAvatars.some(avatar => {
      const dismissTime = parseInt(avatar.split('-').pop() || '0');
      return Date.now() - dismissTime < 60000; // 1 minute cooldown
    });

    if (shouldSkip) {
      setAvatarContext({ avatarType: null, shouldShow: false });
      return;
    }

    // First-time visitor on homepage
    if (currentPath === '/' && !avatarState.hasSeenIntro) {
      setAvatarContext({
        avatarType: 'welcome',
        shouldShow: true,
        position: 'center',
        autoHide: false
      });
      return;
    }

    // Returning to homepage after visiting other pages
    if (currentPath === '/' && avatarState.lastVisitedPage !== '/') {
      setAvatarContext({
        avatarType: 'home-return',
        shouldShow: true,
        position: 'bottom-right',
        autoHide: true,
        autoHideDelay: 4000
      });
      return;
    }

    // Hotel detail page
    if (currentPath.startsWith('/hotel/')) {
      setAvatarContext({
        avatarType: 'hotel-guide',
        shouldShow: true,
        position: 'bottom-right',
        autoHide: true,
        autoHideDelay: 5000
      });
      return;
    }

    // Search results page
    if (currentPath === '/search') {
      setAvatarContext({
        avatarType: 'search-helper',
        shouldShow: true,
        position: 'bottom-right',
        autoHide: true,
        autoHideDelay: 4000
      });
      return;
    }

    // Default: no avatar
    setAvatarContext({ avatarType: null, shouldShow: false });
  }, [location.pathname, avatarState]);

  const dismissAvatar = (avatarType: string) => {
    const dismissId = `${avatarType}-${Date.now()}`;
    setAvatarState(prev => ({
      ...prev,
      dismissedAvatars: [...prev.dismissedAvatars.slice(-5), dismissId], // Keep last 5
      hasSeenIntro: avatarType === 'welcome' ? true : prev.hasSeenIntro,
      lastVisitedPage: location.pathname
    }));
    
    setAvatarContext({ avatarType: null, shouldShow: false });
  };

  const markIntroSeen = () => {
    setAvatarState(prev => ({
      ...prev,
      hasSeenIntro: true,
      lastVisitedPage: location.pathname
    }));
  };

  return {
    avatarContext,
    dismissAvatar,
    markIntroSeen,
    avatarState
  };
};