import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface Avatar {
  id: string;
  gif: string;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  isActive: boolean;
  chatHistory: { from: 'user' | 'avatar'; text: string }[];
}

interface AvatarManagerContextType {
  activeAvatars: Avatar[];
  addActiveAvatar: (avatarId: string, gif: string) => void;
  removeActiveAvatar: (avatarId: string) => void;
  getChatHistory: (avatarId: string) => { from: 'user' | 'avatar'; text: string }[];
  updateChatHistory: (avatarId: string, messages: { from: 'user' | 'avatar'; text: string }[]) => void;
}

const AvatarManagerContext = createContext<AvatarManagerContextType | undefined>(undefined);

export function AvatarManagerProvider({ children }: { children: React.ReactNode }) {
  const [activeAvatars, setActiveAvatars] = useState<Avatar[]>([]);
  const [chatHistories, setChatHistories] = useState<Record<string, { from: 'user' | 'avatar'; text: string }[]>>({});
  const { language, i18n } = useTranslation();

  const getInitialMessage = (language: string) => {
    switch (language) {
      case 'en':
        return "What would you like to talk about?";
      case 'pt':
        return "Sobre o que gostaria de conversar?"; 
      case 'ro':
        return "Despre ce ai vrea să vorbim?";
      default:
        return "¿Sobre qué quieres que hablemos?";
    }
  };

  const getNextPosition = (): Avatar['position'] => {
    const positions: Avatar['position'][] = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
    const usedPositions = activeAvatars.map(avatar => avatar.position);
    return positions.find(pos => !usedPositions.includes(pos)) || 'bottom-right';
  };

  const addActiveAvatar = useCallback((avatarId: string, gif: string) => {
    setActiveAvatars(prev => {
      // Remove if already exists
      const filtered = prev.filter(avatar => avatar.id !== avatarId);
      
      // Get next available position
      const positions: Avatar['position'][] = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
      const usedPositions = filtered.map(avatar => avatar.position);
      const nextPosition = positions.find(pos => !usedPositions.includes(pos)) || 'bottom-right';
      
      // Add with new position
      const newAvatar: Avatar = {
        id: avatarId,
        gif,
        position: nextPosition,
        isActive: true,
        chatHistory: chatHistories[avatarId] || [{ from: 'avatar', text: getInitialMessage(language) }]
      };
      return [...filtered, newAvatar];
    });
  }, [chatHistories]);

  const removeActiveAvatar = useCallback((avatarId: string) => {
    setActiveAvatars(prev => prev.filter(avatar => avatar.id !== avatarId));
  }, []);

  const getChatHistory = useCallback((avatarId: string) => {
    return chatHistories[avatarId] || [{ from: 'avatar', text: getInitialMessage(language) }];
  }, [chatHistories, language]);

  const updateChatHistory = useCallback((avatarId: string, messages: { from: 'user' | 'avatar'; text: string }[]) => {
    setChatHistories(prev => ({
      ...prev,
      [avatarId]: messages
    }));
  }, []);

  // Update chat histories when language changes
  useEffect(() => {
    const newInitialMessage = getInitialMessage(language);
    
    // Update existing chat histories that only have the initial message
    setChatHistories(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(avatarId => {
        const history = updated[avatarId];
        if (history && history.length === 1 && history[0].from === 'avatar') {
          updated[avatarId] = [{ from: 'avatar', text: newInitialMessage }];
        }
      });
      return updated;
    });

    // Update active avatars
    setActiveAvatars(prev => prev.map(avatar => ({
      ...avatar,
      chatHistory: avatar.chatHistory.length === 1 && avatar.chatHistory[0].from === 'avatar'
        ? [{ from: 'avatar', text: newInitialMessage }]
        : avatar.chatHistory
    })));
  }, [language]);

  return (
    <AvatarManagerContext.Provider value={{
      activeAvatars,
      addActiveAvatar,
      removeActiveAvatar,
      getChatHistory,
      updateChatHistory
    }}>
      {children}
    </AvatarManagerContext.Provider>
  );
}

export function useAvatarManager() {
  const context = useContext(AvatarManagerContext);
  if (context === undefined) {
    throw new Error('useAvatarManager must be used within an AvatarManagerProvider');
  }
  return context;
}