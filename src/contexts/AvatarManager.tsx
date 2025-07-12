import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTranslation } from "@/hooks/useTranslation";

interface Avatar {
  id: string;
  gif: string;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  isActive: boolean;
  chatHistory: { from: 'user' | 'avatar'; text: string }[];
  showChat: boolean;
}

interface AvatarManagerContextType {
  activeAvatars: Avatar[];
  addActiveAvatar: (avatarId: string, gif: string) => void;
  removeActiveAvatar: (avatarId: string) => void;
  toggleAvatarChat: (avatarId: string) => void;
  getChatHistory: (avatarId: string) => { from: 'user' | 'avatar'; text: string }[];
  updateChatHistory: (avatarId: string, messages: { from: 'user' | 'avatar'; text: string }[]) => void;
  getAvatarByPosition: (position: string) => Avatar | null;
  isAvatarActive: (avatarId: string) => boolean;
}

const AvatarManagerContext = createContext<AvatarManagerContextType | undefined>(undefined);

export function AvatarManagerProvider({ children }: { children: React.ReactNode }) {
  const [activeAvatars, setActiveAvatars] = useState<Avatar[]>([]);
  const [chatHistories, setChatHistories] = useState<Record<string, { from: 'user' | 'avatar'; text: string }[]>>({});
  const { t } = useTranslation('faq');

  const availablePositions: ('bottom-right' | 'bottom-left' | 'top-left' | 'top-right')[] = 
    ['bottom-right', 'bottom-left', 'top-left', 'top-right'];

  const addActiveAvatar = useCallback((avatarId: string, gif: string) => {
    setActiveAvatars(prev => {
      // Check if avatar is already active
      const existingIndex = prev.findIndex(avatar => avatar.id === avatarId);
      if (existingIndex >= 0) {
        // Avatar exists, just toggle its chat
        return prev.map(avatar => 
          avatar.id === avatarId 
            ? { ...avatar, showChat: true }
            : avatar
        );
      }

      // Find next available position
      const usedPositions = prev.map(avatar => avatar.position);
      const nextPosition = availablePositions.find(pos => !usedPositions.includes(pos));
      
      // If no position available, replace the oldest avatar
      if (!nextPosition) {
        const newAvatars = [...prev];
        newAvatars.shift(); // Remove oldest
        const position = availablePositions[0]; // Use first position
        
        return [...newAvatars, {
          id: avatarId,
          gif,
          position,
          isActive: true,
          showChat: true,
          chatHistory: chatHistories[avatarId] || [{ from: 'avatar', text: getInitialMessage() }]
        }];
      }

      // Add new avatar
      return [...prev, {
        id: avatarId,
        gif,
        position: nextPosition,
        isActive: true,
        showChat: true,
        chatHistory: chatHistories[avatarId] || [{ from: 'avatar', text: getInitialMessage() }]
      }];
    });
  }, [chatHistories]);

  const removeActiveAvatar = useCallback((avatarId: string) => {
    setActiveAvatars(prev => prev.filter(avatar => avatar.id !== avatarId));
  }, []);

  const toggleAvatarChat = useCallback((avatarId: string) => {
    setActiveAvatars(prev => prev.map(avatar => 
      avatar.id === avatarId 
        ? { ...avatar, showChat: !avatar.showChat }
        : avatar
    ));
  }, []);

  const getChatHistory = useCallback((avatarId: string) => {
    return chatHistories[avatarId] || [{ from: 'avatar', text: getInitialMessage() }];
  }, [chatHistories]);

  const updateChatHistory = useCallback((avatarId: string, messages: { from: 'user' | 'avatar'; text: string }[]) => {
    setChatHistories(prev => ({
      ...prev,
      [avatarId]: messages
    }));
  }, []);

  const getAvatarByPosition = useCallback((position: string) => {
    return activeAvatars.find(avatar => avatar.position === position) || null;
  }, [activeAvatars]);

  const isAvatarActive = useCallback((avatarId: string) => {
    return activeAvatars.some(avatar => avatar.id === avatarId);
  }, [activeAvatars]);

  const getInitialMessage = () => {
    return t('avatarMessage').replace('\n', ' ');
  };

  return (
    <AvatarManagerContext.Provider value={{
      activeAvatars,
      addActiveAvatar,
      removeActiveAvatar,
      toggleAvatarChat,
      getChatHistory,
      updateChatHistory,
      getAvatarByPosition,
      isAvatarActive
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